import { Sequelize } from 'sequelize';
import { initUser } from './Models/User';

const sequelize = new Sequelize('Nodejs','postgres','Tiwana0111', {
    host: 'localhost',
    dialect: 'postgres',
});

const db = {
  User: initUser(sequelize),
};

export { sequelize, db };
