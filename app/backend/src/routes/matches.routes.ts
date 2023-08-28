import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';

const matchesRouter = Router();

const matchController = new MatchController();
// matchesRouter.get('/', (req: Request, res: Response) => matchController.getMatchesByQuery(req, res));
// matchesRouter.get('/', (req: Request, res: Response) => matchController.getAllTeams(req, res));

matchesRouter.get('/', (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress !== undefined) {
    matchController.getMatchesByQuery(req, res);
  } else {
    matchController.getAllTeams(req, res);
  }
});

export default matchesRouter;
