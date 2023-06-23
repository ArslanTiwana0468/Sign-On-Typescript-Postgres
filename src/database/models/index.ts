import { Pool } from 'pg';
import { Sequelize } from 'sequelize';
const dbDatabase: string = process.env.DB_DATABASE?.toString() || '';
const dbUsername: string = process.env.DB_USERNAME?.toString() || '';
const dbPassword: string = process.env.DB_PASSWORD?.toString() || '';
const dbHost: string = process.env.DB_HOST?.toString() || '';

const sequelize = new Sequelize(dbDatabase, dbUsername, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
});

async function connect(): Promise<void> {
  await sequelize
    .sync()
    .then(() => {
      console.log(process.env.DB_DATABASE);

      console.log('Database connection and synchronization established successfully!!!!');
    })
    .catch((error) => {
      console.error('Error connecting to database:', error);
    });
}
export const pool = new Pool({
  user: dbUsername,
  host: dbHost,
  database: dbDatabase,
  password: dbPassword,
  port: 5432,
});
const db = {
  sequelize: sequelize,
  connect,
};

export default db;
