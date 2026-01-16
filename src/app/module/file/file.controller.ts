import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { FileServices } from './file.services';

const uploadPhoto = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  const { folderId } = req.query;
  const user = req.user as JwtPayload;
  const userId = user.userId;

  if (!file) {
    throw new Error('Please upload a photo');
  }

  const result = await FileServices.uploadPhoto(
    file,
    userId,
    folderId as string
  );

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Photo uploaded and saved successfully',
    data: result,
  });
});

export const FileControllers = {
  uploadPhoto,
};
