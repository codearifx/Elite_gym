import express from 'express';
import { getUserProfile, processMockPayment, updateBasicInfo, getEliteSquad } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateBasicInfo);
router.route('/mock-payment').post(protect, processMockPayment);
router.route('/elite-squad').get(protect, getEliteSquad);

export default router;
