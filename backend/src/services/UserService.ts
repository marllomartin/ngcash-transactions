import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';
import ILogin from '../interfaces/ILogin';
import UserModel from '../database/models/users';
import AccountModel from '../database/models/accounts';
import translateMd5 from '../utils/transateMd5';

const { JWT_SECRET } = process.env;

class UserService {
  static async register(obj: ILogin): Promise<Object> {
    const { username, password } = obj;
    const verify = await UserModel.findOne({ where: { username } });
    const translated = await translateMd5(password);

    if (verify) throw new Error('User already registered');

    const newAccount = await AccountModel.create({ balance: 100 });
    await UserModel.create({ username, password: translated, accountId: newAccount.id });

    const secret = String(JWT_SECRET);
    const token = sign({ payload: username }, secret, { expiresIn: '24h' });

    return { username, token };
  };

  static async login(obj: ILogin): Promise<Object> {
    const { username, password } = obj;
    const verify = await UserModel.findOne({ where: { username } });
    const translated = await translateMd5(password);

    if (!verify || verify.password !== translated) throw new Error('Incorrect username or password');

    const secret = String(JWT_SECRET);
    const token = sign({ payload: username }, secret, { expiresIn: '24h' });

    return { token };
  };
}

export default UserService;
