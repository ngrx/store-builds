/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isDevMode } from '@angular/core';
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
    /** @type {?} */
    const devMode = isDevMode();
    for (let on of ons) {
        for (let type of on.types) {
            if (devMode && map.has(type)) {
                console.warn(`@ngrx/store: The provided action type '${type}' is already provided.`);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQUkxQyx3QkFHQzs7O0lBRkMscUJBQTBCOztJQUMxQixtQkFBZ0I7Ozs7OztBQUlsQiwrQkFFQzs7Ozs7QUEwQkQsTUFBTSxVQUFVLEVBQUUsQ0FDaEIsR0FBRyxJQUFrQzs7VUFFL0IsT0FBTyxHQUFHLG1CQUFBLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBWTs7VUFDaEMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNOzs7OztJQUN2QixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxtQkFBQSxPQUFPLEVBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FDakUsbUJBQUEsRUFBRSxFQUFZLENBQ2Y7SUFDRCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQzVCLENBQUM7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUMzQixZQUFlLEVBQ2YsR0FBRyxHQUFZOztVQUVULEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBNEI7O1VBQ3pDLE9BQU8sR0FBRyxTQUFTLEVBQUU7SUFFM0IsS0FBSyxJQUFJLEVBQUUsSUFBSSxHQUFHLEVBQUU7UUFDbEIsS0FBSyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFO1lBQ3pCLElBQUksT0FBTyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sQ0FBQyxJQUFJLENBQ1YsMENBQTBDLElBQUksd0JBQXdCLENBQ3ZFLENBQUM7YUFDSDtZQUNELEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMzQjtLQUNGO0lBQ0Q7Ozs7O0lBQU8sVUFBUyxRQUFXLFlBQVksRUFBRSxNQUFjOztjQUMvQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3BDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbEQsQ0FBQyxFQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9uQ3JlYXRvciwgQWN0aW9uUmVkdWNlciwgQWN0aW9uVHlwZSwgQWN0aW9uIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG4vLyBSZXR1cm4gdHlwZSBvZiB0aGUgYG9uYCBmbi5cbmV4cG9ydCBpbnRlcmZhY2UgT248Uz4ge1xuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFM+O1xuICB0eXBlczogc3RyaW5nW107XG59XG5cbi8vIFNwZWNpYWxpemVkIFJlZHVjZXIgdGhhdCBpcyBhd2FyZSBvZiB0aGUgQWN0aW9uIHR5cGUgaXQgbmVlZHMgdG8gaGFuZGxlXG5leHBvcnQgaW50ZXJmYWNlIE9uUmVkdWNlcjxTLCBDIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcltdPiB7XG4gIChzdGF0ZTogUywgYWN0aW9uOiBBY3Rpb25UeXBlPENbbnVtYmVyXT4pOiBTO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb248QzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLCBTPihcbiAgY3JlYXRvcjE6IEMxLFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxXT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvciwgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLCBTPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyXT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzNdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248Uz4oXG4gIGNyZWF0b3I6IEFjdGlvbkNyZWF0b3IsXG4gIC4uLnJlc3Q6IChBY3Rpb25DcmVhdG9yIHwgT25SZWR1Y2VyPFMsIFtBY3Rpb25DcmVhdG9yXT4pW11cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uKFxuICAuLi5hcmdzOiAoQWN0aW9uQ3JlYXRvciB8IEZ1bmN0aW9uKVtdXG4pOiB7IHJlZHVjZXI6IEZ1bmN0aW9uOyB0eXBlczogc3RyaW5nW10gfSB7XG4gIGNvbnN0IHJlZHVjZXIgPSBhcmdzLnBvcCgpIGFzIEZ1bmN0aW9uO1xuICBjb25zdCB0eXBlcyA9IGFyZ3MucmVkdWNlKFxuICAgIChyZXN1bHQsIGNyZWF0b3IpID0+IFsuLi5yZXN1bHQsIChjcmVhdG9yIGFzIEFjdGlvbkNyZWF0b3IpLnR5cGVdLFxuICAgIFtdIGFzIHN0cmluZ1tdXG4gICk7XG4gIHJldHVybiB7IHJlZHVjZXIsIHR5cGVzIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWR1Y2VyPFM+KFxuICBpbml0aWFsU3RhdGU6IFMsXG4gIC4uLm9uczogT248Uz5bXVxuKTogQWN0aW9uUmVkdWNlcjxTPiB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBBY3Rpb25SZWR1Y2VyPFM+PigpO1xuICBjb25zdCBkZXZNb2RlID0gaXNEZXZNb2RlKCk7XG5cbiAgZm9yIChsZXQgb24gb2Ygb25zKSB7XG4gICAgZm9yIChsZXQgdHlwZSBvZiBvbi50eXBlcykge1xuICAgICAgaWYgKGRldk1vZGUgJiYgbWFwLmhhcyh0eXBlKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYEBuZ3J4L3N0b3JlOiBUaGUgcHJvdmlkZWQgYWN0aW9uIHR5cGUgJyR7dHlwZX0nIGlzIGFscmVhZHkgcHJvdmlkZWQuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgbWFwLnNldCh0eXBlLCBvbi5yZWR1Y2VyKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlOiBTID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IEFjdGlvbik6IFMge1xuICAgIGNvbnN0IHJlZHVjZXIgPSBtYXAuZ2V0KGFjdGlvbi50eXBlKTtcbiAgICByZXR1cm4gcmVkdWNlciA/IHJlZHVjZXIoc3RhdGUsIGFjdGlvbikgOiBzdGF0ZTtcbiAgfTtcbn1cbiJdfQ==