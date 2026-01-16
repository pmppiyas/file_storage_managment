import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { FileServices } from './file.services';

const uploadFile = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  const { folderId } = req.query;
  const user = req.user as JwtPayload;

  if (!file) {
    throw new Error('Please upload a file');
  }

  const result = await FileServices.uploadFile(
    file,
    user.userId,
    folderId as string
  );

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'File uploaded and saved successfully',
    data: result,
  });
});

const createNote = catchAsync(async (req: Request, res: Response) => {
  const { name, content } = req.body;
  const { folderId } = req.query;
  const user = req.user as JwtPayload;

  const result = await FileServices.createNote(
    user.userId,
    folderId as string,
    name,
    content
  );

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Note created successfully',
    data: result,
  });
});

export const FileControllers = {
  uploadFile,
  createNote,
};
