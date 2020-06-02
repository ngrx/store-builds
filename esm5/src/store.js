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
import { ActionsSubject } from './actions_subject';
import { ReducerManager } from './reducer_manager';
import { StateObservable } from './state';
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
        { type: Injectable }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdyeC9zdG9yZS8iLCJzb3VyY2VzIjpbInNyYy9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBc0IsTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7QUFFMUM7SUFDdUMseUJBQWE7SUFFbEQsZUFDRSxNQUF1QixFQUNmLGVBQStCLEVBQy9CLGNBQThCO1FBSHhDLFlBS0UsaUJBQU8sU0FHUjtRQU5TLHFCQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixvQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFJdEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0lBQ3ZCLENBQUM7Ozs7Ozs7SUE4REQsc0JBQU07Ozs7OztJQUFOLFVBQ0UsV0FBc0Q7UUFDdEQsZUFBa0I7YUFBbEIsVUFBa0IsRUFBbEIscUJBQWtCLEVBQWxCLElBQWtCO1lBQWxCLDhCQUFrQjs7UUFFbEIsT0FBTyxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsSUFBSSxPQUFwQixDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLFlBQU0sSUFBSSxFQUFFLFdBQVcsR0FBSyxLQUFLLEdBQUUsSUFBSSxDQUFDLENBQUM7SUFDakUsQ0FBQzs7Ozs7O0lBRUQsb0JBQUk7Ozs7O0lBQUosVUFBUSxRQUF3Qjs7WUFDeEIsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFJLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDM0UsS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFMUIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7Ozs7SUFFRCx3QkFBUTs7Ozs7SUFBUixVQUNFLE1BSUc7UUFFSCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVELG9CQUFJOzs7O0lBQUosVUFBSyxNQUFjO1FBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRUQscUJBQUs7Ozs7SUFBTCxVQUFNLEdBQVE7UUFDWixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7O0lBRUQsd0JBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7Ozs7O0lBRUQsMEJBQVU7Ozs7OztJQUFWLFVBQ0UsR0FBVyxFQUNYLE9BQXNDO1FBRXRDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7Ozs7SUFFRCw2QkFBYTs7Ozs7SUFBYixVQUFvRCxHQUFRO1FBQzFELElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7O2dCQXRIRixVQUFVOzs7O2dCQUZGLGVBQWU7Z0JBSGYsY0FBYztnQkFFZCxjQUFjOztJQTBIdkIsWUFBQztDQUFBLEFBdkhELENBQ3VDLFVBQVUsR0FzSGhEO1NBdEhZLEtBQUs7Ozs7OztJQUlkLGdDQUF1Qzs7Ozs7SUFDdkMsK0JBQXNDOzs7QUFtSDFDLE1BQU0sS0FBTyxlQUFlLEdBQWUsQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7O0FBbUZsRCxNQUFNLFVBQVUsTUFBTSxDQUNwQixXQUF3RCxFQUN4RCxXQUE0QjtJQUM1QixlQUFrQjtTQUFsQixVQUFrQixFQUFsQixxQkFBa0IsRUFBbEIsSUFBa0I7UUFBbEIsOEJBQWtCOztJQUVsQjs7OztJQUFPLFNBQVMsY0FBYyxDQUFDLE9BQXNCOztZQUMvQyxPQUF3QjtRQUU1QixJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVEsRUFBRTs7Z0JBQzdCLFVBQVUsR0FBRyxVQUFDLG1CQUFRLFdBQVcsRUFBQSxHQUFLLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ2xFLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUsseUJBQUMsV0FBVyxHQUFLLFVBQVUsR0FBRSxDQUFDO1NBQzNEO2FBQU0sSUFBSSxPQUFPLFdBQVcsS0FBSyxVQUFVLEVBQUU7WUFDNUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQ3BCLEdBQUc7Ozs7WUFBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLFdBQVcsQ0FBQyxNQUFNLEVBQUUsbUJBQU8sV0FBVyxFQUFBLENBQUMsRUFBdkMsQ0FBdUMsRUFBQyxDQUN2RCxDQUFDO1NBQ0g7YUFBTTtZQUNMLE1BQU0sSUFBSSxTQUFTLENBQ2pCLHNCQUFvQixPQUFPLFdBQVcsMEJBQXVCO2dCQUMzRCxrQ0FBa0MsQ0FDckMsQ0FBQztTQUNIO1FBRUQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDLEVBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBPcGVyYXRvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgcGx1Y2sgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFjdGlvbnNTdWJqZWN0IH0gZnJvbSAnLi9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHsgQWN0aW9uLCBBY3Rpb25SZWR1Y2VyLCBGdW5jdGlvbklzTm90QWxsb3dlZCB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IFJlZHVjZXJNYW5hZ2VyIH0gZnJvbSAnLi9yZWR1Y2VyX21hbmFnZXInO1xuaW1wb3J0IHsgU3RhdGVPYnNlcnZhYmxlIH0gZnJvbSAnLi9zdGF0ZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdG9yZTxUID0gb2JqZWN0PiBleHRlbmRzIE9ic2VydmFibGU8VD5cbiAgaW1wbGVtZW50cyBPYnNlcnZlcjxBY3Rpb24+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgc3RhdGUkOiBTdGF0ZU9ic2VydmFibGUsXG4gICAgcHJpdmF0ZSBhY3Rpb25zT2JzZXJ2ZXI6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHByaXZhdGUgcmVkdWNlck1hbmFnZXI6IFJlZHVjZXJNYW5hZ2VyXG4gICkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNvdXJjZSA9IHN0YXRlJDtcbiAgfVxuXG4gIHNlbGVjdDxLPihtYXBGbjogKHN0YXRlOiBUKSA9PiBLKTogT2JzZXJ2YWJsZTxLPjtcbiAgc2VsZWN0PEssIFByb3BzID0gYW55PihcbiAgICBtYXBGbjogKHN0YXRlOiBULCBwcm9wczogUHJvcHMpID0+IEssXG4gICAgcHJvcHM6IFByb3BzXG4gICk6IE9ic2VydmFibGU8Sz47XG4gIHNlbGVjdDxhIGV4dGVuZHMga2V5b2YgVD4oa2V5OiBhKTogT2JzZXJ2YWJsZTxUW2FdPjtcbiAgc2VsZWN0PGEgZXh0ZW5kcyBrZXlvZiBULCBiIGV4dGVuZHMga2V5b2YgVFthXT4oXG4gICAga2V5MTogYSxcbiAgICBrZXkyOiBiXG4gICk6IE9ic2VydmFibGU8VFthXVtiXT47XG4gIHNlbGVjdDxhIGV4dGVuZHMga2V5b2YgVCwgYiBleHRlbmRzIGtleW9mIFRbYV0sIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdPihcbiAgICBrZXkxOiBhLFxuICAgIGtleTI6IGIsXG4gICAga2V5MzogY1xuICApOiBPYnNlcnZhYmxlPFRbYV1bYl1bY10+O1xuICBzZWxlY3Q8XG4gICAgYSBleHRlbmRzIGtleW9mIFQsXG4gICAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gICAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gICAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11cbiAgPihrZXkxOiBhLCBrZXkyOiBiLCBrZXkzOiBjLCBrZXk0OiBkKTogT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdPjtcbiAgc2VsZWN0PFxuICAgIGEgZXh0ZW5kcyBrZXlvZiBULFxuICAgIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICAgIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdLFxuICAgIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdLFxuICAgIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdXG4gID4oa2V5MTogYSwga2V5MjogYiwga2V5MzogYywga2V5NDogZCwga2V5NTogZSk6IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXVtlXT47XG4gIHNlbGVjdDxcbiAgICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXSxcbiAgICBlIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXSxcbiAgICBmIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXVtlXVxuICA+KFxuICAgIGtleTE6IGEsXG4gICAga2V5MjogYixcbiAgICBrZXkzOiBjLFxuICAgIGtleTQ6IGQsXG4gICAga2V5NTogZSxcbiAgICBrZXk2OiBmXG4gICk6IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXVtlXVtmXT47XG4gIHNlbGVjdDxcbiAgICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXSxcbiAgICBlIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXSxcbiAgICBmIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXVtlXSxcbiAgICBLID0gYW55XG4gID4oXG4gICAga2V5MTogYSxcbiAgICBrZXkyOiBiLFxuICAgIGtleTM6IGMsXG4gICAga2V5NDogZCxcbiAgICBrZXk1OiBlLFxuICAgIGtleTY6IGYsXG4gICAgLi4ucGF0aHM6IHN0cmluZ1tdXG4gICk6IE9ic2VydmFibGU8Sz47XG4gIHNlbGVjdDxQcm9wcyA9IGFueSwgSyA9IGFueT4oXG4gICAgcGF0aE9yTWFwRm46ICgoc3RhdGU6IFQsIHByb3BzPzogUHJvcHMpID0+IEspIHwgc3RyaW5nLFxuICAgIC4uLnBhdGhzOiBzdHJpbmdbXVxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiAoc2VsZWN0IGFzIGFueSkuY2FsbChudWxsLCBwYXRoT3JNYXBGbiwgLi4ucGF0aHMpKHRoaXMpO1xuICB9XG5cbiAgbGlmdDxSPihvcGVyYXRvcjogT3BlcmF0b3I8VCwgUj4pOiBTdG9yZTxSPiB7XG4gICAgY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmU8Uj4odGhpcywgdGhpcy5hY3Rpb25zT2JzZXJ2ZXIsIHRoaXMucmVkdWNlck1hbmFnZXIpO1xuICAgIHN0b3JlLm9wZXJhdG9yID0gb3BlcmF0b3I7XG5cbiAgICByZXR1cm4gc3RvcmU7XG4gIH1cblxuICBkaXNwYXRjaDxWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICBhY3Rpb246IFYgJlxuICAgICAgRnVuY3Rpb25Jc05vdEFsbG93ZWQ8XG4gICAgICAgIFYsXG4gICAgICAgICdGdW5jdGlvbnMgYXJlIG5vdCBhbGxvd2VkIHRvIGJlIGRpc3BhdGNoZWQuIERpZCB5b3UgZm9yZ2V0IHRvIGNhbGwgdGhlIGFjdGlvbiBjcmVhdG9yIGZ1bmN0aW9uPydcbiAgICAgID5cbiAgKSB7XG4gICAgdGhpcy5hY3Rpb25zT2JzZXJ2ZXIubmV4dChhY3Rpb24pO1xuICB9XG5cbiAgbmV4dChhY3Rpb246IEFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uc09ic2VydmVyLm5leHQoYWN0aW9uKTtcbiAgfVxuXG4gIGVycm9yKGVycjogYW55KSB7XG4gICAgdGhpcy5hY3Rpb25zT2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgfVxuXG4gIGNvbXBsZXRlKCkge1xuICAgIHRoaXMuYWN0aW9uc09ic2VydmVyLmNvbXBsZXRlKCk7XG4gIH1cblxuICBhZGRSZWR1Y2VyPFN0YXRlLCBBY3Rpb25zIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICBrZXk6IHN0cmluZyxcbiAgICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFN0YXRlLCBBY3Rpb25zPlxuICApIHtcbiAgICB0aGlzLnJlZHVjZXJNYW5hZ2VyLmFkZFJlZHVjZXIoa2V5LCByZWR1Y2VyKTtcbiAgfVxuXG4gIHJlbW92ZVJlZHVjZXI8S2V5IGV4dGVuZHMgRXh0cmFjdDxrZXlvZiBULCBzdHJpbmc+PihrZXk6IEtleSkge1xuICAgIHRoaXMucmVkdWNlck1hbmFnZXIucmVtb3ZlUmVkdWNlcihrZXkpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBTVE9SRV9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbU3RvcmVdO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFQsIFByb3BzLCBLPihcbiAgbWFwRm46IChzdGF0ZTogVCwgcHJvcHM6IFByb3BzKSA9PiBLLFxuICBwcm9wcz86IFByb3BzXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxLPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8VCwgYSBleHRlbmRzIGtleW9mIFQ+KFxuICBrZXk6IGFcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxULCBhIGV4dGVuZHMga2V5b2YgVCwgYiBleHRlbmRzIGtleW9mIFRbYV0+KFxuICBrZXkxOiBhLFxuICBrZXkyOiBiXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUW2FdW2JdPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8XG4gIFQsXG4gIGEgZXh0ZW5kcyBrZXlvZiBULFxuICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl1cbj4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGIsXG4gIGtleTM6IGNcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV1bYl1bY10+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxcbiAgVCxcbiAgYSBleHRlbmRzIGtleW9mIFQsXG4gIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11cbj4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGIsXG4gIGtleTM6IGMsXG4gIGtleTQ6IGRcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV1bYl1bY11bZF0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxcbiAgVCxcbiAgYSBleHRlbmRzIGtleW9mIFQsXG4gIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY10sXG4gIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdXG4+KFxuICBrZXkxOiBhLFxuICBrZXkyOiBiLFxuICBrZXkzOiBjLFxuICBrZXk0OiBkLFxuICBrZXk1OiBlXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdW2VdPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8XG4gIFQsXG4gIGEgZXh0ZW5kcyBrZXlvZiBULFxuICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdLFxuICBlIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXSxcbiAgZiBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11bZF1bZV1cbj4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGIsXG4gIGtleTM6IGMsXG4gIGtleTQ6IGQsXG4gIGtleTU6IGUsXG4gIGtleTY6IGZcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV1bYl1bY11bZF1bZV1bZl0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxcbiAgVCxcbiAgYSBleHRlbmRzIGtleW9mIFQsXG4gIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY10sXG4gIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdLFxuICBmIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXVtlXSxcbiAgSyA9IGFueVxuPihcbiAga2V5MTogYSxcbiAga2V5MjogYixcbiAga2V5MzogYyxcbiAga2V5NDogZCxcbiAga2V5NTogZSxcbiAga2V5NjogZixcbiAgLi4ucGF0aHM6IHN0cmluZ1tdXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxLPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8VCwgUHJvcHMsIEs+KFxuICBwYXRoT3JNYXBGbjogKChzdGF0ZTogVCwgcHJvcHM/OiBQcm9wcykgPT4gYW55KSB8IHN0cmluZyxcbiAgcHJvcHNPclBhdGg/OiBQcm9wcyB8IHN0cmluZyxcbiAgLi4ucGF0aHM6IHN0cmluZ1tdXG4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNlbGVjdE9wZXJhdG9yKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pOiBPYnNlcnZhYmxlPEs+IHtcbiAgICBsZXQgbWFwcGVkJDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gICAgaWYgKHR5cGVvZiBwYXRoT3JNYXBGbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHBhdGhTbGljZXMgPSBbPHN0cmluZz5wcm9wc09yUGF0aCwgLi4ucGF0aHNdLmZpbHRlcihCb29sZWFuKTtcbiAgICAgIG1hcHBlZCQgPSBzb3VyY2UkLnBpcGUocGx1Y2socGF0aE9yTWFwRm4sIC4uLnBhdGhTbGljZXMpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXRoT3JNYXBGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbWFwcGVkJCA9IHNvdXJjZSQucGlwZShcbiAgICAgICAgbWFwKHNvdXJjZSA9PiBwYXRoT3JNYXBGbihzb3VyY2UsIDxQcm9wcz5wcm9wc09yUGF0aCkpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICBgVW5leHBlY3RlZCB0eXBlICcke3R5cGVvZiBwYXRoT3JNYXBGbn0nIGluIHNlbGVjdCBvcGVyYXRvcixgICtcbiAgICAgICAgICBgIGV4cGVjdGVkICdzdHJpbmcnIG9yICdmdW5jdGlvbidgXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBwZWQkLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG4gIH07XG59XG4iXX0=