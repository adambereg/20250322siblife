import { Request, Response } from 'express';
import Event from '../../models/Event.js';
import mongoose from 'mongoose';
import slugify from 'slugify';

// Интерфейс для модели Event
interface IEvent {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: string;
  image: string;
  gallery?: string[];
  dateStart: Date;
  dateEnd: Date;
  price: number;
  capacity: number;
  participants: number;
  location: {
    address: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  creator: mongoose.Types.ObjectId;
  clan?: mongoose.Types.ObjectId;
  isPublished: boolean;
  isFeatured: boolean;
  tags: string[];
  requiresApproval: boolean;
  attendees: Array<{
    user: mongoose.Types.ObjectId;
    status: 'pending' | 'approved' | 'declined';
    joinedAt: Date;
  }>;
  averageRating?: number;
  viewCount?: number;
  save: () => Promise<IEvent>;
}

// Интерфейс для параметров фильтрации событий
interface EventFilter {
  category?: string;
  'location.city'?: string;
  dateStart?: { $gte: Date };
  dateEnd?: { $lte: Date };
  price?: { $gte?: number; $lte?: number };
  $text?: { $search: string };
  isPublished?: boolean;
}

// Получение всех событий с фильтрацией
export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      category, 
      city, 
      dateStart, 
      dateEnd, 
      priceMin, 
      priceMax,
      search,
      limit = 10,
      page = 1
    } = req.query;

    // Построение фильтра
    const filter: EventFilter = {};
    
    if (category) filter.category = category as string;
    if (city) filter['location.city'] = city as string;
    if (dateStart) filter.dateStart = { $gte: new Date(dateStart as string) };
    if (dateEnd) filter.dateEnd = { $lte: new Date(dateEnd as string) };
    
    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = Number(priceMin);
      if (priceMax) filter.price.$lte = Number(priceMax);
    }
    
    // Полнотекстовый поиск
    if (search) {
      filter.$text = { $search: search as string };
    }

    // По умолчанию показываем только опубликованные события
    filter.isPublished = true;

    // Получение общего количества подходящих событий
    const total = await Event.countDocuments(filter);
    
    // Пагинация
    const skip = (Number(page) - 1) * Number(limit);
    
    // Получение событий с пагинацией и сортировкой
    const events = await Event.find(filter)
      .sort({ dateStart: 1 }) // Сортировка по дате начала (ближайшие сначала)
      .skip(skip)
      .limit(Number(limit))
      .populate('creator', 'name avatar');

    res.json({
      success: true,
      data: events,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Ошибка при получении событий:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера'
    });
  }
};

// Получение события по слагу
export const getEventBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    
    const event = await Event.findOne({ slug })
      .populate('creator', 'name avatar')
      .populate('attendees.user', 'name avatar');
    
    if (!event) {
      res.status(404).json({
        success: false,
        message: 'Событие не найдено'
      });
      return;
    }
    
    // Увеличиваем счетчик просмотров (если есть такое поле)
    if ('viewCount' in event) {
      (event as any).viewCount = ((event as any).viewCount || 0) + 1;
      await event.save();
    }

    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Ошибка при получении события:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера'
    });
  }
};

// Создание нового события
export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      category,
      image,
      dateStart,
      dateEnd,
      location,
      price,
      capacity,
      tags
    } = req.body;
    
    // В реальном приложении ID пользователя будет получен из middleware аутентификации
    // const creatorId = req.user.id;
    
    // Временно используем ID из параметров запроса
    const creatorId = req.body.creatorId || req.query.creatorId;
    
    if (!creatorId) {
      res.status(400).json({
        success: false,
        message: 'ID создателя не указан'
      });
      return;
    }
    
    // Генерируем слаг из названия
    const slug = slugify(title, {
      lower: true,
      strict: true,
      locale: 'ru'
    });
    
    // Проверяем уникальность слага
    const existingEvent = await Event.findOne({ slug });
    if (existingEvent) {
      res.status(400).json({
        success: false,
        message: 'Событие с таким названием уже существует'
      });
      return;
    }
    
    // Создаем новое событие
    const event = new Event({
      title,
      slug,
      description,
      category,
      image,
      dateStart,
      dateEnd,
      location,
      price: price || 0,
      capacity,
      creator: new mongoose.Types.ObjectId(creatorId as string),
      tags: tags || []
    });
    
    // Сохраняем событие
    await event.save();
    
    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Ошибка при создании события:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера'
    });
  }
};

