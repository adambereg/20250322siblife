const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Middleware для проверки авторизации
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Требуется авторизация'
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Ошибка при проверке токена:', error);
    res.status(401).json({
      success: false,
      message: 'Неверный токен авторизации'
    });
  }
};

// Функция загрузки файлов
const uploadFile = async (file, folder) => {
  const uploadsDir = path.join(__dirname, '../../uploads', folder);
  
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  
  const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
  const filePath = path.join(uploadsDir, fileName);
  
  // Переместить файл
  await file.mv(filePath);
  
  return `/uploads/${folder}/${fileName}`;
};

// Модель клана
const ClanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Название клана обязательно'],
    trim: true,
    maxlength: [100, 'Название клана не должно превышать 100 символов']
  },
  description: {
    type: String,
    required: [true, 'Описание клана обязательно'],
    trim: true,
    maxlength: [1000, 'Описание клана не должно превышать 1000 символов']
  },
  type: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
    required: true
  },
  logo: {
    type: String,
    default: null
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['leader', 'member'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  rating: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'archived'],
    default: 'active'
  },
  tags: [{
    type: String,
    trim: true
  }],
  activity: [{
    type: {
      type: String,
      enum: ['post', 'event', 'member_joined', 'route_created'],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    comments: [{
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      content: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }]
  }],
  membershipRequests: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    requestedAt: {
      type: Date,
      default: Date.now
    },
    message: {
      type: String
    }
  }],
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  routes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Индексы для повышения производительности
ClanSchema.index({ name: 1 });
ClanSchema.index({ leader: 1 });
ClanSchema.index({ 'members.user': 1 });
ClanSchema.index({ status: 1 });
ClanSchema.index({ rating: -1 });
ClanSchema.index({ tags: 1 });

// Методы модели
ClanSchema.methods.isMember = function(userId) {
  return this.members.some(member => member.user.toString() === userId.toString());
};

ClanSchema.methods.isLeader = function(userId) {
  return this.leader.toString() === userId.toString();
};

ClanSchema.methods.addMember = function(userId) {
  if (this.isMember(userId)) {
    return false;
  }
  
  this.members.push({
    user: userId,
    role: 'member',
    joinedAt: new Date()
  });
  
  return true;
};

ClanSchema.methods.addActivity = function(activityData) {
  this.activity.unshift(activityData);
  
  if (this.activity.length > 100) {
    this.activity = this.activity.slice(0, 100);
  }
  
  return true;
};

// Pre-хук для обновления даты изменения
ClanSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Создаем модель
const Clan = mongoose.model('Clan', ClanSchema);

// API маршруты

// Создание клана
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, type, tags } = req.body;
    
    // Проверка на роль PRO-участника
    const User = mongoose.model('User');
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Пользователь не найден'
      });
    }
    
    if (user.role !== 'pro' && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Только PRO-участники могут создавать кланы'
      });
    }
    
    // Загрузка логотипа
    let logoPath = null;
    if (req.files && req.files.logo) {
      logoPath = await uploadFile(req.files.logo, 'clan-logos');
    }
    
    // Создаем клан
    const clan = new Clan({
      name,
      description,
      type: type || 'open',
      logo: logoPath,
      leader: req.user.id,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });
    
    // Добавляем лидера как участника
    clan.members.push({
      user: req.user.id,
      role: 'leader',
      joinedAt: new Date()
    });
    
    // Добавляем активность
    clan.addActivity({
      type: 'post',
      title: 'Клан создан',
      content: `Клан "${name}" был создан`,
      author: req.user.id,
      createdAt: new Date()
    });
    
    await clan.save();
    
    res.status(201).json({
      success: true,
      message: 'Клан успешно создан',
      data: clan
    });
  } catch (error) {
    console.error('Ошибка при создании клана:', error);
    res.status(500).json({
      success: false,
      message: 'Не удалось создать клан',
      error: error.message
    });
  }
});

