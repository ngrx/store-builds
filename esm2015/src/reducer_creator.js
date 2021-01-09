/**
 * @fileoverview added by tsickle
 * Generated from: src/reducer_creator.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template S
 */
export function On() { }
if (false) {
    /** @type {?} */
    On.prototype.reducer;
    /** @type {?} */
    On.prototype.types;
}
/**
 * @record
 * @template S, C
 */
export function OnReducer() { }
/**
 * \@description
 * Associates actions with a given state change function.
 * A state change function must be provided as the last parameter.
 *
 * \@example
 * on(AuthApiActions.loginSuccess, (state, { user }) => ({ ...state, user }))
 * @template Creators, State, Reducer
 * @param {...?} args `ActionCreator`'s followed by a state change function.
 *
 * @return {?} an association of action types with a state change function.
 *
 */
export function on(...args) {
    /** @type {?} */
    const reducer = (/** @type {?} */ (((/** @type {?} */ (args.pop())))));
    /** @type {?} */
    const types = args.reduce((/**
     * @param {?} result
     * @param {?} creator
     * @return {?}
     */
    (result, creator) => [...result, ((/** @type {?} */ (creator))).type]), (/** @type {?} */ ([])));
    return { reducer, types };
}
/**
 * \@description
 * Creates a reducer function to handle state transitions.
 *
 * Reducer creators reduce the explicitness of reducer functions with switch statements.
 *
 * \@usageNotes
 *
 * - Must be used with `ActionCreator`'s (returned by `createAction`). Cannot be used with class-based action creators.
 * - The returned `ActionReducer` should additionally be wrapped with another function, if you are using View Engine AOT.
 * In case you are using Ivy (or only JIT View Engine) the extra wrapper function is not required.
 *
 * **Declaring a reducer creator**
 *
 * ```ts
 * export const reducer = createReducer(
 *   initialState,
 *   on(
 *     featureActions.actionOne,
 *     featureActions.actionTwo,
 *     (state, { updatedValue }) => ({ ...state, prop: updatedValue })
 *   ),
 *   on(featureActions.actionThree, () => initialState);
 * );
 * ```
 *
 * **Declaring a reducer creator using a wrapper function (Only needed if using View Engine AOT)**
 *
 * ```ts
 * const featureReducer = createReducer(
 *   initialState,
 *   on(
 *     featureActions.actionOne,
 *     featureActions.actionTwo,
 *     (state, { updatedValue }) => ({ ...state, prop: updatedValue })
 *   ),
 *   on(featureActions.actionThree, () => initialState);
 * );
 *
 * export function reducer(state: State | undefined, action: Action) {
 *   return featureReducer(state, action);
 * }
 * ```
 * @template S, A
 * @param {?} initialState Provides a state value if the current state is `undefined`, as it is initially.
 * @param {...?} ons Associations between actions and state changes.
 * @return {?} A reducer function.
 *
 */
