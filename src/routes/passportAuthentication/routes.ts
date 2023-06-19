import passport from 'passport';
import Express, { Request, Response } from 'express';

const route = Express.Router();
route.get('/', (req: Request, res: Response) => {
  res.render('index', { authUrl: '/auth/google' }); // Render 'index.ejs' view with the authentication URL
});
route.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

route.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/user/profile', //if authentication is successfull than go to protected
    failureRedirect: '/auth/failure', // if authentication failed then redirect to failure page
  })
);

route.get('/failure', (req: Request, res: Response) => {
  res.render('failure'); // Render 'failure.ejs' view
});

export default route;
