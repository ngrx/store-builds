/**
 * @license NgRx 7.4.0+68.sha-8f2cb7b
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store, createSelector, ActionsSubject, ReducerManager, INITIAL_STATE, StateObservable } from '@ngrx/store';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class MockStore extends Store {
    /**
     * @param {?} state$
     * @param {?} actionsObserver
     * @param {?} reducerManager
     * @param {?} initialState
     */
    constructor(state$, actionsObserver, reducerManager, initialState) {
        super(state$, actionsObserver, reducerManager);
        this.state$ = state$;
        this.initialState = initialState;
        this.resetSelectors();
        this.state$.next(this.initialState);
        this.scannedActions$ = actionsObserver.asObservable();
    }
    /**
     * @param {?} nextState
     * @return {?}
     */
    setState(nextState) {
        this.state$.next(nextState);
    }
    /**
     * @template T, Result
     * @param {?} selector
     * @param {?} value
     * @return {?}
     */
    overrideSelector(selector, value) {
        MockStore.selectors.set(selector, value);
        if (typeof selector === 'string') {
            /** @type {?} */
            const stringSelector = createSelector((/**
             * @return {?}
             */
            () => { }), (/**
             * @return {?}
             */
            () => value));
            return stringSelector;
        }
        selector.setResult(value);
        return selector;
    }
    /**
     * @return {?}
     */
    resetSelectors() {
        MockStore.selectors.forEach((/**
         * @param {?} _
         * @param {?} selector
         * @return {?}
         */
        (_, selector) => {
            if (typeof selector !== 'string') {
                selector.release();
                selector.setResult();
            }
        }));
        MockStore.selectors.clear();
    }
    /**
     * @param {?} selector
     * @return {?}
     */
    select(selector) {
        if (MockStore.selectors.has(selector)) {
            return new BehaviorSubject(MockStore.selectors.get(selector)).asObservable();
        }
        return super.select(selector);
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
}
MockStore.selectors = new Map();
MockStore.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MockStore.ctorParameters = () => [
    { type: MockState },
    { type: ActionsSubject },
    { type: ReducerManager },
    { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MockReducerManager extends BehaviorSubject {
    constructor() {
        super((/**
         * @return {?}
         */
        () => undefined));
    }
}
MockReducerManager.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MockReducerManager.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?=} config
 * @return {?}
 */
function provideMockStore(config = {}) {
    return [
        ActionsSubject,
        MockState,
        { provide: INITIAL_STATE, useValue: config.initialState },
        { provide: StateObservable, useClass: MockState },
        { provide: ReducerManager, useClass: MockReducerManager },
        { provide: Store, useClass: MockStore },
    ];
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { provideMockStore, MockReducerManager, MockState, MockStore };
//# sourceMappingURL=testing.js.map
