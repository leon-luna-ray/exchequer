import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token with your secret key
    const decodedToken = jwt.verify(token, 'your_secret_key_here');

    req.userData = { userId: decodedToken.userId };

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};
