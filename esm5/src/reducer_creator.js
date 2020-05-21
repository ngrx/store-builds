import { __read, __spread, __values } from "tslib";
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
    var types = args.reduce(function (result, creator) { return __spread(result, [creator.type]); }, []);
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
 */
export function createReducer(initialState) {
    var e_1, _a;
    var ons = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        ons[_i - 1] = arguments[_i];
    }
    var map = new Map();
    var _loop_1 = function (on_1) {
        var e_2, _a;
        var _loop_2 = function (type) {
            if (map.has(type)) {
                var existingReducer_1 = map.get(type);
                var newReducer = function (state, action) {
                    return on_1.reducer(existingReducer_1(state, action), action);
                };
                map.set(type, newReducer);
            }
            else {
                map.set(type, on_1.reducer);
            }
        };
        try {
            for (var _b = (e_2 = void 0, __values(on_1.types)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var type = _c.value;
                _loop_2(type);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    try {
        for (var ons_1 = __values(ons), ons_1_1 = ons_1.next(); !ons_1_1.done; ons_1_1 = ons_1.next()) {
            var on_1 = ons_1_1.value;
            _loop_1(on_1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUEwS0E7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxVQUFVLEVBQUU7SUFDaEIsY0FBcUM7U0FBckMsVUFBcUMsRUFBckMscUJBQXFDLEVBQXJDLElBQXFDO1FBQXJDLHlCQUFxQzs7SUFFckMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBYyxDQUFDO0lBQ3ZDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQ3ZCLFVBQUMsTUFBTSxFQUFFLE9BQU8sSUFBSyxnQkFBSSxNQUFNLEdBQUcsT0FBeUIsQ0FBQyxJQUFJLElBQTNDLENBQTRDLEVBQ2pFLEVBQWMsQ0FDZixDQUFDO0lBQ0YsT0FBTyxFQUFFLE9BQU8sU0FBQSxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFDSCxNQUFNLFVBQVUsYUFBYSxDQUMzQixZQUFlOztJQUNmLGFBQWU7U0FBZixVQUFlLEVBQWYscUJBQWUsRUFBZixJQUFlO1FBQWYsNEJBQWU7O0lBRWYsSUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQStCLENBQUM7NEJBQzFDLElBQUU7O2dDQUNBLElBQUk7WUFDWCxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2pCLElBQU0saUJBQWUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBd0IsQ0FBQztnQkFDN0QsSUFBTSxVQUFVLEdBQXdCLFVBQUMsS0FBSyxFQUFFLE1BQU07b0JBQ3BELE9BQUEsSUFBRSxDQUFDLE9BQU8sQ0FBQyxpQkFBZSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUM7Z0JBQWxELENBQWtELENBQUM7Z0JBQ3JELEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzNCO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMzQjs7O1lBUkgsS0FBaUIsSUFBQSxvQkFBQSxTQUFBLElBQUUsQ0FBQyxLQUFLLENBQUEsQ0FBQSxnQkFBQTtnQkFBcEIsSUFBSSxJQUFJLFdBQUE7d0JBQUosSUFBSTthQVNaOzs7Ozs7Ozs7OztRQVZILEtBQWUsSUFBQSxRQUFBLFNBQUEsR0FBRyxDQUFBLHdCQUFBO1lBQWIsSUFBSSxJQUFFLGdCQUFBO29CQUFGLElBQUU7U0FXVjs7Ozs7Ozs7O0lBRUQsT0FBTyxVQUFTLEtBQXVCLEVBQUUsTUFBUztRQUFsQyxzQkFBQSxFQUFBLG9CQUF1QjtRQUNyQyxJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2xELENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25DcmVhdG9yLCBBY3Rpb25SZWR1Y2VyLCBBY3Rpb25UeXBlLCBBY3Rpb24gfSBmcm9tICcuL21vZGVscyc7XG5cbi8vIFJldHVybiB0eXBlIG9mIHRoZSBgb25gIGZuLlxuZXhwb3J0IGludGVyZmFjZSBPbjxTPiB7XG4gIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8Uz47XG4gIHR5cGVzOiBzdHJpbmdbXTtcbn1cblxuLy8gU3BlY2lhbGl6ZWQgUmVkdWNlciB0aGF0IGlzIGF3YXJlIG9mIHRoZSBBY3Rpb24gdHlwZSBpdCBuZWVkcyB0byBoYW5kbGVcbmV4cG9ydCBpbnRlcmZhY2UgT25SZWR1Y2VyPFMsIEMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yW10+IHtcbiAgKHN0YXRlOiBTLCBhY3Rpb246IEFjdGlvblR5cGU8Q1tudW1iZXJdPik6IFM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbjxDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsIFM+KFxuICBjcmVhdG9yMTogQzEsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzFdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248QzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLCBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsIFM+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzJdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248XG4gIEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIFNcbj4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICBjcmVhdG9yMzogQzMsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyLCBDM10+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxcbiAgQzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMzIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzQgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICBjcmVhdG9yNDogQzQsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyLCBDMywgQzRdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248XG4gIEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM0IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzUgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICBjcmVhdG9yNDogQzQsXG4gIGNyZWF0b3I1OiBDNSxcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzIsIEMzLCBDNCwgQzVdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248XG4gIEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM0IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzUgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIFNcbj4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICBjcmVhdG9yMzogQzMsXG4gIGNyZWF0b3I0OiBDNCxcbiAgY3JlYXRvcjU6IEM1LFxuICBjcmVhdG9yNjogQzYsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyLCBDMywgQzQsIEM1LCBDNl0+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxcbiAgQzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMzIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzQgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM2IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzcgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICBjcmVhdG9yNDogQzQsXG4gIGNyZWF0b3I1OiBDNSxcbiAgY3JlYXRvcjY6IEM2LFxuICBjcmVhdG9yNzogQzcsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyLCBDMywgQzQsIEM1LCBDNiwgQzddPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248XG4gIEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM0IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzUgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM3IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzggZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICBjcmVhdG9yNDogQzQsXG4gIGNyZWF0b3I1OiBDNSxcbiAgY3JlYXRvcjY6IEM2LFxuICBjcmVhdG9yNzogQzcsXG4gIGNyZWF0b3I4OiBDOCxcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzIsIEMzLCBDNCwgQzUsIEM2LCBDNywgQzhdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248XG4gIEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM0IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzUgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM3IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzggZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDOSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIFNcbj4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICBjcmVhdG9yMzogQzMsXG4gIGNyZWF0b3I0OiBDNCxcbiAgY3JlYXRvcjU6IEM1LFxuICBjcmVhdG9yNjogQzYsXG4gIGNyZWF0b3I3OiBDNyxcbiAgY3JlYXRvcjg6IEM4LFxuICBjcmVhdG9yOTogQzksXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyLCBDMywgQzQsIEM1LCBDNiwgQzcsIEM4LCBDOV0+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxcbiAgQzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMzIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzQgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM2IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzcgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDOCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM5IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzEwIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgU1xuPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIGNyZWF0b3IzOiBDMyxcbiAgY3JlYXRvcjQ6IEM0LFxuICBjcmVhdG9yNTogQzUsXG4gIGNyZWF0b3I2OiBDNixcbiAgY3JlYXRvcjc6IEM3LFxuICBjcmVhdG9yODogQzgsXG4gIGNyZWF0b3I5OiBDOSxcbiAgY3JlYXRvcjEwOiBDMTAsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyLCBDMywgQzQsIEM1LCBDNiwgQzcsIEM4LCBDOSwgQzEwXT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFM+KFxuICBjcmVhdG9yOiBBY3Rpb25DcmVhdG9yLFxuICAuLi5yZXN0OiAoQWN0aW9uQ3JlYXRvciB8IE9uUmVkdWNlcjxTLCBbQWN0aW9uQ3JlYXRvcl0+KVtdXG4pOiBPbjxTPjtcbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBc3NvY2lhdGVzIGFjdGlvbnMgd2l0aCBhIGdpdmVuIHN0YXRlIGNoYW5nZSBmdW5jdGlvbi5cbiAqIEEgc3RhdGUgY2hhbmdlIGZ1bmN0aW9uIG11c3QgYmUgcHJvdmlkZWQgYXMgdGhlIGxhc3QgcGFyYW1ldGVyLlxuICpcbiAqIEBwYXJhbSBhcmdzIGBBY3Rpb25DcmVhdG9yYCdzIGZvbGxvd2VkIGJ5IGEgc3RhdGUgY2hhbmdlIGZ1bmN0aW9uLlxuICpcbiAqICoqVG8gbWFpbnRhaW4gdHlwZS1zYWZldHkqKjogcGFzcyAxMCBvciBsZXNzIGBBY3Rpb25DcmVhdG9yYCdzLlxuICogQHJldHVybnMgYW4gYXNzb2NpYXRpb24gb2YgYWN0aW9uIHR5cGVzIHdpdGggYSBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvbihcbiAgLi4uYXJnczogKEFjdGlvbkNyZWF0b3IgfCBGdW5jdGlvbilbXVxuKTogeyByZWR1Y2VyOiBGdW5jdGlvbjsgdHlwZXM6IHN0cmluZ1tdIH0ge1xuICBjb25zdCByZWR1Y2VyID0gYXJncy5wb3AoKSBhcyBGdW5jdGlvbjtcbiAgY29uc3QgdHlwZXMgPSBhcmdzLnJlZHVjZShcbiAgICAocmVzdWx0LCBjcmVhdG9yKSA9PiBbLi4ucmVzdWx0LCAoY3JlYXRvciBhcyBBY3Rpb25DcmVhdG9yKS50eXBlXSxcbiAgICBbXSBhcyBzdHJpbmdbXVxuICApO1xuICByZXR1cm4geyByZWR1Y2VyLCB0eXBlcyB9O1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQ3JlYXRlcyBhIHJlZHVjZXIgZnVuY3Rpb24gdG8gaGFuZGxlIHN0YXRlIHRyYW5zaXRpb25zLlxuICpcbiAqIFJlZHVjZXIgY3JlYXRvcnMgcmVkdWNlIHRoZSBleHBsaWNpdG5lc3Mgb2YgcmVkdWNlciBmdW5jdGlvbnMgd2l0aCBzd2l0Y2ggc3RhdGVtZW50cy5cbiAqXG4gKiBAcGFyYW0gaW5pdGlhbFN0YXRlIFByb3ZpZGVzIGEgc3RhdGUgdmFsdWUgaWYgdGhlIGN1cnJlbnQgc3RhdGUgaXMgYHVuZGVmaW5lZGAsIGFzIGl0IGlzIGluaXRpYWxseS5cbiAqIEBwYXJhbSBvbnMgQXNzb2NpYXRpb25zIGJldHdlZW4gYWN0aW9ucyBhbmQgc3RhdGUgY2hhbmdlcy5cbiAqIEByZXR1cm5zIEEgcmVkdWNlciBmdW5jdGlvbi5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIC0gTXVzdCBiZSB1c2VkIHdpdGggYEFjdGlvbkNyZWF0b3JgJ3MgKHJldHVybmVkIGJ5IGBjcmVhdGVBY3Rpb25gKS4gIENhbm5vdCBiZSB1c2VkIHdpdGggY2xhc3MtYmFzZWQgYWN0aW9uIGNyZWF0b3JzLlxuICogLSBUaGUgcmV0dXJuZWQgYEFjdGlvblJlZHVjZXJgIHNob3VsZCBhZGRpdGlvbmFsbHkgYmUgcmV0dXJuZWQgZnJvbSBhbiBleHBvcnRlZCBgcmVkdWNlcmAgZnVuY3Rpb24sIGlmIHlvdSBhcmUgdXNpbmcgVmlldyBFbmdpbmUuXG4gKiBJbiBjYXNlIHlvdSBhcmUgdXNpbmcgSXZ5IHRoZSBleHRyYSBmdW5jdGlvbiBgcmVkdWNlcmAgaXMgbm90IHJlcXVpcmVkLlxuICpcbiAqICoqRGVjbGFyaW5nIGEgcmVkdWNlciBjcmVhdG9yIHdpdGggYW4gZXhwb3J0ZWQgcmVkdWNlciBmdW5jdGlvbioqXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IGZlYXR1cmVSZWR1Y2VyID0gY3JlYXRlUmVkdWNlcihcbiAqICAgaW5pdGlhbFN0YXRlLFxuICogICBvbihcbiAqICAgICBmZWF0dXJlQWN0aW9ucy5hY3Rpb25PbmUsXG4gKiAgICAgZmVhdHVyZUFjdGlvbnMuYWN0aW9uVHdvLFxuICogICAgIChzdGF0ZSwgeyB1cGRhdGVkVmFsdWUgfSkgPT4gKHsgLi4uc3RhdGUsIHByb3A6IHVwZGF0ZWRWYWx1ZSB9KVxuICogICApLFxuICogICBvbihmZWF0dXJlQWN0aW9ucy5hY3Rpb25UaHJlZSwgKCkgPT4gaW5pdGlhbFN0YXRlKTtcbiAqICk7XG4gKlxuICogZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGU6IFN0YXRlIHwgdW5kZWZpbmVkLCBhY3Rpb246IEFjdGlvbikge1xuICogICByZXR1cm4gZmVhdHVyZVJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlZHVjZXI8UywgQSBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gIGluaXRpYWxTdGF0ZTogUyxcbiAgLi4ub25zOiBPbjxTPltdXG4pOiBBY3Rpb25SZWR1Y2VyPFMsIEE+IHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIEFjdGlvblJlZHVjZXI8UywgQT4+KCk7XG4gIGZvciAobGV0IG9uIG9mIG9ucykge1xuICAgIGZvciAobGV0IHR5cGUgb2Ygb24udHlwZXMpIHtcbiAgICAgIGlmIChtYXAuaGFzKHR5cGUpKSB7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nUmVkdWNlciA9IG1hcC5nZXQodHlwZSkgYXMgQWN0aW9uUmVkdWNlcjxTLCBBPjtcbiAgICAgICAgY29uc3QgbmV3UmVkdWNlcjogQWN0aW9uUmVkdWNlcjxTLCBBPiA9IChzdGF0ZSwgYWN0aW9uKSA9PlxuICAgICAgICAgIG9uLnJlZHVjZXIoZXhpc3RpbmdSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pLCBhY3Rpb24pO1xuICAgICAgICBtYXAuc2V0KHR5cGUsIG5ld1JlZHVjZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFwLnNldCh0eXBlLCBvbi5yZWR1Y2VyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oc3RhdGU6IFMgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogQSk6IFMge1xuICAgIGNvbnN0IHJlZHVjZXIgPSBtYXAuZ2V0KGFjdGlvbi50eXBlKTtcbiAgICByZXR1cm4gcmVkdWNlciA/IHJlZHVjZXIoc3RhdGUsIGFjdGlvbikgOiBzdGF0ZTtcbiAgfTtcbn1cbiJdfQ==