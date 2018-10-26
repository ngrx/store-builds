/**
 * @license NgRx 6.1.0+78.sha-5de5d7a
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@ngrx/store')) :
    typeof define === 'function' && define.amd ? define('@ngrx/store/testing', ['exports', '@angular/core', 'rxjs', '@ngrx/store'], factory) :
    (factory((global.ngrx = global.ngrx || {}, global.ngrx.store = global.ngrx.store || {}, global.ngrx.store.testing = {}),global.ng.core,global.rxjs,global['@ngrx/store']));
}(this, (function (exports,core,rxjs,store) { 'use strict';

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var MockState = /** @class */ (function (_super) {
        __extends(MockState, _super);
        function MockState() {
            return _super.call(this, {}) || this;
        }
        MockState.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        MockState.ctorParameters = function () { return []; };
        return MockState;
    }(rxjs.BehaviorSubject));

    var __extends$1 = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var MockStore = /** @class */ (function (_super) {
        __extends$1(MockStore, _super);
        function MockStore(state$, actionsObserver, reducerManager, initialState) {
            var _this = _super.call(this, state$, actionsObserver, reducerManager) || this;
            _this.state$ = state$;
            _this.initialState = initialState;
            _this.state$.next(_this.initialState);
            _this.scannedActions$ = actionsObserver.asObservable();
            return _this;
        }
        MockStore.prototype.setState = function (nextState) {
            this.state$.next(nextState);
        };
        MockStore.prototype.addReducer = function () {
            /* noop */
        };
        MockStore.prototype.removeReducer = function () {
            /* noop */
        };
        MockStore.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        MockStore.ctorParameters = function () { return [
            { type: MockState },
            { type: store.ActionsSubject },
            { type: store.ReducerManager },
            { type: undefined, decorators: [{ type: core.Inject, args: [store.INITIAL_STATE,] }] }
        ]; };
        return MockStore;
    }(store.Store));

    var __extends$2 = (undefined && undefined.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var MockReducerManager = /** @class */ (function (_super) {
        __extends$2(MockReducerManager, _super);
        function MockReducerManager() {
            return _super.call(this, function () { return undefined; }) || this;
        }
        MockReducerManager.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        MockReducerManager.ctorParameters = function () { return []; };
        return MockReducerManager;
    }(rxjs.BehaviorSubject));

    function provideMockStore(config) {
        if (config === void 0) { config = {}; }
        return [
            store.ActionsSubject,
            MockState,
            { provide: store.INITIAL_STATE, useValue: config.initialState },
            { provide: store.StateObservable, useClass: MockState },
            { provide: store.ReducerManager, useClass: MockReducerManager },
            { provide: store.Store, useClass: MockStore },
        ];
    }

    /**
     * Generated bundle index. Do not edit.
     */

    exports.provideMockStore = provideMockStore;
    exports.MockReducerManager = MockReducerManager;
    exports.MockState = MockState;
    exports.MockStore = MockStore;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=store-testing.umd.js.map
