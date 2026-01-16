import { Schema, model } from 'mongoose';

const folderSchema = new Schema(
  {
    name: { type: String, required: true, default: 'Root' },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Folder', default: null },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Folder = model('Folder', folderSchema);
