import { Router } from 'express';
import Event from '../models/Event.js';

const router = Router();

// @desc    Получение всех событий
// @route   GET /api/events
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
      query['location.city'] = req.query.city;
    }
    
    // Фильтрация по датам
    if (req.query.dateFrom) {
      query.dateStart = { $gte: new Date(req.query.dateFrom) };
    }
    
    if (req.query.dateTo) {
      query.dateEnd = { $lte: new Date(req.query.dateTo) };
    }
    
    // Показывать только опубликованные события
    query.isPublished = true;
    
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
      // По умолчанию сортировка по дате начала
      sort.dateStart = 1;
    }
    
    // Пагинация
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Получение событий
    const events = await Event.find(query)
      .sort(sort)
      .skip(startIndex)
      .limit(limit)
      .populate({
        path: 'creator',
        select: 'name avatar'
      })
      .populate({
        path: 'clan',
        select: 'name logo'
      });
    
    // Получение общего количества событий для пагинации
    const total = await Event.countDocuments(query);
    
    res.json({
      success: true,
      count: events.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data: events
    });
  } catch (error) {
    console.error('Ошибка получения событий:', error.message);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении событий'
    });
  }
});

// @desc    Получение одного события по slug
// @route   GET /api/events/:slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug })
      .populate({
        path: 'creator',
        select: 'name avatar'
      })
      .populate({
        path: 'clan',
        select: 'name logo slug'
      });
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Событие не найдено'
      });
    }
    
    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Ошибка получения события:', error.message);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении события'
    });
  }
});

export default router; 