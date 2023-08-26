import { Identification } from '..';

export interface IUser extends Identification {
  username: string;
  role: string;
  email: string;
  password: string;
}
