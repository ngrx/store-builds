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
            (source) => pathOrMapFn(source, (/** @type {?} */ (propsOrPath))))));
        }
        else {
            throw new TypeError(`Unexpected type '${typeof pathOrMapFn}' in select operator,` +
                ` expected 'string' or 'function'`);
        }
        return mapped$.pipe(distinctUntilChanged());
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBc0IsTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7QUFHMUMsTUFBTSxPQUFPLEtBQWtCLFNBQVEsVUFBYTs7Ozs7O0lBRWxELFlBQ0UsTUFBdUIsRUFDZixlQUErQixFQUMvQixjQUE4QjtRQUV0QyxLQUFLLEVBQUUsQ0FBQztRQUhBLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFJdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQzs7Ozs7OztJQThERCxNQUFNLENBQ0osV0FBc0QsRUFDdEQsR0FBRyxLQUFlO1FBRWxCLE9BQU8sQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakUsQ0FBQzs7Ozs7O0lBRUQsSUFBSSxDQUFJLFFBQXdCOztjQUN4QixLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMzRSxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUUxQixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7OztJQUVELFFBQVEsQ0FDTixNQUlHO1FBRUgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCxJQUFJLENBQUMsTUFBYztRQUNqQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVELEtBQUssQ0FBQyxHQUFRO1FBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xDLENBQUM7Ozs7Ozs7SUFFRCxVQUFVLENBQ1IsR0FBVyxFQUNYLE9BQXNDO1FBRXRDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7Ozs7SUFFRCxhQUFhLENBQXVDLEdBQVE7UUFDMUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekMsQ0FBQzs7O1lBdEhGLFVBQVU7Ozs7WUFGRixlQUFlO1lBSGYsY0FBYztZQUVkLGNBQWM7Ozs7Ozs7SUFRbkIsZ0NBQXVDOzs7OztJQUN2QywrQkFBc0M7OztBQW1IMUMsTUFBTSxPQUFPLGVBQWUsR0FBZSxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozs7QUFtRmxELE1BQU0sVUFBVSxNQUFNLENBQ3BCLFdBQXdELEVBQ3hELFdBQTRCLEVBQzVCLEdBQUcsS0FBZTtJQUVsQjs7OztJQUFPLFNBQVMsY0FBYyxDQUFDLE9BQXNCOztZQUMvQyxPQUF3QjtRQUU1QixJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVEsRUFBRTs7a0JBQzdCLFVBQVUsR0FBRyxDQUFDLG1CQUFRLFdBQVcsRUFBQSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNsRSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUMzRDthQUFNLElBQUksT0FBTyxXQUFXLEtBQUssVUFBVSxFQUFFO1lBQzVDLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUNwQixHQUFHOzs7O1lBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsbUJBQU8sV0FBVyxFQUFBLENBQUMsRUFBQyxDQUN6RCxDQUFDO1NBQ0g7YUFBTTtZQUNMLE1BQU0sSUFBSSxTQUFTLENBQ2pCLG9CQUFvQixPQUFPLFdBQVcsdUJBQXVCO2dCQUMzRCxrQ0FBa0MsQ0FDckMsQ0FBQztTQUNIO1FBRUQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDLEVBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBPcGVyYXRvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgcGx1Y2sgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFjdGlvbnNTdWJqZWN0IH0gZnJvbSAnLi9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHsgQWN0aW9uLCBBY3Rpb25SZWR1Y2VyLCBGdW5jdGlvbklzTm90QWxsb3dlZCB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IFJlZHVjZXJNYW5hZ2VyIH0gZnJvbSAnLi9yZWR1Y2VyX21hbmFnZXInO1xuaW1wb3J0IHsgU3RhdGVPYnNlcnZhYmxlIH0gZnJvbSAnLi9zdGF0ZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdG9yZTxUID0gb2JqZWN0PiBleHRlbmRzIE9ic2VydmFibGU8VD5cbiAgaW1wbGVtZW50cyBPYnNlcnZlcjxBY3Rpb24+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgc3RhdGUkOiBTdGF0ZU9ic2VydmFibGUsXG4gICAgcHJpdmF0ZSBhY3Rpb25zT2JzZXJ2ZXI6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHByaXZhdGUgcmVkdWNlck1hbmFnZXI6IFJlZHVjZXJNYW5hZ2VyXG4gICkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNvdXJjZSA9IHN0YXRlJDtcbiAgfVxuXG4gIHNlbGVjdDxLPihtYXBGbjogKHN0YXRlOiBUKSA9PiBLKTogT2JzZXJ2YWJsZTxLPjtcbiAgc2VsZWN0PEssIFByb3BzID0gYW55PihcbiAgICBtYXBGbjogKHN0YXRlOiBULCBwcm9wczogUHJvcHMpID0+IEssXG4gICAgcHJvcHM6IFByb3BzXG4gICk6IE9ic2VydmFibGU8Sz47XG4gIHNlbGVjdDxhIGV4dGVuZHMga2V5b2YgVD4oa2V5OiBhKTogT2JzZXJ2YWJsZTxUW2FdPjtcbiAgc2VsZWN0PGEgZXh0ZW5kcyBrZXlvZiBULCBiIGV4dGVuZHMga2V5b2YgVFthXT4oXG4gICAga2V5MTogYSxcbiAgICBrZXkyOiBiXG4gICk6IE9ic2VydmFibGU8VFthXVtiXT47XG4gIHNlbGVjdDxhIGV4dGVuZHMga2V5b2YgVCwgYiBleHRlbmRzIGtleW9mIFRbYV0sIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdPihcbiAgICBrZXkxOiBhLFxuICAgIGtleTI6IGIsXG4gICAga2V5MzogY1xuICApOiBPYnNlcnZhYmxlPFRbYV1bYl1bY10+O1xuICBzZWxlY3Q8XG4gICAgYSBleHRlbmRzIGtleW9mIFQsXG4gICAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gICAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gICAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11cbiAgPihrZXkxOiBhLCBrZXkyOiBiLCBrZXkzOiBjLCBrZXk0OiBkKTogT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdPjtcbiAgc2VsZWN0PFxuICAgIGEgZXh0ZW5kcyBrZXlvZiBULFxuICAgIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICAgIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdLFxuICAgIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdLFxuICAgIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdXG4gID4oa2V5MTogYSwga2V5MjogYiwga2V5MzogYywga2V5NDogZCwga2V5NTogZSk6IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXVtlXT47XG4gIHNlbGVjdDxcbiAgICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXSxcbiAgICBlIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXSxcbiAgICBmIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXVtlXVxuICA+KFxuICAgIGtleTE6IGEsXG4gICAga2V5MjogYixcbiAgICBrZXkzOiBjLFxuICAgIGtleTQ6IGQsXG4gICAga2V5NTogZSxcbiAgICBrZXk2OiBmXG4gICk6IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXVtlXVtmXT47XG4gIHNlbGVjdDxcbiAgICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXSxcbiAgICBlIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXSxcbiAgICBmIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXVtlXSxcbiAgICBLID0gYW55XG4gID4oXG4gICAga2V5MTogYSxcbiAgICBrZXkyOiBiLFxuICAgIGtleTM6IGMsXG4gICAga2V5NDogZCxcbiAgICBrZXk1OiBlLFxuICAgIGtleTY6IGYsXG4gICAgLi4ucGF0aHM6IHN0cmluZ1tdXG4gICk6IE9ic2VydmFibGU8Sz47XG4gIHNlbGVjdDxQcm9wcyA9IGFueSwgSyA9IGFueT4oXG4gICAgcGF0aE9yTWFwRm46ICgoc3RhdGU6IFQsIHByb3BzPzogUHJvcHMpID0+IEspIHwgc3RyaW5nLFxuICAgIC4uLnBhdGhzOiBzdHJpbmdbXVxuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiAoc2VsZWN0IGFzIGFueSkuY2FsbChudWxsLCBwYXRoT3JNYXBGbiwgLi4ucGF0aHMpKHRoaXMpO1xuICB9XG5cbiAgbGlmdDxSPihvcGVyYXRvcjogT3BlcmF0b3I8VCwgUj4pOiBTdG9yZTxSPiB7XG4gICAgY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmU8Uj4odGhpcywgdGhpcy5hY3Rpb25zT2JzZXJ2ZXIsIHRoaXMucmVkdWNlck1hbmFnZXIpO1xuICAgIHN0b3JlLm9wZXJhdG9yID0gb3BlcmF0b3I7XG5cbiAgICByZXR1cm4gc3RvcmU7XG4gIH1cblxuICBkaXNwYXRjaDxWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICBhY3Rpb246IFYgJlxuICAgICAgRnVuY3Rpb25Jc05vdEFsbG93ZWQ8XG4gICAgICAgIFYsXG4gICAgICAgICdGdW5jdGlvbnMgYXJlIG5vdCBhbGxvd2VkIHRvIGJlIGRpc3BhdGNoZWQuIERpZCB5b3UgZm9yZ2V0IHRvIGNhbGwgdGhlIGFjdGlvbiBjcmVhdG9yIGZ1bmN0aW9uPydcbiAgICAgID5cbiAgKSB7XG4gICAgdGhpcy5hY3Rpb25zT2JzZXJ2ZXIubmV4dChhY3Rpb24pO1xuICB9XG5cbiAgbmV4dChhY3Rpb246IEFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uc09ic2VydmVyLm5leHQoYWN0aW9uKTtcbiAgfVxuXG4gIGVycm9yKGVycjogYW55KSB7XG4gICAgdGhpcy5hY3Rpb25zT2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgfVxuXG4gIGNvbXBsZXRlKCkge1xuICAgIHRoaXMuYWN0aW9uc09ic2VydmVyLmNvbXBsZXRlKCk7XG4gIH1cblxuICBhZGRSZWR1Y2VyPFN0YXRlLCBBY3Rpb25zIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICBrZXk6IHN0cmluZyxcbiAgICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFN0YXRlLCBBY3Rpb25zPlxuICApIHtcbiAgICB0aGlzLnJlZHVjZXJNYW5hZ2VyLmFkZFJlZHVjZXIoa2V5LCByZWR1Y2VyKTtcbiAgfVxuXG4gIHJlbW92ZVJlZHVjZXI8S2V5IGV4dGVuZHMgRXh0cmFjdDxrZXlvZiBULCBzdHJpbmc+PihrZXk6IEtleSkge1xuICAgIHRoaXMucmVkdWNlck1hbmFnZXIucmVtb3ZlUmVkdWNlcihrZXkpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBTVE9SRV9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbU3RvcmVdO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFQsIFByb3BzLCBLPihcbiAgbWFwRm46IChzdGF0ZTogVCwgcHJvcHM6IFByb3BzKSA9PiBLLFxuICBwcm9wcz86IFByb3BzXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxLPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8VCwgYSBleHRlbmRzIGtleW9mIFQ+KFxuICBrZXk6IGFcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxULCBhIGV4dGVuZHMga2V5b2YgVCwgYiBleHRlbmRzIGtleW9mIFRbYV0+KFxuICBrZXkxOiBhLFxuICBrZXkyOiBiXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUW2FdW2JdPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8XG4gIFQsXG4gIGEgZXh0ZW5kcyBrZXlvZiBULFxuICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl1cbj4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGIsXG4gIGtleTM6IGNcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV1bYl1bY10+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxcbiAgVCxcbiAgYSBleHRlbmRzIGtleW9mIFQsXG4gIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11cbj4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGIsXG4gIGtleTM6IGMsXG4gIGtleTQ6IGRcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV1bYl1bY11bZF0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxcbiAgVCxcbiAgYSBleHRlbmRzIGtleW9mIFQsXG4gIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY10sXG4gIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdXG4+KFxuICBrZXkxOiBhLFxuICBrZXkyOiBiLFxuICBrZXkzOiBjLFxuICBrZXk0OiBkLFxuICBrZXk1OiBlXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdW2VdPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8XG4gIFQsXG4gIGEgZXh0ZW5kcyBrZXlvZiBULFxuICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdLFxuICBlIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXSxcbiAgZiBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11bZF1bZV1cbj4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGIsXG4gIGtleTM6IGMsXG4gIGtleTQ6IGQsXG4gIGtleTU6IGUsXG4gIGtleTY6IGZcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV1bYl1bY11bZF1bZV1bZl0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxcbiAgVCxcbiAgYSBleHRlbmRzIGtleW9mIFQsXG4gIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY10sXG4gIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdLFxuICBmIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXVtlXSxcbiAgSyA9IGFueVxuPihcbiAga2V5MTogYSxcbiAga2V5MjogYixcbiAga2V5MzogYyxcbiAga2V5NDogZCxcbiAga2V5NTogZSxcbiAga2V5NjogZixcbiAgLi4ucGF0aHM6IHN0cmluZ1tdXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxLPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8VCwgUHJvcHMsIEs+KFxuICBwYXRoT3JNYXBGbjogKChzdGF0ZTogVCwgcHJvcHM/OiBQcm9wcykgPT4gYW55KSB8IHN0cmluZyxcbiAgcHJvcHNPclBhdGg/OiBQcm9wcyB8IHN0cmluZyxcbiAgLi4ucGF0aHM6IHN0cmluZ1tdXG4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNlbGVjdE9wZXJhdG9yKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pOiBPYnNlcnZhYmxlPEs+IHtcbiAgICBsZXQgbWFwcGVkJDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gICAgaWYgKHR5cGVvZiBwYXRoT3JNYXBGbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHBhdGhTbGljZXMgPSBbPHN0cmluZz5wcm9wc09yUGF0aCwgLi4ucGF0aHNdLmZpbHRlcihCb29sZWFuKTtcbiAgICAgIG1hcHBlZCQgPSBzb3VyY2UkLnBpcGUocGx1Y2socGF0aE9yTWFwRm4sIC4uLnBhdGhTbGljZXMpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXRoT3JNYXBGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbWFwcGVkJCA9IHNvdXJjZSQucGlwZShcbiAgICAgICAgbWFwKChzb3VyY2UpID0+IHBhdGhPck1hcEZuKHNvdXJjZSwgPFByb3BzPnByb3BzT3JQYXRoKSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgIGBVbmV4cGVjdGVkIHR5cGUgJyR7dHlwZW9mIHBhdGhPck1hcEZufScgaW4gc2VsZWN0IG9wZXJhdG9yLGAgK1xuICAgICAgICAgIGAgZXhwZWN0ZWQgJ3N0cmluZycgb3IgJ2Z1bmN0aW9uJ2BcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcHBlZCQucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfTtcbn1cbiJdfQ==