import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(inProgress?: string): Promise<IMatch[]>,
  findById(id: IMatch['id']): Promise<IMatch | null>
  updtateProgressMatch(id: IMatch['id']): Promise<void>,
  createMatch(data: any): Promise<any>,
}
