/**
 * @license NgRx 7.0.0-beta.0+15.sha-6dc3465
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActionsSubject, INITIAL_STATE, ReducerManager, Store, StateObservable } from '@ngrx/store';

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
    MockStore = __decorate$1([
        Injectable(),
        __param(3, Inject(INITIAL_STATE)),
        __metadata$1("design:paramtypes", [MockState,
            ActionsSubject,
            ReducerManager, Object])
    ], MockStore);
    return MockStore;
}(Store));

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MockReducerManager = /** @class */ (function (_super) {
    __extends$2(MockReducerManager, _super);
    function MockReducerManager() {
        return _super.call(this, function () { return undefined; }) || this;
    }
    MockReducerManager = __decorate$2([
        Injectable(),
        __metadata$2("design:paramtypes", [])
    ], MockReducerManager);
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
