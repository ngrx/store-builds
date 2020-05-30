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
 * Generated from: src/utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} reducers
 * @param {?=} initialState
 * @return {?}
 */
export function combineReducers(reducers, initialState) {
    if (initialState === void 0) { initialState = {}; }
    /** @type {?} */
    var reducerKeys = Object.keys(reducers);
    /** @type {?} */
    var finalReducers = {};
    for (var i = 0; i < reducerKeys.length; i++) {
        /** @type {?} */
        var key = reducerKeys[i];
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }
    /** @type {?} */
    var finalReducerKeys = Object.keys(finalReducers);
    return (/**
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    function combination(state, action) {
        state = state === undefined ? initialState : state;
        /** @type {?} */
        var hasChanged = false;
        /** @type {?} */
        var nextState = {};
        for (var i = 0; i < finalReducerKeys.length; i++) {
            /** @type {?} */
            var key = finalReducerKeys[i];
            /** @type {?} */
            var reducer = finalReducers[key];
            /** @type {?} */
            var previousStateForKey = state[key];
            /** @type {?} */
            var nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? nextState : state;
    });
}
/**
 * @template T
 * @param {?} object
 * @param {?} keyToRemove
 * @return {?}
 */
export function omit(object, keyToRemove) {
    return Object.keys(object)
        .filter((/**
     * @param {?} key
     * @return {?}
     */
    function (key) { return key !== keyToRemove; }))
        .reduce((/**
     * @param {?} result
     * @param {?} key
     * @return {?}
     */
    function (result, key) {
        var _a;
        return Object.assign(result, (_a = {}, _a[key] = object[key], _a));
    }), {});
}
/**
 * @param {...?} functions
 * @return {?}
 */
export function compose() {
    var functions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        functions[_i] = arguments[_i];
    }
    return (/**
     * @param {?} arg
     * @return {?}
     */
    function (arg) {
        if (functions.length === 0) {
            return arg;
        }
        /** @type {?} */
        var last = functions[functions.length - 1];
        /** @type {?} */
        var rest = functions.slice(0, -1);
        return rest.reduceRight((/**
         * @param {?} composed
         * @param {?} fn
         * @return {?}
         */
        function (composed, fn) { return fn(composed); }), last(arg));
    });
}
/**
 * @template T, V
 * @param {?} reducerFactory
 * @param {?=} metaReducers
 * @return {?}
 */
export function createReducerFactory(reducerFactory, metaReducers) {
    if (Array.isArray(metaReducers) && metaReducers.length > 0) {
        ((/** @type {?} */ (reducerFactory))) = compose.apply(null, __spread(metaReducers, [
            reducerFactory,
        ]));
    }
    return (/**
     * @param {?} reducers
     * @param {?=} initialState
     * @return {?}
     */
    function (reducers, initialState) {
        /** @type {?} */
        var reducer = reducerFactory(reducers);
        return (/**
         * @param {?} state
         * @param {?} action
         * @return {?}
         */
        function (state, action) {
            state = state === undefined ? ((/** @type {?} */ (initialState))) : state;
            return reducer(state, action);
        });
    });
}
/**
 * @template T, V
 * @param {?=} metaReducers
 * @return {?}
 */
export function createFeatureReducerFactory(metaReducers) {
    /** @type {?} */
    var reducerFactory = Array.isArray(metaReducers) && metaReducers.length > 0
        ? compose.apply(void 0, __spread(metaReducers)) : (/**
     * @param {?} r
     * @return {?}
     */
    function (r) { return r; });
    return (/**
     * @param {?} reducer
     * @param {?=} initialState
     * @return {?}
     */
    function (reducer, initialState) {
        reducer = reducerFactory(reducer);
        return (/**
         * @param {?} state
         * @param {?} action
         * @return {?}
         */
        function (state, action) {
            state = state === undefined ? initialState : state;
            return reducer(state, action);
        });
    });
}
//# sourceMappingURL=utils.js.map