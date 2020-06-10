var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
/**
 * @fileoverview added by tsickle
 * Generated from: src/state.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
var /**
 * @abstract
 */
StateObservable = /** @class */ (function (_super) {
    __extends(StateObservable, _super);
    function StateObservable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StateObservable;
}(Observable));
/**
 * @abstract
 */
export { StateObservable };
/**
 * @template T
 */
var State = /** @class */ (function (_super) {
    __extends(State, _super);
    function State(actions$, reducer$, scannedActions, initialState) {
        var _this = _super.call(this, initialState) || this;
        /** @type {?} */
        var actionsOnQueue$ = actions$.pipe(observeOn(queueScheduler));
        /** @type {?} */
        var withLatestReducer$ = actionsOnQueue$.pipe(withLatestFrom(reducer$));
        /** @type {?} */
        var seed = { state: initialState };
        /** @type {?} */
        var stateAndAction$ = withLatestReducer$.pipe(scan(reduceState, seed));
        _this.stateSubscription = stateAndAction$.subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var state = _a.state, action = _a.action;
            _this.next(state);
            scannedActions.next(action);
        }));
        return _this;
    }
    /**
     * @return {?}
     */
    State.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
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
if (false) {
    /** @type {?} */
    State.INIT;
    /**
     * @type {?}
     * @private
     */
    State.prototype.stateSubscription;
}
/**
 * @template T, V
 * @param {?=} stateActionPair
 * @param {?=} __1
 * @return {?}
 */
