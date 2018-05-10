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
 * @template T
 * @param {?} featureName
 * @return {?}
 */
export function createFeatureSelector(featureName) {
    return createSelector((state) => state[featureName], (featureState) => featureState);
}
//# sourceMappingURL=selector.js.map