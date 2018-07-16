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
        var _this = this;
        this.next(this.reducerFactory(this.reducers, this.initialState));
        featureKeys.forEach(function (feature) {
            _this.dispatcher.next({
                type: UPDATE,
                feature: feature,
            });
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
        { type: ReducerManagerDispatcher, },
        { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] },] },
        { type: undefined, decorators: [{ type: Inject, args: [INITIAL_REDUCERS,] },] },
        { type: undefined, decorators: [{ type: Inject, args: [REDUCER_FACTORY,] },] },
    ]; };
    return ReducerManager;
}(BehaviorSubject));
export { ReducerManager };
export var REDUCER_MANAGER_PROVIDERS = [
    ReducerManager,
    { provide: ReducerObservable, useExisting: ReducerManager },
    { provide: ReducerManagerDispatcher, useExisting: ActionsSubject },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFRbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDNUUsT0FBTyxFQUNMLDJCQUEyQixFQUMzQixvQkFBb0IsRUFDcEIsSUFBSSxHQUNMLE1BQU0sU0FBUyxDQUFDO0FBRWpCLElBQUE7SUFBZ0QscUNBRS9DOzs7OzRCQXBCRDtFQWtCZ0QsVUFBVSxFQUV0RCxDQUFBO0FBRkosNkJBRUk7QUFDSixJQUFBO0lBQXVELDRDQUFjOzs7O21DQXJCckU7RUFxQnVELGNBQWMsRUFBRyxDQUFBO0FBQXhFLG9DQUF3RTtBQUN4RSxNQUFNLENBQUMsSUFBTSxNQUFNLEdBQUcsNkJBQThELENBQUM7O0lBR2pELGtDQUF3QztJQUUxRSx3QkFDVSxVQUFvQyxFQUNiLGNBQ0csVUFFMUI7UUFMVixZQU9FLGtCQUFNLGNBQWMsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsU0FDOUM7UUFQUyxnQkFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFDYixrQkFBWSxHQUFaLFlBQVk7UUFDVCxjQUFRLEdBQVIsUUFBUTtRQUVsQyxvQkFBYyxHQUFkLGNBQWM7O0tBR3ZCO0lBRUQsbUNBQVUsR0FBVixVQUFXLE9BQStCO1FBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMs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QixFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUU7SUFDM0QsRUFBRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRTtDQUNuRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgQWN0aW9uc1N1YmplY3QgfSBmcm9tICcuL2FjdGlvbnNfc3ViamVjdCc7XHJcbmltcG9ydCB7XHJcbiAgQWN0aW9uLFxyXG4gIEFjdGlvblJlZHVjZXIsXHJcbiAgQWN0aW9uUmVkdWNlckZhY3RvcnksXHJcbiAgQWN0aW9uUmVkdWNlck1hcCxcclxuICBTdG9yZUZlYXR1cmUsXHJcbn0gZnJvbSAnLi9tb2RlbHMnO1xyXG5pbXBvcnQgeyBJTklUSUFMX1JFRFVDRVJTLCBJTklUSUFMX1NUQVRFLCBSRURVQ0VSX0ZBQ1RPUlkgfSBmcm9tICcuL3Rva2Vucyc7XHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlRmVhdHVyZVJlZHVjZXJGYWN0b3J5LFxyXG4gIGNyZWF0ZVJlZHVjZXJGYWN0b3J5LFxyXG4gIG9taXQsXHJcbn0gZnJvbSAnLi91dGlscyc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVkdWNlck9ic2VydmFibGUgZXh0ZW5kcyBPYnNlcnZhYmxlPFxyXG4gIEFjdGlvblJlZHVjZXI8YW55LCBhbnk+XHJcbj4ge31cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlZHVjZXJNYW5hZ2VyRGlzcGF0Y2hlciBleHRlbmRzIEFjdGlvbnNTdWJqZWN0IHt9XHJcbmV4cG9ydCBjb25zdCBVUERBVEUgPSAnQG5ncngvc3RvcmUvdXBkYXRlLXJlZHVjZXJzJyBhcyAnQG5ncngvc3RvcmUvdXBkYXRlLXJlZHVjZXJzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlZHVjZXJNYW5hZ2VyIGV4dGVuZHMgQmVoYXZpb3JTdWJqZWN0PEFjdGlvblJlZHVjZXI8YW55LCBhbnk+PlxyXG4gIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZGlzcGF0Y2hlcjogUmVkdWNlck1hbmFnZXJEaXNwYXRjaGVyLFxyXG4gICAgQEluamVjdChJTklUSUFMX1NUQVRFKSBwcml2YXRlIGluaXRpYWxTdGF0ZTogYW55LFxyXG4gICAgQEluamVjdChJTklUSUFMX1JFRFVDRVJTKSBwcml2YXRlIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PixcclxuICAgIEBJbmplY3QoUkVEVUNFUl9GQUNUT1JZKVxyXG4gICAgcHJpdmF0ZSByZWR1Y2VyRmFjdG9yeTogQWN0aW9uUmVkdWNlckZhY3Rvcnk8YW55LCBhbnk+XHJcbiAgKSB7XHJcbiAgICBzdXBlcihyZWR1Y2VyRmFjdG9yeShyZWR1Y2VycywgaW5pdGlhbFN0YXRlKSk7XHJcbiAgfVxyXG5cclxuICBhZGRGZWF0dXJlKGZlYXR1cmU6IFN0b3JlRmVhdHVyZTxhbnksIGFueT4pIHtcclxuICAgIHRoaXMuYWRkRmVhdHVyZXMoW2ZlYXR1cmVdKTtcclxuICB9XHJcblxyXG4gIGFkZEZlYXR1cmVzKGZlYXR1cmVzOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+W10pIHtcclxuICAgIGNvbnN0IHJlZHVjZXJzID0gZmVhdHVyZXMucmVkdWNlKFxyXG4gICAgICAoXHJcbiAgICAgICAgcmVkdWNlckRpY3QsXHJcbiAgICAgICAgeyByZWR1Y2VycywgcmVkdWNlckZhY3RvcnksIG1ldGFSZWR1Y2VycywgaW5pdGlhbFN0YXRlLCBrZXkgfVxyXG4gICAgICApID0+IHtcclxuICAgICAgICBjb25zdCByZWR1Y2VyID1cclxuICAgICAgICAgIHR5cGVvZiByZWR1Y2VycyA9PT0gJ2Z1bmN0aW9uJ1xyXG4gICAgICAgICAgICA/IGNyZWF0ZUZlYXR1cmVSZWR1Y2VyRmFjdG9yeShtZXRhUmVkdWNlcnMpKHJlZHVjZXJzLCBpbml0aWFsU3RhdGUpXHJcbiAgICAgICAgICAgIDogY3JlYXRlUmVkdWNlckZhY3RvcnkocmVkdWNlckZhY3RvcnksIG1ldGFSZWR1Y2VycykoXHJcbiAgICAgICAgICAgICAgICByZWR1Y2VycyxcclxuICAgICAgICAgICAgICAgIGluaXRpYWxTdGF0ZVxyXG4gICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIHJlZHVjZXJEaWN0W2tleV0gPSByZWR1Y2VyO1xyXG4gICAgICAgIHJldHVybiByZWR1Y2VyRGljdDtcclxuICAgICAgfSxcclxuICAgICAge30gYXMgeyBba2V5OiBzdHJpbmddOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PiB9XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuYWRkUmVkdWNlcnMocmVkdWNlcnMpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRmVhdHVyZShmZWF0dXJlOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+KSB7XHJcbiAgICB0aGlzLnJlbW92ZUZlYXR1cmVzKFtmZWF0dXJlXSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGZWF0dXJlcyhmZWF0dXJlczogU3RvcmVGZWF0dXJlPGFueSwgYW55PltdKSB7XHJcbiAgICB0aGlzLnJlbW92ZVJlZHVjZXJzKGZlYXR1cmVzLm1hcChwID0+IHAua2V5KSk7XHJcbiAgfVxyXG5cclxuICBhZGRSZWR1Y2VyKGtleTogc3RyaW5nLCByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55Pikge1xyXG4gICAgdGhpcy5hZGRSZWR1Y2Vycyh7IFtrZXldOiByZWR1Y2VyIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkUmVkdWNlcnMocmVkdWNlcnM6IHsgW2tleTogc3RyaW5nXTogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4gfSkge1xyXG4gICAgdGhpcy5yZWR1Y2VycyA9IHsgLi4udGhpcy5yZWR1Y2VycywgLi4ucmVkdWNlcnMgfTtcclxuICAgIHRoaXMudXBkYXRlUmVkdWNlcnMoT2JqZWN0LmtleXMocmVkdWNlcnMpKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZVJlZHVjZXIoZmVhdHVyZUtleTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnJlbW92ZVJlZHVjZXJzKFtmZWF0dXJlS2V5XSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVSZWR1Y2VycyhmZWF0dXJlS2V5czogc3RyaW5nW10pIHtcclxuICAgIGZlYXR1cmVLZXlzLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgdGhpcy5yZWR1Y2VycyA9IG9taXQodGhpcy5yZWR1Y2Vycywga2V5KSAvKlRPRE8oIzgyMykqLyBhcyBhbnk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMudXBkYXRlUmVkdWNlcnMoZmVhdHVyZUtleXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVSZWR1Y2VycyhmZWF0dXJlS2V5czogc3RyaW5nW10pIHtcclxuICAgIHRoaXMubmV4dCh0aGlzLnJlZHVjZXJGYWN0b3J5KHRoaXMucmVkdWNlcnMsIHRoaXMuaW5pdGlhbFN0YXRlKSk7XHJcblxyXG4gICAgZmVhdHVyZUtleXMuZm9yRWFjaChmZWF0dXJlID0+IHtcclxuICAgICAgdGhpcy5kaXNwYXRjaGVyLm5leHQoPEFjdGlvbj57XHJcbiAgICAgICAgdHlwZTogVVBEQVRFLFxyXG4gICAgICAgIGZlYXR1cmUsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY29tcGxldGUoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSRURVQ0VSX01BTkFHRVJfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xyXG4gIFJlZHVjZXJNYW5hZ2VyLFxyXG4gIHsgcHJvdmlkZTogUmVkdWNlck9ic2VydmFibGUsIHVzZUV4aXN0aW5nOiBSZWR1Y2VyTWFuYWdlciB9LFxyXG4gIHsgcHJvdmlkZTogUmVkdWNlck1hbmFnZXJEaXNwYXRjaGVyLCB1c2VFeGlzdGluZzogQWN0aW9uc1N1YmplY3QgfSxcclxuXTtcclxuIl19