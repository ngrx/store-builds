"use strict";
exports.__esModule = true;
var strings_1 = require("./utility/strings");
var angular_utils_1 = require("./utility/angular-utils");
exports.isIvyEnabled = angular_utils_1.isIvyEnabled;
var ast_utils_1 = require("./utility/ast-utils");
exports.findNodes = ast_utils_1.findNodes;
exports.getSourceNodes = ast_utils_1.getSourceNodes;
exports.getDecoratorMetadata = ast_utils_1.getDecoratorMetadata;
exports.getContentOfKeyLiteral = ast_utils_1.getContentOfKeyLiteral;
exports.insertAfterLastOccurrence = ast_utils_1.insertAfterLastOccurrence;
exports.insertImport = ast_utils_1.insertImport;
exports.addBootstrapToModule = ast_utils_1.addBootstrapToModule;
exports.addDeclarationToModule = ast_utils_1.addDeclarationToModule;
exports.addExportToModule = ast_utils_1.addExportToModule;
exports.addImportToModule = ast_utils_1.addImportToModule;
exports.addProviderToModule = ast_utils_1.addProviderToModule;
exports.replaceImport = ast_utils_1.replaceImport;
exports.containsProperty = ast_utils_1.containsProperty;
var change_1 = require("./utility/change");
exports.NoopChange = change_1.NoopChange;
exports.InsertChange = change_1.InsertChange;
exports.RemoveChange = change_1.RemoveChange;
exports.ReplaceChange = change_1.ReplaceChange;
exports.createReplaceChange = change_1.createReplaceChange;
exports.createChangeRecorder = change_1.createChangeRecorder;
exports.commitChanges = change_1.commitChanges;
var config_1 = require("./utility/config");
exports.getWorkspace = config_1.getWorkspace;
exports.getWorkspacePath = config_1.getWorkspacePath;
var find_module_1 = require("./utility/find-module");
exports.findModule = find_module_1.findModule;
exports.findModuleFromOptions = find_module_1.findModuleFromOptions;
exports.buildRelativePath = find_module_1.buildRelativePath;
var json_utilts_1 = require("./utility/json-utilts");
exports.findPropertyInAstObject = json_utilts_1.findPropertyInAstObject;
var ngrx_utils_1 = require("./utility/ngrx-utils");
exports.addReducerToState = ngrx_utils_1.addReducerToState;
exports.addReducerToStateInterface = ngrx_utils_1.addReducerToStateInterface;
exports.addReducerImportToNgModule = ngrx_utils_1.addReducerImportToNgModule;
exports.addReducerToActionReducerMap = ngrx_utils_1.addReducerToActionReducerMap;
exports.omit = ngrx_utils_1.omit;
var project_1 = require("./utility/project");
exports.getProjectPath = project_1.getProjectPath;
exports.getProject = project_1.getProject;
exports.isLib = project_1.isLib;
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
exports.updatePackage = update_1.updatePackage;
var parse_name_1 = require("./utility/parse-name");
exports.parseName = parse_name_1.parseName;
var package_1 = require("./utility/package");
exports.addPackageToPackageJson = package_1.addPackageToPackageJson;
var libs_version_1 = require("./utility/libs-version");
exports.platformVersion = libs_version_1.platformVersion;
var visitors_1 = require("./utility/visitors");
exports.visitTSSourceFiles = visitors_1.visitTSSourceFiles;
exports.visitNgModuleImports = visitors_1.visitNgModuleImports;
exports.visitNgModuleExports = visitors_1.visitNgModuleExports;
exports.visitComponents = visitors_1.visitComponents;
exports.visitDecorator = visitors_1.visitDecorator;
exports.visitNgModules = visitors_1.visitNgModules;
exports.visitTemplates = visitors_1.visitTemplates;
//# sourceMappingURL=index.js.map