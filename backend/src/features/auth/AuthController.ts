import { Prisma } from '@prisma/client';
import { compareSync, hashSync } from 'bcrypt';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import {
  accessTokenExpiration,
  accessTokenSecret,
  refreshTokenExpiration,
  refreshTokenSecret
} from '../../config/jwtConfig';
import prisma from '../../config/prismaClient';
import { getErrorMessage } from '../../utils';
import { EMAIL_EXISTED, INVALID_PASS, NO_TOKEN, USER_NOT_EXISTED } from './constants';
import { signJwt, verifyJwt } from './utils';

class UserController {
  async register(req: Request, res: Response) {
    const { name, email, password, role } = req.body;
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          role,
          password: hashSync(password, 8)
        }
      });
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        return res.status(404).json({ success: false, message: EMAIL_EXISTED });
      }
      res.status(404).send({ success: false, message: getErrorMessage(error) });
    }
  }
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      });

      // User email not found
      if (!user) {
        return res.status(404).send(USER_NOT_EXISTED);
      }

      const isPasswordValidated = compareSync(password, user.password as string);
      if (!isPasswordValidated) {
        return res.status(401).send({ success: false, message: INVALID_PASS });
      }

      // Generate JWT tokens
      // We are only including user id in the payload for security
      const accessToken = signJwt({ id: user.id }, accessTokenSecret, accessTokenExpiration);
      const refreshToken = signJwt({ id: user.id }, refreshTokenSecret, refreshTokenExpiration);

      // Then return cookie to client for more security as well, instead of storing tokens in localStorage
      res.cookie('accessTokenCookie', accessToken, {
        maxAge: accessTokenExpiration,
        httpOnly: true
      });

      // Only send cookie
      res.cookie('refreshTokenCookie', refreshToken, {
        maxAge: refreshTokenExpiration,
        httpOnly: true
      });

      res.status(200).json({
        success: true,
        data: {
          ...user,
          role: user.role
        }
      });
    } catch (error) {
      res.status(404).send({ success: false, message: getErrorMessage(error) });
    }
  }
  refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshTokenCookie || req.header('Authorization')?.replace('Bearer ', '');
    if (!refreshToken) {
      return res.status(403).send({ success: false, message: NO_TOKEN });
    }
    try {
      const decoded = verifyJwt(refreshToken, accessTokenSecret) as JwtPayload;
      const accessToken = signJwt({ id: decoded.id }, accessTokenSecret, accessTokenExpiration);
      return res.status(200).json({ accessToken });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).send({ success: false, message: error.message });
      }
    }
  }
  getCurrentUser(req: Request, res: Response) {
    try {
      const user = res.locals.user;
      res.status(200).json({
        success: true,
        data: {
          user
        }
      });
    } catch (error) {
      res.status(404).send({ success: false, message: error });
    }
  }
  logout(req: Request, res: Response) {
    res.clearCookie('accessTokenCookie');
    res.clearCookie('refreshTokenCookie');
    res.status(200).send({ message: 'Logout successfully' });
  }
}

export default UserController;
