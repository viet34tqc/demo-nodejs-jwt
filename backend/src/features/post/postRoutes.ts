import express, { Application } from 'express';
import { verifyToken } from '../auth/middlewares/authorizedMiddleware';
import { PostController } from './PostControllers';

const router = express.Router();

const initPostRoutes = (app: Application) => {
  const postController = new PostController();
  router.use(verifyToken);
  router.get('/posts', postController.getPosts);
  router.get('/posts/:id', postController.getPost);
  router.delete('/posts/:id', postController.deletePost);
  router.post('/posts', postController.addPost);
  router.put('/posts', postController.updatePost);
  return app.use('/api/v1', router);
};

export default initPostRoutes;