export function reduceState(stateActionPair, _a) {
    if (stateActionPair === void 0) { stateActionPair = { state: undefined }; }
    var _b = __read(_a, 2), action = _b[0], reducer = _b[1];
    var state = stateActionPair.state;
    return { state: reducer(state, action), action: action };
}
/** @type {?} */
export var STATE_PROVIDERS = [
    State,
    { provide: StateObservable, useExisting: State },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdyeC9zdG9yZS8iLCJzb3VyY2VzIjpbInNyYy9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFDTCxlQUFlLEVBQ2YsVUFBVSxFQUNWLGNBQWMsR0FFZixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpFLE9BQU8sRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7OztBQUV6Qzs7OztJQUE4QyxtQ0FBZTtJQUE3RDs7SUFBK0QsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQUFoRSxDQUE4QyxVQUFVLEdBQVE7Ozs7Ozs7O0FBRWhFO0lBQzhCLHlCQUFvQjtJQUtoRCxlQUNFLFFBQXdCLEVBQ3hCLFFBQTJCLEVBQzNCLGNBQXFDLEVBQ2QsWUFBaUI7UUFKMUMsWUFNRSxrQkFBTSxZQUFZLENBQUMsU0F5QnBCOztZQXZCTyxlQUFlLEdBQXVCLFFBQVEsQ0FBQyxJQUFJLENBQ3ZELFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FDMUI7O1lBQ0ssa0JBQWtCLEdBR25CLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztZQUU3QyxJQUFJLEdBQXVCLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTs7WUFDbEQsZUFBZSxHQUdoQixrQkFBa0IsQ0FBQyxJQUFJLENBQzFCLElBQUksQ0FDRixXQUFXLEVBQ1gsSUFBSSxDQUNMLENBQ0Y7UUFFRCxLQUFJLENBQUMsaUJBQWlCLEdBQUcsZUFBZSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLEVBQWlCO2dCQUFmLGdCQUFLLEVBQUUsa0JBQU07WUFDakUsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQixjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlCLENBQUMsRUFBQyxDQUFDOztJQUNMLENBQUM7Ozs7SUFFRCwyQkFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUF4Q2UsVUFBSSxHQUFHLElBQUksQ0FBQzs7Z0JBRjdCLFVBQVU7Ozs7Z0JBUkYsY0FBYztnQkFFZCxpQkFBaUI7Z0JBQ2pCLHFCQUFxQjtnREFlekIsTUFBTSxTQUFDLGFBQWE7O0lBaUN6QixZQUFDO0NBQUEsQUEzQ0QsQ0FDOEIsZUFBZSxHQTBDNUM7U0ExQ1ksS0FBSzs7O0lBQ2hCLFdBQTRCOzs7OztJQUU1QixrQ0FBd0M7Ozs7Ozs7O0FBNkMxQyxNQUFNLFVBQVUsV0FBVyxDQUN6QixlQUE2RCxFQUM3RCxFQUEyQztJQUQzQyxnQ0FBQSxFQUFBLG9CQUEyQyxLQUFLLEVBQUUsU0FBUyxFQUFFO1FBQzdELGtCQUEyQyxFQUExQyxjQUFNLEVBQUUsZUFBTztJQUVSLElBQUEsNkJBQUs7SUFDYixPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQztBQUNuRCxDQUFDOztBQUVELE1BQU0sS0FBTyxlQUFlLEdBQWU7SUFDekMsS0FBSztJQUNMLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFO0NBQ2pEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIE9ic2VydmFibGUsXG4gIHF1ZXVlU2NoZWR1bGVyLFxuICBTdWJzY3JpcHRpb24sXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgb2JzZXJ2ZU9uLCBzY2FuLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQWN0aW9uc1N1YmplY3QsIElOSVQgfSBmcm9tICcuL2FjdGlvbnNfc3ViamVjdCc7XG5pbXBvcnQgeyBBY3Rpb24sIEFjdGlvblJlZHVjZXIgfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBSZWR1Y2VyT2JzZXJ2YWJsZSB9IGZyb20gJy4vcmVkdWNlcl9tYW5hZ2VyJztcbmltcG9ydCB7IFNjYW5uZWRBY3Rpb25zU3ViamVjdCB9IGZyb20gJy4vc2Nhbm5lZF9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHsgSU5JVElBTF9TVEFURSB9IGZyb20gJy4vdG9rZW5zJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0YXRlT2JzZXJ2YWJsZSBleHRlbmRzIE9ic2VydmFibGU8YW55PiB7fVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RhdGU8VD4gZXh0ZW5kcyBCZWhhdmlvclN1YmplY3Q8YW55PiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHN0YXRpYyByZWFkb25seSBJTklUID0gSU5JVDtcblxuICBwcml2YXRlIHN0YXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgYWN0aW9ucyQ6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHJlZHVjZXIkOiBSZWR1Y2VyT2JzZXJ2YWJsZSxcbiAgICBzY2FubmVkQWN0aW9uczogU2Nhbm5lZEFjdGlvbnNTdWJqZWN0LFxuICAgIEBJbmplY3QoSU5JVElBTF9TVEFURSkgaW5pdGlhbFN0YXRlOiBhbnlcbiAgKSB7XG4gICAgc3VwZXIoaW5pdGlhbFN0YXRlKTtcblxuICAgIGNvbnN0IGFjdGlvbnNPblF1ZXVlJDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gYWN0aW9ucyQucGlwZShcbiAgICAgIG9ic2VydmVPbihxdWV1ZVNjaGVkdWxlcilcbiAgICApO1xuICAgIGNvbnN0IHdpdGhMYXRlc3RSZWR1Y2VyJDogT2JzZXJ2YWJsZTxbXG4gICAgICBBY3Rpb24sXG4gICAgICBBY3Rpb25SZWR1Y2VyPGFueSwgQWN0aW9uPlxuICAgIF0+ID0gYWN0aW9uc09uUXVldWUkLnBpcGUod2l0aExhdGVzdEZyb20ocmVkdWNlciQpKTtcblxuICAgIGNvbnN0IHNlZWQ6IFN0YXRlQWN0aW9uUGFpcjxUPiA9IHsgc3RhdGU6IGluaXRpYWxTdGF0ZSB9O1xuICAgIGNvbnN0IHN0YXRlQW5kQWN0aW9uJDogT2JzZXJ2YWJsZTx7XG4gICAgICBzdGF0ZTogYW55O1xuICAgICAgYWN0aW9uPzogQWN0aW9uO1xuICAgIH0+ID0gd2l0aExhdGVzdFJlZHVjZXIkLnBpcGUoXG4gICAgICBzY2FuPFtBY3Rpb24sIEFjdGlvblJlZHVjZXI8VCwgQWN0aW9uPl0sIFN0YXRlQWN0aW9uUGFpcjxUPj4oXG4gICAgICAgIHJlZHVjZVN0YXRlLFxuICAgICAgICBzZWVkXG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24gPSBzdGF0ZUFuZEFjdGlvbiQuc3Vic2NyaWJlKCh7IHN0YXRlLCBhY3Rpb24gfSkgPT4ge1xuICAgICAgdGhpcy5uZXh0KHN0YXRlKTtcbiAgICAgIHNjYW5uZWRBY3Rpb25zLm5leHQoYWN0aW9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmNvbXBsZXRlKCk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgU3RhdGVBY3Rpb25QYWlyPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+ID0ge1xuICBzdGF0ZTogVCB8IHVuZGVmaW5lZDtcbiAgYWN0aW9uPzogVjtcbn07XG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlU3RhdGU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gIHN0YXRlQWN0aW9uUGFpcjogU3RhdGVBY3Rpb25QYWlyPFQsIFY+ID0geyBzdGF0ZTogdW5kZWZpbmVkIH0sXG4gIFthY3Rpb24sIHJlZHVjZXJdOiBbViwgQWN0aW9uUmVkdWNlcjxULCBWPl1cbik6IFN0YXRlQWN0aW9uUGFpcjxULCBWPiB7XG4gIGNvbnN0IHsgc3RhdGUgfSA9IHN0YXRlQWN0aW9uUGFpcjtcbiAgcmV0dXJuIHsgc3RhdGU6IHJlZHVjZXIoc3RhdGUsIGFjdGlvbiksIGFjdGlvbiB9O1xufVxuXG5leHBvcnQgY29uc3QgU1RBVEVfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICBTdGF0ZSxcbiAgeyBwcm92aWRlOiBTdGF0ZU9ic2VydmFibGUsIHVzZUV4aXN0aW5nOiBTdGF0ZSB9LFxuXTtcbiJdfQ==