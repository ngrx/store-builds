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
        if (runtimeChecks === undefined) {
            console.warn('@ngrx/store: runtime checks are currently opt-in but will be the default in the next major version with the possibility to opt-out, see https://ngrx.io/guide/migration/v8 for more information.');
        }
        return Object.assign({ strictStateSerializability: false, strictActionSerializability: false, strictStateImmutability: false, strictActionImmutability: false }, runtimeChecks);
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
            action: strictActionSerializability,
            state: strictStateSerializability,
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
            action: strictActionImmutability,
            state: strictStateImmutability,
        })
        : reducer);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZV9jaGVja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9ydW50aW1lX2NoZWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUNMLDZCQUE2QixFQUM3Qiw0QkFBNEIsR0FDN0IsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLHNCQUFzQixFQUN0QixhQUFhLEVBQ2IsbUJBQW1CLEdBQ3BCLE1BQU0sVUFBVSxDQUFDOzs7OztBQUVsQixNQUFNLFVBQVUseUJBQXlCLENBQ3ZDLGFBQXNDO0lBRXRDLElBQUksU0FBUyxFQUFFLEVBQUU7UUFDZixJQUFJLGFBQWEsS0FBSyxTQUFTLEVBQUU7WUFDL0IsT0FBTyxDQUFDLElBQUksQ0FDVixrTUFBa00sQ0FDbk0sQ0FBQztTQUNIO1FBQ0QsdUJBQ0UsMEJBQTBCLEVBQUUsS0FBSyxFQUNqQywyQkFBMkIsRUFBRSxLQUFLLEVBQ2xDLHVCQUF1QixFQUFFLEtBQUssRUFDOUIsd0JBQXdCLEVBQUUsS0FBSyxJQUM1QixhQUFhLEVBQ2hCO0tBQ0g7SUFFRCxPQUFPO1FBQ0wsMEJBQTBCLEVBQUUsS0FBSztRQUNqQywyQkFBMkIsRUFBRSxLQUFLO1FBQ2xDLHVCQUF1QixFQUFFLEtBQUs7UUFDOUIsd0JBQXdCLEVBQUUsS0FBSztLQUNoQyxDQUFDO0FBQ0osQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsbUNBQW1DLENBQUMsRUFDbEQsMkJBQTJCLEVBQzNCLDBCQUEwQixHQUNaO0lBQ2Q7Ozs7SUFBTyxPQUFPLENBQUMsRUFBRSxDQUNmLDJCQUEyQixJQUFJLDBCQUEwQjtRQUN2RCxDQUFDLENBQUMsNkJBQTZCLENBQUMsT0FBTyxFQUFFO1lBQ3JDLE1BQU0sRUFBRSwyQkFBMkI7WUFDbkMsS0FBSyxFQUFFLDBCQUEwQjtTQUNsQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLE9BQU8sRUFBQztBQUNoQixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxrQ0FBa0MsQ0FBQyxFQUNqRCx3QkFBd0IsRUFDeEIsdUJBQXVCLEdBQ1Q7SUFDZDs7OztJQUFPLE9BQU8sQ0FBQyxFQUFFLENBQ2Ysd0JBQXdCLElBQUksdUJBQXVCO1FBQ2pELENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxPQUFPLEVBQUU7WUFDcEMsTUFBTSxFQUFFLHdCQUF3QjtZQUNoQyxLQUFLLEVBQUUsdUJBQXVCO1NBQy9CLENBQUM7UUFDSixDQUFDLENBQUMsT0FBTyxFQUFDO0FBQ2hCLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUNsQyxhQUFzQztJQUV0QyxPQUFPO1FBQ0w7WUFDRSxPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLFFBQVEsRUFBRSxhQUFhO1NBQ3hCO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLFVBQVUsRUFBRSxxQkFBcUI7WUFDakMsSUFBSSxFQUFFLENBQUMsb0JBQW9CLENBQUM7U0FDN0I7UUFDRDtZQUNFLE9BQU8sRUFBRSxzQkFBc0I7WUFDL0IsSUFBSSxFQUFFLENBQUMsbUJBQW1CLENBQUM7WUFDM0IsVUFBVSxFQUFFLHlCQUF5QjtTQUN0QztRQUNEO1lBQ0UsT0FBTyxFQUFFLGFBQWE7WUFDdEIsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUM5QixVQUFVLEVBQUUsa0NBQWtDO1NBQy9DO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsYUFBYTtZQUN0QixLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQzlCLFVBQVUsRUFBRSxtQ0FBbUM7U0FDaEQ7S0FDRixDQUFDO0FBQ0osQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUscUJBQXFCLENBQ25DLGFBQTRCO0lBRTVCLE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0Rldk1vZGUsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBzZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcixcbiAgaW1tdXRhYmlsaXR5Q2hlY2tNZXRhUmVkdWNlcixcbn0gZnJvbSAnLi9tZXRhLXJlZHVjZXJzJztcbmltcG9ydCB7IFJ1bnRpbWVDaGVja3MsIE1ldGFSZWR1Y2VyIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgX1VTRVJfUlVOVElNRV9DSEVDS1MsXG4gIF9BQ1RJVkVfUlVOVElNRV9DSEVDS1MsXG4gIE1FVEFfUkVEVUNFUlMsXG4gIFVTRVJfUlVOVElNRV9DSEVDS1MsXG59IGZyb20gJy4vdG9rZW5zJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGl2ZVJ1bnRpbWVDaGVja3MoXG4gIHJ1bnRpbWVDaGVja3M/OiBQYXJ0aWFsPFJ1bnRpbWVDaGVja3M+XG4pOiBSdW50aW1lQ2hlY2tzIHtcbiAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgaWYgKHJ1bnRpbWVDaGVja3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnQG5ncngvc3RvcmU6IHJ1bnRpbWUgY2hlY2tzIGFyZSBjdXJyZW50bHkgb3B0LWluIGJ1dCB3aWxsIGJlIHRoZSBkZWZhdWx0IGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24gd2l0aCB0aGUgcG9zc2liaWxpdHkgdG8gb3B0LW91dCwgc2VlIGh0dHBzOi8vbmdyeC5pby9ndWlkZS9taWdyYXRpb24vdjggZm9yIG1vcmUgaW5mb3JtYXRpb24uJ1xuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5OiBmYWxzZSxcbiAgICAgIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eTogZmFsc2UsXG4gICAgICBzdHJpY3RTdGF0ZUltbXV0YWJpbGl0eTogZmFsc2UsXG4gICAgICBzdHJpY3RBY3Rpb25JbW11dGFiaWxpdHk6IGZhbHNlLFxuICAgICAgLi4ucnVudGltZUNoZWNrcyxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eTogZmFsc2UsXG4gICAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5OiBmYWxzZSxcbiAgICBzdHJpY3RTdGF0ZUltbXV0YWJpbGl0eTogZmFsc2UsXG4gICAgc3RyaWN0QWN0aW9uSW1tdXRhYmlsaXR5OiBmYWxzZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyKHtcbiAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5LFxuICBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eSxcbn06IFJ1bnRpbWVDaGVja3MpOiBNZXRhUmVkdWNlciB7XG4gIHJldHVybiByZWR1Y2VyID0+XG4gICAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5IHx8IHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5XG4gICAgICA/IHNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyKHJlZHVjZXIsIHtcbiAgICAgICAgICBhY3Rpb246IHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eSxcbiAgICAgICAgICBzdGF0ZTogc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHksXG4gICAgICAgIH0pXG4gICAgICA6IHJlZHVjZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyKHtcbiAgc3RyaWN0QWN0aW9uSW1tdXRhYmlsaXR5LFxuICBzdHJpY3RTdGF0ZUltbXV0YWJpbGl0eSxcbn06IFJ1bnRpbWVDaGVja3MpOiBNZXRhUmVkdWNlciB7XG4gIHJldHVybiByZWR1Y2VyID0+XG4gICAgc3RyaWN0QWN0aW9uSW1tdXRhYmlsaXR5IHx8IHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5XG4gICAgICA/IGltbXV0YWJpbGl0eUNoZWNrTWV0YVJlZHVjZXIocmVkdWNlciwge1xuICAgICAgICAgIGFjdGlvbjogc3RyaWN0QWN0aW9uSW1tdXRhYmlsaXR5LFxuICAgICAgICAgIHN0YXRlOiBzdHJpY3RTdGF0ZUltbXV0YWJpbGl0eSxcbiAgICAgICAgfSlcbiAgICAgIDogcmVkdWNlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVSdW50aW1lQ2hlY2tzKFxuICBydW50aW1lQ2hlY2tzPzogUGFydGlhbDxSdW50aW1lQ2hlY2tzPlxuKTogUHJvdmlkZXJbXSB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogX1VTRVJfUlVOVElNRV9DSEVDS1MsXG4gICAgICB1c2VWYWx1ZTogcnVudGltZUNoZWNrcyxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFVTRVJfUlVOVElNRV9DSEVDS1MsXG4gICAgICB1c2VGYWN0b3J5OiBfcnVudGltZUNoZWNrc0ZhY3RvcnksXG4gICAgICBkZXBzOiBbX1VTRVJfUlVOVElNRV9DSEVDS1NdLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogX0FDVElWRV9SVU5USU1FX0NIRUNLUyxcbiAgICAgIGRlcHM6IFtVU0VSX1JVTlRJTUVfQ0hFQ0tTXSxcbiAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZUFjdGl2ZVJ1bnRpbWVDaGVja3MsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBNRVRBX1JFRFVDRVJTLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICBkZXBzOiBbX0FDVElWRV9SVU5USU1FX0NIRUNLU10sXG4gICAgICB1c2VGYWN0b3J5OiBjcmVhdGVJbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTUVUQV9SRURVQ0VSUyxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgZGVwczogW19BQ1RJVkVfUlVOVElNRV9DSEVDS1NdLFxuICAgICAgdXNlRmFjdG9yeTogY3JlYXRlU2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIsXG4gICAgfSxcbiAgXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9ydW50aW1lQ2hlY2tzRmFjdG9yeShcbiAgcnVudGltZUNoZWNrczogUnVudGltZUNoZWNrc1xuKTogUnVudGltZUNoZWNrcyB7XG4gIHJldHVybiBydW50aW1lQ2hlY2tzO1xufVxuIl19