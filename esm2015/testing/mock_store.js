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
    () => {
        try {
            /** @type {?} */
            const mockStore = TestBed.inject(MockStore);
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
export class MockStore extends Store {
    /**
     * @param {?} state$
     * @param {?} actionsObserver
     * @param {?} reducerManager
     * @param {?} initialState
     * @param {?=} mockSelectors
     */
    constructor(state$, actionsObserver, reducerManager, initialState, mockSelectors = []) {
        super(state$, actionsObserver, reducerManager);
        this.state$ = state$;
        this.initialState = initialState;
        this.selectors = new Map();
        this.resetSelectors();
        this.setState(this.initialState);
        this.scannedActions$ = actionsObserver.asObservable();
        for (const mockSelector of mockSelectors) {
            this.overrideSelector(mockSelector.selector, mockSelector.value);
        }
    }
    /**
     * @param {?} nextState
     * @return {?}
     */
    setState(nextState) {
        this.state$.next(nextState);
        this.lastState = nextState;
    }
    /**
     * @template Selector, Value, Result
     * @param {?} selector
     * @param {?} value
     * @return {?}
     */
    overrideSelector(selector, value) {
        this.selectors.set(selector, value);
        /** @type {?} */
        const resultSelector = typeof selector === 'string'
            ? createSelector((/**
             * @return {?}
             */
            () => { }), (/**
             * @return {?}
             */
            () => value))
            : selector;
        resultSelector.setResult(value);
        return (/** @type {?} */ (resultSelector));
    }
    /**
     * @return {?}
     */
    resetSelectors() {
        for (const selector of this.selectors.keys()) {
            if (typeof selector !== 'string') {
                selector.release();
                selector.clearResult();
            }
        }
        this.selectors.clear();
    }
    /**
     * @param {?} selector
     * @param {?=} prop
     * @return {?}
     */
    select(selector, prop) {
        if (typeof selector === 'string' && this.selectors.has(selector)) {
            return new BehaviorSubject(this.selectors.get(selector)).asObservable();
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
    /**
     * Refreshes the existing state.
     * @return {?}
     */
    refreshState() {
        if (this.lastState)
            this.setState(Object.assign({}, this.lastState));
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvbW9ja19zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFFTCxjQUFjLEVBQ2QsYUFBYSxFQUNiLGNBQWMsRUFDZCxLQUFLLEVBQ0wsY0FBYyxHQUdmLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUUxQyxJQUFJLE9BQU8sU0FBUyxLQUFLLFVBQVUsRUFBRTtJQUNuQyxTQUFTOzs7SUFBQyxHQUFHLEVBQUU7UUFDYixJQUFJOztrQkFDSSxTQUFTLEdBQTBCLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ2xFLElBQUksU0FBUyxFQUFFO2dCQUNiLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUM1QjtTQUNGO1FBQUMsV0FBTSxHQUFFO0lBQ1osQ0FBQyxFQUFDLENBQUM7Q0FDSjs7OztBQWFELE1BQU0sT0FBTyxTQUFzQixTQUFRLEtBQVE7Ozs7Ozs7O0lBTWpELFlBQ1UsTUFBb0IsRUFDNUIsZUFBK0IsRUFDL0IsY0FBOEIsRUFDQyxZQUFlLEVBQ3RCLGdCQUFnQyxFQUFFO1FBRTFELEtBQUssQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBTnZDLFdBQU0sR0FBTixNQUFNLENBQWM7UUFHRyxpQkFBWSxHQUFaLFlBQVksQ0FBRztRQVQvQixjQUFTLEdBQUcsSUFBSSxHQUFHLEVBQStCLENBQUM7UUFhbEUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RELEtBQUssTUFBTSxZQUFZLElBQUksYUFBYSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLFNBQVk7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs7Ozs7OztJQUVELGdCQUFnQixDQVNkLFFBQTJCLEVBQzNCLEtBQVk7UUFFWixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7O2NBRTlCLGNBQWMsR0FDbEIsT0FBTyxRQUFRLEtBQUssUUFBUTtZQUMxQixDQUFDLENBQUMsY0FBYzs7O1lBQ1osR0FBRyxFQUFFLEdBQUUsQ0FBQzs7O1lBQ1IsR0FBVyxFQUFFLENBQUMsS0FBSyxFQUNwQjtZQUNILENBQUMsQ0FBQyxRQUFRO1FBRWQsY0FBYyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVoQyxPQUFPLG1CQUFBLGNBQWMsRUFBeUMsQ0FBQztJQUNqRSxDQUFDOzs7O0lBRUQsY0FBYztRQUNaLEtBQUssTUFBTSxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM1QyxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtnQkFDaEMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNuQixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDeEI7U0FDRjtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQzs7Ozs7O0lBRUQsTUFBTSxDQUFDLFFBQWEsRUFBRSxJQUFVO1FBQzlCLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2hFLE9BQU8sSUFBSSxlQUFlLENBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUM3QixDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ2xCO1FBRUQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7O0lBRUQsVUFBVTtRQUNSLFVBQVU7SUFDWixDQUFDOzs7O0lBRUQsYUFBYTtRQUNYLFVBQVU7SUFDWixDQUFDOzs7OztJQUtELFlBQVk7UUFDVixJQUFJLElBQUksQ0FBQyxTQUFTO1lBQUUsSUFBSSxDQUFDLFFBQVEsbUJBQU0sSUFBSSxDQUFDLFNBQVMsRUFBRyxDQUFDO0lBQzNELENBQUM7OztZQXpGRixVQUFVOzs7O1lBekJGLFNBQVM7WUFSaEIsY0FBYztZQUVkLGNBQWM7NENBMENYLE1BQU0sU0FBQyxhQUFhO3dDQUNwQixNQUFNLFNBQUMsY0FBYzs7Ozs7OztJQVZ4Qiw4QkFBb0U7O0lBRXBFLG9DQUE2Qzs7Ozs7SUFDN0MsOEJBQXNCOzs7OztJQUdwQiwyQkFBNEI7Ozs7O0lBRzVCLGlDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGVzdEJlZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvdGVzdGluZyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIEFjdGlvbixcbiAgQWN0aW9uc1N1YmplY3QsXG4gIElOSVRJQUxfU1RBVEUsXG4gIFJlZHVjZXJNYW5hZ2VyLFxuICBTdG9yZSxcbiAgY3JlYXRlU2VsZWN0b3IsXG4gIE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHMsXG4gIE1lbW9pemVkU2VsZWN0b3IsXG59IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IE1vY2tTdGF0ZSB9IGZyb20gJy4vbW9ja19zdGF0ZSc7XG5pbXBvcnQgeyBNb2NrU2VsZWN0b3IgfSBmcm9tICcuL21vY2tfc2VsZWN0b3InO1xuaW1wb3J0IHsgTU9DS19TRUxFQ1RPUlMgfSBmcm9tICcuL3Rva2Vucyc7XG5cbmlmICh0eXBlb2YgYWZ0ZXJFYWNoID09PSAnZnVuY3Rpb24nKSB7XG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1vY2tTdG9yZTogTW9ja1N0b3JlIHwgdW5kZWZpbmVkID0gVGVzdEJlZC5pbmplY3QoTW9ja1N0b3JlKTtcbiAgICAgIGlmIChtb2NrU3RvcmUpIHtcbiAgICAgICAgbW9ja1N0b3JlLnJlc2V0U2VsZWN0b3JzKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7fVxuICB9KTtcbn1cblxudHlwZSBPbmx5TWVtb2l6ZWQ8VCwgUmVzdWx0PiA9IFQgZXh0ZW5kcyBzdHJpbmcgfCBNZW1vaXplZFNlbGVjdG9yPGFueSwgYW55PlxuICA/IE1lbW9pemVkU2VsZWN0b3I8YW55LCBSZXN1bHQ+XG4gIDogVCBleHRlbmRzIE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIGFueT5cbiAgPyBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBSZXN1bHQ+XG4gIDogbmV2ZXI7XG5cbnR5cGUgTWVtb2l6ZWQ8UmVzdWx0PiA9XG4gIHwgTWVtb2l6ZWRTZWxlY3RvcjxhbnksIFJlc3VsdD5cbiAgfCBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBSZXN1bHQ+O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja1N0b3JlPFQgPSBvYmplY3Q+IGV4dGVuZHMgU3RvcmU8VD4ge1xuICBwcml2YXRlIHJlYWRvbmx5IHNlbGVjdG9ycyA9IG5ldyBNYXA8TWVtb2l6ZWQ8YW55PiB8IHN0cmluZywgYW55PigpO1xuXG4gIHJlYWRvbmx5IHNjYW5uZWRBY3Rpb25zJDogT2JzZXJ2YWJsZTxBY3Rpb24+O1xuICBwcml2YXRlIGxhc3RTdGF0ZT86IFQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzdGF0ZSQ6IE1vY2tTdGF0ZTxUPixcbiAgICBhY3Rpb25zT2JzZXJ2ZXI6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHJlZHVjZXJNYW5hZ2VyOiBSZWR1Y2VyTWFuYWdlcixcbiAgICBASW5qZWN0KElOSVRJQUxfU1RBVEUpIHByaXZhdGUgaW5pdGlhbFN0YXRlOiBULFxuICAgIEBJbmplY3QoTU9DS19TRUxFQ1RPUlMpIG1vY2tTZWxlY3RvcnM6IE1vY2tTZWxlY3RvcltdID0gW11cbiAgKSB7XG4gICAgc3VwZXIoc3RhdGUkLCBhY3Rpb25zT2JzZXJ2ZXIsIHJlZHVjZXJNYW5hZ2VyKTtcbiAgICB0aGlzLnJlc2V0U2VsZWN0b3JzKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh0aGlzLmluaXRpYWxTdGF0ZSk7XG4gICAgdGhpcy5zY2FubmVkQWN0aW9ucyQgPSBhY3Rpb25zT2JzZXJ2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gICAgZm9yIChjb25zdCBtb2NrU2VsZWN0b3Igb2YgbW9ja1NlbGVjdG9ycykge1xuICAgICAgdGhpcy5vdmVycmlkZVNlbGVjdG9yKG1vY2tTZWxlY3Rvci5zZWxlY3RvciwgbW9ja1NlbGVjdG9yLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBzZXRTdGF0ZShuZXh0U3RhdGU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlJC5uZXh0KG5leHRTdGF0ZSk7XG4gICAgdGhpcy5sYXN0U3RhdGUgPSBuZXh0U3RhdGU7XG4gIH1cblxuICBvdmVycmlkZVNlbGVjdG9yPFxuICAgIFNlbGVjdG9yIGV4dGVuZHMgTWVtb2l6ZWQ8UmVzdWx0PixcbiAgICBWYWx1ZSBleHRlbmRzIFJlc3VsdCxcbiAgICBSZXN1bHQgPSBTZWxlY3RvciBleHRlbmRzIE1lbW9pemVkU2VsZWN0b3I8YW55LCBpbmZlciBUPlxuICAgICAgPyBUXG4gICAgICA6IFNlbGVjdG9yIGV4dGVuZHMgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgaW5mZXIgVT5cbiAgICAgID8gVVxuICAgICAgOiBWYWx1ZVxuICA+KFxuICAgIHNlbGVjdG9yOiBTZWxlY3RvciB8IHN0cmluZyxcbiAgICB2YWx1ZTogVmFsdWVcbiAgKTogT25seU1lbW9pemVkPHR5cGVvZiBzZWxlY3RvciwgUmVzdWx0PiB7XG4gICAgdGhpcy5zZWxlY3RvcnMuc2V0KHNlbGVjdG9yLCB2YWx1ZSk7XG5cbiAgICBjb25zdCByZXN1bHRTZWxlY3RvcjogTWVtb2l6ZWQ8UmVzdWx0PiA9XG4gICAgICB0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnXG4gICAgICAgID8gY3JlYXRlU2VsZWN0b3IoXG4gICAgICAgICAgICAoKSA9PiB7fSxcbiAgICAgICAgICAgICgpOiBSZXN1bHQgPT4gdmFsdWVcbiAgICAgICAgICApXG4gICAgICAgIDogc2VsZWN0b3I7XG5cbiAgICByZXN1bHRTZWxlY3Rvci5zZXRSZXN1bHQodmFsdWUpO1xuXG4gICAgcmV0dXJuIHJlc3VsdFNlbGVjdG9yIGFzIE9ubHlNZW1vaXplZDx0eXBlb2Ygc2VsZWN0b3IsIFJlc3VsdD47XG4gIH1cblxuICByZXNldFNlbGVjdG9ycygpIHtcbiAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHRoaXMuc2VsZWN0b3JzLmtleXMoKSkge1xuICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgc2VsZWN0b3IucmVsZWFzZSgpO1xuICAgICAgICBzZWxlY3Rvci5jbGVhclJlc3VsdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0b3JzLmNsZWFyKCk7XG4gIH1cblxuICBzZWxlY3Qoc2VsZWN0b3I6IGFueSwgcHJvcD86IGFueSkge1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnICYmIHRoaXMuc2VsZWN0b3JzLmhhcyhzZWxlY3RvcikpIHtcbiAgICAgIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4oXG4gICAgICAgIHRoaXMuc2VsZWN0b3JzLmdldChzZWxlY3RvcilcbiAgICAgICkuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLnNlbGVjdChzZWxlY3RvciwgcHJvcCk7XG4gIH1cblxuICBhZGRSZWR1Y2VyKCkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxuXG4gIHJlbW92ZVJlZHVjZXIoKSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZnJlc2hlcyB0aGUgZXhpc3Rpbmcgc3RhdGUuXG4gICAqL1xuICByZWZyZXNoU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMubGFzdFN0YXRlKSB0aGlzLnNldFN0YXRlKHsgLi4udGhpcy5sYXN0U3RhdGUgfSk7XG4gIH1cbn1cbiJdfQ==