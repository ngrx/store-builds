import * as tslib_1 from "tslib";
/**
 * @description
 * Associates actions with a given state change function.
 * A state change function must be provided as the last parameter.
 *
 * @param args `ActionCreator`'s followed by a state change function.
 *
 * **To maintain type-safety**: pass 10 or less `ActionCreator`'s.
 * @returns an association of action types with a state change function.
 */
export function on() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var reducer = args.pop();
    var types = args.reduce(function (result, creator) { return tslib_1.__spread(result, [creator.type]); }, []);
    return { reducer: reducer, types: types };
}
/**
 * @description
 * Creates a reducer function to handle state transitions.
 *
 * Reducer creators reduce the explicitness of reducer functions with switch statements.
 *
 * @param initialState Provides a state value if the current state is `undefined`, as it is initially.
 * @param ons Associations between actions and state changes.
 * @returns A reducer function.
 *
 * @usageNotes
 *
 * - Must be used with `ActionCreator`'s (returned by `createAction`).  Cannot be used with class-based action creators.
 * - An action type should only be associated with at most one state change function, similar to switch statements.
 *   - In the case this is violated, the latest defined associated will be used (the latest `on` function passed).
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
 */
export function createReducer(initialState) {
    var e_1, _a, e_2, _b;
    var ons = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        ons[_i - 1] = arguments[_i];
    }
    var map = new Map();
    try {
        for (var ons_1 = tslib_1.__values(ons), ons_1_1 = ons_1.next(); !ons_1_1.done; ons_1_1 = ons_1.next()) {
            var on_1 = ons_1_1.value;
            try {
                for (var _c = tslib_1.__values(on_1.types), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var type = _d.value;
                    map.set(type, on_1.reducer);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (ons_1_1 && !ons_1_1.done && (_a = ons_1.return)) _a.call(ons_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return function (state, action) {
        if (state === void 0) { state = initialState; }
        var reducer = map.get(action.type);
        return reducer ? reducer(state, action) : state;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUEwS0E7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxVQUFVLEVBQUU7SUFDaEIsY0FBcUM7U0FBckMsVUFBcUMsRUFBckMscUJBQXFDLEVBQXJDLElBQXFDO1FBQXJDLHlCQUFxQzs7SUFFckMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBYyxDQUFDO0lBQ3ZDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQ3ZCLFVBQUMsTUFBTSxFQUFFLE9BQU8sSUFBSyx3QkFBSSxNQUFNLEdBQUcsT0FBeUIsQ0FBQyxJQUFJLElBQTNDLENBQTRDLEVBQ2pFLEVBQWMsQ0FDZixDQUFDO0lBQ0YsT0FBTyxFQUFFLE9BQU8sU0FBQSxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQzNCLFlBQWU7O0lBQ2YsYUFBZTtTQUFmLFVBQWUsRUFBZixxQkFBZSxFQUFmLElBQWU7UUFBZiw0QkFBZTs7SUFFZixJQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBNEIsQ0FBQzs7UUFDaEQsS0FBZSxJQUFBLFFBQUEsaUJBQUEsR0FBRyxDQUFBLHdCQUFBLHlDQUFFO1lBQWYsSUFBSSxJQUFFLGdCQUFBOztnQkFDVCxLQUFpQixJQUFBLEtBQUEsaUJBQUEsSUFBRSxDQUFDLEtBQUssQ0FBQSxnQkFBQSw0QkFBRTtvQkFBdEIsSUFBSSxJQUFJLFdBQUE7b0JBQ1gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUMzQjs7Ozs7Ozs7O1NBQ0Y7Ozs7Ozs7OztJQUVELE9BQU8sVUFBUyxLQUF1QixFQUFFLE1BQWM7UUFBdkMsc0JBQUEsRUFBQSxvQkFBdUI7UUFDckMsSUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsRCxDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uQ3JlYXRvciwgQWN0aW9uUmVkdWNlciwgQWN0aW9uVHlwZSwgQWN0aW9uIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG4vLyBSZXR1cm4gdHlwZSBvZiB0aGUgYG9uYCBmbi5cbmV4cG9ydCBpbnRlcmZhY2UgT248Uz4ge1xuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFM+O1xuICB0eXBlczogc3RyaW5nW107XG59XG5cbi8vIFNwZWNpYWxpemVkIFJlZHVjZXIgdGhhdCBpcyBhd2FyZSBvZiB0aGUgQWN0aW9uIHR5cGUgaXQgbmVlZHMgdG8gaGFuZGxlXG5leHBvcnQgaW50ZXJmYWNlIE9uUmVkdWNlcjxTLCBDIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcltdPiB7XG4gIChzdGF0ZTogUywgYWN0aW9uOiBBY3Rpb25UeXBlPENbbnVtYmVyXT4pOiBTO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb248QzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLCBTPihcbiAgY3JlYXRvcjE6IEMxLFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxXT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvciwgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLCBTPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyXT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzNdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248XG4gIEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM0IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgU1xuPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIGNyZWF0b3IzOiBDMyxcbiAgY3JlYXRvcjQ6IEM0LFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzMsIEM0XT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM1IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgU1xuPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIGNyZWF0b3IzOiBDMyxcbiAgY3JlYXRvcjQ6IEM0LFxuICBjcmVhdG9yNTogQzUsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyLCBDMywgQzQsIEM1XT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM1IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzYgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICBjcmVhdG9yNDogQzQsXG4gIGNyZWF0b3I1OiBDNSxcbiAgY3JlYXRvcjY6IEM2LFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzMsIEM0LCBDNSwgQzZdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248XG4gIEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM0IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzUgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM3IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgU1xuPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIGNyZWF0b3IzOiBDMyxcbiAgY3JlYXRvcjQ6IEM0LFxuICBjcmVhdG9yNTogQzUsXG4gIGNyZWF0b3I2OiBDNixcbiAgY3JlYXRvcjc6IEM3LFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzMsIEM0LCBDNSwgQzYsIEM3XT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM1IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzYgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM4IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgU1xuPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIGNyZWF0b3IzOiBDMyxcbiAgY3JlYXRvcjQ6IEM0LFxuICBjcmVhdG9yNTogQzUsXG4gIGNyZWF0b3I2OiBDNixcbiAgY3JlYXRvcjc6IEM3LFxuICBjcmVhdG9yODogQzgsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyLCBDMywgQzQsIEM1LCBDNiwgQzcsIEM4XT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM1IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzYgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM4IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzkgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICBjcmVhdG9yNDogQzQsXG4gIGNyZWF0b3I1OiBDNSxcbiAgY3JlYXRvcjY6IEM2LFxuICBjcmVhdG9yNzogQzcsXG4gIGNyZWF0b3I4OiBDOCxcbiAgY3JlYXRvcjk6IEM5LFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzMsIEM0LCBDNSwgQzYsIEM3LCBDOCwgQzldPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248XG4gIEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM0IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzUgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM3IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzggZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDOSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMxMCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIFNcbj4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICBjcmVhdG9yMzogQzMsXG4gIGNyZWF0b3I0OiBDNCxcbiAgY3JlYXRvcjU6IEM1LFxuICBjcmVhdG9yNjogQzYsXG4gIGNyZWF0b3I3OiBDNyxcbiAgY3JlYXRvcjg6IEM4LFxuICBjcmVhdG9yOTogQzksXG4gIGNyZWF0b3IxMDogQzEwLFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzMsIEM0LCBDNSwgQzYsIEM3LCBDOCwgQzksIEMxMF0+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxTPihcbiAgY3JlYXRvcjogQWN0aW9uQ3JlYXRvcixcbiAgLi4ucmVzdDogKEFjdGlvbkNyZWF0b3IgfCBPblJlZHVjZXI8UywgW0FjdGlvbkNyZWF0b3JdPilbXVxuKTogT248Uz47XG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQXNzb2NpYXRlcyBhY3Rpb25zIHdpdGggYSBnaXZlbiBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb24uXG4gKiBBIHN0YXRlIGNoYW5nZSBmdW5jdGlvbiBtdXN0IGJlIHByb3ZpZGVkIGFzIHRoZSBsYXN0IHBhcmFtZXRlci5cbiAqXG4gKiBAcGFyYW0gYXJncyBgQWN0aW9uQ3JlYXRvcmAncyBmb2xsb3dlZCBieSBhIHN0YXRlIGNoYW5nZSBmdW5jdGlvbi5cbiAqXG4gKiAqKlRvIG1haW50YWluIHR5cGUtc2FmZXR5Kio6IHBhc3MgMTAgb3IgbGVzcyBgQWN0aW9uQ3JlYXRvcmAncy5cbiAqIEByZXR1cm5zIGFuIGFzc29jaWF0aW9uIG9mIGFjdGlvbiB0eXBlcyB3aXRoIGEgc3RhdGUgY2hhbmdlIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gb24oXG4gIC4uLmFyZ3M6IChBY3Rpb25DcmVhdG9yIHwgRnVuY3Rpb24pW11cbik6IHsgcmVkdWNlcjogRnVuY3Rpb247IHR5cGVzOiBzdHJpbmdbXSB9IHtcbiAgY29uc3QgcmVkdWNlciA9IGFyZ3MucG9wKCkgYXMgRnVuY3Rpb247XG4gIGNvbnN0IHR5cGVzID0gYXJncy5yZWR1Y2UoXG4gICAgKHJlc3VsdCwgY3JlYXRvcikgPT4gWy4uLnJlc3VsdCwgKGNyZWF0b3IgYXMgQWN0aW9uQ3JlYXRvcikudHlwZV0sXG4gICAgW10gYXMgc3RyaW5nW11cbiAgKTtcbiAgcmV0dXJuIHsgcmVkdWNlciwgdHlwZXMgfTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENyZWF0ZXMgYSByZWR1Y2VyIGZ1bmN0aW9uIHRvIGhhbmRsZSBzdGF0ZSB0cmFuc2l0aW9ucy5cbiAqXG4gKiBSZWR1Y2VyIGNyZWF0b3JzIHJlZHVjZSB0aGUgZXhwbGljaXRuZXNzIG9mIHJlZHVjZXIgZnVuY3Rpb25zIHdpdGggc3dpdGNoIHN0YXRlbWVudHMuXG4gKlxuICogQHBhcmFtIGluaXRpYWxTdGF0ZSBQcm92aWRlcyBhIHN0YXRlIHZhbHVlIGlmIHRoZSBjdXJyZW50IHN0YXRlIGlzIGB1bmRlZmluZWRgLCBhcyBpdCBpcyBpbml0aWFsbHkuXG4gKiBAcGFyYW0gb25zIEFzc29jaWF0aW9ucyBiZXR3ZWVuIGFjdGlvbnMgYW5kIHN0YXRlIGNoYW5nZXMuXG4gKiBAcmV0dXJucyBBIHJlZHVjZXIgZnVuY3Rpb24uXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiAtIE11c3QgYmUgdXNlZCB3aXRoIGBBY3Rpb25DcmVhdG9yYCdzIChyZXR1cm5lZCBieSBgY3JlYXRlQWN0aW9uYCkuICBDYW5ub3QgYmUgdXNlZCB3aXRoIGNsYXNzLWJhc2VkIGFjdGlvbiBjcmVhdG9ycy5cbiAqIC0gQW4gYWN0aW9uIHR5cGUgc2hvdWxkIG9ubHkgYmUgYXNzb2NpYXRlZCB3aXRoIGF0IG1vc3Qgb25lIHN0YXRlIGNoYW5nZSBmdW5jdGlvbiwgc2ltaWxhciB0byBzd2l0Y2ggc3RhdGVtZW50cy5cbiAqICAgLSBJbiB0aGUgY2FzZSB0aGlzIGlzIHZpb2xhdGVkLCB0aGUgbGF0ZXN0IGRlZmluZWQgYXNzb2NpYXRlZCB3aWxsIGJlIHVzZWQgKHRoZSBsYXRlc3QgYG9uYCBmdW5jdGlvbiBwYXNzZWQpLlxuICogLSBUaGUgcmV0dXJuZWQgYEFjdGlvblJlZHVjZXJgIHNob3VsZCBhZGRpdGlvbmFsbHkgYmUgcmV0dXJuZWQgZnJvbSBhbiBleHBvcnRlZCBgcmVkdWNlcmAgZnVuY3Rpb24uXG4gKiBUaGlzIGlzIGJlY2F1c2UgW2Z1bmN0aW9uIGNhbGxzIGFyZSBub3Qgc3VwcG9ydGVkXShodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvYW90LWNvbXBpbGVyI2Z1bmN0aW9uLWNhbGxzLWFyZS1ub3Qtc3VwcG9ydGVkKSBieSB0aGUgQU9UIGNvbXBpbGVyLlxuICpcbiAqICoqRGVjbGFyaW5nIGEgcmVkdWNlciBjcmVhdG9yIHdpdGggYW4gZXhwb3J0ZWQgcmVkdWNlciBmdW5jdGlvbioqXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IGZlYXR1cmVSZWR1Y2VyID0gY3JlYXRlUmVkdWNlcihcbiAqICAgaW5pdGlhbFN0YXRlLFxuICogICBvbihcbiAqICAgICBmZWF0dXJlQWN0aW9ucy5hY3Rpb25PbmUsXG4gKiAgICAgZmVhdHVyZUFjdGlvbnMuYWN0aW9uVHdvLFxuICogICAgIChzdGF0ZSwgeyB1cGRhdGVkVmFsdWUgfSkgPT4gKHsgLi4uc3RhdGUsIHByb3A6IHVwZGF0ZWRWYWx1ZSB9KVxuICogICApLFxuICogICBvbihmZWF0dXJlQWN0aW9ucy5hY3Rpb25UaHJlZSwgKCkgPT4gaW5pdGlhbFN0YXRlKTtcbiAqICk7XG4gKlxuICogZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGU6IFN0YXRlIHwgdW5kZWZpbmVkLCBhY3Rpb246IEFjdGlvbikge1xuICogICByZXR1cm4gZmVhdHVyZVJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlZHVjZXI8Uz4oXG4gIGluaXRpYWxTdGF0ZTogUyxcbiAgLi4ub25zOiBPbjxTPltdXG4pOiBBY3Rpb25SZWR1Y2VyPFM+IHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIEFjdGlvblJlZHVjZXI8Uz4+KCk7XG4gIGZvciAobGV0IG9uIG9mIG9ucykge1xuICAgIGZvciAobGV0IHR5cGUgb2Ygb24udHlwZXMpIHtcbiAgICAgIG1hcC5zZXQodHlwZSwgb24ucmVkdWNlcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlOiBTID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IEFjdGlvbik6IFMge1xuICAgIGNvbnN0IHJlZHVjZXIgPSBtYXAuZ2V0KGFjdGlvbi50eXBlKTtcbiAgICByZXR1cm4gcmVkdWNlciA/IHJlZHVjZXIoc3RhdGUsIGFjdGlvbikgOiBzdGF0ZTtcbiAgfTtcbn1cbiJdfQ==