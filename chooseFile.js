"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("lodash"));
function chooseFile(config) {
    var callbacks = config.callbacks;
    callbacks.chooseFile = function (_a) {
        var _b = _a === void 0 ? {} : _a, multiple = _b.multiple, accept = _b.accept;
        var input = document.querySelector('.sk-file-input');
        if (!input) {
            input = document.createElement('input');
            input.type = "file";
            input.accept = _.isArray(accept) ? accept.join(",") : accept;
            input.multiple = multiple;
            input.style.display = "none";
            input.className = "sk-file-input";
            document.querySelector("body").appendChild(input);
        }
        input.click();
        return new Promise(function (resolve) {
            var changeHandler = function (e) {
                var files = e.currentTarget.files;
                var filesArray = [];
                _.each(files, function (file) {
                    file.url = URL.createObjectURL(file);
                    filesArray.push(file);
                });
                if (multiple) {
                    resolve(filesArray);
                }
                else {
                    resolve(files[0]);
                }
            };
            input.addEventListener('change', changeHandler);
        });
    };
    return config;
}
exports.default = chooseFile;
