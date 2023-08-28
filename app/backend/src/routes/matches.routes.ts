import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';

const matchesRouter = Router();

const matchController = new MatchController();
matchesRouter.get('/', (req: Request, res: Response) => matchController.getAllTeams(req, res));

export default matchesRouter;
