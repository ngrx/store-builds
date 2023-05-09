"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStandaloneApp = void 0;
var ts = require("typescript");
var standalone_1 = require("@schematics/angular/private/standalone");
function isStandaloneApp(host, mainPath) {
    var source = ts.createSourceFile(mainPath, host.readText(mainPath), ts.ScriptTarget.Latest, true);
    var bootstrapCall = (0, standalone_1.findBootstrapApplicationCall)(source);
    return bootstrapCall !== null;
}
exports.isStandaloneApp = isStandaloneApp;
//# sourceMappingURL=standalone.js.map