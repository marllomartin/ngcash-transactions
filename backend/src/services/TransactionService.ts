import { Sequelize, Op } from 'sequelize';
import ITransaction from '../interfaces/ITransaction';
import AccountModel from '../database/models/accounts';
import TransactionModel from '../database/models/transactions';

class TransactionService {
  static async createTransaction(obj: ITransaction): Promise<object> {
    const { debitedAccountId, creditedAccountId, value } = obj;
    const userAccount = await AccountModel.findOne({ where: { id: debitedAccountId } });

    if (userAccount) {
      if (userAccount.balance < value) throw new Error('Not enough funds');

      const debitAccount = await AccountModel
        .update({ balance: Sequelize
          .literal(`balance - ${value}`) }, { where: { id: debitedAccountId } });
      const creditAccount = await AccountModel
        .update({ balance: Sequelize
          .literal(`balance + ${value}`) }, { where: { id: creditedAccountId } });

      if (debitAccount && creditAccount) {
        const transaction = await TransactionModel
          .create({ debitedAccountId, creditedAccountId, value });
        return transaction;
      }
    }

    throw new Error('Unknown error');
  }

  static async getUserTransactions(id: number): Promise<object> {
    const transactions = await TransactionModel
      .findAll({ where: { [Op.or]: [{ debitedAccountId: id }, { creditedAccountId: id }] } });

    return transactions;
  }
}

export default TransactionService;
