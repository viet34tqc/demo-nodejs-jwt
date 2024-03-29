import { Prisma } from '@prisma/client';
import { CANNOT_REACH_DB } from './constants';

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return { success: false, message: CANNOT_REACH_DB };
  }
  if (error instanceof Error) {
    return { success: false, message: error.message };
  }
  if (typeof error === 'string') {
    return { success: false, message: error };
  }
  return { success: false, message: 'Undefined error' };
};
