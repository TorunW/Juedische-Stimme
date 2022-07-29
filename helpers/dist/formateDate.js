"use strict";
exports.__esModule = true;
function formateDate(value) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(value).toLocaleDateString('de-DE', options);
}
exports["default"] = formateDate;
