import mongoose from 'mongoose';
import { Folder } from '../module/folder/folder.model';
import { File } from '../module/file/file.model';

export const deleteFolder = async (
  userId: string,
  folderId: string,
  session: mongoose.ClientSession
) => {
  const folder = await Folder.findOneAndUpdate(
    { _id: folderId, owner: userId },
    { isDeleted: true },
    { session }
  );
  if (!folder) return;

  await File.updateMany(
    { folderId: folderId, owner: userId },
    { isDeleted: true },
    { session }
  );

  const subFolders = await Folder.find({
    parentId: folderId,
    owner: userId,
  }).session(session);

  for (const sub of subFolders) {
    await deleteFolder(userId, sub._id.toString(), session);
  }
};
