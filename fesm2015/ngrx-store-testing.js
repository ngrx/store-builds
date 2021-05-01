import { Injectable, InjectionToken, Inject, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store, createSelector, ActionsSubject, ReducerManager, INITIAL_STATE, setNgrxMockEnvironment, StateObservable } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';

class MockState extends BehaviorSubject {
    constructor() {
        super({});
    }
}
MockState.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MockState.ctorParameters = () => [];

const MOCK_SELECTORS = new InjectionToken('@ngrx/store Mock Selectors');

if (typeof afterEach === 'function') {
    afterEach(() => {
        try {
            const mockStore = TestBed.inject(MockStore);
            if (mockStore) {
                mockStore.resetSelectors();
            }
            // eslint-disable-next-line no-empty
        }
        catch (_a) { }
    });
}
class MockStore extends Store {
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
    setState(nextState) {
        this.state$.next(nextState);
        this.lastState = nextState;
    }
    overrideSelector(selector, value) {
        this.selectors.set(selector, value);
        const resultSelector = typeof selector === 'string'
            ? createSelector(() => { }, () => value)
            : selector;
        resultSelector.setResult(value);
        return resultSelector;
    }
    resetSelectors() {
        for (const selector of this.selectors.keys()) {
            if (typeof selector !== 'string') {
                selector.release();
                selector.clearResult();
            }
        }
        this.selectors.clear();
    }
    select(selector, prop) {
        if (typeof selector === 'string' && this.selectors.has(selector)) {
            return new BehaviorSubject(this.selectors.get(selector)).asObservable();
        }
        return super.select(selector, prop);
    }
    addReducer() {
        /* noop */
    }
    removeReducer() {
        /* noop */
    }
    /**
     * Refreshes the existing state.
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

class MockReducerManager extends BehaviorSubject {
    constructor() {
        super(() => undefined);
    }
    addFeature(feature) {
        /* noop */
    }
    addFeatures(feature) {
        /* noop */
    }
    removeFeature(feature) {
        /* noop */
    }
    removeFeatures(features) {
        /* noop */
    }
    addReducer(key, reducer) {
        /* noop */
    }
    addReducers(reducers) {
        /* noop */
    }
    removeReducer(featureKey) {
        /* noop */
    }
    removeReducers(featureKeys) {
        /* noop */
    }
}
MockReducerManager.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MockReducerManager.ctorParameters = () => [];

/**
 * @description
 * Creates mock store providers.
 *
 * @param config `MockStoreConfig<T>` to provide the values for `INITIAL_STATE` and `MOCK_SELECTORS` tokens.
 * By default, `initialState` and `selectors` are not defined.
 * @returns Mock store providers that can be used with both `TestBed.configureTestingModule` and `Injector.create`.
 *
 * @usageNotes
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
 */
function provideMockStore(config = {}) {
    setNgrxMockEnvironment(true);
    return [
        {
            provide: ActionsSubject,
            useFactory: () => new ActionsSubject(),
            deps: [],
        },
        { provide: MockState, useFactory: () => new MockState(), deps: [] },
        {
            provide: MockReducerManager,
            useFactory: () => new MockReducerManager(),
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
function mockStoreFactory(mockState, actionsSubject, reducerManager, initialState, mockSelectors) {
    return new MockStore(mockState, actionsSubject, reducerManager, initialState, mockSelectors);
}
/**
 * @description
 * Creates mock store with all necessary dependencies outside of the `TestBed`.
 *
 * @param config `MockStoreConfig<T>` to provide the values for `INITIAL_STATE` and `MOCK_SELECTORS` tokens.
 * By default, `initialState` and `selectors` are not defined.
 * @returns `MockStore<T>`
 *
 * @usageNotes
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
 */
function getMockStore(config = {}) {
    const injector = Injector.create({ providers: provideMockStore(config) });
    return injector.get(MockStore);
}

/**
 * Generated bundle index. Do not edit.
 */

export { MockReducerManager, MockState, MockStore, getMockStore, provideMockStore, MOCK_SELECTORS as ɵa };
//# sourceMappingURL=ngrx-store-testing.js.map
