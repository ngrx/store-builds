/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, queueScheduler, } from 'rxjs';
import { observeOn, scan, withLatestFrom } from 'rxjs/operators';
import { ActionsSubject, INIT } from './actions_subject';
import { ReducerObservable } from './reducer_manager';
import { ScannedActionsSubject } from './scanned_actions_subject';
import { INITIAL_STATE } from './tokens';
/**
 * @abstract
 */
export class StateObservable extends Observable {
}
/**
 * @template T
 */
export class State extends BehaviorSubject {
    /**
     * @param {?} actions$
     * @param {?} reducer$
     * @param {?} scannedActions
     * @param {?} initialState
     */
    constructor(actions$, reducer$, scannedActions, initialState) {
        super(initialState);
        /** @type {?} */
        const actionsOnQueue$ = actions$.pipe(observeOn(queueScheduler));
        /** @type {?} */
        const withLatestReducer$ = actionsOnQueue$.pipe(withLatestFrom(reducer$));
        /** @type {?} */
        const seed = { state: initialState };
        /** @type {?} */
        const stateAndAction$ = withLatestReducer$.pipe(scan(reduceState, seed));
        this.stateSubscription = stateAndAction$.subscribe(({ state, action }) => {
            this.next(state);
            scannedActions.next(action);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stateSubscription.unsubscribe();
        this.complete();
    }
}
State.INIT = INIT;
State.decorators = [
    { type: Injectable }
];
/** @nocollapse */
State.ctorParameters = () => [
    { type: ActionsSubject },
    { type: ReducerObservable },
    { type: ScannedActionsSubject },
    { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] }] }
];
if (false) {
    /** @type {?} */
    State.INIT;
    /** @type {?} */
    State.prototype.stateSubscription;
}
/** @typedef {?} */
var StateActionPair;
export { StateActionPair };
/**
 * @template T, V
 * @param {?=} stateActionPair
 * @param {?=} __1
 * @return {?}
 */
