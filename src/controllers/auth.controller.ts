import { NextFunction, Request, Response } from 'express';

import AuthService from '@services/auth.service';
import { UserDto } from '@dtos/users.dto';

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
      const jwtTokenAndCookies = await this.authService.login(userData);

      res.cookie('access_token', jwtTokenAndCookies.tokens.accessToken, jwtTokenAndCookies.cookieOptions.accessCookie);
      res.cookie('refresh_token', jwtTokenAndCookies.tokens.refreshToken, jwtTokenAndCookies.cookieOptions.refreshCookie);
      res.cookie('logged_in', true, {
        ...jwtTokenAndCookies.cookieOptions.accessCookie,
        httpOnly: false,
      });
      
      res.status(200).json({ data: jwtTokenAndCookies.tokens, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie('access_token', '', { maxAge: 1 });
      res.cookie('refresh_token', '', { maxAge: 1 });
      res.cookie('logged_in', '', {
        maxAge: 1,
      });
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
