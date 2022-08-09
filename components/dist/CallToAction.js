"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var call_to_action_jpg_1 = require("styles/images/call-to-action.jpg");
var CallToAction_module_css_1 = require("styles/CallToAction.module.css");
var NewsletterForm_1 = require("./NewsletterForm");
var CallToAction = function () {
    return (react_1["default"].createElement("div", { className: CallToAction_module_css_1["default"].ctaPage },
        react_1["default"].createElement(image_1["default"], { src: call_to_action_jpg_1["default"], className: CallToAction_module_css_1["default"].backgroundImage }),
        react_1["default"].createElement("div", { className: CallToAction_module_css_1["default"].ctaContainer },
            react_1["default"].createElement("div", { className: CallToAction_module_css_1["default"].cta }),
            react_1["default"].createElement("div", { className: CallToAction_module_css_1["default"].cta }),
            react_1["default"].createElement("div", { className: CallToAction_module_css_1["default"].cta })),
        react_1["default"].createElement(NewsletterForm_1["default"], null)));
};
exports["default"] = CallToAction;
