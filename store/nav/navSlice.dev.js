"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.displayMenutItems = exports.setMenuItems = void 0;

var _toolkit = require("@reduxjs/toolkit");

var initialState = {
  items: []
};
var navSlice = (0, _toolkit.createSlice)({
  name: 'nav',
  initialState: initialState,
  reducers: {
    setMenuItems: function setMenuItems(state, action) {
      state.items = action.payload;
    },
    displayMenutItems: function displayMenutItems(state, action) {
      var topMenu = state.items.findIndex(function (m) {
        return m.post_title === action.payload.post_title;
      });
      console.log(topMenu, 'hello');
    }
  }
});
var _navSlice$actions = navSlice.actions,
    setMenuItems = _navSlice$actions.setMenuItems,
    displayMenutItems = _navSlice$actions.displayMenutItems;
exports.displayMenutItems = displayMenutItems;
exports.setMenuItems = setMenuItems;
var _default = navSlice.reducer;
exports["default"] = _default;