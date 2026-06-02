import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./slices/auth.slice";
import settingsReducer from "./slices/setting.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
});

export default rootReducer;