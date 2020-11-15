/**
 * @fileoverview added by tsickle
 * Generated from: testing.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injector, } from '@angular/core';
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
 * \@description
 * Creates mock store providers.
 *
 * \@usageNotes
 *
 * **With `TestBed.configureTestingModule`**
 *
 * ```typescript
 * describe('Books Component', () => {
 *   let store: MockStore;
 *
 *   beforeEach(() => {
 *     TestBed.configureTestingModule({
 *       providers: [
 *         provideMockStore({
 *           initialState: { books: { entities: [] } },
 *           selectors: [
 *             { selector: selectAllBooks, value: ['Book 1', 'Book 2'] },
 *             { selector: selectVisibleBooks, value: ['Book 1'] },
 *           ],
 *         }),
 *       ],
 *     });
 *
 *     store = TestBed.inject(MockStore);
 *   });
 * });
 * ```
 *
 * **With `Injector.create`**
 *
 * ```typescript
 * describe('Counter Component', () => {
 *   let injector: Injector;
 *   let store: MockStore;
 *
 *   beforeEach(() => {
 *     injector = Injector.create({
 *       providers: [
 *         provideMockStore({ initialState: { counter: 0 } }),
 *       ],
 *     });
 *     store = injector.get(MockStore);
 *   });
 * });
 * ```
 * @template T
 * @param {?=} config `MockStoreConfig<T>` to provide the values for `INITIAL_STATE` and `MOCK_SELECTORS` tokens.
 * By default, `initialState` and `selectors` are not defined.
 * @return {?} Mock store providers that can be used with both `TestBed.configureTestingModule` and `Injector.create`.
 *
 */
export function provideMockStore(config = {}) {
    setNgrxMockEnvironment(true);
    return [
        {
            provide: ActionsSubject,
            useFactory: (/**
             * @return {?}
             */
            () => new ActionsSubject()),
            deps: [],
        },
        { provide: MockState, useFactory: (/**
             * @return {?}
             */
            () => new MockState()), deps: [] },
        {
            provide: MockReducerManager,
            useFactory: (/**
             * @return {?}
             */
            () => new MockReducerManager()),
            deps: [],
        },
        { provide: INITIAL_STATE, useValue: config.initialState || {} },
        { provide: MOCK_SELECTORS, useValue: config.selectors },
        { provide: StateObservable, useExisting: MockState },
        { provide: ReducerManager, useExisting: MockReducerManager },
        {
            provide: MockStore,
            useFactory: mockStoreFactory,
            deps: [
                MockState,
                ActionsSubject,
                ReducerManager,
                INITIAL_STATE,
                MOCK_SELECTORS,
            ],
        },
        { provide: Store, useExisting: MockStore },
    ];
}
/**
 * @template T
 * @param {?} mockState
 * @param {?} actionsSubject
 * @param {?} reducerManager
 * @param {?} initialState
 * @param {?} mockSelectors
 * @return {?}
 */
function mockStoreFactory(mockState, actionsSubject, reducerManager, initialState, mockSelectors) {
    return new MockStore(mockState, actionsSubject, reducerManager, initialState, mockSelectors);
}
/**
 * \@description
 * Creates mock store with all necessary dependencies outside of the `TestBed`.
 *
 * \@usageNotes
 *
 * ```typescript
 * describe('Books Effects', () => {
 *   let store: MockStore;
 *
 *   beforeEach(() => {
 *     store = getMockStore({
 *       initialState: { books: { entities: ['Book 1', 'Book 2', 'Book 3'] } },
 *       selectors: [
 *         { selector: selectAllBooks, value: ['Book 1', 'Book 2'] },
 *         { selector: selectVisibleBooks, value: ['Book 1'] },
 *       ],
 *     });
 *   });
 * });
 * ```
 * @template T
 * @param {?=} config `MockStoreConfig<T>` to provide the values for `INITIAL_STATE` and `MOCK_SELECTORS` tokens.
 * By default, `initialState` and `selectors` are not defined.
 * @return {?} `MockStore<T>`
 *
 */
