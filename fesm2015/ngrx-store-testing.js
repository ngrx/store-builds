import { Injectable, InjectionToken, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store, createSelector, ActionsSubject, ReducerManager, INITIAL_STATE, setNgrxMockEnvironment, StateObservable } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';

/**
 * @fileoverview added by tsickle
 * Generated from: mock_state.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class MockState extends BehaviorSubject {
    constructor() {
        super((/** @type {?} */ ({})));
    }
}
MockState.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MockState.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * Generated from: tokens.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MOCK_SELECTORS = new InjectionToken('@ngrx/store Mock Selectors');

/**
 * @fileoverview added by tsickle
 * Generated from: mock_store.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
if (typeof afterEach === 'function') {
    afterEach((/**
     * @return {?}
     */
    () => {
        try {
            /** @type {?} */
            const mockStore = TestBed.inject(MockStore);
            if (mockStore) {
                mockStore.resetSelectors();
            }
        }
        catch (_a) { }
    }));
}
/**
 * @template T
 */
class MockStore extends Store {
    /**
     * @param {?} state$
     * @param {?} actionsObserver
     * @param {?} reducerManager
     * @param {?} initialState
     * @param {?=} mockSelectors
     */
    constructor(state$, actionsObserver, reducerManager, initialState, mockSelectors = []) {
        super(state$, actionsObserver, reducerManager);
        this.state$ = state$;
        this.initialState = initialState;
        this.selectors = new Map();
        this.resetSelectors();
        this.setState(this.initialState);
        this.scannedActions$ = actionsObserver.asObservable();
        for (const mockSelector of mockSelectors) {
            this.overrideSelector(mockSelector.selector, mockSelector.value);
        }
    }
    /**
     * @param {?} nextState
     * @return {?}
     */
    setState(nextState) {
        this.state$.next(nextState);
        this.lastState = nextState;
    }
    /**
     * @template Selector, Value, Result
     * @param {?} selector
     * @param {?} value
     * @return {?}
     */
    overrideSelector(selector, value) {
        this.selectors.set(selector, value);
        /** @type {?} */
        const resultSelector = typeof selector === 'string'
            ? createSelector((/**
             * @return {?}
             */
            () => { }), (/**
             * @return {?}
             */
            () => value))
            : selector;
        resultSelector.setResult(value);
        return (/** @type {?} */ (resultSelector));
    }
    /**
     * @return {?}
     */
    resetSelectors() {
        for (const selector of this.selectors.keys()) {
            if (typeof selector !== 'string') {
                selector.release();
                selector.clearResult();
            }
        }
        this.selectors.clear();
    }
    /**
     * @param {?} selector
     * @param {?=} prop
     * @return {?}
     */
    select(selector, prop) {
        if (typeof selector === 'string' && this.selectors.has(selector)) {
            return new BehaviorSubject(this.selectors.get(selector)).asObservable();
        }
        return super.select(selector, prop);
    }
    /**
     * @return {?}
     */
    addReducer() {
        /* noop */
    }
    /**
     * @return {?}
     */
    removeReducer() {
        /* noop */
    }
    /**
     * Refreshes the existing state.
     * @return {?}
     */
    refreshState() {
        if (this.lastState)
            this.setState(Object.assign({}, this.lastState));
    }
}
MockStore.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MockStore.ctorParameters = () => [
    { type: MockState },
    { type: ActionsSubject },
    { type: ReducerManager },
    { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] }] },
    { type: Array, decorators: [{ type: Inject, args: [MOCK_SELECTORS,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    MockStore.prototype.selectors;
    /** @type {?} */
    MockStore.prototype.scannedActions$;
    /**
     * @type {?}
     * @private
     */
    MockStore.prototype.lastState;
    /**
     * @type {?}
     * @private
     */
    MockStore.prototype.state$;
    /**
     * @type {?}
     * @private
     */
    MockStore.prototype.initialState;
}

/**
 * @fileoverview added by tsickle
 * Generated from: mock_reducer_manager.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MockReducerManager extends BehaviorSubject {
    constructor() {
        super((/**
         * @return {?}
         */
        () => undefined));
    }
    /**
     * @param {?} feature
     * @return {?}
     */
    addFeature(feature) {
        /* noop */
    }
    /**
     * @param {?} feature
     * @return {?}
     */
    addFeatures(feature) {
        /* noop */
    }
}
MockReducerManager.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MockReducerManager.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * Generated from: testing.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template T
 */
function MockStoreConfig() { }
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
function provideMockStore(config = {}) {
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

/**
 * @fileoverview added by tsickle
 * Generated from: public_api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngrx-store-testing.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MockReducerManager, MockState, MockStore, provideMockStore, MOCK_SELECTORS as ɵa };
//# sourceMappingURL=ngrx-store-testing.js.map
