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

  // public async getMatchesByQuery(inProgress: string): Promise<ServiceResponse<IMatch[]>> {
  //   const matches = await this._matchModel.findByQuery(inProgress);
  //   return { status: 'SUCCESSFUL', data: matches };
  // }
}
