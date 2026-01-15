import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../utils/appError';
import { hashingPassword } from '../../utils/hashingPassword';
import { IAuth, IUser } from './user.interface';
import { User } from './user.modal';

const createUser = async (payload: IUser) => {
  const { auths, email, password, ...rest } = payload;

  const isExist = await User.findOne({
    email,
  });

  if (isExist) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'User by this email is already exist'
    );
  }

  let hashPassword = '';
  if (password) {
    hashPassword = await hashingPassword(password);
  }

  const authProvider: IAuth = {
    provider: 'credentials',
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashPassword,
    auths: [authProvider],
    ...rest,
  });

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

export const UserServices = {
  createUser,
};
