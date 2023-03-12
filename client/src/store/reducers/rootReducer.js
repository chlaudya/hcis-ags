import { combineReducers } from 'redux';
import customizationReducer from './customizationReducer';
import auth from './auth';
import { karyawanReducer } from './karyawan/karyawanReducer';
import { masterJabatanReducer } from './master-jabatan/masterJabatanReducer';

const rootReducer = combineReducers({
  auth: auth,
  karyawan: karyawanReducer,
  customization: customizationReducer,
  masterJabatan: masterJabatanReducer
});

export default rootReducer;
