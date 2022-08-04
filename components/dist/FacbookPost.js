"use strict";
exports.__esModule = true;
var FacebookFeed_module_css_1 = require("styles/FacebookFeed.module.css");
function FacebookPost(_a) {
    var feed = _a.feed;
    var feedDisplay;
    if (feed && feed.content && feed.content.length > 0) {
        var feedArray = JSON.parse(feed.content);
        feedDisplay = feedArray.map(function (fbPost, index) {
            return (React.createElement("div", { key: index, className: FacebookFeed_module_css_1["default"].postContainer },
                React.createElement("div", { className: FacebookFeed_module_css_1["default"].imgContainer },
                    React.createElement("img", { src: fbPost.full_picture })),
                React.createElement("p", { style: { color: 'red' } }, fbPost.message.length > 100
                    ? fbPost.message.substring(0, 100) + "[...]"
                    : fbPost.message)));
        });
    }
    return React.createElement("div", null, feedDisplay);
}
exports["default"] = FacebookPost;
