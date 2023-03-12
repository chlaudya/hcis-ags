import { combineReducers } from 'redux';
import { karyawanReducer } from './karyawanReducer';

const karyawanReducersCombine = combineReducers({
  karyawanReducer
});

export default karyawanReducersCombine;
