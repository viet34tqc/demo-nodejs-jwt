import { z } from 'zod';
import { PASSWORD_MIN_LENGTH_VALIDATE } from './constants';

export const authSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(4, PASSWORD_MIN_LENGTH_VALIDATE)
});

export type AuthSchemaType = typeof authSchema;
