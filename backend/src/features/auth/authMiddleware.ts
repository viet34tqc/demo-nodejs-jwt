import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AuthSchemaType } from './authValidation';

export const authMiddleware =
  (schema: AuthSchemaType) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json(error.issues);
      } else if (error instanceof Error) {
        res.status(400).json(error.message);
      }
    }
  };
