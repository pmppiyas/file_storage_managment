import { File } from './file.model';

const uploadPhoto = async (file: any, userId: string, folderId: string) => {
  const extension = file.originalname.split('.').pop()?.toLowerCase();

  const result = await File.create({
    name: file.originalname,
    owner: userId,
    folderId: folderId,
    fileUrl: file.path,
    publicId: file.filename,
    size: file.size,
    fileType: extension,
  });

  return result;
};

const createNote = async (
  userId: string,
  folderId: string,
  name: string,
  content: string
) => {
  const result = await File.create({
    name,
    content,
    owner: userId,
    folderId,
    fileType: 'note',
    size: Buffer.byteLength(content, 'utf8'),
  });
  return result;
};

export const FileServices = {
  uploadPhoto,
  createNote,
};
