(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core/utility/ngrx-utils", ["require", "exports", "typescript", "@ngrx/store/schematics-core/utility/strings", "@ngrx/store/schematics-core/utility/change", "@angular-devkit/schematics", "@angular-devkit/core", "@ngrx/store/schematics-core/utility/find-module", "@ngrx/store/schematics-core/utility/ast-utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    const stringUtils = require("@ngrx/store/schematics-core/utility/strings");
    const change_1 = require("@ngrx/store/schematics-core/utility/change");
    const schematics_1 = require("@angular-devkit/schematics");
    const core_1 = require("@angular-devkit/core");
    const find_module_1 = require("@ngrx/store/schematics-core/utility/find-module");
    const ast_utils_1 = require("@ngrx/store/schematics-core/utility/ast-utils");
    function addReducerToState(options) {
        return (host) => {
            if (!options.reducers) {
                return host;
            }
            const reducersPath = core_1.normalize(`/${options.path}/${options.reducers}`);
            if (!host.exists(reducersPath)) {
                throw new Error(`Specified reducers path ${reducersPath} does not exist`);
            }
            const text = host.read(reducersPath);
            if (text === null) {
                throw new schematics_1.SchematicsException(`File ${reducersPath} does not exist.`);
            }
            const sourceText = text.toString('utf-8');
            const source = ts.createSourceFile(reducersPath, sourceText, ts.ScriptTarget.Latest, true);
            const reducerPath = `/${options.path}/` +
                (options.flat ? '' : stringUtils.dasherize(options.name) + '/') +
                (options.group ? 'reducers/' : '') +
                stringUtils.dasherize(options.name) +
                '.reducer';
            const relativePath = find_module_1.buildRelativePath(reducersPath, reducerPath);
            const reducerImport = ast_utils_1.insertImport(source, reducersPath, `* as from${stringUtils.classify(options.name)}`, relativePath, true);
            const stateInterfaceInsert = addReducerToStateInterface(source, reducersPath, options);
            const reducerMapInsert = addReducerToActionReducerMap(source, reducersPath, options);
            const changes = [reducerImport, stateInterfaceInsert, reducerMapInsert];
            const recorder = host.beginUpdate(reducersPath);
            for (const change of changes) {
                if (change instanceof change_1.InsertChange) {
                    recorder.insertLeft(change.pos, change.toAdd);
                }
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
        const stateInterface = source.statements.find(stm => stm.kind === ts.SyntaxKind.InterfaceDeclaration);
        let node = stateInterface;
        if (!node) {
            return new change_1.NoopChange();
        }
        const state = options.plural
            ? stringUtils.pluralize(options.name)
            : stringUtils.camelize(options.name);
        const keyInsert = `[from${stringUtils.classify(options.name)}.${stringUtils.camelize(state)}FeatureKey]: from${stringUtils.classify(options.name)}.State;`;
        const expr = node;
        let position;
        let toInsert;
        if (expr.members.length === 0) {
            position = expr.getEnd() - 1;
            toInsert = `  ${keyInsert}\n`;
        }
        else {
            node = expr.members[expr.members.length - 1];
            position = node.getEnd() + 1;
            // Get the indentation of the last element, if any.
            const text = node.getFullText(source);
            const matches = text.match(/^\r?\n+(\s*)/);
            if (matches.length > 0) {
                toInsert = `${matches[1]}${keyInsert}\n`;
            }
            else {
                toInsert = `\n${keyInsert}`;
            }
        }
        return new change_1.InsertChange(reducersPath, position, toInsert);
    }
    exports.addReducerToStateInterface = addReducerToStateInterface;
    /**
     * Insert the reducer into the ActionReducerMap
     */
    function addReducerToActionReducerMap(source, reducersPath, options) {
        let initializer;
        const actionReducerMap = source.statements
            .filter(stm => stm.kind === ts.SyntaxKind.VariableStatement)
            .filter((stm) => !!stm.declarationList)
            .map((stm) => {
            const { declarations, } = stm.declarationList;
            const variable = declarations.find((decl) => decl.kind === ts.SyntaxKind.VariableDeclaration);
            const type = variable ? variable.type : {};
            return { initializer: variable.initializer, type };
        })
            .filter(initWithType => initWithType.type !== undefined)
            .find(({ type }) => type.typeName.text === 'ActionReducerMap');
        if (!actionReducerMap || !actionReducerMap.initializer) {
            return new change_1.NoopChange();
        }
        let node = actionReducerMap.initializer;
        const state = options.plural
            ? stringUtils.pluralize(options.name)
            : stringUtils.camelize(options.name);
        const keyInsert = `[from${stringUtils.classify(options.name)}.${stringUtils.camelize(state)}FeatureKey]: from${stringUtils.classify(options.name)}.reducer,`;
        const expr = node;
        let position;
        let toInsert;
        if (expr.properties.length === 0) {
            position = expr.getEnd() - 1;
            toInsert = `  ${keyInsert}\n`;
        }
        else {
            node = expr.properties[expr.properties.length - 1];
            position = node.getEnd() + 1;
            // Get the indentation of the last element, if any.
            const text = node.getFullText(source);
            const matches = text.match(/^\r?\n+(\s*)/);
            if (matches.length > 0) {
                toInsert = `\n${matches[1]}${keyInsert}`;
            }
            else {
                toInsert = `\n${keyInsert}`;
            }
        }
        return new change_1.InsertChange(reducersPath, position, toInsert);
    }
    exports.addReducerToActionReducerMap = addReducerToActionReducerMap;
    /**
     * Add reducer feature to NgModule
     */
    function addReducerImportToNgModule(options) {
        return (host) => {
            if (!options.module) {
                return host;
            }
            const modulePath = options.module;
            if (!host.exists(options.module)) {
                throw new Error(`Specified module path ${modulePath} does not exist`);
            }
            const text = host.read(modulePath);
            if (text === null) {
                throw new schematics_1.SchematicsException(`File ${modulePath} does not exist.`);
            }
            const sourceText = text.toString('utf-8');
            const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
            const commonImports = [
                ast_utils_1.insertImport(source, modulePath, 'StoreModule', '@ngrx/store'),
            ];
            const reducerPath = `/${options.path}/` +
                (options.flat ? '' : stringUtils.dasherize(options.name) + '/') +
                (options.group ? 'reducers/' : '') +
                stringUtils.dasherize(options.name) +
                '.reducer';
            const relativePath = find_module_1.buildRelativePath(modulePath, reducerPath);
            const reducerImport = ast_utils_1.insertImport(source, modulePath, `* as from${stringUtils.classify(options.name)}`, relativePath, true);
            const state = options.plural
                ? stringUtils.pluralize(options.name)
                : stringUtils.camelize(options.name);
            const [storeNgModuleImport] = ast_utils_1.addImportToModule(source, modulePath, `StoreModule.forFeature(from${stringUtils.classify(options.name)}.${state}FeatureKey, from${stringUtils.classify(options.name)}.reducer)`, relativePath);
            const changes = [...commonImports, reducerImport, storeNgModuleImport];
            const recorder = host.beginUpdate(modulePath);
            for (const change of changes) {
                if (change instanceof change_1.InsertChange) {
                    recorder.insertLeft(change.pos, change.toAdd);
                }
            }
            host.commitUpdate(recorder);
            return host;
        };
    }
    exports.addReducerImportToNgModule = addReducerImportToNgModule;
    function omit(object, keyToRemove) {
        return Object.keys(object)
            .filter(key => key !== keyToRemove)
            .reduce((result, key) => Object.assign(result, { [key]: object[key] }), {});
    }
    exports.omit = omit;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyeC11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvbmdyeC11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLGlDQUFpQztJQUNqQywyRUFBeUM7SUFDekMsdUVBQTREO0lBQzVELDJEQUE2RTtJQUM3RSwrQ0FBaUQ7SUFDakQsaUZBQWtEO0lBQ2xELDZFQUE4RDtJQUU5RCxTQUFnQixpQkFBaUIsQ0FBQyxPQUFZO1FBQzVDLE9BQU8sQ0FBQyxJQUFVLEVBQUUsRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtnQkFDckIsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELE1BQU0sWUFBWSxHQUFHLGdCQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBRXZFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixZQUFZLGlCQUFpQixDQUFDLENBQUM7YUFDM0U7WUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3JDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDakIsTUFBTSxJQUFJLGdDQUFtQixDQUFDLFFBQVEsWUFBWSxrQkFBa0IsQ0FBQyxDQUFDO2FBQ3ZFO1lBRUQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUUxQyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQ2hDLFlBQVksRUFDWixVQUFVLEVBQ1YsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQ3RCLElBQUksQ0FDTCxDQUFDO1lB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YUFDdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLFdBQVcsQ0FBQzthQUNsQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBUEQsb0JBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCAqIGFzIHN0cmluZ1V0aWxzIGZyb20gJy4vc3RyaW5ncyc7XG5pbXBvcnQgeyBJbnNlcnRDaGFuZ2UsIENoYW5nZSwgTm9vcENoYW5nZSB9IGZyb20gJy4vY2hhbmdlJztcbmltcG9ydCB7IFRyZWUsIFNjaGVtYXRpY3NFeGNlcHRpb24sIFJ1bGUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgeyBub3JtYWxpemUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBidWlsZFJlbGF0aXZlUGF0aCB9IGZyb20gJy4vZmluZC1tb2R1bGUnO1xuaW1wb3J0IHsgYWRkSW1wb3J0VG9Nb2R1bGUsIGluc2VydEltcG9ydCB9IGZyb20gJy4vYXN0LXV0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFJlZHVjZXJUb1N0YXRlKG9wdGlvbnM6IGFueSk6IFJ1bGUge1xuICByZXR1cm4gKGhvc3Q6IFRyZWUpID0+IHtcbiAgICBpZiAoIW9wdGlvbnMucmVkdWNlcnMpIHtcbiAgICAgIHJldHVybiBob3N0O1xuICAgIH1cblxuICAgIGNvbnN0IHJlZHVjZXJzUGF0aCA9IG5vcm1hbGl6ZShgLyR7b3B0aW9ucy5wYXRofS8ke29wdGlvbnMucmVkdWNlcnN9YCk7XG5cbiAgICBpZiAoIWhvc3QuZXhpc3RzKHJlZHVjZXJzUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgU3BlY2lmaWVkIHJlZHVjZXJzIHBhdGggJHtyZWR1Y2Vyc1BhdGh9IGRvZXMgbm90IGV4aXN0YCk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dCA9IGhvc3QucmVhZChyZWR1Y2Vyc1BhdGgpO1xuICAgIGlmICh0ZXh0ID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbihgRmlsZSAke3JlZHVjZXJzUGF0aH0gZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc291cmNlVGV4dCA9IHRleHQudG9TdHJpbmcoJ3V0Zi04Jyk7XG5cbiAgICBjb25zdCBzb3VyY2UgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKFxuICAgICAgcmVkdWNlcnNQYXRoLFxuICAgICAgc291cmNlVGV4dCxcbiAgICAgIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIGNvbnN0IHJlZHVjZXJQYXRoID1cbiAgICAgIGAvJHtvcHRpb25zLnBhdGh9L2AgK1xuICAgICAgKG9wdGlvbnMuZmxhdCA/ICcnIDogc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkgKyAnLycpICtcbiAgICAgIChvcHRpb25zLmdyb3VwID8gJ3JlZHVjZXJzLycgOiAnJykgK1xuICAgICAgc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkgK1xuICAgICAgJy5yZWR1Y2VyJztcblxuICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IGJ1aWxkUmVsYXRpdmVQYXRoKHJlZHVjZXJzUGF0aCwgcmVkdWNlclBhdGgpO1xuICAgIGNvbnN0IHJlZHVjZXJJbXBvcnQgPSBpbnNlcnRJbXBvcnQoXG4gICAgICBzb3VyY2UsXG4gICAgICByZWR1Y2Vyc1BhdGgsXG4gICAgICBgKiBhcyBmcm9tJHtzdHJpbmdVdGlscy5jbGFzc2lmeShvcHRpb25zLm5hbWUpfWAsXG4gICAgICByZWxhdGl2ZVBhdGgsXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIGNvbnN0IHN0YXRlSW50ZXJmYWNlSW5zZXJ0ID0gYWRkUmVkdWNlclRvU3RhdGVJbnRlcmZhY2UoXG4gICAgICBzb3VyY2UsXG4gICAgICByZWR1Y2Vyc1BhdGgsXG4gICAgICBvcHRpb25zXG4gICAgKTtcbiAgICBjb25zdCByZWR1Y2VyTWFwSW5zZXJ0ID0gYWRkUmVkdWNlclRvQWN0aW9uUmVkdWNlck1hcChcbiAgICAgIHNvdXJjZSxcbiAgICAgIHJlZHVjZXJzUGF0aCxcbiAgICAgIG9wdGlvbnNcbiAgICApO1xuXG4gICAgY29uc3QgY2hhbmdlcyA9IFtyZWR1Y2VySW1wb3J0LCBzdGF0ZUludGVyZmFjZUluc2VydCwgcmVkdWNlck1hcEluc2VydF07XG4gICAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKHJlZHVjZXJzUGF0aCk7XG4gICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgY2hhbmdlcykge1xuICAgICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydENoYW5nZSkge1xuICAgICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5wb3MsIGNoYW5nZS50b0FkZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGhvc3QuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcblxuICAgIHJldHVybiBob3N0O1xuICB9O1xufVxuXG4vKipcbiAqIEluc2VydCB0aGUgcmVkdWNlciBpbnRvIHRoZSBmaXJzdCBkZWZpbmVkIHRvcCBsZXZlbCBpbnRlcmZhY2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFJlZHVjZXJUb1N0YXRlSW50ZXJmYWNlKFxuICBzb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIHJlZHVjZXJzUGF0aDogc3RyaW5nLFxuICBvcHRpb25zOiB7IG5hbWU6IHN0cmluZzsgcGx1cmFsOiBib29sZWFuIH1cbik6IENoYW5nZSB7XG4gIGNvbnN0IHN0YXRlSW50ZXJmYWNlID0gc291cmNlLnN0YXRlbWVudHMuZmluZChcbiAgICBzdG0gPT4gc3RtLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuSW50ZXJmYWNlRGVjbGFyYXRpb25cbiAgKTtcbiAgbGV0IG5vZGUgPSBzdGF0ZUludGVyZmFjZSBhcyB0cy5TdGF0ZW1lbnQ7XG5cbiAgaWYgKCFub2RlKSB7XG4gICAgcmV0dXJuIG5ldyBOb29wQ2hhbmdlKCk7XG4gIH1cblxuICBjb25zdCBzdGF0ZSA9IG9wdGlvbnMucGx1cmFsXG4gICAgPyBzdHJpbmdVdGlscy5wbHVyYWxpemUob3B0aW9ucy5uYW1lKVxuICAgIDogc3RyaW5nVXRpbHMuY2FtZWxpemUob3B0aW9ucy5uYW1lKTtcblxuICBjb25zdCBrZXlJbnNlcnQgPSBgW2Zyb20ke3N0cmluZ1V0aWxzLmNsYXNzaWZ5KFxuICAgIG9wdGlvbnMubmFtZVxuICApfS4ke3N0cmluZ1V0aWxzLmNhbWVsaXplKHN0YXRlKX1GZWF0dXJlS2V5XTogZnJvbSR7c3RyaW5nVXRpbHMuY2xhc3NpZnkoXG4gICAgb3B0aW9ucy5uYW1lXG4gICl9LlN0YXRlO2A7XG4gIGNvbnN0IGV4cHIgPSBub2RlIGFzIGFueTtcbiAgbGV0IHBvc2l0aW9uO1xuICBsZXQgdG9JbnNlcnQ7XG5cbiAgaWYgKGV4cHIubWVtYmVycy5sZW5ndGggPT09IDApIHtcbiAgICBwb3NpdGlvbiA9IGV4cHIuZ2V0RW5kKCkgLSAxO1xuICAgIHRvSW5zZXJ0ID0gYCAgJHtrZXlJbnNlcnR9XFxuYDtcbiAgfSBlbHNlIHtcbiAgICBub2RlID0gZXhwci5tZW1iZXJzW2V4cHIubWVtYmVycy5sZW5ndGggLSAxXTtcbiAgICBwb3NpdGlvbiA9IG5vZGUuZ2V0RW5kKCkgKyAxO1xuICAgIC8vIEdldCB0aGUgaW5kZW50YXRpb24gb2YgdGhlIGxhc3QgZWxlbWVudCwgaWYgYW55LlxuICAgIGNvbnN0IHRleHQgPSBub2RlLmdldEZ1bGxUZXh0KHNvdXJjZSk7XG4gICAgY29uc3QgbWF0Y2hlcyA9IHRleHQubWF0Y2goL15cXHI/XFxuKyhcXHMqKS8pO1xuXG4gICAgaWYgKG1hdGNoZXMhLmxlbmd0aCA+IDApIHtcbiAgICAgIHRvSW5zZXJ0ID0gYCR7bWF0Y2hlcyFbMV19JHtrZXlJbnNlcnR9XFxuYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9JbnNlcnQgPSBgXFxuJHtrZXlJbnNlcnR9YDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IEluc2VydENoYW5nZShyZWR1Y2Vyc1BhdGgsIHBvc2l0aW9uLCB0b0luc2VydCk7XG59XG5cbi8qKlxuICogSW5zZXJ0IHRoZSByZWR1Y2VyIGludG8gdGhlIEFjdGlvblJlZHVjZXJNYXBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFJlZHVjZXJUb0FjdGlvblJlZHVjZXJNYXAoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgcmVkdWNlcnNQYXRoOiBzdHJpbmcsXG4gIG9wdGlvbnM6IHsgbmFtZTogc3RyaW5nOyBwbHVyYWw6IGJvb2xlYW4gfVxuKTogQ2hhbmdlIHtcbiAgbGV0IGluaXRpYWxpemVyOiBhbnk7XG4gIGNvbnN0IGFjdGlvblJlZHVjZXJNYXA6IGFueSA9IHNvdXJjZS5zdGF0ZW1lbnRzXG4gICAgLmZpbHRlcihzdG0gPT4gc3RtLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuVmFyaWFibGVTdGF0ZW1lbnQpXG4gICAgLmZpbHRlcigoc3RtOiBhbnkpID0+ICEhc3RtLmRlY2xhcmF0aW9uTGlzdClcbiAgICAubWFwKChzdG06IGFueSkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBkZWNsYXJhdGlvbnMsXG4gICAgICB9OiB7XG4gICAgICAgIGRlY2xhcmF0aW9uczogdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uTGlzdFtdO1xuICAgICAgfSA9IHN0bS5kZWNsYXJhdGlvbkxpc3Q7XG4gICAgICBjb25zdCB2YXJpYWJsZTogYW55ID0gZGVjbGFyYXRpb25zLmZpbmQoXG4gICAgICAgIChkZWNsOiBhbnkpID0+IGRlY2wua2luZCA9PT0gdHMuU3ludGF4S2luZC5WYXJpYWJsZURlY2xhcmF0aW9uXG4gICAgICApO1xuICAgICAgY29uc3QgdHlwZSA9IHZhcmlhYmxlID8gdmFyaWFibGUudHlwZSA6IHt9O1xuXG4gICAgICByZXR1cm4geyBpbml0aWFsaXplcjogdmFyaWFibGUuaW5pdGlhbGl6ZXIsIHR5cGUgfTtcbiAgICB9KVxuICAgIC5maWx0ZXIoaW5pdFdpdGhUeXBlID0+IGluaXRXaXRoVHlwZS50eXBlICE9PSB1bmRlZmluZWQpXG4gICAgLmZpbmQoKHsgdHlwZSB9KSA9PiB0eXBlLnR5cGVOYW1lLnRleHQgPT09ICdBY3Rpb25SZWR1Y2VyTWFwJyk7XG5cbiAgaWYgKCFhY3Rpb25SZWR1Y2VyTWFwIHx8ICFhY3Rpb25SZWR1Y2VyTWFwLmluaXRpYWxpemVyKSB7XG4gICAgcmV0dXJuIG5ldyBOb29wQ2hhbmdlKCk7XG4gIH1cblxuICBsZXQgbm9kZSA9IGFjdGlvblJlZHVjZXJNYXAuaW5pdGlhbGl6ZXI7XG5cbiAgY29uc3Qgc3RhdGUgPSBvcHRpb25zLnBsdXJhbFxuICAgID8gc3RyaW5nVXRpbHMucGx1cmFsaXplKG9wdGlvbnMubmFtZSlcbiAgICA6IHN0cmluZ1V0aWxzLmNhbWVsaXplKG9wdGlvbnMubmFtZSk7XG5cbiAgY29uc3Qga2V5SW5zZXJ0ID0gYFtmcm9tJHtzdHJpbmdVdGlscy5jbGFzc2lmeShcbiAgICBvcHRpb25zLm5hbWVcbiAgKX0uJHtzdHJpbmdVdGlscy5jYW1lbGl6ZShzdGF0ZSl9RmVhdHVyZUtleV06IGZyb20ke3N0cmluZ1V0aWxzLmNsYXNzaWZ5KFxuICAgIG9wdGlvbnMubmFtZVxuICApfS5yZWR1Y2VyLGA7XG4gIGNvbnN0IGV4cHIgPSBub2RlIGFzIGFueTtcbiAgbGV0IHBvc2l0aW9uO1xuICBsZXQgdG9JbnNlcnQ7XG5cbiAgaWYgKGV4cHIucHJvcGVydGllcy5sZW5ndGggPT09IDApIHtcbiAgICBwb3NpdGlvbiA9IGV4cHIuZ2V0RW5kKCkgLSAxO1xuICAgIHRvSW5zZXJ0ID0gYCAgJHtrZXlJbnNlcnR9XFxuYDtcbiAgfSBlbHNlIHtcbiAgICBub2RlID0gZXhwci5wcm9wZXJ0aWVzW2V4cHIucHJvcGVydGllcy5sZW5ndGggLSAxXTtcbiAgICBwb3NpdGlvbiA9IG5vZGUuZ2V0RW5kKCkgKyAxO1xuICAgIC8vIEdldCB0aGUgaW5kZW50YXRpb24gb2YgdGhlIGxhc3QgZWxlbWVudCwgaWYgYW55LlxuICAgIGNvbnN0IHRleHQgPSBub2RlLmdldEZ1bGxUZXh0KHNvdXJjZSk7XG4gICAgY29uc3QgbWF0Y2hlcyA9IHRleHQubWF0Y2goL15cXHI/XFxuKyhcXHMqKS8pO1xuXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgdG9JbnNlcnQgPSBgXFxuJHttYXRjaGVzIVsxXX0ke2tleUluc2VydH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b0luc2VydCA9IGBcXG4ke2tleUluc2VydH1gO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgSW5zZXJ0Q2hhbmdlKHJlZHVjZXJzUGF0aCwgcG9zaXRpb24sIHRvSW5zZXJ0KTtcbn1cblxuLyoqXG4gKiBBZGQgcmVkdWNlciBmZWF0dXJlIHRvIE5nTW9kdWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRSZWR1Y2VySW1wb3J0VG9OZ01vZHVsZShvcHRpb25zOiBhbnkpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlKSA9PiB7XG4gICAgaWYgKCFvcHRpb25zLm1vZHVsZSkge1xuICAgICAgcmV0dXJuIGhvc3Q7XG4gICAgfVxuXG4gICAgY29uc3QgbW9kdWxlUGF0aCA9IG9wdGlvbnMubW9kdWxlO1xuICAgIGlmICghaG9zdC5leGlzdHMob3B0aW9ucy5tb2R1bGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFNwZWNpZmllZCBtb2R1bGUgcGF0aCAke21vZHVsZVBhdGh9IGRvZXMgbm90IGV4aXN0YCk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dCA9IGhvc3QucmVhZChtb2R1bGVQYXRoKTtcbiAgICBpZiAodGV4dCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oYEZpbGUgJHttb2R1bGVQYXRofSBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICB9XG4gICAgY29uc3Qgc291cmNlVGV4dCA9IHRleHQudG9TdHJpbmcoJ3V0Zi04Jyk7XG5cbiAgICBjb25zdCBzb3VyY2UgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKFxuICAgICAgbW9kdWxlUGF0aCxcbiAgICAgIHNvdXJjZVRleHQsXG4gICAgICB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICBjb25zdCBjb21tb25JbXBvcnRzID0gW1xuICAgICAgaW5zZXJ0SW1wb3J0KHNvdXJjZSwgbW9kdWxlUGF0aCwgJ1N0b3JlTW9kdWxlJywgJ0BuZ3J4L3N0b3JlJyksXG4gICAgXTtcblxuICAgIGNvbnN0IHJlZHVjZXJQYXRoID1cbiAgICAgIGAvJHtvcHRpb25zLnBhdGh9L2AgK1xuICAgICAgKG9wdGlvbnMuZmxhdCA/ICcnIDogc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkgKyAnLycpICtcbiAgICAgIChvcHRpb25zLmdyb3VwID8gJ3JlZHVjZXJzLycgOiAnJykgK1xuICAgICAgc3RyaW5nVXRpbHMuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkgK1xuICAgICAgJy5yZWR1Y2VyJztcbiAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBidWlsZFJlbGF0aXZlUGF0aChtb2R1bGVQYXRoLCByZWR1Y2VyUGF0aCk7XG4gICAgY29uc3QgcmVkdWNlckltcG9ydCA9IGluc2VydEltcG9ydChcbiAgICAgIHNvdXJjZSxcbiAgICAgIG1vZHVsZVBhdGgsXG4gICAgICBgKiBhcyBmcm9tJHtzdHJpbmdVdGlscy5jbGFzc2lmeShvcHRpb25zLm5hbWUpfWAsXG4gICAgICByZWxhdGl2ZVBhdGgsXG4gICAgICB0cnVlXG4gICAgKTtcbiAgICBjb25zdCBzdGF0ZSA9IG9wdGlvbnMucGx1cmFsXG4gICAgICA/IHN0cmluZ1V0aWxzLnBsdXJhbGl6ZShvcHRpb25zLm5hbWUpXG4gICAgICA6IHN0cmluZ1V0aWxzLmNhbWVsaXplKG9wdGlvbnMubmFtZSk7XG4gICAgY29uc3QgW3N0b3JlTmdNb2R1bGVJbXBvcnRdID0gYWRkSW1wb3J0VG9Nb2R1bGUoXG4gICAgICBzb3VyY2UsXG4gICAgICBtb2R1bGVQYXRoLFxuICAgICAgYFN0b3JlTW9kdWxlLmZvckZlYXR1cmUoZnJvbSR7c3RyaW5nVXRpbHMuY2xhc3NpZnkoXG4gICAgICAgIG9wdGlvbnMubmFtZVxuICAgICAgKX0uJHtzdGF0ZX1GZWF0dXJlS2V5LCBmcm9tJHtzdHJpbmdVdGlscy5jbGFzc2lmeShcbiAgICAgICAgb3B0aW9ucy5uYW1lXG4gICAgICApfS5yZWR1Y2VyKWAsXG4gICAgICByZWxhdGl2ZVBhdGhcbiAgICApO1xuICAgIGNvbnN0IGNoYW5nZXMgPSBbLi4uY29tbW9uSW1wb3J0cywgcmVkdWNlckltcG9ydCwgc3RvcmVOZ01vZHVsZUltcG9ydF07XG4gICAgY29uc3QgcmVjb3JkZXIgPSBob3N0LmJlZ2luVXBkYXRlKG1vZHVsZVBhdGgpO1xuICAgIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbiAgICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRDaGFuZ2UpIHtcbiAgICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UudG9BZGQpO1xuICAgICAgfVxuICAgIH1cbiAgICBob3N0LmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG5cbiAgICByZXR1cm4gaG9zdDtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9taXQ8VCBleHRlbmRzIHsgW2tleTogc3RyaW5nXTogYW55IH0+KFxuICBvYmplY3Q6IFQsXG4gIGtleVRvUmVtb3ZlOiBrZXlvZiBUXG4pOiBQYXJ0aWFsPFQ+IHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iamVjdClcbiAgICAuZmlsdGVyKGtleSA9PiBrZXkgIT09IGtleVRvUmVtb3ZlKVxuICAgIC5yZWR1Y2UoKHJlc3VsdCwga2V5KSA9PiBPYmplY3QuYXNzaWduKHJlc3VsdCwgeyBba2V5XTogb2JqZWN0W2tleV0gfSksIHt9KTtcbn1cbiJdfQ==