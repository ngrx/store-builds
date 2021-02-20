"use strict";
exports.__esModule = true;
exports.isLib = exports.getProjectPath = exports.getProject = void 0;
var config_1 = require("./config");
function getProject(host, options) {
    var workspace = config_1.getWorkspace(host);
    if (!options.project) {
        var defaultProject = workspace
            .defaultProject;
        options.project =
            defaultProject !== undefined
                ? defaultProject
                : Object.keys(workspace.projects)[0];
    }
    return workspace.projects[options.project];
}
exports.getProject = getProject;
function getProjectPath(host, options) {
    var project = getProject(host, options);
    if (project.root.substr(-1) === '/') {
        project.root = project.root.substr(0, project.root.length - 1);
    }
    if (options.path === undefined) {
        var projectDirName = project.projectType === 'application' ? 'app' : 'lib';
        return (project.root ? "/" + project.root : '') + "/src/" + projectDirName;
    }
    return options.path;
}
exports.getProjectPath = getProjectPath;
function isLib(host, options) {
    var project = getProject(host, options);
    return project.projectType === 'library';
}
exports.isLib = isLib;
//# sourceMappingURL=project.js.map