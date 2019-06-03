(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core/utility/visit-utils", ["require", "exports", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    function visitTSSourceFiles(tree, visitor) {
        let result = undefined;
        tree.visit(path => {
            if (!path.endsWith('.ts')) {
                return;
            }
            const sourceFile = ts.createSourceFile(path, tree.read(path).toString(), ts.ScriptTarget.Latest);
            if (sourceFile.isDeclarationFile) {
                return;
            }
            result = visitor(sourceFile, tree, result);
        });
        return result;
    }
    exports.visitTSSourceFiles = visitTSSourceFiles;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXQtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NjaGVtYXRpY3MtY29yZS91dGlsaXR5L3Zpc2l0LXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsaUNBQWlDO0lBR2pDLFNBQWdCLGtCQUFrQixDQUNoQyxJQUFVLEVBQ1YsT0FJdUI7UUFFdkIsSUFBSSxNQUFNLEdBQXVCLFNBQVMsQ0FBQztRQUUzQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN6QixPQUFPO2FBQ1I7WUFFRCxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQ3BDLElBQUksRUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRSxDQUFDLFFBQVEsRUFBRSxFQUMzQixFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FDdkIsQ0FBQztZQUVGLElBQUksVUFBVSxDQUFDLGlCQUFpQixFQUFFO2dCQUNoQyxPQUFPO2FBQ1I7WUFFRCxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBN0JELGdEQTZCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHsgVHJlZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHZpc2l0VFNTb3VyY2VGaWxlczxSZXN1bHQgPSB2b2lkPihcbiAgdHJlZTogVHJlZSxcbiAgdmlzaXRvcjogKFxuICAgIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gICAgdHJlZTogVHJlZSxcbiAgICByZXN1bHQ/OiBSZXN1bHRcbiAgKSA9PiBSZXN1bHQgfCB1bmRlZmluZWRcbik6IFJlc3VsdCB8IHVuZGVmaW5lZCB7XG4gIGxldCByZXN1bHQ6IFJlc3VsdCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICB0cmVlLnZpc2l0KHBhdGggPT4ge1xuICAgIGlmICghcGF0aC5lbmRzV2l0aCgnLnRzJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2VGaWxlID0gdHMuY3JlYXRlU291cmNlRmlsZShcbiAgICAgIHBhdGgsXG4gICAgICB0cmVlLnJlYWQocGF0aCkhLnRvU3RyaW5nKCksXG4gICAgICB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0XG4gICAgKTtcblxuICAgIGlmIChzb3VyY2VGaWxlLmlzRGVjbGFyYXRpb25GaWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmVzdWx0ID0gdmlzaXRvcihzb3VyY2VGaWxlLCB0cmVlLCByZXN1bHQpO1xuICB9KTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuIl19