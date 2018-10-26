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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQXNCLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRTFDO0lBQzhCLHlCQUFhO0lBQ3pDLGVBQ0UsTUFBdUIsRUFDZixlQUErQixFQUMvQixjQUE4QjtRQUh4QyxZQUtFLGlCQUFPLFNBR1I7UUFOUyxxQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDL0Isb0JBQWMsR0FBZCxjQUFjLENBQWdCO1FBSXRDLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztJQUN2QixDQUFDO0lBOENELHNCQUFNLEdBQU4sVUFDRSxXQUF5QztRQUN6QyxlQUFrQjthQUFsQixVQUFrQixFQUFsQixxQkFBa0IsRUFBbEIsSUFBa0I7WUFBbEIsOEJBQWtCOztRQUVsQixPQUFPLE1BQU0sQ0FBQyxJQUFJLE9BQVgsTUFBTSxZQUFNLElBQUksRUFBRSxXQUFXLEdBQUssS0FBSyxHQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxvQkFBSSxHQUFKLFVBQVEsUUFBd0I7UUFDOUIsSUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVFLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRTFCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELHdCQUFRLEdBQVIsVUFBb0MsTUFBUztRQUMzQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsb0JBQUksR0FBSixVQUFLLE1BQWM7UUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELHFCQUFLLEdBQUwsVUFBTSxHQUFRO1FBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELHdCQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCwwQkFBVSxHQUFWLFVBQ0UsR0FBVyxFQUNYLE9BQXNDO1FBRXRDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsNkJBQWEsR0FBYixVQUFvRCxHQUFRO1FBQzFELElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7O2dCQS9GRixVQUFVOzs7O2dCQUZGLGVBQWU7Z0JBSGYsY0FBYztnQkFFZCxjQUFjOztJQW1HdkIsWUFBQztDQUFBLEFBaEdELENBQzhCLFVBQVUsR0ErRnZDO1NBL0ZZLEtBQUs7QUFpR2xCLE1BQU0sQ0FBQyxJQUFNLGVBQWUsR0FBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBMEVuRCxNQUFNLGlCQUNKLFdBQXdELEVBQ3hELFdBQTJCO0lBQzNCLGVBQWtCO1NBQWxCLFVBQWtCLEVBQWxCLHFCQUFrQixFQUFsQixJQUFrQjtRQUFsQiw4QkFBa0I7O0lBRWxCLE9BQU8sd0JBQXdCLE9BQXNCO1FBQ25ELElBQUksT0FBd0IsQ0FBQztRQUU3QixJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVEsRUFBRTtZQUNuQyxJQUFNLFVBQVUsR0FBRyxVQUFTLFdBQVcsR0FBSyxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25FLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUsseUJBQUMsV0FBVyxHQUFLLFVBQVUsR0FBRSxDQUFDO1NBQzNEO2FBQU0sSUFBSSxPQUFPLFdBQVcsS0FBSyxVQUFVLEVBQUU7WUFDNUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQ3BCLEdBQUcsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLFdBQVcsQ0FBQyxNQUFNLEVBQVMsV0FBVyxDQUFDLEVBQXZDLENBQXVDLENBQUMsQ0FDdkQsQ0FBQztTQUNIO2FBQU07WUFDTCxNQUFNLElBQUksU0FBUyxDQUNqQixzQkFBb0IsT0FBTyxXQUFXLDBCQUF1QjtnQkFDM0Qsa0NBQWtDLENBQ3JDLENBQUM7U0FDSDtRQUVELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBPYnNlcnZlciwgT3BlcmF0b3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHBsdWNrIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBY3Rpb25zU3ViamVjdCB9IGZyb20gJy4vYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7IEFjdGlvbiwgQWN0aW9uUmVkdWNlciB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IFJlZHVjZXJNYW5hZ2VyIH0gZnJvbSAnLi9yZWR1Y2VyX21hbmFnZXInO1xuaW1wb3J0IHsgU3RhdGVPYnNlcnZhYmxlIH0gZnJvbSAnLi9zdGF0ZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdG9yZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4gaW1wbGVtZW50cyBPYnNlcnZlcjxBY3Rpb24+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgc3RhdGUkOiBTdGF0ZU9ic2VydmFibGUsXG4gICAgcHJpdmF0ZSBhY3Rpb25zT2JzZXJ2ZXI6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHByaXZhdGUgcmVkdWNlck1hbmFnZXI6IFJlZHVjZXJNYW5hZ2VyXG4gICkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNvdXJjZSA9IHN0YXRlJDtcbiAgfVxuXG4gIHNlbGVjdDxLPihtYXBGbjogKHN0YXRlOiBUKSA9PiBLKTogT2JzZXJ2YWJsZTxLPjtcbiAgc2VsZWN0PGEgZXh0ZW5kcyBrZXlvZiBUPihrZXk6IGEpOiBPYnNlcnZhYmxlPFRbYV0+O1xuICBzZWxlY3Q8YSBleHRlbmRzIGtleW9mIFQsIGIgZXh0ZW5kcyBrZXlvZiBUW2FdPihcbiAgICBrZXkxOiBhLFxuICAgIGtleTI6IGJcbiAgKTogT2JzZXJ2YWJsZTxUW2FdW2JdPjtcbiAgc2VsZWN0PGEgZXh0ZW5kcyBrZXlvZiBULCBiIGV4dGVuZHMga2V5b2YgVFthXSwgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0+KFxuICAgIGtleTE6IGEsXG4gICAga2V5MjogYixcbiAgICBrZXkzOiBjXG4gICk6IE9ic2VydmFibGU8VFthXVtiXVtjXT47XG4gIHNlbGVjdDxcbiAgICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVxuICA+KGtleTE6IGEsIGtleTI6IGIsIGtleTM6IGMsIGtleTQ6IGQpOiBPYnNlcnZhYmxlPFRbYV1bYl1bY11bZF0+O1xuICBzZWxlY3Q8XG4gICAgYSBleHRlbmRzIGtleW9mIFQsXG4gICAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gICAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gICAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY10sXG4gICAgZSBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11bZF1cbiAgPihrZXkxOiBhLCBrZXkyOiBiLCBrZXkzOiBjLCBrZXk0OiBkLCBrZXk1OiBlKTogT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdW2VdPjtcbiAgc2VsZWN0PFxuICAgIGEgZXh0ZW5kcyBrZXlvZiBULFxuICAgIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICAgIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdLFxuICAgIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdLFxuICAgIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdLFxuICAgIGYgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdW2VdXG4gID4oXG4gICAga2V5MTogYSxcbiAgICBrZXkyOiBiLFxuICAgIGtleTM6IGMsXG4gICAga2V5NDogZCxcbiAgICBrZXk1OiBlLFxuICAgIGtleTY6IGZcbiAgKTogT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdW2VdW2ZdPjtcbiAgLyoqXG4gICAqIFRoaXMgb3ZlcmxvYWQgaXMgdXNlZCB0byBzdXBwb3J0IHNwcmVhZCBvcGVyYXRvciB3aXRoXG4gICAqIGZpeGVkIGxlbmd0aCB0dXBsZXMgdHlwZSBpbiB0eXBlc2NyaXB0IDIuN1xuICAgKi9cbiAgc2VsZWN0PEsgPSBhbnk+KC4uLnBhdGhzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8Sz47XG4gIHNlbGVjdChcbiAgICBwYXRoT3JNYXBGbjogKChzdGF0ZTogVCkgPT4gYW55KSB8IHN0cmluZyxcbiAgICAuLi5wYXRoczogc3RyaW5nW11cbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gc2VsZWN0LmNhbGwobnVsbCwgcGF0aE9yTWFwRm4sIC4uLnBhdGhzKSh0aGlzKTtcbiAgfVxuXG4gIGxpZnQ8Uj4ob3BlcmF0b3I6IE9wZXJhdG9yPFQsIFI+KTogU3RvcmU8Uj4ge1xuICAgIGNvbnN0IHN0b3JlID0gbmV3IFN0b3JlPFI+KHRoaXMsIHRoaXMuYWN0aW9uc09ic2VydmVyLCB0aGlzLnJlZHVjZXJNYW5hZ2VyKTtcbiAgICBzdG9yZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xuXG4gICAgcmV0dXJuIHN0b3JlO1xuICB9XG5cbiAgZGlzcGF0Y2g8ViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oYWN0aW9uOiBWKSB7XG4gICAgdGhpcy5hY3Rpb25zT2JzZXJ2ZXIubmV4dChhY3Rpb24pO1xuICB9XG5cbiAgbmV4dChhY3Rpb246IEFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uc09ic2VydmVyLm5leHQoYWN0aW9uKTtcbiAgfVxuXG4gIGVycm9yKGVycjogYW55KSB7XG4gICAgdGhpcy5hY3Rpb25zT2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgfVxuXG4gIGNvbXBsZXRlKCkge1xuICAgIHRoaXMuYWN0aW9uc09ic2VydmVyLmNvbXBsZXRlKCk7XG4gIH1cblxuICBhZGRSZWR1Y2VyPFN0YXRlLCBBY3Rpb25zIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICBrZXk6IHN0cmluZyxcbiAgICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFN0YXRlLCBBY3Rpb25zPlxuICApIHtcbiAgICB0aGlzLnJlZHVjZXJNYW5hZ2VyLmFkZFJlZHVjZXIoa2V5LCByZWR1Y2VyKTtcbiAgfVxuXG4gIHJlbW92ZVJlZHVjZXI8S2V5IGV4dGVuZHMgRXh0cmFjdDxrZXlvZiBULCBzdHJpbmc+PihrZXk6IEtleSkge1xuICAgIHRoaXMucmVkdWNlck1hbmFnZXIucmVtb3ZlUmVkdWNlcihrZXkpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBTVE9SRV9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbU3RvcmVdO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFQsIFByb3BzLCBLPihcbiAgbWFwRm46IChzdGF0ZTogVCwgcHJvcHM6IFByb3BzKSA9PiBLLFxuICBwcm9wcz86IFByb3BzXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxLPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8VCwgYSBleHRlbmRzIGtleW9mIFQ+KFxuICBrZXk6IGEsXG4gIHByb3BzOiBudWxsXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUW2FdPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8VCwgYSBleHRlbmRzIGtleW9mIFQsIGIgZXh0ZW5kcyBrZXlvZiBUW2FdPihcbiAga2V5MTogYSxcbiAga2V5MjogYlxuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VFthXVtiXT47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFxuICBULFxuICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdXG4+KFxuICBrZXkxOiBhLFxuICBrZXkyOiBiLFxuICBrZXkzOiBjXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUW2FdW2JdW2NdPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8XG4gIFQsXG4gIGEgZXh0ZW5kcyBrZXlvZiBULFxuICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdXG4+KFxuICBrZXkxOiBhLFxuICBrZXkyOiBiLFxuICBrZXkzOiBjLFxuICBrZXk0OiBkXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8XG4gIFQsXG4gIGEgZXh0ZW5kcyBrZXlvZiBULFxuICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdLFxuICBlIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXVxuPihcbiAga2V5MTogYSxcbiAga2V5MjogYixcbiAga2V5MzogYyxcbiAga2V5NDogZCxcbiAga2V5NTogZVxuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXVtlXT47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFxuICBULFxuICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdLFxuICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXSxcbiAgZSBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11bZF0sXG4gIGYgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdW2VdXG4+KFxuICBrZXkxOiBhLFxuICBrZXkyOiBiLFxuICBrZXkzOiBjLFxuICBrZXk0OiBkLFxuICBrZXk1OiBlLFxuICBrZXk2OiBmXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdW2VdW2ZdPjtcbi8qKlxuICogVGhpcyBvdmVybG9hZCBpcyB1c2VkIHRvIHN1cHBvcnQgc3ByZWFkIG9wZXJhdG9yIHdpdGhcbiAqIGZpeGVkIGxlbmd0aCB0dXBsZXMgdHlwZSBpbiB0eXBlc2NyaXB0IDIuN1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFQsIFByb3BzID0gYW55LCBLID0gYW55PihcbiAgcHJvcHNPclBhdGg6IFByb3BzLFxuICAuLi5wYXRoczogc3RyaW5nW11cbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPEs+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxULCBQcm9wcywgSz4oXG4gIHBhdGhPck1hcEZuOiAoKHN0YXRlOiBULCBwcm9wcz86IFByb3BzKSA9PiBhbnkpIHwgc3RyaW5nLFxuICBwcm9wc09yUGF0aDogUHJvcHMgfCBzdHJpbmcsXG4gIC4uLnBhdGhzOiBzdHJpbmdbXVxuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBzZWxlY3RPcGVyYXRvcihzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KTogT2JzZXJ2YWJsZTxLPiB7XG4gICAgbGV0IG1hcHBlZCQ6IE9ic2VydmFibGU8YW55PjtcblxuICAgIGlmICh0eXBlb2YgcGF0aE9yTWFwRm4gPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBwYXRoU2xpY2VzID0gWzxzdHJpbmc+cHJvcHNPclBhdGgsIC4uLnBhdGhzXS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICBtYXBwZWQkID0gc291cmNlJC5waXBlKHBsdWNrKHBhdGhPck1hcEZuLCAuLi5wYXRoU2xpY2VzKSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGF0aE9yTWFwRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG1hcHBlZCQgPSBzb3VyY2UkLnBpcGUoXG4gICAgICAgIG1hcChzb3VyY2UgPT4gcGF0aE9yTWFwRm4oc291cmNlLCA8UHJvcHM+cHJvcHNPclBhdGgpKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgYFVuZXhwZWN0ZWQgdHlwZSAnJHt0eXBlb2YgcGF0aE9yTWFwRm59JyBpbiBzZWxlY3Qgb3BlcmF0b3IsYCArXG4gICAgICAgICAgYCBleHBlY3RlZCAnc3RyaW5nJyBvciAnZnVuY3Rpb24nYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFwcGVkJC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICB9O1xufVxuIl19