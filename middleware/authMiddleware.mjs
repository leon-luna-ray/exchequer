import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token with your secret key
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    req.userData = { userId: decodedToken.userId };

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};
