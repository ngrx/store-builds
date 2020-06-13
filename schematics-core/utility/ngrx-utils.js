"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
exports.omit = exports.addReducerImportToNgModule = exports.addReducerToActionReducerMap = exports.addReducerToStateInterface = exports.addReducerToState = void 0;
var ts = require("typescript");
var stringUtils = require("./strings");
var change_1 = require("./change");
var schematics_1 = require("@angular-devkit/schematics");
var core_1 = require("@angular-devkit/core");
var find_module_1 = require("./find-module");
var ast_utils_1 = require("./ast-utils");
function addReducerToState(options) {
    return function (host) {
        var e_1, _a;
        if (!options.reducers) {
            return host;
        }
        var reducersPath = core_1.normalize("/" + options.path + "/" + options.reducers);
        if (!host.exists(reducersPath)) {
            throw new Error("Specified reducers path " + reducersPath + " does not exist");
        }
        var text = host.read(reducersPath);
        if (text === null) {
            throw new schematics_1.SchematicsException("File " + reducersPath + " does not exist.");
        }
        var sourceText = text.toString('utf-8');
        var source = ts.createSourceFile(reducersPath, sourceText, ts.ScriptTarget.Latest, true);
        var reducerPath = "/" + options.path + "/" +
            (options.flat ? '' : stringUtils.dasherize(options.name) + '/') +
            (options.group ? 'reducers/' : '') +
            stringUtils.dasherize(options.name) +
            '.reducer';
        var relativePath = find_module_1.buildRelativePath(reducersPath, reducerPath);
        var reducerImport = ast_utils_1.insertImport(source, reducersPath, "* as from" + stringUtils.classify(options.name), relativePath, true);
        var stateInterfaceInsert = addReducerToStateInterface(source, reducersPath, options);
        var reducerMapInsert = addReducerToActionReducerMap(source, reducersPath, options);
        var changes = [reducerImport, stateInterfaceInsert, reducerMapInsert];
        var recorder = host.beginUpdate(reducersPath);
        try {
            for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                var change = changes_1_1.value;
                if (change instanceof change_1.InsertChange) {
                    recorder.insertLeft(change.pos, change.toAdd);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (changes_1_1 && !changes_1_1.done && (_a = changes_1["return"])) _a.call(changes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        host.commitUpdate(recorder);
        return host;
    };
}
exports.addReducerToState = addReducerToState;
/**
 * Insert the reducer into the first defined top level interface
 */
function addReducerToStateInterface(source, reducersPath, options) {
    var stateInterface = source.statements.find(function (stm) { return stm.kind === ts.SyntaxKind.InterfaceDeclaration; });
    var node = stateInterface;
    if (!node) {
        return new change_1.NoopChange();
    }
    var state = options.plural
        ? stringUtils.pluralize(options.name)
        : stringUtils.camelize(options.name);
    var keyInsert = "[from" + stringUtils.classify(options.name) + "." + stringUtils.camelize(state) + "FeatureKey]: from" + stringUtils.classify(options.name) + ".State;";
    var expr = node;
    var position;
    var toInsert;
    if (expr.members.length === 0) {
        position = expr.getEnd() - 1;
        toInsert = "  " + keyInsert + "\n";
    }
    else {
        node = expr.members[expr.members.length - 1];
        position = node.getEnd() + 1;
        // Get the indentation of the last element, if any.
        var text = node.getFullText(source);
        var matches = text.match(/^\r?\n+(\s*)/);
        if (matches.length > 0) {
            toInsert = "" + matches[1] + keyInsert + "\n";
        }
        else {
            toInsert = "\n" + keyInsert;
        }
    }
    return new change_1.InsertChange(reducersPath, position, toInsert);
}
exports.addReducerToStateInterface = addReducerToStateInterface;
/**
 * Insert the reducer into the ActionReducerMap
 */
function addReducerToActionReducerMap(source, reducersPath, options) {
    var initializer;
    var actionReducerMap = source.statements
        .filter(function (stm) { return stm.kind === ts.SyntaxKind.VariableStatement; })
        .filter(function (stm) { return !!stm.declarationList; })
        .map(function (stm) {
        var declarations = stm.declarationList.declarations;
        var variable = declarations.find(function (decl) { return decl.kind === ts.SyntaxKind.VariableDeclaration; });
        var type = variable ? variable.type : {};
        return { initializer: variable.initializer, type: type };
    })
        .filter(function (initWithType) { return initWithType.type !== undefined; })
        .find(function (_a) {
        var type = _a.type;
        return type.typeName.text === 'ActionReducerMap';
    });
    if (!actionReducerMap || !actionReducerMap.initializer) {
        return new change_1.NoopChange();
    }
    var node = actionReducerMap.initializer;
    var state = options.plural
        ? stringUtils.pluralize(options.name)
        : stringUtils.camelize(options.name);
    var keyInsert = "[from" + stringUtils.classify(options.name) + "." + stringUtils.camelize(state) + "FeatureKey]: from" + stringUtils.classify(options.name) + ".reducer,";
    var expr = node;
    var position;
    var toInsert;
    if (expr.properties.length === 0) {
        position = expr.getEnd() - 1;
        toInsert = "  " + keyInsert + "\n";
    }
    else {
        node = expr.properties[expr.properties.length - 1];
        position = node.getEnd() + 1;
        // Get the indentation of the last element, if any.
        var text = node.getFullText(source);
        var matches = text.match(/^\r?\n+(\s*)/);
        if (matches.length > 0) {
            toInsert = "\n" + matches[1] + keyInsert;
        }
        else {
            toInsert = "\n" + keyInsert;
        }
    }
    return new change_1.InsertChange(reducersPath, position, toInsert);
}
exports.addReducerToActionReducerMap = addReducerToActionReducerMap;
/**
 * Add reducer feature to NgModule
 */
function addReducerImportToNgModule(options) {
    return function (host) {
        var e_2, _a;
        if (!options.module) {
            return host;
        }
        var modulePath = options.module;
        if (!host.exists(options.module)) {
            throw new Error("Specified module path " + modulePath + " does not exist");
        }
        var text = host.read(modulePath);
        if (text === null) {
            throw new schematics_1.SchematicsException("File " + modulePath + " does not exist.");
        }
        var sourceText = text.toString('utf-8');
        var source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        var commonImports = [
            ast_utils_1.insertImport(source, modulePath, 'StoreModule', '@ngrx/store'),
        ];
        var reducerPath = "/" + options.path + "/" +
            (options.flat ? '' : stringUtils.dasherize(options.name) + '/') +
            (options.group ? 'reducers/' : '') +
            stringUtils.dasherize(options.name) +
            '.reducer';
        var relativePath = find_module_1.buildRelativePath(modulePath, reducerPath);
        var reducerImport = ast_utils_1.insertImport(source, modulePath, "* as from" + stringUtils.classify(options.name), relativePath, true);
        var state = options.plural
            ? stringUtils.pluralize(options.name)
            : stringUtils.camelize(options.name);
        var _b = __read(ast_utils_1.addImportToModule(source, modulePath, "StoreModule.forFeature(from" + stringUtils.classify(options.name) + "." + state + "FeatureKey, from" + stringUtils.classify(options.name) + ".reducer)", relativePath), 1), storeNgModuleImport = _b[0];
        var changes = __spread(commonImports, [reducerImport, storeNgModuleImport]);
        var recorder = host.beginUpdate(modulePath);
        try {
            for (var changes_2 = __values(changes), changes_2_1 = changes_2.next(); !changes_2_1.done; changes_2_1 = changes_2.next()) {
                var change = changes_2_1.value;
                if (change instanceof change_1.InsertChange) {
                    recorder.insertLeft(change.pos, change.toAdd);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (changes_2_1 && !changes_2_1.done && (_a = changes_2["return"])) _a.call(changes_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        host.commitUpdate(recorder);
        return host;
    };
}
exports.addReducerImportToNgModule = addReducerImportToNgModule;
function omit(object, keyToRemove) {
    return Object.keys(object)
        .filter(function (key) { return key !== keyToRemove; })
        .reduce(function (result, key) {
        var _a;
        return Object.assign(result, (_a = {}, _a[key] = object[key], _a));
    }, {});
}
exports.omit = omit;
//# sourceMappingURL=ngrx-utils.js.map