import catchAsync from '../../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../utils/appError';
import passport from 'passport';
import { StatusCodes } from 'http-status-codes';
import { createToken } from '../../utils/token/createToken';
import { setAuthCookie } from '../../utils/cookie';
import sendResponse from '../../utils/sendResponse';

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

export const AuthController = {
  localLogin,
};
