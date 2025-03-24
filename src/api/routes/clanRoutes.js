import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  createClan,
  getClans,
  getClanById,
  updateClan,
  deleteClan,
  joinClan,
  processMembershipRequest,
  leaveClan,
  addClanPost,
  addCommentToActivity,
  transferLeadership
} from '../controllers/clanController.js';

const router = express.Router();

// Маршруты для работы с кланами
router.route('/')
  .post(protect, createClan)  // Создание клана (только авторизованные пользователи)
  .get(getClans);  // Получение списка кланов (публичный доступ)

router.route('/:id')
  .get(getClanById)  // Получение информации о клане (публичный доступ)
  .put(protect, updateClan)  // Обновление клана (только лидер)
  .delete(protect, deleteClan);  // Удаление клана (только лидер или админ)

// Маршруты для управления членством
router.post('/:id/join', protect, joinClan);  // Вступление в клан
router.put('/:id/requests/:requestId', protect, processMembershipRequest);  // Обработка заявок
router.delete('/:id/leave', protect, leaveClan);  // Выход из клана

// Маршруты для активности клана
router.post('/:id/posts', protect, addClanPost);  // Добавление поста
router.post('/:id/activities/:activityId/comments', protect, addCommentToActivity);  // Добавление комментария

// Маршрут для передачи лидерства
router.put('/:id/transfer-leadership', protect, transferLeadership);

export default router; 