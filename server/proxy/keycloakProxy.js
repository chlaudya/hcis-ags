const axios = require('axios');
const config = require('config');
const keycloak = config.get('keycloak');
const baseProxy = require('./baseProxy');
const _ = require('lodash');
const jwt_decode = require('jwt-decode');

const KeycloakProxy = {
  menuPermission: async function (token) {
    let data = new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
      audience: keycloak.ClientId,
      response_mode: 'permissions'
    }).toString();

    let requestParam = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: token
      }
    };
    return axios
      .post(
        keycloak.Url + '/realms/' + keycloak.Realms + '/protocol/openid-connect/token',
        data,
        requestParam
      )
      .then((response) => response.data)
      .catch(function (error) {
        baseProxy.errorHandling(error);
        throw error;
      });
  },
  listClient: async (token) => {
    let { aud } = jwt_decode(token);
    return axios
      .get(keycloak.Url + '/admin/realms/' + keycloak.Realms + '/clients', {
        headers: { Authorization: token }
      })
      .then(function (response) {
        let data = _.filter(response.data, function (o) {
          return _.includes(aud, o.clientId) && !o.name.includes('$');
        });
        return data;
      })
      .catch(function (error) {
        throw error;
      });
  }
};

module.exports = KeycloakProxy;
