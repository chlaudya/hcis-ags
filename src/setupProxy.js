const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/*', {
      target: 'http://103.190.28.147:8081',
      changeOrigin: true
    })
  );
};
