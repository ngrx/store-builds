import * as tslib_1 from "tslib";
import { isDevMode } from '@angular/core';
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
        var newResult = projectionFn.apply(null, arguments);
        lastArguments = arguments;
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
    return createSelector(function (state) {
        var featureState = state[featureName];
        if (isDevMode() && !(featureName in state)) {
            console.warn("@ngrx/store: The feature name \"" + featureName + "\" does " +
                'not exist in the state, therefore createFeatureSelector ' +
                'cannot access it.  Be sure it is imported in a loaded module ' +
                ("using StoreModule.forRoot('" + featureName + "', ...) or ") +
                ("StoreModule.forFeature('" + featureName + "', ...).  If the default ") +
                'state is intended to be undefined, as is the case with router ' +
                'state, this development-only warning message can be ignored.');
        }
        return featureState;
    }, function (featureState) { return featureState; });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXFDMUMsTUFBTSxVQUFVLFlBQVksQ0FBQyxDQUFNLEVBQUUsQ0FBTTtJQUN6QyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakIsQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQ3pCLElBQWdCLEVBQ2hCLGFBQXlCLEVBQ3pCLFVBQXdCO0lBRXhCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzFDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7S0FDRjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELE1BQU0sVUFBVSxhQUFhLENBQzNCLFlBQW1CLEVBQ25CLGFBQTJCO0lBRTNCLE9BQU8sY0FBYyxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDbkUsQ0FBQztBQUVELE1BQU0sVUFBVSxjQUFjLENBQzVCLFlBQW1CLEVBQ25CLGdCQUErQixFQUMvQixhQUE0QjtJQUQ1QixpQ0FBQSxFQUFBLCtCQUErQjtJQUMvQiw4QkFBQSxFQUFBLDRCQUE0QjtJQUU1QixJQUFJLGFBQWEsR0FBc0IsSUFBSSxDQUFDO0lBQzVDLGdFQUFnRTtJQUNoRSxJQUFJLFVBQVUsR0FBUSxJQUFJLENBQUM7SUFDM0IsSUFBSSxjQUFtQixDQUFDO0lBRXhCLFNBQVMsS0FBSztRQUNaLGFBQWEsR0FBRyxJQUFJLENBQUM7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Q0FDbkMsV0FBZ0I7SUFFaEIsT0FBTyxjQUFjLENBQUMsVUFBQyxLQUFVO1FBQy9CLElBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4QyxJQUFJLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLEVBQUU7WUFDMUMsT0FBTyxDQUFDLElBQUksQ0FDVixxQ0FBbUMsV0FBVyxhQUFVO2dCQUN0RCwwREFBMEQ7Z0JBQzFELCtEQUErRDtpQkFDL0QsZ0NBQThCLFdBQVcsZ0JBQWEsQ0FBQTtpQkFDdEQsNkJBQTJCLFdBQVcsOEJBQTJCLENBQUE7Z0JBQ2pFLGdFQUFnRTtnQkFDaEUsOERBQThELENBQ2pFLENBQUM7U0FDSDtRQUNELE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUMsRUFBRSxVQUFDLFlBQWlCLElBQUssT0FBQSxZQUFZLEVBQVosQ0FBWSxDQUFDLENBQUM7QUFDMUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlbGVjdG9yLCBTZWxlY3RvcldpdGhQcm9wcyB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgdHlwZSBBbnlGbiA9ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xuXG5leHBvcnQgdHlwZSBNZW1vaXplZFByb2plY3Rpb24gPSB7XG4gIG1lbW9pemVkOiBBbnlGbjtcbiAgcmVzZXQ6ICgpID0+IHZvaWQ7XG4gIHNldFJlc3VsdDogKHJlc3VsdD86IGFueSkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIE1lbW9pemVGbiA9ICh0OiBBbnlGbikgPT4gTWVtb2l6ZWRQcm9qZWN0aW9uO1xuXG5leHBvcnQgdHlwZSBDb21wYXJhdG9yRm4gPSAoYTogYW55LCBiOiBhbnkpID0+IGJvb2xlYW47XG5cbmV4cG9ydCB0eXBlIERlZmF1bHRQcm9qZWN0b3JGbjxUPiA9ICguLi5hcmdzOiBhbnlbXSkgPT4gVDtcblxuZXhwb3J0IGludGVyZmFjZSBNZW1vaXplZFNlbGVjdG9yPFxuICBTdGF0ZSxcbiAgUmVzdWx0LFxuICBQcm9qZWN0b3JGbiA9IERlZmF1bHRQcm9qZWN0b3JGbjxSZXN1bHQ+XG4+IGV4dGVuZHMgU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD4ge1xuICByZWxlYXNlKCk6IHZvaWQ7XG4gIHByb2plY3RvcjogUHJvamVjdG9yRm47XG4gIHNldFJlc3VsdDogKHJlc3VsdD86IFJlc3VsdCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFxuICBTdGF0ZSxcbiAgUHJvcHMsXG4gIFJlc3VsdCxcbiAgUHJvamVjdG9yRm4gPSBEZWZhdWx0UHJvamVjdG9yRm48UmVzdWx0PlxuPiBleHRlbmRzIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PiB7XG4gIHJlbGVhc2UoKTogdm9pZDtcbiAgcHJvamVjdG9yOiBQcm9qZWN0b3JGbjtcbiAgc2V0UmVzdWx0OiAocmVzdWx0PzogUmVzdWx0KSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFcXVhbENoZWNrKGE6IGFueSwgYjogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBhID09PSBiO1xufVxuXG5mdW5jdGlvbiBpc0FyZ3VtZW50c0NoYW5nZWQoXG4gIGFyZ3M6IElBcmd1bWVudHMsXG4gIGxhc3RBcmd1bWVudHM6IElBcmd1bWVudHMsXG4gIGNvbXBhcmF0b3I6IENvbXBhcmF0b3JGblxuKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgIGlmICghY29tcGFyYXRvcihhcmdzW2ldLCBsYXN0QXJndW1lbnRzW2ldKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3VsdE1lbW9pemUoXG4gIHByb2plY3Rpb25GbjogQW55Rm4sXG4gIGlzUmVzdWx0RXF1YWw6IENvbXBhcmF0b3JGblxuKSB7XG4gIHJldHVybiBkZWZhdWx0TWVtb2l6ZShwcm9qZWN0aW9uRm4sIGlzRXF1YWxDaGVjaywgaXNSZXN1bHRFcXVhbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0TWVtb2l6ZShcbiAgcHJvamVjdGlvbkZuOiBBbnlGbixcbiAgaXNBcmd1bWVudHNFcXVhbCA9IGlzRXF1YWxDaGVjayxcbiAgaXNSZXN1bHRFcXVhbCA9IGlzRXF1YWxDaGVja1xuKTogTWVtb2l6ZWRQcm9qZWN0aW9uIHtcbiAgbGV0IGxhc3RBcmd1bWVudHM6IG51bGwgfCBJQXJndW1lbnRzID0gbnVsbDtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSBhbnl0aGluZyBjb3VsZCBiZSB0aGUgcmVzdWx0LlxuICBsZXQgbGFzdFJlc3VsdDogYW55ID0gbnVsbDtcbiAgbGV0IG92ZXJyaWRlUmVzdWx0OiBhbnk7XG5cbiAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgbGFzdEFyZ3VtZW50cyA9IG51bGw7XG4gICAgbGFzdFJlc3VsdCA9IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRSZXN1bHQocmVzdWx0OiBhbnkgPSB1bmRlZmluZWQpIHtcbiAgICBvdmVycmlkZVJlc3VsdCA9IHJlc3VsdDtcbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgYW55dGhpbmcgY291bGQgYmUgdGhlIHJlc3VsdC5cbiAgZnVuY3Rpb24gbWVtb2l6ZWQoKTogYW55IHtcbiAgICBpZiAob3ZlcnJpZGVSZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG92ZXJyaWRlUmVzdWx0O1xuICAgIH1cblxuICAgIGlmICghbGFzdEFyZ3VtZW50cykge1xuICAgICAgbGFzdFJlc3VsdCA9IHByb2plY3Rpb25Gbi5hcHBseShudWxsLCBhcmd1bWVudHMgYXMgYW55KTtcbiAgICAgIGxhc3RBcmd1bWVudHMgPSBhcmd1bWVudHM7XG4gICAgICByZXR1cm4gbGFzdFJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAoIWlzQXJndW1lbnRzQ2hhbmdlZChhcmd1bWVudHMsIGxhc3RBcmd1bWVudHMsIGlzQXJndW1lbnRzRXF1YWwpKSB7XG4gICAgICByZXR1cm4gbGFzdFJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdSZXN1bHQgPSBwcm9qZWN0aW9uRm4uYXBwbHkobnVsbCwgYXJndW1lbnRzIGFzIGFueSk7XG4gICAgbGFzdEFyZ3VtZW50cyA9IGFyZ3VtZW50cztcblxuICAgIGlmIChpc1Jlc3VsdEVxdWFsKGxhc3RSZXN1bHQsIG5ld1Jlc3VsdCkpIHtcbiAgICAgIHJldHVybiBsYXN0UmVzdWx0O1xuICAgIH1cblxuICAgIGxhc3RSZXN1bHQgPSBuZXdSZXN1bHQ7XG5cbiAgICByZXR1cm4gbmV3UmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIHsgbWVtb2l6ZWQsIHJlc2V0LCBzZXRSZXN1bHQgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHByb2plY3RvcjogKHMxOiBTMSkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBwcm9wczogUHJvcHMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtTZWxlY3RvcjxTdGF0ZSwgUzE+XSxcbiAgcHJvamVjdG9yOiAoczE6IFMxKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT5dLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICBzMjogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBwcm9wczogUHJvcHMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbU2VsZWN0b3I8U3RhdGUsIFMxPiwgU2VsZWN0b3I8U3RhdGUsIFMyPl0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBwcm9wczogUHJvcHMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHMyOiBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICBzMzogU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBTMywgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICBzMjogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gIHMzOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtTZWxlY3RvcjxTdGF0ZSwgUzE+LCBTZWxlY3RvcjxTdGF0ZSwgUzI+LCBTZWxlY3RvcjxTdGF0ZSwgUzM+XSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBTMywgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz5cbiAgXSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHMzOiBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICBzNDogU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFMzLCBTNCwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICBzMjogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gIHMzOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgczQ6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTND5cbiAgXSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFMzLCBTNCwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND5cbiAgXSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBwcm9wczogUHJvcHMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHMzOiBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICBzNDogU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgczU6IFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgczU6IFM1KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgczI6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICBzMzogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gIHM0OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PixcbiAgczU6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzU+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSwgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM1PlxuICBdLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBTMywgUzQsIFM1LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM1PlxuICBdLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSwgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgczM6IFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gIHM0OiBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICBzNTogU2VsZWN0b3I8U3RhdGUsIFM1PixcbiAgczY6IFNlbGVjdG9yPFN0YXRlLCBTNj4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgczU6IFM1LCBzNjogUzYpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgczI6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICBzMzogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gIHM0OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PixcbiAgczU6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzU+LFxuICBzNjogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNj4sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHByb3BzOiBQcm9wc1xuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzU+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNj5cbiAgXSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUsIHM2OiBTNikgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBTMywgUzQsIFM1LCBTNiwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNj5cbiAgXSxcbiAgcHJvamVjdG9yOiAoXG4gICAgczE6IFMxLFxuICAgIHMyOiBTMixcbiAgICBzMzogUzMsXG4gICAgczQ6IFM0LFxuICAgIHM1OiBTNSxcbiAgICBzNjogUzYsXG4gICAgcHJvcHM6IFByb3BzXG4gICkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBTNywgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHMyOiBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICBzMzogU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgczQ6IFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gIHM1OiBTZWxlY3RvcjxTdGF0ZSwgUzU+LFxuICBzNjogU2VsZWN0b3I8U3RhdGUsIFM2PixcbiAgczc6IFNlbGVjdG9yPFN0YXRlLCBTNz4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgczU6IFM1LCBzNjogUzYsIHM3OiBTNykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFxuICBTdGF0ZSxcbiAgUHJvcHMsXG4gIFMxLFxuICBTMixcbiAgUzMsXG4gIFM0LFxuICBTNSxcbiAgUzYsXG4gIFM3LFxuICBSZXN1bHRcbj4oXG4gIHMxOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgczI6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICBzMzogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gIHM0OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PixcbiAgczU6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzU+LFxuICBzNjogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNj4sXG4gIHM3OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM3PixcbiAgcHJvamVjdG9yOiAoXG4gICAgczE6IFMxLFxuICAgIHMyOiBTMixcbiAgICBzMzogUzMsXG4gICAgczQ6IFM0LFxuICAgIHM1OiBTNSxcbiAgICBzNjogUzYsXG4gICAgczc6IFM3LFxuICAgIHByb3BzOiBQcm9wc1xuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFM3LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM2PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzc+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgczU6IFM1LCBzNjogUzYsIHM3OiBTNykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFxuICBTdGF0ZSxcbiAgUHJvcHMsXG4gIFMxLFxuICBTMixcbiAgUzMsXG4gIFM0LFxuICBTNSxcbiAgUzYsXG4gIFM3LFxuICBSZXN1bHRcbj4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzU+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzY+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzc+XG4gIF0sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHM3OiBTNyxcbiAgICBwcm9wczogUHJvcHNcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFM3LCBTOCwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHMyOiBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICBzMzogU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgczQ6IFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gIHM1OiBTZWxlY3RvcjxTdGF0ZSwgUzU+LFxuICBzNjogU2VsZWN0b3I8U3RhdGUsIFM2PixcbiAgczc6IFNlbGVjdG9yPFN0YXRlLCBTNz4sXG4gIHM4OiBTZWxlY3RvcjxTdGF0ZSwgUzg+LFxuICBwcm9qZWN0b3I6IChcbiAgICBzMTogUzEsXG4gICAgczI6IFMyLFxuICAgIHMzOiBTMyxcbiAgICBzNDogUzQsXG4gICAgczU6IFM1LFxuICAgIHM2OiBTNixcbiAgICBzNzogUzcsXG4gICAgczg6IFM4XG4gICkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFxuICBTdGF0ZSxcbiAgUHJvcHMsXG4gIFMxLFxuICBTMixcbiAgUzMsXG4gIFM0LFxuICBTNSxcbiAgUzYsXG4gIFM3LFxuICBTOCxcbiAgUmVzdWx0XG4+KFxuICBzMTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gIHMyOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgczM6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICBzNDogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gIHM1OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM1PixcbiAgczY6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzY+LFxuICBzNzogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNz4sXG4gIHM4OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM4PixcbiAgcHJvamVjdG9yOiAoXG4gICAgczE6IFMxLFxuICAgIHMyOiBTMixcbiAgICBzMzogUzMsXG4gICAgczQ6IFM0LFxuICAgIHM1OiBTNSxcbiAgICBzNjogUzYsXG4gICAgczc6IFM3LFxuICAgIHM4OiBTOCxcbiAgICBwcm9wczogUHJvcHNcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBTNywgUzgsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM1PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzY+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNz4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM4PlxuICBdLFxuICBwcm9qZWN0b3I6IChcbiAgICBzMTogUzEsXG4gICAgczI6IFMyLFxuICAgIHMzOiBTMyxcbiAgICBzNDogUzQsXG4gICAgczU6IFM1LFxuICAgIHM2OiBTNixcbiAgICBzNzogUzcsXG4gICAgczg6IFM4XG4gICkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFxuICBTdGF0ZSxcbiAgUHJvcHMsXG4gIFMxLFxuICBTMixcbiAgUzMsXG4gIFM0LFxuICBTNSxcbiAgUzYsXG4gIFM3LFxuICBTOCxcbiAgUmVzdWx0XG4+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM1PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM2PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM3PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM4PlxuICBdLFxuICBwcm9qZWN0b3I6IChcbiAgICBzMTogUzEsXG4gICAgczI6IFMyLFxuICAgIHMzOiBTMyxcbiAgICBzNDogUzQsXG4gICAgczU6IFM1LFxuICAgIHM2OiBTNixcbiAgICBzNzogUzcsXG4gICAgczg6IFM4LFxuICAgIHByb3BzOiBQcm9wc1xuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcihcbiAgLi4uaW5wdXQ6IGFueVtdXG4pOiBNZW1vaXplZFNlbGVjdG9yPGFueSwgYW55PiB8IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIGFueT4ge1xuICByZXR1cm4gY3JlYXRlU2VsZWN0b3JGYWN0b3J5KGRlZmF1bHRNZW1vaXplKSguLi5pbnB1dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0U3RhdGVGbihcbiAgc3RhdGU6IGFueSxcbiAgc2VsZWN0b3JzOiBTZWxlY3RvcjxhbnksIGFueT5bXSB8IFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBhbnk+W10sXG4gIHByb3BzOiBhbnksXG4gIG1lbW9pemVkUHJvamVjdG9yOiBNZW1vaXplZFByb2plY3Rpb25cbik6IGFueSB7XG4gIGlmIChwcm9wcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgYXJncyA9ICg8U2VsZWN0b3I8YW55LCBhbnk+W10+c2VsZWN0b3JzKS5tYXAoZm4gPT4gZm4oc3RhdGUpKTtcbiAgICByZXR1cm4gbWVtb2l6ZWRQcm9qZWN0b3IubWVtb2l6ZWQuYXBwbHkobnVsbCwgYXJncyk7XG4gIH1cblxuICBjb25zdCBhcmdzID0gKDxTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgYW55PltdPnNlbGVjdG9ycykubWFwKGZuID0+XG4gICAgZm4oc3RhdGUsIHByb3BzKVxuICApO1xuICByZXR1cm4gbWVtb2l6ZWRQcm9qZWN0b3IubWVtb2l6ZWQuYXBwbHkobnVsbCwgWy4uLmFyZ3MsIHByb3BzXSk7XG59XG5cbmV4cG9ydCB0eXBlIFNlbGVjdG9yRmFjdG9yeUNvbmZpZzxUID0gYW55LCBWID0gYW55PiA9IHtcbiAgc3RhdGVGbjogKFxuICAgIHN0YXRlOiBULFxuICAgIHByb3BzOiBhbnksXG4gICAgc2VsZWN0b3JzOiBTZWxlY3RvcjxhbnksIGFueT5bXSxcbiAgICBtZW1vaXplZFByb2plY3RvcjogTWVtb2l6ZWRQcm9qZWN0aW9uXG4gICkgPT4gVjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvckZhY3Rvcnk8VCA9IGFueSwgViA9IGFueT4oXG4gIG1lbW9pemU6IE1lbW9pemVGblxuKTogKC4uLmlucHV0OiBhbnlbXSkgPT4gTWVtb2l6ZWRTZWxlY3RvcjxULCBWPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvckZhY3Rvcnk8VCA9IGFueSwgViA9IGFueT4oXG4gIG1lbW9pemU6IE1lbW9pemVGbixcbiAgb3B0aW9uczogU2VsZWN0b3JGYWN0b3J5Q29uZmlnPFQsIFY+XG4pOiAoLi4uaW5wdXQ6IGFueVtdKSA9PiBNZW1vaXplZFNlbGVjdG9yPFQsIFY+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yRmFjdG9yeTxUID0gYW55LCBQcm9wcyA9IGFueSwgViA9IGFueT4oXG4gIG1lbW9pemU6IE1lbW9pemVGblxuKTogKC4uLmlucHV0OiBhbnlbXSkgPT4gTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxULCBQcm9wcywgVj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JGYWN0b3J5PFQgPSBhbnksIFByb3BzID0gYW55LCBWID0gYW55PihcbiAgbWVtb2l6ZTogTWVtb2l6ZUZuLFxuICBvcHRpb25zOiBTZWxlY3RvckZhY3RvcnlDb25maWc8VCwgVj5cbik6ICguLi5pbnB1dDogYW55W10pID0+IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8VCwgUHJvcHMsIFY+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yRmFjdG9yeShcbiAgbWVtb2l6ZTogTWVtb2l6ZUZuLFxuICBvcHRpb25zOiBTZWxlY3RvckZhY3RvcnlDb25maWc8YW55LCBhbnk+ID0ge1xuICAgIHN0YXRlRm46IGRlZmF1bHRTdGF0ZUZuLFxuICB9XG4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKFxuICAgIC4uLmlucHV0OiBhbnlbXVxuICApOiBNZW1vaXplZFNlbGVjdG9yPGFueSwgYW55PiB8IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIGFueT4ge1xuICAgIGxldCBhcmdzID0gaW5wdXQ7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnc1swXSkpIHtcbiAgICAgIGNvbnN0IFtoZWFkLCAuLi50YWlsXSA9IGFyZ3M7XG4gICAgICBhcmdzID0gWy4uLmhlYWQsIC4uLnRhaWxdO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbGVjdG9ycyA9IGFyZ3Muc2xpY2UoMCwgYXJncy5sZW5ndGggLSAxKTtcbiAgICBjb25zdCBwcm9qZWN0b3IgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgbWVtb2l6ZWRTZWxlY3RvcnMgPSBzZWxlY3RvcnMuZmlsdGVyKFxuICAgICAgKHNlbGVjdG9yOiBhbnkpID0+XG4gICAgICAgIHNlbGVjdG9yLnJlbGVhc2UgJiYgdHlwZW9mIHNlbGVjdG9yLnJlbGVhc2UgPT09ICdmdW5jdGlvbidcbiAgICApO1xuXG4gICAgY29uc3QgbWVtb2l6ZWRQcm9qZWN0b3IgPSBtZW1vaXplKGZ1bmN0aW9uKC4uLnNlbGVjdG9yczogYW55W10pIHtcbiAgICAgIHJldHVybiBwcm9qZWN0b3IuYXBwbHkobnVsbCwgc2VsZWN0b3JzKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG1lbW9pemVkU3RhdGUgPSBkZWZhdWx0TWVtb2l6ZShmdW5jdGlvbihzdGF0ZTogYW55LCBwcm9wczogYW55KSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5zdGF0ZUZuLmFwcGx5KG51bGwsIFtcbiAgICAgICAgc3RhdGUsXG4gICAgICAgIHNlbGVjdG9ycyxcbiAgICAgICAgcHJvcHMsXG4gICAgICAgIG1lbW9pemVkUHJvamVjdG9yLFxuICAgICAgXSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiByZWxlYXNlKCkge1xuICAgICAgbWVtb2l6ZWRTdGF0ZS5yZXNldCgpO1xuICAgICAgbWVtb2l6ZWRQcm9qZWN0b3IucmVzZXQoKTtcblxuICAgICAgbWVtb2l6ZWRTZWxlY3RvcnMuZm9yRWFjaChzZWxlY3RvciA9PiBzZWxlY3Rvci5yZWxlYXNlKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG1lbW9pemVkU3RhdGUubWVtb2l6ZWQsIHtcbiAgICAgIHJlbGVhc2UsXG4gICAgICBwcm9qZWN0b3I6IG1lbW9pemVkUHJvamVjdG9yLm1lbW9pemVkLFxuICAgICAgc2V0UmVzdWx0OiBtZW1vaXplZFN0YXRlLnNldFJlc3VsdCxcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZlYXR1cmVTZWxlY3RvcjxUPihcbiAgZmVhdHVyZU5hbWU6IHN0cmluZ1xuKTogTWVtb2l6ZWRTZWxlY3RvcjxvYmplY3QsIFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZlYXR1cmVTZWxlY3RvcjxULCBWPihcbiAgZmVhdHVyZU5hbWU6IGtleW9mIFRcbik6IE1lbW9pemVkU2VsZWN0b3I8VCwgVj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmVhdHVyZVNlbGVjdG9yKFxuICBmZWF0dXJlTmFtZTogYW55XG4pOiBNZW1vaXplZFNlbGVjdG9yPGFueSwgYW55PiB7XG4gIHJldHVybiBjcmVhdGVTZWxlY3Rvcigoc3RhdGU6IGFueSkgPT4ge1xuICAgIGNvbnN0IGZlYXR1cmVTdGF0ZSA9IHN0YXRlW2ZlYXR1cmVOYW1lXTtcbiAgICBpZiAoaXNEZXZNb2RlKCkgJiYgIShmZWF0dXJlTmFtZSBpbiBzdGF0ZSkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYEBuZ3J4L3N0b3JlOiBUaGUgZmVhdHVyZSBuYW1lIFxcXCIke2ZlYXR1cmVOYW1lfVxcXCIgZG9lcyBgICtcbiAgICAgICAgICAnbm90IGV4aXN0IGluIHRoZSBzdGF0ZSwgdGhlcmVmb3JlIGNyZWF0ZUZlYXR1cmVTZWxlY3RvciAnICtcbiAgICAgICAgICAnY2Fubm90IGFjY2VzcyBpdC4gIEJlIHN1cmUgaXQgaXMgaW1wb3J0ZWQgaW4gYSBsb2FkZWQgbW9kdWxlICcgK1xuICAgICAgICAgIGB1c2luZyBTdG9yZU1vZHVsZS5mb3JSb290KCcke2ZlYXR1cmVOYW1lfScsIC4uLikgb3IgYCArXG4gICAgICAgICAgYFN0b3JlTW9kdWxlLmZvckZlYXR1cmUoJyR7ZmVhdHVyZU5hbWV9JywgLi4uKS4gIElmIHRoZSBkZWZhdWx0IGAgK1xuICAgICAgICAgICdzdGF0ZSBpcyBpbnRlbmRlZCB0byBiZSB1bmRlZmluZWQsIGFzIGlzIHRoZSBjYXNlIHdpdGggcm91dGVyICcgK1xuICAgICAgICAgICdzdGF0ZSwgdGhpcyBkZXZlbG9wbWVudC1vbmx5IHdhcm5pbmcgbWVzc2FnZSBjYW4gYmUgaWdub3JlZC4nXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZmVhdHVyZVN0YXRlO1xuICB9LCAoZmVhdHVyZVN0YXRlOiBhbnkpID0+IGZlYXR1cmVTdGF0ZSk7XG59XG4iXX0=