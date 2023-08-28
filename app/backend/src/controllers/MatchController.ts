import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchController {
  private _matchService: MatchService;

  constructor(matchService = new MatchService()) {
    this._matchService = matchService;
  }

  public async getAllTeams(_req: Request, res: Response) {
    try {
      const { status, data } = await this._matchService.getAllMatches();
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
