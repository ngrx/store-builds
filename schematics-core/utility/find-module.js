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
    var core_1 = require("@angular-devkit/core");
    /**
     * Find the module referred by a set of options passed to the schematics.
     */
    function findModuleFromOptions(host, options) {
        if (options.hasOwnProperty('skipImport') && options.skipImport) {
            return undefined;
        }
        if (!options.module) {
            var pathToCheck = (options.path || '') +
                (options.flat ? '' : '/' + core_1.strings.dasherize(options.name));
            return core_1.normalize(findModule(host, pathToCheck));
        }
        else {
            var modulePath = core_1.normalize('/' + options.path + '/' + options.module);
            var moduleBaseName = core_1.normalize(modulePath)
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
                throw new Error('Specified module does not exist');
            }
        }
    }
    exports.findModuleFromOptions = findModuleFromOptions;
    /**
     * Function to find the "closest" module to a generated file's path.
     */
    function findModule(host, generateDir) {
        var dir = host.getDir('/' + generateDir);
        var moduleRe = /\.module\.ts$/;
        var routingModuleRe = /-routing\.module\.ts/;
        while (dir) {
            var matches = dir.subfiles.filter(function (p) { return moduleRe.test(p) && !routingModuleRe.test(p); });
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
        from = core_1.normalize(from);
        to = core_1.normalize(to);
        // Convert to arrays.
        var fromParts = from.split('/');
        var toParts = to.split('/');
        // Remove file names (preserving destination)
        fromParts.pop();
        var toFileName = toParts.pop();
        var relativePath = core_1.relative(core_1.normalize(fromParts.join('/')), core_1.normalize(toParts.join('/')));
        var pathPrefix = '';
        // Set the path prefix for same dir or child dir, parent dir starts with `..`
        if (!relativePath) {
            pathPrefix = '.';
        }
        else if (!relativePath.startsWith('.')) {
            pathPrefix = "./";
        }
        if (pathPrefix && !pathPrefix.endsWith('/')) {
            pathPrefix += '/';
        }
        return pathPrefix + (relativePath ? relativePath + '/' : '') + toFileName;
    }
    exports.buildRelativePath = buildRelativePath;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NjaGVtYXRpY3MtY29yZS91dGlsaXR5L2ZpbmQtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUE7Ozs7OztPQU1HO0lBQ0gsNkNBQWdGO0lBV2hGOztPQUVHO0lBQ0gsK0JBQ0UsSUFBVSxFQUNWLE9BQXNCO1FBRXRCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDL0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNuQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFNLFdBQVcsR0FDZixDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNwQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLGNBQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFOUQsTUFBTSxDQUFDLGdCQUFTLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQU0sVUFBVSxHQUFHLGdCQUFTLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4RSxJQUFNLGNBQWMsR0FBRyxnQkFBUyxDQUFDLFVBQVUsQ0FBQztpQkFDekMsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixHQUFHLEVBQUUsQ0FBQztZQUVULEVBQUUsQ0FBQyxDQUFD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QUM7UUFFakMsSUFBTSxZQUFZLEdBQUcsZUFBUSxDQUMzQixnQkFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDOUIsZ0JBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQzdCLENBQUM7UUFDRixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFcEIsNkVBQTZFO1FBQzdFLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNsQixVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ25CLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxVQUFVLElBQUksR0FBRyxDQUFDO1FBQ3BCLENBQUM7UUFFRCxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDNUUsQ0FBQztJQTdCRCw4Q0E2QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBQYXRoLCBqb2luLCBub3JtYWxpemUsIHJlbGF0aXZlLCBzdHJpbmdzIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgRGlyRW50cnksIFRyZWUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kdWxlT3B0aW9ucyB7XG4gIG1vZHVsZT86IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBmbGF0PzogYm9vbGVhbjtcbiAgcGF0aD86IHN0cmluZztcbiAgc2tpcEltcG9ydD86IGJvb2xlYW47XG59XG5cbi8qKlxuICogRmluZCB0aGUgbW9kdWxlIHJlZmVycmVkIGJ5IGEgc2V0IG9mIG9wdGlvbnMgcGFzc2VkIHRvIHRoZSBzY2hlbWF0aWNzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZE1vZHVsZUZyb21PcHRpb25zKFxuICBob3N0OiBUcmVlLFxuICBvcHRpb25zOiBNb2R1bGVPcHRpb25zXG4pOiBQYXRoIHwgdW5kZWZpbmVkIHtcbiAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3NraXBJbXBvcnQnKSAmJiBvcHRpb25zLnNraXBJbXBvcnQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKCFvcHRpb25zLm1vZHVsZSkge1xuICAgIGNvbnN0IHBhdGhUb0NoZWNrID1cbiAgICAgIChvcHRpb25zLnBhdGggfHwgJycpICtcbiAgICAgIChvcHRpb25zLmZsYXQgPyAnJyA6ICcvJyArIHN0cmluZ3MuZGFzaGVyaXplKG9wdGlvbnMubmFtZSkpO1xuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZShmaW5kTW9kdWxlKGhvc3QsIHBhdGhUb0NoZWNrKSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbW9kdWxlUGF0aCA9IG5vcm1hbGl6ZSgnLycgKyBvcHRpb25zLnBhdGggKyAnLycgKyBvcHRpb25zLm1vZHVsZSk7XG4gICAgY29uc3QgbW9kdWxlQmFzZU5hbWUgPSBub3JtYWxpemUobW9kdWxlUGF0aClcbiAgICAgIC5zcGxpdCgnLycpXG4gICAgICAucG9wKCk7XG5cbiAgICBpZiAoaG9zdC5leGlzdHMobW9kdWxlUGF0aCkpIHtcbiAgICAgIHJldHVybiBub3JtYWxpemUobW9kdWxlUGF0aCk7XG4gICAgfSBlbHNlIGlmIChob3N0LmV4aXN0cyhtb2R1bGVQYXRoICsgJy50cycpKSB7XG4gICAgICByZXR1cm4gbm9ybWFsaXplKG1vZHVsZVBhdGggKyAnLnRzJyk7XG4gICAgfSBlbHNlIGlmIChob3N0LmV4aXN0cyhtb2R1bGVQYXRoICsgJy5tb2R1bGUudHMnKSkge1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZShtb2R1bGVQYXRoICsgJy5tb2R1bGUudHMnKTtcbiAgICB9IGVsc2UgaWYgKGhvc3QuZXhpc3RzKG1vZHVsZVBhdGggKyAnLycgKyBtb2R1bGVCYXNlTmFtZSArICcubW9kdWxlLnRzJykpIHtcbiAgICAgIHJldHVybiBub3JtYWxpemUobW9kdWxlUGF0aCArICcvJyArIG1vZHVsZUJhc2VOYW1lICsgJy5tb2R1bGUudHMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTcGVjaWZpZWQgbW9kdWxlIGRvZXMgbm90IGV4aXN0Jyk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdG8gZmluZCB0aGUgXCJjbG9zZXN0XCIgbW9kdWxlIHRvIGEgZ2VuZXJhdGVkIGZpbGUncyBwYXRoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZE1vZHVsZShob3N0OiBUcmVlLCBnZW5lcmF0ZURpcjogc3RyaW5nKTogUGF0aCB7XG4gIGxldCBkaXI6IERpckVudHJ5IHwgbnVsbCA9IGhvc3QuZ2V0RGlyKCcvJyArIGdlbmVyYXRlRGlyKTtcblxuICBjb25zdCBtb2R1bGVSZSA9IC9cXC5tb2R1bGVcXC50cyQvO1xuICBjb25zdCByb3V0aW5nTW9kdWxlUmUgPSAvLXJvdXRpbmdcXC5tb2R1bGVcXC50cy87XG5cbiAgd2hpbGUgKGRpcikge1xuICAgIGNvbnN0IG1hdGNoZXMgPSBkaXIuc3ViZmlsZXMuZmlsdGVyKFxuICAgICAgcCA9PiBtb2R1bGVSZS50ZXN0KHApICYmICFyb3V0aW5nTW9kdWxlUmUudGVzdChwKVxuICAgICk7XG5cbiAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT0gMSkge1xuICAgICAgcmV0dXJuIGpvaW4oZGlyLnBhdGgsIG1hdGNoZXNbMF0pO1xuICAgIH0gZWxzZSBpZiAobWF0Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdNb3JlIHRoYW4gb25lIG1vZHVsZSBtYXRjaGVzLiBVc2Ugc2tpcC1pbXBvcnQgb3B0aW9uIHRvIHNraXAgaW1wb3J0aW5nICcgK1xuICAgICAgICAgICd0aGUgY29tcG9uZW50IGludG8gdGhlIGNsb3Nlc3QgbW9kdWxlLidcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZGlyID0gZGlyLnBhcmVudDtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAnQ291bGQgbm90IGZpbmQgYW4gTmdNb2R1bGUuIFVzZSB0aGUgc2tpcC1pbXBvcnQgJyArXG4gICAgICAnb3B0aW9uIHRvIHNraXAgaW1wb3J0aW5nIGluIE5nTW9kdWxlLidcbiAgKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIHJlbGF0aXZlIHBhdGggZnJvbSBvbmUgZmlsZSBwYXRoIHRvIGFub3RoZXIgZmlsZSBwYXRoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRSZWxhdGl2ZVBhdGgoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKTogc3RyaW5nIHtcbiAgZnJvbSA9IG5vcm1hbGl6ZShmcm9tKTtcbiAgdG8gPSBub3JtYWxpemUodG8pO1xuXG4gIC8vIENvbnZlcnQgdG8gYXJyYXlzLlxuICBjb25zdCBmcm9tUGFydHMgPSBmcm9tLnNwbGl0KCcvJyk7XG4gIGNvbnN0IHRvUGFydHMgPSB0by5zcGxpdCgnLycpO1xuXG4gIC8vIFJlbW92ZSBmaWxlIG5hbWVzIChwcmVzZXJ2aW5nIGRlc3RpbmF0aW9uKVxuICBmcm9tUGFydHMucG9wKCk7XG4gIGNvbnN0IHRvRmlsZU5hbWUgPSB0b1BhcnRzLnBvcCgpO1xuXG4gIGNvbnN0IHJlbGF0aXZlUGF0aCA9IHJlbGF0aXZlKFxuICAgIG5vcm1hbGl6ZShmcm9tUGFydHMuam9pbignLycpKSxcbiAgICBub3JtYWxpemUodG9QYXJ0cy5qb2luKCcvJykpXG4gICk7XG4gIGxldCBwYXRoUHJlZml4ID0gJyc7XG5cbiAgLy8gU2V0IHRoZSBwYXRoIHByZWZpeCBmb3Igc2FtZSBkaXIgb3IgY2hpbGQgZGlyLCBwYXJlbnQgZGlyIHN0YXJ0cyB3aXRoIGAuLmBcbiAgaWYgKCFyZWxhdGl2ZVBhdGgpIHtcbiAgICBwYXRoUHJlZml4ID0gJy4nO1xuICB9IGVsc2UgaWYgKCFyZWxhdGl2ZVBhdGguc3RhcnRzV2l0aCgnLicpKSB7XG4gICAgcGF0aFByZWZpeCA9IGAuL2A7XG4gIH1cbiAgaWYgKHBhdGhQcmVmaXggJiYgIXBhdGhQcmVmaXguZW5kc1dpdGgoJy8nKSkge1xuICAgIHBhdGhQcmVmaXggKz0gJy8nO1xuICB9XG5cbiAgcmV0dXJuIHBhdGhQcmVmaXggKyAocmVsYXRpdmVQYXRoID8gcmVsYXRpdmVQYXRoICsgJy8nIDogJycpICsgdG9GaWxlTmFtZTtcbn1cbiJdfQ==