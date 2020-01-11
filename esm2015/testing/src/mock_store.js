/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/testing/src/mock_store.ts
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
            const store = (/** @type {?} */ (TestBed.get(Store)));
            if (store && 'resetSelectors' in store) {
                store.resetSelectors();
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
    constructor(state$, actionsObserver, reducerManager, initialState, mockSelectors) {
        super(state$, actionsObserver, reducerManager);
        this.state$ = state$;
        this.initialState = initialState;
        this.resetSelectors();
        this.setState(this.initialState);
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
        this.lastState = nextState;
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
                selector.clearResult();
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
        if (typeof selector === 'string' && MockStore.selectors.has(selector)) {
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
    /**
     * Refreshes the existing state.
     * @return {?}
     */
    refreshState() {
        if (this.lastState)
            this.setState(Object.assign({}, this.lastState));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvbW9ja19zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFFTCxjQUFjLEVBQ2QsYUFBYSxFQUNiLGNBQWMsRUFDZCxLQUFLLEVBQ0wsY0FBYyxHQUdmLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUUxQyxJQUFJLE9BQU8sU0FBUyxLQUFLLFVBQVUsRUFBRTtJQUNuQyxTQUFTOzs7SUFBQyxHQUFHLEVBQUU7UUFDYixJQUFJOztrQkFDSSxLQUFLLEdBQUcsbUJBQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBa0I7WUFDbEQsSUFBSSxLQUFLLElBQUksZ0JBQWdCLElBQUksS0FBSyxFQUFFO2dCQUN0QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDeEI7U0FDRjtRQUFDLFdBQU0sR0FBRTtJQUNaLENBQUMsRUFBQyxDQUFDO0NBQ0o7Ozs7QUFHRCxNQUFNLE9BQU8sU0FBYSxTQUFRLEtBQVE7Ozs7Ozs7O0lBV3hDLFlBQ1UsTUFBb0IsRUFDNUIsZUFBK0IsRUFDL0IsY0FBOEIsRUFDQyxZQUFlLEVBQ3RCLGFBQThCO1FBRXRELEtBQUssQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBTnZDLFdBQU0sR0FBTixNQUFNLENBQWM7UUFHRyxpQkFB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NEI7Ozs7O0lBRzVCLGlDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGVzdEJlZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvdGVzdGluZyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIEFjdGlvbixcbiAgQWN0aW9uc1N1YmplY3QsXG4gIElOSVRJQUxfU1RBVEUsXG4gIFJlZHVjZXJNYW5hZ2VyLFxuICBTdG9yZSxcbiAgY3JlYXRlU2VsZWN0b3IsXG4gIE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHMsXG4gIE1lbW9pemVkU2VsZWN0b3IsXG59IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IE1vY2tTdGF0ZSB9IGZyb20gJy4vbW9ja19zdGF0ZSc7XG5pbXBvcnQgeyBNb2NrU2VsZWN0b3IgfSBmcm9tICcuL21vY2tfc2VsZWN0b3InO1xuaW1wb3J0IHsgTU9DS19TRUxFQ1RPUlMgfSBmcm9tICcuL3Rva2Vucyc7XG5cbmlmICh0eXBlb2YgYWZ0ZXJFYWNoID09PSAnZnVuY3Rpb24nKSB7XG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN0b3JlID0gVGVzdEJlZC5nZXQoU3RvcmUpIGFzIE1vY2tTdG9yZTxhbnk+O1xuICAgICAgaWYgKHN0b3JlICYmICdyZXNldFNlbGVjdG9ycycgaW4gc3RvcmUpIHtcbiAgICAgICAgc3RvcmUucmVzZXRTZWxlY3RvcnMoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHt9XG4gIH0pO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja1N0b3JlPFQ+IGV4dGVuZHMgU3RvcmU8VD4ge1xuICBzdGF0aWMgc2VsZWN0b3JzID0gbmV3IE1hcDxcbiAgICB8IHN0cmluZ1xuICAgIHwgTWVtb2l6ZWRTZWxlY3RvcjxhbnksIGFueT5cbiAgICB8IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIGFueT4sXG4gICAgYW55XG4gID4oKTtcblxuICBzY2FubmVkQWN0aW9ucyQ6IE9ic2VydmFibGU8QWN0aW9uPjtcbiAgcHJpdmF0ZSBsYXN0U3RhdGU/OiBUO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc3RhdGUkOiBNb2NrU3RhdGU8VD4sXG4gICAgYWN0aW9uc09ic2VydmVyOiBBY3Rpb25zU3ViamVjdCxcbiAgICByZWR1Y2VyTWFuYWdlcjogUmVkdWNlck1hbmFnZXIsXG4gICAgQEluamVjdChJTklUSUFMX1NUQVRFKSBwcml2YXRlIGluaXRpYWxTdGF0ZTogVCxcbiAgICBASW5qZWN0KE1PQ0tfU0VMRUNUT1JTKSBtb2NrU2VsZWN0b3JzPzogTW9ja1NlbGVjdG9yW11cbiAgKSB7XG4gICAgc3VwZXIoc3RhdGUkLCBhY3Rpb25zT2JzZXJ2ZXIsIHJlZHVjZXJNYW5hZ2VyKTtcbiAgICB0aGlzLnJlc2V0U2VsZWN0b3JzKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh0aGlzLmluaXRpYWxTdGF0ZSk7XG4gICAgdGhpcy5zY2FubmVkQWN0aW9ucyQgPSBhY3Rpb25zT2JzZXJ2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gICAgaWYgKG1vY2tTZWxlY3RvcnMpIHtcbiAgICAgIG1vY2tTZWxlY3RvcnMuZm9yRWFjaChtb2NrU2VsZWN0b3IgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IG1vY2tTZWxlY3Rvci5zZWxlY3RvcjtcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLm92ZXJyaWRlU2VsZWN0b3Ioc2VsZWN0b3IsIG1vY2tTZWxlY3Rvci52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vdmVycmlkZVNlbGVjdG9yKHNlbGVjdG9yLCBtb2NrU2VsZWN0b3IudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzZXRTdGF0ZShuZXh0U3RhdGU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlJC5uZXh0KG5leHRTdGF0ZSk7XG4gICAgdGhpcy5sYXN0U3RhdGUgPSBuZXh0U3RhdGU7XG4gIH1cblxuICBvdmVycmlkZVNlbGVjdG9yPFQsIFJlc3VsdD4oXG4gICAgc2VsZWN0b3I6IHN0cmluZyxcbiAgICB2YWx1ZTogUmVzdWx0XG4gICk6IE1lbW9pemVkU2VsZWN0b3I8c3RyaW5nLCBSZXN1bHQ+O1xuICBvdmVycmlkZVNlbGVjdG9yPFQsIFJlc3VsdD4oXG4gICAgc2VsZWN0b3I6IE1lbW9pemVkU2VsZWN0b3I8VCwgUmVzdWx0PixcbiAgICB2YWx1ZTogUmVzdWx0XG4gICk6IE1lbW9pemVkU2VsZWN0b3I8VCwgUmVzdWx0PjtcbiAgb3ZlcnJpZGVTZWxlY3RvcjxULCBSZXN1bHQ+KFxuICAgIHNlbGVjdG9yOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFQsIGFueSwgUmVzdWx0PixcbiAgICB2YWx1ZTogUmVzdWx0XG4gICk6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8VCwgYW55LCBSZXN1bHQ+O1xuICBvdmVycmlkZVNlbGVjdG9yPFQsIFJlc3VsdD4oXG4gICAgc2VsZWN0b3I6XG4gICAgICB8IHN0cmluZ1xuICAgICAgfCBNZW1vaXplZFNlbGVjdG9yPGFueSwgYW55PlxuICAgICAgfCBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBhbnk+LFxuICAgIHZhbHVlOiBhbnlcbiAgKSB7XG4gICAgTW9ja1N0b3JlLnNlbGVjdG9ycy5zZXQoc2VsZWN0b3IsIHZhbHVlKTtcblxuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBzdHJpbmdTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKCgpID0+IHt9LCAoKSA9PiB2YWx1ZSk7XG5cbiAgICAgIHJldHVybiBzdHJpbmdTZWxlY3RvcjtcbiAgICB9XG5cbiAgICBzZWxlY3Rvci5zZXRSZXN1bHQodmFsdWUpO1xuXG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9XG5cbiAgcmVzZXRTZWxlY3RvcnMoKSB7XG4gICAgTW9ja1N0b3JlLnNlbGVjdG9ycy5mb3JFYWNoKChfLCBzZWxlY3RvcikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgc2VsZWN0b3IucmVsZWFzZSgpO1xuICAgICAgICBzZWxlY3Rvci5jbGVhclJlc3VsdCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgTW9ja1N0b3JlLnNlbGVjdG9ycy5jbGVhcigpO1xuICB9XG5cbiAgc2VsZWN0KHNlbGVjdG9yOiBhbnksIHByb3A/OiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJyAmJiBNb2NrU3RvcmUuc2VsZWN0b3JzLmhhcyhzZWxlY3RvcikpIHtcbiAgICAgIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4oXG4gICAgICAgIE1vY2tTdG9yZS5zZWxlY3RvcnMuZ2V0KHNlbGVjdG9yKVxuICAgICAgKS5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIuc2VsZWN0KHNlbGVjdG9yLCBwcm9wKTtcbiAgfVxuXG4gIGFkZFJlZHVjZXIoKSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgcmVtb3ZlUmVkdWNlcigpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaGVzIHRoZSBleGlzdGluZyBzdGF0ZS5cbiAgICovXG4gIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5sYXN0U3RhdGUpIHRoaXMuc2V0U3RhdGUoeyAuLi50aGlzLmxhc3RTdGF0ZSB9KTtcbiAgfVxufVxuIl19