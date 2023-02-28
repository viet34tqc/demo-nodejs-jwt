import { Request, Response } from 'express';
import prisma from '../../config/prismaClient';
import { getErrorMessage } from '../../utils';
import { NO_POST_ID_CONTENT } from './constants';

export class CommentColtroller {
  async getComments(req: Request, res: Response) {
    try {
      const postId = req.query.postId;
      if (!postId) {
        return res.status(401).json(getErrorMessage(NO_POST_ID_CONTENT));
      }
      const comments = await prisma.comment.findMany({
        where: {
          postId: +postId
        },
        include: {
          author: true
        }
      });

      if (!comments) {
        return res.status(200).send({ success: true, data: [] });
      }

      const data = comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        authorName: comment.author.name
      }));

      return res.status(200).send({ success: true, data });
    } catch (error) {
      res.status(404).send(getErrorMessage(error));
    }
  }
  async addComment(req: Request, res: Response) {
    try {
      const userId = res.locals.jwtDecoded.id;
      const { postId, content } = req.body;
      if (!postId || !content) {
        res.status(401).json(getErrorMessage(NO_POST_ID_CONTENT));
      }
      const comment = await prisma.comment.create({
        data: {
          postId: +postId,
          content,
          authorId: +userId
        }
      });
      res.status(200).json({
        success: true,
        data: comment
      });
    } catch (error) {
      res.status(404).send(getErrorMessage(error));
    }
  }
}
