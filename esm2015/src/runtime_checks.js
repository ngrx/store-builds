/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isDevMode } from '@angular/core';
import { serializationCheckMetaReducer, immutabilityCheckMetaReducer, } from './meta-reducers';
import { _USER_RUNTIME_CHECKS, _ACTIVE_RUNTIME_CHECKS, META_REDUCERS, } from './tokens';
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
            provide: _ACTIVE_RUNTIME_CHECKS,
            deps: [_USER_RUNTIME_CHECKS],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZV9jaGVja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9ydW50aW1lX2NoZWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQ0wsNkJBQTZCLEVBQzdCLDRCQUE0QixHQUM3QixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsc0JBQXNCLEVBQ3RCLGFBQWEsR0FDZCxNQUFNLFVBQVUsQ0FBQzs7Ozs7QUFFbEIsTUFBTSxVQUFVLHlCQUF5QixDQUN2QyxhQUFzQztJQUV0QyxJQUFJLFNBQVMsRUFBRSxFQUFFO1FBQ2YsSUFBSSxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQ1Ysa01BQWtNLENBQ25NLENBQUM7U0FDSDtRQUNELHVCQUNFLDBCQUEwQixFQUFFLEtBQUssRUFDakMsMkJBQTJCLEVBQUUsS0FBSyxFQUNsQyx1QkFBdUIsRUFBRSxLQUFLLEVBQzlCLHdCQUF3QixFQUFFLEtBQUssSUFDNUIsYUFBYSxFQUNoQjtLQUNIO0lBRUQsT0FBTztRQUNMLDBCQUEwQixFQUFFLEtBQUs7UUFDakMsMkJBQTJCLEVBQUUsS0FBSztRQUNsQyx1QkFBdUIsRUFBRSxLQUFLO1FBQzlCLHdCQUF3QixFQUFFLEtBQUs7S0FDaEMsQ0FBQztBQUNKLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLG1DQUFtQyxDQUFDLEVBQ2xELDJCQUEyQixFQUMzQiwwQkFBMEIsR0FDWjtJQUNkOzs7O0lBQU8sT0FBTyxDQUFDLEVBQUUsQ0FDZiwyQkFBMkIsSUFBSSwwQkFBMEI7UUFDdkQsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLE9BQU8sRUFBRTtZQUNyQyxNQUFNLEVBQUUsMkJBQTJCO1lBQ25DLEtBQUssRUFBRSwwQkFBMEI7U0FDbEMsQ0FBQztRQUNKLENBQUMsQ0FBQyxPQUFPLEVBQUM7QUFDaEIsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsa0NBQWtDLENBQUMsRUFDakQsd0JBQXdCLEVBQ3hCLHVCQUF1QixHQUNUO0lBQ2Q7Ozs7SUFBTyxPQUFPLENBQUMsRUFBRSxDQUNmLHdCQUF3QixJQUFJLHVCQUF1QjtRQUNqRCxDQUFDLENBQUMsNEJBQTRCLENBQUMsT0FBTyxFQUFFO1lBQ3BDLE1BQU0sRUFBRSx3QkFBd0I7WUFDaEMsS0FBSyxFQUFFLHVCQUF1QjtTQUMvQixDQUFDO1FBQ0osQ0FBQyxDQUFDLE9BQU8sRUFBQztBQUNoQixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FDbEMsYUFBc0M7SUFFdEMsT0FBTztRQUNMO1lBQ0UsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixRQUFRLEVBQUUsYUFBYTtTQUN4QjtRQUNEO1lBQ0UsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztZQUM1QixVQUFVLEVBQUUseUJBQXlCO1NBQ3RDO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsYUFBYTtZQUN0QixLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQzlCLFVBQVUsRUFBRSxrQ0FBa0M7U0FDL0M7UUFDRDtZQUNFLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLEtBQUssRUFBRSxJQUFJO1lBQ1gsSUFBSSxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDOUIsVUFBVSxFQUFFLG1DQUFtQztTQUNoRDtLQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNEZXZNb2RlLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgc2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIsXG4gIGltbXV0YWJpbGl0eUNoZWNrTWV0YVJlZHVjZXIsXG59IGZyb20gJy4vbWV0YS1yZWR1Y2Vycyc7XG5pbXBvcnQgeyBSdW50aW1lQ2hlY2tzLCBNZXRhUmVkdWNlciB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7XG4gIF9VU0VSX1JVTlRJTUVfQ0hFQ0tTLFxuICBfQUNUSVZFX1JVTlRJTUVfQ0hFQ0tTLFxuICBNRVRBX1JFRFVDRVJTLFxufSBmcm9tICcuL3Rva2Vucyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3RpdmVSdW50aW1lQ2hlY2tzKFxuICBydW50aW1lQ2hlY2tzPzogUGFydGlhbDxSdW50aW1lQ2hlY2tzPlxuKTogUnVudGltZUNoZWNrcyB7XG4gIGlmIChpc0Rldk1vZGUoKSkge1xuICAgIGlmIChydW50aW1lQ2hlY2tzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ0BuZ3J4L3N0b3JlOiBydW50aW1lIGNoZWNrcyBhcmUgY3VycmVudGx5IG9wdC1pbiBidXQgd2lsbCBiZSB0aGUgZGVmYXVsdCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIHdpdGggdGhlIHBvc3NpYmlsaXR5IHRvIG9wdC1vdXQsIHNlZSBodHRwczovL25ncnguaW8vZ3VpZGUvbWlncmF0aW9uL3Y4IGZvciBtb3JlIGluZm9ybWF0aW9uLidcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eTogZmFsc2UsXG4gICAgICBzdHJpY3RBY3Rpb25TZXJpYWxpemFiaWxpdHk6IGZhbHNlLFxuICAgICAgc3RyaWN0U3RhdGVJbW11dGFiaWxpdHk6IGZhbHNlLFxuICAgICAgc3RyaWN0QWN0aW9uSW1tdXRhYmlsaXR5OiBmYWxzZSxcbiAgICAgIC4uLnJ1bnRpbWVDaGVja3MsXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHk6IGZhbHNlLFxuICAgIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eTogZmFsc2UsXG4gICAgc3RyaWN0U3RhdGVJbW11dGFiaWxpdHk6IGZhbHNlLFxuICAgIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eTogZmFsc2UsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcih7XG4gIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eSxcbiAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHksXG59OiBSdW50aW1lQ2hlY2tzKTogTWV0YVJlZHVjZXIge1xuICByZXR1cm4gcmVkdWNlciA9PlxuICAgIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eSB8fCBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eVxuICAgICAgPyBzZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcihyZWR1Y2VyLCB7XG4gICAgICAgICAgYWN0aW9uOiBzdHJpY3RBY3Rpb25TZXJpYWxpemFiaWxpdHksXG4gICAgICAgICAgc3RhdGU6IHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5LFxuICAgICAgICB9KVxuICAgICAgOiByZWR1Y2VyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW1tdXRhYmlsaXR5Q2hlY2tNZXRhUmVkdWNlcih7XG4gIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eSxcbiAgc3RyaWN0U3RhdGVJbW11dGFiaWxpdHksXG59OiBSdW50aW1lQ2hlY2tzKTogTWV0YVJlZHVjZXIge1xuICByZXR1cm4gcmVkdWNlciA9PlxuICAgIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eSB8fCBzdHJpY3RTdGF0ZUltbXV0YWJpbGl0eVxuICAgICAgPyBpbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyKHJlZHVjZXIsIHtcbiAgICAgICAgICBhY3Rpb246IHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eSxcbiAgICAgICAgICBzdGF0ZTogc3RyaWN0U3RhdGVJbW11dGFiaWxpdHksXG4gICAgICAgIH0pXG4gICAgICA6IHJlZHVjZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlUnVudGltZUNoZWNrcyhcbiAgcnVudGltZUNoZWNrcz86IFBhcnRpYWw8UnVudGltZUNoZWNrcz5cbik6IFByb3ZpZGVyW10ge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IF9VU0VSX1JVTlRJTUVfQ0hFQ0tTLFxuICAgICAgdXNlVmFsdWU6IHJ1bnRpbWVDaGVja3MsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBfQUNUSVZFX1JVTlRJTUVfQ0hFQ0tTLFxuICAgICAgZGVwczogW19VU0VSX1JVTlRJTUVfQ0hFQ0tTXSxcbiAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZUFjdGl2ZVJ1bnRpbWVDaGVja3MsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBNRVRBX1JFRFVDRVJTLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICBkZXBzOiBbX0FDVElWRV9SVU5USU1FX0NIRUNLU10sXG4gICAgICB1c2VGYWN0b3J5OiBjcmVhdGVJbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTUVUQV9SRURVQ0VSUyxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgZGVwczogW19BQ1RJVkVfUlVOVElNRV9DSEVDS1NdLFxuICAgICAgdXNlRmFjdG9yeTogY3JlYXRlU2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIsXG4gICAgfSxcbiAgXTtcbn1cbiJdfQ==