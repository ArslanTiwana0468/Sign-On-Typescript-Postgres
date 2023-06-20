import express from 'express';
import { sessionCreation } from './Utils/session';
import route from './routes/index';
import path from 'path';
import db from './database/models/index';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
sessionCreation(app);
app.use(route);
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // Set EJS as the view engine
db.sequelize
  .sync()
  .then(() => {
    console.log('Database connection established successfully!!!!');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error: any) => {
    console.error('Error connecting to database:', error);
  });
