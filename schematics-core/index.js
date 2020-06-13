"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.stringUtils = void 0;
var strings_1 = require("./utility/strings");
var angular_utils_1 = require("./utility/angular-utils");
__createBinding(exports, angular_utils_1, "isIvyEnabled");
var ast_utils_1 = require("./utility/ast-utils");
__createBinding(exports, ast_utils_1, "findNodes");
__createBinding(exports, ast_utils_1, "getSourceNodes");
__createBinding(exports, ast_utils_1, "getDecoratorMetadata");
__createBinding(exports, ast_utils_1, "getContentOfKeyLiteral");
__createBinding(exports, ast_utils_1, "insertAfterLastOccurrence");
__createBinding(exports, ast_utils_1, "insertImport");
__createBinding(exports, ast_utils_1, "addBootstrapToModule");
__createBinding(exports, ast_utils_1, "addDeclarationToModule");
__createBinding(exports, ast_utils_1, "addExportToModule");
__createBinding(exports, ast_utils_1, "addImportToModule");
__createBinding(exports, ast_utils_1, "addProviderToModule");
__createBinding(exports, ast_utils_1, "replaceImport");
__createBinding(exports, ast_utils_1, "containsProperty");
var change_1 = require("./utility/change");
__createBinding(exports, change_1, "NoopChange");
__createBinding(exports, change_1, "InsertChange");
__createBinding(exports, change_1, "RemoveChange");
__createBinding(exports, change_1, "ReplaceChange");
__createBinding(exports, change_1, "createReplaceChange");
__createBinding(exports, change_1, "createChangeRecorder");
__createBinding(exports, change_1, "commitChanges");
var config_1 = require("./utility/config");
__createBinding(exports, config_1, "getWorkspace");
__createBinding(exports, config_1, "getWorkspacePath");
var find_module_1 = require("./utility/find-module");
__createBinding(exports, find_module_1, "findModule");
__createBinding(exports, find_module_1, "findModuleFromOptions");
__createBinding(exports, find_module_1, "buildRelativePath");
var json_utilts_1 = require("./utility/json-utilts");
__createBinding(exports, json_utilts_1, "findPropertyInAstObject");
var ngrx_utils_1 = require("./utility/ngrx-utils");
__createBinding(exports, ngrx_utils_1, "addReducerToState");
__createBinding(exports, ngrx_utils_1, "addReducerToStateInterface");
__createBinding(exports, ngrx_utils_1, "addReducerImportToNgModule");
__createBinding(exports, ngrx_utils_1, "addReducerToActionReducerMap");
__createBinding(exports, ngrx_utils_1, "omit");
var project_1 = require("./utility/project");
__createBinding(exports, project_1, "getProjectPath");
__createBinding(exports, project_1, "getProject");
__createBinding(exports, project_1, "isLib");
exports.stringUtils = {
    dasherize: strings_1.dasherize,
    decamelize: strings_1.decamelize,
    camelize: strings_1.camelize,
    classify: strings_1.classify,
    underscore: strings_1.underscore,
    group: strings_1.group,
    capitalize: strings_1.capitalize,
    featurePath: strings_1.featurePath,
    pluralize: strings_1.pluralize
};
var update_1 = require("./utility/update");
__createBinding(exports, update_1, "updatePackage");
var parse_name_1 = require("./utility/parse-name");
__createBinding(exports, parse_name_1, "parseName");
var package_1 = require("./utility/package");
__createBinding(exports, package_1, "addPackageToPackageJson");
var libs_version_1 = require("./utility/libs-version");
__createBinding(exports, libs_version_1, "platformVersion");
var visitors_1 = require("./utility/visitors");
__createBinding(exports, visitors_1, "visitTSSourceFiles");
__createBinding(exports, visitors_1, "visitNgModuleImports");
__createBinding(exports, visitors_1, "visitNgModuleExports");
__createBinding(exports, visitors_1, "visitComponents");
__createBinding(exports, visitors_1, "visitDecorator");
__createBinding(exports, visitors_1, "visitNgModules");
__createBinding(exports, visitors_1, "visitTemplates");
//# sourceMappingURL=index.js.map