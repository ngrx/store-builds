/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/src/reducer_creator.ts
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
 * - The returned `ActionReducer` should additionally be returned from an exported `reducer` function, if you are using View Engine.
 * In case you are using Ivy the extra function `reducer` is not required.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUdBLHdCQUdDOzs7SUFGQyxxQkFBMEI7O0lBQzFCLG1CQUFnQjs7Ozs7O0FBSWxCLCtCQUVDOzs7Ozs7Ozs7OztBQXlLRCxNQUFNLFVBQVUsRUFBRSxDQUNoQixHQUFHLElBQWtDOztVQUUvQixPQUFPLEdBQUcsbUJBQUEsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFZOztVQUNoQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU07Ozs7O0lBQ3ZCLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLG1CQUFBLE9BQU8sRUFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUNqRSxtQkFBQSxFQUFFLEVBQVksQ0FDZjtJQUNELE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDNUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0NELE1BQU0sVUFBVSxhQUFhLENBQzNCLFlBQWUsRUFDZixHQUFHLEdBQVk7O1VBRVQsR0FBRyxHQUFHLElBQUksR0FBRyxFQUErQjtJQUNsRCxLQUFLLElBQUksRUFBRSxJQUFJLEdBQUcsRUFBRTtRQUNsQixLQUFLLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUU7WUFDekIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFOztzQkFDWCxlQUFlLEdBQUcsbUJBQUEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBdUI7O3NCQUN0RCxVQUFVOzs7OztnQkFBd0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FDeEQsRUFBRSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO2dCQUNwRCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0I7U0FDRjtLQUNGO0lBRUQ7Ozs7O0lBQU8sVUFBUyxRQUFXLFlBQVksRUFBRSxNQUFTOztjQUMxQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3BDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbEQsQ0FBQyxFQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbkNyZWF0b3IsIEFjdGlvblJlZHVjZXIsIEFjdGlvblR5cGUsIEFjdGlvbiB9IGZyb20gJy4vbW9kZWxzJztcblxuLy8gUmV0dXJuIHR5cGUgb2YgdGhlIGBvbmAgZm4uXG5leHBvcnQgaW50ZXJmYWNlIE9uPFM+IHtcbiAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxTPjtcbiAgdHlwZXM6IHN0cmluZ1tdO1xufVxuXG4vLyBTcGVjaWFsaXplZCBSZWR1Y2VyIHRoYXQgaXMgYXdhcmUgb2YgdGhlIEFjdGlvbiB0eXBlIGl0IG5lZWRzIHRvIGhhbmRsZVxuZXhwb3J0IGludGVyZmFjZSBPblJlZHVjZXI8UywgQyBleHRlbmRzIEFjdGlvbkNyZWF0b3JbXT4ge1xuICAoc3RhdGU6IFMsIGFjdGlvbjogQWN0aW9uVHlwZTxDW251bWJlcl0+KTogUztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uPEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvciwgUz4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMV0+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvciwgUz4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMl0+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxcbiAgQzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMzIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgU1xuPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIGNyZWF0b3IzOiBDMyxcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzIsIEMzXT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIFNcbj4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICBjcmVhdG9yMzogQzMsXG4gIGNyZWF0b3I0OiBDNCxcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzIsIEMzLCBDNF0+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxcbiAgQzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMzIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzQgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIFNcbj4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICBjcmVhdG9yMzogQzMsXG4gIGNyZWF0b3I0OiBDNCxcbiAgY3JlYXRvcjU6IEM1LFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzMsIEM0LCBDNV0+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxcbiAgQzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMzIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzQgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM2IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgU1xuPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIGNyZWF0b3IzOiBDMyxcbiAgY3JlYXRvcjQ6IEM0LFxuICBjcmVhdG9yNTogQzUsXG4gIGNyZWF0b3I2OiBDNixcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzIsIEMzLCBDNCwgQzUsIEM2XT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM1IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzYgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIFNcbj4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICBjcmVhdG9yMzogQzMsXG4gIGNyZWF0b3I0OiBDNCxcbiAgY3JlYXRvcjU6IEM1LFxuICBjcmVhdG9yNjogQzYsXG4gIGNyZWF0b3I3OiBDNyxcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzIsIEMzLCBDNCwgQzUsIEM2LCBDN10+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxcbiAgQzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMzIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzQgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM2IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzcgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDOCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIFNcbj4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICBjcmVhdG9yMzogQzMsXG4gIGNyZWF0b3I0OiBDNCxcbiAgY3JlYXRvcjU6IEM1LFxuICBjcmVhdG9yNjogQzYsXG4gIGNyZWF0b3I3OiBDNyxcbiAgY3JlYXRvcjg6IEM4LFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzMsIEM0LCBDNSwgQzYsIEM3LCBDOF0+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxcbiAgQzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMzIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzQgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM2IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzcgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDOCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM5IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgU1xuPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIGNyZWF0b3IzOiBDMyxcbiAgY3JlYXRvcjQ6IEM0LFxuICBjcmVhdG9yNTogQzUsXG4gIGNyZWF0b3I2OiBDNixcbiAgY3JlYXRvcjc6IEM3LFxuICBjcmVhdG9yODogQzgsXG4gIGNyZWF0b3I5OiBDOSxcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzIsIEMzLCBDNCwgQzUsIEM2LCBDNywgQzgsIEM5XT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM1IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzYgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM4IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzkgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMTAgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICBjcmVhdG9yNDogQzQsXG4gIGNyZWF0b3I1OiBDNSxcbiAgY3JlYXRvcjY6IEM2LFxuICBjcmVhdG9yNzogQzcsXG4gIGNyZWF0b3I4OiBDOCxcbiAgY3JlYXRvcjk6IEM5LFxuICBjcmVhdG9yMTA6IEMxMCxcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzIsIEMzLCBDNCwgQzUsIEM2LCBDNywgQzgsIEM5LCBDMTBdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248Uz4oXG4gIGNyZWF0b3I6IEFjdGlvbkNyZWF0b3IsXG4gIC4uLnJlc3Q6IChBY3Rpb25DcmVhdG9yIHwgT25SZWR1Y2VyPFMsIFtBY3Rpb25DcmVhdG9yXT4pW11cbik6IE9uPFM+O1xuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFzc29jaWF0ZXMgYWN0aW9ucyB3aXRoIGEgZ2l2ZW4gc3RhdGUgY2hhbmdlIGZ1bmN0aW9uLlxuICogQSBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb24gbXVzdCBiZSBwcm92aWRlZCBhcyB0aGUgbGFzdCBwYXJhbWV0ZXIuXG4gKlxuICogQHBhcmFtIGFyZ3MgYEFjdGlvbkNyZWF0b3JgJ3MgZm9sbG93ZWQgYnkgYSBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb24uXG4gKlxuICogKipUbyBtYWludGFpbiB0eXBlLXNhZmV0eSoqOiBwYXNzIDEwIG9yIGxlc3MgYEFjdGlvbkNyZWF0b3JgJ3MuXG4gKiBAcmV0dXJucyBhbiBhc3NvY2lhdGlvbiBvZiBhY3Rpb24gdHlwZXMgd2l0aCBhIHN0YXRlIGNoYW5nZSBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uKFxuICAuLi5hcmdzOiAoQWN0aW9uQ3JlYXRvciB8IEZ1bmN0aW9uKVtdXG4pOiB7IHJlZHVjZXI6IEZ1bmN0aW9uOyB0eXBlczogc3RyaW5nW10gfSB7XG4gIGNvbnN0IHJlZHVjZXIgPSBhcmdzLnBvcCgpIGFzIEZ1bmN0aW9uO1xuICBjb25zdCB0eXBlcyA9IGFyZ3MucmVkdWNlKFxuICAgIChyZXN1bHQsIGNyZWF0b3IpID0+IFsuLi5yZXN1bHQsIChjcmVhdG9yIGFzIEFjdGlvbkNyZWF0b3IpLnR5cGVdLFxuICAgIFtdIGFzIHN0cmluZ1tdXG4gICk7XG4gIHJldHVybiB7IHJlZHVjZXIsIHR5cGVzIH07XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDcmVhdGVzIGEgcmVkdWNlciBmdW5jdGlvbiB0byBoYW5kbGUgc3RhdGUgdHJhbnNpdGlvbnMuXG4gKlxuICogUmVkdWNlciBjcmVhdG9ycyByZWR1Y2UgdGhlIGV4cGxpY2l0bmVzcyBvZiByZWR1Y2VyIGZ1bmN0aW9ucyB3aXRoIHN3aXRjaCBzdGF0ZW1lbnRzLlxuICpcbiAqIEBwYXJhbSBpbml0aWFsU3RhdGUgUHJvdmlkZXMgYSBzdGF0ZSB2YWx1ZSBpZiB0aGUgY3VycmVudCBzdGF0ZSBpcyBgdW5kZWZpbmVkYCwgYXMgaXQgaXMgaW5pdGlhbGx5LlxuICogQHBhcmFtIG9ucyBBc3NvY2lhdGlvbnMgYmV0d2VlbiBhY3Rpb25zIGFuZCBzdGF0ZSBjaGFuZ2VzLlxuICogQHJldHVybnMgQSByZWR1Y2VyIGZ1bmN0aW9uLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogLSBNdXN0IGJlIHVzZWQgd2l0aCBgQWN0aW9uQ3JlYXRvcmAncyAocmV0dXJuZWQgYnkgYGNyZWF0ZUFjdGlvbmApLiAgQ2Fubm90IGJlIHVzZWQgd2l0aCBjbGFzcy1iYXNlZCBhY3Rpb24gY3JlYXRvcnMuXG4gKiAtIFRoZSByZXR1cm5lZCBgQWN0aW9uUmVkdWNlcmAgc2hvdWxkIGFkZGl0aW9uYWxseSBiZSByZXR1cm5lZCBmcm9tIGFuIGV4cG9ydGVkIGByZWR1Y2VyYCBmdW5jdGlvbiwgaWYgeW91IGFyZSB1c2luZyBWaWV3IEVuZ2luZS5cbiAqIEluIGNhc2UgeW91IGFyZSB1c2luZyBJdnkgdGhlIGV4dHJhIGZ1bmN0aW9uIGByZWR1Y2VyYCBpcyBub3QgcmVxdWlyZWQuXG4gKlxuICogKipEZWNsYXJpbmcgYSByZWR1Y2VyIGNyZWF0b3Igd2l0aCBhbiBleHBvcnRlZCByZWR1Y2VyIGZ1bmN0aW9uKipcbiAqXG4gKiBgYGB0c1xuICogY29uc3QgZmVhdHVyZVJlZHVjZXIgPSBjcmVhdGVSZWR1Y2VyKFxuICogICBpbml0aWFsU3RhdGUsXG4gKiAgIG9uKFxuICogICAgIGZlYXR1cmVBY3Rpb25zLmFjdGlvbk9uZSxcbiAqICAgICBmZWF0dXJlQWN0aW9ucy5hY3Rpb25Ud28sXG4gKiAgICAgKHN0YXRlLCB7IHVwZGF0ZWRWYWx1ZSB9KSA9PiAoeyAuLi5zdGF0ZSwgcHJvcDogdXBkYXRlZFZhbHVlIH0pXG4gKiAgICksXG4gKiAgIG9uKGZlYXR1cmVBY3Rpb25zLmFjdGlvblRocmVlLCAoKSA9PiBpbml0aWFsU3RhdGUpO1xuICogKTtcbiAqXG4gKiBleHBvcnQgZnVuY3Rpb24gcmVkdWNlcihzdGF0ZTogU3RhdGUgfCB1bmRlZmluZWQsIGFjdGlvbjogQWN0aW9uKSB7XG4gKiAgIHJldHVybiBmZWF0dXJlUmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVkdWNlcjxTLCBBIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgaW5pdGlhbFN0YXRlOiBTLFxuICAuLi5vbnM6IE9uPFM+W11cbik6IEFjdGlvblJlZHVjZXI8UywgQT4ge1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgQWN0aW9uUmVkdWNlcjxTLCBBPj4oKTtcbiAgZm9yIChsZXQgb24gb2Ygb25zKSB7XG4gICAgZm9yIChsZXQgdHlwZSBvZiBvbi50eXBlcykge1xuICAgICAgaWYgKG1hcC5oYXModHlwZSkpIHtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdSZWR1Y2VyID0gbWFwLmdldCh0eXBlKSBhcyBBY3Rpb25SZWR1Y2VyPFMsIEE+O1xuICAgICAgICBjb25zdCBuZXdSZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFMsIEE+ID0gKHN0YXRlLCBhY3Rpb24pID0+XG4gICAgICAgICAgb24ucmVkdWNlcihleGlzdGluZ1JlZHVjZXIoc3RhdGUsIGFjdGlvbiksIGFjdGlvbik7XG4gICAgICAgIG1hcC5zZXQodHlwZSwgbmV3UmVkdWNlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXAuc2V0KHR5cGUsIG9uLnJlZHVjZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihzdGF0ZTogUyA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBKTogUyB7XG4gICAgY29uc3QgcmVkdWNlciA9IG1hcC5nZXQoYWN0aW9uLnR5cGUpO1xuICAgIHJldHVybiByZWR1Y2VyID8gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKSA6IHN0YXRlO1xuICB9O1xufVxuIl19