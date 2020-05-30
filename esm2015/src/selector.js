/**
 * @fileoverview added by tsickle
 * Generated from: src/selector.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isDevMode } from '@angular/core';
import { isNgrxMockEnvironment } from './flags';
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
    /** @type {?} */
    MemoizedSelector.prototype.clearResult;
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
    /** @type {?} */
    MemoizedSelectorWithProps.prototype.clearResult;
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
        overrideResult = { result };
    }
    /**
     * @return {?}
     */
    function clearResult() {
        overrideResult = undefined;
    }
    // tslint:disable-next-line:no-any anything could be the result.
    /**
     * @return {?}
     */
    function memoized() {
        if (overrideResult !== undefined) {
            return overrideResult.result;
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
    return { memoized, reset, setResult, clearResult };
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
        (fn) => fn(state)));
        return memoizedProjector.memoized.apply(null, args);
    }
    /** @type {?} */
    const args = ((/** @type {?} */ (selectors))).map((/**
     * @param {?} fn
     * @return {?}
     */
    (fn) => fn(state, props)));
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
            (selector) => selector.release()));
        }
        return Object.assign(memoizedState.memoized, {
            release,
            projector: memoizedProjector.memoized,
            setResult: memoizedState.setResult,
            clearResult: memoizedState.clearResult,
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
        if (!isNgrxMockEnvironment() && isDevMode() && !(featureName in state)) {
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
//# sourceMappingURL=selector.js.map