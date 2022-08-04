"use strict";
exports.__esModule = true;
var react_1 = require("react");
var hooks_1 = require("store/hooks");
var image_1 = require("next/image");
var Gallery_1 = require("./Gallery");
var About_module_css_1 = require("styles/About.module.css");
var about_jpg_1 = require("styles/images/about.jpg");
var link_1 = require("next/link");
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
            react_1["default"].createElement(image_1["default"], { src: about_jpg_1["default"], className: About_module_css_1["default"].img }),
            react_1["default"].createElement("div", { className: About_module_css_1["default"].linkContainer },
                react_1["default"].createElement("p", null, "Grundlagen unserer Arbeit sind:"),
                react_1["default"].createElement("div", { className: 'btnContainer' },
                    react_1["default"].createElement("button", null,
                        react_1["default"].createElement(link_1["default"], { href: '/selbstverstaendnis' }, "Selbsverst\u00E4ndnis der J\u00FCdischen Stimme")),
                    react_1["default"].createElement("button", null,
                        react_1["default"].createElement(link_1["default"], { href: '/wp-content/uploads/2011/11/Satzung_2011.pdf' }, "Satzung der J\u00FCdischen Stimme")))))));
};
exports["default"] = AboutInfo;
