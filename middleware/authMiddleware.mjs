import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ error: err.message });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};
