/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/src/utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} reducers
 * @param {?=} initialState
 * @return {?}
 */
export function combineReducers(reducers, initialState = {}) {
    /** @type {?} */
    const reducerKeys = Object.keys(reducers);
    /** @type {?} */
    const finalReducers = {};
    for (let i = 0; i < reducerKeys.length; i++) {
        /** @type {?} */
        const key = reducerKeys[i];
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }
    /** @type {?} */
    const finalReducerKeys = Object.keys(finalReducers);
    return (/**
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    function combination(state, action) {
        state = state === undefined ? initialState : state;
        /** @type {?} */
        let hasChanged = false;
        /** @type {?} */
        const nextState = {};
        for (let i = 0; i < finalReducerKeys.length; i++) {
            /** @type {?} */
            const key = finalReducerKeys[i];
            /** @type {?} */
            const reducer = finalReducers[key];
            /** @type {?} */
            const previousStateForKey = state[key];
            /** @type {?} */
            const nextStateForKey = reducer(previousStateForKey, action);
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
    key => key !== keyToRemove))
        .reduce((/**
     * @param {?} result
     * @param {?} key
     * @return {?}
     */
    (result, key) => Object.assign(result, { [key]: object[key] })), {});
}
/**
 * @param {...?} functions
 * @return {?}
 */
