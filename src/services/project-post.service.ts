import { ProjectPost } from '../interfaces/project-post.interface';
import projectPostModel from '../models/project-post.model';
import isEmpty from '../utils/empty';
import { HttpException } from '../exceptions/HttpException';
import { ProjectPostDto } from '../dtos/project-post.dto';

class ProjectPostService {
  public posts = projectPostModel;

  public async findAllProjectPost(): Promise<ProjectPost[]> {
    const posts: ProjectPost[] = await this.posts.find();
    return posts;
  }

  public async findProjectPostById(postId: string): Promise<ProjectPost> {
    if (isEmpty(postId)) throw new HttpException(400, "You're not postId");

    const findProjectPost: ProjectPost = await this.posts.findOne({
      _id: postId,
    });
    if (!findProjectPost) throw new HttpException(409, "You're not user");

    return findProjectPost;
  }

  public async updateProjectPost(
    postId: string,
    postData: ProjectPostDto,
  ): Promise<ProjectPost> {
    if (isEmpty(postId)) throw new HttpException(400, "You're not postId");

    const updateProjectPostById: ProjectPost = await this.posts.findByIdAndUpdate(
      postId,
      { $set: postData },
      { returnDocument: 'after' },
    );
    if (!updateProjectPostById) throw new HttpException(409, "You're not post");

    return updateProjectPostById;
  }

  public async deleteProjectPost(userId: string): Promise<ProjectPost> {
    const deleteProjectPostById: ProjectPost = await this.posts.findByIdAndDelete(userId);
    if (!deleteProjectPostById) throw new HttpException(409, "You're not post");

    return deleteProjectPostById;
  }
}

export default ProjectPostService;
