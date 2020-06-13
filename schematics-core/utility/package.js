"use strict";
exports.__esModule = true;
exports.addPackageToPackageJson = void 0;
/**
 * Adds a package to the package.json
 */
function addPackageToPackageJson(host, type, pkg, version) {
    if (host.exists('package.json')) {
        var sourceText = host.read('package.json').toString('utf-8');
        var json = JSON.parse(sourceText);
        if (!json[type]) {
            json[type] = {};
        }
        if (!json[type][pkg]) {
            json[type][pkg] = version;
        }
        host.overwrite('package.json', JSON.stringify(json, null, 2));
    }
    return host;
}
exports.addPackageToPackageJson = addPackageToPackageJson;
//# sourceMappingURL=package.js.map