/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @param {?} pathOrMapFn
     * @param {...?} paths
     * @return {?}
     */
    select(pathOrMapFn, ...paths) {
        return select.call(null, pathOrMapFn, ...paths)(this);
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
    /** @type {?} */
    Store.prototype.actionsObserver;
    /** @type {?} */
    Store.prototype.reducerManager;
}
/** @type {?} */
export const STORE_PROVIDERS = [Store];
/**
 * @template T, Props, K
 * @param {?} pathOrMapFn
 * @param {?} propsOrPath
 * @param {...?} paths
 * @return {?}
 */
export function select(pathOrMapFn, propsOrPath, ...paths) {
    return function selectOperator(source$) {
        /** @type {?} */
        let mapped$;
        if (typeof pathOrMapFn === 'string') {
            /** @type {?} */
            const pathSlices = [/** @type {?} */ (propsOrPath), ...paths].filter(Boolean);
            mapped$ = source$.pipe(pluck(pathOrMapFn, ...pathSlices));
        }
        else if (typeof pathOrMapFn === 'function') {
            mapped$ = source$.pipe(map(source => pathOrMapFn(source, /** @type {?} */ (propsOrPath))));
        }
        else {
            throw new TypeError(`Unexpected type '${typeof pathOrMapFn}' in select operator,` +
                ` expected 'string' or 'function'`);
        }
        return mapped$.pipe(distinctUntilChanged());
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFzQixNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7OztBQUcxQyxNQUFNLFlBQWdCLFNBQVEsVUFBYTs7Ozs7O0lBQ3pDLFlBQ0UsTUFBdUIsRUFDZixpQkFDQTtRQUVSLEtBQUssRUFBRSxDQUFDO1FBSEEsb0JBQWUsR0FBZixlQUFlO1FBQ2YsbUJBQWMsR0FBZCxjQUFjO1FBSXRCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3RCOzs7Ozs7SUE4Q0QsTUFBTSxDQUNKLFdBQXlDLEVBQ3pDLEdBQUcsS0FBZTtRQUVsQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZEOzs7Ozs7SUFFRCxJQUFJLENBQUksUUFBd0I7O1FBQzlCLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFJLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1RSxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUUxQixPQUFPLEtBQUssQ0FBQztLQUNkOzs7Ozs7SUFFRCxRQUFRLENBQTRCLE1BQVM7UUFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbkM7Ozs7O0lBRUQsSUFBSSxDQUFDLE1BQWM7UUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbkM7Ozs7O0lBRUQsS0FBSyxDQUFDLEdBQVE7UUFDWixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNqQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ2pDOzs7Ozs7O0lBRUQsVUFBVSxDQUNSLEdBQVcsRUFDWCxPQUFzQztRQUV0QyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDOUM7Ozs7OztJQUVELGFBQWEsQ0FBdUMsR0FBUTtRQUMxRCxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN4Qzs7O1lBL0ZGLFVBQVU7Ozs7WUFGRixlQUFlO1lBSGYsY0FBYztZQUVkLGNBQWM7Ozs7Ozs7OztBQXFHdkIsYUFBYSxlQUFlLEdBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7QUEwRW5ELE1BQU0saUJBQ0osV0FBd0QsRUFDeEQsV0FBMkIsRUFDM0IsR0FBRyxLQUFlO0lBRWxCLE9BQU8sd0JBQXdCLE9BQXNCOztRQUNuRCxJQUFJLE9BQU8sQ0FBa0I7UUFFN0IsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7O1lBQ25DLE1BQU0sVUFBVSxHQUFHLG1CQUFTLFdBQVcsR0FBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuRSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUMzRDthQUFNLElBQUksT0FBTyxXQUFXLEtBQUssVUFBVSxFQUFFO1lBQzVDLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUNwQixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxvQkFBUyxXQUFXLEVBQUMsQ0FBQyxDQUN2RCxDQUFDO1NBQ0g7YUFBTTtZQUNMLE1BQU0sSUFBSSxTQUFTLENBQ2pCLG9CQUFvQixPQUFPLFdBQVcsdUJBQXVCO2dCQUMzRCxrQ0FBa0MsQ0FDckMsQ0FBQztTQUNIO1FBRUQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztLQUM3QyxDQUFDO0NBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIE9wZXJhdG9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBwbHVjayB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQWN0aW9uc1N1YmplY3QgfSBmcm9tICcuL2FjdGlvbnNfc3ViamVjdCc7XG5pbXBvcnQgeyBBY3Rpb24sIEFjdGlvblJlZHVjZXIgfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBSZWR1Y2VyTWFuYWdlciB9IGZyb20gJy4vcmVkdWNlcl9tYW5hZ2VyJztcbmltcG9ydCB7IFN0YXRlT2JzZXJ2YWJsZSB9IGZyb20gJy4vc3RhdGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RvcmU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IGltcGxlbWVudHMgT2JzZXJ2ZXI8QWN0aW9uPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHN0YXRlJDogU3RhdGVPYnNlcnZhYmxlLFxuICAgIHByaXZhdGUgYWN0aW9uc09ic2VydmVyOiBBY3Rpb25zU3ViamVjdCxcbiAgICBwcml2YXRlIHJlZHVjZXJNYW5hZ2VyOiBSZWR1Y2VyTWFuYWdlclxuICApIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zb3VyY2UgPSBzdGF0ZSQ7XG4gIH1cblxuICBzZWxlY3Q8Sz4obWFwRm46IChzdGF0ZTogVCkgPT4gSyk6IE9ic2VydmFibGU8Sz47XG4gIHNlbGVjdDxhIGV4dGVuZHMga2V5b2YgVD4oa2V5OiBhKTogT2JzZXJ2YWJsZTxUW2FdPjtcbiAgc2VsZWN0PGEgZXh0ZW5kcyBrZXlvZiBULCBiIGV4dGVuZHMga2V5b2YgVFthXT4oXG4gICAga2V5MTogYSxcbiAgICBrZXkyOiBiXG4gICk6IE9ic2VydmFibGU8VFthXVtiXT47XG4gIHNlbGVjdDxhIGV4dGVuZHMga2V5b2YgVCwgYiBleHRlbmRzIGtleW9mIFRbYV0sIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdPihcbiAgICBrZXkxOiBhLFxuICAgIGtleTI6IGIsXG4gICAga2V5MzogY1xuICApOiBPYnNlcnZhYmxlPFRbYV1bYl1bY10+O1xuICBzZWxlY3Q8XG4gICAgYSBleHRlbmRzIGtleW9mIFQsXG4gICAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gICAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gICAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11cbiAgPihrZXkxOiBhLCBrZXkyOiBiLCBrZXkzOiBjLCBrZXk0OiBkKTogT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdPjtcbiAgc2VsZWN0PFxuICAgIGEgZXh0ZW5kcyBrZXlvZiBULFxuICAgIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICAgIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdLFxuICAgIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdLFxuICAgIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdXG4gID4oa2V5MTogYSwga2V5MjogYiwga2V5MzogYywga2V5NDogZCwga2V5NTogZSk6IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXVtlXT47XG4gIHNlbGVjdDxcbiAgICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXSxcbiAgICBlIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXSxcbiAgICBmIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXVtlXVxuICA+KFxuICAgIGtleTE6IGEsXG4gICAga2V5MjogYixcbiAgICBrZXkzOiBjLFxuICAgIGtleTQ6IGQsXG4gICAga2V5NTogZSxcbiAgICBrZXk2OiBmXG4gICk6IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXVtlXVtmXT47XG4gIC8qKlxuICAgKiBUaGlzIG92ZXJsb2FkIGlzIHVzZWQgdG8gc3VwcG9ydCBzcHJlYWQgb3BlcmF0b3Igd2l0aFxuICAgKiBmaXhlZCBsZW5ndGggdHVwbGVzIHR5cGUgaW4gdHlwZXNjcmlwdCAyLjdcbiAgICovXG4gIHNlbGVjdDxLID0gYW55PiguLi5wYXRoczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPEs+O1xuICBzZWxlY3QoXG4gICAgcGF0aE9yTWFwRm46ICgoc3RhdGU6IFQpID0+IGFueSkgfCBzdHJpbmcsXG4gICAgLi4ucGF0aHM6IHN0cmluZ1tdXG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHNlbGVjdC5jYWxsKG51bGwsIHBhdGhPck1hcEZuLCAuLi5wYXRocykodGhpcyk7XG4gIH1cblxuICBsaWZ0PFI+KG9wZXJhdG9yOiBPcGVyYXRvcjxULCBSPik6IFN0b3JlPFI+IHtcbiAgICBjb25zdCBzdG9yZSA9IG5ldyBTdG9yZTxSPih0aGlzLCB0aGlzLmFjdGlvbnNPYnNlcnZlciwgdGhpcy5yZWR1Y2VyTWFuYWdlcik7XG4gICAgc3RvcmUub3BlcmF0b3IgPSBvcGVyYXRvcjtcblxuICAgIHJldHVybiBzdG9yZTtcbiAgfVxuXG4gIGRpc3BhdGNoPFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KGFjdGlvbjogVikge1xuICAgIHRoaXMuYWN0aW9uc09ic2VydmVyLm5leHQoYWN0aW9uKTtcbiAgfVxuXG4gIG5leHQoYWN0aW9uOiBBY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbnNPYnNlcnZlci5uZXh0KGFjdGlvbik7XG4gIH1cblxuICBlcnJvcihlcnI6IGFueSkge1xuICAgIHRoaXMuYWN0aW9uc09ic2VydmVyLmVycm9yKGVycik7XG4gIH1cblxuICBjb21wbGV0ZSgpIHtcbiAgICB0aGlzLmFjdGlvbnNPYnNlcnZlci5jb21wbGV0ZSgpO1xuICB9XG5cbiAgYWRkUmVkdWNlcjxTdGF0ZSwgQWN0aW9ucyBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAga2V5OiBzdHJpbmcsXG4gICAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxTdGF0ZSwgQWN0aW9ucz5cbiAgKSB7XG4gICAgdGhpcy5yZWR1Y2VyTWFuYWdlci5hZGRSZWR1Y2VyKGtleSwgcmVkdWNlcik7XG4gIH1cblxuICByZW1vdmVSZWR1Y2VyPEtleSBleHRlbmRzIEV4dHJhY3Q8a2V5b2YgVCwgc3RyaW5nPj4oa2V5OiBLZXkpIHtcbiAgICB0aGlzLnJlZHVjZXJNYW5hZ2VyLnJlbW92ZVJlZHVjZXIoa2V5KTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgU1RPUkVfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1N0b3JlXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxULCBQcm9wcywgSz4oXG4gIG1hcEZuOiAoc3RhdGU6IFQsIHByb3BzOiBQcm9wcykgPT4gSyxcbiAgcHJvcHM/OiBQcm9wc1xuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8Sz47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFQsIGEgZXh0ZW5kcyBrZXlvZiBUPihcbiAga2V5OiBhLFxuICBwcm9wczogbnVsbFxuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VFthXT47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFQsIGEgZXh0ZW5kcyBrZXlvZiBULCBiIGV4dGVuZHMga2V5b2YgVFthXT4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGJcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV1bYl0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxcbiAgVCxcbiAgYSBleHRlbmRzIGtleW9mIFQsXG4gIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXVxuPihcbiAga2V5MTogYSxcbiAga2V5MjogYixcbiAga2V5MzogY1xuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VFthXVtiXVtjXT47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFxuICBULFxuICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdLFxuICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVxuPihcbiAga2V5MTogYSxcbiAga2V5MjogYixcbiAga2V5MzogYyxcbiAga2V5NDogZFxuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXT47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFxuICBULFxuICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdLFxuICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXSxcbiAgZSBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11bZF1cbj4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGIsXG4gIGtleTM6IGMsXG4gIGtleTQ6IGQsXG4gIGtleTU6IGVcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV1bYl1bY11bZF1bZV0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxcbiAgVCxcbiAgYSBleHRlbmRzIGtleW9mIFQsXG4gIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY10sXG4gIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdLFxuICBmIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXVtlXVxuPihcbiAga2V5MTogYSxcbiAga2V5MjogYixcbiAga2V5MzogYyxcbiAga2V5NDogZCxcbiAga2V5NTogZSxcbiAga2V5NjogZlxuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXVtlXVtmXT47XG4vKipcbiAqIFRoaXMgb3ZlcmxvYWQgaXMgdXNlZCB0byBzdXBwb3J0IHNwcmVhZCBvcGVyYXRvciB3aXRoXG4gKiBmaXhlZCBsZW5ndGggdHVwbGVzIHR5cGUgaW4gdHlwZXNjcmlwdCAyLjdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxULCBQcm9wcyA9IGFueSwgSyA9IGFueT4oXG4gIHByb3BzT3JQYXRoOiBQcm9wcyxcbiAgLi4ucGF0aHM6IHN0cmluZ1tdXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxLPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8VCwgUHJvcHMsIEs+KFxuICBwYXRoT3JNYXBGbjogKChzdGF0ZTogVCwgcHJvcHM/OiBQcm9wcykgPT4gYW55KSB8IHN0cmluZyxcbiAgcHJvcHNPclBhdGg6IFByb3BzIHwgc3RyaW5nLFxuICAuLi5wYXRoczogc3RyaW5nW11cbikge1xuICByZXR1cm4gZnVuY3Rpb24gc2VsZWN0T3BlcmF0b3Ioc291cmNlJDogT2JzZXJ2YWJsZTxUPik6IE9ic2VydmFibGU8Sz4ge1xuICAgIGxldCBtYXBwZWQkOiBPYnNlcnZhYmxlPGFueT47XG5cbiAgICBpZiAodHlwZW9mIHBhdGhPck1hcEZuID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgcGF0aFNsaWNlcyA9IFs8c3RyaW5nPnByb3BzT3JQYXRoLCAuLi5wYXRoc10uZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgbWFwcGVkJCA9IHNvdXJjZSQucGlwZShwbHVjayhwYXRoT3JNYXBGbiwgLi4ucGF0aFNsaWNlcykpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhdGhPck1hcEZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBtYXBwZWQkID0gc291cmNlJC5waXBlKFxuICAgICAgICBtYXAoc291cmNlID0+IHBhdGhPck1hcEZuKHNvdXJjZSwgPFByb3BzPnByb3BzT3JQYXRoKSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgIGBVbmV4cGVjdGVkIHR5cGUgJyR7dHlwZW9mIHBhdGhPck1hcEZufScgaW4gc2VsZWN0IG9wZXJhdG9yLGAgK1xuICAgICAgICAgIGAgZXhwZWN0ZWQgJ3N0cmluZycgb3IgJ2Z1bmN0aW9uJ2BcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcHBlZCQucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfTtcbn1cbiJdfQ==