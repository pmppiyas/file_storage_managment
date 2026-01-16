import { Types } from 'mongoose';

export enum IStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCK = 'BLOCK',
}

export interface IAuth {
  provider: string;
  providerId: string;
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  photoUrl?: string;
  auths: IAuth[];
  status: IStatus;
  isVerified: boolean;
  isDeleted: boolean;
}
