import { Router } from 'express';
import User from '../models/User.js';

const router = Router();

// @desc    Получение публичного профиля пользователя по ID
// @route   GET /api/users/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-__v -updatedAt');
    
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
    console.error('Ошибка получения пользователя:', error.message);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении пользователя'
    });
  }
});

// @desc    Поиск пользователей
// @route   GET /api/users
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Базовый запрос
    let query = {};
    
    // Поиск по имени (частичное совпадение)
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: 'i' };
    }
    
    // Фильтрация по роли
    if (req.query.role) {
      query.role = req.query.role;
    }
    
    // Сортировка
    const sort = {};
    if (req.query.sort) {
      const sortFields = req.query.sort.split(',');
      
      sortFields.forEach(field => {
        if (field.startsWith('-')) {
          sort[field.substring(1)] = -1;
        } else {
          sort[field] = 1;
        }
      });
    } else {
      // По умолчанию сортировка по дате регистрации
      sort.joinDate = -1;
    }
    
    // Пагинация
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Получение пользователей
    const users = await User.find(query)
      .select('name role avatar joinDate tokens friends followers stats')
      .sort(sort)
      .skip(startIndex)
      .limit(limit);
    
    // Получение общего количества пользователей для пагинации
    const total = await User.countDocuments(query);
    
    res.json({
      success: true,
      count: users.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data: users
    });
  } catch (error) {
    console.error('Ошибка поиска пользователей:', error.message);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при поиске пользователей'
    });
  }
});

export default router; 