// Получение списка кланов
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    
    // Фильтры
    const filter = { status: 'active' };
    
    if (req.query.search) {
      filter.name = { $regex: req.query.search, $options: 'i' };
    }
    
    if (req.query.type) {
      filter.type = req.query.type;
    }
    
    if (req.query.tags) {
      const tags = req.query.tags.split(',').map(tag => tag.trim());
      filter.tags = { $in: tags };
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
      sort.rating = -1;
    }
    
    // Получаем кланы
    const clans = await Clan.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('leader', 'name avatar role')
      .populate('members.user', 'name avatar role');
    
    // Общее количество для пагинации
    const total = await Clan.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: {
        clans,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Ошибка при получении списка кланов:', error);
    res.status(500).json({
      success: false,
      message: 'Не удалось получить список кланов',
      error: error.message
    });
  }
});

// Получение клана по ID
router.get('/:id', async (req, res) => {
  try {
    const clan = await Clan.findById(req.params.id)
      .populate('leader', 'name avatar role')
      .populate('members.user', 'name avatar role')
      .populate({
        path: 'activity',
        populate: {
          path: 'author',
          select: 'name avatar role'
        }
      });
    
    if (!clan) {
      return res.status(404).json({
        success: false,
        message: 'Клан не найден'
      });
    }
    
    res.status(200).json({
      success: true,
      data: clan
    });
  } catch (error) {
    console.error('Ошибка при получении клана:', error);
    res.status(500).json({
      success: false,
      message: 'Не удалось получить клан',
      error: error.message
    });
  }
});

// Обновление клана
router.put('/:id', auth, async (req, res) => {
  try {
    let clan = await Clan.findById(req.params.id);
    
    if (!clan) {
      return res.status(404).json({
        success: false,
        message: 'Клан не найден'
      });
    }
    
    // Проверка прав доступа
    if (!clan.isLeader(req.user.id) && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'У вас нет прав для редактирования этого клана'
      });
    }
    
    // Обновляем поля
    const { name, description, type, tags } = req.body;
    
    if (name) clan.name = name;
    if (description) clan.description = description;
    if (type) clan.type = type;
    if (tags) clan.tags = tags.split(',').map(tag => tag.trim());
    
    // Загрузка нового логотипа
    if (req.files && req.files.logo) {
      clan.logo = await uploadFile(req.files.logo, 'clan-logos');
    }
    
    // Добавляем активность
    clan.addActivity({
      type: 'post',
      title: 'Клан обновлен',
      content: 'Информация о клане была обновлена',
      author: req.user.id,
      createdAt: new Date()
    });
    
    await clan.save();
    
    res.status(200).json({
      success: true,
      message: 'Клан успешно обновлен',
      data: clan
    });
  } catch (error) {
    console.error('Ошибка при обновлении клана:', error);
    res.status(500).json({
      success: false,
      message: 'Не удалось обновить клан',
      error: error.message
    });
  }
});

// Удаление клана (архивация)
router.delete('/:id', auth, async (req, res) => {
  try {
    const clan = await Clan.findById(req.params.id);
    
    if (!clan) {
      return res.status(404).json({
        success: false,
        message: 'Клан не найден'
      });
    }
    
    // Проверка прав доступа
    if (!clan.isLeader(req.user.id) && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'У вас нет прав для удаления этого клана'
      });
    }
    
    // Архивируем клан вместо удаления
    clan.status = 'archived';
    await clan.save();
    
    res.status(200).json({
      success: true,
      message: 'Клан успешно архивирован'
    });
  } catch (error) {
    console.error('Ошибка при удалении клана:', error);
    res.status(500).json({
      success: false,
      message: 'Не удалось удалить клан',
      error: error.message
    });
  }
});

