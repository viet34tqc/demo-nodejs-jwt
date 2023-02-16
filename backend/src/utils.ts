import { Prisma } from '@prisma/client';
import { CANNOT_REACH_DB } from './constants';

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return CANNOT_REACH_DB;
  }
  if (error instanceof Error) {
    return error.message;
  }
};