export function getMockStore(config = {}) {
    /** @type {?} */
    const injector = Injector.create({ providers: provideMockStore(config) });
    return injector.get(MockStore);
}
export { MockReducerManager } from './mock_reducer_manager';
export { MockState } from './mock_state';
export { MockStore } from './mock_store';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvdGVzdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFHTCxRQUFRLEdBRVQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsY0FBYyxFQUNkLGFBQWEsRUFDYixjQUFjLEVBQ2QsZUFBZSxFQUNmLEtBQUssRUFDTCxzQkFBc0IsR0FDdkIsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFDOzs7OztBQUUxQyxxQ0FHQzs7O0lBRkMsdUNBQWlCOztJQUNqQixvQ0FBMkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1RDdCLE1BQU0sVUFBVSxnQkFBZ0IsQ0FDOUIsU0FBNkIsRUFBRTtJQUUvQixzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixPQUFPO1FBQ0w7WUFDRSxPQUFPLEVBQUUsY0FBYztZQUN2QixVQUFVOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLGNBQWMsRUFBRSxDQUFBO1lBQ3RDLElBQUksRUFBRSxFQUFFO1NBQ1Q7UUFDRCxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVTs7O1lBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxTQUFTLEVBQUssQ0FBQSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDdEU7WUFDRSxPQUFPLEVBQUUsa0JBQWtCO1lBQzNCLFVBQVU7OztZQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksa0JBQWtCLEVBQUUsQ0FBQTtZQUMxQyxJQUFJLEVBQUUsRUFBRTtTQUNUO1FBQ0QsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsWUFBWSxJQUFJLEVBQUUsRUFBRTtRQUMvRCxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUU7UUFDdkQsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUU7UUFDcEQsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRTtRQUM1RDtZQUNFLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLFVBQVUsRUFBRSxnQkFBZ0I7WUFDNUIsSUFBSSxFQUFFO2dCQUNKLFNBQVM7Z0JBQ1QsY0FBYztnQkFDZCxjQUFjO2dCQUNkLGFBQWE7Z0JBQ2IsY0FBYzthQUNmO1NBQ0Y7UUFDRCxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRTtLQUMzQyxDQUFDO0FBQ0osQ0FBQzs7Ozs7Ozs7OztBQUVELFNBQVMsZ0JBQWdCLENBQ3ZCLFNBQXVCLEVBQ3ZCLGNBQThCLEVBQzlCLGNBQThCLEVBQzlCLFlBQWUsRUFDZixhQUE2QjtJQUU3QixPQUFPLElBQUksU0FBUyxDQUNsQixTQUFTLEVBQ1QsY0FBYyxFQUNkLGNBQWMsRUFDZCxZQUFZLEVBQ1osYUFBYSxDQUNkLENBQUM7QUFDSixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEJELE1BQU0sVUFBVSxZQUFZLENBQUksU0FBNkIsRUFBRTs7VUFDdkQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUN6RSxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEV4aXN0aW5nUHJvdmlkZXIsXG4gIEZhY3RvcnlQcm92aWRlcixcbiAgSW5qZWN0b3IsXG4gIFZhbHVlUHJvdmlkZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9ja1N0YXRlIH0gZnJvbSAnLi9tb2NrX3N0YXRlJztcbmltcG9ydCB7XG4gIEFjdGlvbnNTdWJqZWN0LFxuICBJTklUSUFMX1NUQVRFLFxuICBSZWR1Y2VyTWFuYWdlcixcbiAgU3RhdGVPYnNlcnZhYmxlLFxuICBTdG9yZSxcbiAgc2V0TmdyeE1vY2tFbnZpcm9ubWVudCxcbn0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgTW9ja1N0b3JlIH0gZnJvbSAnLi9tb2NrX3N0b3JlJztcbmltcG9ydCB7IE1vY2tSZWR1Y2VyTWFuYWdlciB9IGZyb20gJy4vbW9ja19yZWR1Y2VyX21hbmFnZXInO1xuaW1wb3J0IHsgTW9ja1NlbGVjdG9yIH0gZnJvbSAnLi9tb2NrX3NlbGVjdG9yJztcbmltcG9ydCB7IE1PQ0tfU0VMRUNUT1JTIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vY2tTdG9yZUNvbmZpZzxUPiB7XG4gIGluaXRpYWxTdGF0ZT86IFQ7XG4gIHNlbGVjdG9ycz86IE1vY2tTZWxlY3RvcltdO1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQ3JlYXRlcyBtb2NrIHN0b3JlIHByb3ZpZGVycy5cbiAqXG4gKiBAcGFyYW0gY29uZmlnIGBNb2NrU3RvcmVDb25maWc8VD5gIHRvIHByb3ZpZGUgdGhlIHZhbHVlcyBmb3IgYElOSVRJQUxfU1RBVEVgIGFuZCBgTU9DS19TRUxFQ1RPUlNgIHRva2Vucy5cbiAqIEJ5IGRlZmF1bHQsIGBpbml0aWFsU3RhdGVgIGFuZCBgc2VsZWN0b3JzYCBhcmUgbm90IGRlZmluZWQuXG4gKiBAcmV0dXJucyBNb2NrIHN0b3JlIHByb3ZpZGVycyB0aGF0IGNhbiBiZSB1c2VkIHdpdGggYm90aCBgVGVzdEJlZC5jb25maWd1cmVUZXN0aW5nTW9kdWxlYCBhbmQgYEluamVjdG9yLmNyZWF0ZWAuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiAqKldpdGggYFRlc3RCZWQuY29uZmlndXJlVGVzdGluZ01vZHVsZWAqKlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGRlc2NyaWJlKCdCb29rcyBDb21wb25lbnQnLCAoKSA9PiB7XG4gKiAgIGxldCBzdG9yZTogTW9ja1N0b3JlO1xuICpcbiAqICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gKiAgICAgVGVzdEJlZC5jb25maWd1cmVUZXN0aW5nTW9kdWxlKHtcbiAqICAgICAgIHByb3ZpZGVyczogW1xuICogICAgICAgICBwcm92aWRlTW9ja1N0b3JlKHtcbiAqICAgICAgICAgICBpbml0aWFsU3RhdGU6IHsgYm9va3M6IHsgZW50aXRpZXM6IFtdIH0gfSxcbiAqICAgICAgICAgICBzZWxlY3RvcnM6IFtcbiAqICAgICAgICAgICAgIHsgc2VsZWN0b3I6IHNlbGVjdEFsbEJvb2tzLCB2YWx1ZTogWydCb29rIDEnLCAnQm9vayAyJ10gfSxcbiAqICAgICAgICAgICAgIHsgc2VsZWN0b3I6IHNlbGVjdFZpc2libGVCb29rcywgdmFsdWU6IFsnQm9vayAxJ10gfSxcbiAqICAgICAgICAgICBdLFxuICogICAgICAgICB9KSxcbiAqICAgICAgIF0sXG4gKiAgICAgfSk7XG4gKlxuICogICAgIHN0b3JlID0gVGVzdEJlZC5pbmplY3QoTW9ja1N0b3JlKTtcbiAqICAgfSk7XG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqICoqV2l0aCBgSW5qZWN0b3IuY3JlYXRlYCoqXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogZGVzY3JpYmUoJ0NvdW50ZXIgQ29tcG9uZW50JywgKCkgPT4ge1xuICogICBsZXQgaW5qZWN0b3I6IEluamVjdG9yO1xuICogICBsZXQgc3RvcmU6IE1vY2tTdG9yZTtcbiAqXG4gKiAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICogICAgIGluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAqICAgICAgIHByb3ZpZGVyczogW1xuICogICAgICAgICBwcm92aWRlTW9ja1N0b3JlKHsgaW5pdGlhbFN0YXRlOiB7IGNvdW50ZXI6IDAgfSB9KSxcbiAqICAgICAgIF0sXG4gKiAgICAgfSk7XG4gKiAgICAgc3RvcmUgPSBpbmplY3Rvci5nZXQoTW9ja1N0b3JlKTtcbiAqICAgfSk7XG4gKiB9KTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZU1vY2tTdG9yZTxUID0gYW55PihcbiAgY29uZmlnOiBNb2NrU3RvcmVDb25maWc8VD4gPSB7fVxuKTogKFZhbHVlUHJvdmlkZXIgfCBFeGlzdGluZ1Byb3ZpZGVyIHwgRmFjdG9yeVByb3ZpZGVyKVtdIHtcbiAgc2V0TmdyeE1vY2tFbnZpcm9ubWVudCh0cnVlKTtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBBY3Rpb25zU3ViamVjdCxcbiAgICAgIHVzZUZhY3Rvcnk6ICgpID0+IG5ldyBBY3Rpb25zU3ViamVjdCgpLFxuICAgICAgZGVwczogW10sXG4gICAgfSxcbiAgICB7IHByb3ZpZGU6IE1vY2tTdGF0ZSwgdXNlRmFjdG9yeTogKCkgPT4gbmV3IE1vY2tTdGF0ZTxUPigpLCBkZXBzOiBbXSB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1vY2tSZWR1Y2VyTWFuYWdlcixcbiAgICAgIHVzZUZhY3Rvcnk6ICgpID0+IG5ldyBNb2NrUmVkdWNlck1hbmFnZXIoKSxcbiAgICAgIGRlcHM6IFtdLFxuICAgIH0sXG4gICAgeyBwcm92aWRlOiBJTklUSUFMX1NUQVRFLCB1c2VWYWx1ZTogY29uZmlnLmluaXRpYWxTdGF0ZSB8fCB7fSB9LFxuICAgIHsgcHJvdmlkZTogTU9DS19TRUxFQ1RPUlMsIHVzZVZhbHVlOiBjb25maWcuc2VsZWN0b3JzIH0sXG4gICAgeyBwcm92aWRlOiBTdGF0ZU9ic2VydmFibGUsIHVzZUV4aXN0aW5nOiBNb2NrU3RhdGUgfSxcbiAgICB7IHByb3ZpZGU6IFJlZHVjZXJNYW5hZ2VyLCB1c2VFeGlzdGluZzogTW9ja1JlZHVjZXJNYW5hZ2VyIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTW9ja1N0b3JlLFxuICAgICAgdXNlRmFjdG9yeTogbW9ja1N0b3JlRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtcbiAgICAgICAgTW9ja1N0YXRlLFxuICAgICAgICBBY3Rpb25zU3ViamVjdCxcbiAgICAgICAgUmVkdWNlck1hbmFnZXIsXG4gICAgICAgIElOSVRJQUxfU1RBVEUsXG4gICAgICAgIE1PQ0tfU0VMRUNUT1JTLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHsgcHJvdmlkZTogU3RvcmUsIHVzZUV4aXN0aW5nOiBNb2NrU3RvcmUgfSxcbiAgXTtcbn1cblxuZnVuY3Rpb24gbW9ja1N0b3JlRmFjdG9yeTxUPihcbiAgbW9ja1N0YXRlOiBNb2NrU3RhdGU8VD4sXG4gIGFjdGlvbnNTdWJqZWN0OiBBY3Rpb25zU3ViamVjdCxcbiAgcmVkdWNlck1hbmFnZXI6IFJlZHVjZXJNYW5hZ2VyLFxuICBpbml0aWFsU3RhdGU6IFQsXG4gIG1vY2tTZWxlY3RvcnM6IE1vY2tTZWxlY3RvcltdXG4pOiBNb2NrU3RvcmU8VD4ge1xuICByZXR1cm4gbmV3IE1vY2tTdG9yZShcbiAgICBtb2NrU3RhdGUsXG4gICAgYWN0aW9uc1N1YmplY3QsXG4gICAgcmVkdWNlck1hbmFnZXIsXG4gICAgaW5pdGlhbFN0YXRlLFxuICAgIG1vY2tTZWxlY3RvcnNcbiAgKTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENyZWF0ZXMgbW9jayBzdG9yZSB3aXRoIGFsbCBuZWNlc3NhcnkgZGVwZW5kZW5jaWVzIG91dHNpZGUgb2YgdGhlIGBUZXN0QmVkYC5cbiAqXG4gKiBAcGFyYW0gY29uZmlnIGBNb2NrU3RvcmVDb25maWc8VD5gIHRvIHByb3ZpZGUgdGhlIHZhbHVlcyBmb3IgYElOSVRJQUxfU1RBVEVgIGFuZCBgTU9DS19TRUxFQ1RPUlNgIHRva2Vucy5cbiAqIEJ5IGRlZmF1bHQsIGBpbml0aWFsU3RhdGVgIGFuZCBgc2VsZWN0b3JzYCBhcmUgbm90IGRlZmluZWQuXG4gKiBAcmV0dXJucyBgTW9ja1N0b3JlPFQ+YFxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogZGVzY3JpYmUoJ0Jvb2tzIEVmZmVjdHMnLCAoKSA9PiB7XG4gKiAgIGxldCBzdG9yZTogTW9ja1N0b3JlO1xuICpcbiAqICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gKiAgICAgc3RvcmUgPSBnZXRNb2NrU3RvcmUoe1xuICogICAgICAgaW5pdGlhbFN0YXRlOiB7IGJvb2tzOiB7IGVudGl0aWVzOiBbJ0Jvb2sgMScsICdCb29rIDInLCAnQm9vayAzJ10gfSB9LFxuICogICAgICAgc2VsZWN0b3JzOiBbXG4gKiAgICAgICAgIHsgc2VsZWN0b3I6IHNlbGVjdEFsbEJvb2tzLCB2YWx1ZTogWydCb29rIDEnLCAnQm9vayAyJ10gfSxcbiAqICAgICAgICAgeyBzZWxlY3Rvcjogc2VsZWN0VmlzaWJsZUJvb2tzLCB2YWx1ZTogWydCb29rIDEnXSB9LFxuICogICAgICAgXSxcbiAqICAgICB9KTtcbiAqICAgfSk7XG4gKiB9KTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9ja1N0b3JlPFQ+KGNvbmZpZzogTW9ja1N0b3JlQ29uZmlnPFQ+ID0ge30pOiBNb2NrU3RvcmU8VD4ge1xuICBjb25zdCBpbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7IHByb3ZpZGVyczogcHJvdmlkZU1vY2tTdG9yZShjb25maWcpIH0pO1xuICByZXR1cm4gaW5qZWN0b3IuZ2V0KE1vY2tTdG9yZSk7XG59XG5cbmV4cG9ydCB7IE1vY2tSZWR1Y2VyTWFuYWdlciB9IGZyb20gJy4vbW9ja19yZWR1Y2VyX21hbmFnZXInO1xuZXhwb3J0IHsgTW9ja1N0YXRlIH0gZnJvbSAnLi9tb2NrX3N0YXRlJztcbmV4cG9ydCB7IE1vY2tTdG9yZSB9IGZyb20gJy4vbW9ja19zdG9yZSc7XG5leHBvcnQgeyBNb2NrU2VsZWN0b3IgfSBmcm9tICcuL21vY2tfc2VsZWN0b3InO1xuIl19