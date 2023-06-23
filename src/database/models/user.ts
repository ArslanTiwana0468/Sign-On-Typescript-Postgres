'use strict';
import { DataTypes, Model } from 'sequelize';
import db from './index';
export interface UserAttributes {
  id: string;
  gid: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: number;
}

class User extends Model<UserAttributes> implements UserAttributes {
  id!: string;
  gid!: string;
  name!: string;
  email!: string;
  password!: string;
  phoneNumber!: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static associate(models: any) {
    User.belongsToMany(models.Project, {
      through: 'projectAssignment',
    });
  }
}
User.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true },
    gid: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
  },
  {
    sequelize: db.sequelize,
    modelName: 'User',
  }
);
export default User;
