import express, { Application } from 'express';
import UserController from './AuthController';
import { authMiddleware } from './AuthMiddleware';
import { authSchema } from './authValidation';

const router = express.Router();

const initUserRoutes = (app: Application) => {
  const userController = new UserController();
  router.post(
    '/auth/register',
    authMiddleware(authSchema),
    userController.register
  );
  router.put('/user/update', userController.update);
  return app.use('/api/v1', router);
};

export default initUserRoutes;
