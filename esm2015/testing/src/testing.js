/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { MockState } from './mock_state';
import { ActionsSubject, INITIAL_STATE, ReducerManager, StateObservable, Store, } from '@ngrx/store';
import { MockStore } from './mock_store';
import { MockReducerManager } from './mock_reducer_manager';
/**
 * @record
 * @template T
 */
export function MockStoreConfig() { }
if (false) {
    /** @type {?|undefined} */
    MockStoreConfig.prototype.initialState;
}
/**
 * @template T
 * @param {?=} config
 * @return {?}
 */
export function provideMockStore(config = {}) {
    return [
        ActionsSubject,
        MockState,
        { provide: INITIAL_STATE, useValue: config.initialState },
        { provide: StateObservable, useClass: MockState },
        { provide: ReducerManager, useClass: MockReducerManager },
        { provide: Store, useClass: MockStore },
    ];
}
export { MockReducerManager } from './mock_reducer_manager';
export { MockState } from './mock_state';
export { MockStore } from './mock_store';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvdGVzdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsY0FBYyxFQUNkLGFBQWEsRUFDYixjQUFjLEVBQ2QsZUFBZSxFQUNmLEtBQUssR0FDTixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7OztBQUU1RCxxQ0FFQzs7O0lBREMsdUNBQWlCOzs7Ozs7O0FBR25CLE1BQU0sVUFBVSxnQkFBZ0IsQ0FDOUIsU0FBNkIsRUFBRTtJQUUvQixPQUFPO1FBQ0wsY0FBYztRQUNkLFNBQVM7UUFDVCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxZQUFZLEVBQUU7UUFDekQsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUU7UUFDakQsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRTtRQUN6RCxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRTtLQUN4QyxDQUFDO0FBQ0osQ0FBQztBQUVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2NrU3RhdGUgfSBmcm9tICcuL21vY2tfc3RhdGUnO1xuaW1wb3J0IHtcbiAgQWN0aW9uc1N1YmplY3QsXG4gIElOSVRJQUxfU1RBVEUsXG4gIFJlZHVjZXJNYW5hZ2VyLFxuICBTdGF0ZU9ic2VydmFibGUsXG4gIFN0b3JlLFxufSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBNb2NrU3RvcmUgfSBmcm9tICcuL21vY2tfc3RvcmUnO1xuaW1wb3J0IHsgTW9ja1JlZHVjZXJNYW5hZ2VyIH0gZnJvbSAnLi9tb2NrX3JlZHVjZXJfbWFuYWdlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9ja1N0b3JlQ29uZmlnPFQ+IHtcbiAgaW5pdGlhbFN0YXRlPzogVDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVNb2NrU3RvcmU8VCA9IGFueT4oXG4gIGNvbmZpZzogTW9ja1N0b3JlQ29uZmlnPFQ+ID0ge31cbik6IFByb3ZpZGVyW10ge1xuICByZXR1cm4gW1xuICAgIEFjdGlvbnNTdWJqZWN0LFxuICAgIE1vY2tTdGF0ZSxcbiAgICB7IHByb3ZpZGU6IElOSVRJQUxfU1RBVEUsIHVzZVZhbHVlOiBjb25maWcuaW5pdGlhbFN0YXRlIH0sXG4gICAgeyBwcm92aWRlOiBTdGF0ZU9ic2VydmFibGUsIHVzZUNsYXNzOiBNb2NrU3RhdGUgfSxcbiAgICB7IHByb3ZpZGU6IFJlZHVjZXJNYW5hZ2VyLCB1c2VDbGFzczogTW9ja1JlZHVjZXJNYW5hZ2VyIH0sXG4gICAgeyBwcm92aWRlOiBTdG9yZSwgdXNlQ2xhc3M6IE1vY2tTdG9yZSB9LFxuICBdO1xufVxuXG5leHBvcnQgeyBNb2NrUmVkdWNlck1hbmFnZXIgfSBmcm9tICcuL21vY2tfcmVkdWNlcl9tYW5hZ2VyJztcbmV4cG9ydCB7IE1vY2tTdGF0ZSB9IGZyb20gJy4vbW9ja19zdGF0ZSc7XG5leHBvcnQgeyBNb2NrU3RvcmUgfSBmcm9tICcuL21vY2tfc3RvcmUnO1xuIl19