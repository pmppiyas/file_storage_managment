import mongoose from 'mongoose';
import { File } from '../module/file/file.model';
import { Folder } from '../module/folder/folder.model';

export const copyFolder = async (
  userId: string,
  folderId: string,
  targetParentId: string,
  isFirstCall: boolean = true,
  session?: mongoose.ClientSession
) => {
  const sourceFolder = await Folder.findOne({
    _id: folderId,
    owner: userId,
  }).session(session!);
  if (!sourceFolder) return;

  const { _id, createdAt, updatedAt, ...folderData } = sourceFolder.toObject();

  const newName =
    isFirstCall && sourceFolder.parentId?.toString() === targetParentId
      ? `${sourceFolder.name} (Copy)`
      : sourceFolder.name;

  const newFolder = await Folder.create(
    [{ ...folderData, name: newName, parentId: targetParentId }],
    { session }
  );

  const newFolderData = newFolder[0];

  const files = await File.find({ folderId }).session(session!);

  for (const file of files) {
    const {
      _id: fId,
      createdAt: fC,
      updatedAt: fU,
      ...fileData
    } = file.toObject();

    await File.create([{ ...fileData, folderId: newFolderData._id }], {
      session,
    });
  }

  const subFolders = await Folder.find({ parentId: folderId }).session(
    session!
  );

  for (const sub of subFolders) {
    await copyFolder(
      userId,
      sub._id.toString(),
      newFolderData._id.toString(),
      false,
      session
    );
  }

  return newFolderData;
};
