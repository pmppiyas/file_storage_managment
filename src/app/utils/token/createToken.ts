import { ENV } from '../../config/ENV';
import { IUser } from '../../module/user/user.interface';
import { generateToken } from './generateToken';

export const createToken = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
  };

  const accessToken = generateToken(
    jwtPayload,
    ENV.JWT.ACCESS_SECRET,
    ENV.JWT.ACCESS_EXPIRED
  );

  const refreshToken = generateToken(
    jwtPayload,
    ENV.JWT.REFRESH_SECRET,
    ENV.JWT.REFRESH_EXPIRED
  );
  return {
    accessToken,
    refreshToken,
  };
};
