import * as tslib_1 from "tslib";
import { isDevMode } from '@angular/core';
import { serializationCheckMetaReducer, immutabilityCheckMetaReducer, } from './meta-reducers';
import { _USER_RUNTIME_CHECKS, _ACTIVE_RUNTIME_CHECKS, META_REDUCERS, USER_RUNTIME_CHECKS, } from './tokens';
export function createActiveRuntimeChecks(runtimeChecks) {
    if (isDevMode()) {
        if (runtimeChecks === undefined) {
            console.warn('@ngrx/store: runtime checks are currently opt-in but will be the default in the next major version with the possibility to opt-out, see https://ngrx.io/guide/migration/v8 for more information.');
        }
        return tslib_1.__assign({ strictStateSerializability: false, strictActionSerializability: false, strictStateImmutability: false, strictActionImmutability: false }, runtimeChecks);
    }
    return {
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictStateImmutability: false,
        strictActionImmutability: false,
    };
}
export function createSerializationCheckMetaReducer(_a) {
    var strictActionSerializability = _a.strictActionSerializability, strictStateSerializability = _a.strictStateSerializability;
    return function (reducer) {
        return strictActionSerializability || strictStateSerializability
            ? serializationCheckMetaReducer(reducer, {
                action: strictActionSerializability,
                state: strictStateSerializability,
            })
            : reducer;
    };
}
export function createImmutabilityCheckMetaReducer(_a) {
    var strictActionImmutability = _a.strictActionImmutability, strictStateImmutability = _a.strictStateImmutability;
    return function (reducer) {
        return strictActionImmutability || strictStateImmutability
            ? immutabilityCheckMetaReducer(reducer, {
                action: strictActionImmutability,
                state: strictStateImmutability,
            })
            : reducer;
    };
}
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
export function _runtimeChecksFactory(runtimeChecks) {
    return runtimeChecks;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZV9jaGVja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9ydW50aW1lX2NoZWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQ0wsNkJBQTZCLEVBQzdCLDRCQUE0QixHQUM3QixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsc0JBQXNCLEVBQ3RCLGFBQWEsRUFDYixtQkFBbUIsR0FDcEIsTUFBTSxVQUFVLENBQUM7QUFFbEIsTUFBTSxVQUFVLHlCQUF5QixDQUN2QyxhQUFzQztJQUV0QyxJQUFJLFNBQVMsRUFBRSxFQUFFO1FBQ2YsSUFBSSxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQ1Ysa01BQWtNLENBQ25NLENBQUM7U0FDSDtRQUNELDBCQUNFLDBCQUEwQixFQUFFLEtBQUssRUFDakMsMkJBQTJCLEVBQUUsS0FBSyxFQUNsQyx1QkFBdUIsRUFBRSxLQUFLLEVBQzlCLHdCQUF3QixFQUFFLEtBQUssSUFDNUIsYUFBYSxFQUNoQjtLQUNIO0lBRUQsT0FBTztRQUNMLDBCQUEwQixFQUFFLEtBQUs7UUFDakMsMkJBQTJCLEVBQUUsS0FBSztRQUNsQyx1QkFBdUIsRUFBRSxLQUFLO1FBQzlCLHdCQUF3QixFQUFFLEtBQUs7S0FDaEMsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsbUNBQW1DLENBQUMsRUFHcEM7UUFGZCw0REFBMkIsRUFDM0IsMERBQTBCO0lBRTFCLE9BQU8sVUFBQSxPQUFPO1FBQ1osT0FBQSwyQkFBMkIsSUFBSSwwQkFBMEI7WUFDdkQsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLE9BQU8sRUFBRTtnQkFDckMsTUFBTSxFQUFFLDJCQUEyQjtnQkFDbkMsS0FBSyxFQUFFLDBCQUEwQjthQUNsQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLE9BQU87SUFMWCxDQUtXLENBQUM7QUFDaEIsQ0FBQztBQUVELE1BQU0sVUFBVSxrQ0FBa0MsQ0FBQyxFQUduQztRQUZkLHNEQUF3QixFQUN4QixvREFBdUI7SUFFdkIsT0FBTyxVQUFBLE9BQU87UUFDWixPQUFBLHdCQUF3QixJQUFJLHVCQUF1QjtZQUNqRCxDQUFDLENBQUMsNEJBQTRCLENBQUMsT0FBTyxFQUFFO2dCQUNwQyxNQUFNLEVBQUUsd0JBQXdCO2dCQUNoQyxLQUFLLEVBQUUsdUJBQXVCO2FBQy9CLENBQUM7WUFDSixDQUFDLENBQUMsT0FBTztJQUxYLENBS1csQ0FBQztBQUNoQixDQUFDO0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUNsQyxhQUFzQztJQUV0QyxPQUFPO1FBQ0w7WUFDRSxPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLFFBQVEsRUFBRSxhQUFhO1NBQ3hCO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLFVBQVUsRUFBRSxxQkFBcUI7WUFDakMsSUFBSSxFQUFFLENBQUMsb0JBQW9CLENBQUM7U0FDN0I7UUFDRDtZQUNFLE9BQU8sRUFBRSxzQkFBc0I7WUFDL0IsSUFBSSxFQUFFLENBQUMsbUJBQW1CLENBQUM7WUFDM0IsVUFBVSxFQUFFLHlCQUF5QjtTQUN0QztRQUNEO1lBQ0UsT0FBTyxFQUFFLGFBQWE7WUFDdEIsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUM5QixVQUFVLEVBQUUsa0NBQWtDO1NBQy9DO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsYUFBYTtZQUN0QixLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQzlCLFVBQVUsRUFBRSxtQ0FBbUM7U0FDaEQ7S0FDRixDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSxxQkFBcUIsQ0FDbkMsYUFBNEI7SUFFNUIsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGV2TW9kZSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIHNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyLFxuICBpbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyLFxufSBmcm9tICcuL21ldGEtcmVkdWNlcnMnO1xuaW1wb3J0IHsgUnVudGltZUNoZWNrcywgTWV0YVJlZHVjZXIgfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge1xuICBfVVNFUl9SVU5USU1FX0NIRUNLUyxcbiAgX0FDVElWRV9SVU5USU1FX0NIRUNLUyxcbiAgTUVUQV9SRURVQ0VSUyxcbiAgVVNFUl9SVU5USU1FX0NIRUNLUyxcbn0gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aXZlUnVudGltZUNoZWNrcyhcbiAgcnVudGltZUNoZWNrcz86IFBhcnRpYWw8UnVudGltZUNoZWNrcz5cbik6IFJ1bnRpbWVDaGVja3Mge1xuICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICBpZiAocnVudGltZUNoZWNrcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdAbmdyeC9zdG9yZTogcnVudGltZSBjaGVja3MgYXJlIGN1cnJlbnRseSBvcHQtaW4gYnV0IHdpbGwgYmUgdGhlIGRlZmF1bHQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbiB3aXRoIHRoZSBwb3NzaWJpbGl0eSB0byBvcHQtb3V0LCBzZWUgaHR0cHM6Ly9uZ3J4LmlvL2d1aWRlL21pZ3JhdGlvbi92OCBmb3IgbW9yZSBpbmZvcm1hdGlvbi4nXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHk6IGZhbHNlLFxuICAgICAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5OiBmYWxzZSxcbiAgICAgIHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5OiBmYWxzZSxcbiAgICAgIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eTogZmFsc2UsXG4gICAgICAuLi5ydW50aW1lQ2hlY2tzLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5OiBmYWxzZSxcbiAgICBzdHJpY3RBY3Rpb25TZXJpYWxpemFiaWxpdHk6IGZhbHNlLFxuICAgIHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5OiBmYWxzZSxcbiAgICBzdHJpY3RBY3Rpb25JbW11dGFiaWxpdHk6IGZhbHNlLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIoe1xuICBzdHJpY3RBY3Rpb25TZXJpYWxpemFiaWxpdHksXG4gIHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5LFxufTogUnVudGltZUNoZWNrcyk6IE1ldGFSZWR1Y2VyIHtcbiAgcmV0dXJuIHJlZHVjZXIgPT5cbiAgICBzdHJpY3RBY3Rpb25TZXJpYWxpemFiaWxpdHkgfHwgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHlcbiAgICAgID8gc2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIocmVkdWNlciwge1xuICAgICAgICAgIGFjdGlvbjogc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5LFxuICAgICAgICAgIHN0YXRlOiBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eSxcbiAgICAgICAgfSlcbiAgICAgIDogcmVkdWNlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUltbXV0YWJpbGl0eUNoZWNrTWV0YVJlZHVjZXIoe1xuICBzdHJpY3RBY3Rpb25JbW11dGFiaWxpdHksXG4gIHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5LFxufTogUnVudGltZUNoZWNrcyk6IE1ldGFSZWR1Y2VyIHtcbiAgcmV0dXJuIHJlZHVjZXIgPT5cbiAgICBzdHJpY3RBY3Rpb25JbW11dGFiaWxpdHkgfHwgc3RyaWN0U3RhdGVJbW11dGFiaWxpdHlcbiAgICAgID8gaW1tdXRhYmlsaXR5Q2hlY2tNZXRhUmVkdWNlcihyZWR1Y2VyLCB7XG4gICAgICAgICAgYWN0aW9uOiBzdHJpY3RBY3Rpb25JbW11dGFiaWxpdHksXG4gICAgICAgICAgc3RhdGU6IHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5LFxuICAgICAgICB9KVxuICAgICAgOiByZWR1Y2VyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVJ1bnRpbWVDaGVja3MoXG4gIHJ1bnRpbWVDaGVja3M/OiBQYXJ0aWFsPFJ1bnRpbWVDaGVja3M+XG4pOiBQcm92aWRlcltdIHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBfVVNFUl9SVU5USU1FX0NIRUNLUyxcbiAgICAgIHVzZVZhbHVlOiBydW50aW1lQ2hlY2tzLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogVVNFUl9SVU5USU1FX0NIRUNLUyxcbiAgICAgIHVzZUZhY3Rvcnk6IF9ydW50aW1lQ2hlY2tzRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtfVVNFUl9SVU5USU1FX0NIRUNLU10sXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBfQUNUSVZFX1JVTlRJTUVfQ0hFQ0tTLFxuICAgICAgZGVwczogW1VTRVJfUlVOVElNRV9DSEVDS1NdLFxuICAgICAgdXNlRmFjdG9yeTogY3JlYXRlQWN0aXZlUnVudGltZUNoZWNrcyxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1FVEFfUkVEVUNFUlMsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgIGRlcHM6IFtfQUNUSVZFX1JVTlRJTUVfQ0hFQ0tTXSxcbiAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZUltbXV0YWJpbGl0eUNoZWNrTWV0YVJlZHVjZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBNRVRBX1JFRFVDRVJTLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICBkZXBzOiBbX0FDVElWRV9SVU5USU1FX0NIRUNLU10sXG4gICAgICB1c2VGYWN0b3J5OiBjcmVhdGVTZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcixcbiAgICB9LFxuICBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX3J1bnRpbWVDaGVja3NGYWN0b3J5KFxuICBydW50aW1lQ2hlY2tzOiBSdW50aW1lQ2hlY2tzXG4pOiBSdW50aW1lQ2hlY2tzIHtcbiAgcmV0dXJuIHJ1bnRpbWVDaGVja3M7XG59XG4iXX0=