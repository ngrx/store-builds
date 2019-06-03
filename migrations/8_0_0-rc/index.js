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
        const importRemovements = findStoreFreezeImportsToRemove(sourceFile);
        if (importRemovements.length === 0) {
            return ngrxStoreFreezeIsUsed;
        }
        const usageReplacements = findStoreFreezeUsagesToRemove(sourceFile);
        const changes = [...importRemovements, ...usageReplacements];
        const recorder = schematics_core_1.createChangeRecorder(tree, sourceFile.fileName, changes);
        tree.commitUpdate(recorder);
        return true;
    }
    function insertRuntimeChecks(sourceFile, tree) {
        const runtimeChecksInserts = findRuntimeCHecksToInsert(sourceFile);
        const recorder = schematics_core_1.createChangeRecorder(tree, sourceFile.fileName, runtimeChecksInserts);
        tree.commitUpdate(recorder);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL21pZ3JhdGlvbnMvOF8wXzAtcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxpQ0FBaUM7SUFDakMsMkRBS29DO0lBQ3BDLGlFQUtxQztJQUVyQyxTQUFTLHdCQUF3QjtRQUMvQixPQUFPLENBQUMsSUFBVSxFQUFFLEVBQUU7WUFDcEIseURBQXlEO1lBQ3pELG9DQUFrQixDQUFVLElBQUksRUFBRSxZQUFZLENBQUM7Z0JBQzdDLG9DQUFrQixDQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxTQUFTLDRCQUE0QjtRQUNuQyxPQUFPLENBQUMsSUFBVSxFQUFFLEVBQUU7WUFDcEIsTUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDO1lBQ2hDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO2dCQUNuQixNQUFNLElBQUksZ0NBQW1CLENBQUMsNkJBQTZCLENBQUMsQ0FBQzthQUM5RDtZQUNELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRWhDLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDakUsTUFBTSxJQUFJLGdDQUFtQixDQUFDLDRCQUE0QixDQUFDLENBQUM7YUFDN0Q7WUFFRCxNQUFNLG9CQUFvQixHQUFHLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFFakUsb0JBQW9CLENB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TSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUU1RCxPQUFPLENBQUMsSUFBSSxDQUNWLElBQUksOEJBQVksQ0FDZCxVQUFVLENBQUMsUUFBUSxFQUNuQixZQUFZLENBQUMsTUFBTSxFQUFFLEVBQ3JCLEtBQUssYUFBYSxFQUFFLENBQ3JCLENBQ0YsQ0FBQztxQkFDSDtpQkFDRjthQUNGO1FBQ0gsQ0FBQztJQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7XG4gIFJ1bGUsXG4gIGNoYWluLFxuICBUcmVlLFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQge1xuICBjcmVhdGVDaGFuZ2VSZWNvcmRlcixcbiAgUmVtb3ZlQ2hhbmdlLFxuICBJbnNlcnRDaGFuZ2UsXG4gIHZpc2l0VFNTb3VyY2VGaWxlcyxcbn0gZnJvbSAnQG5ncngvc3RvcmUvc2NoZW1hdGljcy1jb3JlJztcblxuZnVuY3Rpb24gcmVwbGFjZVdpdGhSdW50aW1lQ2hlY2tzKCk6IFJ1bGUge1xuICByZXR1cm4gKHRyZWU6IFRyZWUpID0+IHtcbiAgICAvLyBvbmx5IGFkZCBydW50aW1lIGNoZWNrcyB3aGVuIG5ncngtc3RvcmUtZnJlZXplIGlzIHVzZWRcbiAgICB2aXNpdFRTU291cmNlRmlsZXM8Ym9vbGVhbj4odHJlZSwgcmVtb3ZlVXNhZ2VzKSAmJlxuICAgICAgdmlzaXRUU1NvdXJjZUZpbGVzKHRyZWUsIGluc2VydFJ1bnRpbWVDaGVja3MpO1xuICB9O1xufVxuXG5mdW5jdGlvbiByZW1vdmVOZ1J4U3RvcmVGcmVlemVQYWNrYWdlKCk6IFJ1bGUge1xuICByZXR1cm4gKHRyZWU6IFRyZWUpID0+IHtcbiAgICBjb25zdCBwa2dQYXRoID0gJy9wYWNrYWdlLmpzb24nO1xuICAgIGNvbnN0IGJ1ZmZlciA9IHRyZWUucmVhZChwa2dQYXRoKTtcbiAgICBpZiAoYnVmZmVyID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbignQ291bGQgbm90IHJlYWQgcGFja2FnZS5qc29uJyk7XG4gICAgfVxuICAgIGNvbnN0IGNvbnRlbnQgPSBidWZmZXIudG9TdHJpbmcoKTtcbiAgICBjb25zdCBwa2cgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuXG4gICAgaWYgKHBrZyA9PT0gbnVsbCB8fCB0eXBlb2YgcGtnICE9PSAnb2JqZWN0JyB8fCBBcnJheS5pc0FycmF5KHBrZykpIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKCdFcnJvciByZWFkaW5nIHBhY2thZ2UuanNvbicpO1xuICAgIH1cblxuICAgIGNvbnN0IGRlcGVuZGVuY3lDYXRlZ29yaWVzID0gWydkZXBlbmRlbmNpZXMnLCAnZGV2RGVwZW5kZW5jaWVzJ107XG5cbiAgICBkZXBlbmRlbmN5Q2F0ZWdvcmllcy5mb3JFYWNoKGNhdGVnb3J5ID0+IHtcbiAgICAgIGlmIChwa2dbY2F0ZWdvcnldICYmIHBrZ1tjYXRlZ29yeV1bJ25ncngtc3RvcmUtZnJlZXplJ10pIHtcbiAgICAgICAgZGVsZXRlIHBrZ1tjYXRlZ29yeV1bJ25ncngtc3RvcmUtZnJlZXplJ107XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0cmVlLm92ZXJ3cml0ZShwa2dQYXRoLCBKU09OLnN0cmluZ2lmeShwa2csIG51bGwsIDIpKTtcbiAgICByZXR1cm4gdHJlZTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKTogUnVsZSB7XG4gIHJldHVybiBjaGFpbihbcmVtb3ZlTmdSeFN0b3JlRnJlZXplUGFja2FnZSgpLCByZXBsYWNlV2l0aFJ1bnRpbWVDaGVja3MoKV0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVVc2FnZXMoXG4gIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gIHRyZWU6IFRyZWUsXG4gIG5ncnhTdG9yZUZyZWV6ZUlzVXNlZD86IGJvb2xlYW5cbikge1xuICBjb25zdCBpbXBvcnRSZW1vdmVtZW50cyA9IGZpbmRTdG9yZUZyZWV6ZUltcG9ydHNUb1JlbW92ZShzb3VyY2VGaWxlKTtcbiAgaWYgKGltcG9ydFJlbW92ZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBuZ3J4U3RvcmVGcmVlemVJc1VzZWQ7XG4gIH1cblxuICBjb25zdCB1c2FnZVJlcGxhY2VtZW50cyA9IGZpbmRTdG9yZUZyZWV6ZVVzYWdlc1RvUmVtb3ZlKHNvdXJjZUZpbGUpO1xuXG4gIGNvbnN0IGNoYW5nZXMgPSBbLi4uaW1wb3J0UmVtb3ZlbWVudHMsIC4uLnVzYWdlUmVwbGFjZW1lbnRzXTtcbiAgY29uc3QgcmVjb3JkZXIgPSBjcmVhdGVDaGFuZ2VSZWNvcmRlcih0cmVlLCBzb3VyY2VGaWxlLmZpbGVOYW1lLCBjaGFuZ2VzKTtcbiAgdHJlZS5jb21taXRVcGRhdGUocmVjb3JkZXIpO1xuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRSdW50aW1lQ2hlY2tzKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsIHRyZWU6IFRyZWUpIHtcbiAgY29uc3QgcnVudGltZUNoZWNrc0luc2VydHMgPSBmaW5kUnVudGltZUNIZWNrc1RvSW5zZXJ0KHNvdXJjZUZpbGUpO1xuICBjb25zdCByZWNvcmRlciA9IGNyZWF0ZUNoYW5nZVJlY29yZGVyKFxuICAgIHRyZWUsXG4gICAgc291cmNlRmlsZS5maWxlTmFtZSxcbiAgICBydW50aW1lQ2hlY2tzSW5zZXJ0c1xuICApO1xuICB0cmVlLmNvbW1pdFVwZGF0ZShyZWNvcmRlcik7XG59XG5cbmZ1bmN0aW9uIGZpbmRTdG9yZUZyZWV6ZUltcG9ydHNUb1JlbW92ZShzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlKSB7XG4gIGNvbnN0IGltcG9ydHMgPSBzb3VyY2VGaWxlLnN0YXRlbWVudHNcbiAgICAuZmlsdGVyKHRzLmlzSW1wb3J0RGVjbGFyYXRpb24pXG4gICAgLmZpbHRlcigoeyBtb2R1bGVTcGVjaWZpZXIgfSkgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgbW9kdWxlU3BlY2lmaWVyLmdldFRleHQoc291cmNlRmlsZSkgPT09IGAnbmdyeC1zdG9yZS1mcmVlemUnYCB8fFxuICAgICAgICBtb2R1bGVTcGVjaWZpZXIuZ2V0VGV4dChzb3VyY2VGaWxlKSA9PT0gYFwibmdyeC1zdG9yZS1mcmVlemVcImBcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgY29uc3QgcmVtb3ZlbWVudHMgPSBpbXBvcnRzLm1hcChcbiAgICBpID0+XG4gICAgICBuZXcgUmVtb3ZlQ2hhbmdlKHNvdXJjZUZpbGUuZmlsZU5hbWUsIGkuZ2V0U3RhcnQoc291cmNlRmlsZSksIGkuZ2V0RW5kKCkpXG4gICk7XG4gIHJldHVybiByZW1vdmVtZW50cztcbn1cblxuZnVuY3Rpb24gZmluZFN0b3JlRnJlZXplVXNhZ2VzVG9SZW1vdmUoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSkge1xuICBsZXQgY2hhbmdlczogKFJlbW92ZUNoYW5nZSB8IEluc2VydENoYW5nZSlbXSA9IFtdO1xuICB0cy5mb3JFYWNoQ2hpbGQoc291cmNlRmlsZSwgY3Jhd2wpO1xuICByZXR1cm4gY2hhbmdlcztcblxuICBmdW5jdGlvbiBjcmF3bChub2RlOiB0cy5Ob2RlKSB7XG4gICAgdHMuZm9yRWFjaENoaWxkKG5vZGUsIGNyYXdsKTtcblxuICAgIGlmICghdHMuaXNBcnJheUxpdGVyYWxFeHByZXNzaW9uKG5vZGUpKSByZXR1cm47XG5cbiAgICBjb25zdCBlbGVtZW50cyA9IG5vZGUuZWxlbWVudHMubWFwKGVsZW0gPT4gZWxlbS5nZXRUZXh0KHNvdXJjZUZpbGUpKTtcbiAgICBjb25zdCBlbGVtZW50c1dpdGhvdXRTdG9yZUZyZWV6ZSA9IGVsZW1lbnRzLmZpbHRlcihcbiAgICAgIGVsZW1UZXh0ID0+IGVsZW1UZXh0ICE9PSAnc3RvcmVGcmVlemUnXG4gICAgKTtcblxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggIT09IGVsZW1lbnRzV2l0aG91dFN0b3JlRnJlZXplLmxlbmd0aCkge1xuICAgICAgY2hhbmdlcy5wdXNoKFxuICAgICAgICBuZXcgUmVtb3ZlQ2hhbmdlKFxuICAgICAgICAgIHNvdXJjZUZpbGUuZmlsZU5hbWUsXG4gICAgICAgICAgbm9kZS5nZXRTdGFydChzb3VyY2VGaWxlKSxcbiAgICAgICAgICBub2RlLmdldEVuZCgpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBjaGFuZ2VzLnB1c2goXG4gICAgICAgIG5ldyBJbnNlcnRDaGFuZ2UoXG4gICAgICAgICAgc291cmNlRmlsZS5maWxlTmFtZSxcbiAgICAgICAgICBub2RlLmdldFN0YXJ0KHNvdXJjZUZpbGUpLFxuICAgICAgICAgIGBbJHtlbGVtZW50c1dpdGhvdXRTdG9yZUZyZWV6ZS5qb2luKCcsICcpfV1gXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRSdW50aW1lQ0hlY2tzVG9JbnNlcnQoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSkge1xuICBsZXQgY2hhbmdlczogKEluc2VydENoYW5nZSlbXSA9IFtdO1xuICB0cy5mb3JFYWNoQ2hpbGQoc291cmNlRmlsZSwgY3Jhd2wpO1xuICByZXR1cm4gY2hhbmdlcztcblxuICBmdW5jdGlvbiBjcmF3bChub2RlOiB0cy5Ob2RlKSB7XG4gICAgdHMuZm9yRWFjaENoaWxkKG5vZGUsIGNyYXdsKTtcblxuICAgIGlmICghdHMuaXNDYWxsRXhwcmVzc2lvbihub2RlKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgZXhwcmVzc2lvbiA9IG5vZGUuZXhwcmVzc2lvbjtcbiAgICBpZiAoXG4gICAgICAhKFxuICAgICAgICB0cy5pc1Byb3BlcnR5QWNjZXNzRXhwcmVzc2lvbihleHByZXNzaW9uKSAmJlxuICAgICAgICBleHByZXNzaW9uLmV4cHJlc3Npb24uZ2V0VGV4dChzb3VyY2VGaWxlKSA9PT0gJ1N0b3JlTW9kdWxlJyAmJlxuICAgICAgICBleHByZXNzaW9uLm5hbWUuZ2V0VGV4dChzb3VyY2VGaWxlKSA9PT0gJ2ZvclJvb3QnXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcnVudGltZUNoZWNrcyA9IGBydW50aW1lQ2hlY2tzOiB7IHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5OiB0cnVlLCBzdHJpY3RBY3Rpb25JbW11dGFiaWxpdHk6IHRydWUgfWA7XG5cbiAgICAvLyBjb3ZlcnMgU3RvcmVNb2R1bGUuZm9yUm9vdChST09UX1JFRFVDRVJTKVxuICAgIGlmIChub2RlLmFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNoYW5nZXMucHVzaChcbiAgICAgICAgbmV3IEluc2VydENoYW5nZShcbiAgICAgICAgICBzb3VyY2VGaWxlLmZpbGVOYW1lLFxuICAgICAgICAgIG5vZGUuYXJndW1lbnRzWzBdLmdldEVuZCgpLFxuICAgICAgICAgIGAsIHsgJHtydW50aW1lQ2hlY2tzfX1gXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChub2RlLmFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIGNvbnN0IHN0b3JlQ29uZmlnID0gbm9kZS5hcmd1bWVudHNbMV07XG4gICAgICBpZiAodHMuaXNPYmplY3RMaXRlcmFsRXhwcmVzc2lvbihzdG9yZUNvbmZpZykpIHtcbiAgICAgICAgLy8gY292ZXJzIFN0b3JlTW9kdWxlLmZvclJvb3QoUk9PVF9SRURVQ0VSUywge30pXG4gICAgICAgIGlmIChzdG9yZUNvbmZpZy5wcm9wZXJ0aWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGNoYW5nZXMucHVzaChcbiAgICAgICAgICAgIG5ldyBJbnNlcnRDaGFuZ2UoXG4gICAgICAgICAgICAgIHNvdXJjZUZpbGUuZmlsZU5hbWUsXG4gICAgICAgICAgICAgIHN0b3JlQ29uZmlnLmdldEVuZCgpIC0gMSxcbiAgICAgICAgICAgICAgYCR7cnVudGltZUNoZWNrc30gYFxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gY292ZXJzIFN0b3JlTW9kdWxlLmZvclJvb3QoUk9PVF9SRURVQ0VSUywgeyBtZXRhUmVkdWNlcnMgfSlcbiAgICAgICAgICBjb25zdCBsYXN0UHJvcGVydHkgPVxuICAgICAgICAgICAgc3RvcmVDb25maWcucHJvcGVydGllc1tzdG9yZUNvbmZpZy5wcm9wZXJ0aWVzLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgICAgY2hhbmdlcy5wdXNoKFxuICAgICAgICAgICAgbmV3IEluc2VydENoYW5nZShcbiAgICAgICAgICAgICAgc291cmNlRmlsZS5maWxlTmFtZSxcbiAgICAgICAgICAgICAgbGFzdFByb3BlcnR5LmdldEVuZCgpLFxuICAgICAgICAgICAgICBgLCAke3J1bnRpbWVDaGVja3N9YFxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==