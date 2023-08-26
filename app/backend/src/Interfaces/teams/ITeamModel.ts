import { Id } from '..';
import { ITeam } from './ITeam';

export interface ITeamModel {
  findAll(): Promise<ITeam[]>,
  findById(d: Id): Promise<ITeam | null>,
}
