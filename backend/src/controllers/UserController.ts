import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/UserService';
import getErrorMessage from '../utils/getErrorMessage';

class UserController {
  static register = async (req: Request, res: Response) => {
    try {
      const result = await UserService.register(req.body);
      return res.status(StatusCodes.CREATED).json(result);
    } catch (Error) {
      return res.status(StatusCodes.CONFLICT).send({ message: getErrorMessage(Error) });
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const result = await UserService.login(req.body);
      res.status(StatusCodes.OK).json(result);
    } catch (Error) {
      return res.status(StatusCodes.UNAUTHORIZED).send({ message: getErrorMessage(Error) });
    }
  };
}

export default UserController;
