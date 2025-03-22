import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { connectDB } from './src/config/db.js';

// Для работы с __dirname в ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Загружаем переменные окружения
dotenv.config();

// Инициализируем Express
const app = express();
const PORT = process.env.PORT || 5173;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Подключаемся к MongoDB
connectDB();

// API маршруты (заглушки)
app.get('/api/auth/me', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      id: '1',
      name: 'Тестовый пользователь',
      email: 'test@example.com',
      role: 'participant',
      avatar: '',
      joinDate: new Date().toISOString(),
      tokens: 100,
      friends: 5,
      followers: 10,
      stats: {
        events: 2,
        reviews: 3,
        posts: 5
      }
    }
  });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  // В реальном приложении здесь будет проверка данных в БД
  if (email === 'user@example.com' && password === 'password') {
    res.json({
      success: true,
      data: {
        id: '1',
        name: 'Иван Петров',
        email: 'user@example.com',
        role: 'participant',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
        joinDate: new Date().toISOString(),
        tokens: 100,
        token: 'fake-jwt-token-example',
        friends: 5,
        followers: 10,
        stats: {
          events: 2,
          reviews: 3,
          posts: 5
        }
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Неверный email или пароль'
    });
  }
});

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  
  // В реальном приложении здесь будет сохранение в БД
  res.json({
    success: true,
    data: {
      id: '100',
      name,
      email,
      role,
      avatar: '',
      joinDate: new Date().toISOString(),
      tokens: 50,
      token: 'fake-jwt-token-for-new-user',
      friends: 0,
      followers: 0,
      stats: {
        events: 0,
        reviews: 0,
        posts: 0
      }
    }
  });
});

// Тестовые данные для кланов
app.get('/api/clans', (req: Request, res: Response) => {
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
  await mongoose.connection.close();
  console.log('Сервер успешно завершил работу');
  process.exit(0);
}); 