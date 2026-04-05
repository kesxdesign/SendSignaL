const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      data: null,
      error: { code: 'UNAUTHORIZED', message: 'No authentication token provided' },
      meta: { timestamp: new Date().toISOString() }
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret_dev_key');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      data: null,
      error: { code: 'UNAUTHORIZED', message: 'Invalid or expired token' },
      meta: { timestamp: new Date().toISOString() }
    });
  }
};

module.exports = { authenticate };
