import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const { createTransaction, getUserTransactions } = TransactionController;
const { authToken, authTransaction } = AuthMiddleware;

const router = Router();

// Create Transaction
router.post('/transaction', authTransaction, createTransaction);

// Get User Transactions
router.get('/user/transactions', authToken, getUserTransactions);

export default router;
