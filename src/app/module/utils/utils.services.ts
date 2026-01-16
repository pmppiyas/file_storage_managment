import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../utils/appError';
import { Folder } from '../folder/folder.model';
import { File } from '../file/file.model';
import { copyFolder } from '../../utils/copyFolder';
import mongoose from 'mongoose';

const renameItem = async (
  userId: string,
  itemId: string,
  newName: string,
  type: 'folder' | 'file'
) => {
  let result;

  if (type === 'folder') {
    const folder = await Folder.findOne({ _id: itemId, owner: userId });
    if (!folder) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Folder not found');
    }

    result = await Folder.findByIdAndUpdate(
      itemId,
      { name: newName },
      { new: true }
    );
  } else {
    const file = await File.findOne({ _id: itemId, owner: userId });
    if (!file) {
      throw new AppError(StatusCodes.NOT_FOUND, 'File not found');
    }

    result = await File.findByIdAndUpdate(
      itemId,
      { name: newName },
      { new: true }
    );
  }

  return result;
};

export const copyItem = async (
  userId: string,
  itemId: string,
  targetFolderId: string,
  type: 'folder' | 'file'
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let result;

    if (type === 'file') {
      const file = await File.findOne({ _id: itemId, owner: userId }).session(
        session
      );
      if (!file) throw new AppError(StatusCodes.NOT_FOUND, 'File not found');

      const { _id, createdAt, updatedAt, ...rest } = file.toObject();
      const newName =
        file.folderId?.toString() === targetFolderId
          ? `${file.name} (Copy)`
          : file.name;

      const newFile = await File.create(
        [{ ...rest, name: newName, folderId: targetFolderId }],
        { session }
      );
      result = newFile[0];
    } else {
      result = await copyFolder(userId, itemId, targetFolderId, true, session);
    }

    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const UtilsServices = {
  renameItem,
  copyItem,
};
