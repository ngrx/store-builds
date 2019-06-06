(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/migrations/8_0_0-rc/index", ["require", "exports", "typescript", "@angular-devkit/schematics", "@ngrx/store/schematics-core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    const schematics_1 = require("@angular-devkit/schematics");
    const schematics_core_1 = require("@ngrx/store/schematics-core");
    function replaceWithRuntimeChecks() {
        return (tree) => {
            // only add runtime checks when ngrx-store-freeze is used
            schematics_core_1.visitTSSourceFiles(tree, removeUsages) &&
                schematics_core_1.visitTSSourceFiles(tree, insertRuntimeChecks);
        };
    }
    function removeNgRxStoreFreezePackage() {
        return (tree) => {
            const pkgPath = '/package.json';
            const buffer = tree.read(pkgPath);
            if (buffer === null) {
                throw new schematics_1.SchematicsException('Could not read package.json');
            }
            const content = buffer.toString();
            const pkg = JSON.parse(content);
            if (pkg === null || typeof pkg !== 'object' || Array.isArray(pkg)) {
                throw new schematics_1.SchematicsException('Error reading package.json');
            }
            const dependencyCategories = ['dependencies', 'devDependencies'];
            dependencyCategories.forEach(category => {
                if (pkg[category] && pkg[category]['ngrx-store-freeze']) {
                    delete pkg[category]['ngrx-store-freeze'];
                }
            });
            tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
            return tree;
        };
    }
    function default_1() {
        return schematics_1.chain([removeNgRxStoreFreezePackage(), replaceWithRuntimeChecks()]);
    }
    exports.default = default_1;
    function removeUsages(sourceFile, tree, ngrxStoreFreezeIsUsed) {
        if (sourceFile.fileName.endsWith('.spec.ts') ||
            sourceFile.fileName.endsWith('.test.ts')) {
            return ngrxStoreFreezeIsUsed;
        }
        const importRemovements = findStoreFreezeImportsToRemove(sourceFile);
        if (importRemovements.length === 0) {
            return ngrxStoreFreezeIsUsed;
        }
        const usageReplacements = findStoreFreezeUsagesToRemove(sourceFile);
        const changes = [...importRemovements, ...usageReplacements];
        return schematics_core_1.commitChanges(tree, sourceFile.fileName, changes);
    }
    function insertRuntimeChecks(sourceFile, tree) {
        if (sourceFile.fileName.endsWith('.spec.ts') ||
            sourceFile.fileName.endsWith('.test.ts')) {
            return;
        }
        const changes = findRuntimeCHecksToInsert(sourceFile);
        return schematics_core_1.commitChanges(tree, sourceFile.fileName, changes);
    }
    function findStoreFreezeImportsToRemove(sourceFile) {
        const imports = sourceFile.statements
            .filter(ts.isImportDeclaration)
            .filter(({ moduleSpecifier }) => {
            return (moduleSpecifier.getText(sourceFile) === `'ngrx-store-freeze'` ||
                moduleSpecifier.getText(sourceFile) === `"ngrx-store-freeze"`);
        });
        const removements = imports.map(i => new schematics_core_1.RemoveChange(sourceFile.fileName, i.getStart(sourceFile), i.getEnd()));
        return removements;
    }
    function findStoreFreezeUsagesToRemove(sourceFile) {
        let changes = [];
        ts.forEachChild(sourceFile, crawl);
        return changes;
        function crawl(node) {
            ts.forEachChild(node, crawl);
            if (!ts.isArrayLiteralExpression(node))
                return;
            const elements = node.elements.map(elem => elem.getText(sourceFile));
            const elementsWithoutStoreFreeze = elements.filter(elemText => elemText !== 'storeFreeze');
            if (elements.length !== elementsWithoutStoreFreeze.length) {
                changes.push(new schematics_core_1.RemoveChange(sourceFile.fileName, node.getStart(sourceFile), node.getEnd()));
                changes.push(new schematics_core_1.InsertChange(sourceFile.fileName, node.getStart(sourceFile), `[${elementsWithoutStoreFreeze.join(', ')}]`));
            }
        }
    }
    function findRuntimeCHecksToInsert(sourceFile) {
        let changes = [];
        ts.forEachChild(sourceFile, crawl);
        return changes;
        function crawl(node) {
            ts.forEachChild(node, crawl);
            if (!ts.isCallExpression(node))
                return;
            const expression = node.expression;
            if (!(ts.isPropertyAccessExpression(expression) &&
                expression.expression.getText(sourceFile) === 'StoreModule' &&
                expression.name.getText(sourceFile) === 'forRoot')) {
                return;
            }
            const runtimeChecks = `runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true }`;
            // covers StoreModule.forRoot(ROOT_REDUCERS)
            if (node.arguments.length === 1) {
                changes.push(new schematics_core_1.InsertChange(sourceFile.fileName, node.arguments[0].getEnd(), `, { ${runtimeChecks}}`));
            }
            else if (node.arguments.length === 2) {
                const storeConfig = node.arguments[1];
                if (ts.isObjectLiteralExpression(storeConfig)) {
                    // covers StoreModule.forRoot(ROOT_REDUCERS, {})
                    if (storeConfig.properties.length === 0) {
                        changes.push(new schematics_core_1.InsertChange(sourceFile.fileName, storeConfig.getEnd() - 1, `${runtimeChecks} `));
                    }
                    else {
                        // covers StoreModule.forRoot(ROOT_REDUCERS, { metaReducers })
                        const lastProperty = storeConfig.properties[storeConfig.properties.length - 1];
                        changes.push(new schematics_core_1.InsertChange(sourceFile.fileName, lastProperty.getEnd(), `, ${runtimeChecks}`));
                    }
                }
            }
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL21pZ3JhdGlvbnMvOF8wXzAtcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxpQ0FBaUM7SUFDakMsMkRBS29DO0lBQ3BDLGlFQUtxQztJQUVyQyxTQUFTLHdCQUF3QjtRQUMvQixPQUFPLENBQUMsSUFBVSxFQUFFLEVBQUU7WUFDcEIseURBQXlEO1lBQ3pELG9DQUFrQixDQUFVLElBQUksRUFBRSxZQUFZLENBQUM7Z0JBQzdDLG9DQUFrQixDQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxTQUFTLDRCQUE0QjtRQUNuQyxPQUFPLENBQUMsSUFBVSxFQUFFLEVBQUU7WUFDcEIsTUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDO1lBQ2hDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO2dCQUNuQixNQUFNLElBQUksZ0NBQW1CLENBQUMsNkJBQTZCLENBQUMsQ0FBQzthQUM5RDtZQUNELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRWhDLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDakUsTUFBTSxJQUFJLGdDQUFtQixDQUFDLDRCQUE0QixDQUFDLENBQUM7YUFDN0Q7WUFFRCxNQUFNLG9CQUFvQixHQUFHLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFFakUsb0JBQW9CLENB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YUFBYSxHQUFHLENBQ3BCLENBQ0YsQ0FBQztxQkFDSDt5QkFBTTt3QkFDTCw4REFBOEQ7d0JBQzlELE1BQU0sWUFBWSxHQUNoQixXQUFXLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUU1RCxPQUFPLENBQUMsSUFBSSxDQUNWLElBQUksOEJBQVksQ0FDZCxVQUFVLENBQUMsUUFBUSxFQUNuQixZQUFZLENBQUMsTUFBTSxFQUFFLEVBQ3JCLEtBQUssYUFBYSxFQUFFLENBQ3JCLENBQ0YsQ0FBQztxQkFDSDtpQkFDRjthQUNGO1FBQ0gsQ0FBQztJQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7XG4gIFJ1bGUsXG4gIGNoYWluLFxuICBUcmVlLFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQge1xuICBSZW1vdmVDaGFuZ2UsXG4gIEluc2VydENoYW5nZSxcbiAgdmlzaXRUU1NvdXJjZUZpbGVzLFxuICBjb21taXRDaGFuZ2VzLFxufSBmcm9tICdAbmdyeC9zdG9yZS9zY2hlbWF0aWNzLWNvcmUnO1xuXG5mdW5jdGlvbiByZXBsYWNlV2l0aFJ1bnRpbWVDaGVja3MoKTogUnVsZSB7XG4gIHJldHVybiAodHJlZTogVHJlZSkgPT4ge1xuICAgIC8vIG9ubHkgYWRkIHJ1bnRpbWUgY2hlY2tzIHdoZW4gbmdyeC1zdG9yZS1mcmVlemUgaXMgdXNlZFxuICAgIHZpc2l0VFNTb3VyY2VGaWxlczxib29sZWFuPih0cmVlLCByZW1vdmVVc2FnZXMpICYmXG4gICAgICB2aXNpdFRTU291cmNlRmlsZXModHJlZSwgaW5zZXJ0UnVudGltZUNoZWNrcyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU5nUnhTdG9yZUZyZWV6ZVBhY2thZ2UoKTogUnVsZSB7XG4gIHJldHVybiAodHJlZTogVHJlZSkgPT4ge1xuICAgIGNvbnN0IHBrZ1BhdGggPSAnL3BhY2thZ2UuanNvbic7XG4gICAgY29uc3QgYnVmZmVyID0gdHJlZS5yZWFkKHBrZ1BhdGgpO1xuICAgIGlmIChidWZmZXIgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKCdDb3VsZCBub3QgcmVhZCBwYWNrYWdlLmpzb24nKTtcbiAgICB9XG4gICAgY29uc3QgY29udGVudCA9IGJ1ZmZlci50b1N0cmluZygpO1xuICAgIGNvbnN0IHBrZyA9IEpTT04ucGFyc2UoY29udGVudCk7XG5cbiAgICBpZiAocGtnID09PSBudWxsIHx8IHR5cGVvZiBwa2cgIT09ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkocGtnKSkge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oJ0Vycm9yIHJlYWRpbmcgcGFja2FnZS5qc29uJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZGVwZW5kZW5jeUNhdGVnb3JpZXMgPSBbJ2RlcGVuZGVuY2llcycsICdkZXZEZXBlbmRlbmNpZXMnXTtcblxuICAgIGRlcGVuZGVuY3lDYXRlZ29yaWVzLmZvckVhY2goY2F0ZWdvcnkgPT4ge1xuICAgICAgaWYgKHBrZ1tjYXRlZ29yeV0gJiYgcGtnW2NhdGVnb3J5XVsnbmdyeC1zdG9yZS1mcmVlemUnXSkge1xuICAgICAgICBkZWxldGUgcGtnW2NhdGVnb3J5XVsnbmdyeC1zdG9yZS1mcmVlemUnXTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRyZWUub3ZlcndyaXRlKHBrZ1BhdGgsIEpTT04uc3RyaW5naWZ5KHBrZywgbnVsbCwgMikpO1xuICAgIHJldHVybiB0cmVlO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpOiBSdWxlIHtcbiAgcmV0dXJuIGNoYWluKFtyZW1vdmVOZ1J4U3RvcmVGcmVlemVQYWNrYWdlKCksIHJlcGxhY2VXaXRoUnVudGltZUNoZWNrcygpXSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVVzYWdlcyhcbiAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSxcbiAgdHJlZTogVHJlZSxcbiAgbmdyeFN0b3JlRnJlZXplSXNVc2VkPzogYm9vbGVhblxuKSB7XG4gIGlmIChcbiAgICBzb3VyY2VGaWxlLmZpbGVOYW1lLmVuZHNXaXRoKCcuc3BlYy50cycpIHx8XG4gICAgc291cmNlRmlsZS5maWxlTmFtZS5lbmRzV2l0aCgnLnRlc3QudHMnKVxuICApIHtcbiAgICByZXR1cm4gbmdyeFN0b3JlRnJlZXplSXNVc2VkO1xuICB9XG5cbiAgY29uc3QgaW1wb3J0UmVtb3ZlbWVudHMgPSBmaW5kU3RvcmVGcmVlemVJbXBvcnRzVG9SZW1vdmUoc291cmNlRmlsZSk7XG4gIGlmIChpbXBvcnRSZW1vdmVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbmdyeFN0b3JlRnJlZXplSXNVc2VkO1xuICB9XG5cbiAgY29uc3QgdXNhZ2VSZXBsYWNlbWVudHMgPSBmaW5kU3RvcmVGcmVlemVVc2FnZXNUb1JlbW92ZShzb3VyY2VGaWxlKTtcbiAgY29uc3QgY2hhbmdlcyA9IFsuLi5pbXBvcnRSZW1vdmVtZW50cywgLi4udXNhZ2VSZXBsYWNlbWVudHNdO1xuICByZXR1cm4gY29tbWl0Q2hhbmdlcyh0cmVlLCBzb3VyY2VGaWxlLmZpbGVOYW1lLCBjaGFuZ2VzKTtcbn1cblxuZnVuY3Rpb24gaW5zZXJ0UnVudGltZUNoZWNrcyhzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLCB0cmVlOiBUcmVlKSB7XG4gIGlmIChcbiAgICBzb3VyY2VGaWxlLmZpbGVOYW1lLmVuZHNXaXRoKCcuc3BlYy50cycpIHx8XG4gICAgc291cmNlRmlsZS5maWxlTmFtZS5lbmRzV2l0aCgnLnRlc3QudHMnKVxuICApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBjaGFuZ2VzID0gZmluZFJ1bnRpbWVDSGVja3NUb0luc2VydChzb3VyY2VGaWxlKTtcbiAgcmV0dXJuIGNvbW1pdENoYW5nZXModHJlZSwgc291cmNlRmlsZS5maWxlTmFtZSwgY2hhbmdlcyk7XG59XG5cbmZ1bmN0aW9uIGZpbmRTdG9yZUZyZWV6ZUltcG9ydHNUb1JlbW92ZShzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlKSB7XG4gIGNvbnN0IGltcG9ydHMgPSBzb3VyY2VGaWxlLnN0YXRlbWVudHNcbiAgICAuZmlsdGVyKHRzLmlzSW1wb3J0RGVjbGFyYXRpb24pXG4gICAgLmZpbHRlcigoeyBtb2R1bGVTcGVjaWZpZXIgfSkgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgbW9kdWxlU3BlY2lmaWVyLmdldFRleHQoc291cmNlRmlsZSkgPT09IGAnbmdyeC1zdG9yZS1mcmVlemUnYCB8fFxuICAgICAgICBtb2R1bGVTcGVjaWZpZXIuZ2V0VGV4dChzb3VyY2VGaWxlKSA9PT0gYFwibmdyeC1zdG9yZS1mcmVlemVcImBcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgY29uc3QgcmVtb3ZlbWVudHMgPSBpbXBvcnRzLm1hcChcbiAgICBpID0+XG4gICAgICBuZXcgUmVtb3ZlQ2hhbmdlKHNvdXJjZUZpbGUuZmlsZU5hbWUsIGkuZ2V0U3RhcnQoc291cmNlRmlsZSksIGkuZ2V0RW5kKCkpXG4gICk7XG4gIHJldHVybiByZW1vdmVtZW50cztcbn1cblxuZnVuY3Rpb24gZmluZFN0b3JlRnJlZXplVXNhZ2VzVG9SZW1vdmUoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSkge1xuICBsZXQgY2hhbmdlczogKFJlbW92ZUNoYW5nZSB8IEluc2VydENoYW5nZSlbXSA9IFtdO1xuICB0cy5mb3JFYWNoQ2hpbGQoc291cmNlRmlsZSwgY3Jhd2wpO1xuICByZXR1cm4gY2hhbmdlcztcblxuICBmdW5jdGlvbiBjcmF3bChub2RlOiB0cy5Ob2RlKSB7XG4gICAgdHMuZm9yRWFjaENoaWxkKG5vZGUsIGNyYXdsKTtcblxuICAgIGlmICghdHMuaXNBcnJheUxpdGVyYWxFeHByZXNzaW9uKG5vZGUpKSByZXR1cm47XG5cbiAgICBjb25zdCBlbGVtZW50cyA9IG5vZGUuZWxlbWVudHMubWFwKGVsZW0gPT4gZWxlbS5nZXRUZXh0KHNvdXJjZUZpbGUpKTtcbiAgICBjb25zdCBlbGVtZW50c1dpdGhvdXRTdG9yZUZyZWV6ZSA9IGVsZW1lbnRzLmZpbHRlcihcbiAgICAgIGVsZW1UZXh0ID0+IGVsZW1UZXh0ICE9PSAnc3RvcmVGcmVlemUnXG4gICAgKTtcblxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggIT09IGVsZW1lbnRzV2l0aG91dFN0b3JlRnJlZXplLmxlbmd0aCkge1xuICAgICAgY2hhbmdlcy5wdXNoKFxuICAgICAgICBuZXcgUmVtb3ZlQ2hhbmdlKFxuICAgICAgICAgIHNvdXJjZUZpbGUuZmlsZU5hbWUsXG4gICAgICAgICAgbm9kZS5nZXRTdGFydChzb3VyY2VGaWxlKSxcbiAgICAgICAgICBub2RlLmdldEVuZCgpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBjaGFuZ2VzLnB1c2goXG4gICAgICAgIG5ldyBJbnNlcnRDaGFuZ2UoXG4gICAgICAgICAgc291cmNlRmlsZS5maWxlTmFtZSxcbiAgICAgICAgICBub2RlLmdldFN0YXJ0KHNvdXJjZUZpbGUpLFxuICAgICAgICAgIGBbJHtlbGVtZW50c1dpdGhvdXRTdG9yZUZyZWV6ZS5qb2luKCcsICcpfV1gXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRSdW50aW1lQ0hlY2tzVG9JbnNlcnQoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSkge1xuICBsZXQgY2hhbmdlczogKEluc2VydENoYW5nZSlbXSA9IFtdO1xuICB0cy5mb3JFYWNoQ2hpbGQoc291cmNlRmlsZSwgY3Jhd2wpO1xuICByZXR1cm4gY2hhbmdlcztcblxuICBmdW5jdGlvbiBjcmF3bChub2RlOiB0cy5Ob2RlKSB7XG4gICAgdHMuZm9yRWFjaENoaWxkKG5vZGUsIGNyYXdsKTtcblxuICAgIGlmICghdHMuaXNDYWxsRXhwcmVzc2lvbihub2RlKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgZXhwcmVzc2lvbiA9IG5vZGUuZXhwcmVzc2lvbjtcbiAgICBpZiAoXG4gICAgICAhKFxuICAgICAgICB0cy5pc1Byb3BlcnR5QWNjZXNzRXhwcmVzc2lvbihleHByZXNzaW9uKSAmJlxuICAgICAgICBleHByZXNzaW9uLmV4cHJlc3Npb24uZ2V0VGV4dChzb3VyY2VGaWxlKSA9PT0gJ1N0b3JlTW9kdWxlJyAmJlxuICAgICAgICBleHByZXNzaW9uLm5hbWUuZ2V0VGV4dChzb3VyY2VGaWxlKSA9PT0gJ2ZvclJvb3QnXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcnVudGltZUNoZWNrcyA9IGBydW50aW1lQ2hlY2tzOiB7IHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5OiB0cnVlLCBzdHJpY3RBY3Rpb25JbW11dGFiaWxpdHk6IHRydWUgfWA7XG5cbiAgICAvLyBjb3ZlcnMgU3RvcmVNb2R1bGUuZm9yUm9vdChST09UX1JFRFVDRVJTKVxuICAgIGlmIChub2RlLmFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNoYW5nZXMucHVzaChcbiAgICAgICAgbmV3IEluc2VydENoYW5nZShcbiAgICAgICAgICBzb3VyY2VGaWxlLmZpbGVOYW1lLFxuICAgICAgICAgIG5vZGUuYXJndW1lbnRzWzBdLmdldEVuZCgpLFxuICAgICAgICAgIGAsIHsgJHtydW50aW1lQ2hlY2tzfX1gXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChub2RlLmFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIGNvbnN0IHN0b3JlQ29uZmlnID0gbm9kZS5hcmd1bWVudHNbMV07XG4gICAgICBpZiAodHMuaXNPYmplY3RMaXRlcmFsRXhwcmVzc2lvbihzdG9yZUNvbmZpZykpIHtcbiAgICAgICAgLy8gY292ZXJzIFN0b3JlTW9kdWxlLmZvclJvb3QoUk9PVF9SRURVQ0VSUywge30pXG4gICAgICAgIGlmIChzdG9yZUNvbmZpZy5wcm9wZXJ0aWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGNoYW5nZXMucHVzaChcbiAgICAgICAgICAgIG5ldyBJbnNlcnRDaGFuZ2UoXG4gICAgICAgICAgICAgIHNvdXJjZUZpbGUuZmlsZU5hbWUsXG4gICAgICAgICAgICAgIHN0b3JlQ29uZmlnLmdldEVuZCgpIC0gMSxcbiAgICAgICAgICAgICAgYCR7cnVudGltZUNoZWNrc30gYFxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gY292ZXJzIFN0b3JlTW9kdWxlLmZvclJvb3QoUk9PVF9SRURVQ0VSUywgeyBtZXRhUmVkdWNlcnMgfSlcbiAgICAgICAgICBjb25zdCBsYXN0UHJvcGVydHkgPVxuICAgICAgICAgICAgc3RvcmVDb25maWcucHJvcGVydGllc1tzdG9yZUNvbmZpZy5wcm9wZXJ0aWVzLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgICAgY2hhbmdlcy5wdXNoKFxuICAgICAgICAgICAgbmV3IEluc2VydENoYW5nZShcbiAgICAgICAgICAgICAgc291cmNlRmlsZS5maWxlTmFtZSxcbiAgICAgICAgICAgICAgbGFzdFByb3BlcnR5LmdldEVuZCgpLFxuICAgICAgICAgICAgICBgLCAke3J1bnRpbWVDaGVja3N9YFxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==