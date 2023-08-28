import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validation';

const userController = new UserController();

const loginRouter = Router();

loginRouter.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) => userController.loginRole(req, res),
);

loginRouter.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

export default loginRouter;
