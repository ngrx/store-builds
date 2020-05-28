import { __read, __spread } from "tslib";
import { isDevMode } from '@angular/core';
import { isNgrxMockEnvironment } from './flags';
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
        overrideResult = { result: result };
    }
    function clearResult() {
        overrideResult = undefined;
    }
    // tslint:disable-next-line:no-any anything could be the result.
    function memoized() {
        if (overrideResult !== undefined) {
            return overrideResult.result;
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
    return { memoized: memoized, reset: reset, setResult: setResult, clearResult: clearResult };
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
            var _a = __read(args), head_1 = _a[0], tail_1 = _a.slice(1);
            args = __spread(head_1, tail_1);
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
            clearResult: memoizedState.clearResult,
        });
    };
}
export function createFeatureSelector(featureName) {
    return createSelector(function (state) {
        var featureState = state[featureName];
        if (!isNgrxMockEnvironment() && isDevMode() && !(featureName in state)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUF3Q2hELE1BQU0sVUFBVSxZQUFZLENBQUMsQ0FBTSxFQUFFLENBQU07SUFDekMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxTQUFTLGtCQUFrQixDQUN6QixJQUFnQixFQUNoQixhQUF5QixFQUN6QixVQUF3QjtJQUV4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMxQyxPQUFPLElBQUksQ0FBQztTQUNiO0tBQ0Y7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUMzQixZQUFtQixFQUNuQixhQUEyQjtJQUUzQixPQUFPLGNBQWMsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ25FLENBQUM7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUM1QixZQUFtQixFQUNuQixnQkFBK0IsRUFDL0IsYUFBNEI7SUFENUIsaUNBQUEsRUFBQSwrQkFBK0I7SUFDL0IsOEJBQUEsRUFBQSw0QkFBNEI7SUFFNUIsSUFBSSxhQUFhLEdBQXNCLElBQUksQ0FBQztJQUM1QyxnRUFBZ0U7SUFDaEUsSUFBSSxVQUFVLEdBQVEsSUFBSSxDQUFDO0lBQzNCLElBQUksY0FBbUIsQ0FB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TyxTQUFBO1lBQ1AsU0FBUyxFQUFFLGlCQUFpQixDQUFDLFFBQVE7WUFDckMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxTQUFTO1lBQ2xDLFdBQVcsRUFBRSxhQUFhLENBQUMsV0FBVztTQUN2QyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDO0FBUUQsTUFBTSxVQUFVLHFCQUFxQixDQUNuQyxXQUFnQjtJQUVoQixPQUFPLGNBQWMsQ0FBQyxVQUFDLEtBQVU7UUFDL0IsSUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLEVBQUU7WUFDdEUsT0FBTyxDQUFDLElBQUksQ0FDVixxQ0FBbUMsV0FBVyxhQUFVO2dCQUN0RCwwREFBMEQ7Z0JBQzFELCtEQUErRDtpQkFDL0QsZ0NBQThCLFdBQVcsZ0JBQWEsQ0FBQTtpQkFDdEQsNkJBQTJCLFdBQVcsOEJBQTJCLENBQUE7Z0JBQ2pFLGdFQUFnRTtnQkFDaEUsOERBQThELENBQ2pFLENBQUM7U0FDSDtRQUNELE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUMsRUFBRSxVQUFDLFlBQWlCLElBQUssT0FBQSxZQUFZLEVBQVosQ0FBWSxDQUFDLENBQUM7QUFDMUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlbGVjdG9yLCBTZWxlY3RvcldpdGhQcm9wcyB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNOZ3J4TW9ja0Vudmlyb25tZW50IH0gZnJvbSAnLi9mbGFncyc7XG5cbmV4cG9ydCB0eXBlIEFueUZuID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cbmV4cG9ydCB0eXBlIE1lbW9pemVkUHJvamVjdGlvbiA9IHtcbiAgbWVtb2l6ZWQ6IEFueUZuO1xuICByZXNldDogKCkgPT4gdm9pZDtcbiAgc2V0UmVzdWx0OiAocmVzdWx0PzogYW55KSA9PiB2b2lkO1xuICBjbGVhclJlc3VsdDogKCkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIE1lbW9pemVGbiA9ICh0OiBBbnlGbikgPT4gTWVtb2l6ZWRQcm9qZWN0aW9uO1xuXG5leHBvcnQgdHlwZSBDb21wYXJhdG9yRm4gPSAoYTogYW55LCBiOiBhbnkpID0+IGJvb2xlYW47XG5cbmV4cG9ydCB0eXBlIERlZmF1bHRQcm9qZWN0b3JGbjxUPiA9ICguLi5hcmdzOiBhbnlbXSkgPT4gVDtcblxuZXhwb3J0IGludGVyZmFjZSBNZW1vaXplZFNlbGVjdG9yPFxuICBTdGF0ZSxcbiAgUmVzdWx0LFxuICBQcm9qZWN0b3JGbiA9IERlZmF1bHRQcm9qZWN0b3JGbjxSZXN1bHQ+XG4+IGV4dGVuZHMgU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD4ge1xuICByZWxlYXNlKCk6IHZvaWQ7XG4gIHByb2plY3RvcjogUHJvamVjdG9yRm47XG4gIHNldFJlc3VsdDogKHJlc3VsdD86IFJlc3VsdCkgPT4gdm9pZDtcbiAgY2xlYXJSZXN1bHQ6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxcbiAgU3RhdGUsXG4gIFByb3BzLFxuICBSZXN1bHQsXG4gIFByb2plY3RvckZuID0gRGVmYXVsdFByb2plY3RvckZuPFJlc3VsdD5cbj4gZXh0ZW5kcyBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD4ge1xuICByZWxlYXNlKCk6IHZvaWQ7XG4gIHByb2plY3RvcjogUHJvamVjdG9yRm47XG4gIHNldFJlc3VsdDogKHJlc3VsdD86IFJlc3VsdCkgPT4gdm9pZDtcbiAgY2xlYXJSZXN1bHQ6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsQ2hlY2soYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIGEgPT09IGI7XG59XG5cbmZ1bmN0aW9uIGlzQXJndW1lbnRzQ2hhbmdlZChcbiAgYXJnczogSUFyZ3VtZW50cyxcbiAgbGFzdEFyZ3VtZW50czogSUFyZ3VtZW50cyxcbiAgY29tcGFyYXRvcjogQ29tcGFyYXRvckZuXG4pIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFjb21wYXJhdG9yKGFyZ3NbaV0sIGxhc3RBcmd1bWVudHNbaV0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzdWx0TWVtb2l6ZShcbiAgcHJvamVjdGlvbkZuOiBBbnlGbixcbiAgaXNSZXN1bHRFcXVhbDogQ29tcGFyYXRvckZuXG4pIHtcbiAgcmV0dXJuIGRlZmF1bHRNZW1vaXplKHByb2plY3Rpb25GbiwgaXNFcXVhbENoZWNrLCBpc1Jlc3VsdEVxdWFsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRNZW1vaXplKFxuICBwcm9qZWN0aW9uRm46IEFueUZuLFxuICBpc0FyZ3VtZW50c0VxdWFsID0gaXNFcXVhbENoZWNrLFxuICBpc1Jlc3VsdEVxdWFsID0gaXNFcXVhbENoZWNrXG4pOiBNZW1vaXplZFByb2plY3Rpb24ge1xuICBsZXQgbGFzdEFyZ3VtZW50czogbnVsbCB8IElBcmd1bWVudHMgPSBudWxsO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55IGFueXRoaW5nIGNvdWxkIGJlIHRoZSByZXN1bHQuXG4gIGxldCBsYXN0UmVzdWx0OiBhbnkgPSBudWxsO1xuICBsZXQgb3ZlcnJpZGVSZXN1bHQ6IGFueTtcblxuICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBsYXN0QXJndW1lbnRzID0gbnVsbDtcbiAgICBsYXN0UmVzdWx0ID0gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFJlc3VsdChyZXN1bHQ6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIG92ZXJyaWRlUmVzdWx0ID0geyByZXN1bHQgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyUmVzdWx0KCkge1xuICAgIG92ZXJyaWRlUmVzdWx0ID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSBhbnl0aGluZyBjb3VsZCBiZSB0aGUgcmVzdWx0LlxuICBmdW5jdGlvbiBtZW1vaXplZCgpOiBhbnkge1xuICAgIGlmIChvdmVycmlkZVJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gb3ZlcnJpZGVSZXN1bHQucmVzdWx0O1xuICAgIH1cblxuICAgIGlmICghbGFzdEFyZ3VtZW50cykge1xuICAgICAgbGFzdFJlc3VsdCA9IHByb2plY3Rpb25Gbi5hcHBseShudWxsLCBhcmd1bWVudHMgYXMgYW55KTtcbiAgICAgIGxhc3RBcmd1bWVudHMgPSBhcmd1bWVudHM7XG4gICAgICByZXR1cm4gbGFzdFJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAoIWlzQXJndW1lbnRzQ2hhbmdlZChhcmd1bWVudHMsIGxhc3RBcmd1bWVudHMsIGlzQXJndW1lbnRzRXF1YWwpKSB7XG4gICAgICByZXR1cm4gbGFzdFJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdSZXN1bHQgPSBwcm9qZWN0aW9uRm4uYXBwbHkobnVsbCwgYXJndW1lbnRzIGFzIGFueSk7XG4gICAgbGFzdEFyZ3VtZW50cyA9IGFyZ3VtZW50cztcblxuICAgIGlmIChpc1Jlc3VsdEVxdWFsKGxhc3RSZXN1bHQsIG5ld1Jlc3VsdCkpIHtcbiAgICAgIHJldHVybiBsYXN0UmVzdWx0O1xuICAgIH1cblxuICAgIGxhc3RSZXN1bHQgPSBuZXdSZXN1bHQ7XG5cbiAgICByZXR1cm4gbmV3UmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIHsgbWVtb2l6ZWQsIHJlc2V0LCBzZXRSZXN1bHQsIGNsZWFyUmVzdWx0IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBwcm9qZWN0b3I6IChzMTogUzEpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbU2VsZWN0b3I8U3RhdGUsIFMxPl0sXG4gIHByb2plY3RvcjogKHMxOiBTMSkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1NlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+XSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBwcm9wczogUHJvcHMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgczI6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1NlbGVjdG9yPFN0YXRlLCBTMT4sIFNlbGVjdG9yPFN0YXRlLCBTMj5dLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMikgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPlxuICBdLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgczM6IFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUzMsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgczI6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICBzMzogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbU2VsZWN0b3I8U3RhdGUsIFMxPiwgU2VsZWN0b3I8U3RhdGUsIFMyPiwgU2VsZWN0b3I8U3RhdGUsIFMzPl0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUzMsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHMyOiBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICBzMzogU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgczQ6IFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBTMywgUzQsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgczI6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICBzMzogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gIHM0OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBwcm9wczogUHJvcHMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzQ+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBTMywgUzQsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHMyOiBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICBzMzogU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgczQ6IFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gIHM1OiBTZWxlY3RvcjxTdGF0ZSwgUzU+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBTMywgUzQsIFM1LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gIHMyOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgczM6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICBzNDogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gIHM1OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM1PixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNT5cbiAgXSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNT5cbiAgXSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHMzOiBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICBzNDogU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgczU6IFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gIHM2OiBTZWxlY3RvcjxTdGF0ZSwgUzY+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSwgczY6IFM2KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gIHMyOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgczM6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICBzNDogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gIHM1OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM1PixcbiAgczY6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzY+LFxuICBwcm9qZWN0b3I6IChcbiAgICBzMTogUzEsXG4gICAgczI6IFMyLFxuICAgIHMzOiBTMyxcbiAgICBzNDogUzQsXG4gICAgczU6IFM1LFxuICAgIHM2OiBTNixcbiAgICBwcm9wczogUHJvcHNcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMzPixcblxuICAgIFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM1PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzY+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgczU6IFM1LCBzNjogUzYpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzU+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzY+XG4gIF0sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHByb3BzOiBQcm9wc1xuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBTNiwgUzcsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgczM6IFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gIHM0OiBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICBzNTogU2VsZWN0b3I8U3RhdGUsIFM1PixcbiAgczY6IFNlbGVjdG9yPFN0YXRlLCBTNj4sXG4gIHM3OiBTZWxlY3RvcjxTdGF0ZSwgUzc+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSwgczY6IFM2LCBzNzogUzcpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxcbiAgU3RhdGUsXG4gIFByb3BzLFxuICBTMSxcbiAgUzIsXG4gIFMzLFxuICBTNCxcbiAgUzUsXG4gIFM2LFxuICBTNyxcbiAgUmVzdWx0XG4+KFxuICBzMTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gIHMyOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgczM6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICBzNDogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gIHM1OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM1PixcbiAgczY6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzY+LFxuICBzNzogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNz4sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHM3OiBTNyxcbiAgICBwcm9wczogUHJvcHNcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBTNywgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzU+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM3PlxuICBdLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSwgczY6IFM2LCBzNzogUzcpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxcbiAgU3RhdGUsXG4gIFByb3BzLFxuICBTMSxcbiAgUzIsXG4gIFMzLFxuICBTNCxcbiAgUzUsXG4gIFM2LFxuICBTNyxcbiAgUmVzdWx0XG4+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM1PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM2PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM3PlxuICBdLFxuICBwcm9qZWN0b3I6IChcbiAgICBzMTogUzEsXG4gICAgczI6IFMyLFxuICAgIHMzOiBTMyxcbiAgICBzNDogUzQsXG4gICAgczU6IFM1LFxuICAgIHM2OiBTNixcbiAgICBzNzogUzcsXG4gICAgcHJvcHM6IFByb3BzXG4gICkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBTNywgUzgsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgczM6IFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gIHM0OiBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICBzNTogU2VsZWN0b3I8U3RhdGUsIFM1PixcbiAgczY6IFNlbGVjdG9yPFN0YXRlLCBTNj4sXG4gIHM3OiBTZWxlY3RvcjxTdGF0ZSwgUzc+LFxuICBzODogU2VsZWN0b3I8U3RhdGUsIFM4PixcbiAgcHJvamVjdG9yOiAoXG4gICAgczE6IFMxLFxuICAgIHMyOiBTMixcbiAgICBzMzogUzMsXG4gICAgczQ6IFM0LFxuICAgIHM1OiBTNSxcbiAgICBzNjogUzYsXG4gICAgczc6IFM3LFxuICAgIHM4OiBTOFxuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxcbiAgU3RhdGUsXG4gIFByb3BzLFxuICBTMSxcbiAgUzIsXG4gIFMzLFxuICBTNCxcbiAgUzUsXG4gIFM2LFxuICBTNyxcbiAgUzgsXG4gIFJlc3VsdFxuPihcbiAgczE6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICBzMjogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gIHMzOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgczQ6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+LFxuICBzNTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNT4sXG4gIHM2OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM2PixcbiAgczc6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzc+LFxuICBzODogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTOD4sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHM3OiBTNyxcbiAgICBzODogUzgsXG4gICAgcHJvcHM6IFByb3BzXG4gICkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBTNiwgUzcsIFM4LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM2PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzc+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTOD5cbiAgXSxcbiAgcHJvamVjdG9yOiAoXG4gICAgczE6IFMxLFxuICAgIHMyOiBTMixcbiAgICBzMzogUzMsXG4gICAgczQ6IFM0LFxuICAgIHM1OiBTNSxcbiAgICBzNjogUzYsXG4gICAgczc6IFM3LFxuICAgIHM4OiBTOFxuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxcbiAgU3RhdGUsXG4gIFByb3BzLFxuICBTMSxcbiAgUzIsXG4gIFMzLFxuICBTNCxcbiAgUzUsXG4gIFM2LFxuICBTNyxcbiAgUzgsXG4gIFJlc3VsdFxuPihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNj4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNz4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTOD5cbiAgXSxcbiAgcHJvamVjdG9yOiAoXG4gICAgczE6IFMxLFxuICAgIHMyOiBTMixcbiAgICBzMzogUzMsXG4gICAgczQ6IFM0LFxuICAgIHM1OiBTNSxcbiAgICBzNjogUzYsXG4gICAgczc6IFM3LFxuICAgIHM4OiBTOCxcbiAgICBwcm9wczogUHJvcHNcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3IoXG4gIC4uLmlucHV0OiBhbnlbXVxuKTogTWVtb2l6ZWRTZWxlY3RvcjxhbnksIGFueT4gfCBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBhbnk+IHtcbiAgcmV0dXJuIGNyZWF0ZVNlbGVjdG9yRmFjdG9yeShkZWZhdWx0TWVtb2l6ZSkoLi4uaW5wdXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFN0YXRlRm4oXG4gIHN0YXRlOiBhbnksXG4gIHNlbGVjdG9yczogU2VsZWN0b3I8YW55LCBhbnk+W10gfCBTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgYW55PltdLFxuICBwcm9wczogYW55LFxuICBtZW1vaXplZFByb2plY3RvcjogTWVtb2l6ZWRQcm9qZWN0aW9uXG4pOiBhbnkge1xuICBpZiAocHJvcHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGFyZ3MgPSAoPFNlbGVjdG9yPGFueSwgYW55PltdPnNlbGVjdG9ycykubWFwKGZuID0+IGZuKHN0YXRlKSk7XG4gICAgcmV0dXJuIG1lbW9pemVkUHJvamVjdG9yLm1lbW9pemVkLmFwcGx5KG51bGwsIGFyZ3MpO1xuICB9XG5cbiAgY29uc3QgYXJncyA9ICg8U2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIGFueT5bXT5zZWxlY3RvcnMpLm1hcChmbiA9PlxuICAgIGZuKHN0YXRlLCBwcm9wcylcbiAgKTtcbiAgcmV0dXJuIG1lbW9pemVkUHJvamVjdG9yLm1lbW9pemVkLmFwcGx5KG51bGwsIFsuLi5hcmdzLCBwcm9wc10pO1xufVxuXG5leHBvcnQgdHlwZSBTZWxlY3RvckZhY3RvcnlDb25maWc8VCA9IGFueSwgViA9IGFueT4gPSB7XG4gIHN0YXRlRm46IChcbiAgICBzdGF0ZTogVCxcbiAgICBwcm9wczogYW55LFxuICAgIHNlbGVjdG9yczogU2VsZWN0b3I8YW55LCBhbnk+W10sXG4gICAgbWVtb2l6ZWRQcm9qZWN0b3I6IE1lbW9pemVkUHJvamVjdGlvblxuICApID0+IFY7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JGYWN0b3J5PFQgPSBhbnksIFYgPSBhbnk+KFxuICBtZW1vaXplOiBNZW1vaXplRm5cbik6ICguLi5pbnB1dDogYW55W10pID0+IE1lbW9pemVkU2VsZWN0b3I8VCwgVj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JGYWN0b3J5PFQgPSBhbnksIFYgPSBhbnk+KFxuICBtZW1vaXplOiBNZW1vaXplRm4sXG4gIG9wdGlvbnM6IFNlbGVjdG9yRmFjdG9yeUNvbmZpZzxULCBWPlxuKTogKC4uLmlucHV0OiBhbnlbXSkgPT4gTWVtb2l6ZWRTZWxlY3RvcjxULCBWPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvckZhY3Rvcnk8VCA9IGFueSwgUHJvcHMgPSBhbnksIFYgPSBhbnk+KFxuICBtZW1vaXplOiBNZW1vaXplRm5cbik6ICguLi5pbnB1dDogYW55W10pID0+IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8VCwgUHJvcHMsIFY+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yRmFjdG9yeTxUID0gYW55LCBQcm9wcyA9IGFueSwgViA9IGFueT4oXG4gIG1lbW9pemU6IE1lbW9pemVGbixcbiAgb3B0aW9uczogU2VsZWN0b3JGYWN0b3J5Q29uZmlnPFQsIFY+XG4pOiAoLi4uaW5wdXQ6IGFueVtdKSA9PiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFQsIFByb3BzLCBWPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvckZhY3RvcnkoXG4gIG1lbW9pemU6IE1lbW9pemVGbixcbiAgb3B0aW9uczogU2VsZWN0b3JGYWN0b3J5Q29uZmlnPGFueSwgYW55PiA9IHtcbiAgICBzdGF0ZUZuOiBkZWZhdWx0U3RhdGVGbixcbiAgfVxuKSB7XG4gIHJldHVybiBmdW5jdGlvbihcbiAgICAuLi5pbnB1dDogYW55W11cbiAgKTogTWVtb2l6ZWRTZWxlY3RvcjxhbnksIGFueT4gfCBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBhbnk+IHtcbiAgICBsZXQgYXJncyA9IGlucHV0O1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFyZ3NbMF0pKSB7XG4gICAgICBjb25zdCBbaGVhZCwgLi4udGFpbF0gPSBhcmdzO1xuICAgICAgYXJncyA9IFsuLi5oZWFkLCAuLi50YWlsXTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RvcnMgPSBhcmdzLnNsaWNlKDAsIGFyZ3MubGVuZ3RoIC0gMSk7XG4gICAgY29uc3QgcHJvamVjdG9yID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IG1lbW9pemVkU2VsZWN0b3JzID0gc2VsZWN0b3JzLmZpbHRlcihcbiAgICAgIChzZWxlY3RvcjogYW55KSA9PlxuICAgICAgICBzZWxlY3Rvci5yZWxlYXNlICYmIHR5cGVvZiBzZWxlY3Rvci5yZWxlYXNlID09PSAnZnVuY3Rpb24nXG4gICAgKTtcblxuICAgIGNvbnN0IG1lbW9pemVkUHJvamVjdG9yID0gbWVtb2l6ZShmdW5jdGlvbiguLi5zZWxlY3RvcnM6IGFueVtdKSB7XG4gICAgICByZXR1cm4gcHJvamVjdG9yLmFwcGx5KG51bGwsIHNlbGVjdG9ycyk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBtZW1vaXplZFN0YXRlID0gZGVmYXVsdE1lbW9pemUoZnVuY3Rpb24oc3RhdGU6IGFueSwgcHJvcHM6IGFueSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuc3RhdGVGbi5hcHBseShudWxsLCBbXG4gICAgICAgIHN0YXRlLFxuICAgICAgICBzZWxlY3RvcnMsXG4gICAgICAgIHByb3BzLFxuICAgICAgICBtZW1vaXplZFByb2plY3RvcixcbiAgICAgIF0pO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcmVsZWFzZSgpIHtcbiAgICAgIG1lbW9pemVkU3RhdGUucmVzZXQoKTtcbiAgICAgIG1lbW9pemVkUHJvamVjdG9yLnJlc2V0KCk7XG5cbiAgICAgIG1lbW9pemVkU2VsZWN0b3JzLmZvckVhY2goc2VsZWN0b3IgPT4gc2VsZWN0b3IucmVsZWFzZSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihtZW1vaXplZFN0YXRlLm1lbW9pemVkLCB7XG4gICAgICByZWxlYXNlLFxuICAgICAgcHJvamVjdG9yOiBtZW1vaXplZFByb2plY3Rvci5tZW1vaXplZCxcbiAgICAgIHNldFJlc3VsdDogbWVtb2l6ZWRTdGF0ZS5zZXRSZXN1bHQsXG4gICAgICBjbGVhclJlc3VsdDogbWVtb2l6ZWRTdGF0ZS5jbGVhclJlc3VsdCxcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZlYXR1cmVTZWxlY3RvcjxUPihcbiAgZmVhdHVyZU5hbWU6IHN0cmluZ1xuKTogTWVtb2l6ZWRTZWxlY3RvcjxvYmplY3QsIFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZlYXR1cmVTZWxlY3RvcjxULCBWPihcbiAgZmVhdHVyZU5hbWU6IGtleW9mIFRcbik6IE1lbW9pemVkU2VsZWN0b3I8VCwgVj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmVhdHVyZVNlbGVjdG9yKFxuICBmZWF0dXJlTmFtZTogYW55XG4pOiBNZW1vaXplZFNlbGVjdG9yPGFueSwgYW55PiB7XG4gIHJldHVybiBjcmVhdGVTZWxlY3Rvcigoc3RhdGU6IGFueSkgPT4ge1xuICAgIGNvbnN0IGZlYXR1cmVTdGF0ZSA9IHN0YXRlW2ZlYXR1cmVOYW1lXTtcbiAgICBpZiAoIWlzTmdyeE1vY2tFbnZpcm9ubWVudCgpICYmIGlzRGV2TW9kZSgpICYmICEoZmVhdHVyZU5hbWUgaW4gc3RhdGUpKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBAbmdyeC9zdG9yZTogVGhlIGZlYXR1cmUgbmFtZSBcXFwiJHtmZWF0dXJlTmFtZX1cXFwiIGRvZXMgYCArXG4gICAgICAgICAgJ25vdCBleGlzdCBpbiB0aGUgc3RhdGUsIHRoZXJlZm9yZSBjcmVhdGVGZWF0dXJlU2VsZWN0b3IgJyArXG4gICAgICAgICAgJ2Nhbm5vdCBhY2Nlc3MgaXQuICBCZSBzdXJlIGl0IGlzIGltcG9ydGVkIGluIGEgbG9hZGVkIG1vZHVsZSAnICtcbiAgICAgICAgICBgdXNpbmcgU3RvcmVNb2R1bGUuZm9yUm9vdCgnJHtmZWF0dXJlTmFtZX0nLCAuLi4pIG9yIGAgK1xuICAgICAgICAgIGBTdG9yZU1vZHVsZS5mb3JGZWF0dXJlKCcke2ZlYXR1cmVOYW1lfScsIC4uLikuICBJZiB0aGUgZGVmYXVsdCBgICtcbiAgICAgICAgICAnc3RhdGUgaXMgaW50ZW5kZWQgdG8gYmUgdW5kZWZpbmVkLCBhcyBpcyB0aGUgY2FzZSB3aXRoIHJvdXRlciAnICtcbiAgICAgICAgICAnc3RhdGUsIHRoaXMgZGV2ZWxvcG1lbnQtb25seSB3YXJuaW5nIG1lc3NhZ2UgY2FuIGJlIGlnbm9yZWQuJ1xuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGZlYXR1cmVTdGF0ZTtcbiAgfSwgKGZlYXR1cmVTdGF0ZTogYW55KSA9PiBmZWF0dXJlU3RhdGUpO1xufVxuIl19