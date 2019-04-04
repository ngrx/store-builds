var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActionsSubject, INITIAL_STATE, ReducerManager, Store, createSelector, } from '@ngrx/store';
import { MockState } from './mock_state';
var MockStore = /** @class */ (function (_super) {
    __extends(MockStore, _super);
    function MockStore(state$, actionsObserver, reducerManager, initialState) {
        var _this = _super.call(this, state$, actionsObserver, reducerManager) || this;
        _this.state$ = state$;
        _this.initialState = initialState;
        _this.resetSelectors();
        _this.state$.next(_this.initialState);
        _this.scannedActions$ = actionsObserver.asObservable();
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
    MockStore.prototype.select = function (selector) {
        if (MockStore_1.selectors.has(selector)) {
            return new BehaviorSubject(MockStore_1.selectors.get(selector)).asObservable();
        }
        return _super.prototype.select.call(this, selector);
    };
    MockStore.prototype.addReducer = function () {
        /* noop */
    };
    MockStore.prototype.removeReducer = function () {
        /* noop */
    };
    var MockStore_1;
    MockStore.selectors = new Map();
    MockStore = MockStore_1 = __decorate([
        Injectable(),
        __param(3, Inject(INITIAL_STATE)),
        __metadata("design:paramtypes", [MockState,
            ActionsSubject,
            ReducerManager, Object])
    ], MockStore);
    return MockStore;
}(Store));
export { MockStore };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvbW9ja19zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFjLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBRUwsY0FBYyxFQUNkLGFBQWEsRUFDYixjQUFjLEVBQ2QsS0FBSyxFQUNMLGNBQWMsR0FHZixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBR3pDO0lBQWtDLDZCQUFRO0lBVXhDLG1CQUNVLE1BQW9CLEVBQzVCLGVBQStCLEVBQy9CLGNBQThCLEVBQ0MsWUFBZTtRQUpoRCxZQU1FLGtCQUFNLE1BQU0sRUFBRSxlQUFlLEVBQUUsY0FBYyxDQUFDLFNBSS9DO1FBVFMsWUFBTSxHQUFOLE1BQU0sQ0FBYztRQUdHLGtCQUFZLEdBQVosWUFBWSxDQUFHO1FBRzlDLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEMsS0FBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7O0lBQ3hELENBQUM7a0JBcEJVLFNBQVM7SUFzQnBCLDRCQUFRLEdBQVIsVUFBUyxTQUFZO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFjRCxvQ0FBZ0IsR0FBaEIsVUFDRSxRQUc0QyxFQUM1QyxLQUFVO1FBRVYsV0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXpDLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ2hDLElBQU0sY0FBYyxHQUFHLGNBQWMsQ0FBQyxjQUFPLENBQUMsRUFBRSxjQUFNLE9BQUEsS0FBSyxFQUFMLENBQUssQ0FBQyxDQUFDO1lBRTdELE9BQU8sY0FBYyxDQUFDO1NBQ3ZCO1FBRUQsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUQsa0NBQWMsR0FBZDtRQUNFLFdBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFFLFFBQVE7WUFDdEMsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7Z0JBQ2hDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbkIsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ3RCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxXQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCwwQkFBTSxHQUFOLFVBQU8sUUFBYTtRQUNsQixJQUFJLFdBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3JDLE9BQU8sSUFBSSxlQUFlLENBQ3hCLFdBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUNsQyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ2xCO1FBRUQsT0FBTyxpQkFBTSxNQUFNLFlBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELDhCQUFVLEdBQVY7UUFDRSxVQUFVO0lBQ1osQ0FBQztJQUVELGlDQUFhLEdBQWI7UUFDRSxVQUFVO0lBQ1osQ0FBQzs7SUFwRk0sbUJBQVMsR0FBRyxJQUFJLEdBQUcsRUFLdkIsQ0FBQztJQU5PLFNBQVM7UUFEckIsVUFBVSxFQUFFO1FBZVIsV0FBQSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUE7eUNBSE4sU0FBUztZQUNSLGNBQWM7WUFDZixjQUFjO09BYnJCLFNBQVMsQ0FzRnJCO0lBQUQsZ0JBQUM7Q0FBQSxBQXRGRCxDQUFrQyxLQUFLLEdBc0Z0QztTQXRGWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIEFjdGlvbixcbiAgQWN0aW9uc1N1YmplY3QsXG4gIElOSVRJQUxfU1RBVEUsXG4gIFJlZHVjZXJNYW5hZ2VyLFxuICBTdG9yZSxcbiAgY3JlYXRlU2VsZWN0b3IsXG4gIE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHMsXG4gIE1lbW9pemVkU2VsZWN0b3IsXG59IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IE1vY2tTdGF0ZSB9IGZyb20gJy4vbW9ja19zdGF0ZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2NrU3RvcmU8VD4gZXh0ZW5kcyBTdG9yZTxUPiB7XG4gIHN0YXRpYyBzZWxlY3RvcnMgPSBuZXcgTWFwPFxuICAgIHwgc3RyaW5nXG4gICAgfCBNZW1vaXplZFNlbGVjdG9yPGFueSwgYW55PlxuICAgIHwgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgYW55PixcbiAgICBhbnlcbiAgPigpO1xuXG4gIHB1YmxpYyBzY2FubmVkQWN0aW9ucyQ6IE9ic2VydmFibGU8QWN0aW9uPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN0YXRlJDogTW9ja1N0YXRlPFQ+LFxuICAgIGFjdGlvbnNPYnNlcnZlcjogQWN0aW9uc1N1YmplY3QsXG4gICAgcmVkdWNlck1hbmFnZXI6IFJlZHVjZXJNYW5hZ2VyLFxuICAgIEBJbmplY3QoSU5JVElBTF9TVEFURSkgcHJpdmF0ZSBpbml0aWFsU3RhdGU6IFRcbiAgKSB7XG4gICAgc3VwZXIoc3RhdGUkLCBhY3Rpb25zT2JzZXJ2ZXIsIHJlZHVjZXJNYW5hZ2VyKTtcbiAgICB0aGlzLnJlc2V0U2VsZWN0b3JzKCk7XG4gICAgdGhpcy5zdGF0ZSQubmV4dCh0aGlzLmluaXRpYWxTdGF0ZSk7XG4gICAgdGhpcy5zY2FubmVkQWN0aW9ucyQgPSBhY3Rpb25zT2JzZXJ2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBzZXRTdGF0ZShuZXh0U3RhdGU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlJC5uZXh0KG5leHRTdGF0ZSk7XG4gIH1cblxuICBvdmVycmlkZVNlbGVjdG9yPFQsIFJlc3VsdD4oXG4gICAgc2VsZWN0b3I6IHN0cmluZyxcbiAgICB2YWx1ZTogUmVzdWx0XG4gICk6IE1lbW9pemVkU2VsZWN0b3I8c3RyaW5nLCBSZXN1bHQ+O1xuICBvdmVycmlkZVNlbGVjdG9yPFQsIFJlc3VsdD4oXG4gICAgc2VsZWN0b3I6IE1lbW9pemVkU2VsZWN0b3I8VCwgUmVzdWx0PixcbiAgICB2YWx1ZTogUmVzdWx0XG4gICk6IE1lbW9pemVkU2VsZWN0b3I8VCwgUmVzdWx0PjtcbiAgb3ZlcnJpZGVTZWxlY3RvcjxULCBSZXN1bHQ+KFxuICAgIHNlbGVjdG9yOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFQsIGFueSwgUmVzdWx0PixcbiAgICB2YWx1ZTogUmVzdWx0XG4gICk6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8VCwgYW55LCBSZXN1bHQ+O1xuICBvdmVycmlkZVNlbGVjdG9yPFQsIFJlc3VsdD4oXG4gICAgc2VsZWN0b3I6XG4gICAgICB8IHN0cmluZ1xuICAgICAgfCBNZW1vaXplZFNlbGVjdG9yPGFueSwgYW55PlxuICAgICAgfCBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBhbnk+LFxuICAgIHZhbHVlOiBhbnlcbiAgKSB7XG4gICAgTW9ja1N0b3JlLnNlbGVjdG9ycy5zZXQoc2VsZWN0b3IsIHZhbHVlKTtcblxuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBzdHJpbmdTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKCgpID0+IHt9LCAoKSA9PiB2YWx1ZSk7XG5cbiAgICAgIHJldHVybiBzdHJpbmdTZWxlY3RvcjtcbiAgICB9XG5cbiAgICBzZWxlY3Rvci5zZXRSZXN1bHQodmFsdWUpO1xuXG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9XG5cbiAgcmVzZXRTZWxlY3RvcnMoKSB7XG4gICAgTW9ja1N0b3JlLnNlbGVjdG9ycy5mb3JFYWNoKChfLCBzZWxlY3RvcikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgc2VsZWN0b3IucmVsZWFzZSgpO1xuICAgICAgICBzZWxlY3Rvci5zZXRSZXN1bHQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1vY2tTdG9yZS5zZWxlY3RvcnMuY2xlYXIoKTtcbiAgfVxuXG4gIHNlbGVjdChzZWxlY3RvcjogYW55KSB7XG4gICAgaWYgKE1vY2tTdG9yZS5zZWxlY3RvcnMuaGFzKHNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihcbiAgICAgICAgTW9ja1N0b3JlLnNlbGVjdG9ycy5nZXQoc2VsZWN0b3IpXG4gICAgICApLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBzdXBlci5zZWxlY3Qoc2VsZWN0b3IpO1xuICB9XG5cbiAgYWRkUmVkdWNlcigpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICByZW1vdmVSZWR1Y2VyKCkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxufVxuIl19