import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AccountService from '../services/AccountService';
import getErrorMessage from '../utils/getErrorMessage';

class UserController {
  static getAccountBalance = async (req: Request, res: Response) => {
    const userId = req.userId;
    const { id } = req.params;

    if (String(userId) != id) return res.status(StatusCodes.FORBIDDEN).send({ message: 'Unavailable' });

    try {
      const result = await AccountService.getAccountBalance(id);
      return res.status(StatusCodes.OK).json(result);
    } catch (Error) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: getErrorMessage(Error) });
    }
  };
}

export default UserController;
