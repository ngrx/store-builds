import { InjectionToken } from '@angular/core';
export const _ROOT_STORE_GUARD = new InjectionToken('@ngrx/store Internal Root Guard');
export const _INITIAL_STATE = new InjectionToken('@ngrx/store Internal Initial State');
export const INITIAL_STATE = new InjectionToken('@ngrx/store Initial State');
export const REDUCER_FACTORY = new InjectionToken('@ngrx/store Reducer Factory');
export const _REDUCER_FACTORY = new InjectionToken('@ngrx/store Internal Reducer Factory Provider');
export const INITIAL_REDUCERS = new InjectionToken('@ngrx/store Initial Reducers');
export const _INITIAL_REDUCERS = new InjectionToken('@ngrx/store Internal Initial Reducers');
export const STORE_FEATURES = new InjectionToken('@ngrx/store Store Features');
export const _STORE_REDUCERS = new InjectionToken('@ngrx/store Internal Store Reducers');
export const _FEATURE_REDUCERS = new InjectionToken('@ngrx/store Internal Feature Reducers');
export const _FEATURE_CONFIGS = new InjectionToken('@ngrx/store Internal Feature Configs');
export const _STORE_FEATURES = new InjectionToken('@ngrx/store Internal Store Features');
export const _FEATURE_REDUCERS_TOKEN = new InjectionToken('@ngrx/store Internal Feature Reducers Token');
export const FEATURE_REDUCERS = new InjectionToken('@ngrx/store Feature Reducers');
/**
 * User-defined meta reducers from StoreModule.forRoot()
 */
export const USER_PROVIDED_META_REDUCERS = new InjectionToken('@ngrx/store User Provided Meta Reducers');
/**
 * Meta reducers defined either internally by @ngrx/store or by library authors
 */
export const META_REDUCERS = new InjectionToken('@ngrx/store Meta Reducers');
/**
 * Concats the user provided meta reducers and the meta reducers provided on the multi
 * injection token
 */
export const _RESOLVED_META_REDUCERS = new InjectionToken('@ngrx/store Internal Resolved Meta Reducers');
/**
 * Runtime checks defined by the user via an InjectionToken
 * Defaults to `_USER_RUNTIME_CHECKS`
 */
export const USER_RUNTIME_CHECKS = new InjectionToken('@ngrx/store User Runtime Checks Config');
/**
 * Runtime checks defined by the user via forRoot()
 */
export const _USER_RUNTIME_CHECKS = new InjectionToken('@ngrx/store Internal User Runtime Checks Config');
/**
 * Runtime checks currently in use
 */
