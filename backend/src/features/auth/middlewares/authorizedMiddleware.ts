import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { accessTokenSecret } from '../../../config/jwtConfig';
import prisma from '../../../config/prismaClient';
import { NO_TOKEN, REQUIRE_ADMIN_ROLE, USER_NOT_EXISTED } from '../constants';
import { verifyJwt } from '../utils';

export interface CustomRequest extends Request {
  jwtDecoded: string | JwtPayload;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.header('Authorization')?.replace('Bearer ', '');
  if (!accessToken) {
    return res.status(403).send({ success: false, message: NO_TOKEN });
  }

  try {
    // Save the decoded payload for the next request after successful login
    // The decoded payload should be like this { id: 6, iat: 1676349774, exp: 1676436174 }
    const decoded = verifyJwt(accessToken, accessTokenSecret);
    (req as CustomRequest).jwtDecoded = decoded as string | JwtPayload;
    next();
  } catch (error) {
    // If error like wrong token, expired token...
    if (error instanceof Error) {
      return res.status(401).send({
        success: false,
        message: error.message
      });
    }
  }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  if (id) {
    return res.json(400).send({ success: false, message: USER_NOT_EXISTED });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });
    if (!user) {
      return res.json(400).send({ success: false, message: USER_NOT_EXISTED });
    }
    if (user.role !== 'ADMIN') {
      res.status(403).send({
        success: false,
        message: REQUIRE_ADMIN_ROLE
      });
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.send({ success: false, message: error.message });
    }
  }
};
