(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/migrations/8_0_0-beta/index", ["require", "exports", "typescript", "@angular-devkit/core", "@angular-devkit/schematics", "@ngrx/store/schematics-core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    const core_1 = require("@angular-devkit/core");
    const schematics_1 = require("@angular-devkit/schematics");
    const schematics_core_1 = require("@ngrx/store/schematics-core");
    const META_REDUCERS = 'META_REDUCERS';
    function updateMetaReducersToken() {
        return (tree, context) => {
            schematics_core_1.visitTSSourceFiles(tree, sourceFile => {
                const createChange = (node) => schematics_core_1.createReplaceChange(sourceFile, node, META_REDUCERS, 'USER_PROVIDED_META_REDUCERS');
                const changes = [];
                changes.push(...findMetaReducersImportStatements(sourceFile, createChange, context.logger));
                changes.push(...findMetaReducersAssignment(sourceFile, createChange));
                return schematics_core_1.commitChanges(tree, sourceFile.fileName, changes);
            });
        };
    }
    function default_1() {
        return schematics_1.chain([updateMetaReducersToken()]);
    }
    exports.default = default_1;
    function findMetaReducersImportStatements(sourceFile, createChange, logger) {
        let canRunSchematics = false;
        const metaReducerImports = sourceFile.statements
            .filter(ts.isImportDeclaration)
            .filter(isNgRxStoreImport)
            .filter(p => {
            canRunSchematics = Boolean(p.importClause &&
                p.importClause.namedBindings &&
                p.importClause.namedBindings.elements);
            return canRunSchematics;
        })
            .map(p => p.importClause.namedBindings.elements.filter(isMetaReducersImportSpecifier))
            .reduce((imports, curr) => imports.concat(curr), []);
        const changes = metaReducerImports.map(createChange);
        if (!canRunSchematics && changes.length === 0) {
            logger.info(core_1.tags.stripIndent `
      NgRx 8 Migration: Unable to run the schematics to rename \`META_REDUCERS\` to \`USER_PROVIDED_META_REDUCERS\`
      in file '${sourceFile.fileName}'.

      For more info see https://ngrx.io/guide/migration/v8#meta_reducers-token.
    `);
        }
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL21pZ3JhdGlvbnMvOF8wXzAtYmV0YS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLGlDQUFpQztJQUNqQywrQ0FBcUQ7SUFDckQsMkRBS29DO0lBQ3BDLGlFQUtxQztJQUVyQyxNQUFNLGFBQWEsR0FBRyxlQUFlLENBQUM7SUFFdEMsU0FBUyx1QkFBdUI7UUFDOUIsT0FBTyxDQUFDLElBQVUsRUFBRSxPQUF5QixFQUFFLEVBQUU7WUFDL0Msb0NBQWtCLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxFQUFFO2dCQUNwQyxNQUFNLFlBQVksR0FBRyxDQUFDLElBQWEsRUFBRSxFQUFFLENBQ3JDLHFDQUFtQixDQUNqQixVQUFVLEVBQ1YsSUFBSSxFQUNKLGFBQWEsRUFDYiw2QkFBNkIsQ0FDOUIsQ0FBQztnQkFFSixNQUFNLE9BQU8sR0FBb0IsRUFBRSxDQUFDO2dCQUNwQyxPQUFPLENBQUMsSUFBSSxDQUNWLEdBQUcsZ0NBQWdDLENBQ2pDLFVBQVUsRUFDVixZQUFZLEVBQ1osT0FBTyxDQUFDLE1BQU0sQ0FDZixDQUNGLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLDBCQUEwQixDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUV0RSxPQUFPLCtCQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQ7UUFDRSxPQUFPLGtCQUFLLENBQUMsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRkQsNEJBRUM7SUFFRCxTQUFTLGdDQUFnQyxDQUN2QyxVQUF5QixFQUN6QixZQUE4QyxFQUM5QyxNQUF5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Z3MsIGxvZ2dpbmcgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQge1xuICBSdWxlLFxuICBjaGFpbixcbiAgVHJlZSxcbiAgU2NoZW1hdGljQ29udGV4dCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHtcbiAgUmVwbGFjZUNoYW5nZSxcbiAgY3JlYXRlUmVwbGFjZUNoYW5nZSxcbiAgdmlzaXRUU1NvdXJjZUZpbGVzLFxuICBjb21taXRDaGFuZ2VzLFxufSBmcm9tICdAbmdyeC9zdG9yZS9zY2hlbWF0aWNzLWNvcmUnO1xuXG5jb25zdCBNRVRBX1JFRFVDRVJTID0gJ01FVEFfUkVEVUNFUlMnO1xuXG5mdW5jdGlvbiB1cGRhdGVNZXRhUmVkdWNlcnNUb2tlbigpOiBSdWxlIHtcbiAgcmV0dXJuICh0cmVlOiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgdmlzaXRUU1NvdXJjZUZpbGVzKHRyZWUsIHNvdXJjZUZpbGUgPT4ge1xuICAgICAgY29uc3QgY3JlYXRlQ2hhbmdlID0gKG5vZGU6IHRzLk5vZGUpID0+XG4gICAgICAgIGNyZWF0ZVJlcGxhY2VDaGFuZ2UoXG4gICAgICAgICAgc291cmNlRmlsZSxcbiAgICAgICAgICBub2RlLFxuICAgICAgICAgIE1FVEFfUkVEVUNFUlMsXG4gICAgICAgICAgJ1VTRVJfUFJPVklERURfTUVUQV9SRURVQ0VSUydcbiAgICAgICAgKTtcblxuICAgICAgY29uc3QgY2hhbmdlczogUmVwbGFjZUNoYW5nZVtdID0gW107XG4gICAgICBjaGFuZ2VzLnB1c2goXG4gICAgICAgIC4uLmZpbmRNZXRhUmVkdWNlcnNJbXBvcnRTdGF0ZW1lbnRzKFxuICAgICAgICAgIHNvdXJjZUZpbGUsXG4gICAgICAgICAgY3JlYXRlQ2hhbmdlLFxuICAgICAgICAgIGNvbnRleHQubG9nZ2VyXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBjaGFuZ2VzLnB1c2goLi4uZmluZE1ldGFSZWR1Y2Vyc0Fzc2lnbm1lbnQoc291cmNlRmlsZSwgY3JlYXRlQ2hhbmdlKSk7XG5cbiAgICAgIHJldHVybiBjb21taXRDaGFuZ2VzKHRyZWUsIHNvdXJjZUZpbGUuZmlsZU5hbWUsIGNoYW5nZXMpO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpOiBSdWxlIHtcbiAgcmV0dXJuIGNoYWluKFt1cGRhdGVNZXRhUmVkdWNlcnNUb2tlbigpXSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRNZXRhUmVkdWNlcnNJbXBvcnRTdGF0ZW1lbnRzKFxuICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICBjcmVhdGVDaGFuZ2U6IChub2RlOiB0cy5Ob2RlKSA9PiBSZXBsYWNlQ2hhbmdlLFxuICBsb2dnZXI6IGxvZ2dpbmcuTG9nZ2VyQXBpXG4pIHtcbiAgbGV0IGNhblJ1blNjaGVtYXRpY3MgPSBmYWxzZTtcblxuICBjb25zdCBtZXRhUmVkdWNlckltcG9ydHMgPSBzb3VyY2VGaWxlLnN0YXRlbWVudHNcbiAgICAuZmlsdGVyKHRzLmlzSW1wb3J0RGVjbGFyYXRpb24pXG4gICAgLmZpbHRlcihpc05nUnhTdG9yZUltcG9ydClcbiAgICAuZmlsdGVyKHAgPT4ge1xuICAgICAgY2FuUnVuU2NoZW1hdGljcyA9IEJvb2xlYW4oXG4gICAgICAgIHAuaW1wb3J0Q2xhdXNlICYmXG4gICAgICAgICAgcC5pbXBvcnRDbGF1c2UubmFtZWRCaW5kaW5ncyAmJlxuICAgICAgICAgIChwLmltcG9ydENsYXVzZSEubmFtZWRCaW5kaW5ncyEgYXMgdHMuTmFtZWRJbXBvcnRzKS5lbGVtZW50c1xuICAgICAgKTtcbiAgICAgIHJldHVybiBjYW5SdW5TY2hlbWF0aWNzO1xuICAgIH0pXG4gICAgLm1hcChwID0+XG4gICAgICAocC5pbXBvcnRDbGF1c2UhLm5hbWVkQmluZGluZ3MhIGFzIHRzLk5hbWVkSW1wb3J0cykuZWxlbWVudHMuZmlsdGVyKFxuICAgICAgICBpc01ldGFSZWR1Y2Vyc0ltcG9ydFNwZWNpZmllclxuICAgICAgKVxuICAgIClcbiAgICAucmVkdWNlKChpbXBvcnRzLCBjdXJyKSA9PiBpbXBvcnRzLmNvbmNhdChjdXJyKSwgW10pO1xuXG4gIGNvbnN0IGNoYW5nZXMgPSBtZXRhUmVkdWNlckltcG9ydHMubWFwKGNyZWF0ZUNoYW5nZSk7XG4gIGlmICghY2FuUnVuU2NoZW1hdGljcyAmJiBjaGFuZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgIGxvZ2dlci5pbmZvKHRhZ3Muc3RyaXBJbmRlbnRgXG4gICAgICBOZ1J4IDggTWlncmF0aW9uOiBVbmFibGUgdG8gcnVuIHRoZSBzY2hlbWF0aWNzIHRvIHJlbmFtZSBcXGBNRVRBX1JFRFVDRVJTXFxgIHRvIFxcYFVTRVJfUFJPVklERURfTUVUQV9SRURVQ0VSU1xcYFxuICAgICAgaW4gZmlsZSAnJHtzb3VyY2VGaWxlLmZpbGVOYW1lfScuXG5cbiAgICAgIEZvciBtb3JlIGluZm8gc2VlIGh0dHBzOi8vbmdyeC5pby9ndWlkZS9taWdyYXRpb24vdjgjbWV0YV9yZWR1Y2Vycy10b2tlbi5cbiAgICBgKTtcbiAgfVxuXG4gIHJldHVybiBjaGFuZ2VzO1xuXG4gIGZ1bmN0aW9uIGlzTmdSeFN0b3JlSW1wb3J0KGltcG9ydERlY2xhcmF0aW9uOiB0cy5JbXBvcnREZWNsYXJhdGlvbikge1xuICAgIHJldHVybiAoXG4gICAgICBpbXBvcnREZWNsYXJhdGlvbi5tb2R1bGVTcGVjaWZpZXIuZ2V0VGV4dChzb3VyY2VGaWxlKSA9PT0gXCInQG5ncngvc3RvcmUnXCJcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNNZXRhUmVkdWNlcnNJbXBvcnRTcGVjaWZpZXIoaW1wb3J0U3BlY2lmaWVyOiB0cy5JbXBvcnRTcGVjaWZpZXIpIHtcbiAgICBjb25zdCBpc0ltcG9ydCA9ICgpID0+IGltcG9ydFNwZWNpZmllci5uYW1lLnRleHQgPT09IE1FVEFfUkVEVUNFUlM7XG4gICAgY29uc3QgaXNSZW5hbWVkSW1wb3J0ID0gKCkgPT5cbiAgICAgIGltcG9ydFNwZWNpZmllci5wcm9wZXJ0eU5hbWUgJiZcbiAgICAgIGltcG9ydFNwZWNpZmllci5wcm9wZXJ0eU5hbWUudGV4dCA9PT0gTUVUQV9SRURVQ0VSUztcblxuICAgIHJldHVybiAoXG4gICAgICB0cy5pc0ltcG9ydFNwZWNpZmllcihpbXBvcnRTcGVjaWZpZXIpICYmIChpc0ltcG9ydCgpIHx8IGlzUmVuYW1lZEltcG9ydCgpKVxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZE1ldGFSZWR1Y2Vyc0Fzc2lnbm1lbnQoXG4gIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gIGNyZWF0ZUNoYW5nZTogKG5vZGU6IHRzLk5vZGUpID0+IFJlcGxhY2VDaGFuZ2Vcbikge1xuICBsZXQgY2hhbmdlczogUmVwbGFjZUNoYW5nZVtdID0gW107XG4gIHRzLmZvckVhY2hDaGlsZChzb3VyY2VGaWxlLCBub2RlID0+IGZpbmRNZXRhUmVkdWNlcnMobm9kZSwgY2hhbmdlcykpO1xuICByZXR1cm4gY2hhbmdlcztcblxuICBmdW5jdGlvbiBmaW5kTWV0YVJlZHVjZXJzKG5vZGU6IHRzLk5vZGUsIGNoYW5nZXM6IFJlcGxhY2VDaGFuZ2VbXSkge1xuICAgIGlmIChcbiAgICAgIHRzLmlzUHJvcGVydHlBc3NpZ25tZW50KG5vZGUpICYmXG4gICAgICBub2RlLmluaXRpYWxpemVyLmdldFRleHQoc291cmNlRmlsZSkgPT09IE1FVEFfUkVEVUNFUlNcbiAgICApIHtcbiAgICAgIGNoYW5nZXMucHVzaChjcmVhdGVDaGFuZ2Uobm9kZS5pbml0aWFsaXplcikpO1xuICAgIH1cblxuICAgIHRzLmZvckVhY2hDaGlsZChub2RlLCBjaGlsZE5vZGUgPT4gZmluZE1ldGFSZWR1Y2VycyhjaGlsZE5vZGUsIGNoYW5nZXMpKTtcbiAgfVxufVxuIl19