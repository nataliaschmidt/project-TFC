import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (req: Request, res: Response) => LeaderboardController.getAllTeams(req, res),
);

export default leaderboardRouter;
