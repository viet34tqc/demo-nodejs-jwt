import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../../config/prismaClient';

class UserController {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password
        }
      });
      res.json(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        res.json(
          'This email is already existed'
        );
      } else if (error instanceof Error) {
        res.json(error.message);
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
        res.json(error.message);
      }
    }
  }
}

export default UserController;
