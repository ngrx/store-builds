/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/src/runtime_checks.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isDevMode } from '@angular/core';
import { serializationCheckMetaReducer, immutabilityCheckMetaReducer, } from './meta-reducers';
import { _USER_RUNTIME_CHECKS, _ACTIVE_RUNTIME_CHECKS, META_REDUCERS, USER_RUNTIME_CHECKS, } from './tokens';
/**
 * @param {?=} runtimeChecks
 * @return {?}
 */
export function createActiveRuntimeChecks(runtimeChecks) {
    if (isDevMode()) {
        return Object.assign({ strictStateSerializability: false, strictActionSerializability: false, strictStateImmutability: true, strictActionImmutability: true }, runtimeChecks);
    }
    return {
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictStateImmutability: false,
        strictActionImmutability: false,
    };
}
/**
 * @param {?} __0
 * @return {?}
 */
export function createSerializationCheckMetaReducer({ strictActionSerializability, strictStateSerializability, }) {
    return (/**
     * @param {?} reducer
     * @return {?}
     */
    reducer => strictActionSerializability || strictStateSerializability
        ? serializationCheckMetaReducer(reducer, {
            action: (/**
             * @param {?} action
             * @return {?}
             */
            action => strictActionSerializability && !ignoreNgrxAction(action)),
            state: (/**
             * @return {?}
             */
            () => strictStateSerializability),
        })
        : reducer);
}
/**
 * @param {?} __0
 * @return {?}
 */
export function createImmutabilityCheckMetaReducer({ strictActionImmutability, strictStateImmutability, }) {
    return (/**
     * @param {?} reducer
     * @return {?}
     */
    reducer => strictActionImmutability || strictStateImmutability
        ? immutabilityCheckMetaReducer(reducer, {
            action: (/**
             * @param {?} action
             * @return {?}
             */
            action => strictActionImmutability && !ignoreNgrxAction(action)),
            state: (/**
             * @return {?}
             */
            () => strictStateImmutability),
        })
        : reducer);
}
/**
 * @param {?} action
 * @return {?}
 */
function ignoreNgrxAction(action) {
    return action.type.startsWith('@ngrx');
}
/**
 * @param {?=} runtimeChecks
 * @return {?}
 */
export function provideRuntimeChecks(runtimeChecks) {
    return [
        {
            provide: _USER_RUNTIME_CHECKS,
            useValue: runtimeChecks,
        },
        {
            provide: USER_RUNTIME_CHECKS,
            useFactory: _runtimeChecksFactory,
            deps: [_USER_RUNTIME_CHECKS],
        },
        {
            provide: _ACTIVE_RUNTIME_CHECKS,
            deps: [USER_RUNTIME_CHECKS],
            useFactory: createActiveRuntimeChecks,
        },
        {
            provide: META_REDUCERS,
            multi: true,
            deps: [_ACTIVE_RUNTIME_CHECKS],
            useFactory: createImmutabilityCheckMetaReducer,
        },
        {
            provide: META_REDUCERS,
            multi: true,
            deps: [_ACTIVE_RUNTIME_CHECKS],
            useFactory: createSerializationCheckMetaReducer,
        },
    ];
}
/**
 * @param {?} runtimeChecks
 * @return {?}
 */
