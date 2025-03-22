import { Router } from 'express';
import { register, login, getMe, updateProfile } from '../controllers/userController';

const router = Router();

// Публичные маршруты
router.post('/register', register);
router.post('/login', login);

// Защищенные маршруты (будут требовать аутентификации)
router.get('/me', getMe);
router.put('/profile/:id', updateProfile);

export default router; 