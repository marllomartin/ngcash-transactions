import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TransactionService from '../services/TransactionService';
import getErrorMessage from '../utils/getErrorMessage';

class TransactionController {
  static createTransaction = async (req: Request, res: Response) => {
    const userId = req.userId;
    const { debitedAccountId } = req.body;

    if (String(userId) != debitedAccountId) return res.status(StatusCodes.FORBIDDEN).send({ message: 'Invalid transaction' });

    try {
      const result = await TransactionService.createTransaction(req.body);
      return res.status(StatusCodes.OK).json(result);
    } catch (Error) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: getErrorMessage(Error) });
    }
  };

  static getUserTransactions = async (req: Request, res: Response) => {
    try {
      const id = req.userId;
      const result = await TransactionService.getUserTransactions(id);
      return res.status(StatusCodes.OK).json(result);
    } catch (Error) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: getErrorMessage(Error) });
    }
  };
}

export default TransactionController;
