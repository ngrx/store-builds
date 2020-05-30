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
    for (var i = 0; i < args.length; i++) {
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
export function defaultMemoize(projectionFn, isArgumentsEqual, isResultEqual) {
    if (isArgumentsEqual === void 0) { isArgumentsEqual = isEqualCheck; }
    if (isResultEqual === void 0) { isResultEqual = isEqualCheck; }
    /** @type {?} */
    var lastArguments = null;
    // tslint:disable-next-line:no-any anything could be the result.
    /** @type {?} */
    var lastResult = null;
    /** @type {?} */
    var overrideResult;
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
    function setResult(result) {
        if (result === void 0) { result = undefined; }
        overrideResult = { result: result };
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
        var newResult = projectionFn.apply(null, (/** @type {?} */ (arguments)));
        lastArguments = arguments;
        if (isResultEqual(lastResult, newResult)) {
            return lastResult;
        }
        lastResult = newResult;
        return newResult;
    }
    return { memoized: memoized, reset: reset, setResult: setResult, clearResult: clearResult };
}
/**
 * @param {...?} input
 * @return {?}
 */
export function createSelector() {
    var input = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        input[_i] = arguments[_i];
    }
    return createSelectorFactory(defaultMemoize).apply(void 0, __spread(input));
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
        var args_1 = ((/** @type {?} */ (selectors))).map((/**
         * @param {?} fn
         * @return {?}
         */
        function (fn) { return fn(state); }));
        return memoizedProjector.memoized.apply(null, args_1);
    }
    /** @type {?} */
    var args = ((/** @type {?} */ (selectors))).map((/**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        return fn(state, props);
    }));
    return memoizedProjector.memoized.apply(null, __spread(args, [props]));
}
/**
 * @param {?} memoize
 * @param {?=} options
 * @return {?}
 */
export function createSelectorFactory(memoize, options) {
    if (options === void 0) { options = {
        stateFn: defaultStateFn,
    }; }
    return (/**
     * @param {...?} input
     * @return {?}
     */
    function () {
        var input = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            input[_i] = arguments[_i];
        }
        /** @type {?} */
        var args = input;
        if (Array.isArray(args[0])) {
            var _a = __read(args), head = _a[0], tail = _a.slice(1);
            args = __spread(head, tail);
        }
        /** @type {?} */
        var selectors = args.slice(0, args.length - 1);
        /** @type {?} */
        var projector = args[args.length - 1];
        /** @type {?} */
        var memoizedSelectors = selectors.filter((/**
         * @param {?} selector
         * @return {?}
         */
        function (selector) {
            return selector.release && typeof selector.release === 'function';
        }));
        /** @type {?} */
        var memoizedProjector = memoize((/**
         * @param {...?} selectors
         * @return {?}
         */
        function () {
            var selectors = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selectors[_i] = arguments[_i];
            }
            return projector.apply(null, selectors);
        }));
        /** @type {?} */
        var memoizedState = defaultMemoize((/**
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
            function (selector) { return selector.release(); }));
        }
        return Object.assign(memoizedState.memoized, {
            release: release,
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
    function (state) {
        /** @type {?} */
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
    }), (/**
     * @param {?} featureState
     * @return {?}
     */
    function (featureState) { return featureState; }));
}
//# sourceMappingURL=selector.js.map