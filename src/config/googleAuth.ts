// Google OAuth 2.0 configuration
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { createUser } from '../controllers/user';
import { PassportStatic } from 'passport';

export function googleAuthConfig(passport: PassportStatic) {
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
}
