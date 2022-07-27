"use strict";
exports.__esModule = true;
var react_1 = require("react");
var hooks_1 = require("store/hooks");
var Gallery_1 = require("./Gallery");
var About_module_css_1 = require("styles/About.module.css");
var AboutInfo = function () {
    var gallery = hooks_1.useSelector(function (state) { return state.aboutinfo; }).gallery;
    var aboutInfo = hooks_1.useSelector(function (state) { return state.aboutinfo; }).aboutInfo;
    var aboutInfoDisplay;
    if (aboutInfo !== null) {
        aboutInfoDisplay = (react_1["default"].createElement("div", { className: About_module_css_1["default"].aboutContainer },
            react_1["default"].createElement("div", { dangerouslySetInnerHTML: { __html: aboutInfo.text_top } }),
            react_1["default"].createElement(Gallery_1["default"], { gallery: gallery }),
            react_1["default"].createElement("div", { dangerouslySetInnerHTML: { __html: aboutInfo.text_bottom } })));
    }
    return (react_1["default"].createElement("div", { id: 'about-info', className: About_module_css_1["default"].aboutPage },
        react_1["default"].createElement("h1", null, "\u00DCber Uns"),
        aboutInfoDisplay,
        react_1["default"].createElement("div", { className: About_module_css_1["default"].contentContainer },
            react_1["default"].createElement("img", { src: 'about.jpg' }),
            react_1["default"].createElement("div", { className: About_module_css_1["default"].linkContainer },
                react_1["default"].createElement("p", null, "Grundlagen unserer Arbeit sind"),
                react_1["default"].createElement("div", { className: About_module_css_1["default"].btnContainer },
                    react_1["default"].createElement("button", null, "Selbsverst\u00E4ndnis der J\u00FCdischen Stimme"),
                    react_1["default"].createElement("button", null, "Satzung der J\u00FCdischen Stimme"))))));
};
exports["default"] = AboutInfo;
