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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActionsSubject } from './actions_subject';
import { INITIAL_REDUCERS, INITIAL_STATE, REDUCER_FACTORY } from './tokens';
import { createFeatureReducerFactory, createReducerFactory, omit, } from './utils';
var ReducerObservable = /** @class */ (function (_super) {
    __extends(ReducerObservable, _super);
    function ReducerObservable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReducerObservable;
}(Observable));
export { ReducerObservable };
var ReducerManagerDispatcher = /** @class */ (function (_super) {
    __extends(ReducerManagerDispatcher, _super);
    function ReducerManagerDispatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReducerManagerDispatcher;
}(ActionsSubject));
export { ReducerManagerDispatcher };
export var UPDATE = '@ngrx/store/update-reducers';
var ReducerManager = /** @class */ (function (_super) {
    __extends(ReducerManager, _super);
    function ReducerManager(dispatcher, initialState, reducers, reducerFactory) {
        var _this = _super.call(this, reducerFactory(reducers, initialState)) || this;
        _this.dispatcher = dispatcher;
        _this.initialState = initialState;
        _this.reducers = reducers;
        _this.reducerFactory = reducerFactory;
        return _this;
    }
    ReducerManager.prototype.addFeature = function (feature) {
        this.addFeatures([feature]);
    };
    ReducerManager.prototype.addFeatures = function (features) {
        var reducers = features.reduce(function (reducerDict, _a) {
            var reducers = _a.reducers, reducerFactory = _a.reducerFactory, metaReducers = _a.metaReducers, initialState = _a.initialState, key = _a.key;
            var reducer = typeof reducers === 'function'
                ? createFeatureReducerFactory(metaReducers)(reducers, initialState)
                : createReducerFactory(reducerFactory, metaReducers)(reducers, initialState);
            reducerDict[key] = reducer;
            return reducerDict;
        }, {});
        this.addReducers(reducers);
    };
    ReducerManager.prototype.removeFeature = function (feature) {
        this.removeFeatures([feature]);
    };
    ReducerManager.prototype.removeFeatures = function (features) {
        this.removeReducers(features.map(function (p) { return p.key; }));
    };
    ReducerManager.prototype.addReducer = function (key, reducer) {
        this.addReducers((_a = {}, _a[key] = reducer, _a));
        var _a;
    };
    ReducerManager.prototype.addReducers = function (reducers) {
        this.reducers = __assign({}, this.reducers, reducers);
        this.updateReducers(Object.keys(reducers));
    };
    ReducerManager.prototype.removeReducer = function (featureKey) {
        this.removeReducers([featureKey]);
    };
    ReducerManager.prototype.removeReducers = function (featureKeys) {
        var _this = this;
        featureKeys.forEach(function (key) {
            _this.reducers = omit(_this.reducers, key) /*TODO(#823)*/;
        });
        this.updateReducers(featureKeys);
    };
    ReducerManager.prototype.updateReducers = function (featureKeys) {
        this.next(this.reducerFactory(this.reducers, this.initialState));
        this.dispatcher.next({
            type: UPDATE,
            features: featureKeys,
        });
    };
    ReducerManager.prototype.ngOnDestroy = function () {
        this.complete();
    };
    ReducerManager.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ReducerManager.ctorParameters = function () { return [
        { type: ReducerManagerDispatcher },
        { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [INITIAL_REDUCERS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [REDUCER_FACTORY,] }] }
    ]; };
    return ReducerManager;
}(BehaviorSubject));
export { ReducerManager };
export var REDUCER_MANAGER_PROVIDERS = [
    ReducerManager,
    { provide: ReducerObservable, useExisting: ReducerManager },
    { provide: ReducerManagerDispatcher, useExisting: ActionsSubject },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFRbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDNUUsT0FBTyxFQUNMLDJCQUEyQixFQUMzQixvQkFBb0IsRUFDcEIsSUFBSSxHQUNMLE1BQU0sU0FBUyxDQUFDO0FBRWpCO0lBQWdELHFDQUUvQztJQUZEOztJQUVHLENBQUM7SUFBRCx3QkFBQztBQUFELENBQUMsQUFGSixDQUFnRCxVQUFVLEdBRXREOztBQUNKO0lBQXVELDRDQUFjO0lBQXJFOztJQUF1RSxDQUFDO0lBQUQsK0JBQUM7QUFBRCxDQUFDLEFBQXhFLENBQXVELGNBQWMsR0FBRzs7QUFDeEUsTUFBTSxDQUFDLElBQU0sTUFBTSxHQUFHLDZCQUE4RCxDQUFDO0FBRXJGO0lBQ29DLGtDQUF3QztJQUUxRSx3QkFDVSxVQUFvQyxFQUNiLFlBQWlCLEVBQ2QsUUFBb0MsRUFFOUQsY0FBOEM7UUFMeEQsWUFPRSxrQkFBTSxjQUFjLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDLFNBQzlDO1FBUFMsZ0JBQVUsR0FBVixVQUFVLENBQTBCO1FBQ2Isa0JBQVksR0FBWixZQUFZLENBQUs7UUFDZCxjQUFRLEdBQVIsUUFBUSxDQUE0QjtRQUU5RCxvQkFBYyxHQUFkLGNBQWMsQ0FBZ0M7O0lBR3hELENBQUM7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QUFlLEdBOEVsRDtTQTlFWSxjQUFjO0FBZ0YzQixNQUFNLENBQUMsSUFBTSx5QkFBeUIsR0FBZTtJQUNuRCxjQUFjO0lBQ2QsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRTtJQUMzRCxFQUFFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFO0NBQ25FLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBBY3Rpb25zU3ViamVjdCB9IGZyb20gJy4vYWN0aW9uc19zdWJqZWN0JztcclxuaW1wb3J0IHtcclxuICBBY3Rpb24sXHJcbiAgQWN0aW9uUmVkdWNlcixcclxuICBBY3Rpb25SZWR1Y2VyRmFjdG9yeSxcclxuICBBY3Rpb25SZWR1Y2VyTWFwLFxyXG4gIFN0b3JlRmVhdHVyZSxcclxufSBmcm9tICcuL21vZGVscyc7XHJcbmltcG9ydCB7IElOSVRJQUxfUkVEVUNFUlMsIElOSVRJQUxfU1RBVEUsIFJFRFVDRVJfRkFDVE9SWSB9IGZyb20gJy4vdG9rZW5zJztcclxuaW1wb3J0IHtcclxuICBjcmVhdGVGZWF0dXJlUmVkdWNlckZhY3RvcnksXHJcbiAgY3JlYXRlUmVkdWNlckZhY3RvcnksXHJcbiAgb21pdCxcclxufSBmcm9tICcuL3V0aWxzJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZWR1Y2VyT2JzZXJ2YWJsZSBleHRlbmRzIE9ic2VydmFibGU8XHJcbiAgQWN0aW9uUmVkdWNlcjxhbnksIGFueT5cclxuPiB7fVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVkdWNlck1hbmFnZXJEaXNwYXRjaGVyIGV4dGVuZHMgQWN0aW9uc1N1YmplY3Qge31cclxuZXhwb3J0IGNvbnN0IFVQREFURSA9ICdAbmdyeC9zdG9yZS91cGRhdGUtcmVkdWNlcnMnIGFzICdAbmdyeC9zdG9yZS91cGRhdGUtcmVkdWNlcnMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUmVkdWNlck1hbmFnZXIgZXh0ZW5kcyBCZWhhdmlvclN1YmplY3Q8QWN0aW9uUmVkdWNlcjxhbnksIGFueT4+XHJcbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBkaXNwYXRjaGVyOiBSZWR1Y2VyTWFuYWdlckRpc3BhdGNoZXIsXHJcbiAgICBASW5qZWN0KElOSVRJQUxfU1RBVEUpIHByaXZhdGUgaW5pdGlhbFN0YXRlOiBhbnksXHJcbiAgICBASW5qZWN0KElOSVRJQUxfUkVEVUNFUlMpIHByaXZhdGUgcmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+LFxyXG4gICAgQEluamVjdChSRURVQ0VSX0ZBQ1RPUlkpXHJcbiAgICBwcml2YXRlIHJlZHVjZXJGYWN0b3J5OiBBY3Rpb25SZWR1Y2VyRmFjdG9yeTxhbnksIGFueT5cclxuICApIHtcclxuICAgIHN1cGVyKHJlZHVjZXJGYWN0b3J5KHJlZHVjZXJzLCBpbml0aWFsU3RhdGUpKTtcclxuICB9XHJcblxyXG4gIGFkZEZlYXR1cmUoZmVhdHVyZTogU3RvcmVGZWF0dXJlPGFueSwgYW55Pikge1xyXG4gICAgdGhpcy5hZGRGZWF0dXJlcyhbZmVhdHVyZV0pO1xyXG4gIH1cclxuXHJcbiAgYWRkRmVhdHVyZXMoZmVhdHVyZXM6IFN0b3JlRmVhdHVyZTxhbnksIGFueT5bXSkge1xyXG4gICAgY29uc3QgcmVkdWNlcnMgPSBmZWF0dXJlcy5yZWR1Y2UoXHJcbiAgICAgIChcclxuICAgICAgICByZWR1Y2VyRGljdCxcclxuICAgICAgICB7IHJlZHVjZXJzLCByZWR1Y2VyRmFjdG9yeSwgbWV0YVJlZHVjZXJzLCBpbml0aWFsU3RhdGUsIGtleSB9XHJcbiAgICAgICkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlZHVjZXIgPVxyXG4gICAgICAgICAgdHlwZW9mIHJlZHVjZXJzID09PSAnZnVuY3Rpb24nXHJcbiAgICAgICAgICAgID8gY3JlYXRlRmVhdHVyZVJlZHVjZXJGYWN0b3J5KG1ldGFSZWR1Y2VycykocmVkdWNlcnMsIGluaXRpYWxTdGF0ZSlcclxuICAgICAgICAgICAgOiBjcmVhdGVSZWR1Y2VyRmFjdG9yeShyZWR1Y2VyRmFjdG9yeSwgbWV0YVJlZHVjZXJzKShcclxuICAgICAgICAgICAgICAgIHJlZHVjZXJzLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFN0YXRlXHJcbiAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmVkdWNlckRpY3Rba2V5XSA9IHJlZHVjZXI7XHJcbiAgICAgICAgcmV0dXJuIHJlZHVjZXJEaWN0O1xyXG4gICAgICB9LFxyXG4gICAgICB7fSBhcyB7IFtrZXk6IHN0cmluZ106IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+IH1cclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5hZGRSZWR1Y2VycyhyZWR1Y2Vycyk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGZWF0dXJlKGZlYXR1cmU6IFN0b3JlRmVhdHVyZTxhbnksIGFueT4pIHtcclxuICAgIHRoaXMucmVtb3ZlRmVhdHVyZXMoW2ZlYXR1cmVdKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZlYXR1cmVzKGZlYXR1cmVzOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+W10pIHtcclxuICAgIHRoaXMucmVtb3ZlUmVkdWNlcnMoZmVhdHVyZXMubWFwKHAgPT4gcC5rZXkpKTtcclxuICB9XHJcblxyXG4gIGFkZFJlZHVjZXIoa2V5OiBzdHJpbmcsIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+KSB7XHJcbiAgICB0aGlzLmFkZFJlZHVjZXJzKHsgW2tleV06IHJlZHVjZXIgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRSZWR1Y2VycyhyZWR1Y2VyczogeyBba2V5OiBzdHJpbmddOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PiB9KSB7XHJcbiAgICB0aGlzLnJlZHVjZXJzID0geyAuLi50aGlzLnJlZHVjZXJzLCAuLi5yZWR1Y2VycyB9O1xyXG4gICAgdGhpcy51cGRhdGVSZWR1Y2VycyhPYmplY3Qua2V5cyhyZWR1Y2VycykpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlUmVkdWNlcihmZWF0dXJlS2V5OiBzdHJpbmcpIHtcclxuICAgIHRoaXMucmVtb3ZlUmVkdWNlcnMoW2ZlYXR1cmVLZXldKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZVJlZHVjZXJzKGZlYXR1cmVLZXlzOiBzdHJpbmdbXSkge1xyXG4gICAgZmVhdHVyZUtleXMuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICB0aGlzLnJlZHVjZXJzID0gb21pdCh0aGlzLnJlZHVjZXJzLCBrZXkpIC8qVE9ETygjODIzKSovIGFzIGFueTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy51cGRhdGVSZWR1Y2VycyhmZWF0dXJlS2V5cyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZVJlZHVjZXJzKGZlYXR1cmVLZXlzOiBzdHJpbmdbXSkge1xyXG4gICAgdGhpcy5uZXh0KHRoaXMucmVkdWNlckZhY3RvcnkodGhpcy5yZWR1Y2VycywgdGhpcy5pbml0aWFsU3RhdGUpKTtcclxuICAgIHRoaXMuZGlzcGF0Y2hlci5uZXh0KDxBY3Rpb24+e1xyXG4gICAgICB0eXBlOiBVUERBVEUsXHJcbiAgICAgIGZlYXR1cmVzOiBmZWF0dXJlS2V5cyxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUkVEVUNFUl9NQU5BR0VSX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcclxuICBSZWR1Y2VyTWFuYWdlcixcclxuICB7IHByb3ZpZGU6IFJlZHVjZXJPYnNlcnZhYmxlLCB1c2VFeGlzdGluZzogUmVkdWNlck1hbmFnZXIgfSxcclxuICB7IHByb3ZpZGU6IFJlZHVjZXJNYW5hZ2VyRGlzcGF0Y2hlciwgdXNlRXhpc3Rpbmc6IEFjdGlvbnNTdWJqZWN0IH0sXHJcbl07XHJcbiJdfQ==