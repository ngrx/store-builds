(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/migrations/8_0_0-beta/index", ["require", "exports", "typescript", "@angular-devkit/schematics", "@ngrx/store/schematics-core"], factory);
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
                const createChange = (node) => schematics_core_1.createReplaceChange(sourceFile, path, node, META_REDUCERS, 'USER_PROVIDED_META_REDUCERS');
                const changes = [];
                changes.push(...findMetaReducersImportStatements(sourceFile, createChange));
                changes.push(...findMetaReducersAssignment(sourceFile, createChange));
                if (changes.length < 1) {
                    return;
                }
                const recorder = schematics_core_1.createChangeRecorder(tree, path, changes);
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL21pZ3JhdGlvbnMvOF8wXzAtYmV0YS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLGlDQUFpQztJQUNqQywyREFBK0Q7SUFDL0QsaUVBSXFDO0lBRXJDLE1BQU0sYUFBYSxHQUFHLGVBQWUsQ0FBQztJQUV0QyxTQUFTLHVCQUF1QjtRQUM5QixPQUFPLENBQUMsSUFBVSxFQUFFLEVBQUU7WUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3pCLE9BQU87aUJBQ1I7Z0JBRUQsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUNwQyxJQUFJLEVBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUUsQ0FBQyxRQUFRLEVBQUUsRUFDM0IsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQ3ZCLENBQUM7Z0JBRUYsSUFBSSxVQUFVLENBQUMsaUJBQWlCLEVBQUU7b0JBQ2hDLE9BQU87aUJBQ1I7Z0JBRUQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFhLEVBQUUsRUFBRSxDQUNyQyxxQ0FBbUIsQ0FDakIsVUFBVSxFQUNWLElBQUksRUFDSixJQUFJLEVBQ0osYUFBYSxFQUNiLDZCQUE2QixDQUM5QixDQUFDO2dCQUVKLE1BQU0sT0FBTyxHQUFvQixFQUFFLENBQUM7Z0JBQ3BDLE9BQU8sQ0FBQyxJQUFJLENBQ1YsR0FBRyxnQ0FBZ0MsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQzlELENBQUM7Z0JBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLDBCQUEwQixDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUV0RSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN0QixPQUFPO2lCQUNSO2dCQUVELE1BQU0sUUFBUSxHQUFHLHNDQUFvQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzNELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQ7UUFDRSxPQUFPLGtCQUFLLENBQUMsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRkQsNEJBRUM7SUFFRCxTQUFTLGdDQUFnQyxDQUN2QyxVQUF5QixFQUN6QixZQUE4QztRQUU5QyxNQUFNLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxVQUFVO2FBQzdDLE1BQU0sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLENBQUM7YUFDOUIsTUFBTSxDQUFDLGlCQUFpQixDQUFDO2FBQ3pCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNOLENBQUMsQ0FBQyxZQUFhLENBQUMsYUFBa0MsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUNqRSw2QkFBNkIsQ0FDOUIsQ0FDRjthQUNBLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFdkQsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JELE9BQU8sT0FBTyxDQUFDO1FBRWYsU0FBUyxpQkFBaUIsQ0FBQyxpQkFBdUM7WUFDaEUsT0FBTyxDQUNMLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssZUFBZSxDQUMxRSxDQUFDO1FBQ0osQ0FBQztRQUVELFNBQVMsNkJBQTZCLENBQUMsZUFBbUM7WUFDeEUsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDO1lBQ25FLE1BQU0sZUFBZSxHQUFHLEdBQUcsRUFBRSxDQUMzQixlQUFlLENBQUMsWUFBWTtnQkFDNUIsZUFBZSxDQUFDLFlBQVksQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDO1lBRXRELE9BQU8sQ0FDTCxFQUFFLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxlQUFlLEVBQUUsQ0FBQyxDQUMzRSxDQUFDO1FBQ0osQ0FBQztJQUNILENBQUM7SUFFRCxTQUFTLDBCQUEwQixDQUNqQyxVQUF5QixFQUN6QixZQUE4QztRQUU5QyxJQUFJLE9BQU8sR0FBb0IsRUFBRSxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDckUsT0FBTyxPQUFPLENBQUM7UUFFZixTQUFTLGdCQUFnQixDQUFDLElBQWEsRUFBRSxPQUF3QjtZQUMvRCxJQUNFLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLGFBQWEsRUFDdEQ7Z0JBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7YUFDOUM7WUFFRCxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzNFLENBQUM7SUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBSdWxlLCBjaGFpbiwgVHJlZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7XG4gIFJlcGxhY2VDaGFuZ2UsXG4gIGNyZWF0ZUNoYW5nZVJlY29yZGVyLFxuICBjcmVhdGVSZXBsYWNlQ2hhbmdlLFxufSBmcm9tICdAbmdyeC9zdG9yZS9zY2hlbWF0aWNzLWNvcmUnO1xuXG5jb25zdCBNRVRBX1JFRFVDRVJTID0gJ01FVEFfUkVEVUNFUlMnO1xuXG5mdW5jdGlvbiB1cGRhdGVNZXRhUmVkdWNlcnNUb2tlbigpOiBSdWxlIHtcbiAgcmV0dXJuICh0cmVlOiBUcmVlKSA9PiB7XG4gICAgdHJlZS52aXNpdChwYXRoID0+IHtcbiAgICAgIGlmICghcGF0aC5lbmRzV2l0aCgnLnRzJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzb3VyY2VGaWxlID0gdHMuY3JlYXRlU291cmNlRmlsZShcbiAgICAgICAgcGF0aCxcbiAgICAgICAgdHJlZS5yZWFkKHBhdGgpIS50b1N0cmluZygpLFxuICAgICAgICB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0XG4gICAgICApO1xuXG4gICAgICBpZiAoc291cmNlRmlsZS5pc0RlY2xhcmF0aW9uRmlsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNyZWF0ZUNoYW5nZSA9IChub2RlOiB0cy5Ob2RlKSA9PlxuICAgICAgICBjcmVhdGVSZXBsYWNlQ2hhbmdlKFxuICAgICAgICAgIHNvdXJjZUZpbGUsXG4gICAgICAgICAgcGF0aCxcbiAgICAgICAgICBub2RlLFxuICAgICAgICAgIE1FVEFfUkVEVUNFUlMsXG4gICAgICAgICAgJ1VTRVJfUFJPVklERURfTUVUQV9SRURVQ0VSUydcbiAgICAgICAgKTtcblxuICAgICAgY29uc3QgY2hhbmdlczogUmVwbGFjZUNoYW5nZVtdID0gW107XG4gICAgICBjaGFuZ2VzLnB1c2goXG4gICAgICAgIC4uLmZpbmRNZXRhUmVkdWNlcnNJbXBvcnRTdGF0ZW1lbnRzKHNvdXJjZUZpbGUsIGNyZWF0ZUNoYW5nZSlcbiAgICAgICk7XG4gICAgICBjaGFuZ2VzLnB1c2goLi4uZmluZE1ldGFSZWR1Y2Vyc0Fzc2lnbm1lbnQoc291cmNlRmlsZSwgY3JlYXRlQ2hhbmdlKSk7XG5cbiAgICAgIGlmIChjaGFuZ2VzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZWNvcmRlciA9IGNyZWF0ZUNoYW5nZVJlY29yZGVyKHRyZWUsIHBhdGgsIGNoYW5nZXMpO1xuICAgICAgdHJlZS5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpOiBSdWxlIHtcbiAgcmV0dXJuIGNoYWluKFt1cGRhdGVNZXRhUmVkdWNlcnNUb2tlbigpXSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRNZXRhUmVkdWNlcnNJbXBvcnRTdGF0ZW1lbnRzKFxuICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICBjcmVhdGVDaGFuZ2U6IChub2RlOiB0cy5Ob2RlKSA9PiBSZXBsYWNlQ2hhbmdlXG4pIHtcbiAgY29uc3QgbWV0YVJlZHVjZXJJbXBvcnRzID0gc291cmNlRmlsZS5zdGF0ZW1lbnRzXG4gICAgLmZpbHRlcih0cy5pc0ltcG9ydERlY2xhcmF0aW9uKVxuICAgIC5maWx0ZXIoaXNOZ1J4U3RvcmVJbXBvcnQpXG4gICAgLm1hcChwID0+XG4gICAgICAocC5pbXBvcnRDbGF1c2UhLm5hbWVkQmluZGluZ3MhIGFzIHRzLk5hbWVkSW1wb3J0cykuZWxlbWVudHMuZmlsdGVyKFxuICAgICAgICBpc01ldGFSZWR1Y2Vyc0ltcG9ydFNwZWNpZmllclxuICAgICAgKVxuICAgIClcbiAgICAucmVkdWNlKChpbXBvcnRzLCBjdXJyKSA9PiBpbXBvcnRzLmNvbmNhdChjdXJyKSwgW10pO1xuXG4gIGNvbnN0IGNoYW5nZXMgPSBtZXRhUmVkdWNlckltcG9ydHMubWFwKGNyZWF0ZUNoYW5nZSk7XG4gIHJldHVybiBjaGFuZ2VzO1xuXG4gIGZ1bmN0aW9uIGlzTmdSeFN0b3JlSW1wb3J0KGltcG9ydERlY2xhcmF0aW9uOiB0cy5JbXBvcnREZWNsYXJhdGlvbikge1xuICAgIHJldHVybiAoXG4gICAgICBpbXBvcnREZWNsYXJhdGlvbi5tb2R1bGVTcGVjaWZpZXIuZ2V0VGV4dChzb3VyY2VGaWxlKSA9PT0gXCInQG5ncngvc3RvcmUnXCJcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNNZXRhUmVkdWNlcnNJbXBvcnRTcGVjaWZpZXIoaW1wb3J0U3BlY2lmaWVyOiB0cy5JbXBvcnRTcGVjaWZpZXIpIHtcbiAgICBjb25zdCBpc0ltcG9ydCA9ICgpID0+IGltcG9ydFNwZWNpZmllci5uYW1lLnRleHQgPT09IE1FVEFfUkVEVUNFUlM7XG4gICAgY29uc3QgaXNSZW5hbWVkSW1wb3J0ID0gKCkgPT5cbiAgICAgIGltcG9ydFNwZWNpZmllci5wcm9wZXJ0eU5hbWUgJiZcbiAgICAgIGltcG9ydFNwZWNpZmllci5wcm9wZXJ0eU5hbWUudGV4dCA9PT0gTUVUQV9SRURVQ0VSUztcblxuICAgIHJldHVybiAoXG4gICAgICB0cy5pc0ltcG9ydFNwZWNpZmllcihpbXBvcnRTcGVjaWZpZXIpICYmIChpc0ltcG9ydCgpIHx8IGlzUmVuYW1lZEltcG9ydCgpKVxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZE1ldGFSZWR1Y2Vyc0Fzc2lnbm1lbnQoXG4gIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gIGNyZWF0ZUNoYW5nZTogKG5vZGU6IHRzLk5vZGUpID0+IFJlcGxhY2VDaGFuZ2Vcbikge1xuICBsZXQgY2hhbmdlczogUmVwbGFjZUNoYW5nZVtdID0gW107XG4gIHRzLmZvckVhY2hDaGlsZChzb3VyY2VGaWxlLCBub2RlID0+IGZpbmRNZXRhUmVkdWNlcnMobm9kZSwgY2hhbmdlcykpO1xuICByZXR1cm4gY2hhbmdlcztcblxuICBmdW5jdGlvbiBmaW5kTWV0YVJlZHVjZXJzKG5vZGU6IHRzLk5vZGUsIGNoYW5nZXM6IFJlcGxhY2VDaGFuZ2VbXSkge1xuICAgIGlmIChcbiAgICAgIHRzLmlzUHJvcGVydHlBc3NpZ25tZW50KG5vZGUpICYmXG4gICAgICBub2RlLmluaXRpYWxpemVyLmdldFRleHQoc291cmNlRmlsZSkgPT09IE1FVEFfUkVEVUNFUlNcbiAgICApIHtcbiAgICAgIGNoYW5nZXMucHVzaChjcmVhdGVDaGFuZ2Uobm9kZS5pbml0aWFsaXplcikpO1xuICAgIH1cblxuICAgIHRzLmZvckVhY2hDaGlsZChub2RlLCBjaGlsZE5vZGUgPT4gZmluZE1ldGFSZWR1Y2VycyhjaGlsZE5vZGUsIGNoYW5nZXMpKTtcbiAgfVxufVxuIl19