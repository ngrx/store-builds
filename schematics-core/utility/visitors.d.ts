/// <amd-module name="@ngrx/store/schematics-core/utility/visitors" />
import * as ts from 'typescript';
import { Tree } from '@angular-devkit/schematics';
export declare function visitTSSourceFiles<Result = void>(tree: Tree, visitor: (sourceFile: ts.SourceFile, tree: Tree, result?: Result) => Result | undefined): Result | undefined;
export declare function visitTemplates(tree: Tree, visitor: (template: {
    fileName: string;
    content: string;
    inline: boolean;
    start: number;
}, tree: Tree) => void): void;
export declare function visitNgModuleImports(sourceFile: ts.SourceFile, callback: (importNode: ts.PropertyAssignment, elementExpressions: ts.NodeArray<ts.Expression>) => void): void;
export declare function visitNgModuleExports(sourceFile: ts.SourceFile, callback: (exportNode: ts.PropertyAssignment, elementExpressions: ts.NodeArray<ts.Expression>) => void): void;
export declare function visitComponents(sourceFile: ts.SourceFile, callback: (classDeclarationNode: ts.ClassDeclaration, decoratorExpressionNode: ts.ObjectLiteralExpression) => void): void;
export declare function visitNgModules(sourceFile: ts.SourceFile, callback: (classDeclarationNode: ts.ClassDeclaration, decoratorExpressionNode: ts.ObjectLiteralExpression) => void): void;
export declare function visitDecorator(sourceFile: ts.SourceFile, decoratorName: string, callback: (classDeclarationNode: ts.ClassDeclaration, decoratorExpressionNode: ts.ObjectLiteralExpression) => void): void;
