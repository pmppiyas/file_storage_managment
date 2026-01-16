import { Schema, model, Types } from 'mongoose';

export const fileSchema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: 'User', required: true },
    folderId: { type: Types.ObjectId, ref: 'Folder', required: true },
    content: { type: String },
    fileType: {
      type: String,
      required: true,
    },
    fileUrl: { type: String },
    publicId: { type: String },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    size: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

export const File = model('File', fileSchema);
