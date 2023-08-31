import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeam } from '../Interfaces/teams/ITeam';
import LeaderBoardUtils from '../utils/LeaderBoardFunctions';
import ILeaderBoard, { Match } from '../Interfaces/leaderboard/ILeaderBoard';

export default class LeaderboardService {
  static async getGroupsMatches(teams: ITeam[]): Promise<Promise<Match[]>[]> {
    return teams.map(async (team) => {
      const dbData = await SequelizeMatches
        .findAll({ where: { homeTeamId: team.id, inProgress: false },
          attributes: { exclude: ['id', 'homeTeamId', 'awayTeamId', 'inProgress'] },
          include: [{ model: SequelizeTeams,
            as: 'homeTeam',
            attributes: { exclude: ['id'] } }] });

      return dbData.map((match) => ({
        homeTeamGoals: match.homeTeamGoals,
        awayTeamGoals: match.awayTeamGoals,
        homeTeam: match.homeTeam?.teamName,
      }));
    });
  }

  static async getLeaderBoard(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const teams = await new TeamModel().findAll();
    const groupMatchesPromisse = await this.getGroupsMatches(teams);
    const groupMatches: Match[][] = await Promise.all(groupMatchesPromisse);

    const teste = LeaderBoardUtils.calcStatistics(groupMatches);
    return { status: 'SUCCESSFUL', data: teste };
  }
}
