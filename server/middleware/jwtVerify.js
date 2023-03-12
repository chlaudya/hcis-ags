const config = require('config');
const jwtConfig = config.get('jwtConfig');
const _logger = require('../utilities/logging');

module.exports = function (req, res, next) {
  const token = req.header(jwtConfig.cookiesName);
  const cookie = req.cookies ? req.cookies[jwtConfig.cookiesName] : null;
  if (!token) {
    _logger.error(req.originalUrl + ' No token, authorization denied');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    if (token && cookie) {
      next();
    } else {
      res.status(401).json({ message: 'Token invalid' });
    }
  } catch {
    _logger.error(req.originalUrl + ' Token invalid');
    res.status(401).json({ message: 'Token invalid' });
  }
};
