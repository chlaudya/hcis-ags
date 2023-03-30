import { combineReducers } from 'redux';
import { dashboardReducer } from './dashboardReducer';

const dashboardReducersCombine = combineReducers({
  dashboardReducer
});

export default dashboardReducersCombine;
