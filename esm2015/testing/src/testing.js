/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        { provide: INITIAL_STATE, useValue: config.initialState },
        { provide: MOCK_SELECTORS, useValue: config.selectors },
        { provide: StateObservable, useClass: MockState },
        { provide: ReducerManager, useClass: MockReducerManager },
        { provide: Store, useClass: MockStore },
    ];
}
export { MockReducerManager } from './mock_reducer_manager';
export { MockState } from './mock_state';
export { MockStore } from './mock_store';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvdGVzdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsY0FBYyxFQUNkLGFBQWEsRUFDYixjQUFjLEVBQ2QsZUFBZSxFQUNmLEtBQUssR0FDTixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTVELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUM7Ozs7O0FBRTFDLHFDQUdDOzs7SUFGQyx1Q0FBaUI7O0lBQ2pCLG9DQUEyQjs7Ozs7OztBQUc3QixNQUFNLFVBQVUsZ0JBQWdCLENBQzlCLFNBQTZCLEVBQUU7SUFFL0IsT0FBTztRQUNMLGNBQWM7UUFDZCxTQUFTO1FBQ1QsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFFO1FBQ3pELEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRTtRQUN2RCxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRTtRQUNqRCxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFO1FBQ3pELEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFO0tBQ3hDLENBQUM7QUFDSixDQUFDO0FBRUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vY2tTdGF0ZSB9IGZyb20gJy4vbW9ja19zdGF0ZSc7XG5pbXBvcnQge1xuICBBY3Rpb25zU3ViamVjdCxcbiAgSU5JVElBTF9TVEFURSxcbiAgUmVkdWNlck1hbmFnZXIsXG4gIFN0YXRlT2JzZXJ2YWJsZSxcbiAgU3RvcmUsXG59IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IE1vY2tTdG9yZSB9IGZyb20gJy4vbW9ja19zdG9yZSc7XG5pbXBvcnQgeyBNb2NrUmVkdWNlck1hbmFnZXIgfSBmcm9tICcuL21vY2tfcmVkdWNlcl9tYW5hZ2VyJztcbmltcG9ydCB7IE1vY2tTZWxlY3RvciB9IGZyb20gJy4vbW9ja19zZWxlY3Rvcic7XG5pbXBvcnQgeyBNT0NLX1NFTEVDVE9SUyB9IGZyb20gJy4vdG9rZW5zJztcblxuZXhwb3J0IGludGVyZmFjZSBNb2NrU3RvcmVDb25maWc8VD4ge1xuICBpbml0aWFsU3RhdGU/OiBUO1xuICBzZWxlY3RvcnM/OiBNb2NrU2VsZWN0b3JbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVNb2NrU3RvcmU8VCA9IGFueT4oXG4gIGNvbmZpZzogTW9ja1N0b3JlQ29uZmlnPFQ+ID0ge31cbik6IFByb3ZpZGVyW10ge1xuICByZXR1cm4gW1xuICAgIEFjdGlvbnNTdWJqZWN0LFxuICAgIE1vY2tTdGF0ZSxcbiAgICB7IHByb3ZpZGU6IElOSVRJQUxfU1RBVEUsIHVzZVZhbHVlOiBjb25maWcuaW5pdGlhbFN0YXRlIH0sXG4gICAgeyBwcm92aWRlOiBNT0NLX1NFTEVDVE9SUywgdXNlVmFsdWU6IGNvbmZpZy5zZWxlY3RvcnMgfSxcbiAgICB7IHByb3ZpZGU6IFN0YXRlT2JzZXJ2YWJsZSwgdXNlQ2xhc3M6IE1vY2tTdGF0ZSB9LFxuICAgIHsgcHJvdmlkZTogUmVkdWNlck1hbmFnZXIsIHVzZUNsYXNzOiBNb2NrUmVkdWNlck1hbmFnZXIgfSxcbiAgICB7IHByb3ZpZGU6IFN0b3JlLCB1c2VDbGFzczogTW9ja1N0b3JlIH0sXG4gIF07XG59XG5cbmV4cG9ydCB7IE1vY2tSZWR1Y2VyTWFuYWdlciB9IGZyb20gJy4vbW9ja19yZWR1Y2VyX21hbmFnZXInO1xuZXhwb3J0IHsgTW9ja1N0YXRlIH0gZnJvbSAnLi9tb2NrX3N0YXRlJztcbmV4cG9ydCB7IE1vY2tTdG9yZSB9IGZyb20gJy4vbW9ja19zdG9yZSc7XG5leHBvcnQgeyBNb2NrU2VsZWN0b3IgfSBmcm9tICcuL21vY2tfc2VsZWN0b3InO1xuIl19