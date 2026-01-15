import httpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { User } from '../user/user.modal';
import { AppError } from '../../utils/appError';
import { sendEmail } from '../../utils/sendEmail';
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

export const AuthServices = {
  forgetPassword,
};
