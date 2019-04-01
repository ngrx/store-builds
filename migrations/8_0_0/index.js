(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/migrations/8_0_0/index", ["require", "exports", "typescript", "@angular-devkit/schematics", "@ngrx/store/schematics-core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    const schematics_1 = require("@angular-devkit/schematics");
    const schematics_core_1 = require("@ngrx/store/schematics-core");
    const META_REDUCERS = 'META_REDUCERS';
    function updateMetaReducersToken() {
        return (tree) => {
            tree.visit(path => {
                if (!path.endsWith('.ts')) {
                    return;
                }
                const sourceFile = ts.createSourceFile(path, tree.read(path).toString(), ts.ScriptTarget.Latest);
                if (sourceFile.isDeclarationFile) {
                    return;
                }
                const createChange = (node) => new schematics_core_1.ReplaceChange(path, node.getStart(sourceFile), META_REDUCERS, 'USER_PROVIDED_META_REDUCERS');
                const changes = [];
                changes.push(...findMetaReducersImportStatements(sourceFile, createChange));
                changes.push(...findMetaReducersAssignment(sourceFile, createChange));
                if (changes.length < 1) {
                    return;
                }
                const recorder = createChangeRecorder(tree, path, changes);
                tree.commitUpdate(recorder);
            });
        };
    }
    function default_1() {
        return schematics_1.chain([updateMetaReducersToken()]);
    }
    exports.default = default_1;
    function findMetaReducersImportStatements(sourceFile, createChange) {
        const metaReducerImports = sourceFile.statements
            .filter(ts.isImportDeclaration)
            .filter(isNgRxStoreImport)
            .map(p => p.importClause.namedBindings.elements.filter(isMetaReducersImportSpecifier))
            .reduce((imports, curr) => imports.concat(curr), []);
        const changes = metaReducerImports.map(createChange);
        return changes;
        function isNgRxStoreImport(importDeclaration) {
            return (importDeclaration.moduleSpecifier.getText(sourceFile) === "'@ngrx/store'");
        }
        function isMetaReducersImportSpecifier(importSpecifier) {
            const isImport = () => importSpecifier.name.text === META_REDUCERS;
            const isRenamedImport = () => importSpecifier.propertyName &&
                importSpecifier.propertyName.text === META_REDUCERS;
            return (ts.isImportSpecifier(importSpecifier) && (isImport() || isRenamedImport()));
        }
    }
    function findMetaReducersAssignment(sourceFile, createChange) {
        let changes = [];
        ts.forEachChild(sourceFile, node => findMetaReducers(node, changes));
        return changes;
        function findMetaReducers(node, changes) {
            if (ts.isPropertyAssignment(node) &&
                node.initializer.getText(sourceFile) === META_REDUCERS) {
                changes.push(createChange(node.initializer));
            }
            ts.forEachChild(node, childNode => findMetaReducers(childNode, changes));
        }
    }
    function createChangeRecorder(tree, path, changes) {
        const recorder = tree.beginUpdate(path);
        for (const change of changes) {
            const action = change;
            recorder.remove(action.pos, action.oldText.length);
            recorder.insertLeft(action.pos, action.newText);
        }
        return recorder;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL21pZ3JhdGlvbnMvOF8wXzAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxpQ0FBaUM7SUFDakMsMkRBQStEO0lBRS9ELGlFQUE0RDtJQUU1RCxNQUFNLGFBQWEsR0FBRyxlQUFlLENBQUM7SUFFdEMsU0FBUyx1QkFBdUI7UUFDOUIsT0FBTyxDQUFDLElBQVUsRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN6QixPQUFPO2lCQUNSO2dCQUVELE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FDcEMsSUFBSSxFQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUMsUUFBUSxFQUFFLEVBQzNCLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUN2QixDQUFDO2dCQUVGLElBQUksVUFBVSxDQUFDLGlCQUFpQixFQUFFO29CQUNoQyxPQUFPO2lCQUNSO2dCQUVELE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBYSxFQUFFLEVBQUUsQ0FDckMsSUFBSSwrQkFBYSxDQUNmLElBQUksRUFDSixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUN6QixhQUFhLEVBQ2IsNkJBQTZCLENBQzlCLENBQUM7Z0JBRUosTUFBTSxPQUFPLEdBQW9CLEVBQUUsQ0FBQztnQkFDcEMsT0FBTyxDQUFDLElBQUksQ0FDVixHQUFHLGdDQUFnQyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FDOUQsQ0FBQztnQkFDRixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsMEJBQTBCLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBRXRF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SyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7WUFDNUIsTUFBTSxNQUFNLEdBQVEsTUFBTSxDQUFDO1lBQzNCLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25ELFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakQ7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBSdWxlLCBjaGFpbiwgVHJlZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7IFBhdGggfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBSZXBsYWNlQ2hhbmdlIH0gZnJvbSAnQG5ncngvc3RvcmUvc2NoZW1hdGljcy1jb3JlJztcblxuY29uc3QgTUVUQV9SRURVQ0VSUyA9ICdNRVRBX1JFRFVDRVJTJztcblxuZnVuY3Rpb24gdXBkYXRlTWV0YVJlZHVjZXJzVG9rZW4oKTogUnVsZSB7XG4gIHJldHVybiAodHJlZTogVHJlZSkgPT4ge1xuICAgIHRyZWUudmlzaXQocGF0aCA9PiB7XG4gICAgICBpZiAoIXBhdGguZW5kc1dpdGgoJy50cycpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc291cmNlRmlsZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUoXG4gICAgICAgIHBhdGgsXG4gICAgICAgIHRyZWUucmVhZChwYXRoKSEudG9TdHJpbmcoKSxcbiAgICAgICAgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdFxuICAgICAgKTtcblxuICAgICAgaWYgKHNvdXJjZUZpbGUuaXNEZWNsYXJhdGlvbkZpbGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjcmVhdGVDaGFuZ2UgPSAobm9kZTogdHMuTm9kZSkgPT5cbiAgICAgICAgbmV3IFJlcGxhY2VDaGFuZ2UoXG4gICAgICAgICAgcGF0aCxcbiAgICAgICAgICBub2RlLmdldFN0YXJ0KHNvdXJjZUZpbGUpLFxuICAgICAgICAgIE1FVEFfUkVEVUNFUlMsXG4gICAgICAgICAgJ1VTRVJfUFJPVklERURfTUVUQV9SRURVQ0VSUydcbiAgICAgICAgKTtcblxuICAgICAgY29uc3QgY2hhbmdlczogUmVwbGFjZUNoYW5nZVtdID0gW107XG4gICAgICBjaGFuZ2VzLnB1c2goXG4gICAgICAgIC4uLmZpbmRNZXRhUmVkdWNlcnNJbXBvcnRTdGF0ZW1lbnRzKHNvdXJjZUZpbGUsIGNyZWF0ZUNoYW5nZSlcbiAgICAgICk7XG4gICAgICBjaGFuZ2VzLnB1c2goLi4uZmluZE1ldGFSZWR1Y2Vyc0Fzc2lnbm1lbnQoc291cmNlRmlsZSwgY3JlYXRlQ2hhbmdlKSk7XG5cbiAgICAgIGlmIChjaGFuZ2VzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZWNvcmRlciA9IGNyZWF0ZUNoYW5nZVJlY29yZGVyKHRyZWUsIHBhdGgsIGNoYW5nZXMpO1xuICAgICAgdHJlZS5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpOiBSdWxlIHtcbiAgcmV0dXJuIGNoYWluKFt1cGRhdGVNZXRhUmVkdWNlcnNUb2tlbigpXSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRNZXRhUmVkdWNlcnNJbXBvcnRTdGF0ZW1lbnRzKFxuICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICBjcmVhdGVDaGFuZ2U6IChub2RlOiB0cy5Ob2RlKSA9PiBSZXBsYWNlQ2hhbmdlXG4pIHtcbiAgY29uc3QgbWV0YVJlZHVjZXJJbXBvcnRzID0gc291cmNlRmlsZS5zdGF0ZW1lbnRzXG4gICAgLmZpbHRlcih0cy5pc0ltcG9ydERlY2xhcmF0aW9uKVxuICAgIC5maWx0ZXIoaXNOZ1J4U3RvcmVJbXBvcnQpXG4gICAgLm1hcChwID0+XG4gICAgICAocC5pbXBvcnRDbGF1c2UhLm5hbWVkQmluZGluZ3MhIGFzIHRzLk5hbWVkSW1wb3J0cykuZWxlbWVudHMuZmlsdGVyKFxuICAgICAgICBpc01ldGFSZWR1Y2Vyc0ltcG9ydFNwZWNpZmllclxuICAgICAgKVxuICAgIClcbiAgICAucmVkdWNlKChpbXBvcnRzLCBjdXJyKSA9PiBpbXBvcnRzLmNvbmNhdChjdXJyKSwgW10pO1xuXG4gIGNvbnN0IGNoYW5nZXMgPSBtZXRhUmVkdWNlckltcG9ydHMubWFwKGNyZWF0ZUNoYW5nZSk7XG4gIHJldHVybiBjaGFuZ2VzO1xuXG4gIGZ1bmN0aW9uIGlzTmdSeFN0b3JlSW1wb3J0KGltcG9ydERlY2xhcmF0aW9uOiB0cy5JbXBvcnREZWNsYXJhdGlvbikge1xuICAgIHJldHVybiAoXG4gICAgICBpbXBvcnREZWNsYXJhdGlvbi5tb2R1bGVTcGVjaWZpZXIuZ2V0VGV4dChzb3VyY2VGaWxlKSA9PT0gXCInQG5ncngvc3RvcmUnXCJcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNNZXRhUmVkdWNlcnNJbXBvcnRTcGVjaWZpZXIoaW1wb3J0U3BlY2lmaWVyOiB0cy5JbXBvcnRTcGVjaWZpZXIpIHtcbiAgICBjb25zdCBpc0ltcG9ydCA9ICgpID0+IGltcG9ydFNwZWNpZmllci5uYW1lLnRleHQgPT09IE1FVEFfUkVEVUNFUlM7XG4gICAgY29uc3QgaXNSZW5hbWVkSW1wb3J0ID0gKCkgPT5cbiAgICAgIGltcG9ydFNwZWNpZmllci5wcm9wZXJ0eU5hbWUgJiZcbiAgICAgIGltcG9ydFNwZWNpZmllci5wcm9wZXJ0eU5hbWUudGV4dCA9PT0gTUVUQV9SRURVQ0VSUztcblxuICAgIHJldHVybiAoXG4gICAgICB0cy5pc0ltcG9ydFNwZWNpZmllcihpbXBvcnRTcGVjaWZpZXIpICYmIChpc0ltcG9ydCgpIHx8IGlzUmVuYW1lZEltcG9ydCgpKVxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZE1ldGFSZWR1Y2Vyc0Fzc2lnbm1lbnQoXG4gIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gIGNyZWF0ZUNoYW5nZTogKG5vZGU6IHRzLk5vZGUpID0+IFJlcGxhY2VDaGFuZ2Vcbikge1xuICBsZXQgY2hhbmdlczogUmVwbGFjZUNoYW5nZVtdID0gW107XG4gIHRzLmZvckVhY2hDaGlsZChzb3VyY2VGaWxlLCBub2RlID0+IGZpbmRNZXRhUmVkdWNlcnMobm9kZSwgY2hhbmdlcykpO1xuICByZXR1cm4gY2hhbmdlcztcblxuICBmdW5jdGlvbiBmaW5kTWV0YVJlZHVjZXJzKG5vZGU6IHRzLk5vZGUsIGNoYW5nZXM6IFJlcGxhY2VDaGFuZ2VbXSkge1xuICAgIGlmIChcbiAgICAgIHRzLmlzUHJvcGVydHlBc3NpZ25tZW50KG5vZGUpICYmXG4gICAgICBub2RlLmluaXRpYWxpemVyLmdldFRleHQoc291cmNlRmlsZSkgPT09IE1FVEFfUkVEVUNFUlNcbiAgICApIHtcbiAgICAgIGNoYW5nZXMucHVzaChjcmVhdGVDaGFuZ2Uobm9kZS5pbml0aWFsaXplcikpO1xuICAgIH1cblxuICAgIHRzLmZvckVhY2hDaGlsZChub2RlLCBjaGlsZE5vZGUgPT4gZmluZE1ldGFSZWR1Y2VycyhjaGlsZE5vZGUsIGNoYW5nZXMpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDaGFuZ2VSZWNvcmRlcihcbiAgdHJlZTogVHJlZSxcbiAgcGF0aDogUGF0aCxcbiAgY2hhbmdlczogUmVwbGFjZUNoYW5nZVtdXG4pIHtcbiAgY29uc3QgcmVjb3JkZXIgPSB0cmVlLmJlZ2luVXBkYXRlKHBhdGgpO1xuICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgY29uc3QgYWN0aW9uID0gPGFueT5jaGFuZ2U7XG4gICAgcmVjb3JkZXIucmVtb3ZlKGFjdGlvbi5wb3MsIGFjdGlvbi5vbGRUZXh0Lmxlbmd0aCk7XG4gICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChhY3Rpb24ucG9zLCBhY3Rpb24ubmV3VGV4dCk7XG4gIH1cbiAgcmV0dXJuIHJlY29yZGVyO1xufVxuIl19