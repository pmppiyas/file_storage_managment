import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../utils/appError';
import { Folder } from '../folder/folder.model';
import { File } from '../file/file.model';

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

export const UtilsServices = {
  renameItem,
};
