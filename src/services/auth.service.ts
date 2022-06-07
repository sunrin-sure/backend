import userModel from '@models/user.model';
import { User } from '@interfaces/users.interface';
import isEmpty from '@utils/empty';
import { compareSync, hash } from 'bcrypt';
import { HttpException } from '@exceptions/HttpException';
import { UserDto } from '@dtos/users.dto';
import * as jwt from '@/utils/jwt.utils';

class AuthService {
  public users = userModel;

  public async signup(userData: UserDto): Promise<boolean> {
    if (isEmpty(userData)) throw new HttpException(400, 'You\'re not userData');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) {
      throw new HttpException(409, `You're email ${userData.email} already exists`);
    }
    const hashedPassword = await hash(userData.password, 10);
    const isSuccessCreate: boolean = !isEmpty(await this.users.create({ ...userData, password: hashedPassword }));

    return isSuccessCreate;
  }

  public async login(userData: UserDto) {
    if (isEmpty(userData.email)) throw new HttpException(401, 'Email is empty');

    const findUser: User = await this.users.findOne({
      email: userData.email,
    })
      .select({
        _id: 1,
        password: 1,
        admin: 1,
      });

    if (!findUser) throw new HttpException(401, 'Incorrect email');

    const isCompare: boolean = compareSync(userData.password, findUser.password);
    if (!isCompare) throw new HttpException(401, 'Incorrect password');

    const accessToken = jwt.sign(findUser);
    const refreshToken = jwt.refresh();

    const userRefreshToken = { refresh_token: refreshToken } as User;

    const updateRefreshToken = await this.users.findByIdAndUpdate(findUser._id, userRefreshToken, { returnDocument: 'after' });
    if (!updateRefreshToken) throw new HttpException(409, 'You\'re not user');

    return { accessToken, refreshToken };
  }
}

export default AuthService;
