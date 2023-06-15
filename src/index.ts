import express, { Request, Response } from 'express';
import passport from 'passport';
import { sessionCreation } from '../Sessions/Create';
import { router } from '../Controller/user';

const app = express();
const port = 5000;

app.use(express.json());
app.set('view engine', 'ejs'); // Set EJS as the view engine
sessionCreation(app);

app.get('/', (req: Request, res: Response) => {
  res.render('index', { authUrl: '/auth/google' }); // Render 'index.ejs' view with the authentication URL
});
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);


app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/user/profile', //if authentication is successfull than go to protected
    failureRedirect: '/auth/failure', // if authentication failed then redirect to failure page
  })
);

app.use('/user', router);

app.get('/auth/failure', (req: Request, res: Response) => {
  res.render('failure'); // Render 'failure.ejs' view
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
