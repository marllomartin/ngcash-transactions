import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const { createTransaction } = TransactionController;
const { authToken } = AuthMiddleware;

const router = Router();

// Create Transaction
router.post('/transaction', authToken, createTransaction);

export default router;
