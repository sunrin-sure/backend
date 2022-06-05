import userModel from '@models/user.model';
import { User } from '@interfaces/users.interface';
import isEmpty from '@utils/empty';
import { hash } from 'bcrypt';
import { HttpException } from '@exceptions/HttpException';
import { CreateUserDto } from '@dtos/users.dto';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find().select({ _id: 1, username: 1, fields: 1 });
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'You\'re not userId');

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, 'You\'re not user');

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'You\'re not userData');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) {
      throw new HttpException(409, `You're email ${userData.email} already exists`);
    }
    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'You\'re not userId');

    if (userData.email) throw new HttpException(400, 'Email cannot be updated.');
    if (userData.password) throw new HttpException(400, 'Password cannot be updated.');

    const updateUserById: User = await this.users.findByIdAndUpdate(userId, userData, { returnDocument: 'after' });
    if (!updateUserById) throw new HttpException(409, 'You\'re not user');

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, 'You\'re not user');

    return deleteUserById;
  }
}

export default UserService;
