import { Express } from 'express';
import passport from 'passport';
import session from 'express-session';
import PgSession from 'connect-pg-simple';
import { Pool } from 'pg';
import { googleAuthConfig } from '../config/googleAuth';
// PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'demo',
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
  googleAuthConfig(passport);

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
      const result = await pool.query('DELETE FROM session WHERE expire < $1', [currentDate]);

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
