import express, { Application } from 'express';
import { verifyToken } from '../auth/middlewares/authorizedMiddleware';
import { PostController } from './PostControllers';

const router = express.Router();

const initPostRoutes = (app: Application) => {
  const postController = new PostController();
  router.use(verifyToken);
  router.get('/posts', postController.getPosts);
  return app.use('/api/v1', router);
};

export default initPostRoutes;
