const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

// Загружаем переменные окружения
dotenv.config();

// Инициализируем Express
const app = express();
const PORT = process.env.PORT || 5173;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Добавляем логирование запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Тело запроса:', req.body);
  }
  
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