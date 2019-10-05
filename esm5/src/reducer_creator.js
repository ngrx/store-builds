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
            for (var _b = tslib_1.__values(on_1.types), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        for (var ons_1 = tslib_1.__values(ons), ons_1_1 = ons_1.next(); !ons_1_1.done; ons_1_1 = ons_1.next()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUEwS0E7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxVQUFVLEVBQUU7SUFDaEIsY0FBcUM7U0FBckMsVUFBcUMsRUFBckMscUJBQXFDLEVBQXJDLElBQXFDO1FBQXJDLHlCQUFxQzs7SUFFckMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBYyxDQUFDO0lBQ3ZDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQ3ZCLFVBQUMsTUFBTSxFQUFFLE9BQU8sSUFBSyx3QkFBSSxNQUFNLEdBQUcsT0FBeUIsQ0FBQyxJQUFJLElBQTNDLENBQTRDLEVBQ2pFLEVBQWMsQ0FDZixDQUFDO0lBQ0YsT0FBTyxFQUFFLE9BQU8sU0FBQSxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FDM0IsWUFBZTs7SUFDZixhQUFlO1NBQWYsVUFBZSxFQUFmLHFCQUFlLEVBQWYsSUFBZTtRQUFmLDRCQUFlOztJQUVmLElBQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUErQixDQUFDOzRCQUMxQyxJQUFFOztnQ0FDQSxJQUFJO1lBQ1gsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNqQixJQUFNLGlCQUFlLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQXdCLENBQUM7Z0JBQzdELElBQU0sVUFBVSxHQUF3QixVQUFDLEtBQUssRUFBRSxNQUFNO29CQUNwRCxPQUFBLElBQUUsQ0FBQyxPQUFPLENBQUMsaUJBQWUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDO2dCQUFsRCxDQUFrRCxDQUFDO2dCQUNyRCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0I7OztZQVJILEtBQWlCLElBQUEsS0FBQSxpQkFBQSxJQUFFLENBQUMsS0FBSyxDQUFBLGdCQUFBO2dCQUFwQixJQUFJLElBQUksV0FBQTt3QkFBSixJQUFJO2FBU1o7Ozs7Ozs7Ozs7O1FBVkgsS0FBZSxJQUFBLFFBQUEsaUJBQUEsR0FBRyxDQUFBLHdCQUFBO1lBQWIsSUFBSSxJQUFFLGdCQUFBO29CQUFGLElBQUU7U0FXVjs7Ozs7Ozs7O0lBRUQsT0FBTyxVQUFTLEtBQXVCLEVBQUUsTUFBUztRQUFsQyxzQkFBQSxFQUFBLG9CQUF1QjtRQUNyQyxJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2xELENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25DcmVhdG9yLCBBY3Rpb25SZWR1Y2VyLCBBY3Rpb25UeXBlLCBBY3Rpb24gfSBmcm9tICcuL21vZGVscyc7XG5cbi8vIFJldHVybiB0eXBlIG9mIHRoZSBgb25gIGZuLlxuZXhwb3J0IGludGVyZmFjZSBPbjxTPiB7XG4gIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8Uz47XG4gIHR5cGVzOiBzdHJpbmdbXTtcbn1cblxuLy8gU3BlY2lhbGl6ZWQgUmVkdWNlciB0aGF0IGlzIGF3YXJlIG9mIHRoZSBBY3Rpb24gdHlwZSBpdCBuZWVkcyB0byBoYW5kbGVcbmV4cG9ydCBpbnRlcmZhY2UgT25SZWR1Y2VyPFMsIEMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yW10+IHtcbiAgKHN0YXRlOiBTLCBhY3Rpb246IEFjdGlvblR5cGU8Q1tudW1iZXJdPik6IFM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbjxDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsIFM+KFxuICBjcmVhdG9yMTogQzEsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzFdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248QzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLCBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsIFM+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzJdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248XG4gIEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIFNcbj4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICBjcmVhdG9yMzogQzMsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyLCBDM10+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxcbiAgQzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMzIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzQgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICBjcmVhdG9yNDogQzQsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyLCBDMywgQzRdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248XG4gIEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM0IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzUgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICBjcmVhdG9yNDogQzQsXG4gIGNyZWF0b3I1OiBDNSxcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzIsIEMzLCBDNCwgQzVdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248XG4gIEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM0IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzUgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIFNcbj4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICBjcmVhdG9yMzogQzMsXG4gIGNyZWF0b3I0OiBDNCxcbiAgY3JlYXRvcjU6IEM1LFxuICBjcmVhdG9yNjogQzYsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyLCBDMywgQzQsIEM1LCBDNl0+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxcbiAgQzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMzIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzQgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM2IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzcgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICBjcmVhdG9yNDogQzQsXG4gIGNyZWF0b3I1OiBDNSxcbiAgY3JlYXRvcjY6IEM2LFxuICBjcmVhdG9yNzogQzcsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyLCBDMywgQzQsIEM1LCBDNiwgQzddPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248XG4gIEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM0IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzUgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM3IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzggZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICBjcmVhdG9yNDogQzQsXG4gIGNyZWF0b3I1OiBDNSxcbiAgY3JlYXRvcjY6IEM2LFxuICBjcmVhdG9yNzogQzcsXG4gIGNyZWF0b3I4OiBDOCxcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzIsIEMzLCBDNCwgQzUsIEM2LCBDNywgQzhdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248XG4gIEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM0IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzUgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM3IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzggZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDOSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIFNcbj4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICBjcmVhdG9yMzogQzMsXG4gIGNyZWF0b3I0OiBDNCxcbiAgY3JlYXRvcjU6IEM1LFxuICBjcmVhdG9yNjogQzYsXG4gIGNyZWF0b3I3OiBDNyxcbiAgY3JlYXRvcjg6IEM4LFxuICBjcmVhdG9yOTogQzksXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyLCBDMywgQzQsIEM1LCBDNiwgQzcsIEM4LCBDOV0+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxcbiAgQzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMzIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzQgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM2IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzcgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDOCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM5IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzEwIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgU1xuPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIGNyZWF0b3IzOiBDMyxcbiAgY3JlYXRvcjQ6IEM0LFxuICBjcmVhdG9yNTogQzUsXG4gIGNyZWF0b3I2OiBDNixcbiAgY3JlYXRvcjc6IEM3LFxuICBjcmVhdG9yODogQzgsXG4gIGNyZWF0b3I5OiBDOSxcbiAgY3JlYXRvcjEwOiBDMTAsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyLCBDMywgQzQsIEM1LCBDNiwgQzcsIEM4LCBDOSwgQzEwXT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFM+KFxuICBjcmVhdG9yOiBBY3Rpb25DcmVhdG9yLFxuICAuLi5yZXN0OiAoQWN0aW9uQ3JlYXRvciB8IE9uUmVkdWNlcjxTLCBbQWN0aW9uQ3JlYXRvcl0+KVtdXG4pOiBPbjxTPjtcbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBc3NvY2lhdGVzIGFjdGlvbnMgd2l0aCBhIGdpdmVuIHN0YXRlIGNoYW5nZSBmdW5jdGlvbi5cbiAqIEEgc3RhdGUgY2hhbmdlIGZ1bmN0aW9uIG11c3QgYmUgcHJvdmlkZWQgYXMgdGhlIGxhc3QgcGFyYW1ldGVyLlxuICpcbiAqIEBwYXJhbSBhcmdzIGBBY3Rpb25DcmVhdG9yYCdzIGZvbGxvd2VkIGJ5IGEgc3RhdGUgY2hhbmdlIGZ1bmN0aW9uLlxuICpcbiAqICoqVG8gbWFpbnRhaW4gdHlwZS1zYWZldHkqKjogcGFzcyAxMCBvciBsZXNzIGBBY3Rpb25DcmVhdG9yYCdzLlxuICogQHJldHVybnMgYW4gYXNzb2NpYXRpb24gb2YgYWN0aW9uIHR5cGVzIHdpdGggYSBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvbihcbiAgLi4uYXJnczogKEFjdGlvbkNyZWF0b3IgfCBGdW5jdGlvbilbXVxuKTogeyByZWR1Y2VyOiBGdW5jdGlvbjsgdHlwZXM6IHN0cmluZ1tdIH0ge1xuICBjb25zdCByZWR1Y2VyID0gYXJncy5wb3AoKSBhcyBGdW5jdGlvbjtcbiAgY29uc3QgdHlwZXMgPSBhcmdzLnJlZHVjZShcbiAgICAocmVzdWx0LCBjcmVhdG9yKSA9PiBbLi4ucmVzdWx0LCAoY3JlYXRvciBhcyBBY3Rpb25DcmVhdG9yKS50eXBlXSxcbiAgICBbXSBhcyBzdHJpbmdbXVxuICApO1xuICByZXR1cm4geyByZWR1Y2VyLCB0eXBlcyB9O1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQ3JlYXRlcyBhIHJlZHVjZXIgZnVuY3Rpb24gdG8gaGFuZGxlIHN0YXRlIHRyYW5zaXRpb25zLlxuICpcbiAqIFJlZHVjZXIgY3JlYXRvcnMgcmVkdWNlIHRoZSBleHBsaWNpdG5lc3Mgb2YgcmVkdWNlciBmdW5jdGlvbnMgd2l0aCBzd2l0Y2ggc3RhdGVtZW50cy5cbiAqXG4gKiBAcGFyYW0gaW5pdGlhbFN0YXRlIFByb3ZpZGVzIGEgc3RhdGUgdmFsdWUgaWYgdGhlIGN1cnJlbnQgc3RhdGUgaXMgYHVuZGVmaW5lZGAsIGFzIGl0IGlzIGluaXRpYWxseS5cbiAqIEBwYXJhbSBvbnMgQXNzb2NpYXRpb25zIGJldHdlZW4gYWN0aW9ucyBhbmQgc3RhdGUgY2hhbmdlcy5cbiAqIEByZXR1cm5zIEEgcmVkdWNlciBmdW5jdGlvbi5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIC0gTXVzdCBiZSB1c2VkIHdpdGggYEFjdGlvbkNyZWF0b3JgJ3MgKHJldHVybmVkIGJ5IGBjcmVhdGVBY3Rpb25gKS4gIENhbm5vdCBiZSB1c2VkIHdpdGggY2xhc3MtYmFzZWQgYWN0aW9uIGNyZWF0b3JzLlxuICogLSBBbiBhY3Rpb24gY2FuIGJlIGFzc29jaWF0ZWQgd2l0aCBtdWx0aXBsZSBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb25zLiBJbiB0aGlzIGNhc2UgdGhlIGZ1bmN0aW9ucyB3aWxsIGJlIGV4ZWN1dGVkIGluIHRoZSBzcGVjaWZpZWQgb3JkZXIuXG4gKiAtIFRoZSByZXR1cm5lZCBgQWN0aW9uUmVkdWNlcmAgc2hvdWxkIGFkZGl0aW9uYWxseSBiZSByZXR1cm5lZCBmcm9tIGFuIGV4cG9ydGVkIGByZWR1Y2VyYCBmdW5jdGlvbi5cbiAqIFRoaXMgaXMgYmVjYXVzZSBbZnVuY3Rpb24gY2FsbHMgYXJlIG5vdCBzdXBwb3J0ZWRdKGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9hb3QtY29tcGlsZXIjZnVuY3Rpb24tY2FsbHMtYXJlLW5vdC1zdXBwb3J0ZWQpIGJ5IHRoZSBBT1QgY29tcGlsZXIuXG4gKlxuICogKipEZWNsYXJpbmcgYSByZWR1Y2VyIGNyZWF0b3Igd2l0aCBhbiBleHBvcnRlZCByZWR1Y2VyIGZ1bmN0aW9uKipcbiAqXG4gKiBgYGB0c1xuICogY29uc3QgZmVhdHVyZVJlZHVjZXIgPSBjcmVhdGVSZWR1Y2VyKFxuICogICBpbml0aWFsU3RhdGUsXG4gKiAgIG9uKFxuICogICAgIGZlYXR1cmVBY3Rpb25zLmFjdGlvbk9uZSxcbiAqICAgICBmZWF0dXJlQWN0aW9ucy5hY3Rpb25Ud28sXG4gKiAgICAgKHN0YXRlLCB7IHVwZGF0ZWRWYWx1ZSB9KSA9PiAoeyAuLi5zdGF0ZSwgcHJvcDogdXBkYXRlZFZhbHVlIH0pXG4gKiAgICksXG4gKiAgIG9uKGZlYXR1cmVBY3Rpb25zLmFjdGlvblRocmVlLCAoKSA9PiBpbml0aWFsU3RhdGUpO1xuICogKTtcbiAqXG4gKiBleHBvcnQgZnVuY3Rpb24gcmVkdWNlcihzdGF0ZTogU3RhdGUgfCB1bmRlZmluZWQsIGFjdGlvbjogQWN0aW9uKSB7XG4gKiAgIHJldHVybiBmZWF0dXJlUmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVkdWNlcjxTLCBBIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgaW5pdGlhbFN0YXRlOiBTLFxuICAuLi5vbnM6IE9uPFM+W11cbik6IEFjdGlvblJlZHVjZXI8UywgQT4ge1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgQWN0aW9uUmVkdWNlcjxTLCBBPj4oKTtcbiAgZm9yIChsZXQgb24gb2Ygb25zKSB7XG4gICAgZm9yIChsZXQgdHlwZSBvZiBvbi50eXBlcykge1xuICAgICAgaWYgKG1hcC5oYXModHlwZSkpIHtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdSZWR1Y2VyID0gbWFwLmdldCh0eXBlKSBhcyBBY3Rpb25SZWR1Y2VyPFMsIEE+O1xuICAgICAgICBjb25zdCBuZXdSZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFMsIEE+ID0gKHN0YXRlLCBhY3Rpb24pID0+XG4gICAgICAgICAgb24ucmVkdWNlcihleGlzdGluZ1JlZHVjZXIoc3RhdGUsIGFjdGlvbiksIGFjdGlvbik7XG4gICAgICAgIG1hcC5zZXQodHlwZSwgbmV3UmVkdWNlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXAuc2V0KHR5cGUsIG9uLnJlZHVjZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihzdGF0ZTogUyA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBKTogUyB7XG4gICAgY29uc3QgcmVkdWNlciA9IG1hcC5nZXQoYWN0aW9uLnR5cGUpO1xuICAgIHJldHVybiByZWR1Y2VyID8gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKSA6IHN0YXRlO1xuICB9O1xufVxuIl19