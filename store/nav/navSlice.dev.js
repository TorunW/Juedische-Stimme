"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.setMenuItems = void 0;

var _toolkit = require("@reduxjs/toolkit");

var initialState = {
  mainMenu: [],
  callToActionMenu: []
};
var navSlice = (0, _toolkit.createSlice)({
  name: 'nav',
  initialState: initialState,
  reducers: {
    setMenuItems: function setMenuItems(state, action) {
      state.mainMenu = action.payload.filter(function (item) {
        return item.taxonomy === 'main_menu';
      });
      state.callToActionMenu = action.payload.filter(function (item) {
        return item.taxonomy === 'call_to_action_menu';
      });
    }
  }
});
var setMenuItems = navSlice.actions.setMenuItems;
exports.setMenuItems = setMenuItems;
var _default = navSlice.reducer;
exports["default"] = _default;