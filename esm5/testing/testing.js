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
export function provideMockStore(config) {
    if (config === void 0) { config = {}; }
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
//# sourceMappingURL=testing.js.map