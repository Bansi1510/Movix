import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Admin } from "@/types/auth.types";

interface AuthState {
  admin: Admin | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  admin: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<Admin>
    ) => {
      state.admin = action.payload;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  setCredentials,
  logout,
} = authSlice.actions;

export default authSlice.reducer;