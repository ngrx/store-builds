import { Inject, Injectable } from '@angular/core';
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
export class State extends BehaviorSubject {
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
    }
    ngOnDestroy() {
        this.stateSubscription.unsubscribe();
        this.complete();
    }
}
State.INIT = INIT;
/** @nocollapse */ /** @nocollapse */ State.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: State, deps: [{ token: i1.ActionsSubject }, { token: i2.ReducerObservable }, { token: i3.ScannedActionsSubject }, { token: INITIAL_STATE }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ State.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: State });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: State, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUNMLGVBQWUsRUFDZixVQUFVLEVBQ1YsY0FBYyxHQUVmLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakUsT0FBTyxFQUFrQixJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUl6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sVUFBVSxDQUFDOzs7OztBQUV6QyxNQUFNLE9BQWdCLGVBQWdCLFNBQVEsVUFBZTtDQUFHO0FBR2hFLE1BQU0sT0FBTyxLQUFTLFNBQVEsZUFBb0I7SUFLaEQsWUFDRSxRQUF3QixFQUN4QixRQUEyQixFQUMzQixjQUFxQyxFQUNkLFlBQWlCO1FBRXhDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVwQixNQUFNLGVBQWUsR0FBdUIsUUFBUSxDQUFDLElBQUksQ0FDdkQsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUMxQixDQUFDO1FBQ0YsTUFBTSxrQkFBa0IsR0FDdEIsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUVqRCxNQUFNLElBQUksR0FBdUIsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUM7UUFDekQsTUFBTSxlQUFlLEdBR2hCLGtCQUFrQixDQUFDLElBQUksQ0FDMUIsSUFBSSxDQUNGLFdBQVcsRUFDWCxJQUFJLENBQ0wsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ3ZFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakIsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFnQixDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7QUF0Q2UsVUFBSSxHQUFHLElBQUssQ0FBQTt3SUFEakIsS0FBSyxzSEFTTixhQUFhOzRJQVRaLEtBQUs7MkZBQUwsS0FBSztrQkFEakIsVUFBVTs7MEJBVU4sTUFBTTsyQkFBQyxhQUFhOztBQXFDekIsTUFBTSxVQUFVLFdBQVcsQ0FDekIsa0JBQXlDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUM3RCxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQTJCO0lBRTNDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxlQUFlLENBQUM7SUFDbEMsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQ25ELENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQWU7SUFDekMsS0FBSztJQUNMLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO0NBQ2pELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgT2JzZXJ2YWJsZSxcbiAgcXVldWVTY2hlZHVsZXIsXG4gIFN1YnNjcmlwdGlvbixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBvYnNlcnZlT24sIHNjYW4sIHdpdGhMYXRlc3RGcm9tIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBY3Rpb25zU3ViamVjdCwgSU5JVCB9IGZyb20gJy4vYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7IEFjdGlvbiwgQWN0aW9uUmVkdWNlciB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IFJlZHVjZXJPYnNlcnZhYmxlIH0gZnJvbSAnLi9yZWR1Y2VyX21hbmFnZXInO1xuaW1wb3J0IHsgU2Nhbm5lZEFjdGlvbnNTdWJqZWN0IH0gZnJvbSAnLi9zY2FubmVkX2FjdGlvbnNfc3ViamVjdCc7XG5pbXBvcnQgeyBJTklUSUFMX1NUQVRFIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RhdGVPYnNlcnZhYmxlIGV4dGVuZHMgT2JzZXJ2YWJsZTxhbnk+IHt9XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdGF0ZTxUPiBleHRlbmRzIEJlaGF2aW9yU3ViamVjdDxhbnk+IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgc3RhdGljIHJlYWRvbmx5IElOSVQgPSBJTklUO1xuXG4gIHByaXZhdGUgc3RhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBhY3Rpb25zJDogQWN0aW9uc1N1YmplY3QsXG4gICAgcmVkdWNlciQ6IFJlZHVjZXJPYnNlcnZhYmxlLFxuICAgIHNjYW5uZWRBY3Rpb25zOiBTY2FubmVkQWN0aW9uc1N1YmplY3QsXG4gICAgQEluamVjdChJTklUSUFMX1NUQVRFKSBpbml0aWFsU3RhdGU6IGFueVxuICApIHtcbiAgICBzdXBlcihpbml0aWFsU3RhdGUpO1xuXG4gICAgY29uc3QgYWN0aW9uc09uUXVldWUkOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSBhY3Rpb25zJC5waXBlKFxuICAgICAgb2JzZXJ2ZU9uKHF1ZXVlU2NoZWR1bGVyKVxuICAgICk7XG4gICAgY29uc3Qgd2l0aExhdGVzdFJlZHVjZXIkOiBPYnNlcnZhYmxlPFtBY3Rpb24sIEFjdGlvblJlZHVjZXI8YW55LCBBY3Rpb24+XT4gPVxuICAgICAgYWN0aW9uc09uUXVldWUkLnBpcGUod2l0aExhdGVzdEZyb20ocmVkdWNlciQpKTtcblxuICAgIGNvbnN0IHNlZWQ6IFN0YXRlQWN0aW9uUGFpcjxUPiA9IHsgc3RhdGU6IGluaXRpYWxTdGF0ZSB9O1xuICAgIGNvbnN0IHN0YXRlQW5kQWN0aW9uJDogT2JzZXJ2YWJsZTx7XG4gICAgICBzdGF0ZTogYW55O1xuICAgICAgYWN0aW9uPzogQWN0aW9uO1xuICAgIH0+ID0gd2l0aExhdGVzdFJlZHVjZXIkLnBpcGUoXG4gICAgICBzY2FuPFtBY3Rpb24sIEFjdGlvblJlZHVjZXI8VCwgQWN0aW9uPl0sIFN0YXRlQWN0aW9uUGFpcjxUPj4oXG4gICAgICAgIHJlZHVjZVN0YXRlLFxuICAgICAgICBzZWVkXG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24gPSBzdGF0ZUFuZEFjdGlvbiQuc3Vic2NyaWJlKCh7IHN0YXRlLCBhY3Rpb24gfSkgPT4ge1xuICAgICAgdGhpcy5uZXh0KHN0YXRlKTtcbiAgICAgIHNjYW5uZWRBY3Rpb25zLm5leHQoYWN0aW9uIGFzIEFjdGlvbik7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN0YXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jb21wbGV0ZSgpO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFN0YXRlQWN0aW9uUGFpcjxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiA9IHtcbiAgc3RhdGU6IFQgfCB1bmRlZmluZWQ7XG4gIGFjdGlvbj86IFY7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZVN0YXRlPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICBzdGF0ZUFjdGlvblBhaXI6IFN0YXRlQWN0aW9uUGFpcjxULCBWPiA9IHsgc3RhdGU6IHVuZGVmaW5lZCB9LFxuICBbYWN0aW9uLCByZWR1Y2VyXTogW1YsIEFjdGlvblJlZHVjZXI8VCwgVj5dXG4pOiBTdGF0ZUFjdGlvblBhaXI8VCwgVj4ge1xuICBjb25zdCB7IHN0YXRlIH0gPSBzdGF0ZUFjdGlvblBhaXI7XG4gIHJldHVybiB7IHN0YXRlOiByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pLCBhY3Rpb24gfTtcbn1cblxuZXhwb3J0IGNvbnN0IFNUQVRFX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAgU3RhdGUsXG4gIHsgcHJvdmlkZTogU3RhdGVPYnNlcnZhYmxlLCB1c2VFeGlzdGluZzogU3RhdGUgfSxcbl07XG4iXX0=