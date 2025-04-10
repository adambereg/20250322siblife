const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Загружаем переменные окружения
dotenv.config();

// Инициализируем Express
const app = express();
const PORT = 5000;
console.log(`Порт сервера установлен на: ${PORT}`);

// Создаем директорию для загрузок, если она не существует
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  console.log('Создание директории uploads:', uploadsDir);
  fs.mkdirSync(uploadsDir, { recursive: true });
} else {
  console.log('Директория uploads уже существует:', uploadsDir);
  // Проверяем права на запись
  try {
    fs.accessSync(uploadsDir, fs.constants.W_OK);
    console.log('Директория uploads доступна для записи');
  } catch (err) {
    console.error('ОШИБКА: Директория uploads недоступна для записи:', err);
  }
}

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статический доступ к загруженным файлам
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log('Настроен статический доступ к директории uploads:', path.join(__dirname, 'uploads'));

// Добавляем логирование запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Тело запроса:', req.body);
  }
  
  // Логирование заголовков запроса
  console.log('Заголовки запроса:', req.headers);
  
  // Логирование ответа
  const originalJson = res.json;
  res.json = function(body) {
    console.log(`[${new Date().toISOString()}] Ответ:`, body);
    return originalJson.call(this, body);
  };
  
  next();
});

// Подключение к MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/siblife';

// Функция для подключения к базе данных
const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Успешное подключение к MongoDB');
  } catch (error) {
    console.error('❌ Ошибка подключения к MongoDB:', error);
    console.log('Используем моковые данные');
  }
};

// Попытка подключения к MongoDB
connectToDatabase().catch(err => {
  console.log('Не удалось подключиться к MongoDB. Используем моковые данные.');
});

// Обработчики событий соединения
mongoose.connection.on('error', (err) => {
  console.error('❌ Ошибка соединения с MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ Соединение с MongoDB разорвано');
});

// Корректное закрытие соединения при завершении процесса
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Соединение с MongoDB закрыто');
  process.exit(0);
});

// Модели (подключаем, только если MongoDB доступна)
let User, Event, Clan;
try {
  User = require('./src/models/User').default;
  Event = require('./src/models/Event').default;
  Clan = require('./src/models/Clan').default;
  console.log('Модели MongoDB загружены успешно');
} catch (error) {
  console.error('Ошибка загрузки моделей MongoDB:', error);
}

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Проверка существования директории
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      console.log('Создание директории uploads:', uploadsDir);
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    console.log('Загрузка файла:', file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'avatar-' + uniqueSuffix + ext);
  }
});

// Фильтр файлов (только изображения)
const fileFilter = (req, file, cb) => {
  console.log('Проверка типа файла:', file.mimetype);
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Разрешены только изображения!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 МБ
  }
});

// Middleware для проверки JWT токена
const verifyToken = (req, res, next) => {
  console.log('Проверка JWT токена');
  
  // Получаем токен из заголовка
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('Токен отсутствует');
    return res.status(401).json({ success: false, message: 'Не авторизован, токен отсутствует' });
  }
  
  // Проверяем формат токена
  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('Неверный формат токена');
    return res.status(401).json({ success: false, message: 'Неверный формат токена' });
  }
  
  // Верифицируем токен
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    req.userId = decoded.id;
    console.log('Токен прошел проверку, id пользователя:', req.userId);
    next();
  } catch (error) {
    console.log('Ошибка верификации токена:', error.message);
    return res.status(401).json({ success: false, message: 'Недействительный токен' });
  }
};

// Используем переименованную функцию везде последовательно
const authMiddleware = verifyToken;

