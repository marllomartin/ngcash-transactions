import { DataTypes, Model } from 'sequelize';
import db from '.';

class Transaction extends Model {
  public id!: number;
  public debitedAccountId!: number;
  public creditedAccountId!: number;
  public value!: number;
  public createdAt!: Date;
}

Transaction.init({
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  debitedAccountId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    }
  },
  creditedAccountId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    }
  },
  value: {
    allowNull: false,
    type: DataTypes.DECIMAL(9, 2),
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  }

}, {
  underscored: true,
  sequelize: db,
  modelName: 'Transaction',
  timestamps: false,
});

export default Transaction;
