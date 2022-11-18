import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { decode, verify } from 'jsonwebtoken';
import getErrorMessage from '../utils/getErrorMessage';
import UserModel from '../database/models/users';

const { JWT_SECRET } = process.env;

interface IJwtPayload {
  payload: object
}

class AuthMiddleware {
  static async authToken(req: Request, res: Response, next: NextFunction) {
    const { authorization: token } = req.headers;

    if (!token) return res.status(StatusCodes.FORBIDDEN).json({ message: 'A token is required' });

    try {
      const secret = String(JWT_SECRET);
      const verified = verify(token, secret);

      if (!verified) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });

      const decoded = decode(token, secret as never) as IJwtPayload;
      const findUser = await UserModel
        .findOne({ where: { username: decoded.payload as IJwtPayload } });

      req.userId = findUser?.id;

      next();
    } catch (Error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: getErrorMessage(Error) });
    }
  }
}

export default AuthMiddleware;
