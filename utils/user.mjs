import jwt from 'jsonwebtoken';

const getUserFromAuth = (authHeaders) => {
  const token = authHeaders.split(' ')[1];
  const user = jwt.verify(token, process.env.SECRET_KEY);
  return user ? user : null;
};
export { getUserFromAuth };
