import express, { Application } from 'express';
import UserController from './AuthController';
import { authSchema } from './authValidationSchema';
import { validatePwdMiddleware } from './middlewares/validatePwdMiddleware';

const router = express.Router();

const initUserRoutes = (app: Application) => {
  const userController = new UserController();
  router.post('/auth/register', validatePwdMiddleware(authSchema), userController.register);
  router.post('/auth/login', validatePwdMiddleware(authSchema), userController.login);
  router.post('/auth/refreshToken', userController.refreshToken);
  return app.use('/api/v1', router);
};

export default initUserRoutes;
