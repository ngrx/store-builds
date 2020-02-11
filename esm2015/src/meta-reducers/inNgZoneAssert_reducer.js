/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/src/meta-reducers/inNgZoneAssert_reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as ngCore from '@angular/core';
import { RUNTIME_CHECK_URL } from './utils';
/**
 * @param {?} reducer
 * @param {?} checks
 * @return {?}
 */
export function inNgZoneAssertMetaReducer(reducer, checks) {
    return (/**
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    function (state, action) {
        if (checks.action(action) && !ngCore.NgZone.isInAngularZone()) {
            throw new Error(`Action '${action.type}' running outside NgZone. ${RUNTIME_CHECK_URL}#strictactionwithinngzone`);
        }
        return reducer(state, action);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5OZ1pvbmVBc3NlcnRfcmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvc3JjL21ldGEtcmVkdWNlcnMvaW5OZ1pvbmVBc3NlcnRfcmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sS0FBSyxNQUFNLE1BQU0sZUFBZSxDQUFDO0FBRXhDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7O0FBRTVDLE1BQU0sVUFBVSx5QkFBeUIsQ0FDdkMsT0FBbUMsRUFDbkMsTUFBK0M7SUFFL0M7Ozs7O0lBQU8sVUFBUyxLQUFVLEVBQUUsTUFBYztRQUN4QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQzdELE1BQU0sSUFBSSxLQUFLLENBQ2IsV0FDRSxNQUFNLENBQUMsSUFDVCw2QkFBNkIsaUJBQWlCLDJCQUEyQixDQUMxRSxDQUFDO1NBQ0g7UUFDRCxPQUFPLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQyxFQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG5nQ29yZSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbiwgQWN0aW9uUmVkdWNlciB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBSVU5USU1FX0NIRUNLX1VSTCB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5OZ1pvbmVBc3NlcnRNZXRhUmVkdWNlcihcbiAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxhbnksIEFjdGlvbj4sXG4gIGNoZWNrczogeyBhY3Rpb246IChhY3Rpb246IEFjdGlvbikgPT4gYm9vbGVhbiB9XG4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlOiBhbnksIGFjdGlvbjogQWN0aW9uKSB7XG4gICAgaWYgKGNoZWNrcy5hY3Rpb24oYWN0aW9uKSAmJiAhbmdDb3JlLk5nWm9uZS5pc0luQW5ndWxhclpvbmUoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgQWN0aW9uICcke1xuICAgICAgICAgIGFjdGlvbi50eXBlXG4gICAgICAgIH0nIHJ1bm5pbmcgb3V0c2lkZSBOZ1pvbmUuICR7UlVOVElNRV9DSEVDS19VUkx9I3N0cmljdGFjdGlvbndpdGhpbm5nem9uZWBcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuICB9O1xufVxuIl19