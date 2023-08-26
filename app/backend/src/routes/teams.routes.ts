import { Request, Router, Response } from 'express';
import TeamController from '../controllers/TeamController';

const teamsController = new TeamController();

const teamsRouter = Router();

teamsRouter.get('/', (req: Request, res: Response) => teamsController.getAllTeams(req, res));
teamsRouter.get('/:id', (req: Request, res: Response) => teamsController.getTeamById(req, res));

export default teamsRouter;
