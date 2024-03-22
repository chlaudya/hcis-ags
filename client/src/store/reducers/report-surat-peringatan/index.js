import { combineReducers } from 'redux';
import { reportReducer } from './reportSPReducer';

const reportReducersCombine = combineReducers({
  reportReducer
});

export default reportReducersCombine;
