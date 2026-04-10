import express from 'express';
import { getUserProfile, processMockPayment } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile').get(protect, getUserProfile);
router.route('/mock-payment').post(protect, processMockPayment);

export default router;
