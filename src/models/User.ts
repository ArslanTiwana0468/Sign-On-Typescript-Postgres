import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
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
User.sync({ alter: true }).then(() => {
  console.log('User altered created');
});
export default User;
