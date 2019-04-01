/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isDevMode } from '@angular/core';
import { stateSerializationCheckMetaReducer, actionSerializationCheckMetaReducer, immutabilityCheckMetaReducer, } from './meta-reducers';
import { _USER_RUNTIME_CHECKS, _ACTIVE_RUNTIME_CHECKS, META_REDUCERS, } from './tokens';
/**
 * @param {?=} runtimeChecks
 * @return {?}
 */
export function createActiveRuntimeChecks(runtimeChecks) {
    if (isDevMode()) {
        if (runtimeChecks === undefined) {
            console.warn('@ngrx/store: runtime checks are currently opt-in but will be the default in the next major version, see https://ngrx.io/guide/migration/v8 for more information.');
        }
        return Object.assign({ strictStateSerializability: false, strictActionSerializability: false, strictImmutability: false }, runtimeChecks);
    }
    return {
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictImmutability: false,
    };
}
/**
 * @param {?} __0
 * @return {?}
 */
export function createStateSerializationCheckMetaReducer({ strictStateSerializability, }) {
    return (/**
     * @param {?} reducer
     * @return {?}
     */
    reducer => strictStateSerializability
        ? stateSerializationCheckMetaReducer(reducer)
        : reducer);
}
/**
 * @param {?} __0
 * @return {?}
 */
export function createActionSerializationCheckMetaReducer({ strictActionSerializability, }) {
    return (/**
     * @param {?} reducer
     * @return {?}
     */
    reducer => strictActionSerializability
        ? actionSerializationCheckMetaReducer(reducer)
        : reducer);
}
/**
 * @param {?} __0
 * @return {?}
 */
