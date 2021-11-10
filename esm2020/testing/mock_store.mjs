import { Inject, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { INITIAL_STATE, Store, createSelector, } from '@ngrx/store';
import { MOCK_SELECTORS } from './tokens';
import * as i0 from "@angular/core";
import * as i1 from "./mock_state";
import * as i2 from "@ngrx/store";
if (typeof afterEach === 'function') {
    afterEach(() => {
        try {
            const mockStore = TestBed.inject(MockStore);
            if (mockStore) {
                mockStore.resetSelectors();
            }
            // eslint-disable-next-line no-empty
        }
        catch { }
    });
}
export class MockStore extends Store {
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
    setState(nextState) {
        this.state$.next(nextState);
        this.lastState = nextState;
    }
    overrideSelector(selector, value) {
        this.selectors.set(selector, value);
        const resultSelector = typeof selector === 'string'
            ? createSelector(() => { }, () => value)
            : selector;
        resultSelector.setResult(value);
        return resultSelector;
    }
    resetSelectors() {
        for (const selector of this.selectors.keys()) {
            if (typeof selector !== 'string') {
                selector.release();
                selector.clearResult();
            }
        }
        this.selectors.clear();
    }
    select(selector, prop) {
        if (typeof selector === 'string' && this.selectors.has(selector)) {
            return new BehaviorSubject(this.selectors.get(selector)).asObservable();
        }
        return super.select(selector, prop);
    }
    addReducer() {
        /* noop */
    }
    removeReducer() {
        /* noop */
    }
    /**
     * Refreshes the existing state.
     */
    refreshState() {
        if (this.lastState)
            this.setState({ ...this.lastState });
    }
}
/** @nocollapse */ /** @nocollapse */ MockStore.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MockStore, deps: [{ token: i1.MockState }, { token: i2.ActionsSubject }, { token: i2.ReducerManager }, { token: INITIAL_STATE }, { token: MOCK_SELECTORS }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ MockStore.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MockStore });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MockStore, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MockState }, { type: i2.ActionsSubject }, { type: i2.ReducerManager }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [INITIAL_STATE]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MOCK_SELECTORS]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvbW9ja19zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDaEQsT0FBTyxFQUFjLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBR0wsYUFBYSxFQUViLEtBQUssRUFDTCxjQUFjLEdBR2YsTUFBTSxhQUFhLENBQUM7QUFHckIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7OztBQUUxQyxJQUFJLE9BQU8sU0FBUyxLQUFLLFVBQVUsRUFBRTtJQUNuQyxTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ2IsSUFBSTtZQUNGLE1BQU0sU0FBUyxHQUEwQixPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25FLElBQUksU0FBUyxFQUFFO2dCQUNiLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUM1QjtZQUNELG9DQUFvQztTQUNyQztRQUFDLE1BQU0sR0FBRTtJQUNaLENBQUMsQ0FBQyxDQUFDO0NBQ0o7QUFhRCxNQUFNLE9BQU8sU0FBc0IsU0FBUSxLQUFRO0lBTWpELFlBQ1UsTUFBb0IsRUFDNUIsZUFBK0IsRUFDL0IsY0FBOEIsRUFDQyxZQUFlLEVBQ3RCLGdCQUFnQyxFQUFFO1FBRTFELEtBQUssQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBTnZDLFdBQU0sR0FBTixNQUFNLENBQWM7UUFHRyxpQkFBWSxHQUFaLFlBQVksQ0FBRztRQVQvQixjQUFTLEdBQUcsSUFBSSxHQUFHLEVBQStCLENBQUM7UUFhbEUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RELEtBQUssTUFBTSxZQUFZLElBQUksYUFBYSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUM7SUFFRCxRQUFRLENBQUMsU0FBWTtRQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBRUQsZ0JBQWdCLENBU2QsUUFBMkIsRUFDM0IsS0FBWTtRQUVaLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVwQyxNQUFNLGNBQWMsR0FDbEIsT0FBTyxRQUFRLEtBQUssUUFBUTtZQUMxQixDQUFDLENBQUMsY0FBYyxDQUNaLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFDUixHQUFXLEVBQUUsQ0FBQyxLQUFLLENBQ3BCO1lBQ0gsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUVmLGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFaEMsT0FBTyxjQUF1RCxDQUFDO0lBQ2pFLENBQUM7SUFFRCxjQUFjO1FBQ1osS0FBSyxNQUFNLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzVDLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO2dCQUNoQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25CLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN4QjtTQUNGO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRVEsTUFBTSxDQUFDLFFBQWEsRUFBRSxJQUFVO1FBQ3ZDLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2hFLE9BQU8sSUFBSSxlQUFlLENBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUM3QixDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ2xCO1FBRUQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRVEsVUFBVTtRQUNqQixVQUFVO0lBQ1osQ0FBQztJQUVRLGFBQWE7UUFDcEIsVUFBVTtJQUNaLENBQUM7SUFFRDs7T0FFRztJQUNILFlBQVk7UUFDVixJQUFJLElBQUksQ0FBQyxTQUFTO1lBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7NElBeEZVLFNBQVMsdUdBVVYsYUFBYSxhQUNiLGNBQWM7Z0pBWGIsU0FBUzsyRkFBVCxTQUFTO2tCQURyQixVQUFVOzswQkFXTixNQUFNOzJCQUFDLGFBQWE7OzBCQUNwQixNQUFNOzJCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRlc3RCZWQgfSBmcm9tICdAYW5ndWxhci9jb3JlL3Rlc3RpbmcnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBBY3Rpb24sXG4gIEFjdGlvbnNTdWJqZWN0LFxuICBJTklUSUFMX1NUQVRFLFxuICBSZWR1Y2VyTWFuYWdlcixcbiAgU3RvcmUsXG4gIGNyZWF0ZVNlbGVjdG9yLFxuICBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzLFxuICBNZW1vaXplZFNlbGVjdG9yLFxufSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBNb2NrU3RhdGUgfSBmcm9tICcuL21vY2tfc3RhdGUnO1xuaW1wb3J0IHsgTW9ja1NlbGVjdG9yIH0gZnJvbSAnLi9tb2NrX3NlbGVjdG9yJztcbmltcG9ydCB7IE1PQ0tfU0VMRUNUT1JTIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5pZiAodHlwZW9mIGFmdGVyRWFjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtb2NrU3RvcmU6IE1vY2tTdG9yZSB8IHVuZGVmaW5lZCA9IFRlc3RCZWQuaW5qZWN0KE1vY2tTdG9yZSk7XG4gICAgICBpZiAobW9ja1N0b3JlKSB7XG4gICAgICAgIG1vY2tTdG9yZS5yZXNldFNlbGVjdG9ycygpO1xuICAgICAgfVxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gICAgfSBjYXRjaCB7fVxuICB9KTtcbn1cblxudHlwZSBPbmx5TWVtb2l6ZWQ8VCwgUmVzdWx0PiA9IFQgZXh0ZW5kcyBzdHJpbmcgfCBNZW1vaXplZFNlbGVjdG9yPGFueSwgYW55PlxuICA/IE1lbW9pemVkU2VsZWN0b3I8YW55LCBSZXN1bHQ+XG4gIDogVCBleHRlbmRzIE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIGFueT5cbiAgPyBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBSZXN1bHQ+XG4gIDogbmV2ZXI7XG5cbnR5cGUgTWVtb2l6ZWQ8UmVzdWx0PiA9XG4gIHwgTWVtb2l6ZWRTZWxlY3RvcjxhbnksIFJlc3VsdD5cbiAgfCBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBSZXN1bHQ+O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja1N0b3JlPFQgPSBvYmplY3Q+IGV4dGVuZHMgU3RvcmU8VD4ge1xuICBwcml2YXRlIHJlYWRvbmx5IHNlbGVjdG9ycyA9IG5ldyBNYXA8TWVtb2l6ZWQ8YW55PiB8IHN0cmluZywgYW55PigpO1xuXG4gIHJlYWRvbmx5IHNjYW5uZWRBY3Rpb25zJDogT2JzZXJ2YWJsZTxBY3Rpb24+O1xuICBwcml2YXRlIGxhc3RTdGF0ZT86IFQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzdGF0ZSQ6IE1vY2tTdGF0ZTxUPixcbiAgICBhY3Rpb25zT2JzZXJ2ZXI6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHJlZHVjZXJNYW5hZ2VyOiBSZWR1Y2VyTWFuYWdlcixcbiAgICBASW5qZWN0KElOSVRJQUxfU1RBVEUpIHByaXZhdGUgaW5pdGlhbFN0YXRlOiBULFxuICAgIEBJbmplY3QoTU9DS19TRUxFQ1RPUlMpIG1vY2tTZWxlY3RvcnM6IE1vY2tTZWxlY3RvcltdID0gW11cbiAgKSB7XG4gICAgc3VwZXIoc3RhdGUkLCBhY3Rpb25zT2JzZXJ2ZXIsIHJlZHVjZXJNYW5hZ2VyKTtcbiAgICB0aGlzLnJlc2V0U2VsZWN0b3JzKCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh0aGlzLmluaXRpYWxTdGF0ZSk7XG4gICAgdGhpcy5zY2FubmVkQWN0aW9ucyQgPSBhY3Rpb25zT2JzZXJ2ZXIuYXNPYnNlcnZhYmxlKCk7XG4gICAgZm9yIChjb25zdCBtb2NrU2VsZWN0b3Igb2YgbW9ja1NlbGVjdG9ycykge1xuICAgICAgdGhpcy5vdmVycmlkZVNlbGVjdG9yKG1vY2tTZWxlY3Rvci5zZWxlY3RvciwgbW9ja1NlbGVjdG9yLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBzZXRTdGF0ZShuZXh0U3RhdGU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlJC5uZXh0KG5leHRTdGF0ZSk7XG4gICAgdGhpcy5sYXN0U3RhdGUgPSBuZXh0U3RhdGU7XG4gIH1cblxuICBvdmVycmlkZVNlbGVjdG9yPFxuICAgIFNlbGVjdG9yIGV4dGVuZHMgTWVtb2l6ZWQ8UmVzdWx0PixcbiAgICBWYWx1ZSBleHRlbmRzIFJlc3VsdCxcbiAgICBSZXN1bHQgPSBTZWxlY3RvciBleHRlbmRzIE1lbW9pemVkU2VsZWN0b3I8YW55LCBpbmZlciBUPlxuICAgICAgPyBUXG4gICAgICA6IFNlbGVjdG9yIGV4dGVuZHMgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgaW5mZXIgVT5cbiAgICAgID8gVVxuICAgICAgOiBWYWx1ZVxuICA+KFxuICAgIHNlbGVjdG9yOiBTZWxlY3RvciB8IHN0cmluZyxcbiAgICB2YWx1ZTogVmFsdWVcbiAgKTogT25seU1lbW9pemVkPHR5cGVvZiBzZWxlY3RvciwgUmVzdWx0PiB7XG4gICAgdGhpcy5zZWxlY3RvcnMuc2V0KHNlbGVjdG9yLCB2YWx1ZSk7XG5cbiAgICBjb25zdCByZXN1bHRTZWxlY3RvcjogTWVtb2l6ZWQ8UmVzdWx0PiA9XG4gICAgICB0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnXG4gICAgICAgID8gY3JlYXRlU2VsZWN0b3IoXG4gICAgICAgICAgICAoKSA9PiB7fSxcbiAgICAgICAgICAgICgpOiBSZXN1bHQgPT4gdmFsdWVcbiAgICAgICAgICApXG4gICAgICAgIDogc2VsZWN0b3I7XG5cbiAgICByZXN1bHRTZWxlY3Rvci5zZXRSZXN1bHQodmFsdWUpO1xuXG4gICAgcmV0dXJuIHJlc3VsdFNlbGVjdG9yIGFzIE9ubHlNZW1vaXplZDx0eXBlb2Ygc2VsZWN0b3IsIFJlc3VsdD47XG4gIH1cblxuICByZXNldFNlbGVjdG9ycygpIHtcbiAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHRoaXMuc2VsZWN0b3JzLmtleXMoKSkge1xuICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgc2VsZWN0b3IucmVsZWFzZSgpO1xuICAgICAgICBzZWxlY3Rvci5jbGVhclJlc3VsdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0b3JzLmNsZWFyKCk7XG4gIH1cblxuICBvdmVycmlkZSBzZWxlY3Qoc2VsZWN0b3I6IGFueSwgcHJvcD86IGFueSkge1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnICYmIHRoaXMuc2VsZWN0b3JzLmhhcyhzZWxlY3RvcikpIHtcbiAgICAgIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4oXG4gICAgICAgIHRoaXMuc2VsZWN0b3JzLmdldChzZWxlY3RvcilcbiAgICAgICkuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLnNlbGVjdChzZWxlY3RvciwgcHJvcCk7XG4gIH1cblxuICBvdmVycmlkZSBhZGRSZWR1Y2VyKCkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxuXG4gIG92ZXJyaWRlIHJlbW92ZVJlZHVjZXIoKSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZnJlc2hlcyB0aGUgZXhpc3Rpbmcgc3RhdGUuXG4gICAqL1xuICByZWZyZXNoU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMubGFzdFN0YXRlKSB0aGlzLnNldFN0YXRlKHsgLi4udGhpcy5sYXN0U3RhdGUgfSk7XG4gIH1cbn1cbiJdfQ==