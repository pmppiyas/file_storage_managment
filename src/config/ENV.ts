import dotenv from 'dotenv';
dotenv.config();

interface EnvConfig {
  PORT: string;
  DATABASE_URL: string;
  NODE_ENV: 'development' | 'production';
  CLOUDINARY: {
    CLOUD_NAME: string;
    API_KEY: string;
    API_SECRET: string;
  };
  BCRYPT_SALT: string;
}

const loadEnvVars = (): EnvConfig => {
  const requiredEnvVars: string[] = [
    'PORT',
    'DATABASE_URL',
    'NODE_ENV',
    'CLOUD_NAME',
    'API_KEY',
    'API_SECRET',
    'BCRYPT_SALT',
  ];
  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variable ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
    CLOUDINARY: {
      CLOUD_NAME: process.env.CLOUD_NAME as string,
      API_KEY: process.env.API_KEY as string,
      API_SECRET: process.env.API_SECRET as string,
    },
    BCRYPT_SALT: process.env.BCRYPT_SALT as string,
  };
};

export const ENV = loadEnvVars();
