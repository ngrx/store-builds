import { Injectable, InjectionToken, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { createSelector, ActionsSubject, ReducerManager, INITIAL_STATE, Store, setNgrxMockEnvironment, StateObservable } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';

var __extends = (this && this.__extends) || (function () {
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
/**
 * @template T
 */
var MockState = /** @class */ (function (_super) {
    __extends(MockState, _super);
    function MockState() {
        return _super.call(this, (/** @type {?} */ ({}))) || this;
    }
    MockState.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MockState.ctorParameters = function () { return []; };
    return MockState;
}(BehaviorSubject));

/**
 * @fileoverview added by tsickle
 * Generated from: tokens.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var MOCK_SELECTORS = new InjectionToken('@ngrx/store Mock Selectors');

var __extends$1 = (this && this.__extends) || (function () {
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
if (typeof afterEach === 'function') {
    afterEach((/**
     * @return {?}
     */
    function () {
        try {
            /** @type {?} */
            var mockStore = TestBed.inject(MockStore);
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
var MockStore = /** @class */ (function (_super) {
    __extends$1(MockStore, _super);
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
    /**
     * @param {?} nextState
     * @return {?}
     */
    MockStore.prototype.setState = /**
     * @param {?} nextState
     * @return {?}
     */
    function (nextState) {
        this.state$.next(nextState);
        this.lastState = nextState;
    };
    /**
     * @template Selector, Value, Result
     * @param {?} selector
     * @param {?} value
     * @return {?}
     */
    MockStore.prototype.overrideSelector = /**
     * @template Selector, Value, Result
     * @param {?} selector
     * @param {?} value
     * @return {?}
     */
    function (selector, value) {
        this.selectors.set(selector, value);
        /** @type {?} */
        var resultSelector = typeof selector === 'string'
            ? createSelector((/**
             * @return {?}
             */
            function () { }), (/**
             * @return {?}
             */
            function () { return value; }))
            : selector;
        resultSelector.setResult(value);
        return (/** @type {?} */ (resultSelector));
    };
    /**
     * @return {?}
     */
    MockStore.prototype.resetSelectors = /**
     * @return {?}
     */
    function () {
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
    /**
     * @param {?} selector
     * @param {?=} prop
     * @return {?}
     */
    MockStore.prototype.select = /**
     * @param {?} selector
     * @param {?=} prop
     * @return {?}
     */
    function (selector, prop) {
        if (typeof selector === 'string' && this.selectors.has(selector)) {
            return new BehaviorSubject(this.selectors.get(selector)).asObservable();
        }
        return _super.prototype.select.call(this, selector, prop);
    };
    /**
     * @return {?}
     */
    MockStore.prototype.addReducer = /**
     * @return {?}
     */
    function () {
        /* noop */
    };
    /**
     * @return {?}
     */
    MockStore.prototype.removeReducer = /**
     * @return {?}
     */
    function () {
        /* noop */
    };
    /**
     * Refreshes the existing state.
     */
    /**
     * Refreshes the existing state.
     * @return {?}
     */
    MockStore.prototype.refreshState = /**
     * Refreshes the existing state.
     * @return {?}
     */
    function () {
        if (this.lastState)
            this.setState(__assign({}, this.lastState));
    };
    MockStore.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MockStore.ctorParameters = function () { return [
        { type: MockState },
        { type: ActionsSubject },
        { type: ReducerManager },
        { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] }] },
        { type: Array, decorators: [{ type: Inject, args: [MOCK_SELECTORS,] }] }
    ]; };
    return MockStore;
}(Store));
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

var __extends$2 = (this && this.__extends) || (function () {
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
var MockReducerManager = /** @class */ (function (_super) {
    __extends$2(MockReducerManager, _super);
    function MockReducerManager() {
        return _super.call(this, (/**
         * @return {?}
         */
        function () { return undefined; })) || this;
    }
    /**
     * @param {?} feature
     * @return {?}
     */
    MockReducerManager.prototype.addFeature = /**
     * @param {?} feature
     * @return {?}
     */
    function (feature) {
        /* noop */
    };
    /**
     * @param {?} feature
     * @return {?}
     */
    MockReducerManager.prototype.addFeatures = /**
     * @param {?} feature
     * @return {?}
     */
    function (feature) {
        /* noop */
    };
    MockReducerManager.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MockReducerManager.ctorParameters = function () { return []; };
    return MockReducerManager;
}(BehaviorSubject));

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
function provideMockStore(config) {
    if (config === void 0) { config = {}; }
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