// Маршруты API
// Если модули ES, пытаемся их импортировать с помощью ESM Loader
try {
  // Указываем корневому маршрутизатору API использовать префикс /api
  const apiRoutes = require('./src/api/index').default;
  app.use('/api', apiRoutes);
  console.log('API маршруты загружены успешно');
} catch (error) {
  console.error('Ошибка загрузки API маршрутов:', error);
  
  // Используем заглушки вместо модулей API
  const mockUsers = {
    'user@example.com': {
      id: '1',
      name: 'Иван Петров',
      email: 'user@example.com',
      password: 'password',
      role: 'participant',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      joinDate: new Date().toISOString(),
      tokens: 100,
      friends: 5,
      followers: 10,
      stats: {
        events: 2,
        reviews: 3,
        posts: 5
      }
    },
    'vip@example.com': {
      id: '2',
      name: 'Мария Иванова',
      email: 'vip@example.com',
      password: 'password',
      role: 'vip',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      joinDate: new Date().toISOString(),
      tokens: 500,
      friends: 25,
      followers: 50,
      stats: {
        events: 10,
        reviews: 15,
        posts: 20
      }
    },
    'adambereg@gmail.com': {
      id: '3',
      name: 'Адам Берег',
      email: 'adambereg@gmail.com',
      password: '123z456a',
      role: 'participant',
      avatar: '',
      joinDate: new Date().toISOString(),
      tokens: 50,
      friends: 0,
      followers: 0,
      stats: {
        events: 0,
        reviews: 0,
        posts: 0
      }
    }
  };
  
  // Выводим в консоль информацию о доступных пользователях
  console.log('Доступные пользователи:');
  for (const email in mockUsers) {
    console.log(`- ${email} (${mockUsers[email].name}): пароль = ${mockUsers[email].password}`);
  }
  
  // API маршруты (заглушки)
  app.get('/api/auth/me', (req, res) => {
    // Предполагаем, что пользователь вошел как adambereg@gmail.com
    const user = mockUsers['adambereg@gmail.com'];
    const { password, ...userData } = user;
    
    res.json({
      success: true,
      data: userData
    });
  });
  
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    const user = mockUsers[email];
    console.log(`Попытка входа для ${email}, найден пользователь:`, user ? 'Да' : 'Нет');
    
    if (user && user.password === password) {
      const { password, ...userData } = user;
      userData.token = 'fake-jwt-token-example-' + userData.id;
      
      console.log(`Успешный вход пользователя ${email}`);
      
      res.json({
        success: true,
        data: userData
      });
    } else {
      console.log(`Ошибка входа: пользователь ${email} не найден или неверный пароль`);
      res.status(401).json({
        success: false,
        message: 'Неверный email или пароль'
      });
    }
  });
  
  app.post('/api/auth/register', (req, res) => {
    const { name, email, password, role } = req.body;
    
    if (mockUsers[email]) {
      return res.status(400).json({
        success: false,
        message: 'Пользователь с таким email уже существует'
      });
    }
    
    const newUser = {
      id: String(Object.keys(mockUsers).length + 1),
      name,
      email,
      password,
      role: role || 'participant',
      avatar: '',
      joinDate: new Date().toISOString(),
      tokens: 50,
      friends: 0,
      followers: 0,
      stats: {
        events: 0,
        reviews: 0,
        posts: 0
      }
    };
    
    mockUsers[email] = newUser;
    
    console.log(`Зарегистрирован новый пользователь: ${email}, роль: ${role || 'participant'}`);
    
    const { password: _, ...userData } = newUser;
    userData.token = 'fake-jwt-token-for-new-user-' + userData.id;
    
    res.json({
      success: true,
      data: userData
    });
  });
  
  // Тестовые данные для событий
  app.get('/api/events', (req, res) => {
    res.json({
      success: true,
      data: [
        {
          id: '1',
          title: 'Поход на гору Сибирячка',
          slug: 'pohod-na-goru-sibiryachka',
          description: 'Однодневный поход на гору Сибирячка с потрясающими видами на озеро Байкал',
          category: 'Походы',
          image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
          dateStart: new Date('2023-07-25').toISOString(),
          dateEnd: new Date('2023-07-25').toISOString(),
          price: 1500,
          capacity: 20,
          participants: 12,
          location: {
            address: 'Поселок Листвянка',
            city: 'Иркутск'
          }
        },
        {
          id: '2',
          title: 'Мастер-класс по сибирской кухне',
          slug: 'master-klass-po-sibirskoj-kuhne',
          description: 'Научитесь готовить традиционные сибирские блюда под руководством шеф-повара',
          category: 'Кулинария',
          image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
          dateStart: new Date('2023-08-10').toISOString(),
          dateEnd: new Date('2023-08-10').toISOString(),
          price: 3000,
          capacity: 15,
          participants: 8,
          location: {
            address: 'ул. Ленина, 25',
            city: 'Новосибирск'
          }
        }
      ]
    });
  });
  
  // Тестовые данные для кланов
  app.get('/api/clans', (req, res) => {
    res.json({
      success: true,
      data: [
        {
          id: '1',
          name: 'Сибирские Волки',
          slug: 'sibirskie-volki',
          description: 'Клан для активного отдыха в Сибири',
          logo: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
          cover: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          memberCount: 34,
          tags: ['Походы', 'Активный отдых', 'Сибирь'],
          category: 'Спорт и отдых',
          city: 'Новосибирск',
          isVerified: true
        },
        {
          id: '2',
          name: 'Таежные Братья',
          slug: 'taezhnye-bratya',
          description: 'Клан любителей походов и выживания в тайге',
          logo: 'https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
          cover: 'https://images.unsplash.com/photo-1542202229-7d93c33f5d07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          memberCount: 22,
          tags: ['Тайга', 'Выживание', 'Походы'],
          category: 'Активный отдых',
          city: 'Томск',
          isVerified: false
        }
      ]
    });
  });
}