// Обновление события
export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Проверяем существование события
    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({
        success: false,
        message: 'Событие не найдено'
      });
      return;
    }
    
    // В реальном приложении здесь должна быть проверка прав доступа,
    // что текущий пользователь - создатель события или админ
    
    // Если обновляется название, генерируем новый слаг
    if (updateData.title) {
      updateData.slug = slugify(updateData.title, {
        lower: true,
        strict: true,
        locale: 'ru'
      });
      
      // Проверяем уникальность нового слага
      const existingEvent = await Event.findOne({
        slug: updateData.slug,
        _id: { $ne: id }
      });
      
      if (existingEvent) {
        res.status(400).json({
          success: false,
          message: 'Событие с таким названием уже существует'
        });
        return;
      }
    }
    
    // Обновляем событие
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('creator', 'name avatar');
    
    res.json({
      success: true,
      data: updatedEvent
    });
  } catch (error) {
    console.error('Ошибка при обновлении события:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера'
    });
  }
};

// Регистрация на событие
export const registerForEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    // В реальном приложении ID пользователя будет получен из middleware аутентификации
    // const userId = req.user.id;
    const userId = req.body.userId || req.query.userId;
    
    if (!userId) {
      res.status(400).json({
        success: false,
        message: 'ID пользователя не указан'
      });
      return;
    }
    
    // Находим событие
    const event = await Event.findById(id) as unknown as IEvent;
    
    if (!event) {
      res.status(404).json({
        success: false,
        message: 'Событие не найдено'
      });
      return;
    }
    
    // Проверяем, не зарегистрирован ли пользователь уже
    const isRegistered = event.attendees.some(
      (attendee) => attendee.user.toString() === userId
    );
    
    if (isRegistered) {
      res.status(400).json({
        success: false,
        message: 'Вы уже зарегистрированы на это событие'
      });
      return;
    }
    
    // Проверяем, есть ли свободные места
    if (event.attendees.length >= event.capacity) {
      res.status(400).json({
        success: false,
        message: 'На событии нет свободных мест'
      });
      return;
    }
    
    // Добавляем пользователя к участникам
    event.attendees.push({
      user: new mongoose.Types.ObjectId(userId as string),
      status: event.requiresApproval ? 'pending' : 'approved',
      joinedAt: new Date()
    });
    
    await event.save();
    
    res.json({
      success: true,
      message: event.requiresApproval
        ? 'Заявка на участие отправлена'
        : 'Вы успешно зарегистрированы на событие',
      data: {
        status: event.requiresApproval ? 'pending' : 'approved'
      }
    });
  } catch (error) {
    console.error('Ошибка при регистрации на событие:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера'
    });
  }
};

// Добавление отзыва к событию
export const addReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    
    // В реальном приложении ID пользователя будет получен из middleware аутентификации
    // const userId = req.user.id;
    const userId = req.body.userId || req.query.userId;
    
    if (!userId) {
      res.status(400).json({
        success: false,
        message: 'ID пользователя не указан'
      });
      return;
    }
    
    // Проверяем корректность рейтинга
    if (rating < 1 || rating > 5) {
      res.status(400).json({
        success: false,
        message: 'Рейтинг должен быть от 1 до 5'
      });
      return;
    }
    
    // Находим событие
    const event = await Event.findById(id) as unknown as IEvent;
    
    if (!event) {
      res.status(404).json({
        success: false,
        message: 'Событие не найдено'
      });
      return;
    }
    
    // Проверяем, что событие уже прошло
    if (new Date(event.dateEnd) > new Date()) {
      res.status(400).json({
        success: false,
        message: 'Отзывы можно оставлять только после завершения события'
      });
      return;
    }
    
    // В этом примере мы напрямую обновляем рейтинг события,
    // хотя в реальном приложении лучше иметь отдельную модель для отзывов
    
    // Обновляем средний рейтинг (упрощенная реализация)
    // В реальном приложении следует хранить все отзывы и вычислять средний рейтинг на их основе
    if (!event.averageRating) {
      event.averageRating = rating;
    } else {
      // Простое среднее значение (для упрощения)
      // В продакшне нужна более сложная логика с учетом всех отзывов
      event.averageRating = (event.averageRating + rating) / 2;
    }
    
    await event.save();
    
    res.json({
      success: true,
      message: 'Отзыв успешно добавлен',
      data: {
        rating: event.averageRating
      }
    });
  } catch (error) {
    console.error('Ошибка при добавлении отзыва:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера'
    });
  }
}; 