import { combineReducers } from 'redux';
import customizationReducer from './customizationReducer';
import auth from './auth';
import { karyawanReducer } from './karyawan/karyawanReducer';

const rootReducer = combineReducers({
  auth: auth,
  karyawan: karyawanReducer,
  customization: customizationReducer
});

export default rootReducer;
