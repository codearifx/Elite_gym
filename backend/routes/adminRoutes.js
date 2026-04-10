import express from 'express';
import { getUsers, approveUser, markPaymentPaid } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/users').get(protect, admin, getUsers);
router.route('/user/:id/approve').put(protect, admin, approveUser);
router.route('/user/:id/payment').put(protect, admin, markPaymentPaid);

export default router;
