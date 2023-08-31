import { Id } from '.';

export interface ICRUDModelCreator<T> {
  create(data: Partial<T>): Promise<T>,
}

export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: Id): Promise<T | null>,
}

export interface ICRUDModelUpdater<T> {
  update(id: Id, data: Partial<T>): Promise<T | null>,
}

export interface ICRUDModel<T>
  extends ICRUDModelCreator<T>, ICRUDModelReader<T>, ICRUDModelUpdater<T>
{ }