// Get current user (me)
app.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Пользователь не найден'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении данных пользователя'
    });
  }
});

// Обновление профиля пользователя (без аватара)
app.put('/api/users/profile', authMiddleware, async (req, res) => {
  console.log('Получен запрос на обновление профиля без аватара');
  console.log('Тело запроса:', req.body);
  console.log('ID пользователя из токена:', req.userId);
  
  try {
    const { name } = req.body;
    console.log('Данные для обновления:', { name });
    
    // Проверяем, что есть данные для обновления
    if (!name) {
      console.log('Отсутствуют данные для обновления');
      return res.status(400).json({
        success: false,
        message: 'Отсутствуют данные для обновления'
      });
    }
    
    // Находим и обновляем пользователя
    let updatedUser;
    if (mongoose.connection.readyState === 1) { // Если MongoDB подключена
      try {
        updatedUser = await User.findByIdAndUpdate(
          req.userId, 
          { name },
          { new: true, runValidators: true }
        ).select('-password');
      } catch (dbError) {
        console.error('Ошибка базы данных:', dbError);
        return res.status(500).json({
          success: false,
          message: 'Ошибка базы данных: ' + dbError.message
        });
      }
    } else {
      // Используем моковые данные, если нет подключения к MongoDB
      const mockEmail = 'adambereg@gmail.com'; // Предполагаем, что это текущий пользователь
      console.log('Используем моковые данные для пользователя:', mockEmail);
      
      if (mockUsers[mockEmail]) {
        mockUsers[mockEmail].name = name;
        updatedUser = { ...mockUsers[mockEmail] };
        delete updatedUser.password;
        console.log('Пользователь в моковых данных обновлен:', updatedUser);
      } else {
        console.error('Пользователь не найден в моковых данных');
        return res.status(404).json({
          success: false,
          message: 'Пользователь не найден'
        });
      }
    }
    
    if (!updatedUser) {
      console.log('Пользователь не найден в базе данных');
      return res.status(404).json({
        success: false,
        message: 'Пользователь не найден'
      });
    }
    
    console.log('Профиль успешно обновлен:', updatedUser);
    return res.json({
      success: true,
      data: updatedUser,
      message: 'Профиль успешно обновлен'
    });
  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
    return res.status(500).json({
      success: false,
      message: 'Ошибка сервера при обновлении профиля: ' + error.message
    });
  }
});

