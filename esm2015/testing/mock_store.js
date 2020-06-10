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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3J4L3N0b3JlL3Rlc3RpbmcvIiwic291cmNlcyI6WyJtb2NrX3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUVMLGNBQWMsRUFDZCxhQUFhLEVBQ2IsY0FBYyxFQUNkLEtBQUssRUFDTCxjQUFjLEdBR2YsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRTFDLElBQUksT0FBTyxTQUFTLEtBQUssVUFBVSxFQUFFO0lBQ25DLFNBQVM7OztJQUFDLEdBQUcsRUFBRTtRQUNiLElBQUk7O2tCQUNJLFNBQVMsR0FBMEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDbEUsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQzVCO1NBQ0Y7UUFBQyxXQUFNLEdBQUU7SUFDWixDQUFDLEVBQUMsQ0FBQztDQUNKOzs7O0FBYUQsTUFBTSxPQUFPLFNBQXNCLFNBQVEsS0FBUTs7Ozs7Ozs7SUFNakQsWUFDVSxNQUFvQixFQUM1QixlQUErQixFQUMvQixjQUE4QixFQUNDLFlBQWUsRUFDdEIsZ0JBQWdDLEVBQUU7UUFFMUQsS0FBSyxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFOdkMsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQUdHLGlCQUFZLEdBQVosWUFBWSxDQUFHO1FBVC9CLGNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBK0IsQ0FBQztRQWFsRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEQsS0FBSyxNQUFNLFlBQVksSUFBSSxhQUFhLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsU0FBWTtRQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDOzs7Ozs7O0lBRUQsZ0JBQWdCLENBU2QsUUFBMkIsRUFDM0IsS0FBWTtRQUVaLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQzs7Y0FFOUIsY0FBYyxHQUNsQixPQUFPLFFBQVEsS0FBSyxRQUFRO1lBQzFCLENBQUMsQ0FBQyxjQUFjOzs7WUFDWixHQUFHLEVBQUUsR0FBRSxDQUFDOzs7WUFDUixHQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQ3BCO1lBQ0gsQ0FBQyxDQUFDLFFBQVE7UUFFZCxjQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWhDLE9BQU8sbUJBQUEsY0FBYyxFQUF5QyxDQUFDO0lBQ2pFLENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1osS0FBSyxNQUFNLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzVDLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO2dCQUNoQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25CLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN4QjtTQUNGO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7Ozs7SUFFRCxNQUFNLENBQUMsUUFBYSxFQUFFLElBQVU7UUFDOUIsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDaEUsT0FBTyxJQUFJLGVBQWUsQ0FDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQzdCLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDbEI7UUFFRCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFRCxVQUFVO1FBQ1IsVUFBVTtJQUNaLENBQUM7Ozs7SUFFRCxhQUFhO1FBQ1gsVUFBVTtJQUNaLENBQUM7Ozs7O0lBS0QsWUFBWTtRQUNWLElBQUksSUFBSSxDQUFDLFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxtQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFHLENBQUM7SUFDM0QsQ0FBQzs7O1lBekZGLFVBQVU7Ozs7WUF6QkYsU0FBUztZQVJoQixjQUFjO1lBRWQsY0FBYzs0Q0EwQ1gsTUFBTSxTQUFDLGFBQWE7d0NBQ3BCLE1BQU0sU0FBQyxjQUFjOzs7Ozs7O0lBVnhCLDhCQUFvRTs7SUFFcEUsb0NBQTZDOzs7OztJQUM3Qyw4QkFBc0I7Ozs7O0lBR3BCLDJCQUE0Qjs7Ozs7SUFHNUIsaUNBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUZXN0QmVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgQWN0aW9uLFxuICBBY3Rpb25zU3ViamVjdCxcbiAgSU5JVElBTF9TVEFURSxcbiAgUmVkdWNlck1hbmFnZXIsXG4gIFN0b3JlLFxuICBjcmVhdGVTZWxlY3RvcixcbiAgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wcyxcbiAgTWVtb2l6ZWRTZWxlY3Rvcixcbn0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgTW9ja1N0YXRlIH0gZnJvbSAnLi9tb2NrX3N0YXRlJztcbmltcG9ydCB7IE1vY2tTZWxlY3RvciB9IGZyb20gJy4vbW9ja19zZWxlY3Rvcic7XG5pbXBvcnQgeyBNT0NLX1NFTEVDVE9SUyB9IGZyb20gJy4vdG9rZW5zJztcblxuaWYgKHR5cGVvZiBhZnRlckVhY2ggPT09ICdmdW5jdGlvbicpIHtcbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbW9ja1N0b3JlOiBNb2NrU3RvcmUgfCB1bmRlZmluZWQgPSBUZXN0QmVkLmluamVjdChNb2NrU3RvcmUpO1xuICAgICAgaWYgKG1vY2tTdG9yZSkge1xuICAgICAgICBtb2NrU3RvcmUucmVzZXRTZWxlY3RvcnMoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHt9XG4gIH0pO1xufVxuXG50eXBlIE9ubHlNZW1vaXplZDxULCBSZXN1bHQ+ID0gVCBleHRlbmRzIHN0cmluZyB8IE1lbW9pemVkU2VsZWN0b3I8YW55LCBhbnk+XG4gID8gTWVtb2l6ZWRTZWxlY3RvcjxhbnksIFJlc3VsdD5cbiAgOiBUIGV4dGVuZHMgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgYW55PlxuICA/IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIFJlc3VsdD5cbiAgOiBuZXZlcjtcblxudHlwZSBNZW1vaXplZDxSZXN1bHQ+ID1cbiAgfCBNZW1vaXplZFNlbGVjdG9yPGFueSwgUmVzdWx0PlxuICB8IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIFJlc3VsdD47XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2NrU3RvcmU8VCA9IG9iamVjdD4gZXh0ZW5kcyBTdG9yZTxUPiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc2VsZWN0b3JzID0gbmV3IE1hcDxNZW1vaXplZDxhbnk+IHwgc3RyaW5nLCBhbnk+KCk7XG5cbiAgcmVhZG9ubHkgc2Nhbm5lZEFjdGlvbnMkOiBPYnNlcnZhYmxlPEFjdGlvbj47XG4gIHByaXZhdGUgbGFzdFN0YXRlPzogVDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN0YXRlJDogTW9ja1N0YXRlPFQ+LFxuICAgIGFjdGlvbnNPYnNlcnZlcjogQWN0aW9uc1N1YmplY3QsXG4gICAgcmVkdWNlck1hbmFnZXI6IFJlZHVjZXJNYW5hZ2VyLFxuICAgIEBJbmplY3QoSU5JVElBTF9TVEFURSkgcHJpdmF0ZSBpbml0aWFsU3RhdGU6IFQsXG4gICAgQEluamVjdChNT0NLX1NFTEVDVE9SUykgbW9ja1NlbGVjdG9yczogTW9ja1NlbGVjdG9yW10gPSBbXVxuICApIHtcbiAgICBzdXBlcihzdGF0ZSQsIGFjdGlvbnNPYnNlcnZlciwgcmVkdWNlck1hbmFnZXIpO1xuICAgIHRoaXMucmVzZXRTZWxlY3RvcnMoKTtcbiAgICB0aGlzLnNldFN0YXRlKHRoaXMuaW5pdGlhbFN0YXRlKTtcbiAgICB0aGlzLnNjYW5uZWRBY3Rpb25zJCA9IGFjdGlvbnNPYnNlcnZlci5hc09ic2VydmFibGUoKTtcbiAgICBmb3IgKGNvbnN0IG1vY2tTZWxlY3RvciBvZiBtb2NrU2VsZWN0b3JzKSB7XG4gICAgICB0aGlzLm92ZXJyaWRlU2VsZWN0b3IobW9ja1NlbGVjdG9yLnNlbGVjdG9yLCBtb2NrU2VsZWN0b3IudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldFN0YXRlKG5leHRTdGF0ZTogVCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUkLm5leHQobmV4dFN0YXRlKTtcbiAgICB0aGlzLmxhc3RTdGF0ZSA9IG5leHRTdGF0ZTtcbiAgfVxuXG4gIG92ZXJyaWRlU2VsZWN0b3I8XG4gICAgU2VsZWN0b3IgZXh0ZW5kcyBNZW1vaXplZDxSZXN1bHQ+LFxuICAgIFZhbHVlIGV4dGVuZHMgUmVzdWx0LFxuICAgIFJlc3VsdCA9IFNlbGVjdG9yIGV4dGVuZHMgTWVtb2l6ZWRTZWxlY3RvcjxhbnksIGluZmVyIFQ+XG4gICAgICA/IFRcbiAgICAgIDogU2VsZWN0b3IgZXh0ZW5kcyBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBpbmZlciBVPlxuICAgICAgPyBVXG4gICAgICA6IFZhbHVlXG4gID4oXG4gICAgc2VsZWN0b3I6IFNlbGVjdG9yIHwgc3RyaW5nLFxuICAgIHZhbHVlOiBWYWx1ZVxuICApOiBPbmx5TWVtb2l6ZWQ8dHlwZW9mIHNlbGVjdG9yLCBSZXN1bHQ+IHtcbiAgICB0aGlzLnNlbGVjdG9ycy5zZXQoc2VsZWN0b3IsIHZhbHVlKTtcblxuICAgIGNvbnN0IHJlc3VsdFNlbGVjdG9yOiBNZW1vaXplZDxSZXN1bHQ+ID1cbiAgICAgIHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBjcmVhdGVTZWxlY3RvcihcbiAgICAgICAgICAgICgpID0+IHt9LFxuICAgICAgICAgICAgKCk6IFJlc3VsdCA9PiB2YWx1ZVxuICAgICAgICAgIClcbiAgICAgICAgOiBzZWxlY3RvcjtcblxuICAgIHJlc3VsdFNlbGVjdG9yLnNldFJlc3VsdCh2YWx1ZSk7XG5cbiAgICByZXR1cm4gcmVzdWx0U2VsZWN0b3IgYXMgT25seU1lbW9pemVkPHR5cGVvZiBzZWxlY3RvciwgUmVzdWx0PjtcbiAgfVxuXG4gIHJlc2V0U2VsZWN0b3JzKCkge1xuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgdGhpcy5zZWxlY3RvcnMua2V5cygpKSB7XG4gICAgICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgICAgICBzZWxlY3Rvci5yZWxlYXNlKCk7XG4gICAgICAgIHNlbGVjdG9yLmNsZWFyUmVzdWx0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RvcnMuY2xlYXIoKTtcbiAgfVxuXG4gIHNlbGVjdChzZWxlY3RvcjogYW55LCBwcm9wPzogYW55KSB7XG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycgJiYgdGhpcy5zZWxlY3RvcnMuaGFzKHNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihcbiAgICAgICAgdGhpcy5zZWxlY3RvcnMuZ2V0KHNlbGVjdG9yKVxuICAgICAgKS5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIuc2VsZWN0KHNlbGVjdG9yLCBwcm9wKTtcbiAgfVxuXG4gIGFkZFJlZHVjZXIoKSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgcmVtb3ZlUmVkdWNlcigpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaGVzIHRoZSBleGlzdGluZyBzdGF0ZS5cbiAgICovXG4gIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5sYXN0U3RhdGUpIHRoaXMuc2V0U3RhdGUoeyAuLi50aGlzLmxhc3RTdGF0ZSB9KTtcbiAgfVxufVxuIl19