const baseResponse = require('../data_access/model/baseResponse');

const middlewareRoute = () => {
  baseResponse.header.errors = [];
  baseResponse.data = null;
};

module.exports = middlewareRoute;
