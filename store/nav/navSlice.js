import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  mainMenu: [],
  callToActionMenu: [],
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setMenuItems: (state, action) => {
      state.mainMenu = action.payload.filter(
        (item) => item.taxonomy === 'main_menu'
      );

      state.callToActionMenu = action.payload.filter(
        (item) => item.taxonomy === 'call_to_action_menu'
      );
    },
  },
});

export const { setMenuItems } = navSlice.actions;

export default navSlice.reducer;
