import express, { Application } from 'express';
import UserController from './AuthController';
import { authMiddleware } from './AuthMiddleware';
import { authSchema } from './authValidationSchema';

const router = express.Router();

const initUserRoutes = (app: Application) => {
  const userController = new UserController();
  router.post('/auth/register', authMiddleware(authSchema), userController.register);
  router.post('/auth/login', authMiddleware(authSchema), userController.login);
  return app.use('/api/v1', router);
};

export default initUserRoutes;
