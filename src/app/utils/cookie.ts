import { Response } from 'express';
import { envVars } from './../config/env';

interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
  const isProd = envVars.NODE_ENV === 'production';

  if (tokenInfo.accessToken) {
    res.cookie('access-token', tokenInfo.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }

  if (tokenInfo.refreshToken) {
    res.cookie('refresh-token', tokenInfo.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
  }
};
