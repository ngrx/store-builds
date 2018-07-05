/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 * @template State, Result
 */
export function MemoizedSelector() { }
function MemoizedSelector_tsickle_Closure_declarations() {
    /** @type {?} */
    MemoizedSelector.prototype.release;
    /** @type {?} */
    MemoizedSelector.prototype.projector;
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
 * @param {?} t
 * @param {?=} isEqual
 * @return {?}
 */
export function defaultMemoize(t, isEqual = isEqualCheck) {
    let /** @type {?} */ lastArguments = null;
    let /** @type {?} */ lastResult = null;
    /**
     * @return {?}
     */
    function reset() {
        lastArguments = null;
        lastResult = null;
    }
    /**
     * @return {?}
     */
    function memoized() {
        if (!lastArguments) {
            lastResult = t.apply(null, arguments);
            lastArguments = arguments;
            return lastResult;
        }
        for (let /** @type {?} */ i = 0; i < arguments.length; i++) {
            if (!isEqual(arguments[i], lastArguments[i])) {
                lastResult = t.apply(null, arguments);
                lastArguments = arguments;
                return lastResult;
            }
        }
        return lastResult;
    }
    return { memoized, reset };
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
 * @param {?} memoizedProjector
 * @return {?}
 */
export function defaultStateFn(state, selectors, memoizedProjector) {
    const /** @type {?} */ args = selectors.map(fn => fn(state));
    return memoizedProjector.memoized.apply(null, args);
}
/**
 * @param {?} memoize
 * @param {?=} options
 * @return {?}
 */
export function createSelectorFactory(memoize, options = {
    stateFn: defaultStateFn,
}) {
    return function (...input) {
        let /** @type {?} */ args = input;
        if (Array.isArray(args[0])) {
            const [head, ...tail] = args;
            args = [...head, ...tail];
        }
        const /** @type {?} */ selectors = args.slice(0, args.length - 1);
        const /** @type {?} */ projector = args[args.length - 1];
        const /** @type {?} */ memoizedSelectors = selectors.filter((selector) => selector.release && typeof selector.release === 'function');
        const /** @type {?} */ memoizedProjector = memoize(function (...selectors) {
            return projector.apply(null, selectors);
        });
        const /** @type {?} */ memoizedState = defaultMemoize(function (state) {
            return options.stateFn.apply(null, [state, selectors, memoizedProjector]);
        });
        /**
         * @return {?}
         */
        function release() {
            memoizedState.reset();
            memoizedProjector.reset();
            memoizedSelectors.forEach(selector => selector.release());
        }
        return Object.assign(memoizedState.memoized, {
            release,
            projector: memoizedProjector.memoized,
        });
    };
}
/**
 * @param {?} featureName
 * @return {?}
 */
export function createFeatureSelector(featureName) {
    return createSelector((state) => state[featureName], (featureState) => featureState);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWNBLE1BQU0sdUJBQXVCLENBQU0sRUFBRSxDQUFNO0lBQ3pDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ2hCOzs7Ozs7QUFFRCxNQUFNLHlCQUNKLENBQVEsRUFDUixPQUFPLEdBQUcsWUFBWTtJQUV0QixxQkFBSSxhQUFhLEdBQXNCLElBQUksQ0FBQztJQUM1QyxxQkFBSSxVQUFVLEdBQVEsSUFBSSxDQUFDOzs7O0lBRTNCO1FBQ0UsYUFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixVQUFVLEdBQUcsSUFBSSxDQUFDO0tBQ25COzs7O0lBRUQ7UUFDRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDbkIsVUFBVSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3RDLGFBQWEsR0FBRyxTQUFTLENBQUM7WUFFMUIsTUFBTSxDQUFDLFVBQVUsQ0FBQztTQUNuQjtRQUVELEdBQUcsQ0FBQyxDQUFDLHFCQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMxQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3RDLGFBQWEsR0FBRyxTQUFTLENBQUM7Z0JBRTFCLE1BQU0sQ0FBQyxVQUFVLENBQUM7YUFDbkI7U0FD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bmV4cG9ydCB0eXBlIEFueUZuID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cbmV4cG9ydCB0eXBlIE1lbW9pemVkUHJvamVjdGlvbiA9IHsgbWVtb2l6ZWQ6IEFueUZuOyByZXNldDogKCkgPT4gdm9pZCB9O1xuXG5leHBvcnQgdHlwZSBNZW1vaXplRm4gPSAodDogQW55Rm4pID0+IE1lbW9pemVkUHJvamVjdGlvbjtcblxuZXhwb3J0IGludGVyZmFjZSBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+XG4gIGV4dGVuZHMgU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD4ge1xuICByZWxlYXNlKCk6IHZvaWQ7XG4gIHByb2plY3RvcjogQW55Rm47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsQ2hlY2soYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIGEgPT09IGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0TWVtb2l6ZShcbiAgdDogQW55Rm4sXG4gIGlzRXF1YWwgPSBpc0VxdWFsQ2hlY2tcbik6IE1lbW9pemVkUHJvamVjdGlvbiB7XG4gIGxldCBsYXN0QXJndW1lbnRzOiBudWxsIHwgSUFyZ3VtZW50cyA9IG51bGw7XG4gIGxldCBsYXN0UmVzdWx0OiBhbnkgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGxhc3RBcmd1bWVudHMgPSBudWxsO1xuICAgIGxhc3RSZXN1bHQgPSBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gbWVtb2l6ZWQoKTogYW55IHtcbiAgICBpZiAoIWxhc3RBcmd1bWVudHMpIHtcbiAgICAgIGxhc3RSZXN1bHQgPSB0LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICBsYXN0QXJndW1lbnRzID0gYXJndW1lbnRzO1xuXG4gICAgICByZXR1cm4gbGFzdFJlc3VsdDtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFpc0VxdWFsKGFyZ3VtZW50c1tpXSwgbGFzdEFyZ3VtZW50c1tpXSkpIHtcbiAgICAgICAgbGFzdFJlc3VsdCA9IHQuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgbGFzdEFyZ3VtZW50cyA9IGFyZ3VtZW50cztcblxuICAgICAgICByZXR1cm4gbGFzdFJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGFzdFJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiB7IG1lbW9pemVkLCByZXNldCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgcHJvamVjdG9yOiAoUzE6IFMxKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtTZWxlY3RvcjxTdGF0ZSwgUzE+XSxcbiAgcHJvamVjdG9yOiAoczE6IFMxKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHMyOiBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMikgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1NlbGVjdG9yPFN0YXRlLCBTMT4sIFNlbGVjdG9yPFN0YXRlLCBTMj5dLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMikgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHMzOiBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1NlbGVjdG9yPFN0YXRlLCBTMT4sIFNlbGVjdG9yPFN0YXRlLCBTMj4sIFNlbGVjdG9yPFN0YXRlLCBTMz5dLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHMzOiBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICBzNDogU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzQ+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgczM6IFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gIHM0OiBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICBzNTogU2VsZWN0b3I8U3RhdGUsIFM1PixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNT5cbiAgXSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBTNiwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHMyOiBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICBzMzogU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgczQ6IFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gIHM1OiBTZWxlY3RvcjxTdGF0ZSwgUzU+LFxuICBzNjogU2VsZWN0b3I8U3RhdGUsIFM2PixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUsIHM2OiBTNikgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM2PlxuICBdLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSwgczY6IFM2KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFM3LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHMzOiBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICBzNDogU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgczU6IFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gIHM2OiBTZWxlY3RvcjxTdGF0ZSwgUzY+LFxuICBzNzogU2VsZWN0b3I8U3RhdGUsIFM3PixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUsIHM2OiBTNiwgczc6IFM3KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFM3LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM2PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzc+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgczU6IFM1LCBzNjogUzYsIHM3OiBTNykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBTNywgUzgsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgczM6IFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gIHM0OiBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICBzNTogU2VsZWN0b3I8U3RhdGUsIFM1PixcbiAgczY6IFNlbGVjdG9yPFN0YXRlLCBTNj4sXG4gIHM3OiBTZWxlY3RvcjxTdGF0ZSwgUzc+LFxuICBzODogU2VsZWN0b3I8U3RhdGUsIFM4PixcbiAgcHJvamVjdG9yOiAoXG4gICAgczE6IFMxLFxuICAgIHMyOiBTMixcbiAgICBzMzogUzMsXG4gICAgczQ6IFM0LFxuICAgIHM1OiBTNSxcbiAgICBzNjogUzYsXG4gICAgczc6IFM3LFxuICAgIHM4OiBTOFxuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBTNiwgUzcsIFM4LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM2PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzc+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTOD5cbiAgXSxcbiAgcHJvamVjdG9yOiAoXG4gICAgczE6IFMxLFxuICAgIHMyOiBTMixcbiAgICBzMzogUzMsXG4gICAgczQ6IFM0LFxuICAgIHM1OiBTNSxcbiAgICBzNjogUzYsXG4gICAgczc6IFM3LFxuICAgIHM4OiBTOFxuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvciguLi5pbnB1dDogYW55W10pIHtcbiAgcmV0dXJuIGNyZWF0ZVNlbGVjdG9yRmFjdG9yeShkZWZhdWx0TWVtb2l6ZSkoLi4uaW5wdXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFN0YXRlRm4oXG4gIHN0YXRlOiBhbnksXG4gIHNlbGVjdG9yczogU2VsZWN0b3I8YW55LCBhbnk+W10sXG4gIG1lbW9pemVkUHJvamVjdG9yOiBNZW1vaXplZFByb2plY3Rpb25cbik6IGFueSB7XG4gIGNvbnN0IGFyZ3MgPSBzZWxlY3RvcnMubWFwKGZuID0+IGZuKHN0YXRlKSk7XG5cbiAgcmV0dXJuIG1lbW9pemVkUHJvamVjdG9yLm1lbW9pemVkLmFwcGx5KG51bGwsIGFyZ3MpO1xufVxuXG5leHBvcnQgdHlwZSBTZWxlY3RvckZhY3RvcnlDb25maWc8VCA9IGFueSwgViA9IGFueT4gPSB7XG4gIHN0YXRlRm46IChcbiAgICBzdGF0ZTogVCxcbiAgICBzZWxlY3RvcnM6IFNlbGVjdG9yPGFueSwgYW55PltdLFxuICAgIG1lbW9pemVkUHJvamVjdG9yOiBNZW1vaXplZFByb2plY3Rpb25cbiAgKSA9PiBWO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yRmFjdG9yeTxUID0gYW55LCBWID0gYW55PihcbiAgbWVtb2l6ZTogTWVtb2l6ZUZuXG4pOiAoLi4uaW5wdXQ6IGFueVtdKSA9PiBTZWxlY3RvcjxULCBWPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvckZhY3Rvcnk8VCA9IGFueSwgViA9IGFueT4oXG4gIG1lbW9pemU6IE1lbW9pemVGbixcbiAgb3B0aW9uczogU2VsZWN0b3JGYWN0b3J5Q29uZmlnPFQsIFY+XG4pOiAoLi4uaW5wdXQ6IGFueVtdKSA9PiBTZWxlY3RvcjxULCBWPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvckZhY3RvcnkoXG4gIG1lbW9pemU6IE1lbW9pemVGbixcbiAgb3B0aW9uczogU2VsZWN0b3JGYWN0b3J5Q29uZmlnPGFueSwgYW55PiA9IHtcbiAgICBzdGF0ZUZuOiBkZWZhdWx0U3RhdGVGbixcbiAgfVxuKSB7XG4gIHJldHVybiBmdW5jdGlvbiguLi5pbnB1dDogYW55W10pOiBTZWxlY3RvcjxhbnksIGFueT4ge1xuICAgIGxldCBhcmdzID0gaW5wdXQ7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnc1swXSkpIHtcbiAgICAgIGNvbnN0IFtoZWFkLCAuLi50YWlsXSA9IGFyZ3M7XG4gICAgICBhcmdzID0gWy4uLmhlYWQsIC4uLnRhaWxdO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbGVjdG9ycyA9IGFyZ3Muc2xpY2UoMCwgYXJncy5sZW5ndGggLSAxKTtcbiAgICBjb25zdCBwcm9qZWN0b3IgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgbWVtb2l6ZWRTZWxlY3RvcnMgPSBzZWxlY3RvcnMuZmlsdGVyKFxuICAgICAgKHNlbGVjdG9yOiBhbnkpID0+XG4gICAgICAgIHNlbGVjdG9yLnJlbGVhc2UgJiYgdHlwZW9mIHNlbGVjdG9yLnJlbGVhc2UgPT09ICdmdW5jdGlvbidcbiAgICApO1xuXG4gICAgY29uc3QgbWVtb2l6ZWRQcm9qZWN0b3IgPSBtZW1vaXplKGZ1bmN0aW9uKC4uLnNlbGVjdG9yczogYW55W10pIHtcbiAgICAgIHJldHVybiBwcm9qZWN0b3IuYXBwbHkobnVsbCwgc2VsZWN0b3JzKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG1lbW9pemVkU3RhdGUgPSBkZWZhdWx0TWVtb2l6ZShmdW5jdGlvbihzdGF0ZTogYW55KSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5zdGF0ZUZuLmFwcGx5KG51bGwsIFtzdGF0ZSwgc2VsZWN0b3JzLCBtZW1vaXplZFByb2plY3Rvcl0pO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcmVsZWFzZSgpIHtcbiAgICAgIG1lbW9pemVkU3RhdGUucmVzZXQoKTtcbiAgICAgIG1lbW9pemVkUHJvamVjdG9yLnJlc2V0KCk7XG5cbiAgICAgIG1lbW9pemVkU2VsZWN0b3JzLmZvckVhY2goc2VsZWN0b3IgPT4gc2VsZWN0b3IucmVsZWFzZSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihtZW1vaXplZFN0YXRlLm1lbW9pemVkLCB7XG4gICAgICByZWxlYXNlLFxuICAgICAgcHJvamVjdG9yOiBtZW1vaXplZFByb2plY3Rvci5tZW1vaXplZCxcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZlYXR1cmVTZWxlY3RvcjxUPihcbiAgZmVhdHVyZU5hbWU6IHN0cmluZ1xuKTogTWVtb2l6ZWRTZWxlY3RvcjxvYmplY3QsIFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZlYXR1cmVTZWxlY3RvcjxULCBWPihcbiAgZmVhdHVyZU5hbWU6IGtleW9mIFRcbik6IE1lbW9pemVkU2VsZWN0b3I8VCwgVj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmVhdHVyZVNlbGVjdG9yKFxuICBmZWF0dXJlTmFtZTogYW55XG4pOiBNZW1vaXplZFNlbGVjdG9yPGFueSwgYW55PiB7XG4gIHJldHVybiBjcmVhdGVTZWxlY3RvcihcbiAgICAoc3RhdGU6IGFueSkgPT4gc3RhdGVbZmVhdHVyZU5hbWVdLFxuICAgIChmZWF0dXJlU3RhdGU6IGFueSkgPT4gZmVhdHVyZVN0YXRlXG4gICk7XG59XG4iXX0=