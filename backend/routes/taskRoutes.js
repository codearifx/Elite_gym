import express from 'express';
import { getDailyTasks, markTaskComplete } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getDailyTasks);
router.route('/complete').post(protect, markTaskComplete);

export default router;
