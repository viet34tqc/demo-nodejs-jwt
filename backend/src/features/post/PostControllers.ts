import { Post, User } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../../config/prismaClient';
import { getErrorMessage } from '../../utils';
import { USER_NOT_EXISTED } from '../auth/constants';
import { NO_POST, POST_NO_TITLE } from './constants';

export class PostController {
  /**
   * // TODO: Add pagination
   * Get all posts
   * @param req
   * @param res
   * @returns posts
   */
  async getPosts(req: Request, res: Response) {
    try {
      const userId = res.locals.jwtDecoded.id;
      if (!userId) {
        return res.status(404).send(getErrorMessage(USER_NOT_EXISTED));
      }
      const posts = await prisma.post.findMany({
        where: {
          authorId: userId
        },
        include: {
          author: true
        }
      });
      if (!posts.length) {
        return res.status(200).send(getErrorMessage(NO_POST));
      }
      const data = posts.map((post: Post & { author: User }) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        authorName: post.author.name
      }));
      res.status(200).send({
        success: true,
        data
      });
    } catch (error) {
      res.status(404).send(getErrorMessage(error));
    }
  }

  /**
   * Create post controller
   * @param req
   * @param res
   * @returns
   */
  async addPost(req: Request, res: Response) {
    try {
      const userId = res.locals.jwtDecoded.id;
      if (!userId) {
        return res.status(404).send(getErrorMessage(USER_NOT_EXISTED));
      }
      const { title, content } = req.body;
      if (!title) {
        return res.status(404).send(getErrorMessage(POST_NO_TITLE));
      }
      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId: +userId
        }
      });

      res.status(200).json({
        success: true,
        data: post
      });
    } catch (error) {
      res.status(404).send(getErrorMessage(error));
    }
  }
}
