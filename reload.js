"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function reload(config) {
    var callbacks = config.callbacks;
    callbacks.reload = function () { return window.location.reload(); };
    return config;
}
exports.default = reload;
