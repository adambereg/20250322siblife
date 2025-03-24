import Clan from '../../models/Clan.js';
import User from '../../models/User.js';
import mongoose from 'mongoose';
import { uploadFile } from '../../utils/fileUpload.js';

// @desc    Создать новый клан
// @route   POST /api/clans
// @access  Private (только PRO-пользователи)
export const createClan = async (req, res) => {
  try {
    const { name, description, type, tags } = req.body;
    
    // Проверяем, является ли пользователь PRO-участником
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
    
    // Проверяем, есть ли файл логотипа
    let logoPath = null;
    if (req.files && req.files.logo) {
      logoPath = await uploadFile(req.files.logo, 'clan-logos');
    }
    
    // Создаем новый клан
    const clan = new Clan({
      name,
      description,
      type: type || 'open',
      logo: logoPath,
      leader: req.user.id,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });
    
    // Добавляем лидера как первого участника
    clan.members.push({
      user: req.user.id,
      role: 'leader',
      joinedAt: new Date()
    });
    
    // Добавляем запись в активность
    clan.addActivity({
      type: 'post',
      title: 'Клан создан',
      content: `Клан "${name}" был создан`,
      author: req.user.id,
      createdAt: new Date()
    });
    
    // Сохраняем клан
    await clan.save();
    
    // Возвращаем ответ с созданным кланом
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
};

// @desc    Получить все кланы с фильтрацией и пагинацией
// @route   GET /api/clans
// @access  Public
export const getClans = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    
    // Фильтры
    const filter = { status: 'active' };
    
    // Поиск по имени
    if (req.query.search) {
      filter.name = { $regex: req.query.search, $options: 'i' };
    }
    
    // Фильтр по типу
    if (req.query.type) {
      filter.type = req.query.type;
    }
    
    // Фильтр по тегам
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
      // По умолчанию сортируем по рейтингу (по убыванию)
      sort.rating = -1;
    }
    
    // Получаем кланы
    const clans = await Clan.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('leader', 'name avatar role')
      .populate('members.user', 'name avatar role');
    
    // Получаем общее количество кланов для пагинации
    const total = await Clan.countDocuments(filter);
    
    // Возвращаем ответ
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
};

// @desc    Получить клан по ID
// @route   GET /api/clans/:id
// @access  Public
export const getClanById = async (req, res) => {
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
    
    // Возвращаем ответ
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
};

// @desc    Обновить клан
// @route   PUT /api/clans/:id
// @access  Private (только лидер клана)
export const updateClan = async (req, res) => {
  try {
    let clan = await Clan.findById(req.params.id);
    
    if (!clan) {
      return res.status(404).json({
        success: false,
        message: 'Клан не найден'
      });
    }
    
    // Проверяем права доступа (только лидер может редактировать)
    if (!clan.isLeader(req.user.id) && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'У вас нет прав для редактирования этого клана'
      });
    }
    
    // Обновляем поля клана
    const { name, description, type, tags } = req.body;
    
    if (name) clan.name = name;
    if (description) clan.description = description;
    if (type) clan.type = type;
    if (tags) clan.tags = tags.split(',').map(tag => tag.trim());
    
    // Обрабатываем загрузку нового логотипа
    if (req.files && req.files.logo) {
      clan.logo = await uploadFile(req.files.logo, 'clan-logos');
    }
    
    // Добавляем запись в активность
    clan.addActivity({
      type: 'post',
      title: 'Клан обновлен',
      content: 'Информация о клане была обновлена',
      author: req.user.id,
      createdAt: new Date()
    });
    
    // Сохраняем обновленный клан
    await clan.save();
    
    // Возвращаем ответ
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
};

// @desc    Удалить клан
// @route   DELETE /api/clans/:id
// @access  Private (только лидер клана или админ)
export const deleteClan = async (req, res) => {
  try {
    const clan = await Clan.findById(req.params.id);
    
    if (!clan) {
      return res.status(404).json({
        success: false,
        message: 'Клан не найден'
      });
    }
    
    // Проверяем права доступа
    if (!clan.isLeader(req.user.id) && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'У вас нет прав для удаления этого клана'
      });
    }
    
    // Вместо полного удаления, меняем статус на 'archived'
    clan.status = 'archived';
    await clan.save();
    
    // Возвращаем ответ
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
};

