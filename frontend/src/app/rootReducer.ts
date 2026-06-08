import { combineReducers } from "@reduxjs/toolkit";

import settingsReducer from "./slices/setting.slice"


const rootReducer = combineReducers({
  // auth: authReducer,
  // user: userReducer,
  settings: settingsReducer,

});

export default rootReducer;