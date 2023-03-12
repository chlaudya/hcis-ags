import { useNavigate } from 'react-router';
import jwt_decode from 'jwt-decode';
import cookieToken from 'utils/cookieToken';

export const loginWithJWT = (user) => {
  return async (dispatch) => {};
};

export const loginWithToken = (token) => {
  return (dispatch) => {
    cookieToken.set(token);
    dispatch({
      type: 'LOGIN_WITH_JWT',
      payload: { token }
    });
    dispatch(loadUser());
  };
};
export const logoutWithJWT = () => {
  return (dispatch) => {
    cookieToken.remove();
    dispatch({ type: 'LOGOUT_WITH_JWT', payload: {} });
  };
};
export const NotAuthorizedHandling = (error, dispatch) => {
  const navigate = useNavigate();

  if (error.response.status === 401) {
    cookieToken.remove();
    navigate('/login');
  } else if (error.response.status === 429) {
    let message = '';
    let { header } = error.response.data;
    let error = header.errors[0] || header.error[0] || header.error;
    message = error.message || JSON.stringify(error.response.data);
    cookieToken.remove();
    if (dispatch) {
      dispatch({
        type: 'ERROR_AUTH',
        payload: {
          message: message
        }
      });
    }
    navigate('/login');
  }
};
export const loadUser = () => {
  return async (dispatch) => {
    let credential = cookieToken.privateToken();
    if (credential) {
      let decoded = jwt_decode(credential);
      dispatch({
        type: 'USER_LOADED',
        payload: { user: decoded }
      });
    }
  };
};
