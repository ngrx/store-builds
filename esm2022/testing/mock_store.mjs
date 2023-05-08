import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INITIAL_STATE, Store, createSelector, } from '@ngrx/store';
import { MOCK_SELECTORS } from './tokens';
import * as i0 from "@angular/core";
import * as i1 from "./mock_state";
import * as i2 from "@ngrx/store";
class MockStore extends Store {
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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: MockStore, deps: [{ token: i1.MockState }, { token: i2.ActionsSubject }, { token: i2.ReducerManager }, { token: INITIAL_STATE }, { token: MOCK_SELECTORS }], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: MockStore }); }
}
export { MockStore };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: MockStore, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MockState }, { type: i2.ActionsSubject }, { type: i2.ReducerManager }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [INITIAL_STATE]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MOCK_SELECTORS]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvbW9ja19zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFHTCxhQUFhLEVBRWIsS0FBSyxFQUNMLGNBQWMsR0FHZixNQUFNLGFBQWEsQ0FBQztBQUdyQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFDOzs7O0FBWTFDLE1BQ2EsU0FBc0IsU0FBUSxLQUFRO0lBTWpELFlBQ1UsTUFBb0IsRUFDNUIsZUFBK0IsRUFDL0IsY0FBOEIsRUFDQyxZQUFlLEVBQ3RCLGdCQUFnQyxFQUFFO1FBRTFELEtBQUssQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBTnZDLFdBQU0sR0FBTixNQUFNLENBQWM7UUFHRyxpQkFBWSxHQUFaLFlBQVksQ0FBRztRQVQvQixjQUFTLEdBQUcsSUFBSSxHQUFHLEVBQStCLENBQUM7UUFhbEUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RELEtBQUssTUFBTSxZQUFZLElBQUksYUFBYSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUM7SUFFRCxRQUFRLENBQUMsU0FBWTtRQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBRUQsZ0JBQWdCLENBU2QsUUFBMkIsRUFDM0IsS0FBWTtRQUVaLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVwQyxNQUFNLGNBQWMsR0FDbEIsT0FBTyxRQUFRLEtBQUssUUFBUTtZQUMxQixDQUFDLENBQUMsY0FBYyxDQUNaLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFDUixHQUFXLEVBQUUsQ0FBQyxLQUFLLENBQ3BCO1lBQ0gsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUVmLGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFaEMsT0FBTyxjQUF1RCxDQUFDO0lBQ2pFLENBQUM7SUFFRCxjQUFjO1FBQ1osS0FBSyxNQUFNLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzVDLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO2dCQUNoQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25CLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN4QjtTQUNGO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRVEsTUFBTSxDQUFDLFFBQWEsRUFBRSxJQUFVO1FBQ3ZDLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2hFLE9BQU8sSUFBSSxlQUFlLENBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUM3QixDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ2xCO1FBRUQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRVEsVUFBVTtRQUNqQixVQUFVO0lBQ1osQ0FBQztJQUVRLGFBQWE7UUFDcEIsVUFBVTtJQUNaLENBQUM7SUFFRDs7T0FFRztJQUNILFlBQVk7UUFDVixJQUFJLElBQUksQ0FBQyxTQUFTO1lBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztpSUF4RlUsU0FBUyx1R0FVVixhQUFhLGFBQ2IsY0FBYztxSUFYYixTQUFTOztTQUFULFNBQVM7MkZBQVQsU0FBUztrQkFEckIsVUFBVTs7MEJBV04sTUFBTTsyQkFBQyxhQUFhOzswQkFDcEIsTUFBTTsyQkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIEFjdGlvbixcbiAgQWN0aW9uc1N1YmplY3QsXG4gIElOSVRJQUxfU1RBVEUsXG4gIFJlZHVjZXJNYW5hZ2VyLFxuICBTdG9yZSxcbiAgY3JlYXRlU2VsZWN0b3IsXG4gIE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHMsXG4gIE1lbW9pemVkU2VsZWN0b3IsXG59IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IE1vY2tTdGF0ZSB9IGZyb20gJy4vbW9ja19zdGF0ZSc7XG5pbXBvcnQgeyBNb2NrU2VsZWN0b3IgfSBmcm9tICcuL21vY2tfc2VsZWN0b3InO1xuaW1wb3J0IHsgTU9DS19TRUxFQ1RPUlMgfSBmcm9tICcuL3Rva2Vucyc7XG5cbnR5cGUgT25seU1lbW9pemVkPFQsIFJlc3VsdD4gPSBUIGV4dGVuZHMgc3RyaW5nIHwgTWVtb2l6ZWRTZWxlY3RvcjxhbnksIGFueT5cbiAgPyBNZW1vaXplZFNlbGVjdG9yPGFueSwgUmVzdWx0PlxuICA6IFQgZXh0ZW5kcyBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBhbnk+XG4gID8gTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgUmVzdWx0PlxuICA6IG5ldmVyO1xuXG50eXBlIE1lbW9pemVkPFJlc3VsdD4gPVxuICB8IE1lbW9pemVkU2VsZWN0b3I8YW55LCBSZXN1bHQ+XG4gIHwgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgUmVzdWx0PjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vY2tTdG9yZTxUID0gb2JqZWN0PiBleHRlbmRzIFN0b3JlPFQ+IHtcbiAgcHJpdmF0ZSByZWFkb25seSBzZWxlY3RvcnMgPSBuZXcgTWFwPE1lbW9pemVkPGFueT4gfCBzdHJpbmcsIGFueT4oKTtcblxuICByZWFkb25seSBzY2FubmVkQWN0aW9ucyQ6IE9ic2VydmFibGU8QWN0aW9uPjtcbiAgcHJpdmF0ZSBsYXN0U3RhdGU/OiBUO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc3RhdGUkOiBNb2NrU3RhdGU8VD4sXG4gICAgYWN0aW9uc09ic2VydmVyOiBBY3Rpb25zU3ViamVjdCxcbiAgICByZWR1Y2VyTWFuYWdlcjogUmVkdWNlck1hbmFnZXIsXG4gICAgQEluamVjdChJTklUSUFMX1NUQVRFKSBwcml2YXRlIGluaXRpYWxTdGF0ZTogVCxcbiAgICBASW5qZWN0KE1PQ0tfU0VMRUNUT1JTKSBtb2NrU2VsZWN0b3JzOiBNb2NrU2VsZWN0b3JbXSA9IFtdXG4gICkge1xuICAgIHN1cGVyKHN0YXRlJCwgYWN0aW9uc09ic2VydmVyLCByZWR1Y2VyTWFuYWdlcik7XG4gICAgdGhpcy5yZXNldFNlbGVjdG9ycygpO1xuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5pbml0aWFsU3RhdGUpO1xuICAgIHRoaXMuc2Nhbm5lZEFjdGlvbnMkID0gYWN0aW9uc09ic2VydmVyLmFzT2JzZXJ2YWJsZSgpO1xuICAgIGZvciAoY29uc3QgbW9ja1NlbGVjdG9yIG9mIG1vY2tTZWxlY3RvcnMpIHtcbiAgICAgIHRoaXMub3ZlcnJpZGVTZWxlY3Rvcihtb2NrU2VsZWN0b3Iuc2VsZWN0b3IsIG1vY2tTZWxlY3Rvci52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0U3RhdGUobmV4dFN0YXRlOiBUKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZSQubmV4dChuZXh0U3RhdGUpO1xuICAgIHRoaXMubGFzdFN0YXRlID0gbmV4dFN0YXRlO1xuICB9XG5cbiAgb3ZlcnJpZGVTZWxlY3RvcjxcbiAgICBTZWxlY3RvciBleHRlbmRzIE1lbW9pemVkPFJlc3VsdD4sXG4gICAgVmFsdWUgZXh0ZW5kcyBSZXN1bHQsXG4gICAgUmVzdWx0ID0gU2VsZWN0b3IgZXh0ZW5kcyBNZW1vaXplZFNlbGVjdG9yPGFueSwgaW5mZXIgVD5cbiAgICAgID8gVFxuICAgICAgOiBTZWxlY3RvciBleHRlbmRzIE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8YW55LCBhbnksIGluZmVyIFU+XG4gICAgICA/IFVcbiAgICAgIDogVmFsdWVcbiAgPihcbiAgICBzZWxlY3RvcjogU2VsZWN0b3IgfCBzdHJpbmcsXG4gICAgdmFsdWU6IFZhbHVlXG4gICk6IE9ubHlNZW1vaXplZDx0eXBlb2Ygc2VsZWN0b3IsIFJlc3VsdD4ge1xuICAgIHRoaXMuc2VsZWN0b3JzLnNldChzZWxlY3RvciwgdmFsdWUpO1xuXG4gICAgY29uc3QgcmVzdWx0U2VsZWN0b3I6IE1lbW9pemVkPFJlc3VsdD4gPVxuICAgICAgdHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJ1xuICAgICAgICA/IGNyZWF0ZVNlbGVjdG9yKFxuICAgICAgICAgICAgKCkgPT4ge30sXG4gICAgICAgICAgICAoKTogUmVzdWx0ID0+IHZhbHVlXG4gICAgICAgICAgKVxuICAgICAgICA6IHNlbGVjdG9yO1xuXG4gICAgcmVzdWx0U2VsZWN0b3Iuc2V0UmVzdWx0KHZhbHVlKTtcblxuICAgIHJldHVybiByZXN1bHRTZWxlY3RvciBhcyBPbmx5TWVtb2l6ZWQ8dHlwZW9mIHNlbGVjdG9yLCBSZXN1bHQ+O1xuICB9XG5cbiAgcmVzZXRTZWxlY3RvcnMoKSB7XG4gICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiB0aGlzLnNlbGVjdG9ycy5rZXlzKCkpIHtcbiAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHNlbGVjdG9yLnJlbGVhc2UoKTtcbiAgICAgICAgc2VsZWN0b3IuY2xlYXJSZXN1bHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdG9ycy5jbGVhcigpO1xuICB9XG5cbiAgb3ZlcnJpZGUgc2VsZWN0KHNlbGVjdG9yOiBhbnksIHByb3A/OiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJyAmJiB0aGlzLnNlbGVjdG9ycy5oYXMoc2VsZWN0b3IpKSB7XG4gICAgICByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KFxuICAgICAgICB0aGlzLnNlbGVjdG9ycy5nZXQoc2VsZWN0b3IpXG4gICAgICApLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBzdXBlci5zZWxlY3Qoc2VsZWN0b3IsIHByb3ApO1xuICB9XG5cbiAgb3ZlcnJpZGUgYWRkUmVkdWNlcigpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICBvdmVycmlkZSByZW1vdmVSZWR1Y2VyKCkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZyZXNoZXMgdGhlIGV4aXN0aW5nIHN0YXRlLlxuICAgKi9cbiAgcmVmcmVzaFN0YXRlKCkge1xuICAgIGlmICh0aGlzLmxhc3RTdGF0ZSkgdGhpcy5zZXRTdGF0ZSh7IC4uLnRoaXMubGFzdFN0YXRlIH0pO1xuICB9XG59XG4iXX0=