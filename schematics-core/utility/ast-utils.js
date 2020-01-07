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
    function containsProperty(objectLiteral, propertyName) {
        return (objectLiteral &&
            objectLiteral.properties.some(prop => ts.isPropertyAssignment(prop) &&
                ts.isIdentifier(prop.name) &&
                prop.name.text === propertyName));
    }
    exports.containsProperty = containsProperty;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0LXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zY2hlbWF0aWNzLWNvcmUvdXRpbGl0eS9hc3QtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSwwQkFBMEI7SUFDMUI7Ozs7OztPQU1HO0lBQ0gsaUNBQWlDO0lBQ2pDLHVFQVFrQjtJQUdsQjs7Ozs7O09BTUc7SUFDSCxTQUFnQixTQUFTLENBQ3ZCLElBQWEsRUFDYixJQUFtQixFQUNuQixHQUFHLEdBQUcsUUFBUTtRQUVkLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtZQUNyQixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsTUFBTSxHQUFHLEdBQWMsRUFBRSxDQUFDO1FBQzFCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNmLEdBQUcsRUFBRSxDQUFDO1NBQ1A7UUFDRCxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFDWCxLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDdEMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN6QyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7d0JBQ1gsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDaEI7b0JBQ0QsR0FBRyxFQUFFLENBQUM7Z0JBQ1IsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFO29CQUNaLE1BQU07aUJBQ1A7YUFDRjtTQUNGO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBOUJELDhCQThCQztJQUVEOzs7O09BSUc7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RSxDQUNuQixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFxQyxDQUFDO1FBQzNFLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBbEZELHNDQWtGQztJQUVELFNBQWdCLGdCQUFnQixDQUM5QixhQUF5QyxFQUN6QyxZQUFvQjtRQUVwQixPQUFPLENBQ0wsYUFBYTtZQUNiLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUMzQixJQUFJLENBQUMsRUFBRSxDQUNMLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7Z0JBQzdCLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUNsQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBYkQsNENBYUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBpc3RhbmJ1bCBpZ25vcmUgZmlsZSAqL1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQge1xuICBDaGFuZ2UsXG4gIEluc2VydENoYW5nZSxcbiAgTm9vcENoYW5nZSxcbiAgY3JlYXRlUmVwbGFjZUNoYW5nZSxcbiAgUmVwbGFjZUNoYW5nZSxcbiAgUmVtb3ZlQ2hhbmdlLFxuICBjcmVhdGVSZW1vdmVDaGFuZ2UsXG59IGZyb20gJy4vY2hhbmdlJztcbmltcG9ydCB7IFBhdGggfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5cbi8qKlxuICogRmluZCBhbGwgbm9kZXMgZnJvbSB0aGUgQVNUIGluIHRoZSBzdWJ0cmVlIG9mIG5vZGUgb2YgU3ludGF4S2luZCBraW5kLlxuICogQHBhcmFtIG5vZGVcbiAqIEBwYXJhbSBraW5kXG4gKiBAcGFyYW0gbWF4IFRoZSBtYXhpbXVtIG51bWJlciBvZiBpdGVtcyB0byByZXR1cm4uXG4gKiBAcmV0dXJuIGFsbCBub2RlcyBvZiBraW5kLCBvciBbXSBpZiBub25lIGlzIGZvdW5kXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTm9kZXMoXG4gIG5vZGU6IHRzLk5vZGUsXG4gIGtpbmQ6IHRzLlN5bnRheEtpbmQsXG4gIG1heCA9IEluZmluaXR5XG4pOiB0cy5Ob2RlW10ge1xuICBpZiAoIW5vZGUgfHwgbWF4ID09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdCBhcnI6IHRzLk5vZGVbXSA9IFtdO1xuICBpZiAobm9kZS5raW5kID09PSBraW5kKSB7XG4gICAgYXJyLnB1c2gobm9kZSk7XG4gICAgbWF4LS07XG4gIH1cbiAgaWYgKG1heCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUuZ2V0Q2hpbGRyZW4oKSkge1xuICAgICAgZmluZE5vZGVzKGNoaWxkLCBraW5kLCBtYXgpLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgIGlmIChtYXggPiAwKSB7XG4gICAgICAgICAgYXJyLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgbWF4LS07XG4gICAgICB9KTtcblxuICAgICAgaWYgKG1heCA8PSAwKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhcnI7XG59XG5cbi8qKlxuICogR2V0IGFsbCB0aGUgbm9kZXMgZnJvbSBhIHNvdXJjZS5cbiAqIEBwYXJhbSBzb3VyY2VGaWxlIFRoZSBzb3VyY2UgZmlsZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTx0cy5Ob2RlPn0gQW4gb2JzZXJ2YWJsZSBvZiBhbGwgdGhlIG5vZGVzIGluIHRoZSBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTb3VyY2VOb2Rlcyhzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlKTogdHMuTm9kZVtdIHtcbiAgY29uc3Qgbm9kZXM6IHRzLk5vZGVbXSA9IFtzb3VyY2VGaWxlXTtcbiAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKG5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBub2RlID0gbm9kZXMuc2hpZnQoKTtcblxuICAgIGlmIChub2RlKSB7XG4gICAgICByZXN1bHQucHVzaChub2RlKTtcbiAgICAgIGlmIChub2RlLmdldENoaWxkQ291bnQoc291cmNlRmlsZSkgPj0gMCkge1xuICAgICAgICBub2Rlcy51bnNoaWZ0KC4uLm5vZGUuZ2V0Q2hpbGRyZW4oKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZm9yIHNvcnRpbmcgbm9kZXMuXG4gKiBAcmV0dXJuIGZ1bmN0aW9uIHRvIHNvcnQgbm9kZXMgaW4gaW5jcmVhc2luZyBvcmRlciBvZiBwb3NpdGlvbiBpbiBzb3VyY2VGaWxlXG4gKi9cbmZ1bmN0aW9uIG5vZGVzQnlQb3NpdGlvbihmaXJzdDogdHMuTm9kZSwgc2Vjb25kOiB0cy5Ob2RlKTogbnVtYmVyIHtcbiAgcmV0dXJuIGZpcnN0LnBvcyAtIHNlY29uZC5wb3M7XG59XG5cbi8qKlxuICogSW5zZXJ0IGB0b0luc2VydGAgYWZ0ZXIgdGhlIGxhc3Qgb2NjdXJlbmNlIG9mIGB0cy5TeW50YXhLaW5kW25vZGVzW2ldLmtpbmRdYFxuICogb3IgYWZ0ZXIgdGhlIGxhc3Qgb2Ygb2NjdXJlbmNlIG9mIGBzeW50YXhLaW5kYCBpZiB0aGUgbGFzdCBvY2N1cmVuY2UgaXMgYSBzdWIgY2hpbGRcbiAqIG9mIHRzLlN5bnRheEtpbmRbbm9kZXNbaV0ua2luZF0gYW5kIHNhdmUgdGhlIGNoYW5nZXMgaW4gZmlsZS5cbiAqXG4gKiBAcGFyYW0gbm9kZXMgaW5zZXJ0IGFmdGVyIHRoZSBsYXN0IG9jY3VyZW5jZSBvZiBub2Rlc1xuICogQHBhcmFtIHRvSW5zZXJ0IHN0cmluZyB0byBpbnNlcnRcbiAqIEBwYXJhbSBmaWxlIGZpbGUgdG8gaW5zZXJ0IGNoYW5nZXMgaW50b1xuICogQHBhcmFtIGZhbGxiYWNrUG9zIHBvc2l0aW9uIHRvIGluc2VydCBpZiB0b0luc2VydCBoYXBwZW5zIHRvIGJlIHRoZSBmaXJzdCBvY2N1cmVuY2VcbiAqIEBwYXJhbSBzeW50YXhLaW5kIHRoZSB0cy5TeW50YXhLaW5kIG9mIHRoZSBzdWJjaGlsZHJlbiB0byBpbnNlcnQgYWZ0ZXJcbiAqIEByZXR1cm4gQ2hhbmdlIGluc3RhbmNlXG4gKiBAdGhyb3cgRXJyb3IgaWYgdG9JbnNlcnQgaXMgZmlyc3Qgb2NjdXJlbmNlIGJ1dCBmYWxsIGJhY2sgaXMgbm90IHNldFxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0QWZ0ZXJMYXN0T2NjdXJyZW5jZShcbiAgbm9kZXM6IHRzLk5vZGVbXSxcbiAgdG9JbnNlcnQ6IHN0cmluZyxcbiAgZmlsZTogc3RyaW5nLFxuICBmYWxsYmFja1BvczogbnVtYmVyLFxuICBzeW50YXhLaW5kPzogdHMuU3ludGF4S2luZFxuKTogQ2hhbmdlIHtcbiAgbGV0IGxhc3RJdGVtID0gbm9kZXMuc29ydChub2Rlc0J5UG9zaXRpb24pLnBvcCgpO1xuICBpZiAoIWxhc3RJdGVtKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gIH1cbiAgaWYgKHN5bnRheEtpbmQpIHtcbiAgICBsYXN0SXRlbSA9IGZpbmROb2RlcyhsYXN0SXRlbSwgc3ludGF4S2luZClcbiAgICAgIC5zb3J0KG5vZGVzQnlQb3NpdGlvbilcbiAgICAgIC5wb3AoKTtcbiAgfVxuICBpZiAoIWxhc3RJdGVtICYmIGZhbGxiYWNrUG9zID09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGB0cmllZCB0byBpbnNlcnQgJHt0b0luc2VydH0gYXMgZmlyc3Qgb2NjdXJlbmNlIHdpdGggbm8gZmFsbGJhY2sgcG9zaXRpb25gXG4gICAgKTtcbiAgfVxuICBjb25zdCBsYXN0SXRlbVBvc2l0aW9uOiBudW1iZXIgPSBsYXN0SXRlbSA/IGxhc3RJdGVtLmVuZCA6IGZhbGxiYWNrUG9zO1xuXG4gIHJldHVybiBuZXcgSW5zZXJ0Q2hhbmdlKGZpbGUsIGxhc3RJdGVtUG9zaXRpb24sIHRvSW5zZXJ0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRlbnRPZktleUxpdGVyYWwoXG4gIF9zb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIG5vZGU6IHRzLk5vZGVcbik6IHN0cmluZyB8IG51bGwge1xuICBpZiAobm9kZS5raW5kID09IHRzLlN5bnRheEtpbmQuSWRlbnRpZmllcikge1xuICAgIHJldHVybiAobm9kZSBhcyB0cy5JZGVudGlmaWVyKS50ZXh0O1xuICB9IGVsc2UgaWYgKG5vZGUua2luZCA9PSB0cy5TeW50YXhLaW5kLlN0cmluZ0xpdGVyYWwpIHtcbiAgICByZXR1cm4gKG5vZGUgYXMgdHMuU3RyaW5nTGl0ZXJhbCkudGV4dDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBfYW5ndWxhckltcG9ydHNGcm9tTm9kZShcbiAgbm9kZTogdHMuSW1wb3J0RGVjbGFyYXRpb24sXG4gIF9zb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlXG4pOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSB7XG4gIGNvbnN0IG1zID0gbm9kZS5tb2R1bGVTcGVjaWZpZXI7XG4gIGxldCBtb2R1bGVQYXRoOiBzdHJpbmc7XG4gIHN3aXRjaCAobXMua2luZCkge1xuICAgIGNhc2UgdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsOlxuICAgICAgbW9kdWxlUGF0aCA9IChtcyBhcyB0cy5TdHJpbmdMaXRlcmFsKS50ZXh0O1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIGlmICghbW9kdWxlUGF0aC5zdGFydHNXaXRoKCdAYW5ndWxhci8nKSkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIGlmIChub2RlLmltcG9ydENsYXVzZSkge1xuICAgIGlmIChub2RlLmltcG9ydENsYXVzZS5uYW1lKSB7XG4gICAgICAvLyBUaGlzIGlzIG9mIHRoZSBmb3JtIGBpbXBvcnQgTmFtZSBmcm9tICdwYXRoJ2AuIElnbm9yZS5cbiAgICAgIHJldHVybiB7fTtcbiAgICB9IGVsc2UgaWYgKG5vZGUuaW1wb3J0Q2xhdXNlLm5hbWVkQmluZGluZ3MpIHtcbiAgICAgIGNvbnN0IG5iID0gbm9kZS5pbXBvcnRDbGF1c2UubmFtZWRCaW5kaW5ncztcbiAgICAgIGlmIChuYi5raW5kID09IHRzLlN5bnRheEtpbmQuTmFtZXNwYWNlSW1wb3J0KSB7XG4gICAgICAgIC8vIFRoaXMgaXMgb2YgdGhlIGZvcm0gYGltcG9ydCAqIGFzIG5hbWUgZnJvbSAncGF0aCdgLiBSZXR1cm4gYG5hbWUuYC5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBbKG5iIGFzIHRzLk5hbWVzcGFjZUltcG9ydCkubmFtZS50ZXh0ICsgJy4nXTogbW9kdWxlUGF0aCxcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRoaXMgaXMgb2YgdGhlIGZvcm0gYGltcG9ydCB7YSxiLGN9IGZyb20gJ3BhdGgnYFxuICAgICAgICBjb25zdCBuYW1lZEltcG9ydHMgPSBuYiBhcyB0cy5OYW1lZEltcG9ydHM7XG5cbiAgICAgICAgcmV0dXJuIG5hbWVkSW1wb3J0cy5lbGVtZW50c1xuICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAoaXM6IHRzLkltcG9ydFNwZWNpZmllcikgPT5cbiAgICAgICAgICAgICAgaXMucHJvcGVydHlOYW1lID8gaXMucHJvcGVydHlOYW1lLnRleHQgOiBpcy5uYW1lLnRleHRcbiAgICAgICAgICApXG4gICAgICAgICAgLnJlZHVjZSgoYWNjOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSwgY3Vycjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBhY2NbY3Vycl0gPSBtb2R1bGVQYXRoO1xuXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgIH0sIHt9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge307XG4gIH0gZWxzZSB7XG4gICAgLy8gVGhpcyBpcyBvZiB0aGUgZm9ybSBgaW1wb3J0ICdwYXRoJztgLiBOb3RoaW5nIHRvIGRvLlxuICAgIHJldHVybiB7fTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVjb3JhdG9yTWV0YWRhdGEoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgaWRlbnRpZmllcjogc3RyaW5nLFxuICBtb2R1bGU6IHN0cmluZ1xuKTogdHMuTm9kZVtdIHtcbiAgY29uc3QgYW5ndWxhckltcG9ydHM6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9ID0gZmluZE5vZGVzKFxuICAgIHNvdXJjZSxcbiAgICB0cy5TeW50YXhLaW5kLkltcG9ydERlY2xhcmF0aW9uXG4gIClcbiAgICAubWFwKG5vZGUgPT4gX2FuZ3VsYXJJbXBvcnRzRnJvbU5vZGUobm9kZSBhcyB0cy5JbXBvcnREZWNsYXJhdGlvbiwgc291cmNlKSlcbiAgICAucmVkdWNlKFxuICAgICAgKFxuICAgICAgICBhY2M6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9LFxuICAgICAgICBjdXJyZW50OiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfVxuICAgICAgKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGN1cnJlbnQpKSB7XG4gICAgICAgICAgYWNjW2tleV0gPSBjdXJyZW50W2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSxcbiAgICAgIHt9XG4gICAgKTtcblxuICByZXR1cm4gZ2V0U291cmNlTm9kZXMoc291cmNlKVxuICAgIC5maWx0ZXIobm9kZSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBub2RlLmtpbmQgPT0gdHMuU3ludGF4S2luZC5EZWNvcmF0b3IgJiZcbiAgICAgICAgKG5vZGUgYXMgdHMuRGVjb3JhdG9yKS5leHByZXNzaW9uLmtpbmQgPT0gdHMuU3ludGF4S2luZC5DYWxsRXhwcmVzc2lvblxuICAgICAgKTtcbiAgICB9KVxuICAgIC5tYXAobm9kZSA9PiAobm9kZSBhcyB0cy5EZWNvcmF0b3IpLmV4cHJlc3Npb24gYXMgdHMuQ2FsbEV4cHJlc3Npb24pXG4gICAgLmZpbHRlcihleHByID0+IHtcbiAgICAgIGlmIChleHByLmV4cHJlc3Npb24ua2luZCA9PSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIpIHtcbiAgICAgICAgY29uc3QgaWQgPSBleHByLmV4cHJlc3Npb24gYXMgdHMuSWRlbnRpZmllcjtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIGlkLmdldEZ1bGxUZXh0KHNvdXJjZSkgPT0gaWRlbnRpZmllciAmJlxuICAgICAgICAgIGFuZ3VsYXJJbXBvcnRzW2lkLmdldEZ1bGxUZXh0KHNvdXJjZSldID09PSBtb2R1bGVcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGV4cHIuZXhwcmVzc2lvbi5raW5kID09IHRzLlN5bnRheEtpbmQuUHJvcGVydHlBY2Nlc3NFeHByZXNzaW9uXG4gICAgICApIHtcbiAgICAgICAgLy8gVGhpcyBjb3ZlcnMgZm9vLk5nTW9kdWxlIHdoZW4gaW1wb3J0aW5nICogYXMgZm9vLlxuICAgICAgICBjb25zdCBwYUV4cHIgPSBleHByLmV4cHJlc3Npb24gYXMgdHMuUHJvcGVydHlBY2Nlc3NFeHByZXNzaW9uO1xuICAgICAgICAvLyBJZiB0aGUgbGVmdCBleHByZXNzaW9uIGlzIG5vdCBhbiBpZGVudGlmaWVyLCBqdXN0IGdpdmUgdXAgYXQgdGhhdCBwb2ludC5cbiAgICAgICAgaWYgKHBhRXhwci5leHByZXNzaW9uLmtpbmQgIT09IHRzLlN5bnRheEtpbmQuSWRlbnRpZmllcikge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlkID0gcGFFeHByLm5hbWUudGV4dDtcbiAgICAgICAgY29uc3QgbW9kdWxlSWQgPSAocGFFeHByLmV4cHJlc3Npb24gYXMgdHMuSWRlbnRpZmllcikuZ2V0VGV4dChzb3VyY2UpO1xuXG4gICAgICAgIHJldHVybiBpZCA9PT0gaWRlbnRpZmllciAmJiBhbmd1bGFySW1wb3J0c1ttb2R1bGVJZCArICcuJ10gPT09IG1vZHVsZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pXG4gICAgLmZpbHRlcihcbiAgICAgIGV4cHIgPT5cbiAgICAgICAgZXhwci5hcmd1bWVudHNbMF0gJiZcbiAgICAgICAgZXhwci5hcmd1bWVudHNbMF0ua2luZCA9PSB0cy5TeW50YXhLaW5kLk9iamVjdExpdGVyYWxFeHByZXNzaW9uXG4gICAgKVxuICAgIC5tYXAoZXhwciA9PiBleHByLmFyZ3VtZW50c1swXSBhcyB0cy5PYmplY3RMaXRlcmFsRXhwcmVzc2lvbik7XG59XG5cbmZ1bmN0aW9uIF9hZGRTeW1ib2xUb05nTW9kdWxlTWV0YWRhdGEoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgbmdNb2R1bGVQYXRoOiBzdHJpbmcsXG4gIG1ldGFkYXRhRmllbGQ6IHN0cmluZyxcbiAgc3ltYm9sTmFtZTogc3RyaW5nLFxuICBpbXBvcnRQYXRoOiBzdHJpbmdcbik6IENoYW5nZVtdIHtcbiAgY29uc3Qgbm9kZXMgPSBnZXREZWNvcmF0b3JNZXRhZGF0YShzb3VyY2UsICdOZ01vZHVsZScsICdAYW5ndWxhci9jb3JlJyk7XG4gIGxldCBub2RlOiBhbnkgPSBub2Rlc1swXTsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1hbnlcblxuICAvLyBGaW5kIHRoZSBkZWNvcmF0b3IgZGVjbGFyYXRpb24uXG4gIGlmICghbm9kZSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8vIEdldCBhbGwgdGhlIGNoaWxkcmVuIHByb3BlcnR5IGFzc2lnbm1lbnQgb2Ygb2JqZWN0IGxpdGVyYWxzLlxuICBjb25zdCBtYXRjaGluZ1Byb3BlcnRpZXM6IHRzLk9iamVjdExpdGVyYWxFbGVtZW50W10gPSAobm9kZSBhcyB0cy5PYmplY3RMaXRlcmFsRXhwcmVzc2lvbikucHJvcGVydGllc1xuICAgIC5maWx0ZXIocHJvcCA9PiBwcm9wLmtpbmQgPT0gdHMuU3ludGF4S2luZC5Qcm9wZXJ0eUFzc2lnbm1lbnQpXG4gICAgLy8gRmlsdGVyIG91dCBldmVyeSBmaWVsZHMgdGhhdCdzIG5vdCBcIm1ldGFkYXRhRmllbGRcIi4gQWxzbyBoYW5kbGVzIHN0cmluZyBsaXRlcmFsc1xuICAgIC8vIChidXQgbm90IGV4cHJlc3Npb25zKS5cbiAgICAuZmlsdGVyKChwcm9wOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IG5hbWUgPSBwcm9wLm5hbWU7XG4gICAgICBzd2l0Y2ggKG5hbWUua2luZCkge1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuSWRlbnRpZmllcjpcbiAgICAgICAgICByZXR1cm4gKG5hbWUgYXMgdHMuSWRlbnRpZmllcikuZ2V0VGV4dChzb3VyY2UpID09IG1ldGFkYXRhRmllbGQ7XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsOlxuICAgICAgICAgIHJldHVybiAobmFtZSBhcyB0cy5TdHJpbmdMaXRlcmFsKS50ZXh0ID09IG1ldGFkYXRhRmllbGQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAvLyBHZXQgdGhlIGxhc3Qgbm9kZSBvZiB0aGUgYXJyYXkgbGl0ZXJhbC5cbiAgaWYgKCFtYXRjaGluZ1Byb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKG1hdGNoaW5nUHJvcGVydGllcy5sZW5ndGggPT0gMCkge1xuICAgIC8vIFdlIGhhdmVuJ3QgZm91bmQgdGhlIGZpZWxkIGluIHRoZSBtZXRhZGF0YSBkZWNsYXJhdGlvbi4gSW5zZXJ0IGEgbmV3IGZpZWxkLlxuICAgIGNvbnN0IGV4cHIgPSBub2RlIGFzIHRzLk9iamVjdExpdGVyYWxFeHByZXNzaW9uO1xuICAgIGxldCBwb3NpdGlvbjogbnVtYmVyO1xuICAgIGxldCB0b0luc2VydDogc3RyaW5nO1xuICAgIGlmIChleHByLnByb3BlcnRpZXMubGVuZ3RoID09IDApIHtcbiAgICAgIHBvc2l0aW9uID0gZXhwci5nZXRFbmQoKSAtIDE7XG4gICAgICB0b0luc2VydCA9IGAgICR7bWV0YWRhdGFGaWVsZH06IFske3N5bWJvbE5hbWV9XVxcbmA7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUgPSBleHByLnByb3BlcnRpZXNbZXhwci5wcm9wZXJ0aWVzLmxlbmd0aCAtIDFdO1xuICAgICAgcG9zaXRpb24gPSBub2RlLmdldEVuZCgpO1xuICAgICAgLy8gR2V0IHRoZSBpbmRlbnRhdGlvbiBvZiB0aGUgbGFzdCBlbGVtZW50LCBpZiBhbnkuXG4gICAgICBjb25zdCB0ZXh0ID0gbm9kZS5nZXRGdWxsVGV4dChzb3VyY2UpO1xuICAgICAgY29uc3QgbWF0Y2hlcyA9IHRleHQubWF0Y2goL15cXHI/XFxuXFxzKi8pO1xuICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0b0luc2VydCA9IGAsJHttYXRjaGVzWzBdfSR7bWV0YWRhdGFGaWVsZH06IFske3N5bWJvbE5hbWV9XWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b0luc2VydCA9IGAsICR7bWV0YWRhdGFGaWVsZH06IFske3N5bWJvbE5hbWV9XWA7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IG5ld01ldGFkYXRhUHJvcGVydHkgPSBuZXcgSW5zZXJ0Q2hhbmdlKFxuICAgICAgbmdNb2R1bGVQYXRoLFxuICAgICAgcG9zaXRpb24sXG4gICAgICB0b0luc2VydFxuICAgICk7XG4gICAgY29uc3QgbmV3TWV0YWRhdGFJbXBvcnQgPSBpbnNlcnRJbXBvcnQoXG4gICAgICBzb3VyY2UsXG4gICAgICBuZ01vZHVsZVBhdGgsXG4gICAgICBzeW1ib2xOYW1lLnJlcGxhY2UoL1xcLi4qJC8sICcnKSxcbiAgICAgIGltcG9ydFBhdGhcbiAgICApO1xuXG4gICAgcmV0dXJuIFtuZXdNZXRhZGF0YVByb3BlcnR5LCBuZXdNZXRhZGF0YUltcG9ydF07XG4gIH1cblxuICBjb25zdCBhc3NpZ25tZW50ID0gbWF0Y2hpbmdQcm9wZXJ0aWVzWzBdIGFzIHRzLlByb3BlcnR5QXNzaWdubWVudDtcblxuICAvLyBJZiBpdCdzIG5vdCBhbiBhcnJheSwgbm90aGluZyB3ZSBjYW4gZG8gcmVhbGx5LlxuICBpZiAoYXNzaWdubWVudC5pbml0aWFsaXplci5raW5kICE9PSB0cy5TeW50YXhLaW5kLkFycmF5TGl0ZXJhbEV4cHJlc3Npb24pIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdCBhcnJMaXRlcmFsID0gYXNzaWdubWVudC5pbml0aWFsaXplciBhcyB0cy5BcnJheUxpdGVyYWxFeHByZXNzaW9uO1xuICBpZiAoYXJyTGl0ZXJhbC5lbGVtZW50cy5sZW5ndGggPT0gMCkge1xuICAgIC8vIEZvcndhcmQgdGhlIHByb3BlcnR5LlxuICAgIG5vZGUgPSBhcnJMaXRlcmFsO1xuICB9IGVsc2Uge1xuICAgIG5vZGUgPSBhcnJMaXRlcmFsLmVsZW1lbnRzO1xuICB9XG5cbiAgaWYgKCFub2RlKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICAnTm8gYXBwIG1vZHVsZSBmb3VuZC4gUGxlYXNlIGFkZCB5b3VyIG5ldyBjbGFzcyB0byB5b3VyIGNvbXBvbmVudC4nXG4gICAgKTtcblxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgY29uc3Qgbm9kZUFycmF5ID0gKG5vZGUgYXMge30pIGFzIEFycmF5PHRzLk5vZGU+O1xuICAgIGNvbnN0IHN5bWJvbHNBcnJheSA9IG5vZGVBcnJheS5tYXAobm9kZSA9PiBub2RlLmdldFRleHQoKSk7XG4gICAgaWYgKHN5bWJvbHNBcnJheS5pbmNsdWRlcyhzeW1ib2xOYW1lKSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIG5vZGUgPSBub2RlW25vZGUubGVuZ3RoIC0gMV07XG5cbiAgICBjb25zdCBlZmZlY3RzTW9kdWxlID0gbm9kZUFycmF5LmZpbmQoXG4gICAgICBub2RlID0+XG4gICAgICAgIChub2RlLmdldFRleHQoKS5pbmNsdWRlcygnRWZmZWN0c01vZHVsZS5mb3JSb290JykgJiZcbiAgICAgICAgICBzeW1ib2xOYW1lLmluY2x1ZGVzKCdFZmZlY3RzTW9kdWxlLmZvclJvb3QnKSkgfHxcbiAgICAgICAgKG5vZGUuZ2V0VGV4dCgpLmluY2x1ZGVzKCdFZmZlY3RzTW9kdWxlLmZvckZlYXR1cmUnKSAmJlxuICAgICAgICAgIHN5bWJvbE5hbWUuaW5jbHVkZXMoJ0VmZmVjdHNNb2R1bGUuZm9yRmVhdHVyZScpKVxuICAgICk7XG5cbiAgICBpZiAoZWZmZWN0c01vZHVsZSAmJiBzeW1ib2xOYW1lLmluY2x1ZGVzKCdFZmZlY3RzTW9kdWxlJykpIHtcbiAgICAgIGNvbnN0IGVmZmVjdHNBcmdzID0gKGVmZmVjdHNNb2R1bGUgYXMgYW55KS5hcmd1bWVudHMuc2hpZnQoKTtcblxuICAgICAgaWYgKFxuICAgICAgICBlZmZlY3RzQXJncyAmJlxuICAgICAgICBlZmZlY3RzQXJncy5raW5kID09PSB0cy5TeW50YXhLaW5kLkFycmF5TGl0ZXJhbEV4cHJlc3Npb25cbiAgICAgICkge1xuICAgICAgICBjb25zdCBlZmZlY3RzRWxlbWVudHMgPSAoZWZmZWN0c0FyZ3MgYXMgdHMuQXJyYXlMaXRlcmFsRXhwcmVzc2lvbilcbiAgICAgICAgICAuZWxlbWVudHM7XG4gICAgICAgIGNvbnN0IFssIGVmZmVjdHNTeW1ib2xdID0gKDxhbnk+c3ltYm9sTmFtZSkubWF0Y2goL1xcWyguKilcXF0vKTtcblxuICAgICAgICBsZXQgZXBvcztcbiAgICAgICAgaWYgKGVmZmVjdHNFbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBlcG9zID0gZWZmZWN0c0FyZ3MuZ2V0U3RhcnQoKSArIDE7XG4gICAgICAgICAgcmV0dXJuIFtuZXcgSW5zZXJ0Q2hhbmdlKG5nTW9kdWxlUGF0aCwgZXBvcywgZWZmZWN0c1N5bWJvbCldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGxhc3RFZmZlY3QgPSBlZmZlY3RzRWxlbWVudHNbXG4gICAgICAgICAgICBlZmZlY3RzRWxlbWVudHMubGVuZ3RoIC0gMVxuICAgICAgICAgIF0gYXMgdHMuRXhwcmVzc2lvbjtcbiAgICAgICAgICBlcG9zID0gbGFzdEVmZmVjdC5nZXRFbmQoKTtcbiAgICAgICAgICAvLyBHZXQgdGhlIGluZGVudGF0aW9uIG9mIHRoZSBsYXN0IGVsZW1lbnQsIGlmIGFueS5cbiAgICAgICAgICBjb25zdCB0ZXh0OiBhbnkgPSBsYXN0RWZmZWN0LmdldEZ1bGxUZXh0KHNvdXJjZSk7XG5cbiAgICAgICAgICBsZXQgZWZmZWN0SW5zZXJ0OiBzdHJpbmc7XG4gICAgICAgICAgaWYgKHRleHQubWF0Y2goJ15cXHI/XFxyP1xcbicpKSB7XG4gICAgICAgICAgICBlZmZlY3RJbnNlcnQgPSBgLCR7dGV4dC5tYXRjaCgvXlxccj9cXG5cXHMrLylbMF19JHtlZmZlY3RzU3ltYm9sfWA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVmZmVjdEluc2VydCA9IGAsICR7ZWZmZWN0c1N5bWJvbH1gO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBbbmV3IEluc2VydENoYW5nZShuZ01vZHVsZVBhdGgsIGVwb3MsIGVmZmVjdEluc2VydCldO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbGV0IHRvSW5zZXJ0OiBzdHJpbmc7XG4gIGxldCBwb3NpdGlvbiA9IG5vZGUuZ2V0RW5kKCk7XG4gIGlmIChub2RlLmtpbmQgPT0gdHMuU3ludGF4S2luZC5PYmplY3RMaXRlcmFsRXhwcmVzc2lvbikge1xuICAgIC8vIFdlIGhhdmVuJ3QgZm91bmQgdGhlIGZpZWxkIGluIHRoZSBtZXRhZGF0YSBkZWNsYXJhdGlvbi4gSW5zZXJ0IGEgbmV3XG4gICAgLy8gZmllbGQuXG4gICAgY29uc3QgZXhwciA9IG5vZGUgYXMgdHMuT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb247XG4gICAgaWYgKGV4cHIucHJvcGVydGllcy5sZW5ndGggPT0gMCkge1xuICAgICAgcG9zaXRpb24gPSBleHByLmdldEVuZCgpIC0gMTtcbiAgICAgIHRvSW5zZXJ0ID0gYCAgJHttZXRhZGF0YUZpZWxkfTogWyR7c3ltYm9sTmFtZX1dXFxuYDtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IGV4cHIucHJvcGVydGllc1tleHByLnByb3BlcnRpZXMubGVuZ3RoIC0gMV07XG4gICAgICBwb3NpdGlvbiA9IG5vZGUuZ2V0RW5kKCk7XG4gICAgICAvLyBHZXQgdGhlIGluZGVudGF0aW9uIG9mIHRoZSBsYXN0IGVsZW1lbnQsIGlmIGFueS5cbiAgICAgIGNvbnN0IHRleHQgPSBub2RlLmdldEZ1bGxUZXh0KHNvdXJjZSk7XG4gICAgICBpZiAodGV4dC5tYXRjaCgnXlxccj9cXHI/XFxuJykpIHtcbiAgICAgICAgdG9JbnNlcnQgPSBgLCR7XG4gICAgICAgICAgdGV4dC5tYXRjaCgvXlxccj9cXG5cXHMrLylbMF1cbiAgICAgICAgfSR7bWV0YWRhdGFGaWVsZH06IFske3N5bWJvbE5hbWV9XWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b0luc2VydCA9IGAsICR7bWV0YWRhdGFGaWVsZH06IFske3N5bWJvbE5hbWV9XWA7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKG5vZGUua2luZCA9PSB0cy5TeW50YXhLaW5kLkFycmF5TGl0ZXJhbEV4cHJlc3Npb24pIHtcbiAgICAvLyBXZSBmb3VuZCB0aGUgZmllbGQgYnV0IGl0J3MgZW1wdHkuIEluc2VydCBpdCBqdXN0IGJlZm9yZSB0aGUgYF1gLlxuICAgIHBvc2l0aW9uLS07XG4gICAgdG9JbnNlcnQgPSBgJHtzeW1ib2xOYW1lfWA7XG4gIH0gZWxzZSB7XG4gICAgLy8gR2V0IHRoZSBpbmRlbnRhdGlvbiBvZiB0aGUgbGFzdCBlbGVtZW50LCBpZiBhbnkuXG4gICAgY29uc3QgdGV4dCA9IG5vZGUuZ2V0RnVsbFRleHQoc291cmNlKTtcbiAgICBpZiAodGV4dC5tYXRjaCgvXlxccj9cXG4vKSkge1xuICAgICAgdG9JbnNlcnQgPSBgLCR7dGV4dC5tYXRjaCgvXlxccj9cXG4oXFxyPylcXHMrLylbMF19JHtzeW1ib2xOYW1lfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvSW5zZXJ0ID0gYCwgJHtzeW1ib2xOYW1lfWA7XG4gICAgfVxuICB9XG4gIGNvbnN0IGluc2VydCA9IG5ldyBJbnNlcnRDaGFuZ2UobmdNb2R1bGVQYXRoLCBwb3NpdGlvbiwgdG9JbnNlcnQpO1xuICBjb25zdCBpbXBvcnRJbnNlcnQ6IENoYW5nZSA9IGluc2VydEltcG9ydChcbiAgICBzb3VyY2UsXG4gICAgbmdNb2R1bGVQYXRoLFxuICAgIHN5bWJvbE5hbWUucmVwbGFjZSgvXFwuLiokLywgJycpLFxuICAgIGltcG9ydFBhdGhcbiAgKTtcblxuICByZXR1cm4gW2luc2VydCwgaW1wb3J0SW5zZXJ0XTtcbn1cblxuLyoqXG4gKiBDdXN0b20gZnVuY3Rpb24gdG8gaW5zZXJ0IGEgZGVjbGFyYXRpb24gKGNvbXBvbmVudCwgcGlwZSwgZGlyZWN0aXZlKVxuICogaW50byBOZ01vZHVsZSBkZWNsYXJhdGlvbnMuIEl0IGFsc28gaW1wb3J0cyB0aGUgY29tcG9uZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkRGVjbGFyYXRpb25Ub01vZHVsZShcbiAgc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICBtb2R1bGVQYXRoOiBzdHJpbmcsXG4gIGNsYXNzaWZpZWROYW1lOiBzdHJpbmcsXG4gIGltcG9ydFBhdGg6IHN0cmluZ1xuKTogQ2hhbmdlW10ge1xuICByZXR1cm4gX2FkZFN5bWJvbFRvTmdNb2R1bGVNZXRhZGF0YShcbiAgICBzb3VyY2UsXG4gICAgbW9kdWxlUGF0aCxcbiAgICAnZGVjbGFyYXRpb25zJyxcbiAgICBjbGFzc2lmaWVkTmFtZSxcbiAgICBpbXBvcnRQYXRoXG4gICk7XG59XG5cbi8qKlxuICogQ3VzdG9tIGZ1bmN0aW9uIHRvIGluc2VydCBhIGRlY2xhcmF0aW9uIChjb21wb25lbnQsIHBpcGUsIGRpcmVjdGl2ZSlcbiAqIGludG8gTmdNb2R1bGUgZGVjbGFyYXRpb25zLiBJdCBhbHNvIGltcG9ydHMgdGhlIGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEltcG9ydFRvTW9kdWxlKFxuICBzb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIG1vZHVsZVBhdGg6IHN0cmluZyxcbiAgY2xhc3NpZmllZE5hbWU6IHN0cmluZyxcbiAgaW1wb3J0UGF0aDogc3RyaW5nXG4pOiBDaGFuZ2VbXSB7XG4gIHJldHVybiBfYWRkU3ltYm9sVG9OZ01vZHVsZU1ldGFkYXRhKFxuICAgIHNvdXJjZSxcbiAgICBtb2R1bGVQYXRoLFxuICAgICdpbXBvcnRzJyxcbiAgICBjbGFzc2lmaWVkTmFtZSxcbiAgICBpbXBvcnRQYXRoXG4gICk7XG59XG5cbi8qKlxuICogQ3VzdG9tIGZ1bmN0aW9uIHRvIGluc2VydCBhIHByb3ZpZGVyIGludG8gTmdNb2R1bGUuIEl0IGFsc28gaW1wb3J0cyBpdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZFByb3ZpZGVyVG9Nb2R1bGUoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgbW9kdWxlUGF0aDogc3RyaW5nLFxuICBjbGFzc2lmaWVkTmFtZTogc3RyaW5nLFxuICBpbXBvcnRQYXRoOiBzdHJpbmdcbik6IENoYW5nZVtdIHtcbiAgcmV0dXJuIF9hZGRTeW1ib2xUb05nTW9kdWxlTWV0YWRhdGEoXG4gICAgc291cmNlLFxuICAgIG1vZHVsZVBhdGgsXG4gICAgJ3Byb3ZpZGVycycsXG4gICAgY2xhc3NpZmllZE5hbWUsXG4gICAgaW1wb3J0UGF0aFxuICApO1xufVxuXG4vKipcbiAqIEN1c3RvbSBmdW5jdGlvbiB0byBpbnNlcnQgYW4gZXhwb3J0IGludG8gTmdNb2R1bGUuIEl0IGFsc28gaW1wb3J0cyBpdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEV4cG9ydFRvTW9kdWxlKFxuICBzb3VyY2U6IHRzLlNvdXJjZUZpbGUsXG4gIG1vZHVsZVBhdGg6IHN0cmluZyxcbiAgY2xhc3NpZmllZE5hbWU6IHN0cmluZyxcbiAgaW1wb3J0UGF0aDogc3RyaW5nXG4pOiBDaGFuZ2VbXSB7XG4gIHJldHVybiBfYWRkU3ltYm9sVG9OZ01vZHVsZU1ldGFkYXRhKFxuICAgIHNvdXJjZSxcbiAgICBtb2R1bGVQYXRoLFxuICAgICdleHBvcnRzJyxcbiAgICBjbGFzc2lmaWVkTmFtZSxcbiAgICBpbXBvcnRQYXRoXG4gICk7XG59XG5cbi8qKlxuICogQ3VzdG9tIGZ1bmN0aW9uIHRvIGluc2VydCBhbiBleHBvcnQgaW50byBOZ01vZHVsZS4gSXQgYWxzbyBpbXBvcnRzIGl0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkQm9vdHN0cmFwVG9Nb2R1bGUoXG4gIHNvdXJjZTogdHMuU291cmNlRmlsZSxcbiAgbW9kdWxlUGF0aDogc3RyaW5nLFxuICBjbGFzc2lmaWVkTmFtZTogc3RyaW5nLFxuICBpbXBvcnRQYXRoOiBzdHJpbmdcbik6IENoYW5nZVtdIHtcbiAgcmV0dXJuIF9hZGRTeW1ib2xUb05nTW9kdWxlTWV0YWRhdGEoXG4gICAgc291cmNlLFxuICAgIG1vZHVsZVBhdGgsXG4gICAgJ2Jvb3RzdHJhcCcsXG4gICAgY2xhc3NpZmllZE5hbWUsXG4gICAgaW1wb3J0UGF0aFxuICApO1xufVxuXG4vKipcbiAqIEFkZCBJbXBvcnQgYGltcG9ydCB7IHN5bWJvbE5hbWUgfSBmcm9tIGZpbGVOYW1lYCBpZiB0aGUgaW1wb3J0IGRvZXNuJ3QgZXhpdFxuICogYWxyZWFkeS4gQXNzdW1lcyBmaWxlVG9FZGl0IGNhbiBiZSByZXNvbHZlZCBhbmQgYWNjZXNzZWQuXG4gKiBAcGFyYW0gZmlsZVRvRWRpdCAoZmlsZSB3ZSB3YW50IHRvIGFkZCBpbXBvcnQgdG8pXG4gKiBAcGFyYW0gc3ltYm9sTmFtZSAoaXRlbSB0byBpbXBvcnQpXG4gKiBAcGFyYW0gZmlsZU5hbWUgKHBhdGggdG8gdGhlIGZpbGUpXG4gKiBAcGFyYW0gaXNEZWZhdWx0IChpZiB0cnVlLCBpbXBvcnQgZm9sbG93cyBzdHlsZSBmb3IgaW1wb3J0aW5nIGRlZmF1bHQgZXhwb3J0cylcbiAqIEByZXR1cm4gQ2hhbmdlXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEltcG9ydChcbiAgc291cmNlOiB0cy5Tb3VyY2VGaWxlLFxuICBmaWxlVG9FZGl0OiBzdHJpbmcsXG4gIHN5bWJvbE5hbWU6IHN0cmluZyxcbiAgZmlsZU5hbWU6IHN0cmluZyxcbiAgaXNEZWZhdWx0ID0gZmFsc2Vcbik6IENoYW5nZSB7XG4gIGNvbnN0IHJvb3ROb2RlID0gc291cmNlO1xuICBjb25zdCBhbGxJbXBvcnRzID0gZmluZE5vZGVzKHJvb3ROb2RlLCB0cy5TeW50YXhLaW5kLkltcG9ydERlY2xhcmF0aW9uKTtcblxuICAvLyBnZXQgbm9kZXMgdGhhdCBtYXAgdG8gaW1wb3J0IHN0YXRlbWVudHMgZnJvbSB0aGUgZmlsZSBmaWxlTmFtZVxuICBjb25zdCByZWxldmFudEltcG9ydHMgPSBhbGxJbXBvcnRzLmZpbHRlcihub2RlID0+IHtcbiAgICAvLyBTdHJpbmdMaXRlcmFsIG9mIHRoZSBJbXBvcnREZWNsYXJhdGlvbiBpcyB0aGUgaW1wb3J0IGZpbGUgKGZpbGVOYW1lIGluIHRoaXMgY2FzZSkuXG4gICAgY29uc3QgaW1wb3J0RmlsZXMgPSBub2RlXG4gICAgICAuZ2V0Q2hpbGRyZW4oKVxuICAgICAgLmZpbHRlcihjaGlsZCA9PiBjaGlsZC5raW5kID09PSB0cy5TeW50YXhLaW5kLlN0cmluZ0xpdGVyYWwpXG4gICAgICAubWFwKG4gPT4gKG4gYXMgdHMuU3RyaW5nTGl0ZXJhbCkudGV4dCk7XG5cbiAgICByZXR1cm4gaW1wb3J0RmlsZXMuZmlsdGVyKGZpbGUgPT4gZmlsZSA9PT0gZmlsZU5hbWUpLmxlbmd0aCA9PT0gMTtcbiAgfSk7XG5cbiAgaWYgKHJlbGV2YW50SW1wb3J0cy5sZW5ndGggPiAwKSB7XG4gICAgbGV0IGltcG9ydHNBc3RlcmlzayA9IGZhbHNlO1xuICAgIC8vIGltcG9ydHMgZnJvbSBpbXBvcnQgZmlsZVxuICAgIGNvbnN0IGltcG9ydHM6IHRzLk5vZGVbXSA9IFtdO1xuICAgIHJlbGV2YW50SW1wb3J0cy5mb3JFYWNoKG4gPT4ge1xuICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoXG4gICAgICAgIGltcG9ydHMsXG4gICAgICAgIGZpbmROb2RlcyhuLCB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIpXG4gICAgICApO1xuICAgICAgaWYgKGZpbmROb2RlcyhuLCB0cy5TeW50YXhLaW5kLkFzdGVyaXNrVG9rZW4pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaW1wb3J0c0FzdGVyaXNrID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGlmIGltcG9ydHMgKiBmcm9tIGZpbGVOYW1lLCBkb24ndCBhZGQgc3ltYm9sTmFtZVxuICAgIGlmIChpbXBvcnRzQXN0ZXJpc2spIHtcbiAgICAgIHJldHVybiBuZXcgTm9vcENoYW5nZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IGltcG9ydFRleHROb2RlcyA9IGltcG9ydHMuZmlsdGVyKFxuICAgICAgbiA9PiAobiBhcyB0cy5JZGVudGlmaWVyKS50ZXh0ID09PSBzeW1ib2xOYW1lXG4gICAgKTtcblxuICAgIC8vIGluc2VydCBpbXBvcnQgaWYgaXQncyBub3QgdGhlcmVcbiAgICBpZiAoaW1wb3J0VGV4dE5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc3QgZmFsbGJhY2tQb3MgPVxuICAgICAgICBmaW5kTm9kZXMoXG4gICAgICAgICAgcmVsZXZhbnRJbXBvcnRzWzBdLFxuICAgICAgICAgIHRzLlN5bnRheEtpbmQuQ2xvc2VCcmFjZVRva2VuXG4gICAgICAgIClbMF0uZ2V0U3RhcnQoKSB8fFxuICAgICAgICBmaW5kTm9kZXMocmVsZXZhbnRJbXBvcnRzWzBdLCB0cy5TeW50YXhLaW5kLkZyb21LZXl3b3JkKVswXS5nZXRTdGFydCgpO1xuXG4gICAgICByZXR1cm4gaW5zZXJ0QWZ0ZXJMYXN0T2NjdXJyZW5jZShcbiAgICAgICAgaW1wb3J0cyxcbiAgICAgICAgYCwgJHtzeW1ib2xOYW1lfWAsXG4gICAgICAgIGZpbGVUb0VkaXQsXG4gICAgICAgIGZhbGxiYWNrUG9zXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgTm9vcENoYW5nZSgpO1xuICB9XG5cbiAgLy8gbm8gc3VjaCBpbXBvcnQgZGVjbGFyYXRpb24gZXhpc3RzXG4gIGNvbnN0IHVzZVN0cmljdCA9IGZpbmROb2Rlcyhyb290Tm9kZSwgdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsKS5maWx0ZXIoXG4gICAgbiA9PiBuLmdldFRleHQoKSA9PT0gJ3VzZSBzdHJpY3QnXG4gICk7XG4gIGxldCBmYWxsYmFja1BvcyA9IDA7XG4gIGlmICh1c2VTdHJpY3QubGVuZ3RoID4gMCkge1xuICAgIGZhbGxiYWNrUG9zID0gdXNlU3RyaWN0WzBdLmVuZDtcbiAgfVxuICBjb25zdCBvcGVuID0gaXNEZWZhdWx0ID8gJycgOiAneyAnO1xuICBjb25zdCBjbG9zZSA9IGlzRGVmYXVsdCA/ICcnIDogJyB9JztcbiAgLy8gaWYgdGhlcmUgYXJlIG5vIGltcG9ydHMgb3IgJ3VzZSBzdHJpY3QnIHN0YXRlbWVudCwgaW5zZXJ0IGltcG9ydCBhdCBiZWdpbm5pbmcgb2YgZmlsZVxuICBjb25zdCBpbnNlcnRBdEJlZ2lubmluZyA9IGFsbEltcG9ydHMubGVuZ3RoID09PSAwICYmIHVzZVN0cmljdC5sZW5ndGggPT09IDA7XG4gIGNvbnN0IHNlcGFyYXRvciA9IGluc2VydEF0QmVnaW5uaW5nID8gJycgOiAnO1xcbic7XG4gIGNvbnN0IHRvSW5zZXJ0ID1cbiAgICBgJHtzZXBhcmF0b3J9aW1wb3J0ICR7b3Blbn0ke3N5bWJvbE5hbWV9JHtjbG9zZX1gICtcbiAgICBgIGZyb20gJyR7ZmlsZU5hbWV9JyR7aW5zZXJ0QXRCZWdpbm5pbmcgPyAnO1xcbicgOiAnJ31gO1xuXG4gIHJldHVybiBpbnNlcnRBZnRlckxhc3RPY2N1cnJlbmNlKFxuICAgIGFsbEltcG9ydHMsXG4gICAgdG9JbnNlcnQsXG4gICAgZmlsZVRvRWRpdCxcbiAgICBmYWxsYmFja1BvcyxcbiAgICB0cy5TeW50YXhLaW5kLlN0cmluZ0xpdGVyYWxcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VJbXBvcnQoXG4gIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gIHBhdGg6IFBhdGgsXG4gIGltcG9ydEZyb206IHN0cmluZyxcbiAgaW1wb3J0QXNJczogc3RyaW5nLFxuICBpbXBvcnRUb0JlOiBzdHJpbmdcbik6IChSZXBsYWNlQ2hhbmdlIHwgUmVtb3ZlQ2hhbmdlKVtdIHtcbiAgY29uc3QgaW1wb3J0cyA9IHNvdXJjZUZpbGUuc3RhdGVtZW50c1xuICAgIC5maWx0ZXIodHMuaXNJbXBvcnREZWNsYXJhdGlvbilcbiAgICAuZmlsdGVyKFxuICAgICAgKHsgbW9kdWxlU3BlY2lmaWVyIH0pID0+XG4gICAgICAgIG1vZHVsZVNwZWNpZmllci5nZXRUZXh0KHNvdXJjZUZpbGUpID09PSBgJyR7aW1wb3J0RnJvbX0nYCB8fFxuICAgICAgICBtb2R1bGVTcGVjaWZpZXIuZ2V0VGV4dChzb3VyY2VGaWxlKSA9PT0gYFwiJHtpbXBvcnRGcm9tfVwiYFxuICAgICk7XG5cbiAgaWYgKGltcG9ydHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgaW1wb3J0VGV4dCA9IChzcGVjaWZpZXI6IHRzLkltcG9ydFNwZWNpZmllcikgPT4ge1xuICAgIGlmIChzcGVjaWZpZXIubmFtZS50ZXh0KSB7XG4gICAgICByZXR1cm4gc3BlY2lmaWVyLm5hbWUudGV4dDtcbiAgICB9XG5cbiAgICAvLyBpZiBpbXBvcnQgaXMgcmVuYW1lZFxuICAgIGlmIChzcGVjaWZpZXIucHJvcGVydHlOYW1lICYmIHNwZWNpZmllci5wcm9wZXJ0eU5hbWUudGV4dCkge1xuICAgICAgcmV0dXJuIHNwZWNpZmllci5wcm9wZXJ0eU5hbWUudGV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH07XG5cbiAgY29uc3QgY2hhbmdlcyA9IGltcG9ydHMubWFwKHAgPT4ge1xuICAgIGNvbnN0IGltcG9ydFNwZWNpZmllcnMgPSAocC5pbXBvcnRDbGF1c2UhLm5hbWVkQmluZGluZ3MhIGFzIHRzLk5hbWVkSW1wb3J0cylcbiAgICAgIC5lbGVtZW50cztcblxuICAgIGNvbnN0IGlzQWxyZWFkeUltcG9ydGVkID0gaW1wb3J0U3BlY2lmaWVyc1xuICAgICAgLm1hcChpbXBvcnRUZXh0KVxuICAgICAgLmluY2x1ZGVzKGltcG9ydFRvQmUpO1xuXG4gICAgY29uc3QgaW1wb3J0Q2hhbmdlcyA9IGltcG9ydFNwZWNpZmllcnMubWFwKChzcGVjaWZpZXIsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB0ZXh0ID0gaW1wb3J0VGV4dChzcGVjaWZpZXIpO1xuXG4gICAgICAvLyBpbXBvcnQgaXMgbm90IHRoZSBvbmUgd2UncmUgbG9va2luZyBmb3IsIGNhbiBiZSBza2lwcGVkXG4gICAgICBpZiAodGV4dCAhPT0gaW1wb3J0QXNJcykge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICAvLyBpZGVudGlmaWVyIGhhcyBub3QgYmVlbiBpbXBvcnRlZCwgc2ltcGx5IHJlcGxhY2UgdGhlIG9sZCB0ZXh0IHdpdGggdGhlIG5ldyB0ZXh0XG4gICAgICBpZiAoIWlzQWxyZWFkeUltcG9ydGVkKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVSZXBsYWNlQ2hhbmdlKFxuICAgICAgICAgIHNvdXJjZUZpbGUsXG4gICAgICAgICAgc3BlY2lmaWVyISxcbiAgICAgICAgICBpbXBvcnRBc0lzLFxuICAgICAgICAgIGltcG9ydFRvQmVcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV4dElkZW50aWZpZXIgPSBpbXBvcnRTcGVjaWZpZXJzW2luZGV4ICsgMV07XG4gICAgICAvLyBpZGVudGlmZXIgaXMgbm90IHRoZSBsYXN0LCBhbHNvIGNsZWFuIHVwIHRoZSBjb21tYVxuICAgICAgaWYgKG5leHRJZGVudGlmaWVyKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVSZW1vdmVDaGFuZ2UoXG4gICAgICAgICAgc291cmNlRmlsZSxcbiAgICAgICAgICBzcGVjaWZpZXIsXG4gICAgICAgICAgc3BlY2lmaWVyLmdldFN0YXJ0KHNvdXJjZUZpbGUpLFxuICAgICAgICAgIG5leHRJZGVudGlmaWVyLmdldFN0YXJ0KHNvdXJjZUZpbGUpXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIHRoZXJlIGFyZSBubyBpbXBvcnRzIGZvbGxvd2luZywganVzdCByZW1vdmUgaXRcbiAgICAgIHJldHVybiBjcmVhdGVSZW1vdmVDaGFuZ2UoXG4gICAgICAgIHNvdXJjZUZpbGUsXG4gICAgICAgIHNwZWNpZmllcixcbiAgICAgICAgc3BlY2lmaWVyLmdldFN0YXJ0KHNvdXJjZUZpbGUpLFxuICAgICAgICBzcGVjaWZpZXIuZ2V0RW5kKClcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW1wb3J0Q2hhbmdlcy5maWx0ZXIoQm9vbGVhbikgYXMgKFJlcGxhY2VDaGFuZ2UgfCBSZW1vdmVDaGFuZ2UpW107XG4gIH0pO1xuXG4gIHJldHVybiBjaGFuZ2VzLnJlZHVjZSgoaW1wb3J0cywgY3VycikgPT4gaW1wb3J0cy5jb25jYXQoY3VyciksIFtdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5zUHJvcGVydHkoXG4gIG9iamVjdExpdGVyYWw6IHRzLk9iamVjdExpdGVyYWxFeHByZXNzaW9uLFxuICBwcm9wZXJ0eU5hbWU6IHN0cmluZ1xuKSB7XG4gIHJldHVybiAoXG4gICAgb2JqZWN0TGl0ZXJhbCAmJlxuICAgIG9iamVjdExpdGVyYWwucHJvcGVydGllcy5zb21lKFxuICAgICAgcHJvcCA9PlxuICAgICAgICB0cy5pc1Byb3BlcnR5QXNzaWdubWVudChwcm9wKSAmJlxuICAgICAgICB0cy5pc0lkZW50aWZpZXIocHJvcC5uYW1lKSAmJlxuICAgICAgICBwcm9wLm5hbWUudGV4dCA9PT0gcHJvcGVydHlOYW1lXG4gICAgKVxuICApO1xufVxuIl19