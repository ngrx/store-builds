/**
 * @fileoverview added by tsickle
 * Generated from: testing.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { MockState } from './mock_state';
import { ActionsSubject, INITIAL_STATE, ReducerManager, StateObservable, Store, setNgrxMockEnvironment, } from '@ngrx/store';
import { MockStore } from './mock_store';
import { MockReducerManager } from './mock_reducer_manager';
import { MOCK_SELECTORS } from './tokens';
/**
 * @record
 * @template T
 */
export function MockStoreConfig() { }
if (false) {
    /** @type {?|undefined} */
    MockStoreConfig.prototype.initialState;
    /** @type {?|undefined} */
    MockStoreConfig.prototype.selectors;
}
/**
 * @template T
 * @param {?=} config
 * @return {?}
 */
export function provideMockStore(config = {}) {
    setNgrxMockEnvironment(true);
    return [
        ActionsSubject,
        MockState,
        MockStore,
        { provide: INITIAL_STATE, useValue: config.initialState || {} },
        { provide: MOCK_SELECTORS, useValue: config.selectors },
        { provide: StateObservable, useClass: MockState },
        { provide: ReducerManager, useClass: MockReducerManager },
        { provide: Store, useExisting: MockStore },
    ];
}
export { MockReducerManager } from './mock_reducer_manager';
export { MockState } from './mock_state';
export { MockStore } from './mock_store';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvdGVzdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUNMLGNBQWMsRUFDZCxhQUFhLEVBQ2IsY0FBYyxFQUNkLGVBQWUsRUFDZixLQUFLLEVBQ0wsc0JBQXNCLEdBQ3ZCLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7Ozs7QUFFMUMscUNBR0M7OztJQUZDLHVDQUFpQjs7SUFDakIsb0NBQTJCOzs7Ozs7O0FBRzdCLE1BQU0sVUFBVSxnQkFBZ0IsQ0FDOUIsU0FBNkIsRUFBRTtJQUUvQixzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixPQUFPO1FBQ0wsY0FBYztRQUNkLFNBQVM7UUFDVCxTQUFTO1FBQ1QsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsWUFBWSxJQUFJLEVBQUUsRUFBRTtRQUMvRCxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUU7UUFDdkQsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUU7UUFDakQsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRTtRQUN6RCxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRTtLQUMzQyxDQUFDO0FBQ0osQ0FBQztBQUVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2NrU3RhdGUgfSBmcm9tICcuL21vY2tfc3RhdGUnO1xuaW1wb3J0IHtcbiAgQWN0aW9uc1N1YmplY3QsXG4gIElOSVRJQUxfU1RBVEUsXG4gIFJlZHVjZXJNYW5hZ2VyLFxuICBTdGF0ZU9ic2VydmFibGUsXG4gIFN0b3JlLFxuICBzZXROZ3J4TW9ja0Vudmlyb25tZW50LFxufSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBNb2NrU3RvcmUgfSBmcm9tICcuL21vY2tfc3RvcmUnO1xuaW1wb3J0IHsgTW9ja1JlZHVjZXJNYW5hZ2VyIH0gZnJvbSAnLi9tb2NrX3JlZHVjZXJfbWFuYWdlcic7XG5pbXBvcnQgeyBNb2NrU2VsZWN0b3IgfSBmcm9tICcuL21vY2tfc2VsZWN0b3InO1xuaW1wb3J0IHsgTU9DS19TRUxFQ1RPUlMgfSBmcm9tICcuL3Rva2Vucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9ja1N0b3JlQ29uZmlnPFQ+IHtcbiAgaW5pdGlhbFN0YXRlPzogVDtcbiAgc2VsZWN0b3JzPzogTW9ja1NlbGVjdG9yW107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlTW9ja1N0b3JlPFQgPSBhbnk+KFxuICBjb25maWc6IE1vY2tTdG9yZUNvbmZpZzxUPiA9IHt9XG4pOiBQcm92aWRlcltdIHtcbiAgc2V0TmdyeE1vY2tFbnZpcm9ubWVudCh0cnVlKTtcbiAgcmV0dXJuIFtcbiAgICBBY3Rpb25zU3ViamVjdCxcbiAgICBNb2NrU3RhdGUsXG4gICAgTW9ja1N0b3JlLFxuICAgIHsgcHJvdmlkZTogSU5JVElBTF9TVEFURSwgdXNlVmFsdWU6IGNvbmZpZy5pbml0aWFsU3RhdGUgfHwge30gfSxcbiAgICB7IHByb3ZpZGU6IE1PQ0tfU0VMRUNUT1JTLCB1c2VWYWx1ZTogY29uZmlnLnNlbGVjdG9ycyB9LFxuICAgIHsgcHJvdmlkZTogU3RhdGVPYnNlcnZhYmxlLCB1c2VDbGFzczogTW9ja1N0YXRlIH0sXG4gICAgeyBwcm92aWRlOiBSZWR1Y2VyTWFuYWdlciwgdXNlQ2xhc3M6IE1vY2tSZWR1Y2VyTWFuYWdlciB9LFxuICAgIHsgcHJvdmlkZTogU3RvcmUsIHVzZUV4aXN0aW5nOiBNb2NrU3RvcmUgfSxcbiAgXTtcbn1cblxuZXhwb3J0IHsgTW9ja1JlZHVjZXJNYW5hZ2VyIH0gZnJvbSAnLi9tb2NrX3JlZHVjZXJfbWFuYWdlcic7XG5leHBvcnQgeyBNb2NrU3RhdGUgfSBmcm9tICcuL21vY2tfc3RhdGUnO1xuZXhwb3J0IHsgTW9ja1N0b3JlIH0gZnJvbSAnLi9tb2NrX3N0b3JlJztcbmV4cG9ydCB7IE1vY2tTZWxlY3RvciB9IGZyb20gJy4vbW9ja19zZWxlY3Rvcic7XG4iXX0=