"use strict";
exports.__esModule = true;
exports.parseName = void 0;
var core_1 = require("@angular-devkit/core");
function parseName(path, name) {
    var nameWithoutPath = core_1.basename(name);
    var namePath = core_1.dirname((path + '/' + name));
    return {
        name: nameWithoutPath,
        path: core_1.normalize('/' + namePath)
    };
}
exports.parseName = parseName;
//# sourceMappingURL=parse-name.js.map