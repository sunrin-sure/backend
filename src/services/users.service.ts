import userModel from '../models/user.model';
import { User } from '../interfaces/users.interface';
import isEmpty from '../utils/empty';
import { HttpException } from '../exceptions/HttpException';
import { UserDto } from '../dtos/users.dto';
import { avatarImageResizer } from '../utils/image-resizer';
import { CloudinaryService } from './cloudinary.service';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find().select({
      _id: 1, username: 1, fields: 1, stacks: 1,
    });
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'You\'re not userId');

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, 'You\'re not user');

    return findUser;
  }

  public async updateUser(userId: string, userData: UserDto): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'You\'re not userId');

    if (userData.email) throw new HttpException(400, 'Email cannot be updated');
    if (userData.password) throw new HttpException(400, 'Password cannot be updated');
    if (userData.avatar) throw new HttpException(400, 'Avatar cannot be updated');

    const updateUserById: User = await this.users.findByIdAndUpdate(userId, { $set: userData }, { returnDocument: 'after' });
    if (!updateUserById) throw new HttpException(409, 'You\'re not user');

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, 'You\'re not user');

    return deleteUserById;
  }

  public async uploadUserAvatar(userId: string, fileData: Express.Multer.File): Promise<User> {
    const fileBuffer: Buffer = await avatarImageResizer(fileData);
    const cloudinary = new CloudinaryService(fileBuffer, userId);
    const result = await cloudinary.uploadImage();
    if (result instanceof HttpException) throw result;

    const addAvatarInUser: User = await this.users.findByIdAndUpdate(userId, { $set: { avatar: result.url } }, { returnDocument: 'after' });
    if (!addAvatarInUser) throw new HttpException(409, 'You\'re not user');

    return addAvatarInUser;
  }
}

export default UserService;
