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
            schematics_core_1.visitTSSourceFiles(tree, sourceFile => {
                const createChange = (node) => schematics_core_1.createReplaceChange(sourceFile, node, META_REDUCERS, 'USER_PROVIDED_META_REDUCERS');
                const changes = [];
                changes.push(...findMetaReducersImportStatements(sourceFile, createChange));
                changes.push(...findMetaReducersAssignment(sourceFile, createChange));
                return schematics_core_1.commitChanges(tree, sourceFile.fileName, changes);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL21pZ3JhdGlvbnMvOF8wXzAtYmV0YS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLGlDQUFpQztJQUNqQywyREFBK0Q7SUFDL0QsaUVBS3FDO0lBRXJDLE1BQU0sYUFBYSxHQUFHLGVBQWUsQ0FBQztJQUV0QyxTQUFTLHVCQUF1QjtRQUM5QixPQUFPLENBQUMsSUFBVSxFQUFFLEVBQUU7WUFDcEIsb0NBQWtCLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxFQUFFO2dCQUNwQyxNQUFNLFlBQVksR0FBRyxDQUFDLElBQWEsRUFBRSxFQUFFLENBQ3JDLHFDQUFtQixDQUNqQixVQUFVLEVBQ1YsSUFBSSxFQUNKLGFBQWEsRUFDYiw2QkFBNkIsQ0FDOUIsQ0FBQztnQkFFSixNQUFNLE9BQU8sR0FBb0IsRUFBRSxDQUFDO2dCQUNwQyxPQUFPLENBQUMsSUFBSSxDQUNWLEdBQUcsZ0NBQWdDLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUM5RCxDQUFDO2dCQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRywwQkFBMEIsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFFdEUsT0FBTywrQkFBYSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEO1FBQ0UsT0FBTyxrQkFBSyxDQUFDLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUZELDRCQUVDO0lBRUQsU0FBUyxnQ0FBZ0MsQ0FDdkMsVUFBeUIsRUFDekIsWUFBOEM7UUFFOUMsTUFBTSxrQkFBa0IsR0FBRyxVQUFVLENBQUMsVUFBVTthQUM3QyxNQUFNLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2FBQzlCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQzthQUN6QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDTixDQUFDLENBQUMsWUFBYSxDQUFDLGFBQWtDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDakUsNkJBQTZCLENBQzlCLENBQ0Y7YUFDQSxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXZELE1BQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRCxPQUFPLE9BQU8sQ0FBQztRQUVmLFNBQVMsaUJBQWlCLENBQUMsaUJBQXVDO1lBQ2hFLE9BQU8sQ0FDTCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLGVBQWUsQ0FDMUUsQ0FBQztRQUNKLENBQUM7UUFFRCxTQUFTLDZCQUE2QixDQUFDLGVBQW1DO1lBQ3hFLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQztZQUNuRSxNQUFNLGVBQWUsR0FBRyxHQUFHLEVBQUUsQ0FDM0IsZUFBZSxDQUFDLFlBQVk7Z0JBQzVCLGVBQWUsQ0FBQyxZQUFZLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQztZQUV0RCxPQUFPLENBQ0wsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksZUFBZSxFQUFFLENBQUMsQ0FDM0UsQ0FBQztRQUNKLENBQUM7SUFDSCxDQUFDO0lBRUQsU0FBUywwQkFBMEIsQ0FDakMsVUFBeUIsRUFDekIsWUFBOEM7UUFFOUMsSUFBSSxPQUFPLEdBQW9CLEVBQUUsQ0FBQztRQUNsQyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLE9BQU8sT0FBTyxDQUFDO1FBRWYsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFhLEVBQUUsT0FBd0I7WUFDL0QsSUFDRSxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDO2dCQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxhQUFhLEVBQ3REO2dCQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2FBQzlDO1lBRUQsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMzRSxDQUFDO0lBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHsgUnVsZSwgY2hhaW4sIFRyZWUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQge1xuICBSZXBsYWNlQ2hhbmdlLFxuICBjcmVhdGVSZXBsYWNlQ2hhbmdlLFxuICB2aXNpdFRTU291cmNlRmlsZXMsXG4gIGNvbW1pdENoYW5nZXMsXG59IGZyb20gJ0BuZ3J4L3N0b3JlL3NjaGVtYXRpY3MtY29yZSc7XG5cbmNvbnN0IE1FVEFfUkVEVUNFUlMgPSAnTUVUQV9SRURVQ0VSUyc7XG5cbmZ1bmN0aW9uIHVwZGF0ZU1ldGFSZWR1Y2Vyc1Rva2VuKCk6IFJ1bGUge1xuICByZXR1cm4gKHRyZWU6IFRyZWUpID0+IHtcbiAgICB2aXNpdFRTU291cmNlRmlsZXModHJlZSwgc291cmNlRmlsZSA9PiB7XG4gICAgICBjb25zdCBjcmVhdGVDaGFuZ2UgPSAobm9kZTogdHMuTm9kZSkgPT5cbiAgICAgICAgY3JlYXRlUmVwbGFjZUNoYW5nZShcbiAgICAgICAgICBzb3VyY2VGaWxlLFxuICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgTUVUQV9SRURVQ0VSUyxcbiAgICAgICAgICAnVVNFUl9QUk9WSURFRF9NRVRBX1JFRFVDRVJTJ1xuICAgICAgICApO1xuXG4gICAgICBjb25zdCBjaGFuZ2VzOiBSZXBsYWNlQ2hhbmdlW10gPSBbXTtcbiAgICAgIGNoYW5nZXMucHVzaChcbiAgICAgICAgLi4uZmluZE1ldGFSZWR1Y2Vyc0ltcG9ydFN0YXRlbWVudHMoc291cmNlRmlsZSwgY3JlYXRlQ2hhbmdlKVxuICAgICAgKTtcbiAgICAgIGNoYW5nZXMucHVzaCguLi5maW5kTWV0YVJlZHVjZXJzQXNzaWdubWVudChzb3VyY2VGaWxlLCBjcmVhdGVDaGFuZ2UpKTtcblxuICAgICAgcmV0dXJuIGNvbW1pdENoYW5nZXModHJlZSwgc291cmNlRmlsZS5maWxlTmFtZSwgY2hhbmdlcyk7XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCk6IFJ1bGUge1xuICByZXR1cm4gY2hhaW4oW3VwZGF0ZU1ldGFSZWR1Y2Vyc1Rva2VuKCldKTtcbn1cblxuZnVuY3Rpb24gZmluZE1ldGFSZWR1Y2Vyc0ltcG9ydFN0YXRlbWVudHMoXG4gIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gIGNyZWF0ZUNoYW5nZTogKG5vZGU6IHRzLk5vZGUpID0+IFJlcGxhY2VDaGFuZ2Vcbikge1xuICBjb25zdCBtZXRhUmVkdWNlckltcG9ydHMgPSBzb3VyY2VGaWxlLnN0YXRlbWVudHNcbiAgICAuZmlsdGVyKHRzLmlzSW1wb3J0RGVjbGFyYXRpb24pXG4gICAgLmZpbHRlcihpc05nUnhTdG9yZUltcG9ydClcbiAgICAubWFwKHAgPT5cbiAgICAgIChwLmltcG9ydENsYXVzZSEubmFtZWRCaW5kaW5ncyEgYXMgdHMuTmFtZWRJbXBvcnRzKS5lbGVtZW50cy5maWx0ZXIoXG4gICAgICAgIGlzTWV0YVJlZHVjZXJzSW1wb3J0U3BlY2lmaWVyXG4gICAgICApXG4gICAgKVxuICAgIC5yZWR1Y2UoKGltcG9ydHMsIGN1cnIpID0+IGltcG9ydHMuY29uY2F0KGN1cnIpLCBbXSk7XG5cbiAgY29uc3QgY2hhbmdlcyA9IG1ldGFSZWR1Y2VySW1wb3J0cy5tYXAoY3JlYXRlQ2hhbmdlKTtcbiAgcmV0dXJuIGNoYW5nZXM7XG5cbiAgZnVuY3Rpb24gaXNOZ1J4U3RvcmVJbXBvcnQoaW1wb3J0RGVjbGFyYXRpb246IHRzLkltcG9ydERlY2xhcmF0aW9uKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGltcG9ydERlY2xhcmF0aW9uLm1vZHVsZVNwZWNpZmllci5nZXRUZXh0KHNvdXJjZUZpbGUpID09PSBcIidAbmdyeC9zdG9yZSdcIlxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBpc01ldGFSZWR1Y2Vyc0ltcG9ydFNwZWNpZmllcihpbXBvcnRTcGVjaWZpZXI6IHRzLkltcG9ydFNwZWNpZmllcikge1xuICAgIGNvbnN0IGlzSW1wb3J0ID0gKCkgPT4gaW1wb3J0U3BlY2lmaWVyLm5hbWUudGV4dCA9PT0gTUVUQV9SRURVQ0VSUztcbiAgICBjb25zdCBpc1JlbmFtZWRJbXBvcnQgPSAoKSA9PlxuICAgICAgaW1wb3J0U3BlY2lmaWVyLnByb3BlcnR5TmFtZSAmJlxuICAgICAgaW1wb3J0U3BlY2lmaWVyLnByb3BlcnR5TmFtZS50ZXh0ID09PSBNRVRBX1JFRFVDRVJTO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIHRzLmlzSW1wb3J0U3BlY2lmaWVyKGltcG9ydFNwZWNpZmllcikgJiYgKGlzSW1wb3J0KCkgfHwgaXNSZW5hbWVkSW1wb3J0KCkpXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kTWV0YVJlZHVjZXJzQXNzaWdubWVudChcbiAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSxcbiAgY3JlYXRlQ2hhbmdlOiAobm9kZTogdHMuTm9kZSkgPT4gUmVwbGFjZUNoYW5nZVxuKSB7XG4gIGxldCBjaGFuZ2VzOiBSZXBsYWNlQ2hhbmdlW10gPSBbXTtcbiAgdHMuZm9yRWFjaENoaWxkKHNvdXJjZUZpbGUsIG5vZGUgPT4gZmluZE1ldGFSZWR1Y2Vycyhub2RlLCBjaGFuZ2VzKSk7XG4gIHJldHVybiBjaGFuZ2VzO1xuXG4gIGZ1bmN0aW9uIGZpbmRNZXRhUmVkdWNlcnMobm9kZTogdHMuTm9kZSwgY2hhbmdlczogUmVwbGFjZUNoYW5nZVtdKSB7XG4gICAgaWYgKFxuICAgICAgdHMuaXNQcm9wZXJ0eUFzc2lnbm1lbnQobm9kZSkgJiZcbiAgICAgIG5vZGUuaW5pdGlhbGl6ZXIuZ2V0VGV4dChzb3VyY2VGaWxlKSA9PT0gTUVUQV9SRURVQ0VSU1xuICAgICkge1xuICAgICAgY2hhbmdlcy5wdXNoKGNyZWF0ZUNoYW5nZShub2RlLmluaXRpYWxpemVyKSk7XG4gICAgfVxuXG4gICAgdHMuZm9yRWFjaENoaWxkKG5vZGUsIGNoaWxkTm9kZSA9PiBmaW5kTWV0YVJlZHVjZXJzKGNoaWxkTm9kZSwgY2hhbmdlcykpO1xuICB9XG59XG4iXX0=