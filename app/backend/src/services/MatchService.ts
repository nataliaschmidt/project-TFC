import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';

export default class MatchService {
  private _matchModel: IMatchModel;
  constructor(matchModel = new MatchModel()) {
    this._matchModel = matchModel;
  }

  public async getMatches(inProgress?: string): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this._matchModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async updateMatch(id: number): Promise<ServiceResponse<{ message: string }>> {
    await this._matchModel.updtateProgressMatch(id);
    // if (!match) {
    //   return { status: 'NOT_FOUND',
    //     data: { message: `No match found with id ${id}` } };
    // }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async createMatch(data: any): Promise<any> {
    const createdMatch = await this._matchModel.createMatch(data);
    return { status: 'CREATED', data: createdMatch };
  }
}
