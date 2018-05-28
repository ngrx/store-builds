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
export function defaultMemoize(t, isEqual) {
    if (isEqual === void 0) { isEqual = isEqualCheck; }
    var lastArguments = null;
    var lastResult = null;
    function reset() {
        lastArguments = null;
        lastResult = null;
    }
    function memoized() {
        if (!lastArguments) {
            lastResult = t.apply(null, arguments);
            lastArguments = arguments;
            return lastResult;
        }
        for (var i = 0; i < arguments.length; i++) {
            if (!isEqual(arguments[i], lastArguments[i])) {
                lastResult = t.apply(null, arguments);
                lastArguments = arguments;
                return lastResult;
            }
        }
        return lastResult;
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
export function defaultStateFn(state, selectors, memoizedProjector) {
    var args = selectors.map(function (fn) { return fn(state); });
    return memoizedProjector.memoized.apply(null, args);
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
        var memoizedState = defaultMemoize(function (state) {
            return options.stateFn.apply(null, [state, selectors, memoizedProjector]);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWNBLE1BQU0sdUJBQXVCLENBQU0sRUFBRSxDQUFNO0lBQ3pDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2hCO0FBRUQsTUFBTSx5QkFDSixDQUFRLEVBQ1IsT0FBc0I7SUFBdEIsd0JBQUEsRUFBQSxzQkFBc0I7SUFFdEIsSUFBSSxhQUFhLEdBQXNCLElBQUksQ0FBQztJQUM1QyxJQUFJLFVBQVUsR0FBUSxJQUFJLENBQUM7SUFFM0I7UUFDRSxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFVBQVUsR0FBRyxJQUFJLENBQUM7S0FDbkI7SUFFRDtRQUNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNuQixVQUFVLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdEMsYUFBYSxHQUFHLFNBQVMsQ0FBQztZQUUxQixNQUFNLENBQUMsVUFBVSxDQUFDO1NBQ25CO1FBRUQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDMUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsVUFBVSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUN0QyxhQUFhLEdBQUcsU0FBUyxDQUFDO2dCQUUxQixNQUFNLENBQUMsVUFBVSxDQUFDO2FBQ25CO1NBQ0Y7UUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDO0tBQ25CO0lBRUQsTUFBTSxDQUFDLEVBQUUsUUFBUSxVQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQztDQUM1QjtBQW1KRCxNQUFNO0lBQXlCLGVBQWU7U0FBZixVQUFlLEVBQWYscUJBQWUsRUFBZixJQUFlO1FBQWYsMEJBQWU7O0lBQzVDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLENBQUMsd0JBQUksS0FBSyxHQUFFO0NBQ3hEO0FBRUQsTUFBTSx5QkFDSixLQUFVLEVBQ1YsU0FBK0IsRUFDL0IsaUJBQXFDO0lBRXJDLElBQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQVQsQ0FBUyxDQUFDLENBQUM7SUFFNUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3JEO0FBaUJELE1BQU0sZ0NBQ0osT0FBa0IsRUFDbEIsT0FFQztJQUZELHdCQUFBLEVBQUE7UUFDRSxPQUFPLEVBQUUsY0FBYztLQUN4QjtJQUVELE1BQU0sQ0FBQztRQUFTLGVBQWU7YUFBZixVQUFlLEVBQWYscUJBQWUsRUFBZixJQUFlO1lBQWYsMEJBQWU7O1FBQzdCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNqQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQix1QkFBTyxZQUFJLEVBQUUsa0JBQU8sQ0FBUztZQUM3QixJQUFJLFlBQU8sSUFBSSxFQUFLLElBQUksQ0FBQyxDQUFDO1NBQzNCO1FBRUQsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqRCxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4QyxJQUFNLGlCQUFpQixHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQ3hDLFVBQUMsUUFBYTtZQUNaLE9BQUEsUUFBUSxDQUFDLE9BQU8sSUFBSSxPQUFPLFFBQVEsQ0FBQyxPQUFPLEtBQUssVUFBVTtRQUExRCxDQUEwRCxDQUM3RCxDQUFDO1FBRUYsSUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUM7WUFBUyxtQkFBbUI7aUJBQW5CLFVBQW1CLEVBQW5CLHFCQUFtQixFQUFuQixJQUFtQjtnQkFBbkIsOEJBQW1COztZQUM1RCxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDekMsQ0FBQyxDQUFDO1FBRUgsSUFBTSxhQUFhLEdBQUcsY0FBYyxDQUFDLFVBQVMsS0FBVTtZQUN0RCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7U0FDM0UsQ0FBQyxDQUFDO1FBRUg7WUFDRSxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEIsaUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFMUIsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFsQixDQUFrQixDQUFDLENBQUM7U0FDM0Q7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFO1lBQzNDLE9BQU8sU0FBQTtZQUNQLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxRQUFRO1NBQ3RDLENBQUMsQ0FBQztLQUNKLENBQUM7Q0FDSDtBQUVELE1BQU0sZ0NBQ0osV0FBbUI7SUFFbkIsTUFBTSxDQUFDLGNBQWMsQ0FDbkIsVUFBQyxLQUFVLElBQUssT0FBQSxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQWxCLENBQWtCLEVBQ2xDLFVBQUMsWUFBaUIsSUFBSyxPQUFBLFlBQVksRUFBWixDQUFZLENBQ3BDLENBQUM7Q0FDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlbGVjdG9yIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5leHBvcnQgdHlwZSBBbnlGbiA9ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xuXG5leHBvcnQgdHlwZSBNZW1vaXplZFByb2plY3Rpb24gPSB7IG1lbW9pemVkOiBBbnlGbjsgcmVzZXQ6ICgpID0+IHZvaWQgfTtcblxuZXhwb3J0IHR5cGUgTWVtb2l6ZUZuID0gKHQ6IEFueUZuKSA9PiBNZW1vaXplZFByb2plY3Rpb247XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PlxuICBleHRlbmRzIFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+IHtcbiAgcmVsZWFzZSgpOiB2b2lkO1xuICBwcm9qZWN0b3I6IEFueUZuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFcXVhbENoZWNrKGE6IGFueSwgYjogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBhID09PSBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdE1lbW9pemUoXG4gIHQ6IEFueUZuLFxuICBpc0VxdWFsID0gaXNFcXVhbENoZWNrXG4pOiBNZW1vaXplZFByb2plY3Rpb24ge1xuICBsZXQgbGFzdEFyZ3VtZW50czogbnVsbCB8IElBcmd1bWVudHMgPSBudWxsO1xuICBsZXQgbGFzdFJlc3VsdDogYW55ID0gbnVsbDtcblxuICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBsYXN0QXJndW1lbnRzID0gbnVsbDtcbiAgICBsYXN0UmVzdWx0ID0gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lbW9pemVkKCk6IGFueSB7XG4gICAgaWYgKCFsYXN0QXJndW1lbnRzKSB7XG4gICAgICBsYXN0UmVzdWx0ID0gdC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgbGFzdEFyZ3VtZW50cyA9IGFyZ3VtZW50cztcblxuICAgICAgcmV0dXJuIGxhc3RSZXN1bHQ7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghaXNFcXVhbChhcmd1bWVudHNbaV0sIGxhc3RBcmd1bWVudHNbaV0pKSB7XG4gICAgICAgIGxhc3RSZXN1bHQgPSB0LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgIGxhc3RBcmd1bWVudHMgPSBhcmd1bWVudHM7XG5cbiAgICAgICAgcmV0dXJuIGxhc3RSZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhc3RSZXN1bHQ7XG4gIH1cblxuICByZXR1cm4geyBtZW1vaXplZCwgcmVzZXQgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHByb2plY3RvcjogKFMxOiBTMSkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbU2VsZWN0b3I8U3RhdGUsIFMxPl0sXG4gIHByb2plY3RvcjogKHMxOiBTMSkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtTZWxlY3RvcjxTdGF0ZSwgUzE+LCBTZWxlY3RvcjxTdGF0ZSwgUzI+XSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHMyOiBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICBzMzogU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtTZWxlY3RvcjxTdGF0ZSwgUzE+LCBTZWxlY3RvcjxTdGF0ZSwgUzI+LCBTZWxlY3RvcjxTdGF0ZSwgUzM+XSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHMyOiBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICBzMzogU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgczQ6IFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM0PlxuICBdLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHMzOiBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICBzNDogU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgczU6IFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgczU6IFM1KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzU+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgczU6IFM1KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgczM6IFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gIHM0OiBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICBzNTogU2VsZWN0b3I8U3RhdGUsIFM1PixcbiAgczY6IFNlbGVjdG9yPFN0YXRlLCBTNj4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgczU6IFM1LCBzNjogUzYpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBTNiwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzU+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNj5cbiAgXSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUsIHM2OiBTNikgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBTNywgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHMyOiBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICBzMzogU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgczQ6IFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gIHM1OiBTZWxlY3RvcjxTdGF0ZSwgUzU+LFxuICBzNjogU2VsZWN0b3I8U3RhdGUsIFM2PixcbiAgczc6IFNlbGVjdG9yPFN0YXRlLCBTNz4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgczU6IFM1LCBzNjogUzYsIHM3OiBTNykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBTNywgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzU+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM3PlxuICBdLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSwgczY6IFM2LCBzNzogUzcpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBTNiwgUzcsIFM4LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHMzOiBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICBzNDogU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgczU6IFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gIHM2OiBTZWxlY3RvcjxTdGF0ZSwgUzY+LFxuICBzNzogU2VsZWN0b3I8U3RhdGUsIFM3PixcbiAgczg6IFNlbGVjdG9yPFN0YXRlLCBTOD4sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHM3OiBTNyxcbiAgICBzODogUzhcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFM3LCBTOCwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzU+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM3PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzg+XG4gIF0sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHM3OiBTNyxcbiAgICBzODogUzhcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3IoLi4uaW5wdXQ6IGFueVtdKSB7XG4gIHJldHVybiBjcmVhdGVTZWxlY3RvckZhY3RvcnkoZGVmYXVsdE1lbW9pemUpKC4uLmlucHV0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRTdGF0ZUZuKFxuICBzdGF0ZTogYW55LFxuICBzZWxlY3RvcnM6IFNlbGVjdG9yPGFueSwgYW55PltdLFxuICBtZW1vaXplZFByb2plY3RvcjogTWVtb2l6ZWRQcm9qZWN0aW9uXG4pOiBhbnkge1xuICBjb25zdCBhcmdzID0gc2VsZWN0b3JzLm1hcChmbiA9PiBmbihzdGF0ZSkpO1xuXG4gIHJldHVybiBtZW1vaXplZFByb2plY3Rvci5tZW1vaXplZC5hcHBseShudWxsLCBhcmdzKTtcbn1cblxuZXhwb3J0IHR5cGUgU2VsZWN0b3JGYWN0b3J5Q29uZmlnPFQgPSBhbnksIFYgPSBhbnk+ID0ge1xuICBzdGF0ZUZuOiAoXG4gICAgc3RhdGU6IFQsXG4gICAgc2VsZWN0b3JzOiBTZWxlY3RvcjxhbnksIGFueT5bXSxcbiAgICBtZW1vaXplZFByb2plY3RvcjogTWVtb2l6ZWRQcm9qZWN0aW9uXG4gICkgPT4gVjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvckZhY3Rvcnk8VCA9IGFueSwgViA9IGFueT4oXG4gIG1lbW9pemU6IE1lbW9pemVGblxuKTogKC4uLmlucHV0OiBhbnlbXSkgPT4gU2VsZWN0b3I8VCwgVj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JGYWN0b3J5PFQgPSBhbnksIFYgPSBhbnk+KFxuICBtZW1vaXplOiBNZW1vaXplRm4sXG4gIG9wdGlvbnM6IFNlbGVjdG9yRmFjdG9yeUNvbmZpZzxULCBWPlxuKTogKC4uLmlucHV0OiBhbnlbXSkgPT4gU2VsZWN0b3I8VCwgVj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JGYWN0b3J5KFxuICBtZW1vaXplOiBNZW1vaXplRm4sXG4gIG9wdGlvbnM6IFNlbGVjdG9yRmFjdG9yeUNvbmZpZzxhbnksIGFueT4gPSB7XG4gICAgc3RhdGVGbjogZGVmYXVsdFN0YXRlRm4sXG4gIH1cbikge1xuICByZXR1cm4gZnVuY3Rpb24oLi4uaW5wdXQ6IGFueVtdKTogU2VsZWN0b3I8YW55LCBhbnk+IHtcbiAgICBsZXQgYXJncyA9IGlucHV0O1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFyZ3NbMF0pKSB7XG4gICAgICBjb25zdCBbaGVhZCwgLi4udGFpbF0gPSBhcmdzO1xuICAgICAgYXJncyA9IFsuLi5oZWFkLCAuLi50YWlsXTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RvcnMgPSBhcmdzLnNsaWNlKDAsIGFyZ3MubGVuZ3RoIC0gMSk7XG4gICAgY29uc3QgcHJvamVjdG9yID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IG1lbW9pemVkU2VsZWN0b3JzID0gc2VsZWN0b3JzLmZpbHRlcihcbiAgICAgIChzZWxlY3RvcjogYW55KSA9PlxuICAgICAgICBzZWxlY3Rvci5yZWxlYXNlICYmIHR5cGVvZiBzZWxlY3Rvci5yZWxlYXNlID09PSAnZnVuY3Rpb24nXG4gICAgKTtcblxuICAgIGNvbnN0IG1lbW9pemVkUHJvamVjdG9yID0gbWVtb2l6ZShmdW5jdGlvbiguLi5zZWxlY3RvcnM6IGFueVtdKSB7XG4gICAgICByZXR1cm4gcHJvamVjdG9yLmFwcGx5KG51bGwsIHNlbGVjdG9ycyk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBtZW1vaXplZFN0YXRlID0gZGVmYXVsdE1lbW9pemUoZnVuY3Rpb24oc3RhdGU6IGFueSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuc3RhdGVGbi5hcHBseShudWxsLCBbc3RhdGUsIHNlbGVjdG9ycywgbWVtb2l6ZWRQcm9qZWN0b3JdKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHJlbGVhc2UoKSB7XG4gICAgICBtZW1vaXplZFN0YXRlLnJlc2V0KCk7XG4gICAgICBtZW1vaXplZFByb2plY3Rvci5yZXNldCgpO1xuXG4gICAgICBtZW1vaXplZFNlbGVjdG9ycy5mb3JFYWNoKHNlbGVjdG9yID0+IHNlbGVjdG9yLnJlbGVhc2UoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obWVtb2l6ZWRTdGF0ZS5tZW1vaXplZCwge1xuICAgICAgcmVsZWFzZSxcbiAgICAgIHByb2plY3RvcjogbWVtb2l6ZWRQcm9qZWN0b3IubWVtb2l6ZWQsXG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGZWF0dXJlU2VsZWN0b3I8VD4oXG4gIGZlYXR1cmVOYW1lOiBzdHJpbmdcbik6IE1lbW9pemVkU2VsZWN0b3I8b2JqZWN0LCBUPiB7XG4gIHJldHVybiBjcmVhdGVTZWxlY3RvcihcbiAgICAoc3RhdGU6IGFueSkgPT4gc3RhdGVbZmVhdHVyZU5hbWVdLFxuICAgIChmZWF0dXJlU3RhdGU6IGFueSkgPT4gZmVhdHVyZVN0YXRlXG4gICk7XG59XG4iXX0=