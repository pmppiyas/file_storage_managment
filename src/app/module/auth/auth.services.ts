import httpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { User } from '../user/user.modal';
import { AppError } from '../../utils/appError';
import { sendEmail } from '../../utils/sendEmail';
import { JwtPayload } from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { ENV } from '../../config/ENV';

const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found with this email!');
  }

  if (user.isDeleted || user.status === 'BLOCK') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is not active!');
  }

  const jwtPayload = { email: user.email, id: user._id };
  const resetToken = jwt.sign(jwtPayload, ENV.JWT.ACCESS_SECRET as string, {
    expiresIn: '15m',
  });

  const resetUILink = `${ENV.FRONTEND_URL}/reset-password?token=${resetToken}`;

  await sendEmail(user.email, resetUILink);

  return null;
};

const resetPassword = async (token: string, newPassword: string) => {
  let decoded;
  try {
    decoded = jwt.verify(token, ENV.JWT.ACCESS_SECRET as string) as JwtPayload;
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid or Expired Token!');
  }

  const user = await User.findOne({ email: decoded.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const hashedPassword = await bcryptjs.hash(
    newPassword,
    Number(ENV.BCRYPT_SALT)
  );

  await User.findOneAndUpdate(
    { email: decoded.email },
    {
      password: hashedPassword,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

export const AuthServices = {
  forgetPassword,
  resetPassword,
};
