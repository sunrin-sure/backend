import { ACCESS_EXPIRATION, REFRESH_EXPIRATION, SECRET_KEY } from '@config';
import { User } from '@interfaces/users.interface';
import { JwtUserPayload } from '@interfaces/jwt.interface';
import jwt from 'jsonwebtoken';

const sign = (user: User) => {
  const payload = {
    id: user._id,
    admin: user.admin,
  };

  const token = jwt.sign(payload, SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: ACCESS_EXPIRATION,
  });

  return token;
};

const verify = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtUserPayload;
    return { ok: true, payload: decoded };
  } catch (error) {
    return { ok: false, message: error.message };
  }
};

const refresh = () => {
  const token = jwt.sign({}, SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: REFRESH_EXPIRATION,
  });

  return token;
};

// const refreshVerify = (token: string, userId: string) => {
//   const users = userModel;
//   try {
//     const findUser: User = users.findById(userId);
//     const _token = findUser.refresh_token;

//     if (token === _token) jwt.verify(token, SECRET_KEY);
//     return true;
//   } catch (error) {
//     return false;
//   }
// }

export { sign, verify, refresh };
