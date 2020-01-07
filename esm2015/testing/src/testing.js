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
        { provide: INITIAL_STATE, useValue: config.initialState || {} },
        { provide: MOCK_SELECTORS, useValue: config.selectors },
        { provide: StateObservable, useClass: MockState },
        { provide: ReducerManager, useClass: MockReducerManager },
        { provide: Store, useClass: MockStore },
    ];
}
export { MockReducerManager } from './mock_reducer_manager';
export { MockState } from './mock_state';
export { MockStore } from './mock_store';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvdGVzdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUNMLGNBQWMsRUFDZCxhQUFhLEVBQ2IsY0FBYyxFQUNkLGVBQWUsRUFDZixLQUFLLEdBQ04sTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFDOzs7OztBQUUxQyxxQ0FHQzs7O0lBRkMsdUNBQWlCOztJQUNqQixvQ0FBMkI7Ozs7Ozs7QUFHN0IsTUFBTSxVQUFVLGdCQUFnQixDQUM5QixTQUE2QixFQUFFO0lBRS9CLE9BQU87UUFDTCxjQUFjO1FBQ2QsU0FBUztRQUNULEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFlBQVksSUFBSSxFQUFFLEVBQUU7UUFDL0QsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFO1FBQ3ZELEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFO1FBQ2pELEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUU7UUFDekQsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUU7S0FDeEMsQ0FBQztBQUNKLENBQUM7QUFFRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9ja1N0YXRlIH0gZnJvbSAnLi9tb2NrX3N0YXRlJztcbmltcG9ydCB7XG4gIEFjdGlvbnNTdWJqZWN0LFxuICBJTklUSUFMX1NUQVRFLFxuICBSZWR1Y2VyTWFuYWdlcixcbiAgU3RhdGVPYnNlcnZhYmxlLFxuICBTdG9yZSxcbn0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgTW9ja1N0b3JlIH0gZnJvbSAnLi9tb2NrX3N0b3JlJztcbmltcG9ydCB7IE1vY2tSZWR1Y2VyTWFuYWdlciB9IGZyb20gJy4vbW9ja19yZWR1Y2VyX21hbmFnZXInO1xuaW1wb3J0IHsgTW9ja1NlbGVjdG9yIH0gZnJvbSAnLi9tb2NrX3NlbGVjdG9yJztcbmltcG9ydCB7IE1PQ0tfU0VMRUNUT1JTIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vY2tTdG9yZUNvbmZpZzxUPiB7XG4gIGluaXRpYWxTdGF0ZT86IFQ7XG4gIHNlbGVjdG9ycz86IE1vY2tTZWxlY3RvcltdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZU1vY2tTdG9yZTxUID0gYW55PihcbiAgY29uZmlnOiBNb2NrU3RvcmVDb25maWc8VD4gPSB7fVxuKTogUHJvdmlkZXJbXSB7XG4gIHJldHVybiBbXG4gICAgQWN0aW9uc1N1YmplY3QsXG4gICAgTW9ja1N0YXRlLFxuICAgIHsgcHJvdmlkZTogSU5JVElBTF9TVEFURSwgdXNlVmFsdWU6IGNvbmZpZy5pbml0aWFsU3RhdGUgfHwge30gfSxcbiAgICB7IHByb3ZpZGU6IE1PQ0tfU0VMRUNUT1JTLCB1c2VWYWx1ZTogY29uZmlnLnNlbGVjdG9ycyB9LFxuICAgIHsgcHJvdmlkZTogU3RhdGVPYnNlcnZhYmxlLCB1c2VDbGFzczogTW9ja1N0YXRlIH0sXG4gICAgeyBwcm92aWRlOiBSZWR1Y2VyTWFuYWdlciwgdXNlQ2xhc3M6IE1vY2tSZWR1Y2VyTWFuYWdlciB9LFxuICAgIHsgcHJvdmlkZTogU3RvcmUsIHVzZUNsYXNzOiBNb2NrU3RvcmUgfSxcbiAgXTtcbn1cblxuZXhwb3J0IHsgTW9ja1JlZHVjZXJNYW5hZ2VyIH0gZnJvbSAnLi9tb2NrX3JlZHVjZXJfbWFuYWdlcic7XG5leHBvcnQgeyBNb2NrU3RhdGUgfSBmcm9tICcuL21vY2tfc3RhdGUnO1xuZXhwb3J0IHsgTW9ja1N0b3JlIH0gZnJvbSAnLi9tb2NrX3N0b3JlJztcbmV4cG9ydCB7IE1vY2tTZWxlY3RvciB9IGZyb20gJy4vbW9ja19zZWxlY3Rvcic7XG4iXX0=