import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  private _userService: UserService;

  constructor(userService = new UserService()) {
    this._userService = userService;
  }

  public async login(req: Request, res: Response):Promise<Response> {
    try {
      const { status, data } = await this._userService.login(req.body);
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}