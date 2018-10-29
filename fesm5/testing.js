/**
 * @license NgRx 6.1.0+83.sha-0e38673
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActionsSubject, INITIAL_STATE, ReducerManager, Store, StateObservable } from '@ngrx/store';

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
        { type: Injectable }
    ];
    /** @nocollapse */
    MockState.ctorParameters = function () { return []; };
    return MockState;
}(BehaviorSubject));

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
        { type: Injectable }
    ];
    /** @nocollapse */
    MockStore.ctorParameters = function () { return [
        { type: MockState },
        { type: ActionsSubject },
        { type: ReducerManager },
        { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] }] }
    ]; };
    return MockStore;
}(Store));

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
        { type: Injectable }
    ];
    /** @nocollapse */
    MockReducerManager.ctorParameters = function () { return []; };
    return MockReducerManager;
}(BehaviorSubject));

function provideMockStore(config) {
    if (config === void 0) { config = {}; }
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
 * Generated bundle index. Do not edit.
 */

export { provideMockStore, MockReducerManager, MockState, MockStore };
//# sourceMappingURL=testing.js.map
