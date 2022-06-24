import { ProjectPost } from '../interfaces/project-post.interface';
import projectPostModel from '../models/project-post.model';
import isEmpty from '../utils/empty';
import { HttpException } from '../exceptions/HttpException';
import { ProjectPostDto } from '../dtos/project-post.dto';

class ProjectPostService {
  public posts = projectPostModel;

  public async findAllProjectPost(): Promise<ProjectPost[]> {
    const posts: ProjectPost[] = await this.posts.find().select('-contents');
    return posts;
  }

  public async findProjectPostById(postId: string): Promise<ProjectPost> {
    if (isEmpty(postId)) throw new HttpException(400, 'You\'re not postId');

    const findProjectPost: ProjectPost = await this.posts.findOne({
      _id: postId,
    });
    if (!findProjectPost) throw new HttpException(409, 'You\'re not post');

    return findProjectPost;
  }

  public async createProjectPost(
    userId: string,
    projectPostData: ProjectPostDto,
  ): Promise<ProjectPost> {
    if (isEmpty(projectPostData)) throw new HttpException(400, 'You\'re not postData');

    const newProjectPost: ProjectPost = await this.posts.create({
      ...projectPostData,
      author: userId,
    });

    return newProjectPost;
  }

  public async updateProjectPost(
    postId: string,
    postData: ProjectPostDto,
    userId?: string,
  ): Promise<ProjectPost> {
    if (isEmpty(postId)) throw new HttpException(400, 'You\'re not postId');

    if (!userId) {
      const projectPostAuthorId = (await this.findProjectPostById(postId)).author;
      if (userId === projectPostAuthorId) throw new HttpException(401, 'You don\'t have permission');
    }
    const updateProjectPostById: ProjectPost = await this.posts.findByIdAndUpdate(
      postId,
      { $set: postData },
      { returnDocument: 'after' },
    );
    if (!updateProjectPostById) throw new HttpException(409, 'You\'re not post');

    return updateProjectPostById;
  }

  public async deleteProjectPost(postId: string, userId?: string): Promise<ProjectPost> {
    if (!userId) {
      const projectPostAuthorId = (await this.findProjectPostById(postId)).author;
      if (userId === projectPostAuthorId) throw new HttpException(401, 'You don\'t have permission');
    }
    const deleteProjectPostById: ProjectPost = await this.posts.findByIdAndDelete(postId);
    if (!deleteProjectPostById) throw new HttpException(409, 'You\'re not post');

    return deleteProjectPostById;
  }
}

export default ProjectPostService;
