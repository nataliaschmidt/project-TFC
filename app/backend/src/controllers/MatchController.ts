import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';
import { IGoalsMatch } from '../Interfaces/matches/IMatch';

export default class MatchController {
  private _matchService: MatchService;

  constructor(matchService = new MatchService()) {
    this._matchService = matchService;
  }

  public async getAllTeams(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      const { status, data } = await this._matchService
        .getMatches(inProgress as string | undefined);
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  public async updateMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const goals = req.body;
      const { status, data } = await this._matchService
        .updateMatch(Number(id), goals as IGoalsMatch | undefined);
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      console.log('ERRO', error);
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  public async createMatch(req: Request, res: Response) {
    try {
      const { status, data } = await this._matchService.createMatch(req.body);
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