export const _ACTIVE_RUNTIME_CHECKS = new InjectionToken('@ngrx/store Internal Runtime Checks');
export const _ACTION_TYPE_UNIQUENESS_CHECK = new InjectionToken('@ngrx/store Check if Action types are unique');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvdG9rZW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHL0MsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQ2pELGlDQUFpQyxDQUNsQyxDQUFDO0FBQ0YsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLElBQUksY0FBYyxDQUM5QyxvQ0FBb0MsQ0FDckMsQ0FBQztBQUNGLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQzdFLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FDL0MsNkJBQTZCLENBQzlCLENBQUM7QUFDRixNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FDaEQsK0NBQStDLENBQ2hELENBQUM7QUFDRixNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FDaEQsOEJBQThCLENBQy9CLENBQUM7QUFDRixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FDakQsdUNBQXVDLENBQ3hDLENBQUM7QUFDRixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUMvRSxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQy9DLHFDQUFxQyxDQUN0QyxDQUFDO0FBQ0YsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQ2pELHVDQUF1QyxDQUN4QyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxjQUFjLENBQ2hELHNDQUFzQyxDQUN2QyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLElBQUksY0FBYyxDQUMvQyxxQ0FBcUMsQ0FDdEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLElBQUksY0FBYyxDQUN2RCw2Q0FBNkMsQ0FDOUMsQ0FBQztBQUNGLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLElBQUksY0FBYyxDQUNoRCw4QkFBOEIsQ0FDL0IsQ0FBQztBQUVGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sMkJBQTJCLEdBQUcsSUFBSSxjQUFjLENBQzNELHlDQUF5QyxDQUMxQyxDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQzdDLDJCQUEyQixDQUM1QixDQUFDO0FBRUY7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxjQUFjLENBQ3ZELDZDQUE2QyxDQUM5QyxDQUFDO0FBRUY7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxjQUFjLENBQ25ELHdDQUF3QyxDQUN6QyxDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLGNBQWMsQ0FDcEQsaURBQWlELENBQ2xELENBQUM7QUFFRjs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLElBQUksY0FBYyxDQUN0RCxxQ0FBcUMsQ0FDdEMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLDZCQUE2QixHQUFHLElBQUksY0FBYyxDQUM3RCw4Q0FBOEMsQ0FDL0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSdW50aW1lQ2hlY2tzLCBNZXRhUmVkdWNlciB9IGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IGNvbnN0IF9ST09UX1NUT1JFX0dVQVJEID0gbmV3IEluamVjdGlvblRva2VuPHZvaWQ+KFxuICAnQG5ncngvc3RvcmUgSW50ZXJuYWwgUm9vdCBHdWFyZCdcbik7XG5leHBvcnQgY29uc3QgX0lOSVRJQUxfU1RBVEUgPSBuZXcgSW5qZWN0aW9uVG9rZW4oXG4gICdAbmdyeC9zdG9yZSBJbnRlcm5hbCBJbml0aWFsIFN0YXRlJ1xuKTtcbmV4cG9ydCBjb25zdCBJTklUSUFMX1NUQVRFID0gbmV3IEluamVjdGlvblRva2VuKCdAbmdyeC9zdG9yZSBJbml0aWFsIFN0YXRlJyk7XG5leHBvcnQgY29uc3QgUkVEVUNFUl9GQUNUT1JZID0gbmV3IEluamVjdGlvblRva2VuKFxuICAnQG5ncngvc3RvcmUgUmVkdWNlciBGYWN0b3J5J1xuKTtcbmV4cG9ydCBjb25zdCBfUkVEVUNFUl9GQUNUT1JZID0gbmV3IEluamVjdGlvblRva2VuKFxuICAnQG5ncngvc3RvcmUgSW50ZXJuYWwgUmVkdWNlciBGYWN0b3J5IFByb3ZpZGVyJ1xuKTtcbmV4cG9ydCBjb25zdCBJTklUSUFMX1JFRFVDRVJTID0gbmV3IEluamVjdGlvblRva2VuKFxuICAnQG5ncngvc3RvcmUgSW5pdGlhbCBSZWR1Y2Vycydcbik7XG5leHBvcnQgY29uc3QgX0lOSVRJQUxfUkVEVUNFUlMgPSBuZXcgSW5qZWN0aW9uVG9rZW4oXG4gICdAbmdyeC9zdG9yZSBJbnRlcm5hbCBJbml0aWFsIFJlZHVjZXJzJ1xuKTtcbmV4cG9ydCBjb25zdCBTVE9SRV9GRUFUVVJFUyA9IG5ldyBJbmplY3Rpb25Ub2tlbignQG5ncngvc3RvcmUgU3RvcmUgRmVhdHVyZXMnKTtcbmV4cG9ydCBjb25zdCBfU1RPUkVfUkVEVUNFUlMgPSBuZXcgSW5qZWN0aW9uVG9rZW4oXG4gICdAbmdyeC9zdG9yZSBJbnRlcm5hbCBTdG9yZSBSZWR1Y2Vycydcbik7XG5leHBvcnQgY29uc3QgX0ZFQVRVUkVfUkVEVUNFUlMgPSBuZXcgSW5qZWN0aW9uVG9rZW4oXG4gICdAbmdyeC9zdG9yZSBJbnRlcm5hbCBGZWF0dXJlIFJlZHVjZXJzJ1xuKTtcblxuZXhwb3J0IGNvbnN0IF9GRUFUVVJFX0NPTkZJR1MgPSBuZXcgSW5qZWN0aW9uVG9rZW4oXG4gICdAbmdyeC9zdG9yZSBJbnRlcm5hbCBGZWF0dXJlIENvbmZpZ3MnXG4pO1xuXG5leHBvcnQgY29uc3QgX1NUT1JFX0ZFQVRVUkVTID0gbmV3IEluamVjdGlvblRva2VuKFxuICAnQG5ncngvc3RvcmUgSW50ZXJuYWwgU3RvcmUgRmVhdHVyZXMnXG4pO1xuXG5leHBvcnQgY29uc3QgX0ZFQVRVUkVfUkVEVUNFUlNfVE9LRU4gPSBuZXcgSW5qZWN0aW9uVG9rZW4oXG4gICdAbmdyeC9zdG9yZSBJbnRlcm5hbCBGZWF0dXJlIFJlZHVjZXJzIFRva2VuJ1xuKTtcbmV4cG9ydCBjb25zdCBGRUFUVVJFX1JFRFVDRVJTID0gbmV3IEluamVjdGlvblRva2VuKFxuICAnQG5ncngvc3RvcmUgRmVhdHVyZSBSZWR1Y2Vycydcbik7XG5cbi8qKlxuICogVXNlci1kZWZpbmVkIG1ldGEgcmVkdWNlcnMgZnJvbSBTdG9yZU1vZHVsZS5mb3JSb290KClcbiAqL1xuZXhwb3J0IGNvbnN0IFVTRVJfUFJPVklERURfTUVUQV9SRURVQ0VSUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNZXRhUmVkdWNlcltdPihcbiAgJ0BuZ3J4L3N0b3JlIFVzZXIgUHJvdmlkZWQgTWV0YSBSZWR1Y2Vycydcbik7XG5cbi8qKlxuICogTWV0YSByZWR1Y2VycyBkZWZpbmVkIGVpdGhlciBpbnRlcm5hbGx5IGJ5IEBuZ3J4L3N0b3JlIG9yIGJ5IGxpYnJhcnkgYXV0aG9yc1xuICovXG5leHBvcnQgY29uc3QgTUVUQV9SRURVQ0VSUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNZXRhUmVkdWNlcltdPihcbiAgJ0BuZ3J4L3N0b3JlIE1ldGEgUmVkdWNlcnMnXG4pO1xuXG4vKipcbiAqIENvbmNhdHMgdGhlIHVzZXIgcHJvdmlkZWQgbWV0YSByZWR1Y2VycyBhbmQgdGhlIG1ldGEgcmVkdWNlcnMgcHJvdmlkZWQgb24gdGhlIG11bHRpXG4gKiBpbmplY3Rpb24gdG9rZW5cbiAqL1xuZXhwb3J0IGNvbnN0IF9SRVNPTFZFRF9NRVRBX1JFRFVDRVJTID0gbmV3IEluamVjdGlvblRva2VuPE1ldGFSZWR1Y2VyPihcbiAgJ0BuZ3J4L3N0b3JlIEludGVybmFsIFJlc29sdmVkIE1ldGEgUmVkdWNlcnMnXG4pO1xuXG4vKipcbiAqIFJ1bnRpbWUgY2hlY2tzIGRlZmluZWQgYnkgdGhlIHVzZXIgdmlhIGFuIEluamVjdGlvblRva2VuXG4gKiBEZWZhdWx0cyB0byBgX1VTRVJfUlVOVElNRV9DSEVDS1NgXG4gKi9cbmV4cG9ydCBjb25zdCBVU0VSX1JVTlRJTUVfQ0hFQ0tTID0gbmV3IEluamVjdGlvblRva2VuPFJ1bnRpbWVDaGVja3M+KFxuICAnQG5ncngvc3RvcmUgVXNlciBSdW50aW1lIENoZWNrcyBDb25maWcnXG4pO1xuXG4vKipcbiAqIFJ1bnRpbWUgY2hlY2tzIGRlZmluZWQgYnkgdGhlIHVzZXIgdmlhIGZvclJvb3QoKVxuICovXG5leHBvcnQgY29uc3QgX1VTRVJfUlVOVElNRV9DSEVDS1MgPSBuZXcgSW5qZWN0aW9uVG9rZW48UnVudGltZUNoZWNrcz4oXG4gICdAbmdyeC9zdG9yZSBJbnRlcm5hbCBVc2VyIFJ1bnRpbWUgQ2hlY2tzIENvbmZpZydcbik7XG5cbi8qKlxuICogUnVudGltZSBjaGVja3MgY3VycmVudGx5IGluIHVzZVxuICovXG5leHBvcnQgY29uc3QgX0FDVElWRV9SVU5USU1FX0NIRUNLUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxSdW50aW1lQ2hlY2tzPihcbiAgJ0BuZ3J4L3N0b3JlIEludGVybmFsIFJ1bnRpbWUgQ2hlY2tzJ1xuKTtcblxuZXhwb3J0IGNvbnN0IF9BQ1RJT05fVFlQRV9VTklRVUVORVNTX0NIRUNLID0gbmV3IEluamVjdGlvblRva2VuPHZvaWQ+KFxuICAnQG5ncngvc3RvcmUgQ2hlY2sgaWYgQWN0aW9uIHR5cGVzIGFyZSB1bmlxdWUnXG4pO1xuIl19