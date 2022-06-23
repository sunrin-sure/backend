import { NextFunction, Request, Response } from 'express';

import AuthService from '../services/auth.service';
import { UserDto } from '../dtos/users.dto';

class AuthController {
  public authService = new AuthService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserDto = req.body;
      const registerResult: boolean = await this.authService.register(userData);

      res.status(201).json({ data: registerResult, message: 'register' });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserDto = req.body;
      const jwtTokenUserAndCookies = await this.authService.login(userData);

      res.cookie('refresh_token', jwtTokenUserAndCookies.token.refreshToken, jwtTokenUserAndCookies.refreshTokenCookieOptions);
      res.status(200).json({
        data: {
          accessToken: jwtTokenUserAndCookies.token.accessToken,
          refreshToken: jwtTokenUserAndCookies.token.refreshToken,
          user: jwtTokenUserAndCookies.user,
        },
        message: 'login',
      });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.jwtPayload.id;
      await this.authService.logout(userId);

      res.cookie('refresh_token', '', { maxAge: 1 });
      res.status(200).json({ data: true, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refresh_token;
      const newAccessToken = await this.authService.refresh(refreshToken);

      res.status(200).json({ data: { accessToken: newAccessToken }, message: 'refresh new token' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
