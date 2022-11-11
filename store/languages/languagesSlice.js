import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  locales: [],
  locale: null,
  defaultLocale: null,
};

const languagesSlice = createSlice({
  name: "mediaItems",
  initialState,
  reducers: {
    setLanguages: (state, action) => {
      state.locales = action.payload.locales;
      state.locale = action.payload.locale;
      state.defaultLocale = action.payload.defaultLocale;
    },
  },
});

export const { setLanguages } = languagesSlice.actions;

export default languagesSlice.reducer;
