import { Router } from 'express';
import authRoutes from './auth.js';
import eventRoutes from './events.js';
import clanRoutes from './clans.js';
import userRoutes from './users.js';

const router = Router();

// Маршруты API
router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/clans', clanRoutes);
router.use('/users', userRoutes);

// Базовый маршрут API
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'SiberiaLife API v1.0',
    endpoints: [
      '/api/auth',
      '/api/events',
      '/api/clans',
      '/api/users'
    ]
  });
});

export default router; 