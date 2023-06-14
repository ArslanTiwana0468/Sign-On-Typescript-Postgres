import express from 'express';
import passport from 'passport';
import { sequelize } from './database';
import { User } from './Models/User';
import sessionCreation from './Sessions/Create';

const app = express();
const port = 5000;

app.use(express.json());
sessionCreation(app);
// app.get('/', async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (error) {
//     console.error('Error retrieving data:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });


app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Sign in with Google</a><br/><a href="/auth/facebook">Sign in with Facebook</a>');
  });
app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: [ 'profile' ] } 
  ));
  
  app.get( '/auth/facebook/callback',
    passport.authenticate( 'facebook', {
      successRedirect: '/user/profile',          //if authentication is successfull than go to protected
      failureRedirect: '/auth/failure'  // if authentication failed then redirect to failure page
    })
  );
  app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
      successRedirect: '/user/profile',          //if authentication is successfull than go to protected
      failureRedirect: '/auth/failure'  // if authentication failed then redirect to failure page
    })
  );
  import userRoutes from './Controller/user';


   app.use('/user', userRoutes);
  
  app.get('/auth/failure', (req, res) => {
    res.send('Failed to authenticate..');
  });
sequelize
  .sync()
  .then(() => {
    console.log('Database connection established successfully.');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });
