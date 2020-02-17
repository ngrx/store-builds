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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvbW9ja19zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFFTCxjQUFjLEVBQ2QsYUFBYSxFQUNiLGNBQWMsRUFDZCxLQUFLLEVBQ0wsY0FBYyxHQUdmLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUUxQyxJQUFJLE9BQU8sU0FBUyxLQUFLLFVBQVUsRUFBRTtJQUNuQyxTQUFTOzs7SUFBQyxHQUFHLEVBQUU7UUFDYixJQUFJOztrQkFDSSxTQUFTLEdBQTBCLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ2xFLElBQUksU0FBUyxFQUFFO2dCQUNiLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUM1QjtTQUNGO1FBQUMsV0FBTSxHQUFFO0lBQ1osQ0FBQyxFQUFDLENBQUM7Q0FDSjs7OztBQWFELE1BQU0sT0FBTyxTQUFzQixTQUFRLEtBQVE7Ozs7Ozs7O0lBTWpELFlBQ1UsTUFBb0IsRUFDNUIsZUFBK0IsRUFDL0IsY0FBOEIsRUFDQyxZQUFlLEVBQ3RCLGdCQUFnQyxFQUFFO1FBRTFELEtBQUssQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBTnZDLFdBQU0sR0FBTixNQUFNLENBQWM7UUFHRyxpQkFBWSxHQUFaLFlBQVksQ0FBRztRQVQvQixjQUFTLEdBQUcsSUFBSSxHQUFHLEVBQStCLENBQUM7UUFhbEUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RELEtBQUssTUFBTSxZQUFZLElBQUksYUFBYSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLFNBQVk7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs7Ozs7OztJQUVELGdCQUFnQixDQVNkLFFBQTJCLEVBQzNCLEtBQVk7UUFFWixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7O2NBRTlCLGNBQWMsR0FDbEIsT0FBTyxRQUFRLEtBQUssUUFBUTtZQUMxQixDQUFDLENBQUMsY0FBYzs7O1lBQUMsR0FBRyxFQUFFLEdBQUUsQ0FBQzs7O1lBQUUsR0FBVyxFQUFFLENBQUMsS0FBSyxFQUFDO1lBQy9DLENBQUMsQ0FBQyxRQUFRO1FBRWQsY0FBYyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVoQyxPQUFPLG1CQUFBLGNBQWMsRUFBeUMsQ0FBQztJQUNqRSxDQUFDOzs7O0lBRUQsY0FBYztRQUNaLEtBQUssTUFBTSxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM1QyxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtnQkFDaEMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNuQixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDeEI7U0FDRjtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQzs7Ozs7O0lBRUQsTUFBTSxDQUFDLFFBQWEsRUFBRSxJQUFVO1FBQzlCLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2hFLE9BQU8sSUFBSSxlQUFlLENBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUM3QixDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ2xCO1FBRUQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7O0lBRUQsVUFBVTtRQUNSLFVBQVU7SUFDWixDQUFDOzs7O0lBRUQsYUFBYTtRQUNYLFVBQVU7SUFDWixDQUFDOzs7OztJQUtELFlBQVk7UUFDVixJQUFJLElBQUksQ0FBQyxTQUFTO1lBQUUsSUFBSSxDQUFDLFFBQVEsbUJBQU0sSUFBSSxDQUFDLFNBQVMsRUFBRyxDQUFDO0lBQzNELENBQUM7OztZQXRGRixVQUFVOzs7O1lBekJGLFNBQVM7WUFSaEIsY0FBYztZQUVkLGNBQWM7NENBMENYLE1BQU0sU0FBQyxhQUFhO3dDQUNwQixNQUFNLFNBQUMsY0FBYzs7Ozs7OztJQVZ4Qiw4QkFBb0U7O0lBRXBFLG9DQUE2Qzs7Ozs7SUFDN0MsOEJBQXNCOzs7OztJQUdwQiwyQkFBNEI7Ozs7O0lBRzVCLGlDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGVzdEJlZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvdGVzdGluZyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIEFjdGlvbixcbiAgQWN0aW9uc1N1YmplY3QsXG4gIElOSVRJQUxfU1RBVEUsXG4gIFJlZHVjZXJNYW5hZ2VyLFxuICBTdG9yZSxcbiAgY3JlYXRlU2VsZWN0b3IsXG4gIE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHMsXG4gIE1lbW9pemVkU2VsZWN0b3IsXG59IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IE1vY2tTdGF0ZSB9IGZyb20gJy4vbW9ja19zdGF0ZSc7XG5pbXBvcnQgeyBNb2NrU2VsZWN0b3IgfSBmcm9tICcuL21vY2tfc2VsZWN0b3InO1xuaW1wb3J0IHsgTU9DS19TRUxFQ1RPUlMgfSBmcm9tICcuL3Rva2Vucyc7XG5cbmlmICh0eXBlb2YgYWZ0ZXJFYWNoID09PSAnZnVuY3Rpb24nKSB7XG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1vY2tTdG9yZTogTW9ja1N0b3JlIHwgdW5kZWZpbmVkID0gVGVzdEJlZC5pbmplY3QoTW9ja1N0b3JlKTtcbiAgICAgIGlmIChtb2NrU3RvcmUpIHtcbiAgICAgICAgbW9ja1N0b3JlLnJlc2V0U2VsZWN0b3JzKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7fVxuICB9KTtcbn1cblxudHlwZSBPbmx5TWVtb2l6ZWQ8VCwgUmVzdWx0PiA9IFQgZXh0ZW5kcyBzdHJpbmcgfCBNZW1vaXplZFNlbGVjdG9yPGFueSwgYW55PlxuICA/IE1lbW9pemVkU2VsZWN0b3I8YW55LCBSZXN1bHQ+XG4gIDogVCBleHRlbmRzIE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIGFueT5cbiAgICA/IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIFJlc3VsdD5cbiAgICA6IG5ldmVyO1xuXG50eXBlIE1lbW9pemVkPFJlc3VsdD4gPVxuICB8IE1lbW9pemVkU2VsZWN0b3I8YW55LCBSZXN1bHQ+XG4gIHwgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgUmVzdWx0PjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vY2tTdG9yZTxUID0gb2JqZWN0PiBleHRlbmRzIFN0b3JlPFQ+IHtcbiAgcHJpdmF0ZSByZWFkb25seSBzZWxlY3RvcnMgPSBuZXcgTWFwPE1lbW9pemVkPGFueT4gfCBzdHJpbmcsIGFueT4oKTtcblxuICByZWFkb25seSBzY2FubmVkQWN0aW9ucyQ6IE9ic2VydmFibGU8QWN0aW9uPjtcbiAgcHJpdmF0ZSBsYXN0U3RhdGU/OiBUO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc3RhdGUkOiBNb2NrU3RhdGU8VD4sXG4gICAgYWN0aW9uc09ic2VydmVyOiBBY3Rpb25zU3ViamVjdCxcbiAgICByZWR1Y2VyTWFuYWdlcjogUmVkdWNlck1hbmFnZXIsXG4gICAgQEluamVjdChJTklUSUFMX1NUQVRFKSBwcml2YXRlIGluaXRpYWxTdGF0ZTogVCxcbiAgICBASW5qZWN0KE1PQ0tfU0VMRUNUT1JTKSBtb2NrU2VsZWN0b3JzOiBNb2NrU2VsZWN0b3JbXSA9IFtdXG4gICkge1xuICAgIHN1cGVyKHN0YXRlJCwgYWN0aW9uc09ic2VydmVyLCByZWR1Y2VyTWFuYWdlcik7XG4gICAgdGhpcy5yZXNldFNlbGVjdG9ycygpO1xuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5pbml0aWFsU3RhdGUpO1xuICAgIHRoaXMuc2Nhbm5lZEFjdGlvbnMkID0gYWN0aW9uc09ic2VydmVyLmFzT2JzZXJ2YWJsZSgpO1xuICAgIGZvciAoY29uc3QgbW9ja1NlbGVjdG9yIG9mIG1vY2tTZWxlY3RvcnMpIHtcbiAgICAgIHRoaXMub3ZlcnJpZGVTZWxlY3Rvcihtb2NrU2VsZWN0b3Iuc2VsZWN0b3IsIG1vY2tTZWxlY3Rvci52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0U3RhdGUobmV4dFN0YXRlOiBUKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZSQubmV4dChuZXh0U3RhdGUpO1xuICAgIHRoaXMubGFzdFN0YXRlID0gbmV4dFN0YXRlO1xuICB9XG5cbiAgb3ZlcnJpZGVTZWxlY3RvcjxcbiAgICBTZWxlY3RvciBleHRlbmRzIE1lbW9pemVkPFJlc3VsdD4sXG4gICAgVmFsdWUgZXh0ZW5kcyBSZXN1bHQsXG4gICAgUmVzdWx0ID0gU2VsZWN0b3IgZXh0ZW5kcyBNZW1vaXplZFNlbGVjdG9yPGFueSwgaW5mZXIgVD5cbiAgICAgID8gVFxuICAgICAgOiBTZWxlY3RvciBleHRlbmRzIE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIGluZmVyIFU+XG4gICAgICAgID8gVVxuICAgICAgICA6IFZhbHVlXG4gID4oXG4gICAgc2VsZWN0b3I6IFNlbGVjdG9yIHwgc3RyaW5nLFxuICAgIHZhbHVlOiBWYWx1ZVxuICApOiBPbmx5TWVtb2l6ZWQ8dHlwZW9mIHNlbGVjdG9yLCBSZXN1bHQ+IHtcbiAgICB0aGlzLnNlbGVjdG9ycy5zZXQoc2VsZWN0b3IsIHZhbHVlKTtcblxuICAgIGNvbnN0IHJlc3VsdFNlbGVjdG9yOiBNZW1vaXplZDxSZXN1bHQ+ID1cbiAgICAgIHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBjcmVhdGVTZWxlY3RvcigoKSA9PiB7fSwgKCk6IFJlc3VsdCA9PiB2YWx1ZSlcbiAgICAgICAgOiBzZWxlY3RvcjtcblxuICAgIHJlc3VsdFNlbGVjdG9yLnNldFJlc3VsdCh2YWx1ZSk7XG5cbiAgICByZXR1cm4gcmVzdWx0U2VsZWN0b3IgYXMgT25seU1lbW9pemVkPHR5cGVvZiBzZWxlY3RvciwgUmVzdWx0PjtcbiAgfVxuXG4gIHJlc2V0U2VsZWN0b3JzKCkge1xuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgdGhpcy5zZWxlY3RvcnMua2V5cygpKSB7XG4gICAgICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgICAgICBzZWxlY3Rvci5yZWxlYXNlKCk7XG4gICAgICAgIHNlbGVjdG9yLmNsZWFyUmVzdWx0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RvcnMuY2xlYXIoKTtcbiAgfVxuXG4gIHNlbGVjdChzZWxlY3RvcjogYW55LCBwcm9wPzogYW55KSB7XG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycgJiYgdGhpcy5zZWxlY3RvcnMuaGFzKHNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihcbiAgICAgICAgdGhpcy5zZWxlY3RvcnMuZ2V0KHNlbGVjdG9yKVxuICAgICAgKS5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIuc2VsZWN0KHNlbGVjdG9yLCBwcm9wKTtcbiAgfVxuXG4gIGFkZFJlZHVjZXIoKSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgcmVtb3ZlUmVkdWNlcigpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaGVzIHRoZSBleGlzdGluZyBzdGF0ZS5cbiAgICovXG4gIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5sYXN0U3RhdGUpIHRoaXMuc2V0U3RhdGUoeyAuLi50aGlzLmxhc3RTdGF0ZSB9KTtcbiAgfVxufVxuIl19