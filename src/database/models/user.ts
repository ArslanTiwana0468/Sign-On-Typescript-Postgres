'use strict';
import { Model } from 'sequelize';

export interface UserAttributes {
  id: string;
  gid: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    id!: string;
    gid!: string;
    name!: string;
    email!: string;
    password!: string;
    phoneNumber!: number;
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
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
