/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvbW9ja19zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFBYyxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUVMLGNBQWMsRUFDZCxhQUFhLEVBQ2IsY0FBYyxFQUNkLEtBQUssRUFDTCxjQUFjLEdBR2YsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRTFDLElBQUksT0FBTyxTQUFTLEtBQUssVUFBVSxFQUFFO0lBQ25DLFNBQVM7OztJQUFDLEdBQUcsRUFBRTtRQUNiLElBQUk7O2tCQUNJLEtBQUssR0FBRyxtQkFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFrQjtZQUNsRCxJQUFJLEtBQUssSUFBSSxnQkFBZ0IsSUFBSSxLQUFLLEVBQUU7Z0JBQ3RDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN4QjtTQUNGO1FBQUMsV0FBTSxHQUFFO0lBQ1osQ0FBQyxFQUFDLENBQUM7Q0FDSjs7OztBQUdELE1BQU0sT0FBTyxTQUFhLFNBQVEsS0FBUTs7Ozs7Ozs7SUFVeEMsWUFDVSxNQUFvQixFQUM1QixlQUErQixFQUMvQixjQUE4QixFQUNDLFlBQWUsRUFDdEIsYUFBOEI7UUFFdEQsS0FBSyxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFOdkMsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQUdHLGlCQUFZLEdBQVosWUFBWSxDQUFHO1FBSTlDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEQsSUFBSSxhQUFhLEVBQUU7WUFDakIsYUFBYSxDQUFDLE9BQU87Ozs7WUFBQyxZQUFZLENBQUMsRUFBRTs7c0JBQzdCLFFBQVEsR0FBRyxZQUFZLENBQUMsUUFBUTtnQkFDdEMsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7b0JBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNyRDtxQkFBTTtvQkFDTCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDckQ7WUFDSCxDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsU0FBWTtRQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7Ozs7O0lBY0QsZ0JBQWdCLENBQ2QsUUFHNEMsRUFDNUMsS0FBVTtRQUVWLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV6QyxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTs7a0JBQzFCLGNBQWMsR0FBRyxjQUFjOzs7WUFBQyxHQUFHLEVBQUUsR0FBRSxDQUFDOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUM7WUFFNUQsT0FBTyxjQUFjLENBQUM7U0FDdkI7UUFFRCxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTFCLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1osU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPOzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQzFDLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO2dCQUNoQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25CLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUN0QjtRQUNILENBQUMsRUFBQyxDQUFDO1FBRUgsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7Ozs7SUFFRCxNQUFNLENBQUMsUUFBYSxFQUFFLElBQVU7UUFDOUIsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNyQyxPQUFPLElBQUksZUFBZSxDQUN4QixTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FDbEMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNsQjtRQUVELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVELFVBQVU7UUFDUixVQUFVO0lBQ1osQ0FBQzs7OztJQUVELGFBQWE7UUFDWCxVQUFVO0lBQ1osQ0FBQzs7QUEvRk0sbUJBQVMsR0FBRyxJQUFJLEdBQUcsRUFLdkIsQ0FBQzs7WUFQTCxVQUFVOzs7O1lBZkYsU0FBUztZQVJoQixjQUFjO1lBRWQsY0FBYzs0Q0FvQ1gsTUFBTSxTQUFDLGFBQWE7d0NBQ3BCLE1BQU0sU0FBQyxjQUFjOzs7O0lBZHhCLG9CQUtJOztJQUVKLG9DQUEyQzs7Ozs7SUFHekMsMkJBQTRCOzs7OztJQUc1QixpQ0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRlc3RCZWQgfSBmcm9tICdAYW5ndWxhci9jb3JlL3Rlc3RpbmcnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBBY3Rpb24sXG4gIEFjdGlvbnNTdWJqZWN0LFxuICBJTklUSUFMX1NUQVRFLFxuICBSZWR1Y2VyTWFuYWdlcixcbiAgU3RvcmUsXG4gIGNyZWF0ZVNlbGVjdG9yLFxuICBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzLFxuICBNZW1vaXplZFNlbGVjdG9yLFxufSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBNb2NrU3RhdGUgfSBmcm9tICcuL21vY2tfc3RhdGUnO1xuaW1wb3J0IHsgTW9ja1NlbGVjdG9yIH0gZnJvbSAnLi9tb2NrX3NlbGVjdG9yJztcbmltcG9ydCB7IE1PQ0tfU0VMRUNUT1JTIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5pZiAodHlwZW9mIGFmdGVyRWFjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdG9yZSA9IFRlc3RCZWQuZ2V0KFN0b3JlKSBhcyBNb2NrU3RvcmU8YW55PjtcbiAgICAgIGlmIChzdG9yZSAmJiAncmVzZXRTZWxlY3RvcnMnIGluIHN0b3JlKSB7XG4gICAgICAgIHN0b3JlLnJlc2V0U2VsZWN0b3JzKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7fVxuICB9KTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vY2tTdG9yZTxUPiBleHRlbmRzIFN0b3JlPFQ+IHtcbiAgc3RhdGljIHNlbGVjdG9ycyA9IG5ldyBNYXA8XG4gICAgfCBzdHJpbmdcbiAgICB8IE1lbW9pemVkU2VsZWN0b3I8YW55LCBhbnk+XG4gICAgfCBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBhbnk+LFxuICAgIGFueVxuICA+KCk7XG5cbiAgcHVibGljIHNjYW5uZWRBY3Rpb25zJDogT2JzZXJ2YWJsZTxBY3Rpb24+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc3RhdGUkOiBNb2NrU3RhdGU8VD4sXG4gICAgYWN0aW9uc09ic2VydmVyOiBBY3Rpb25zU3ViamVjdCxcbiAgICByZWR1Y2VyTWFuYWdlcjogUmVkdWNlck1hbmFnZXIsXG4gICAgQEluamVjdChJTklUSUFMX1NUQVRFKSBwcml2YXRlIGluaXRpYWxTdGF0ZTogVCxcbiAgICBASW5qZWN0KE1PQ0tfU0VMRUNUT1JTKSBtb2NrU2VsZWN0b3JzPzogTW9ja1NlbGVjdG9yW11cbiAgKSB7XG4gICAgc3VwZXIoc3RhdGUkLCBhY3Rpb25zT2JzZXJ2ZXIsIHJlZHVjZXJNYW5hZ2VyKTtcbiAgICB0aGlzLnJlc2V0U2VsZWN0b3JzKCk7XG4gICAgdGhpcy5zdGF0ZSQubmV4dCh0aGlzLmluaXRpYWxTdGF0ZSk7XG4gICAgdGhpcy5zY2FubmVkQWN0aW9ucyQgPSBhY3Rpb25zT2JzZXJ2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gICAgaWYgKG1vY2tTZWxlY3RvcnMpIHtcbiAgICAgIG1vY2tTZWxlY3RvcnMuZm9yRWFjaChtb2NrU2VsZWN0b3IgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IG1vY2tTZWxlY3Rvci5zZWxlY3RvcjtcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLm92ZXJyaWRlU2VsZWN0b3Ioc2VsZWN0b3IsIG1vY2tTZWxlY3Rvci52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vdmVycmlkZVNlbGVjdG9yKHNlbGVjdG9yLCBtb2NrU2VsZWN0b3IudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzZXRTdGF0ZShuZXh0U3RhdGU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlJC5uZXh0KG5leHRTdGF0ZSk7XG4gIH1cblxuICBvdmVycmlkZVNlbGVjdG9yPFQsIFJlc3VsdD4oXG4gICAgc2VsZWN0b3I6IHN0cmluZyxcbiAgICB2YWx1ZTogUmVzdWx0XG4gICk6IE1lbW9pemVkU2VsZWN0b3I8c3RyaW5nLCBSZXN1bHQ+O1xuICBvdmVycmlkZVNlbGVjdG9yPFQsIFJlc3VsdD4oXG4gICAgc2VsZWN0b3I6IE1lbW9pemVkU2VsZWN0b3I8VCwgUmVzdWx0PixcbiAgICB2YWx1ZTogUmVzdWx0XG4gICk6IE1lbW9pemVkU2VsZWN0b3I8VCwgUmVzdWx0PjtcbiAgb3ZlcnJpZGVTZWxlY3RvcjxULCBSZXN1bHQ+KFxuICAgIHNlbGVjdG9yOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFQsIGFueSwgUmVzdWx0PixcbiAgICB2YWx1ZTogUmVzdWx0XG4gICk6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8VCwgYW55LCBSZXN1bHQ+O1xuICBvdmVycmlkZVNlbGVjdG9yPFQsIFJlc3VsdD4oXG4gICAgc2VsZWN0b3I6XG4gICAgICB8IHN0cmluZ1xuICAgICAgfCBNZW1vaXplZFNlbGVjdG9yPGFueSwgYW55PlxuICAgICAgfCBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBhbnk+LFxuICAgIHZhbHVlOiBhbnlcbiAgKSB7XG4gICAgTW9ja1N0b3JlLnNlbGVjdG9ycy5zZXQoc2VsZWN0b3IsIHZhbHVlKTtcblxuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBzdHJpbmdTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKCgpID0+IHt9LCAoKSA9PiB2YWx1ZSk7XG5cbiAgICAgIHJldHVybiBzdHJpbmdTZWxlY3RvcjtcbiAgICB9XG5cbiAgICBzZWxlY3Rvci5zZXRSZXN1bHQodmFsdWUpO1xuXG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9XG5cbiAgcmVzZXRTZWxlY3RvcnMoKSB7XG4gICAgTW9ja1N0b3JlLnNlbGVjdG9ycy5mb3JFYWNoKChfLCBzZWxlY3RvcikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgc2VsZWN0b3IucmVsZWFzZSgpO1xuICAgICAgICBzZWxlY3Rvci5zZXRSZXN1bHQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1vY2tTdG9yZS5zZWxlY3RvcnMuY2xlYXIoKTtcbiAgfVxuXG4gIHNlbGVjdChzZWxlY3RvcjogYW55LCBwcm9wPzogYW55KSB7XG4gICAgaWYgKE1vY2tTdG9yZS5zZWxlY3RvcnMuaGFzKHNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihcbiAgICAgICAgTW9ja1N0b3JlLnNlbGVjdG9ycy5nZXQoc2VsZWN0b3IpXG4gICAgICApLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBzdXBlci5zZWxlY3Qoc2VsZWN0b3IsIHByb3ApO1xuICB9XG5cbiAgYWRkUmVkdWNlcigpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICByZW1vdmVSZWR1Y2VyKCkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxufVxuIl19