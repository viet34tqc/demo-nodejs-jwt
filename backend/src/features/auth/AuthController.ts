import { Prisma } from '@prisma/client';
import { compareSync, hashSync } from 'bcrypt';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { baseConfig } from '../../config/baseConfig';

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
        return res.status(404).send(getErrorMessage(EMAIL_EXISTED));
      }
      res.status(404).send(getErrorMessage(error));
    }
  }
  async login(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      });

      // User email not found
      if (!user) {
        return res.status(404).send(getErrorMessage(USER_NOT_EXISTED));
      }

      const isPasswordValidated = compareSync(req.body.password, user.password as string);
      if (!isPasswordValidated) {
        return res.status(401).send(getErrorMessage(INVALID_PASS));
      }

      // Generate JWT tokens
      // We are only including user id in the payload for security
      const accessToken = signJwt({ id: user.id }, baseConfig.accessTokenSecret, baseConfig.accessTokenExpiration);
      const refreshToken = signJwt({ id: user.id }, baseConfig.refreshTokenSecret, baseConfig.refreshTokenExpiration);

      // Then return cookie to client for more security as well, instead of storing tokens in localStorage
      res.cookie('accessTokenCookie', accessToken, {
        maxAge: baseConfig.accessTokenExpiration,
        httpOnly: true
      });

      // We need to send loggedIn cookie because accessToken is httpOnly.
      res.cookie('loggedInCookie', true, {
        maxAge: baseConfig.accessTokenExpiration
      });

      // Only send cookie
      res.cookie('refreshTokenCookie', refreshToken, {
        maxAge: baseConfig.refreshTokenExpiration,
        httpOnly: true
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;

      res.status(200).json({
        success: true,
        data: {
          ...rest,
          role: user.role
        }
      });
    } catch (error) {
      res.status(404).send(getErrorMessage(error));
    }
  }
  refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshTokenCookie || req.header('Authorization')?.replace('Bearer ', '');
    if (!refreshToken) {
      return res.status(403).send(getErrorMessage(NO_TOKEN));
    }
    try {
      const decoded = verifyJwt(refreshToken, baseConfig.accessTokenSecret) as JwtPayload;
      const accessToken = signJwt({ id: decoded.id }, baseConfig.accessTokenSecret, baseConfig.accessTokenExpiration);
      return res.status(200).json({ accessToken });
    } catch (error) {
      return res.status(404).send(getErrorMessage(NO_TOKEN));
    }
  }
  async getCurrentUser(req: Request, res: Response) {
    try {
      const userId = res.locals.jwtDecoded.id;
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });

      // User email not found
      if (!user) {
        return res.status(404).send(getErrorMessage(USER_NOT_EXISTED));
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;

      res.status(200).json({
        success: true,
        data: {
          user: rest
        }
      });
    } catch (error) {
      return res.status(404).send(getErrorMessage(USER_NOT_EXISTED));
    }
  }
  logout(req: Request, res: Response) {
    res.clearCookie('accessTokenCookie');
    res.clearCookie('loggedInCookie');
    res.clearCookie('refreshTokenCookie');
    res.status(200).send({ message: 'Logout successfully' });
  }
}

export default UserController;
