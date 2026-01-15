import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../module/user/user.modal';
import bcryptjs from 'bcryptjs';

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
