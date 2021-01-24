/**
 * @fileoverview added by tsickle
 * Generated from: src/reducer_creator.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Return type of the `on` fn.
 * Contains the action reducer coupled to one or more action types.
 * @record
 * @template S
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
 * @template S, C
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvIiwic291cmNlcyI6WyJzcmMvcmVkdWNlcl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBTUEsa0NBR0M7OztJQUZDLCtCQUEwQjs7SUFDMUIsNkJBQWdCOzs7Ozs7QUFJbEIsK0JBRUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkQsTUFBTSxVQUFVLEVBQUUsQ0FJaEIsR0FBRyxJQUErQzs7VUFDNUMsT0FBTyxHQUFHLG1CQUFBLENBQUMsbUJBQUEsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFZLENBQUMsRUFBd0I7O1VBQzFELEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTTs7Ozs7SUFDdkIsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsbUJBQUEsT0FBTyxFQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQ2pFLG1CQUFBLEVBQUUsRUFBWSxDQUNmO0lBQ0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUM1QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtERCxNQUFNLFVBQVUsYUFBYSxDQUMzQixZQUFlLEVBQ2YsR0FBRyxHQUFzQjs7VUFFbkIsR0FBRyxHQUFHLElBQUksR0FBRyxFQUErQjtJQUNsRCxLQUFLLElBQUksRUFBRSxJQUFJLEdBQUcsRUFBRTtRQUNsQixLQUFLLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUU7WUFDekIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFOztzQkFDWCxlQUFlLEdBQUcsbUJBQUEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBdUI7O3NCQUN0RCxVQUFVOzs7OztnQkFBd0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FDeEQsRUFBRSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO2dCQUNwRCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0I7U0FDRjtLQUNGO0lBRUQ7Ozs7O0lBQU8sVUFBVSxRQUFXLFlBQVksRUFBRSxNQUFTOztjQUMzQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3BDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbEQsQ0FBQyxFQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbkNyZWF0b3IsIEFjdGlvblJlZHVjZXIsIEFjdGlvblR5cGUsIEFjdGlvbiB9IGZyb20gJy4vbW9kZWxzJztcblxuLyoqXG4gKiBSZXR1cm4gdHlwZSBvZiB0aGUgYG9uYCBmbi5cbiAqIENvbnRhaW5zIHRoZSBhY3Rpb24gcmVkdWNlciBjb3VwbGVkIHRvIG9uZSBvciBtb3JlIGFjdGlvbiB0eXBlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZWR1Y2VyVHlwZXM8Uz4ge1xuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFM+O1xuICB0eXBlczogc3RyaW5nW107XG59XG5cbi8vIFNwZWNpYWxpemVkIFJlZHVjZXIgdGhhdCBpcyBhd2FyZSBvZiB0aGUgQWN0aW9uIHR5cGUgaXQgbmVlZHMgdG8gaGFuZGxlXG5leHBvcnQgaW50ZXJmYWNlIE9uUmVkdWNlcjxTLCBDIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcltdPiB7XG4gIChzdGF0ZTogUywgYWN0aW9uOiBBY3Rpb25UeXBlPENbbnVtYmVyXT4pOiBTO1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQXNzb2NpYXRlcyBhY3Rpb25zIHdpdGggYSBnaXZlbiBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb24uXG4gKiBBIHN0YXRlIGNoYW5nZSBmdW5jdGlvbiBtdXN0IGJlIHByb3ZpZGVkIGFzIHRoZSBsYXN0IHBhcmFtZXRlci5cbiAqXG4gKiBAcGFyYW0gYXJncyBgQWN0aW9uQ3JlYXRvcmAncyBmb2xsb3dlZCBieSBhIHN0YXRlIGNoYW5nZSBmdW5jdGlvbi5cbiAqXG4gKiBAcmV0dXJucyBhbiBhc3NvY2lhdGlvbiBvZiBhY3Rpb24gdHlwZXMgd2l0aCBhIHN0YXRlIGNoYW5nZSBmdW5jdGlvbi5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogYGBgdHNcbiAqIG9uKEF1dGhBcGlBY3Rpb25zLmxvZ2luU3VjY2VzcywgKHN0YXRlLCB7IHVzZXIgfSkgPT4gKHsgLi4uc3RhdGUsIHVzZXIgfSkpXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDcmVhdG9ycyBleHRlbmRzIEFjdGlvbkNyZWF0b3JbXSxcbiAgU3RhdGUsXG4gIFJlZHVjZXIgZXh0ZW5kcyBPblJlZHVjZXI8U3RhdGUsIENyZWF0b3JzPlxuPiguLi5hcmdzOiBbLi4uY3JlYXRvcnM6IENyZWF0b3JzLCByZWR1Y2VyOiBSZWR1Y2VyXSk6IFJlZHVjZXJUeXBlczxTdGF0ZT4ge1xuICBjb25zdCByZWR1Y2VyID0gKGFyZ3MucG9wKCkgYXMgRnVuY3Rpb24pIGFzIEFjdGlvblJlZHVjZXI8U3RhdGU+O1xuICBjb25zdCB0eXBlcyA9IGFyZ3MucmVkdWNlKFxuICAgIChyZXN1bHQsIGNyZWF0b3IpID0+IFsuLi5yZXN1bHQsIChjcmVhdG9yIGFzIEFjdGlvbkNyZWF0b3IpLnR5cGVdLFxuICAgIFtdIGFzIHN0cmluZ1tdXG4gICk7XG4gIHJldHVybiB7IHJlZHVjZXIsIHR5cGVzIH07XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDcmVhdGVzIGEgcmVkdWNlciBmdW5jdGlvbiB0byBoYW5kbGUgc3RhdGUgdHJhbnNpdGlvbnMuXG4gKlxuICogUmVkdWNlciBjcmVhdG9ycyByZWR1Y2UgdGhlIGV4cGxpY2l0bmVzcyBvZiByZWR1Y2VyIGZ1bmN0aW9ucyB3aXRoIHN3aXRjaCBzdGF0ZW1lbnRzLlxuICpcbiAqIEBwYXJhbSBpbml0aWFsU3RhdGUgUHJvdmlkZXMgYSBzdGF0ZSB2YWx1ZSBpZiB0aGUgY3VycmVudCBzdGF0ZSBpcyBgdW5kZWZpbmVkYCwgYXMgaXQgaXMgaW5pdGlhbGx5LlxuICogQHBhcmFtIG9ucyBBc3NvY2lhdGlvbnMgYmV0d2VlbiBhY3Rpb25zIGFuZCBzdGF0ZSBjaGFuZ2VzLlxuICogQHJldHVybnMgQSByZWR1Y2VyIGZ1bmN0aW9uLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogLSBNdXN0IGJlIHVzZWQgd2l0aCBgQWN0aW9uQ3JlYXRvcmAncyAocmV0dXJuZWQgYnkgYGNyZWF0ZUFjdGlvbmApLiBDYW5ub3QgYmUgdXNlZCB3aXRoIGNsYXNzLWJhc2VkIGFjdGlvbiBjcmVhdG9ycy5cbiAqIC0gVGhlIHJldHVybmVkIGBBY3Rpb25SZWR1Y2VyYCBzaG91bGQgYWRkaXRpb25hbGx5IGJlIHdyYXBwZWQgd2l0aCBhbm90aGVyIGZ1bmN0aW9uLCBpZiB5b3UgYXJlIHVzaW5nIFZpZXcgRW5naW5lIEFPVC5cbiAqIEluIGNhc2UgeW91IGFyZSB1c2luZyBJdnkgKG9yIG9ubHkgSklUIFZpZXcgRW5naW5lKSB0aGUgZXh0cmEgd3JhcHBlciBmdW5jdGlvbiBpcyBub3QgcmVxdWlyZWQuXG4gKlxuICogKipEZWNsYXJpbmcgYSByZWR1Y2VyIGNyZWF0b3IqKlxuICpcbiAqIGBgYHRzXG4gKiBleHBvcnQgY29uc3QgcmVkdWNlciA9IGNyZWF0ZVJlZHVjZXIoXG4gKiAgIGluaXRpYWxTdGF0ZSxcbiAqICAgb24oXG4gKiAgICAgZmVhdHVyZUFjdGlvbnMuYWN0aW9uT25lLFxuICogICAgIGZlYXR1cmVBY3Rpb25zLmFjdGlvblR3byxcbiAqICAgICAoc3RhdGUsIHsgdXBkYXRlZFZhbHVlIH0pID0+ICh7IC4uLnN0YXRlLCBwcm9wOiB1cGRhdGVkVmFsdWUgfSlcbiAqICAgKSxcbiAqICAgb24oZmVhdHVyZUFjdGlvbnMuYWN0aW9uVGhyZWUsICgpID0+IGluaXRpYWxTdGF0ZSk7XG4gKiApO1xuICogYGBgXG4gKlxuICogKipEZWNsYXJpbmcgYSByZWR1Y2VyIGNyZWF0b3IgdXNpbmcgYSB3cmFwcGVyIGZ1bmN0aW9uIChPbmx5IG5lZWRlZCBpZiB1c2luZyBWaWV3IEVuZ2luZSBBT1QpKipcbiAqXG4gKiBgYGB0c1xuICogY29uc3QgZmVhdHVyZVJlZHVjZXIgPSBjcmVhdGVSZWR1Y2VyKFxuICogICBpbml0aWFsU3RhdGUsXG4gKiAgIG9uKFxuICogICAgIGZlYXR1cmVBY3Rpb25zLmFjdGlvbk9uZSxcbiAqICAgICBmZWF0dXJlQWN0aW9ucy5hY3Rpb25Ud28sXG4gKiAgICAgKHN0YXRlLCB7IHVwZGF0ZWRWYWx1ZSB9KSA9PiAoeyAuLi5zdGF0ZSwgcHJvcDogdXBkYXRlZFZhbHVlIH0pXG4gKiAgICksXG4gKiAgIG9uKGZlYXR1cmVBY3Rpb25zLmFjdGlvblRocmVlLCAoKSA9PiBpbml0aWFsU3RhdGUpO1xuICogKTtcbiAqXG4gKiBleHBvcnQgZnVuY3Rpb24gcmVkdWNlcihzdGF0ZTogU3RhdGUgfCB1bmRlZmluZWQsIGFjdGlvbjogQWN0aW9uKSB7XG4gKiAgIHJldHVybiBmZWF0dXJlUmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVkdWNlcjxTLCBBIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgaW5pdGlhbFN0YXRlOiBTLFxuICAuLi5vbnM6IFJlZHVjZXJUeXBlczxTPltdXG4pOiBBY3Rpb25SZWR1Y2VyPFMsIEE+IHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIEFjdGlvblJlZHVjZXI8UywgQT4+KCk7XG4gIGZvciAobGV0IG9uIG9mIG9ucykge1xuICAgIGZvciAobGV0IHR5cGUgb2Ygb24udHlwZXMpIHtcbiAgICAgIGlmIChtYXAuaGFzKHR5cGUpKSB7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nUmVkdWNlciA9IG1hcC5nZXQodHlwZSkgYXMgQWN0aW9uUmVkdWNlcjxTLCBBPjtcbiAgICAgICAgY29uc3QgbmV3UmVkdWNlcjogQWN0aW9uUmVkdWNlcjxTLCBBPiA9IChzdGF0ZSwgYWN0aW9uKSA9PlxuICAgICAgICAgIG9uLnJlZHVjZXIoZXhpc3RpbmdSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pLCBhY3Rpb24pO1xuICAgICAgICBtYXAuc2V0KHR5cGUsIG5ld1JlZHVjZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFwLnNldCh0eXBlLCBvbi5yZWR1Y2VyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKHN0YXRlOiBTID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IEEpOiBTIHtcbiAgICBjb25zdCByZWR1Y2VyID0gbWFwLmdldChhY3Rpb24udHlwZSk7XG4gICAgcmV0dXJuIHJlZHVjZXIgPyByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIDogc3RhdGU7XG4gIH07XG59XG4iXX0=