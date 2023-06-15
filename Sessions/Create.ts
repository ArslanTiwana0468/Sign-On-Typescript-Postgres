import { Express } from 'express';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import passport from 'passport';
import session from 'express-session';
import PgSession from 'connect-pg-simple';
import { Pool } from 'pg';
import { createUser } from '../Controller/user';
// PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Nodejs',
  password: 'Tiwana0111',
  port: 5432,
});

export const sessionCreation = (app: Express): void => {
  // Create an instance of the PostgreSQL session store
  const pgSession = PgSession(session);

  const sessionStore = new pgSession({
    pool,
    tableName: 'session',
  });

  // Express session middleware
  app.use(
    session({
      secret: 'your_session_secret',
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        maxAge: 60000,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // Google OAuth 2.0 configuration

  const GOOGLE_CLIENT_ID =
    '374887770975-6l7307m21cs6m9lt367rljjevnf809qt.apps.googleusercontent.com';
  const GOOGLE_CLIENT_SECRET = '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';
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/callback',
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        console.log(profile._json.email);
        createUser(profile);
        return done(null, profile);
      }
    )
  );

  // Serialize user to session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Deserialize user from session
  passport.deserializeUser<Profile>((user, done) => {
    done(null, user as Profile);
  });
  // Debug route to check session data retrieval
  app.get('/debug-session', (req, res) => {
    console.log(req.session); // Output session data to the server console
    res.send('Check server console for session data');
  });

  // Function to delete expired sessions
  async function deleteExpiredSessions() {
    try {
      const currentDate = new Date();

      // Execute the query to delete expired sessions
      const result = await pool.query('DELETE FROM session WHERE expire < $1', [
        currentDate,
      ]);

      console.log(`Deleted ${result.rowCount} expired sessions.`);
    } catch (error) {
      console.error('Error deleting expired sessions:', error);
    } finally {
      // Release the connection pool
    }
  }

  // Schedule the task to run every minute (adjust as needed)
  const interval = 60 * 1000; // 1 minute
  setInterval(deleteExpiredSessions, interval);
};

export async function deleteSession(sessionId: string): Promise<void> {
  try {
    const query = 'DELETE FROM session WHERE sid = $1';
    const values = [sessionId];
    await pool.query(query, values);
    console.log('Session deleted successfully');
  } catch (error) {
    console.error('Error deleting session:', error);
  }
}
export default { sessionCreation, deleteSession };
