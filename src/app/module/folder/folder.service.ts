import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../utils/appError';
import { Folder } from './folder.model';
import { File } from '../file/file.model';

const getFoldersAndFile = async (userId: string, parentId?: string) => {
  let currentFolder;

  if (!parentId) {
    currentFolder = await Folder.findOne({ owner: userId, parentId: null });

    if (!currentFolder) {
      currentFolder = await Folder.create({
        name: 'My Files',
        owner: userId,
        parentId: null,
      });
    }
  } else {
    currentFolder = await Folder.findOne({ _id: parentId, owner: userId });

    if (!currentFolder) {
      throw new Error('Folder not found');
    }
  }

  const currentParentId = (currentFolder._id as any).toString();

  const folders = await Folder.find({
    owner: userId,
    parentId: currentParentId,
    isDeleted: false,
  }).sort({ createdAt: -1 });

  const files = await File.find({
    owner: userId,
    folderId: currentParentId,
    isDeleted: false,
  }).sort({ createdAt: -1 });

  return {
    meta: {
      folderId: currentParentId,
      folderName: currentFolder.name,
      parentId: currentFolder.parentId,
    },
    contents: [
      ...folders.map((f) => ({ ...f.toObject() })),
      ...files.map((f) => ({ ...f.toObject() })),
    ],
  };
};

const createFolder = async (
  userId: string,
  name: string,
  parentId?: string
) => {
  let finalParentId = parentId;

  if (parentId) {
    const isParentExist = await Folder.findOne({
      _id: parentId,
      owner: userId,
      isDeleted: false,
    });

    if (!isParentExist) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Parent folder is not found');
    }
  }

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
    throw new AppError(StatusCodes.CONFLICT, 'Folder name already exists');
  }

  const newFolder = await Folder.create({
    name,
    owner: userId,
    parentId: finalParentId || null,
  });

  return newFolder;
};

export const FolderServices = {
  getFoldersAndFile,
  createFolder,
};
