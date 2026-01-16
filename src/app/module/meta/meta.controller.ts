import { Request, Response, NextFunction } from 'express';
import { MetaServices } from './meta.services';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';

const getStorageStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req?.user as JwtPayload;
    const result = await MetaServices.getStorageStats(user.userId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Meta retrieved successfully',
      data: result,
    });
  }
);

const getRecentFiles = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req?.user as JwtPayload;
    const result = await MetaServices.getRecentFiles(user.userId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Recent files retrieved successfully',
      data: result,
    });
  }
);

export const MetaControllers = {
  getStorageStats,
  getRecentFiles,
};
