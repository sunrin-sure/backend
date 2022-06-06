import { NextFunction, Request, Response } from 'express';

import AuthService from '@services/auth.service';
import { User } from '@interfaces/users.interface';
import { UserDto } from '@/dtos/users.dto';

class AuthController {
  public authService = new AuthService();

  public signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserDto = req.body;
      const createUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: createUserData, message: 'singup' });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserDto = req.body;
      const jwtToken = await this.authService.login(userData);

      res.status(200).json({ data: jwtToken, message: 'login' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
