import { Router } from 'express';
import multer from 'multer';
import UsersController from '../controllers/users.controller';
import { Routes } from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { UserDto } from '../dtos/users.dto';
import authMiddleware from '../middlewares/auth.middleware';
import { multerConfig } from '../config/multer.config';

class UsersRoute implements Routes {
  public path = '/users';

  public router = Router();

  public usersController = new UsersController();

  public upload = multer(multerConfig);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.usersController.getUsers);
    this.router.get(`${this.path}/:id`, authMiddleware, this.usersController.getUserById);
    this.router.patch(`${this.path}`, [authMiddleware, validationMiddleware(UserDto, 'body', true)], this.usersController.updateUser);
    this.router.patch(`${this.path}/:id`, [authMiddleware, validationMiddleware(UserDto, 'body', true)], this.usersController.updateUser);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.usersController.deleteUser);
    this.router.put(`${this.path}/upload`, [authMiddleware, this.upload.single('avatar')], this.usersController.uploadUserAvatar);
  }
}

export default UsersRoute;
