import catchAsync from '../../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../utils/appError';
import passport from 'passport';
import { StatusCodes } from 'http-status-codes';
import { createToken } from '../../utils/token/createToken';
import { setAuthCookie } from '../../utils/cookie';
import sendResponse from '../../utils/sendResponse';
import { ENV } from '../../config/ENV';
import { AuthServices } from './auth.services';

const localLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', async (err: any, user: any, info: any) => {
      if (err) {
        return next(new AppError(StatusCodes.BAD_REQUEST, err));
      }

      if (!user) {
        return next(new AppError(StatusCodes.NOT_FOUND, info.message));
      }

      const token = createToken(user);

      setAuthCookie(res, token);

      const { password: _password, ...rest } = user.toObject();

      sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'User Login Successfully',
        data: {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          user: rest,
        },
      });
    })(req, res, next);
  }
);

const googleLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || '/';

    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'consent',
      state: redirect as string,
    })(req, res, next);
  }
);

const googleCallback = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }
    const token = createToken(user);

    setAuthCookie(res, token);

    let redirectTo =
      req.query?.state && typeof req.query.state === 'string'
        ? req.query.state.replace(/^\//, '')
        : 'dashboard';

    if (redirectTo.startsWith('/')) {
      redirectTo = redirectTo.slice(1);
    }
    if (req.query.json === 'true') {
      return sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Google login successfully',
        data: token,
      });
    }

    res.redirect(`${ENV.FRONTEND_URL}/${redirectTo}`);
  }
);

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  await AuthServices.forgetPassword(email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reset link sent to your email successfully!',
    data: null,
  });
});

export const AuthController = {
  localLogin,
  googleLogin,
  googleCallback,
  forgetPassword,
};
