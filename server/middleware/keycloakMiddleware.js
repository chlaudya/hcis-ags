const axios = require('axios');
const config = require('config');
const keycloakApi = config.get('keycloak');

const keycloakMiddleware = async (request, response, next) => {
  try {
    if (!request.headers.authorization) throw new Error('Token verification failed');
    const token = request.headers.authorization;
    const headerRequest = {
      headers: {
        Authorization: token
      }
    };

    await axios
      .get(
        `${keycloakApi.Url}/realms/${keycloakApi.Realms}/protocol/openid-connect/userinfo`,
        headerRequest
      )
      .then(() => next())
      .catch((error) => {
        console.error(error);
        response.status(401).json(error.response);
      });
  } catch (error) {
    response.status(401).json(error);
  }
};
module.exports = keycloakMiddleware;
