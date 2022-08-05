"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var FacebookFeed_module_css_1 = require("styles/FacebookFeed.module.css");
function FacebookPost(_a) {
    var feed = _a.feed;
    var feedDisplay;
    if (feed && feed.content && feed.content.length > 0) {
        var feedArray = JSON.parse(feed.content);
        feedDisplay = feedArray.map(function (fbPost, index) {
            var sharedPostDisplay;
            if (fbPost.attachments) {
                sharedPostDisplay = fbPost.attachments.data.map(function (attPost, index) {
                    return (React.createElement("div", { key: index },
                        React.createElement("img", { src: attPost.media.image.src, width: '300px' }),
                        React.createElement("h4", null, attPost.title),
                        React.createElement("p", null, "berliner-zeitung.de"),
                        React.createElement("p", null, attPost.description)));
                });
            }
            var sharesCount;
            if (fbPost.shares) {
                sharesCount = Object.values(fbPost.shares);
            }
            var commentsCount;
            if (fbPost.comments) {
                commentsCount = fbPost.comments.data.length;
            }
            return (React.createElement("div", { key: index, className: FacebookFeed_module_css_1["default"].postContainer },
                React.createElement("h4", null, fbPost.from.name),
                React.createElement("div", { className: FacebookFeed_module_css_1["default"].imgContainer },
                    React.createElement("img", { src: !fbPost.attachments ? fbPost.full_picture : '' })),
                React.createElement("p", null, fbPost.message.length > 100
                    ? fbPost.message.substring(0, 100) + "[...]"
                    : fbPost.message),
                sharedPostDisplay,
                React.createElement("div", null,
                    sharesCount,
                    " ",
                    commentsCount),
                React.createElement("div", null,
                    React.createElement(link_1["default"], { href: fbPost.permalink_url },
                        React.createElement("p", null, "View on Facebook")))));
        });
    }
    return React.createElement("div", { className: FacebookFeed_module_css_1["default"].facebookPosts }, feedDisplay);
}
exports["default"] = FacebookPost;
