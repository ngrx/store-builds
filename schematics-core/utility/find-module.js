(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core/utility/find-module", ["require", "exports", "@angular-devkit/core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const core_1 = require("@angular-devkit/core");
    /**
     * Find the module referred by a set of options passed to the schematics.
     */
    function findModuleFromOptions(host, options) {
        if (options.hasOwnProperty('skipImport') && options.skipImport) {
            return undefined;
        }
        if (!options.module) {
            const pathToCheck = (options.path || '') +
                (options.flat ? '' : '/' + core_1.strings.dasherize(options.name));
            return core_1.normalize(findModule(host, pathToCheck));
        }
        else {
            const modulePath = core_1.normalize('/' + options.path + '/' + options.module);
            const moduleBaseName = core_1.normalize(modulePath)
                .split('/')
                .pop();
            if (host.exists(modulePath)) {
                return core_1.normalize(modulePath);
            }
            else if (host.exists(modulePath + '.ts')) {
                return core_1.normalize(modulePath + '.ts');
            }
            else if (host.exists(modulePath + '.module.ts')) {
                return core_1.normalize(modulePath + '.module.ts');
            }
            else if (host.exists(modulePath + '/' + moduleBaseName + '.module.ts')) {
                return core_1.normalize(modulePath + '/' + moduleBaseName + '.module.ts');
            }
            else {
                throw new Error(`Specified module path ${modulePath} does not exist`);
            }
        }
    }
    exports.findModuleFromOptions = findModuleFromOptions;
    /**
     * Function to find the "closest" module to a generated file's path.
     */
    function findModule(host, generateDir) {
        let dir = host.getDir('/' + generateDir);
        const moduleRe = /\.module\.ts$/;
        const routingModuleRe = /-routing\.module\.ts/;
        while (dir) {
            const matches = dir.subfiles.filter(p => moduleRe.test(p) && !routingModuleRe.test(p));
            if (matches.length == 1) {
                return core_1.join(dir.path, matches[0]);
            }
            else if (matches.length > 1) {
                throw new Error('More than one module matches. Use skip-import option to skip importing ' +
                    'the component into the closest module.');
            }
            dir = dir.parent;
        }
        throw new Error('Could not find an NgModule. Use the skip-import ' +
            'option to skip importing in NgModule.');
    }
    exports.findModule = findModule;
    /**
     * Build a relative path from one file path to another file path.
     */
    function buildRelativePath(from, to) {
        const { path: fromPath, filename: fromFileName, directory: fromDirectory, } = parsePath(from);
        const { path: toPath, filename: toFileName, directory: toDirectory, } = parsePath(to);
        const relativePath = core_1.relative(fromDirectory, toDirectory);
        const fixedRelativePath = relativePath.startsWith('.')
            ? relativePath
            : `./${relativePath}`;
        return !toFileName || toFileName === 'index.ts'
            ? fixedRelativePath
            : `${fixedRelativePath.endsWith('/')
                ? fixedRelativePath
                : fixedRelativePath + '/'}${convertToTypeScriptFileName(toFileName)}`;
    }
    exports.buildRelativePath = buildRelativePath;
    function parsePath(path) {
        const pathNormalized = core_1.normalize(path);
        const filename = core_1.extname(pathNormalized) ? core_1.basename(pathNormalized) : '';
        const directory = filename ? core_1.dirname(pathNormalized) : pathNormalized;
        return {
            path: pathNormalized,
            filename,
            directory,
        };
    }
    /**
     * Strips the typescript extension and clears index filenames
     * foo.ts -> foo
     * index.ts -> empty
     */
    function convertToTypeScriptFileName(filename) {
        return filename ? filename.replace(/(\.ts)|(index\.ts)$/, '') : '';
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NjaGVtYXRpY3MtY29yZS91dGlsaXR5L2ZpbmQtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUE7Ozs7OztPQU1HO0lBQ0gsK0NBUzhCO0lBVzlCOztPQUVHO0lBQ0gsU0FBZ0IscUJBQXFCLENBQ25DLElBQVUsRUFDVixPQUFzQjtRQUV0QixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUM5RCxPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ25CLE1BQU0sV0FBVyxHQUNmLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ3BCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsY0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUU5RCxPQUFPLGdCQUFTLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1NBQ2pEO2FBQU07WUFDTCxNQUFNLFVBQVUsR0FBRyxnQkFBUyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEUsTUFBTSxjQUFjLEdBQUcsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7aUJBQ3pDLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsR0FBRyxFQUFFLENBQUM7WUFFVCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzNCLE9BQU8sZ0JBQVMsQ0FBQyxVQUFVLENBQUMsQ0FB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LEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBdkJELDhDQXVCQztJQUVELFNBQVMsU0FBUyxDQUFDLElBQVk7UUFDN0IsTUFBTSxjQUFjLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQVMsQ0FBQztRQUMvQyxNQUFNLFFBQVEsR0FBRyxjQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3pFLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsY0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUM7UUFDdEUsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjO1lBQ3BCLFFBQVE7WUFDUixTQUFTO1NBQ1YsQ0FBQztJQUNKLENBQUM7SUFDRDs7OztPQUlHO0lBQ0gsU0FBUywyQkFBMkIsQ0FBQyxRQUE0QjtRQUMvRCxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3JFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge1xuICBQYXRoLFxuICBqb2luLFxuICBub3JtYWxpemUsXG4gIHJlbGF0aXZlLFxuICBzdHJpbmdzLFxuICBiYXNlbmFtZSxcbiAgZXh0bmFtZSxcbiAgZGlybmFtZSxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgRGlyRW50cnksIFRyZWUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kdWxlT3B0aW9ucyB7XG4gIG1vZHVsZT86IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBmbGF0PzogYm9vbGVhbjtcbiAgcGF0aD86IHN0cmluZztcbiAgc2tpcEltcG9ydD86IGJvb2xlYW47XG59XG5cbi8qKlxuICogRmluZCB0aGUgbW9kdWxlIHJlZmVycmVkIGJ5IGEgc2V0IG9mIG9wdGlvbnMgcGFzc2VkIHRvIHRoZSBzY2hlbWF0aWNzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZE1vZHVsZUZyb21PcHRpb25zKFxuICBob3N0OiBUcmVlLFxuICBvcHRpb25zOiBNb2R1bGVPcHRpb25zXG4pOiBQYXRoIHwgdW5kZWZpbmVkIHtcbiAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NraXBJbXBvcnQnKSAmJiBvcHRpb25zLnNraXBJbXBvcnQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKCFvcHRpb25zLm1vZHVsZSkge1xuICAgIGNvbnN0IHBhdGhUb0NoZWNrID1cbiAgICAgIChvcHRpb25zLnBhdGggfHwgJycpICtcbiAgICAgIChvcHRpb25zLmZsYXQgPyAnJyA6ICcvJyArIHN0cmluZ3MuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkpO1xuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZShmaW5kTW9kdWxlKGhvc3QsIHBhdGhUb0NoZWNrKSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbW9kdWxlUGF0aCA9IG5vcm1hbGl6ZSgnLycgKyBvcHRpb25zLnBhdGggKyAnLycgKyBvcHRpb25zLm1vZHVsZSk7XG4gICAgY29uc3QgbW9kdWxlQmFzZU5hbWUgPSBub3JtYWxpemUobW9kdWxlUGF0aClcbiAgICAgIC5zcGxpdCgnLycpXG4gICAgICAucG9wKCk7XG5cbiAgICBpZiAoaG9zdC5leGlzdHMobW9kdWxlUGF0aCkpIHtcbiAgICAgIHJldHVybiBub3JtYWxpemUobW9kdWxlUGF0aCk7XG4gICAgfSBlbHNlIGlmIChob3N0LmV4aXN0cyhtb2R1bGVQYXRoICsgJy50cycpKSB7XG4gICAgICByZXR1cm4gbm9ybWFsaXplKG1vZHVsZVBhdGggKyAnLnRzJyk7XG4gICAgfSBlbHNlIGlmIChob3N0LmV4aXN0cyhtb2R1bGVQYXRoICsgJy5tb2R1bGUudHMnKSkge1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZShtb2R1bGVQYXRoICsgJy5tb2R1bGUudHMnKTtcbiAgICB9IGVsc2UgaWYgKGhvc3QuZXhpc3RzKG1vZHVsZVBhdGggKyAnLycgKyBtb2R1bGVCYXNlTmFtZSArICcubW9kdWxlLnRzJykpIHtcbiAgICAgIHJldHVybiBub3JtYWxpemUobW9kdWxlUGF0aCArICcvJyArIG1vZHVsZUJhc2VOYW1lICsgJy5tb2R1bGUudHMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBTcGVjaWZpZWQgbW9kdWxlIHBhdGggJHttb2R1bGVQYXRofSBkb2VzIG5vdCBleGlzdGApO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uIHRvIGZpbmQgdGhlIFwiY2xvc2VzdFwiIG1vZHVsZSB0byBhIGdlbmVyYXRlZCBmaWxlJ3MgcGF0aC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRNb2R1bGUoaG9zdDogVHJlZSwgZ2VuZXJhdGVEaXI6IHN0cmluZyk6IFBhdGgge1xuICBsZXQgZGlyOiBEaXJFbnRyeSB8IG51bGwgPSBob3N0LmdldERpcignLycgKyBnZW5lcmF0ZURpcik7XG5cbiAgY29uc3QgbW9kdWxlUmUgPSAvXFwubW9kdWxlXFwudHMkLztcbiAgY29uc3Qgcm91dGluZ01vZHVsZVJlID0gLy1yb3V0aW5nXFwubW9kdWxlXFwudHMvO1xuXG4gIHdoaWxlIChkaXIpIHtcbiAgICBjb25zdCBtYXRjaGVzID0gZGlyLnN1YmZpbGVzLmZpbHRlcihcbiAgICAgIHAgPT4gbW9kdWxlUmUudGVzdChwKSAmJiAhcm91dGluZ01vZHVsZVJlLnRlc3QocClcbiAgICApO1xuXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID09IDEpIHtcbiAgICAgIHJldHVybiBqb2luKGRpci5wYXRoLCBtYXRjaGVzWzBdKTtcbiAgICB9IGVsc2UgaWYgKG1hdGNoZXMubGVuZ3RoID4gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnTW9yZSB0aGFuIG9uZSBtb2R1bGUgbWF0Y2hlcy4gVXNlIHNraXAtaW1wb3J0IG9wdGlvbiB0byBza2lwIGltcG9ydGluZyAnICtcbiAgICAgICAgICAndGhlIGNvbXBvbmVudCBpbnRvIHRoZSBjbG9zZXN0IG1vZHVsZS4nXG4gICAgICApO1xuICAgIH1cblxuICAgIGRpciA9IGRpci5wYXJlbnQ7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ0NvdWxkIG5vdCBmaW5kIGFuIE5nTW9kdWxlLiBVc2UgdGhlIHNraXAtaW1wb3J0ICcgK1xuICAgICAgJ29wdGlvbiB0byBza2lwIGltcG9ydGluZyBpbiBOZ01vZHVsZS4nXG4gICk7XG59XG5cbi8qKlxuICogQnVpbGQgYSByZWxhdGl2ZSBwYXRoIGZyb20gb25lIGZpbGUgcGF0aCB0byBhbm90aGVyIGZpbGUgcGF0aC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUmVsYXRpdmVQYXRoKGZyb206IHN0cmluZywgdG86IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHtcbiAgICBwYXRoOiBmcm9tUGF0aCxcbiAgICBmaWxlbmFtZTogZnJvbUZpbGVOYW1lLFxuICAgIGRpcmVjdG9yeTogZnJvbURpcmVjdG9yeSxcbiAgfSA9IHBhcnNlUGF0aChmcm9tKTtcbiAgY29uc3Qge1xuICAgIHBhdGg6IHRvUGF0aCxcbiAgICBmaWxlbmFtZTogdG9GaWxlTmFtZSxcbiAgICBkaXJlY3Rvcnk6IHRvRGlyZWN0b3J5LFxuICB9ID0gcGFyc2VQYXRoKHRvKTtcbiAgY29uc3QgcmVsYXRpdmVQYXRoID0gcmVsYXRpdmUoZnJvbURpcmVjdG9yeSwgdG9EaXJlY3RvcnkpO1xuICBjb25zdCBmaXhlZFJlbGF0aXZlUGF0aCA9IHJlbGF0aXZlUGF0aC5zdGFydHNXaXRoKCcuJylcbiAgICA/IHJlbGF0aXZlUGF0aFxuICAgIDogYC4vJHtyZWxhdGl2ZVBhdGh9YDtcblxuICByZXR1cm4gIXRvRmlsZU5hbWUgfHwgdG9GaWxlTmFtZSA9PT0gJ2luZGV4LnRzJ1xuICAgID8gZml4ZWRSZWxhdGl2ZVBhdGhcbiAgICA6IGAke1xuICAgICAgICBmaXhlZFJlbGF0aXZlUGF0aC5lbmRzV2l0aCgnLycpXG4gICAgICAgICAgPyBmaXhlZFJlbGF0aXZlUGF0aFxuICAgICAgICAgIDogZml4ZWRSZWxhdGl2ZVBhdGggKyAnLydcbiAgICAgIH0ke2NvbnZlcnRUb1R5cGVTY3JpcHRGaWxlTmFtZSh0b0ZpbGVOYW1lKX1gO1xufVxuXG5mdW5jdGlvbiBwYXJzZVBhdGgocGF0aDogc3RyaW5nKSB7XG4gIGNvbnN0IHBhdGhOb3JtYWxpemVkID0gbm9ybWFsaXplKHBhdGgpIGFzIFBhdGg7XG4gIGNvbnN0IGZpbGVuYW1lID0gZXh0bmFtZShwYXRoTm9ybWFsaXplZCkgPyBiYXNlbmFtZShwYXRoTm9ybWFsaXplZCkgOiAnJztcbiAgY29uc3QgZGlyZWN0b3J5ID0gZmlsZW5hbWUgPyBkaXJuYW1lKHBhdGhOb3JtYWxpemVkKSA6IHBhdGhOb3JtYWxpemVkO1xuICByZXR1cm4ge1xuICAgIHBhdGg6IHBhdGhOb3JtYWxpemVkLFxuICAgIGZpbGVuYW1lLFxuICAgIGRpcmVjdG9yeSxcbiAgfTtcbn1cbi8qKlxuICogU3RyaXBzIHRoZSB0eXBlc2NyaXB0IGV4dGVuc2lvbiBhbmQgY2xlYXJzIGluZGV4IGZpbGVuYW1lc1xuICogZm9vLnRzIC0+IGZvb1xuICogaW5kZXgudHMgLT4gZW1wdHlcbiAqL1xuZnVuY3Rpb24gY29udmVydFRvVHlwZVNjcmlwdEZpbGVOYW1lKGZpbGVuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgcmV0dXJuIGZpbGVuYW1lID8gZmlsZW5hbWUucmVwbGFjZSgvKFxcLnRzKXwoaW5kZXhcXC50cykkLywgJycpIDogJyc7XG59XG4iXX0=