import { createSlice } from "@reduxjs/toolkit";

const appState = createSlice({
  name: "app",
  initialState: {
    appLoading: false,
  },
  reducers: {
    setAppLoading: (state: any, action: any) => {
      state.appLoading = action.payload;
    }
  }
});

export const {
    setAppLoading
} = appState.actions;
export default appState.reducer;
