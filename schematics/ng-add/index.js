"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.__esModule = true;
var schematics_1 = require("@angular-devkit/schematics");
var tasks_1 = require("@angular-devkit/schematics/tasks");
var schematics_core_1 = require("@ngrx/store/schematics-core");
var core_1 = require("@angular-devkit/core");
var ts = require("typescript");
function addImportToNgModule(options) {
    return function (host) {
        var e_1, _a;
        var modulePath = options.module;
        if (!modulePath) {
            return host;
        }
        if (!host.exists(modulePath)) {
            throw new Error('Specified module does not exist');
        }
        var text = host.read(modulePath);
        if (text === null) {
            throw new schematics_1.SchematicsException("File " + modulePath + " does not exist.");
        }
        var sourceText = text.toString('utf-8');
        var source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        var storeModuleReducers = options.minimal ? "{}" : "reducers";
        var storeModuleConfig = options.minimal
            ? "{}"
            : "{\n      metaReducers\n    }";
        var storeModuleSetup = "StoreModule.forRoot(" + storeModuleReducers + ", " + storeModuleConfig + ")";
        var statePath = "/" + options.path + "/" + options.statePath;
        var relativePath = schematics_core_1.buildRelativePath(modulePath, statePath);
        var _b = __read(schematics_core_1.addImportToModule(source, modulePath, storeModuleSetup, relativePath), 1), storeNgModuleImport = _b[0];
        var changes = [
            schematics_core_1.insertImport(source, modulePath, 'StoreModule', '@ngrx/store'),
            storeNgModuleImport,
        ];
        if (!options.minimal) {
            changes = changes.concat([
                schematics_core_1.insertImport(source, modulePath, 'reducers, metaReducers', relativePath),
            ]);
        }
        var recorder = host.beginUpdate(modulePath);
        try {
            for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                var change = changes_1_1.value;
                if (change instanceof schematics_core_1.InsertChange) {
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
function addNgRxStoreToPackageJson() {
    return function (host, context) {
        schematics_core_1.addPackageToPackageJson(host, 'dependencies', '@ngrx/store', schematics_core_1.platformVersion);
        context.addTask(new tasks_1.NodePackageInstallTask());
        return host;
    };
}
function default_1(options) {
    return function (host, context) {
        options.path = schematics_core_1.getProjectPath(host, options);
        var parsedPath = schematics_core_1.parseName(options.path, '');
        options.path = parsedPath.path;
        var statePath = "/" + options.path + "/" + options.statePath + "/index.ts";
        var srcPath = core_1.dirname(options.path);
        var environmentsPath = schematics_core_1.buildRelativePath(statePath, "/" + srcPath + "/environments/environment");
        if (options.module) {
            options.module = schematics_core_1.findModuleFromOptions(host, {
                name: '',
                module: options.module,
                path: options.path
            });
        }
        if (options.stateInterface && options.stateInterface !== 'State') {
            options.stateInterface = schematics_core_1.stringUtils.classify(options.stateInterface);
        }
        var templateSource = schematics_1.apply(schematics_1.url('./files'), [
            schematics_1.filter(function (_) { return (options.minimal ? false : true); }),
            schematics_1.applyTemplates(__assign(__assign(__assign({}, schematics_core_1.stringUtils), options), { environmentsPath: environmentsPath })),
            schematics_1.move(parsedPath.path),
        ]);
        return schematics_1.chain([
            schematics_1.branchAndMerge(schematics_1.chain([addImportToNgModule(options), schematics_1.mergeWith(templateSource)])),
            options && options.skipPackageJson ? schematics_1.noop() : addNgRxStoreToPackageJson(),
        ])(host, context);
    };
}
exports["default"] = default_1;
//# sourceMappingURL=index.js.map