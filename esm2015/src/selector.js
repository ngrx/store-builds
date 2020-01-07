/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/src/selector.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isDevMode } from '@angular/core';
/**
 * @record
 * @template State, Result, ProjectorFn
 */
export function MemoizedSelector() { }
if (false) {
    /** @type {?} */
    MemoizedSelector.prototype.projector;
    /** @type {?} */
    MemoizedSelector.prototype.setResult;
    /**
     * @return {?}
     */
    MemoizedSelector.prototype.release = function () { };
}
/**
 * @record
 * @template State, Props, Result, ProjectorFn
 */
export function MemoizedSelectorWithProps() { }
if (false) {
    /** @type {?} */
    MemoizedSelectorWithProps.prototype.projector;
    /** @type {?} */
    MemoizedSelectorWithProps.prototype.setResult;
    /**
     * @return {?}
     */
    MemoizedSelectorWithProps.prototype.release = function () { };
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function isEqualCheck(a, b) {
    return a === b;
}
/**
 * @param {?} args
 * @param {?} lastArguments
 * @param {?} comparator
 * @return {?}
 */
function isArgumentsChanged(args, lastArguments, comparator) {
    for (let i = 0; i < args.length; i++) {
        if (!comparator(args[i], lastArguments[i])) {
            return true;
        }
    }
    return false;
}
/**
 * @param {?} projectionFn
 * @param {?} isResultEqual
 * @return {?}
 */
export function resultMemoize(projectionFn, isResultEqual) {
    return defaultMemoize(projectionFn, isEqualCheck, isResultEqual);
}
/**
 * @param {?} projectionFn
 * @param {?=} isArgumentsEqual
 * @param {?=} isResultEqual
 * @return {?}
 */
export function defaultMemoize(projectionFn, isArgumentsEqual = isEqualCheck, isResultEqual = isEqualCheck) {
    /** @type {?} */
    let lastArguments = null;
    // tslint:disable-next-line:no-any anything could be the result.
    /** @type {?} */
    let lastResult = null;
    /** @type {?} */
    let overrideResult;
    /**
     * @return {?}
     */
    function reset() {
        lastArguments = null;
        lastResult = null;
    }
    /**
     * @param {?=} result
     * @return {?}
     */
    function setResult(result = undefined) {
        overrideResult = result;
    }
    // tslint:disable-next-line:no-any anything could be the result.
    /**
     * @return {?}
     */
    function memoized() {
        if (overrideResult !== undefined) {
            return overrideResult;
        }
        if (!lastArguments) {
            lastResult = projectionFn.apply(null, (/** @type {?} */ (arguments)));
            lastArguments = arguments;
            return lastResult;
        }
        if (!isArgumentsChanged(arguments, lastArguments, isArgumentsEqual)) {
            return lastResult;
        }
        /** @type {?} */
        const newResult = projectionFn.apply(null, (/** @type {?} */ (arguments)));
        lastArguments = arguments;
        if (isResultEqual(lastResult, newResult)) {
            return lastResult;
        }
        lastResult = newResult;
        return newResult;
    }
    return { memoized, reset, setResult };
}
/**
 * @param {...?} input
 * @return {?}
 */
export function createSelector(...input) {
    return createSelectorFactory(defaultMemoize)(...input);
}
/**
 * @param {?} state
 * @param {?} selectors
 * @param {?} props
 * @param {?} memoizedProjector
 * @return {?}
 */
export function defaultStateFn(state, selectors, props, memoizedProjector) {
    if (props === undefined) {
        /** @type {?} */
        const args = ((/** @type {?} */ (selectors))).map((/**
         * @param {?} fn
         * @return {?}
         */
        fn => fn(state)));
        return memoizedProjector.memoized.apply(null, args);
    }
    /** @type {?} */
    const args = ((/** @type {?} */ (selectors))).map((/**
     * @param {?} fn
     * @return {?}
     */
    fn => fn(state, props)));
    return memoizedProjector.memoized.apply(null, [...args, props]);
}
/**
 * @param {?} memoize
 * @param {?=} options
 * @return {?}
 */
export function createSelectorFactory(memoize, options = {
    stateFn: defaultStateFn,
}) {
    return (/**
     * @param {...?} input
     * @return {?}
     */
    function (...input) {
        /** @type {?} */
        let args = input;
        if (Array.isArray(args[0])) {
            const [head, ...tail] = args;
            args = [...head, ...tail];
        }
        /** @type {?} */
        const selectors = args.slice(0, args.length - 1);
        /** @type {?} */
        const projector = args[args.length - 1];
        /** @type {?} */
        const memoizedSelectors = selectors.filter((/**
         * @param {?} selector
         * @return {?}
         */
        (selector) => selector.release && typeof selector.release === 'function'));
        /** @type {?} */
        const memoizedProjector = memoize((/**
         * @param {...?} selectors
         * @return {?}
         */
        function (...selectors) {
            return projector.apply(null, selectors);
        }));
        /** @type {?} */
        const memoizedState = defaultMemoize((/**
         * @param {?} state
         * @param {?} props
         * @return {?}
         */
        function (state, props) {
            return options.stateFn.apply(null, [
                state,
                selectors,
                props,
                memoizedProjector,
            ]);
        }));
        /**
         * @return {?}
         */
        function release() {
            memoizedState.reset();
            memoizedProjector.reset();
            memoizedSelectors.forEach((/**
             * @param {?} selector
             * @return {?}
             */
            selector => selector.release()));
        }
        return Object.assign(memoizedState.memoized, {
            release,
            projector: memoizedProjector.memoized,
            setResult: memoizedState.setResult,
        });
    });
}
/**
 * @param {?} featureName
 * @return {?}
 */
export function createFeatureSelector(featureName) {
    return createSelector((/**
     * @param {?} state
     * @return {?}
     */
    (state) => {
        /** @type {?} */
        const featureState = state[featureName];
        if (isDevMode() && !(featureName in state)) {
            console.warn(`@ngrx/store: The feature name \"${featureName}\" does ` +
                'not exist in the state, therefore createFeatureSelector ' +
                'cannot access it.  Be sure it is imported in a loaded module ' +
                `using StoreModule.forRoot('${featureName}', ...) or ` +
                `StoreModule.forFeature('${featureName}', ...).  If the default ` +
                'state is intended to be undefined, as is the case with router ' +
                'state, this development-only warning message can be ignored.');
        }
        return featureState;
    }), (/**
     * @param {?} featureState
     * @return {?}
     */
    (featureState) => featureState));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBZ0IxQyxzQ0FRQzs7O0lBRkMscUNBQXVCOztJQUN2QixxQ0FBcUM7Ozs7SUFGckMscURBQWdCOzs7Ozs7QUFLbEIsK0NBU0M7OztJQUZDLDhDQUF1Qjs7SUFDdkIsOENBQXFDOzs7O0lBRnJDLDhEQUFnQjs7Ozs7OztBQUtsQixNQUFNLFVBQVUsWUFBWSxDQUFDLENBQU0sRUFBRSxDQUFNO0lBQ3pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqQixDQUFDOzs7Ozs7O0FBRUQsU0FBUyxrQkFBa0IsQ0FDekIsSUFBZ0IsRUFDaEIsYUFBeUIsRUFDekIsVUFBd0I7SUFFeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDMUMsT0FBTyxJQUFJLENBQUM7U0FDYjtLQUNGO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUMzQixZQUFtQixFQUNuQixhQUEyQjtJQUUzQixPQUFPLGNBQWMsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ25FLENBQUM7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUM1QixZQUFtQixFQUNuQixnQkFBZ0IsR0FBRyxZQUFZLEVBQy9CLGFBQWEsR0FBRyxZQUFZOztRQUV4QixhQUFhLEdBQXNCLElBQUk7OztRQUV2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QVcsQ0FBQztRQUN2QyxJQUFJLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLEVBQUU7WUFDMUMsT0FBTyxDQUFDLElBQUksQ0FDVixtQ0FBbUMsV0FBVyxVQUFVO2dCQUN0RCwwREFBMEQ7Z0JBQzFELCtEQUErRDtnQkFDL0QsOEJBQThCLFdBQVcsYUFBYTtnQkFDdEQsMkJBQTJCLFdBQVcsMkJBQTJCO2dCQUNqRSxnRUFBZ0U7Z0JBQ2hFLDhEQUE4RCxDQUNqRSxDQUFDO1NBQ0g7UUFDRCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDOzs7O0lBQUUsQ0FBQyxZQUFpQixFQUFFLEVBQUUsQ0FBQyxZQUFZLEVBQUMsQ0FBQztBQUMxQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VsZWN0b3IsIFNlbGVjdG9yV2l0aFByb3BzIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCB0eXBlIEFueUZuID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cbmV4cG9ydCB0eXBlIE1lbW9pemVkUHJvamVjdGlvbiA9IHtcbiAgbWVtb2l6ZWQ6IEFueUZuO1xuICByZXNldDogKCkgPT4gdm9pZDtcbiAgc2V0UmVzdWx0OiAocmVzdWx0PzogYW55KSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IHR5cGUgTWVtb2l6ZUZuID0gKHQ6IEFueUZuKSA9PiBNZW1vaXplZFByb2plY3Rpb247XG5cbmV4cG9ydCB0eXBlIENvbXBhcmF0b3JGbiA9IChhOiBhbnksIGI6IGFueSkgPT4gYm9vbGVhbjtcblxuZXhwb3J0IHR5cGUgRGVmYXVsdFByb2plY3RvckZuPFQ+ID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBUO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1lbW9pemVkU2VsZWN0b3I8XG4gIFN0YXRlLFxuICBSZXN1bHQsXG4gIFByb2plY3RvckZuID0gRGVmYXVsdFByb2plY3RvckZuPFJlc3VsdD5cbj4gZXh0ZW5kcyBTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PiB7XG4gIHJlbGVhc2UoKTogdm9pZDtcbiAgcHJvamVjdG9yOiBQcm9qZWN0b3JGbjtcbiAgc2V0UmVzdWx0OiAocmVzdWx0PzogUmVzdWx0KSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8XG4gIFN0YXRlLFxuICBQcm9wcyxcbiAgUmVzdWx0LFxuICBQcm9qZWN0b3JGbiA9IERlZmF1bHRQcm9qZWN0b3JGbjxSZXN1bHQ+XG4+IGV4dGVuZHMgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+IHtcbiAgcmVsZWFzZSgpOiB2b2lkO1xuICBwcm9qZWN0b3I6IFByb2plY3RvckZuO1xuICBzZXRSZXN1bHQ6IChyZXN1bHQ/OiBSZXN1bHQpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsQ2hlY2soYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIGEgPT09IGI7XG59XG5cbmZ1bmN0aW9uIGlzQXJndW1lbnRzQ2hhbmdlZChcbiAgYXJnczogSUFyZ3VtZW50cyxcbiAgbGFzdEFyZ3VtZW50czogSUFyZ3VtZW50cyxcbiAgY29tcGFyYXRvcjogQ29tcGFyYXRvckZuXG4pIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFjb21wYXJhdG9yKGFyZ3NbaV0sIGxhc3RBcmd1bWVudHNbaV0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzdWx0TWVtb2l6ZShcbiAgcHJvamVjdGlvbkZuOiBBbnlGbixcbiAgaXNSZXN1bHRFcXVhbDogQ29tcGFyYXRvckZuXG4pIHtcbiAgcmV0dXJuIGRlZmF1bHRNZW1vaXplKHByb2plY3Rpb25GbiwgaXNFcXVhbENoZWNrLCBpc1Jlc3VsdEVxdWFsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRNZW1vaXplKFxuICBwcm9qZWN0aW9uRm46IEFueUZuLFxuICBpc0FyZ3VtZW50c0VxdWFsID0gaXNFcXVhbENoZWNrLFxuICBpc1Jlc3VsdEVxdWFsID0gaXNFcXVhbENoZWNrXG4pOiBNZW1vaXplZFByb2plY3Rpb24ge1xuICBsZXQgbGFzdEFyZ3VtZW50czogbnVsbCB8IElBcmd1bWVudHMgPSBudWxsO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55IGFueXRoaW5nIGNvdWxkIGJlIHRoZSByZXN1bHQuXG4gIGxldCBsYXN0UmVzdWx0OiBhbnkgPSBudWxsO1xuICBsZXQgb3ZlcnJpZGVSZXN1bHQ6IGFueTtcblxuICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBsYXN0QXJndW1lbnRzID0gbnVsbDtcbiAgICBsYXN0UmVzdWx0ID0gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFJlc3VsdChyZXN1bHQ6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIG92ZXJyaWRlUmVzdWx0ID0gcmVzdWx0O1xuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSBhbnl0aGluZyBjb3VsZCBiZSB0aGUgcmVzdWx0LlxuICBmdW5jdGlvbiBtZW1vaXplZCgpOiBhbnkge1xuICAgIGlmIChvdmVycmlkZVJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gb3ZlcnJpZGVSZXN1bHQ7XG4gICAgfVxuXG4gICAgaWYgKCFsYXN0QXJndW1lbnRzKSB7XG4gICAgICBsYXN0UmVzdWx0ID0gcHJvamVjdGlvbkZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyBhcyBhbnkpO1xuICAgICAgbGFzdEFyZ3VtZW50cyA9IGFyZ3VtZW50cztcbiAgICAgIHJldHVybiBsYXN0UmVzdWx0O1xuICAgIH1cblxuICAgIGlmICghaXNBcmd1bWVudHNDaGFuZ2VkKGFyZ3VtZW50cywgbGFzdEFyZ3VtZW50cywgaXNBcmd1bWVudHNFcXVhbCkpIHtcbiAgICAgIHJldHVybiBsYXN0UmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IG5ld1Jlc3VsdCA9IHByb2plY3Rpb25Gbi5hcHBseShudWxsLCBhcmd1bWVudHMgYXMgYW55KTtcbiAgICBsYXN0QXJndW1lbnRzID0gYXJndW1lbnRzO1xuXG4gICAgaWYgKGlzUmVzdWx0RXF1YWwobGFzdFJlc3VsdCwgbmV3UmVzdWx0KSkge1xuICAgICAgcmV0dXJuIGxhc3RSZXN1bHQ7XG4gICAgfVxuXG4gICAgbGFzdFJlc3VsdCA9IG5ld1Jlc3VsdDtcblxuICAgIHJldHVybiBuZXdSZXN1bHQ7XG4gIH1cblxuICByZXR1cm4geyBtZW1vaXplZCwgcmVzZXQsIHNldFJlc3VsdCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgcHJvamVjdG9yOiAoczE6IFMxKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1NlbGVjdG9yPFN0YXRlLCBTMT5dLFxuICBwcm9qZWN0b3I6IChzMTogUzEpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPl0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHMyOiBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMikgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gIHMyOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtTZWxlY3RvcjxTdGF0ZSwgUzE+LCBTZWxlY3RvcjxTdGF0ZSwgUzI+XSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj5cbiAgXSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHMzOiBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFMzLCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gIHMyOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgczM6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBwcm9wczogUHJvcHMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1NlbGVjdG9yPFN0YXRlLCBTMT4sIFNlbGVjdG9yPFN0YXRlLCBTMj4sIFNlbGVjdG9yPFN0YXRlLCBTMz5dLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFMzLCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPlxuICBdLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBwcm9wczogUHJvcHMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgczM6IFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gIHM0OiBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUzMsIFM0LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gIHMyOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgczM6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICBzNDogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM0PlxuICBdLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUzMsIFM0LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PlxuICBdLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgczM6IFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gIHM0OiBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICBzNTogU2VsZWN0b3I8U3RhdGUsIFM1PixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICBzMjogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gIHMzOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgczQ6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+LFxuICBzNTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNT4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgczU6IFM1LCBwcm9wczogUHJvcHMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzU+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgczU6IFM1KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzU+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgczU6IFM1LCBwcm9wczogUHJvcHMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBTNiwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHMyOiBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICBzMzogU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgczQ6IFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gIHM1OiBTZWxlY3RvcjxTdGF0ZSwgUzU+LFxuICBzNjogU2VsZWN0b3I8U3RhdGUsIFM2PixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUsIHM2OiBTNikgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBTMywgUzQsIFM1LCBTNiwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICBzMjogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gIHMzOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgczQ6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+LFxuICBzNTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNT4sXG4gIHM2OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM2PixcbiAgcHJvamVjdG9yOiAoXG4gICAgczE6IFMxLFxuICAgIHMyOiBTMixcbiAgICBzMzogUzMsXG4gICAgczQ6IFM0LFxuICAgIHM1OiBTNSxcbiAgICBzNjogUzYsXG4gICAgcHJvcHM6IFByb3BzXG4gICkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBTNiwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMz4sXG5cbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM2PlxuICBdLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSwgczY6IFM2KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM1PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM2PlxuICBdLFxuICBwcm9qZWN0b3I6IChcbiAgICBzMTogUzEsXG4gICAgczI6IFMyLFxuICAgIHMzOiBTMyxcbiAgICBzNDogUzQsXG4gICAgczU6IFM1LFxuICAgIHM2OiBTNixcbiAgICBwcm9wczogUHJvcHNcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFM3LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHMzOiBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICBzNDogU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgczU6IFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gIHM2OiBTZWxlY3RvcjxTdGF0ZSwgUzY+LFxuICBzNzogU2VsZWN0b3I8U3RhdGUsIFM3PixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUsIHM2OiBTNiwgczc6IFM3KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8XG4gIFN0YXRlLFxuICBQcm9wcyxcbiAgUzEsXG4gIFMyLFxuICBTMyxcbiAgUzQsXG4gIFM1LFxuICBTNixcbiAgUzcsXG4gIFJlc3VsdFxuPihcbiAgczE6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICBzMjogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gIHMzOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgczQ6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+LFxuICBzNTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNT4sXG4gIHM2OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM2PixcbiAgczc6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzc+LFxuICBwcm9qZWN0b3I6IChcbiAgICBzMTogUzEsXG4gICAgczI6IFMyLFxuICAgIHMzOiBTMyxcbiAgICBzNDogUzQsXG4gICAgczU6IFM1LFxuICAgIHM2OiBTNixcbiAgICBzNzogUzcsXG4gICAgcHJvcHM6IFByb3BzXG4gICkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBTNiwgUzcsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM1PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzY+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNz5cbiAgXSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUsIHM2OiBTNiwgczc6IFM3KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8XG4gIFN0YXRlLFxuICBQcm9wcyxcbiAgUzEsXG4gIFMyLFxuICBTMyxcbiAgUzQsXG4gIFM1LFxuICBTNixcbiAgUzcsXG4gIFJlc3VsdFxuPihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNj4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNz5cbiAgXSxcbiAgcHJvamVjdG9yOiAoXG4gICAgczE6IFMxLFxuICAgIHMyOiBTMixcbiAgICBzMzogUzMsXG4gICAgczQ6IFM0LFxuICAgIHM1OiBTNSxcbiAgICBzNjogUzYsXG4gICAgczc6IFM3LFxuICAgIHByb3BzOiBQcm9wc1xuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBTNiwgUzcsIFM4LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHMzOiBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICBzNDogU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgczU6IFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gIHM2OiBTZWxlY3RvcjxTdGF0ZSwgUzY+LFxuICBzNzogU2VsZWN0b3I8U3RhdGUsIFM3PixcbiAgczg6IFNlbGVjdG9yPFN0YXRlLCBTOD4sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHM3OiBTNyxcbiAgICBzODogUzhcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8XG4gIFN0YXRlLFxuICBQcm9wcyxcbiAgUzEsXG4gIFMyLFxuICBTMyxcbiAgUzQsXG4gIFM1LFxuICBTNixcbiAgUzcsXG4gIFM4LFxuICBSZXN1bHRcbj4oXG4gIHMxOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgczI6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICBzMzogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gIHM0OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PixcbiAgczU6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzU+LFxuICBzNjogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNj4sXG4gIHM3OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM3PixcbiAgczg6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzg+LFxuICBwcm9qZWN0b3I6IChcbiAgICBzMTogUzEsXG4gICAgczI6IFMyLFxuICAgIHMzOiBTMyxcbiAgICBzNDogUzQsXG4gICAgczU6IFM1LFxuICAgIHM2OiBTNixcbiAgICBzNzogUzcsXG4gICAgczg6IFM4LFxuICAgIHByb3BzOiBQcm9wc1xuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFM3LCBTOCwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzU+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM3PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzg+XG4gIF0sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHM3OiBTNyxcbiAgICBzODogUzhcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8XG4gIFN0YXRlLFxuICBQcm9wcyxcbiAgUzEsXG4gIFMyLFxuICBTMyxcbiAgUzQsXG4gIFM1LFxuICBTNixcbiAgUzcsXG4gIFM4LFxuICBSZXN1bHRcbj4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzU+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzY+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzc+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzg+XG4gIF0sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHM3OiBTNyxcbiAgICBzODogUzgsXG4gICAgcHJvcHM6IFByb3BzXG4gICkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yKFxuICAuLi5pbnB1dDogYW55W11cbik6IE1lbW9pemVkU2VsZWN0b3I8YW55LCBhbnk+IHwgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgYW55PiB7XG4gIHJldHVybiBjcmVhdGVTZWxlY3RvckZhY3RvcnkoZGVmYXVsdE1lbW9pemUpKC4uLmlucHV0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRTdGF0ZUZuKFxuICBzdGF0ZTogYW55LFxuICBzZWxlY3RvcnM6IFNlbGVjdG9yPGFueSwgYW55PltdIHwgU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIGFueT5bXSxcbiAgcHJvcHM6IGFueSxcbiAgbWVtb2l6ZWRQcm9qZWN0b3I6IE1lbW9pemVkUHJvamVjdGlvblxuKTogYW55IHtcbiAgaWYgKHByb3BzID09PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBhcmdzID0gKDxTZWxlY3RvcjxhbnksIGFueT5bXT5zZWxlY3RvcnMpLm1hcChmbiA9PiBmbihzdGF0ZSkpO1xuICAgIHJldHVybiBtZW1vaXplZFByb2plY3Rvci5tZW1vaXplZC5hcHBseShudWxsLCBhcmdzKTtcbiAgfVxuXG4gIGNvbnN0IGFyZ3MgPSAoPFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBhbnk+W10+c2VsZWN0b3JzKS5tYXAoZm4gPT5cbiAgICBmbihzdGF0ZSwgcHJvcHMpXG4gICk7XG4gIHJldHVybiBtZW1vaXplZFByb2plY3Rvci5tZW1vaXplZC5hcHBseShudWxsLCBbLi4uYXJncywgcHJvcHNdKTtcbn1cblxuZXhwb3J0IHR5cGUgU2VsZWN0b3JGYWN0b3J5Q29uZmlnPFQgPSBhbnksIFYgPSBhbnk+ID0ge1xuICBzdGF0ZUZuOiAoXG4gICAgc3RhdGU6IFQsXG4gICAgcHJvcHM6IGFueSxcbiAgICBzZWxlY3RvcnM6IFNlbGVjdG9yPGFueSwgYW55PltdLFxuICAgIG1lbW9pemVkUHJvamVjdG9yOiBNZW1vaXplZFByb2plY3Rpb25cbiAgKSA9PiBWO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yRmFjdG9yeTxUID0gYW55LCBWID0gYW55PihcbiAgbWVtb2l6ZTogTWVtb2l6ZUZuXG4pOiAoLi4uaW5wdXQ6IGFueVtdKSA9PiBNZW1vaXplZFNlbGVjdG9yPFQsIFY+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yRmFjdG9yeTxUID0gYW55LCBWID0gYW55PihcbiAgbWVtb2l6ZTogTWVtb2l6ZUZuLFxuICBvcHRpb25zOiBTZWxlY3RvckZhY3RvcnlDb25maWc8VCwgVj5cbik6ICguLi5pbnB1dDogYW55W10pID0+IE1lbW9pemVkU2VsZWN0b3I8VCwgVj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JGYWN0b3J5PFQgPSBhbnksIFByb3BzID0gYW55LCBWID0gYW55PihcbiAgbWVtb2l6ZTogTWVtb2l6ZUZuXG4pOiAoLi4uaW5wdXQ6IGFueVtdKSA9PiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFQsIFByb3BzLCBWPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvckZhY3Rvcnk8VCA9IGFueSwgUHJvcHMgPSBhbnksIFYgPSBhbnk+KFxuICBtZW1vaXplOiBNZW1vaXplRm4sXG4gIG9wdGlvbnM6IFNlbGVjdG9yRmFjdG9yeUNvbmZpZzxULCBWPlxuKTogKC4uLmlucHV0OiBhbnlbXSkgPT4gTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxULCBQcm9wcywgVj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JGYWN0b3J5KFxuICBtZW1vaXplOiBNZW1vaXplRm4sXG4gIG9wdGlvbnM6IFNlbGVjdG9yRmFjdG9yeUNvbmZpZzxhbnksIGFueT4gPSB7XG4gICAgc3RhdGVGbjogZGVmYXVsdFN0YXRlRm4sXG4gIH1cbikge1xuICByZXR1cm4gZnVuY3Rpb24oXG4gICAgLi4uaW5wdXQ6IGFueVtdXG4gICk6IE1lbW9pemVkU2VsZWN0b3I8YW55LCBhbnk+IHwgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgYW55PiB7XG4gICAgbGV0IGFyZ3MgPSBpbnB1dDtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcmdzWzBdKSkge1xuICAgICAgY29uc3QgW2hlYWQsIC4uLnRhaWxdID0gYXJncztcbiAgICAgIGFyZ3MgPSBbLi4uaGVhZCwgLi4udGFpbF07XG4gICAgfVxuXG4gICAgY29uc3Qgc2VsZWN0b3JzID0gYXJncy5zbGljZSgwLCBhcmdzLmxlbmd0aCAtIDEpO1xuICAgIGNvbnN0IHByb2plY3RvciA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcbiAgICBjb25zdCBtZW1vaXplZFNlbGVjdG9ycyA9IHNlbGVjdG9ycy5maWx0ZXIoXG4gICAgICAoc2VsZWN0b3I6IGFueSkgPT5cbiAgICAgICAgc2VsZWN0b3IucmVsZWFzZSAmJiB0eXBlb2Ygc2VsZWN0b3IucmVsZWFzZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICk7XG5cbiAgICBjb25zdCBtZW1vaXplZFByb2plY3RvciA9IG1lbW9pemUoZnVuY3Rpb24oLi4uc2VsZWN0b3JzOiBhbnlbXSkge1xuICAgICAgcmV0dXJuIHByb2plY3Rvci5hcHBseShudWxsLCBzZWxlY3RvcnMpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbWVtb2l6ZWRTdGF0ZSA9IGRlZmF1bHRNZW1vaXplKGZ1bmN0aW9uKHN0YXRlOiBhbnksIHByb3BzOiBhbnkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnN0YXRlRm4uYXBwbHkobnVsbCwgW1xuICAgICAgICBzdGF0ZSxcbiAgICAgICAgc2VsZWN0b3JzLFxuICAgICAgICBwcm9wcyxcbiAgICAgICAgbWVtb2l6ZWRQcm9qZWN0b3IsXG4gICAgICBdKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHJlbGVhc2UoKSB7XG4gICAgICBtZW1vaXplZFN0YXRlLnJlc2V0KCk7XG4gICAgICBtZW1vaXplZFByb2plY3Rvci5yZXNldCgpO1xuXG4gICAgICBtZW1vaXplZFNlbGVjdG9ycy5mb3JFYWNoKHNlbGVjdG9yID0+IHNlbGVjdG9yLnJlbGVhc2UoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obWVtb2l6ZWRTdGF0ZS5tZW1vaXplZCwge1xuICAgICAgcmVsZWFzZSxcbiAgICAgIHByb2plY3RvcjogbWVtb2l6ZWRQcm9qZWN0b3IubWVtb2l6ZWQsXG4gICAgICBzZXRSZXN1bHQ6IG1lbW9pemVkU3RhdGUuc2V0UmVzdWx0LFxuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmVhdHVyZVNlbGVjdG9yPFQ+KFxuICBmZWF0dXJlTmFtZTogc3RyaW5nXG4pOiBNZW1vaXplZFNlbGVjdG9yPG9iamVjdCwgVD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmVhdHVyZVNlbGVjdG9yPFQsIFY+KFxuICBmZWF0dXJlTmFtZToga2V5b2YgVFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxULCBWPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGZWF0dXJlU2VsZWN0b3IoXG4gIGZlYXR1cmVOYW1lOiBhbnlcbik6IE1lbW9pemVkU2VsZWN0b3I8YW55LCBhbnk+IHtcbiAgcmV0dXJuIGNyZWF0ZVNlbGVjdG9yKChzdGF0ZTogYW55KSA9PiB7XG4gICAgY29uc3QgZmVhdHVyZVN0YXRlID0gc3RhdGVbZmVhdHVyZU5hbWVdO1xuICAgIGlmIChpc0Rldk1vZGUoKSAmJiAhKGZlYXR1cmVOYW1lIGluIHN0YXRlKSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgQG5ncngvc3RvcmU6IFRoZSBmZWF0dXJlIG5hbWUgXFxcIiR7ZmVhdHVyZU5hbWV9XFxcIiBkb2VzIGAgK1xuICAgICAgICAgICdub3QgZXhpc3QgaW4gdGhlIHN0YXRlLCB0aGVyZWZvcmUgY3JlYXRlRmVhdHVyZVNlbGVjdG9yICcgK1xuICAgICAgICAgICdjYW5ub3QgYWNjZXNzIGl0LiAgQmUgc3VyZSBpdCBpcyBpbXBvcnRlZCBpbiBhIGxvYWRlZCBtb2R1bGUgJyArXG4gICAgICAgICAgYHVzaW5nIFN0b3JlTW9kdWxlLmZvclJvb3QoJyR7ZmVhdHVyZU5hbWV9JywgLi4uKSBvciBgICtcbiAgICAgICAgICBgU3RvcmVNb2R1bGUuZm9yRmVhdHVyZSgnJHtmZWF0dXJlTmFtZX0nLCAuLi4pLiAgSWYgdGhlIGRlZmF1bHQgYCArXG4gICAgICAgICAgJ3N0YXRlIGlzIGludGVuZGVkIHRvIGJlIHVuZGVmaW5lZCwgYXMgaXMgdGhlIGNhc2Ugd2l0aCByb3V0ZXIgJyArXG4gICAgICAgICAgJ3N0YXRlLCB0aGlzIGRldmVsb3BtZW50LW9ubHkgd2FybmluZyBtZXNzYWdlIGNhbiBiZSBpZ25vcmVkLidcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBmZWF0dXJlU3RhdGU7XG4gIH0sIChmZWF0dXJlU3RhdGU6IGFueSkgPT4gZmVhdHVyZVN0YXRlKTtcbn1cbiJdfQ==