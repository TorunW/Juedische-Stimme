"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.setMenuItems = void 0;

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
    }
  }
});
var setMenuItems = navSlice.actions.setMenuItems;
exports.setMenuItems = setMenuItems;
var _default = navSlice.reducer;
exports["default"] = _default;