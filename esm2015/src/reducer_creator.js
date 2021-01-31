/**
 * @fileoverview added by tsickle
 * Generated from: src/reducer_creator.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Return type of the `on` fn.
 * Contains the action reducer coupled to one or more action types.
 * @record
 * @template State, Creators
 */
export function ReducerTypes() { }
if (false) {
    /** @type {?} */
    ReducerTypes.prototype.reducer;
    /** @type {?} */
    ReducerTypes.prototype.types;
}
/**
 * @record
 * @template State, Creators
 */
export function OnReducer() { }
/**
 * \@description
 * Associates actions with a given state change function.
 * A state change function must be provided as the last parameter.
 *
 * \@usageNotes
 * ```ts
 * on(AuthApiActions.loginSuccess, (state, { user }) => ({ ...state, user }))
 * ```
 * @template State, Creators
 * @param {...?} args `ActionCreator`'s followed by a state change function.
 *
 * @return {?} an association of action types with a state change function.
 *
 */
export function on(...args) {
    // This could be refactored when TS releases the version with this fix:
    // https://github.com/microsoft/TypeScript/pull/41544
    /** @type {?} */
    const reducer = (/** @type {?} */ (args.pop()));
    /** @type {?} */
    const types = (/** @type {?} */ (((/** @type {?} */ (((/** @type {?} */ (((/** @type {?} */ (args)))))).map((/**
     * @param {?} creator
     * @return {?}
     */
    (creator) => creator.type)))))));
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
            /** @type {?} */
            const existingReducer = map.get(type);
            if (existingReducer) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvIiwic291cmNlcyI6WyJzcmMvcmVkdWNlcl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBY0Esa0NBTUM7OztJQUZDLCtCQUFvQzs7SUFDcEMsNkJBQW9DOzs7Ozs7QUFJdEMsK0JBRUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkQsTUFBTSxVQUFVLEVBQUUsQ0FDaEIsR0FBRyxJQUFrRTs7OztVQUkvRCxPQUFPLEdBQUcsbUJBQUEsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUE4Qjs7VUFDbEQsS0FBSyxHQUFHLG1CQUFBLENBQUMsbUJBQUEsQ0FBQyxtQkFBQSxDQUFDLG1CQUFBLElBQUksRUFBVyxDQUFDLEVBQVksQ0FBQyxDQUFDLEdBQUc7Ozs7SUFDaEQsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQzFCLEVBQVcsQ0FBQyxFQUFnQztJQUM3QyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQzVCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0RELE1BQU0sVUFBVSxhQUFhLENBQzNCLFlBQWUsRUFDZixHQUFHLEdBQXVDOztVQUVwQyxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQXlDO0lBQzVELEtBQUssSUFBSSxFQUFFLElBQUksR0FBRyxFQUFFO1FBQ2xCLEtBQUssSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRTs7a0JBQ25CLGVBQWUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNyQyxJQUFJLGVBQWUsRUFBRTs7c0JBQ2IsVUFBVTs7Ozs7Z0JBQTJCLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQzNELEVBQUUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtnQkFDcEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDM0I7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzNCO1NBQ0Y7S0FDRjtJQUVEOzs7OztJQUFPLFVBQVUsUUFBVyxZQUFZLEVBQUUsTUFBUzs7Y0FDM0MsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNwQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2xELENBQUMsRUFBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25DcmVhdG9yLCBBY3Rpb25SZWR1Y2VyLCBBY3Rpb25UeXBlLCBBY3Rpb24gfSBmcm9tICcuL21vZGVscyc7XG5cbi8vIEdvZXMgb3ZlciB0aGUgYXJyYXkgb2YgQWN0aW9uQ3JlYXRvcnMsIHB1bGxzIHRoZSBhY3Rpb24gdHlwZSBvdXQgb2YgZWFjaCBvbmVcbi8vIGFuZCByZXR1cm5zIHRoZSBhcnJheSBvZiB0aGVzZSBhY3Rpb24gdHlwZXMuXG50eXBlIEV4dHJhY3RBY3Rpb25UeXBlczxDcmVhdG9ycyBleHRlbmRzIHJlYWRvbmx5IEFjdGlvbkNyZWF0b3JbXT4gPSB7XG4gIFtLZXkgaW4ga2V5b2YgQ3JlYXRvcnNdOiBDcmVhdG9yc1tLZXldIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcjxpbmZlciBUPlxuICAgID8gVFxuICAgIDogbmV2ZXI7XG59O1xuXG4vKipcbiAqIFJldHVybiB0eXBlIG9mIHRoZSBgb25gIGZuLlxuICogQ29udGFpbnMgdGhlIGFjdGlvbiByZWR1Y2VyIGNvdXBsZWQgdG8gb25lIG9yIG1vcmUgYWN0aW9uIHR5cGVzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlZHVjZXJUeXBlczxcbiAgU3RhdGUsXG4gIENyZWF0b3JzIGV4dGVuZHMgcmVhZG9ubHkgQWN0aW9uQ3JlYXRvcltdXG4+IHtcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFN0YXRlLCBDcmVhdG9ycz47XG4gIHR5cGVzOiBFeHRyYWN0QWN0aW9uVHlwZXM8Q3JlYXRvcnM+O1xufVxuXG4vLyBTcGVjaWFsaXplZCBSZWR1Y2VyIHRoYXQgaXMgYXdhcmUgb2YgdGhlIEFjdGlvbiB0eXBlIGl0IG5lZWRzIHRvIGhhbmRsZVxuZXhwb3J0IGludGVyZmFjZSBPblJlZHVjZXI8U3RhdGUsIENyZWF0b3JzIGV4dGVuZHMgcmVhZG9ubHkgQWN0aW9uQ3JlYXRvcltdPiB7XG4gIChzdGF0ZTogU3RhdGUsIGFjdGlvbjogQWN0aW9uVHlwZTxDcmVhdG9yc1tudW1iZXJdPik6IHsgW1AgaW4ga2V5b2YgU3RhdGVdOiBTdGF0ZVtQXSB9O1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQXNzb2NpYXRlcyBhY3Rpb25zIHdpdGggYSBnaXZlbiBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb24uXG4gKiBBIHN0YXRlIGNoYW5nZSBmdW5jdGlvbiBtdXN0IGJlIHByb3ZpZGVkIGFzIHRoZSBsYXN0IHBhcmFtZXRlci5cbiAqXG4gKiBAcGFyYW0gYXJncyBgQWN0aW9uQ3JlYXRvcmAncyBmb2xsb3dlZCBieSBhIHN0YXRlIGNoYW5nZSBmdW5jdGlvbi5cbiAqXG4gKiBAcmV0dXJucyBhbiBhc3NvY2lhdGlvbiBvZiBhY3Rpb24gdHlwZXMgd2l0aCBhIHN0YXRlIGNoYW5nZSBmdW5jdGlvbi5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogYGBgdHNcbiAqIG9uKEF1dGhBcGlBY3Rpb25zLmxvZ2luU3VjY2VzcywgKHN0YXRlLCB7IHVzZXIgfSkgPT4gKHsgLi4uc3RhdGUsIHVzZXIgfSkpXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFN0YXRlLCBDcmVhdG9ycyBleHRlbmRzIHJlYWRvbmx5IEFjdGlvbkNyZWF0b3JbXT4oXG4gIC4uLmFyZ3M6IFsuLi5jcmVhdG9yczogQ3JlYXRvcnMsIHJlZHVjZXI6IE9uUmVkdWNlcjxTdGF0ZSwgQ3JlYXRvcnM+XVxuKTogUmVkdWNlclR5cGVzPFN0YXRlLCBDcmVhdG9ycz4ge1xuICAvLyBUaGlzIGNvdWxkIGJlIHJlZmFjdG9yZWQgd2hlbiBUUyByZWxlYXNlcyB0aGUgdmVyc2lvbiB3aXRoIHRoaXMgZml4OlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvcHVsbC80MTU0NFxuICBjb25zdCByZWR1Y2VyID0gYXJncy5wb3AoKSBhcyBPblJlZHVjZXI8U3RhdGUsIENyZWF0b3JzPjtcbiAgY29uc3QgdHlwZXMgPSAoKChhcmdzIGFzIHVua25vd24pIGFzIENyZWF0b3JzKS5tYXAoXG4gICAgKGNyZWF0b3IpID0+IGNyZWF0b3IudHlwZVxuICApIGFzIHVua25vd24pIGFzIEV4dHJhY3RBY3Rpb25UeXBlczxDcmVhdG9ycz47XG4gIHJldHVybiB7IHJlZHVjZXIsIHR5cGVzIH07XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDcmVhdGVzIGEgcmVkdWNlciBmdW5jdGlvbiB0byBoYW5kbGUgc3RhdGUgdHJhbnNpdGlvbnMuXG4gKlxuICogUmVkdWNlciBjcmVhdG9ycyByZWR1Y2UgdGhlIGV4cGxpY2l0bmVzcyBvZiByZWR1Y2VyIGZ1bmN0aW9ucyB3aXRoIHN3aXRjaCBzdGF0ZW1lbnRzLlxuICpcbiAqIEBwYXJhbSBpbml0aWFsU3RhdGUgUHJvdmlkZXMgYSBzdGF0ZSB2YWx1ZSBpZiB0aGUgY3VycmVudCBzdGF0ZSBpcyBgdW5kZWZpbmVkYCwgYXMgaXQgaXMgaW5pdGlhbGx5LlxuICogQHBhcmFtIG9ucyBBc3NvY2lhdGlvbnMgYmV0d2VlbiBhY3Rpb25zIGFuZCBzdGF0ZSBjaGFuZ2VzLlxuICogQHJldHVybnMgQSByZWR1Y2VyIGZ1bmN0aW9uLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogLSBNdXN0IGJlIHVzZWQgd2l0aCBgQWN0aW9uQ3JlYXRvcmAncyAocmV0dXJuZWQgYnkgYGNyZWF0ZUFjdGlvbmApLiBDYW5ub3QgYmUgdXNlZCB3aXRoIGNsYXNzLWJhc2VkIGFjdGlvbiBjcmVhdG9ycy5cbiAqIC0gVGhlIHJldHVybmVkIGBBY3Rpb25SZWR1Y2VyYCBzaG91bGQgYWRkaXRpb25hbGx5IGJlIHdyYXBwZWQgd2l0aCBhbm90aGVyIGZ1bmN0aW9uLCBpZiB5b3UgYXJlIHVzaW5nIFZpZXcgRW5naW5lIEFPVC5cbiAqIEluIGNhc2UgeW91IGFyZSB1c2luZyBJdnkgKG9yIG9ubHkgSklUIFZpZXcgRW5naW5lKSB0aGUgZXh0cmEgd3JhcHBlciBmdW5jdGlvbiBpcyBub3QgcmVxdWlyZWQuXG4gKlxuICogKipEZWNsYXJpbmcgYSByZWR1Y2VyIGNyZWF0b3IqKlxuICpcbiAqIGBgYHRzXG4gKiBleHBvcnQgY29uc3QgcmVkdWNlciA9IGNyZWF0ZVJlZHVjZXIoXG4gKiAgIGluaXRpYWxTdGF0ZSxcbiAqICAgb24oXG4gKiAgICAgZmVhdHVyZUFjdGlvbnMuYWN0aW9uT25lLFxuICogICAgIGZlYXR1cmVBY3Rpb25zLmFjdGlvblR3byxcbiAqICAgICAoc3RhdGUsIHsgdXBkYXRlZFZhbHVlIH0pID0+ICh7IC4uLnN0YXRlLCBwcm9wOiB1cGRhdGVkVmFsdWUgfSlcbiAqICAgKSxcbiAqICAgb24oZmVhdHVyZUFjdGlvbnMuYWN0aW9uVGhyZWUsICgpID0+IGluaXRpYWxTdGF0ZSk7XG4gKiApO1xuICogYGBgXG4gKlxuICogKipEZWNsYXJpbmcgYSByZWR1Y2VyIGNyZWF0b3IgdXNpbmcgYSB3cmFwcGVyIGZ1bmN0aW9uIChPbmx5IG5lZWRlZCBpZiB1c2luZyBWaWV3IEVuZ2luZSBBT1QpKipcbiAqXG4gKiBgYGB0c1xuICogY29uc3QgZmVhdHVyZVJlZHVjZXIgPSBjcmVhdGVSZWR1Y2VyKFxuICogICBpbml0aWFsU3RhdGUsXG4gKiAgIG9uKFxuICogICAgIGZlYXR1cmVBY3Rpb25zLmFjdGlvbk9uZSxcbiAqICAgICBmZWF0dXJlQWN0aW9ucy5hY3Rpb25Ud28sXG4gKiAgICAgKHN0YXRlLCB7IHVwZGF0ZWRWYWx1ZSB9KSA9PiAoeyAuLi5zdGF0ZSwgcHJvcDogdXBkYXRlZFZhbHVlIH0pXG4gKiAgICksXG4gKiAgIG9uKGZlYXR1cmVBY3Rpb25zLmFjdGlvblRocmVlLCAoKSA9PiBpbml0aWFsU3RhdGUpO1xuICogKTtcbiAqXG4gKiBleHBvcnQgZnVuY3Rpb24gcmVkdWNlcihzdGF0ZTogU3RhdGUgfCB1bmRlZmluZWQsIGFjdGlvbjogQWN0aW9uKSB7XG4gKiAgIHJldHVybiBmZWF0dXJlUmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVkdWNlcjxTLCBBIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgaW5pdGlhbFN0YXRlOiBTLFxuICAuLi5vbnM6IFJlZHVjZXJUeXBlczxTLCBBY3Rpb25DcmVhdG9yW10+W11cbik6IEFjdGlvblJlZHVjZXI8UywgQT4ge1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgT25SZWR1Y2VyPFMsIEFjdGlvbkNyZWF0b3JbXT4+KCk7XG4gIGZvciAobGV0IG9uIG9mIG9ucykge1xuICAgIGZvciAobGV0IHR5cGUgb2Ygb24udHlwZXMpIHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nUmVkdWNlciA9IG1hcC5nZXQodHlwZSk7XG4gICAgICBpZiAoZXhpc3RpbmdSZWR1Y2VyKSB7XG4gICAgICAgIGNvbnN0IG5ld1JlZHVjZXI6IHR5cGVvZiBleGlzdGluZ1JlZHVjZXIgPSAoc3RhdGUsIGFjdGlvbikgPT5cbiAgICAgICAgICBvbi5yZWR1Y2VyKGV4aXN0aW5nUmVkdWNlcihzdGF0ZSwgYWN0aW9uKSwgYWN0aW9uKTtcbiAgICAgICAgbWFwLnNldCh0eXBlLCBuZXdSZWR1Y2VyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcC5zZXQodHlwZSwgb24ucmVkdWNlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChzdGF0ZTogUyA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBKTogUyB7XG4gICAgY29uc3QgcmVkdWNlciA9IG1hcC5nZXQoYWN0aW9uLnR5cGUpO1xuICAgIHJldHVybiByZWR1Y2VyID8gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKSA6IHN0YXRlO1xuICB9O1xufVxuIl19