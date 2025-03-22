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

// Функция для подключения к MongoDB
const connectDB = async () => {
  try {
    // В реальном приложении URI должен быть в env переменных
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/siberia_life';
    
    // Только пытаемся подключиться, если установлена переменная окружения USE_MONGODB=true
    if (process.env.USE_MONGODB === 'true') {
      await mongoose.connect(mongoURI);
      console.log('MongoDB подключена успешно');
      
      // Обработка событий Mongoose для соединения
      mongoose.connection.on('connected', () => {
        console.log('Mongoose подключен к MongoDB');
      });

      mongoose.connection.on('error', (err) => {
        console.error(`Ошибка соединения Mongoose: ${err}`);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('Mongoose отключен от MongoDB');
      });
    } else {
      console.log('Работаем с моковыми данными без подключения к MongoDB');
    }
  } catch (error) {
    console.error('Ошибка подключения к MongoDB:', error);
    console.log('Переходим в режим работы с моковыми данными');
  }
};

// Пытаемся подключиться к MongoDB, но продолжаем работу без неё
connectDB().catch(err => {
  console.log('Продолжаем работу с моковыми данными');
});

// Вспомогательные функции для генерации моковых данных
const mockUsers = {
  'user@example.com': {
    id: '1',
    name: 'Иван Петров',
    email: 'user@example.com',
    password: 'password', // В реальном приложении хранились бы хешированные пароли
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
  }
};

// API маршруты (заглушки)
app.get('/api/auth/me', (req, res) => {
  // Здесь должна быть проверка токена и получение пользователя из БД
  // Пока возвращаем моковые данные
  res.json({
    success: true,
    data: mockUsers['user@example.com']
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Проверяем наличие пользователя в моковых данных
  const user = mockUsers[email];
  if (user && password === 'password') {
    // Создаем копию пользователя без пароля и добавляем токен
    const { password, ...userData } = user;
    userData.token = 'fake-jwt-token-example-' + userData.id;
    
    res.json({
      success: true,
      data: userData
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Неверный email или пароль'
    });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role } = req.body;
  
  // Проверяем, что пользователь с таким email не существует
  if (mockUsers[email]) {
    return res.status(400).json({
      success: false,
      message: 'Пользователь с таким email уже существует'
    });
  }
  
  // Создаем нового пользователя
  const newUser = {
    id: String(Object.keys(mockUsers).length + 1),
    name,
    email,
    password, // В реальном приложении хранился бы хешированный пароль
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
  
  // "Сохраняем" пользователя в моковых данных
  mockUsers[email] = newUser;
  
  // Отправляем ответ без пароля и с токеном
  const { password: _, ...userData } = newUser;
  userData.token = 'fake-jwt-token-for-new-user-' + userData.id;
  
  res.json({
    success: true,
    data: userData
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
        members: 34,
        level: 3
      },
      {
        id: '2',
        name: 'Таежные Братья',
        slug: 'taezhnye-bratya',
        description: 'Клан любителей походов и выживания в тайге',
        logo: 'https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        members: 22,
        level: 2
      }
    ]
  });
});

// Тестовые данные для событий
app.get('/api/events', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        title: 'Сплав по реке Бердь',
        slug: 'splav-po-reke-berd',
        description: 'Двухдневный сплав по живописной реке с ночевкой на берегу',
        coverImage: 'https://images.unsplash.com/photo-1543747255-94c6ce4eb1d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        startDate: '2024-07-15T10:00:00Z',
        endDate: '2024-07-16T18:00:00Z',
        location: {
          city: 'Новосибирск',
          address: 'река Бердь, п. Маслянино'
        },
        organizer: 'Сибирские Волки',
        category: ['активный отдых', 'сплав', 'природа'],
        participants: 12
      },
      {
        id: '2',
        title: 'Фестиваль этнической музыки',
        slug: 'festival-etnicheskoy-muziki',
        description: 'Большой фестиваль с участием этнических коллективов Сибири',
        coverImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        startDate: '2024-08-05T16:00:00Z',
        endDate: '2024-08-05T23:00:00Z',
        location: {
          city: 'Новосибирск',
          address: 'Парк культуры и отдыха "Заельцовский"'
        },
        organizer: 'Администрация города',
        category: ['музыка', 'фестиваль', 'культура'],
        participants: 45
      }
    ]
  });
});

// Сервируем статические файлы клиента в prod-режиме
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});

// Обработка ошибок при завершении работы
process.on('SIGINT', async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    console.log('Соединение с MongoDB закрыто.');
  }
  console.log('Сервер успешно завершил работу');
  process.exit(0);
}); 