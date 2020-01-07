(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core/utility/visitors", ["require", "exports", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    function visitTSSourceFiles(tree, visitor) {
        let result = undefined;
        for (const sourceFile of visit(tree.root)) {
            result = visitor(sourceFile, tree, result);
        }
        return result;
    }
    exports.visitTSSourceFiles = visitTSSourceFiles;
    function* visit(directory) {
        for (const path of directory.subfiles) {
            if (path.endsWith('.ts') && !path.endsWith('.d.ts')) {
                const entry = directory.file(path);
                if (entry) {
                    const content = entry.content;
                    const source = ts.createSourceFile(entry.path, content.toString().replace(/^\uFEFF/, ''), ts.ScriptTarget.Latest, true);
                    yield source;
                }
            }
        }
        for (const path of directory.subdirs) {
            if (path === 'node_modules') {
                continue;
            }
            yield* visit(directory.dir(path));
        }
    }
    function visitNgModuleImports(sourceFile, callback) {
        ts.forEachChild(sourceFile, function findDecorator(node) {
            if (!ts.isDecorator(node)) {
                ts.forEachChild(node, findDecorator);
                return;
            }
            ts.forEachChild(node, function findImportsNode(n) {
                if (ts.isPropertyAssignment(n) &&
                    ts.isArrayLiteralExpression(n.initializer) &&
                    ts.isIdentifier(n.name) &&
                    n.name.text === 'imports') {
                    callback(n, n.initializer.elements);
                }
                ts.forEachChild(n, findImportsNode);
            });
        });
    }
    exports.visitNgModuleImports = visitNgModuleImports;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NjaGVtYXRpY3MtY29yZS91dGlsaXR5L3Zpc2l0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsaUNBQWlDO0lBR2pDLFNBQWdCLGtCQUFrQixDQUNoQyxJQUFVLEVBQ1YsT0FJdUI7UUFFdkIsSUFBSSxNQUFNLEdBQXVCLFNBQVMsQ0FBQztRQUMzQyxLQUFLLE1BQU0sVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzVDO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQWRELGdEQWNDO0lBRUQsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQW1CO1FBQ2pDLEtBQUssTUFBTSxJQUFJLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRTtZQUNyQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNuRCxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLEtBQUssRUFBRTtvQkFDVCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO29CQUM5QixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQ2hDLEtBQUssQ0FBQyxJQUFJLEVBQ1YsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQ3pDLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUN0QixJQUFJLENBQ0wsQ0FBQztvQkFDRixNQUFNLE1BQU0sQ0FBQztpQkFDZDthQUNGO1NBQ0Y7UUFFRCxLQUFLLE1BQU0sSUFBSSxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDcEMsSUFBSSxJQUFJLEtBQUssY0FBYyxFQUFFO2dCQUMzQixTQUFTO2FBQ1Y7WUFFRCxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUVELFNBQWdCLG9CQUFvQixDQUNsQyxVQUF5QixFQUN6QixRQUdTO1FBRVQsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsU0FBUyxhQUFhLENBQUMsSUFBSTtZQUNyRCxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDekIsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ3JDLE9BQU87YUFDUjtZQUVELEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFNBQVMsZUFBZSxDQUFDLENBQUM7Z0JBQzlDLElBQ0UsRUFBRSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztvQkFDMUIsRUFBRSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7b0JBQzFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUN6QjtvQkFDQSxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3JDO2dCQUVELEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBMUJELG9EQTBCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHsgVHJlZSwgRGlyRW50cnkgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdFRTU291cmNlRmlsZXM8UmVzdWx0ID0gdm9pZD4oXG4gIHRyZWU6IFRyZWUsXG4gIHZpc2l0b3I6IChcbiAgICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICAgIHRyZWU6IFRyZWUsXG4gICAgcmVzdWx0PzogUmVzdWx0XG4gICkgPT4gUmVzdWx0IHwgdW5kZWZpbmVkXG4pOiBSZXN1bHQgfCB1bmRlZmluZWQge1xuICBsZXQgcmVzdWx0OiBSZXN1bHQgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIGZvciAoY29uc3Qgc291cmNlRmlsZSBvZiB2aXNpdCh0cmVlLnJvb3QpKSB7XG4gICAgcmVzdWx0ID0gdmlzaXRvcihzb3VyY2VGaWxlLCB0cmVlLCByZXN1bHQpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24qIHZpc2l0KGRpcmVjdG9yeTogRGlyRW50cnkpOiBJdGVyYWJsZUl0ZXJhdG9yPHRzLlNvdXJjZUZpbGU+IHtcbiAgZm9yIChjb25zdCBwYXRoIG9mIGRpcmVjdG9yeS5zdWJmaWxlcykge1xuICAgIGlmIChwYXRoLmVuZHNXaXRoKCcudHMnKSAmJiAhcGF0aC5lbmRzV2l0aCgnLmQudHMnKSkge1xuICAgICAgY29uc3QgZW50cnkgPSBkaXJlY3RvcnkuZmlsZShwYXRoKTtcbiAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gZW50cnkuY29udGVudDtcbiAgICAgICAgY29uc3Qgc291cmNlID0gdHMuY3JlYXRlU291cmNlRmlsZShcbiAgICAgICAgICBlbnRyeS5wYXRoLFxuICAgICAgICAgIGNvbnRlbnQudG9TdHJpbmcoKS5yZXBsYWNlKC9eXFx1RkVGRi8sICcnKSxcbiAgICAgICAgICB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgICAgeWllbGQgc291cmNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3QgcGF0aCBvZiBkaXJlY3Rvcnkuc3ViZGlycykge1xuICAgIGlmIChwYXRoID09PSAnbm9kZV9tb2R1bGVzJykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgeWllbGQqIHZpc2l0KGRpcmVjdG9yeS5kaXIocGF0aCkpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdE5nTW9kdWxlSW1wb3J0cyhcbiAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSxcbiAgY2FsbGJhY2s6IChcbiAgICBpbXBvcnROb2RlOiB0cy5Qcm9wZXJ0eUFzc2lnbm1lbnQsXG4gICAgZWxlbWVudEV4cHJlc3Npb25zOiB0cy5Ob2RlQXJyYXk8dHMuRXhwcmVzc2lvbj5cbiAgKSA9PiB2b2lkXG4pIHtcbiAgdHMuZm9yRWFjaENoaWxkKHNvdXJjZUZpbGUsIGZ1bmN0aW9uIGZpbmREZWNvcmF0b3Iobm9kZSkge1xuICAgIGlmICghdHMuaXNEZWNvcmF0b3Iobm9kZSkpIHtcbiAgICAgIHRzLmZvckVhY2hDaGlsZChub2RlLCBmaW5kRGVjb3JhdG9yKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cy5mb3JFYWNoQ2hpbGQobm9kZSwgZnVuY3Rpb24gZmluZEltcG9ydHNOb2RlKG4pIHtcbiAgICAgIGlmIChcbiAgICAgICAgdHMuaXNQcm9wZXJ0eUFzc2lnbm1lbnQobikgJiZcbiAgICAgICAgdHMuaXNBcnJheUxpdGVyYWxFeHByZXNzaW9uKG4uaW5pdGlhbGl6ZXIpICYmXG4gICAgICAgIHRzLmlzSWRlbnRpZmllcihuLm5hbWUpICYmXG4gICAgICAgIG4ubmFtZS50ZXh0ID09PSAnaW1wb3J0cydcbiAgICAgICkge1xuICAgICAgICBjYWxsYmFjayhuLCBuLmluaXRpYWxpemVyLmVsZW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgdHMuZm9yRWFjaENoaWxkKG4sIGZpbmRJbXBvcnRzTm9kZSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19