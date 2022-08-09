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
var axios_1 = require("axios");
function getRequestParams(name, email) {
    // get env variables
    var API_KEY = process.env.MAILCHIMP_API_KEY;
    var LIST_ID = process.env.MAILCHIMP_LIST_ID;
    // mailchimp datacenter - mailchimp api keys always look like this:
    // fe4f064432e4684878063s83121e4971-us6
    // We need the us6 part
    var DATACENTER = process.env.MAILCHIMP_API_KEY.split('-')[1];
    var url = "https://" + DATACENTER + ".api.mailchimp.com/3.0/lists/" + LIST_ID + "/members";
    // Add aditional params here. See full list of available params:
    // https://mailchimp.com/developer/reference/lists/list-members/
    var data = {
        name: name,
        email_address: email,
        status: 'subscribed'
    };
    // Api key needs to be encoded in base 64 format
    var base64ApiKey = Buffer.from("anystring:" + API_KEY).toString('base64');
    var headers = {
        'Content-Type': 'application/json',
        Authorization: "Basic " + base64ApiKey
    };
    return {
        url: url,
        data: data,
        headers: headers
    };
}
exports["default"] = (function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, _a, url, data, headers, response, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                email = req.body.email;
                if (!email || !email.length) {
                    return [2 /*return*/, res.status(400).json({
                            error: 'Forgot to add your email?'
                        })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                _a = getRequestParams(name, email), url = _a.url, data = _a.data, headers = _a.headers;
                return [4 /*yield*/, axios_1["default"].post(url, data, { headers: headers })];
            case 2:
                response = _b.sent();
                // Success
                return [2 /*return*/, res.status(201).json({ error: null })];
            case 3:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(400).json({
                        error: "Oops, something went wrong... Send us an email at mail@juedische-stimme.de and we'll add you to the list."
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); });
