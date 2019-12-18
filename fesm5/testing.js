/**
 * @license NgRx 8.6.0
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */
import { __extends, __decorate, __metadata, __assign, __param } from 'tslib';
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store, createSelector, INITIAL_STATE, ActionsSubject, ReducerManager, StateObservable } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';

var MockState = /** @class */ (function (_super) {
    __extends(MockState, _super);
    function MockState() {
        return _super.call(this, {}) || this;
    }
    MockState = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], MockState);
    return MockState;
}(BehaviorSubject));

var MOCK_SELECTORS = new InjectionToken('@ngrx/store Mock Selectors');

if (typeof afterEach === 'function') {
    afterEach(function () {
        try {
            var store = TestBed.get(Store);
            if (store && 'resetSelectors' in store) {
                store.resetSelectors();
            }
        }
        catch (_a) { }
    });
}
var MockStore = /** @class */ (function (_super) {
    __extends(MockStore, _super);
    function MockStore(state$, actionsObserver, reducerManager, initialState, mockSelectors) {
        var _this = _super.call(this, state$, actionsObserver, reducerManager) || this;
        _this.state$ = state$;
        _this.initialState = initialState;
        _this.resetSelectors();
        _this.setState(_this.initialState);
        _this.scannedActions$ = actionsObserver.asObservable();
        if (mockSelectors) {
            mockSelectors.forEach(function (mockSelector) {
                var selector = mockSelector.selector;
                if (typeof selector === 'string') {
                    _this.overrideSelector(selector, mockSelector.value);
                }
                else {
                    _this.overrideSelector(selector, mockSelector.value);
                }
            });
        }
        return _this;
    }
    MockStore_1 = MockStore;
    MockStore.prototype.setState = function (nextState) {
        this.state$.next(nextState);
        this.lastState = nextState;
    };
    MockStore.prototype.overrideSelector = function (selector, value) {
        MockStore_1.selectors.set(selector, value);
        if (typeof selector === 'string') {
            var stringSelector = createSelector(function () { }, function () { return value; });
            return stringSelector;
        }
        selector.setResult(value);
        return selector;
    };
    MockStore.prototype.resetSelectors = function () {
        MockStore_1.selectors.forEach(function (_, selector) {
            if (typeof selector !== 'string') {
                selector.release();
                selector.setResult();
            }
        });
        MockStore_1.selectors.clear();
    };
    MockStore.prototype.select = function (selector, prop) {
        if (typeof selector === 'string' && MockStore_1.selectors.has(selector)) {
            return new BehaviorSubject(MockStore_1.selectors.get(selector)).asObservable();
        }
        return _super.prototype.select.call(this, selector, prop);
    };
    MockStore.prototype.addReducer = function () {
        /* noop */
    };
    MockStore.prototype.removeReducer = function () {
        /* noop */
    };
    /**
     * Refreshes the existing state.
     */
    MockStore.prototype.refreshState = function () {
        this.setState(__assign({}, this.lastState));
    };
    var MockStore_1;
    MockStore.selectors = new Map();
    MockStore = MockStore_1 = __decorate([
        Injectable(),
        __param(3, Inject(INITIAL_STATE)),
        __param(4, Inject(MOCK_SELECTORS)),
        __metadata("design:paramtypes", [MockState,
            ActionsSubject,
            ReducerManager, Object, Array])
    ], MockStore);
    return MockStore;
}(Store));

var MockReducerManager = /** @class */ (function (_super) {
    __extends(MockReducerManager, _super);
    function MockReducerManager() {
        return _super.call(this, function () { return undefined; }) || this;
    }
    MockReducerManager.prototype.addFeature = function (feature) {
        /* noop */
    };
    MockReducerManager.prototype.addFeatures = function (feature) {
        /* noop */
    };
    MockReducerManager = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], MockReducerManager);
    return MockReducerManager;
}(BehaviorSubject));

function provideMockStore(config) {
    if (config === void 0) { config = {}; }
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

/**
 * Generated bundle index. Do not edit.
 */

export { MOCK_SELECTORS as ɵngrx_modules_store_testing_testing_a, provideMockStore, MockReducerManager, MockState, MockStore };
//# sourceMappingURL=testing.js.map
