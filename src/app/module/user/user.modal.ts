import { model, Schema, Types } from 'mongoose';
import { IAuth, IStatus, IUser } from './user.interface';

const authSchema = new Schema<IAuth>({
  provider: { type: String, required: true },
  providerId: { type: String, required: true },
});

const UserModal = new Schema<IUser>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    profileImage: { type: String },
    auths: {
      type: [authSchema],
      required: true,
      _id: false,
    },
    status: {
      type: String,
      enum: Object.values(IStatus),
      default: IStatus.ACTIVE,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>('User', UserModal);
