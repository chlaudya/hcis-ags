import { combineReducers } from "redux";
import { csurfReducer } from "./csurfReducer";

const csurfReducersCombine = combineReducers({
  csurfReducer,
});

export default csurfReducersCombine;
