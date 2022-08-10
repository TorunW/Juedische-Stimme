"use strict";
var _a;
exports.__esModule = true;
exports.setToken = exports.setFeed = exports.setEvents = exports.setFbData = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    token: null,
    feed: [],
    events: []
};
var fbDataSlice = toolkit_1.createSlice({
    name: 'fbData',
    initialState: initialState,
    reducers: {
        setToken: function (state, action) {
            state.token = action.payload;
        },
        setEvents: function (state, action) {
            state.events = action.payload;
        },
        setFeed: function (state, action) {
            state.feed = action.payload;
        }
    }
});
exports.setFbData = (_a = fbDataSlice.actions, _a.setFbData), exports.setEvents = _a.setEvents, exports.setFeed = _a.setFeed, exports.setToken = _a.setToken;
exports["default"] = fbDataSlice.reducer;
