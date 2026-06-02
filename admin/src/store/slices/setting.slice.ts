import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  theme: "light" | "dark";
  sidebarCollapsed: boolean;
}

const initialState: SettingsState = {
  theme: "light",
  sidebarCollapsed: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,

  reducers: {
    setTheme: (
      state,
      action: PayloadAction<"light" | "dark">
    ) => {
      state.theme = action.payload;
    },

    toggleSidebar: (state) => {
      state.sidebarCollapsed =
        !state.sidebarCollapsed;
    },
  },
});

export const {
  setTheme,
  toggleSidebar,
} = settingsSlice.actions;

export default settingsSlice.reducer;