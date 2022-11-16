import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';
import ILogin from '../interfaces/ILogin';
import UserModel from '../database/models/users';
import AccountModel from '../database/models/accounts';


class UserService {
  static async register(obj: ILogin): Promise<Object> {
    const { username, password } = obj;
    const verify = await UserModel.findOne({ where: { username } });
    if (verify) throw new Error('User already registered');

    const newAccount = await AccountModel.create({ balance: 100 });
    await UserModel.create({ username, password, accountId: newAccount.id });

    const token = sign({ data: username }, 'secret', { expiresIn: '24h' });

    return { username, token };
  };

  static async login(obj: ILogin): Promise<Object> {
    const { username, password } = obj;
    const verify = await UserModel.findOne({ where: { username } });

    if (!verify) throw new Error('Incorrect email or password');

    const token = sign({ data: username }, 'secret', { expiresIn: '24h' });

    return { token };
  };
}

export default UserService;
