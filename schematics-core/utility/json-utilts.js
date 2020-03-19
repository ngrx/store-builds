(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core/utility/json-utilts", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/json-utils.ts
    function findPropertyInAstObject(node, propertyName) {
        let maybeNode = null;
        for (const property of node.properties) {
            if (property.key.value == propertyName) {
                maybeNode = property.value;
            }
        }
        return maybeNode;
    }
    exports.findPropertyInAstObject = findPropertyInAstObject;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi11dGlsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NjaGVtYXRpY3MtY29yZS91dGlsaXR5L2pzb24tdXRpbHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBRUEsdUdBQXVHO0lBQ3ZHLFNBQWdCLHVCQUF1QixDQUNyQyxJQUFtQixFQUNuQixZQUFvQjtRQUVwQixJQUFJLFNBQVMsR0FBdUIsSUFBSSxDQUFDO1FBQ3pDLEtBQUssTUFBTSxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN0QyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLFlBQVksRUFBRTtnQkFDdEMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7YUFDNUI7U0FDRjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFaRCwwREFZQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25Bc3ROb2RlLCBKc29uQXN0T2JqZWN0IH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyLWNsaS9ibG9iL21hc3Rlci9wYWNrYWdlcy9zY2hlbWF0aWNzL2FuZ3VsYXIvdXRpbGl0eS9qc29uLXV0aWxzLnRzXG5leHBvcnQgZnVuY3Rpb24gZmluZFByb3BlcnR5SW5Bc3RPYmplY3QoXG4gIG5vZGU6IEpzb25Bc3RPYmplY3QsXG4gIHByb3BlcnR5TmFtZTogc3RyaW5nXG4pOiBKc29uQXN0Tm9kZSB8IG51bGwge1xuICBsZXQgbWF5YmVOb2RlOiBKc29uQXN0Tm9kZSB8IG51bGwgPSBudWxsO1xuICBmb3IgKGNvbnN0IHByb3BlcnR5IG9mIG5vZGUucHJvcGVydGllcykge1xuICAgIGlmIChwcm9wZXJ0eS5rZXkudmFsdWUgPT0gcHJvcGVydHlOYW1lKSB7XG4gICAgICBtYXliZU5vZGUgPSBwcm9wZXJ0eS52YWx1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWF5YmVOb2RlO1xufVxuIl19