/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZV9jaGVja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9ydW50aW1lX2NoZWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQ0wsNkJBQTZCLEVBQzdCLDRCQUE0QixHQUM3QixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsc0JBQXNCLEVBQ3RCLGFBQWEsRUFDYixtQkFBbUIsR0FDcEIsTUFBTSxVQUFVLENBQUM7Ozs7O0FBRWxCLE1BQU0sVUFBVSx5QkFBeUIsQ0FDdkMsYUFBc0M7SUFFdEMsSUFBSSxTQUFTLEVBQUUsRUFBRTtRQUNmLElBQUksYUFBYSxLQUFLLFNBQVMsRUFBRTtZQUMvQixPQUFPLENBQUMsSUFBSSxDQUNWLGtNQUFrTSxDQUNuTSxDQUFDO1NBQ0g7UUFDRCx1QkFDRSwwQkFBMEIsRUFBRSxLQUFLLEVBQ2pDLDJCQUEyQixFQUFFLEtBQUssRUFDbEMsdUJBQXVCLEVBQUUsS0FBSyxFQUM5Qix3QkFBd0IsRUFBRSxLQUFLLElBQzVCLGFBQWEsRUFDaEI7S0FDSDtJQUVELE9BQU87UUFDTCwwQkFBMEIsRUFBRSxLQUFLO1FBQ2pDLDJCQUEyQixFQUFFLEtBQUs7UUFDbEMsdUJBQXVCLEVBQUUsS0FBSztRQUM5Qix3QkFBd0IsRUFBRSxLQUFLO0tBQ2hDLENBQUM7QUFDSixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxtQ0FBbUMsQ0FBQyxFQUNsRCwyQkFBMkIsRUFDM0IsMEJBQTBCLEdBQ1o7SUFDZDs7OztJQUFPLE9BQU8sQ0FBQyxFQUFFLENBQ2YsMkJBQTJCLElBQUksMEJBQTBCO1FBQ3ZELENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEVBQUU7WUFDckMsTUFBTSxFQUFFLDJCQUEyQjtZQUNuQyxLQUFLLEVBQUUsMEJBQTBCO1NBQ2xDLENBQUM7UUFDSixDQUFDLENBQUMsT0FBTyxFQUFDO0FBQ2hCLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGtDQUFrQyxDQUFDLEVBQ2pELHdCQUF3QixFQUN4Qix1QkFBdUIsR0FDVDtJQUNkOzs7O0lBQU8sT0FBTyxDQUFDLEVBQUUsQ0FDZix3QkFBd0IsSUFBSSx1QkFBdUI7UUFDakQsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLE9BQU8sRUFBRTtZQUNwQyxNQUFNLEVBQUUsd0JBQXdCO1lBQ2hDLEtBQUssRUFBRSx1QkFBdUI7U0FDL0IsQ0FBQztRQUNKLENBQUMsQ0FBQyxPQUFPLEVBQUM7QUFDaEIsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQ2xDLGFBQXNDO0lBRXRDLE9BQU87UUFDTDtZQUNFLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsUUFBUSxFQUFFLGFBQWE7U0FDeEI7UUFDRDtZQUNFLE9BQU8sRUFBRSxtQkFBbUI7WUFDNUIsVUFBVSxFQUFFLHFCQUFxQjtZQUNqQyxJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztTQUM3QjtRQUNEO1lBQ0UsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixJQUFJLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztZQUMzQixVQUFVLEVBQUUseUJBQXlCO1NBQ3RDO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsYUFBYTtZQUN0QixLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQzlCLFVBQVUsRUFBRSxrQ0FBa0M7U0FDL0M7UUFDRDtZQUNFLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLEtBQUssRUFBRSxJQUFJO1lBQ1gsSUFBSSxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDOUIsVUFBVSxFQUFFLG1DQUFtQztTQUNoRDtLQUNGLENBQUM7QUFDSixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxxQkFBcUIsQ0FDbkMsYUFBNEI7SUFFNUIsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGV2TW9kZSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIHNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyLFxuICBpbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyLFxufSBmcm9tICcuL21ldGEtcmVkdWNlcnMnO1xuaW1wb3J0IHsgUnVudGltZUNoZWNrcywgTWV0YVJlZHVjZXIgfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge1xuICBfVVNFUl9SVU5USU1FX0NIRUNLUyxcbiAgX0FDVElWRV9SVU5USU1FX0NIRUNLUyxcbiAgTUVUQV9SRURVQ0VSUyxcbiAgVVNFUl9SVU5USU1FX0NIRUNLUyxcbn0gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aXZlUnVudGltZUNoZWNrcyhcbiAgcnVudGltZUNoZWNrcz86IFBhcnRpYWw8UnVudGltZUNoZWNrcz5cbik6IFJ1bnRpbWVDaGVja3Mge1xuICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICBpZiAocnVudGltZUNoZWNrcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdAbmdyeC9zdG9yZTogcnVudGltZSBjaGVja3MgYXJlIGN1cnJlbnRseSBvcHQtaW4gYnV0IHdpbGwgYmUgdGhlIGRlZmF1bHQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbiB3aXRoIHRoZSBwb3NzaWJpbGl0eSB0byBvcHQtb3V0LCBzZWUgaHR0cHM6Ly9uZ3J4LmlvL2d1aWRlL21pZ3JhdGlvbi92OCBmb3IgbW9yZSBpbmZvcm1hdGlvbi4nXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHk6IGZhbHNlLFxuICAgICAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5OiBmYWxzZSxcbiAgICAgIHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5OiBmYWxzZSxcbiAgICAgIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eTogZmFsc2UsXG4gICAgICAuLi5ydW50aW1lQ2hlY2tzLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5OiBmYWxzZSxcbiAgICBzdHJpY3RBY3Rpb25TZXJpYWxpemFiaWxpdHk6IGZhbHNlLFxuICAgIHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5OiBmYWxzZSxcbiAgICBzdHJpY3RBY3Rpb25JbW11dGFiaWxpdHk6IGZhbHNlLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIoe1xuICBzdHJpY3RBY3Rpb25TZXJpYWxpemFiaWxpdHksXG4gIHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5LFxufTogUnVudGltZUNoZWNrcyk6IE1ldGFSZWR1Y2VyIHtcbiAgcmV0dXJuIHJlZHVjZXIgPT5cbiAgICBzdHJpY3RBY3Rpb25TZXJpYWxpemFiaWxpdHkgfHwgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHlcbiAgICAgID8gc2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIocmVkdWNlciwge1xuICAgICAgICAgIGFjdGlvbjogc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5LFxuICAgICAgICAgIHN0YXRlOiBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eSxcbiAgICAgICAgfSlcbiAgICAgIDogcmVkdWNlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUltbXV0YWJpbGl0eUNoZWNrTWV0YVJlZHVjZXIoe1xuICBzdHJpY3RBY3Rpb25JbW11dGFiaWxpdHksXG4gIHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5LFxufTogUnVudGltZUNoZWNrcyk6IE1ldGFSZWR1Y2VyIHtcbiAgcmV0dXJuIHJlZHVjZXIgPT5cbiAgICBzdHJpY3RBY3Rpb25JbW11dGFiaWxpdHkgfHwgc3RyaWN0U3RhdGVJbW11dGFiaWxpdHlcbiAgICAgID8gaW1tdXRhYmlsaXR5Q2hlY2tNZXRhUmVkdWNlcihyZWR1Y2VyLCB7XG4gICAgICAgICAgYWN0aW9uOiBzdHJpY3RBY3Rpb25JbW11dGFiaWxpdHksXG4gICAgICAgICAgc3RhdGU6IHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5LFxuICAgICAgICB9KVxuICAgICAgOiByZWR1Y2VyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVJ1bnRpbWVDaGVja3MoXG4gIHJ1bnRpbWVDaGVja3M/OiBQYXJ0aWFsPFJ1bnRpbWVDaGVja3M+XG4pOiBQcm92aWRlcltdIHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBfVVNFUl9SVU5USU1FX0NIRUNLUyxcbiAgICAgIHVzZVZhbHVlOiBydW50aW1lQ2hlY2tzLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogVVNFUl9SVU5USU1FX0NIRUNLUyxcbiAgICAgIHVzZUZhY3Rvcnk6IF9ydW50aW1lQ2hlY2tzRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtfVVNFUl9SVU5USU1FX0NIRUNLU10sXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBfQUNUSVZFX1JVTlRJTUVfQ0hFQ0tTLFxuICAgICAgZGVwczogW1VTRVJfUlVOVElNRV9DSEVDS1NdLFxuICAgICAgdXNlRmFjdG9yeTogY3JlYXRlQWN0aXZlUnVudGltZUNoZWNrcyxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1FVEFfUkVEVUNFUlMsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgIGRlcHM6IFtfQUNUSVZFX1JVTlRJTUVfQ0hFQ0tTXSxcbiAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZUltbXV0YWJpbGl0eUNoZWNrTWV0YVJlZHVjZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBNRVRBX1JFRFVDRVJTLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICBkZXBzOiBbX0FDVElWRV9SVU5USU1FX0NIRUNLU10sXG4gICAgICB1c2VGYWN0b3J5OiBjcmVhdGVTZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcixcbiAgICB9LFxuICBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX3J1bnRpbWVDaGVja3NGYWN0b3J5KFxuICBydW50aW1lQ2hlY2tzOiBSdW50aW1lQ2hlY2tzXG4pOiBSdW50aW1lQ2hlY2tzIHtcbiAgcmV0dXJuIHJ1bnRpbWVDaGVja3M7XG59XG4iXX0=