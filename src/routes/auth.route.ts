import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { UserDto } from '@dtos/users.dto';

class AuthRoute implements Routes {
  public path = '/auth';

  public router = Router();

  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, validationMiddleware(UserDto, 'body'), this.authController.signup);
    this.router.post(`${this.path}/login`, this.authController.login);
  }
}

export default AuthRoute;
