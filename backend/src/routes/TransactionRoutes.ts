import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import ValidateMiddleware from '../middlewares/ValidateMiddleware';

const { createTransaction, getUserTransactions } = TransactionController;
const { authToken } = AuthMiddleware;
const { validateTransaction } = ValidateMiddleware;

const router = Router();

// Create Transaction
router.post('/transaction', authToken, validateTransaction, createTransaction);

// Get User Transactions
router.get('/user/transactions', authToken, getUserTransactions);

export default router;