export function createImmutabilityCheckMetaReducer({ strictImmutability, }) {
    return (/**
     * @param {?} reducer
     * @return {?}
     */
    reducer => strictImmutability ? immutabilityCheckMetaReducer(reducer) : reducer);
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
            provide: _ACTIVE_RUNTIME_CHECKS,
            deps: [_USER_RUNTIME_CHECKS],
            useFactory: createActiveRuntimeChecks,
        },
        {
            provide: META_REDUCERS,
            multi: true,
            deps: [_ACTIVE_RUNTIME_CHECKS],
            useFactory: createStateSerializationCheckMetaReducer,
        },
        {
            provide: META_REDUCERS,
            multi: true,
            deps: [_ACTIVE_RUNTIME_CHECKS],
            useFactory: createActionSerializationCheckMetaReducer,
        },
        {
            provide: META_REDUCERS,
            multi: true,
            deps: [_ACTIVE_RUNTIME_CHECKS],
            useFactory: createImmutabilityCheckMetaReducer,
        },
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZV9jaGVja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9ydW50aW1lX2NoZWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQ0wsa0NBQWtDLEVBQ2xDLG1DQUFtQyxFQUNuQyw0QkFBNEIsR0FDN0IsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLHNCQUFzQixFQUN0QixhQUFhLEdBQ2QsTUFBTSxVQUFVLENBQUM7Ozs7O0FBRWxCLE1BQU0sVUFBVSx5QkFBeUIsQ0FDdkMsYUFBc0M7SUFFdEMsSUFBSSxTQUFTLEVBQUUsRUFBRTtRQUNmLElBQUksYUFBYSxLQUFLLFNBQVMsRUFBRTtZQUMvQixPQUFPLENBQUMsSUFBSSxDQUNWLGtLQUFrSyxDQUNuSyxDQUFDO1NBQ0g7UUFDRCx1QkFDRSwwQkFBMEIsRUFBRSxLQUFLLEVBQ2pDLDJCQUEyQixFQUFFLEtBQUssRUFDbEMsa0JBQWtCLEVBQUUsS0FBSyxJQUN0QixhQUFhLEVBQ2hCO0tBQ0g7SUFFRCxPQUFPO1FBQ0wsMEJBQTBCLEVBQUUsS0FBSztRQUNqQywyQkFBMkIsRUFBRSxLQUFLO1FBQ2xDLGtCQUFrQixFQUFFLEtBQUs7S0FDMUIsQ0FBQztBQUNKLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLHdDQUF3QyxDQUFDLEVBQ3ZELDBCQUEwQixHQUNaO0lBQ2Q7Ozs7SUFBTyxPQUFPLENBQUMsRUFBRSxDQUNmLDBCQUEwQjtRQUN4QixDQUFDLENBQUMsa0NBQWtDLENBQUMsT0FBTyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxPQUFPLEVBQUM7QUFDaEIsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUseUNBQXlDLENBQUMsRUFDeEQsMkJBQTJCLEdBQ2I7SUFDZDs7OztJQUFPLE9BQU8sQ0FBQyxFQUFFLENBQ2YsMkJBQTJCO1FBQ3pCLENBQUMsQ0FBQyxtQ0FBbUMsQ0FBQyxPQUFPLENBQUM7UUFDOUMsQ0FBQyxDQUFDLE9BQU8sRUFBQztBQUNoQixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxrQ0FBa0MsQ0FBQyxFQUNqRCxrQkFBa0IsR0FDSjtJQUNkOzs7O0lBQU8sT0FBTyxDQUFDLEVBQUUsQ0FDZixrQkFBa0IsQ0FBQyxDQUFDLENBQUMsNEJBQTRCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBQztBQUN6RSxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FDbEMsYUFBc0M7SUFFdEMsT0FBTztRQUNMO1lBQ0UsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixRQUFRLEVBQUUsYUFBYTtTQUN4QjtRQUNEO1lBQ0UsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztZQUM1QixVQUFVLEVBQUUseUJBQXlCO1NBQ3RDO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsYUFBYTtZQUN0QixLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQzlCLFVBQVUsRUFBRSx3Q0FBd0M7U0FDckQ7UUFDRDtZQUNFLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLEtBQUssRUFBRSxJQUFJO1lBQ1gsSUFBSSxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDOUIsVUFBVSxFQUFFLHlDQUF5QztTQUN0RDtRQUNEO1lBQ0UsT0FBTyxFQUFFLGFBQWE7WUFDdEIsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUM5QixVQUFVLEVBQUUsa0NBQWtDO1NBQy9DO0tBQ0YsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0Rldk1vZGUsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBzdGF0ZVNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyLFxuICBhY3Rpb25TZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcixcbiAgaW1tdXRhYmlsaXR5Q2hlY2tNZXRhUmVkdWNlcixcbn0gZnJvbSAnLi9tZXRhLXJlZHVjZXJzJztcbmltcG9ydCB7IFJ1bnRpbWVDaGVja3MsIE1ldGFSZWR1Y2VyIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgX1VTRVJfUlVOVElNRV9DSEVDS1MsXG4gIF9BQ1RJVkVfUlVOVElNRV9DSEVDS1MsXG4gIE1FVEFfUkVEVUNFUlMsXG59IGZyb20gJy4vdG9rZW5zJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGl2ZVJ1bnRpbWVDaGVja3MoXG4gIHJ1bnRpbWVDaGVja3M/OiBQYXJ0aWFsPFJ1bnRpbWVDaGVja3M+XG4pOiBSdW50aW1lQ2hlY2tzIHtcbiAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgaWYgKHJ1bnRpbWVDaGVja3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnQG5ncngvc3RvcmU6IHJ1bnRpbWUgY2hlY2tzIGFyZSBjdXJyZW50bHkgb3B0LWluIGJ1dCB3aWxsIGJlIHRoZSBkZWZhdWx0IGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24sIHNlZSBodHRwczovL25ncnguaW8vZ3VpZGUvbWlncmF0aW9uL3Y4IGZvciBtb3JlIGluZm9ybWF0aW9uLidcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eTogZmFsc2UsXG4gICAgICBzdHJpY3RBY3Rpb25TZXJpYWxpemFiaWxpdHk6IGZhbHNlLFxuICAgICAgc3RyaWN0SW1tdXRhYmlsaXR5OiBmYWxzZSxcbiAgICAgIC4uLnJ1bnRpbWVDaGVja3MsXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHk6IGZhbHNlLFxuICAgIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eTogZmFsc2UsXG4gICAgc3RyaWN0SW1tdXRhYmlsaXR5OiBmYWxzZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0YXRlU2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIoe1xuICBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eSxcbn06IFJ1bnRpbWVDaGVja3MpOiBNZXRhUmVkdWNlciB7XG4gIHJldHVybiByZWR1Y2VyID0+XG4gICAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHlcbiAgICAgID8gc3RhdGVTZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcihyZWR1Y2VyKVxuICAgICAgOiByZWR1Y2VyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uU2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIoe1xuICBzdHJpY3RBY3Rpb25TZXJpYWxpemFiaWxpdHksXG59OiBSdW50aW1lQ2hlY2tzKTogTWV0YVJlZHVjZXIge1xuICByZXR1cm4gcmVkdWNlciA9PlxuICAgIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eVxuICAgICAgPyBhY3Rpb25TZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcihyZWR1Y2VyKVxuICAgICAgOiByZWR1Y2VyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW1tdXRhYmlsaXR5Q2hlY2tNZXRhUmVkdWNlcih7XG4gIHN0cmljdEltbXV0YWJpbGl0eSxcbn06IFJ1bnRpbWVDaGVja3MpOiBNZXRhUmVkdWNlciB7XG4gIHJldHVybiByZWR1Y2VyID0+XG4gICAgc3RyaWN0SW1tdXRhYmlsaXR5ID8gaW1tdXRhYmlsaXR5Q2hlY2tNZXRhUmVkdWNlcihyZWR1Y2VyKSA6IHJlZHVjZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlUnVudGltZUNoZWNrcyhcbiAgcnVudGltZUNoZWNrcz86IFBhcnRpYWw8UnVudGltZUNoZWNrcz5cbik6IFByb3ZpZGVyW10ge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IF9VU0VSX1JVTlRJTUVfQ0hFQ0tTLFxuICAgICAgdXNlVmFsdWU6IHJ1bnRpbWVDaGVja3MsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBfQUNUSVZFX1JVTlRJTUVfQ0hFQ0tTLFxuICAgICAgZGVwczogW19VU0VSX1JVTlRJTUVfQ0hFQ0tTXSxcbiAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZUFjdGl2ZVJ1bnRpbWVDaGVja3MsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBNRVRBX1JFRFVDRVJTLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICBkZXBzOiBbX0FDVElWRV9SVU5USU1FX0NIRUNLU10sXG4gICAgICB1c2VGYWN0b3J5OiBjcmVhdGVTdGF0ZVNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTUVUQV9SRURVQ0VSUyxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgZGVwczogW19BQ1RJVkVfUlVOVElNRV9DSEVDS1NdLFxuICAgICAgdXNlRmFjdG9yeTogY3JlYXRlQWN0aW9uU2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBNRVRBX1JFRFVDRVJTLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICBkZXBzOiBbX0FDVElWRV9SVU5USU1FX0NIRUNLU10sXG4gICAgICB1c2VGYWN0b3J5OiBjcmVhdGVJbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyLFxuICAgIH0sXG4gIF07XG59XG4iXX0=