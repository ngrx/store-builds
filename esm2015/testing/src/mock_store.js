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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvbW9ja19zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFFTCxjQUFjLEVBQ2QsYUFBYSxFQUNiLGNBQWMsRUFDZCxLQUFLLEVBQ0wsY0FBYyxHQUdmLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUUxQyxJQUFJLE9BQU8sU0FBUyxLQUFLLFVBQVUsRUFBRTtJQUNuQyxTQUFTOzs7SUFBQyxHQUFHLEVBQUU7UUFDYixJQUFJOztrQkFDSSxLQUFLLEdBQUcsbUJBQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBa0I7WUFDbEQsSUFBSSxLQUFLLElBQUksZ0JBQWdCLElBQUksS0FBSyxFQUFFO2dCQUN0QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDeEI7U0FDRjtRQUFDLFdBQU0sR0FBRTtJQUNaLENBQUMsRUFBQyxDQUFDO0NBQ0o7Ozs7QUFHRCxNQUFNLE9BQU8sU0FBc0IsU0FBUSxLQUFROzs7Ozs7OztJQVdqRCxZQUNVLE1BQW9CLEVBQzVCLGVBQStCLEVBQy9CLGNBQThCLEVBQ0MsWUFBZSxFQUN0QixhQUE4QjtRQUV0RCxLQUFLLENBQUMsTUFBTSxFQUFFLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQztRQU52QyxXQUFNLEdBQU4sTUFBTSxDQUFjO1FBR0csaUJB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QTRCOzs7OztJQUc1QixpQ0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRlc3RCZWQgfSBmcm9tICdAYW5ndWxhci9jb3JlL3Rlc3RpbmcnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBBY3Rpb24sXG4gIEFjdGlvbnNTdWJqZWN0LFxuICBJTklUSUFMX1NUQVRFLFxuICBSZWR1Y2VyTWFuYWdlcixcbiAgU3RvcmUsXG4gIGNyZWF0ZVNlbGVjdG9yLFxuICBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzLFxuICBNZW1vaXplZFNlbGVjdG9yLFxufSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBNb2NrU3RhdGUgfSBmcm9tICcuL21vY2tfc3RhdGUnO1xuaW1wb3J0IHsgTW9ja1NlbGVjdG9yIH0gZnJvbSAnLi9tb2NrX3NlbGVjdG9yJztcbmltcG9ydCB7IE1PQ0tfU0VMRUNUT1JTIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5pZiAodHlwZW9mIGFmdGVyRWFjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdG9yZSA9IFRlc3RCZWQuZ2V0KFN0b3JlKSBhcyBNb2NrU3RvcmU8YW55PjtcbiAgICAgIGlmIChzdG9yZSAmJiAncmVzZXRTZWxlY3RvcnMnIGluIHN0b3JlKSB7XG4gICAgICAgIHN0b3JlLnJlc2V0U2VsZWN0b3JzKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7fVxuICB9KTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vY2tTdG9yZTxUID0gb2JqZWN0PiBleHRlbmRzIFN0b3JlPFQ+IHtcbiAgc3RhdGljIHNlbGVjdG9ycyA9IG5ldyBNYXA8XG4gICAgfCBzdHJpbmdcbiAgICB8IE1lbW9pemVkU2VsZWN0b3I8YW55LCBhbnk+XG4gICAgfCBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBhbnk+LFxuICAgIGFueVxuICA+KCk7XG5cbiAgc2Nhbm5lZEFjdGlvbnMkOiBPYnNlcnZhYmxlPEFjdGlvbj47XG4gIHByaXZhdGUgbGFzdFN0YXRlPzogVDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN0YXRlJDogTW9ja1N0YXRlPFQ+LFxuICAgIGFjdGlvbnNPYnNlcnZlcjogQWN0aW9uc1N1YmplY3QsXG4gICAgcmVkdWNlck1hbmFnZXI6IFJlZHVjZXJNYW5hZ2VyLFxuICAgIEBJbmplY3QoSU5JVElBTF9TVEFURSkgcHJpdmF0ZSBpbml0aWFsU3RhdGU6IFQsXG4gICAgQEluamVjdChNT0NLX1NFTEVDVE9SUykgbW9ja1NlbGVjdG9ycz86IE1vY2tTZWxlY3RvcltdXG4gICkge1xuICAgIHN1cGVyKHN0YXRlJCwgYWN0aW9uc09ic2VydmVyLCByZWR1Y2VyTWFuYWdlcik7XG4gICAgdGhpcy5yZXNldFNlbGVjdG9ycygpO1xuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5pbml0aWFsU3RhdGUpO1xuICAgIHRoaXMuc2Nhbm5lZEFjdGlvbnMkID0gYWN0aW9uc09ic2VydmVyLmFzT2JzZXJ2YWJsZSgpO1xuICAgIGlmIChtb2NrU2VsZWN0b3JzKSB7XG4gICAgICBtb2NrU2VsZWN0b3JzLmZvckVhY2gobW9ja1NlbGVjdG9yID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBtb2NrU2VsZWN0b3Iuc2VsZWN0b3I7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5vdmVycmlkZVNlbGVjdG9yKHNlbGVjdG9yLCBtb2NrU2VsZWN0b3IudmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub3ZlcnJpZGVTZWxlY3RvcihzZWxlY3RvciwgbW9ja1NlbGVjdG9yLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0U3RhdGUobmV4dFN0YXRlOiBUKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZSQubmV4dChuZXh0U3RhdGUpO1xuICAgIHRoaXMubGFzdFN0YXRlID0gbmV4dFN0YXRlO1xuICB9XG5cbiAgb3ZlcnJpZGVTZWxlY3RvcjxULCBSZXN1bHQ+KFxuICAgIHNlbGVjdG9yOiBzdHJpbmcsXG4gICAgdmFsdWU6IFJlc3VsdFxuICApOiBNZW1vaXplZFNlbGVjdG9yPHN0cmluZywgUmVzdWx0PjtcbiAgb3ZlcnJpZGVTZWxlY3RvcjxULCBSZXN1bHQ+KFxuICAgIHNlbGVjdG9yOiBNZW1vaXplZFNlbGVjdG9yPFQsIFJlc3VsdD4sXG4gICAgdmFsdWU6IFJlc3VsdFxuICApOiBNZW1vaXplZFNlbGVjdG9yPFQsIFJlc3VsdD47XG4gIG92ZXJyaWRlU2VsZWN0b3I8VCwgUmVzdWx0PihcbiAgICBzZWxlY3RvcjogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxULCBhbnksIFJlc3VsdD4sXG4gICAgdmFsdWU6IFJlc3VsdFxuICApOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFQsIGFueSwgUmVzdWx0PjtcbiAgb3ZlcnJpZGVTZWxlY3RvcjxULCBSZXN1bHQ+KFxuICAgIHNlbGVjdG9yOlxuICAgICAgfCBzdHJpbmdcbiAgICAgIHwgTWVtb2l6ZWRTZWxlY3RvcjxhbnksIGFueT5cbiAgICAgIHwgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgYW55PixcbiAgICB2YWx1ZTogYW55XG4gICkge1xuICAgIE1vY2tTdG9yZS5zZWxlY3RvcnMuc2V0KHNlbGVjdG9yLCB2YWx1ZSk7XG5cbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3Qgc3RyaW5nU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcigoKSA9PiB7fSwgKCkgPT4gdmFsdWUpO1xuXG4gICAgICByZXR1cm4gc3RyaW5nU2VsZWN0b3I7XG4gICAgfVxuXG4gICAgc2VsZWN0b3Iuc2V0UmVzdWx0KHZhbHVlKTtcblxuICAgIHJldHVybiBzZWxlY3RvcjtcbiAgfVxuXG4gIHJlc2V0U2VsZWN0b3JzKCkge1xuICAgIE1vY2tTdG9yZS5zZWxlY3RvcnMuZm9yRWFjaCgoXywgc2VsZWN0b3IpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHNlbGVjdG9yLnJlbGVhc2UoKTtcbiAgICAgICAgc2VsZWN0b3IuY2xlYXJSZXN1bHQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE1vY2tTdG9yZS5zZWxlY3RvcnMuY2xlYXIoKTtcbiAgfVxuXG4gIHNlbGVjdChzZWxlY3RvcjogYW55LCBwcm9wPzogYW55KSB7XG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycgJiYgTW9ja1N0b3JlLnNlbGVjdG9ycy5oYXMoc2VsZWN0b3IpKSB7XG4gICAgICByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KFxuICAgICAgICBNb2NrU3RvcmUuc2VsZWN0b3JzLmdldChzZWxlY3RvcilcbiAgICAgICkuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLnNlbGVjdChzZWxlY3RvciwgcHJvcCk7XG4gIH1cblxuICBhZGRSZWR1Y2VyKCkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxuXG4gIHJlbW92ZVJlZHVjZXIoKSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZnJlc2hlcyB0aGUgZXhpc3Rpbmcgc3RhdGUuXG4gICAqL1xuICByZWZyZXNoU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMubGFzdFN0YXRlKSB0aGlzLnNldFN0YXRlKHsgLi4udGhpcy5sYXN0U3RhdGUgfSk7XG4gIH1cbn1cbiJdfQ==