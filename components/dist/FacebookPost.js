"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var react_1 = require("react");
var FacebookFeed_module_css_1 = require("styles/FacebookFeed.module.css");
var FacebookPost = function (_a) {
    var post = _a.post;
    var sharedPostDisplay;
    if (post.attachments) {
        sharedPostDisplay = post.attachments.data.map(function (attPost, index) {
            var authorDisplay;
            if (attPost.target) {
                authorDisplay = attPost.target.url.split('%2F')[2];
            }
            console.log(authorDisplay);
            return (react_1["default"].createElement("div", { key: index, className: FacebookFeed_module_css_1["default"].sharedPostContainer },
                react_1["default"].createElement("div", { className: FacebookFeed_module_css_1["default"].imgContainer },
                    react_1["default"].createElement("img", { src: attPost.media ? attPost.media.image.src : '' })),
                react_1["default"].createElement("h4", null, attPost.title !== 'Timeline photos' ? attPost.title : ''),
                react_1["default"].createElement("p", { className: FacebookFeed_module_css_1["default"].author }, authorDisplay),
                react_1["default"].createElement("p", null, attPost.description)));
        });
    }
    var sharesCount;
    if (post.shares) {
        sharesCount = Object.values(post.shares);
    }
    var commentsCount;
    if (post.comments) {
        commentsCount = post.comments.data.length;
    }
    return (react_1["default"].createElement("div", { className: FacebookFeed_module_css_1["default"].postContainer },
        react_1["default"].createElement("img", { src: 'http://graph.facebook.com/998665673528998/picture?type=square' }),
        react_1["default"].createElement("h4", null, post.from.name),
        !post.attachments ? (react_1["default"].createElement("div", { className: FacebookFeed_module_css_1["default"].imgContainer },
            react_1["default"].createElement("img", { src: post.full_picture }))) : (''),
        react_1["default"].createElement("p", null, post.message && post.message.length > 300
            ? post.message.substring(0, 300) + "[...]"
            : post.message),
        sharedPostDisplay,
        react_1["default"].createElement("div", { className: FacebookFeed_module_css_1["default"].bottomContainer },
            react_1["default"].createElement("div", { className: FacebookFeed_module_css_1["default"].reaction },
                react_1["default"].createElement("svg", { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
                    react_1["default"].createElement("g", { id: 'User Interface / Share' },
                        react_1["default"].createElement("path", { id: 'Vector', d: 'M12.0001 9.33357C11.6062 9.33618 11.2178 9.42601 10.8628 9.59661C10.5077 9.76721 10.1949 10.0143 9.94677 10.3202L6.54677 8.75357C6.70662 8.26407 6.70662 7.73641 6.54677 7.24691L9.94677 5.68024C10.3478 6.16422 10.907 6.49096 11.5255 6.6028C12.1441 6.71464 12.7822 6.60439 13.3274 6.29151C13.8726 5.97863 14.2897 5.48322 14.5051 4.89273C14.7206 4.30224 14.7205 3.65463 14.505 3.06418C14.2894 2.47373 13.8722 1.9784 13.327 1.66562C12.7818 1.35283 12.1436 1.2427 11.5251 1.35465C10.9065 1.46661 10.3474 1.79345 9.94646 2.2775C9.54547 2.76155 9.32835 3.37169 9.33343 4.00024C9.33544 4.15906 9.35105 4.31742 9.3801 4.47357L5.8601 6.09357C5.48482 5.72662 5.0096 5.47858 4.49397 5.38052C3.97834 5.28247 3.44525 5.33875 2.96147 5.54233C2.47769 5.7459 2.06474 6.08772 1.77437 6.52495C1.48399 6.96217 1.3291 7.47537 1.3291 8.00024C1.3291 8.52511 1.48399 9.0383 1.77437 9.47553C2.06474 9.91276 2.47769 10.2546 2.96147 10.4582C3.44525 10.6617 3.97834 10.718 4.49397 10.62C5.0096 10.5219 5.48482 10.2739 5.8601 9.90691L9.3801 11.5269C9.35105 11.6831 9.33544 11.8414 9.33343 12.0002C9.33343 12.5277 9.48983 13.0432 9.78285 13.4818C10.0759 13.9203 10.4923 14.2621 10.9796 14.4639C11.4669 14.6658 12.0031 14.7186 12.5203 14.6157C13.0376 14.5128 13.5128 14.2588 13.8857 13.8859C14.2587 13.5129 14.5126 13.0378 14.6155 12.5205C14.7184 12.0032 14.6656 11.467 14.4638 10.9798C14.2619 10.4925 13.9202 10.076 13.4816 9.78299C13.0431 9.48997 12.5275 9.33357 12.0001 9.33357ZM12.0001 2.66691C12.2638 2.66691 12.5216 2.7451 12.7409 2.89161C12.9601 3.03812 13.131 3.24636 13.2319 3.48999C13.3329 3.73363 13.3593 4.00172 13.3078 4.26036C13.2564 4.519 13.1294 4.75658 12.9429 4.94305C12.7564 5.12952 12.5189 5.25651 12.2602 5.30795C12.0016 5.3594 11.7335 5.333 11.4899 5.23208C11.2462 5.13116 11.038 4.96026 10.8915 4.741C10.745 4.52173 10.6668 4.26395 10.6668 4.00024C10.6668 3.64662 10.8072 3.30748 11.0573 3.05743C11.3073 2.80738 11.6465 2.66691 12.0001 2.66691ZM4.0001 9.33357C3.73639 9.33357 3.47861 9.25537 3.25934 9.10887C3.04007 8.96236 2.86918 8.75412 2.76826 8.51048C2.66734 8.26685 2.64094 7.99876 2.69239 7.74012C2.74383 7.48148 2.87082 7.2439 3.05729 7.05743C3.24376 6.87096 3.48134 6.74397 3.73998 6.69253C3.99862 6.64108 4.26671 6.66748 4.51034 6.7684C4.75398 6.86932 4.96222 7.04021 5.10873 7.25948C5.25523 7.47874 5.33343 7.73653 5.33343 8.00024C5.33343 8.35386 5.19296 8.693 4.94291 8.94305C4.69286 9.1931 4.35372 9.33357 4.0001 9.33357ZM12.0001 13.3336C11.7364 13.3336 11.4786 13.2554 11.2593 13.1089C11.0401 12.9624 10.8692 12.7541 10.7683 12.5105C10.6673 12.2668 10.6409 11.9988 10.6924 11.7401C10.7438 11.4815 10.8708 11.2439 11.0573 11.0574C11.2438 10.871 11.4813 10.744 11.74 10.6925C11.9986 10.6411 12.2667 10.6675 12.5103 10.7684C12.754 10.8693 12.9622 11.0402 13.1087 11.2595C13.2552 11.4787 13.3334 11.7365 13.3334 12.0002C13.3334 12.3539 13.193 12.693 12.9429 12.943C12.6929 13.1931 12.3537 13.3336 12.0001 13.3336Z', fill: '#9a9a9a' }))),
                sharesCount,
                react_1["default"].createElement("svg", { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
                    react_1["default"].createElement("g", { id: 'Chat / chat bubble' },
                        react_1["default"].createElement("path", { id: 'Vector', d: 'M12.6666 1.3335H3.33325C2.80282 1.3335 2.29411 1.54421 1.91904 1.91928C1.54397 2.29436 1.33325 2.80306 1.33325 3.3335V10.0002C1.33325 10.5306 1.54397 11.0393 1.91904 11.4144C2.29411 11.7894 2.80282 12.0002 3.33325 12.0002H11.0599L13.5266 14.4735C13.5889 14.5353 13.6628 14.5842 13.744 14.6173C13.8252 14.6505 13.9122 14.6673 13.9999 14.6668C14.0874 14.6691 14.1741 14.6508 14.2533 14.6135C14.375 14.5635 14.4792 14.4786 14.5528 14.3694C14.6263 14.2603 14.6659 14.1318 14.6666 14.0002V3.3335C14.6666 2.80306 14.4559 2.29436 14.0808 1.91928C13.7057 1.54421 13.197 1.3335 12.6666 1.3335ZM13.3333 12.3935L11.8066 10.8602C11.7443 10.7984 11.6704 10.7495 11.5892 10.7163C11.508 10.6831 11.421 10.6663 11.3333 10.6668H3.33325C3.15644 10.6668 2.98687 10.5966 2.86185 10.4716C2.73682 10.3465 2.66659 10.177 2.66659 10.0002V3.3335C2.66659 3.15669 2.73682 2.98712 2.86185 2.86209C2.98687 2.73707 3.15644 2.66683 3.33325 2.66683H12.6666C12.8434 2.66683 13.013 2.73707 13.138 2.86209C13.263 2.98712 13.3333 3.15669 13.3333 3.3335V12.3935Z', fill: '#9a9a9a' }))),
                commentsCount),
            react_1["default"].createElement("div", { className: FacebookFeed_module_css_1["default"].action },
                react_1["default"].createElement(link_1["default"], { href: post.permalink_url },
                    react_1["default"].createElement("p", null, "View on Facebook")),
                react_1["default"].createElement("svg", { width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
                    react_1["default"].createElement("g", { id: 'User Interface / Steering Wheel' },
                        react_1["default"].createElement("path", { id: 'Vector', d: 'M11.4444 12.1685C11.6089 12.0586 11.8022 12 12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13C13 13.1978 12.9414 13.3911 12.8315 13.5556C12.7216 13.72 12.5654 13.8482 12.3827 13.9239C12.2 13.9996 11.9989 14.0194 11.8049 13.9808C11.6109 13.9422 11.4327 13.847 11.2929 13.7071C11.153 13.5673 11.0578 13.3891 11.0192 13.1951C10.9806 13.0011 11.0004 12.8 11.0761 12.6173C11.1518 12.4346 11.28 12.2784 11.4444 12.1685Z', fill: '#9a9a9a' }))),
                react_1["default"].createElement("p", null, "Share")))));
};
exports["default"] = FacebookPost;
