import { ITeam } from '../Interfaces/teams/ITeam';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  private _teamModel: ITeamModel;
  constructor(teamModel = new TeamModel()) {
    this._teamModel = teamModel;
  }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this._teamModel.findAll();
    return {
      status: 'SUCCESSFUL',
      data: allTeams,
    };
  }
}
