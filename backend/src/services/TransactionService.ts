import { Sequelize } from 'sequelize';
import ITransaction from '../interfaces/ITransaction';
import AccountModel from '../database/models/accounts'
import TransactionModel from '../database/models/transactions';

class TransactionService {
  static async createTransaction(obj: ITransaction): Promise<any> {
    const { debitedAccountId, creditedAccountId, value } = obj;

    if (debitedAccountId === creditedAccountId) {
      throw new Error('Invalid transaction');
    }

    const debitAccount = await AccountModel
      .update({ balance: Sequelize.literal(`balance - ${value}`) }, { where: { id: debitedAccountId } });
    const creditAccount = await AccountModel
      .update({ balance: Sequelize.literal(`balance + ${value}`) }, { where: { id: creditedAccountId } });

    if (debitAccount && creditAccount) {
      return await TransactionModel.create({ debitedAccountId, creditedAccountId, value });
    }
  };
}

export default TransactionService;