export function reduceState(stateActionPair = { state: undefined }, [action, reducer]) {
    const { state } = stateActionPair;
    return { state: reducer(state, action), action };
}
/** @type {?} */
export const STATE_PROVIDERS = [
    State,
    { provide: StateObservable, useExisting: State },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFDTCxlQUFlLEVBQ2YsVUFBVSxFQUNWLGNBQWMsR0FFZixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpFLE9BQU8sRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7OztBQUV6QyxNQUFNLHNCQUFnQyxTQUFRLFVBQWU7Q0FBRzs7OztBQUdoRSxNQUFNLFlBQWdCLFNBQVEsZUFBb0I7Ozs7Ozs7SUFLaEQsWUFDRSxRQUF3QixFQUN4QixRQUEyQixFQUMzQixjQUFxQyxFQUNkLFlBQWlCO1FBRXhDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQzs7UUFFcEIsTUFBTSxlQUFlLEdBQXVCLFFBQVEsQ0FBQyxJQUFJLENBQ3ZELFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FDMUIsQ0FBQzs7UUFDRixNQUFNLGtCQUFrQixHQUVwQixlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOztRQUVuRCxNQUFNLElBQUksR0FBdUIsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUM7O1FBQ3pELE1BQU0sZUFBZSxHQUdoQixrQkFBa0IsQ0FBQyxJQUFJLENBQzFCLElBQUksQ0FDRixXQUFXLEVBQ1gsSUFBSSxDQUNMLENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUN2RSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pCLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0IsQ0FBQyxDQUFDO0tBQ0o7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNqQjs7YUF2Q3NCLElBQUk7O1lBRjVCLFVBQVU7Ozs7WUFSRixjQUFjO1lBRWQsaUJBQWlCO1lBQ2pCLHFCQUFxQjs0Q0FlekIsTUFBTSxTQUFDLGFBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0N6QixNQUFNLHNCQUNKLGtCQUF5QyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFDN0QsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUEyQjtJQUUzQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsZUFBZSxDQUFDO0lBQ2xDLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQztDQUNsRDs7QUFFRCxhQUFhLGVBQWUsR0FBZTtJQUN6QyxLQUFLO0lBQ0wsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7Q0FDakQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQmVoYXZpb3JTdWJqZWN0LFxuICBPYnNlcnZhYmxlLFxuICBxdWV1ZVNjaGVkdWxlcixcbiAgU3Vic2NyaXB0aW9uLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG9ic2VydmVPbiwgc2Nhbiwgd2l0aExhdGVzdEZyb20gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFjdGlvbnNTdWJqZWN0LCBJTklUIH0gZnJvbSAnLi9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHsgQWN0aW9uLCBBY3Rpb25SZWR1Y2VyIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgUmVkdWNlck9ic2VydmFibGUgfSBmcm9tICcuL3JlZHVjZXJfbWFuYWdlcic7XG5pbXBvcnQgeyBTY2FubmVkQWN0aW9uc1N1YmplY3QgfSBmcm9tICcuL3NjYW5uZWRfYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7IElOSVRJQUxfU1RBVEUgfSBmcm9tICcuL3Rva2Vucyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdGF0ZU9ic2VydmFibGUgZXh0ZW5kcyBPYnNlcnZhYmxlPGFueT4ge31cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0YXRlPFQ+IGV4dGVuZHMgQmVoYXZpb3JTdWJqZWN0PGFueT4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBzdGF0aWMgcmVhZG9ubHkgSU5JVCA9IElOSVQ7XG5cbiAgcHJpdmF0ZSBzdGF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGFjdGlvbnMkOiBBY3Rpb25zU3ViamVjdCxcbiAgICByZWR1Y2VyJDogUmVkdWNlck9ic2VydmFibGUsXG4gICAgc2Nhbm5lZEFjdGlvbnM6IFNjYW5uZWRBY3Rpb25zU3ViamVjdCxcbiAgICBASW5qZWN0KElOSVRJQUxfU1RBVEUpIGluaXRpYWxTdGF0ZTogYW55XG4gICkge1xuICAgIHN1cGVyKGluaXRpYWxTdGF0ZSk7XG5cbiAgICBjb25zdCBhY3Rpb25zT25RdWV1ZSQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IGFjdGlvbnMkLnBpcGUoXG4gICAgICBvYnNlcnZlT24ocXVldWVTY2hlZHVsZXIpXG4gICAgKTtcbiAgICBjb25zdCB3aXRoTGF0ZXN0UmVkdWNlciQ6IE9ic2VydmFibGU8XG4gICAgICBbQWN0aW9uLCBBY3Rpb25SZWR1Y2VyPGFueSwgQWN0aW9uPl1cbiAgICA+ID0gYWN0aW9uc09uUXVldWUkLnBpcGUod2l0aExhdGVzdEZyb20ocmVkdWNlciQpKTtcblxuICAgIGNvbnN0IHNlZWQ6IFN0YXRlQWN0aW9uUGFpcjxUPiA9IHsgc3RhdGU6IGluaXRpYWxTdGF0ZSB9O1xuICAgIGNvbnN0IHN0YXRlQW5kQWN0aW9uJDogT2JzZXJ2YWJsZTx7XG4gICAgICBzdGF0ZTogYW55O1xuICAgICAgYWN0aW9uPzogQWN0aW9uO1xuICAgIH0+ID0gd2l0aExhdGVzdFJlZHVjZXIkLnBpcGUoXG4gICAgICBzY2FuPFtBY3Rpb24sIEFjdGlvblJlZHVjZXI8VCwgQWN0aW9uPl0sIFN0YXRlQWN0aW9uUGFpcjxUPj4oXG4gICAgICAgIHJlZHVjZVN0YXRlLFxuICAgICAgICBzZWVkXG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24gPSBzdGF0ZUFuZEFjdGlvbiQuc3Vic2NyaWJlKCh7IHN0YXRlLCBhY3Rpb24gfSkgPT4ge1xuICAgICAgdGhpcy5uZXh0KHN0YXRlKTtcbiAgICAgIHNjYW5uZWRBY3Rpb25zLm5leHQoYWN0aW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmNvbXBsZXRlKCk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgU3RhdGVBY3Rpb25QYWlyPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+ID0ge1xuICBzdGF0ZTogVCB8IHVuZGVmaW5lZDtcbiAgYWN0aW9uPzogVjtcbn07XG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlU3RhdGU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gIHN0YXRlQWN0aW9uUGFpcjogU3RhdGVBY3Rpb25QYWlyPFQsIFY+ID0geyBzdGF0ZTogdW5kZWZpbmVkIH0sXG4gIFthY3Rpb24sIHJlZHVjZXJdOiBbViwgQWN0aW9uUmVkdWNlcjxULCBWPl1cbik6IFN0YXRlQWN0aW9uUGFpcjxULCBWPiB7XG4gIGNvbnN0IHsgc3RhdGUgfSA9IHN0YXRlQWN0aW9uUGFpcjtcbiAgcmV0dXJuIHsgc3RhdGU6IHJlZHVjZXIoc3RhdGUsIGFjdGlvbiksIGFjdGlvbiB9O1xufVxuXG5leHBvcnQgY29uc3QgU1RBVEVfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICBTdGF0ZSxcbiAgeyBwcm92aWRlOiBTdGF0ZU9ic2VydmFibGUsIHVzZUV4aXN0aW5nOiBTdGF0ZSB9LFxuXTtcbiJdfQ==