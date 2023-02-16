import express, { Application } from 'express';
import UserController from './AuthController';
import { authSchema } from './authValidationSchema';
import { verifyToken } from './middlewares/authorizedMiddleware';
import { validatePwdMiddleware } from './middlewares/validatePwdMiddleware';

const router = express.Router();

const initUserRoutes = (app: Application) => {
  const userController = new UserController();
  router.post('/auth/register', validatePwdMiddleware(authSchema), userController.register);
  router.post('/auth/login', validatePwdMiddleware(authSchema), userController.login);
  router.get('/logout', verifyToken, userController.logout);
  router.get('/me', verifyToken, userController.getCurrentUser);
  router.post('/auth/refreshToken', userController.refreshToken);
  return app.use('/api/v1', router);
};

export default initUserRoutes;
