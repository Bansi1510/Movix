import { combineReducers } from "@reduxjs/toolkit";

import settingsReducer from "./slices/setting.slice"
import authReducer from "./slices/auth.slice"

const rootReducer = combineReducers({
  // auth: authReducer,
  // user: userReducer,
  settings: settingsReducer,
  auth: authReducer
});

export default rootReducer;