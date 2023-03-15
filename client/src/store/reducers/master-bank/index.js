import { combineReducers } from 'redux';
import { masterBankReducer } from './masterBankReducer';

const masterBankReducersCombine = combineReducers({
  masterBankReducer
});

export default masterBankReducersCombine;