// Вступление в клан
router.post('/:id/join', auth, async (req, res) => {
  try {
    const clan = await Clan.findById(req.params.id);
    
    if (!clan) {
      return res.status(404).json({
        success: false,
        message: 'Клан не найден'
      });
    }
    
    // Проверяем, не является ли пользователь уже членом
    if (clan.isMember(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Вы уже являетесь членом этого клана'
      });
    }
    
    // Проверяем тип клана
    if (clan.type === 'closed') {
      // Проверяем наличие заявки
      const existingRequest = clan.membershipRequests.find(
        request => request.user.toString() === req.user.id && request.status === 'pending'
      );
      
      if (existingRequest) {
        return res.status(400).json({
          success: false,
          message: 'Вы уже отправили заявку на вступление'
        });
      }
      
      // Добавляем заявку
      clan.membershipRequests.push({
        user: req.user.id,
        status: 'pending',
        message: req.body.message || '',
        requestedAt: new Date()
      });
      
      await clan.save();
      
      return res.status(200).json({
        success: true,
        message: 'Заявка на вступление отправлена'
      });
    } else {
      // Открытый клан - сразу добавляем
      clan.addMember(req.user.id);
      
      // Добавляем активность
      clan.addActivity({
        type: 'member_joined',
        title: 'Новый участник',
        content: 'В клан вступил новый участник',
        author: req.user.id,
        createdAt: new Date()
      });
      
      await clan.save();
      
      return res.status(200).json({
        success: true,
        message: 'Вы успешно вступили в клан'
      });
    }
  } catch (error) {
    console.error('Ошибка при вступлении в клан:', error);
    res.status(500).json({
      success: false,
      message: 'Не удалось выполнить операцию',
      error: error.message
    });
  }
});

// Обработка заявок на вступление
router.put('/:id/requests/:requestId', auth, async (req, res) => {
  try {
    const { id, requestId } = req.params;
    const { status } = req.body;
    
    if (!status || !['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Некорректный статус заявки'
      });
    }
    
    const clan = await Clan.findById(id);
    
    if (!clan) {
      return res.status(404).json({
        success: false,
        message: 'Клан не найден'
      });
    }
    
    // Проверка прав доступа
    if (!clan.isLeader(req.user.id) && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'У вас нет прав для обработки заявок'
      });
    }
    
    // Находим заявку
    const requestIndex = clan.membershipRequests.findIndex(
      request => request._id.toString() === requestId
    );
    
    if (requestIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Заявка не найдена'
      });
    }
    
    const request = clan.membershipRequests[requestIndex];
    
    // Обрабатываем заявку
    if (status === 'approved') {
      clan.addMember(request.user);
      
      clan.addActivity({
        type: 'member_joined',
        title: 'Новый участник',
        content: 'В клан вступил новый участник',
        author: request.user,
        createdAt: new Date()
      });
    }
    
    clan.membershipRequests[requestIndex].status = status;
    
    await clan.save();
    
    res.status(200).json({
      success: true,
      message: status === 'approved' ? 'Пользователь принят в клан' : 'Заявка отклонена'
    });
  } catch (error) {
    console.error('Ошибка при обработке заявки:', error);
    res.status(500).json({
      success: false,
      message: 'Не удалось обработать заявку',
      error: error.message
    });
  }
});

// Выход из клана
router.delete('/:id/leave', auth, async (req, res) => {
  try {
    const clan = await Clan.findById(req.params.id);
    
    if (!clan) {
      return res.status(404).json({
        success: false,
        message: 'Клан не найден'
      });
    }
    
    // Проверяем членство
    if (!clan.isMember(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Вы не являетесь членом этого клана'
      });
    }
    
    // Проверяем, не лидер ли это
    if (clan.isLeader(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Лидер не может выйти из клана. Сначала передайте лидерство'
      });
    }
    
    // Удаляем из членов
    clan.members = clan.members.filter(
      member => member.user.toString() !== req.user.id
    );
    
    await clan.save();
    
    res.status(200).json({
      success: true,
      message: 'Вы успешно вышли из клана'
    });
  } catch (error) {
    console.error('Ошибка при выходе из клана:', error);
    res.status(500).json({
      success: false,
      message: 'Не удалось выйти из клана',
      error: error.message
    });
  }
});

