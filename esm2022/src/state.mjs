import { Inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, queueScheduler, } from 'rxjs';
import { observeOn, scan, withLatestFrom } from 'rxjs/operators';
import { INIT } from './actions_subject';
import { INITIAL_STATE } from './tokens';
import * as i0 from "@angular/core";
import * as i1 from "./actions_subject";
import * as i2 from "./reducer_manager";
import * as i3 from "./scanned_actions_subject";
export class StateObservable extends Observable {
}
class State extends BehaviorSubject {
    static { this.INIT = INIT; }
    constructor(actions$, reducer$, scannedActions, initialState) {
        super(initialState);
        const actionsOnQueue$ = actions$.pipe(observeOn(queueScheduler));
        const withLatestReducer$ = actionsOnQueue$.pipe(withLatestFrom(reducer$));
        const seed = { state: initialState };
        const stateAndAction$ = withLatestReducer$.pipe(scan(reduceState, seed));
        this.stateSubscription = stateAndAction$.subscribe(({ state, action }) => {
            this.next(state);
            scannedActions.next(action);
        });
        this.state = toSignal(this, { manualCleanup: true, requireSync: true });
    }
    ngOnDestroy() {
        this.stateSubscription.unsubscribe();
        this.complete();
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: State, deps: [{ token: i1.ActionsSubject }, { token: i2.ReducerObservable }, { token: i3.ScannedActionsSubject }, { token: INITIAL_STATE }], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: State }); }
}
export { State };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: State, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActionsSubject }, { type: i2.ReducerObservable }, { type: i3.ScannedActionsSubject }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [INITIAL_STATE]
                }] }]; } });
