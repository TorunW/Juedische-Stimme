import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  items: [],
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setMenuItems: (state, action) => {
      state.items = action.payload;
    },
    displayMenutItems: (state, action) => {
      const topMenu = state.items.findIndex(
        (m) => m.post_title === action.payload.post_title
      );
      console.log(topMenu, 'hello');
    },
  },
});

export const { setMenuItems, displayMenutItems } = navSlice.actions;

export default navSlice.reducer;