export function _runtimeChecksFactory(runtimeChecks) {
    return runtimeChecks;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZV9jaGVja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9ydW50aW1lX2NoZWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUNMLDZCQUE2QixFQUM3Qiw0QkFBNEIsR0FDN0IsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLHNCQUFzQixFQUN0QixhQUFhLEVBQ2IsbUJBQW1CLEdBQ3BCLE1BQU0sVUFBVSxDQUFDOzs7OztBQUVsQixNQUFNLFVBQVUseUJBQXlCLENBQ3ZDLGFBQXNDO0lBRXRDLElBQUksU0FBUyxFQUFFLEVBQUU7UUFDZix1QkFDRSwwQkFBMEIsRUFBRSxLQUFLLEVBQ2pDLDJCQUEyQixFQUFFLEtBQUssRUFDbEMsdUJBQXVCLEVBQUUsSUFBSSxFQUM3Qix3QkFBd0IsRUFBRSxJQUFJLElBQzNCLGFBQWEsRUFDaEI7S0FDSDtJQUVELE9BQU87UUFDTCwwQkFBMEIsRUFBRSxLQUFLO1FBQ2pDLDJCQUEyQixFQUFFLEtBQUs7UUFDbEMsdUJBQXVCLEVBQUUsS0FBSztRQUM5Qix3QkFBd0IsRUFBRSxLQUFLO0tBQ2hDLENBQUM7QUFDSixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxtQ0FBbUMsQ0FBQyxFQUNsRCwyQkFBMkIsRUFDM0IsMEJBQTBCLEdBQ1o7SUFDZDs7OztJQUFPLE9BQU8sQ0FBQyxFQUFFLENBQ2YsMkJBQTJCLElBQUksMEJBQTBCO1FBQ3ZELENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEVBQUU7WUFDckMsTUFBTTs7OztZQUFFLE1BQU0sQ0FBQyxFQUFFLENBQ2YsMkJBQTJCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUMxRCxLQUFLOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQTtTQUN4QyxDQUFDO1FBQ0osQ0FBQyxDQUFDLE9BQU8sRUFBQztBQUNoQixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxrQ0FBa0MsQ0FBQyxFQUNqRCx3QkFBd0IsRUFDeEIsdUJBQXVCLEdBQ1Q7SUFDZDs7OztJQUFPLE9BQU8sQ0FBQyxFQUFFLENBQ2Ysd0JBQXdCLElBQUksdUJBQXVCO1FBQ2pELENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxPQUFPLEVBQUU7WUFDcEMsTUFBTTs7OztZQUFFLE1BQU0sQ0FBQyxFQUFFLENBQ2Ysd0JBQXdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN2RCxLQUFLOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQTtTQUNyQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLE9BQU8sRUFBQztBQUNoQixDQUFDOzs7OztBQUVELFNBQVMsZ0JBQWdCLENBQUMsTUFBYztJQUN0QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUNsQyxhQUFzQztJQUV0QyxPQUFPO1FBQ0w7WUFDRSxPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLFFBQVEsRUFBRSxhQUFhO1NBQ3hCO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLFVBQVUsRUFBRSxxQkFBcUI7WUFDakMsSUFBSSxFQUFFLENBQUMsb0JBQW9CLENBQUM7U0FDN0I7UUFDRDtZQUNFLE9BQU8sRUFBRSxzQkFBc0I7WUFDL0IsSUFBSSxFQUFFLENBQUMsbUJBQW1CLENBQUM7WUFDM0IsVUFBVSxFQUFFLHlCQUF5QjtTQUN0QztRQUNEO1lBQ0UsT0FBTyxFQUFFLGFBQWE7WUFDdEIsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUM5QixVQUFVLEVBQUUsa0NBQWtDO1NBQy9DO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsYUFBYTtZQUN0QixLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQzlCLFVBQVUsRUFBRSxtQ0FBbUM7U0FDaEQ7S0FDRixDQUFDO0FBQ0osQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUscUJBQXFCLENBQ25DLGFBQTRCO0lBRTVCLE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0Rldk1vZGUsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBzZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcixcbiAgaW1tdXRhYmlsaXR5Q2hlY2tNZXRhUmVkdWNlcixcbn0gZnJvbSAnLi9tZXRhLXJlZHVjZXJzJztcbmltcG9ydCB7IFJ1bnRpbWVDaGVja3MsIE1ldGFSZWR1Y2VyLCBBY3Rpb24gfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge1xuICBfVVNFUl9SVU5USU1FX0NIRUNLUyxcbiAgX0FDVElWRV9SVU5USU1FX0NIRUNLUyxcbiAgTUVUQV9SRURVQ0VSUyxcbiAgVVNFUl9SVU5USU1FX0NIRUNLUyxcbn0gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aXZlUnVudGltZUNoZWNrcyhcbiAgcnVudGltZUNoZWNrcz86IFBhcnRpYWw8UnVudGltZUNoZWNrcz5cbik6IFJ1bnRpbWVDaGVja3Mge1xuICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHk6IGZhbHNlLFxuICAgICAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5OiBmYWxzZSxcbiAgICAgIHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5OiB0cnVlLFxuICAgICAgc3RyaWN0QWN0aW9uSW1tdXRhYmlsaXR5OiB0cnVlLFxuICAgICAgLi4ucnVudGltZUNoZWNrcyxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eTogZmFsc2UsXG4gICAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5OiBmYWxzZSxcbiAgICBzdHJpY3RTdGF0ZUltbXV0YWJpbGl0eTogZmFsc2UsXG4gICAgc3RyaWN0QWN0aW9uSW1tdXRhYmlsaXR5OiBmYWxzZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyKHtcbiAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5LFxuICBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eSxcbn06IFJ1bnRpbWVDaGVja3MpOiBNZXRhUmVkdWNlciB7XG4gIHJldHVybiByZWR1Y2VyID0+XG4gICAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5IHx8IHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5XG4gICAgICA/IHNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyKHJlZHVjZXIsIHtcbiAgICAgICAgICBhY3Rpb246IGFjdGlvbiA9PlxuICAgICAgICAgICAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5ICYmICFpZ25vcmVOZ3J4QWN0aW9uKGFjdGlvbiksXG4gICAgICAgICAgc3RhdGU6ICgpID0+IHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5LFxuICAgICAgICB9KVxuICAgICAgOiByZWR1Y2VyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW1tdXRhYmlsaXR5Q2hlY2tNZXRhUmVkdWNlcih7XG4gIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eSxcbiAgc3RyaWN0U3RhdGVJbW11dGFiaWxpdHksXG59OiBSdW50aW1lQ2hlY2tzKTogTWV0YVJlZHVjZXIge1xuICByZXR1cm4gcmVkdWNlciA9PlxuICAgIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eSB8fCBzdHJpY3RTdGF0ZUltbXV0YWJpbGl0eVxuICAgICAgPyBpbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyKHJlZHVjZXIsIHtcbiAgICAgICAgICBhY3Rpb246IGFjdGlvbiA9PlxuICAgICAgICAgICAgc3RyaWN0QWN0aW9uSW1tdXRhYmlsaXR5ICYmICFpZ25vcmVOZ3J4QWN0aW9uKGFjdGlvbiksXG4gICAgICAgICAgc3RhdGU6ICgpID0+IHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5LFxuICAgICAgICB9KVxuICAgICAgOiByZWR1Y2VyO1xufVxuXG5mdW5jdGlvbiBpZ25vcmVOZ3J4QWN0aW9uKGFjdGlvbjogQWN0aW9uKSB7XG4gIHJldHVybiBhY3Rpb24udHlwZS5zdGFydHNXaXRoKCdAbmdyeCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVJ1bnRpbWVDaGVja3MoXG4gIHJ1bnRpbWVDaGVja3M/OiBQYXJ0aWFsPFJ1bnRpbWVDaGVja3M+XG4pOiBQcm92aWRlcltdIHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBfVVNFUl9SVU5USU1FX0NIRUNLUyxcbiAgICAgIHVzZVZhbHVlOiBydW50aW1lQ2hlY2tzLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogVVNFUl9SVU5USU1FX0NIRUNLUyxcbiAgICAgIHVzZUZhY3Rvcnk6IF9ydW50aW1lQ2hlY2tzRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtfVVNFUl9SVU5USU1FX0NIRUNLU10sXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBfQUNUSVZFX1JVTlRJTUVfQ0hFQ0tTLFxuICAgICAgZGVwczogW1VTRVJfUlVOVElNRV9DSEVDS1NdLFxuICAgICAgdXNlRmFjdG9yeTogY3JlYXRlQWN0aXZlUnVudGltZUNoZWNrcyxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1FVEFfUkVEVUNFUlMsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgIGRlcHM6IFtfQUNUSVZFX1JVTlRJTUVfQ0hFQ0tTXSxcbiAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZUltbXV0YWJpbGl0eUNoZWNrTWV0YVJlZHVjZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBNRVRBX1JFRFVDRVJTLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICBkZXBzOiBbX0FDVElWRV9SVU5USU1FX0NIRUNLU10sXG4gICAgICB1c2VGYWN0b3J5OiBjcmVhdGVTZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcixcbiAgICB9LFxuICBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX3J1bnRpbWVDaGVja3NGYWN0b3J5KFxuICBydW50aW1lQ2hlY2tzOiBSdW50aW1lQ2hlY2tzXG4pOiBSdW50aW1lQ2hlY2tzIHtcbiAgcmV0dXJuIHJ1bnRpbWVDaGVja3M7XG59XG4iXX0=