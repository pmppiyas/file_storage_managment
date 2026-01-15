import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export const generateToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string | number = '1d'
): string => {
  const token = jwt.sign(payload, secret, {
    expiresIn,
    algorithm: 'HS256',
  } as SignOptions);

  return token;
};
