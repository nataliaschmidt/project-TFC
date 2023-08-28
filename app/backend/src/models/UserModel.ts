import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import SequelizeUser from '../database/models/SequellizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  public async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const foundUser = await this.model.findOne({ where: { email } });
    if (!foundUser) return null;

    const { id, username, role, password } = foundUser;
    return { id, username, role, email, password };
  }
}
