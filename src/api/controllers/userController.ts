import { Request, Response } from 'express';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Функция для создания JWT токена
const generateToken = (userId: string): string => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'default_secret_key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

// Регистрация пользователя
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    // Проверяем, существует ли пользователь с таким email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'Пользователь с таким email уже существует'
      });
      return;
    }

    // Хешируем пароль
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Создаем нового пользователя
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'participant'
    });

    // Сохраняем пользователя
    await user.save();

    // Генерируем JWT токен
    const token = generateToken(user._id.toString());

    // Отправляем ответ без пароля и с токеном
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
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера'
    });
  }
};

// Авторизация пользователя
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Проверяем наличие email и пароля
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Пожалуйста, введите email и пароль'
      });
      return;
    }

    // Находим пользователя по email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Неверный email или пароль'
      });
      return;
    }

    // Проверяем пароль
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Неверный email или пароль'
      });
      return;
    }

    // Генерируем JWT токен
    const token = generateToken(user._id.toString());

    // Отправляем ответ
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
    console.error('Ошибка при входе:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера'
    });
  }
};

// Получение профиля текущего пользователя
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    // В реальном приложении ID пользователя будет получен из middleware аутентификации
    // const userId = req.user.id;
    
    // Временно используем ID из параметров запроса
    const userId = req.params.id || req.query.id;
    
    if (!userId) {
      res.status(400).json({
        success: false,
        message: 'ID пользователя не указан'
      });
      return;
    }

    // Находим пользователя по ID без возврата пароля
    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Пользователь не найден'
      });
      return;
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Ошибка при получении профиля:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера'
    });
  }
};

// Обновление профиля пользователя
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // В реальном приложении ID пользователя будет получен из middleware аутентификации
    // const userId = req.user.id;
    
    // Временно используем ID из параметров запроса
    const userId = req.params.id;
    
    if (!userId) {
      res.status(400).json({
        success: false,
        message: 'ID пользователя не указан'
      });
      return;
    }

    // Проверяем существование пользователя
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Пользователь не найден'
      });
      return;
    }

    // Обновляемые поля
    const { name, avatar } = req.body;
    
    // Обновляем профиль
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, avatar },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера'
    });
  }
}; 