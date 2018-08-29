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
    // Once TS is >= 2.8 replace with <Key extends Extract<keyof T, string>>
    Store.prototype.removeReducer = function (key) {
        // TS2.9: keyof T is string|number|symbol, explicitly cast to string to fix.
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQXNCLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRTFDO0lBQzhCLHlCQUFhO0lBQ3pDLGVBQ0UsTUFBdUIsRUFDZixlQUErQixFQUMvQixjQUE4QjtRQUh4QyxZQUtFLGlCQUFPLFNBR1I7UUFOUyxxQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDL0Isb0JBQWMsR0FBZCxjQUFjLENBQWdCO1FBSXRDLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztJQUN2QixDQUFDO0lBaURELHNCQUFNLEdBQU4sVUFDRSxXQUF5QztRQUN6QyxlQUFrQjthQUFsQixVQUFrQixFQUFsQixxQkFBa0IsRUFBbEIsSUFBa0I7WUFBbEIsOEJBQWtCOztRQUVsQixPQUFPLE1BQU0sQ0FBQyxJQUFJLE9BQVgsTUFBTSxZQUFNLElBQUksRUFBRSxXQUFXLEdBQUssS0FBSyxHQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxvQkFBSSxHQUFKLFVBQVEsUUFBd0I7UUFDOUIsSUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUksSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVFLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRTFCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELHdCQUFRLEdBQVIsVUFBb0MsTUFBUztRQUMzQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsb0JBQUksR0FBSixVQUFLLE1BQWM7UUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELHFCQUFLLEdBQUwsVUFBTSxHQUFRO1FBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELHdCQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCwwQkFBVSxHQUFWLFVBQ0UsR0FBVyxFQUNYLE9BQXNDO1FBRXRDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsd0VBQXdFO0lBQ3hFLDZCQUFhLEdBQWIsVUFBbUMsR0FBUTtRQUN6Qyw0RUFBNEU7UUFDNUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsR0FBYSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7Z0JBcEdGLFVBQVU7Ozs7Z0JBRkYsZUFBZTtnQkFIZixjQUFjO2dCQUVkLGNBQWM7O0lBd0d2QixZQUFDO0NBQUEsQUFyR0QsQ0FDOEIsVUFBVSxHQW9HdkM7U0FwR1ksS0FBSztBQXNHbEIsTUFBTSxDQUFDLElBQU0sZUFBZSxHQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7QUEwRW5ELE1BQU0saUJBQ0osV0FBd0QsRUFDeEQsV0FBMkI7SUFDM0IsZUFBa0I7U0FBbEIsVUFBa0IsRUFBbEIscUJBQWtCLEVBQWxCLElBQWtCO1FBQWxCLDhCQUFrQjs7SUFFbEIsT0FBTyx3QkFBd0IsT0FBc0I7UUFDbkQsSUFBSSxPQUF3QixDQUFDO1FBRTdCLElBQUksT0FBTyxXQUFXLEtBQUssUUFBUSxFQUFFO1lBQ25DLElBQU0sVUFBVSxHQUFHLFVBQVMsV0FBVyxHQUFLLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyx5QkFBQyxXQUFXLEdBQUssVUFBVSxHQUFFLENBQUM7U0FDM0Q7YUFBTSxJQUFJLE9BQU8sV0FBVyxLQUFLLFVBQVUsRUFBRTtZQUM1QyxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FDcEIsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsV0FBVyxDQUFDLE1BQU0sRUFBUyxXQUFXLENBQUMsRUFBdkMsQ0FBdUMsQ0FBQyxDQUN2RCxDQUFDO1NBQ0g7YUFBTTtZQUNMLE1BQU0sSUFBSSxTQUFTLENBQ2pCLHNCQUFvQixPQUFPLFdBQVcsMEJBQXVCO2dCQUMzRCxrQ0FBa0MsQ0FDckMsQ0FBQztTQUNIO1FBRUQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBPcGVyYXRvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgcGx1Y2sgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFjdGlvbnNTdWJqZWN0IH0gZnJvbSAnLi9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHsgQWN0aW9uLCBBY3Rpb25SZWR1Y2VyIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgUmVkdWNlck1hbmFnZXIgfSBmcm9tICcuL3JlZHVjZXJfbWFuYWdlcic7XG5pbXBvcnQgeyBTdGF0ZU9ic2VydmFibGUgfSBmcm9tICcuL3N0YXRlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0b3JlPFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiBpbXBsZW1lbnRzIE9ic2VydmVyPEFjdGlvbj4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBzdGF0ZSQ6IFN0YXRlT2JzZXJ2YWJsZSxcbiAgICBwcml2YXRlIGFjdGlvbnNPYnNlcnZlcjogQWN0aW9uc1N1YmplY3QsXG4gICAgcHJpdmF0ZSByZWR1Y2VyTWFuYWdlcjogUmVkdWNlck1hbmFnZXJcbiAgKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc291cmNlID0gc3RhdGUkO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIGZyb20gNi4xLjAuIFVzZSB0aGUgcGlwZWFibGUgYHNlbGVjdGAgb3BlcmF0b3IgaW5zdGVhZC5cbiAgICovXG4gIHNlbGVjdDxLPihtYXBGbjogKHN0YXRlOiBUKSA9PiBLKTogT2JzZXJ2YWJsZTxLPjtcbiAgc2VsZWN0PGEgZXh0ZW5kcyBrZXlvZiBUPihrZXk6IGEpOiBPYnNlcnZhYmxlPFRbYV0+O1xuICBzZWxlY3Q8YSBleHRlbmRzIGtleW9mIFQsIGIgZXh0ZW5kcyBrZXlvZiBUW2FdPihcbiAgICBrZXkxOiBhLFxuICAgIGtleTI6IGJcbiAgKTogT2JzZXJ2YWJsZTxUW2FdW2JdPjtcbiAgc2VsZWN0PGEgZXh0ZW5kcyBrZXlvZiBULCBiIGV4dGVuZHMga2V5b2YgVFthXSwgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0+KFxuICAgIGtleTE6IGEsXG4gICAga2V5MjogYixcbiAgICBrZXkzOiBjXG4gICk6IE9ic2VydmFibGU8VFthXVtiXVtjXT47XG4gIHNlbGVjdDxcbiAgICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgICBiIGV4dGVuZHMga2V5b2YgVFthXSxcbiAgICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVxuICA+KGtleTE6IGEsIGtleTI6IGIsIGtleTM6IGMsIGtleTQ6IGQpOiBPYnNlcnZhYmxlPFRbYV1bYl1bY11bZF0+O1xuICBzZWxlY3Q8XG4gICAgYSBleHRlbmRzIGtleW9mIFQsXG4gICAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gICAgYyBleHRlbmRzIGtleW9mIFRbYV1bYl0sXG4gICAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY10sXG4gICAgZSBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11bZF1cbiAgPihrZXkxOiBhLCBrZXkyOiBiLCBrZXkzOiBjLCBrZXk0OiBkLCBrZXk1OiBlKTogT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdW2VdPjtcbiAgc2VsZWN0PFxuICAgIGEgZXh0ZW5kcyBrZXlvZiBULFxuICAgIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICAgIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdLFxuICAgIGQgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdLFxuICAgIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdLFxuICAgIGYgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdW2VdXG4gID4oXG4gICAga2V5MTogYSxcbiAgICBrZXkyOiBiLFxuICAgIGtleTM6IGMsXG4gICAga2V5NDogZCxcbiAgICBrZXk1OiBlLFxuICAgIGtleTY6IGZcbiAgKTogT2JzZXJ2YWJsZTxUW2FdW2JdW2NdW2RdW2VdW2ZdPjtcbiAgLyoqXG4gICAqIFRoaXMgb3ZlcmxvYWQgaXMgdXNlZCB0byBzdXBwb3J0IHNwcmVhZCBvcGVyYXRvciB3aXRoXG4gICAqIGZpeGVkIGxlbmd0aCB0dXBsZXMgdHlwZSBpbiB0eXBlc2NyaXB0IDIuN1xuICAgKi9cbiAgc2VsZWN0PEsgPSBhbnk+KC4uLnBhdGhzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8Sz47XG4gIHNlbGVjdChcbiAgICBwYXRoT3JNYXBGbjogKChzdGF0ZTogVCkgPT4gYW55KSB8IHN0cmluZyxcbiAgICAuLi5wYXRoczogc3RyaW5nW11cbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gc2VsZWN0LmNhbGwobnVsbCwgcGF0aE9yTWFwRm4sIC4uLnBhdGhzKSh0aGlzKTtcbiAgfVxuXG4gIGxpZnQ8Uj4ob3BlcmF0b3I6IE9wZXJhdG9yPFQsIFI+KTogU3RvcmU8Uj4ge1xuICAgIGNvbnN0IHN0b3JlID0gbmV3IFN0b3JlPFI+KHRoaXMsIHRoaXMuYWN0aW9uc09ic2VydmVyLCB0aGlzLnJlZHVjZXJNYW5hZ2VyKTtcbiAgICBzdG9yZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xuXG4gICAgcmV0dXJuIHN0b3JlO1xuICB9XG5cbiAgZGlzcGF0Y2g8ViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oYWN0aW9uOiBWKSB7XG4gICAgdGhpcy5hY3Rpb25zT2JzZXJ2ZXIubmV4dChhY3Rpb24pO1xuICB9XG5cbiAgbmV4dChhY3Rpb246IEFjdGlvbikge1xuICAgIHRoaXMuYWN0aW9uc09ic2VydmVyLm5leHQoYWN0aW9uKTtcbiAgfVxuXG4gIGVycm9yKGVycjogYW55KSB7XG4gICAgdGhpcy5hY3Rpb25zT2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgfVxuXG4gIGNvbXBsZXRlKCkge1xuICAgIHRoaXMuYWN0aW9uc09ic2VydmVyLmNvbXBsZXRlKCk7XG4gIH1cblxuICBhZGRSZWR1Y2VyPFN0YXRlLCBBY3Rpb25zIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICBrZXk6IHN0cmluZyxcbiAgICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFN0YXRlLCBBY3Rpb25zPlxuICApIHtcbiAgICB0aGlzLnJlZHVjZXJNYW5hZ2VyLmFkZFJlZHVjZXIoa2V5LCByZWR1Y2VyKTtcbiAgfVxuXG4gIC8vIE9uY2UgVFMgaXMgPj0gMi44IHJlcGxhY2Ugd2l0aCA8S2V5IGV4dGVuZHMgRXh0cmFjdDxrZXlvZiBULCBzdHJpbmc+PlxuICByZW1vdmVSZWR1Y2VyPEtleSBleHRlbmRzIGtleW9mIFQ+KGtleTogS2V5KSB7XG4gICAgLy8gVFMyLjk6IGtleW9mIFQgaXMgc3RyaW5nfG51bWJlcnxzeW1ib2wsIGV4cGxpY2l0bHkgY2FzdCB0byBzdHJpbmcgdG8gZml4LlxuICAgIHRoaXMucmVkdWNlck1hbmFnZXIucmVtb3ZlUmVkdWNlcihrZXkgYXMgc3RyaW5nKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgU1RPUkVfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1N0b3JlXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxULCBQcm9wcywgSz4oXG4gIG1hcEZuOiAoc3RhdGU6IFQsIHByb3BzOiBQcm9wcykgPT4gSyxcbiAgcHJvcHM/OiBQcm9wc1xuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8Sz47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFQsIGEgZXh0ZW5kcyBrZXlvZiBUPihcbiAga2V5OiBhLFxuICBwcm9wczogbnVsbFxuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VFthXT47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFQsIGEgZXh0ZW5kcyBrZXlvZiBULCBiIGV4dGVuZHMga2V5b2YgVFthXT4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGJcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV1bYl0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxcbiAgVCxcbiAgYSBleHRlbmRzIGtleW9mIFQsXG4gIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXVxuPihcbiAga2V5MTogYSxcbiAga2V5MjogYixcbiAga2V5MzogY1xuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VFthXVtiXVtjXT47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFxuICBULFxuICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdLFxuICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVxuPihcbiAga2V5MTogYSxcbiAga2V5MjogYixcbiAga2V5MzogYyxcbiAga2V5NDogZFxuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXT47XG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0PFxuICBULFxuICBhIGV4dGVuZHMga2V5b2YgVCxcbiAgYiBleHRlbmRzIGtleW9mIFRbYV0sXG4gIGMgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdLFxuICBkIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXSxcbiAgZSBleHRlbmRzIGtleW9mIFRbYV1bYl1bY11bZF1cbj4oXG4gIGtleTE6IGEsXG4gIGtleTI6IGIsXG4gIGtleTM6IGMsXG4gIGtleTQ6IGQsXG4gIGtleTU6IGVcbik6IChzb3VyY2UkOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFRbYV1bYl1bY11bZF1bZV0+O1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxcbiAgVCxcbiAgYSBleHRlbmRzIGtleW9mIFQsXG4gIGIgZXh0ZW5kcyBrZXlvZiBUW2FdLFxuICBjIGV4dGVuZHMga2V5b2YgVFthXVtiXSxcbiAgZCBleHRlbmRzIGtleW9mIFRbYV1bYl1bY10sXG4gIGUgZXh0ZW5kcyBrZXlvZiBUW2FdW2JdW2NdW2RdLFxuICBmIGV4dGVuZHMga2V5b2YgVFthXVtiXVtjXVtkXVtlXVxuPihcbiAga2V5MTogYSxcbiAga2V5MjogYixcbiAga2V5MzogYyxcbiAga2V5NDogZCxcbiAga2V5NTogZSxcbiAga2V5NjogZlxuKTogKHNvdXJjZSQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VFthXVtiXVtjXVtkXVtlXVtmXT47XG4vKipcbiAqIFRoaXMgb3ZlcmxvYWQgaXMgdXNlZCB0byBzdXBwb3J0IHNwcmVhZCBvcGVyYXRvciB3aXRoXG4gKiBmaXhlZCBsZW5ndGggdHVwbGVzIHR5cGUgaW4gdHlwZXNjcmlwdCAyLjdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdDxULCBQcm9wcyA9IGFueSwgSyA9IGFueT4oXG4gIHByb3BzT3JQYXRoOiBQcm9wcyxcbiAgLi4ucGF0aHM6IHN0cmluZ1tdXG4pOiAoc291cmNlJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxLPjtcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Q8VCwgUHJvcHMsIEs+KFxuICBwYXRoT3JNYXBGbjogKChzdGF0ZTogVCwgcHJvcHM/OiBQcm9wcykgPT4gYW55KSB8IHN0cmluZyxcbiAgcHJvcHNPclBhdGg6IFByb3BzIHwgc3RyaW5nLFxuICAuLi5wYXRoczogc3RyaW5nW11cbikge1xuICByZXR1cm4gZnVuY3Rpb24gc2VsZWN0T3BlcmF0b3Ioc291cmNlJDogT2JzZXJ2YWJsZTxUPik6IE9ic2VydmFibGU8Sz4ge1xuICAgIGxldCBtYXBwZWQkOiBPYnNlcnZhYmxlPGFueT47XG5cbiAgICBpZiAodHlwZW9mIHBhdGhPck1hcEZuID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgcGF0aFNsaWNlcyA9IFs8c3RyaW5nPnByb3BzT3JQYXRoLCAuLi5wYXRoc10uZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgbWFwcGVkJCA9IHNvdXJjZSQucGlwZShwbHVjayhwYXRoT3JNYXBGbiwgLi4ucGF0aFNsaWNlcykpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhdGhPck1hcEZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBtYXBwZWQkID0gc291cmNlJC5waXBlKFxuICAgICAgICBtYXAoc291cmNlID0+IHBhdGhPck1hcEZuKHNvdXJjZSwgPFByb3BzPnByb3BzT3JQYXRoKSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgIGBVbmV4cGVjdGVkIHR5cGUgJyR7dHlwZW9mIHBhdGhPck1hcEZufScgaW4gc2VsZWN0IG9wZXJhdG9yLGAgK1xuICAgICAgICAgIGAgZXhwZWN0ZWQgJ3N0cmluZycgb3IgJ2Z1bmN0aW9uJ2BcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcHBlZCQucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgfTtcbn1cbiJdfQ==