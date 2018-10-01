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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';
import { ActionsSubject } from './actions_subject';
import { ReducerManager } from './reducer_manager';
import { StateObservable } from './state';
var Store = /** @class */ (function (_super) {
    __extends(Store, _super);
    function Store(state$, actionsObserver, reducerManager) {
        var _this = _super.call(this) || this;
        _this.actionsObserver = actionsObserver;
        _this.reducerManager = reducerManager;
        _this.source = state$;
        return _this;
    }
    Store.prototype.select = function (pathOrMapFn) {
        var paths = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            paths[_i - 1] = arguments[_i];
        }
        return select.call.apply(select, __spread([null, pathOrMapFn], paths))(this);
    };
    Store.prototype.lift = function (operator) {
        var store = new Store(this, this.actionsObserver, this.reducerManager);
        store.operator = operator;
        return store;
    };
    Store.prototype.dispatch = function (action) {
        this.actionsObserver.next(action);
    };
    Store.prototype.next = function (action) {
        this.actionsObserver.next(action);
    };
    Store.prototype.error = function (err) {
        this.actionsObserver.error(err);
    };
    Store.prototype.complete = function () {
        this.actionsObserver.complete();
    };
    Store.prototype.addReducer = function (key, reducer) {
        this.reducerManager.addReducer(key, reducer);
    };
    Store.prototype.removeReducer = function (key) {
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
export var STORE_PROVIDERS = [Store];
export function select(pathOrMapFn, propsOrPath) {
    var paths = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        paths[_i - 2] = arguments[_i];
    }
    return function selectOperator(source$) {
        var mapped$;
        if (typeof pathOrMapFn === 'string') {
            var pathSlices = __spread([propsOrPath], paths).filter(Boolean);
            mapped$ = source$.pipe(pluck.apply(void 0, __spread([pathOrMapFn], pathSlices)));
        }
        else if (typeof pathOrMapFn === 'function') {
            mapped$ = source$.pipe(map(function (source) { return pathOrMapFn(source, propsOrPath); }));
        }
        else {
            throw new TypeError("Unexpected type '" + typeof pathOrMapFn + "' in select operator," +
                " expected 'string' or 'function'");
        }
        return mapped$.pipe(distinctUntilChanged());
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQXNCLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRTFDO0lBQzhCLHlCQUFhO0lBQ3pDLGVBQ0UsTUFBdUIsRUFDZixlQUErQixFQUMvQixjQUE4QjtRQUh4QyxZQUtFLGlCQUFPLFNBR1I7UUFOUyxxQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDL0Isb0JBQWMsR0FBZCxjQUFjLENBQWdCO1FBSXRDLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztJQUN2QixDQUFDO0lBaURELHNCQUFNLEdBQU4sVUFDRSxXQUF5QztRQUN6QyxlQUFrQjthQUFsQixVQUFrQixFQUFsQixxQkFBa0IsRUFBbEIsSUFBa0I7WUFBbEIsOEJBQWtCOztRQUVsQixPQUFPLE1BQU0sQ0FBQyxJQUFJLE9BQVgsTUFBTSxZQUFNLElBQUksRUFBRSxXQUFXLEdBQUssS0FBSyxHQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxvQkFBSSxHQUFKLFVBQVEsUUFBd0I7UUFDOUIsSUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVFLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRTFCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELHdCQUFRLEdBQVIsVUFBb0MsTUFBUztRQUMzQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsb0JBQUksR0FBSixVQUFLLE1BQWM7UUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELHFCQUFLLEdBQUwsVUFBTSxHQUFRO1FBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELHdCQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCwwQkFBVSxHQUFWLFVBQ0UsR0FBVyxFQUNYLE9BQXNDO1FBRXRDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsNkJBQWEsR0FBYixVQUFvRCxHQUFRO1FBQzFELElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7O2dCQWxHRixVQUFVOzs7O2dCQUZGLGVBQWU7Z0JBSGYsY0FBYztnQkFFZCxjQUFjOztJQXNHdkIsWUFBQztDQUFBLEFBbkdELENBQzhCLFVBQVUsR0FrR3ZDO1NBbEdZLEtBQUs7QUFvR2xCLE1BQU0sQ0FBQyxJQUFNLGVBQWUsR0FBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBMEVuRCxNQUFNLGlCQUNKLFdBQXdELEVBQ3hELFdBQTJCO0lBQzNCLGVBQWtCO1NBQWxCLFVBQWtCLEVBQWxCLHFCQUFrQixFQUFsQixJQUFrQjtRQUFsQiw4QkFBa0I7O0lBRWxCLE9BQU8sd0JBQXdCLE9BQXNCO1FBQ25ELElBQUksT0FBd0IsQ0FBQztRQUU3QixJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVEsRUFBRTtZQUNuQyxJQUFNLFVBQVUsR0FBRyxVQUFTLFdBQVcsR0FBSyxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25FLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUsseUJBQUMsV0FBVyxHQUFLLFVBQVUsR0FBRSxDQUFDO1NBQzNEO2FBQU0sSUFBSSxPQUFPLFdBQVcsS0FBSyxVQUFVLEVBQUU7WUFDNUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQ3BCLEdBQUcsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLFdBQVcsQ0FBQyxNQUFNLEVBQVMsV0FBVyxDQUFDLEVBQXZDLENBQXVDLENBQUMsQ0FDdkQsQ0FBQztTQUNIO2FBQU07WUFDTCxNQUFNLElBQUksU0FBUyxDQUNqQixzQkFBb0IsT0FBTyxXQUFXLDBCQUF1QjtnQkFDM0Qsa0NBQWtDLENBQ3JDLENBQUM7U0FDSDtRQUVELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciwgT3BlcmF0b3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHBsdWNrIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBY3Rpb25zU3ViamVjdCB9IGZyb20gJy4vYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7IEFjdGlvbiwgQWN0aW9uUmVkdWNlciB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IFJlZHVjZXJNYW5hZ2VyIH0gZnJvbSAnLi9yZWR1Y2VyX21hbmFnZXInO1xuaW1wb3J0IHsgU3RhdGVPYnNlcnZhYmxlIH0gZnJvbSAnLi9zdGF0ZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdG9yZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4gaW1wbGVtZW50cyBPYnNlcnZlcjxBY3Rpb24+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgc3RhdGUkOiBTdGF0ZU9ic2VydmFibGUsXG4gICAgcHJpdmF0ZSBhY3Rpb25zT2JzZXJ2ZXI6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHByaXZhdGUgcmVkdWNlck1hbmFnZXI6IFJlZHVjZXJNYW5hZ2VyXG4gICkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNvdXJjZSA9IHN0YXRlJDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBmcm9tIDYuMS4wLiBVc2UgdGhlIHBpcGVhYmxlIGBzZWxlY3RgIG9wZXJhdG9yIGluc3RlYWQuXG4gICAqL1xuICBzZWxlY3Q8Sz4obWFwRm46IChzdGF0ZTogVCkgPT4gSyk6IE9ic2VydmFibGU8Sz47XG4gIHNlbGVjdDxhIGV4dGVuZHMga2V5b2YgVD4oa2V5OiBhKTogT2JzZXJ2YWJsZTxUW2FdPjtcbiAgc2VsZWN0PGEgZXh0ZW5kcyBrZXlvZiBULCBiIGV4dGVuZHMga2V5b2YgVFthXT4oXG4gICAga2V5MTogYSxcbiAgICBrZXkyOiBiXG4gICk6IE9ic2VydmFibGU8VFthXVtiXT47XG4gIHNlbGVjdDxhIGV4dGVuZHMga2V5b2YgVCwgYiBleHRlbmRzIGtleW9mIFRbYV0sIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdPihcbiAgICBrZXkxOiBhLFxuICAgIGtleTI6IGIsXG4gICAga2V5MzogY1xuICApOiBPYnNlcnZhYmxlPFRbYV1bYl1bY10+O1xuICBzZWxlY3Q8XG4gICAgYSBleHRlbmRzIGtleW9mIFQsXG4gICAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gICAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gICAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11cbiAgPihrZXkxOiBhLCBrZXkyOiBiLCBrZXkzOiBjLCBrZXk0OiBkKTogT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdPjtcbiAgc2VsZWN0PFxuICAgIGEgZXh0ZW5kcyBrZXlvZiBULFxuICAgIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICAgIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdLFxuICAgIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdLFxuICAgIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdXG4gID4oa2V5MTogYSwga2V5MjogYiwga2V5MzogYywga2V5NDogZCwga2V5NTogZSk6IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXVtlXT47XG4gIHNlbGVjdDxcbiAgICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXSxcbiAgICBlIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXSxcbiAgICBmIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXVtlXVxuICA+KFxuICAgIGtleTE6IGEsXG4gICAga2V5MjogYixcbiAgICBrZXkzOiBjLFxuICAgIGtleTQ6IGQsXG4gICAga2V5NTogZSxcbiAgICBrZXk2OiBmXG4gICk6IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXVtlXVtmXT47XG4gIC8qKlxuICAgKiBUaGlzIG92ZXJsb2FkIGlzIHVzZWQgdG8gc3VwcG9ydCBzcHJlYWQgb3BlcmF0b3Igd2l0aFxuICAgKiBmaXhlZCBsZW5ndGggdHVwbGVzIHR5cGUgaW4gdHlwZXNjcmlwdCAyLjdcbiAgICovXG4gIHNlbGVjdDxLID0gYW55PiguLi5wYXRoczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPEs+O1xuICBzZWxlY3QoXG4gICAgcGF0aE9yTWFwRm46ICgoc3RhdGU6IFQpID0+IGFueSkgfCBzdHJpbmcsXG4gICAgLi4ucGF0aHM6IHN0cmluZ1tdXG4gICk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHNlbGVjdC5jYWxsKG51bGwsIHBhdGhPck1hcEZuLCAuLi5wYXRocykodGhpcyk7XG4gIH1cblxuICBsaWZ0PFI+KG9wZXJhdG9yOiBPcGVyYXRvcjxULCBSPik6IFN0b3JlPFI+IHtcbiAgICBjb25zdCBzdG9yZSA9IG5ldyBTdG9yZTxSPih0aGlzLCB0aGlzLmFjdGlvbnNPYnNlcnZlciwgdGhpcy5yZWR1Y2VyTWFuYWdlcik7XG4gICAgc3RvcmUub3BlcmF0b3IgPSBvcGVyYXRvcjtcblxuICAgIHJldHVybiBzdG9yZTtcbiAgfVxuXG4gIGRpc3BhdGNoPFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KGFjdGlvbjogVikge1xuICAgIHRoaXMuYWN0aW9uc09ic2VydmVyLm5leHQoYWN0aW9uKTtcbiAgfVxuXG4gIG5leHQoYWN0aW9uOiBBY3Rpb24pIHtcbiAgICB0aGlzLmFjdGlvbnNPYnNlcnZlci5uZXh0KGFjdGlvbik7XG4gIH1cblxuICBlcnJvcihlcnI6IGFueSkge1xuICAgIHRoaXMuYWN0aW9uc09ic2VydmVyLmVycm9yKGVycik7XG4gIH1cblxuICBjb21wbGV0ZSgpIHtcbiAgICB0aGlzLmFjdGlvbnNPYnNlcnZlci5jb21wbGV0ZSgpO1xuICB9XG5cbiAgYWRkUmVkdWNlcjxTdGF0ZSwgQWN0aW9ucyBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAga2V5OiBzdHJpbmcsXG4gICAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxTdGF0ZSwgQWN0aW9ucz5cbiAgKSB7XG4gICAgdGhpcy5yZWR1Y2VyTWFuYWdlci5hZGRSZWR1Y2VyKGtleSwgcmVkdWNlcik7XG4gIH1cblxuICByZW1vdmVSZWR1Y2VyPEtleSBleHRlbmRzIEV4dHJhY3Q8a2V5b2YgVCwgc3RyaW5nPj4oa2V5OiBLZXkpIHtcbiAgICB0aGlzLnJlZHVjZXJNYW5hZ2VyLnJlbW92ZVJlZHVjZXIoa2V5KTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgU1RPUkVfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1N0b3JlXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxULCBQcm9wcywgSz4oXG4gIG1hcEZuOiAoc3RhdGU6IFQsIHByb3BzOiBQcm9wcykgPT4gSyxcbiAgcHJvcHM/OiBQcm9wc1xuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8Sz47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFQsIGEgZXh0ZW5kcyBrZXlvZiBUPihcbiAga2V5OiBhLFxuICBwcm9wczogbnVsbFxuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VFthXT47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFQsIGEgZXh0ZW5kcyBrZXlvZiBULCBiIGV4dGVuZHMga2V5b2YgVFthXT4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGJcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV1bYl0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxcbiAgVCxcbiAgYSBleHRlbmRzIGtleW9mIFQsXG4gIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXVxuPihcbiAga2V5MTogYSxcbiAga2V5MjogYixcbiAga2V5MzogY1xuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VFthXVtiXVtjXT47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFxuICBULFxuICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdLFxuICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVxuPihcbiAga2V5MTogYSxcbiAga2V5MjogYixcbiAga2V5MzogYyxcbiAga2V5NDogZFxuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXT47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFxuICBULFxuICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdLFxuICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXSxcbiAgZSBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11bZF1cbj4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGIsXG4gIGtleTM6IGMsXG4gIGtleTQ6IGQsXG4gIGtleTU6IGVcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV1bYl1bY11bZF1bZV0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxcbiAgVCxcbiAgYSBleHRlbmRzIGtleW9mIFQsXG4gIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY10sXG4gIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdLFxuICBmIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXVtlXVxuPihcbiAga2V5MTogYSxcbiAga2V5MjogYixcbiAga2V5MzogYyxcbiAga2V5NDogZCxcbiAga2V5NTogZSxcbiAga2V5NjogZlxuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXVtlXVtmXT47XG4vKipcbiAqIFRoaXMgb3ZlcmxvYWQgaXMgdXNlZCB0byBzdXBwb3J0IHNwcmVhZCBvcGVyYXRvciB3aXRoXG4gKiBmaXhlZCBsZW5ndGggdHVwbGVzIHR5cGUgaW4gdHlwZXNjcmlwdCAyLjdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxULCBQcm9wcyA9IGFueSwgSyA9IGFueT4oXG4gIHByb3BzT3JQYXRoOiBQcm9wcyxcbiAgLi4ucGF0aHM6IHN0cmluZ1tdXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxLPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8VCwgUHJvcHMsIEs+KFxuICBwYXRoT3JNYXBGbjogKChzdGF0ZTogVCwgcHJvcHM/OiBQcm9wcykgPT4gYW55KSB8IHN0cmluZyxcbiAgcHJvcHNPclBhdGg6IFByb3BzIHwgc3RyaW5nLFxuICAuLi5wYXRoczogc3RyaW5nW11cbikge1xuICByZXR1cm4gZnVuY3Rpb24gc2VsZWN0T3BlcmF0b3Ioc291cmNlJDogT2JzZXJ2YWJsZTxUPik6IE9ic2VydmFibGU8Sz4ge1xuICAgIGxldCBtYXBwZWQkOiBPYnNlcnZhYmxlPGFueT47XG5cbiAgICBpZiAodHlwZW9mIHBhdGhPck1hcEZuID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgcGF0aFNsaWNlcyA9IFs8c3RyaW5nPnByb3BzT3JQYXRoLCAuLi5wYXRoc10uZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgbWFwcGVkJCA9IHNvdXJjZSQucGlwZShwbHVjayhwYXRoT3JNYXBGbiwgLi4ucGF0aFNsaWNlcykpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhdGhPck1hcEZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBtYXBwZWQkID0gc291cmNlJC5waXBlKFxuICAgICAgICBtYXAoc291cmNlID0+IHBhdGhPck1hcEZuKHNvdXJjZSwgPFByb3BzPnByb3BzT3JQYXRoKSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgIGBVbmV4cGVjdGVkIHR5cGUgJyR7dHlwZW9mIHBhdGhPck1hcEZufScgaW4gc2VsZWN0IG9wZXJhdG9yLGAgK1xuICAgICAgICAgIGAgZXhwZWN0ZWQgJ3N0cmluZycgb3IgJ2Z1bmN0aW9uJ2BcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcHBlZCQucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfTtcbn1cbiJdfQ==