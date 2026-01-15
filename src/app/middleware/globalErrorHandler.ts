/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { AppError } from '../utils/appError';
import {
  handleDuplicateError,
  handleZodValidationError,
  validationError,
} from '../helper/ErrorHelperFunction';
import { ENV } from '../config/ENV';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = httpStatus.BAD_REQUEST;
  let message = `Somethig went wrong ${err.message}`;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  if (err?.code === 11000 || err?.errorResponse?.code === 11000) {
    const dupFunc = handleDuplicateError(err);
    statusCode = dupFunc.statusCode;
    message = dupFunc.message;
  }

  if (err.name === 'ZodError') {
    message = handleZodValidationError(err).message;
    statusCode = httpStatus.NOT_ACCEPTABLE;
  } else if (err.name === 'ValidationError') {
    validationError(err);
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    err,
    stack: ENV.NODE_ENV === 'development' ? err.stack : '',
  });
};
