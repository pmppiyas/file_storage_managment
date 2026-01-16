import { envVars } from '../../config/env';
import { IUser } from '../../module/user/user.interface';
import { generateToken } from './generateToken';

export const createToken = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT.ACCESS_SECRET,
    envVars.JWT.ACCESS_EXPIRED
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT.REFRESH_SECRET,
    envVars.JWT.REFRESH_EXPIRED
  );
  return {
    accessToken,
    refreshToken,
  };
};
