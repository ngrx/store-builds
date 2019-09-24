import * as tslib_1 from "tslib";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvbW9ja19zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUVMLGNBQWMsRUFDZCxhQUFhLEVBQ2IsY0FBYyxFQUNkLEtBQUssRUFDTCxjQUFjLEdBR2YsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRTFDLElBQUksT0FBTyxTQUFTLEtBQUssVUFBVSxFQUFFO0lBQ25DLFNBQVMsQ0FBQztRQUNSLElBQUk7WUFDRixJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBbUIsQ0FBQztZQUNuRCxJQUFJLEtBQUssSUFBSSxnQkFBZ0IsSUFBSSxLQUFLLEVBQUU7Z0JBQ3RDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN4QjtTQUNGO1FBQUMsV0FBTSxHQUFFO0lBQ1osQ0FBQyxDQUFDLENBQUM7Q0FDSjtBQUdEO0lBQWtDLHFDQUFRO0lBVXhDLG1CQUNVLE1BQW9CLEVBQzVCLGVBQStCLEVBQy9CLGNBQThCLEVBQ0MsWUFBZSxFQUN0QixhQUE4QjtRQUx4RCxZQU9FLGtCQUFNLE1BQU0sRUFBRSxlQUFlLEVBQUUsY0FBYyxDQUFDLFNBYy9DO1FBcEJTLFlBQU0sR0FBTixNQUFNLENBQWM7UUFHRyxrQkFBWSxHQUFaLFlBQVksQ0FBRztRQUk5QyxLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BDLEtBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RELElBQUksYUFBYSxFQUFFO1lBQ2pCLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxZQUFZO2dCQUNoQyxJQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO2dCQUN2QyxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtvQkFDaEMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3JEO3FCQUFNO29CQUNMLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNyRDtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7O0lBQ0gsQ0FBQztrQkEvQlUsU0FBUztJQWlDcEIsNEJBQVEsR0FBUixVQUFTLFNBQVk7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQWNELG9DQUFnQixHQUFoQixVQUNFLFFBRzRDLEVBQzVDLEtBQVU7UUFFVixXQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFekMsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDaEMsSUFBTSxjQUFjLEdBQUcsY0FBYyxDQUFDLGNBQU8sQ0FBQyxFQUFFLGNBQU0sT0FBQSxLQUFLLEVBQUwsQ0FBSyxDQUFDLENBQUM7WUFFN0QsT0FBTyxjQUFjLENBQUM7U0FDdkI7UUFFRCxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTFCLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxrQ0FBYyxHQUFkO1FBQ0UsV0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUUsUUFBUTtZQUN0QyxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtnQkFDaEMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNuQixRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILFdBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELDBCQUFNLEdBQU4sVUFBTyxRQUFhLEVBQUUsSUFBVTtRQUM5QixJQUFJLFdBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3JDLE9BQU8sSUFBSSxlQUFlLENBQ3hCLFdBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUNsQyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ2xCO1FBRUQsT0FBTyxpQkFBTSxNQUFNLFlBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCw4QkFBVSxHQUFWO1FBQ0UsVUFBVTtJQUNaLENBQUM7SUFFRCxpQ0FBYSxHQUFiO1FBQ0UsVUFBVTtJQUNaLENBQUM7O0lBL0ZNLG1CQUFTLEdBQUcsSUFBSSxHQUFHLEVBS3ZCLENBQUM7SUFOTyxTQUFTO1FBRHJCLFVBQVUsRUFBRTtRQWVSLG1CQUFBLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUNyQixtQkFBQSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUE7aURBSlAsU0FBUztZQUNSLGNBQWM7WUFDZixjQUFjO09BYnJCLFNBQVMsQ0FpR3JCO0lBQUQsZ0JBQUM7Q0FBQSxBQWpHRCxDQUFrQyxLQUFLLEdBaUd0QztTQWpHWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUZXN0QmVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgQWN0aW9uLFxuICBBY3Rpb25zU3ViamVjdCxcbiAgSU5JVElBTF9TVEFURSxcbiAgUmVkdWNlck1hbmFnZXIsXG4gIFN0b3JlLFxuICBjcmVhdGVTZWxlY3RvcixcbiAgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wcyxcbiAgTWVtb2l6ZWRTZWxlY3Rvcixcbn0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgTW9ja1N0YXRlIH0gZnJvbSAnLi9tb2NrX3N0YXRlJztcbmltcG9ydCB7IE1vY2tTZWxlY3RvciB9IGZyb20gJy4vbW9ja19zZWxlY3Rvcic7XG5pbXBvcnQgeyBNT0NLX1NFTEVDVE9SUyB9IGZyb20gJy4vdG9rZW5zJztcblxuaWYgKHR5cGVvZiBhZnRlckVhY2ggPT09ICdmdW5jdGlvbicpIHtcbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3RvcmUgPSBUZXN0QmVkLmdldChTdG9yZSkgYXMgTW9ja1N0b3JlPGFueT47XG4gICAgICBpZiAoc3RvcmUgJiYgJ3Jlc2V0U2VsZWN0b3JzJyBpbiBzdG9yZSkge1xuICAgICAgICBzdG9yZS5yZXNldFNlbGVjdG9ycygpO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge31cbiAgfSk7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2NrU3RvcmU8VD4gZXh0ZW5kcyBTdG9yZTxUPiB7XG4gIHN0YXRpYyBzZWxlY3RvcnMgPSBuZXcgTWFwPFxuICAgIHwgc3RyaW5nXG4gICAgfCBNZW1vaXplZFNlbGVjdG9yPGFueSwgYW55PlxuICAgIHwgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgYW55PixcbiAgICBhbnlcbiAgPigpO1xuXG4gIHB1YmxpYyBzY2FubmVkQWN0aW9ucyQ6IE9ic2VydmFibGU8QWN0aW9uPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN0YXRlJDogTW9ja1N0YXRlPFQ+LFxuICAgIGFjdGlvbnNPYnNlcnZlcjogQWN0aW9uc1N1YmplY3QsXG4gICAgcmVkdWNlck1hbmFnZXI6IFJlZHVjZXJNYW5hZ2VyLFxuICAgIEBJbmplY3QoSU5JVElBTF9TVEFURSkgcHJpdmF0ZSBpbml0aWFsU3RhdGU6IFQsXG4gICAgQEluamVjdChNT0NLX1NFTEVDVE9SUykgbW9ja1NlbGVjdG9ycz86IE1vY2tTZWxlY3RvcltdXG4gICkge1xuICAgIHN1cGVyKHN0YXRlJCwgYWN0aW9uc09ic2VydmVyLCByZWR1Y2VyTWFuYWdlcik7XG4gICAgdGhpcy5yZXNldFNlbGVjdG9ycygpO1xuICAgIHRoaXMuc3RhdGUkLm5leHQodGhpcy5pbml0aWFsU3RhdGUpO1xuICAgIHRoaXMuc2Nhbm5lZEFjdGlvbnMkID0gYWN0aW9uc09ic2VydmVyLmFzT2JzZXJ2YWJsZSgpO1xuICAgIGlmIChtb2NrU2VsZWN0b3JzKSB7XG4gICAgICBtb2NrU2VsZWN0b3JzLmZvckVhY2gobW9ja1NlbGVjdG9yID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBtb2NrU2VsZWN0b3Iuc2VsZWN0b3I7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5vdmVycmlkZVNlbGVjdG9yKHNlbGVjdG9yLCBtb2NrU2VsZWN0b3IudmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub3ZlcnJpZGVTZWxlY3RvcihzZWxlY3RvciwgbW9ja1NlbGVjdG9yLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0U3RhdGUobmV4dFN0YXRlOiBUKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZSQubmV4dChuZXh0U3RhdGUpO1xuICB9XG5cbiAgb3ZlcnJpZGVTZWxlY3RvcjxULCBSZXN1bHQ+KFxuICAgIHNlbGVjdG9yOiBzdHJpbmcsXG4gICAgdmFsdWU6IFJlc3VsdFxuICApOiBNZW1vaXplZFNlbGVjdG9yPHN0cmluZywgUmVzdWx0PjtcbiAgb3ZlcnJpZGVTZWxlY3RvcjxULCBSZXN1bHQ+KFxuICAgIHNlbGVjdG9yOiBNZW1vaXplZFNlbGVjdG9yPFQsIFJlc3VsdD4sXG4gICAgdmFsdWU6IFJlc3VsdFxuICApOiBNZW1vaXplZFNlbGVjdG9yPFQsIFJlc3VsdD47XG4gIG92ZXJyaWRlU2VsZWN0b3I8VCwgUmVzdWx0PihcbiAgICBzZWxlY3RvcjogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxULCBhbnksIFJlc3VsdD4sXG4gICAgdmFsdWU6IFJlc3VsdFxuICApOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFQsIGFueSwgUmVzdWx0PjtcbiAgb3ZlcnJpZGVTZWxlY3RvcjxULCBSZXN1bHQ+KFxuICAgIHNlbGVjdG9yOlxuICAgICAgfCBzdHJpbmdcbiAgICAgIHwgTWVtb2l6ZWRTZWxlY3RvcjxhbnksIGFueT5cbiAgICAgIHwgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgYW55PixcbiAgICB2YWx1ZTogYW55XG4gICkge1xuICAgIE1vY2tTdG9yZS5zZWxlY3RvcnMuc2V0KHNlbGVjdG9yLCB2YWx1ZSk7XG5cbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3Qgc3RyaW5nU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcigoKSA9PiB7fSwgKCkgPT4gdmFsdWUpO1xuXG4gICAgICByZXR1cm4gc3RyaW5nU2VsZWN0b3I7XG4gICAgfVxuXG4gICAgc2VsZWN0b3Iuc2V0UmVzdWx0KHZhbHVlKTtcblxuICAgIHJldHVybiBzZWxlY3RvcjtcbiAgfVxuXG4gIHJlc2V0U2VsZWN0b3JzKCkge1xuICAgIE1vY2tTdG9yZS5zZWxlY3RvcnMuZm9yRWFjaCgoXywgc2VsZWN0b3IpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHNlbGVjdG9yLnJlbGVhc2UoKTtcbiAgICAgICAgc2VsZWN0b3Iuc2V0UmVzdWx0KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBNb2NrU3RvcmUuc2VsZWN0b3JzLmNsZWFyKCk7XG4gIH1cblxuICBzZWxlY3Qoc2VsZWN0b3I6IGFueSwgcHJvcD86IGFueSkge1xuICAgIGlmIChNb2NrU3RvcmUuc2VsZWN0b3JzLmhhcyhzZWxlY3RvcikpIHtcbiAgICAgIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4oXG4gICAgICAgIE1vY2tTdG9yZS5zZWxlY3RvcnMuZ2V0KHNlbGVjdG9yKVxuICAgICAgKS5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIuc2VsZWN0KHNlbGVjdG9yLCBwcm9wKTtcbiAgfVxuXG4gIGFkZFJlZHVjZXIoKSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgcmVtb3ZlUmVkdWNlcigpIHtcbiAgICAvKiBub29wICovXG4gIH1cbn1cbiJdfQ==