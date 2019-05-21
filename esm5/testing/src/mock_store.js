import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActionsSubject, INITIAL_STATE, ReducerManager, Store, createSelector, } from '@ngrx/store';
import { MockState } from './mock_state';
import { MOCK_SELECTORS } from './tokens';
var MockStore = /** @class */ (function (_super) {
    tslib_1.__extends(MockStore, _super);
    function MockStore(state$, actionsObserver, reducerManager, initialState, mockSelectors) {
        var _this = _super.call(this, state$, actionsObserver, reducerManager) || this;
        _this.state$ = state$;
        _this.initialState = initialState;
        _this.resetSelectors();
        _this.state$.next(_this.initialState);
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
                selector.setResult();
            }
        });
        MockStore_1.selectors.clear();
    };
    MockStore.prototype.select = function (selector, prop) {
        if (MockStore_1.selectors.has(selector)) {
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
    var MockStore_1;
    MockStore.selectors = new Map();
    MockStore = MockStore_1 = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(3, Inject(INITIAL_STATE)),
        tslib_1.__param(4, Inject(MOCK_SELECTORS)),
        tslib_1.__metadata("design:paramtypes", [MockState,
            ActionsSubject,
            ReducerManager, Object, Array])
    ], MockStore);
    return MockStore;
}(Store));
export { MockStore };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvbW9ja19zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFjLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBRUwsY0FBYyxFQUNkLGFBQWEsRUFDYixjQUFjLEVBQ2QsS0FBSyxFQUNMLGNBQWMsR0FHZixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFHMUM7SUFBa0MscUNBQVE7SUFVeEMsbUJBQ1UsTUFBb0IsRUFDNUIsZUFBK0IsRUFDL0IsY0FBOEIsRUFDQyxZQUFlLEVBQ3RCLGFBQThCO1FBTHhELFlBT0Usa0JBQU0sTUFBTSxFQUFFLGVBQWUsRUFBRSxjQUFjLENBQUMsU0FjL0M7UUFwQlMsWUFBTSxHQUFOLE1BQU0sQ0FBYztRQUdHLGtCQUFZLEdBQVosWUFBWSxDQUFHO1FBSTlDLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEMsS0FBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEQsSUFBSSxhQUFhLEVBQUU7WUFDakIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFlBQVk7Z0JBQ2hDLElBQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7Z0JBQ3ZDLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO29CQUNoQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDckQ7cUJBQU07b0JBQ0wsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3JEO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjs7SUFDSCxDQUFDO2tCQS9CVSxTQUFTO0lBaUNwQiw0QkFBUSxHQUFSLFVBQVMsU0FBWTtRQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBY0Qsb0NBQWdCLEdBQWhCLFVBQ0UsUUFHNEMsRUFDNUMsS0FBVTtRQUVWLFdBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV6QyxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxJQUFNLGNBQWMsR0FBRyxjQUFjLENBQUMsY0FBTyxDQUFDLEVBQUUsY0FBTSxPQUFBLEtBQUssRUFBTCxDQUFLLENBQUMsQ0FBQztZQUU3RCxPQUFPLGNBQWMsQ0FBQztTQUN2QjtRQUVELFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFMUIsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVELGtDQUFjLEdBQWQ7UUFDRSxXQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBRSxRQUFRO1lBQ3RDLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO2dCQUNoQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25CLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUN0QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsV0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsMEJBQU0sR0FBTixVQUFPLFFBQWEsRUFBRSxJQUFVO1FBQzlCLElBQUksV0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDckMsT0FBTyxJQUFJLGVBQWUsQ0FDeEIsV0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQ2xDLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDbEI7UUFFRCxPQUFPLGlCQUFNLE1BQU0sWUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELDhCQUFVLEdBQVY7UUFDRSxVQUFVO0lBQ1osQ0FBQztJQUVELGlDQUFhLEdBQWI7UUFDRSxVQUFVO0lBQ1osQ0FBQzs7SUEvRk0sbUJBQVMsR0FBRyxJQUFJLEdBQUcsRUFLdkIsQ0FBQztJQU5PLFNBQVM7UUFEckIsVUFBVSxFQUFFO1FBZVIsbUJBQUEsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3JCLG1CQUFBLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTtpREFKUCxTQUFTO1lBQ1IsY0FBYztZQUNmLGNBQWM7T0FickIsU0FBUyxDQWlHckI7SUFBRCxnQkFBQztDQUFBLEFBakdELENBQWtDLEtBQUssR0FpR3RDO1NBakdZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgQWN0aW9uLFxuICBBY3Rpb25zU3ViamVjdCxcbiAgSU5JVElBTF9TVEFURSxcbiAgUmVkdWNlck1hbmFnZXIsXG4gIFN0b3JlLFxuICBjcmVhdGVTZWxlY3RvcixcbiAgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wcyxcbiAgTWVtb2l6ZWRTZWxlY3Rvcixcbn0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgTW9ja1N0YXRlIH0gZnJvbSAnLi9tb2NrX3N0YXRlJztcbmltcG9ydCB7IE1vY2tTZWxlY3RvciB9IGZyb20gJy4vbW9ja19zZWxlY3Rvcic7XG5pbXBvcnQgeyBNT0NLX1NFTEVDVE9SUyB9IGZyb20gJy4vdG9rZW5zJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vY2tTdG9yZTxUPiBleHRlbmRzIFN0b3JlPFQ+IHtcbiAgc3RhdGljIHNlbGVjdG9ycyA9IG5ldyBNYXA8XG4gICAgfCBzdHJpbmdcbiAgICB8IE1lbW9pemVkU2VsZWN0b3I8YW55LCBhbnk+XG4gICAgfCBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBhbnk+LFxuICAgIGFueVxuICA+KCk7XG5cbiAgcHVibGljIHNjYW5uZWRBY3Rpb25zJDogT2JzZXJ2YWJsZTxBY3Rpb24+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc3RhdGUkOiBNb2NrU3RhdGU8VD4sXG4gICAgYWN0aW9uc09ic2VydmVyOiBBY3Rpb25zU3ViamVjdCxcbiAgICByZWR1Y2VyTWFuYWdlcjogUmVkdWNlck1hbmFnZXIsXG4gICAgQEluamVjdChJTklUSUFMX1NUQVRFKSBwcml2YXRlIGluaXRpYWxTdGF0ZTogVCxcbiAgICBASW5qZWN0KE1PQ0tfU0VMRUNUT1JTKSBtb2NrU2VsZWN0b3JzPzogTW9ja1NlbGVjdG9yW11cbiAgKSB7XG4gICAgc3VwZXIoc3RhdGUkLCBhY3Rpb25zT2JzZXJ2ZXIsIHJlZHVjZXJNYW5hZ2VyKTtcbiAgICB0aGlzLnJlc2V0U2VsZWN0b3JzKCk7XG4gICAgdGhpcy5zdGF0ZSQubmV4dCh0aGlzLmluaXRpYWxTdGF0ZSk7XG4gICAgdGhpcy5zY2FubmVkQWN0aW9ucyQgPSBhY3Rpb25zT2JzZXJ2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gICAgaWYgKG1vY2tTZWxlY3RvcnMpIHtcbiAgICAgIG1vY2tTZWxlY3RvcnMuZm9yRWFjaChtb2NrU2VsZWN0b3IgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IG1vY2tTZWxlY3Rvci5zZWxlY3RvcjtcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLm92ZXJyaWRlU2VsZWN0b3Ioc2VsZWN0b3IsIG1vY2tTZWxlY3Rvci52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vdmVycmlkZVNlbGVjdG9yKHNlbGVjdG9yLCBtb2NrU2VsZWN0b3IudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzZXRTdGF0ZShuZXh0U3RhdGU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlJC5uZXh0KG5leHRTdGF0ZSk7XG4gIH1cblxuICBvdmVycmlkZVNlbGVjdG9yPFQsIFJlc3VsdD4oXG4gICAgc2VsZWN0b3I6IHN0cmluZyxcbiAgICB2YWx1ZTogUmVzdWx0XG4gICk6IE1lbW9pemVkU2VsZWN0b3I8c3RyaW5nLCBSZXN1bHQ+O1xuICBvdmVycmlkZVNlbGVjdG9yPFQsIFJlc3VsdD4oXG4gICAgc2VsZWN0b3I6IE1lbW9pemVkU2VsZWN0b3I8VCwgUmVzdWx0PixcbiAgICB2YWx1ZTogUmVzdWx0XG4gICk6IE1lbW9pemVkU2VsZWN0b3I8VCwgUmVzdWx0PjtcbiAgb3ZlcnJpZGVTZWxlY3RvcjxULCBSZXN1bHQ+KFxuICAgIHNlbGVjdG9yOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFQsIGFueSwgUmVzdWx0PixcbiAgICB2YWx1ZTogUmVzdWx0XG4gICk6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8VCwgYW55LCBSZXN1bHQ+O1xuICBvdmVycmlkZVNlbGVjdG9yPFQsIFJlc3VsdD4oXG4gICAgc2VsZWN0b3I6XG4gICAgICB8IHN0cmluZ1xuICAgICAgfCBNZW1vaXplZFNlbGVjdG9yPGFueSwgYW55PlxuICAgICAgfCBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBhbnk+LFxuICAgIHZhbHVlOiBhbnlcbiAgKSB7XG4gICAgTW9ja1N0b3JlLnNlbGVjdG9ycy5zZXQoc2VsZWN0b3IsIHZhbHVlKTtcblxuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBzdHJpbmdTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKCgpID0+IHt9LCAoKSA9PiB2YWx1ZSk7XG5cbiAgICAgIHJldHVybiBzdHJpbmdTZWxlY3RvcjtcbiAgICB9XG5cbiAgICBzZWxlY3Rvci5zZXRSZXN1bHQodmFsdWUpO1xuXG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9XG5cbiAgcmVzZXRTZWxlY3RvcnMoKSB7XG4gICAgTW9ja1N0b3JlLnNlbGVjdG9ycy5mb3JFYWNoKChfLCBzZWxlY3RvcikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgc2VsZWN0b3IucmVsZWFzZSgpO1xuICAgICAgICBzZWxlY3Rvci5zZXRSZXN1bHQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1vY2tTdG9yZS5zZWxlY3RvcnMuY2xlYXIoKTtcbiAgfVxuXG4gIHNlbGVjdChzZWxlY3RvcjogYW55LCBwcm9wPzogYW55KSB7XG4gICAgaWYgKE1vY2tTdG9yZS5zZWxlY3RvcnMuaGFzKHNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihcbiAgICAgICAgTW9ja1N0b3JlLnNlbGVjdG9ycy5nZXQoc2VsZWN0b3IpXG4gICAgICApLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBzdXBlci5zZWxlY3Qoc2VsZWN0b3IsIHByb3ApO1xuICB9XG5cbiAgYWRkUmVkdWNlcigpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICByZW1vdmVSZWR1Y2VyKCkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxufVxuIl19