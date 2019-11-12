/**
 * @license NgRx 8.5.1
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('@angular/core'), require('rxjs'), require('@ngrx/store'), require('@angular/core/testing')) :
    typeof define === 'function' && define.amd ? define('@ngrx/store/testing', ['exports', 'tslib', '@angular/core', 'rxjs', '@ngrx/store', '@angular/core/testing'], factory) :
    (global = global || self, factory((global.ngrx = global.ngrx || {}, global.ngrx.store = global.ngrx.store || {}, global.ngrx.store.testing = {}), global.tslib, global.ng.core, global.rxjs, global['@ngrx/store'], global.ng.core.testing));
}(this, function (exports, tslib_1, core, rxjs, store, testing) { 'use strict';

    var MockState = /** @class */ (function (_super) {
        tslib_1.__extends(MockState, _super);
        function MockState() {
            return _super.call(this, {}) || this;
        }
        MockState = tslib_1.__decorate([
            core.Injectable(),
            tslib_1.__metadata("design:paramtypes", [])
        ], MockState);
        return MockState;
    }(rxjs.BehaviorSubject));

    var MOCK_SELECTORS = new core.InjectionToken('@ngrx/store Mock Selectors');

    if (typeof afterEach === 'function') {
        afterEach(function () {
            try {
                var store$1 = testing.TestBed.get(store.Store);
                if (store$1 && 'resetSelectors' in store$1) {
                    store$1.resetSelectors();
                }
            }
            catch (_a) { }
        });
    }
    var MockStore = /** @class */ (function (_super) {
        tslib_1.__extends(MockStore, _super);
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
                var stringSelector = store.createSelector(function () { }, function () { return value; });
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
                return new rxjs.BehaviorSubject(MockStore_1.selectors.get(selector)).asObservable();
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
            this.setState(tslib_1.__assign({}, this.lastState));
        };
        var MockStore_1;
        MockStore.selectors = new Map();
        MockStore = MockStore_1 = tslib_1.__decorate([
            core.Injectable(),
            tslib_1.__param(3, core.Inject(store.INITIAL_STATE)),
            tslib_1.__param(4, core.Inject(MOCK_SELECTORS)),
            tslib_1.__metadata("design:paramtypes", [MockState,
                store.ActionsSubject,
                store.ReducerManager, Object, Array])
        ], MockStore);
        return MockStore;
    }(store.Store));

    var MockReducerManager = /** @class */ (function (_super) {
        tslib_1.__extends(MockReducerManager, _super);
        function MockReducerManager() {
            return _super.call(this, function () { return undefined; }) || this;
        }
        MockReducerManager = tslib_1.__decorate([
            core.Injectable(),
            tslib_1.__metadata("design:paramtypes", [])
        ], MockReducerManager);
        return MockReducerManager;
    }(rxjs.BehaviorSubject));

    function provideMockStore(config) {
        if (config === void 0) { config = {}; }
        return [
            store.ActionsSubject,
            MockState,
            { provide: store.INITIAL_STATE, useValue: config.initialState || {} },
            { provide: MOCK_SELECTORS, useValue: config.selectors },
            { provide: store.StateObservable, useClass: MockState },
            { provide: store.ReducerManager, useClass: MockReducerManager },
            { provide: store.Store, useClass: MockStore },
        ];
    }

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ɵngrx_modules_store_testing_testing_a = MOCK_SELECTORS;
    exports.provideMockStore = provideMockStore;
    exports.MockReducerManager = MockReducerManager;
    exports.MockState = MockState;
    exports.MockStore = MockStore;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=store-testing.umd.js.map
