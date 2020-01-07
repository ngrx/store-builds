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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZV9jaGVja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9ydW50aW1lX2NoZWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUNMLDZCQUE2QixFQUM3Qiw0QkFBNEIsR0FDN0IsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLHNCQUFzQixFQUN0QixhQUFhLEVBQ2IsbUJBQW1CLEdBQ3BCLE1BQU0sVUFBVSxDQUFDOzs7OztBQUVsQixNQUFNLFVBQVUseUJBQXlCLENBQ3ZDLGFBQXNDO0lBRXRDLElBQUksU0FBUyxFQUFFLEVBQUU7UUFDZix1QkFDRSwwQkFBMEIsRUFBRSxLQUFLLEVBQ2pDLDJCQUEyQixFQUFFLEtBQUssRUFDbEMsdUJBQXVCLEVBQUUsSUFBSSxFQUM3Qix3QkFBd0IsRUFBRSxJQUFJLElBQzNCLGFBQWEsRUFDaEI7S0FDSDtJQUVELE9BQU87UUFDTCwwQkFBMEIsRUFBRSxLQUFLO1FBQ2pDLDJCQUEyQixFQUFFLEtBQUs7UUFDbEMsdUJBQXVCLEVBQUUsS0FBSztRQUM5Qix3QkFBd0IsRUFBRSxLQUFLO0tBQ2hDLENBQUM7QUFDSixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxtQ0FBbUMsQ0FBQyxFQUNsRCwyQkFBMkIsRUFDM0IsMEJBQTBCLEdBQ1o7SUFDZDs7OztJQUFPLE9BQU8sQ0FBQyxFQUFFLENBQ2YsMkJBQTJCLElBQUksMEJBQTBCO1FBQ3ZELENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEVBQUU7WUFDckMsTUFBTSxFQUFFLDJCQUEyQjtZQUNuQyxLQUFLLEVBQUUsMEJBQTBCO1NBQ2xDLENBQUM7UUFDSixDQUFDLENBQUMsT0FBTyxFQUFDO0FBQ2hCLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGtDQUFrQyxDQUFDLEVBQ2pELHdCQUF3QixFQUN4Qix1QkFBdUIsR0FDVDtJQUNkOzs7O0lBQU8sT0FBTyxDQUFDLEVBQUUsQ0FDZix3QkFBd0IsSUFBSSx1QkFBdUI7UUFDakQsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLE9BQU8sRUFBRTtZQUNwQyxNQUFNLEVBQUUsd0JBQXdCO1lBQ2hDLEtBQUssRUFBRSx1QkFBdUI7U0FDL0IsQ0FBQztRQUNKLENBQUMsQ0FBQyxPQUFPLEVBQUM7QUFDaEIsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQ2xDLGFBQXNDO0lBRXRDLE9BQU87UUFDTDtZQUNFLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsUUFBUSxFQUFFLGFBQWE7U0FDeEI7UUFDRDtZQUNFLE9BQU8sRUFBRSxtQkFBbUI7WUFDNUIsVUFBVSxFQUFFLHFCQUFxQjtZQUNqQyxJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztTQUM3QjtRQUNEO1lBQ0UsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixJQUFJLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztZQUMzQixVQUFVLEVBQUUseUJBQXlCO1NBQ3RDO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsYUFBYTtZQUN0QixLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQzlCLFVBQVUsRUFBRSxrQ0FBa0M7U0FDL0M7UUFDRDtZQUNFLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLEtBQUssRUFBRSxJQUFJO1lBQ1gsSUFBSSxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDOUIsVUFBVSxFQUFFLG1DQUFtQztTQUNoRDtLQUNGLENBQUM7QUFDSixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxxQkFBcUIsQ0FDbkMsYUFBNEI7SUFFNUIsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGV2TW9kZSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIHNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyLFxuICBpbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyLFxufSBmcm9tICcuL21ldGEtcmVkdWNlcnMnO1xuaW1wb3J0IHsgUnVudGltZUNoZWNrcywgTWV0YVJlZHVjZXIgfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge1xuICBfVVNFUl9SVU5USU1FX0NIRUNLUyxcbiAgX0FDVElWRV9SVU5USU1FX0NIRUNLUyxcbiAgTUVUQV9SRURVQ0VSUyxcbiAgVVNFUl9SVU5USU1FX0NIRUNLUyxcbn0gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aXZlUnVudGltZUNoZWNrcyhcbiAgcnVudGltZUNoZWNrcz86IFBhcnRpYWw8UnVudGltZUNoZWNrcz5cbik6IFJ1bnRpbWVDaGVja3Mge1xuICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHk6IGZhbHNlLFxuICAgICAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5OiBmYWxzZSxcbiAgICAgIHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5OiB0cnVlLFxuICAgICAgc3RyaWN0QWN0aW9uSW1tdXRhYmlsaXR5OiB0cnVlLFxuICAgICAgLi4ucnVudGltZUNoZWNrcyxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eTogZmFsc2UsXG4gICAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5OiBmYWxzZSxcbiAgICBzdHJpY3RTdGF0ZUltbXV0YWJpbGl0eTogZmFsc2UsXG4gICAgc3RyaWN0QWN0aW9uSW1tdXRhYmlsaXR5OiBmYWxzZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyKHtcbiAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5LFxuICBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eSxcbn06IFJ1bnRpbWVDaGVja3MpOiBNZXRhUmVkdWNlciB7XG4gIHJldHVybiByZWR1Y2VyID0+XG4gICAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5IHx8IHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5XG4gICAgICA/IHNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyKHJlZHVjZXIsIHtcbiAgICAgICAgICBhY3Rpb246IHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eSxcbiAgICAgICAgICBzdGF0ZTogc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHksXG4gICAgICAgIH0pXG4gICAgICA6IHJlZHVjZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyKHtcbiAgc3RyaWN0QWN0aW9uSW1tdXRhYmlsaXR5LFxuICBzdHJpY3RTdGF0ZUltbXV0YWJpbGl0eSxcbn06IFJ1bnRpbWVDaGVja3MpOiBNZXRhUmVkdWNlciB7XG4gIHJldHVybiByZWR1Y2VyID0+XG4gICAgc3RyaWN0QWN0aW9uSW1tdXRhYmlsaXR5IHx8IHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5XG4gICAgICA/IGltbXV0YWJpbGl0eUNoZWNrTWV0YVJlZHVjZXIocmVkdWNlciwge1xuICAgICAgICAgIGFjdGlvbjogc3RyaWN0QWN0aW9uSW1tdXRhYmlsaXR5LFxuICAgICAgICAgIHN0YXRlOiBzdHJpY3RTdGF0ZUltbXV0YWJpbGl0eSxcbiAgICAgICAgfSlcbiAgICAgIDogcmVkdWNlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVSdW50aW1lQ2hlY2tzKFxuICBydW50aW1lQ2hlY2tzPzogUGFydGlhbDxSdW50aW1lQ2hlY2tzPlxuKTogUHJvdmlkZXJbXSB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogX1VTRVJfUlVOVElNRV9DSEVDS1MsXG4gICAgICB1c2VWYWx1ZTogcnVudGltZUNoZWNrcyxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFVTRVJfUlVOVElNRV9DSEVDS1MsXG4gICAgICB1c2VGYWN0b3J5OiBfcnVudGltZUNoZWNrc0ZhY3RvcnksXG4gICAgICBkZXBzOiBbX1VTRVJfUlVOVElNRV9DSEVDS1NdLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogX0FDVElWRV9SVU5USU1FX0NIRUNLUyxcbiAgICAgIGRlcHM6IFtVU0VSX1JVTlRJTUVfQ0hFQ0tTXSxcbiAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZUFjdGl2ZVJ1bnRpbWVDaGVja3MsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBNRVRBX1JFRFVDRVJTLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICBkZXBzOiBbX0FDVElWRV9SVU5USU1FX0NIRUNLU10sXG4gICAgICB1c2VGYWN0b3J5OiBjcmVhdGVJbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTUVUQV9SRURVQ0VSUyxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgZGVwczogW19BQ1RJVkVfUlVOVElNRV9DSEVDS1NdLFxuICAgICAgdXNlRmFjdG9yeTogY3JlYXRlU2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIsXG4gICAgfSxcbiAgXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9ydW50aW1lQ2hlY2tzRmFjdG9yeShcbiAgcnVudGltZUNoZWNrczogUnVudGltZUNoZWNrc1xuKTogUnVudGltZUNoZWNrcyB7XG4gIHJldHVybiBydW50aW1lQ2hlY2tzO1xufVxuIl19