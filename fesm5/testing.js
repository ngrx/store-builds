/**
 * @license NgRx 9.0.0
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */
import { __extends, __decorate, __metadata, __values, __assign, __param } from 'tslib';
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { createSelector, INITIAL_STATE, ActionsSubject, ReducerManager, Store, StateObservable } from '@ngrx/store';
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
            var mockStore = TestBed.inject(MockStore);
            if (mockStore) {
                mockStore.resetSelectors();
            }
        }
        catch (_a) { }
    });
}
var MockStore = /** @class */ (function (_super) {
    __extends(MockStore, _super);
    function MockStore(state$, actionsObserver, reducerManager, initialState, mockSelectors) {
        var e_1, _a;
        if (mockSelectors === void 0) { mockSelectors = []; }
        var _this = _super.call(this, state$, actionsObserver, reducerManager) || this;
        _this.state$ = state$;
        _this.initialState = initialState;
        _this.selectors = new Map();
        _this.resetSelectors();
        _this.setState(_this.initialState);
        _this.scannedActions$ = actionsObserver.asObservable();
        try {
            for (var mockSelectors_1 = __values(mockSelectors), mockSelectors_1_1 = mockSelectors_1.next(); !mockSelectors_1_1.done; mockSelectors_1_1 = mockSelectors_1.next()) {
                var mockSelector = mockSelectors_1_1.value;
                _this.overrideSelector(mockSelector.selector, mockSelector.value);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (mockSelectors_1_1 && !mockSelectors_1_1.done && (_a = mockSelectors_1.return)) _a.call(mockSelectors_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return _this;
    }
    MockStore.prototype.setState = function (nextState) {
        this.state$.next(nextState);
        this.lastState = nextState;
    };
    MockStore.prototype.overrideSelector = function (selector, value) {
        this.selectors.set(selector, value);
        var resultSelector = typeof selector === 'string'
            ? createSelector(function () { }, function () { return value; })
            : selector;
        resultSelector.setResult(value);
        return resultSelector;
    };
    MockStore.prototype.resetSelectors = function () {
        var e_2, _a;
        try {
            for (var _b = __values(this.selectors.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var selector = _c.value;
                if (typeof selector !== 'string') {
                    selector.release();
                    selector.clearResult();
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.selectors.clear();
    };
    MockStore.prototype.select = function (selector, prop) {
        if (typeof selector === 'string' && this.selectors.has(selector)) {
            return new BehaviorSubject(this.selectors.get(selector)).asObservable();
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
        if (this.lastState)
            this.setState(__assign({}, this.lastState));
    };
    MockStore = __decorate([
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
        MockStore,
        { provide: INITIAL_STATE, useValue: config.initialState || {} },
        { provide: MOCK_SELECTORS, useValue: config.selectors },
        { provide: StateObservable, useClass: MockState },
        { provide: ReducerManager, useClass: MockReducerManager },
        { provide: Store, useExisting: MockStore },
    ];
}

/**
 * Generated bundle index. Do not edit.
 */

export { MockReducerManager, MockState, MockStore, provideMockStore, MOCK_SELECTORS as ɵngrx_modules_store_testing_testing_a };
//# sourceMappingURL=testing.js.map