// Обновление аватара пользователя
app.put('/api/users/profile/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
  console.log('Получен запрос на обновление аватара');
  console.log('ID пользователя из токена:', req.userId);
  
  // Логируем заголовки запроса
  console.log('Заголовки запроса:', req.headers);
  console.log('Тело запроса (если есть):', req.body);
  console.log('Файлы (если есть):', req.file || 'нет файлов');
  
  try {
    // Проверяем загрузку файла
    if (!req.file) {
      console.log('Файл не загружен в запросе');
      return res.status(400).json({ success: false, message: 'Файл не загружен' });
    }
    
    console.log('Файл успешно загружен:', req.file);
    console.log('Путь к файлу:', req.file.path);
    
    // Получаем пользователя из базы данных или моковых данных
    let user;
    if (mongoose.connection.readyState === 1) { // Если MongoDB подключена
      try {
        user = await User.findById(req.userId);
      } catch (dbError) {
        console.error('Ошибка базы данных:', dbError);
        return res.status(500).json({
          success: false,
          message: 'Ошибка базы данных: ' + dbError.message
        });
      }
    } else {
      // Используем моковые данные, если нет подключения к MongoDB
      const mockEmail = 'adambereg@gmail.com'; // Предполагаем, что это текущий пользователь
      console.log('Используем моковые данные для пользователя:', mockEmail);
      
      if (mockUsers[mockEmail]) {
        user = mockUsers[mockEmail];
        console.log('Пользователь найден в моковых данных:', user);
      } else {
        console.error('Пользователь не найден в моковых данных');
      }
    }
    
    if (!user) {
      // Если пользователь не найден, удаляем загруженный файл
      console.log('Пользователь не найден, удаляем загруженный файл');
      if (req.file && req.file.path) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Ошибка при удалении файла:', err);
        });
      }
      
      return res.status(404).json({ success: false, message: 'Пользователь не найден' });
    }
    
    // Формируем URL для аватара (относительный путь)
    const avatarUrl = `/uploads/${path.basename(req.file.path)}`;
    console.log('URL аватара:', avatarUrl);
    
    // Проверяем существование старого аватара и удаляем его, если он есть
    if (user.avatar && user.avatar !== '' && !user.avatar.startsWith('http')) {
      const oldAvatarPath = path.join(__dirname, user.avatar);
      console.log('Проверка существования старого аватара:', oldAvatarPath);
      if (fs.existsSync(oldAvatarPath)) {
        console.log('Удаление старого аватара:', oldAvatarPath);
        fs.unlinkSync(oldAvatarPath);
      }
    }
    
    // Обновляем аватар пользователя
    user.avatar = avatarUrl;
    
    // Сохраняем изменения
    let savedUser;
    if (mongoose.connection.readyState === 1) {
      savedUser = await user.save();
      console.log('Аватар успешно обновлен в MongoDB для пользователя:', user.email);
    } else {
      // В случае моковых данных, просто обновляем их
      savedUser = user;
      console.log('Аватар успешно обновлен в моковых данных для пользователя:', user.email);
    }
    
    // Подготавливаем данные для ответа (без пароля)
    const userData = {
      id: savedUser._id || savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      avatar: savedUser.avatar,
      joinDate: savedUser.joinDate,
      tokens: savedUser.tokens,
      friends: savedUser.friends,
      followers: savedUser.followers,
      stats: savedUser.stats
    };
    
    // Возвращаем обновленные данные пользователя
    console.log('Отправляем успешный ответ с данными пользователя:', userData);
    return res.json({
      success: true,
      data: userData,
      message: 'Аватар успешно обновлен'
    });
  } catch (error) {
    console.error('Ошибка при обновлении аватара:', error);
    return res.status(500).json({ success: false, message: 'Ошибка при обновлении аватара: ' + error.message });
  }
});

// Изменение пароля
app.put('/api/users/password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Проверяем, что все необходимые поля присутствуют
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Пожалуйста, укажите текущий и новый пароль'
      });
    }
    
    // Проверяем, что новый пароль достаточно длинный
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Новый пароль должен содержать не менее 6 символов'
      });
    }
    
    // Находим пользователя с паролем
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Пользователь не найден'
      });
    }
    
    // Проверяем текущий пароль
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Неверный текущий пароль'
      });
    }
    
    // Хешируем новый пароль
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    // Сохраняем пользователя с новым паролем
    await user.save();
    
    res.json({
      success: true,
      message: 'Пароль успешно изменен'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при изменении пароля'
    });
  }
});

// Сервируем статические файлы клиента в prod-режиме
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // Для режима разработки тоже обслуживаем статические файлы
  app.use(express.static(path.join(__dirname, 'public')));
  
  // Любой запрос, не обработанный API, перенаправляем на index.html
  app.get('*', (req, res) => {
    // Проверяем, если запрос уже на API
    if (req.url.startsWith('/api')) {
      return res.status(404).json({
        success: false,
        message: 'API маршрут не найден'
      });
    }
    
    // Для остальных запросов отдаем index.html
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
}); 