import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import AuthRoute from '@routes/auth.route';
import App from '@/app';

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
]);

app.listen();
