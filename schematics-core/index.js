(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core", ["require", "exports", "@ngrx/store/schematics-core/utility/strings", "@ngrx/store/schematics-core/utility/angular-utils", "@ngrx/store/schematics-core/utility/ast-utils", "@ngrx/store/schematics-core/utility/change", "@ngrx/store/schematics-core/utility/config", "@ngrx/store/schematics-core/utility/find-module", "@ngrx/store/schematics-core/utility/json-utilts", "@ngrx/store/schematics-core/utility/ngrx-utils", "@ngrx/store/schematics-core/utility/project", "@ngrx/store/schematics-core/utility/update", "@ngrx/store/schematics-core/utility/parse-name", "@ngrx/store/schematics-core/utility/package", "@ngrx/store/schematics-core/utility/libs-version", "@ngrx/store/schematics-core/utility/visitors"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const strings_1 = require("@ngrx/store/schematics-core/utility/strings");
    var angular_utils_1 = require("@ngrx/store/schematics-core/utility/angular-utils");
    exports.isIvyEnabled = angular_utils_1.isIvyEnabled;
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
    exports.containsProperty = ast_utils_1.containsProperty;
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
    var json_utilts_1 = require("@ngrx/store/schematics-core/utility/json-utilts");
    exports.findPropertyInAstObject = json_utilts_1.findPropertyInAstObject;
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
    var visitors_1 = require("@ngrx/store/schematics-core/utility/visitors");
    exports.visitTSSourceFiles = visitors_1.visitTSSourceFiles;
    exports.visitNgModuleImports = visitors_1.visitNgModuleImports;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NjaGVtYXRpY3MtY29yZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLHlFQVUyQjtJQUUzQixtRkFBdUQ7SUFBOUMsdUNBQUEsWUFBWSxDQUFBO0lBRXJCLDJFQWM2QjtJQWIzQixnQ0FBQSxTQUFTLENBQUE7SUFDVCxxQ0FBQSxjQUFjLENBQUE7SUFDZCwyQ0FBQSxvQkFBb0IsQ0FBQTtJQUNwQiw2Q0FBQSxzQkFBc0IsQ0FBQTtJQUN0QixnREFBQSx5QkFBeUIsQ0FBQTtJQUN6QixtQ0FBQSxZQUFZLENBQUE7SUFDWiwyQ0FBQSxvQkFBb0IsQ0FBQTtJQUNwQiw2Q0FBQSxzQkFBc0IsQ0FBQTtJQUN0Qix3Q0FBQSxpQkFBaUIsQ0FBQTtJQUNqQix3Q0FBQSxpQkFBaUIsQ0FBQTtJQUNqQiwwQ0FBQSxtQkFBbUIsQ0FBQTtJQUNuQixvQ0FBQSxhQUFhLENBQUE7SUFDYix1Q0FBQSxnQkFBZ0IsQ0FBQTtJQUdsQixxRUFVMEI7SUFQeEIsOEJBQUEsVUFBVSxDQUFBO0lBQ1YsZ0NBQUEsWUFBWSxDQUFBO0lBQ1osZ0NBQUEsWUFBWSxDQUFBO0lBQ1osaUNBQUEsYUFBYSxDQUFBO0lBQ2IsdUNBQUEsbUJBQW1CLENBQUE7SUFDbkIsd0NBQUEsb0JBQW9CLENBQUE7SUFDcEIsaUNBQUEsYUFBYSxDQUFBO0lBR2YscUVBQTZFO0lBQXpELGdDQUFBLFlBQVksQ0FBQTtJQUFFLG9DQUFBLGdCQUFnQixDQUFBO0lBRWxELCtFQUsrQjtJQUo3QixtQ0FBQSxVQUFVLENBQUE7SUFDViw4Q0FBQSxxQkFBcUIsQ0FBQTtJQUNyQiwwQ0FBQSxpQkFBaUIsQ0FBQTtJQUluQiwrRUFBZ0U7SUFBdkQsZ0RBQUEsdUJBQXVCLENBQUE7SUFFaEMsNkVBTThCO0lBTDVCLHlDQUFBLGlCQUFpQixDQUFBO0lBQ2pCLGtEQUFBLDBCQUEwQixDQUFBO0lBQzFCLGtEQUFBLDBCQUEwQixDQUFBO0lBQzFCLG9EQUFBLDRCQUE0QixDQUFBO0lBQzVCLDRCQUFBLElBQUksQ0FBQTtJQUdOLHVFQUFzRTtJQUE3RCxtQ0FBQSxjQUFjLENBQUE7SUFBRSwrQkFBQSxVQUFVLENBQUE7SUFBRSwwQkFBQSxLQUFLLENBQUE7SUFFN0IsUUFBQSxXQUFXLEdBQUc7UUFDekIsU0FBUyxFQUFULG1CQUFTO1FBQ1QsVUFBVSxFQUFWLG9CQUFVO1FBQ1YsUUFBUSxFQUFSLGtCQUFRO1FBQ1IsUUFBUSxFQUFSLGtCQUFRO1FBQ1IsVUFBVSxFQUFWLG9CQUFVO1FBQ1YsS0FBSyxFQUFMLGVBQUs7UUFDTCxVQUFVLEVBQVYsb0JBQVU7UUFDVixXQUFXLEVBQVgscUJBQVc7UUFDWCxTQUFTLEVBQVQsbUJBQVM7S0FDVixDQUFDO0lBRUYscUVBQWlEO0lBQXhDLGlDQUFBLGFBQWEsQ0FBQTtJQUV0Qiw2RUFBaUQ7SUFBeEMsaUNBQUEsU0FBUyxDQUFBO0lBRWxCLHVFQUE0RDtJQUFuRCw0Q0FBQSx1QkFBdUIsQ0FBQTtJQUVoQyxpRkFBeUQ7SUFBaEQseUNBQUEsZUFBZSxDQUFBO0lBRXhCLHlFQUE4RTtJQUFyRSx3Q0FBQSxrQkFBa0IsQ0FBQTtJQUFFLDBDQUFBLG9CQUFvQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgZGFzaGVyaXplLFxuICBkZWNhbWVsaXplLFxuICBjYW1lbGl6ZSxcbiAgY2xhc3NpZnksXG4gIHVuZGVyc2NvcmUsXG4gIGdyb3VwLFxuICBjYXBpdGFsaXplLFxuICBmZWF0dXJlUGF0aCxcbiAgcGx1cmFsaXplLFxufSBmcm9tICcuL3V0aWxpdHkvc3RyaW5ncyc7XG5cbmV4cG9ydCB7IGlzSXZ5RW5hYmxlZCB9IGZyb20gJy4vdXRpbGl0eS9hbmd1bGFyLXV0aWxzJztcblxuZXhwb3J0IHtcbiAgZmluZE5vZGVzLFxuICBnZXRTb3VyY2VOb2RlcyxcbiAgZ2V0RGVjb3JhdG9yTWV0YWRhdGEsXG4gIGdldENvbnRlbnRPZktleUxpdGVyYWwsXG4gIGluc2VydEFmdGVyTGFzdE9jY3VycmVuY2UsXG4gIGluc2VydEltcG9ydCxcbiAgYWRkQm9vdHN0cmFwVG9Nb2R1bGUsXG4gIGFkZERlY2xhcmF0aW9uVG9Nb2R1bGUsXG4gIGFkZEV4cG9ydFRvTW9kdWxlLFxuICBhZGRJbXBvcnRUb01vZHVsZSxcbiAgYWRkUHJvdmlkZXJUb01vZHVsZSxcbiAgcmVwbGFjZUltcG9ydCxcbiAgY29udGFpbnNQcm9wZXJ0eSxcbn0gZnJvbSAnLi91dGlsaXR5L2FzdC11dGlscyc7XG5cbmV4cG9ydCB7XG4gIEhvc3QsXG4gIENoYW5nZSxcbiAgTm9vcENoYW5nZSxcbiAgSW5zZXJ0Q2hhbmdlLFxuICBSZW1vdmVDaGFuZ2UsXG4gIFJlcGxhY2VDaGFuZ2UsXG4gIGNyZWF0ZVJlcGxhY2VDaGFuZ2UsXG4gIGNyZWF0ZUNoYW5nZVJlY29yZGVyLFxuICBjb21taXRDaGFuZ2VzLFxufSBmcm9tICcuL3V0aWxpdHkvY2hhbmdlJztcblxuZXhwb3J0IHsgQXBwQ29uZmlnLCBnZXRXb3Jrc3BhY2UsIGdldFdvcmtzcGFjZVBhdGggfSBmcm9tICcuL3V0aWxpdHkvY29uZmlnJztcblxuZXhwb3J0IHtcbiAgZmluZE1vZHVsZSxcbiAgZmluZE1vZHVsZUZyb21PcHRpb25zLFxuICBidWlsZFJlbGF0aXZlUGF0aCxcbiAgTW9kdWxlT3B0aW9ucyxcbn0gZnJvbSAnLi91dGlsaXR5L2ZpbmQtbW9kdWxlJztcblxuZXhwb3J0IHsgZmluZFByb3BlcnR5SW5Bc3RPYmplY3QgfSBmcm9tICcuL3V0aWxpdHkvanNvbi11dGlsdHMnO1xuXG5leHBvcnQge1xuICBhZGRSZWR1Y2VyVG9TdGF0ZSxcbiAgYWRkUmVkdWNlclRvU3RhdGVJbnRlcmZhY2UsXG4gIGFkZFJlZHVjZXJJbXBvcnRUb05nTW9kdWxlLFxuICBhZGRSZWR1Y2VyVG9BY3Rpb25SZWR1Y2VyTWFwLFxuICBvbWl0LFxufSBmcm9tICcuL3V0aWxpdHkvbmdyeC11dGlscyc7XG5cbmV4cG9ydCB7IGdldFByb2plY3RQYXRoLCBnZXRQcm9qZWN0LCBpc0xpYiB9IGZyb20gJy4vdXRpbGl0eS9wcm9qZWN0JztcblxuZXhwb3J0IGNvbnN0IHN0cmluZ1V0aWxzID0ge1xuICBkYXNoZXJpemUsXG4gIGRlY2FtZWxpemUsXG4gIGNhbWVsaXplLFxuICBjbGFzc2lmeSxcbiAgdW5kZXJzY29yZSxcbiAgZ3JvdXAsXG4gIGNhcGl0YWxpemUsXG4gIGZlYXR1cmVQYXRoLFxuICBwbHVyYWxpemUsXG59O1xuXG5leHBvcnQgeyB1cGRhdGVQYWNrYWdlIH0gZnJvbSAnLi91dGlsaXR5L3VwZGF0ZSc7XG5cbmV4cG9ydCB7IHBhcnNlTmFtZSB9IGZyb20gJy4vdXRpbGl0eS9wYXJzZS1uYW1lJztcblxuZXhwb3J0IHsgYWRkUGFja2FnZVRvUGFja2FnZUpzb24gfSBmcm9tICcuL3V0aWxpdHkvcGFja2FnZSc7XG5cbmV4cG9ydCB7IHBsYXRmb3JtVmVyc2lvbiB9IGZyb20gJy4vdXRpbGl0eS9saWJzLXZlcnNpb24nO1xuXG5leHBvcnQgeyB2aXNpdFRTU291cmNlRmlsZXMsIHZpc2l0TmdNb2R1bGVJbXBvcnRzIH0gZnJvbSAnLi91dGlsaXR5L3Zpc2l0b3JzJztcbiJdfQ==