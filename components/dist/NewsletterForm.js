"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var formik_1 = require("formik");
var axios_1 = require("axios");
var Yup = require("yup");
var Form_module_css_1 = require("styles/Form.module.css");
var NewsletterForm = function () {
    var MAILCHIMP_URL = process.env.MAILCHIMP_URL;
    // console.log(MAILCHIMP_URL, " MAILCHIMP URL")
    var formik = formik_1.useFormik({
        initialValues: {
            name: '',
            email: '',
            message: ''
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().min(3, '* too short!'),
            email: Yup.string().email().required('* required!')
        }),
        onSubmit: function (values) {
            axios_1["default"]({
                method: 'post',
                url: "/api/contact",
                data: __assign({}, values)
            }).then(function (response) {
                console.log(response, 'response on send contact');
            }, function (error) {
                console.log(error, 'ERROR on send contact');
            });
        }
    });
    // console.log(formik.errors)
    return (react_1["default"].createElement("div", { id: 'newsletter', className: Form_module_css_1["default"].newsletterForm },
        react_1["default"].createElement("h1", null, "Signup to Newsletter"),
        react_1["default"].createElement("form", { onSubmit: formik.handleSubmit },
            react_1["default"].createElement("div", { className: Form_module_css_1["default"].formCol },
                react_1["default"].createElement("input", { id: 'name', name: 'name', type: 'name', onChange: formik.handleChange, value: formik.values.name, placeholder: 'Name' }),
                formik.errors && formik.errors.name ? (react_1["default"].createElement("div", { className: Form_module_css_1["default"].error }, formik.errors.name)) : ('')),
            react_1["default"].createElement("div", { className: Form_module_css_1["default"].formCol },
                react_1["default"].createElement("input", { id: 'email', name: 'email', type: 'email', onChange: formik.handleChange, value: formik.values.email, placeholder: 'Email' }),
                formik.errors && formik.errors.email ? (react_1["default"].createElement("div", { className: Form_module_css_1["default"].error }, formik.errors.email)) : ('')),
            react_1["default"].createElement("div", { className: Form_module_css_1["default"].formCol },
                react_1["default"].createElement("button", { type: 'submit', className: Form_module_css_1["default"].button }, "Senden")))));
};
exports["default"] = NewsletterForm;
