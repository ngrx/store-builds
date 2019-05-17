import * as tslib_1 from "tslib";
import { isDevMode } from '@angular/core';
import { stateSerializationCheckMetaReducer, actionSerializationCheckMetaReducer, immutabilityCheckMetaReducer, } from './meta-reducers';
import { _USER_RUNTIME_CHECKS, _ACTIVE_RUNTIME_CHECKS, META_REDUCERS, } from './tokens';
export function createActiveRuntimeChecks(runtimeChecks) {
    if (isDevMode()) {
        if (runtimeChecks === undefined) {
            console.warn('@ngrx/store: runtime checks are currently opt-in but will be the default in the next major version with the possibility to opt-out, see https://ngrx.io/guide/migration/v8 for more information.');
        }
        return tslib_1.__assign({ strictStateSerializability: false, strictActionSerializability: false, strictImmutability: false }, runtimeChecks);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZV9jaGVja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9ydW50aW1lX2NoZWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQ0wsa0NBQWtDLEVBQ2xDLG1DQUFtQyxFQUNuQyw0QkFBNEIsR0FDN0IsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLHNCQUFzQixFQUN0QixhQUFhLEdBQ2QsTUFBTSxVQUFVLENBQUM7QUFFbEIsTUFBTSxVQUFVLHlCQUF5QixDQUN2QyxhQUFzQztJQUV0QyxJQUFJLFNBQVMsRUFBRSxFQUFFO1FBQ2YsSUFBSSxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQ1Ysa01BQWtNLENBQ25NLENBQUM7U0FDSDtRQUNELDBCQUNFLDBCQUEwQixFQUFFLEtBQUssRUFDakMsMkJBQTJCLEVBQUUsS0FBSyxFQUNsQyxrQkFBa0IsRUFBRSxLQUFLLElBQ3RCLGFBQWEsRUFDaEI7S0FDSDtJQUVELE9BQU87UUFDTCwwQkFBMEIsRUFBRSxLQUFLO1FBQ2pDLDJCQUEyQixFQUFFLEtBQUs7UUFDbEMsa0JBQWtCLEVBQUUsS0FBSztLQUMxQixDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSx3Q0FBd0MsQ0FBQyxFQUV6QztRQURkLDBEQUEwQjtJQUUxQixPQUFPLFVBQUEsT0FBTztRQUNaLE9BQUEsMEJBQTBCO1lBQ3hCLENBQUMsQ0FBQyxrQ0FBa0MsQ0FBQyxPQUFPLENBQUM7WUFDN0MsQ0FBQyxDQUFDLE9BQU87SUFGWCxDQUVXLENBQUM7QUFDaEIsQ0FBQztBQUVELE1BQU0sVUFBVSx5Q0FBeUMsQ0FBQyxFQUUxQztRQURkLDREQUEyQjtJQUUzQixPQUFPLFVBQUEsT0FBTztRQUNaLE9BQUEsMkJBQTJCO1lBQ3pCLENBQUMsQ0FBQyxtQ0FBbUMsQ0FBQyxPQUFPLENBQUM7WUFDOUMsQ0FBQyxDQUFDLE9BQU87SUFGWCxDQUVXLENBQUM7QUFDaEIsQ0FBQztBQUVELE1BQU0sVUFBVSxrQ0FBa0MsQ0FBQyxFQUVuQztRQURkLDBDQUFrQjtJQUVsQixPQUFPLFVBQUEsT0FBTztRQUNaLE9BQUEsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPO0lBQXBFLENBQW9FLENBQUM7QUFDekUsQ0FBQztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FDbEMsYUFBc0M7SUFFdEMsT0FBTztRQUNMO1lBQ0UsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixRQUFRLEVBQUUsYUFBYTtTQUN4QjtRQUNEO1lBQ0UsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztZQUM1QixVQUFVLEVBQUUseUJBQXlCO1NBQ3RDO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsYUFBYTtZQUN0QixLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQzlCLFVBQVUsRUFBRSx3Q0FBd0M7U0FDckQ7UUFDRDtZQUNFLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLEtBQUssRUFBRSxJQUFJO1lBQ1gsSUFBSSxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDOUIsVUFBVSxFQUFFLHlDQUF5QztTQUN0RDtRQUNEO1lBQ0UsT0FBTyxFQUFFLGFBQWE7WUFDdEIsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUM5QixVQUFVLEVBQUUsa0NBQWtDO1NBQy9DO0tBQ0YsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0Rldk1vZGUsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBzdGF0ZVNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyLFxuICBhY3Rpb25TZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcixcbiAgaW1tdXRhYmlsaXR5Q2hlY2tNZXRhUmVkdWNlcixcbn0gZnJvbSAnLi9tZXRhLXJlZHVjZXJzJztcbmltcG9ydCB7IFJ1bnRpbWVDaGVja3MsIE1ldGFSZWR1Y2VyIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgX1VTRVJfUlVOVElNRV9DSEVDS1MsXG4gIF9BQ1RJVkVfUlVOVElNRV9DSEVDS1MsXG4gIE1FVEFfUkVEVUNFUlMsXG59IGZyb20gJy4vdG9rZW5zJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGl2ZVJ1bnRpbWVDaGVja3MoXG4gIHJ1bnRpbWVDaGVja3M/OiBQYXJ0aWFsPFJ1bnRpbWVDaGVja3M+XG4pOiBSdW50aW1lQ2hlY2tzIHtcbiAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgaWYgKHJ1bnRpbWVDaGVja3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnQG5ncngvc3RvcmU6IHJ1bnRpbWUgY2hlY2tzIGFyZSBjdXJyZW50bHkgb3B0LWluIGJ1dCB3aWxsIGJlIHRoZSBkZWZhdWx0IGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24gd2l0aCB0aGUgcG9zc2liaWxpdHkgdG8gb3B0LW91dCwgc2VlIGh0dHBzOi8vbmdyeC5pby9ndWlkZS9taWdyYXRpb24vdjggZm9yIG1vcmUgaW5mb3JtYXRpb24uJ1xuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5OiBmYWxzZSxcbiAgICAgIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eTogZmFsc2UsXG4gICAgICBzdHJpY3RJbW11dGFiaWxpdHk6IGZhbHNlLFxuICAgICAgLi4ucnVudGltZUNoZWNrcyxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eTogZmFsc2UsXG4gICAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5OiBmYWxzZSxcbiAgICBzdHJpY3RJbW11dGFiaWxpdHk6IGZhbHNlLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RhdGVTZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcih7XG4gIHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5LFxufTogUnVudGltZUNoZWNrcyk6IE1ldGFSZWR1Y2VyIHtcbiAgcmV0dXJuIHJlZHVjZXIgPT5cbiAgICBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eVxuICAgICAgPyBzdGF0ZVNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyKHJlZHVjZXIpXG4gICAgICA6IHJlZHVjZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3Rpb25TZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcih7XG4gIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eSxcbn06IFJ1bnRpbWVDaGVja3MpOiBNZXRhUmVkdWNlciB7XG4gIHJldHVybiByZWR1Y2VyID0+XG4gICAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5XG4gICAgICA/IGFjdGlvblNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyKHJlZHVjZXIpXG4gICAgICA6IHJlZHVjZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyKHtcbiAgc3RyaWN0SW1tdXRhYmlsaXR5LFxufTogUnVudGltZUNoZWNrcyk6IE1ldGFSZWR1Y2VyIHtcbiAgcmV0dXJuIHJlZHVjZXIgPT5cbiAgICBzdHJpY3RJbW11dGFiaWxpdHkgPyBpbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyKHJlZHVjZXIpIDogcmVkdWNlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVSdW50aW1lQ2hlY2tzKFxuICBydW50aW1lQ2hlY2tzPzogUGFydGlhbDxSdW50aW1lQ2hlY2tzPlxuKTogUHJvdmlkZXJbXSB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogX1VTRVJfUlVOVElNRV9DSEVDS1MsXG4gICAgICB1c2VWYWx1ZTogcnVudGltZUNoZWNrcyxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IF9BQ1RJVkVfUlVOVElNRV9DSEVDS1MsXG4gICAgICBkZXBzOiBbX1VTRVJfUlVOVElNRV9DSEVDS1NdLFxuICAgICAgdXNlRmFjdG9yeTogY3JlYXRlQWN0aXZlUnVudGltZUNoZWNrcyxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1FVEFfUkVEVUNFUlMsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgIGRlcHM6IFtfQUNUSVZFX1JVTlRJTUVfQ0hFQ0tTXSxcbiAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZVN0YXRlU2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBNRVRBX1JFRFVDRVJTLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICBkZXBzOiBbX0FDVElWRV9SVU5USU1FX0NIRUNLU10sXG4gICAgICB1c2VGYWN0b3J5OiBjcmVhdGVBY3Rpb25TZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcixcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1FVEFfUkVEVUNFUlMsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgIGRlcHM6IFtfQUNUSVZFX1JVTlRJTUVfQ0hFQ0tTXSxcbiAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZUltbXV0YWJpbGl0eUNoZWNrTWV0YVJlZHVjZXIsXG4gICAgfSxcbiAgXTtcbn1cbiJdfQ==