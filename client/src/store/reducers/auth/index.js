import { combineReducers } from 'redux';
import { login } from './loginReducer';
import { keycloakReducer } from './keycloakReducer';

const authReducers = combineReducers({
  login,
  keycloakReducer,
});

export default authReducers;
