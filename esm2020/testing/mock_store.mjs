import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INITIAL_STATE, Store, createSelector, } from '@ngrx/store';
import { MOCK_SELECTORS } from './tokens';
import * as i0 from "@angular/core";
import * as i1 from "./mock_state";
import * as i2 from "@ngrx/store";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvbW9ja19zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFHTCxhQUFhLEVBRWIsS0FBSyxFQUNMLGNBQWMsR0FHZixNQUFNLGFBQWEsQ0FBQztBQUdyQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFDOzs7O0FBYTFDLE1BQU0sT0FBTyxTQUFzQixTQUFRLEtBQVE7SUFNakQsWUFDVSxNQUFvQixFQUM1QixlQUErQixFQUMvQixjQUE4QixFQUNDLFlBQWUsRUFDdEIsZ0JBQWdDLEVBQUU7UUFFMUQsS0FBSyxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFOdkMsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQUdHLGlCQUFZLEdBQVosWUFBWSxDQUFHO1FBVC9CLGNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBK0IsQ0FBQztRQWFsRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEQsS0FBSyxNQUFNLFlBQVksSUFBSSxhQUFhLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQztJQUVELFFBQVEsQ0FBQyxTQUFZO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFRCxnQkFBZ0IsQ0FTZCxRQUEyQixFQUMzQixLQUFZO1FBRVosSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXBDLE1BQU0sY0FBYyxHQUNsQixPQUFPLFFBQVEsS0FBSyxRQUFRO1lBQzFCLENBQUMsQ0FBQyxjQUFjLENBQ1osR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUNSLEdBQVcsRUFBRSxDQUFDLEtBQUssQ0FDcEI7WUFDSCxDQUFDLENBQUMsUUFBUSxDQUFDO1FBRWYsY0FBYyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVoQyxPQUFPLGNBQXVELENBQUM7SUFDakUsQ0FBQztJQUVELGNBQWM7UUFDWixLQUFLLE1BQU0sUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDNUMsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7Z0JBQ2hDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbkIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3hCO1NBQ0Y7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFUSxNQUFNLENBQUMsUUFBYSxFQUFFLElBQVU7UUFDdkMsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDaEUsT0FBTyxJQUFJLGVBQWUsQ0FDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQzdCLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDbEI7UUFFRCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFUSxVQUFVO1FBQ2pCLFVBQVU7SUFDWixDQUFDO0lBRVEsYUFBYTtRQUNwQixVQUFVO0lBQ1osQ0FBQztJQUVEOztPQUVHO0lBQ0gsWUFBWTtRQUNWLElBQUksSUFBSSxDQUFDLFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs0SUF4RlUsU0FBUyx1R0FVVixhQUFhLGFBQ2IsY0FBYztnSkFYYixTQUFTOzJGQUFULFNBQVM7a0JBRHJCLFVBQVU7OzBCQVdOLE1BQU07MkJBQUMsYUFBYTs7MEJBQ3BCLE1BQU07MkJBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBBY3Rpb24sXG4gIEFjdGlvbnNTdWJqZWN0LFxuICBJTklUSUFMX1NUQVRFLFxuICBSZWR1Y2VyTWFuYWdlcixcbiAgU3RvcmUsXG4gIGNyZWF0ZVNlbGVjdG9yLFxuICBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzLFxuICBNZW1vaXplZFNlbGVjdG9yLFxufSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBNb2NrU3RhdGUgfSBmcm9tICcuL21vY2tfc3RhdGUnO1xuaW1wb3J0IHsgTW9ja1NlbGVjdG9yIH0gZnJvbSAnLi9tb2NrX3NlbGVjdG9yJztcbmltcG9ydCB7IE1PQ0tfU0VMRUNUT1JTIH0gZnJvbSAnLi90b2tlbnMnO1xuXG50eXBlIE9ubHlNZW1vaXplZDxULCBSZXN1bHQ+ID0gVCBleHRlbmRzIHN0cmluZyB8IE1lbW9pemVkU2VsZWN0b3I8YW55LCBhbnk+XG4gID8gTWVtb2l6ZWRTZWxlY3RvcjxhbnksIFJlc3VsdD5cbiAgOiBUIGV4dGVuZHMgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgYW55PlxuICA/IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIFJlc3VsdD5cbiAgOiBuZXZlcjtcblxudHlwZSBNZW1vaXplZDxSZXN1bHQ+ID1cbiAgfCBNZW1vaXplZFNlbGVjdG9yPGFueSwgUmVzdWx0PlxuICB8IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIFJlc3VsdD47XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2NrU3RvcmU8VCA9IG9iamVjdD4gZXh0ZW5kcyBTdG9yZTxUPiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc2VsZWN0b3JzID0gbmV3IE1hcDxNZW1vaXplZDxhbnk+IHwgc3RyaW5nLCBhbnk+KCk7XG5cbiAgcmVhZG9ubHkgc2Nhbm5lZEFjdGlvbnMkOiBPYnNlcnZhYmxlPEFjdGlvbj47XG4gIHByaXZhdGUgbGFzdFN0YXRlPzogVDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN0YXRlJDogTW9ja1N0YXRlPFQ+LFxuICAgIGFjdGlvbnNPYnNlcnZlcjogQWN0aW9uc1N1YmplY3QsXG4gICAgcmVkdWNlck1hbmFnZXI6IFJlZHVjZXJNYW5hZ2VyLFxuICAgIEBJbmplY3QoSU5JVElBTF9TVEFURSkgcHJpdmF0ZSBpbml0aWFsU3RhdGU6IFQsXG4gICAgQEluamVjdChNT0NLX1NFTEVDVE9SUykgbW9ja1NlbGVjdG9yczogTW9ja1NlbGVjdG9yW10gPSBbXVxuICApIHtcbiAgICBzdXBlcihzdGF0ZSQsIGFjdGlvbnNPYnNlcnZlciwgcmVkdWNlck1hbmFnZXIpO1xuICAgIHRoaXMucmVzZXRTZWxlY3RvcnMoKTtcbiAgICB0aGlzLnNldFN0YXRlKHRoaXMuaW5pdGlhbFN0YXRlKTtcbiAgICB0aGlzLnNjYW5uZWRBY3Rpb25zJCA9IGFjdGlvbnNPYnNlcnZlci5hc09ic2VydmFibGUoKTtcbiAgICBmb3IgKGNvbnN0IG1vY2tTZWxlY3RvciBvZiBtb2NrU2VsZWN0b3JzKSB7XG4gICAgICB0aGlzLm92ZXJyaWRlU2VsZWN0b3IobW9ja1NlbGVjdG9yLnNlbGVjdG9yLCBtb2NrU2VsZWN0b3IudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldFN0YXRlKG5leHRTdGF0ZTogVCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUkLm5leHQobmV4dFN0YXRlKTtcbiAgICB0aGlzLmxhc3RTdGF0ZSA9IG5leHRTdGF0ZTtcbiAgfVxuXG4gIG92ZXJyaWRlU2VsZWN0b3I8XG4gICAgU2VsZWN0b3IgZXh0ZW5kcyBNZW1vaXplZDxSZXN1bHQ+LFxuICAgIFZhbHVlIGV4dGVuZHMgUmVzdWx0LFxuICAgIFJlc3VsdCA9IFNlbGVjdG9yIGV4dGVuZHMgTWVtb2l6ZWRTZWxlY3RvcjxhbnksIGluZmVyIFQ+XG4gICAgICA/IFRcbiAgICAgIDogU2VsZWN0b3IgZXh0ZW5kcyBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBpbmZlciBVPlxuICAgICAgPyBVXG4gICAgICA6IFZhbHVlXG4gID4oXG4gICAgc2VsZWN0b3I6IFNlbGVjdG9yIHwgc3RyaW5nLFxuICAgIHZhbHVlOiBWYWx1ZVxuICApOiBPbmx5TWVtb2l6ZWQ8dHlwZW9mIHNlbGVjdG9yLCBSZXN1bHQ+IHtcbiAgICB0aGlzLnNlbGVjdG9ycy5zZXQoc2VsZWN0b3IsIHZhbHVlKTtcblxuICAgIGNvbnN0IHJlc3VsdFNlbGVjdG9yOiBNZW1vaXplZDxSZXN1bHQ+ID1cbiAgICAgIHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZydcbiAgICAgICAgPyBjcmVhdGVTZWxlY3RvcihcbiAgICAgICAgICAgICgpID0+IHt9LFxuICAgICAgICAgICAgKCk6IFJlc3VsdCA9PiB2YWx1ZVxuICAgICAgICAgIClcbiAgICAgICAgOiBzZWxlY3RvcjtcblxuICAgIHJlc3VsdFNlbGVjdG9yLnNldFJlc3VsdCh2YWx1ZSk7XG5cbiAgICByZXR1cm4gcmVzdWx0U2VsZWN0b3IgYXMgT25seU1lbW9pemVkPHR5cGVvZiBzZWxlY3RvciwgUmVzdWx0PjtcbiAgfVxuXG4gIHJlc2V0U2VsZWN0b3JzKCkge1xuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgdGhpcy5zZWxlY3RvcnMua2V5cygpKSB7XG4gICAgICBpZiAodHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgICAgICBzZWxlY3Rvci5yZWxlYXNlKCk7XG4gICAgICAgIHNlbGVjdG9yLmNsZWFyUmVzdWx0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RvcnMuY2xlYXIoKTtcbiAgfVxuXG4gIG92ZXJyaWRlIHNlbGVjdChzZWxlY3RvcjogYW55LCBwcm9wPzogYW55KSB7XG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycgJiYgdGhpcy5zZWxlY3RvcnMuaGFzKHNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihcbiAgICAgICAgdGhpcy5zZWxlY3RvcnMuZ2V0KHNlbGVjdG9yKVxuICAgICAgKS5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIuc2VsZWN0KHNlbGVjdG9yLCBwcm9wKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGFkZFJlZHVjZXIoKSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgb3ZlcnJpZGUgcmVtb3ZlUmVkdWNlcigpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaGVzIHRoZSBleGlzdGluZyBzdGF0ZS5cbiAgICovXG4gIHJlZnJlc2hTdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5sYXN0U3RhdGUpIHRoaXMuc2V0U3RhdGUoeyAuLi50aGlzLmxhc3RTdGF0ZSB9KTtcbiAgfVxufVxuIl19