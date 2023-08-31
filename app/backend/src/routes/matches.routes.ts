import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validation';

const matchesRouter = Router();

const matchController = new MatchController();

matchesRouter.get('/', (req: Request, res: Response) => matchController.getAllTeams(req, res));

matchesRouter.post(
  '/',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

matchesRouter.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

matchesRouter.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

export default matchesRouter;
