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
import { INIT } from './actions_subject';
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
        { type: Injectable },
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
//# sourceMappingURL=state.js.map