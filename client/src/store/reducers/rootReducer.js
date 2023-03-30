import { combineReducers } from 'redux';
import customizationReducer from './customizationReducer';
import auth from './auth';
import csurf from './csurf';
import { karyawanReducer } from './karyawan/karyawanReducer';
import { masterJabatanReducer } from './master-jabatan/masterJabatanReducer';
import { masterBankReducer } from './master-bank/masterBankReducer';
import { masterIuranReducer } from './master-iuran/masterIuranReducer';
import { masterPajakReducer } from './master-pajak/masterPajakReducer';
import { masterTempatTugasReducer } from './master-tempat-tugas/masterTempatTugasReducer';
import { masterUnitBisnisReducer } from './master-unit-bisnis/masterUnitBisnisReducer';
import { kontrakReducer } from './kontrak/kontrakReducer';
import { reportReducer } from './report/reportReducer';
import { slipGajiReducer } from './slip-gaji/sliipGajiReducer';
import { dashboardReducer } from './dashboard/dashboardReducer';

const rootReducer = combineReducers({
  csurf,
  auth: auth,
  karyawan: karyawanReducer,
  kontrak: kontrakReducer,
  customization: customizationReducer,
  masterBank: masterBankReducer,
  masterJabatan: masterJabatanReducer,
  masterIuran: masterIuranReducer,
  masterPajak: masterPajakReducer,
  masterTempatTugas: masterTempatTugasReducer,
  masterUnitBisnis: masterUnitBisnisReducer,
  report: reportReducer,
  slipGaji: slipGajiReducer,
  dashboard: dashboardReducer
});

export default rootReducer;
