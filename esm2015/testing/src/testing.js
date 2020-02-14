/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/testing/src/testing.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { MockState } from './mock_state';
import { ActionsSubject, INITIAL_STATE, ReducerManager, StateObservable, Store, } from '@ngrx/store';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvdGVzdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUNMLGNBQWMsRUFDZCxhQUFhLEVBQ2IsY0FBYyxFQUNkLGVBQWUsRUFDZixLQUFLLEdBQ04sTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFDOzs7OztBQUUxQyxxQ0FHQzs7O0lBRkMsdUNBQWlCOztJQUNqQixvQ0FBMkI7Ozs7Ozs7QUFHN0IsTUFBTSxVQUFVLGdCQUFnQixDQUM5QixTQUE2QixFQUFFO0lBRS9CLE9BQU87UUFDTCxjQUFjO1FBQ2QsU0FBUztRQUNULFNBQVM7UUFDVCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxZQUFZLElBQUksRUFBRSxFQUFFO1FBQy9ELEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRTtRQUN2RCxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRTtRQUNqRCxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFO1FBQ3pELEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFO0tBQzNDLENBQUM7QUFDSixDQUFDO0FBRUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vY2tTdGF0ZSB9IGZyb20gJy4vbW9ja19zdGF0ZSc7XG5pbXBvcnQge1xuICBBY3Rpb25zU3ViamVjdCxcbiAgSU5JVElBTF9TVEFURSxcbiAgUmVkdWNlck1hbmFnZXIsXG4gIFN0YXRlT2JzZXJ2YWJsZSxcbiAgU3RvcmUsXG59IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IE1vY2tTdG9yZSB9IGZyb20gJy4vbW9ja19zdG9yZSc7XG5pbXBvcnQgeyBNb2NrUmVkdWNlck1hbmFnZXIgfSBmcm9tICcuL21vY2tfcmVkdWNlcl9tYW5hZ2VyJztcbmltcG9ydCB7IE1vY2tTZWxlY3RvciB9IGZyb20gJy4vbW9ja19zZWxlY3Rvcic7XG5pbXBvcnQgeyBNT0NLX1NFTEVDVE9SUyB9IGZyb20gJy4vdG9rZW5zJztcblxuZXhwb3J0IGludGVyZmFjZSBNb2NrU3RvcmVDb25maWc8VD4ge1xuICBpbml0aWFsU3RhdGU/OiBUO1xuICBzZWxlY3RvcnM/OiBNb2NrU2VsZWN0b3JbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVNb2NrU3RvcmU8VCA9IGFueT4oXG4gIGNvbmZpZzogTW9ja1N0b3JlQ29uZmlnPFQ+ID0ge31cbik6IFByb3ZpZGVyW10ge1xuICByZXR1cm4gW1xuICAgIEFjdGlvbnNTdWJqZWN0LFxuICAgIE1vY2tTdGF0ZSxcbiAgICBNb2NrU3RvcmUsXG4gICAgeyBwcm92aWRlOiBJTklUSUFMX1NUQVRFLCB1c2VWYWx1ZTogY29uZmlnLmluaXRpYWxTdGF0ZSB8fCB7fSB9LFxuICAgIHsgcHJvdmlkZTogTU9DS19TRUxFQ1RPUlMsIHVzZVZhbHVlOiBjb25maWcuc2VsZWN0b3JzIH0sXG4gICAgeyBwcm92aWRlOiBTdGF0ZU9ic2VydmFibGUsIHVzZUNsYXNzOiBNb2NrU3RhdGUgfSxcbiAgICB7IHByb3ZpZGU6IFJlZHVjZXJNYW5hZ2VyLCB1c2VDbGFzczogTW9ja1JlZHVjZXJNYW5hZ2VyIH0sXG4gICAgeyBwcm92aWRlOiBTdG9yZSwgdXNlRXhpc3Rpbmc6IE1vY2tTdG9yZSB9LFxuICBdO1xufVxuXG5leHBvcnQgeyBNb2NrUmVkdWNlck1hbmFnZXIgfSBmcm9tICcuL21vY2tfcmVkdWNlcl9tYW5hZ2VyJztcbmV4cG9ydCB7IE1vY2tTdGF0ZSB9IGZyb20gJy4vbW9ja19zdGF0ZSc7XG5leHBvcnQgeyBNb2NrU3RvcmUgfSBmcm9tICcuL21vY2tfc3RvcmUnO1xuZXhwb3J0IHsgTW9ja1NlbGVjdG9yIH0gZnJvbSAnLi9tb2NrX3NlbGVjdG9yJztcbiJdfQ==