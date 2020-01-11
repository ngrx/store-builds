import { __assign, __decorate, __extends, __metadata, __param } from "tslib";
import { Inject, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ActionsSubject, INITIAL_STATE, ReducerManager, Store, createSelector, } from '@ngrx/store';
import { MockState } from './mock_state';
import { MOCK_SELECTORS } from './tokens';
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
                selector.clearResult();
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
        if (this.lastState)
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
export { MockStore };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvbW9ja19zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUVMLGNBQWMsRUFDZCxhQUFhLEVBQ2IsY0FBYyxFQUNkLEtBQUssRUFDTCxjQUFjLEdBR2YsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRTFDLElBQUksT0FBTyxTQUFTLEtBQUssVUFBVSxFQUFFO0lBQ25DLFNBQVMsQ0FBQztRQUNSLElBQUk7WUFDRixJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBbUIsQ0FBQztZQUNuRCxJQUFJLEtBQUssSUFBSSxnQkFBZ0IsSUFBSSxLQUFLLEVBQUU7Z0JBQ3RDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN4QjtTQUNGO1FBQUMsV0FBTSxHQUFFO0lBQ1osQ0FBQyxDQUFDLENBQUM7Q0FDSjtBQUdEO0lBQWtDLDZCQUFRO0lBV3hDLG1CQUNVLE1BQW9CLEVBQzVCLGVBQStCLEVBQy9CLGNBQThCLEVBQ0MsWUFBZSxFQUN0QixhQUE4QjtRQUx4RCxZQU9FLGtCQUFNLE1BQU0sRUFBRSxlQUFlLEVBQUUsY0FBYyxDQUFDLFNBYy9DO1FBcEJTLFlBQU0sR0FBTixNQUFNLENBQWM7UUFHRyxrQkFBWSxHQUFaLFlBQVksQ0FBRztRQUk5QyxLQUFJ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QUFDO0NBQUEsQUExR0QsQ0FBa0MsS0FBSyxHQTBHdEM7U0ExR1ksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGVzdEJlZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvdGVzdGluZyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIEFjdGlvbixcbiAgQWN0aW9uc1N1YmplY3QsXG4gIElOSVRJQUxfU1RBVEUsXG4gIFJlZHVjZXJNYW5hZ2VyLFxuICBTdG9yZSxcbiAgY3JlYXRlU2VsZWN0b3IsXG4gIE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHMsXG4gIE1lbW9pemVkU2VsZWN0b3IsXG59IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IE1vY2tTdGF0ZSB9IGZyb20gJy4vbW9ja19zdGF0ZSc7XG5pbXBvcnQgeyBNb2NrU2VsZWN0b3IgfSBmcm9tICcuL21vY2tfc2VsZWN0b3InO1xuaW1wb3J0IHsgTU9DS19TRUxFQ1RPUlMgfSBmcm9tICcuL3Rva2Vucyc7XG5cbmlmICh0eXBlb2YgYWZ0ZXJFYWNoID09PSAnZnVuY3Rpb24nKSB7XG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN0b3JlID0gVGVzdEJlZC5nZXQoU3RvcmUpIGFzIE1vY2tTdG9yZTxhbnk+O1xuICAgICAgaWYgKHN0b3JlICYmICdyZXNldFNlbGVjdG9ycycgaW4gc3RvcmUpIHtcbiAgICAgICAgc3RvcmUucmVzZXRTZWxlY3RvcnMoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHt9XG4gIH0pO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja1N0b3JlPFQ+IGV4dGVuZHMgU3RvcmU8VD4ge1xuICBzdGF0aWMgc2VsZWN0b3JzID0gbmV3IE1hcDxcbiAgICB8IHN0cmluZ1xuICAgIHwgTWVtb2l6ZWRTZWxlY3RvcjxhbnksIGFueT5cbiAgICB8IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIGFueT4sXG4gICAgYW55XG4gID4oKTtcblxuICBzY2FubmVkQWN0aW9ucyQ6IE9ic2VydmFibGU8QWN0aW9uPjtcbiAgcHJpdmF0ZSBsYXN0U3RhdGU/OiBUO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc3RhdGUkOiBNb2NrU3RhdGU8VD4sXG4gICAgYWN0aW9uc09ic2VydmVyOiBBY3Rpb25zU3ViamVjdCxcbiAgICByZWR1Y2VyTWFuYWdlcjogUmVkdWNlck1hbmFnZXIsXG4gICAgQEluamVjdChJTklUSUFMX1NUQVRFKSBwcml2YXRlIGluaXRpYWxTdGF0ZTogVCxcbiAgICBASW5qZWN0KE1PQ0tfU0VMRUNUT1JTKSBtb2NrU2VsZWN0b3JzPzogTW9ja1NlbGVjdG9yW11cbiAgKSB7XG4gICAgc3VwZXIoc3RhdGUkLCBhY3Rpb25zT2JzZXJ2ZXIsIHJlZHVjZXJNYW5hZ2VyKTtcbiAgICB0aGlzLnJlc2V0U2VsZWN0b3JzKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh0aGlzLmluaXRpYWxTdGF0ZSk7XG4gICAgdGhpcy5zY2FubmVkQWN0aW9ucyQgPSBhY3Rpb25zT2JzZXJ2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gICAgaWYgKG1vY2tTZWxlY3RvcnMpIHtcbiAgICAgIG1vY2tTZWxlY3RvcnMuZm9yRWFjaChtb2NrU2VsZWN0b3IgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IG1vY2tTZWxlY3Rvci5zZWxlY3RvcjtcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLm92ZXJyaWRlU2VsZWN0b3Ioc2VsZWN0b3IsIG1vY2tTZWxlY3Rvci52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vdmVycmlkZVNlbGVjdG9yKHNlbGVjdG9yLCBtb2NrU2VsZWN0b3IudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzZXRTdGF0ZShuZXh0U3RhdGU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlJC5uZXh0KG5leHRTdGF0ZSk7XG4gICAgdGhpcy5sYXN0U3RhdGUgPSBuZXh0U3RhdGU7XG4gIH1cblxuICBvdmVycmlkZVNlbGVjdG9yPFQsIFJlc3VsdD4oXG4gICAgc2VsZWN0b3I6IHN0cmluZyxcbiAgICB2YWx1ZTogUmVzdWx0XG4gICk6IE1lbW9pemVkU2VsZWN0b3I8c3RyaW5nLCBSZXN1bHQ+O1xuICBvdmVycmlkZVNlbGVjdG9yPFQsIFJlc3VsdD4oXG4gICAgc2VsZWN0b3I6IE1lbW9pemVkU2VsZWN0b3I8VCwgUmVzdWx0PixcbiAgICB2YWx1ZTogUmVzdWx0XG4gICk6IE1lbW9pemVkU2VsZWN0b3I8VCwgUmVzdWx0PjtcbiAgb3ZlcnJpZGVTZWxlY3RvcjxULCBSZXN1bHQ+KFxuICAgIHNlbGVjdG9yOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFQsIGFueSwgUmVzdWx0PixcbiAgICB2YWx1ZTogUmVzdWx0XG4gICk6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8VCwgYW55LCBSZXN1bHQ+O1xuICBvdmVycmlkZVNlbGVjdG9yPFQsIFJlc3VsdD4oXG4gICAgc2VsZWN0b3I6XG4gICAgICB8IHN0cmluZ1xuICAgICAgfCBNZW1vaXplZFNlbGVjdG9yPGFueSwgYW55PlxuICAgICAgfCBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBhbnk+LFxuICAgIHZhbHVlOiBhbnlcbiAgKSB7XG4gICAgTW9ja1N0b3JlLnNlbGVjdG9ycy5zZXQoc2VsZWN0b3IsIHZhbHVlKTtcblxuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBzdHJpbmdTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKCgpID0+IHt9LCAoKSA9PiB2YWx1ZSk7XG5cbiAgICAgIHJldHVybiBzdHJpbmdTZWxlY3RvcjtcbiAgICB9XG5cbiAgICBzZWxlY3Rvci5zZXRSZXN1bHQodmFsdWUpO1xuXG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9XG5cbiAgcmVzZXRTZWxlY3RvcnMoKSB7XG4gICAgTW9ja1N0b3JlLnNlbGVjdG9ycy5mb3JFYWNoKChfLCBzZWxlY3RvcikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgc2VsZWN0b3IucmVsZWFzZSgpO1xuICAgICAgICBzZWxlY3Rvci5jbGVhclJlc3VsdCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTW9ja1N0b3JlLnNlbGVjdG9ycy5jbGVhcigpO1xuICB9XG5cbiAgc2VsZWN0KHNlbGVjdG9yOiBhbnksIHByb3A/OiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJyAmJiBNb2NrU3RvcmUuc2VsZWN0b3JzLmhhcyhzZWxlY3RvcikpIHtcbiAgICAgIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4oXG4gICAgICAgIE1vY2tTdG9yZS5zZWxlY3RvcnMuZ2V0KHNlbGVjdG9yKVxuICAgICAgKS5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIuc2VsZWN0KHNlbGVjdG9yLCBwcm9wKTtcbiAgfVxuXG4gIGFkZFJlZHVjZXIoKSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgcmVtb3ZlUmVkdWNlcigpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaGVzIHRoZSBleGlzdGluZyBzdGF0ZS5cbiAgICovXG4gIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5sYXN0U3RhdGUpIHRoaXMuc2V0U3RhdGUoeyAuLi50aGlzLmxhc3RTdGF0ZSB9KTtcbiAgfVxufVxuIl19