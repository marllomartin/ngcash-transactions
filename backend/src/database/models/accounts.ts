import { DataTypes, Model } from 'sequelize';
import db from '.';

class Account extends Model {
  public id!: number;
  public balance!: number;
  insertId: any;
}

Account.init({
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    allowNull: false,
    type: DataTypes.DECIMAL(9, 2),
  }
}, {
  sequelize: db,
  modelName: 'Account',
  timestamps: false,
});

export default Account;
