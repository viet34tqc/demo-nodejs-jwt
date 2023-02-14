import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtSecret } from '../../../config/jwtConfig';
import prisma from '../../../config/prismaClient';
import { NO_TOKEN, USER_NOT_EXISTED } from '../constants';

export interface CustomRequest extends Request {
  jwtDecoded: string | JwtPayload;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(403).send({ message: NO_TOKEN });
  }

  // Verify token
  jwt.verify(token, jwtSecret, (err, decoded) => {
    // If error like wrong toke, expired token...
    if (err) {
      return res.status(401).send({
        auth: false,
        message: err.message
      });
    }

    // Else, save the decoded payload for the next request after successful login
    // The decoded payload should be like this { id: 6, iat: 1676349774, exp: 1676436174 }
    (req as CustomRequest).jwtDecoded = decoded as string | JwtPayload;
    next();
  });
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  if (id) {
    return res.json(400).send({ message: USER_NOT_EXISTED });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });
    if (!user) {
      return res.json(400).send({ message: USER_NOT_EXISTED });
    }
    if (user.role !== 'ADMIN') {
      res.status(403).send({
        message: 'REQUIRED'
      });
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.send({ message: error.message });
    }
  }
};
