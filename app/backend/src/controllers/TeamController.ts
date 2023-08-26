import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  private _teamService: TeamService;

  constructor(teamService = new TeamService()) {
    this._teamService = teamService;
  }

  public async getAllTeams(_req: Request, res: Response) {
    try {
      const { status, data } = await this._teamService.getAllTeams();
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  public async getTeamById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status, data } = await this._teamService.getTeamById(Number(id));
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
