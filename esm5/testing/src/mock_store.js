import { __assign, __decorate, __extends, __metadata, __param, __values } from "tslib";
import { Inject, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ActionsSubject, INITIAL_STATE, ReducerManager, Store, createSelector, } from '@ngrx/store';
import { MockState } from './mock_state';
import { MOCK_SELECTORS } from './tokens';
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
export { MockStore };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvbW9ja19zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUVMLGNBQWMsRUFDZCxhQUFhLEVBQ2IsY0FBYyxFQUNkLEtBQUssRUFDTCxjQUFjLEdBR2YsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRTFDLElBQUksT0FBTyxTQUFTLEtBQUssVUFBVSxFQUFFO0lBQ25DLFNBQVMsQ0FBQztRQUNSLElBQUk7WUFDRixJQUFNLFNBQVMsR0FBMEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuRSxJQUFJLFNBQVMsRUFBRTtnQkFDYixTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDNUI7U0FDRjtRQUFDLFdBQU0sR0FBRTtJQUNaLENBQUMsQ0FBQyxDQUFDO0NBQ0o7QUFhRDtJQUEyQyw2QkFBUTtJQU1qRCxtQkFDVSxNQUFvQixFQUM1QixlQUErQixFQUMvQixjQUE4QixFQUNDLFlBQWUsRUFDdEIsYUFBa0M7O1FBQWxDLDhCQUFBLEVBQUEsa0JBQWtDO1FBTDVELFlBT0Usa0JBQU0sTUFBTSxFQUFFLGVBQWUsRUFBRSxjQUFjLENBQUMsU0FPL0M7UUFiUyxZQUFNLEdBQU4sTUFBTSxDQUFjO1FBR0csa0JBQVksR0FBWixZQUFZLENBQUc7UUFUL0IsZUFBUyxHQUFHLElBQUksR0FBRyxFQUErQixDQUFDO1FBYWxFLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqQyxLQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7WUFDdEQsS0FBMkIsSUFBQSxrQkFBQSxTQUFBLGFBQWEsQ0FBQSw0Q0FBQSx1RUFBRTtnQkFBckMsSUFBTSxZQUFZLDBCQUFBO2dCQUNyQixLQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbEU7Ozs7Ozs7Ozs7SUFDSCxDQUFDO0lBRUQsNEJBQVEsR0FBUixVQUFTLFNBQVk7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUVELG9DQUFnQixHQUFoQixVQVNFLFFBQTJCLEVBQzNCLEtBQVk7UUFFWixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFcEMsSUFBTSxjQUFjLEdBQ2xCLE9BQU8sUUFBUSxLQUFLLFFBQVE7WUFDMUIsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxjQUFPLENBQUMsRUFBRSxjQUFjLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FBQztZQUMvQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBRWYsY0FBYyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVoQyxPQUFPLGNBQXVELENBQUM7SUFDakUsQ0FBQztJQUVELGtDQUFjLEdBQWQ7OztZQUNFLEtBQXVCLElBQUEsS0FBQSxTQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQXpDLElBQU0sUUFBUSxXQUFBO2dCQUNqQixJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtvQkFDaEMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNuQixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3hCO2FBQ0Y7Ozs7Ozs7OztRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDBCQUFNLEdBQU4sVUFBTyxRQUFhLEVBQUUsSUFBVTtRQUM5QixJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNoRSxPQUFPLElBQUksZUFBZSxDQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FDN0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNsQjtRQUVELE9BQU8saUJBQU0sTUFBTSxZQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsOEJBQVUsR0FBVjtRQUNFLFVBQVU7SUFDWixDQUFDO0lBRUQsaUNBQWEsR0FBYjtRQUNFLFVBQVU7SUFDWixDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQ0FBWSxHQUFaO1FBQ0UsSUFBSSxJQUFJLENBQUMsU0FBUztZQUFFLElBQUksQ0FBQyxRQUFRLGNBQU0sSUFBSSxDQUFDLFNBQVMsRUFBRyxDQUFDO0lBQzNELENBQUM7SUFyRlUsU0FBUztRQURyQixVQUFVLEVBQUU7UUFXUixXQUFBLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUNyQixXQUFBLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTt5Q0FKUCxTQUFTO1lBQ1IsY0FBYztZQUNmLGNBQWM7T0FUckIsU0FBUyxDQXNGckI7SUFBRCxnQkFBQztDQUFBLEFBdEZELENBQTJDLEtBQUssR0FzRi9DO1NBdEZZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRlc3RCZWQgfSBmcm9tICdAYW5ndWxhci9jb3JlL3Rlc3RpbmcnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBBY3Rpb24sXG4gIEFjdGlvbnNTdWJqZWN0LFxuICBJTklUSUFMX1NUQVRFLFxuICBSZWR1Y2VyTWFuYWdlcixcbiAgU3RvcmUsXG4gIGNyZWF0ZVNlbGVjdG9yLFxuICBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzLFxuICBNZW1vaXplZFNlbGVjdG9yLFxufSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBNb2NrU3RhdGUgfSBmcm9tICcuL21vY2tfc3RhdGUnO1xuaW1wb3J0IHsgTW9ja1NlbGVjdG9yIH0gZnJvbSAnLi9tb2NrX3NlbGVjdG9yJztcbmltcG9ydCB7IE1PQ0tfU0VMRUNUT1JTIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5pZiAodHlwZW9mIGFmdGVyRWFjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtb2NrU3RvcmU6IE1vY2tTdG9yZSB8IHVuZGVmaW5lZCA9IFRlc3RCZWQuaW5qZWN0KE1vY2tTdG9yZSk7XG4gICAgICBpZiAobW9ja1N0b3JlKSB7XG4gICAgICAgIG1vY2tTdG9yZS5yZXNldFNlbGVjdG9ycygpO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge31cbiAgfSk7XG59XG5cbnR5cGUgT25seU1lbW9pemVkPFQsIFJlc3VsdD4gPSBUIGV4dGVuZHMgc3RyaW5nIHwgTWVtb2l6ZWRTZWxlY3RvcjxhbnksIGFueT5cbiAgPyBNZW1vaXplZFNlbGVjdG9yPGFueSwgUmVzdWx0PlxuICA6IFQgZXh0ZW5kcyBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBhbnk+XG4gICAgPyBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBSZXN1bHQ+XG4gICAgOiBuZXZlcjtcblxudHlwZSBNZW1vaXplZDxSZXN1bHQ+ID1cbiAgfCBNZW1vaXplZFNlbGVjdG9yPGFueSwgUmVzdWx0PlxuICB8IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIFJlc3VsdD47XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2NrU3RvcmU8VCA9IG9iamVjdD4gZXh0ZW5kcyBTdG9yZTxUPiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc2VsZWN0b3JzID0gbmV3IE1hcDxNZW1vaXplZDxhbnk+IHwgc3RyaW5nLCBhbnk+KCk7XG5cbiAgcmVhZG9ubHkgc2Nhbm5lZEFjdGlvbnMkOiBPYnNlcnZhYmxlPEFjdGlvbj47XG4gIHByaXZhdGUgbGFzdFN0YXRlPzogVDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN0YXRlJDogTW9ja1N0YXRlPFQ+LFxuICAgIGFjdGlvbnNPYnNlcnZlcjogQWN0aW9uc1N1YmplY3QsXG4gICAgcmVkdWNlck1hbmFnZXI6IFJlZHVjZXJNYW5hZ2VyLFxuICAgIEBJbmplY3QoSU5JVElBTF9TVEFURSkgcHJpdmF0ZSBpbml0aWFsU3RhdGU6IFQsXG4gICAgQEluamVjdChNT0NLX1NFTEVDVE9SUykgbW9ja1NlbGVjdG9yczogTW9ja1NlbGVjdG9yW10gPSBbXVxuICApIHtcbiAgICBzdXBlcihzdGF0ZSQsIGFjdGlvbnNPYnNlcnZlciwgcmVkdWNlck1hbmFnZXIpO1xuICAgIHRoaXMucmVzZXRTZWxlY3RvcnMoKTtcbiAgICB0aGlzLnNldFN0YXRlKHRoaXMuaW5pdGlhbFN0YXRlKTtcbiAgICB0aGlzLnNjYW5uZWRBY3Rpb25zJCA9IGFjdGlvbnNPYnNlcnZlci5hc09ic2VydmFibGUoKTtcbiAgICBmb3IgKGNvbnN0IG1vY2tTZWxlY3RvciBvZiBtb2NrU2VsZWN0b3JzKSB7XG4gICAgICB0aGlzLm92ZXJyaWRlU2VsZWN0b3IobW9ja1NlbGVjdG9yLnNlbGVjdG9yLCBtb2NrU2VsZWN0b3IudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldFN0YXRlKG5leHRTdGF0ZTogVCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUkLm5leHQobmV4dFN0YXRlKTtcbiAgICB0aGlzLmxhc3RTdGF0ZSA9IG5leHRTdGF0ZTtcbiAgfVxuXG4gIG92ZXJyaWRlU2VsZWN0b3I8XG4gICAgU2VsZWN0b3IgZXh0ZW5kcyBNZW1vaXplZDxSZXN1bHQ+LFxuICAgIFZhbHVlIGV4dGVuZHMgUmVzdWx0LFxuICAgIFJlc3VsdCA9IFNlbGVjdG9yIGV4dGVuZHMgTWVtb2l6ZWRTZWxlY3RvcjxhbnksIGluZmVyIFQ+XG4gICAgICA/IFRcbiAgICAgIDogU2VsZWN0b3IgZXh0ZW5kcyBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBpbmZlciBVPlxuICAgICAgICA/IFVcbiAgICAgICAgOiBWYWx1ZVxuICA+KFxuICAgIHNlbGVjdG9yOiBTZWxlY3RvciB8IHN0cmluZyxcbiAgICB2YWx1ZTogVmFsdWVcbiAgKTogT25seU1lbW9pemVkPHR5cGVvZiBzZWxlY3RvciwgUmVzdWx0PiB7XG4gICAgdGhpcy5zZWxlY3RvcnMuc2V0KHNlbGVjdG9yLCB2YWx1ZSk7XG5cbiAgICBjb25zdCByZXN1bHRTZWxlY3RvcjogTWVtb2l6ZWQ8UmVzdWx0PiA9XG4gICAgICB0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnXG4gICAgICAgID8gY3JlYXRlU2VsZWN0b3IoKCkgPT4ge30sICgpOiBSZXN1bHQgPT4gdmFsdWUpXG4gICAgICAgIDogc2VsZWN0b3I7XG5cbiAgICByZXN1bHRTZWxlY3Rvci5zZXRSZXN1bHQodmFsdWUpO1xuXG4gICAgcmV0dXJuIHJlc3VsdFNlbGVjdG9yIGFzIE9ubHlNZW1vaXplZDx0eXBlb2Ygc2VsZWN0b3IsIFJlc3VsdD47XG4gIH1cblxuICByZXNldFNlbGVjdG9ycygpIHtcbiAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHRoaXMuc2VsZWN0b3JzLmtleXMoKSkge1xuICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgc2VsZWN0b3IucmVsZWFzZSgpO1xuICAgICAgICBzZWxlY3Rvci5jbGVhclJlc3VsdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0b3JzLmNsZWFyKCk7XG4gIH1cblxuICBzZWxlY3Qoc2VsZWN0b3I6IGFueSwgcHJvcD86IGFueSkge1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnICYmIHRoaXMuc2VsZWN0b3JzLmhhcyhzZWxlY3RvcikpIHtcbiAgICAgIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4oXG4gICAgICAgIHRoaXMuc2VsZWN0b3JzLmdldChzZWxlY3RvcilcbiAgICAgICkuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLnNlbGVjdChzZWxlY3RvciwgcHJvcCk7XG4gIH1cblxuICBhZGRSZWR1Y2VyKCkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxuXG4gIHJlbW92ZVJlZHVjZXIoKSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZnJlc2hlcyB0aGUgZXhpc3Rpbmcgc3RhdGUuXG4gICAqL1xuICByZWZyZXNoU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMubGFzdFN0YXRlKSB0aGlzLnNldFN0YXRlKHsgLi4udGhpcy5sYXN0U3RhdGUgfSk7XG4gIH1cbn1cbiJdfQ==