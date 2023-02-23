import { NextFunction, Request, Response } from 'express';
import { baseConfig } from '../../../config/baseConfig';
import prisma from '../../../config/prismaClient';
import { getErrorMessage } from '../../../utils';
import { NO_TOKEN, restrictToRole, USER_NOT_EXISTED } from '../constants';
import { verifyJwt } from '../utils';

/* export interface CustomRequest extends Request {
  jwtDecoded: string | JwtPayload;
} */

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessTokenCookie || req.header('Authorization')?.replace('Bearer ', '');
  if (!accessToken) {
    return res.status(403).send(getErrorMessage(NO_TOKEN));
  }

  try {
    // Save the decoded payload for the next request after successful login
    // The decoded payload should be like this { id: 6, iat: 1676349774, exp: 1676436174 }
    const decoded = verifyJwt(accessToken, baseConfig.accessTokenSecret);

    // This is really important (Helps us know if the user is logged in from other controllers)
    // You can do: (req.user or res.locals.user)
    res.locals.jwtDecoded = decoded;
    //(req as CustomRequest).jwtDecoded = decoded as string | JwtPayload;
    next();
  } catch (error) {
    // If error like wrong token, expired token...
    res.status(401).send(getErrorMessage(error));
  }
};

export const restrictTo = (allowedRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  if (id) {
    return res.json(400).send(getErrorMessage(USER_NOT_EXISTED));
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });
    if (!user) {
      return res.json(400).send(getErrorMessage(USER_NOT_EXISTED));
    }
    if (!allowedRoles.includes(user.role)) {
      res.status(403).send({
        success: false,
        message: restrictToRole[user.role]
      });
    }
    next();
  } catch (error) {
    return res.json(404).send(getErrorMessage(error));
  }
};
