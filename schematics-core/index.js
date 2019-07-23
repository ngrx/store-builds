(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core", ["require", "exports", "@ngrx/store/schematics-core/utility/strings", "@ngrx/store/schematics-core/utility/ast-utils", "@ngrx/store/schematics-core/utility/change", "@ngrx/store/schematics-core/utility/config", "@ngrx/store/schematics-core/utility/find-module", "@ngrx/store/schematics-core/utility/ngrx-utils", "@ngrx/store/schematics-core/utility/project", "@ngrx/store/schematics-core/utility/update", "@ngrx/store/schematics-core/utility/parse-name", "@ngrx/store/schematics-core/utility/package", "@ngrx/store/schematics-core/utility/libs-version", "@ngrx/store/schematics-core/utility/visit-utils"], factory);
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
    exports.replaceImport = ast_utils_1.replaceImport;
    var change_1 = require("@ngrx/store/schematics-core/utility/change");
    exports.NoopChange = change_1.NoopChange;
    exports.InsertChange = change_1.InsertChange;
    exports.RemoveChange = change_1.RemoveChange;
    exports.ReplaceChange = change_1.ReplaceChange;
    exports.createReplaceChange = change_1.createReplaceChange;
    exports.createChangeRecorder = change_1.createChangeRecorder;
    exports.commitChanges = change_1.commitChanges;
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
        pluralize: strings_1.pluralize,
    };
    var update_1 = require("@ngrx/store/schematics-core/utility/update");
    exports.updatePackage = update_1.updatePackage;
    var parse_name_1 = require("@ngrx/store/schematics-core/utility/parse-name");
    exports.parseName = parse_name_1.parseName;
    var package_1 = require("@ngrx/store/schematics-core/utility/package");
    exports.addPackageToPackageJson = package_1.addPackageToPackageJson;
    var libs_version_1 = require("@ngrx/store/schematics-core/utility/libs-version");
    exports.platformVersion = libs_version_1.platformVersion;
    var visit_utils_1 = require("@ngrx/store/schematics-core/utility/visit-utils");
    exports.visitTSSourceFiles = visit_utils_1.visitTSSourceFiles;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NjaGVtYXRpY3MtY29yZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLHlFQVUyQjtJQUUzQiwyRUFhNkI7SUFaM0IsZ0NBQUEsU0FBUyxDQUFBO0lBQ1QscUNBQUEsY0FBYyxDQUFBO0lBQ2QsMkNBQUEsb0JBQW9CLENBQUE7SUFDcEIsNkNBQUEsc0JBQXNCLENBQUE7SUFDdEIsZ0RBQUEseUJBQXlCLENBQUE7SUFDekIsbUNBQUEsWUFBWSxDQUFBO0lBQ1osMkNBQUEsb0JBQW9CLENBQUE7SUFDcEIsNkNBQUEsc0JBQXNCLENBQUE7SUFDdEIsd0NBQUEsaUJBQWlCLENBQUE7SUFDakIsd0NBQUEsaUJBQWlCLENBQUE7SUFDakIsMENBQUEsbUJBQW1CLENBQUE7SUFDbkIsb0NBQUEsYUFBYSxDQUFBO0lBR2YscUVBVTBCO0lBUHhCLDhCQUFBLFVBQVUsQ0FBQTtJQUNWLGdDQUFBLFlBQVksQ0FBQTtJQUNaLGdDQUFBLFlBQVksQ0FBQTtJQUNaLGlDQUFBLGFBQWEsQ0FBQTtJQUNiLHVDQUFBLG1CQUFtQixDQUFBO0lBQ25CLHdDQUFBLG9CQUFvQixDQUFBO0lBQ3BCLGlDQUFBLGFBQWEsQ0FBQTtJQUdmLHFFQUE2RTtJQUF6RCxnQ0FBQSxZQUFZLENBQUE7SUFBRSxvQ0FBQSxnQkFBZ0IsQ0FBQTtJQUVsRCwrRUFLK0I7SUFKN0IsbUNBQUEsVUFBVSxDQUFBO0lBQ1YsOENBQUEscUJBQXFCLENBQUE7SUFDckIsMENBQUEsaUJBQWlCLENBQUE7SUFJbkIsNkVBTThCO0lBTDVCLHlDQUFBLGlCQUFpQixDQUFBO0lBQ2pCLGtEQUFBLDBCQUEwQixDQUFBO0lBQzFCLGtEQUFBLDBCQUEwQixDQUFBO0lBQzFCLG9EQUFBLDRCQUE0QixDQUFBO0lBQzVCLDRCQUFBLElBQUksQ0FBQTtJQUdOLHVFQUFzRTtJQUE3RCxtQ0FBQSxjQUFjLENBQUE7SUFBRSwrQkFBQSxVQUFVLENBQUE7SUFBRSwwQkFBQSxLQUFLLENBQUE7SUFFN0IsUUFBQSxXQUFXLEdBQUc7UUFDekIsU0FBUyxFQUFULG1CQUFTO1FBQ1QsVUFBVSxFQUFWLG9CQUFVO1FBQ1YsUUFBUSxFQUFSLGtCQUFRO1FBQ1IsUUFBUSxFQUFSLGtCQUFRO1FBQ1IsVUFBVSxFQUFWLG9CQUFVO1FBQ1YsS0FBSyxFQUFMLGVBQUs7UUFDTCxVQUFVLEVBQVYsb0JBQVU7UUFDVixXQUFXLEVBQVgscUJBQVc7UUFDWCxTQUFTLEVBQVQsbUJBQVM7S0FDVixDQUFDO0lBRUYscUVBQWlEO0lBQXhDLGlDQUFBLGFBQWEsQ0FBQTtJQUV0Qiw2RUFBaUQ7SUFBeEMsaUNBQUEsU0FBUyxDQUFBO0lBRWxCLHVFQUE0RDtJQUFuRCw0Q0FBQSx1QkFBdUIsQ0FBQTtJQUVoQyxpRkFBeUQ7SUFBaEQseUNBQUEsZUFBZSxDQUFBO0lBRXhCLCtFQUEyRDtJQUFsRCwyQ0FBQSxrQkFBa0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGRhc2hlcml6ZSxcbiAgZGVjYW1lbGl6ZSxcbiAgY2FtZWxpemUsXG4gIGNsYXNzaWZ5LFxuICB1bmRlcnNjb3JlLFxuICBncm91cCxcbiAgY2FwaXRhbGl6ZSxcbiAgZmVhdHVyZVBhdGgsXG4gIHBsdXJhbGl6ZSxcbn0gZnJvbSAnLi91dGlsaXR5L3N0cmluZ3MnO1xuXG5leHBvcnQge1xuICBmaW5kTm9kZXMsXG4gIGdldFNvdXJjZU5vZGVzLFxuICBnZXREZWNvcmF0b3JNZXRhZGF0YSxcbiAgZ2V0Q29udGVudE9mS2V5TGl0ZXJhbCxcbiAgaW5zZXJ0QWZ0ZXJMYXN0T2NjdXJyZW5jZSxcbiAgaW5zZXJ0SW1wb3J0LFxuICBhZGRCb290c3RyYXBUb01vZHVsZSxcbiAgYWRkRGVjbGFyYXRpb25Ub01vZHVsZSxcbiAgYWRkRXhwb3J0VG9Nb2R1bGUsXG4gIGFkZEltcG9ydFRvTW9kdWxlLFxuICBhZGRQcm92aWRlclRvTW9kdWxlLFxuICByZXBsYWNlSW1wb3J0LFxufSBmcm9tICcuL3V0aWxpdHkvYXN0LXV0aWxzJztcblxuZXhwb3J0IHtcbiAgSG9zdCxcbiAgQ2hhbmdlLFxuICBOb29wQ2hhbmdlLFxuICBJbnNlcnRDaGFuZ2UsXG4gIFJlbW92ZUNoYW5nZSxcbiAgUmVwbGFjZUNoYW5nZSxcbiAgY3JlYXRlUmVwbGFjZUNoYW5nZSxcbiAgY3JlYXRlQ2hhbmdlUmVjb3JkZXIsXG4gIGNvbW1pdENoYW5nZXMsXG59IGZyb20gJy4vdXRpbGl0eS9jaGFuZ2UnO1xuXG5leHBvcnQgeyBBcHBDb25maWcsIGdldFdvcmtzcGFjZSwgZ2V0V29ya3NwYWNlUGF0aCB9IGZyb20gJy4vdXRpbGl0eS9jb25maWcnO1xuXG5leHBvcnQge1xuICBmaW5kTW9kdWxlLFxuICBmaW5kTW9kdWxlRnJvbU9wdGlvbnMsXG4gIGJ1aWxkUmVsYXRpdmVQYXRoLFxuICBNb2R1bGVPcHRpb25zLFxufSBmcm9tICcuL3V0aWxpdHkvZmluZC1tb2R1bGUnO1xuXG5leHBvcnQge1xuICBhZGRSZWR1Y2VyVG9TdGF0ZSxcbiAgYWRkUmVkdWNlclRvU3RhdGVJbnRlcmZhY2UsXG4gIGFkZFJlZHVjZXJJbXBvcnRUb05nTW9kdWxlLFxuICBhZGRSZWR1Y2VyVG9BY3Rpb25SZWR1Y2VyTWFwLFxuICBvbWl0LFxufSBmcm9tICcuL3V0aWxpdHkvbmdyeC11dGlscyc7XG5cbmV4cG9ydCB7IGdldFByb2plY3RQYXRoLCBnZXRQcm9qZWN0LCBpc0xpYiB9IGZyb20gJy4vdXRpbGl0eS9wcm9qZWN0JztcblxuZXhwb3J0IGNvbnN0IHN0cmluZ1V0aWxzID0ge1xuICBkYXNoZXJpemUsXG4gIGRlY2FtZWxpemUsXG4gIGNhbWVsaXplLFxuICBjbGFzc2lmeSxcbiAgdW5kZXJzY29yZSxcbiAgZ3JvdXAsXG4gIGNhcGl0YWxpemUsXG4gIGZlYXR1cmVQYXRoLFxuICBwbHVyYWxpemUsXG59O1xuXG5leHBvcnQgeyB1cGRhdGVQYWNrYWdlIH0gZnJvbSAnLi91dGlsaXR5L3VwZGF0ZSc7XG5cbmV4cG9ydCB7IHBhcnNlTmFtZSB9IGZyb20gJy4vdXRpbGl0eS9wYXJzZS1uYW1lJztcblxuZXhwb3J0IHsgYWRkUGFja2FnZVRvUGFja2FnZUpzb24gfSBmcm9tICcuL3V0aWxpdHkvcGFja2FnZSc7XG5cbmV4cG9ydCB7IHBsYXRmb3JtVmVyc2lvbiB9IGZyb20gJy4vdXRpbGl0eS9saWJzLXZlcnNpb24nO1xuXG5leHBvcnQgeyB2aXNpdFRTU291cmNlRmlsZXMgfSBmcm9tICcuL3V0aWxpdHkvdmlzaXQtdXRpbHMnO1xuIl19