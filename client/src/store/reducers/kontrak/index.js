import { combineReducers } from 'redux';
import { kontrakReducer } from './kontrakReducer';

const kontrakReducersCombine = combineReducers({
  kontrakReducer
});

export default kontrakReducersCombine;
