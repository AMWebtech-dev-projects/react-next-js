import { combineReducers } from "@reduxjs/toolkit";

import loginSlice from "../reducer/Login/index";
import loaderSlice from "../reducer/Loader/index";
import rememberMeReducer from '../reducer/rememberMeSlice';
import profileReducer from '../reducer/Profile/index';
// import getUserSlice from '../reducer/UserData/index'
import  ToggleReducer from '../reducer/ToggleSlice'
export const rootReducer = combineReducers({
  login: loginSlice,
  loader: loaderSlice,
  // getUser :getUserSlice,
  rememberMe: rememberMeReducer,
  Toggle: ToggleReducer,
  profile: profileReducer
});
