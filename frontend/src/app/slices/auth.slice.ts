import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isAuthenticated = action.payload;
    },

    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },
});

export const {
  setAuthenticated,
  setInitialized,
} = authSlice.actions;

export default authSlice.reducer;