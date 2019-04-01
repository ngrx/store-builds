var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { isDevMode } from '@angular/core';
import { stateSerializationCheckMetaReducer, actionSerializationCheckMetaReducer, immutabilityCheckMetaReducer, } from './meta-reducers';
import { _USER_RUNTIME_CHECKS, _ACTIVE_RUNTIME_CHECKS, META_REDUCERS, } from './tokens';
export function createActiveRuntimeChecks(runtimeChecks) {
    if (isDevMode()) {
        if (runtimeChecks === undefined) {
            console.warn('@ngrx/store: runtime checks are currently opt-in but will be the default in the next major version, see https://ngrx.io/guide/migration/v8 for more information.');
        }
        return __assign({ strictStateSerializability: false, strictActionSerializability: false, strictImmutability: false }, runtimeChecks);
    }
    return {
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictImmutability: false,
    };
}
export function createStateSerializationCheckMetaReducer(_a) {
    var strictStateSerializability = _a.strictStateSerializability;
    return function (reducer) {
        return strictStateSerializability
            ? stateSerializationCheckMetaReducer(reducer)
            : reducer;
    };
}
export function createActionSerializationCheckMetaReducer(_a) {
    var strictActionSerializability = _a.strictActionSerializability;
    return function (reducer) {
        return strictActionSerializability
            ? actionSerializationCheckMetaReducer(reducer)
            : reducer;
    };
}
export function createImmutabilityCheckMetaReducer(_a) {
    var strictImmutability = _a.strictImmutability;
    return function (reducer) {
        return strictImmutability ? immutabilityCheckMetaReducer(reducer) : reducer;
    };
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZV9jaGVja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9ydW50aW1lX2NoZWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUNMLGtDQUFrQyxFQUNsQyxtQ0FBbUMsRUFDbkMsNEJBQTRCLEdBQzdCLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixzQkFBc0IsRUFDdEIsYUFBYSxHQUNkLE1BQU0sVUFBVSxDQUFDO0FBRWxCLE1BQU0sVUFBVSx5QkFBeUIsQ0FDdkMsYUFBc0M7SUFFdEMsSUFBSSxTQUFTLEVBQUUsRUFBRTtRQUNmLElBQUksYUFBYSxLQUFLLFNBQVMsRUFBRTtZQUMvQixPQUFPLENBQUMsSUFBSSxDQUNWLGtLQUFrSyxDQUNuSyxDQUFDO1NBQ0g7UUFDRCxrQkFDRSwwQkFBMEIsRUFBRSxLQUFLLEVBQ2pDLDJCQUEyQixFQUFFLEtBQUssRUFDbEMsa0JBQWtCLEVBQUUsS0FBSyxJQUN0QixhQUFhLEVBQ2hCO0tBQ0g7SUFFRCxPQUFPO1FBQ0wsMEJBQTBCLEVBQUUsS0FBSztRQUNqQywyQkFBMkIsRUFBRSxLQUFLO1FBQ2xDLGtCQUFrQixFQUFFLEtBQUs7S0FDMUIsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsd0NBQXdDLENBQUMsRUFFekM7UUFEZCwwREFBMEI7SUFFMUIsT0FBTyxVQUFBLE9BQU87UUFDWixPQUFBLDBCQUEwQjtZQUN4QixDQUFDLENBQUMsa0NBQWtDLENBQUMsT0FBTyxDQUFDO1lBQzdDLENBQUMsQ0FBQyxPQUFPO0lBRlgsQ0FFVyxDQUFDO0FBQ2hCLENBQUM7QUFFRCxNQUFNLFVBQVUseUNBQXlDLENBQUMsRUFFMUM7UUFEZCw0REFBMkI7SUFFM0IsT0FBTyxVQUFBLE9BQU87UUFDWixPQUFBLDJCQUEyQjtZQUN6QixDQUFDLENBQUMsbUNBQW1DLENBQUMsT0FBTyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxPQUFPO0lBRlgsQ0FFVyxDQUFDO0FBQ2hCLENBQUM7QUFFRCxNQUFNLFVBQVUsa0NBQWtDLENBQUMsRUFFbkM7UUFEZCwwQ0FBa0I7SUFFbEIsT0FBTyxVQUFBLE9BQU87UUFDWixPQUFBLGtCQUFrQixDQUFDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztJQUFwRSxDQUFvRSxDQUFDO0FBQ3pFLENBQUM7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQ2xDLGFBQXNDO0lBRXRDLE9BQU87UUFDTDtZQUNFLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsUUFBUSxFQUFFLGFBQWE7U0FDeEI7UUFDRDtZQUNFLE9BQU8sRUFBRSxzQkFBc0I7WUFDL0IsSUFBSSxFQUFFLENBQUMsb0JBQW9CLENBQUM7WUFDNUIsVUFBVSxFQUFFLHlCQUF5QjtTQUN0QztRQUNEO1lBQ0UsT0FBTyxFQUFFLGFBQWE7WUFDdEIsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUM5QixVQUFVLEVBQUUsd0NBQXdDO1NBQ3JEO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsYUFBYTtZQUN0QixLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQzlCLFVBQVUsRUFBRSx5Q0FBeUM7U0FDdEQ7UUFDRDtZQUNFLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLEtBQUssRUFBRSxJQUFJO1lBQ1gsSUFBSSxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDOUIsVUFBVSxFQUFFLGtDQUFrQztTQUMvQztLQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNEZXZNb2RlLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgc3RhdGVTZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcixcbiAgYWN0aW9uU2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIsXG4gIGltbXV0YWJpbGl0eUNoZWNrTWV0YVJlZHVjZXIsXG59IGZyb20gJy4vbWV0YS1yZWR1Y2Vycyc7XG5pbXBvcnQgeyBSdW50aW1lQ2hlY2tzLCBNZXRhUmVkdWNlciB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7XG4gIF9VU0VSX1JVTlRJTUVfQ0hFQ0tTLFxuICBfQUNUSVZFX1JVTlRJTUVfQ0hFQ0tTLFxuICBNRVRBX1JFRFVDRVJTLFxufSBmcm9tICcuL3Rva2Vucyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3RpdmVSdW50aW1lQ2hlY2tzKFxuICBydW50aW1lQ2hlY2tzPzogUGFydGlhbDxSdW50aW1lQ2hlY2tzPlxuKTogUnVudGltZUNoZWNrcyB7XG4gIGlmIChpc0Rldk1vZGUoKSkge1xuICAgIGlmIChydW50aW1lQ2hlY2tzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ0BuZ3J4L3N0b3JlOiBydW50aW1lIGNoZWNrcyBhcmUgY3VycmVudGx5IG9wdC1pbiBidXQgd2lsbCBiZSB0aGUgZGVmYXVsdCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uLCBzZWUgaHR0cHM6Ly9uZ3J4LmlvL2d1aWRlL21pZ3JhdGlvbi92OCBmb3IgbW9yZSBpbmZvcm1hdGlvbi4nXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHk6IGZhbHNlLFxuICAgICAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5OiBmYWxzZSxcbiAgICAgIHN0cmljdEltbXV0YWJpbGl0eTogZmFsc2UsXG4gICAgICAuLi5ydW50aW1lQ2hlY2tzLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5OiBmYWxzZSxcbiAgICBzdHJpY3RBY3Rpb25TZXJpYWxpemFiaWxpdHk6IGZhbHNlLFxuICAgIHN0cmljdEltbXV0YWJpbGl0eTogZmFsc2UsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdGF0ZVNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyKHtcbiAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHksXG59OiBSdW50aW1lQ2hlY2tzKTogTWV0YVJlZHVjZXIge1xuICByZXR1cm4gcmVkdWNlciA9PlxuICAgIHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5XG4gICAgICA/IHN0YXRlU2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIocmVkdWNlcilcbiAgICAgIDogcmVkdWNlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvblNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyKHtcbiAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5LFxufTogUnVudGltZUNoZWNrcyk6IE1ldGFSZWR1Y2VyIHtcbiAgcmV0dXJuIHJlZHVjZXIgPT5cbiAgICBzdHJpY3RBY3Rpb25TZXJpYWxpemFiaWxpdHlcbiAgICAgID8gYWN0aW9uU2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIocmVkdWNlcilcbiAgICAgIDogcmVkdWNlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUltbXV0YWJpbGl0eUNoZWNrTWV0YVJlZHVjZXIoe1xuICBzdHJpY3RJbW11dGFiaWxpdHksXG59OiBSdW50aW1lQ2hlY2tzKTogTWV0YVJlZHVjZXIge1xuICByZXR1cm4gcmVkdWNlciA9PlxuICAgIHN0cmljdEltbXV0YWJpbGl0eSA/IGltbXV0YWJpbGl0eUNoZWNrTWV0YVJlZHVjZXIocmVkdWNlcikgOiByZWR1Y2VyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVJ1bnRpbWVDaGVja3MoXG4gIHJ1bnRpbWVDaGVja3M/OiBQYXJ0aWFsPFJ1bnRpbWVDaGVja3M+XG4pOiBQcm92aWRlcltdIHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBfVVNFUl9SVU5USU1FX0NIRUNLUyxcbiAgICAgIHVzZVZhbHVlOiBydW50aW1lQ2hlY2tzLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogX0FDVElWRV9SVU5USU1FX0NIRUNLUyxcbiAgICAgIGRlcHM6IFtfVVNFUl9SVU5USU1FX0NIRUNLU10sXG4gICAgICB1c2VGYWN0b3J5OiBjcmVhdGVBY3RpdmVSdW50aW1lQ2hlY2tzLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTUVUQV9SRURVQ0VSUyxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgZGVwczogW19BQ1RJVkVfUlVOVElNRV9DSEVDS1NdLFxuICAgICAgdXNlRmFjdG9yeTogY3JlYXRlU3RhdGVTZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcixcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1FVEFfUkVEVUNFUlMsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgIGRlcHM6IFtfQUNUSVZFX1JVTlRJTUVfQ0hFQ0tTXSxcbiAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZUFjdGlvblNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTUVUQV9SRURVQ0VSUyxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgZGVwczogW19BQ1RJVkVfUlVOVElNRV9DSEVDS1NdLFxuICAgICAgdXNlRmFjdG9yeTogY3JlYXRlSW1tdXRhYmlsaXR5Q2hlY2tNZXRhUmVkdWNlcixcbiAgICB9LFxuICBdO1xufVxuIl19