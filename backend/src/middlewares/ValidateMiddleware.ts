import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

class ValidateMiddleware {
  static async validateUser(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
    }

    if (username.length < 3) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Username must be at least three characters long' });
    }

    if (password.length < 8) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Password must be at least eight characters long' });
    }

    if (password.search(/[A-Z]/) < 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Password needs at least one uppercase letter' });
    }

    next();
  };

  static async validateTransaction(req: Request, res: Response, next: NextFunction) {
    const { debitedAccountId, creditedAccountId } = req.body;

    if (debitedAccountId === creditedAccountId) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid transaction: cannot send funds to same account' });
    }

    next();
  };
}

export default ValidateMiddleware;