export function reduceState(stateActionPair = { state: undefined }, [action, reducer]) {
    const { state } = stateActionPair;
    return { state: reducer(state, action), action };
}
export const STATE_PROVIDERS = [
    State,
    { provide: StateObservable, useExisting: State },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBK0IsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sRUFDTCxlQUFlLEVBQ2YsVUFBVSxFQUNWLGNBQWMsR0FFZixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpFLE9BQU8sRUFBa0IsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFJekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7Ozs7QUFFekMsTUFBTSxPQUFnQixlQUFnQixTQUFRLFVBQWU7Q0FLNUQ7QUFFRCxNQUNhLEtBQVMsU0FBUSxlQUFvQjthQUNoQyxTQUFJLEdBQUcsSUFBSSxBQUFQLENBQVE7SUFTNUIsWUFDRSxRQUF3QixFQUN4QixRQUEyQixFQUMzQixjQUFxQyxFQUNkLFlBQWlCO1FBRXhDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVwQixNQUFNLGVBQWUsR0FBdUIsUUFBUSxDQUFDLElBQUksQ0FDdkQsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUMxQixDQUFDO1FBQ0YsTUFBTSxrQkFBa0IsR0FDdEIsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUVqRCxNQUFNLElBQUksR0FBdUIsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUM7UUFDekQsTUFBTSxlQUFlLEdBR2hCLGtCQUFrQixDQUFDLElBQUksQ0FDMUIsSUFBSSxDQUNGLFdBQVcsRUFDWCxJQUFJLENBQ0wsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ3ZFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakIsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFnQixDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO2lJQTlDVSxLQUFLLHNIQWNOLGFBQWE7cUlBZFosS0FBSzs7U0FBTCxLQUFLOzJGQUFMLEtBQUs7a0JBRGpCLFVBQVU7OzBCQWVOLE1BQU07MkJBQUMsYUFBYTs7QUF1Q3pCLE1BQU0sVUFBVSxXQUFXLENBQ3pCLGtCQUF5QyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFDN0QsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUEyQjtJQUUzQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsZUFBZSxDQUFDO0lBQ2xDLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQztBQUNuRCxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFlO0lBQ3pDLEtBQUs7SUFDTCxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtDQUNqRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFByb3ZpZGVyLCBTaWduYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRvU2lnbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHtcbiAgQmVoYXZpb3JTdWJqZWN0LFxuICBPYnNlcnZhYmxlLFxuICBxdWV1ZVNjaGVkdWxlcixcbiAgU3Vic2NyaXB0aW9uLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG9ic2VydmVPbiwgc2Nhbiwgd2l0aExhdGVzdEZyb20gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFjdGlvbnNTdWJqZWN0LCBJTklUIH0gZnJvbSAnLi9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHsgQWN0aW9uLCBBY3Rpb25SZWR1Y2VyIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgUmVkdWNlck9ic2VydmFibGUgfSBmcm9tICcuL3JlZHVjZXJfbWFuYWdlcic7XG5pbXBvcnQgeyBTY2FubmVkQWN0aW9uc1N1YmplY3QgfSBmcm9tICcuL3NjYW5uZWRfYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7IElOSVRJQUxfU1RBVEUgfSBmcm9tICcuL3Rva2Vucyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdGF0ZU9ic2VydmFibGUgZXh0ZW5kcyBPYnNlcnZhYmxlPGFueT4ge1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBhYnN0cmFjdCByZWFkb25seSBzdGF0ZTogU2lnbmFsPGFueT47XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdGF0ZTxUPiBleHRlbmRzIEJlaGF2aW9yU3ViamVjdDxhbnk+IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgc3RhdGljIHJlYWRvbmx5IElOSVQgPSBJTklUO1xuXG4gIHByaXZhdGUgc3RhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBwdWJsaWMgc3RhdGU6IFNpZ25hbDxUPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBhY3Rpb25zJDogQWN0aW9uc1N1YmplY3QsXG4gICAgcmVkdWNlciQ6IFJlZHVjZXJPYnNlcnZhYmxlLFxuICAgIHNjYW5uZWRBY3Rpb25zOiBTY2FubmVkQWN0aW9uc1N1YmplY3QsXG4gICAgQEluamVjdChJTklUSUFMX1NUQVRFKSBpbml0aWFsU3RhdGU6IGFueVxuICApIHtcbiAgICBzdXBlcihpbml0aWFsU3RhdGUpO1xuXG4gICAgY29uc3QgYWN0aW9uc09uUXVldWUkOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSBhY3Rpb25zJC5waXBlKFxuICAgICAgb2JzZXJ2ZU9uKHF1ZXVlU2NoZWR1bGVyKVxuICAgICk7XG4gICAgY29uc3Qgd2l0aExhdGVzdFJlZHVjZXIkOiBPYnNlcnZhYmxlPFtBY3Rpb24sIEFjdGlvblJlZHVjZXI8YW55LCBBY3Rpb24+XT4gPVxuICAgICAgYWN0aW9uc09uUXVldWUkLnBpcGUod2l0aExhdGVzdEZyb20ocmVkdWNlciQpKTtcblxuICAgIGNvbnN0IHNlZWQ6IFN0YXRlQWN0aW9uUGFpcjxUPiA9IHsgc3RhdGU6IGluaXRpYWxTdGF0ZSB9O1xuICAgIGNvbnN0IHN0YXRlQW5kQWN0aW9uJDogT2JzZXJ2YWJsZTx7XG4gICAgICBzdGF0ZTogYW55O1xuICAgICAgYWN0aW9uPzogQWN0aW9uO1xuICAgIH0+ID0gd2l0aExhdGVzdFJlZHVjZXIkLnBpcGUoXG4gICAgICBzY2FuPFtBY3Rpb24sIEFjdGlvblJlZHVjZXI8VCwgQWN0aW9uPl0sIFN0YXRlQWN0aW9uUGFpcjxUPj4oXG4gICAgICAgIHJlZHVjZVN0YXRlLFxuICAgICAgICBzZWVkXG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24gPSBzdGF0ZUFuZEFjdGlvbiQuc3Vic2NyaWJlKCh7IHN0YXRlLCBhY3Rpb24gfSkgPT4ge1xuICAgICAgdGhpcy5uZXh0KHN0YXRlKTtcbiAgICAgIHNjYW5uZWRBY3Rpb25zLm5leHQoYWN0aW9uIGFzIEFjdGlvbik7XG4gICAgfSk7XG5cbiAgICB0aGlzLnN0YXRlID0gdG9TaWduYWwodGhpcywgeyBtYW51YWxDbGVhbnVwOiB0cnVlLCByZXF1aXJlU3luYzogdHJ1ZSB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmNvbXBsZXRlKCk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgU3RhdGVBY3Rpb25QYWlyPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+ID0ge1xuICBzdGF0ZTogVCB8IHVuZGVmaW5lZDtcbiAgYWN0aW9uPzogVjtcbn07XG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlU3RhdGU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gIHN0YXRlQWN0aW9uUGFpcjogU3RhdGVBY3Rpb25QYWlyPFQsIFY+ID0geyBzdGF0ZTogdW5kZWZpbmVkIH0sXG4gIFthY3Rpb24sIHJlZHVjZXJdOiBbViwgQWN0aW9uUmVkdWNlcjxULCBWPl1cbik6IFN0YXRlQWN0aW9uUGFpcjxULCBWPiB7XG4gIGNvbnN0IHsgc3RhdGUgfSA9IHN0YXRlQWN0aW9uUGFpcjtcbiAgcmV0dXJuIHsgc3RhdGU6IHJlZHVjZXIoc3RhdGUsIGFjdGlvbiksIGFjdGlvbiB9O1xufVxuXG5leHBvcnQgY29uc3QgU1RBVEVfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICBTdGF0ZSxcbiAgeyBwcm92aWRlOiBTdGF0ZU9ic2VydmFibGUsIHVzZUV4aXN0aW5nOiBTdGF0ZSB9LFxuXTtcbiJdfQ==