(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core/utility/visitors", ["require", "exports", "typescript", "@angular-devkit/core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    const core_1 = require("@angular-devkit/core");
    function visitTSSourceFiles(tree, visitor) {
        let result = undefined;
        for (const sourceFile of visit(tree.root)) {
            result = visitor(sourceFile, tree, result);
        }
        return result;
    }
    exports.visitTSSourceFiles = visitTSSourceFiles;
    function visitTemplates(tree, visitor) {
        visitTSSourceFiles(tree, source => {
            visitComponents(source, (_, decoratorExpressionNode) => {
                ts.forEachChild(decoratorExpressionNode, function findTemplates(n) {
                    if (ts.isPropertyAssignment(n) && ts.isIdentifier(n.name)) {
                        if (n.name.text === 'template' &&
                            ts.isStringLiteralLike(n.initializer)) {
                            // Need to add an offset of one to the start because the template quotes are
                            // not part of the template content.
                            const templateStartIdx = n.initializer.getStart() + 1;
                            visitor({
                                fileName: source.fileName,
                                content: n.initializer.text,
                                inline: true,
                                start: templateStartIdx,
                            }, tree);
                            return;
                        }
                        else if (n.name.text === 'templateUrl' &&
                            ts.isStringLiteralLike(n.initializer)) {
                            const parts = core_1.normalize(source.fileName)
                                .split('/')
                                .slice(0, -1);
                            const templatePath = core_1.resolve(core_1.normalize(parts.join('/')), core_1.normalize(n.initializer.text));
                            if (!tree.exists(templatePath)) {
                                return;
                            }
                            const fileContent = tree.read(templatePath);
                            if (!fileContent) {
                                return;
                            }
                            visitor({
                                fileName: templatePath,
                                content: fileContent.toString(),
                                inline: false,
                                start: 0,
                            }, tree);
                            return;
                        }
                    }
                    ts.forEachChild(n, findTemplates);
                });
            });
        });
    }
    exports.visitTemplates = visitTemplates;
    function visitNgModuleImports(sourceFile, callback) {
        visitNgModuleProperty(sourceFile, callback, 'imports');
    }
    exports.visitNgModuleImports = visitNgModuleImports;
    function visitNgModuleExports(sourceFile, callback) {
        visitNgModuleProperty(sourceFile, callback, 'exports');
    }
    exports.visitNgModuleExports = visitNgModuleExports;
    function visitNgModuleProperty(sourceFile, callback, property) {
        visitNgModules(sourceFile, (_, decoratorExpressionNode) => {
            ts.forEachChild(decoratorExpressionNode, function findTemplates(n) {
                if (ts.isPropertyAssignment(n) &&
                    ts.isIdentifier(n.name) &&
                    n.name.text === property &&
                    ts.isArrayLiteralExpression(n.initializer)) {
                    callback(n, n.initializer.elements);
                    return;
                }
                ts.forEachChild(n, findTemplates);
            });
        });
    }
    function visitComponents(sourceFile, callback) {
        visitDecorator(sourceFile, 'Component', callback);
    }
    exports.visitComponents = visitComponents;
    function visitNgModules(sourceFile, callback) {
        visitDecorator(sourceFile, 'NgModule', callback);
    }
    exports.visitNgModules = visitNgModules;
    function visitDecorator(sourceFile, decoratorName, callback) {
        ts.forEachChild(sourceFile, function findClassDeclaration(node) {
            if (!ts.isClassDeclaration(node)) {
                ts.forEachChild(node, findClassDeclaration);
            }
            const classDeclarationNode = node;
            if (!classDeclarationNode.decorators ||
                !classDeclarationNode.decorators.length) {
                return;
            }
            const componentDecorator = classDeclarationNode.decorators.find(d => {
                return (ts.isCallExpression(d.expression) &&
                    ts.isIdentifier(d.expression.expression) &&
                    d.expression.expression.text === decoratorName);
            });
            if (!componentDecorator) {
                return;
            }
            const { expression } = componentDecorator;
            if (!ts.isCallExpression(expression)) {
                return;
            }
            const [arg] = expression.arguments;
            if (!ts.isObjectLiteralExpression(arg)) {
                return;
            }
            callback(classDeclarationNode, arg);
        });
    }
    exports.visitDecorator = visitDecorator;
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NjaGVtYXRpY3MtY29yZS91dGlsaXR5L3Zpc2l0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsaUNBQWlDO0lBQ2pDLCtDQUEwRDtJQUcxRCxTQUFnQixrQkFBa0IsQ0FDaEMsSUFBVSxFQUNWLE9BSXVCO1FBRXZCLElBQUksTUFBTSxHQUF1QixTQUFTLENBQUM7UUFDM0MsS0FBSyxNQUFNLFVBQVUsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3pDLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUM1QztRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFkRCxnREFjQztJQUVELFNBQWdCLGNBQWMsQ0FDNUIsSUFBVSxFQUNWLE9BUVM7UUFFVCxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDaEMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSx1QkFBdUIsRUFBRSxFQUFFO2dCQUNyRCxFQUFFLENBQUMsWUFBWSxDQUFDLHVCQUF1QixFQUFFLFNBQVMsYUFBYSxDQUFDLENBQUM7b0JBQy9ELElBQUksRUFBRSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUN6RCxJQUNFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVU7NEJBQzFCLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQ3JDOzRCQUNBLDRFQUE0RTs0QkFDNUUsb0NBQW9DOzRCQUNwQyxNQUFNLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMs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S0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNuQztJQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7IG5vcm1hbGl6ZSwgcmVzb2x2ZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IFRyZWUsIERpckVudHJ5IH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuXG5leHBvcnQgZnVuY3Rpb24gdmlzaXRUU1NvdXJjZUZpbGVzPFJlc3VsdCA9IHZvaWQ+KFxuICB0cmVlOiBUcmVlLFxuICB2aXNpdG9yOiAoXG4gICAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSxcbiAgICB0cmVlOiBUcmVlLFxuICAgIHJlc3VsdD86IFJlc3VsdFxuICApID0+IFJlc3VsdCB8IHVuZGVmaW5lZFxuKTogUmVzdWx0IHwgdW5kZWZpbmVkIHtcbiAgbGV0IHJlc3VsdDogUmVzdWx0IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBmb3IgKGNvbnN0IHNvdXJjZUZpbGUgb2YgdmlzaXQodHJlZS5yb290KSkge1xuICAgIHJlc3VsdCA9IHZpc2l0b3Ioc291cmNlRmlsZSwgdHJlZSwgcmVzdWx0KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdFRlbXBsYXRlcyhcbiAgdHJlZTogVHJlZSxcbiAgdmlzaXRvcjogKFxuICAgIHRlbXBsYXRlOiB7XG4gICAgICBmaWxlTmFtZTogc3RyaW5nO1xuICAgICAgY29udGVudDogc3RyaW5nO1xuICAgICAgaW5saW5lOiBib29sZWFuO1xuICAgICAgc3RhcnQ6IG51bWJlcjtcbiAgICB9LFxuICAgIHRyZWU6IFRyZWVcbiAgKSA9PiB2b2lkXG4pOiB2b2lkIHtcbiAgdmlzaXRUU1NvdXJjZUZpbGVzKHRyZWUsIHNvdXJjZSA9PiB7XG4gICAgdmlzaXRDb21wb25lbnRzKHNvdXJjZSwgKF8sIGRlY29yYXRvckV4cHJlc3Npb25Ob2RlKSA9PiB7XG4gICAgICB0cy5mb3JFYWNoQ2hpbGQoZGVjb3JhdG9yRXhwcmVzc2lvbk5vZGUsIGZ1bmN0aW9uIGZpbmRUZW1wbGF0ZXMobikge1xuICAgICAgICBpZiAodHMuaXNQcm9wZXJ0eUFzc2lnbm1lbnQobikgJiYgdHMuaXNJZGVudGlmaWVyKG4ubmFtZSkpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBuLm5hbWUudGV4dCA9PT0gJ3RlbXBsYXRlJyAmJlxuICAgICAgICAgICAgdHMuaXNTdHJpbmdMaXRlcmFsTGlrZShuLmluaXRpYWxpemVyKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgLy8gTmVlZCB0byBhZGQgYW4gb2Zmc2V0IG9mIG9uZSB0byB0aGUgc3RhcnQgYmVjYXVzZSB0aGUgdGVtcGxhdGUgcXVvdGVzIGFyZVxuICAgICAgICAgICAgLy8gbm90IHBhcnQgb2YgdGhlIHRlbXBsYXRlIGNvbnRlbnQuXG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZVN0YXJ0SWR4ID0gbi5pbml0aWFsaXplci5nZXRTdGFydCgpICsgMTtcbiAgICAgICAgICAgIHZpc2l0b3IoXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogc291cmNlLmZpbGVOYW1lLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IG4uaW5pdGlhbGl6ZXIudGV4dCxcbiAgICAgICAgICAgICAgICBpbmxpbmU6IHRydWUsXG4gICAgICAgICAgICAgICAgc3RhcnQ6IHRlbXBsYXRlU3RhcnRJZHgsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHRyZWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIG4ubmFtZS50ZXh0ID09PSAndGVtcGxhdGVVcmwnICYmXG4gICAgICAgICAgICB0cy5pc1N0cmluZ0xpdGVyYWxMaWtlKG4uaW5pdGlhbGl6ZXIpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJ0cyA9IG5vcm1hbGl6ZShzb3VyY2UuZmlsZU5hbWUpXG4gICAgICAgICAgICAgIC5zcGxpdCgnLycpXG4gICAgICAgICAgICAgIC5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZVBhdGggPSByZXNvbHZlKFxuICAgICAgICAgICAgICBub3JtYWxpemUocGFydHMuam9pbignLycpKSxcbiAgICAgICAgICAgICAgbm9ybWFsaXplKG4uaW5pdGlhbGl6ZXIudGV4dClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoIXRyZWUuZXhpc3RzKHRlbXBsYXRlUGF0aCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBmaWxlQ29udGVudCA9IHRyZWUucmVhZCh0ZW1wbGF0ZVBhdGgpO1xuICAgICAgICAgICAgaWYgKCFmaWxlQ29udGVudCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZpc2l0b3IoXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogdGVtcGxhdGVQYXRoLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGZpbGVDb250ZW50LnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgaW5saW5lOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdHJlZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0cy5mb3JFYWNoQ2hpbGQobiwgZmluZFRlbXBsYXRlcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdE5nTW9kdWxlSW1wb3J0cyhcbiAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSxcbiAgY2FsbGJhY2s6IChcbiAgICBpbXBvcnROb2RlOiB0cy5Qcm9wZXJ0eUFzc2lnbm1lbnQsXG4gICAgZWxlbWVudEV4cHJlc3Npb25zOiB0cy5Ob2RlQXJyYXk8dHMuRXhwcmVzc2lvbj5cbiAgKSA9PiB2b2lkXG4pIHtcbiAgdmlzaXROZ01vZHVsZVByb3BlcnR5KHNvdXJjZUZpbGUsIGNhbGxiYWNrLCAnaW1wb3J0cycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmlzaXROZ01vZHVsZUV4cG9ydHMoXG4gIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gIGNhbGxiYWNrOiAoXG4gICAgZXhwb3J0Tm9kZTogdHMuUHJvcGVydHlBc3NpZ25tZW50LFxuICAgIGVsZW1lbnRFeHByZXNzaW9uczogdHMuTm9kZUFycmF5PHRzLkV4cHJlc3Npb24+XG4gICkgPT4gdm9pZFxuKSB7XG4gIHZpc2l0TmdNb2R1bGVQcm9wZXJ0eShzb3VyY2VGaWxlLCBjYWxsYmFjaywgJ2V4cG9ydHMnKTtcbn1cblxuZnVuY3Rpb24gdmlzaXROZ01vZHVsZVByb3BlcnR5KFxuICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICBjYWxsYmFjazogKFxuICAgIG5vZGVzOiB0cy5Qcm9wZXJ0eUFzc2lnbm1lbnQsXG4gICAgZWxlbWVudEV4cHJlc3Npb25zOiB0cy5Ob2RlQXJyYXk8dHMuRXhwcmVzc2lvbj5cbiAgKSA9PiB2b2lkLFxuICBwcm9wZXJ0eTogc3RyaW5nXG4pIHtcbiAgdmlzaXROZ01vZHVsZXMoc291cmNlRmlsZSwgKF8sIGRlY29yYXRvckV4cHJlc3Npb25Ob2RlKSA9PiB7XG4gICAgdHMuZm9yRWFjaENoaWxkKGRlY29yYXRvckV4cHJlc3Npb25Ob2RlLCBmdW5jdGlvbiBmaW5kVGVtcGxhdGVzKG4pIHtcbiAgICAgIGlmIChcbiAgICAgICAgdHMuaXNQcm9wZXJ0eUFzc2lnbm1lbnQobikgJiZcbiAgICAgICAgdHMuaXNJZGVudGlmaWVyKG4ubmFtZSkgJiZcbiAgICAgICAgbi5uYW1lLnRleHQgPT09IHByb3BlcnR5ICYmXG4gICAgICAgIHRzLmlzQXJyYXlMaXRlcmFsRXhwcmVzc2lvbihuLmluaXRpYWxpemVyKVxuICAgICAgKSB7XG4gICAgICAgIGNhbGxiYWNrKG4sIG4uaW5pdGlhbGl6ZXIuZWxlbWVudHMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRzLmZvckVhY2hDaGlsZChuLCBmaW5kVGVtcGxhdGVzKTtcbiAgICB9KTtcbiAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gdmlzaXRDb21wb25lbnRzKFxuICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICBjYWxsYmFjazogKFxuICAgIGNsYXNzRGVjbGFyYXRpb25Ob2RlOiB0cy5DbGFzc0RlY2xhcmF0aW9uLFxuICAgIGRlY29yYXRvckV4cHJlc3Npb25Ob2RlOiB0cy5PYmplY3RMaXRlcmFsRXhwcmVzc2lvblxuICApID0+IHZvaWRcbikge1xuICB2aXNpdERlY29yYXRvcihzb3VyY2VGaWxlLCAnQ29tcG9uZW50JywgY2FsbGJhY2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmlzaXROZ01vZHVsZXMoXG4gIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gIGNhbGxiYWNrOiAoXG4gICAgY2xhc3NEZWNsYXJhdGlvbk5vZGU6IHRzLkNsYXNzRGVjbGFyYXRpb24sXG4gICAgZGVjb3JhdG9yRXhwcmVzc2lvbk5vZGU6IHRzLk9iamVjdExpdGVyYWxFeHByZXNzaW9uXG4gICkgPT4gdm9pZFxuKSB7XG4gIHZpc2l0RGVjb3JhdG9yKHNvdXJjZUZpbGUsICdOZ01vZHVsZScsIGNhbGxiYWNrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZpc2l0RGVjb3JhdG9yKFxuICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICBkZWNvcmF0b3JOYW1lOiBzdHJpbmcsXG4gIGNhbGxiYWNrOiAoXG4gICAgY2xhc3NEZWNsYXJhdGlvbk5vZGU6IHRzLkNsYXNzRGVjbGFyYXRpb24sXG4gICAgZGVjb3JhdG9yRXhwcmVzc2lvbk5vZGU6IHRzLk9iamVjdExpdGVyYWxFeHByZXNzaW9uXG4gICkgPT4gdm9pZFxuKSB7XG4gIHRzLmZvckVhY2hDaGlsZChzb3VyY2VGaWxlLCBmdW5jdGlvbiBmaW5kQ2xhc3NEZWNsYXJhdGlvbihub2RlKSB7XG4gICAgaWYgKCF0cy5pc0NsYXNzRGVjbGFyYXRpb24obm9kZSkpIHtcbiAgICAgIHRzLmZvckVhY2hDaGlsZChub2RlLCBmaW5kQ2xhc3NEZWNsYXJhdGlvbik7XG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NEZWNsYXJhdGlvbk5vZGUgPSBub2RlIGFzIHRzLkNsYXNzRGVjbGFyYXRpb247XG5cbiAgICBpZiAoXG4gICAgICAhY2xhc3NEZWNsYXJhdGlvbk5vZGUuZGVjb3JhdG9ycyB8fFxuICAgICAgIWNsYXNzRGVjbGFyYXRpb25Ob2RlLmRlY29yYXRvcnMubGVuZ3RoXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY29tcG9uZW50RGVjb3JhdG9yID0gY2xhc3NEZWNsYXJhdGlvbk5vZGUuZGVjb3JhdG9ycy5maW5kKGQgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdHMuaXNDYWxsRXhwcmVzc2lvbihkLmV4cHJlc3Npb24pICYmXG4gICAgICAgIHRzLmlzSWRlbnRpZmllcihkLmV4cHJlc3Npb24uZXhwcmVzc2lvbikgJiZcbiAgICAgICAgZC5leHByZXNzaW9uLmV4cHJlc3Npb24udGV4dCA9PT0gZGVjb3JhdG9yTmFtZVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGlmICghY29tcG9uZW50RGVjb3JhdG9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBleHByZXNzaW9uIH0gPSBjb21wb25lbnREZWNvcmF0b3I7XG4gICAgaWYgKCF0cy5pc0NhbGxFeHByZXNzaW9uKGV4cHJlc3Npb24pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgW2FyZ10gPSBleHByZXNzaW9uLmFyZ3VtZW50cztcbiAgICBpZiAoIXRzLmlzT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24oYXJnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKGNsYXNzRGVjbGFyYXRpb25Ob2RlLCBhcmcpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24qIHZpc2l0KGRpcmVjdG9yeTogRGlyRW50cnkpOiBJdGVyYWJsZUl0ZXJhdG9yPHRzLlNvdXJjZUZpbGU+IHtcbiAgZm9yIChjb25zdCBwYXRoIG9mIGRpcmVjdG9yeS5zdWJmaWxlcykge1xuICAgIGlmIChwYXRoLmVuZHNXaXRoKCcudHMnKSAmJiAhcGF0aC5lbmRzV2l0aCgnLmQudHMnKSkge1xuICAgICAgY29uc3QgZW50cnkgPSBkaXJlY3RvcnkuZmlsZShwYXRoKTtcbiAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gZW50cnkuY29udGVudDtcbiAgICAgICAgY29uc3Qgc291cmNlID0gdHMuY3JlYXRlU291cmNlRmlsZShcbiAgICAgICAgICBlbnRyeS5wYXRoLFxuICAgICAgICAgIGNvbnRlbnQudG9TdHJpbmcoKS5yZXBsYWNlKC9eXFx1RkVGRi8sICcnKSxcbiAgICAgICAgICB0cy5TY3JpcHRUYXJnZXQuTGF0ZXN0LFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgICAgeWllbGQgc291cmNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3QgcGF0aCBvZiBkaXJlY3Rvcnkuc3ViZGlycykge1xuICAgIGlmIChwYXRoID09PSAnbm9kZV9tb2R1bGVzJykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgeWllbGQqIHZpc2l0KGRpcmVjdG9yeS5kaXIocGF0aCkpO1xuICB9XG59XG4iXX0=