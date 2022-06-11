import App from '@/app';
import userModel from '@models/user.model';
import AuthRoute from '@routes/auth.route';
import request from 'supertest';

const authRoute = new AuthRoute();
const app = new App([authRoute]);

describe('Auth Test', () => {
    before(async () => {
        const users = userModel;
        await users.findOneAndRemove({ where: { email: 'test@example.com' } });
    });

    describe('[POST] /auth/register', () => {
        it('회원가입', done => {
            request(app.getServer())
                .post('/auth/register')
                .send({
                    username: 'test',
                    email: 'test@example.com',
                    password: 'test1234',
                    fields: [
                        'FrontEnd',
                        'UI/UX'
                    ]
                })
                .expect({ data: true, message: 'register' })
                .expect(201, done);
        });

        it('회원가입 - 이메일 중복 에러', done => {
            request(app.getServer())
                .post('/auth/register')
                .send({
                    username: 'test1234',
                    email: 'test@example.com',
                    password: 'test',
                    fields: [
                        'BackEnd'
                    ]
                })
                .expect({ error: 'You\'re email test@example.com already exists' })
                .expect(409, done);
        });
    });

    describe('[POST] /auth/login', () => {
        it('로그인 - 틀린 이메일 & 가입되지 않은 회원', done => {
            request(app.getServer())
                .post('/auth/login')
                .send({
                    email: 'test2@example.com',
                    password: 'test1234',
                })
                .expect({ error: 'Incorrect email' })
                .expect(401, done);
        });
        it('로그인 - 틀린 비밀번호', done => {
            request(app.getServer())
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'test',
                })
                .expect({ error: 'Incorrect password' })
                .expect(401, done);
        });
    });

    describe('[GET] /auth/logout', () => {
        const agent = request.agent(app.getServer());
        let accessToken;
        beforeEach(done => {
            agent.post('/auth/login')
               .send({
                  email: 'test@example.com',
                  password: 'test1234',
               })
               .end((err, res) => {
                accessToken = res.body.data.accessToken;
                    done();
                });
         });

        it('로그아웃', done => {
            agent.get('/auth/logout')
                .set('Authorization', 'Bearer ' + accessToken)
                .expect({ data: true, message: 'logout' })
                .expect(200, done);
        });
    });

    describe('[GET] /auth/refresh', () => {
        const agent = request.agent(app.getServer());
        beforeEach(done => {
            agent.post('/auth/login')
               .send({
                  email: 'test@example.com',
                  password: 'test1234',
               })
               .end(done);
         });

        it('Access Token 재발급', done => {
            agent.get('/auth/refresh')
                .expect(200, done);
        });
    });

    after(async () => {
        const users = userModel;
        await users.findOneAndRemove({ where: { email: 'test@example.com' } });
    });
});