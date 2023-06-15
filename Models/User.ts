import { DataTypes } from 'sequelize';
import sequelize from '../database';
const User = sequelize.define('user', {
  gid: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
});
User.sync().then(() => {
  console.log('User table created');
});
export default User;
