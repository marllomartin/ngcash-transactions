import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const { createTransaction, getUserTransactions } = TransactionController;
const { authToken } = AuthMiddleware;

const router = Router();

// Create Transaction
router.post('/transaction', authToken, createTransaction);

// Get User Transactions
router.get('/user/transactions', authToken, getUserTransactions );

export default router;
