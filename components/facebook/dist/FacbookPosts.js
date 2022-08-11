"use strict";
exports.__esModule = true;
var FacebookPost_1 = require("./FacebookPost");
var FacebookFeed_module_css_1 = require("styles/FacebookFeed.module.css");
var FacebookPosts = function (_a) {
    var feed = _a.feed;
    var feedDisplay;
    if (feed && feed.content && feed.content.length > 0) {
        var feedArray = JSON.parse(feed.content);
        feedDisplay = feedArray.map(function (fbPost, index) {
            return React.createElement(FacebookPost_1["default"], { key: index, post: fbPost });
        });
    }
    return React.createElement("div", { className: FacebookFeed_module_css_1["default"].facebookPosts }, feedDisplay);
};
exports["default"] = FacebookPosts;
