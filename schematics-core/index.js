(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core", ["require", "exports", "@ngrx/store/schematics-core/utility/strings", "@ngrx/store/schematics-core/utility/ast-utils", "@ngrx/store/schematics-core/utility/change", "@ngrx/store/schematics-core/utility/config", "@ngrx/store/schematics-core/utility/find-module", "@ngrx/store/schematics-core/utility/ngrx-utils", "@ngrx/store/schematics-core/utility/project", "@ngrx/store/schematics-core/utility/update", "@ngrx/store/schematics-core/utility/parse-name", "@ngrx/store/schematics-core/utility/package", "@ngrx/store/schematics-core/utility/libs-version"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const strings_1 = require("@ngrx/store/schematics-core/utility/strings");
    var ast_utils_1 = require("@ngrx/store/schematics-core/utility/ast-utils");
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
    var change_1 = require("@ngrx/store/schematics-core/utility/change");
    exports.NoopChange = change_1.NoopChange;
    exports.InsertChange = change_1.InsertChange;
    exports.RemoveChange = change_1.RemoveChange;
    exports.ReplaceChange = change_1.ReplaceChange;
    var config_1 = require("@ngrx/store/schematics-core/utility/config");
    exports.getWorkspace = config_1.getWorkspace;
    exports.getWorkspacePath = config_1.getWorkspacePath;
    var find_module_1 = require("@ngrx/store/schematics-core/utility/find-module");
    exports.findModule = find_module_1.findModule;
    exports.findModuleFromOptions = find_module_1.findModuleFromOptions;
    exports.buildRelativePath = find_module_1.buildRelativePath;
    var ngrx_utils_1 = require("@ngrx/store/schematics-core/utility/ngrx-utils");
    exports.addReducerToState = ngrx_utils_1.addReducerToState;
    exports.addReducerToStateInterface = ngrx_utils_1.addReducerToStateInterface;
    exports.addReducerImportToNgModule = ngrx_utils_1.addReducerImportToNgModule;
    exports.addReducerToActionReducerMap = ngrx_utils_1.addReducerToActionReducerMap;
    exports.omit = ngrx_utils_1.omit;
    var project_1 = require("@ngrx/store/schematics-core/utility/project");
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
    };
    var update_1 = require("@ngrx/store/schematics-core/utility/update");
    exports.updatePackage = update_1.updatePackage;
    var parse_name_1 = require("@ngrx/store/schematics-core/utility/parse-name");
    exports.parseName = parse_name_1.parseName;
    var package_1 = require("@ngrx/store/schematics-core/utility/package");
    exports.addPackageToPackageJson = package_1.addPackageToPackageJson;
    var libs_version_1 = require("@ngrx/store/schematics-core/utility/libs-version");
    exports.platformVersion = libs_version_1.platformVersion;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NjaGVtYXRpY3MtY29yZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLHlFQVMyQjtJQUUzQiwyRUFZNkI7SUFYM0IsZ0NBQUEsU0FBUyxDQUFBO0lBQ1QscUNBQUEsY0FBYyxDQUFBO0lBQ2QsMkNBQUEsb0JBQW9CLENBQUE7SUFDcEIsNkNBQUEsc0JBQXNCLENBQUE7SUFDdEIsZ0RBQUEseUJBQXlCLENBQUE7SUFDekIsbUNBQUEsWUFBWSxDQUFBO0lBQ1osMkNBQUEsb0JBQW9CLENBQUE7SUFDcEIsNkNBQUEsc0JBQXNCLENBQUE7SUFDdEIsd0NBQUEsaUJBQWlCLENBQUE7SUFDakIsd0NBQUEsaUJBQWlCLENBQUE7SUFDakIsMENBQUEsbUJBQW1CLENBQUE7SUFHckIscUVBTzBCO0lBSnhCLDhCQUFBLFVBQVUsQ0FBQTtJQUNWLGdDQUFBLFlBQVksQ0FBQTtJQUNaLGdDQUFBLFlBQVksQ0FBQTtJQUNaLGlDQUFBLGFBQWEsQ0FBQTtJQUdmLHFFQUE2RTtJQUF6RCxnQ0FBQSxZQUFZLENBQUE7SUFBRSxvQ0FBQSxnQkFBZ0IsQ0FBQTtJQUVsRCwrRUFLK0I7SUFKN0IsbUNBQUEsVUFBVSxDQUFBO0lBQ1YsOENBQUEscUJBQXFCLENBQUE7SUFDckIsMENBQUEsaUJBQWlCLENBQUE7SUFJbkIsNkVBTThCO0lBTDVCLHlDQUFBLGlCQUFpQixDQUFBO0lBQ2pCLGtEQUFBLDBCQUEwQixDQUFBO0lBQzFCLGtEQUFBLDBCQUEwQixDQUFBO0lBQzFCLG9EQUFBLDRCQUE0QixDQUFBO0lBQzVCLDRCQUFBLElBQUksQ0FBQTtJQUdOLHVFQUFzRTtJQUE3RCxtQ0FBQSxjQUFjLENBQUE7SUFBRSwrQkFBQSxVQUFVLENBQUE7SUFBRSwwQkFBQSxLQUFLLENBQUE7SUFFN0IsUUFBQSxXQUFXLEdBQUc7UUFDekIsU0FBUyxFQUFULG1CQUFTO1FBQ1QsVUFBVSxFQUFWLG9CQUFVO1FBQ1YsUUFBUSxFQUFSLGtCQUFRO1FBQ1IsUUFBUSxFQUFSLGtCQUFRO1FBQ1IsVUFBVSxFQUFWLG9CQUFVO1FBQ1YsS0FBSyxFQUFMLGVBQUs7UUFDTCxVQUFVLEVBQVYsb0JBQVU7UUFDVixXQUFXLEVBQVgscUJBQVc7S0FDWixDQUFDO0lBRUYscUVBQWlEO0lBQXhDLGlDQUFBLGFBQWEsQ0FBQTtJQUV0Qiw2RUFBaUQ7SUFBeEMsaUNBQUEsU0FBUyxDQUFBO0lBRWxCLHVFQUE0RDtJQUFuRCw0Q0FBQSx1QkFBdUIsQ0FBQTtJQUVoQyxpRkFBeUQ7SUFBaEQseUNBQUEsZUFBZSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgZGFzaGVyaXplLFxuICBkZWNhbWVsaXplLFxuICBjYW1lbGl6ZSxcbiAgY2xhc3NpZnksXG4gIHVuZGVyc2NvcmUsXG4gIGdyb3VwLFxuICBjYXBpdGFsaXplLFxuICBmZWF0dXJlUGF0aCxcbn0gZnJvbSAnLi91dGlsaXR5L3N0cmluZ3MnO1xuXG5leHBvcnQge1xuICBmaW5kTm9kZXMsXG4gIGdldFNvdXJjZU5vZGVzLFxuICBnZXREZWNvcmF0b3JNZXRhZGF0YSxcbiAgZ2V0Q29udGVudE9mS2V5TGl0ZXJhbCxcbiAgaW5zZXJ0QWZ0ZXJMYXN0T2NjdXJyZW5jZSxcbiAgaW5zZXJ0SW1wb3J0LFxuICBhZGRCb290c3RyYXBUb01vZHVsZSxcbiAgYWRkRGVjbGFyYXRpb25Ub01vZHVsZSxcbiAgYWRkRXhwb3J0VG9Nb2R1bGUsXG4gIGFkZEltcG9ydFRvTW9kdWxlLFxuICBhZGRQcm92aWRlclRvTW9kdWxlLFxufSBmcm9tICcuL3V0aWxpdHkvYXN0LXV0aWxzJztcblxuZXhwb3J0IHtcbiAgSG9zdCxcbiAgQ2hhbmdlLFxuICBOb29wQ2hhbmdlLFxuICBJbnNlcnRDaGFuZ2UsXG4gIFJlbW92ZUNoYW5nZSxcbiAgUmVwbGFjZUNoYW5nZSxcbn0gZnJvbSAnLi91dGlsaXR5L2NoYW5nZSc7XG5cbmV4cG9ydCB7IEFwcENvbmZpZywgZ2V0V29ya3NwYWNlLCBnZXRXb3Jrc3BhY2VQYXRoIH0gZnJvbSAnLi91dGlsaXR5L2NvbmZpZyc7XG5cbmV4cG9ydCB7XG4gIGZpbmRNb2R1bGUsXG4gIGZpbmRNb2R1bGVGcm9tT3B0aW9ucyxcbiAgYnVpbGRSZWxhdGl2ZVBhdGgsXG4gIE1vZHVsZU9wdGlvbnMsXG59IGZyb20gJy4vdXRpbGl0eS9maW5kLW1vZHVsZSc7XG5cbmV4cG9ydCB7XG4gIGFkZFJlZHVjZXJUb1N0YXRlLFxuICBhZGRSZWR1Y2VyVG9TdGF0ZUludGVyZmFjZSxcbiAgYWRkUmVkdWNlckltcG9ydFRvTmdNb2R1bGUsXG4gIGFkZFJlZHVjZXJUb0FjdGlvblJlZHVjZXJNYXAsXG4gIG9taXQsXG59IGZyb20gJy4vdXRpbGl0eS9uZ3J4LXV0aWxzJztcblxuZXhwb3J0IHsgZ2V0UHJvamVjdFBhdGgsIGdldFByb2plY3QsIGlzTGliIH0gZnJvbSAnLi91dGlsaXR5L3Byb2plY3QnO1xuXG5leHBvcnQgY29uc3Qgc3RyaW5nVXRpbHMgPSB7XG4gIGRhc2hlcml6ZSxcbiAgZGVjYW1lbGl6ZSxcbiAgY2FtZWxpemUsXG4gIGNsYXNzaWZ5LFxuICB1bmRlcnNjb3JlLFxuICBncm91cCxcbiAgY2FwaXRhbGl6ZSxcbiAgZmVhdHVyZVBhdGgsXG59O1xuXG5leHBvcnQgeyB1cGRhdGVQYWNrYWdlIH0gZnJvbSAnLi91dGlsaXR5L3VwZGF0ZSc7XG5cbmV4cG9ydCB7IHBhcnNlTmFtZSB9IGZyb20gJy4vdXRpbGl0eS9wYXJzZS1uYW1lJztcblxuZXhwb3J0IHsgYWRkUGFja2FnZVRvUGFja2FnZUpzb24gfSBmcm9tICcuL3V0aWxpdHkvcGFja2FnZSc7XG5cbmV4cG9ydCB7IHBsYXRmb3JtVmVyc2lvbiB9IGZyb20gJy4vdXRpbGl0eS9saWJzLXZlcnNpb24nO1xuIl19