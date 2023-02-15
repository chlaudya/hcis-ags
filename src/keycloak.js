import Keycloak from 'keycloak-js';

const keycloakParam = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'hcis-user-management',
  clientId: 'hcis-user-app-client'
});

export default keycloakParam;
