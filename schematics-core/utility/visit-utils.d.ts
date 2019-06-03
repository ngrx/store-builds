/// <amd-module name="@ngrx/store/schematics-core/utility/visit-utils" />
import * as ts from 'typescript';
import { Tree } from '@angular-devkit/schematics';
export declare function visitTSSourceFiles<Result = void>(tree: Tree, visitor: (sourceFile: ts.SourceFile, tree: Tree, result?: Result) => Result | undefined): Result | undefined;
