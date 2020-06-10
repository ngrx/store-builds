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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3J4L3N0b3JlL3Rlc3RpbmcvIiwic291cmNlcyI6WyJtb2NrX3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDaEQsT0FBTyxFQUFjLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBRUwsY0FBYyxFQUNkLGFBQWEsRUFDYixjQUFjLEVBQ2QsS0FBSyxFQUNMLGNBQWMsR0FHZixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFMUMsSUFBSSxPQUFPLFNBQVMsS0FBSyxVQUFVLEVBQUU7SUFDbkMsU0FBUzs7O0lBQUM7UUFDUixJQUFJOztnQkFDSSxTQUFTLEdBQTBCLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ2xFLElBQUksU0FBUyxFQUFFO2dCQUNiLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUM1QjtTQUNGO1FBQUMsV0FBTSxHQUFFO0lBQ1osQ0FBQyxFQUFDLENBQUM7Q0FDSjs7OztBQVlEO0lBQzJDLDZCQUFRO0lBTWpELG1CQUNVLE1BQW9CLEVBQzVCLGVBQStCLEVBQy9CLGNBQThCLEVBQ0MsWUFBZSxFQUN0QixhQUFrQzs7UUFBMUQsOEJBQUEsRUFBQSxrQkFBMEQ7UUFMNUQsWUFPRSxrQkFBTSxNQUFNLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxTQU8vQztRQWJTLFlBQU0sR0FBTixNQUFNLENBQWM7UUFHRyxrQkFBWSxHQUFaLFlBQVksQ0FBRztRQVQvQixl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aUNBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUZXN0QmVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgQWN0aW9uLFxuICBBY3Rpb25zU3ViamVjdCxcbiAgSU5JVElBTF9TVEFURSxcbiAgUmVkdWNlck1hbmFnZXIsXG4gIFN0b3JlLFxuICBjcmVhdGVTZWxlY3RvcixcbiAgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wcyxcbiAgTWVtb2l6ZWRTZWxlY3Rvcixcbn0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgTW9ja1N0YXRlIH0gZnJvbSAnLi9tb2NrX3N0YXRlJztcbmltcG9ydCB7IE1vY2tTZWxlY3RvciB9IGZyb20gJy4vbW9ja19zZWxlY3Rvcic7XG5pbXBvcnQgeyBNT0NLX1NFTEVDVE9SUyB9IGZyb20gJy4vdG9rZW5zJztcblxuaWYgKHR5cGVvZiBhZnRlckVhY2ggPT09ICdmdW5jdGlvbicpIHtcbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbW9ja1N0b3JlOiBNb2NrU3RvcmUgfCB1bmRlZmluZWQgPSBUZXN0QmVkLmluamVjdChNb2NrU3RvcmUpO1xuICAgICAgaWYgKG1vY2tTdG9yZSkge1xuICAgICAgICBtb2NrU3RvcmUucmVzZXRTZWxlY3RvcnMoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHt9XG4gIH0pO1xufVxuXG50eXBlIE9ubHlNZW1vaXplZDxULCBSZXN1bHQ+ID0gVCBleHRlbmRzIHN0cmluZyB8IE1lbW9pemVkU2VsZWN0b3I8YW55LCBhbnk+XG4gID8gTWVtb2l6ZWRTZWxlY3RvcjxhbnksIFJlc3VsdD5cbiAgOiBUIGV4dGVuZHMgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgYW55PlxuICA/IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIFJlc3VsdD5cbiAgOiBuZXZlcjtcblxudHlwZSBNZW1vaXplZDxSZXN1bHQ+ID1cbiAgfCBNZW1vaXplZFNlbGVjdG9yPGFueSwgUmVzdWx0PlxuICB8IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIFJlc3VsdD47XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2NrU3RvcmU8VCA9IG9iamVjdD4gZXh0ZW5kcyBTdG9yZTxUPiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc2VsZWN0b3JzID0gbmV3IE1hcDxNZW1vaXplZDxhbnk+IHwgc3RyaW5nLCBhbnk+KCk7XG5cbiAgcmVhZG9ubHkgc2Nhbm5lZEFjdGlvbnMkOiBPYnNlcnZhYmxlPEFjdGlvbj47XG4gIHByaXZhdGUgbGFzdFN0YXRlPzogVDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN0YXRlJDogTW9ja1N0YXRlPFQ+LFxuICAgIGFjdGlvbnNPYnNlcnZlcjogQWN0aW9uc1N1YmplY3QsXG4gICAgcmVkdWNlck1hbmFnZXI6IFJlZHVjZXJNYW5hZ2VyLFxuICAgIEBJbmplY3QoSU5JVElBTF9TVEFURSkgcHJpdmF0ZSBpbml0aWFsU3RhdGU6IFQsXG4gICAgQEluamVjdChNT0NLX1NFTEVDVE9SUykgbW9ja1NlbGVjdG9yczogTW9ja1NlbGVjdG9yW10gPSBbXVxuICApIHtcbiAgICBzdXBlcihzdGF0ZSQsIGFjdGlvbnNPYnNlcnZlciwgcmVkdWNlck1hbmFnZXIpO1xuICAgIHRoaXMucmVzZXRTZWxlY3RvcnMoKTtcbiAgICB0aGlzLnNldFN0YXRlKHRoaXMuaW5pdGlhbFN0YXRlKTtcbiAgICB0aGlzLnNjYW5uZWRBY3Rpb25zJCA9IGFjdGlvbnNPYnNlcnZlci5hc09ic2VydmFibGUoKTtcbiAgICBmb3IgKGNvbnN0IG1vY2tTZWxlY3RvciBvZiBtb2NrU2VsZWN0b3JzKSB7XG4gICAgICB0aGlzLm92ZXJyaWRlU2VsZWN0b3IobW9ja1NlbGVjdG9yLnNlbGVjdG9yLCBtb2NrU2VsZWN0b3IudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldFN0YXRlKG5leHRTdGF0ZTogVCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUkLm5leHQobmV4dFN0YXRlKTtcbiAgICB0aGlzLmxhc3RTdGF0ZSA9IG5leHRTdGF0ZTtcbiAgfVxuXG4gIG92ZXJyaWRlU2VsZWN0b3I8XG4gICAgU2VsZWN0b3IgZXh0ZW5kcyBNZW1vaXplZDxSZXN1bHQ+LFxuICAgIFZhbHVlIGV4dGVuZHMgUmVzdWx0LFxuICAgIFJlc3VsdCA9IFNlbGVjdG9yIGV4dGVuZHMgTWVtb2l6ZWRTZWxlY3RvcjxhbnksIGluZmVyIFQ+XG4gICAgICA/IFRcbiAgICAgIDogU2VsZWN0b3IgZXh0ZW5kcyBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBpbmZlciBVPlxuICAgICAgPyBVXG4gICAgICA6IFZhbHVlXG4gID4oXG4gICAgc2VsZWN0b3I6IFNlbGVjdG9yIHwgc3RyaW5nLFxuICAgIHZhbHVlOiBWYWx1ZVxuICApOiBPbmx5TWVtb2l6ZWQ8dHlwZW9mIHNlbGVjdG9yLCBSZXN1bHQ+IHtcbiAgICB0aGlzLnNlbGVjdG9ycy5zZXQoc2VsZWN0b3IsIHZhbHVlKTtcblxuICAgIGNvbnN0IHJlc3VsdFNlbGVjdG9yOiBNZW1vaXplZDxSZXN1bHQ+ID1cbiAgICAgIHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBjcmVhdGVTZWxlY3RvcihcbiAgICAgICAgICAgICgpID0+IHt9LFxuICAgICAgICAgICAgKCk6IFJlc3VsdCA9PiB2YWx1ZVxuICAgICAgICAgIClcbiAgICAgICAgOiBzZWxlY3RvcjtcblxuICAgIHJlc3VsdFNlbGVjdG9yLnNldFJlc3VsdCh2YWx1ZSk7XG5cbiAgICByZXR1cm4gcmVzdWx0U2VsZWN0b3IgYXMgT25seU1lbW9pemVkPHR5cGVvZiBzZWxlY3RvciwgUmVzdWx0PjtcbiAgfVxuXG4gIHJlc2V0U2VsZWN0b3JzKCkge1xuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgdGhpcy5zZWxlY3RvcnMua2V5cygpKSB7XG4gICAgICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgICAgICBzZWxlY3Rvci5yZWxlYXNlKCk7XG4gICAgICAgIHNlbGVjdG9yLmNsZWFyUmVzdWx0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RvcnMuY2xlYXIoKTtcbiAgfVxuXG4gIHNlbGVjdChzZWxlY3RvcjogYW55LCBwcm9wPzogYW55KSB7XG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycgJiYgdGhpcy5zZWxlY3RvcnMuaGFzKHNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihcbiAgICAgICAgdGhpcy5zZWxlY3RvcnMuZ2V0KHNlbGVjdG9yKVxuICAgICAgKS5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIuc2VsZWN0KHNlbGVjdG9yLCBwcm9wKTtcbiAgfVxuXG4gIGFkZFJlZHVjZXIoKSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgcmVtb3ZlUmVkdWNlcigpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaGVzIHRoZSBleGlzdGluZyBzdGF0ZS5cbiAgICovXG4gIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5sYXN0U3RhdGUpIHRoaXMuc2V0U3RhdGUoeyAuLi50aGlzLmxhc3RTdGF0ZSB9KTtcbiAgfVxufVxuIl19