(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core/utility/angular-utils", ["require", "exports", "@angular-devkit/core", "@ngrx/store/schematics-core/utility/json-utilts"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const core_1 = require("@angular-devkit/core");
    const json_utilts_1 = require("@ngrx/store/schematics-core/utility/json-utilts");
    // https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/migrations/update-9/utils.ts
    function isIvyEnabled(tree, tsConfigPath) {
        // In version 9, Ivy is turned on by default
        // Ivy is opted out only when 'enableIvy' is set to false.
        const buffer = tree.read(tsConfigPath);
        if (!buffer) {
            return true;
        }
        const tsCfgAst = core_1.parseJsonAst(buffer.toString(), core_1.JsonParseMode.Loose);
        if (tsCfgAst.kind !== 'object') {
            return true;
        }
        const ngCompilerOptions = json_utilts_1.findPropertyInAstObject(tsCfgAst, 'angularCompilerOptions');
        if (ngCompilerOptions && ngCompilerOptions.kind === 'object') {
            const enableIvy = json_utilts_1.findPropertyInAstObject(ngCompilerOptions, 'enableIvy');
            if (enableIvy) {
                return !!enableIvy.value;
            }
        }
        const configExtends = json_utilts_1.findPropertyInAstObject(tsCfgAst, 'extends');
        if (configExtends && configExtends.kind === 'string') {
            const extendedTsConfigPath = core_1.resolve(core_1.dirname(core_1.normalize(tsConfigPath)), core_1.normalize(configExtends.value));
            return isIvyEnabled(tree, extendedTsConfigPath);
        }
        return true;
    }
    exports.isIvyEnabled = isIvyEnabled;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvYW5ndWxhci11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLCtDQU04QjtJQUU5QixpRkFBd0Q7SUFFeEQsOEdBQThHO0lBQzlHLFNBQWdCLFlBQVksQ0FBQyxJQUFVLEVBQUUsWUFBb0I7UUFDM0QsNENBQTRDO1FBQzVDLDBEQUEwRDtRQUUxRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsTUFBTSxRQUFRLEdBQUcsbUJBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsb0JBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV0RSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxNQUFNLGlCQUFpQixHQUFHLHFDQUF1QixDQUMvQyxRQUFRLEVBQ1Isd0JBQXdCLENBQ3pCLENBQUM7UUFDRixJQUFJLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDNUQsTUFBTSxTQUFTLEdBQUcscUNBQXVCLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFFMUUsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQzthQUMxQjtTQUNGO1FBRUQsTUFBTSxhQUFhLEdBQUcscUNBQXVCLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25FLElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ3BELE1BQU0sb0JBQW9CLEdBQUcsY0FBTyxDQUNsQyxjQUFPLENBQUMsZ0JBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUNoQyxnQkFBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FDL0IsQ0FBQztZQUVGLE9BQU8sWUFBWSxDQUFDLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBdENELG9DQXNDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEpzb25QYXJzZU1vZGUsXG4gIGRpcm5hbWUsXG4gIG5vcm1hbGl6ZSxcbiAgcGFyc2VKc29uQXN0LFxuICByZXNvbHZlLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBUcmVlIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHsgZmluZFByb3BlcnR5SW5Bc3RPYmplY3QgfSBmcm9tICcuL2pzb24tdXRpbHRzJztcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci1jbGkvYmxvYi9tYXN0ZXIvcGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL21pZ3JhdGlvbnMvdXBkYXRlLTkvdXRpbHMudHNcbmV4cG9ydCBmdW5jdGlvbiBpc0l2eUVuYWJsZWQodHJlZTogVHJlZSwgdHNDb25maWdQYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgLy8gSW4gdmVyc2lvbiA5LCBJdnkgaXMgdHVybmVkIG9uIGJ5IGRlZmF1bHRcbiAgLy8gSXZ5IGlzIG9wdGVkIG91dCBvbmx5IHdoZW4gJ2VuYWJsZUl2eScgaXMgc2V0IHRvIGZhbHNlLlxuXG4gIGNvbnN0IGJ1ZmZlciA9IHRyZWUucmVhZCh0c0NvbmZpZ1BhdGgpO1xuICBpZiAoIWJ1ZmZlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3QgdHNDZmdBc3QgPSBwYXJzZUpzb25Bc3QoYnVmZmVyLnRvU3RyaW5nKCksIEpzb25QYXJzZU1vZGUuTG9vc2UpO1xuXG4gIGlmICh0c0NmZ0FzdC5raW5kICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3QgbmdDb21waWxlck9wdGlvbnMgPSBmaW5kUHJvcGVydHlJbkFzdE9iamVjdChcbiAgICB0c0NmZ0FzdCxcbiAgICAnYW5ndWxhckNvbXBpbGVyT3B0aW9ucydcbiAgKTtcbiAgaWYgKG5nQ29tcGlsZXJPcHRpb25zICYmIG5nQ29tcGlsZXJPcHRpb25zLmtpbmQgPT09ICdvYmplY3QnKSB7XG4gICAgY29uc3QgZW5hYmxlSXZ5ID0gZmluZFByb3BlcnR5SW5Bc3RPYmplY3QobmdDb21waWxlck9wdGlvbnMsICdlbmFibGVJdnknKTtcblxuICAgIGlmIChlbmFibGVJdnkpIHtcbiAgICAgIHJldHVybiAhIWVuYWJsZUl2eS52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjb25maWdFeHRlbmRzID0gZmluZFByb3BlcnR5SW5Bc3RPYmplY3QodHNDZmdBc3QsICdleHRlbmRzJyk7XG4gIGlmIChjb25maWdFeHRlbmRzICYmIGNvbmZpZ0V4dGVuZHMua2luZCA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBleHRlbmRlZFRzQ29uZmlnUGF0aCA9IHJlc29sdmUoXG4gICAgICBkaXJuYW1lKG5vcm1hbGl6ZSh0c0NvbmZpZ1BhdGgpKSxcbiAgICAgIG5vcm1hbGl6ZShjb25maWdFeHRlbmRzLnZhbHVlKVxuICAgICk7XG5cbiAgICByZXR1cm4gaXNJdnlFbmFibGVkKHRyZWUsIGV4dGVuZGVkVHNDb25maWdQYXRoKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuIl19