(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core/utility/ast-utils", ["require", "exports", "typescript", "@ngrx/store/schematics-core/utility/change"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /* istanbul ignore file */
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const ts = require("typescript");
    const change_1 = require("@ngrx/store/schematics-core/utility/change");
    /**
     * Find all nodes from the AST in the subtree of node of SyntaxKind kind.
     * @param node
     * @param kind
     * @param max The maximum number of items to return.
     * @return all nodes of kind, or [] if none is found
     */
    function findNodes(node, kind, max = Infinity) {
        if (!node || max == 0) {
            return [];
        }
        const arr = [];
        if (node.kind === kind) {
            arr.push(node);
            max--;
        }
        if (max > 0) {
            for (const child of node.getChildren()) {
                findNodes(child, kind, max).forEach(node => {
                    if (max > 0) {
                        arr.push(node);
                    }
                    max--;
                });
                if (max <= 0) {
                    break;
                }
            }
        }
        return arr;
    }
    exports.findNodes = findNodes;
    /**
     * Get all the nodes from a source.
     * @param sourceFile The source file object.
     * @returns {Observable<ts.Node>} An observable of all the nodes in the source.
     */
    function getSourceNodes(sourceFile) {
        const nodes = [sourceFile];
        const result = [];
        while (nodes.length > 0) {
            const node = nodes.shift();
            if (node) {
                result.push(node);
                if (node.getChildCount(sourceFile) >= 0) {
                    nodes.unshift(...node.getChildren());
                }
            }
        }
        return result;
    }
    exports.getSourceNodes = getSourceNodes;
    /**
     * Helper for sorting nodes.
     * @return function to sort nodes in increasing order of position in sourceFile
     */
    function nodesByPosition(first, second) {
        return first.pos - second.pos;
    }
    /**
     * Insert `toInsert` after the last occurence of `ts.SyntaxKind[nodes[i].kind]`
     * or after the last of occurence of `syntaxKind` if the last occurence is a sub child
     * of ts.SyntaxKind[nodes[i].kind] and save the changes in file.
     *
     * @param nodes insert after the last occurence of nodes
     * @param toInsert string to insert
     * @param file file to insert changes into
     * @param fallbackPos position to insert if toInsert happens to be the first occurence
     * @param syntaxKind the ts.SyntaxKind of the subchildren to insert after
     * @return Change instance
     * @throw Error if toInsert is first occurence but fall back is not set
     */
    function insertAfterLastOccurrence(nodes, toInsert, file, fallbackPos, syntaxKind) {
        let lastItem = nodes.sort(nodesByPosition).pop();
        if (!lastItem) {
            throw new Error();
        }
        if (syntaxKind) {
            lastItem = findNodes(lastItem, syntaxKind)
                .sort(nodesByPosition)
                .pop();
        }
        if (!lastItem && fallbackPos == undefined) {
            throw new Error(`tried to insert ${toInsert} as first occurence with no fallback position`);
        }
        const lastItemPosition = lastItem ? lastItem.end : fallbackPos;
        return new change_1.InsertChange(file, lastItemPosition, toInsert);
    }
    exports.insertAfterLastOccurrence = insertAfterLastOccurrence;
    function getContentOfKeyLiteral(_source, node) {
        if (node.kind == ts.SyntaxKind.Identifier) {
            return node.text;
        }
        else if (node.kind == ts.SyntaxKind.StringLiteral) {
            return node.text;
        }
        else {
            return null;
        }
    }
    exports.getContentOfKeyLiteral = getContentOfKeyLiteral;
    function _angularImportsFromNode(node, _sourceFile) {
        const ms = node.moduleSpecifier;
        let modulePath;
        switch (ms.kind) {
            case ts.SyntaxKind.StringLiteral:
                modulePath = ms.text;
                break;
            default:
                return {};
        }
        if (!modulePath.startsWith('@angular/')) {
            return {};
        }
        if (node.importClause) {
            if (node.importClause.name) {
                // This is of the form `import Name from 'path'`. Ignore.
                return {};
            }
            else if (node.importClause.namedBindings) {
                const nb = node.importClause.namedBindings;
                if (nb.kind == ts.SyntaxKind.NamespaceImport) {
                    // This is of the form `import * as name from 'path'`. Return `name.`.
                    return {
                        [nb.name.text + '.']: modulePath,
                    };
                }
                else {
                    // This is of the form `import {a,b,c} from 'path'`
                    const namedImports = nb;
                    return namedImports.elements
                        .map((is) => is.propertyName ? is.propertyName.text : is.name.text)
                        .reduce((acc, curr) => {
                        acc[curr] = modulePath;
                        return acc;
                    }, {});
                }
            }
            return {};
        }
        else {
            // This is of the form `import 'path';`. Nothing to do.
            return {};
        }
    }
    function getDecoratorMetadata(source, identifier, module) {
        const angularImports = findNodes(source, ts.SyntaxKind.ImportDeclaration)
            .map(node => _angularImportsFromNode(node, source))
            .reduce((acc, current) => {
            for (const key of Object.keys(current)) {
                acc[key] = current[key];
            }
            return acc;
        }, {});
        return getSourceNodes(source)
            .filter(node => {
            return (node.kind == ts.SyntaxKind.Decorator &&
                node.expression.kind == ts.SyntaxKind.CallExpression);
        })
            .map(node => node.expression)
            .filter(expr => {
            if (expr.expression.kind == ts.SyntaxKind.Identifier) {
                const id = expr.expression;
                return (id.getFullText(source) == identifier &&
                    angularImports[id.getFullText(source)] === module);
            }
            else if (expr.expression.kind == ts.SyntaxKind.PropertyAccessExpression) {
                // This covers foo.NgModule when importing * as foo.
                const paExpr = expr.expression;
                // If the left expression is not an identifier, just give up at that point.
                if (paExpr.expression.kind !== ts.SyntaxKind.Identifier) {
                    return false;
                }
                const id = paExpr.name.text;
                const moduleId = paExpr.expression.getText(source);
                return id === identifier && angularImports[moduleId + '.'] === module;
            }
            return false;
        })
            .filter(expr => expr.arguments[0] &&
            expr.arguments[0].kind == ts.SyntaxKind.ObjectLiteralExpression)
            .map(expr => expr.arguments[0]);
    }
    exports.getDecoratorMetadata = getDecoratorMetadata;
    function _addSymbolToNgModuleMetadata(source, ngModulePath, metadataField, symbolName, importPath) {
        const nodes = getDecoratorMetadata(source, 'NgModule', '@angular/core');
        let node = nodes[0]; // tslint:disable-line:no-any
        // Find the decorator declaration.
        if (!node) {
            return [];
        }
        // Get all the children property assignment of object literals.
        const matchingProperties = node.properties
            .filter(prop => prop.kind == ts.SyntaxKind.PropertyAssignment)
            // Filter out every fields that's not "metadataField". Also handles string literals
            // (but not expressions).
            .filter((prop) => {
            const name = prop.name;
            switch (name.kind) {
                case ts.SyntaxKind.Identifier:
                    return name.getText(source) == metadataField;
                case ts.SyntaxKind.StringLiteral:
                    return name.text == metadataField;
            }
            return false;
        });
        // Get the last node of the array literal.
        if (!matchingProperties) {
            return [];
        }
        if (matchingProperties.length == 0) {
            // We haven't found the field in the metadata declaration. Insert a new field.
            const expr = node;
            let position;
            let toInsert;
            if (expr.properties.length == 0) {
                position = expr.getEnd() - 1;
                toInsert = `  ${metadataField}: [${symbolName}]\n`;
            }
            else {
                node = expr.properties[expr.properties.length - 1];
                position = node.getEnd();
                // Get the indentation of the last element, if any.
                const text = node.getFullText(source);
                const matches = text.match(/^\r?\n\s*/);
                if (matches.length > 0) {
                    toInsert = `,${matches[0]}${metadataField}: [${symbolName}]`;
                }
                else {
                    toInsert = `, ${metadataField}: [${symbolName}]`;
                }
            }
            const newMetadataProperty = new change_1.InsertChange(ngModulePath, position, toInsert);
            const newMetadataImport = insertImport(source, ngModulePath, symbolName.replace(/\..*$/, ''), importPath);
            return [newMetadataProperty, newMetadataImport];
        }
        const assignment = matchingProperties[0];
        // If it's not an array, nothing we can do really.
        if (assignment.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
            return [];
        }
        const arrLiteral = assignment.initializer;
        if (arrLiteral.elements.length == 0) {
            // Forward the property.
            node = arrLiteral;
        }
        else {
            node = arrLiteral.elements;
        }
        if (!node) {
            console.log('No app module found. Please add your new class to your component.');
            return [];
        }
        if (Array.isArray(node)) {
            const nodeArray = node;
            const symbolsArray = nodeArray.map(node => node.getText());
            if (symbolsArray.includes(symbolName)) {
                return [];
            }
            node = node[node.length - 1];
            const effectsModule = nodeArray.find(node => (node.getText().includes('EffectsModule.forRoot') &&
                symbolName.includes('EffectsModule.forRoot')) ||
                (node.getText().includes('EffectsModule.forFeature') &&
                    symbolName.includes('EffectsModule.forFeature')));
            if (effectsModule && symbolName.includes('EffectsModule')) {
                const effectsArgs = effectsModule.arguments.shift();
                if (effectsArgs &&
                    effectsArgs.kind === ts.SyntaxKind.ArrayLiteralExpression) {
                    const effectsElements = effectsArgs
                        .elements;
                    const [, effectsSymbol] = symbolName.match(/\[(.*)\]/);
                    let epos;
                    if (effectsElements.length === 0) {
                        epos = effectsArgs.getStart() + 1;
                        return [new change_1.InsertChange(ngModulePath, epos, effectsSymbol)];
                    }
                    else {
                        const lastEffect = effectsElements[effectsElements.length - 1];
                        epos = lastEffect.getEnd();
                        // Get the indentation of the last element, if any.
                        const text = lastEffect.getFullText(source);
                        let effectInsert;
                        if (text.match('^\r?\r?\n')) {
                            effectInsert = `,${text.match(/^\r?\n\s+/)[0]}${effectsSymbol}`;
                        }
                        else {
                            effectInsert = `, ${effectsSymbol}`;
                        }
                        return [new change_1.InsertChange(ngModulePath, epos, effectInsert)];
                    }
                }
                else {
                    return [];
                }
            }
        }
        let toInsert;
        let position = node.getEnd();
        if (node.kind == ts.SyntaxKind.ObjectLiteralExpression) {
            // We haven't found the field in the metadata declaration. Insert a new
            // field.
            const expr = node;
            if (expr.properties.length == 0) {
                position = expr.getEnd() - 1;
                toInsert = `  ${metadataField}: [${symbolName}]\n`;
            }
            else {
                node = expr.properties[expr.properties.length - 1];
                position = node.getEnd();
                // Get the indentation of the last element, if any.
                const text = node.getFullText(source);
                if (text.match('^\r?\r?\n')) {
                    toInsert = `,${text.match(/^\r?\n\s+/)[0]}${metadataField}: [${symbolName}]`;
                }
                else {
                    toInsert = `, ${metadataField}: [${symbolName}]`;
                }
            }
        }
        else if (node.kind == ts.SyntaxKind.ArrayLiteralExpression) {
            // We found the field but it's empty. Insert it just before the `]`.
            position--;
            toInsert = `${symbolName}`;
        }
        else {
            // Get the indentation of the last element, if any.
            const text = node.getFullText(source);
            if (text.match(/^\r?\n/)) {
                toInsert = `,${text.match(/^\r?\n(\r?)\s+/)[0]}${symbolName}`;
            }
            else {
                toInsert = `, ${symbolName}`;
            }
        }
        const insert = new change_1.InsertChange(ngModulePath, position, toInsert);
        const importInsert = insertImport(source, ngModulePath, symbolName.replace(/\..*$/, ''), importPath);
        return [insert, importInsert];
    }
    /**
     * Custom function to insert a declaration (component, pipe, directive)
     * into NgModule declarations. It also imports the component.
     */
    function addDeclarationToModule(source, modulePath, classifiedName, importPath) {
        return _addSymbolToNgModuleMetadata(source, modulePath, 'declarations', classifiedName, importPath);
    }
    exports.addDeclarationToModule = addDeclarationToModule;
    /**
     * Custom function to insert a declaration (component, pipe, directive)
     * into NgModule declarations. It also imports the component.
     */
    function addImportToModule(source, modulePath, classifiedName, importPath) {
        return _addSymbolToNgModuleMetadata(source, modulePath, 'imports', classifiedName, importPath);
    }
    exports.addImportToModule = addImportToModule;
    /**
     * Custom function to insert a provider into NgModule. It also imports it.
     */
    function addProviderToModule(source, modulePath, classifiedName, importPath) {
        return _addSymbolToNgModuleMetadata(source, modulePath, 'providers', classifiedName, importPath);
    }
    exports.addProviderToModule = addProviderToModule;
    /**
     * Custom function to insert an export into NgModule. It also imports it.
     */
    function addExportToModule(source, modulePath, classifiedName, importPath) {
        return _addSymbolToNgModuleMetadata(source, modulePath, 'exports', classifiedName, importPath);
    }
    exports.addExportToModule = addExportToModule;
    /**
     * Custom function to insert an export into NgModule. It also imports it.
     */
    function addBootstrapToModule(source, modulePath, classifiedName, importPath) {
        return _addSymbolToNgModuleMetadata(source, modulePath, 'bootstrap', classifiedName, importPath);
    }
    exports.addBootstrapToModule = addBootstrapToModule;
    /**
     * Add Import `import { symbolName } from fileName` if the import doesn't exit
     * already. Assumes fileToEdit can be resolved and accessed.
     * @param fileToEdit (file we want to add import to)
     * @param symbolName (item to import)
     * @param fileName (path to the file)
     * @param isDefault (if true, import follows style for importing default exports)
     * @return Change
     */
    function insertImport(source, fileToEdit, symbolName, fileName, isDefault = false) {
        const rootNode = source;
        const allImports = findNodes(rootNode, ts.SyntaxKind.ImportDeclaration);
        // get nodes that map to import statements from the file fileName
        const relevantImports = allImports.filter(node => {
            // StringLiteral of the ImportDeclaration is the import file (fileName in this case).
            const importFiles = node
                .getChildren()
                .filter(child => child.kind === ts.SyntaxKind.StringLiteral)
                .map(n => n.text);
            return importFiles.filter(file => file === fileName).length === 1;
        });
        if (relevantImports.length > 0) {
            let importsAsterisk = false;
            // imports from import file
            const imports = [];
            relevantImports.forEach(n => {
                Array.prototype.push.apply(imports, findNodes(n, ts.SyntaxKind.Identifier));
                if (findNodes(n, ts.SyntaxKind.AsteriskToken).length > 0) {
                    importsAsterisk = true;
                }
            });
            // if imports * from fileName, don't add symbolName
            if (importsAsterisk) {
                return new change_1.NoopChange();
            }
            const importTextNodes = imports.filter(n => n.text === symbolName);
            // insert import if it's not there
            if (importTextNodes.length === 0) {
                const fallbackPos = findNodes(relevantImports[0], ts.SyntaxKind.CloseBraceToken)[0].getStart() ||
                    findNodes(relevantImports[0], ts.SyntaxKind.FromKeyword)[0].getStart();
                return insertAfterLastOccurrence(imports, `, ${symbolName}`, fileToEdit, fallbackPos);
            }
            return new change_1.NoopChange();
        }
        // no such import declaration exists
        const useStrict = findNodes(rootNode, ts.SyntaxKind.StringLiteral).filter(n => n.getText() === 'use strict');
        let fallbackPos = 0;
        if (useStrict.length > 0) {
            fallbackPos = useStrict[0].end;
        }
        const open = isDefault ? '' : '{ ';
        const close = isDefault ? '' : ' }';
        // if there are no imports or 'use strict' statement, insert import at beginning of file
        const insertAtBeginning = allImports.length === 0 && useStrict.length === 0;
        const separator = insertAtBeginning ? '' : ';\n';
        const toInsert = `${separator}import ${open}${symbolName}${close}` +
            ` from '${fileName}'${insertAtBeginning ? ';\n' : ''}`;
        return insertAfterLastOccurrence(allImports, toInsert, fileToEdit, fallbackPos, ts.SyntaxKind.StringLiteral);
    }
    exports.insertImport = insertImport;
    function replaceImport(sourceFile, path, importFrom, importAsIs, importToBe) {
        const imports = sourceFile.statements
            .filter(ts.isImportDeclaration)
            .filter(({ moduleSpecifier }) => moduleSpecifier.getText(sourceFile) === `'${importFrom}'` ||
            moduleSpecifier.getText(sourceFile) === `"${importFrom}"`);
        if (imports.length === 0) {
            return [];
        }
        const importText = (specifier) => {
            if (specifier.name.text) {
                return specifier.name.text;
            }
            // if import is renamed
            if (specifier.propertyName && specifier.propertyName.text) {
                return specifier.propertyName.text;
            }
            return '';
        };
        const changes = imports.map(p => {
            const importSpecifiers = p.importClause.namedBindings
                .elements;
            const isAlreadyImported = importSpecifiers
                .map(importText)
                .includes(importToBe);
            const importChanges = importSpecifiers.map((specifier, index) => {
                const text = importText(specifier);
                // import is not the one we're looking for, can be skipped
                if (text !== importAsIs) {
                    return undefined;
                }
                // identifier has not been imported, simply replace the old text with the new text
                if (!isAlreadyImported) {
                    return change_1.createReplaceChange(sourceFile, specifier, importAsIs, importToBe);
                }
                const nextIdentifier = importSpecifiers[index + 1];
                // identifer is not the last, also clean up the comma
                if (nextIdentifier) {
                    return change_1.createRemoveChange(sourceFile, specifier, specifier.getStart(sourceFile), nextIdentifier.getStart(sourceFile));
                }
                // there are no imports following, just remove it
                return change_1.createRemoveChange(sourceFile, specifier, specifier.getStart(sourceFile), specifier.getEnd());
            });
            return importChanges.filter(Boolean);
        });
        return changes.reduce((imports, curr) => imports.concat(curr), []);
    }
    exports.replaceImport = replaceImport;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0LXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zY2hlbWF0aWNzLWNvcmUvdXRpbGl0eS9hc3QtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSwwQkFBMEI7SUFDMUI7Ozs7OztPQU1HO0lBQ0gsaUNBQWlDO0lBQ2pDLHVFQVFrQjtJQUdsQjs7Ozs7O09BTUc7SUFDSCxTQUFnQixTQUFTLENBQ3ZCLElBQWEsRUFDYixJQUFtQixFQUNuQixHQUFHLEdBQUcsUUFBUTtRQUVkLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtZQUNyQixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsTUFBTSxHQUFHLEdBQWMsRUFBRSxDQUFDO1FBQzFCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNmLEdBQUcsRUFBRSxDQUFDO1NBQ1A7UUFDRCxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFDWCxLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDdEMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN6QyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7d0JBQ1gsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDaEI7b0JBQ0QsR0FBRyxFQUFFLENBQUM7Z0JBQ1IsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFO29CQUNaLE1BQU07aUJBQ1A7YUFDRjtTQUNGO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBOUJELDhCQThCQztJQUVEOzs7O09BSUc7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RSxDQUNuQixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFxQyxDQUFDO1FBQzNFLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBbEZELHNDQWtGQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGlzdGFuYnVsIGlnbm9yZSBmaWxlICovXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7XG4gIENoYW5nZSxcbiAgSW5zZXJ0Q2hhbmdlLFxuICBOb29wQ2hhbmdlLFxuICBjcmVhdGVSZXBsYWNlQ2hhbmdlLFxuICBSZXBsYWNlQ2hhbmdlLFxuICBSZW1vdmVDaGFuZ2UsXG4gIGNyZWF0ZVJlbW92ZUNoYW5nZSxcbn0gZnJvbSAnLi9jaGFuZ2UnO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcblxuLyoqXG4gKiBGaW5kIGFsbCBub2RlcyBmcm9tIHRoZSBBU1QgaW4gdGhlIHN1YnRyZWUgb2Ygbm9kZSBvZiBTeW50YXhLaW5kIGtpbmQuXG4gKiBAcGFyYW0gbm9kZVxuICogQHBhcmFtIGtpbmRcbiAqIEBwYXJhbSBtYXggVGhlIG1heGltdW0gbnVtYmVyIG9mIGl0ZW1zIHRvIHJldHVybi5cbiAqIEByZXR1cm4gYWxsIG5vZGVzIG9mIGtpbmQsIG9yIFtdIGlmIG5vbmUgaXMgZm91bmRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmROb2RlcyhcbiAgbm9kZTogdHMuTm9kZSxcbiAga2luZDogdHMuU3ludGF4S2luZCxcbiAgbWF4ID0gSW5maW5pdHlcbik6IHRzLk5vZGVbXSB7XG4gIGlmICghbm9kZSB8fCBtYXggPT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IGFycjogdHMuTm9kZVtdID0gW107XG4gIGlmIChub2RlLmtpbmQgPT09IGtpbmQpIHtcbiAgICBhcnIucHVzaChub2RlKTtcbiAgICBtYXgtLTtcbiAgfVxuICBpZiAobWF4ID4gMCkge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZS5nZXRDaGlsZHJlbigpKSB7XG4gICAgICBmaW5kTm9kZXMoY2hpbGQsIGtpbmQsIG1heCkuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgaWYgKG1heCA+IDApIHtcbiAgICAgICAgICBhcnIucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBtYXgtLTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAobWF4IDw9IDApIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFycjtcbn1cblxuLyoqXG4gKiBHZXQgYWxsIHRoZSBub2RlcyBmcm9tIGEgc291cmNlLlxuICogQHBhcmFtIHNvdXJjZUZpbGUgVGhlIHNvdXJjZSBmaWxlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPHRzLk5vZGU+fSBBbiBvYnNlcnZhYmxlIG9mIGFsbCB0aGUgbm9kZXMgaW4gdGhlIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNvdXJjZU5vZGVzKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOiB0cy5Ob2RlW10ge1xuICBjb25zdCBub2RlczogdHMuTm9kZVtdID0gW3NvdXJjZUZpbGVdO1xuICBjb25zdCByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAobm9kZXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IG5vZGUgPSBub2Rlcy5zaGlmdCgpO1xuXG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHJlc3VsdC5wdXNoKG5vZGUpO1xuICAgICAgaWYgKG5vZGUuZ2V0Q2hpbGRDb3VudChzb3VyY2VGaWxlKSA+PSAwKSB7XG4gICAgICAgIG5vZGVzLnVuc2hpZnQoLi4ubm9kZS5nZXRDaGlsZHJlbigpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEhlbHBlciBmb3Igc29ydGluZyBub2Rlcy5cbiAqIEByZXR1cm4gZnVuY3Rpb24gdG8gc29ydCBub2RlcyBpbiBpbmNyZWFzaW5nIG9yZGVyIG9mIHBvc2l0aW9uIGluIHNvdXJjZUZpbGVcbiAqL1xuZnVuY3Rpb24gbm9kZXNCeVBvc2l0aW9uKGZpcnN0OiB0cy5Ob2RlLCBzZWNvbmQ6IHRzLk5vZGUpOiBudW1iZXIge1xuICByZXR1cm4gZmlyc3QucG9zIC0gc2Vjb25kLnBvcztcbn1cblxuLyoqXG4gKiBJbnNlcnQgYHRvSW5zZXJ0YCBhZnRlciB0aGUgbGFzdCBvY2N1cmVuY2Ugb2YgYHRzLlN5bnRheEtpbmRbbm9kZXNbaV0ua2luZF1gXG4gKiBvciBhZnRlciB0aGUgbGFzdCBvZiBvY2N1cmVuY2Ugb2YgYHN5bnRheEtpbmRgIGlmIHRoZSBsYXN0IG9jY3VyZW5jZSBpcyBhIHN1YiBjaGlsZFxuICogb2YgdHMuU3ludGF4S2luZFtub2Rlc1tpXS5raW5kXSBhbmQgc2F2ZSB0aGUgY2hhbmdlcyBpbiBmaWxlLlxuICpcbiAqIEBwYXJhbSBub2RlcyBpbnNlcnQgYWZ0ZXIgdGhlIGxhc3Qgb2NjdXJlbmNlIG9mIG5vZGVzXG4gKiBAcGFyYW0gdG9JbnNlcnQgc3RyaW5nIHRvIGluc2VydFxuICogQHBhcmFtIGZpbGUgZmlsZSB0byBpbnNlcnQgY2hhbmdlcyBpbnRvXG4gKiBAcGFyYW0gZmFsbGJhY2tQb3MgcG9zaXRpb24gdG8gaW5zZXJ0IGlmIHRvSW5zZXJ0IGhhcHBlbnMgdG8gYmUgdGhlIGZpcnN0IG9jY3VyZW5jZVxuICogQHBhcmFtIHN5bnRheEtpbmQgdGhlIHRzLlN5bnRheEtpbmQgb2YgdGhlIHN1YmNoaWxkcmVuIHRvIGluc2VydCBhZnRlclxuICogQHJldHVybiBDaGFuZ2UgaW5zdGFuY2VcbiAqIEB0aHJvdyBFcnJvciBpZiB0b0luc2VydCBpcyBmaXJzdCBvY2N1cmVuY2UgYnV0IGZhbGwgYmFjayBpcyBub3Qgc2V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRBZnRlckxhc3RPY2N1cnJlbmNlKFxuICBub2RlczogdHMuTm9kZVtdLFxuICB0b0luc2VydDogc3RyaW5nLFxuICBmaWxlOiBzdHJpbmcsXG4gIGZhbGxiYWNrUG9zOiBudW1iZXIsXG4gIHN5bnRheEtpbmQ/OiB0cy5TeW50YXhLaW5kXG4pOiBDaGFuZ2Uge1xuICBsZXQgbGFzdEl0ZW0gPSBub2Rlcy5zb3J0KG5vZGVzQnlQb3NpdGlvbikucG9wKCk7XG4gIGlmICghbGFzdEl0ZW0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgfVxuICBpZiAoc3ludGF4S2luZCkge1xuICAgIGxhc3RJdGVtID0gZmluZE5vZGVzKGxhc3RJdGVtLCBzeW50YXhLaW5kKVxuICAgICAgLnNvcnQobm9kZXNCeVBvc2l0aW9uKVxuICAgICAgLnBvcCgpO1xuICB9XG4gIGlmICghbGFzdEl0ZW0gJiYgZmFsbGJhY2tQb3MgPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYHRyaWVkIHRvIGluc2VydCAke3RvSW5zZXJ0fSBhcyBmaXJzdCBvY2N1cmVuY2Ugd2l0aCBubyBmYWxsYmFjayBwb3NpdGlvbmBcbiAgICApO1xuICB9XG4gIGNvbnN0IGxhc3RJdGVtUG9zaXRpb246IG51bWJlciA9IGxhc3RJdGVtID8gbGFzdEl0ZW0uZW5kIDogZmFsbGJhY2tQb3M7XG5cbiAgcmV0dXJuIG5ldyBJbnNlcnRDaGFuZ2UoZmlsZSwgbGFzdEl0ZW1Qb3NpdGlvbiwgdG9JbnNlcnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udGVudE9mS2V5TGl0ZXJhbChcbiAgX3NvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgbm9kZTogdHMuTm9kZVxuKTogc3RyaW5nIHwgbnVsbCB7XG4gIGlmIChub2RlLmtpbmQgPT0gdHMuU3ludGF4S2luZC5JZGVudGlmaWVyKSB7XG4gICAgcmV0dXJuIChub2RlIGFzIHRzLklkZW50aWZpZXIpLnRleHQ7XG4gIH0gZWxzZSBpZiAobm9kZS5raW5kID09IHRzLlN5bnRheEtpbmQuU3RyaW5nTGl0ZXJhbCkge1xuICAgIHJldHVybiAobm9kZSBhcyB0cy5TdHJpbmdMaXRlcmFsKS50ZXh0O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hbmd1bGFySW1wb3J0c0Zyb21Ob2RlKFxuICBub2RlOiB0cy5JbXBvcnREZWNsYXJhdGlvbixcbiAgX3NvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGVcbik6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9IHtcbiAgY29uc3QgbXMgPSBub2RlLm1vZHVsZVNwZWNpZmllcjtcbiAgbGV0IG1vZHVsZVBhdGg6IHN0cmluZztcbiAgc3dpdGNoIChtcy5raW5kKSB7XG4gICAgY2FzZSB0cy5TeW50YXhLaW5kLlN0cmluZ0xpdGVyYWw6XG4gICAgICBtb2R1bGVQYXRoID0gKG1zIGFzIHRzLlN0cmluZ0xpdGVyYWwpLnRleHQ7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgaWYgKCFtb2R1bGVQYXRoLnN0YXJ0c1dpdGgoJ0Bhbmd1bGFyLycpKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgaWYgKG5vZGUuaW1wb3J0Q2xhdXNlKSB7XG4gICAgaWYgKG5vZGUuaW1wb3J0Q2xhdXNlLm5hbWUpIHtcbiAgICAgIC8vIFRoaXMgaXMgb2YgdGhlIGZvcm0gYGltcG9ydCBOYW1lIGZyb20gJ3BhdGgnYC4gSWdub3JlLlxuICAgICAgcmV0dXJuIHt9O1xuICAgIH0gZWxzZSBpZiAobm9kZS5pbXBvcnRDbGF1c2UubmFtZWRCaW5kaW5ncykge1xuICAgICAgY29uc3QgbmIgPSBub2RlLmltcG9ydENsYXVzZS5uYW1lZEJpbmRpbmdzO1xuICAgICAgaWYgKG5iLmtpbmQgPT0gdHMuU3ludGF4S2luZC5OYW1lc3BhY2VJbXBvcnQpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBvZiB0aGUgZm9ybSBgaW1wb3J0ICogYXMgbmFtZSBmcm9tICdwYXRoJ2AuIFJldHVybiBgbmFtZS5gLlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIFsobmIgYXMgdHMuTmFtZXNwYWNlSW1wb3J0KS5uYW1lLnRleHQgKyAnLiddOiBtb2R1bGVQYXRoLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGhpcyBpcyBvZiB0aGUgZm9ybSBgaW1wb3J0IHthLGIsY30gZnJvbSAncGF0aCdgXG4gICAgICAgIGNvbnN0IG5hbWVkSW1wb3J0cyA9IG5iIGFzIHRzLk5hbWVkSW1wb3J0cztcblxuICAgICAgICByZXR1cm4gbmFtZWRJbXBvcnRzLmVsZW1lbnRzXG4gICAgICAgICAgLm1hcChcbiAgICAgICAgICAgIChpczogdHMuSW1wb3J0U3BlY2lmaWVyKSA9PlxuICAgICAgICAgICAgICBpcy5wcm9wZXJ0eU5hbWUgPyBpcy5wcm9wZXJ0eU5hbWUudGV4dCA6IGlzLm5hbWUudGV4dFxuICAgICAgICAgIClcbiAgICAgICAgICAucmVkdWNlKChhY2M6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9LCBjdXJyOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGFjY1tjdXJyXSA9IG1vZHVsZVBhdGg7XG5cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgfSwge30pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7fTtcbiAgfSBlbHNlIHtcbiAgICAvLyBUaGlzIGlzIG9mIHRoZSBmb3JtIGBpbXBvcnQgJ3BhdGgnO2AuIE5vdGhpbmcgdG8gZG8uXG4gICAgcmV0dXJuIHt9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWNvcmF0b3JNZXRhZGF0YShcbiAgc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICBpZGVudGlmaWVyOiBzdHJpbmcsXG4gIG1vZHVsZTogc3RyaW5nXG4pOiB0cy5Ob2RlW10ge1xuICBjb25zdCBhbmd1bGFySW1wb3J0czogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0gPSBmaW5kTm9kZXMoXG4gICAgc291cmNlLFxuICAgIHRzLlN5bnRheEtpbmQuSW1wb3J0RGVjbGFyYXRpb25cbiAgKVxuICAgIC5tYXAobm9kZSA9PiBfYW5ndWxhckltcG9ydHNGcm9tTm9kZShub2RlIGFzIHRzLkltcG9ydERlY2xhcmF0aW9uLCBzb3VyY2UpKVxuICAgIC5yZWR1Y2UoXG4gICAgICAoXG4gICAgICAgIGFjYzogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0sXG4gICAgICAgIGN1cnJlbnQ6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9XG4gICAgICApID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoY3VycmVudCkpIHtcbiAgICAgICAgICBhY2Nba2V5XSA9IGN1cnJlbnRba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LFxuICAgICAge31cbiAgICApO1xuXG4gIHJldHVybiBnZXRTb3VyY2VOb2Rlcyhzb3VyY2UpXG4gICAgLmZpbHRlcihub2RlID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIG5vZGUua2luZCA9PSB0cy5TeW50YXhLaW5kLkRlY29yYXRvciAmJlxuICAgICAgICAobm9kZSBhcyB0cy5EZWNvcmF0b3IpLmV4cHJlc3Npb24ua2luZCA9PSB0cy5TeW50YXhLaW5kLkNhbGxFeHByZXNzaW9uXG4gICAgICApO1xuICAgIH0pXG4gICAgLm1hcChub2RlID0+IChub2RlIGFzIHRzLkRlY29yYXRvcikuZXhwcmVzc2lvbiBhcyB0cy5DYWxsRXhwcmVzc2lvbilcbiAgICAuZmlsdGVyKGV4cHIgPT4ge1xuICAgICAgaWYgKGV4cHIuZXhwcmVzc2lvbi5raW5kID09IHRzLlN5bnRheEtpbmQuSWRlbnRpZmllcikge1xuICAgICAgICBjb25zdCBpZCA9IGV4cHIuZXhwcmVzc2lvbiBhcyB0cy5JZGVudGlmaWVyO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgaWQuZ2V0RnVsbFRleHQoc291cmNlKSA9PSBpZGVudGlmaWVyICYmXG4gICAgICAgICAgYW5ndWxhckltcG9ydHNbaWQuZ2V0RnVsbFRleHQoc291cmNlKV0gPT09IG1vZHVsZVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZXhwci5leHByZXNzaW9uLmtpbmQgPT0gdHMuU3ludGF4S2luZC5Qcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb25cbiAgICAgICkge1xuICAgICAgICAvLyBUaGlzIGNvdmVycyBmb28uTmdNb2R1bGUgd2hlbiBpbXBvcnRpbmcgKiBhcyBmb28uXG4gICAgICAgIGNvbnN0IHBhRXhwciA9IGV4cHIuZXhwcmVzc2lvbiBhcyB0cy5Qcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb247XG4gICAgICAgIC8vIElmIHRoZSBsZWZ0IGV4cHJlc3Npb24gaXMgbm90IGFuIGlkZW50aWZpZXIsIGp1c3QgZ2l2ZSB1cCBhdCB0aGF0IHBvaW50LlxuICAgICAgICBpZiAocGFFeHByLmV4cHJlc3Npb24ua2luZCAhPT0gdHMuU3ludGF4S2luZC5JZGVudGlmaWVyKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaWQgPSBwYUV4cHIubmFtZS50ZXh0O1xuICAgICAgICBjb25zdCBtb2R1bGVJZCA9IChwYUV4cHIuZXhwcmVzc2lvbiBhcyB0cy5JZGVudGlmaWVyKS5nZXRUZXh0KHNvdXJjZSk7XG5cbiAgICAgICAgcmV0dXJuIGlkID09PSBpZGVudGlmaWVyICYmIGFuZ3VsYXJJbXBvcnRzW21vZHVsZUlkICsgJy4nXSA9PT0gbW9kdWxlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSlcbiAgICAuZmlsdGVyKFxuICAgICAgZXhwciA9PlxuICAgICAgICBleHByLmFyZ3VtZW50c1swXSAmJlxuICAgICAgICBleHByLmFyZ3VtZW50c1swXS5raW5kID09IHRzLlN5bnRheEtpbmQuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb25cbiAgICApXG4gICAgLm1hcChleHByID0+IGV4cHIuYXJndW1lbnRzWzBdIGFzIHRzLk9iamVjdExpdGVyYWxFeHByZXNzaW9uKTtcbn1cblxuZnVuY3Rpb24gX2FkZFN5bWJvbFRvTmdNb2R1bGVNZXRhZGF0YShcbiAgc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICBuZ01vZHVsZVBhdGg6IHN0cmluZyxcbiAgbWV0YWRhdGFGaWVsZDogc3RyaW5nLFxuICBzeW1ib2xOYW1lOiBzdHJpbmcsXG4gIGltcG9ydFBhdGg6IHN0cmluZ1xuKTogQ2hhbmdlW10ge1xuICBjb25zdCBub2RlcyA9IGdldERlY29yYXRvck1ldGFkYXRhKHNvdXJjZSwgJ05nTW9kdWxlJywgJ0Bhbmd1bGFyL2NvcmUnKTtcbiAgbGV0IG5vZGU6IGFueSA9IG5vZGVzWzBdOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWFueVxuXG4gIC8vIEZpbmQgdGhlIGRlY29yYXRvciBkZWNsYXJhdGlvbi5cbiAgaWYgKCFub2RlKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLy8gR2V0IGFsbCB0aGUgY2hpbGRyZW4gcHJvcGVydHkgYXNzaWdubWVudCBvZiBvYmplY3QgbGl0ZXJhbHMuXG4gIGNvbnN0IG1hdGNoaW5nUHJvcGVydGllczogdHMuT2JqZWN0TGl0ZXJhbEVsZW1lbnRbXSA9IChub2RlIGFzIHRzLk9iamVjdExpdGVyYWxFeHByZXNzaW9uKS5wcm9wZXJ0aWVzXG4gICAgLmZpbHRlcihwcm9wID0+IHByb3Aua2luZCA9PSB0cy5TeW50YXhLaW5kLlByb3BlcnR5QXNzaWdubWVudClcbiAgICAvLyBGaWx0ZXIgb3V0IGV2ZXJ5IGZpZWxkcyB0aGF0J3Mgbm90IFwibWV0YWRhdGFGaWVsZFwiLiBBbHNvIGhhbmRsZXMgc3RyaW5nIGxpdGVyYWxzXG4gICAgLy8gKGJ1dCBub3QgZXhwcmVzc2lvbnMpLlxuICAgIC5maWx0ZXIoKHByb3A6IGFueSkgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IHByb3AubmFtZTtcbiAgICAgIHN3aXRjaCAobmFtZS5raW5kKSB7XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JZGVudGlmaWVyOlxuICAgICAgICAgIHJldHVybiAobmFtZSBhcyB0cy5JZGVudGlmaWVyKS5nZXRUZXh0KHNvdXJjZSkgPT0gbWV0YWRhdGFGaWVsZDtcbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlN0cmluZ0xpdGVyYWw6XG4gICAgICAgICAgcmV0dXJuIChuYW1lIGFzIHRzLlN0cmluZ0xpdGVyYWwpLnRleHQgPT0gbWV0YWRhdGFGaWVsZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gIC8vIEdldCB0aGUgbGFzdCBub2RlIG9mIHRoZSBhcnJheSBsaXRlcmFsLlxuICBpZiAoIW1hdGNoaW5nUHJvcGVydGllcykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAobWF0Y2hpbmdQcm9wZXJ0aWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgLy8gV2UgaGF2ZW4ndCBmb3VuZCB0aGUgZmllbGQgaW4gdGhlIG1ldGFkYXRhIGRlY2xhcmF0aW9uLiBJbnNlcnQgYSBuZXcgZmllbGQuXG4gICAgY29uc3QgZXhwciA9IG5vZGUgYXMgdHMuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb247XG4gICAgbGV0IHBvc2l0aW9uOiBudW1iZXI7XG4gICAgbGV0IHRvSW5zZXJ0OiBzdHJpbmc7XG4gICAgaWYgKGV4cHIucHJvcGVydGllcy5sZW5ndGggPT0gMCkge1xuICAgICAgcG9zaXRpb24gPSBleHByLmdldEVuZCgpIC0gMTtcbiAgICAgIHRvSW5zZXJ0ID0gYCAgJHttZXRhZGF0YUZpZWxkfTogWyR7c3ltYm9sTmFtZX1dXFxuYDtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IGV4cHIucHJvcGVydGllc1tleHByLnByb3BlcnRpZXMubGVuZ3RoIC0gMV07XG4gICAgICBwb3NpdGlvbiA9IG5vZGUuZ2V0RW5kKCk7XG4gICAgICAvLyBHZXQgdGhlIGluZGVudGF0aW9uIG9mIHRoZSBsYXN0IGVsZW1lbnQsIGlmIGFueS5cbiAgICAgIGNvbnN0IHRleHQgPSBub2RlLmdldEZ1bGxUZXh0KHNvdXJjZSk7XG4gICAgICBjb25zdCBtYXRjaGVzID0gdGV4dC5tYXRjaCgvXlxccj9cXG5cXHMqLyk7XG4gICAgICBpZiAobWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRvSW5zZXJ0ID0gYCwke21hdGNoZXNbMF19JHttZXRhZGF0YUZpZWxkfTogWyR7c3ltYm9sTmFtZX1dYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvSW5zZXJ0ID0gYCwgJHttZXRhZGF0YUZpZWxkfTogWyR7c3ltYm9sTmFtZX1dYDtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbmV3TWV0YWRhdGFQcm9wZXJ0eSA9IG5ldyBJbnNlcnRDaGFuZ2UoXG4gICAgICBuZ01vZHVsZVBhdGgsXG4gICAgICBwb3NpdGlvbixcbiAgICAgIHRvSW5zZXJ0XG4gICAgKTtcbiAgICBjb25zdCBuZXdNZXRhZGF0YUltcG9ydCA9IGluc2VydEltcG9ydChcbiAgICAgIHNvdXJjZSxcbiAgICAgIG5nTW9kdWxlUGF0aCxcbiAgICAgIHN5bWJvbE5hbWUucmVwbGFjZSgvXFwuLiokLywgJycpLFxuICAgICAgaW1wb3J0UGF0aFxuICAgICk7XG5cbiAgICByZXR1cm4gW25ld01ldGFkYXRhUHJvcGVydHksIG5ld01ldGFkYXRhSW1wb3J0XTtcbiAgfVxuXG4gIGNvbnN0IGFzc2lnbm1lbnQgPSBtYXRjaGluZ1Byb3BlcnRpZXNbMF0gYXMgdHMuUHJvcGVydHlBc3NpZ25tZW50O1xuXG4gIC8vIElmIGl0J3Mgbm90IGFuIGFycmF5LCBub3RoaW5nIHdlIGNhbiBkbyByZWFsbHkuXG4gIGlmIChhc3NpZ25tZW50LmluaXRpYWxpemVyLmtpbmQgIT09IHRzLlN5bnRheEtpbmQuQXJyYXlMaXRlcmFsRXhwcmVzc2lvbikge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IGFyckxpdGVyYWwgPSBhc3NpZ25tZW50LmluaXRpYWxpemVyIGFzIHRzLkFycmF5TGl0ZXJhbEV4cHJlc3Npb247XG4gIGlmIChhcnJMaXRlcmFsLmVsZW1lbnRzLmxlbmd0aCA9PSAwKSB7XG4gICAgLy8gRm9yd2FyZCB0aGUgcHJvcGVydHkuXG4gICAgbm9kZSA9IGFyckxpdGVyYWw7XG4gIH0gZWxzZSB7XG4gICAgbm9kZSA9IGFyckxpdGVyYWwuZWxlbWVudHM7XG4gIH1cblxuICBpZiAoIW5vZGUpIHtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICdObyBhcHAgbW9kdWxlIGZvdW5kLiBQbGVhc2UgYWRkIHlvdXIgbmV3IGNsYXNzIHRvIHlvdXIgY29tcG9uZW50LidcbiAgICApO1xuXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICBjb25zdCBub2RlQXJyYXkgPSAobm9kZSBhcyB7fSkgYXMgQXJyYXk8dHMuTm9kZT47XG4gICAgY29uc3Qgc3ltYm9sc0FycmF5ID0gbm9kZUFycmF5Lm1hcChub2RlID0+IG5vZGUuZ2V0VGV4dCgpKTtcbiAgICBpZiAoc3ltYm9sc0FycmF5LmluY2x1ZGVzKHN5bWJvbE5hbWUpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgbm9kZSA9IG5vZGVbbm9kZS5sZW5ndGggLSAxXTtcblxuICAgIGNvbnN0IGVmZmVjdHNNb2R1bGUgPSBub2RlQXJyYXkuZmluZChcbiAgICAgIG5vZGUgPT5cbiAgICAgICAgKG5vZGUuZ2V0VGV4dCgpLmluY2x1ZGVzKCdFZmZlY3RzTW9kdWxlLmZvclJvb3QnKSAmJlxuICAgICAgICAgIHN5bWJvbE5hbWUuaW5jbHVkZXMoJ0VmZmVjdHNNb2R1bGUuZm9yUm9vdCcpKSB8fFxuICAgICAgICAobm9kZS5nZXRUZXh0KCkuaW5jbHVkZXMoJ0VmZmVjdHNNb2R1bGUuZm9yRmVhdHVyZScpICYmXG4gICAgICAgICAgc3ltYm9sTmFtZS5pbmNsdWRlcygnRWZmZWN0c01vZHVsZS5mb3JGZWF0dXJlJykpXG4gICAgKTtcblxuICAgIGlmIChlZmZlY3RzTW9kdWxlICYmIHN5bWJvbE5hbWUuaW5jbHVkZXMoJ0VmZmVjdHNNb2R1bGUnKSkge1xuICAgICAgY29uc3QgZWZmZWN0c0FyZ3MgPSAoZWZmZWN0c01vZHVsZSBhcyBhbnkpLmFyZ3VtZW50cy5zaGlmdCgpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGVmZmVjdHNBcmdzICYmXG4gICAgICAgIGVmZmVjdHNBcmdzLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQXJyYXlMaXRlcmFsRXhwcmVzc2lvblxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGVmZmVjdHNFbGVtZW50cyA9IChlZmZlY3RzQXJncyBhcyB0cy5BcnJheUxpdGVyYWxFeHByZXNzaW9uKVxuICAgICAgICAgIC5lbGVtZW50cztcbiAgICAgICAgY29uc3QgWywgZWZmZWN0c1N5bWJvbF0gPSAoPGFueT5zeW1ib2xOYW1lKS5tYXRjaCgvXFxbKC4qKVxcXS8pO1xuXG4gICAgICAgIGxldCBlcG9zO1xuICAgICAgICBpZiAoZWZmZWN0c0VsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGVwb3MgPSBlZmZlY3RzQXJncy5nZXRTdGFydCgpICsgMTtcbiAgICAgICAgICByZXR1cm4gW25ldyBJbnNlcnRDaGFuZ2UobmdNb2R1bGVQYXRoLCBlcG9zLCBlZmZlY3RzU3ltYm9sKV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgbGFzdEVmZmVjdCA9IGVmZmVjdHNFbGVtZW50c1tcbiAgICAgICAgICAgIGVmZmVjdHNFbGVtZW50cy5sZW5ndGggLSAxXG4gICAgICAgICAgXSBhcyB0cy5FeHByZXNzaW9uO1xuICAgICAgICAgIGVwb3MgPSBsYXN0RWZmZWN0LmdldEVuZCgpO1xuICAgICAgICAgIC8vIEdldCB0aGUgaW5kZW50YXRpb24gb2YgdGhlIGxhc3QgZWxlbWVudCwgaWYgYW55LlxuICAgICAgICAgIGNvbnN0IHRleHQ6IGFueSA9IGxhc3RFZmZlY3QuZ2V0RnVsbFRleHQoc291cmNlKTtcblxuICAgICAgICAgIGxldCBlZmZlY3RJbnNlcnQ6IHN0cmluZztcbiAgICAgICAgICBpZiAodGV4dC5tYXRjaCgnXlxccj9cXHI/XFxuJykpIHtcbiAgICAgICAgICAgIGVmZmVjdEluc2VydCA9IGAsJHt0ZXh0Lm1hdGNoKC9eXFxyP1xcblxccysvKVswXX0ke2VmZmVjdHNTeW1ib2x9YDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWZmZWN0SW5zZXJ0ID0gYCwgJHtlZmZlY3RzU3ltYm9sfWA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIFtuZXcgSW5zZXJ0Q2hhbmdlKG5nTW9kdWxlUGF0aCwgZXBvcywgZWZmZWN0SW5zZXJ0KV07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsZXQgdG9JbnNlcnQ6IHN0cmluZztcbiAgbGV0IHBvc2l0aW9uID0gbm9kZS5nZXRFbmQoKTtcbiAgaWYgKG5vZGUua2luZCA9PSB0cy5TeW50YXhLaW5kLk9iamVjdExpdGVyYWxFeHByZXNzaW9uKSB7XG4gICAgLy8gV2UgaGF2ZW4ndCBmb3VuZCB0aGUgZmllbGQgaW4gdGhlIG1ldGFkYXRhIGRlY2xhcmF0aW9uLiBJbnNlcnQgYSBuZXdcbiAgICAvLyBmaWVsZC5cbiAgICBjb25zdCBleHByID0gbm9kZSBhcyB0cy5PYmplY3RMaXRlcmFsRXhwcmVzc2lvbjtcbiAgICBpZiAoZXhwci5wcm9wZXJ0aWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICBwb3NpdGlvbiA9IGV4cHIuZ2V0RW5kKCkgLSAxO1xuICAgICAgdG9JbnNlcnQgPSBgICAke21ldGFkYXRhRmllbGR9OiBbJHtzeW1ib2xOYW1lfV1cXG5gO1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gZXhwci5wcm9wZXJ0aWVzW2V4cHIucHJvcGVydGllcy5sZW5ndGggLSAxXTtcbiAgICAgIHBvc2l0aW9uID0gbm9kZS5nZXRFbmQoKTtcbiAgICAgIC8vIEdldCB0aGUgaW5kZW50YXRpb24gb2YgdGhlIGxhc3QgZWxlbWVudCwgaWYgYW55LlxuICAgICAgY29uc3QgdGV4dCA9IG5vZGUuZ2V0RnVsbFRleHQoc291cmNlKTtcbiAgICAgIGlmICh0ZXh0Lm1hdGNoKCdeXFxyP1xccj9cXG4nKSkge1xuICAgICAgICB0b0luc2VydCA9IGAsJHtcbiAgICAgICAgICB0ZXh0Lm1hdGNoKC9eXFxyP1xcblxccysvKVswXVxuICAgICAgICB9JHttZXRhZGF0YUZpZWxkfTogWyR7c3ltYm9sTmFtZX1dYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvSW5zZXJ0ID0gYCwgJHttZXRhZGF0YUZpZWxkfTogWyR7c3ltYm9sTmFtZX1dYDtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAobm9kZS5raW5kID09IHRzLlN5bnRheEtpbmQuQXJyYXlMaXRlcmFsRXhwcmVzc2lvbikge1xuICAgIC8vIFdlIGZvdW5kIHRoZSBmaWVsZCBidXQgaXQncyBlbXB0eS4gSW5zZXJ0IGl0IGp1c3QgYmVmb3JlIHRoZSBgXWAuXG4gICAgcG9zaXRpb24tLTtcbiAgICB0b0luc2VydCA9IGAke3N5bWJvbE5hbWV9YDtcbiAgfSBlbHNlIHtcbiAgICAvLyBHZXQgdGhlIGluZGVudGF0aW9uIG9mIHRoZSBsYXN0IGVsZW1lbnQsIGlmIGFueS5cbiAgICBjb25zdCB0ZXh0ID0gbm9kZS5nZXRGdWxsVGV4dChzb3VyY2UpO1xuICAgIGlmICh0ZXh0Lm1hdGNoKC9eXFxyP1xcbi8pKSB7XG4gICAgICB0b0luc2VydCA9IGAsJHt0ZXh0Lm1hdGNoKC9eXFxyP1xcbihcXHI/KVxccysvKVswXX0ke3N5bWJvbE5hbWV9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9JbnNlcnQgPSBgLCAke3N5bWJvbE5hbWV9YDtcbiAgICB9XG4gIH1cbiAgY29uc3QgaW5zZXJ0ID0gbmV3IEluc2VydENoYW5nZShuZ01vZHVsZVBhdGgsIHBvc2l0aW9uLCB0b0luc2VydCk7XG4gIGNvbnN0IGltcG9ydEluc2VydDogQ2hhbmdlID0gaW5zZXJ0SW1wb3J0KFxuICAgIHNvdXJjZSxcbiAgICBuZ01vZHVsZVBhdGgsXG4gICAgc3ltYm9sTmFtZS5yZXBsYWNlKC9cXC4uKiQvLCAnJyksXG4gICAgaW1wb3J0UGF0aFxuICApO1xuXG4gIHJldHVybiBbaW5zZXJ0LCBpbXBvcnRJbnNlcnRdO1xufVxuXG4vKipcbiAqIEN1c3RvbSBmdW5jdGlvbiB0byBpbnNlcnQgYSBkZWNsYXJhdGlvbiAoY29tcG9uZW50LCBwaXBlLCBkaXJlY3RpdmUpXG4gKiBpbnRvIE5nTW9kdWxlIGRlY2xhcmF0aW9ucy4gSXQgYWxzbyBpbXBvcnRzIHRoZSBjb21wb25lbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGREZWNsYXJhdGlvblRvTW9kdWxlKFxuICBzb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIG1vZHVsZVBhdGg6IHN0cmluZyxcbiAgY2xhc3NpZmllZE5hbWU6IHN0cmluZyxcbiAgaW1wb3J0UGF0aDogc3RyaW5nXG4pOiBDaGFuZ2VbXSB7XG4gIHJldHVybiBfYWRkU3ltYm9sVG9OZ01vZHVsZU1ldGFkYXRhKFxuICAgIHNvdXJjZSxcbiAgICBtb2R1bGVQYXRoLFxuICAgICdkZWNsYXJhdGlvbnMnLFxuICAgIGNsYXNzaWZpZWROYW1lLFxuICAgIGltcG9ydFBhdGhcbiAgKTtcbn1cblxuLyoqXG4gKiBDdXN0b20gZnVuY3Rpb24gdG8gaW5zZXJ0IGEgZGVjbGFyYXRpb24gKGNvbXBvbmVudCwgcGlwZSwgZGlyZWN0aXZlKVxuICogaW50byBOZ01vZHVsZSBkZWNsYXJhdGlvbnMuIEl0IGFsc28gaW1wb3J0cyB0aGUgY29tcG9uZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkSW1wb3J0VG9Nb2R1bGUoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgbW9kdWxlUGF0aDogc3RyaW5nLFxuICBjbGFzc2lmaWVkTmFtZTogc3RyaW5nLFxuICBpbXBvcnRQYXRoOiBzdHJpbmdcbik6IENoYW5nZVtdIHtcbiAgcmV0dXJuIF9hZGRTeW1ib2xUb05nTW9kdWxlTWV0YWRhdGEoXG4gICAgc291cmNlLFxuICAgIG1vZHVsZVBhdGgsXG4gICAgJ2ltcG9ydHMnLFxuICAgIGNsYXNzaWZpZWROYW1lLFxuICAgIGltcG9ydFBhdGhcbiAgKTtcbn1cblxuLyoqXG4gKiBDdXN0b20gZnVuY3Rpb24gdG8gaW5zZXJ0IGEgcHJvdmlkZXIgaW50byBOZ01vZHVsZS4gSXQgYWxzbyBpbXBvcnRzIGl0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkUHJvdmlkZXJUb01vZHVsZShcbiAgc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICBtb2R1bGVQYXRoOiBzdHJpbmcsXG4gIGNsYXNzaWZpZWROYW1lOiBzdHJpbmcsXG4gIGltcG9ydFBhdGg6IHN0cmluZ1xuKTogQ2hhbmdlW10ge1xuICByZXR1cm4gX2FkZFN5bWJvbFRvTmdNb2R1bGVNZXRhZGF0YShcbiAgICBzb3VyY2UsXG4gICAgbW9kdWxlUGF0aCxcbiAgICAncHJvdmlkZXJzJyxcbiAgICBjbGFzc2lmaWVkTmFtZSxcbiAgICBpbXBvcnRQYXRoXG4gICk7XG59XG5cbi8qKlxuICogQ3VzdG9tIGZ1bmN0aW9uIHRvIGluc2VydCBhbiBleHBvcnQgaW50byBOZ01vZHVsZS4gSXQgYWxzbyBpbXBvcnRzIGl0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkRXhwb3J0VG9Nb2R1bGUoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgbW9kdWxlUGF0aDogc3RyaW5nLFxuICBjbGFzc2lmaWVkTmFtZTogc3RyaW5nLFxuICBpbXBvcnRQYXRoOiBzdHJpbmdcbik6IENoYW5nZVtdIHtcbiAgcmV0dXJuIF9hZGRTeW1ib2xUb05nTW9kdWxlTWV0YWRhdGEoXG4gICAgc291cmNlLFxuICAgIG1vZHVsZVBhdGgsXG4gICAgJ2V4cG9ydHMnLFxuICAgIGNsYXNzaWZpZWROYW1lLFxuICAgIGltcG9ydFBhdGhcbiAgKTtcbn1cblxuLyoqXG4gKiBDdXN0b20gZnVuY3Rpb24gdG8gaW5zZXJ0IGFuIGV4cG9ydCBpbnRvIE5nTW9kdWxlLiBJdCBhbHNvIGltcG9ydHMgaXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRCb290c3RyYXBUb01vZHVsZShcbiAgc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICBtb2R1bGVQYXRoOiBzdHJpbmcsXG4gIGNsYXNzaWZpZWROYW1lOiBzdHJpbmcsXG4gIGltcG9ydFBhdGg6IHN0cmluZ1xuKTogQ2hhbmdlW10ge1xuICByZXR1cm4gX2FkZFN5bWJvbFRvTmdNb2R1bGVNZXRhZGF0YShcbiAgICBzb3VyY2UsXG4gICAgbW9kdWxlUGF0aCxcbiAgICAnYm9vdHN0cmFwJyxcbiAgICBjbGFzc2lmaWVkTmFtZSxcbiAgICBpbXBvcnRQYXRoXG4gICk7XG59XG5cbi8qKlxuICogQWRkIEltcG9ydCBgaW1wb3J0IHsgc3ltYm9sTmFtZSB9IGZyb20gZmlsZU5hbWVgIGlmIHRoZSBpbXBvcnQgZG9lc24ndCBleGl0XG4gKiBhbHJlYWR5LiBBc3N1bWVzIGZpbGVUb0VkaXQgY2FuIGJlIHJlc29sdmVkIGFuZCBhY2Nlc3NlZC5cbiAqIEBwYXJhbSBmaWxlVG9FZGl0IChmaWxlIHdlIHdhbnQgdG8gYWRkIGltcG9ydCB0bylcbiAqIEBwYXJhbSBzeW1ib2xOYW1lIChpdGVtIHRvIGltcG9ydClcbiAqIEBwYXJhbSBmaWxlTmFtZSAocGF0aCB0byB0aGUgZmlsZSlcbiAqIEBwYXJhbSBpc0RlZmF1bHQgKGlmIHRydWUsIGltcG9ydCBmb2xsb3dzIHN0eWxlIGZvciBpbXBvcnRpbmcgZGVmYXVsdCBleHBvcnRzKVxuICogQHJldHVybiBDaGFuZ2VcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0SW1wb3J0KFxuICBzb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIGZpbGVUb0VkaXQ6IHN0cmluZyxcbiAgc3ltYm9sTmFtZTogc3RyaW5nLFxuICBmaWxlTmFtZTogc3RyaW5nLFxuICBpc0RlZmF1bHQgPSBmYWxzZVxuKTogQ2hhbmdlIHtcbiAgY29uc3Qgcm9vdE5vZGUgPSBzb3VyY2U7XG4gIGNvbnN0IGFsbEltcG9ydHMgPSBmaW5kTm9kZXMocm9vdE5vZGUsIHRzLlN5bnRheEtpbmQuSW1wb3J0RGVjbGFyYXRpb24pO1xuXG4gIC8vIGdldCBub2RlcyB0aGF0IG1hcCB0byBpbXBvcnQgc3RhdGVtZW50cyBmcm9tIHRoZSBmaWxlIGZpbGVOYW1lXG4gIGNvbnN0IHJlbGV2YW50SW1wb3J0cyA9IGFsbEltcG9ydHMuZmlsdGVyKG5vZGUgPT4ge1xuICAgIC8vIFN0cmluZ0xpdGVyYWwgb2YgdGhlIEltcG9ydERlY2xhcmF0aW9uIGlzIHRoZSBpbXBvcnQgZmlsZSAoZmlsZU5hbWUgaW4gdGhpcyBjYXNlKS5cbiAgICBjb25zdCBpbXBvcnRGaWxlcyA9IG5vZGVcbiAgICAgIC5nZXRDaGlsZHJlbigpXG4gICAgICAuZmlsdGVyKGNoaWxkID0+IGNoaWxkLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuU3RyaW5nTGl0ZXJhbClcbiAgICAgIC5tYXAobiA9PiAobiBhcyB0cy5TdHJpbmdMaXRlcmFsKS50ZXh0KTtcblxuICAgIHJldHVybiBpbXBvcnRGaWxlcy5maWx0ZXIoZmlsZSA9PiBmaWxlID09PSBmaWxlTmFtZSkubGVuZ3RoID09PSAxO1xuICB9KTtcblxuICBpZiAocmVsZXZhbnRJbXBvcnRzLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgaW1wb3J0c0FzdGVyaXNrID0gZmFsc2U7XG4gICAgLy8gaW1wb3J0cyBmcm9tIGltcG9ydCBmaWxlXG4gICAgY29uc3QgaW1wb3J0czogdHMuTm9kZVtdID0gW107XG4gICAgcmVsZXZhbnRJbXBvcnRzLmZvckVhY2gobiA9PiB7XG4gICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShcbiAgICAgICAgaW1wb3J0cyxcbiAgICAgICAgZmluZE5vZGVzKG4sIHRzLlN5bnRheEtpbmQuSWRlbnRpZmllcilcbiAgICAgICk7XG4gICAgICBpZiAoZmluZE5vZGVzKG4sIHRzLlN5bnRheEtpbmQuQXN0ZXJpc2tUb2tlbikubGVuZ3RoID4gMCkge1xuICAgICAgICBpbXBvcnRzQXN0ZXJpc2sgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gaWYgaW1wb3J0cyAqIGZyb20gZmlsZU5hbWUsIGRvbid0IGFkZCBzeW1ib2xOYW1lXG4gICAgaWYgKGltcG9ydHNBc3Rlcmlzaykge1xuICAgICAgcmV0dXJuIG5ldyBOb29wQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgaW1wb3J0VGV4dE5vZGVzID0gaW1wb3J0cy5maWx0ZXIoXG4gICAgICBuID0+IChuIGFzIHRzLklkZW50aWZpZXIpLnRleHQgPT09IHN5bWJvbE5hbWVcbiAgICApO1xuXG4gICAgLy8gaW5zZXJ0IGltcG9ydCBpZiBpdCdzIG5vdCB0aGVyZVxuICAgIGlmIChpbXBvcnRUZXh0Tm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zdCBmYWxsYmFja1BvcyA9XG4gICAgICAgIGZpbmROb2RlcyhcbiAgICAgICAgICByZWxldmFudEltcG9ydHNbMF0sXG4gICAgICAgICAgdHMuU3ludGF4S2luZC5DbG9zZUJyYWNlVG9rZW5cbiAgICAgICAgKVswXS5nZXRTdGFydCgpIHx8XG4gICAgICAgIGZpbmROb2RlcyhyZWxldmFudEltcG9ydHNbMF0sIHRzLlN5bnRheEtpbmQuRnJvbUtleXdvcmQpWzBdLmdldFN0YXJ0KCk7XG5cbiAgICAgIHJldHVybiBpbnNlcnRBZnRlckxhc3RPY2N1cnJlbmNlKFxuICAgICAgICBpbXBvcnRzLFxuICAgICAgICBgLCAke3N5bWJvbE5hbWV9YCxcbiAgICAgICAgZmlsZVRvRWRpdCxcbiAgICAgICAgZmFsbGJhY2tQb3NcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBOb29wQ2hhbmdlKCk7XG4gIH1cblxuICAvLyBubyBzdWNoIGltcG9ydCBkZWNsYXJhdGlvbiBleGlzdHNcbiAgY29uc3QgdXNlU3RyaWN0ID0gZmluZE5vZGVzKHJvb3ROb2RlLCB0cy5TeW50YXhLaW5kLlN0cmluZ0xpdGVyYWwpLmZpbHRlcihcbiAgICBuID0+IG4uZ2V0VGV4dCgpID09PSAndXNlIHN0cmljdCdcbiAgKTtcbiAgbGV0IGZhbGxiYWNrUG9zID0gMDtcbiAgaWYgKHVzZVN0cmljdC5sZW5ndGggPiAwKSB7XG4gICAgZmFsbGJhY2tQb3MgPSB1c2VTdHJpY3RbMF0uZW5kO1xuICB9XG4gIGNvbnN0IG9wZW4gPSBpc0RlZmF1bHQgPyAnJyA6ICd7ICc7XG4gIGNvbnN0IGNsb3NlID0gaXNEZWZhdWx0ID8gJycgOiAnIH0nO1xuICAvLyBpZiB0aGVyZSBhcmUgbm8gaW1wb3J0cyBvciAndXNlIHN0cmljdCcgc3RhdGVtZW50LCBpbnNlcnQgaW1wb3J0IGF0IGJlZ2lubmluZyBvZiBmaWxlXG4gIGNvbnN0IGluc2VydEF0QmVnaW5uaW5nID0gYWxsSW1wb3J0cy5sZW5ndGggPT09IDAgJiYgdXNlU3RyaWN0Lmxlbmd0aCA9PT0gMDtcbiAgY29uc3Qgc2VwYXJhdG9yID0gaW5zZXJ0QXRCZWdpbm5pbmcgPyAnJyA6ICc7XFxuJztcbiAgY29uc3QgdG9JbnNlcnQgPVxuICAgIGAke3NlcGFyYXRvcn1pbXBvcnQgJHtvcGVufSR7c3ltYm9sTmFtZX0ke2Nsb3NlfWAgK1xuICAgIGAgZnJvbSAnJHtmaWxlTmFtZX0nJHtpbnNlcnRBdEJlZ2lubmluZyA/ICc7XFxuJyA6ICcnfWA7XG5cbiAgcmV0dXJuIGluc2VydEFmdGVyTGFzdE9jY3VycmVuY2UoXG4gICAgYWxsSW1wb3J0cyxcbiAgICB0b0luc2VydCxcbiAgICBmaWxlVG9FZGl0LFxuICAgIGZhbGxiYWNrUG9zLFxuICAgIHRzLlN5bnRheEtpbmQuU3RyaW5nTGl0ZXJhbFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZUltcG9ydChcbiAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSxcbiAgcGF0aDogUGF0aCxcbiAgaW1wb3J0RnJvbTogc3RyaW5nLFxuICBpbXBvcnRBc0lzOiBzdHJpbmcsXG4gIGltcG9ydFRvQmU6IHN0cmluZ1xuKTogKFJlcGxhY2VDaGFuZ2UgfCBSZW1vdmVDaGFuZ2UpW10ge1xuICBjb25zdCBpbXBvcnRzID0gc291cmNlRmlsZS5zdGF0ZW1lbnRzXG4gICAgLmZpbHRlcih0cy5pc0ltcG9ydERlY2xhcmF0aW9uKVxuICAgIC5maWx0ZXIoXG4gICAgICAoeyBtb2R1bGVTcGVjaWZpZXIgfSkgPT5cbiAgICAgICAgbW9kdWxlU3BlY2lmaWVyLmdldFRleHQoc291cmNlRmlsZSkgPT09IGAnJHtpbXBvcnRGcm9tfSdgIHx8XG4gICAgICAgIG1vZHVsZVNwZWNpZmllci5nZXRUZXh0KHNvdXJjZUZpbGUpID09PSBgXCIke2ltcG9ydEZyb219XCJgXG4gICAgKTtcblxuICBpZiAoaW1wb3J0cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdCBpbXBvcnRUZXh0ID0gKHNwZWNpZmllcjogdHMuSW1wb3J0U3BlY2lmaWVyKSA9PiB7XG4gICAgaWYgKHNwZWNpZmllci5uYW1lLnRleHQpIHtcbiAgICAgIHJldHVybiBzcGVjaWZpZXIubmFtZS50ZXh0O1xuICAgIH1cblxuICAgIC8vIGlmIGltcG9ydCBpcyByZW5hbWVkXG4gICAgaWYgKHNwZWNpZmllci5wcm9wZXJ0eU5hbWUgJiYgc3BlY2lmaWVyLnByb3BlcnR5TmFtZS50ZXh0KSB7XG4gICAgICByZXR1cm4gc3BlY2lmaWVyLnByb3BlcnR5TmFtZS50ZXh0O1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfTtcblxuICBjb25zdCBjaGFuZ2VzID0gaW1wb3J0cy5tYXAocCA9PiB7XG4gICAgY29uc3QgaW1wb3J0U3BlY2lmaWVycyA9IChwLmltcG9ydENsYXVzZSEubmFtZWRCaW5kaW5ncyEgYXMgdHMuTmFtZWRJbXBvcnRzKVxuICAgICAgLmVsZW1lbnRzO1xuXG4gICAgY29uc3QgaXNBbHJlYWR5SW1wb3J0ZWQgPSBpbXBvcnRTcGVjaWZpZXJzXG4gICAgICAubWFwKGltcG9ydFRleHQpXG4gICAgICAuaW5jbHVkZXMoaW1wb3J0VG9CZSk7XG5cbiAgICBjb25zdCBpbXBvcnRDaGFuZ2VzID0gaW1wb3J0U3BlY2lmaWVycy5tYXAoKHNwZWNpZmllciwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPSBpbXBvcnRUZXh0KHNwZWNpZmllcik7XG5cbiAgICAgIC8vIGltcG9ydCBpcyBub3QgdGhlIG9uZSB3ZSdyZSBsb29raW5nIGZvciwgY2FuIGJlIHNraXBwZWRcbiAgICAgIGlmICh0ZXh0ICE9PSBpbXBvcnRBc0lzKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIC8vIGlkZW50aWZpZXIgaGFzIG5vdCBiZWVuIGltcG9ydGVkLCBzaW1wbHkgcmVwbGFjZSB0aGUgb2xkIHRleHQgd2l0aCB0aGUgbmV3IHRleHRcbiAgICAgIGlmICghaXNBbHJlYWR5SW1wb3J0ZWQpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVJlcGxhY2VDaGFuZ2UoXG4gICAgICAgICAgc291cmNlRmlsZSxcbiAgICAgICAgICBzcGVjaWZpZXIhLFxuICAgICAgICAgIGltcG9ydEFzSXMsXG4gICAgICAgICAgaW1wb3J0VG9CZVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXh0SWRlbnRpZmllciA9IGltcG9ydFNwZWNpZmllcnNbaW5kZXggKyAxXTtcbiAgICAgIC8vIGlkZW50aWZlciBpcyBub3QgdGhlIGxhc3QsIGFsc28gY2xlYW4gdXAgdGhlIGNvbW1hXG4gICAgICBpZiAobmV4dElkZW50aWZpZXIpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVJlbW92ZUNoYW5nZShcbiAgICAgICAgICBzb3VyY2VGaWxlLFxuICAgICAgICAgIHNwZWNpZmllcixcbiAgICAgICAgICBzcGVjaWZpZXIuZ2V0U3RhcnQoc291cmNlRmlsZSksXG4gICAgICAgICAgbmV4dElkZW50aWZpZXIuZ2V0U3RhcnQoc291cmNlRmlsZSlcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gdGhlcmUgYXJlIG5vIGltcG9ydHMgZm9sbG93aW5nLCBqdXN0IHJlbW92ZSBpdFxuICAgICAgcmV0dXJuIGNyZWF0ZVJlbW92ZUNoYW5nZShcbiAgICAgICAgc291cmNlRmlsZSxcbiAgICAgICAgc3BlY2lmaWVyLFxuICAgICAgICBzcGVjaWZpZXIuZ2V0U3RhcnQoc291cmNlRmlsZSksXG4gICAgICAgIHNwZWNpZmllci5nZXRFbmQoKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpbXBvcnRDaGFuZ2VzLmZpbHRlcihCb29sZWFuKSBhcyAoUmVwbGFjZUNoYW5nZSB8IFJlbW92ZUNoYW5nZSlbXTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNoYW5nZXMucmVkdWNlKChpbXBvcnRzLCBjdXJyKSA9PiBpbXBvcnRzLmNvbmNhdChjdXJyKSwgW10pO1xufVxuIl19