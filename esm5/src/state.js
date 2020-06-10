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
            scannedActions.next((/** @type {?} */ (action)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdyeC9zdG9yZS8iLCJzb3VyY2VzIjpbInNyYy9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFDTCxlQUFlLEVBQ2YsVUFBVSxFQUNWLGNBQWMsR0FFZixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpFLE9BQU8sRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7OztBQUV6Qzs7OztJQUE4QyxtQ0FBZTtJQUE3RDs7SUFBK0QsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQUFoRSxDQUE4QyxVQUFVLEdBQVE7Ozs7Ozs7O0FBRWhFO0lBQzhCLHlCQUFvQjtJQUtoRCxlQUNFLFFBQXdCLEVBQ3hCLFFBQTJCLEVBQzNCLGNBQXFDLEVBQ2QsWUFBaUI7UUFKMUMsWUFNRSxrQkFBTSxZQUFZLENBQUMsU0F5QnBCOztZQXZCTyxlQUFlLEdBQXVCLFFBQVEsQ0FBQyxJQUFJLENBQ3ZELFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FDMUI7O1lBQ0ssa0JBQWtCLEdBR25CLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztZQUU3QyxJQUFJLEdBQXVCLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRTs7WUFDbEQsZUFBZSxHQUdoQixrQkFBa0IsQ0FBQyxJQUFJLENBQzFCLElBQUksQ0FDRixXQUFXLEVBQ1gsSUFBSSxDQUNMLENBQ0Y7UUFFRCxLQUFJLENBQUMsaUJBQWlCLEdBQUcsZUFBZSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLEVBQWlCO2dCQUFmLGdCQUFLLEVBQUUsa0JBQU07WUFDakUsS0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQixjQUFjLENBQUMsSUFBSSxDQUFDLG1CQUFBLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxFQUFDLENBQUM7O0lBQ0wsQ0FBQzs7OztJQUVELDJCQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQXhDZSxVQUFJLEdBQUcsSUFBSSxDQUFDOztnQkFGN0IsVUFBVTs7OztnQkFSRixjQUFjO2dCQUVkLGlCQUFpQjtnQkFDakIscUJBQXFCO2dEQWV6QixNQUFNLFNBQUMsYUFBYTs7SUFpQ3pCLFlBQUM7Q0FBQSxBQTNDRCxDQUM4QixlQUFlLEdBMEM1QztTQTFDWSxLQUFLOzs7SUFDaEIsV0FBNEI7Ozs7O0lBRTVCLGtDQUF3Qzs7Ozs7Ozs7QUE2QzFDLE1BQU0sVUFBVSxXQUFXLENBQ3pCLGVBQTZELEVBQzdELEVBQTJDO0lBRDNDLGdDQUFBLEVBQUEsb0JBQTJDLEtBQUssRUFBRSxTQUFTLEVBQUU7UUFDN0Qsa0JBQTJDLEVBQTFDLGNBQU0sRUFBRSxlQUFPO0lBRVIsSUFBQSw2QkFBSztJQUNiLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDO0FBQ25ELENBQUM7O0FBRUQsTUFBTSxLQUFPLGVBQWUsR0FBZTtJQUN6QyxLQUFLO0lBQ0wsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUU7Q0FDakQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgT2JzZXJ2YWJsZSxcbiAgcXVldWVTY2hlZHVsZXIsXG4gIFN1YnNjcmlwdGlvbixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBvYnNlcnZlT24sIHNjYW4sIHdpdGhMYXRlc3RGcm9tIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBY3Rpb25zU3ViamVjdCwgSU5JVCB9IGZyb20gJy4vYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7IEFjdGlvbiwgQWN0aW9uUmVkdWNlciB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IFJlZHVjZXJPYnNlcnZhYmxlIH0gZnJvbSAnLi9yZWR1Y2VyX21hbmFnZXInO1xuaW1wb3J0IHsgU2Nhbm5lZEFjdGlvbnNTdWJqZWN0IH0gZnJvbSAnLi9zY2FubmVkX2FjdGlvbnNfc3ViamVjdCc7XG5pbXBvcnQgeyBJTklUSUFMX1NUQVRFIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RhdGVPYnNlcnZhYmxlIGV4dGVuZHMgT2JzZXJ2YWJsZTxhbnk+IHt9XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdGF0ZTxUPiBleHRlbmRzIEJlaGF2aW9yU3ViamVjdDxhbnk+IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgc3RhdGljIHJlYWRvbmx5IElOSVQgPSBJTklUO1xuXG4gIHByaXZhdGUgc3RhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBhY3Rpb25zJDogQWN0aW9uc1N1YmplY3QsXG4gICAgcmVkdWNlciQ6IFJlZHVjZXJPYnNlcnZhYmxlLFxuICAgIHNjYW5uZWRBY3Rpb25zOiBTY2FubmVkQWN0aW9uc1N1YmplY3QsXG4gICAgQEluamVjdChJTklUSUFMX1NUQVRFKSBpbml0aWFsU3RhdGU6IGFueVxuICApIHtcbiAgICBzdXBlcihpbml0aWFsU3RhdGUpO1xuXG4gICAgY29uc3QgYWN0aW9uc09uUXVldWUkOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSBhY3Rpb25zJC5waXBlKFxuICAgICAgb2JzZXJ2ZU9uKHF1ZXVlU2NoZWR1bGVyKVxuICAgICk7XG4gICAgY29uc3Qgd2l0aExhdGVzdFJlZHVjZXIkOiBPYnNlcnZhYmxlPFtcbiAgICAgIEFjdGlvbixcbiAgICAgIEFjdGlvblJlZHVjZXI8YW55LCBBY3Rpb24+XG4gICAgXT4gPSBhY3Rpb25zT25RdWV1ZSQucGlwZSh3aXRoTGF0ZXN0RnJvbShyZWR1Y2VyJCkpO1xuXG4gICAgY29uc3Qgc2VlZDogU3RhdGVBY3Rpb25QYWlyPFQ+ID0geyBzdGF0ZTogaW5pdGlhbFN0YXRlIH07XG4gICAgY29uc3Qgc3RhdGVBbmRBY3Rpb24kOiBPYnNlcnZhYmxlPHtcbiAgICAgIHN0YXRlOiBhbnk7XG4gICAgICBhY3Rpb24/OiBBY3Rpb247XG4gICAgfT4gPSB3aXRoTGF0ZXN0UmVkdWNlciQucGlwZShcbiAgICAgIHNjYW48W0FjdGlvbiwgQWN0aW9uUmVkdWNlcjxULCBBY3Rpb24+XSwgU3RhdGVBY3Rpb25QYWlyPFQ+PihcbiAgICAgICAgcmVkdWNlU3RhdGUsXG4gICAgICAgIHNlZWRcbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdGF0ZVN1YnNjcmlwdGlvbiA9IHN0YXRlQW5kQWN0aW9uJC5zdWJzY3JpYmUoKHsgc3RhdGUsIGFjdGlvbiB9KSA9PiB7XG4gICAgICB0aGlzLm5leHQoc3RhdGUpO1xuICAgICAgc2Nhbm5lZEFjdGlvbnMubmV4dChhY3Rpb24hKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmNvbXBsZXRlKCk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgU3RhdGVBY3Rpb25QYWlyPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+ID0ge1xuICBzdGF0ZTogVCB8IHVuZGVmaW5lZDtcbiAgYWN0aW9uPzogVjtcbn07XG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlU3RhdGU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gIHN0YXRlQWN0aW9uUGFpcjogU3RhdGVBY3Rpb25QYWlyPFQsIFY+ID0geyBzdGF0ZTogdW5kZWZpbmVkIH0sXG4gIFthY3Rpb24sIHJlZHVjZXJdOiBbViwgQWN0aW9uUmVkdWNlcjxULCBWPl1cbik6IFN0YXRlQWN0aW9uUGFpcjxULCBWPiB7XG4gIGNvbnN0IHsgc3RhdGUgfSA9IHN0YXRlQWN0aW9uUGFpcjtcbiAgcmV0dXJuIHsgc3RhdGU6IHJlZHVjZXIoc3RhdGUsIGFjdGlvbiksIGFjdGlvbiB9O1xufVxuXG5leHBvcnQgY29uc3QgU1RBVEVfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICBTdGF0ZSxcbiAgeyBwcm92aWRlOiBTdGF0ZU9ic2VydmFibGUsIHVzZUV4aXN0aW5nOiBTdGF0ZSB9LFxuXTtcbiJdfQ==