import { compareSync, hash } from 'bcrypt';
import userModel from '../models/user.model';
import { User } from '../interfaces/users.interface';
import isEmpty from '../utils/empty';
import { HttpException } from '../exceptions/HttpException';
import { UserDto } from '../dtos/users.dto';
import * as jwt from '../utils/jwt.utils';
import { R_SECRET_KEY } from '../config/env.config';

class AuthService {
  public users = userModel;

  public async register(userData: UserDto): Promise<boolean> {
    if (isEmpty(userData)) throw new HttpException(400, 'You\'re not userData');

    if (await this.users.findOne({ username: userData.username })) {
      throw new HttpException(409, `You're username ${userData.username} already exists`);
    }
    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) {
      throw new HttpException(409, `You're email ${userData.email} already exists`);
    }
    const hashedPassword = await hash(userData.password, 10);
    const isSuccessCreate: boolean = !isEmpty(await this.users.create({
      ...userData,
      password: hashedPassword,
    }));

    return isSuccessCreate;
  }

  public async login(userData: UserDto) {
    if (isEmpty(userData.email)) throw new HttpException(401, 'Email is empty');

    const findUser: User = await this.users.findOne({
      email: userData.email,
    })
      .select('+password');

    if (!findUser) throw new HttpException(401, 'Incorrect email');

    const isCompare: boolean = compareSync(userData.password, findUser.password);
    if (!isCompare) throw new HttpException(401, 'Incorrect password');

    const accessToken = jwt.sign({ id: findUser._id, admin: findUser.admin });
    const { refreshToken, refreshTokenCookieOptions } = jwt.refresh({ id: findUser._id });

    const userRefreshToken = { refresh_token: refreshToken } as User;

    const updateRefreshToken = await this.users.findByIdAndUpdate(findUser._id, { $set: userRefreshToken }, { returnDocument: 'after' });
    if (!updateRefreshToken) throw new HttpException(409, 'You\'re not user');

    return { token: { accessToken, refreshToken }, user: findUser, refreshTokenCookieOptions };
  }

  public async logout(userId: string) {
    if (isEmpty(userId)) throw new HttpException(400, 'You\'re not user');
    const findUser: User = await this.users.findByIdAndUpdate(userId, { refresh_token: '' }, { returnDocument: 'after' });

    return findUser;
  }

  public async refresh(refreshToken: string) {
    const findUser: User = await this.users.findOne({
      where: { refresh_token: refreshToken },
    })
      .select({ _id: 1, admin: 1, refresh_token: 1 });
    if (!findUser) throw new HttpException(401, 'You don\'t have refresh token');

    const refreshDecodedToken = jwt.verify(refreshToken, R_SECRET_KEY);
    if (refreshDecodedToken instanceof HttpException) throw refreshDecodedToken;
    console.log(findUser._id.toString(), refreshDecodedToken.id);
    if (findUser._id.toString() !== refreshDecodedToken.id) throw new HttpException(401, 'Invalid refresh token');
    const newAccessTokenAndCookie = jwt.sign({ id: findUser._id, admin: findUser.admin });

    return newAccessTokenAndCookie;
  }
}

export default AuthService;
