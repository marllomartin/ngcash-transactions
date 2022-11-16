import { Router } from 'express';
import UserController from '../controllers/UserController';

const { register, login } = UserController;

const router = Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

export default router;
