import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import { UtilsServices } from './utils.services';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const renameItem = catchAsync(async (req: Request, res: Response) => {
  const { itemId, newName, type } = req.body;
  const user = req.user as JwtPayload;

  const result = await UtilsServices.renameItem(
    user.userId,
    itemId,
    newName,
    type
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${
      type.charAt(0).toUpperCase() + type.slice(1)
    } renamed successfully`,
    data: result,
  });
});

const copyItem = catchAsync(async (req: Request, res: Response) => {
  const { itemId, targetFolderId, type } = req.body;
  const user = req.user as JwtPayload;

  const result = await UtilsServices.copyItem(
    user.userId,
    itemId,
    targetFolderId,
    type
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${
      type.charAt(0).toUpperCase() + type.slice(1)
    } copied successfully`,
    data: result,
  });
});

export const UtilsController = {
  renameItem,
  copyItem,
};
