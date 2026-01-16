import catchAsync from '../../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import { FolderServices } from './folder.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';

const getFolders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req?.user as JwtPayload;
    const userId = user.userId;

    const parentId = req.query.parentId as string | undefined;

    const result = await FolderServices.getFolders(userId, parentId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Folder retrived successfully',
      data: result,
    });
  }
);

const createFolder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req?.user as JwtPayload;
    const userId = user.userId;

    const { name, parentId } = req.body;

    const files = await FolderServices.createFolder(userId, name, parentId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Folder created successfully',
      data: files,
    });
  }
);

export const FolderController = {
  getFolders,
  createFolder,
};
