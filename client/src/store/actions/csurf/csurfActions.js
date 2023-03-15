import axios from 'axios';
import { NotAuthorizedHandling } from '../auth/loginActions';

const BASE_URL = process.env.REACT_APP_BACKEND_URI || '';

export const csurfToken = () => {
  return async (dispatch, getState) => {
    axios
      .get(BASE_URL + `/api/v1/auth/csrf`, { withCredentials: true })
      .then((response) => {
        if (response.data) {
          let { CSRFToken } = response.data;
          CSRFToken = CSRFToken || null;
          dispatch({
            type: 'GET_CSURF',
            payload: CSRFToken,
          });
        }
      })
      .catch((err) => NotAuthorizedHandling(err, dispatch));
  };
};
export const generateCsurfToken = () => {
  return axios
    .get(BASE_URL + `/api/v1/auth/csrf`, { withCredentials: true })
    .then((response) => {
      if (response.data) {
        let { CSRFToken } = response.data;
        return CSRFToken || null;
      }
    })
    .catch((err) => console.log(err.message));
};
