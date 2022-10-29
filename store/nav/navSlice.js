import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  mainMenu: [],
  callToActionMenu: [],
  socialsMenu: [],
  footerMenu: [],
  parterMenu: [],
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setMenuItems: (state, action) => {
      state.mainMenu = action.payload.filter(
        (item) => item.taxonomy === "main_menu"
      );
      state.callToActionMenu = action.payload.filter(
        (item) => item.taxonomy === "call_to_action_menu"
      );
      state.socialsMenu = action.payload.filter(
        (item) => item.taxonomy === "socials_menu"
      );
      state.footerMenu = action.payload.filter(
        (item) => item.taxonomy === "footer_menu"
      );
      state.parterMenu = action.payload.filter(
        (item) => item.taxonomy === "partner_menu"
      );
      state.grundlagenMenu = action.payload.filter(
        (item) => item.taxonomy === "grundlagen_menu"
      );
    },
  },
});

export const { setMenuItems } = navSlice.actions;

export default navSlice.reducer;
