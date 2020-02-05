/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/src/store.ts
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
            source => pathOrMapFn(source, (/** @type {?} */ (propsOrPath))))));
        }
        else {
            throw new TypeError(`Unexpected type '${typeof pathOrMapFn}' in select operator,` +
                ` expected 'string' or 'function'`);
        }
        return mapped$.pipe(distinctUntilChanged());
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBc0IsTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7QUFHMUMsTUFBTSxPQUFPLEtBQWtCLFNBQVEsVUFBYTs7Ozs7O0lBRWxELFlBQ0UsTUFBdUIsRUFDZixlQUErQixFQUMvQixjQUE4QjtRQUV0QyxLQUFLLEVBQUUsQ0FBQztRQUhBLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFJdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQzs7Ozs7OztJQThERCxNQUFNLENBQ0osV0FBc0QsRUFDdEQsR0FBRyxLQUFlO1FBRWxCLE9BQU8sQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakUsQ0FBQzs7Ozs7O0lBRUQsSUFBSSxDQUFJLFFBQXdCOztjQUN4QixLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMzRSxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUUxQixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7OztJQUVELFFBQVEsQ0FDTixNQUlHO1FBRUgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCxJQUFJLENBQUMsTUFBYztRQUNqQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVELEtBQUssQ0FBQyxHQUFRO1FBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xDLENBQUM7Ozs7Ozs7SUFFRCxVQUFVLENBQ1IsR0FBVyxFQUNYLE9BQXNDO1FBRXRDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7Ozs7SUFFRCxhQUFhLENBQXVDLEdBQVE7UUFDMUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekMsQ0FBQzs7O1lBdEhGLFVBQVU7Ozs7WUFGRixlQUFlO1lBSGYsY0FBYztZQUVkLGNBQWM7Ozs7Ozs7SUFRbkIsZ0NBQXVDOzs7OztJQUN2QywrQkFBc0M7OztBQW1IMUMsTUFBTSxPQUFPLGVBQWUsR0FBZSxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozs7QUFtRmxELE1BQU0sVUFBVSxNQUFNLENBQ3BCLFdBQXdELEVBQ3hELFdBQTRCLEVBQzVCLEdBQUcsS0FBZTtJQUVsQjs7OztJQUFPLFNBQVMsY0FBYyxDQUFDLE9BQXNCOztZQUMvQyxPQUF3QjtRQUU1QixJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVEsRUFBRTs7a0JBQzdCLFVBQVUsR0FBRyxDQUFDLG1CQUFRLFdBQVcsRUFBQSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNsRSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUMzRDthQUFNLElBQUksT0FBTyxXQUFXLEtBQUssVUFBVSxFQUFFO1lBQzVDLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUNwQixHQUFHOzs7O1lBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLG1CQUFPLFdBQVcsRUFBQSxDQUFDLEVBQUMsQ0FDdkQsQ0FBQztTQUNIO2FBQU07WUFDTCxNQUFNLElBQUksU0FBUyxDQUNqQixvQkFBb0IsT0FBTyxXQUFXLHVCQUF1QjtnQkFDM0Qsa0NBQWtDLENBQ3JDLENBQUM7U0FDSDtRQUVELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQyxFQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciwgT3BlcmF0b3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHBsdWNrIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBY3Rpb25zU3ViamVjdCB9IGZyb20gJy4vYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7IEFjdGlvbiwgQWN0aW9uUmVkdWNlciwgRnVuY3Rpb25Jc05vdEFsbG93ZWQgfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBSZWR1Y2VyTWFuYWdlciB9IGZyb20gJy4vcmVkdWNlcl9tYW5hZ2VyJztcbmltcG9ydCB7IFN0YXRlT2JzZXJ2YWJsZSB9IGZyb20gJy4vc3RhdGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RvcmU8VCA9IG9iamVjdD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+XG4gIGltcGxlbWVudHMgT2JzZXJ2ZXI8QWN0aW9uPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHN0YXRlJDogU3RhdGVPYnNlcnZhYmxlLFxuICAgIHByaXZhdGUgYWN0aW9uc09ic2VydmVyOiBBY3Rpb25zU3ViamVjdCxcbiAgICBwcml2YXRlIHJlZHVjZXJNYW5hZ2VyOiBSZWR1Y2VyTWFuYWdlclxuICApIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zb3VyY2UgPSBzdGF0ZSQ7XG4gIH1cblxuICBzZWxlY3Q8Sz4obWFwRm46IChzdGF0ZTogVCkgPT4gSyk6IE9ic2VydmFibGU8Sz47XG4gIHNlbGVjdDxLLCBQcm9wcyA9IGFueT4oXG4gICAgbWFwRm46IChzdGF0ZTogVCwgcHJvcHM6IFByb3BzKSA9PiBLLFxuICAgIHByb3BzOiBQcm9wc1xuICApOiBPYnNlcnZhYmxlPEs+O1xuICBzZWxlY3Q8YSBleHRlbmRzIGtleW9mIFQ+KGtleTogYSk6IE9ic2VydmFibGU8VFthXT47XG4gIHNlbGVjdDxhIGV4dGVuZHMga2V5b2YgVCwgYiBleHRlbmRzIGtleW9mIFRbYV0+KFxuICAgIGtleTE6IGEsXG4gICAga2V5MjogYlxuICApOiBPYnNlcnZhYmxlPFRbYV1bYl0+O1xuICBzZWxlY3Q8YSBleHRlbmRzIGtleW9mIFQsIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLCBjIGV4dGVuZHMga2V5b2YgVFthXVtiXT4oXG4gICAga2V5MTogYSxcbiAgICBrZXkyOiBiLFxuICAgIGtleTM6IGNcbiAgKTogT2JzZXJ2YWJsZTxUW2FdW2JdW2NdPjtcbiAgc2VsZWN0PFxuICAgIGEgZXh0ZW5kcyBrZXlvZiBULFxuICAgIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICAgIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdLFxuICAgIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdXG4gID4oa2V5MTogYSwga2V5MjogYiwga2V5MzogYywga2V5NDogZCk6IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXT47XG4gIHNlbGVjdDxcbiAgICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXSxcbiAgICBlIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXVxuICA+KGtleTE6IGEsIGtleTI6IGIsIGtleTM6IGMsIGtleTQ6IGQsIGtleTU6IGUpOiBPYnNlcnZhYmxlPFRbYV1bYl1bY11bZF1bZV0+O1xuICBzZWxlY3Q8XG4gICAgYSBleHRlbmRzIGtleW9mIFQsXG4gICAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gICAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gICAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY10sXG4gICAgZSBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11bZF0sXG4gICAgZiBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11bZF1bZV1cbiAgPihcbiAgICBrZXkxOiBhLFxuICAgIGtleTI6IGIsXG4gICAga2V5MzogYyxcbiAgICBrZXk0OiBkLFxuICAgIGtleTU6IGUsXG4gICAga2V5NjogZlxuICApOiBPYnNlcnZhYmxlPFRbYV1bYl1bY11bZF1bZV1bZl0+O1xuICBzZWxlY3Q8XG4gICAgYSBleHRlbmRzIGtleW9mIFQsXG4gICAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gICAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gICAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY10sXG4gICAgZSBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11bZF0sXG4gICAgZiBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11bZF1bZV0sXG4gICAgSyA9IGFueVxuICA+KFxuICAgIGtleTE6IGEsXG4gICAga2V5MjogYixcbiAgICBrZXkzOiBjLFxuICAgIGtleTQ6IGQsXG4gICAga2V5NTogZSxcbiAgICBrZXk2OiBmLFxuICAgIC4uLnBhdGhzOiBzdHJpbmdbXVxuICApOiBPYnNlcnZhYmxlPEs+O1xuICBzZWxlY3Q8UHJvcHMgPSBhbnksIEsgPSBhbnk+KFxuICAgIHBhdGhPck1hcEZuOiAoKHN0YXRlOiBULCBwcm9wcz86IFByb3BzKSA9PiBLKSB8IHN0cmluZyxcbiAgICAuLi5wYXRoczogc3RyaW5nW11cbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gKHNlbGVjdCBhcyBhbnkpLmNhbGwobnVsbCwgcGF0aE9yTWFwRm4sIC4uLnBhdGhzKSh0aGlzKTtcbiAgfVxuXG4gIGxpZnQ8Uj4ob3BlcmF0b3I6IE9wZXJhdG9yPFQsIFI+KTogU3RvcmU8Uj4ge1xuICAgIGNvbnN0IHN0b3JlID0gbmV3IFN0b3JlPFI+KHRoaXMsIHRoaXMuYWN0aW9uc09ic2VydmVyLCB0aGlzLnJlZHVjZXJNYW5hZ2VyKTtcbiAgICBzdG9yZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xuXG4gICAgcmV0dXJuIHN0b3JlO1xuICB9XG5cbiAgZGlzcGF0Y2g8ViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAgYWN0aW9uOiBWICZcbiAgICAgIEZ1bmN0aW9uSXNOb3RBbGxvd2VkPFxuICAgICAgICBWLFxuICAgICAgICAnRnVuY3Rpb25zIGFyZSBub3QgYWxsb3dlZCB0byBiZSBkaXNwYXRjaGVkLiBEaWQgeW91IGZvcmdldCB0byBjYWxsIGFjdGlvbiBjcmVhdG9yIGZ1bmN0aW9uPydcbiAgICAgID5cbiAgKSB7XG4gICAgdGhpcy5hY3Rpb25zT2JzZXJ2ZXIubmV4dChhY3Rpb24pO1xuICB9XG5cbiAgbmV4dChhY3Rpb246IEFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uc09ic2VydmVyLm5leHQoYWN0aW9uKTtcbiAgfVxuXG4gIGVycm9yKGVycjogYW55KSB7XG4gICAgdGhpcy5hY3Rpb25zT2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgfVxuXG4gIGNvbXBsZXRlKCkge1xuICAgIHRoaXMuYWN0aW9uc09ic2VydmVyLmNvbXBsZXRlKCk7XG4gIH1cblxuICBhZGRSZWR1Y2VyPFN0YXRlLCBBY3Rpb25zIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICBrZXk6IHN0cmluZyxcbiAgICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFN0YXRlLCBBY3Rpb25zPlxuICApIHtcbiAgICB0aGlzLnJlZHVjZXJNYW5hZ2VyLmFkZFJlZHVjZXIoa2V5LCByZWR1Y2VyKTtcbiAgfVxuXG4gIHJlbW92ZVJlZHVjZXI8S2V5IGV4dGVuZHMgRXh0cmFjdDxrZXlvZiBULCBzdHJpbmc+PihrZXk6IEtleSkge1xuICAgIHRoaXMucmVkdWNlck1hbmFnZXIucmVtb3ZlUmVkdWNlcihrZXkpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBTVE9SRV9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbU3RvcmVdO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFQsIFByb3BzLCBLPihcbiAgbWFwRm46IChzdGF0ZTogVCwgcHJvcHM6IFByb3BzKSA9PiBLLFxuICBwcm9wcz86IFByb3BzXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxLPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8VCwgYSBleHRlbmRzIGtleW9mIFQ+KFxuICBrZXk6IGFcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxULCBhIGV4dGVuZHMga2V5b2YgVCwgYiBleHRlbmRzIGtleW9mIFRbYV0+KFxuICBrZXkxOiBhLFxuICBrZXkyOiBiXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUW2FdW2JdPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8XG4gIFQsXG4gIGEgZXh0ZW5kcyBrZXlvZiBULFxuICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl1cbj4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGIsXG4gIGtleTM6IGNcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV1bYl1bY10+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxcbiAgVCxcbiAgYSBleHRlbmRzIGtleW9mIFQsXG4gIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11cbj4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGIsXG4gIGtleTM6IGMsXG4gIGtleTQ6IGRcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV1bYl1bY11bZF0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxcbiAgVCxcbiAgYSBleHRlbmRzIGtleW9mIFQsXG4gIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY10sXG4gIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdXG4+KFxuICBrZXkxOiBhLFxuICBrZXkyOiBiLFxuICBrZXkzOiBjLFxuICBrZXk0OiBkLFxuICBrZXk1OiBlXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdW2VdPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8XG4gIFQsXG4gIGEgZXh0ZW5kcyBrZXlvZiBULFxuICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdLFxuICBlIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXSxcbiAgZiBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11bZF1bZV1cbj4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGIsXG4gIGtleTM6IGMsXG4gIGtleTQ6IGQsXG4gIGtleTU6IGUsXG4gIGtleTY6IGZcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV1bYl1bY11bZF1bZV1bZl0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxcbiAgVCxcbiAgYSBleHRlbmRzIGtleW9mIFQsXG4gIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY10sXG4gIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdLFxuICBmIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXVtlXSxcbiAgSyA9IGFueVxuPihcbiAga2V5MTogYSxcbiAga2V5MjogYixcbiAga2V5MzogYyxcbiAga2V5NDogZCxcbiAga2V5NTogZSxcbiAga2V5NjogZixcbiAgLi4ucGF0aHM6IHN0cmluZ1tdXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxLPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8VCwgUHJvcHMsIEs+KFxuICBwYXRoT3JNYXBGbjogKChzdGF0ZTogVCwgcHJvcHM/OiBQcm9wcykgPT4gYW55KSB8IHN0cmluZyxcbiAgcHJvcHNPclBhdGg/OiBQcm9wcyB8IHN0cmluZyxcbiAgLi4ucGF0aHM6IHN0cmluZ1tdXG4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNlbGVjdE9wZXJhdG9yKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pOiBPYnNlcnZhYmxlPEs+IHtcbiAgICBsZXQgbWFwcGVkJDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gICAgaWYgKHR5cGVvZiBwYXRoT3JNYXBGbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHBhdGhTbGljZXMgPSBbPHN0cmluZz5wcm9wc09yUGF0aCwgLi4ucGF0aHNdLmZpbHRlcihCb29sZWFuKTtcbiAgICAgIG1hcHBlZCQgPSBzb3VyY2UkLnBpcGUocGx1Y2socGF0aE9yTWFwRm4sIC4uLnBhdGhTbGljZXMpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXRoT3JNYXBGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbWFwcGVkJCA9IHNvdXJjZSQucGlwZShcbiAgICAgICAgbWFwKHNvdXJjZSA9PiBwYXRoT3JNYXBGbihzb3VyY2UsIDxQcm9wcz5wcm9wc09yUGF0aCkpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICBgVW5leHBlY3RlZCB0eXBlICcke3R5cGVvZiBwYXRoT3JNYXBGbn0nIGluIHNlbGVjdCBvcGVyYXRvcixgICtcbiAgICAgICAgICBgIGV4cGVjdGVkICdzdHJpbmcnIG9yICdmdW5jdGlvbidgXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBtYXBwZWQkLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG4gIH07XG59XG4iXX0=