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
/**
 * @fileoverview added by tsickle
 * Generated from: mock_store.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ActionsSubject, INITIAL_STATE, ReducerManager, Store, createSelector, } from '@ngrx/store';
import { MockState } from './mock_state';
import { MOCK_SELECTORS } from './tokens';
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
export { MockStore };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3J4L3N0b3JlL3Rlc3RpbmcvIiwic291cmNlcyI6WyJtb2NrX3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDaEQsT0FBTyxFQUFjLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBRUwsY0FBYyxFQUNkLGFBQWEsRUFDYixjQUFjLEVBQ2QsS0FBSyxFQUNMLGNBQWMsR0FHZixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFMUMsSUFBSSxPQUFPLFNBQVMsS0FBSyxVQUFVLEVBQUU7SUFDbkMsU0FBUzs7O0lBQUM7UUFDUixJQUFJOztnQkFDSSxTQUFTLEdBQTBCLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ2xFLElBQUksU0FBUyxFQUFFO2dCQUNiLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUM1QjtTQUNGO1FBQUMsV0FBTSxHQUFFO0lBQ1osQ0FBQyxFQUFDLENBQUM7Q0FDSjs7OztBQVlEO0lBQzJDLDZCQUFRO0lBTWpELG1CQUNVLE1BQW9CLEVBQzVCLGVBQStCLEVBQy9CLGNBQThCLEVBQ0MsWUFBZSxFQUN0QixhQUFrQzs7UUFBMUQsOEJBQUEsRUFBQSxrQkFBMEQ7UUFMNUQsWUFPRSxrQkFBTSxNQUFNLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxTQU8vQztRQWJTLFlBQU0sR0FBTixNQUFNLENBQWM7UUFHRyxrQkFBWSxHQUFaLFlBQVksQ0FBRztRQVQvQixl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aUNBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUZXN0QmVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgQWN0aW9uLFxuICBBY3Rpb25zU3ViamVjdCxcbiAgSU5JVElBTF9TVEFURSxcbiAgUmVkdWNlck1hbmFnZXIsXG4gIFN0b3JlLFxuICBjcmVhdGVTZWxlY3RvcixcbiAgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wcyxcbiAgTWVtb2l6ZWRTZWxlY3Rvcixcbn0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgTW9ja1N0YXRlIH0gZnJvbSAnLi9tb2NrX3N0YXRlJztcbmltcG9ydCB7IE1vY2tTZWxlY3RvciB9IGZyb20gJy4vbW9ja19zZWxlY3Rvcic7XG5pbXBvcnQgeyBNT0NLX1NFTEVDVE9SUyB9IGZyb20gJy4vdG9rZW5zJztcblxuaWYgKHR5cGVvZiBhZnRlckVhY2ggPT09ICdmdW5jdGlvbicpIHtcbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbW9ja1N0b3JlOiBNb2NrU3RvcmUgfCB1bmRlZmluZWQgPSBUZXN0QmVkLmluamVjdChNb2NrU3RvcmUpO1xuICAgICAgaWYgKG1vY2tTdG9yZSkge1xuICAgICAgICBtb2NrU3RvcmUucmVzZXRTZWxlY3RvcnMoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHt9XG4gIH0pO1xufVxuXG50eXBlIE9ubHlNZW1vaXplZDxULCBSZXN1bHQ+ID0gVCBleHRlbmRzIHN0cmluZyB8IE1lbW9pemVkU2VsZWN0b3I8YW55LCBhbnk+XG4gID8gTWVtb2l6ZWRTZWxlY3RvcjxhbnksIFJlc3VsdD5cbiAgOiBUIGV4dGVuZHMgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgYW55PlxuICAgID8gTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgUmVzdWx0PlxuICAgIDogbmV2ZXI7XG5cbnR5cGUgTWVtb2l6ZWQ8UmVzdWx0PiA9XG4gIHwgTWVtb2l6ZWRTZWxlY3RvcjxhbnksIFJlc3VsdD5cbiAgfCBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBSZXN1bHQ+O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja1N0b3JlPFQgPSBvYmplY3Q+IGV4dGVuZHMgU3RvcmU8VD4ge1xuICBwcml2YXRlIHJlYWRvbmx5IHNlbGVjdG9ycyA9IG5ldyBNYXA8TWVtb2l6ZWQ8YW55PiB8IHN0cmluZywgYW55PigpO1xuXG4gIHJlYWRvbmx5IHNjYW5uZWRBY3Rpb25zJDogT2JzZXJ2YWJsZTxBY3Rpb24+O1xuICBwcml2YXRlIGxhc3RTdGF0ZT86IFQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzdGF0ZSQ6IE1vY2tTdGF0ZTxUPixcbiAgICBhY3Rpb25zT2JzZXJ2ZXI6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHJlZHVjZXJNYW5hZ2VyOiBSZWR1Y2VyTWFuYWdlcixcbiAgICBASW5qZWN0KElOSVRJQUxfU1RBVEUpIHByaXZhdGUgaW5pdGlhbFN0YXRlOiBULFxuICAgIEBJbmplY3QoTU9DS19TRUxFQ1RPUlMpIG1vY2tTZWxlY3RvcnM6IE1vY2tTZWxlY3RvcltdID0gW11cbiAgKSB7XG4gICAgc3VwZXIoc3RhdGUkLCBhY3Rpb25zT2JzZXJ2ZXIsIHJlZHVjZXJNYW5hZ2VyKTtcbiAgICB0aGlzLnJlc2V0U2VsZWN0b3JzKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh0aGlzLmluaXRpYWxTdGF0ZSk7XG4gICAgdGhpcy5zY2FubmVkQWN0aW9ucyQgPSBhY3Rpb25zT2JzZXJ2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gICAgZm9yIChjb25zdCBtb2NrU2VsZWN0b3Igb2YgbW9ja1NlbGVjdG9ycykge1xuICAgICAgdGhpcy5vdmVycmlkZVNlbGVjdG9yKG1vY2tTZWxlY3Rvci5zZWxlY3RvciwgbW9ja1NlbGVjdG9yLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBzZXRTdGF0ZShuZXh0U3RhdGU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlJC5uZXh0KG5leHRTdGF0ZSk7XG4gICAgdGhpcy5sYXN0U3RhdGUgPSBuZXh0U3RhdGU7XG4gIH1cblxuICBvdmVycmlkZVNlbGVjdG9yPFxuICAgIFNlbGVjdG9yIGV4dGVuZHMgTWVtb2l6ZWQ8UmVzdWx0PixcbiAgICBWYWx1ZSBleHRlbmRzIFJlc3VsdCxcbiAgICBSZXN1bHQgPSBTZWxlY3RvciBleHRlbmRzIE1lbW9pemVkU2VsZWN0b3I8YW55LCBpbmZlciBUPlxuICAgICAgPyBUXG4gICAgICA6IFNlbGVjdG9yIGV4dGVuZHMgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgaW5mZXIgVT5cbiAgICAgICAgPyBVXG4gICAgICAgIDogVmFsdWVcbiAgPihcbiAgICBzZWxlY3RvcjogU2VsZWN0b3IgfCBzdHJpbmcsXG4gICAgdmFsdWU6IFZhbHVlXG4gICk6IE9ubHlNZW1vaXplZDx0eXBlb2Ygc2VsZWN0b3IsIFJlc3VsdD4ge1xuICAgIHRoaXMuc2VsZWN0b3JzLnNldChzZWxlY3RvciwgdmFsdWUpO1xuXG4gICAgY29uc3QgcmVzdWx0U2VsZWN0b3I6IE1lbW9pemVkPFJlc3VsdD4gPVxuICAgICAgdHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJ1xuICAgICAgICA/IGNyZWF0ZVNlbGVjdG9yKCgpID0+IHt9LCAoKTogUmVzdWx0ID0+IHZhbHVlKVxuICAgICAgICA6IHNlbGVjdG9yO1xuXG4gICAgcmVzdWx0U2VsZWN0b3Iuc2V0UmVzdWx0KHZhbHVlKTtcblxuICAgIHJldHVybiByZXN1bHRTZWxlY3RvciBhcyBPbmx5TWVtb2l6ZWQ8dHlwZW9mIHNlbGVjdG9yLCBSZXN1bHQ+O1xuICB9XG5cbiAgcmVzZXRTZWxlY3RvcnMoKSB7XG4gICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiB0aGlzLnNlbGVjdG9ycy5rZXlzKCkpIHtcbiAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHNlbGVjdG9yLnJlbGVhc2UoKTtcbiAgICAgICAgc2VsZWN0b3IuY2xlYXJSZXN1bHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdG9ycy5jbGVhcigpO1xuICB9XG5cbiAgc2VsZWN0KHNlbGVjdG9yOiBhbnksIHByb3A/OiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJyAmJiB0aGlzLnNlbGVjdG9ycy5oYXMoc2VsZWN0b3IpKSB7XG4gICAgICByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KFxuICAgICAgICB0aGlzLnNlbGVjdG9ycy5nZXQoc2VsZWN0b3IpXG4gICAgICApLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBzdXBlci5zZWxlY3Qoc2VsZWN0b3IsIHByb3ApO1xuICB9XG5cbiAgYWRkUmVkdWNlcigpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICByZW1vdmVSZWR1Y2VyKCkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZyZXNoZXMgdGhlIGV4aXN0aW5nIHN0YXRlLlxuICAgKi9cbiAgcmVmcmVzaFN0YXRlKCkge1xuICAgIGlmICh0aGlzLmxhc3RTdGF0ZSkgdGhpcy5zZXRTdGF0ZSh7IC4uLnRoaXMubGFzdFN0YXRlIH0pO1xuICB9XG59XG4iXX0=