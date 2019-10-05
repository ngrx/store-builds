/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @param {...?} args `ActionCreator`'s followed by a state change function.
 *
 * **To maintain type-safety**: pass 10 or less `ActionCreator`'s.
 * @return {?} an association of action types with a state change function.
 */
export function on(...args) {
    /** @type {?} */
    const reducer = (/** @type {?} */ (args.pop()));
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
 * - Must be used with `ActionCreator`'s (returned by `createAction`).  Cannot be used with class-based action creators.
 * - An action can be associated with multiple state change functions. In this case the functions will be executed in the specified order.
 * - The returned `ActionReducer` should additionally be returned from an exported `reducer` function.
 * This is because [function calls are not supported](https://angular.io/guide/aot-compiler#function-calls-are-not-supported) by the AOT compiler.
 *
 * **Declaring a reducer creator with an exported reducer function**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0Esd0JBR0M7OztJQUZDLHFCQUEwQjs7SUFDMUIsbUJBQWdCOzs7Ozs7QUFJbEIsK0JBRUM7Ozs7Ozs7Ozs7O0FBeUtELE1BQU0sVUFBVSxFQUFFLENBQ2hCLEdBQUcsSUFBa0M7O1VBRS9CLE9BQU8sR0FBRyxtQkFBQSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQVk7O1VBQ2hDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTTs7Ozs7SUFDdkIsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsbUJBQUEsT0FBTyxFQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQ2pFLG1CQUFBLEVBQUUsRUFBWSxDQUNmO0lBQ0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUM1QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUNELE1BQU0sVUFBVSxhQUFhLENBQzNCLFlBQWUsRUFDZixHQUFHLEdBQVk7O1VBRVQsR0FBRyxHQUFHLElBQUksR0FBRyxFQUErQjtJQUNsRCxLQUFLLElBQUksRUFBRSxJQUFJLEdBQUcsRUFBRTtRQUNsQixLQUFLLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUU7WUFDekIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFOztzQkFDWCxlQUFlLEdBQUcsbUJBQUEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBdUI7O3NCQUN0RCxVQUFVOzs7OztnQkFBd0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FDeEQsRUFBRSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO2dCQUNwRCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0I7U0FDRjtLQUNGO0lBRUQ7Ozs7O0lBQU8sVUFBUyxRQUFXLFlBQVksRUFBRSxNQUFTOztjQUMxQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3BDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbEQsQ0FBQyxFQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbkNyZWF0b3IsIEFjdGlvblJlZHVjZXIsIEFjdGlvblR5cGUsIEFjdGlvbiB9IGZyb20gJy4vbW9kZWxzJztcblxuLy8gUmV0dXJuIHR5cGUgb2YgdGhlIGBvbmAgZm4uXG5leHBvcnQgaW50ZXJmYWNlIE9uPFM+IHtcbiAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxTPjtcbiAgdHlwZXM6IHN0cmluZ1tdO1xufVxuXG4vLyBTcGVjaWFsaXplZCBSZWR1Y2VyIHRoYXQgaXMgYXdhcmUgb2YgdGhlIEFjdGlvbiB0eXBlIGl0IG5lZWRzIHRvIGhhbmRsZVxuZXhwb3J0IGludGVyZmFjZSBPblJlZHVjZXI8UywgQyBleHRlbmRzIEFjdGlvbkNyZWF0b3JbXT4ge1xuICAoc3RhdGU6IFMsIGFjdGlvbjogQWN0aW9uVHlwZTxDW251bWJlcl0+KTogUztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uPEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvciwgUz4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMV0+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvciwgUz4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMl0+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxcbiAgQzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMzIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgU1xuPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIGNyZWF0b3IzOiBDMyxcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzIsIEMzXT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIFNcbj4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICBjcmVhdG9yMzogQzMsXG4gIGNyZWF0b3I0OiBDNCxcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzIsIEMzLCBDNF0+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxcbiAgQzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMzIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzQgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIFNcbj4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICBjcmVhdG9yMzogQzMsXG4gIGNyZWF0b3I0OiBDNCxcbiAgY3JlYXRvcjU6IEM1LFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzMsIEM0LCBDNV0+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxcbiAgQzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMzIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzQgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM2IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgU1xuPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIGNyZWF0b3IzOiBDMyxcbiAgY3JlYXRvcjQ6IEM0LFxuICBjcmVhdG9yNTogQzUsXG4gIGNyZWF0b3I2OiBDNixcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzIsIEMzLCBDNCwgQzUsIEM2XT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM1IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzYgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIFNcbj4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICBjcmVhdG9yMzogQzMsXG4gIGNyZWF0b3I0OiBDNCxcbiAgY3JlYXRvcjU6IEM1LFxuICBjcmVhdG9yNjogQzYsXG4gIGNyZWF0b3I3OiBDNyxcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzIsIEMzLCBDNCwgQzUsIEM2LCBDN10+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxcbiAgQzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMzIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzQgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM2IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzcgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDOCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIFNcbj4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICBjcmVhdG9yMzogQzMsXG4gIGNyZWF0b3I0OiBDNCxcbiAgY3JlYXRvcjU6IEM1LFxuICBjcmVhdG9yNjogQzYsXG4gIGNyZWF0b3I3OiBDNyxcbiAgY3JlYXRvcjg6IEM4LFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzMsIEM0LCBDNSwgQzYsIEM3LCBDOF0+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxcbiAgQzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMzIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzQgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM2IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzcgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDOCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM5IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgU1xuPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIGNyZWF0b3IzOiBDMyxcbiAgY3JlYXRvcjQ6IEM0LFxuICBjcmVhdG9yNTogQzUsXG4gIGNyZWF0b3I2OiBDNixcbiAgY3JlYXRvcjc6IEM3LFxuICBjcmVhdG9yODogQzgsXG4gIGNyZWF0b3I5OiBDOSxcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzIsIEMzLCBDNCwgQzUsIEM2LCBDNywgQzgsIEM5XT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM1IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzYgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM4IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzkgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMTAgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICBjcmVhdG9yNDogQzQsXG4gIGNyZWF0b3I1OiBDNSxcbiAgY3JlYXRvcjY6IEM2LFxuICBjcmVhdG9yNzogQzcsXG4gIGNyZWF0b3I4OiBDOCxcbiAgY3JlYXRvcjk6IEM5LFxuICBjcmVhdG9yMTA6IEMxMCxcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzIsIEMzLCBDNCwgQzUsIEM2LCBDNywgQzgsIEM5LCBDMTBdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248Uz4oXG4gIGNyZWF0b3I6IEFjdGlvbkNyZWF0b3IsXG4gIC4uLnJlc3Q6IChBY3Rpb25DcmVhdG9yIHwgT25SZWR1Y2VyPFMsIFtBY3Rpb25DcmVhdG9yXT4pW11cbik6IE9uPFM+O1xuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFzc29jaWF0ZXMgYWN0aW9ucyB3aXRoIGEgZ2l2ZW4gc3RhdGUgY2hhbmdlIGZ1bmN0aW9uLlxuICogQSBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb24gbXVzdCBiZSBwcm92aWRlZCBhcyB0aGUgbGFzdCBwYXJhbWV0ZXIuXG4gKlxuICogQHBhcmFtIGFyZ3MgYEFjdGlvbkNyZWF0b3JgJ3MgZm9sbG93ZWQgYnkgYSBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb24uXG4gKlxuICogKipUbyBtYWludGFpbiB0eXBlLXNhZmV0eSoqOiBwYXNzIDEwIG9yIGxlc3MgYEFjdGlvbkNyZWF0b3JgJ3MuXG4gKiBAcmV0dXJucyBhbiBhc3NvY2lhdGlvbiBvZiBhY3Rpb24gdHlwZXMgd2l0aCBhIHN0YXRlIGNoYW5nZSBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uKFxuICAuLi5hcmdzOiAoQWN0aW9uQ3JlYXRvciB8IEZ1bmN0aW9uKVtdXG4pOiB7IHJlZHVjZXI6IEZ1bmN0aW9uOyB0eXBlczogc3RyaW5nW10gfSB7XG4gIGNvbnN0IHJlZHVjZXIgPSBhcmdzLnBvcCgpIGFzIEZ1bmN0aW9uO1xuICBjb25zdCB0eXBlcyA9IGFyZ3MucmVkdWNlKFxuICAgIChyZXN1bHQsIGNyZWF0b3IpID0+IFsuLi5yZXN1bHQsIChjcmVhdG9yIGFzIEFjdGlvbkNyZWF0b3IpLnR5cGVdLFxuICAgIFtdIGFzIHN0cmluZ1tdXG4gICk7XG4gIHJldHVybiB7IHJlZHVjZXIsIHR5cGVzIH07XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDcmVhdGVzIGEgcmVkdWNlciBmdW5jdGlvbiB0byBoYW5kbGUgc3RhdGUgdHJhbnNpdGlvbnMuXG4gKlxuICogUmVkdWNlciBjcmVhdG9ycyByZWR1Y2UgdGhlIGV4cGxpY2l0bmVzcyBvZiByZWR1Y2VyIGZ1bmN0aW9ucyB3aXRoIHN3aXRjaCBzdGF0ZW1lbnRzLlxuICpcbiAqIEBwYXJhbSBpbml0aWFsU3RhdGUgUHJvdmlkZXMgYSBzdGF0ZSB2YWx1ZSBpZiB0aGUgY3VycmVudCBzdGF0ZSBpcyBgdW5kZWZpbmVkYCwgYXMgaXQgaXMgaW5pdGlhbGx5LlxuICogQHBhcmFtIG9ucyBBc3NvY2lhdGlvbnMgYmV0d2VlbiBhY3Rpb25zIGFuZCBzdGF0ZSBjaGFuZ2VzLlxuICogQHJldHVybnMgQSByZWR1Y2VyIGZ1bmN0aW9uLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogLSBNdXN0IGJlIHVzZWQgd2l0aCBgQWN0aW9uQ3JlYXRvcmAncyAocmV0dXJuZWQgYnkgYGNyZWF0ZUFjdGlvbmApLiAgQ2Fubm90IGJlIHVzZWQgd2l0aCBjbGFzcy1iYXNlZCBhY3Rpb24gY3JlYXRvcnMuXG4gKiAtIEFuIGFjdGlvbiBjYW4gYmUgYXNzb2NpYXRlZCB3aXRoIG11bHRpcGxlIHN0YXRlIGNoYW5nZSBmdW5jdGlvbnMuIEluIHRoaXMgY2FzZSB0aGUgZnVuY3Rpb25zIHdpbGwgYmUgZXhlY3V0ZWQgaW4gdGhlIHNwZWNpZmllZCBvcmRlci5cbiAqIC0gVGhlIHJldHVybmVkIGBBY3Rpb25SZWR1Y2VyYCBzaG91bGQgYWRkaXRpb25hbGx5IGJlIHJldHVybmVkIGZyb20gYW4gZXhwb3J0ZWQgYHJlZHVjZXJgIGZ1bmN0aW9uLlxuICogVGhpcyBpcyBiZWNhdXNlIFtmdW5jdGlvbiBjYWxscyBhcmUgbm90IHN1cHBvcnRlZF0oaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2FvdC1jb21waWxlciNmdW5jdGlvbi1jYWxscy1hcmUtbm90LXN1cHBvcnRlZCkgYnkgdGhlIEFPVCBjb21waWxlci5cbiAqXG4gKiAqKkRlY2xhcmluZyBhIHJlZHVjZXIgY3JlYXRvciB3aXRoIGFuIGV4cG9ydGVkIHJlZHVjZXIgZnVuY3Rpb24qKlxuICpcbiAqIGBgYHRzXG4gKiBjb25zdCBmZWF0dXJlUmVkdWNlciA9IGNyZWF0ZVJlZHVjZXIoXG4gKiAgIGluaXRpYWxTdGF0ZSxcbiAqICAgb24oXG4gKiAgICAgZmVhdHVyZUFjdGlvbnMuYWN0aW9uT25lLFxuICogICAgIGZlYXR1cmVBY3Rpb25zLmFjdGlvblR3byxcbiAqICAgICAoc3RhdGUsIHsgdXBkYXRlZFZhbHVlIH0pID0+ICh7IC4uLnN0YXRlLCBwcm9wOiB1cGRhdGVkVmFsdWUgfSlcbiAqICAgKSxcbiAqICAgb24oZmVhdHVyZUFjdGlvbnMuYWN0aW9uVGhyZWUsICgpID0+IGluaXRpYWxTdGF0ZSk7XG4gKiApO1xuICpcbiAqIGV4cG9ydCBmdW5jdGlvbiByZWR1Y2VyKHN0YXRlOiBTdGF0ZSB8IHVuZGVmaW5lZCwgYWN0aW9uOiBBY3Rpb24pIHtcbiAqICAgcmV0dXJuIGZlYXR1cmVSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWR1Y2VyPFMsIEEgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICBpbml0aWFsU3RhdGU6IFMsXG4gIC4uLm9uczogT248Uz5bXVxuKTogQWN0aW9uUmVkdWNlcjxTLCBBPiB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBBY3Rpb25SZWR1Y2VyPFMsIEE+PigpO1xuICBmb3IgKGxldCBvbiBvZiBvbnMpIHtcbiAgICBmb3IgKGxldCB0eXBlIG9mIG9uLnR5cGVzKSB7XG4gICAgICBpZiAobWFwLmhhcyh0eXBlKSkge1xuICAgICAgICBjb25zdCBleGlzdGluZ1JlZHVjZXIgPSBtYXAuZ2V0KHR5cGUpIGFzIEFjdGlvblJlZHVjZXI8UywgQT47XG4gICAgICAgIGNvbnN0IG5ld1JlZHVjZXI6IEFjdGlvblJlZHVjZXI8UywgQT4gPSAoc3RhdGUsIGFjdGlvbikgPT5cbiAgICAgICAgICBvbi5yZWR1Y2VyKGV4aXN0aW5nUmVkdWNlcihzdGF0ZSwgYWN0aW9uKSwgYWN0aW9uKTtcbiAgICAgICAgbWFwLnNldCh0eXBlLCBuZXdSZWR1Y2VyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcC5zZXQodHlwZSwgb24ucmVkdWNlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlOiBTID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IEEpOiBTIHtcbiAgICBjb25zdCByZWR1Y2VyID0gbWFwLmdldChhY3Rpb24udHlwZSk7XG4gICAgcmV0dXJuIHJlZHVjZXIgPyByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIDogc3RhdGU7XG4gIH07XG59XG4iXX0=