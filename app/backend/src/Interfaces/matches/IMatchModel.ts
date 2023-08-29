import { NewEntity } from '..';
import { IGoalsMatch, IMatch } from './IMatch';

export interface IMatchModel {
  findAll(inProgress?: string): Promise<IMatch[]>,
  findById(id: IMatch['id']): Promise<IMatch | null>
  updtateMatch(id: IMatch['id'], data?: IGoalsMatch): Promise<void | number>,
  createMatch(data: NewEntity<IMatch>): Promise<IMatch>,
}
