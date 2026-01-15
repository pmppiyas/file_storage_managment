import z from 'zod';
import { IStatus } from './user.interface';

export const userZodSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: 'Please enter a valid email address',
    }),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^()_])[A-Za-z\d@$!%*?#&^()_]{6,}$/,
      {
        message:
          'Password must include uppercase, lowercase, number, and special character',
      }
    ),
  profileImage: z.string().optional(),
  isActive: z.string().default(IStatus.ACTIVE),
  isVerified: z.boolean().default(false),
});
