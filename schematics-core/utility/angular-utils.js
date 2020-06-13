"use strict";
exports.__esModule = true;
exports.isIvyEnabled = void 0;
var core_1 = require("@angular-devkit/core");
var json_utilts_1 = require("./json-utilts");
// https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/migrations/update-9/utils.ts
function isIvyEnabled(tree, tsConfigPath) {
    // In version 9, Ivy is turned on by default
    // Ivy is opted out only when 'enableIvy' is set to false.
    var buffer = tree.read(tsConfigPath);
    if (!buffer) {
        return true;
    }
    var tsCfgAst = core_1.parseJsonAst(buffer.toString(), core_1.JsonParseMode.Loose);
    if (tsCfgAst.kind !== 'object') {
        return true;
    }
    var ngCompilerOptions = json_utilts_1.findPropertyInAstObject(tsCfgAst, 'angularCompilerOptions');
    if (ngCompilerOptions && ngCompilerOptions.kind === 'object') {
        var enableIvy = json_utilts_1.findPropertyInAstObject(ngCompilerOptions, 'enableIvy');
        if (enableIvy) {
            return !!enableIvy.value;
        }
    }
    var configExtends = json_utilts_1.findPropertyInAstObject(tsCfgAst, 'extends');
    if (configExtends && configExtends.kind === 'string') {
        var extendedTsConfigPath = core_1.resolve(core_1.dirname(core_1.normalize(tsConfigPath)), core_1.normalize(configExtends.value));
        return isIvyEnabled(tree, extendedTsConfigPath);
    }
    return true;
}
exports.isIvyEnabled = isIvyEnabled;
//# sourceMappingURL=angular-utils.js.map