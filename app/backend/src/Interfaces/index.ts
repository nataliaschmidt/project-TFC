export type NewEntity<T> = Omit<T, 'id' | 'inProgress'>;

export type Id = number;

export type Identification = { id: Id };
