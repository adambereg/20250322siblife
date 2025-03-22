import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';

// Генерация JWT токена
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE
  });
};

// @desc    Регистрация пользователя
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Проверка, существует ли пользователь
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Пользователь с таким email уже существует'
      });
    }
    
    // Создание нового пользователя
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'participant'
    });
    
    if (user) {
      // Генерация токена
      const token = generateToken(user._id);
      
      res.status(201).json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          joinDate: user.joinDate,
          tokens: user.tokens,
          friends: user.friends,
          followers: user.followers,
          stats: user.stats,
          token
        }
      });
    } else {
      throw new Error('Неверные данные пользователя');
    }
  } catch (error) {
    console.error('Ошибка регистрации:', error.message);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Аутентификация пользователя
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Поиск пользователя по email с включением поля password
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Неверный email или пароль'
      });
    }
    
    // Проверка пароля
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Неверный email или пароль'
      });
    }
    
    // Генерация токена
    const token = generateToken(user._id);
    
    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        joinDate: user.joinDate,
        tokens: user.tokens,
        friends: user.friends,
        followers: user.followers,
        stats: user.stats,
        token
      }
    });
  } catch (error) {
    console.error('Ошибка входа:', error.message);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при попытке входа'
    });
  }
});

// @desc    Получение профиля текущего пользователя
// @route   GET /api/auth/me
// @access  Private
router.get('/me', async (req, res) => {
  try {
    // Извлечение токена из заголовка
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Не авторизован, токен отсутствует'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
      // Верификация токена
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Поиск пользователя по id из токена
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Пользователь не найден'
        });
      }
      
      res.json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          joinDate: user.joinDate,
          tokens: user.tokens,
          friends: user.friends,
          followers: user.followers,
          stats: user.stats
        }
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Не авторизован, недействительный токен'
      });
    }
  } catch (error) {
    console.error('Ошибка получения профиля:', error.message);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении профиля'
    });
  }
});

export default router; 