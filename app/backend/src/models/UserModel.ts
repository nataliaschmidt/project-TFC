import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import SequelizeUser from '../database/models/SequellizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  public async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;

    const { id, username, role, password } = user;
    return { id, username, role, email, password };
  }
}
