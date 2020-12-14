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
 * @template C, S, OR, AR
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvIiwic291cmNlcyI6WyJzcmMvcmVkdWNlcl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUdBLHdCQUdDOzs7SUFGQyxxQkFBMEI7O0lBQzFCLG1CQUFnQjs7Ozs7O0FBSWxCLCtCQUVDOzs7Ozs7Ozs7Ozs7OztBQWNELE1BQU0sVUFBVSxFQUFFLENBS2hCLEdBQUcsSUFBZ0I7O1VBQ2IsT0FBTyxHQUFHLG1CQUFBLENBQUMsbUJBQUEsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFZLENBQUMsRUFBTTs7VUFDeEMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNOzs7OztJQUN2QixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxtQkFBQSxPQUFPLEVBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FDakUsbUJBQUEsRUFBRSxFQUFZLENBQ2Y7SUFDRCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQzVCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0RELE1BQU0sVUFBVSxhQUFhLENBQzNCLFlBQWUsRUFDZixHQUFHLEdBQVk7O1VBRVQsR0FBRyxHQUFHLElBQUksR0FBRyxFQUErQjtJQUNsRCxLQUFLLElBQUksRUFBRSxJQUFJLEdBQUcsRUFBRTtRQUNsQixLQUFLLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUU7WUFDekIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFOztzQkFDWCxlQUFlLEdBQUcsbUJBQUEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBdUI7O3NCQUN0RCxVQUFVOzs7OztnQkFBd0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FDeEQsRUFBRSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO2dCQUNwRCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0I7U0FDRjtLQUNGO0lBRUQ7Ozs7O0lBQU8sVUFBVSxRQUFXLFlBQVksRUFBRSxNQUFTOztjQUMzQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3BDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbEQsQ0FBQyxFQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbkNyZWF0b3IsIEFjdGlvblJlZHVjZXIsIEFjdGlvblR5cGUsIEFjdGlvbiB9IGZyb20gJy4vbW9kZWxzJztcblxuLy8gUmV0dXJuIHR5cGUgb2YgdGhlIGBvbmAgZm4uXG5leHBvcnQgaW50ZXJmYWNlIE9uPFM+IHtcbiAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxTPjtcbiAgdHlwZXM6IHN0cmluZ1tdO1xufVxuXG4vLyBTcGVjaWFsaXplZCBSZWR1Y2VyIHRoYXQgaXMgYXdhcmUgb2YgdGhlIEFjdGlvbiB0eXBlIGl0IG5lZWRzIHRvIGhhbmRsZVxuZXhwb3J0IGludGVyZmFjZSBPblJlZHVjZXI8UywgQyBleHRlbmRzIEFjdGlvbkNyZWF0b3JbXT4ge1xuICAoc3RhdGU6IFMsIGFjdGlvbjogQWN0aW9uVHlwZTxDW251bWJlcl0+KTogUztcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFzc29jaWF0ZXMgYWN0aW9ucyB3aXRoIGEgZ2l2ZW4gc3RhdGUgY2hhbmdlIGZ1bmN0aW9uLlxuICogQSBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb24gbXVzdCBiZSBwcm92aWRlZCBhcyB0aGUgbGFzdCBwYXJhbWV0ZXIuXG4gKlxuICogQHBhcmFtIGFyZ3MgYEFjdGlvbkNyZWF0b3JgJ3MgZm9sbG93ZWQgYnkgYSBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb24uXG4gKlxuICogQHJldHVybnMgYW4gYXNzb2NpYXRpb24gb2YgYWN0aW9uIHR5cGVzIHdpdGggYSBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb24uXG4gKlxuICogQGV4YW1wbGVcbiAqIG9uKEF1dGhBcGlBY3Rpb25zLmxvZ2luU3VjY2VzcywgKHN0YXRlLCB7IHVzZXIgfSkgPT4gKHsgLi4uc3RhdGUsIHVzZXIgfSkpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvbjxcbiAgQyBleHRlbmRzIEFjdGlvbkNyZWF0b3JbXSxcbiAgUyxcbiAgT1IgZXh0ZW5kcyBPblJlZHVjZXI8UywgQz4gPSBPblJlZHVjZXI8UywgQz4sXG4gIEFSIGV4dGVuZHMgQWN0aW9uUmVkdWNlcjxTPiA9IEFjdGlvblJlZHVjZXI8Uz5cbj4oLi4uYXJnczogWy4uLkMsIE9SXSk6IE9uPFM+IHtcbiAgY29uc3QgcmVkdWNlciA9IChhcmdzLnBvcCgpIGFzIEZ1bmN0aW9uKSBhcyBBUjtcbiAgY29uc3QgdHlwZXMgPSBhcmdzLnJlZHVjZShcbiAgICAocmVzdWx0LCBjcmVhdG9yKSA9PiBbLi4ucmVzdWx0LCAoY3JlYXRvciBhcyBBY3Rpb25DcmVhdG9yKS50eXBlXSxcbiAgICBbXSBhcyBzdHJpbmdbXVxuICApO1xuICByZXR1cm4geyByZWR1Y2VyLCB0eXBlcyB9O1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQ3JlYXRlcyBhIHJlZHVjZXIgZnVuY3Rpb24gdG8gaGFuZGxlIHN0YXRlIHRyYW5zaXRpb25zLlxuICpcbiAqIFJlZHVjZXIgY3JlYXRvcnMgcmVkdWNlIHRoZSBleHBsaWNpdG5lc3Mgb2YgcmVkdWNlciBmdW5jdGlvbnMgd2l0aCBzd2l0Y2ggc3RhdGVtZW50cy5cbiAqXG4gKiBAcGFyYW0gaW5pdGlhbFN0YXRlIFByb3ZpZGVzIGEgc3RhdGUgdmFsdWUgaWYgdGhlIGN1cnJlbnQgc3RhdGUgaXMgYHVuZGVmaW5lZGAsIGFzIGl0IGlzIGluaXRpYWxseS5cbiAqIEBwYXJhbSBvbnMgQXNzb2NpYXRpb25zIGJldHdlZW4gYWN0aW9ucyBhbmQgc3RhdGUgY2hhbmdlcy5cbiAqIEByZXR1cm5zIEEgcmVkdWNlciBmdW5jdGlvbi5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIC0gTXVzdCBiZSB1c2VkIHdpdGggYEFjdGlvbkNyZWF0b3JgJ3MgKHJldHVybmVkIGJ5IGBjcmVhdGVBY3Rpb25gKS4gQ2Fubm90IGJlIHVzZWQgd2l0aCBjbGFzcy1iYXNlZCBhY3Rpb24gY3JlYXRvcnMuXG4gKiAtIFRoZSByZXR1cm5lZCBgQWN0aW9uUmVkdWNlcmAgc2hvdWxkIGFkZGl0aW9uYWxseSBiZSB3cmFwcGVkIHdpdGggYW5vdGhlciBmdW5jdGlvbiwgaWYgeW91IGFyZSB1c2luZyBWaWV3IEVuZ2luZSBBT1QuXG4gKiBJbiBjYXNlIHlvdSBhcmUgdXNpbmcgSXZ5IChvciBvbmx5IEpJVCBWaWV3IEVuZ2luZSkgdGhlIGV4dHJhIHdyYXBwZXIgZnVuY3Rpb24gaXMgbm90IHJlcXVpcmVkLlxuICpcbiAqICoqRGVjbGFyaW5nIGEgcmVkdWNlciBjcmVhdG9yKipcbiAqXG4gKiBgYGB0c1xuICogZXhwb3J0IGNvbnN0IHJlZHVjZXIgPSBjcmVhdGVSZWR1Y2VyKFxuICogICBpbml0aWFsU3RhdGUsXG4gKiAgIG9uKFxuICogICAgIGZlYXR1cmVBY3Rpb25zLmFjdGlvbk9uZSxcbiAqICAgICBmZWF0dXJlQWN0aW9ucy5hY3Rpb25Ud28sXG4gKiAgICAgKHN0YXRlLCB7IHVwZGF0ZWRWYWx1ZSB9KSA9PiAoeyAuLi5zdGF0ZSwgcHJvcDogdXBkYXRlZFZhbHVlIH0pXG4gKiAgICksXG4gKiAgIG9uKGZlYXR1cmVBY3Rpb25zLmFjdGlvblRocmVlLCAoKSA9PiBpbml0aWFsU3RhdGUpO1xuICogKTtcbiAqIGBgYFxuICpcbiAqICoqRGVjbGFyaW5nIGEgcmVkdWNlciBjcmVhdG9yIHVzaW5nIGEgd3JhcHBlciBmdW5jdGlvbiAoT25seSBuZWVkZWQgaWYgdXNpbmcgVmlldyBFbmdpbmUgQU9UKSoqXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IGZlYXR1cmVSZWR1Y2VyID0gY3JlYXRlUmVkdWNlcihcbiAqICAgaW5pdGlhbFN0YXRlLFxuICogICBvbihcbiAqICAgICBmZWF0dXJlQWN0aW9ucy5hY3Rpb25PbmUsXG4gKiAgICAgZmVhdHVyZUFjdGlvbnMuYWN0aW9uVHdvLFxuICogICAgIChzdGF0ZSwgeyB1cGRhdGVkVmFsdWUgfSkgPT4gKHsgLi4uc3RhdGUsIHByb3A6IHVwZGF0ZWRWYWx1ZSB9KVxuICogICApLFxuICogICBvbihmZWF0dXJlQWN0aW9ucy5hY3Rpb25UaHJlZSwgKCkgPT4gaW5pdGlhbFN0YXRlKTtcbiAqICk7XG4gKlxuICogZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGU6IFN0YXRlIHwgdW5kZWZpbmVkLCBhY3Rpb246IEFjdGlvbikge1xuICogICByZXR1cm4gZmVhdHVyZVJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlZHVjZXI8UywgQSBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gIGluaXRpYWxTdGF0ZTogUyxcbiAgLi4ub25zOiBPbjxTPltdXG4pOiBBY3Rpb25SZWR1Y2VyPFMsIEE+IHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIEFjdGlvblJlZHVjZXI8UywgQT4+KCk7XG4gIGZvciAobGV0IG9uIG9mIG9ucykge1xuICAgIGZvciAobGV0IHR5cGUgb2Ygb24udHlwZXMpIHtcbiAgICAgIGlmIChtYXAuaGFzKHR5cGUpKSB7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nUmVkdWNlciA9IG1hcC5nZXQodHlwZSkgYXMgQWN0aW9uUmVkdWNlcjxTLCBBPjtcbiAgICAgICAgY29uc3QgbmV3UmVkdWNlcjogQWN0aW9uUmVkdWNlcjxTLCBBPiA9IChzdGF0ZSwgYWN0aW9uKSA9PlxuICAgICAgICAgIG9uLnJlZHVjZXIoZXhpc3RpbmdSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pLCBhY3Rpb24pO1xuICAgICAgICBtYXAuc2V0KHR5cGUsIG5ld1JlZHVjZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFwLnNldCh0eXBlLCBvbi5yZWR1Y2VyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKHN0YXRlOiBTID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IEEpOiBTIHtcbiAgICBjb25zdCByZWR1Y2VyID0gbWFwLmdldChhY3Rpb24udHlwZSk7XG4gICAgcmV0dXJuIHJlZHVjZXIgPyByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIDogc3RhdGU7XG4gIH07XG59XG4iXX0=