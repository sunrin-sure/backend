import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import ProjectPostController from '../controllers/project-post.controller';
import authMiddleware from '../middlewares/auth.middleware';
import { ProjectPostDto } from '../dtos/project-post.dto';
import validationMiddleware from '../middlewares/validation.middleware';

class ProjectPostRoute implements Routes {
  public path = '/project-post';

  public router = Router();

  public projectPostController = new ProjectPostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.projectPostController.getProjectPosts);
    this.router.get(`${this.path}/:id`, authMiddleware, this.projectPostController.getProjectPosts);
    this.router.patch(`${this.path}/:id`, [authMiddleware, validationMiddleware(ProjectPostDto, 'body', true)], this.projectPostController.updateProjectPost);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.projectPostController.deleteProjectPost);
  }
}

export default ProjectPostRoute;
