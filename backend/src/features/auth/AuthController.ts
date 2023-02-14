import { Prisma } from '@prisma/client';
import { compareSync, hashSync } from 'bcrypt';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { jwtExpiration, jwtSecret } from '../../config/jwtConfig';
import prisma from '../../config/prismaClient';
import { EMAIL_EXISTED, INVALID_PASS, USER_NOT_EXISTED } from './constants';

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
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        res.status(404).json({ message: EMAIL_EXISTED });
      } else if (error instanceof Error) {
        res.status(404).json({ message: error.message });
      }
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
        return res.status(401).send({ message: INVALID_PASS });
      }

      // Generate JWT token
      // We are only including user id in the payload for security
      const accessToken = sign({ id: user.id }, jwtSecret, {
        expiresIn: jwtExpiration
      });

      res.status(200).json({
        ...user,
        role: user.role,
        accessToken
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).send({ message: error.message });
      }
    }
  }
  async update(req: Request, res: Response) {
    const { id, email, name, password } = req.body;
    try {
      await prisma.user.update({
        where: {
          id: +id
        },
        data: {
          email,
          name,
          password
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        res.send({ message: error.message });
      }
    }
  }
}

export default UserController;
