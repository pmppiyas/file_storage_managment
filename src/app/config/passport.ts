import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../module/user/user.modal';
import bcryptjs from 'bcryptjs';
import { ENV } from './ENV';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (identifier: string, password: string, done: any) => {
      try {
        const isUserExist = await User.findOne({
          $or: [{ email: identifier }, { phone: identifier }],
        });

        if (!isUserExist) {
          return done(null, false, { message: 'User not found.' });
        }

        const isGoogleAuthenticated = isUserExist.auths?.some(
          (providerObjects) => providerObjects.provider === 'google'
        );

        if (isGoogleAuthenticated && !isUserExist.password) {
          return done(null, false, {
            message:
              'You are joined by Google. First login by google and then set a password.',
          });
        }

        const isPasswordMatch = await bcryptjs.compare(
          password,
          isUserExist.password || ''
        );

        if (!isPasswordMatch) {
          return done(null, false, { message: 'Password is wrong.' });
        }

        return done(null, isUserExist, { message: 'Login successfull.' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: ENV.GOOGLE.CLIENT_ID,
      clientSecret: ENV.GOOGLE.CLIENT_SECRET,
      callbackURL: ENV.GOOGLE.CALLBACK_URL,
      passReqToCallback: true,
    },
    async (_req, _accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(null, false, { message: 'No email found' });
        }

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            profileImage: profile.photos?.[0]?.value,
            auths: [
              {
                provider: profile.provider,
                providerId: profile.id || profile._json.sub,
              },
            ],
          });
        } else {
          const alreadyLinked = user.auths?.some(
            (a) => a.provider === 'google' && a.providerId === profile.id
          );

          if (!alreadyLinked) {
            if (!user.auths) {
              user.auths = [];
            }
            const providerId = profile.id || profile._json?.sub;

            if (!providerId) {
              return done(null, false, { message: 'No provider ID found' });
            }

            user.auths.push({
              provider: profile.provider,
              providerId: providerId,
            });
            await user.save();
          }
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
