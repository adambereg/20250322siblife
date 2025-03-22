import { Router } from 'express';
import Clan from '../models/Clan.js';

const router = Router();

// @desc    Получение всех кланов
// @route   GET /api/clans
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Базовый запрос
    let query = {};
    
    // Фильтрация по категории
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Фильтрация по городу
    if (req.query.city) {
      query.city = req.query.city;
    }
    
    // Фильтрация по тегам
    if (req.query.tags) {
      const tags = req.query.tags.split(',');
      query.tags = { $in: tags };
    }
    
    // Показывать только публичные кланы
    query.isPublic = true;
    
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
      // По умолчанию сортировка по количеству участников
      sort.memberCount = -1;
    }
    
    // Пагинация
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Получение кланов
    const clans = await Clan.find(query)
      .sort(sort)
      .skip(startIndex)
      .limit(limit)
      .populate({
        path: 'founder',
        select: 'name avatar'
      });
    
    // Получение общего количества кланов для пагинации
    const total = await Clan.countDocuments(query);
    
    res.json({
      success: true,
      count: clans.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data: clans
    });
  } catch (error) {
    console.error('Ошибка получения кланов:', error.message);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении кланов'
    });
  }
});

// @desc    Получение одного клана по slug
// @route   GET /api/clans/:slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const clan = await Clan.findOne({ slug: req.params.slug })
      .populate({
        path: 'founder',
        select: 'name avatar'
      })
      .populate({
        path: 'members.user',
        select: 'name avatar'
      });
    
    if (!clan) {
      return res.status(404).json({
        success: false,
        message: 'Клан не найден'
      });
    }
    
    res.json({
      success: true,
      data: clan
    });
  } catch (error) {
    console.error('Ошибка получения клана:', error.message);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении клана'
    });
  }
});

export default router; 