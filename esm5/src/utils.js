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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdyeC9zdG9yZS8iLCJzb3VyY2VzIjpbInNyYy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQSxNQUFNLFVBQVUsZUFBZSxDQUM3QixRQUFhLEVBQ2IsWUFBc0I7SUFBdEIsNkJBQUEsRUFBQSxpQkFBc0I7O1FBRWhCLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7UUFDbkMsYUFBYSxHQUFRLEVBQUU7SUFFN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O1lBQ3JDLEdBQUcsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssVUFBVSxFQUFFO1lBQ3ZDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEM7S0FDRjs7UUFFSyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUVuRDs7Ozs7SUFBTyxTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTTtRQUN2QyxLQUFLLEdBQUcsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7O1lBQy9DLFVBQVUsR0FBRyxLQUFLOztZQUNoQixTQUFTLEdBQVEsRUFBRTtRQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztnQkFDMUMsR0FBRyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQzs7Z0JBQ3pCLE9BQU8sR0FBUSxhQUFhLENBQUMsR0FBRyxDQUFDOztnQkFDakMsbUJB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Z0I7UUFDcEQsT0FBTyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVsQzs7Ozs7UUFBTyxVQUFDLEtBQW9CLEVBQUUsTUFBUztZQUNyQyxLQUFLLEdBQUcsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDbkQsT0FBTyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLENBQUMsRUFBQztJQUNKLENBQUMsRUFBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBY3Rpb24sXG4gIEFjdGlvblJlZHVjZXIsXG4gIEFjdGlvblJlZHVjZXJGYWN0b3J5LFxuICBBY3Rpb25SZWR1Y2VyTWFwLFxuICBNZXRhUmVkdWNlcixcbiAgSW5pdGlhbFN0YXRlLFxufSBmcm9tICcuL21vZGVscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lUmVkdWNlcnM8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+LFxuICBpbml0aWFsU3RhdGU/OiBQYXJ0aWFsPFQ+XG4pOiBBY3Rpb25SZWR1Y2VyPFQsIFY+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVSZWR1Y2VycyhcbiAgcmVkdWNlcnM6IGFueSxcbiAgaW5pdGlhbFN0YXRlOiBhbnkgPSB7fVxuKTogQWN0aW9uUmVkdWNlcjxhbnksIEFjdGlvbj4ge1xuICBjb25zdCByZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKHJlZHVjZXJzKTtcbiAgY29uc3QgZmluYWxSZWR1Y2VyczogYW55ID0ge307XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWR1Y2VyS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGtleSA9IHJlZHVjZXJLZXlzW2ldO1xuICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZmluYWxSZWR1Y2Vyc1trZXldID0gcmVkdWNlcnNba2V5XTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBmaW5hbFJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMoZmluYWxSZWR1Y2Vycyk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbWJpbmF0aW9uKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBzdGF0ZSA9IHN0YXRlID09PSB1bmRlZmluZWQgPyBpbml0aWFsU3RhdGUgOiBzdGF0ZTtcbiAgICBsZXQgaGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIGNvbnN0IG5leHRTdGF0ZTogYW55ID0ge307XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaW5hbFJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBrZXkgPSBmaW5hbFJlZHVjZXJLZXlzW2ldO1xuICAgICAgY29uc3QgcmVkdWNlcjogYW55ID0gZmluYWxSZWR1Y2Vyc1trZXldO1xuICAgICAgY29uc3QgcHJldmlvdXNTdGF0ZUZvcktleSA9IHN0YXRlW2tleV07XG4gICAgICBjb25zdCBuZXh0U3RhdGVGb3JLZXkgPSByZWR1Y2VyKHByZXZpb3VzU3RhdGVGb3JLZXksIGFjdGlvbik7XG5cbiAgICAgIG5leHRTdGF0ZVtrZXldID0gbmV4dFN0YXRlRm9yS2V5O1xuICAgICAgaGFzQ2hhbmdlZCA9IGhhc0NoYW5nZWQgfHwgbmV4dFN0YXRlRm9yS2V5ICE9PSBwcmV2aW91c1N0YXRlRm9yS2V5O1xuICAgIH1cbiAgICByZXR1cm4gaGFzQ2hhbmdlZCA/IG5leHRTdGF0ZSA6IHN0YXRlO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb21pdDxUIGV4dGVuZHMgeyBba2V5OiBzdHJpbmddOiBhbnkgfT4oXG4gIG9iamVjdDogVCxcbiAga2V5VG9SZW1vdmU6IGtleW9mIFRcbik6IFBhcnRpYWw8VD4ge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0KVxuICAgIC5maWx0ZXIoa2V5ID0+IGtleSAhPT0ga2V5VG9SZW1vdmUpXG4gICAgLnJlZHVjZSgocmVzdWx0LCBrZXkpID0+IE9iamVjdC5hc3NpZ24ocmVzdWx0LCB7IFtrZXldOiBvYmplY3Rba2V5XSB9KSwge30pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZTxBPigpOiAoaTogQSkgPT4gQTtcbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlPEEsIEI+KGI6IChpOiBBKSA9PiBCKTogKGk6IEEpID0+IEI7XG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZTxBLCBCLCBDPihjOiAoaTogQikgPT4gQywgYjogKGk6IEEpID0+IEIpOiAoaTogQSkgPT4gQztcbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlPEEsIEIsIEMsIEQ+KFxuICBkOiAoaTogQykgPT4gRCxcbiAgYzogKGk6IEIpID0+IEMsXG4gIGI6IChpOiBBKSA9PiBCXG4pOiAoaTogQSkgPT4gRDtcbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlPEEsIEIsIEMsIEQsIEU+KFxuICBlOiAoaTogRCkgPT4gRSxcbiAgZDogKGk6IEMpID0+IEQsXG4gIGM6IChpOiBCKSA9PiBDLFxuICBiOiAoaTogQSkgPT4gQlxuKTogKGk6IEEpID0+IEU7XG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZTxBLCBCLCBDLCBELCBFLCBGPihcbiAgZjogKGk6IEUpID0+IEYsXG4gIGU6IChpOiBEKSA9PiBFLFxuICBkOiAoaTogQykgPT4gRCxcbiAgYzogKGk6IEIpID0+IEMsXG4gIGI6IChpOiBBKSA9PiBCXG4pOiAoaTogQSkgPT4gRjtcbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlPEEgPSBhbnksIEYgPSBhbnk+KC4uLmZ1bmN0aW9uczogYW55W10pOiAoaTogQSkgPT4gRjtcbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlKC4uLmZ1bmN0aW9uczogYW55W10pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZzogYW55KSB7XG4gICAgaWYgKGZ1bmN0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBhcmc7XG4gICAgfVxuXG4gICAgY29uc3QgbGFzdCA9IGZ1bmN0aW9uc1tmdW5jdGlvbnMubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgcmVzdCA9IGZ1bmN0aW9ucy5zbGljZSgwLCAtMSk7XG5cbiAgICByZXR1cm4gcmVzdC5yZWR1Y2VSaWdodCgoY29tcG9zZWQsIGZuKSA9PiBmbihjb21wb3NlZCksIGxhc3QoYXJnKSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWR1Y2VyRmFjdG9yeTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgcmVkdWNlckZhY3Rvcnk6IEFjdGlvblJlZHVjZXJGYWN0b3J5PFQsIFY+LFxuICBtZXRhUmVkdWNlcnM/OiBNZXRhUmVkdWNlcjxULCBWPltdXG4pOiBBY3Rpb25SZWR1Y2VyRmFjdG9yeTxULCBWPiB7XG4gIGlmIChBcnJheS5pc0FycmF5KG1ldGFSZWR1Y2VycykgJiYgbWV0YVJlZHVjZXJzLmxlbmd0aCA+IDApIHtcbiAgICAocmVkdWNlckZhY3RvcnkgYXMgYW55KSA9IGNvbXBvc2UuYXBwbHkobnVsbCwgW1xuICAgICAgLi4ubWV0YVJlZHVjZXJzLFxuICAgICAgcmVkdWNlckZhY3RvcnksXG4gICAgXSk7XG4gIH1cblxuICByZXR1cm4gKHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+LCBpbml0aWFsU3RhdGU/OiBJbml0aWFsU3RhdGU8VD4pID0+IHtcbiAgICBjb25zdCByZWR1Y2VyID0gcmVkdWNlckZhY3RvcnkocmVkdWNlcnMpO1xuICAgIHJldHVybiAoc3RhdGU6IFQgfCB1bmRlZmluZWQsIGFjdGlvbjogVikgPT4ge1xuICAgICAgc3RhdGUgPSBzdGF0ZSA9PT0gdW5kZWZpbmVkID8gKGluaXRpYWxTdGF0ZSBhcyBUKSA6IHN0YXRlO1xuICAgICAgcmV0dXJuIHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG4gICAgfTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZlYXR1cmVSZWR1Y2VyRmFjdG9yeTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgbWV0YVJlZHVjZXJzPzogTWV0YVJlZHVjZXI8VCwgVj5bXVxuKTogKHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8VCwgVj4sIGluaXRpYWxTdGF0ZT86IFQpID0+IEFjdGlvblJlZHVjZXI8VCwgVj4ge1xuICBjb25zdCByZWR1Y2VyRmFjdG9yeSA9XG4gICAgQXJyYXkuaXNBcnJheShtZXRhUmVkdWNlcnMpICYmIG1ldGFSZWR1Y2Vycy5sZW5ndGggPiAwXG4gICAgICA/IGNvbXBvc2U8QWN0aW9uUmVkdWNlcjxULCBWPj4oLi4ubWV0YVJlZHVjZXJzKVxuICAgICAgOiAocjogQWN0aW9uUmVkdWNlcjxULCBWPikgPT4gcjtcblxuICByZXR1cm4gKHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8VCwgVj4sIGluaXRpYWxTdGF0ZT86IFQpID0+IHtcbiAgICByZWR1Y2VyID0gcmVkdWNlckZhY3RvcnkocmVkdWNlcik7XG5cbiAgICByZXR1cm4gKHN0YXRlOiBUIHwgdW5kZWZpbmVkLCBhY3Rpb246IFYpID0+IHtcbiAgICAgIHN0YXRlID0gc3RhdGUgPT09IHVuZGVmaW5lZCA/IGluaXRpYWxTdGF0ZSA6IHN0YXRlO1xuICAgICAgcmV0dXJuIHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG4gICAgfTtcbiAgfTtcbn1cbiJdfQ==