export function createReducer(initialState, ...ons) {
    /** @type {?} */
    const map = new Map();
    for (let on of ons) {
        for (let type of on.types) {
            if (map.has(type)) {
                /** @type {?} */
                const existingReducer = (/** @type {?} */ (map.get(type)));
                /** @type {?} */
                const newReducer = (/**
                 * @param {?} state
                 * @param {?} action
                 * @return {?}
                 */
                (state, action) => on.reducer(existingReducer(state, action), action));
                map.set(type, newReducer);
            }
            else {
                map.set(type, on.reducer);
            }
        }
    }
    return (/**
     * @param {?=} state
     * @param {?=} action
     * @return {?}
     */
    function (state = initialState, action) {
        /** @type {?} */
        const reducer = map.get(action.type);
        return reducer ? reducer(state, action) : state;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvIiwic291cmNlcyI6WyJzcmMvcmVkdWNlcl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUdBLHdCQUdDOzs7SUFGQyxxQkFBMEI7O0lBQzFCLG1CQUFnQjs7Ozs7O0FBSWxCLCtCQUVDOzs7Ozs7Ozs7Ozs7OztBQWNELE1BQU0sVUFBVSxFQUFFLENBSWhCLEdBQUcsSUFBK0M7O1VBQzVDLE9BQU8sR0FBRyxtQkFBQSxDQUFDLG1CQUFBLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBWSxDQUFDLEVBQXdCOztVQUMxRCxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU07Ozs7O0lBQ3ZCLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLG1CQUFBLE9BQU8sRUFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUNqRSxtQkFBQSxFQUFFLEVBQVksQ0FDZjtJQUNELE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDNUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrREQsTUFBTSxVQUFVLGFBQWEsQ0FDM0IsWUFBZSxFQUNmLEdBQUcsR0FBWTs7VUFFVCxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQStCO0lBQ2xELEtBQUssSUFBSSxFQUFFLElBQUksR0FBRyxFQUFFO1FBQ2xCLEtBQUssSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRTtZQUN6QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7O3NCQUNYLGVBQWUsR0FBRyxtQkFBQSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUF1Qjs7c0JBQ3RELFVBQVU7Ozs7O2dCQUF3QixDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUN4RCxFQUFFLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7Z0JBQ3BELEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzNCO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMzQjtTQUNGO0tBQ0Y7SUFFRDs7Ozs7SUFBTyxVQUFVLFFBQVcsWUFBWSxFQUFFLE1BQVM7O2NBQzNDLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDcEMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsRCxDQUFDLEVBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uQ3JlYXRvciwgQWN0aW9uUmVkdWNlciwgQWN0aW9uVHlwZSwgQWN0aW9uIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG4vLyBSZXR1cm4gdHlwZSBvZiB0aGUgYG9uYCBmbi5cbmV4cG9ydCBpbnRlcmZhY2UgT248Uz4ge1xuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFM+O1xuICB0eXBlczogc3RyaW5nW107XG59XG5cbi8vIFNwZWNpYWxpemVkIFJlZHVjZXIgdGhhdCBpcyBhd2FyZSBvZiB0aGUgQWN0aW9uIHR5cGUgaXQgbmVlZHMgdG8gaGFuZGxlXG5leHBvcnQgaW50ZXJmYWNlIE9uUmVkdWNlcjxTLCBDIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcltdPiB7XG4gIChzdGF0ZTogUywgYWN0aW9uOiBBY3Rpb25UeXBlPENbbnVtYmVyXT4pOiBTO1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQXNzb2NpYXRlcyBhY3Rpb25zIHdpdGggYSBnaXZlbiBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb24uXG4gKiBBIHN0YXRlIGNoYW5nZSBmdW5jdGlvbiBtdXN0IGJlIHByb3ZpZGVkIGFzIHRoZSBsYXN0IHBhcmFtZXRlci5cbiAqXG4gKiBAcGFyYW0gYXJncyBgQWN0aW9uQ3JlYXRvcmAncyBmb2xsb3dlZCBieSBhIHN0YXRlIGNoYW5nZSBmdW5jdGlvbi5cbiAqXG4gKiBAcmV0dXJucyBhbiBhc3NvY2lhdGlvbiBvZiBhY3Rpb24gdHlwZXMgd2l0aCBhIHN0YXRlIGNoYW5nZSBmdW5jdGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogb24oQXV0aEFwaUFjdGlvbnMubG9naW5TdWNjZXNzLCAoc3RhdGUsIHsgdXNlciB9KSA9PiAoeyAuLi5zdGF0ZSwgdXNlciB9KSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDcmVhdG9ycyBleHRlbmRzIEFjdGlvbkNyZWF0b3JbXSxcbiAgU3RhdGUsXG4gIFJlZHVjZXIgZXh0ZW5kcyBPblJlZHVjZXI8U3RhdGUsIENyZWF0b3JzPlxuPiguLi5hcmdzOiBbLi4uY3JlYXRvcnM6IENyZWF0b3JzLCByZWR1Y2VyOiBSZWR1Y2VyXSk6IE9uPFN0YXRlPiB7XG4gIGNvbnN0IHJlZHVjZXIgPSAoYXJncy5wb3AoKSBhcyBGdW5jdGlvbikgYXMgQWN0aW9uUmVkdWNlcjxTdGF0ZT47XG4gIGNvbnN0IHR5cGVzID0gYXJncy5yZWR1Y2UoXG4gICAgKHJlc3VsdCwgY3JlYXRvcikgPT4gWy4uLnJlc3VsdCwgKGNyZWF0b3IgYXMgQWN0aW9uQ3JlYXRvcikudHlwZV0sXG4gICAgW10gYXMgc3RyaW5nW11cbiAgKTtcbiAgcmV0dXJuIHsgcmVkdWNlciwgdHlwZXMgfTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENyZWF0ZXMgYSByZWR1Y2VyIGZ1bmN0aW9uIHRvIGhhbmRsZSBzdGF0ZSB0cmFuc2l0aW9ucy5cbiAqXG4gKiBSZWR1Y2VyIGNyZWF0b3JzIHJlZHVjZSB0aGUgZXhwbGljaXRuZXNzIG9mIHJlZHVjZXIgZnVuY3Rpb25zIHdpdGggc3dpdGNoIHN0YXRlbWVudHMuXG4gKlxuICogQHBhcmFtIGluaXRpYWxTdGF0ZSBQcm92aWRlcyBhIHN0YXRlIHZhbHVlIGlmIHRoZSBjdXJyZW50IHN0YXRlIGlzIGB1bmRlZmluZWRgLCBhcyBpdCBpcyBpbml0aWFsbHkuXG4gKiBAcGFyYW0gb25zIEFzc29jaWF0aW9ucyBiZXR3ZWVuIGFjdGlvbnMgYW5kIHN0YXRlIGNoYW5nZXMuXG4gKiBAcmV0dXJucyBBIHJlZHVjZXIgZnVuY3Rpb24uXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiAtIE11c3QgYmUgdXNlZCB3aXRoIGBBY3Rpb25DcmVhdG9yYCdzIChyZXR1cm5lZCBieSBgY3JlYXRlQWN0aW9uYCkuIENhbm5vdCBiZSB1c2VkIHdpdGggY2xhc3MtYmFzZWQgYWN0aW9uIGNyZWF0b3JzLlxuICogLSBUaGUgcmV0dXJuZWQgYEFjdGlvblJlZHVjZXJgIHNob3VsZCBhZGRpdGlvbmFsbHkgYmUgd3JhcHBlZCB3aXRoIGFub3RoZXIgZnVuY3Rpb24sIGlmIHlvdSBhcmUgdXNpbmcgVmlldyBFbmdpbmUgQU9ULlxuICogSW4gY2FzZSB5b3UgYXJlIHVzaW5nIEl2eSAob3Igb25seSBKSVQgVmlldyBFbmdpbmUpIHRoZSBleHRyYSB3cmFwcGVyIGZ1bmN0aW9uIGlzIG5vdCByZXF1aXJlZC5cbiAqXG4gKiAqKkRlY2xhcmluZyBhIHJlZHVjZXIgY3JlYXRvcioqXG4gKlxuICogYGBgdHNcbiAqIGV4cG9ydCBjb25zdCByZWR1Y2VyID0gY3JlYXRlUmVkdWNlcihcbiAqICAgaW5pdGlhbFN0YXRlLFxuICogICBvbihcbiAqICAgICBmZWF0dXJlQWN0aW9ucy5hY3Rpb25PbmUsXG4gKiAgICAgZmVhdHVyZUFjdGlvbnMuYWN0aW9uVHdvLFxuICogICAgIChzdGF0ZSwgeyB1cGRhdGVkVmFsdWUgfSkgPT4gKHsgLi4uc3RhdGUsIHByb3A6IHVwZGF0ZWRWYWx1ZSB9KVxuICogICApLFxuICogICBvbihmZWF0dXJlQWN0aW9ucy5hY3Rpb25UaHJlZSwgKCkgPT4gaW5pdGlhbFN0YXRlKTtcbiAqICk7XG4gKiBgYGBcbiAqXG4gKiAqKkRlY2xhcmluZyBhIHJlZHVjZXIgY3JlYXRvciB1c2luZyBhIHdyYXBwZXIgZnVuY3Rpb24gKE9ubHkgbmVlZGVkIGlmIHVzaW5nIFZpZXcgRW5naW5lIEFPVCkqKlxuICpcbiAqIGBgYHRzXG4gKiBjb25zdCBmZWF0dXJlUmVkdWNlciA9IGNyZWF0ZVJlZHVjZXIoXG4gKiAgIGluaXRpYWxTdGF0ZSxcbiAqICAgb24oXG4gKiAgICAgZmVhdHVyZUFjdGlvbnMuYWN0aW9uT25lLFxuICogICAgIGZlYXR1cmVBY3Rpb25zLmFjdGlvblR3byxcbiAqICAgICAoc3RhdGUsIHsgdXBkYXRlZFZhbHVlIH0pID0+ICh7IC4uLnN0YXRlLCBwcm9wOiB1cGRhdGVkVmFsdWUgfSlcbiAqICAgKSxcbiAqICAgb24oZmVhdHVyZUFjdGlvbnMuYWN0aW9uVGhyZWUsICgpID0+IGluaXRpYWxTdGF0ZSk7XG4gKiApO1xuICpcbiAqIGV4cG9ydCBmdW5jdGlvbiByZWR1Y2VyKHN0YXRlOiBTdGF0ZSB8IHVuZGVmaW5lZCwgYWN0aW9uOiBBY3Rpb24pIHtcbiAqICAgcmV0dXJuIGZlYXR1cmVSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWR1Y2VyPFMsIEEgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICBpbml0aWFsU3RhdGU6IFMsXG4gIC4uLm9uczogT248Uz5bXVxuKTogQWN0aW9uUmVkdWNlcjxTLCBBPiB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBBY3Rpb25SZWR1Y2VyPFMsIEE+PigpO1xuICBmb3IgKGxldCBvbiBvZiBvbnMpIHtcbiAgICBmb3IgKGxldCB0eXBlIG9mIG9uLnR5cGVzKSB7XG4gICAgICBpZiAobWFwLmhhcyh0eXBlKSkge1xuICAgICAgICBjb25zdCBleGlzdGluZ1JlZHVjZXIgPSBtYXAuZ2V0KHR5cGUpIGFzIEFjdGlvblJlZHVjZXI8UywgQT47XG4gICAgICAgIGNvbnN0IG5ld1JlZHVjZXI6IEFjdGlvblJlZHVjZXI8UywgQT4gPSAoc3RhdGUsIGFjdGlvbikgPT5cbiAgICAgICAgICBvbi5yZWR1Y2VyKGV4aXN0aW5nUmVkdWNlcihzdGF0ZSwgYWN0aW9uKSwgYWN0aW9uKTtcbiAgICAgICAgbWFwLnNldCh0eXBlLCBuZXdSZWR1Y2VyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcC5zZXQodHlwZSwgb24ucmVkdWNlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChzdGF0ZTogUyA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBKTogUyB7XG4gICAgY29uc3QgcmVkdWNlciA9IG1hcC5nZXQoYWN0aW9uLnR5cGUpO1xuICAgIHJldHVybiByZWR1Y2VyID8gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKSA6IHN0YXRlO1xuICB9O1xufVxuIl19