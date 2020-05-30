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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
/**
 * @fileoverview added by tsickle
 * Generated from: src/store.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';
/**
 * @template T
 */
var Store = /** @class */ (function (_super) {
    __extends(Store, _super);
    function Store(state$, actionsObserver, reducerManager) {
        var _this = _super.call(this) || this;
        _this.actionsObserver = actionsObserver;
        _this.reducerManager = reducerManager;
        _this.source = state$;
        return _this;
    }
    /**
     * @template Props, K
     * @param {?} pathOrMapFn
     * @param {...?} paths
     * @return {?}
     */
    Store.prototype.select = /**
     * @template Props, K
     * @param {?} pathOrMapFn
     * @param {...?} paths
     * @return {?}
     */
    function (pathOrMapFn) {
        var paths = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            paths[_i - 1] = arguments[_i];
        }
        return ((/** @type {?} */ (select))).call.apply(((/** @type {?} */ (select))), __spread([null, pathOrMapFn], paths))(this);
    };
    /**
     * @template R
     * @param {?} operator
     * @return {?}
     */
    Store.prototype.lift = /**
     * @template R
     * @param {?} operator
     * @return {?}
     */
    function (operator) {
        /** @type {?} */
        var store = new Store(this, this.actionsObserver, this.reducerManager);
        store.operator = operator;
        return store;
    };
    /**
     * @template V
     * @param {?} action
     * @return {?}
     */
    Store.prototype.dispatch = /**
     * @template V
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.actionsObserver.next(action);
    };
    /**
     * @param {?} action
     * @return {?}
     */
    Store.prototype.next = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.actionsObserver.next(action);
    };
    /**
     * @param {?} err
     * @return {?}
     */
    Store.prototype.error = /**
     * @param {?} err
     * @return {?}
     */
    function (err) {
        this.actionsObserver.error(err);
    };
    /**
     * @return {?}
     */
    Store.prototype.complete = /**
     * @return {?}
     */
    function () {
        this.actionsObserver.complete();
    };
    /**
     * @template State, Actions
     * @param {?} key
     * @param {?} reducer
     * @return {?}
     */
    Store.prototype.addReducer = /**
     * @template State, Actions
     * @param {?} key
     * @param {?} reducer
     * @return {?}
     */
    function (key, reducer) {
        this.reducerManager.addReducer(key, reducer);
    };
    /**
     * @template Key
     * @param {?} key
     * @return {?}
     */
    Store.prototype.removeReducer = /**
     * @template Key
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.reducerManager.removeReducer(key);
    };
    Store.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Store.ctorParameters = function () { return [
        { type: StateObservable },
        { type: ActionsSubject },
        { type: ReducerManager }
    ]; };
    return Store;
}(Observable));
export { Store };
if (false) {
    /**
     * @type {?}
     * @private
     */
    Store.prototype.actionsObserver;
    /**
     * @type {?}
     * @private
     */
    Store.prototype.reducerManager;
}
/** @type {?} */
export var STORE_PROVIDERS = [Store];
/**
 * @template T, Props, K
 * @param {?} pathOrMapFn
 * @param {?=} propsOrPath
 * @param {...?} paths
 * @return {?}
 */
export function select(pathOrMapFn, propsOrPath) {
    var paths = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        paths[_i - 2] = arguments[_i];
    }
    return (/**
     * @param {?} source$
     * @return {?}
     */
    function selectOperator(source$) {
        /** @type {?} */
        var mapped$;
        if (typeof pathOrMapFn === 'string') {
            /** @type {?} */
            var pathSlices = __spread([(/** @type {?} */ (propsOrPath))], paths).filter(Boolean);
            mapped$ = source$.pipe(pluck.apply(void 0, __spread([pathOrMapFn], pathSlices)));
        }
        else if (typeof pathOrMapFn === 'function') {
            mapped$ = source$.pipe(map((/**
             * @param {?} source
             * @return {?}
             */
            function (source) { return pathOrMapFn(source, (/** @type {?} */ (propsOrPath))); })));
        }
        else {
            throw new TypeError("Unexpected type '" + typeof pathOrMapFn + "' in select operator," +
                " expected 'string' or 'function'");
        }
        return mapped$.pipe(distinctUntilChanged());
    });
}
//# sourceMappingURL=store.js.map