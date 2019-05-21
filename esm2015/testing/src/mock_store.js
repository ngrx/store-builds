/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActionsSubject, INITIAL_STATE, ReducerManager, Store, createSelector, } from '@ngrx/store';
import { MockState } from './mock_state';
import { MOCK_SELECTORS } from './tokens';
/**
 * @template T
 */
export class MockStore extends Store {
    /**
     * @param {?} state$
     * @param {?} actionsObserver
     * @param {?} reducerManager
     * @param {?} initialState
     * @param {?=} mockSelectors
     */
    constructor(state$, actionsObserver, reducerManager, initialState, mockSelectors) {
        super(state$, actionsObserver, reducerManager);
        this.state$ = state$;
        this.initialState = initialState;
        this.resetSelectors();
        this.state$.next(this.initialState);
        this.scannedActions$ = actionsObserver.asObservable();
        if (mockSelectors) {
            mockSelectors.forEach((/**
             * @param {?} mockSelector
             * @return {?}
             */
            mockSelector => {
                /** @type {?} */
                const selector = mockSelector.selector;
                if (typeof selector === 'string') {
                    this.overrideSelector(selector, mockSelector.value);
                }
                else {
                    this.overrideSelector(selector, mockSelector.value);
                }
            }));
        }
    }
    /**
     * @param {?} nextState
     * @return {?}
     */
    setState(nextState) {
        this.state$.next(nextState);
    }
    /**
     * @template T, Result
     * @param {?} selector
     * @param {?} value
     * @return {?}
     */
    overrideSelector(selector, value) {
        MockStore.selectors.set(selector, value);
        if (typeof selector === 'string') {
            /** @type {?} */
            const stringSelector = createSelector((/**
             * @return {?}
             */
            () => { }), (/**
             * @return {?}
             */
            () => value));
            return stringSelector;
        }
        selector.setResult(value);
        return selector;
    }
    /**
     * @return {?}
     */
    resetSelectors() {
        MockStore.selectors.forEach((/**
         * @param {?} _
         * @param {?} selector
         * @return {?}
         */
        (_, selector) => {
            if (typeof selector !== 'string') {
                selector.release();
                selector.setResult();
            }
        }));
        MockStore.selectors.clear();
    }
    /**
     * @param {?} selector
     * @param {?=} prop
     * @return {?}
     */
    select(selector, prop) {
        if (MockStore.selectors.has(selector)) {
            return new BehaviorSubject(MockStore.selectors.get(selector)).asObservable();
        }
        return super.select(selector, prop);
    }
    /**
     * @return {?}
     */
    addReducer() {
        /* noop */
    }
    /**
     * @return {?}
     */
    removeReducer() {
        /* noop */
    }
}
MockStore.selectors = new Map();
MockStore.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MockStore.ctorParameters = () => [
    { type: MockState },
    { type: ActionsSubject },
    { type: ReducerManager },
    { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] }] },
    { type: Array, decorators: [{ type: Inject, args: [MOCK_SELECTORS,] }] }
];
if (false) {
    /** @type {?} */
    MockStore.selectors;
    /** @type {?} */
    MockStore.prototype.scannedActions$;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvbW9ja19zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFjLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBRUwsY0FBYyxFQUNkLGFBQWEsRUFDYixjQUFjLEVBQ2QsS0FBSyxFQUNMLGNBQWMsR0FHZixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUM7Ozs7QUFHMUMsTUFBTSxPQUFPLFNBQWEsU0FBUSxLQUFROzs7Ozs7OztJQVV4QyxZQUNVLE1BQW9CLEVBQzVCLGVBQStCLEVBQy9CLGNBQThCLEVBQ0MsWUFBZSxFQUN0QixhQUE4QjtRQUV0RCxLQUFLLENBQUMsTUFBTSxFQUFFLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQztRQU52QyxXQUFNLEdBQU4sTUFBTSxDQUFjO1FBR0csaUJBQVksR0FBWixZQUFZLENBQUc7UUFJOUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0RCxJQUFJLGFBQWEsRUFBRTtZQUNqQixhQUFhLENBQUMsT0FBTzs7OztZQUFDLFlBQVksQ0FBQyxFQUFFOztzQkFDN0IsUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRO2dCQUN0QyxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtvQkFDaEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3JEO3FCQUFNO29CQUNMLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNyRDtZQUNILENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxTQUFZO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7Ozs7SUFjRCxnQkFBZ0IsQ0FDZCxRQUc0QyxFQUM1QyxLQUFVO1FBRVYsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXpDLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFOztrQkFDMUIsY0FBYyxHQUFHLGNBQWM7OztZQUFDLEdBQUcsRUFBRSxHQUFFLENBQUM7OztZQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBQztZQUU1RCxPQUFPLGNBQWMsQ0FBQztTQUN2QjtRQUVELFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFMUIsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7OztJQUVELGNBQWM7UUFDWixTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU87Ozs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUU7WUFDMUMsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7Z0JBQ2hDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbkIsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ3RCO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFSCxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlCLENBQUM7Ozs7OztJQUVELE1BQU0sQ0FBQyxRQUFhLEVBQUUsSUFBVTtRQUM5QixJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3JDLE9BQU8sSUFBSSxlQUFlLENBQ3hCLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUNsQyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ2xCO1FBRUQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7O0lBRUQsVUFBVTtRQUNSLFVBQVU7SUFDWixDQUFDOzs7O0lBRUQsYUFBYTtRQUNYLFVBQVU7SUFDWixDQUFDOztBQS9GTSxtQkFBUyxHQUFHLElBQUksR0FBRyxFQUt2QixDQUFDOztZQVBMLFVBQVU7Ozs7WUFKRixTQUFTO1lBUmhCLGNBQWM7WUFFZCxjQUFjOzRDQXlCWCxNQUFNLFNBQUMsYUFBYTt3Q0FDcEIsTUFBTSxTQUFDLGNBQWM7Ozs7SUFkeEIsb0JBS0k7O0lBRUosb0NBQTJDOzs7OztJQUd6QywyQkFBNEI7Ozs7O0lBRzVCLGlDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBBY3Rpb24sXG4gIEFjdGlvbnNTdWJqZWN0LFxuICBJTklUSUFMX1NUQVRFLFxuICBSZWR1Y2VyTWFuYWdlcixcbiAgU3RvcmUsXG4gIGNyZWF0ZVNlbGVjdG9yLFxuICBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzLFxuICBNZW1vaXplZFNlbGVjdG9yLFxufSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBNb2NrU3RhdGUgfSBmcm9tICcuL21vY2tfc3RhdGUnO1xuaW1wb3J0IHsgTW9ja1NlbGVjdG9yIH0gZnJvbSAnLi9tb2NrX3NlbGVjdG9yJztcbmltcG9ydCB7IE1PQ0tfU0VMRUNUT1JTIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja1N0b3JlPFQ+IGV4dGVuZHMgU3RvcmU8VD4ge1xuICBzdGF0aWMgc2VsZWN0b3JzID0gbmV3IE1hcDxcbiAgICB8IHN0cmluZ1xuICAgIHwgTWVtb2l6ZWRTZWxlY3RvcjxhbnksIGFueT5cbiAgICB8IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIGFueT4sXG4gICAgYW55XG4gID4oKTtcblxuICBwdWJsaWMgc2Nhbm5lZEFjdGlvbnMkOiBPYnNlcnZhYmxlPEFjdGlvbj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzdGF0ZSQ6IE1vY2tTdGF0ZTxUPixcbiAgICBhY3Rpb25zT2JzZXJ2ZXI6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHJlZHVjZXJNYW5hZ2VyOiBSZWR1Y2VyTWFuYWdlcixcbiAgICBASW5qZWN0KElOSVRJQUxfU1RBVEUpIHByaXZhdGUgaW5pdGlhbFN0YXRlOiBULFxuICAgIEBJbmplY3QoTU9DS19TRUxFQ1RPUlMpIG1vY2tTZWxlY3RvcnM/OiBNb2NrU2VsZWN0b3JbXVxuICApIHtcbiAgICBzdXBlcihzdGF0ZSQsIGFjdGlvbnNPYnNlcnZlciwgcmVkdWNlck1hbmFnZXIpO1xuICAgIHRoaXMucmVzZXRTZWxlY3RvcnMoKTtcbiAgICB0aGlzLnN0YXRlJC5uZXh0KHRoaXMuaW5pdGlhbFN0YXRlKTtcbiAgICB0aGlzLnNjYW5uZWRBY3Rpb25zJCA9IGFjdGlvbnNPYnNlcnZlci5hc09ic2VydmFibGUoKTtcbiAgICBpZiAobW9ja1NlbGVjdG9ycykge1xuICAgICAgbW9ja1NlbGVjdG9ycy5mb3JFYWNoKG1vY2tTZWxlY3RvciA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gbW9ja1NlbGVjdG9yLnNlbGVjdG9yO1xuICAgICAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRoaXMub3ZlcnJpZGVTZWxlY3RvcihzZWxlY3RvciwgbW9ja1NlbGVjdG9yLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm92ZXJyaWRlU2VsZWN0b3Ioc2VsZWN0b3IsIG1vY2tTZWxlY3Rvci52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNldFN0YXRlKG5leHRTdGF0ZTogVCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUkLm5leHQobmV4dFN0YXRlKTtcbiAgfVxuXG4gIG92ZXJyaWRlU2VsZWN0b3I8VCwgUmVzdWx0PihcbiAgICBzZWxlY3Rvcjogc3RyaW5nLFxuICAgIHZhbHVlOiBSZXN1bHRcbiAgKTogTWVtb2l6ZWRTZWxlY3RvcjxzdHJpbmcsIFJlc3VsdD47XG4gIG92ZXJyaWRlU2VsZWN0b3I8VCwgUmVzdWx0PihcbiAgICBzZWxlY3RvcjogTWVtb2l6ZWRTZWxlY3RvcjxULCBSZXN1bHQ+LFxuICAgIHZhbHVlOiBSZXN1bHRcbiAgKTogTWVtb2l6ZWRTZWxlY3RvcjxULCBSZXN1bHQ+O1xuICBvdmVycmlkZVNlbGVjdG9yPFQsIFJlc3VsdD4oXG4gICAgc2VsZWN0b3I6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8VCwgYW55LCBSZXN1bHQ+LFxuICAgIHZhbHVlOiBSZXN1bHRcbiAgKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxULCBhbnksIFJlc3VsdD47XG4gIG92ZXJyaWRlU2VsZWN0b3I8VCwgUmVzdWx0PihcbiAgICBzZWxlY3RvcjpcbiAgICAgIHwgc3RyaW5nXG4gICAgICB8IE1lbW9pemVkU2VsZWN0b3I8YW55LCBhbnk+XG4gICAgICB8IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIGFueT4sXG4gICAgdmFsdWU6IGFueVxuICApIHtcbiAgICBNb2NrU3RvcmUuc2VsZWN0b3JzLnNldChzZWxlY3RvciwgdmFsdWUpO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHN0cmluZ1NlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoKCkgPT4ge30sICgpID0+IHZhbHVlKTtcblxuICAgICAgcmV0dXJuIHN0cmluZ1NlbGVjdG9yO1xuICAgIH1cblxuICAgIHNlbGVjdG9yLnNldFJlc3VsdCh2YWx1ZSk7XG5cbiAgICByZXR1cm4gc2VsZWN0b3I7XG4gIH1cblxuICByZXNldFNlbGVjdG9ycygpIHtcbiAgICBNb2NrU3RvcmUuc2VsZWN0b3JzLmZvckVhY2goKF8sIHNlbGVjdG9yKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgICAgICBzZWxlY3Rvci5yZWxlYXNlKCk7XG4gICAgICAgIHNlbGVjdG9yLnNldFJlc3VsdCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTW9ja1N0b3JlLnNlbGVjdG9ycy5jbGVhcigpO1xuICB9XG5cbiAgc2VsZWN0KHNlbGVjdG9yOiBhbnksIHByb3A/OiBhbnkpIHtcbiAgICBpZiAoTW9ja1N0b3JlLnNlbGVjdG9ycy5oYXMoc2VsZWN0b3IpKSB7XG4gICAgICByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KFxuICAgICAgICBNb2NrU3RvcmUuc2VsZWN0b3JzLmdldChzZWxlY3RvcilcbiAgICAgICkuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLnNlbGVjdChzZWxlY3RvciwgcHJvcCk7XG4gIH1cblxuICBhZGRSZWR1Y2VyKCkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxuXG4gIHJlbW92ZVJlZHVjZXIoKSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG59XG4iXX0=