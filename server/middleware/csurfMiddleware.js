const _logger = require('../utilities/logging');

module.exports = function (req, res, next) {
  let csrf = req.csrfToken();
  try {
    if (csrf) {
      next();
    } else {
      res.status(401).json({ message: 'Token invalid' });
    }
  } catch {
    _logger.error(req.originalUrl + ' Token invalid');
    res.status(401).json({ message: 'Token invalid' });
  }
};
