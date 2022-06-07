import { NextFunction, Request, Response } from 'express';

import UserService from '@services/users.service';
import { User } from '@interfaces/users.interface';
import { UserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { JwtUserPayload } from '@interfaces/jwt.interface';

class UsersController {
  public userService = new UserService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();
      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const tokenPayload: JwtUserPayload = req.jwtPayload;
      const userData: UserDto = req.body;
      let updateUserData: User;
      if (tokenPayload.admin) {
        updateUserData = await this.userService.updateUser(userId, userData);
      } else {
        if (userId !== tokenPayload.id) next(new HttpException(401, 'Token is invalid'));
        updateUserData = await this.userService.updateUser(userId, userData);
      }

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const tokenPayload: JwtUserPayload = req.jwtPayload;
      let deleteUserData: User;
      if (tokenPayload.admin) {
        deleteUserData = await this.userService.deleteUser(userId);
      } else {
        if (userId !== tokenPayload.id) next(new HttpException(401, 'Token is invalid'));
        deleteUserData = await this.userService.deleteUser(userId);
      }

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
