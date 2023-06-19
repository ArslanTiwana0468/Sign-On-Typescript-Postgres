import express from 'express';
import { sessionCreation } from './Utils/session';
import route from './routes/index';
import path from 'path';

const app = express();
const port = 5000;
sessionCreation(app);

app.use(route);
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // Set EJS as the view engine

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
