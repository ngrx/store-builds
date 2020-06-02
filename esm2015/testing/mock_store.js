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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3J4L3N0b3JlL3Rlc3RpbmcvIiwic291cmNlcyI6WyJtb2NrX3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUVMLGNBQWMsRUFDZCxhQUFhLEVBQ2IsY0FBYyxFQUNkLEtBQUssRUFDTCxjQUFjLEdBR2YsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRTFDLElBQUksT0FBTyxTQUFTLEtBQUssVUFBVSxFQUFFO0lBQ25DLFNBQVM7OztJQUFDLEdBQUcsRUFBRTtRQUNiLElBQUk7O2tCQUNJLFNBQVMsR0FBMEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDbEUsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQzVCO1NBQ0Y7UUFBQyxXQUFNLEdBQUU7SUFDWixDQUFDLEVBQUMsQ0FBQztDQUNKOzs7O0FBYUQsTUFBTSxPQUFPLFNBQXNCLFNBQVEsS0FBUTs7Ozs7Ozs7SUFNakQsWUFDVSxNQUFvQixFQUM1QixlQUErQixFQUMvQixjQUE4QixFQUNDLFlBQWUsRUFDdEIsZ0JBQWdDLEVBQUU7UUFFMUQsS0FBSyxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFOdkMsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQUdHLGlCQUFZLEdBQVosWUFBWSxDQUFHO1FBVC9CLGNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBK0IsQ0FBQztRQWFsRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEQsS0FBSyxNQUFNLFlBQVksSUFBSSxhQUFhLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsU0FBWTtRQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDOzs7Ozs7O0lBRUQsZ0JBQWdCLENBU2QsUUFBMkIsRUFDM0IsS0FBWTtRQUVaLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQzs7Y0FFOUIsY0FBYyxHQUNsQixPQUFPLFFBQVEsS0FBSyxRQUFRO1lBQzFCLENBQUMsQ0FBQyxjQUFjOzs7WUFBQyxHQUFHLEVBQUUsR0FBRSxDQUFDOzs7WUFBRSxHQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUM7WUFDL0MsQ0FBQyxDQUFDLFFBQVE7UUFFZCxjQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWhDLE9BQU8sbUJBQUEsY0FBYyxFQUF5QyxDQUFDO0lBQ2pFLENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1osS0FBSyxNQUFNLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzVDLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO2dCQUNoQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25CLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN4QjtTQUNGO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7Ozs7SUFFRCxNQUFNLENBQUMsUUFBYSxFQUFFLElBQVU7UUFDOUIsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDaEUsT0FBTyxJQUFJLGVBQWUsQ0FDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQzdCLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDbEI7UUFFRCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFRCxVQUFVO1FBQ1IsVUFBVTtJQUNaLENBQUM7Ozs7SUFFRCxhQUFhO1FBQ1gsVUFBVTtJQUNaLENBQUM7Ozs7O0lBS0QsWUFBWTtRQUNWLElBQUksSUFBSSxDQUFDLFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxtQkFBTSxJQUFJLENBQUMsU0FBUyxFQUFHLENBQUM7SUFDM0QsQ0FBQzs7O1lBdEZGLFVBQVU7Ozs7WUF6QkYsU0FBUztZQVJoQixjQUFjO1lBRWQsY0FBYzs0Q0EwQ1gsTUFBTSxTQUFDLGFBQWE7d0NBQ3BCLE1BQU0sU0FBQyxjQUFjOzs7Ozs7O0lBVnhCLDhCQUFvRTs7SUFFcEUsb0NBQTZDOzs7OztJQUM3Qyw4QkFBc0I7Ozs7O0lBR3BCLDJCQUE0Qjs7Ozs7SUFHNUIsaUNBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUZXN0QmVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgQWN0aW9uLFxuICBBY3Rpb25zU3ViamVjdCxcbiAgSU5JVElBTF9TVEFURSxcbiAgUmVkdWNlck1hbmFnZXIsXG4gIFN0b3JlLFxuICBjcmVhdGVTZWxlY3RvcixcbiAgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wcyxcbiAgTWVtb2l6ZWRTZWxlY3Rvcixcbn0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgTW9ja1N0YXRlIH0gZnJvbSAnLi9tb2NrX3N0YXRlJztcbmltcG9ydCB7IE1vY2tTZWxlY3RvciB9IGZyb20gJy4vbW9ja19zZWxlY3Rvcic7XG5pbXBvcnQgeyBNT0NLX1NFTEVDVE9SUyB9IGZyb20gJy4vdG9rZW5zJztcblxuaWYgKHR5cGVvZiBhZnRlckVhY2ggPT09ICdmdW5jdGlvbicpIHtcbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbW9ja1N0b3JlOiBNb2NrU3RvcmUgfCB1bmRlZmluZWQgPSBUZXN0QmVkLmluamVjdChNb2NrU3RvcmUpO1xuICAgICAgaWYgKG1vY2tTdG9yZSkge1xuICAgICAgICBtb2NrU3RvcmUucmVzZXRTZWxlY3RvcnMoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHt9XG4gIH0pO1xufVxuXG50eXBlIE9ubHlNZW1vaXplZDxULCBSZXN1bHQ+ID0gVCBleHRlbmRzIHN0cmluZyB8IE1lbW9pemVkU2VsZWN0b3I8YW55LCBhbnk+XG4gID8gTWVtb2l6ZWRTZWxlY3RvcjxhbnksIFJlc3VsdD5cbiAgOiBUIGV4dGVuZHMgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgYW55PlxuICAgID8gTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgUmVzdWx0PlxuICAgIDogbmV2ZXI7XG5cbnR5cGUgTWVtb2l6ZWQ8UmVzdWx0PiA9XG4gIHwgTWVtb2l6ZWRTZWxlY3RvcjxhbnksIFJlc3VsdD5cbiAgfCBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBSZXN1bHQ+O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja1N0b3JlPFQgPSBvYmplY3Q+IGV4dGVuZHMgU3RvcmU8VD4ge1xuICBwcml2YXRlIHJlYWRvbmx5IHNlbGVjdG9ycyA9IG5ldyBNYXA8TWVtb2l6ZWQ8YW55PiB8IHN0cmluZywgYW55PigpO1xuXG4gIHJlYWRvbmx5IHNjYW5uZWRBY3Rpb25zJDogT2JzZXJ2YWJsZTxBY3Rpb24+O1xuICBwcml2YXRlIGxhc3RTdGF0ZT86IFQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzdGF0ZSQ6IE1vY2tTdGF0ZTxUPixcbiAgICBhY3Rpb25zT2JzZXJ2ZXI6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHJlZHVjZXJNYW5hZ2VyOiBSZWR1Y2VyTWFuYWdlcixcbiAgICBASW5qZWN0KElOSVRJQUxfU1RBVEUpIHByaXZhdGUgaW5pdGlhbFN0YXRlOiBULFxuICAgIEBJbmplY3QoTU9DS19TRUxFQ1RPUlMpIG1vY2tTZWxlY3RvcnM6IE1vY2tTZWxlY3RvcltdID0gW11cbiAgKSB7XG4gICAgc3VwZXIoc3RhdGUkLCBhY3Rpb25zT2JzZXJ2ZXIsIHJlZHVjZXJNYW5hZ2VyKTtcbiAgICB0aGlzLnJlc2V0U2VsZWN0b3JzKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh0aGlzLmluaXRpYWxTdGF0ZSk7XG4gICAgdGhpcy5zY2FubmVkQWN0aW9ucyQgPSBhY3Rpb25zT2JzZXJ2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gICAgZm9yIChjb25zdCBtb2NrU2VsZWN0b3Igb2YgbW9ja1NlbGVjdG9ycykge1xuICAgICAgdGhpcy5vdmVycmlkZVNlbGVjdG9yKG1vY2tTZWxlY3Rvci5zZWxlY3RvciwgbW9ja1NlbGVjdG9yLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBzZXRTdGF0ZShuZXh0U3RhdGU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlJC5uZXh0KG5leHRTdGF0ZSk7XG4gICAgdGhpcy5sYXN0U3RhdGUgPSBuZXh0U3RhdGU7XG4gIH1cblxuICBvdmVycmlkZVNlbGVjdG9yPFxuICAgIFNlbGVjdG9yIGV4dGVuZHMgTWVtb2l6ZWQ8UmVzdWx0PixcbiAgICBWYWx1ZSBleHRlbmRzIFJlc3VsdCxcbiAgICBSZXN1bHQgPSBTZWxlY3RvciBleHRlbmRzIE1lbW9pemVkU2VsZWN0b3I8YW55LCBpbmZlciBUPlxuICAgICAgPyBUXG4gICAgICA6IFNlbGVjdG9yIGV4dGVuZHMgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgaW5mZXIgVT5cbiAgICAgICAgPyBVXG4gICAgICAgIDogVmFsdWVcbiAgPihcbiAgICBzZWxlY3RvcjogU2VsZWN0b3IgfCBzdHJpbmcsXG4gICAgdmFsdWU6IFZhbHVlXG4gICk6IE9ubHlNZW1vaXplZDx0eXBlb2Ygc2VsZWN0b3IsIFJlc3VsdD4ge1xuICAgIHRoaXMuc2VsZWN0b3JzLnNldChzZWxlY3RvciwgdmFsdWUpO1xuXG4gICAgY29uc3QgcmVzdWx0U2VsZWN0b3I6IE1lbW9pemVkPFJlc3VsdD4gPVxuICAgICAgdHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJ1xuICAgICAgICA/IGNyZWF0ZVNlbGVjdG9yKCgpID0+IHt9LCAoKTogUmVzdWx0ID0+IHZhbHVlKVxuICAgICAgICA6IHNlbGVjdG9yO1xuXG4gICAgcmVzdWx0U2VsZWN0b3Iuc2V0UmVzdWx0KHZhbHVlKTtcblxuICAgIHJldHVybiByZXN1bHRTZWxlY3RvciBhcyBPbmx5TWVtb2l6ZWQ8dHlwZW9mIHNlbGVjdG9yLCBSZXN1bHQ+O1xuICB9XG5cbiAgcmVzZXRTZWxlY3RvcnMoKSB7XG4gICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiB0aGlzLnNlbGVjdG9ycy5rZXlzKCkpIHtcbiAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHNlbGVjdG9yLnJlbGVhc2UoKTtcbiAgICAgICAgc2VsZWN0b3IuY2xlYXJSZXN1bHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdG9ycy5jbGVhcigpO1xuICB9XG5cbiAgc2VsZWN0KHNlbGVjdG9yOiBhbnksIHByb3A/OiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJyAmJiB0aGlzLnNlbGVjdG9ycy5oYXMoc2VsZWN0b3IpKSB7XG4gICAgICByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KFxuICAgICAgICB0aGlzLnNlbGVjdG9ycy5nZXQoc2VsZWN0b3IpXG4gICAgICApLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBzdXBlci5zZWxlY3Qoc2VsZWN0b3IsIHByb3ApO1xuICB9XG5cbiAgYWRkUmVkdWNlcigpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICByZW1vdmVSZWR1Y2VyKCkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZyZXNoZXMgdGhlIGV4aXN0aW5nIHN0YXRlLlxuICAgKi9cbiAgcmVmcmVzaFN0YXRlKCkge1xuICAgIGlmICh0aGlzLmxhc3RTdGF0ZSkgdGhpcy5zZXRTdGF0ZSh7IC4uLnRoaXMubGFzdFN0YXRlIH0pO1xuICB9XG59XG4iXX0=