"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function redirect(config) {
    var callbacks = config.callbacks;
    callbacks.redirect = function (to) {
        window.location.href = to;
    };
    callbacks.reload = function () { return window.location.reload(); };
    return config;
}
exports.default = redirect;
