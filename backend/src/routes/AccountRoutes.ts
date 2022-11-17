import { Router } from 'express';
import AccountController from '../controllers/AccountController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const { getAccountBalance } = AccountController;
const { authToken } = AuthMiddleware;

const router = Router();

// Get Account Balance
router.get('/balance/:id', authToken, getAccountBalance);

export default router;
