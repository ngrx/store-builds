import { __assign } from "tslib";
import { isDevMode } from '@angular/core';
import { serializationCheckMetaReducer, immutabilityCheckMetaReducer, } from './meta-reducers';
import { _USER_RUNTIME_CHECKS, _ACTIVE_RUNTIME_CHECKS, META_REDUCERS, USER_RUNTIME_CHECKS, } from './tokens';
export function createActiveRuntimeChecks(runtimeChecks) {
    if (isDevMode()) {
        return __assign({ strictStateSerializability: false, strictActionSerializability: false, strictStateImmutability: true, strictActionImmutability: true }, runtimeChecks);
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
                action: function (action) {
                    return strictActionSerializability && !ignoreNgrxAction(action);
                },
                state: function () { return strictStateSerializability; },
            })
            : reducer;
    };
}
export function createImmutabilityCheckMetaReducer(_a) {
    var strictActionImmutability = _a.strictActionImmutability, strictStateImmutability = _a.strictStateImmutability;
    return function (reducer) {
        return strictActionImmutability || strictStateImmutability
            ? immutabilityCheckMetaReducer(reducer, {
                action: function (action) {
                    return strictActionImmutability && !ignoreNgrxAction(action);
                },
                state: function () { return strictStateImmutability; },
            })
            : reducer;
    };
}
function ignoreNgrxAction(action) {
    return action.type.startsWith('@ngrx');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZV9jaGVja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9ydW50aW1lX2NoZWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQ0wsNkJBQTZCLEVBQzdCLDRCQUE0QixHQUM3QixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsc0JBQXNCLEVBQ3RCLGFBQWEsRUFDYixtQkFBbUIsR0FDcEIsTUFBTSxVQUFVLENBQUM7QUFFbEIsTUFBTSxVQUFVLHlCQUF5QixDQUN2QyxhQUFzQztJQUV0QyxJQUFJLFNBQVMsRUFBRSxFQUFFO1FBQ2Ysa0JBQ0UsMEJBQTBCLEVBQUUsS0FBSyxFQUNqQywyQkFBMkIsRUFBRSxLQUFLLEVBQ2xDLHVCQUF1QixFQUFFLElBQUksRUFDN0Isd0JBQXdCLEVBQUUsSUFBSSxJQUMzQixhQUFhLEVBQ2hCO0tBQ0g7SUFFRCxPQUFPO1FBQ0wsMEJBQTBCLEVBQUUsS0FBSztRQUNqQywyQkFBMkIsRUFBRSxLQUFLO1FBQ2xDLHVCQUF1QixFQUFFLEtBQUs7UUFDOUIsd0JBQXdCLEVBQUUsS0FBSztLQUNoQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSxtQ0FBbUMsQ0FBQyxFQUdwQztRQUZkLDREQUEyQixFQUMzQiwwREFBMEI7SUFFMUIsT0FBTyxVQUFBLE9BQU87UUFDWixPQUFBLDJCQUEyQixJQUFJLDBCQUEwQjtZQUN2RCxDQUFDLENBQUMsNkJBQTZCLENBQUMsT0FBTyxFQUFFO2dCQUNyQyxNQUFNLEVBQUUsVUFBQSxNQUFNO29CQUNaLE9BQUEsMkJBQTJCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7Z0JBQXhELENBQXdEO2dCQUMxRCxLQUFLLEVBQUUsY0FBTSxPQUFBLDBCQUEwQixFQUExQixDQUEwQjthQUN4QyxDQUFDO1lBQ0osQ0FBQyxDQUFDLE9BQU87SUFOWCxDQU1XLENBQUM7QUFDaEIsQ0FBQztBQUVELE1BQU0sVUFBVSxrQ0FBa0MsQ0FBQyxFQUduQztRQUZkLHNEQUF3QixFQUN4QixvREFBdUI7SUFFdkIsT0FBTyxVQUFBLE9BQU87UUFDWixPQUFBLHdCQUF3QixJQUFJLHVCQUF1QjtZQUNqRCxDQUFDLENBQUMsNEJBQTRCLENBQUMsT0FBTyxFQUFFO2dCQUNwQyxNQUFNLEVBQUUsVUFBQSxNQUFNO29CQUNaLE9BQUEsd0JBQXdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7Z0JBQXJELENBQXFEO2dCQUN2RCxLQUFLLEVBQUUsY0FBTSxPQUFBLHVCQUF1QixFQUF2QixDQUF1QjthQUNyQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLE9BQU87SUFOWCxDQU1XLENBQUM7QUFDaEIsQ0FBQztBQUVELFNBQVMsZ0JBQWdCLENBQUMsTUFBYztJQUN0QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQ2xDLGFBQXNDO0lBRXRDLE9BQU87UUFDTDtZQUNFLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsUUFBUSxFQUFFLGFBQWE7U0FDeEI7UUFDRDtZQUNFLE9BQU8sRUFBRSxtQkFBbUI7WUFDNUIsVUFBVSxFQUFFLHFCQUFxQjtZQUNqQyxJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztTQUM3QjtRQUNEO1lBQ0UsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixJQUFJLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztZQUMzQixVQUFVLEVBQUUseUJBQXlCO1NBQ3RDO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsYUFBYTtZQUN0QixLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQzlCLFVBQVUsRUFBRSxrQ0FBa0M7U0FDL0M7UUFDRDtZQUNFLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLEtBQUssRUFBRSxJQUFJO1lBQ1gsSUFBSSxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDOUIsVUFBVSxFQUFFLG1DQUFtQztTQUNoRDtLQUNGLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxVQUFVLHFCQUFxQixDQUNuQyxhQUE0QjtJQUU1QixPQUFPLGFBQWEsQ0FBQztBQUN2QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNEZXZNb2RlLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgc2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIsXG4gIGltbXV0YWJpbGl0eUNoZWNrTWV0YVJlZHVjZXIsXG59IGZyb20gJy4vbWV0YS1yZWR1Y2Vycyc7XG5pbXBvcnQgeyBSdW50aW1lQ2hlY2tzLCBNZXRhUmVkdWNlciwgQWN0aW9uIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgX1VTRVJfUlVOVElNRV9DSEVDS1MsXG4gIF9BQ1RJVkVfUlVOVElNRV9DSEVDS1MsXG4gIE1FVEFfUkVEVUNFUlMsXG4gIFVTRVJfUlVOVElNRV9DSEVDS1MsXG59IGZyb20gJy4vdG9rZW5zJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGl2ZVJ1bnRpbWVDaGVja3MoXG4gIHJ1bnRpbWVDaGVja3M/OiBQYXJ0aWFsPFJ1bnRpbWVDaGVja3M+XG4pOiBSdW50aW1lQ2hlY2tzIHtcbiAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5OiBmYWxzZSxcbiAgICAgIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eTogZmFsc2UsXG4gICAgICBzdHJpY3RTdGF0ZUltbXV0YWJpbGl0eTogdHJ1ZSxcbiAgICAgIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eTogdHJ1ZSxcbiAgICAgIC4uLnJ1bnRpbWVDaGVja3MsXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHk6IGZhbHNlLFxuICAgIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eTogZmFsc2UsXG4gICAgc3RyaWN0U3RhdGVJbW11dGFiaWxpdHk6IGZhbHNlLFxuICAgIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eTogZmFsc2UsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcih7XG4gIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eSxcbiAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHksXG59OiBSdW50aW1lQ2hlY2tzKTogTWV0YVJlZHVjZXIge1xuICByZXR1cm4gcmVkdWNlciA9PlxuICAgIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eSB8fCBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eVxuICAgICAgPyBzZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcihyZWR1Y2VyLCB7XG4gICAgICAgICAgYWN0aW9uOiBhY3Rpb24gPT5cbiAgICAgICAgICAgIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eSAmJiAhaWdub3JlTmdyeEFjdGlvbihhY3Rpb24pLFxuICAgICAgICAgIHN0YXRlOiAoKSA9PiBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eSxcbiAgICAgICAgfSlcbiAgICAgIDogcmVkdWNlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUltbXV0YWJpbGl0eUNoZWNrTWV0YVJlZHVjZXIoe1xuICBzdHJpY3RBY3Rpb25JbW11dGFiaWxpdHksXG4gIHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5LFxufTogUnVudGltZUNoZWNrcyk6IE1ldGFSZWR1Y2VyIHtcbiAgcmV0dXJuIHJlZHVjZXIgPT5cbiAgICBzdHJpY3RBY3Rpb25JbW11dGFiaWxpdHkgfHwgc3RyaWN0U3RhdGVJbW11dGFiaWxpdHlcbiAgICAgID8gaW1tdXRhYmlsaXR5Q2hlY2tNZXRhUmVkdWNlcihyZWR1Y2VyLCB7XG4gICAgICAgICAgYWN0aW9uOiBhY3Rpb24gPT5cbiAgICAgICAgICAgIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eSAmJiAhaWdub3JlTmdyeEFjdGlvbihhY3Rpb24pLFxuICAgICAgICAgIHN0YXRlOiAoKSA9PiBzdHJpY3RTdGF0ZUltbXV0YWJpbGl0eSxcbiAgICAgICAgfSlcbiAgICAgIDogcmVkdWNlcjtcbn1cblxuZnVuY3Rpb24gaWdub3JlTmdyeEFjdGlvbihhY3Rpb246IEFjdGlvbikge1xuICByZXR1cm4gYWN0aW9uLnR5cGUuc3RhcnRzV2l0aCgnQG5ncngnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVSdW50aW1lQ2hlY2tzKFxuICBydW50aW1lQ2hlY2tzPzogUGFydGlhbDxSdW50aW1lQ2hlY2tzPlxuKTogUHJvdmlkZXJbXSB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogX1VTRVJfUlVOVElNRV9DSEVDS1MsXG4gICAgICB1c2VWYWx1ZTogcnVudGltZUNoZWNrcyxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFVTRVJfUlVOVElNRV9DSEVDS1MsXG4gICAgICB1c2VGYWN0b3J5OiBfcnVudGltZUNoZWNrc0ZhY3RvcnksXG4gICAgICBkZXBzOiBbX1VTRVJfUlVOVElNRV9DSEVDS1NdLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogX0FDVElWRV9SVU5USU1FX0NIRUNLUyxcbiAgICAgIGRlcHM6IFtVU0VSX1JVTlRJTUVfQ0hFQ0tTXSxcbiAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZUFjdGl2ZVJ1bnRpbWVDaGVja3MsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBNRVRBX1JFRFVDRVJTLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICBkZXBzOiBbX0FDVElWRV9SVU5USU1FX0NIRUNLU10sXG4gICAgICB1c2VGYWN0b3J5OiBjcmVhdGVJbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTUVUQV9SRURVQ0VSUyxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgZGVwczogW19BQ1RJVkVfUlVOVElNRV9DSEVDS1NdLFxuICAgICAgdXNlRmFjdG9yeTogY3JlYXRlU2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIsXG4gICAgfSxcbiAgXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9ydW50aW1lQ2hlY2tzRmFjdG9yeShcbiAgcnVudGltZUNoZWNrczogUnVudGltZUNoZWNrc1xuKTogUnVudGltZUNoZWNrcyB7XG4gIHJldHVybiBydW50aW1lQ2hlY2tzO1xufVxuIl19