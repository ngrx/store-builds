var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, queueScheduler, } from 'rxjs';
import { observeOn, scan, withLatestFrom } from 'rxjs/operators';
import { ActionsSubject, INIT } from './actions_subject';
import { ReducerObservable } from './reducer_manager';
import { ScannedActionsSubject } from './scanned_actions_subject';
import { INITIAL_STATE } from './tokens';
var StateObservable = /** @class */ (function (_super) {
    __extends(StateObservable, _super);
    function StateObservable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StateObservable;
}(Observable));
export { StateObservable };
var State = /** @class */ (function (_super) {
    __extends(State, _super);
    function State(actions$, reducer$, scannedActions, initialState) {
        var _this = _super.call(this, initialState) || this;
        var actionsOnQueue$ = actions$.pipe(observeOn(queueScheduler));
        var withLatestReducer$ = actionsOnQueue$.pipe(withLatestFrom(reducer$));
        var seed = { state: initialState };
        var stateAndAction$ = withLatestReducer$.pipe(scan(reduceState, seed));
        _this.stateSubscription = stateAndAction$.subscribe(function (_a) {
            var state = _a.state, action = _a.action;
            _this.next(state);
            scannedActions.next(action);
        });
        return _this;
    }
    State.prototype.ngOnDestroy = function () {
        this.stateSubscription.unsubscribe();
        this.complete();
    };
    State.INIT = INIT;
    State.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    State.ctorParameters = function () { return [
        { type: ActionsSubject },
        { type: ReducerObservable },
        { type: ScannedActionsSubject },
        { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] }] }
    ]; };
    return State;
}(BehaviorSubject));
export { State };
export function reduceState(stateActionPair, _a) {
    if (stateActionPair === void 0) { stateActionPair = { state: undefined }; }
    var _b = __read(_a, 2), action = _b[0], reducer = _b[1];
    var state = stateActionPair.state;
    return { state: reducer(state, action), action: action };
}
export var STATE_PROVIDERS = [
    State,
    { provide: StateObservable, useExisting: State },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQ0wsZUFBZSxFQUNmLFVBQVUsRUFDVixjQUFjLEdBRWYsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRSxPQUFPLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXpELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFekM7SUFBOEMsbUNBQWU7SUFBN0Q7O0lBQStELENBQUM7SUFBRCxzQkFBQztBQUFELENBQUMsQUFBaEUsQ0FBOEMsVUFBVSxHQUFROztBQUVoRTtJQUM4Qix5QkFBb0I7SUFLaEQsZUFDRSxRQUF3QixFQUN4QixRQUEyQixFQUMzQixjQUFxQyxFQUNkLFlBQWlCO1FBSjFDLFlBTUUsa0JBQU0sWUFBWSxDQUFDLFNBd0JwQjtRQXRCQyxJQUFNLGVBQWUsR0FBdUIsUUFBUSxDQUFDLElBQUksQ0FDdkQsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUMxQixDQUFDO1FBQ0YsSUFBTSxrQkFBa0IsR0FFcEIsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUVuRCxJQUFNLElBQUksR0FBdUIsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUM7UUFDekQsSUFBTSxlQUFlLEdBR2hCLGtCQUFrQixDQUFDLElBQUksQ0FDMUIsSUFBSSxDQUNGLFdBQVcsRUFDWCxJQUFJLENBQ0wsQ0FDRixDQUFDO1FBRUYsS0FBSSxDQUFDLGlCQUFpQixHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsVUFBQyxFQUFpQjtnQkFBZixnQkFBSyxFQUFFLGtCQUFNO1lBQ2pFLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakIsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQzs7SUFDTCxDQUFDO0lBRUQsMkJBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQXZDZSxVQUFJLEdBQUcsSUFBSSxDQUFDOztnQkFGN0IsVUFBVTs7OztnQkFSRixjQUFjO2dCQUVkLGlCQUFpQjtnQkFDakIscUJBQXFCO2dEQWV6QixNQUFNLFNBQUMsYUFBYTs7SUFnQ3pCLFlBQUM7Q0FBQSxBQTFDRCxDQUM4QixlQUFlLEdBeUM1QztTQXpDWSxLQUFLO0FBK0NsQixNQUFNLHNCQUNKLGVBQTZELEVBQzdELEVBQTJDO0lBRDNDLGdDQUFBLEVBQUEsb0JBQTJDLEtBQUssRUFBRSxTQUFTLEVBQUU7UUFDN0Qsa0JBQTJDLEVBQTFDLGNBQU0sRUFBRSxlQUFPO0lBRVIsSUFBQSw2QkFBSyxDQUFxQjtJQUNsQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQztBQUNuRCxDQUFDO0FBRUQsTUFBTSxDQUFDLElBQU0sZUFBZSxHQUFlO0lBQ3pDLEtBQUs7SUFDTCxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtDQUNqRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIE9ic2VydmFibGUsXG4gIHF1ZXVlU2NoZWR1bGVyLFxuICBTdWJzY3JpcHRpb24sXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgb2JzZXJ2ZU9uLCBzY2FuLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQWN0aW9uc1N1YmplY3QsIElOSVQgfSBmcm9tICcuL2FjdGlvbnNfc3ViamVjdCc7XG5pbXBvcnQgeyBBY3Rpb24sIEFjdGlvblJlZHVjZXIgfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBSZWR1Y2VyT2JzZXJ2YWJsZSB9IGZyb20gJy4vcmVkdWNlcl9tYW5hZ2VyJztcbmltcG9ydCB7IFNjYW5uZWRBY3Rpb25zU3ViamVjdCB9IGZyb20gJy4vc2Nhbm5lZF9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHsgSU5JVElBTF9TVEFURSB9IGZyb20gJy4vdG9rZW5zJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0YXRlT2JzZXJ2YWJsZSBleHRlbmRzIE9ic2VydmFibGU8YW55PiB7fVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RhdGU8VD4gZXh0ZW5kcyBCZWhhdmlvclN1YmplY3Q8YW55PiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHN0YXRpYyByZWFkb25seSBJTklUID0gSU5JVDtcblxuICBwcml2YXRlIHN0YXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgYWN0aW9ucyQ6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHJlZHVjZXIkOiBSZWR1Y2VyT2JzZXJ2YWJsZSxcbiAgICBzY2FubmVkQWN0aW9uczogU2Nhbm5lZEFjdGlvbnNTdWJqZWN0LFxuICAgIEBJbmplY3QoSU5JVElBTF9TVEFURSkgaW5pdGlhbFN0YXRlOiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoaW5pdGlhbFN0YXRlKTtcblxuICAgIGNvbnN0IGFjdGlvbnNPblF1ZXVlJDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gYWN0aW9ucyQucGlwZShcbiAgICAgIG9ic2VydmVPbihxdWV1ZVNjaGVkdWxlcilcbiAgICApO1xuICAgIGNvbnN0IHdpdGhMYXRlc3RSZWR1Y2VyJDogT2JzZXJ2YWJsZTxcbiAgICAgIFtBY3Rpb24sIEFjdGlvblJlZHVjZXI8YW55LCBBY3Rpb24+XVxuICAgID4gPSBhY3Rpb25zT25RdWV1ZSQucGlwZSh3aXRoTGF0ZXN0RnJvbShyZWR1Y2VyJCkpO1xuXG4gICAgY29uc3Qgc2VlZDogU3RhdGVBY3Rpb25QYWlyPFQ+ID0geyBzdGF0ZTogaW5pdGlhbFN0YXRlIH07XG4gICAgY29uc3Qgc3RhdGVBbmRBY3Rpb24kOiBPYnNlcnZhYmxlPHtcbiAgICAgIHN0YXRlOiBhbnk7XG4gICAgICBhY3Rpb24/OiBBY3Rpb247XG4gICAgfT4gPSB3aXRoTGF0ZXN0UmVkdWNlciQucGlwZShcbiAgICAgIHNjYW48W0FjdGlvbiwgQWN0aW9uUmVkdWNlcjxULCBBY3Rpb24+XSwgU3RhdGVBY3Rpb25QYWlyPFQ+PihcbiAgICAgICAgcmVkdWNlU3RhdGUsXG4gICAgICAgIHNlZWRcbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbiA9IHN0YXRlQW5kQWN0aW9uJC5zdWJzY3JpYmUoKHsgc3RhdGUsIGFjdGlvbiB9KSA9PiB7XG4gICAgICB0aGlzLm5leHQoc3RhdGUpO1xuICAgICAgc2Nhbm5lZEFjdGlvbnMubmV4dChhY3Rpb24pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY29tcGxldGUoKTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBTdGF0ZUFjdGlvblBhaXI8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4gPSB7XG4gIHN0YXRlOiBUIHwgdW5kZWZpbmVkO1xuICBhY3Rpb24/OiBWO1xufTtcbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2VTdGF0ZTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgc3RhdGVBY3Rpb25QYWlyOiBTdGF0ZUFjdGlvblBhaXI8VCwgVj4gPSB7IHN0YXRlOiB1bmRlZmluZWQgfSxcbiAgW2FjdGlvbiwgcmVkdWNlcl06IFtWLCBBY3Rpb25SZWR1Y2VyPFQsIFY+XVxuKTogU3RhdGVBY3Rpb25QYWlyPFQsIFY+IHtcbiAgY29uc3QgeyBzdGF0ZSB9ID0gc3RhdGVBY3Rpb25QYWlyO1xuICByZXR1cm4geyBzdGF0ZTogcmVkdWNlcihzdGF0ZSwgYWN0aW9uKSwgYWN0aW9uIH07XG59XG5cbmV4cG9ydCBjb25zdCBTVEFURV9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIFN0YXRlLFxuICB7IHByb3ZpZGU6IFN0YXRlT2JzZXJ2YWJsZSwgdXNlRXhpc3Rpbmc6IFN0YXRlIH0sXG5dO1xuIl19