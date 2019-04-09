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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL21pZ3JhdGlvbnMvOF8wXzAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxpQ0FBaUM7SUFDakMsMkRBQStEO0lBQy9ELGlFQUlxQztJQUVyQyxNQUFNLGFBQWEsR0FBRyxlQUFlLENBQUM7SUFFdEMsU0FBUyx1QkFBdUI7UUFDOUIsT0FBTyxDQUFDLElBQVUsRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN6QixPQUFPO2lCQUNSO2dCQUVELE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FDcEMsSUFBSSxFQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUMsUUFBUSxFQUFFLEVBQzNCLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUN2QixDQUFDO2dCQUVGLElBQUksVUFBVSxDQUFDLGlCQUFpQixFQUFFO29CQUNoQyxPQUFPO2lCQUNSO2dCQUVELE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBYSxFQUFFLEVBQUUsQ0FDckMscUNBQW1CLENBQ2pCLFVBQVUsRUFDVixJQUFJLEVBQ0osSUFBSSxFQUNKLGFBQWEsRUFDYiw2QkFBNkIsQ0FDOUIsQ0FBQztnQkFFSixNQUFNLE9BQU8sR0FBb0IsRUFBRSxDQUFDO2dCQUNwQyxPQUFPLENBQUMsSUFBSSxDQUNWLEdBQUcsZ0NBQWdDLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUM5RCxDQUFDO2dCQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRywwQkFBMEIsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFFdEUsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDdEIsT0FBTztpQkFDUjtnQkFFRCxNQUFNLFFBQVEsR0FBRyxzQ0FBb0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEO1FBQ0UsT0FBTyxrQkFBSyxDQUFDLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUZELDRCQUVDO0lBRUQsU0FBUyxnQ0FBZ0MsQ0FDdkMsVUFBeUIsRUFDekIsWUFBOEM7UUFFOUMsTUFBTSxrQkFBa0IsR0FBRyxVQUFVLENBQUMsVUFBVTthQUM3QyxNQUFNLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2FBQzlCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQzthQUN6QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDTixDQUFDLENBQUMsWUFBYSxDQUFDLGFBQWtDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDakUsNkJBQTZCLENBQzlCLENBQ0Y7YUFDQSxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXZELE1BQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRCxPQUFPLE9BQU8sQ0FBQztRQUVmLFNBQVMsaUJBQWlCLENBQUMsaUJBQXVDO1lBQ2hFLE9BQU8sQ0FDTCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLGVBQWUsQ0FDMUUsQ0FBQztRQUNKLENBQUM7UUFFRCxTQUFTLDZCQUE2QixDQUFDLGVBQW1DO1lBQ3hFLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQztZQUNuRSxNQUFNLGVBQWUsR0FBRyxHQUFHLEVBQUUsQ0FDM0IsZUFBZSxDQUFDLFlBQVk7Z0JBQzVCLGVBQWUsQ0FBQyxZQUFZLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQztZQUV0RCxPQUFPLENBQ0wsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksZUFBZSxFQUFFLENBQUMsQ0FDM0UsQ0FBQztRQUNKLENBQUM7SUFDSCxDQUFDO0lBRUQsU0FBUywwQkFBMEIsQ0FDakMsVUFBeUIsRUFDekIsWUFBOEM7UUFFOUMsSUFBSSxPQUFPLEdBQW9CLEVBQUUsQ0FBQztRQUNsQyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLE9BQU8sT0FBTyxDQUFDO1FBRWYsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFhLEVBQUUsT0FBd0I7WUFDL0QsSUFDRSxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDO2dCQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxhQUFhLEVBQ3REO2dCQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2FBQzlDO1lBRUQsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMzRSxDQUFDO0lBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHsgUnVsZSwgY2hhaW4sIFRyZWUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQge1xuICBSZXBsYWNlQ2hhbmdlLFxuICBjcmVhdGVDaGFuZ2VSZWNvcmRlcixcbiAgY3JlYXRlUmVwbGFjZUNoYW5nZSxcbn0gZnJvbSAnQG5ncngvc3RvcmUvc2NoZW1hdGljcy1jb3JlJztcblxuY29uc3QgTUVUQV9SRURVQ0VSUyA9ICdNRVRBX1JFRFVDRVJTJztcblxuZnVuY3Rpb24gdXBkYXRlTWV0YVJlZHVjZXJzVG9rZW4oKTogUnVsZSB7XG4gIHJldHVybiAodHJlZTogVHJlZSkgPT4ge1xuICAgIHRyZWUudmlzaXQocGF0aCA9PiB7XG4gICAgICBpZiAoIXBhdGguZW5kc1dpdGgoJy50cycpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc291cmNlRmlsZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUoXG4gICAgICAgIHBhdGgsXG4gICAgICAgIHRyZWUucmVhZChwYXRoKSEudG9TdHJpbmcoKSxcbiAgICAgICAgdHMuU2NyaXB0VGFyZ2V0LkxhdGVzdFxuICAgICAgKTtcblxuICAgICAgaWYgKHNvdXJjZUZpbGUuaXNEZWNsYXJhdGlvbkZpbGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjcmVhdGVDaGFuZ2UgPSAobm9kZTogdHMuTm9kZSkgPT5cbiAgICAgICAgY3JlYXRlUmVwbGFjZUNoYW5nZShcbiAgICAgICAgICBzb3VyY2VGaWxlLFxuICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgbm9kZSxcbiAgICAgICAgICBNRVRBX1JFRFVDRVJTLFxuICAgICAgICAgICdVU0VSX1BST1ZJREVEX01FVEFfUkVEVUNFUlMnXG4gICAgICAgICk7XG5cbiAgICAgIGNvbnN0IGNoYW5nZXM6IFJlcGxhY2VDaGFuZ2VbXSA9IFtdO1xuICAgICAgY2hhbmdlcy5wdXNoKFxuICAgICAgICAuLi5maW5kTWV0YVJlZHVjZXJzSW1wb3J0U3RhdGVtZW50cyhzb3VyY2VGaWxlLCBjcmVhdGVDaGFuZ2UpXG4gICAgICApO1xuICAgICAgY2hhbmdlcy5wdXNoKC4uLmZpbmRNZXRhUmVkdWNlcnNBc3NpZ25tZW50KHNvdXJjZUZpbGUsIGNyZWF0ZUNoYW5nZSkpO1xuXG4gICAgICBpZiAoY2hhbmdlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVjb3JkZXIgPSBjcmVhdGVDaGFuZ2VSZWNvcmRlcih0cmVlLCBwYXRoLCBjaGFuZ2VzKTtcbiAgICAgIHRyZWUuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKTogUnVsZSB7XG4gIHJldHVybiBjaGFpbihbdXBkYXRlTWV0YVJlZHVjZXJzVG9rZW4oKV0pO1xufVxuXG5mdW5jdGlvbiBmaW5kTWV0YVJlZHVjZXJzSW1wb3J0U3RhdGVtZW50cyhcbiAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSxcbiAgY3JlYXRlQ2hhbmdlOiAobm9kZTogdHMuTm9kZSkgPT4gUmVwbGFjZUNoYW5nZVxuKSB7XG4gIGNvbnN0IG1ldGFSZWR1Y2VySW1wb3J0cyA9IHNvdXJjZUZpbGUuc3RhdGVtZW50c1xuICAgIC5maWx0ZXIodHMuaXNJbXBvcnREZWNsYXJhdGlvbilcbiAgICAuZmlsdGVyKGlzTmdSeFN0b3JlSW1wb3J0KVxuICAgIC5tYXAocCA9PlxuICAgICAgKHAuaW1wb3J0Q2xhdXNlIS5uYW1lZEJpbmRpbmdzISBhcyB0cy5OYW1lZEltcG9ydHMpLmVsZW1lbnRzLmZpbHRlcihcbiAgICAgICAgaXNNZXRhUmVkdWNlcnNJbXBvcnRTcGVjaWZpZXJcbiAgICAgIClcbiAgICApXG4gICAgLnJlZHVjZSgoaW1wb3J0cywgY3VycikgPT4gaW1wb3J0cy5jb25jYXQoY3VyciksIFtdKTtcblxuICBjb25zdCBjaGFuZ2VzID0gbWV0YVJlZHVjZXJJbXBvcnRzLm1hcChjcmVhdGVDaGFuZ2UpO1xuICByZXR1cm4gY2hhbmdlcztcblxuICBmdW5jdGlvbiBpc05nUnhTdG9yZUltcG9ydChpbXBvcnREZWNsYXJhdGlvbjogdHMuSW1wb3J0RGVjbGFyYXRpb24pIHtcbiAgICByZXR1cm4gKFxuICAgICAgaW1wb3J0RGVjbGFyYXRpb24ubW9kdWxlU3BlY2lmaWVyLmdldFRleHQoc291cmNlRmlsZSkgPT09IFwiJ0BuZ3J4L3N0b3JlJ1wiXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTWV0YVJlZHVjZXJzSW1wb3J0U3BlY2lmaWVyKGltcG9ydFNwZWNpZmllcjogdHMuSW1wb3J0U3BlY2lmaWVyKSB7XG4gICAgY29uc3QgaXNJbXBvcnQgPSAoKSA9PiBpbXBvcnRTcGVjaWZpZXIubmFtZS50ZXh0ID09PSBNRVRBX1JFRFVDRVJTO1xuICAgIGNvbnN0IGlzUmVuYW1lZEltcG9ydCA9ICgpID0+XG4gICAgICBpbXBvcnRTcGVjaWZpZXIucHJvcGVydHlOYW1lICYmXG4gICAgICBpbXBvcnRTcGVjaWZpZXIucHJvcGVydHlOYW1lLnRleHQgPT09IE1FVEFfUkVEVUNFUlM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgdHMuaXNJbXBvcnRTcGVjaWZpZXIoaW1wb3J0U3BlY2lmaWVyKSAmJiAoaXNJbXBvcnQoKSB8fCBpc1JlbmFtZWRJbXBvcnQoKSlcbiAgICApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRNZXRhUmVkdWNlcnNBc3NpZ25tZW50KFxuICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICBjcmVhdGVDaGFuZ2U6IChub2RlOiB0cy5Ob2RlKSA9PiBSZXBsYWNlQ2hhbmdlXG4pIHtcbiAgbGV0IGNoYW5nZXM6IFJlcGxhY2VDaGFuZ2VbXSA9IFtdO1xuICB0cy5mb3JFYWNoQ2hpbGQoc291cmNlRmlsZSwgbm9kZSA9PiBmaW5kTWV0YVJlZHVjZXJzKG5vZGUsIGNoYW5nZXMpKTtcbiAgcmV0dXJuIGNoYW5nZXM7XG5cbiAgZnVuY3Rpb24gZmluZE1ldGFSZWR1Y2Vycyhub2RlOiB0cy5Ob2RlLCBjaGFuZ2VzOiBSZXBsYWNlQ2hhbmdlW10pIHtcbiAgICBpZiAoXG4gICAgICB0cy5pc1Byb3BlcnR5QXNzaWdubWVudChub2RlKSAmJlxuICAgICAgbm9kZS5pbml0aWFsaXplci5nZXRUZXh0KHNvdXJjZUZpbGUpID09PSBNRVRBX1JFRFVDRVJTXG4gICAgKSB7XG4gICAgICBjaGFuZ2VzLnB1c2goY3JlYXRlQ2hhbmdlKG5vZGUuaW5pdGlhbGl6ZXIpKTtcbiAgICB9XG5cbiAgICB0cy5mb3JFYWNoQ2hpbGQobm9kZSwgY2hpbGROb2RlID0+IGZpbmRNZXRhUmVkdWNlcnMoY2hpbGROb2RlLCBjaGFuZ2VzKSk7XG4gIH1cbn1cbiJdfQ==