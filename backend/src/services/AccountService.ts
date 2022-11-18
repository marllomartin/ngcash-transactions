import AccountModel from '../database/models/accounts';

class AccountService {
  static async getAccountBalance(id: string): Promise<object> {
    const account = await AccountModel.findOne({ where: { id } });

    if (!account) throw new Error('No registered account found.');

    return { balance: account.balance };
  }
}

export default AccountService;
