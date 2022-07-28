"use strict";
exports.__esModule = true;
var react_1 = require("react");
var imageUrlHelper_1 = require("helpers/imageUrlHelper");
var hooks_1 = require("store/hooks");
var Articles_module_css_1 = require("styles/Articles.module.css");
function Posts(props) {
    console.log(props, 'props');
    var locale = hooks_1.useSelector(function (state) { return state.languages; }).locale;
    return (react_1["default"].createElement("div", { className: Articles_module_css_1["default"].articlesPage },
        react_1["default"].createElement("h1", null, props.title),
        react_1["default"].createElement("div", { className: Articles_module_css_1["default"].articleContainer }, props.posts.map(function (post, index) {
            var postTitle = post.post_title, postExcerpt = post.post_excerpt, postContent = post.post_content;
            if (locale !== null) {
                postTitle = post["post_title_translation_" + locale]
                    ? post["post_title_translation_" + locale]
                    : post.post_title;
                postExcerpt = post["post_excerpt_translation_" + locale]
                    ? post["post_excerpt_translation_" + locale]
                    : post.post_excerpt;
                postContent = post["post_content_translation_" + locale]
                    ? post["post_content_translation_" + locale]
                    : post.post_content;
            }
            var textLength = 600;
            var startIndex = 0, endIndex = textLength;
            // if we have a phrase - search phrase, i.e if this is search page, we will search for the phrase inside the content
            if (props.phrase) {
                postContent = postContent.replace(/<\/?[^>]+(>|$)/g, '');
                var phraseIndexInText = post.post_content.indexOf(props.phrase);
                if (phraseIndexInText > -1) {
                    startIndex = phraseIndexInText - textLength / 2;
                    if (startIndex < 0)
                        startIndex = 0;
                    endIndex = phraseIndexInText + textLength / 2;
                    if (endIndex > post.post_content.length - 1)
                        endIndex = post.post_content.length;
                    postContent =
                        '...' +
                            postContent
                                .toLowerCase()
                                .split(props.phrase)
                                .join("<b>" + props.phrase + "</b>") +
                            '...';
                }
            }
            else
                postContent = postContent.substring(startIndex, endIndex);
            return (react_1["default"].createElement("article", { key: index, className: Articles_module_css_1["default"].article },
                react_1["default"].createElement("img", { src: imageUrlHelper_1.generateImageUrl(post.post_image) }),
                react_1["default"].createElement("div", { className: Articles_module_css_1["default"].date }, post.post_date),
                react_1["default"].createElement("h2", null,
                    react_1["default"].createElement("a", { href: '/' + post.post_name }, postTitle)),
                react_1["default"].createElement("h4", null,
                    react_1["default"].createElement("a", { href: "/category/" + post.categoryName }, post.categoryName)),
                react_1["default"].createElement("div", { className: Articles_module_css_1["default"].articlePreview, dangerouslySetInnerHTML: { __html: postContent } })));
        }))));
}
exports["default"] = Posts;
