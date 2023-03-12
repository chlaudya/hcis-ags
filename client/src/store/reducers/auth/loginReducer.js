import cookieToken from 'utils/setAuthToken';

const initialState = {
  token: null,
  isAuthenticated: null,
  loading: true,
  user: {},
  message: {}
};

export const login = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_WITH_JWT': {
      return {
        ...state,
        token: action.payload.token,
        user: {},
        isAuthenticated: true,
        loading: false
      };
    }
    case 'USER_LOADED': {
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false
      };
    }
    case 'LOGOUT_WITH_JWT':
    case 'AUTH_ERROR': {
      cookieToken.remove();
      return { ...state, token: null, isAuthenticated: false, loading: false };
    }
    case 'ERROR_AUTH': {
      cookieToken.remove();
      return {
        ...state,
        message: action.payload.message,
        isAuthenticated: false,
        loading: false
      };
    }
    default: {
      return state;
    }
  }
};
