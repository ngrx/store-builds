/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
export class Store extends Observable {
    /**
     * @param {?} state$
     * @param {?} actionsObserver
     * @param {?} reducerManager
     */
    constructor(state$, actionsObserver, reducerManager) {
        super();
        this.actionsObserver = actionsObserver;
        this.reducerManager = reducerManager;
        this.source = state$;
    }
    /**
     * @template Props, K
     * @param {?} pathOrMapFn
     * @param {...?} paths
     * @return {?}
     */
    select(pathOrMapFn, ...paths) {
        return ((/** @type {?} */ (select))).call(null, pathOrMapFn, ...paths)(this);
    }
    /**
     * @template R
     * @param {?} operator
     * @return {?}
     */
    lift(operator) {
        /** @type {?} */
        const store = new Store(this, this.actionsObserver, this.reducerManager);
        store.operator = operator;
        return store;
    }
    /**
     * @template V
     * @param {?} action
     * @return {?}
     */
    dispatch(action) {
        this.actionsObserver.next(action);
    }
    /**
     * @param {?} action
     * @return {?}
     */
    next(action) {
        this.actionsObserver.next(action);
    }
    /**
     * @param {?} err
     * @return {?}
     */
    error(err) {
        this.actionsObserver.error(err);
    }
    /**
     * @return {?}
     */
    complete() {
        this.actionsObserver.complete();
    }
    /**
     * @template State, Actions
     * @param {?} key
     * @param {?} reducer
     * @return {?}
     */
    addReducer(key, reducer) {
        this.reducerManager.addReducer(key, reducer);
    }
    /**
     * @template Key
     * @param {?} key
     * @return {?}
     */
    removeReducer(key) {
        this.reducerManager.removeReducer(key);
    }
}
Store.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Store.ctorParameters = () => [
    { type: StateObservable },
    { type: ActionsSubject },
    { type: ReducerManager }
];
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
export const STORE_PROVIDERS = [Store];
/**
 * @template T, Props, K
 * @param {?} pathOrMapFn
 * @param {?=} propsOrPath
 * @param {...?} paths
 * @return {?}
 */
