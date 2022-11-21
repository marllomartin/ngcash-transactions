import { Sequelize, Op } from 'sequelize';
import ITransaction from '../interfaces/ITransaction';
import AccountModel from '../database/models/accounts';
import UserModel from '../database/models/users';
import TransactionModel from '../database/models/transactions';

class TransactionService {
  // eslint-disable-next-line max-lines-per-function
  static async createTransaction(obj: ITransaction): Promise<object> {
    const { debitedAccountId, creditedAccountUsername, value } = obj;
    const userAccount = await AccountModel.findOne({ where: { id: debitedAccountId } });

    const creditedUserId = await UserModel
      .findOne({ where: { username: creditedAccountUsername } });
    const creditedAccount = await AccountModel
      .findOne({ where: { id: creditedUserId?.accountId } });

    const creditedAccountId = creditedAccount?.id;

    if (debitedAccountId === creditedAccountId) throw new Error('Cannot send funds to yourself.');

    if (userAccount) {
      if (userAccount.balance < value) throw new Error('Not enough funds');

      const debitAccount = await AccountModel
        .update({
          balance: Sequelize
            .literal(`balance - ${value}`),
        }, { where: { id: debitedAccountId } });
      const creditAccount = await AccountModel
        .update({
          balance: Sequelize
            .literal(`balance + ${value}`),
        }, { where: { id: creditedAccountId } });

      if (debitAccount && creditAccount) {
        const transaction = await TransactionModel
          .create({ debitedAccountId, creditedAccountId, value });
        return transaction;
      }
    }

    throw new Error('Unknown error');
  }

  static async getUserTransactions(id: number): Promise<object> {
    const users = await UserModel.findAll();
    const userTransactions = await TransactionModel
      .findAll({ where: { [Op.or]: [{ debitedAccountId: id }, { creditedAccountId: id }] } });

    const result = userTransactions.map(
      ({ debitedAccountId, creditedAccountId, value, createdAt }) => (
        {
          id,
          debitedAccountUsername: users
            .find((user) => user.dataValues.id === debitedAccountId)?.username,
          creditedAccountUsername: users
            .find((user) => user.dataValues.id === creditedAccountId)?.username,
          value,
          createdAt,
        }
      ),
    );

    return result;
  }
}

export default TransactionService;
