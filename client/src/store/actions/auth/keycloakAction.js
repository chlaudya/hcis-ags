import axios from 'axios';
import { logoutWithJWT } from './loginActions';
import { store } from '../../storeConfig/store';
import jwt_decode from 'jwt-decode';
import lodash from 'lodash';

const BASE_URL = process.env.REACT_APP_BACKEND_URI || '';

export const MenuPermission = () => {
  return (dispatch) => {
    axios
      .get(BASE_URL + `/api/v1/authorization/menu_permission`)
      .then((response) => {
        if (response.data) {
          dispatch({
            type: 'KEYCLOAK_MENU_PERMISSION',
            payload: response.data
          });
        }
      })
      .catch((error) => {
        var { status } = error.response;
        if (status === 401) {
          store.dispatch(logoutWithJWT());
        }
        dispatch({
          type: 'KEYCLOAK_MENU_PERMISSION',
          payload: []
        });
      });
  };
};
export const ListClient = () => {
  return (dispatch) => {
    axios
      .get(BASE_URL + '/keycloak-api/admin/realms/' + process.env.REACT_APP_KEYCLOAK_REALM + '/clients')
      .then((response) => {
        if (response.data) {
          let { headers } = response.config;
          let { aud } = jwt_decode(headers.Authorization.replace('Bearer ', ''));
          let data = lodash.filter(response.data, function (o) {
            return (
              lodash.includes(aud, o.clientId) &&
              !o.name?.includes('$') &&
              !o.clientId.includes(process.env.REACT_APP_KEYCLOAK_CLIENTID + '-authorization')
            );
          });
          dispatch({
            type: 'KEYCLOAK_LIST_CLIENT',
            payload: data
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'KEYCLOAK_LIST_CLIENT',
          payload: []
        });
      });
  };
};
