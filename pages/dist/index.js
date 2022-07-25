"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getServerSideProps = void 0;
var react_1 = require("react");
var db_1 = require("lib/db");
var posts_1 = require("lib/queries/posts");
var queries_1 = require("lib/queries");
var hooks_1 = require("store/hooks");
var fbDataSlice_1 = require("store/fbdata/fbDataSlice");
var galleriesSlice_1 = require("store/galleries/galleriesSlice");
var postsSlice_1 = require("store/posts/postsSlice");
var navSlice_1 = require("store/nav/navSlice");
var Posts_1 = require("components/Posts");
var Home_module_css_1 = require("styles/Home.module.css");
var FacebookFeed_1 = require("components/FacebookFeed");
var FacebookEvents_1 = require("components/FacebookEvents");
var Header_1 = require("components/Header");
var Home = function (props) {
    var dispatch = hooks_1.useDispatch();
    var posts = hooks_1.useSelector(function (state) { return state.posts; }).posts;
    react_1.useEffect(function () {
        if (props.navItems)
            dispatch(navSlice_1.setMenuItems(JSON.parse(props.navItems)));
        if (props.navItems)
            dispatch(navSlice_1.displayMenutItems(JSON.parse(props.navItems)));
        if (props.headerGallery)
            dispatch(galleriesSlice_1.setHeaderGallery(JSON.parse(props.headerGallery)[0]));
        if (props.posts)
            dispatch(postsSlice_1.setPosts(JSON.parse(props.posts)));
        if (props.fbToken)
            dispatch(fbDataSlice_1.setToken(JSON.parse(props.fbToken).length > 0
                ? JSON.parse(props.fbToken)[0].token
                : null));
        if (props.fbEvents)
            dispatch(fbDataSlice_1.setEvents(JSON.parse(props.fbEvents)[0]));
        if (props.fbFeed)
            dispatch(fbDataSlice_1.setFeed(JSON.parse(props.fbFeed)[0]));
    }, []);
    return (React.createElement("div", { className: Home_module_css_1["default"].container },
        React.createElement(Header_1["default"], null),
        React.createElement("hr", null),
        React.createElement("h1", null, " LATEST POSTS:"),
        posts ? React.createElement(Posts_1["default"], { posts: posts }) : '',
        React.createElement("hr", null),
        React.createElement(FacebookEvents_1["default"], null),
        React.createElement("hr", null),
        React.createElement("h1", null, "BUTTONS AND CALL TO ACTION"),
        React.createElement("blockquote", null, "BUTTONS AND CALL TO ACTION"),
        React.createElement("hr", null),
        React.createElement("h1", null, "SIGN UP TO NEWSLETTER"),
        React.createElement("div", null, "SIGN UP TO NEWSLETTER COMPONENET!"),
        React.createElement("hr", null),
        React.createElement(FacebookFeed_1["default"], null),
        React.createElement("hr", null),
        React.createElement("h1", null, "ABOUT US GALLERY"),
        React.createElement("div", null, "SHOW A GALERY HERE!")));
};
Home.layout = 'main';
exports.getServerSideProps = function () { return __awaiter(void 0, void 0, void 0, function () {
    var navItemsResponse, navItems, headerGalleryResponse, headerGallery, postsResponse, posts, fbTokenResponse, fbToken, fbFeedResponse, fbFeed, fbEventsReponse, fbEvents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1["default"]({
                    query: queries_1.selectNavItems()
                })];
            case 1:
                navItemsResponse = _a.sent();
                navItems = JSON.stringify(navItemsResponse);
                return [4 /*yield*/, db_1["default"]({
                        query: queries_1.selectGalleryById(1)
                    })];
            case 2:
                headerGalleryResponse = _a.sent();
                headerGallery = JSON.stringify(headerGalleryResponse);
                return [4 /*yield*/, db_1["default"]({
                        query: posts_1.selectPosts({
                            numberOfPosts: 6,
                            pageNum: 0,
                            showUnpublished: false,
                            postType: 'post',
                            fieldsList: [
                                'ID',
                                'post_author',
                                'post_date',
                                'post_date_gmt',
                                'post_content',
                                'post_title',
                                'post_name',
                            ]
                        })
                    })];
            case 3:
                postsResponse = _a.sent();
                posts = JSON.stringify(postsResponse);
                return [4 /*yield*/, db_1["default"]({
                        query: "SELECT * FROM fb_token LIMIT 1"
                    })];
            case 4:
                fbTokenResponse = _a.sent();
                fbToken = JSON.stringify(fbTokenResponse);
                return [4 /*yield*/, db_1["default"]({
                        query: "SELECT * FROM fb_feed WHERE type='posts' ORDER BY ID DESC LIMIT 1"
                    })];
            case 5:
                fbFeedResponse = _a.sent();
                fbFeed = JSON.stringify(fbFeedResponse);
                return [4 /*yield*/, db_1["default"]({
                        query: "SELECT * FROM fb_feed WHERE type='events' ORDER BY ID DESC LIMIT 1"
                    })];
            case 6:
                fbEventsReponse = _a.sent();
                fbEvents = JSON.stringify(fbEventsReponse);
                return [2 /*return*/, {
                        props: {
                            navItems: navItems,
                            headerGallery: headerGallery,
                            posts: posts,
                            fbFeed: fbFeed,
                            fbEvents: fbEvents,
                            fbToken: fbToken
                        }
                    }];
        }
    });
}); };
exports["default"] = Home;
