var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
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
    function reset() {
        lastArguments = null;
        lastResult = null;
    }
    // tslint:disable-next-line:no-any anything could be the result.
    function memoized() {
        if (!lastArguments) {
            lastResult = projectionFn.apply(null, arguments);
            lastArguments = arguments;
            return lastResult;
        }
        if (!isArgumentsChanged(arguments, lastArguments, isArgumentsEqual)) {
            return lastResult;
        }
        var newResult = projectionFn.apply(null, arguments);
        if (isResultEqual(lastResult, newResult)) {
            return lastResult;
        }
        lastResult = newResult;
        lastArguments = arguments;
        return newResult;
    }
    return { memoized: memoized, reset: reset };
}
export function createSelector() {
    var input = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        input[_i] = arguments[_i];
    }
    return createSelectorFactory(defaultMemoize).apply(void 0, __spread(input));
}
export function defaultStateFn(state, selectors, props, memoizedProjector) {
    if (props === undefined) {
        var args_1 = selectors.map(function (fn) { return fn(state); });
        return memoizedProjector.memoized.apply(null, args_1);
    }
    var args = selectors.map(function (fn) {
        return fn(state, props);
    });
    return memoizedProjector.memoized.apply(null, __spread(args, [props]));
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
            var _a = __read(args), head = _a[0], tail = _a.slice(1);
            args = __spread(head, tail);
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
            // createSelector works directly on state
            // e.g. createSelector((state, props) => ...)
            if (selectors.length === 0) {
                return projector.apply(null, [state, props]);
            }
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
        });
    };
}
export function createFeatureSelector(featureName) {
    return createSelector(function (state) { return state[featureName]; }, function (featureState) { return featureState; });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNLHVCQUF1QixDQUFNLEVBQUUsQ0FBTTtJQUN6QyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakIsQ0FBQztBQUVELDRCQUNFLElBQWdCLEVBQ2hCLGFBQXlCLEVBQ3pCLFVBQXdCO0lBRXhCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzFDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7S0FDRjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELE1BQU0sd0JBQ0osWUFBbUIsRUFDbkIsYUFBMkI7SUFFM0IsT0FBTyxjQUFjLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztBQUNuRSxDQUFDO0FBRUQsTUFBTSx5QkFDSixZQUFtQixFQUNuQixnQkFBK0IsRUFDL0IsYUFBNEI7SUFENUIsaUNBQUEsRUFBQSwrQkFBK0I7SUFDL0IsOEJBQUEsRUFBQSw0QkFBNEI7SUFFNUIsSUFBSSxhQUFhLEdBQXNCLElBQUksQ0FBQztJQUM1QyxnRUFBZ0U7SUFDaEUsSUFBSSxVQUFVLEdBQVEsSUFBSSxDQUFDO0lBRTNCO1FBQ0UsYUFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxnRUFBZ0U7SUFDaEU7UUFDRSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xCLFVBQVUsR0FB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cyB9IGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IHR5cGUgQW55Rm4gPSAoLi4uYXJnczogYW55W10pID0+IGFueTtcblxuZXhwb3J0IHR5cGUgTWVtb2l6ZWRQcm9qZWN0aW9uID0geyBtZW1vaXplZDogQW55Rm47IHJlc2V0OiAoKSA9PiB2b2lkIH07XG5cbmV4cG9ydCB0eXBlIE1lbW9pemVGbiA9ICh0OiBBbnlGbikgPT4gTWVtb2l6ZWRQcm9qZWN0aW9uO1xuXG5leHBvcnQgdHlwZSBDb21wYXJhdG9yRm4gPSAoYTogYW55LCBiOiBhbnkpID0+IGJvb2xlYW47XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PlxuICBleHRlbmRzIFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+IHtcbiAgcmVsZWFzZSgpOiB2b2lkO1xuICBwcm9qZWN0b3I6IEFueUZuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+XG4gIGV4dGVuZHMgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+IHtcbiAgcmVsZWFzZSgpOiB2b2lkO1xuICBwcm9qZWN0b3I6IEFueUZuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFcXVhbENoZWNrKGE6IGFueSwgYjogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBhID09PSBiO1xufVxuXG5mdW5jdGlvbiBpc0FyZ3VtZW50c0NoYW5nZWQoXG4gIGFyZ3M6IElBcmd1bWVudHMsXG4gIGxhc3RBcmd1bWVudHM6IElBcmd1bWVudHMsXG4gIGNvbXBhcmF0b3I6IENvbXBhcmF0b3JGblxuKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgIGlmICghY29tcGFyYXRvcihhcmdzW2ldLCBsYXN0QXJndW1lbnRzW2ldKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3VsdE1lbW9pemUoXG4gIHByb2plY3Rpb25GbjogQW55Rm4sXG4gIGlzUmVzdWx0RXF1YWw6IENvbXBhcmF0b3JGblxuKSB7XG4gIHJldHVybiBkZWZhdWx0TWVtb2l6ZShwcm9qZWN0aW9uRm4sIGlzRXF1YWxDaGVjaywgaXNSZXN1bHRFcXVhbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0TWVtb2l6ZShcbiAgcHJvamVjdGlvbkZuOiBBbnlGbixcbiAgaXNBcmd1bWVudHNFcXVhbCA9IGlzRXF1YWxDaGVjayxcbiAgaXNSZXN1bHRFcXVhbCA9IGlzRXF1YWxDaGVja1xuKTogTWVtb2l6ZWRQcm9qZWN0aW9uIHtcbiAgbGV0IGxhc3RBcmd1bWVudHM6IG51bGwgfCBJQXJndW1lbnRzID0gbnVsbDtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSBhbnl0aGluZyBjb3VsZCBiZSB0aGUgcmVzdWx0LlxuICBsZXQgbGFzdFJlc3VsdDogYW55ID0gbnVsbDtcblxuICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBsYXN0QXJndW1lbnRzID0gbnVsbDtcbiAgICBsYXN0UmVzdWx0ID0gbnVsbDtcbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgYW55dGhpbmcgY291bGQgYmUgdGhlIHJlc3VsdC5cbiAgZnVuY3Rpb24gbWVtb2l6ZWQoKTogYW55IHtcbiAgICBpZiAoIWxhc3RBcmd1bWVudHMpIHtcbiAgICAgIGxhc3RSZXN1bHQgPSBwcm9qZWN0aW9uRm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgIGxhc3RBcmd1bWVudHMgPSBhcmd1bWVudHM7XG4gICAgICByZXR1cm4gbGFzdFJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAoIWlzQXJndW1lbnRzQ2hhbmdlZChhcmd1bWVudHMsIGxhc3RBcmd1bWVudHMsIGlzQXJndW1lbnRzRXF1YWwpKSB7XG4gICAgICByZXR1cm4gbGFzdFJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdSZXN1bHQgPSBwcm9qZWN0aW9uRm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICBpZiAoaXNSZXN1bHRFcXVhbChsYXN0UmVzdWx0LCBuZXdSZXN1bHQpKSB7XG4gICAgICByZXR1cm4gbGFzdFJlc3VsdDtcbiAgICB9XG5cbiAgICBsYXN0UmVzdWx0ID0gbmV3UmVzdWx0O1xuICAgIGxhc3RBcmd1bWVudHMgPSBhcmd1bWVudHM7XG5cbiAgICByZXR1cm4gbmV3UmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIHsgbWVtb2l6ZWQsIHJlc2V0IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBwcm9qZWN0b3I6IChzMTogUzEpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbU2VsZWN0b3I8U3RhdGUsIFMxPl0sXG4gIHByb2plY3RvcjogKHMxOiBTMSkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1NlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+XSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBwcm9wczogUHJvcHMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgczI6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1NlbGVjdG9yPFN0YXRlLCBTMT4sIFNlbGVjdG9yPFN0YXRlLCBTMj5dLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMikgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPlxuICBdLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgczM6IFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUzMsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgczI6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICBzMzogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbU2VsZWN0b3I8U3RhdGUsIFMxPiwgU2VsZWN0b3I8U3RhdGUsIFMyPiwgU2VsZWN0b3I8U3RhdGUsIFMzPl0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUzMsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHMyOiBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICBzMzogU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgczQ6IFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBTMywgUzQsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgczI6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICBzMzogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gIHM0OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBwcm9wczogUHJvcHMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzQ+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBTMywgUzQsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHMyOiBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICBzMzogU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgczQ6IFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gIHM1OiBTZWxlY3RvcjxTdGF0ZSwgUzU+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBTMywgUzQsIFM1LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gIHMyOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgczM6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICBzNDogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gIHM1OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM1PixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNT5cbiAgXSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNT5cbiAgXSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHMzOiBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICBzNDogU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgczU6IFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gIHM2OiBTZWxlY3RvcjxTdGF0ZSwgUzY+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSwgczY6IFM2KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gIHMyOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgczM6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICBzNDogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gIHM1OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM1PixcbiAgczY6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzY+LFxuICBwcm9qZWN0b3I6IChcbiAgICBzMTogUzEsXG4gICAgczI6IFMyLFxuICAgIHMzOiBTMyxcbiAgICBzNDogUzQsXG4gICAgczU6IFM1LFxuICAgIHM2OiBTNixcbiAgICBwcm9wczogUHJvcHNcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM2PlxuICBdLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSwgczY6IFM2KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM1PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM2PlxuICBdLFxuICBwcm9qZWN0b3I6IChcbiAgICBzMTogUzEsXG4gICAgczI6IFMyLFxuICAgIHMzOiBTMyxcbiAgICBzNDogUzQsXG4gICAgczU6IFM1LFxuICAgIHM2OiBTNixcbiAgICBwcm9wczogUHJvcHNcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFM3LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHMzOiBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICBzNDogU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgczU6IFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gIHM2OiBTZWxlY3RvcjxTdGF0ZSwgUzY+LFxuICBzNzogU2VsZWN0b3I8U3RhdGUsIFM3PixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUsIHM2OiBTNiwgczc6IFM3KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8XG4gIFN0YXRlLFxuICBQcm9wcyxcbiAgUzEsXG4gIFMyLFxuICBTMyxcbiAgUzQsXG4gIFM1LFxuICBTNixcbiAgUzcsXG4gIFJlc3VsdFxuPihcbiAgczE6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICBzMjogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gIHMzOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgczQ6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+LFxuICBzNTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNT4sXG4gIHM2OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM2PixcbiAgczc6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzc+LFxuICBwcm9qZWN0b3I6IChcbiAgICBzMTogUzEsXG4gICAgczI6IFMyLFxuICAgIHMzOiBTMyxcbiAgICBzNDogUzQsXG4gICAgczU6IFM1LFxuICAgIHM2OiBTNixcbiAgICBzNzogUzcsXG4gICAgcHJvcHM6IFByb3BzXG4gICkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBTNiwgUzcsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM1PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzY+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNz5cbiAgXSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUsIHM2OiBTNiwgczc6IFM3KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8XG4gIFN0YXRlLFxuICBQcm9wcyxcbiAgUzEsXG4gIFMyLFxuICBTMyxcbiAgUzQsXG4gIFM1LFxuICBTNixcbiAgUzcsXG4gIFJlc3VsdFxuPihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNj4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNz5cbiAgXSxcbiAgcHJvamVjdG9yOiAoXG4gICAgczE6IFMxLFxuICAgIHMyOiBTMixcbiAgICBzMzogUzMsXG4gICAgczQ6IFM0LFxuICAgIHM1OiBTNSxcbiAgICBzNjogUzYsXG4gICAgczc6IFM3LFxuICAgIHByb3BzOiBQcm9wc1xuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBTNiwgUzcsIFM4LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHMzOiBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICBzNDogU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgczU6IFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gIHM2OiBTZWxlY3RvcjxTdGF0ZSwgUzY+LFxuICBzNzogU2VsZWN0b3I8U3RhdGUsIFM3PixcbiAgczg6IFNlbGVjdG9yPFN0YXRlLCBTOD4sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHM3OiBTNyxcbiAgICBzODogUzhcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8XG4gIFN0YXRlLFxuICBQcm9wcyxcbiAgUzEsXG4gIFMyLFxuICBTMyxcbiAgUzQsXG4gIFM1LFxuICBTNixcbiAgUzcsXG4gIFM4LFxuICBSZXN1bHRcbj4oXG4gIHMxOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgczI6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICBzMzogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gIHM0OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PixcbiAgczU6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzU+LFxuICBzNjogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNj4sXG4gIHM3OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM3PixcbiAgczg6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzg+LFxuICBwcm9qZWN0b3I6IChcbiAgICBzMTogUzEsXG4gICAgczI6IFMyLFxuICAgIHMzOiBTMyxcbiAgICBzNDogUzQsXG4gICAgczU6IFM1LFxuICAgIHM2OiBTNixcbiAgICBzNzogUzcsXG4gICAgczg6IFM4LFxuICAgIHByb3BzOiBQcm9wc1xuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFM3LCBTOCwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzU+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM3PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzg+XG4gIF0sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHM3OiBTNyxcbiAgICBzODogUzhcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8XG4gIFN0YXRlLFxuICBQcm9wcyxcbiAgUzEsXG4gIFMyLFxuICBTMyxcbiAgUzQsXG4gIFM1LFxuICBTNixcbiAgUzcsXG4gIFM4LFxuICBSZXN1bHRcbj4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzU+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzY+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzc+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzg+XG4gIF0sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHM3OiBTNyxcbiAgICBzODogUzgsXG4gICAgcHJvcHM6IFByb3BzXG4gICkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUmVzdWx0PihcbiAgcHJvamVjdG9yOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD5cbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3IoXG4gIC4uLmlucHV0OiBhbnlbXVxuKTogU2VsZWN0b3I8YW55LCBhbnk+IHwgU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIGFueT4ge1xuICByZXR1cm4gY3JlYXRlU2VsZWN0b3JGYWN0b3J5KGRlZmF1bHRNZW1vaXplKSguLi5pbnB1dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0U3RhdGVGbihcbiAgc3RhdGU6IGFueSxcbiAgc2VsZWN0b3JzOiBTZWxlY3RvcjxhbnksIGFueT5bXSB8IFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBhbnk+W10sXG4gIHByb3BzOiBhbnksXG4gIG1lbW9pemVkUHJvamVjdG9yOiBNZW1vaXplZFByb2plY3Rpb25cbik6IGFueSB7XG4gIGlmIChwcm9wcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgYXJncyA9ICg8U2VsZWN0b3I8YW55LCBhbnk+W10+c2VsZWN0b3JzKS5tYXAoZm4gPT4gZm4oc3RhdGUpKTtcbiAgICByZXR1cm4gbWVtb2l6ZWRQcm9qZWN0b3IubWVtb2l6ZWQuYXBwbHkobnVsbCwgYXJncyk7XG4gIH1cblxuICBjb25zdCBhcmdzID0gKDxTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgYW55PltdPnNlbGVjdG9ycykubWFwKGZuID0+XG4gICAgZm4oc3RhdGUsIHByb3BzKVxuICApO1xuICByZXR1cm4gbWVtb2l6ZWRQcm9qZWN0b3IubWVtb2l6ZWQuYXBwbHkobnVsbCwgWy4uLmFyZ3MsIHByb3BzXSk7XG59XG5cbmV4cG9ydCB0eXBlIFNlbGVjdG9yRmFjdG9yeUNvbmZpZzxUID0gYW55LCBWID0gYW55PiA9IHtcbiAgc3RhdGVGbjogKFxuICAgIHN0YXRlOiBULFxuICAgIHByb3BzOiBhbnksXG4gICAgc2VsZWN0b3JzOiBTZWxlY3RvcjxhbnksIGFueT5bXSxcbiAgICBtZW1vaXplZFByb2plY3RvcjogTWVtb2l6ZWRQcm9qZWN0aW9uXG4gICkgPT4gVjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvckZhY3Rvcnk8VCA9IGFueSwgViA9IGFueT4oXG4gIG1lbW9pemU6IE1lbW9pemVGblxuKTogKC4uLmlucHV0OiBhbnlbXSkgPT4gU2VsZWN0b3I8VCwgVj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JGYWN0b3J5PFQgPSBhbnksIFYgPSBhbnk+KFxuICBtZW1vaXplOiBNZW1vaXplRm4sXG4gIG9wdGlvbnM6IFNlbGVjdG9yRmFjdG9yeUNvbmZpZzxULCBWPlxuKTogKC4uLmlucHV0OiBhbnlbXSkgPT4gU2VsZWN0b3I8VCwgVj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JGYWN0b3J5PFQgPSBhbnksIFByb3BzID0gYW55LCBWID0gYW55PihcbiAgbWVtb2l6ZTogTWVtb2l6ZUZuXG4pOiAoLi4uaW5wdXQ6IGFueVtdKSA9PiBTZWxlY3RvcldpdGhQcm9wczxULCBQcm9wcywgVj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JGYWN0b3J5PFQgPSBhbnksIFByb3BzID0gYW55LCBWID0gYW55PihcbiAgbWVtb2l6ZTogTWVtb2l6ZUZuLFxuICBvcHRpb25zOiBTZWxlY3RvckZhY3RvcnlDb25maWc8VCwgVj5cbik6ICguLi5pbnB1dDogYW55W10pID0+IFNlbGVjdG9yV2l0aFByb3BzPFQsIFByb3BzLCBWPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvckZhY3RvcnkoXG4gIG1lbW9pemU6IE1lbW9pemVGbixcbiAgb3B0aW9uczogU2VsZWN0b3JGYWN0b3J5Q29uZmlnPGFueSwgYW55PiA9IHtcbiAgICBzdGF0ZUZuOiBkZWZhdWx0U3RhdGVGbixcbiAgfVxuKSB7XG4gIHJldHVybiBmdW5jdGlvbihcbiAgICAuLi5pbnB1dDogYW55W11cbiAgKTogU2VsZWN0b3I8YW55LCBhbnk+IHwgU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIGFueT4ge1xuICAgIGxldCBhcmdzID0gaW5wdXQ7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnc1swXSkpIHtcbiAgICAgIGNvbnN0IFtoZWFkLCAuLi50YWlsXSA9IGFyZ3M7XG4gICAgICBhcmdzID0gWy4uLmhlYWQsIC4uLnRhaWxdO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbGVjdG9ycyA9IGFyZ3Muc2xpY2UoMCwgYXJncy5sZW5ndGggLSAxKTtcbiAgICBjb25zdCBwcm9qZWN0b3IgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgbWVtb2l6ZWRTZWxlY3RvcnMgPSBzZWxlY3RvcnMuZmlsdGVyKFxuICAgICAgKHNlbGVjdG9yOiBhbnkpID0+XG4gICAgICAgIHNlbGVjdG9yLnJlbGVhc2UgJiYgdHlwZW9mIHNlbGVjdG9yLnJlbGVhc2UgPT09ICdmdW5jdGlvbidcbiAgICApO1xuXG4gICAgY29uc3QgbWVtb2l6ZWRQcm9qZWN0b3IgPSBtZW1vaXplKGZ1bmN0aW9uKC4uLnNlbGVjdG9yczogYW55W10pIHtcbiAgICAgIHJldHVybiBwcm9qZWN0b3IuYXBwbHkobnVsbCwgc2VsZWN0b3JzKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG1lbW9pemVkU3RhdGUgPSBkZWZhdWx0TWVtb2l6ZShmdW5jdGlvbihzdGF0ZTogYW55LCBwcm9wczogYW55KSB7XG4gICAgICAvLyBjcmVhdGVTZWxlY3RvciB3b3JrcyBkaXJlY3RseSBvbiBzdGF0ZVxuICAgICAgLy8gZS5nLiBjcmVhdGVTZWxlY3Rvcigoc3RhdGUsIHByb3BzKSA9PiAuLi4pXG4gICAgICBpZiAoc2VsZWN0b3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gcHJvamVjdG9yLmFwcGx5KG51bGwsIFtzdGF0ZSwgcHJvcHNdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG9wdGlvbnMuc3RhdGVGbi5hcHBseShudWxsLCBbXG4gICAgICAgIHN0YXRlLFxuICAgICAgICBzZWxlY3RvcnMsXG4gICAgICAgIHByb3BzLFxuICAgICAgICBtZW1vaXplZFByb2plY3RvcixcbiAgICAgIF0pO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcmVsZWFzZSgpIHtcbiAgICAgIG1lbW9pemVkU3RhdGUucmVzZXQoKTtcbiAgICAgIG1lbW9pemVkUHJvamVjdG9yLnJlc2V0KCk7XG5cbiAgICAgIG1lbW9pemVkU2VsZWN0b3JzLmZvckVhY2goc2VsZWN0b3IgPT4gc2VsZWN0b3IucmVsZWFzZSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihtZW1vaXplZFN0YXRlLm1lbW9pemVkLCB7XG4gICAgICByZWxlYXNlLFxuICAgICAgcHJvamVjdG9yOiBtZW1vaXplZFByb2plY3Rvci5tZW1vaXplZCxcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZlYXR1cmVTZWxlY3RvcjxUPihcbiAgZmVhdHVyZU5hbWU6IHN0cmluZ1xuKTogTWVtb2l6ZWRTZWxlY3RvcjxvYmplY3QsIFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZlYXR1cmVTZWxlY3RvcjxULCBWPihcbiAgZmVhdHVyZU5hbWU6IGtleW9mIFRcbik6IE1lbW9pemVkU2VsZWN0b3I8VCwgVj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmVhdHVyZVNlbGVjdG9yKFxuICBmZWF0dXJlTmFtZTogYW55XG4pOiBNZW1vaXplZFNlbGVjdG9yPGFueSwgYW55PiB7XG4gIHJldHVybiBjcmVhdGVTZWxlY3RvcihcbiAgICAoc3RhdGU6IGFueSkgPT4gc3RhdGVbZmVhdHVyZU5hbWVdLFxuICAgIChmZWF0dXJlU3RhdGU6IGFueSkgPT4gZmVhdHVyZVN0YXRlXG4gICk7XG59XG4iXX0=