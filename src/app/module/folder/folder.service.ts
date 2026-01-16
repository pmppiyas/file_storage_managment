import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../utils/appError';
import { Folder } from './folder.model';

const getFolders = async (userId: string, parentId?: string) => {
  let currentParentId = parentId;

  if (!currentParentId) {
    let rootFolder = await Folder.findOne({ owner: userId, parentId: null });

    if (!rootFolder) {
      rootFolder = await Folder.create({
        name: 'My Files',
        owner: userId,
        parentId: null,
      });
    }
    currentParentId = rootFolder._id.toString();
  }

  const folders = await Folder.find({
    owner: userId,
    parentId: currentParentId,
    isDeleted: false,
  });

  return {
    currentFolderId: currentParentId,
    folders,
  };
};

const createFolder = async (
  userId: string,
  name: string,
  parentId?: string
) => {
  let finalParentId = parentId;

  if (!finalParentId) {
    const rootFolder = await Folder.findOne({ owner: userId, parentId: null });
    if (rootFolder) {
      finalParentId = rootFolder._id.toString();
    }
  }

  const isExist = await Folder.findOne({
    name,
    owner: userId,
    parentId: finalParentId,
    isDeleted: false,
  });

  if (isExist) {
    throw new AppError(StatusCodes.CONFLICT, 'File name already exist');
  }

  const newFolder = await Folder.create({
    name,
    owner: userId,
    parentId: finalParentId || null,
  });

  return newFolder;
};

export const FolderServices = {
  getFolders,
  createFolder,
};
