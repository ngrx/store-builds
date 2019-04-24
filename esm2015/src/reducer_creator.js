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
 * @param {...?} args
 * @return {?}
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
 * @template S
 * @param {?} initialState
 * @param {...?} ons
 * @return {?}
 */
export function createReducer(initialState, ...ons) {
    /** @type {?} */
    const map = new Map();
    for (let on of ons) {
        for (let type of on.types) {
            map.set(type, on.reducer);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0Esd0JBR0M7OztJQUZDLHFCQUEwQjs7SUFDMUIsbUJBQWdCOzs7Ozs7QUFJbEIsK0JBRUM7Ozs7O0FBMEJELE1BQU0sVUFBVSxFQUFFLENBQ2hCLEdBQUcsSUFBa0M7O1VBRS9CLE9BQU8sR0FBRyxtQkFBQSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQVk7O1VBQ2hDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTTs7Ozs7SUFDdkIsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsbUJBQUEsT0FBTyxFQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQ2pFLG1CQUFBLEVBQUUsRUFBWSxDQUNmO0lBQ0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUM1QixDQUFDOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FDM0IsWUFBZSxFQUNmLEdBQUcsR0FBWTs7VUFFVCxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQTRCO0lBQy9DLEtBQUssSUFBSSxFQUFFLElBQUksR0FBRyxFQUFFO1FBQ2xCLEtBQUssSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRTtZQUN6QixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDM0I7S0FDRjtJQUNEOzs7OztJQUFPLFVBQVMsUUFBVyxZQUFZLEVBQUUsTUFBYzs7Y0FDL0MsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNwQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2xELENBQUMsRUFBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25DcmVhdG9yLCBBY3Rpb25SZWR1Y2VyLCBBY3Rpb25UeXBlLCBBY3Rpb24gfSBmcm9tICcuL21vZGVscyc7XG5cbi8vIFJldHVybiB0eXBlIG9mIHRoZSBgb25gIGZuLlxuZXhwb3J0IGludGVyZmFjZSBPbjxTPiB7XG4gIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8Uz47XG4gIHR5cGVzOiBzdHJpbmdbXTtcbn1cblxuLy8gU3BlY2lhbGl6ZWQgUmVkdWNlciB0aGF0IGlzIGF3YXJlIG9mIHRoZSBBY3Rpb24gdHlwZSBpdCBuZWVkcyB0byBoYW5kbGVcbmV4cG9ydCBpbnRlcmZhY2UgT25SZWR1Y2VyPFMsIEMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yW10+IHtcbiAgKHN0YXRlOiBTLCBhY3Rpb246IEFjdGlvblR5cGU8Q1tudW1iZXJdPik6IFM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbjxDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsIFM+KFxuICBjcmVhdG9yMTogQzEsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzFdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248QzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLCBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsIFM+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzJdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248XG4gIEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIFNcbj4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICBjcmVhdG9yMzogQzMsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyLCBDM10+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxTPihcbiAgY3JlYXRvcjogQWN0aW9uQ3JlYXRvcixcbiAgLi4ucmVzdDogKEFjdGlvbkNyZWF0b3IgfCBPblJlZHVjZXI8UywgW0FjdGlvbkNyZWF0b3JdPilbXVxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb24oXG4gIC4uLmFyZ3M6IChBY3Rpb25DcmVhdG9yIHwgRnVuY3Rpb24pW11cbik6IHsgcmVkdWNlcjogRnVuY3Rpb247IHR5cGVzOiBzdHJpbmdbXSB9IHtcbiAgY29uc3QgcmVkdWNlciA9IGFyZ3MucG9wKCkgYXMgRnVuY3Rpb247XG4gIGNvbnN0IHR5cGVzID0gYXJncy5yZWR1Y2UoXG4gICAgKHJlc3VsdCwgY3JlYXRvcikgPT4gWy4uLnJlc3VsdCwgKGNyZWF0b3IgYXMgQWN0aW9uQ3JlYXRvcikudHlwZV0sXG4gICAgW10gYXMgc3RyaW5nW11cbiAgKTtcbiAgcmV0dXJuIHsgcmVkdWNlciwgdHlwZXMgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlZHVjZXI8Uz4oXG4gIGluaXRpYWxTdGF0ZTogUyxcbiAgLi4ub25zOiBPbjxTPltdXG4pOiBBY3Rpb25SZWR1Y2VyPFM+IHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIEFjdGlvblJlZHVjZXI8Uz4+KCk7XG4gIGZvciAobGV0IG9uIG9mIG9ucykge1xuICAgIGZvciAobGV0IHR5cGUgb2Ygb24udHlwZXMpIHtcbiAgICAgIG1hcC5zZXQodHlwZSwgb24ucmVkdWNlcik7XG4gICAgfVxuICB9XG4gIHJldHVybiBmdW5jdGlvbihzdGF0ZTogUyA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBY3Rpb24pOiBTIHtcbiAgICBjb25zdCByZWR1Y2VyID0gbWFwLmdldChhY3Rpb24udHlwZSk7XG4gICAgcmV0dXJuIHJlZHVjZXIgPyByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIDogc3RhdGU7XG4gIH07XG59XG4iXX0=