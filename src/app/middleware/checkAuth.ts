import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { AppError } from '../utils/appError';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../utils/token/verifyToken';
import { ENV } from '../config/ENV';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../module/user/user.modal';
import { IStatus } from '../module/user/user.interface';

export const checkAuth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken =
        req.headers.authorization || req?.cookies?.['access-token'];

      if (!accessToken) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'No Token Received');
      }

      const verifiedToken = verifyToken(
        accessToken,
        ENV.JWT.ACCESS_SECRET
      ) as JwtPayload;

      const isUserExist = await User.findById(verifiedToken.userId);
      if (!isUserExist) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User does not exist');
      }

      if (
        isUserExist.status === IStatus.BLOCK ||
        isUserExist.status === IStatus.INACTIVE
      ) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          `User is ${isUserExist.status}`
        );
      }

      if (isUserExist.isDeleted) {
        throw new AppError(StatusCodes.FORBIDDEN, 'User is deleted');
      }

      req.user = verifiedToken;

      next();
    } catch (err) {
      next(err);
    }
  };
};
