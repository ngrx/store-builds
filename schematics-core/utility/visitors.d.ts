/// <amd-module name="@ngrx/store/schematics-core/utility/visitors" />
import * as ts from 'typescript';
import { Tree } from '@angular-devkit/schematics';
export declare function visitTSSourceFiles<Result = void>(tree: Tree, visitor: (sourceFile: ts.SourceFile, tree: Tree, result?: Result) => Result | undefined): Result | undefined;
export declare function visitNgModuleImports(sourceFile: ts.SourceFile, callback: (importNode: ts.PropertyAssignment, elementExpressions: ts.NodeArray<ts.Expression>) => void): void;