// @desc    Вступить в клан
// @route   POST /api/clans/:id/join
// @access  Private
export const joinClan = async (req, res) => {
  try {
    const clan = await Clan.findById(req.params.id);
    
    if (!clan) {
      return res.status(404).json({
        success: false,
        message: 'Клан не найден'
      });
    }
    
    // Проверяем, не является ли пользователь уже членом клана
    if (clan.isMember(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Вы уже являетесь членом этого клана'
      });
    }
    
    // Проверяем тип клана
    if (clan.type === 'closed') {
      // Проверяем, нет ли уже заявки на вступление
      const existingRequest = clan.membershipRequests.find(
        request => request.user.toString() === req.user.id && request.status === 'pending'
      );
      
      if (existingRequest) {
        return res.status(400).json({
          success: false,
          message: 'Вы уже отправили заявку на вступление в этот клан'
        });
      }
      
      // Добавляем заявку на вступление
      clan.membershipRequests.push({
        user: req.user.id,
        status: 'pending',
        message: req.body.message || '',
        requestedAt: new Date()
      });
      
      await clan.save();
      
      return res.status(200).json({
        success: true,
        message: 'Заявка на вступление в клан отправлена'
      });
    } else {
      // Открытый клан - сразу добавляем пользователя
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
};

// @desc    Обработать заявку на вступление в клан
// @route   PUT /api/clans/:id/requests/:requestId
// @access  Private (только лидер клана)
export const processMembershipRequest = async (req, res) => {
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
    
    // Проверяем права доступа
    if (!clan.isLeader(req.user.id) && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'У вас нет прав для обработки заявок в этот клан'
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
      // Добавляем пользователя в члены клана
      clan.addMember(request.user);
      
      // Добавляем активность
      clan.addActivity({
        type: 'member_joined',
        title: 'Новый участник',
        content: 'В клан вступил новый участник',
        author: request.user,
        createdAt: new Date()
      });
    }
    
    // Обновляем статус заявки
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
};

// @desc    Выйти из клана
// @route   DELETE /api/clans/:id/leave
// @access  Private
export const leaveClan = async (req, res) => {
  try {
    const clan = await Clan.findById(req.params.id);
    
    if (!clan) {
      return res.status(404).json({
        success: false,
        message: 'Клан не найден'
      });
    }
    
    // Проверяем, является ли пользователь членом клана
    if (!clan.isMember(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Вы не являетесь членом этого клана'
      });
    }
    
    // Проверяем, не является ли пользователь лидером клана
    if (clan.isLeader(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Лидер не может выйти из клана. Сначала передайте лидерство другому участнику'
      });
    }
    
    // Удаляем пользователя из списка участников
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
};

// @desc    Добавить пост в ленту активности клана
// @route   POST /api/clans/:id/posts
// @access  Private (только участники клана)
export const addClanPost = async (req, res) => {
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
    
    // Проверяем, является ли пользователь членом клана
    if (!clan.isMember(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Только участники клана могут добавлять посты'
      });
    }
    
    // Добавляем пост в активность
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
};

// @desc    Добавить комментарий к активности клана
// @route   POST /api/clans/:id/activities/:activityId/comments
// @access  Private (только участники клана)
export const addCommentToActivity = async (req, res) => {
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
    
    // Проверяем, является ли пользователь членом клана
    if (!clan.isMember(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Только участники клана могут добавлять комментарии'
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
};

// @desc    Передать лидерство в клане
// @route   PUT /api/clans/:id/transfer-leadership
// @access  Private (только лидер клана)
export const transferLeadership = async (req, res) => {
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
    
    // Проверяем права доступа
    if (!clan.isLeader(req.user.id) && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Только лидер может передать лидерство'
      });
    }
    
    // Проверяем, существует ли участник с таким ID
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
    
    // Обновляем роли участников
    clan.members.forEach(member => {
      if (member.user.toString() === newLeaderId) {
        member.role = 'leader';
      } else if (member.user.toString() === req.user.id) {
        member.role = 'member';
      }
    });
    
    // Добавляем активность
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
}; 