import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { IGoalsMatch, IMatch } from '../Interfaces/matches/IMatch';
import { NewEntity } from '../Interfaces';

export default class MatchService {
  private _matchModel: IMatchModel;
  constructor(matchModel = new MatchModel()) {
    this._matchModel = matchModel;
  }

  public async getMatches(inProgress?: string): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this._matchModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async updateMatch(id: number, data?: IGoalsMatch):
  Promise<ServiceResponse<{ message: string }>> {
    const match = await this._matchModel
      .updtateMatch(id, data);
    if (!match) {
      return { status: 'NOT_FOUND',
        data: { message: `No match found with id ${id}` } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async createMatch(data: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const createdMatch = await this._matchModel.createMatch(data);
    return { status: 'CREATED', data: createdMatch };
  }
}
