import userModel from '../src/models/user.model';
import UsersRoute from '../src/routes/users.route';
import AuthRoute from '../src/routes/auth.route';
import request from 'supertest';
import { verify } from '../src/utils/jwt.utils';
import { SECRET_KEY } from '../src/config/env.config';
import { JwtUserPayload } from '../src/interfaces/jwt.interface';
import App from '../src/app';

const usersRoute = new UsersRoute();
const authRoute = new AuthRoute();
const app = new App([usersRoute, authRoute]);

beforeAll(async () => {
  const users = userModel;
  await users.findOneAndRemove({ where: { email: 'test2@example.com' } });
});

describe('Users Test', () => {
  // 회원가입 & 로그인 -> 토큰
  let accessToken: string;
  beforeAll((done) => {
    request(app.getServer())
      .post('/auth/register')
      .send({
        username: 'test',
        email: 'test2@example.com',
        password: 'test1234',
        fields: [
          'frontend',
          'design',
        ],
        stacks: [
          'javascript',
          'react',
        ],
      }).end(done);
  });
  beforeAll((done) => {
    request(app.getServer())
      .post('/auth/login')
      .send({
        email: 'test2@example.com',
        password: 'test1234',
      })
      .end((err, res) => {
        accessToken = res.body.data.accessToken;
        done();
      });
  });

  describe('[GET] /users', () => {
    it('유저 목록 불러오기 - 성공', (done) => {
      request(app.getServer())
        .get('/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200, done);
    });
    it('유저 아이디로 정보 불러오기 - 성공', (done) => {
      const jwtPayload = verify(accessToken, SECRET_KEY) as JwtUserPayload;
      const userId = jwtPayload.id;
      request(app.getServer())
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200, done);
    });
  });

  describe('[PATCH] /users/:id', () => {
    it('유저 프로필 업데이트 - 성공', (done) => {
      const jwtPayload = verify(accessToken, SECRET_KEY) as JwtUserPayload;
      const userId = jwtPayload.id;
      request(app.getServer())
        .patch(`/users/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          username: 'update-test',
          fields: ['backend'],
        })
        .expect(200, done);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('유저 삭제 - 성공', (done) => {
      const jwtPayload = verify(accessToken, SECRET_KEY) as JwtUserPayload;
      const userId = jwtPayload.id;
      request(app.getServer())
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200, done);
    });
  });
});

afterAll(async () => {
  const users = userModel;
  await users.findOneAndRemove({ where: { email: 'test2@example.com' } });
});
