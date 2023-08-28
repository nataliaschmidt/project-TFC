import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatch } from '../Interfaces/matches/IMatch';
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

  public async updtateProgressMatch(id: number): Promise<void> {
    // const match = await this.findById(id);
    // if (!match) return null;
    // const matchFinished = { ...match, inProgress: false };

    await this.model.update({ inProgress: false }, { where: { id } });

    // return matchFinished;
  }

  public async createMatch(data: any): Promise<any> {
    const newMatch = { ...data, inProgress: true };
    const dbData = await this.model.create(newMatch);

    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatch = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
