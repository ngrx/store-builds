var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
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
 * @param {...?} args `ActionCreator`'s followed by a state change function.
 *
 * **To maintain type-safety**: pass 10 or less `ActionCreator`'s.
 * @return {?} an association of action types with a state change function.
 */
export function on() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    /** @type {?} */
    var reducer = (/** @type {?} */ (args.pop()));
    /** @type {?} */
    var types = args.reduce((/**
     * @param {?} result
     * @param {?} creator
     * @return {?}
     */
    function (result, creator) { return __spread(result, [((/** @type {?} */ (creator))).type]); }), (/** @type {?} */ ([])));
    return { reducer: reducer, types: types };
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
export function createReducer(initialState) {
    var e_1, _a;
    var ons = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        ons[_i - 1] = arguments[_i];
    }
    /** @type {?} */
    var map = new Map();
    var _loop_1 = function (on_1) {
        var e_2, _a;
        var _loop_2 = function (type) {
            if (map.has(type)) {
                /** @type {?} */
                var existingReducer_1 = (/** @type {?} */ (map.get(type)));
                /** @type {?} */
                var newReducer = (/**
                 * @param {?} state
                 * @param {?} action
                 * @return {?}
                 */
                function (state, action) {
                    return on_1.reducer(existingReducer_1(state, action), action);
                });
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
    return (/**
     * @param {?=} state
     * @param {?=} action
     * @return {?}
     */
    function (state, action) {
        if (state === void 0) { state = initialState; }
        /** @type {?} */
        var reducer = map.get(action.type);
        return reducer ? reducer(state, action) : state;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ncngvc3RvcmUvIiwic291cmNlcyI6WyJzcmMvcmVkdWNlcl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSx3QkFHQzs7O0lBRkMscUJBQTBCOztJQUMxQixtQkFBZ0I7Ozs7OztBQUlsQiwrQkFFQzs7Ozs7Ozs7Ozs7QUF5S0QsTUFBTSxVQUFVLEVBQUU7SUFDaEIsY0FBcUM7U0FBckMsVUFBcUMsRUFBckMscUJBQXFDLEVBQXJDLElBQXFDO1FBQXJDLHlCQUFxQzs7O1FBRS9CLE9BQU8sR0FBRyxtQkFBQSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQVk7O1FBQ2hDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTTs7Ozs7SUFDdkIsVUFBQyxNQUFNLEVBQUUsT0FBTyxJQUFLLGdCQUFJLE1BQU0sR0FBRSxDQUFDLG1CQUFBLE9BQU8sRUFBaUIsQ0FBQyxDQUFDLElBQUksSUFBM0MsQ0FBNEMsR0FDakUsbUJBQUEsRUFBRSxFQUFZLENBQ2Y7SUFDRCxPQUFPLEVBQUUsT0FBTyxTQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQztBQUM1QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQ0QsTUFBTSxVQUFVLGFBQWEsQ0FDM0IsWUFBZTs7SUFDZixhQUFlO1NBQWYsVUFBZSxFQUFmLHFCQUFlLEVBQWYsSUFBZTtRQUFmLDRCQUFlOzs7UUFFVCxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQStCOzRCQUN6QyxJQUFFOztnQ0FDQSxJQUFJO1lBQ1gsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFOztvQkFDWCxpQkFBZSxHQUFHLG1CQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQXVCOztvQkFDdEQsVUFBVTs7Ozs7Z0JBQXdCLFVBQUMsS0FBSyxFQUFFLE1BQU07b0JBQ3BELE9BQUEsSUFBRSxDQUFDLE9BQU8sQ0FBQyxpQkFBZSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUM7Z0JBQWxELENBQWtELENBQUE7Z0JBQ3BELEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzNCO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMzQjs7O1lBUkgsS0FBaUIsSUFBQSxvQkFBQSxTQUFBLElBQUUsQ0FBQyxLQUFLLENBQUEsQ0FBQSxnQkFBQTtnQkFBcEIsSUFBSSxJQUFJLFdBQUE7d0JBQUosSUFBSTthQVNaOzs7Ozs7Ozs7OztRQVZILEtBQWUsSUFBQSxRQUFBLFNBQUEsR0FBRyxDQUFBLHdCQUFBO1lBQWIsSUFBSSxJQUFFLGdCQUFBO29CQUFGLElBQUU7U0FXVjs7Ozs7Ozs7O0lBRUQ7Ozs7O0lBQU8sVUFBVSxLQUF1QixFQUFFLE1BQVM7UUFBbEMsc0JBQUEsRUFBQSxvQkFBdUI7O1lBQ2hDLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDcEMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsRCxDQUFDLEVBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uQ3JlYXRvciwgQWN0aW9uUmVkdWNlciwgQWN0aW9uVHlwZSwgQWN0aW9uIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG4vLyBSZXR1cm4gdHlwZSBvZiB0aGUgYG9uYCBmbi5cbmV4cG9ydCBpbnRlcmZhY2UgT248Uz4ge1xuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFM+O1xuICB0eXBlczogc3RyaW5nW107XG59XG5cbi8vIFNwZWNpYWxpemVkIFJlZHVjZXIgdGhhdCBpcyBhd2FyZSBvZiB0aGUgQWN0aW9uIHR5cGUgaXQgbmVlZHMgdG8gaGFuZGxlXG5leHBvcnQgaW50ZXJmYWNlIE9uUmVkdWNlcjxTLCBDIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcltdPiB7XG4gIChzdGF0ZTogUywgYWN0aW9uOiBBY3Rpb25UeXBlPENbbnVtYmVyXT4pOiBTO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb248QzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLCBTPihcbiAgY3JlYXRvcjE6IEMxLFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxXT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvciwgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLCBTPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyXT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzNdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248XG4gIEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM0IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgU1xuPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIGNyZWF0b3IzOiBDMyxcbiAgY3JlYXRvcjQ6IEM0LFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzMsIEM0XT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM1IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgU1xuPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIGNyZWF0b3IzOiBDMyxcbiAgY3JlYXRvcjQ6IEM0LFxuICBjcmVhdG9yNTogQzUsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyLCBDMywgQzQsIEM1XT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM1IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzYgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICBjcmVhdG9yNDogQzQsXG4gIGNyZWF0b3I1OiBDNSxcbiAgY3JlYXRvcjY6IEM2LFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzMsIEM0LCBDNSwgQzZdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248XG4gIEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM0IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzUgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM3IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgU1xuPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIGNyZWF0b3IzOiBDMyxcbiAgY3JlYXRvcjQ6IEM0LFxuICBjcmVhdG9yNTogQzUsXG4gIGNyZWF0b3I2OiBDNixcbiAgY3JlYXRvcjc6IEM3LFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzMsIEM0LCBDNSwgQzYsIEM3XT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM1IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzYgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM4IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgU1xuPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIGNyZWF0b3IzOiBDMyxcbiAgY3JlYXRvcjQ6IEM0LFxuICBjcmVhdG9yNTogQzUsXG4gIGNyZWF0b3I2OiBDNixcbiAgY3JlYXRvcjc6IEM3LFxuICBjcmVhdG9yODogQzgsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyLCBDMywgQzQsIEM1LCBDNiwgQzcsIEM4XT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM1IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzYgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM4IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzkgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICBjcmVhdG9yNDogQzQsXG4gIGNyZWF0b3I1OiBDNSxcbiAgY3JlYXRvcjY6IEM2LFxuICBjcmVhdG9yNzogQzcsXG4gIGNyZWF0b3I4OiBDOCxcbiAgY3JlYXRvcjk6IEM5LFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzMsIEM0LCBDNSwgQzYsIEM3LCBDOCwgQzldPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248XG4gIEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM0IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzUgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDNiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEM3IGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzggZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDOSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMxMCBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIFNcbj4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICBjcmVhdG9yMzogQzMsXG4gIGNyZWF0b3I0OiBDNCxcbiAgY3JlYXRvcjU6IEM1LFxuICBjcmVhdG9yNjogQzYsXG4gIGNyZWF0b3I3OiBDNyxcbiAgY3JlYXRvcjg6IEM4LFxuICBjcmVhdG9yOTogQzksXG4gIGNyZWF0b3IxMDogQzEwLFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzMsIEM0LCBDNSwgQzYsIEM3LCBDOCwgQzksIEMxMF0+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxTPihcbiAgY3JlYXRvcjogQWN0aW9uQ3JlYXRvcixcbiAgLi4ucmVzdDogKEFjdGlvbkNyZWF0b3IgfCBPblJlZHVjZXI8UywgW0FjdGlvbkNyZWF0b3JdPilbXVxuKTogT248Uz47XG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQXNzb2NpYXRlcyBhY3Rpb25zIHdpdGggYSBnaXZlbiBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb24uXG4gKiBBIHN0YXRlIGNoYW5nZSBmdW5jdGlvbiBtdXN0IGJlIHByb3ZpZGVkIGFzIHRoZSBsYXN0IHBhcmFtZXRlci5cbiAqXG4gKiBAcGFyYW0gYXJncyBgQWN0aW9uQ3JlYXRvcmAncyBmb2xsb3dlZCBieSBhIHN0YXRlIGNoYW5nZSBmdW5jdGlvbi5cbiAqXG4gKiAqKlRvIG1haW50YWluIHR5cGUtc2FmZXR5Kio6IHBhc3MgMTAgb3IgbGVzcyBgQWN0aW9uQ3JlYXRvcmAncy5cbiAqIEByZXR1cm5zIGFuIGFzc29jaWF0aW9uIG9mIGFjdGlvbiB0eXBlcyB3aXRoIGEgc3RhdGUgY2hhbmdlIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gb24oXG4gIC4uLmFyZ3M6IChBY3Rpb25DcmVhdG9yIHwgRnVuY3Rpb24pW11cbik6IHsgcmVkdWNlcjogRnVuY3Rpb247IHR5cGVzOiBzdHJpbmdbXSB9IHtcbiAgY29uc3QgcmVkdWNlciA9IGFyZ3MucG9wKCkgYXMgRnVuY3Rpb247XG4gIGNvbnN0IHR5cGVzID0gYXJncy5yZWR1Y2UoXG4gICAgKHJlc3VsdCwgY3JlYXRvcikgPT4gWy4uLnJlc3VsdCwgKGNyZWF0b3IgYXMgQWN0aW9uQ3JlYXRvcikudHlwZV0sXG4gICAgW10gYXMgc3RyaW5nW11cbiAgKTtcbiAgcmV0dXJuIHsgcmVkdWNlciwgdHlwZXMgfTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENyZWF0ZXMgYSByZWR1Y2VyIGZ1bmN0aW9uIHRvIGhhbmRsZSBzdGF0ZSB0cmFuc2l0aW9ucy5cbiAqXG4gKiBSZWR1Y2VyIGNyZWF0b3JzIHJlZHVjZSB0aGUgZXhwbGljaXRuZXNzIG9mIHJlZHVjZXIgZnVuY3Rpb25zIHdpdGggc3dpdGNoIHN0YXRlbWVudHMuXG4gKlxuICogQHBhcmFtIGluaXRpYWxTdGF0ZSBQcm92aWRlcyBhIHN0YXRlIHZhbHVlIGlmIHRoZSBjdXJyZW50IHN0YXRlIGlzIGB1bmRlZmluZWRgLCBhcyBpdCBpcyBpbml0aWFsbHkuXG4gKiBAcGFyYW0gb25zIEFzc29jaWF0aW9ucyBiZXR3ZWVuIGFjdGlvbnMgYW5kIHN0YXRlIGNoYW5nZXMuXG4gKiBAcmV0dXJucyBBIHJlZHVjZXIgZnVuY3Rpb24uXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiAtIE11c3QgYmUgdXNlZCB3aXRoIGBBY3Rpb25DcmVhdG9yYCdzIChyZXR1cm5lZCBieSBgY3JlYXRlQWN0aW9uYCkuICBDYW5ub3QgYmUgdXNlZCB3aXRoIGNsYXNzLWJhc2VkIGFjdGlvbiBjcmVhdG9ycy5cbiAqIC0gVGhlIHJldHVybmVkIGBBY3Rpb25SZWR1Y2VyYCBzaG91bGQgYWRkaXRpb25hbGx5IGJlIHJldHVybmVkIGZyb20gYW4gZXhwb3J0ZWQgYHJlZHVjZXJgIGZ1bmN0aW9uLCBpZiB5b3UgYXJlIHVzaW5nIFZpZXcgRW5naW5lLlxuICogSW4gY2FzZSB5b3UgYXJlIHVzaW5nIEl2eSB0aGUgZXh0cmEgZnVuY3Rpb24gYHJlZHVjZXJgIGlzIG5vdCByZXF1aXJlZC5cbiAqXG4gKiAqKkRlY2xhcmluZyBhIHJlZHVjZXIgY3JlYXRvciB3aXRoIGFuIGV4cG9ydGVkIHJlZHVjZXIgZnVuY3Rpb24qKlxuICpcbiAqIGBgYHRzXG4gKiBjb25zdCBmZWF0dXJlUmVkdWNlciA9IGNyZWF0ZVJlZHVjZXIoXG4gKiAgIGluaXRpYWxTdGF0ZSxcbiAqICAgb24oXG4gKiAgICAgZmVhdHVyZUFjdGlvbnMuYWN0aW9uT25lLFxuICogICAgIGZlYXR1cmVBY3Rpb25zLmFjdGlvblR3byxcbiAqICAgICAoc3RhdGUsIHsgdXBkYXRlZFZhbHVlIH0pID0+ICh7IC4uLnN0YXRlLCBwcm9wOiB1cGRhdGVkVmFsdWUgfSlcbiAqICAgKSxcbiAqICAgb24oZmVhdHVyZUFjdGlvbnMuYWN0aW9uVGhyZWUsICgpID0+IGluaXRpYWxTdGF0ZSk7XG4gKiApO1xuICpcbiAqIGV4cG9ydCBmdW5jdGlvbiByZWR1Y2VyKHN0YXRlOiBTdGF0ZSB8IHVuZGVmaW5lZCwgYWN0aW9uOiBBY3Rpb24pIHtcbiAqICAgcmV0dXJuIGZlYXR1cmVSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWR1Y2VyPFMsIEEgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICBpbml0aWFsU3RhdGU6IFMsXG4gIC4uLm9uczogT248Uz5bXVxuKTogQWN0aW9uUmVkdWNlcjxTLCBBPiB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBBY3Rpb25SZWR1Y2VyPFMsIEE+PigpO1xuICBmb3IgKGxldCBvbiBvZiBvbnMpIHtcbiAgICBmb3IgKGxldCB0eXBlIG9mIG9uLnR5cGVzKSB7XG4gICAgICBpZiAobWFwLmhhcyh0eXBlKSkge1xuICAgICAgICBjb25zdCBleGlzdGluZ1JlZHVjZXIgPSBtYXAuZ2V0KHR5cGUpIGFzIEFjdGlvblJlZHVjZXI8UywgQT47XG4gICAgICAgIGNvbnN0IG5ld1JlZHVjZXI6IEFjdGlvblJlZHVjZXI8UywgQT4gPSAoc3RhdGUsIGFjdGlvbikgPT5cbiAgICAgICAgICBvbi5yZWR1Y2VyKGV4aXN0aW5nUmVkdWNlcihzdGF0ZSwgYWN0aW9uKSwgYWN0aW9uKTtcbiAgICAgICAgbWFwLnNldCh0eXBlLCBuZXdSZWR1Y2VyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcC5zZXQodHlwZSwgb24ucmVkdWNlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChzdGF0ZTogUyA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBKTogUyB7XG4gICAgY29uc3QgcmVkdWNlciA9IG1hcC5nZXQoYWN0aW9uLnR5cGUpO1xuICAgIHJldHVybiByZWR1Y2VyID8gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKSA6IHN0YXRlO1xuICB9O1xufVxuIl19