import * as tslib_1 from "tslib";
export function isEqualCheck(a, b) {
    return a === b;
}
function isArgumentsChanged(args, lastArguments, comparator) {
    for (var i = 0; i < args.length; i++) {
        if (!comparator(args[i], lastArguments[i])) {
            return true;
        }
    }
    return false;
}
export function resultMemoize(projectionFn, isResultEqual) {
    return defaultMemoize(projectionFn, isEqualCheck, isResultEqual);
}
export function defaultMemoize(projectionFn, isArgumentsEqual, isResultEqual) {
    if (isArgumentsEqual === void 0) { isArgumentsEqual = isEqualCheck; }
    if (isResultEqual === void 0) { isResultEqual = isEqualCheck; }
    var lastArguments = null;
    // tslint:disable-next-line:no-any anything could be the result.
    var lastResult = null;
    var overrideResult;
    function reset() {
        lastArguments = null;
        lastResult = null;
    }
    function setResult(result) {
        if (result === void 0) { result = undefined; }
        overrideResult = result;
    }
    // tslint:disable-next-line:no-any anything could be the result.
    function memoized() {
        if (overrideResult !== undefined) {
            return overrideResult;
        }
        if (!lastArguments) {
            lastResult = projectionFn.apply(null, arguments);
            lastArguments = arguments;
            return lastResult;
        }
        if (!isArgumentsChanged(arguments, lastArguments, isArgumentsEqual)) {
            return lastResult;
        }
        lastArguments = arguments;
        var newResult = projectionFn.apply(null, arguments);
        if (isResultEqual(lastResult, newResult)) {
            return lastResult;
        }
        lastResult = newResult;
        return newResult;
    }
    return { memoized: memoized, reset: reset, setResult: setResult };
}
export function createSelector() {
    var input = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        input[_i] = arguments[_i];
    }
    return createSelectorFactory(defaultMemoize).apply(void 0, tslib_1.__spread(input));
}
export function defaultStateFn(state, selectors, props, memoizedProjector) {
    if (props === undefined) {
        var args_1 = selectors.map(function (fn) { return fn(state); });
        return memoizedProjector.memoized.apply(null, args_1);
    }
    var args = selectors.map(function (fn) {
        return fn(state, props);
    });
    return memoizedProjector.memoized.apply(null, tslib_1.__spread(args, [props]));
}
export function createSelectorFactory(memoize, options) {
    if (options === void 0) { options = {
        stateFn: defaultStateFn,
    }; }
    return function () {
        var input = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            input[_i] = arguments[_i];
        }
        var args = input;
        if (Array.isArray(args[0])) {
            var _a = tslib_1.__read(args), head = _a[0], tail = _a.slice(1);
            args = tslib_1.__spread(head, tail);
        }
        var selectors = args.slice(0, args.length - 1);
        var projector = args[args.length - 1];
        var memoizedSelectors = selectors.filter(function (selector) {
            return selector.release && typeof selector.release === 'function';
        });
        var memoizedProjector = memoize(function () {
            var selectors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selectors[_i] = arguments[_i];
            }
            return projector.apply(null, selectors);
        });
        var memoizedState = defaultMemoize(function (state, props) {
            return options.stateFn.apply(null, [
                state,
                selectors,
                props,
                memoizedProjector,
            ]);
        });
        function release() {
            memoizedState.reset();
            memoizedProjector.reset();
            memoizedSelectors.forEach(function (selector) { return selector.release(); });
        }
        return Object.assign(memoizedState.memoized, {
            release: release,
            projector: memoizedProjector.memoized,
            setResult: memoizedState.setResult,
        });
    };
}
export function createFeatureSelector(featureName) {
    return createSelector(function (state) { return state[featureName]; }, function (featureState) { return featureState; });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBNEJBLE1BQU0sVUFBVSxZQUFZLENBQUMsQ0FBTSxFQUFFLENBQU07SUFDekMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxTQUFTLGtCQUFrQixDQUN6QixJQUFnQixFQUNoQixhQUF5QixFQUN6QixVQUF3QjtJQUV4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMxQyxPQUFPLElBQUksQ0FBQztTQUNiO0tBQ0Y7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUMzQixZQUFtQixFQUNuQixhQUEyQjtJQUUzQixPQUFPLGNBQWMsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ25FLENBQUM7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUM1QixZQUFtQixFQUNuQixnQkFBK0IsRUFDL0IsYUFBNEI7SUFENUIsaUNBQUEsRUFBQSwrQkFBK0I7SUFDL0IsOEJBQUEsRUFBQSw0QkFBNEI7SUFFNUIsSUFBSSxhQUFhLEdBQXNCLElBQUksQ0FBQztJQUM1QyxnRUFBZ0U7SUFDaEUsSUFBSSxVQUFVLEdBQVEsSUFBSSxDQUFDO0lBQzNCLElBQUksY0FBbUIsQ0FBQztJQUV4QixTQUFTLEtBQUs7UUFDWixhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUVE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QVUsSUFBSyxPQUFBLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBbEIsQ0FBa0IsRUFDbEMsVUFBQyxZQUFpQixJQUFLLE9BQUEsWUFBWSxFQUFaLENBQVksQ0FDcEMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWxlY3RvciwgU2VsZWN0b3JXaXRoUHJvcHMgfSBmcm9tICcuL21vZGVscyc7XG5cbmV4cG9ydCB0eXBlIEFueUZuID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cbmV4cG9ydCB0eXBlIE1lbW9pemVkUHJvamVjdGlvbiA9IHtcbiAgbWVtb2l6ZWQ6IEFueUZuO1xuICByZXNldDogKCkgPT4gdm9pZDtcbiAgc2V0UmVzdWx0OiAocmVzdWx0PzogYW55KSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IHR5cGUgTWVtb2l6ZUZuID0gKHQ6IEFueUZuKSA9PiBNZW1vaXplZFByb2plY3Rpb247XG5cbmV4cG9ydCB0eXBlIENvbXBhcmF0b3JGbiA9IChhOiBhbnksIGI6IGFueSkgPT4gYm9vbGVhbjtcblxuZXhwb3J0IGludGVyZmFjZSBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+XG4gIGV4dGVuZHMgU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD4ge1xuICByZWxlYXNlKCk6IHZvaWQ7XG4gIHByb2plY3RvcjogQW55Rm47XG4gIHNldFJlc3VsdDogKHJlc3VsdD86IFJlc3VsdCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PlxuICBleHRlbmRzIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PiB7XG4gIHJlbGVhc2UoKTogdm9pZDtcbiAgcHJvamVjdG9yOiBBbnlGbjtcbiAgc2V0UmVzdWx0OiAocmVzdWx0PzogUmVzdWx0KSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFcXVhbENoZWNrKGE6IGFueSwgYjogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBhID09PSBiO1xufVxuXG5mdW5jdGlvbiBpc0FyZ3VtZW50c0NoYW5nZWQoXG4gIGFyZ3M6IElBcmd1bWVudHMsXG4gIGxhc3RBcmd1bWVudHM6IElBcmd1bWVudHMsXG4gIGNvbXBhcmF0b3I6IENvbXBhcmF0b3JGblxuKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgIGlmICghY29tcGFyYXRvcihhcmdzW2ldLCBsYXN0QXJndW1lbnRzW2ldKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3VsdE1lbW9pemUoXG4gIHByb2plY3Rpb25GbjogQW55Rm4sXG4gIGlzUmVzdWx0RXF1YWw6IENvbXBhcmF0b3JGblxuKSB7XG4gIHJldHVybiBkZWZhdWx0TWVtb2l6ZShwcm9qZWN0aW9uRm4sIGlzRXF1YWxDaGVjaywgaXNSZXN1bHRFcXVhbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0TWVtb2l6ZShcbiAgcHJvamVjdGlvbkZuOiBBbnlGbixcbiAgaXNBcmd1bWVudHNFcXVhbCA9IGlzRXF1YWxDaGVjayxcbiAgaXNSZXN1bHRFcXVhbCA9IGlzRXF1YWxDaGVja1xuKTogTWVtb2l6ZWRQcm9qZWN0aW9uIHtcbiAgbGV0IGxhc3RBcmd1bWVudHM6IG51bGwgfCBJQXJndW1lbnRzID0gbnVsbDtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSBhbnl0aGluZyBjb3VsZCBiZSB0aGUgcmVzdWx0LlxuICBsZXQgbGFzdFJlc3VsdDogYW55ID0gbnVsbDtcbiAgbGV0IG92ZXJyaWRlUmVzdWx0OiBhbnk7XG5cbiAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgbGFzdEFyZ3VtZW50cyA9IG51bGw7XG4gICAgbGFzdFJlc3VsdCA9IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRSZXN1bHQocmVzdWx0OiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBvdmVycmlkZVJlc3VsdCA9IHJlc3VsdDtcbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgYW55dGhpbmcgY291bGQgYmUgdGhlIHJlc3VsdC5cbiAgZnVuY3Rpb24gbWVtb2l6ZWQoKTogYW55IHtcbiAgICBpZiAob3ZlcnJpZGVSZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG92ZXJyaWRlUmVzdWx0O1xuICAgIH1cblxuICAgIGlmICghbGFzdEFyZ3VtZW50cykge1xuICAgICAgbGFzdFJlc3VsdCA9IHByb2plY3Rpb25Gbi5hcHBseShudWxsLCBhcmd1bWVudHMgYXMgYW55KTtcbiAgICAgIGxhc3RBcmd1bWVudHMgPSBhcmd1bWVudHM7XG4gICAgICByZXR1cm4gbGFzdFJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAoIWlzQXJndW1lbnRzQ2hhbmdlZChhcmd1bWVudHMsIGxhc3RBcmd1bWVudHMsIGlzQXJndW1lbnRzRXF1YWwpKSB7XG4gICAgICByZXR1cm4gbGFzdFJlc3VsdDtcbiAgICB9XG5cbiAgICBsYXN0QXJndW1lbnRzID0gYXJndW1lbnRzO1xuXG4gICAgY29uc3QgbmV3UmVzdWx0ID0gcHJvamVjdGlvbkZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyBhcyBhbnkpO1xuICAgIGlmIChpc1Jlc3VsdEVxdWFsKGxhc3RSZXN1bHQsIG5ld1Jlc3VsdCkpIHtcbiAgICAgIHJldHVybiBsYXN0UmVzdWx0O1xuICAgIH1cblxuICAgIGxhc3RSZXN1bHQgPSBuZXdSZXN1bHQ7XG5cbiAgICByZXR1cm4gbmV3UmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIHsgbWVtb2l6ZWQsIHJlc2V0LCBzZXRSZXN1bHQgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHByb2plY3RvcjogKHMxOiBTMSkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBwcm9wczogUHJvcHMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtTZWxlY3RvcjxTdGF0ZSwgUzE+XSxcbiAgcHJvamVjdG9yOiAoczE6IFMxKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT5dLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICBzMjogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBwcm9wczogUHJvcHMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbU2VsZWN0b3I8U3RhdGUsIFMxPiwgU2VsZWN0b3I8U3RhdGUsIFMyPl0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBwcm9wczogUHJvcHMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHMyOiBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICBzMzogU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBTMywgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICBzMjogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gIHMzOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtTZWxlY3RvcjxTdGF0ZSwgUzE+LCBTZWxlY3RvcjxTdGF0ZSwgUzI+LCBTZWxlY3RvcjxTdGF0ZSwgUzM+XSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBTMywgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz5cbiAgXSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHMzOiBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICBzNDogU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFMzLCBTNCwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICBzMjogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gIHMzOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgczQ6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTND5cbiAgXSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFMzLCBTNCwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND5cbiAgXSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBwcm9wczogUHJvcHMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHMzOiBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICBzNDogU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgczU6IFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgczU6IFM1KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgczI6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICBzMzogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gIHM0OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PixcbiAgczU6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzU+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSwgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM1PlxuICBdLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBTMywgUzQsIFM1LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM1PlxuICBdLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSwgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgczM6IFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gIHM0OiBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICBzNTogU2VsZWN0b3I8U3RhdGUsIFM1PixcbiAgczY6IFNlbGVjdG9yPFN0YXRlLCBTNj4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgczU6IFM1LCBzNjogUzYpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgczI6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICBzMzogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gIHM0OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PixcbiAgczU6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzU+LFxuICBzNjogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNj4sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHByb3BzOiBQcm9wc1xuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM1PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzY+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgczU6IFM1LCBzNjogUzYpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzU+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzY+XG4gIF0sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHByb3BzOiBQcm9wc1xuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBTNiwgUzcsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgczM6IFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gIHM0OiBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICBzNTogU2VsZWN0b3I8U3RhdGUsIFM1PixcbiAgczY6IFNlbGVjdG9yPFN0YXRlLCBTNj4sXG4gIHM3OiBTZWxlY3RvcjxTdGF0ZSwgUzc+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSwgczY6IFM2LCBzNzogUzcpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxcbiAgU3RhdGUsXG4gIFByb3BzLFxuICBTMSxcbiAgUzIsXG4gIFMzLFxuICBTNCxcbiAgUzUsXG4gIFM2LFxuICBTNyxcbiAgUmVzdWx0XG4+KFxuICBzMTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gIHMyOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgczM6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICBzNDogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gIHM1OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM1PixcbiAgczY6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzY+LFxuICBzNzogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNz4sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHM3OiBTNyxcbiAgICBwcm9wczogUHJvcHNcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBTNywgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzU+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM3PlxuICBdLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSwgczY6IFM2LCBzNzogUzcpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxcbiAgU3RhdGUsXG4gIFByb3BzLFxuICBTMSxcbiAgUzIsXG4gIFMzLFxuICBTNCxcbiAgUzUsXG4gIFM2LFxuICBTNyxcbiAgUmVzdWx0XG4+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM1PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM2PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM3PlxuICBdLFxuICBwcm9qZWN0b3I6IChcbiAgICBzMTogUzEsXG4gICAgczI6IFMyLFxuICAgIHMzOiBTMyxcbiAgICBzNDogUzQsXG4gICAgczU6IFM1LFxuICAgIHM2OiBTNixcbiAgICBzNzogUzcsXG4gICAgcHJvcHM6IFByb3BzXG4gICkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBTNywgUzgsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgczM6IFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gIHM0OiBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICBzNTogU2VsZWN0b3I8U3RhdGUsIFM1PixcbiAgczY6IFNlbGVjdG9yPFN0YXRlLCBTNj4sXG4gIHM3OiBTZWxlY3RvcjxTdGF0ZSwgUzc+LFxuICBzODogU2VsZWN0b3I8U3RhdGUsIFM4PixcbiAgcHJvamVjdG9yOiAoXG4gICAgczE6IFMxLFxuICAgIHMyOiBTMixcbiAgICBzMzogUzMsXG4gICAgczQ6IFM0LFxuICAgIHM1OiBTNSxcbiAgICBzNjogUzYsXG4gICAgczc6IFM3LFxuICAgIHM4OiBTOFxuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxcbiAgU3RhdGUsXG4gIFByb3BzLFxuICBTMSxcbiAgUzIsXG4gIFMzLFxuICBTNCxcbiAgUzUsXG4gIFM2LFxuICBTNyxcbiAgUzgsXG4gIFJlc3VsdFxuPihcbiAgczE6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICBzMjogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gIHMzOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgczQ6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+LFxuICBzNTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNT4sXG4gIHM2OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM2PixcbiAgczc6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzc+LFxuICBzODogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTOD4sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHM3OiBTNyxcbiAgICBzODogUzgsXG4gICAgcHJvcHM6IFByb3BzXG4gICkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBTNiwgUzcsIFM4LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM2PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzc+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTOD5cbiAgXSxcbiAgcHJvamVjdG9yOiAoXG4gICAgczE6IFMxLFxuICAgIHMyOiBTMixcbiAgICBzMzogUzMsXG4gICAgczQ6IFM0LFxuICAgIHM1OiBTNSxcbiAgICBzNjogUzYsXG4gICAgczc6IFM3LFxuICAgIHM4OiBTOFxuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxcbiAgU3RhdGUsXG4gIFByb3BzLFxuICBTMSxcbiAgUzIsXG4gIFMzLFxuICBTNCxcbiAgUzUsXG4gIFM2LFxuICBTNyxcbiAgUzgsXG4gIFJlc3VsdFxuPihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNj4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNz4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTOD5cbiAgXSxcbiAgcHJvamVjdG9yOiAoXG4gICAgczE6IFMxLFxuICAgIHMyOiBTMixcbiAgICBzMzogUzMsXG4gICAgczQ6IFM0LFxuICAgIHM1OiBTNSxcbiAgICBzNjogUzYsXG4gICAgczc6IFM3LFxuICAgIHM4OiBTOCxcbiAgICBwcm9wczogUHJvcHNcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3IoXG4gIC4uLmlucHV0OiBhbnlbXVxuKTogU2VsZWN0b3I8YW55LCBhbnk+IHwgU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIGFueT4ge1xuICByZXR1cm4gY3JlYXRlU2VsZWN0b3JGYWN0b3J5KGRlZmF1bHRNZW1vaXplKSguLi5pbnB1dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0U3RhdGVGbihcbiAgc3RhdGU6IGFueSxcbiAgc2VsZWN0b3JzOiBTZWxlY3RvcjxhbnksIGFueT5bXSB8IFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBhbnk+W10sXG4gIHByb3BzOiBhbnksXG4gIG1lbW9pemVkUHJvamVjdG9yOiBNZW1vaXplZFByb2plY3Rpb25cbik6IGFueSB7XG4gIGlmIChwcm9wcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgYXJncyA9ICg8U2VsZWN0b3I8YW55LCBhbnk+W10+c2VsZWN0b3JzKS5tYXAoZm4gPT4gZm4oc3RhdGUpKTtcbiAgICByZXR1cm4gbWVtb2l6ZWRQcm9qZWN0b3IubWVtb2l6ZWQuYXBwbHkobnVsbCwgYXJncyk7XG4gIH1cblxuICBjb25zdCBhcmdzID0gKDxTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgYW55PltdPnNlbGVjdG9ycykubWFwKGZuID0+XG4gICAgZm4oc3RhdGUsIHByb3BzKVxuICApO1xuICByZXR1cm4gbWVtb2l6ZWRQcm9qZWN0b3IubWVtb2l6ZWQuYXBwbHkobnVsbCwgWy4uLmFyZ3MsIHByb3BzXSk7XG59XG5cbmV4cG9ydCB0eXBlIFNlbGVjdG9yRmFjdG9yeUNvbmZpZzxUID0gYW55LCBWID0gYW55PiA9IHtcbiAgc3RhdGVGbjogKFxuICAgIHN0YXRlOiBULFxuICAgIHByb3BzOiBhbnksXG4gICAgc2VsZWN0b3JzOiBTZWxlY3RvcjxhbnksIGFueT5bXSxcbiAgICBtZW1vaXplZFByb2plY3RvcjogTWVtb2l6ZWRQcm9qZWN0aW9uXG4gICkgPT4gVjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvckZhY3Rvcnk8VCA9IGFueSwgViA9IGFueT4oXG4gIG1lbW9pemU6IE1lbW9pemVGblxuKTogKC4uLmlucHV0OiBhbnlbXSkgPT4gU2VsZWN0b3I8VCwgVj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JGYWN0b3J5PFQgPSBhbnksIFYgPSBhbnk+KFxuICBtZW1vaXplOiBNZW1vaXplRm4sXG4gIG9wdGlvbnM6IFNlbGVjdG9yRmFjdG9yeUNvbmZpZzxULCBWPlxuKTogKC4uLmlucHV0OiBhbnlbXSkgPT4gU2VsZWN0b3I8VCwgVj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JGYWN0b3J5PFQgPSBhbnksIFByb3BzID0gYW55LCBWID0gYW55PihcbiAgbWVtb2l6ZTogTWVtb2l6ZUZuXG4pOiAoLi4uaW5wdXQ6IGFueVtdKSA9PiBTZWxlY3RvcldpdGhQcm9wczxULCBQcm9wcywgVj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JGYWN0b3J5PFQgPSBhbnksIFByb3BzID0gYW55LCBWID0gYW55PihcbiAgbWVtb2l6ZTogTWVtb2l6ZUZuLFxuICBvcHRpb25zOiBTZWxlY3RvckZhY3RvcnlDb25maWc8VCwgVj5cbik6ICguLi5pbnB1dDogYW55W10pID0+IFNlbGVjdG9yV2l0aFByb3BzPFQsIFByb3BzLCBWPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvckZhY3RvcnkoXG4gIG1lbW9pemU6IE1lbW9pemVGbixcbiAgb3B0aW9uczogU2VsZWN0b3JGYWN0b3J5Q29uZmlnPGFueSwgYW55PiA9IHtcbiAgICBzdGF0ZUZuOiBkZWZhdWx0U3RhdGVGbixcbiAgfVxuKSB7XG4gIHJldHVybiBmdW5jdGlvbihcbiAgICAuLi5pbnB1dDogYW55W11cbiAgKTogU2VsZWN0b3I8YW55LCBhbnk+IHwgU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIGFueT4ge1xuICAgIGxldCBhcmdzID0gaW5wdXQ7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnc1swXSkpIHtcbiAgICAgIGNvbnN0IFtoZWFkLCAuLi50YWlsXSA9IGFyZ3M7XG4gICAgICBhcmdzID0gWy4uLmhlYWQsIC4uLnRhaWxdO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbGVjdG9ycyA9IGFyZ3Muc2xpY2UoMCwgYXJncy5sZW5ndGggLSAxKTtcbiAgICBjb25zdCBwcm9qZWN0b3IgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgbWVtb2l6ZWRTZWxlY3RvcnMgPSBzZWxlY3RvcnMuZmlsdGVyKFxuICAgICAgKHNlbGVjdG9yOiBhbnkpID0+XG4gICAgICAgIHNlbGVjdG9yLnJlbGVhc2UgJiYgdHlwZW9mIHNlbGVjdG9yLnJlbGVhc2UgPT09ICdmdW5jdGlvbidcbiAgICApO1xuXG4gICAgY29uc3QgbWVtb2l6ZWRQcm9qZWN0b3IgPSBtZW1vaXplKGZ1bmN0aW9uKC4uLnNlbGVjdG9yczogYW55W10pIHtcbiAgICAgIHJldHVybiBwcm9qZWN0b3IuYXBwbHkobnVsbCwgc2VsZWN0b3JzKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG1lbW9pemVkU3RhdGUgPSBkZWZhdWx0TWVtb2l6ZShmdW5jdGlvbihzdGF0ZTogYW55LCBwcm9wczogYW55KSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5zdGF0ZUZuLmFwcGx5KG51bGwsIFtcbiAgICAgICAgc3RhdGUsXG4gICAgICAgIHNlbGVjdG9ycyxcbiAgICAgICAgcHJvcHMsXG4gICAgICAgIG1lbW9pemVkUHJvamVjdG9yLFxuICAgICAgXSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiByZWxlYXNlKCkge1xuICAgICAgbWVtb2l6ZWRTdGF0ZS5yZXNldCgpO1xuICAgICAgbWVtb2l6ZWRQcm9qZWN0b3IucmVzZXQoKTtcblxuICAgICAgbWVtb2l6ZWRTZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiBzZWxlY3Rvci5yZWxlYXNlKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG1lbW9pemVkU3RhdGUubWVtb2l6ZWQsIHtcbiAgICAgIHJlbGVhc2UsXG4gICAgICBwcm9qZWN0b3I6IG1lbW9pemVkUHJvamVjdG9yLm1lbW9pemVkLFxuICAgICAgc2V0UmVzdWx0OiBtZW1vaXplZFN0YXRlLnNldFJlc3VsdCxcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZlYXR1cmVTZWxlY3RvcjxUPihcbiAgZmVhdHVyZU5hbWU6IHN0cmluZ1xuKTogTWVtb2l6ZWRTZWxlY3RvcjxvYmplY3QsIFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZlYXR1cmVTZWxlY3RvcjxULCBWPihcbiAgZmVhdHVyZU5hbWU6IGtleW9mIFRcbik6IE1lbW9pemVkU2VsZWN0b3I8VCwgVj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmVhdHVyZVNlbGVjdG9yKFxuICBmZWF0dXJlTmFtZTogYW55XG4pOiBNZW1vaXplZFNlbGVjdG9yPGFueSwgYW55PiB7XG4gIHJldHVybiBjcmVhdGVTZWxlY3RvcihcbiAgICAoc3RhdGU6IGFueSkgPT4gc3RhdGVbZmVhdHVyZU5hbWVdLFxuICAgIChmZWF0dXJlU3RhdGU6IGFueSkgPT4gZmVhdHVyZVN0YXRlXG4gICk7XG59XG4iXX0=