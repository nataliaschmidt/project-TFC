import { NewEntity } from '../Interfaces';
import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IGoalsMatch, IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';

type Filter = {
  inProgress?: boolean
};

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatches;

  public async findAll(inProgress?: string): Promise<IMatch[]> {
    const filter: Filter = {};
    if (inProgress !== undefined) {
      filter.inProgress = inProgress === 'true';
    }

    const dbData = await this.model.findAll({
      where: filter,
      include: [
        {
          model: SequelizeTeams,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: SequelizeTeams,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        }] });

    return dbData;
  }

  public async findById(id: number): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress } = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  public async updtateMatch(id: number, data?: IGoalsMatch): Promise<void | number> {
    console.log(data?.homeTeamGoals === undefined);
    const match = await this.findById(id);
    if (!match) return 0;
    if (data?.homeTeamGoals === undefined) {
      await this.model.update({ inProgress: false }, { where: { id } });
    }
    if (data?.homeTeamGoals !== undefined) {
      await this.model.update(
        { homeTeamGoals: data.homeTeamGoals, awayTeamGoals: data.awayTeamGoals },
        { where: { id } },
      );
    }
    return 1;
  }

  public async createMatch(data: NewEntity<IMatch>): Promise<IMatch | null> {
    const homeTeam = await SequelizeTeams.findByPk(data.homeTeamId);
    const awayTeam = await SequelizeTeams.findByPk(data.awayTeamId);
    if (!homeTeam || !awayTeam) return null;

    const newMatch = { ...data, inProgress: true };
    const dbData = await this.model.create(newMatch);

    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatch = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
