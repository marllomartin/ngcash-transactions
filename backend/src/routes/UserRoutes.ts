import { Router } from 'express';
import UserController from '../controllers/UserController';
import ValidateMiddleware from '../middlewares/ValidateMiddleware';

const { register, login } = UserController;
const { validateUser } = ValidateMiddleware;

const router = Router();

// Register
router.post('/register', validateUser, register);

// Login
router.post('/login', validateUser, login);

export default router;
