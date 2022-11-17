import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { decode, verify } from 'jsonwebtoken';
import UserModel from '../database/models/users';

const { JWT_SECRET } = process.env;

interface IJwtPayload {
  payload: any
}

class AuthMiddleware {
  static async authToken(req: Request, res: Response, next: NextFunction) {
    const { authorization: token } = req.headers;

    if (!token) return res.status(StatusCodes.FORBIDDEN).json({ message: 'A token is required' });

    try {
      const secret = String(JWT_SECRET);
      const decoded = decode(token, secret as any) as IJwtPayload;
      const findUser = await UserModel.findOne({ where: { username: decoded.payload as any } });

      if (!findUser) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });

      req.userId = findUser.id;

      next();
    } catch (Error: any) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: Error.message });
    }
  };
}

export default AuthMiddleware;
