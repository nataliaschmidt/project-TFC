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
}