// Добавление поста в ленту клана
router.post('/:id/posts', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Заголовок и содержание обязательны'
      });
    }
    
    const clan = await Clan.findById(req.params.id);
    
    if (!clan) {
      return res.status(404).json({
        success: false,
        message: 'Клан не найден'
      });
    }
    
    // Проверяем членство
    if (!clan.isMember(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Только участники клана могут добавлять посты'
      });
    }
    
    // Добавляем пост
    clan.addActivity({
      type: 'post',
      title,
      content,
      author: req.user.id,
      createdAt: new Date()
    });
    
    await clan.save();
    
    res.status(201).json({
      success: true,
      message: 'Пост успешно добавлен'
    });
  } catch (error) {
    console.error('Ошибка при добавлении поста:', error);
    res.status(500).json({
      success: false,
      message: 'Не удалось добавить пост',
      error: error.message
    });
  }
});

// Добавление комментария к активности
router.post('/:id/activities/:activityId/comments', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const { id, activityId } = req.params;
    
    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Содержание комментария обязательно'
      });
    }
    
    const clan = await Clan.findById(id);
    
    if (!clan) {
      return res.status(404).json({
        success: false,
        message: 'Клан не найден'
      });
    }
    
    // Проверяем членство
    if (!clan.isMember(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Только участники клана могут комментировать'
      });
    }
    
    // Находим активность
    const activityIndex = clan.activity.findIndex(
      activity => activity._id.toString() === activityId
    );
    
    if (activityIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Активность не найдена'
      });
    }
    
    // Добавляем комментарий
    clan.activity[activityIndex].comments.push({
      author: req.user.id,
      content,
      createdAt: new Date()
    });
    
    await clan.save();
    
    res.status(201).json({
      success: true,
      message: 'Комментарий успешно добавлен'
    });
  } catch (error) {
    console.error('Ошибка при добавлении комментария:', error);
    res.status(500).json({
      success: false,
      message: 'Не удалось добавить комментарий',
      error: error.message
    });
  }
});

// Передача лидерства
router.put('/:id/transfer-leadership', auth, async (req, res) => {
  try {
    const { newLeaderId } = req.body;
    
    if (!newLeaderId) {
      return res.status(400).json({
        success: false,
        message: 'ID нового лидера обязателен'
      });
    }
    
    const clan = await Clan.findById(req.params.id);
    
    if (!clan) {
      return res.status(404).json({
        success: false,
        message: 'Клан не найден'
      });
    }
    
    // Проверка прав доступа
    if (!clan.isLeader(req.user.id) && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Только лидер может передать лидерство'
      });
    }
    
    // Проверяем нового лидера
    const newLeaderMember = clan.members.find(
      member => member.user.toString() === newLeaderId
    );
    
    if (!newLeaderMember) {
      return res.status(404).json({
        success: false,
        message: 'Пользователь не является членом клана'
      });
    }
    
    // Передаем лидерство
    clan.leader = newLeaderId;
    
    // Обновляем роли
    clan.members.forEach(member => {
      if (member.user.toString() === newLeaderId) {
        member.role = 'leader';
      } else if (member.user.toString() === req.user.id) {
        member.role = 'member';
      }
    });
    
    // Активность
    clan.addActivity({
      type: 'post',
      title: 'Смена лидера',
      content: 'В клане сменился лидер',
      author: req.user.id,
      createdAt: new Date()
    });
    
    await clan.save();
    
    res.status(200).json({
      success: true,
      message: 'Лидерство успешно передано'
    });
  } catch (error) {
    console.error('Ошибка при передаче лидерства:', error);
    res.status(500).json({
      success: false,
      message: 'Не удалось передать лидерство',
      error: error.message
    });
  }
});

module.exports = router; 