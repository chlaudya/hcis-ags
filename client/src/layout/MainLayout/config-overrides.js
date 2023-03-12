const path = require('path');
const { alias } = require('react-app-rewire-alias');

module.exports = {
  paths: function (paths, env) {
    paths.appIndexJs = path.resolve(__dirname, './client/src/index.js');
    paths.appSrc = path.resolve(__dirname, './client');
    paths.appPublic = path.resolve(__dirname, './client/public');
    paths.appHtml = path.resolve(__dirname, './client/public/index.html');
    paths.appBuild = path.resolve(__dirname, './release/client');
    return paths;
  },
  webpack: function override(config) {
    alias({
      src: path.resolve(__dirname, './client/src'),
      assets: path.resolve(__dirname, './client/src/assets'),
      constants: path.resolve(__dirname, './client/src/constants'),
      hooks: path.resolve(__dirname, './client/src/hooks'),
      keycloak: path.resolve(__dirname, './client/src/keycloak'),
      layout: path.resolve(__dirname, './client/src/layout'),
      menuItems: path.resolve(__dirname, './client/src/menu-items'),
      routes: path.resolve(__dirname, './client/src/routes'),
      store: path.resolve(__dirname, './client/src/store'),
      themes: path.resolve(__dirname, './client/src/themes'),
      utils: path.resolve(__dirname, './client/src/utils'),
      views: path.resolve(__dirname, './client/src/views')
    })(config);
    return config;
  }
};
