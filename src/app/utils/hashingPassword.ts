import bcryptjs from 'bcryptjs';
import { ENV } from '../config/ENV';

export const hashingPassword = async (password: string): Promise<string> => {
  const saltRound = Number(ENV.BCRYPT_SALT);

  return await bcryptjs.hash(password, saltRound);
};