export function compose(...functions) {
    return (/**
     * @param {?} arg
     * @return {?}
     */
    function (arg) {
        if (functions.length === 0) {
            return arg;
        }
        /** @type {?} */
        const last = functions[functions.length - 1];
        /** @type {?} */
        const rest = functions.slice(0, -1);
        return rest.reduceRight((/**
         * @param {?} composed
         * @param {?} fn
         * @return {?}
         */
        (composed, fn) => fn(composed)), last(arg));
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
        ((/** @type {?} */ (reducerFactory))) = compose.apply(null, [
            ...metaReducers,
            reducerFactory,
        ]);
    }
    return (/**
     * @param {?} reducers
     * @param {?=} initialState
     * @return {?}
     */
    (reducers, initialState) => {
        /** @type {?} */
        const reducer = reducerFactory(reducers);
        return (/**
         * @param {?} state
         * @param {?} action
         * @return {?}
         */
        (state, action) => {
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
    const reducerFactory = Array.isArray(metaReducers) && metaReducers.length > 0
        ? compose(...metaReducers)
        : (/**
         * @param {?} r
         * @return {?}
         */
        (r) => r);
    return (/**
     * @param {?} reducer
     * @param {?=} initialState
     * @return {?}
     */
    (reducer, initialState) => {
        reducer = reducerFactory(reducer);
        return (/**
         * @param {?} state
         * @param {?} action
         * @return {?}
         */
        (state, action) => {
            state = state === undefined ? initialState : state;
            return reducer(state, action);
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBYUEsTUFBTSxVQUFVLGVBQWUsQ0FDN0IsUUFBYSxFQUNiLGVBQW9CLEVBQUU7O1VBRWhCLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7VUFDbkMsYUFBYSxHQUFRLEVBQUU7SUFFN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2NBQ3JDLEdBQUcsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssVUFBVSxFQUFFO1lBQ3ZDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEM7S0FDRjs7VUFFSyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUVuRDs7Ozs7SUFBTyxTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTTtRQUN2QyxLQUFLLEdBQUcsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7O1lBQy9DLFVBQVUsR0FBRyxLQUFLOztjQUNoQixTQUFTLEdBQVEsRUFBRTtRQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztrQkFDMUMsR0FBRyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQzs7a0JBQ3pCLE9BQU8sR0FBUSxhQUFhLENBQUMsR0FBRyxDQUFDOztrQkFDakMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDLEdBQUcs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TyxDQUFDLENBQUM7UUFFbEM7Ozs7O1FBQU8sQ0FBQyxLQUFvQixFQUFFLE1BQVMsRUFBRSxFQUFFO1lBQ3pDLEtBQUssR0FBRyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNuRCxPQUFPLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxFQUFDO0lBQ0osQ0FBQyxFQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFjdGlvbixcbiAgQWN0aW9uUmVkdWNlcixcbiAgQWN0aW9uUmVkdWNlckZhY3RvcnksXG4gIEFjdGlvblJlZHVjZXJNYXAsXG4gIE1ldGFSZWR1Y2VyLFxuICBJbml0aWFsU3RhdGUsXG59IGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVSZWR1Y2VyczxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgcmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8VCwgVj4sXG4gIGluaXRpYWxTdGF0ZT86IFBhcnRpYWw8VD5cbik6IEFjdGlvblJlZHVjZXI8VCwgVj47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZVJlZHVjZXJzKFxuICByZWR1Y2VyczogYW55LFxuICBpbml0aWFsU3RhdGU6IGFueSA9IHt9XG4pOiBBY3Rpb25SZWR1Y2VyPGFueSwgQWN0aW9uPiB7XG4gIGNvbnN0IHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICBjb25zdCBmaW5hbFJlZHVjZXJzOiBhbnkgPSB7fTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qga2V5ID0gcmVkdWNlcktleXNbaV07XG4gICAgaWYgKHR5cGVvZiByZWR1Y2Vyc1trZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBmaW5hbFJlZHVjZXJzW2tleV0gPSByZWR1Y2Vyc1trZXldO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGZpbmFsUmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhmaW5hbFJlZHVjZXJzKTtcblxuICByZXR1cm4gZnVuY3Rpb24gY29tYmluYXRpb24oc3RhdGUsIGFjdGlvbikge1xuICAgIHN0YXRlID0gc3RhdGUgPT09IHVuZGVmaW5lZCA/IGluaXRpYWxTdGF0ZSA6IHN0YXRlO1xuICAgIGxldCBoYXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgY29uc3QgbmV4dFN0YXRlOiBhbnkgPSB7fTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbmFsUmVkdWNlcktleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGtleSA9IGZpbmFsUmVkdWNlcktleXNbaV07XG4gICAgICBjb25zdCByZWR1Y2VyOiBhbnkgPSBmaW5hbFJlZHVjZXJzW2tleV07XG4gICAgICBjb25zdCBwcmV2aW91c1N0YXRlRm9yS2V5ID0gc3RhdGVba2V5XTtcbiAgICAgIGNvbnN0IG5leHRTdGF0ZUZvcktleSA9IHJlZHVjZXIocHJldmlvdXNTdGF0ZUZvcktleSwgYWN0aW9uKTtcblxuICAgICAgbmV4dFN0YXRlW2tleV0gPSBuZXh0U3RhdGVGb3JLZXk7XG4gICAgICBoYXNDaGFuZ2VkID0gaGFzQ2hhbmdlZCB8fCBuZXh0U3RhdGVGb3JLZXkgIT09IHByZXZpb3VzU3RhdGVGb3JLZXk7XG4gICAgfVxuICAgIHJldHVybiBoYXNDaGFuZ2VkID8gbmV4dFN0YXRlIDogc3RhdGU7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbWl0PFQgZXh0ZW5kcyB7IFtrZXk6IHN0cmluZ106IGFueSB9PihcbiAgb2JqZWN0OiBULFxuICBrZXlUb1JlbW92ZToga2V5b2YgVFxuKTogUGFydGlhbDxUPiB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3QpXG4gICAgLmZpbHRlcihrZXkgPT4ga2V5ICE9PSBrZXlUb1JlbW92ZSlcbiAgICAucmVkdWNlKChyZXN1bHQsIGtleSkgPT4gT2JqZWN0LmFzc2lnbihyZXN1bHQsIHsgW2tleV06IG9iamVjdFtrZXldIH0pLCB7fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlPEE+KCk6IChpOiBBKSA9PiBBO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2U8QSwgQj4oYjogKGk6IEEpID0+IEIpOiAoaTogQSkgPT4gQjtcbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlPEEsIEIsIEM+KGM6IChpOiBCKSA9PiBDLCBiOiAoaTogQSkgPT4gQik6IChpOiBBKSA9PiBDO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2U8QSwgQiwgQywgRD4oXG4gIGQ6IChpOiBDKSA9PiBELFxuICBjOiAoaTogQikgPT4gQyxcbiAgYjogKGk6IEEpID0+IEJcbik6IChpOiBBKSA9PiBEO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2U8QSwgQiwgQywgRCwgRT4oXG4gIGU6IChpOiBEKSA9PiBFLFxuICBkOiAoaTogQykgPT4gRCxcbiAgYzogKGk6IEIpID0+IEMsXG4gIGI6IChpOiBBKSA9PiBCXG4pOiAoaTogQSkgPT4gRTtcbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlPEEsIEIsIEMsIEQsIEUsIEY+KFxuICBmOiAoaTogRSkgPT4gRixcbiAgZTogKGk6IEQpID0+IEUsXG4gIGQ6IChpOiBDKSA9PiBELFxuICBjOiAoaTogQikgPT4gQyxcbiAgYjogKGk6IEEpID0+IEJcbik6IChpOiBBKSA9PiBGO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2U8QSA9IGFueSwgRiA9IGFueT4oLi4uZnVuY3Rpb25zOiBhbnlbXSk6IChpOiBBKSA9PiBGO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2UoLi4uZnVuY3Rpb25zOiBhbnlbXSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnOiBhbnkpIHtcbiAgICBpZiAoZnVuY3Rpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGFyZztcbiAgICB9XG5cbiAgICBjb25zdCBsYXN0ID0gZnVuY3Rpb25zW2Z1bmN0aW9ucy5sZW5ndGggLSAxXTtcbiAgICBjb25zdCByZXN0ID0gZnVuY3Rpb25zLnNsaWNlKDAsIC0xKTtcblxuICAgIHJldHVybiByZXN0LnJlZHVjZVJpZ2h0KChjb21wb3NlZCwgZm4pID0+IGZuKGNvbXBvc2VkKSwgbGFzdChhcmcpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlZHVjZXJGYWN0b3J5PFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICByZWR1Y2VyRmFjdG9yeTogQWN0aW9uUmVkdWNlckZhY3Rvcnk8VCwgVj4sXG4gIG1ldGFSZWR1Y2Vycz86IE1ldGFSZWR1Y2VyPFQsIFY+W11cbik6IEFjdGlvblJlZHVjZXJGYWN0b3J5PFQsIFY+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkobWV0YVJlZHVjZXJzKSAmJiBtZXRhUmVkdWNlcnMubGVuZ3RoID4gMCkge1xuICAgIChyZWR1Y2VyRmFjdG9yeSBhcyBhbnkpID0gY29tcG9zZS5hcHBseShudWxsLCBbXG4gICAgICAuLi5tZXRhUmVkdWNlcnMsXG4gICAgICByZWR1Y2VyRmFjdG9yeSxcbiAgICBdKTtcbiAgfVxuXG4gIHJldHVybiAocmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8VCwgVj4sIGluaXRpYWxTdGF0ZT86IEluaXRpYWxTdGF0ZTxUPikgPT4ge1xuICAgIGNvbnN0IHJlZHVjZXIgPSByZWR1Y2VyRmFjdG9yeShyZWR1Y2Vycyk7XG4gICAgcmV0dXJuIChzdGF0ZTogVCB8IHVuZGVmaW5lZCwgYWN0aW9uOiBWKSA9PiB7XG4gICAgICBzdGF0ZSA9IHN0YXRlID09PSB1bmRlZmluZWQgPyAoaW5pdGlhbFN0YXRlIGFzIFQpIDogc3RhdGU7XG4gICAgICByZXR1cm4gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmVhdHVyZVJlZHVjZXJGYWN0b3J5PFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICBtZXRhUmVkdWNlcnM/OiBNZXRhUmVkdWNlcjxULCBWPltdXG4pOiAocmVkdWNlcjogQWN0aW9uUmVkdWNlcjxULCBWPiwgaW5pdGlhbFN0YXRlPzogVCkgPT4gQWN0aW9uUmVkdWNlcjxULCBWPiB7XG4gIGNvbnN0IHJlZHVjZXJGYWN0b3J5ID1cbiAgICBBcnJheS5pc0FycmF5KG1ldGFSZWR1Y2VycykgJiYgbWV0YVJlZHVjZXJzLmxlbmd0aCA+IDBcbiAgICAgID8gY29tcG9zZTxBY3Rpb25SZWR1Y2VyPFQsIFY+PiguLi5tZXRhUmVkdWNlcnMpXG4gICAgICA6IChyOiBBY3Rpb25SZWR1Y2VyPFQsIFY+KSA9PiByO1xuXG4gIHJldHVybiAocmVkdWNlcjogQWN0aW9uUmVkdWNlcjxULCBWPiwgaW5pdGlhbFN0YXRlPzogVCkgPT4ge1xuICAgIHJlZHVjZXIgPSByZWR1Y2VyRmFjdG9yeShyZWR1Y2VyKTtcblxuICAgIHJldHVybiAoc3RhdGU6IFQgfCB1bmRlZmluZWQsIGFjdGlvbjogVikgPT4ge1xuICAgICAgc3RhdGUgPSBzdGF0ZSA9PT0gdW5kZWZpbmVkID8gaW5pdGlhbFN0YXRlIDogc3RhdGU7XG4gICAgICByZXR1cm4gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcbiAgICB9O1xuICB9O1xufVxuIl19