export function select(pathOrMapFn, propsOrPath, ...paths) {
    return (/**
     * @param {?} source$
     * @return {?}
     */
    function selectOperator(source$) {
        /** @type {?} */
        let mapped$;
        if (typeof pathOrMapFn === 'string') {
            /** @type {?} */
            const pathSlices = [(/** @type {?} */ (propsOrPath)), ...paths].filter(Boolean);
            mapped$ = source$.pipe(pluck(pathOrMapFn, ...pathSlices));
        }
        else if (typeof pathOrMapFn === 'function') {
            mapped$ = source$.pipe(map((/**
             * @param {?} source
             * @return {?}
             */
            source => pathOrMapFn(source, (/** @type {?} */ (propsOrPath))))));
        }
        else {
            throw new TypeError(`Unexpected type '${typeof pathOrMapFn}' in select operator,` +
                ` expected 'string' or 'function'`);
        }
        return mapped$.pipe(distinctUntilChanged());
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFzQixNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7OztBQUcxQyxNQUFNLE9BQU8sS0FBUyxTQUFRLFVBQWE7Ozs7OztJQUN6QyxZQUNFLE1BQXVCLEVBQ2YsZUFBK0IsRUFDL0IsY0FBOEI7UUFFdEMsS0FBSyxFQUFFLENBQUM7UUFIQSxvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDL0IsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBSXRDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Ozs7Ozs7SUE4REQsTUFBTSxDQUNKLFdBQXNELEVBQ3RELEdBQUcsS0FBZTtRQUVsQixPQUFPLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Ozs7OztJQUVELElBQUksQ0FBSSxRQUF3Qjs7Y0FDeEIsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFJLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDM0UsS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFMUIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7Ozs7SUFFRCxRQUFRLENBQ04sTUFJRztRQUVILElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRUQsSUFBSSxDQUFDLE1BQWM7UUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCxLQUFLLENBQUMsR0FBUTtRQUNaLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7Ozs7O0lBRUQsVUFBVSxDQUNSLEdBQVcsRUFDWCxPQUFzQztRQUV0QyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Ozs7O0lBRUQsYUFBYSxDQUF1QyxHQUFRO1FBQzFELElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7OztZQXJIRixVQUFVOzs7O1lBRkYsZUFBZTtZQUhmLGNBQWM7WUFFZCxjQUFjOzs7Ozs7O0lBT25CLGdDQUF1Qzs7Ozs7SUFDdkMsK0JBQXNDOzs7QUFtSDFDLE1BQU0sT0FBTyxlQUFlLEdBQWUsQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7O0FBbUZsRCxNQUFNLFVBQVUsTUFBTSxDQUNwQixXQUF3RCxFQUN4RCxXQUE0QixFQUM1QixHQUFHLEtBQWU7SUFFbEI7Ozs7SUFBTyxTQUFTLGNBQWMsQ0FBQyxPQUFzQjs7WUFDL0MsT0FBd0I7UUFFNUIsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7O2tCQUM3QixVQUFVLEdBQUcsQ0FBQyxtQkFBUSxXQUFXLEVBQUEsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDbEUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDM0Q7YUFBTSxJQUFJLE9BQU8sV0FBVyxLQUFLLFVBQVUsRUFBRTtZQUM1QyxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FDcEIsR0FBRzs7OztZQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxtQkFBTyxXQUFXLEVBQUEsQ0FBQyxFQUFDLENBQ3ZELENBQUM7U0FDSDthQUFNO1lBQ0wsTUFBTSxJQUFJLFNBQVMsQ0FDakIsb0JBQW9CLE9BQU8sV0FBVyx1QkFBdUI7Z0JBQzNELGtDQUFrQyxDQUNyQyxDQUFDO1NBQ0g7UUFFRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUMsRUFBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIE9wZXJhdG9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBwbHVjayB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQWN0aW9uc1N1YmplY3QgfSBmcm9tICcuL2FjdGlvbnNfc3ViamVjdCc7XG5pbXBvcnQgeyBBY3Rpb24sIEFjdGlvblJlZHVjZXIsIEZ1bmN0aW9uSXNOb3RBbGxvd2VkIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgUmVkdWNlck1hbmFnZXIgfSBmcm9tICcuL3JlZHVjZXJfbWFuYWdlcic7XG5pbXBvcnQgeyBTdGF0ZU9ic2VydmFibGUgfSBmcm9tICcuL3N0YXRlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0b3JlPFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiBpbXBsZW1lbnRzIE9ic2VydmVyPEFjdGlvbj4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBzdGF0ZSQ6IFN0YXRlT2JzZXJ2YWJsZSxcbiAgICBwcml2YXRlIGFjdGlvbnNPYnNlcnZlcjogQWN0aW9uc1N1YmplY3QsXG4gICAgcHJpdmF0ZSByZWR1Y2VyTWFuYWdlcjogUmVkdWNlck1hbmFnZXJcbiAgKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc291cmNlID0gc3RhdGUkO1xuICB9XG5cbiAgc2VsZWN0PEs+KG1hcEZuOiAoc3RhdGU6IFQpID0+IEspOiBPYnNlcnZhYmxlPEs+O1xuICBzZWxlY3Q8SywgUHJvcHMgPSBhbnk+KFxuICAgIG1hcEZuOiAoc3RhdGU6IFQsIHByb3BzOiBQcm9wcykgPT4gSyxcbiAgICBwcm9wczogUHJvcHNcbiAgKTogT2JzZXJ2YWJsZTxLPjtcbiAgc2VsZWN0PGEgZXh0ZW5kcyBrZXlvZiBUPihrZXk6IGEpOiBPYnNlcnZhYmxlPFRbYV0+O1xuICBzZWxlY3Q8YSBleHRlbmRzIGtleW9mIFQsIGIgZXh0ZW5kcyBrZXlvZiBUW2FdPihcbiAgICBrZXkxOiBhLFxuICAgIGtleTI6IGJcbiAgKTogT2JzZXJ2YWJsZTxUW2FdW2JdPjtcbiAgc2VsZWN0PGEgZXh0ZW5kcyBrZXlvZiBULCBiIGV4dGVuZHMga2V5b2YgVFthXSwgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0+KFxuICAgIGtleTE6IGEsXG4gICAga2V5MjogYixcbiAgICBrZXkzOiBjXG4gICk6IE9ic2VydmFibGU8VFthXVtiXVtjXT47XG4gIHNlbGVjdDxcbiAgICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVxuICA+KGtleTE6IGEsIGtleTI6IGIsIGtleTM6IGMsIGtleTQ6IGQpOiBPYnNlcnZhYmxlPFRbYV1bYl1bY11bZF0+O1xuICBzZWxlY3Q8XG4gICAgYSBleHRlbmRzIGtleW9mIFQsXG4gICAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gICAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gICAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY10sXG4gICAgZSBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11bZF1cbiAgPihrZXkxOiBhLCBrZXkyOiBiLCBrZXkzOiBjLCBrZXk0OiBkLCBrZXk1OiBlKTogT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdW2VdPjtcbiAgc2VsZWN0PFxuICAgIGEgZXh0ZW5kcyBrZXlvZiBULFxuICAgIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICAgIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdLFxuICAgIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdLFxuICAgIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdLFxuICAgIGYgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdW2VdXG4gID4oXG4gICAga2V5MTogYSxcbiAgICBrZXkyOiBiLFxuICAgIGtleTM6IGMsXG4gICAga2V5NDogZCxcbiAgICBrZXk1OiBlLFxuICAgIGtleTY6IGZcbiAgKTogT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdW2VdW2ZdPjtcbiAgc2VsZWN0PFxuICAgIGEgZXh0ZW5kcyBrZXlvZiBULFxuICAgIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICAgIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdLFxuICAgIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdLFxuICAgIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdLFxuICAgIGYgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdW2VdLFxuICAgIEsgPSBhbnlcbiAgPihcbiAgICBrZXkxOiBhLFxuICAgIGtleTI6IGIsXG4gICAga2V5MzogYyxcbiAgICBrZXk0OiBkLFxuICAgIGtleTU6IGUsXG4gICAga2V5NjogZixcbiAgICAuLi5wYXRoczogc3RyaW5nW11cbiAgKTogT2JzZXJ2YWJsZTxLPjtcbiAgc2VsZWN0PFByb3BzID0gYW55LCBLID0gYW55PihcbiAgICBwYXRoT3JNYXBGbjogKChzdGF0ZTogVCwgcHJvcHM/OiBQcm9wcykgPT4gSykgfCBzdHJpbmcsXG4gICAgLi4ucGF0aHM6IHN0cmluZ1tdXG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIChzZWxlY3QgYXMgYW55KS5jYWxsKG51bGwsIHBhdGhPck1hcEZuLCAuLi5wYXRocykodGhpcyk7XG4gIH1cblxuICBsaWZ0PFI+KG9wZXJhdG9yOiBPcGVyYXRvcjxULCBSPik6IFN0b3JlPFI+IHtcbiAgICBjb25zdCBzdG9yZSA9IG5ldyBTdG9yZTxSPih0aGlzLCB0aGlzLmFjdGlvbnNPYnNlcnZlciwgdGhpcy5yZWR1Y2VyTWFuYWdlcik7XG4gICAgc3RvcmUub3BlcmF0b3IgPSBvcGVyYXRvcjtcblxuICAgIHJldHVybiBzdG9yZTtcbiAgfVxuXG4gIGRpc3BhdGNoPFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICAgIGFjdGlvbjogViAmXG4gICAgICBGdW5jdGlvbklzTm90QWxsb3dlZDxcbiAgICAgICAgVixcbiAgICAgICAgJ0Z1bmN0aW9ucyBhcmUgbm90IGFsbG93ZWQgdG8gYmUgZGlzcGF0Y2hlZC4gRGlkIHlvdSBmb3JnZXQgdG8gY2FsbCBhY3Rpb24gY3JlYXRvciBmdW5jdGlvbj8nXG4gICAgICA+XG4gICkge1xuICAgIHRoaXMuYWN0aW9uc09ic2VydmVyLm5leHQoYWN0aW9uKTtcbiAgfVxuXG4gIG5leHQoYWN0aW9uOiBBY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbnNPYnNlcnZlci5uZXh0KGFjdGlvbik7XG4gIH1cblxuICBlcnJvcihlcnI6IGFueSkge1xuICAgIHRoaXMuYWN0aW9uc09ic2VydmVyLmVycm9yKGVycik7XG4gIH1cblxuICBjb21wbGV0ZSgpIHtcbiAgICB0aGlzLmFjdGlvbnNPYnNlcnZlci5jb21wbGV0ZSgpO1xuICB9XG5cbiAgYWRkUmVkdWNlcjxTdGF0ZSwgQWN0aW9ucyBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAga2V5OiBzdHJpbmcsXG4gICAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxTdGF0ZSwgQWN0aW9ucz5cbiAgKSB7XG4gICAgdGhpcy5yZWR1Y2VyTWFuYWdlci5hZGRSZWR1Y2VyKGtleSwgcmVkdWNlcik7XG4gIH1cblxuICByZW1vdmVSZWR1Y2VyPEtleSBleHRlbmRzIEV4dHJhY3Q8a2V5b2YgVCwgc3RyaW5nPj4oa2V5OiBLZXkpIHtcbiAgICB0aGlzLnJlZHVjZXJNYW5hZ2VyLnJlbW92ZVJlZHVjZXIoa2V5KTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgU1RPUkVfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1N0b3JlXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxULCBQcm9wcywgSz4oXG4gIG1hcEZuOiAoc3RhdGU6IFQsIHByb3BzOiBQcm9wcykgPT4gSyxcbiAgcHJvcHM/OiBQcm9wc1xuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8Sz47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFQsIGEgZXh0ZW5kcyBrZXlvZiBUPihcbiAga2V5OiBhXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUW2FdPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8VCwgYSBleHRlbmRzIGtleW9mIFQsIGIgZXh0ZW5kcyBrZXlvZiBUW2FdPihcbiAga2V5MTogYSxcbiAga2V5MjogYlxuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VFthXVtiXT47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFxuICBULFxuICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdXG4+KFxuICBrZXkxOiBhLFxuICBrZXkyOiBiLFxuICBrZXkzOiBjXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUW2FdW2JdW2NdPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8XG4gIFQsXG4gIGEgZXh0ZW5kcyBrZXlvZiBULFxuICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdXG4+KFxuICBrZXkxOiBhLFxuICBrZXkyOiBiLFxuICBrZXkzOiBjLFxuICBrZXk0OiBkXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8XG4gIFQsXG4gIGEgZXh0ZW5kcyBrZXlvZiBULFxuICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdLFxuICBlIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXVxuPihcbiAga2V5MTogYSxcbiAga2V5MjogYixcbiAga2V5MzogYyxcbiAga2V5NDogZCxcbiAga2V5NTogZVxuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXVtlXT47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFxuICBULFxuICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdLFxuICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXSxcbiAgZSBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11bZF0sXG4gIGYgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdW2VdXG4+KFxuICBrZXkxOiBhLFxuICBrZXkyOiBiLFxuICBrZXkzOiBjLFxuICBrZXk0OiBkLFxuICBrZXk1OiBlLFxuICBrZXk2OiBmXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdW2VdW2ZdPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8XG4gIFQsXG4gIGEgZXh0ZW5kcyBrZXlvZiBULFxuICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdLFxuICBlIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXSxcbiAgZiBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11bZF1bZV0sXG4gIEsgPSBhbnlcbj4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGIsXG4gIGtleTM6IGMsXG4gIGtleTQ6IGQsXG4gIGtleTU6IGUsXG4gIGtleTY6IGYsXG4gIC4uLnBhdGhzOiBzdHJpbmdbXVxuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8Sz47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFQsIFByb3BzLCBLPihcbiAgcGF0aE9yTWFwRm46ICgoc3RhdGU6IFQsIHByb3BzPzogUHJvcHMpID0+IGFueSkgfCBzdHJpbmcsXG4gIHByb3BzT3JQYXRoPzogUHJvcHMgfCBzdHJpbmcsXG4gIC4uLnBhdGhzOiBzdHJpbmdbXVxuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBzZWxlY3RPcGVyYXRvcihzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KTogT2JzZXJ2YWJsZTxLPiB7XG4gICAgbGV0IG1hcHBlZCQ6IE9ic2VydmFibGU8YW55PjtcblxuICAgIGlmICh0eXBlb2YgcGF0aE9yTWFwRm4gPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBwYXRoU2xpY2VzID0gWzxzdHJpbmc+cHJvcHNPclBhdGgsIC4uLnBhdGhzXS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICBtYXBwZWQkID0gc291cmNlJC5waXBlKHBsdWNrKHBhdGhPck1hcEZuLCAuLi5wYXRoU2xpY2VzKSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGF0aE9yTWFwRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG1hcHBlZCQgPSBzb3VyY2UkLnBpcGUoXG4gICAgICAgIG1hcChzb3VyY2UgPT4gcGF0aE9yTWFwRm4oc291cmNlLCA8UHJvcHM+cHJvcHNPclBhdGgpKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgYFVuZXhwZWN0ZWQgdHlwZSAnJHt0eXBlb2YgcGF0aE9yTWFwRm59JyBpbiBzZWxlY3Qgb3BlcmF0b3IsYCArXG4gICAgICAgICAgYCBleHBlY3RlZCAnc3RyaW5nJyBvciAnZnVuY3Rpb24nYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwcGVkJC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9O1xufVxuIl19