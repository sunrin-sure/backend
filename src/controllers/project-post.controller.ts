import { NextFunction, Request, Response } from 'express';
import { ProjectPostDto } from '../dtos/project-post.dto';
import { HttpException } from '../exceptions/HttpException';
import { JwtUserPayload } from '../interfaces/jwt.interface';
import { ProjectPost } from '../interfaces/project-post.interface';
import ProjectPostService from '../services/project-post.service';

class ProjectPostController {
  public projectPostService = new ProjectPostService();

  public getProjectPosts = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const findAllProjectPostData = await this.projectPostService.findAllProjectPost();
      res
        .status(200)
        .json({ data: findAllProjectPostData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getProjectPostById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const postId: string = req.params.id;
      const findOneProjectPostData = await this.projectPostService.findProjectPostById(postId);

      res
        .status(200)
        .json({ data: findOneProjectPostData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createProjectPost = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId: string = req.jwtPayload.id;
      const projectPostData: ProjectPostDto = req.body;
      const newProjectPostData = await this.projectPostService.createProjectPost(userId, projectPostData);

      res.status(201).json({ data: newProjectPostData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateProjectPost = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const postId: string = req.params.id;
      const tokenPayload: JwtUserPayload = req.jwtPayload;
      const projectPostData: ProjectPostDto = req.body;
      let updateProjectPostData: ProjectPost;
      if (tokenPayload.admin) {
        updateProjectPostData = await this.projectPostService.updateProjectPost(
          postId,
          projectPostData,
        );
      } else {
        if (!tokenPayload.id) next(new HttpException(401, 'Token is invalid'));
        updateProjectPostData = await this.projectPostService.updateProjectPost(
          postId,
          projectPostData,
        );
      }

      res.status(200).json({ data: updateProjectPostData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProjectPost = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const postId: string = req.params.id;
      const tokenPayload: JwtUserPayload = req.jwtPayload;
      let deleteProjectPostData: ProjectPost;
      if (tokenPayload.admin) {
        deleteProjectPostData = await this.projectPostService.deleteProjectPost(
          postId,
        );
      } else {
        if (!tokenPayload.id) next(new HttpException(401, 'Token is invalid'));
        deleteProjectPostData = await this.projectPostService.deleteProjectPost(
          postId,
        );
      }

      res.status(200).json({ data: deleteProjectPostData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProjectPostController;
