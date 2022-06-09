import { NextFunction, Request, Response } from 'express';

import AuthService from '@services/auth.service';
import { UserDto } from '@dtos/users.dto';

class AuthController {
  public authService = new AuthService();

  public signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserDto = req.body;
      const signUpResult: boolean = await this.authService.signup(userData);

      res.status(201).json({ data: signUpResult, message: 'signup' });
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

  public refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jwtUserId = req.jwtPayload.id;
      const refreshToken = req.cookies.refreshToken;
      const newJwtToken = await this.authService.refresh(jwtUserId, refreshToken);

      res.status(200).json({ data: newJwtToken, message: 'refresh new token' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
