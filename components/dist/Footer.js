"use strict";
exports.__esModule = true;
exports.Footer = void 0;
var react_1 = require("react");
var Footer_module_css_1 = require("styles/Footer.module.css");
var ContactForm_1 = require("./ContactForm");
var hooks_1 = require("store/hooks");
var router_1 = require("next/router");
exports.Footer = function () {
    var footerMenu = hooks_1.useSelector(function (state) { return state.nav; }).footerMenu;
    var router = router_1.useRouter();
    function logout() {
        sessionStorage.removeItem('Token');
        router.push('/login');
    }
    return (react_1["default"].createElement("footer", { id: Footer_module_css_1["default"].footer },
        react_1["default"].createElement("div", { className: Footer_module_css_1["default"].footerTopMenu },
            react_1["default"].createElement("div", { className: Footer_module_css_1["default"].contactFormContainer },
                react_1["default"].createElement(ContactForm_1["default"], null)),
            react_1["default"].createElement("div", { className: Footer_module_css_1["default"].footerSideMenu },
                react_1["default"].createElement("div", { className: Footer_module_css_1["default"].footerMenuContent },
                    react_1["default"].createElement("div", { className: Footer_module_css_1["default"].label }, "Unsere partner & freunde")),
                react_1["default"].createElement("div", { className: Footer_module_css_1["default"].footerMenuContent },
                    react_1["default"].createElement("div", { className: Footer_module_css_1["default"].label }, "Kontakt"),
                    ' ',
                    react_1["default"].createElement("p", null, "mail@juedische-stimme.de")),
                react_1["default"].createElement("div", { className: Footer_module_css_1["default"].footerMenuContent },
                    react_1["default"].createElement("div", { className: Footer_module_css_1["default"].label }, "Impressum")))),
        react_1["default"].createElement("div", { className: Footer_module_css_1["default"].footerBottomMenu },
            react_1["default"].createElement("button", { onClick: logout }, "Logout"),
            "copyright \u00A9 2022 J\u00DCDISCHE STIMME f\u00FCr gerechten frieden in nahost, berlin seit 2007. Privacy Policy Terms of Use")));
};
exports["default"] = exports.Footer;
