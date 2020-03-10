/**
 * @license NgRx 9.0.0
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('@angular/core'), require('rxjs'), require('@ngrx/store'), require('@angular/core/testing')) :
    typeof define === 'function' && define.amd ? define('@ngrx/store/testing', ['exports', 'tslib', '@angular/core', 'rxjs', '@ngrx/store', '@angular/core/testing'], factory) :
    (global = global || self, factory((global.ngrx = global.ngrx || {}, global.ngrx.store = global.ngrx.store || {}, global.ngrx.store.testing = {}), global.tslib, global.ng.core, global.rxjs, global.ngrx.store, global.ng.core.testing));
}(this, (function (exports, tslib, core, rxjs, store, testing) { 'use strict';

    var MockState = /** @class */ (function (_super) {
        tslib.__extends(MockState, _super);
        function MockState() {
            return _super.call(this, {}) || this;
        }
        MockState = tslib.__decorate([
            core.Injectable(),
            tslib.__metadata("design:paramtypes", [])
        ], MockState);
        return MockState;
    }(rxjs.BehaviorSubject));

    var MOCK_SELECTORS = new core.InjectionToken('@ngrx/store Mock Selectors');

    if (typeof afterEach === 'function') {
        afterEach(function () {
            try {
                var mockStore = testing.TestBed.inject(MockStore);
                if (mockStore) {
                    mockStore.resetSelectors();
                }
            }
            catch (_a) { }
        });
    }
    var MockStore = /** @class */ (function (_super) {
        tslib.__extends(MockStore, _super);
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
                for (var mockSelectors_1 = tslib.__values(mockSelectors), mockSelectors_1_1 = mockSelectors_1.next(); !mockSelectors_1_1.done; mockSelectors_1_1 = mockSelectors_1.next()) {
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
                ? store.createSelector(function () { }, function () { return value; })
                : selector;
            resultSelector.setResult(value);
            return resultSelector;
        };
        MockStore.prototype.resetSelectors = function () {
            var e_2, _a;
            try {
                for (var _b = tslib.__values(this.selectors.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                return new rxjs.BehaviorSubject(this.selectors.get(selector)).asObservable();
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
                this.setState(tslib.__assign({}, this.lastState));
        };
        MockStore = tslib.__decorate([
            core.Injectable(),
            tslib.__param(3, core.Inject(store.INITIAL_STATE)),
            tslib.__param(4, core.Inject(MOCK_SELECTORS)),
            tslib.__metadata("design:paramtypes", [MockState,
                store.ActionsSubject,
                store.ReducerManager, Object, Array])
        ], MockStore);
        return MockStore;
    }(store.Store));

    var MockReducerManager = /** @class */ (function (_super) {
        tslib.__extends(MockReducerManager, _super);
        function MockReducerManager() {
            return _super.call(this, function () { return undefined; }) || this;
        }
        MockReducerManager.prototype.addFeature = function (feature) {
            /* noop */
        };
        MockReducerManager.prototype.addFeatures = function (feature) {
            /* noop */
        };
        MockReducerManager = tslib.__decorate([
            core.Injectable(),
            tslib.__metadata("design:paramtypes", [])
        ], MockReducerManager);
        return MockReducerManager;
    }(rxjs.BehaviorSubject));

    function provideMockStore(config) {
        if (config === void 0) { config = {}; }
        return [
            store.ActionsSubject,
            MockState,
            MockStore,
            { provide: store.INITIAL_STATE, useValue: config.initialState || {} },
            { provide: MOCK_SELECTORS, useValue: config.selectors },
            { provide: store.StateObservable, useClass: MockState },
            { provide: store.ReducerManager, useClass: MockReducerManager },
            { provide: store.Store, useExisting: MockStore },
        ];
    }

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MockReducerManager = MockReducerManager;
    exports.MockState = MockState;
    exports.MockStore = MockStore;
    exports.provideMockStore = provideMockStore;
    exports.ɵngrx_modules_store_testing_testing_a = MOCK_SELECTORS;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=store-testing.umd.js.map
