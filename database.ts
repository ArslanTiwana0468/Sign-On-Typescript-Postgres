import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('Nodejs', 'postgres', 'Tiwana0111', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize
  .sync()
  .then(() => {
    console.log('Database connection established successfully!!!!');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

export default sequelize;
