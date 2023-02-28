import express, { Application } from 'express';
import { verifyToken } from '../auth/middlewares/authorizedMiddleware';
import { CommentColtroller } from './CommentController';

const router = express.Router();

const initCommentRoutes = (app: Application) => {
  const commentController = new CommentColtroller();
  router.use(verifyToken);
  router.get('/comments', commentController.getComments);
  router.post('/comments', commentController.addComment);
  return app.use('/api/v1', router);
};

export default initCommentRoutes;
