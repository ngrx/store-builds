import { __assign, __decorate, __extends, __metadata, __param } from "tslib";
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
        var _a;
        this.addReducers((_a = {}, _a[key] = reducer, _a));
    };
    ReducerManager.prototype.addReducers = function (reducers) {
        this.reducers = __assign(__assign({}, this.reducers), reducers);
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
    ReducerManager = __decorate([
        Injectable(),
        __param(1, Inject(INITIAL_STATE)),
        __param(2, Inject(INITIAL_REDUCERS)),
        __param(3, Inject(REDUCER_FACTORY)),
        __metadata("design:paramtypes", [ReducerManagerDispatcher, Object, Object, Function])
    ], ReducerManager);
    return ReducerManager;
}(BehaviorSubject));
export { ReducerManager };
export var REDUCER_MANAGER_PROVIDERS = [
    ReducerManager,
    { provide: ReducerObservable, useExisting: ReducerManager },
    { provide: ReducerManagerDispatcher, useExisting: ActionsSubject },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBUW5ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzVFLE9BQU8sRUFDTCwyQkFBMkIsRUFDM0Isb0JBQW9CLEVBQ3BCLElBQUksR0FDTCxNQUFNLFNBQVMsQ0FBQztBQUVqQjtJQUFnRCxxQ0FFL0M7SUFGRDs7SUFFRyxDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQUFDLEFBRkosQ0FBZ0QsVUFBVSxHQUV0RDs7QUFDSjtJQUF1RCw0Q0FBYztJQUFyRTs7SUFBdUUsQ0FBQztJQUFELCtCQUFDO0FBQUQsQ0FBQyxBQUF4RSxDQUF1RCxjQUFjLEdBQUc7O0FBQ3hFLE1BQU0sQ0FBQyxJQUFNLE1BQU0sR0FBRyw2QkFBOEQsQ0FBQztBQUdyRjtJQUFvQyxrQ0FBd0M7SUFFMUUsd0JBQ1UsVUFBb0MsRUFDYixZQUFpQixFQUNkLFFBQW9DLEVBRTlELGNBQThDO1FBTHhELFlBT0Usa0JBQU0sY0FBYyxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQyxTQUM5QztRQVBTLGdCQUFVLEdBQVYsVUFBVSxDQUEwQjtRQUNiLGtCQUFZLEdBQVosWUFBWSxDQUFLO1FBQ2QsY0FBUSxHQUFSLFFBQVEsQ0FBNEI7UUFFOUQsb0JBQWMsR0FBZCxjQUFjLENBQWdDOztJQUd4RCxDQUFDO0lBRUQsbUNBQVUsR0FBVixV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d0I7T0FIbkMsY0FBYyxDQThFMUI7SUFBRCxxQkFBQztDQUFBLEFBOUVELENBQW9DLGVBQWUsR0E4RWxEO1NBOUVZLGNBQWM7QUFnRjNCLE1BQU0sQ0FBQyxJQUFNLHlCQUF5QixHQUFlO0lBQ25ELGNBQWM7SUFDZCxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFO0lBQzNELEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUU7Q0FDbkUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEFjdGlvbnNTdWJqZWN0IH0gZnJvbSAnLi9hY3Rpb25zX3N1YmplY3QnO1xyXG5pbXBvcnQge1xyXG4gIEFjdGlvbixcclxuICBBY3Rpb25SZWR1Y2VyLFxyXG4gIEFjdGlvblJlZHVjZXJGYWN0b3J5LFxyXG4gIEFjdGlvblJlZHVjZXJNYXAsXHJcbiAgU3RvcmVGZWF0dXJlLFxyXG59IGZyb20gJy4vbW9kZWxzJztcclxuaW1wb3J0IHsgSU5JVElBTF9SRURVQ0VSUywgSU5JVElBTF9TVEFURSwgUkVEVUNFUl9GQUNUT1JZIH0gZnJvbSAnLi90b2tlbnMnO1xyXG5pbXBvcnQge1xyXG4gIGNyZWF0ZUZlYXR1cmVSZWR1Y2VyRmFjdG9yeSxcclxuICBjcmVhdGVSZWR1Y2VyRmFjdG9yeSxcclxuICBvbWl0LFxyXG59IGZyb20gJy4vdXRpbHMnO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlZHVjZXJPYnNlcnZhYmxlIGV4dGVuZHMgT2JzZXJ2YWJsZTxcclxuICBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PlxyXG4+IHt9XHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZWR1Y2VyTWFuYWdlckRpc3BhdGNoZXIgZXh0ZW5kcyBBY3Rpb25zU3ViamVjdCB7fVxyXG5leHBvcnQgY29uc3QgVVBEQVRFID0gJ0BuZ3J4L3N0b3JlL3VwZGF0ZS1yZWR1Y2VycycgYXMgJ0BuZ3J4L3N0b3JlL3VwZGF0ZS1yZWR1Y2Vycyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSZWR1Y2VyTWFuYWdlciBleHRlbmRzIEJlaGF2aW9yU3ViamVjdDxBY3Rpb25SZWR1Y2VyPGFueSwgYW55Pj5cclxuICBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGRpc3BhdGNoZXI6IFJlZHVjZXJNYW5hZ2VyRGlzcGF0Y2hlcixcclxuICAgIEBJbmplY3QoSU5JVElBTF9TVEFURSkgcHJpdmF0ZSBpbml0aWFsU3RhdGU6IGFueSxcclxuICAgIEBJbmplY3QoSU5JVElBTF9SRURVQ0VSUykgcHJpdmF0ZSByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT4sXHJcbiAgICBASW5qZWN0KFJFRFVDRVJfRkFDVE9SWSlcclxuICAgIHByaXZhdGUgcmVkdWNlckZhY3Rvcnk6IEFjdGlvblJlZHVjZXJGYWN0b3J5PGFueSwgYW55PlxyXG4gICkge1xyXG4gICAgc3VwZXIocmVkdWNlckZhY3RvcnkocmVkdWNlcnMsIGluaXRpYWxTdGF0ZSkpO1xyXG4gIH1cclxuXHJcbiAgYWRkRmVhdHVyZShmZWF0dXJlOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+KSB7XHJcbiAgICB0aGlzLmFkZEZlYXR1cmVzKFtmZWF0dXJlXSk7XHJcbiAgfVxyXG5cclxuICBhZGRGZWF0dXJlcyhmZWF0dXJlczogU3RvcmVGZWF0dXJlPGFueSwgYW55PltdKSB7XHJcbiAgICBjb25zdCByZWR1Y2VycyA9IGZlYXR1cmVzLnJlZHVjZShcclxuICAgICAgKFxyXG4gICAgICAgIHJlZHVjZXJEaWN0LFxyXG4gICAgICAgIHsgcmVkdWNlcnMsIHJlZHVjZXJGYWN0b3J5LCBtZXRhUmVkdWNlcnMsIGluaXRpYWxTdGF0ZSwga2V5IH1cclxuICAgICAgKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVkdWNlciA9XHJcbiAgICAgICAgICB0eXBlb2YgcmVkdWNlcnMgPT09ICdmdW5jdGlvbidcclxuICAgICAgICAgICAgPyBjcmVhdGVGZWF0dXJlUmVkdWNlckZhY3RvcnkobWV0YVJlZHVjZXJzKShyZWR1Y2VycywgaW5pdGlhbFN0YXRlKVxyXG4gICAgICAgICAgICA6IGNyZWF0ZVJlZHVjZXJGYWN0b3J5KHJlZHVjZXJGYWN0b3J5LCBtZXRhUmVkdWNlcnMpKFxyXG4gICAgICAgICAgICAgICAgcmVkdWNlcnMsXHJcbiAgICAgICAgICAgICAgICBpbml0aWFsU3RhdGVcclxuICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICByZWR1Y2VyRGljdFtrZXldID0gcmVkdWNlcjtcclxuICAgICAgICByZXR1cm4gcmVkdWNlckRpY3Q7XHJcbiAgICAgIH0sXHJcbiAgICAgIHt9IGFzIHsgW2tleTogc3RyaW5nXTogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4gfVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmFkZFJlZHVjZXJzKHJlZHVjZXJzKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZlYXR1cmUoZmVhdHVyZTogU3RvcmVGZWF0dXJlPGFueSwgYW55Pikge1xyXG4gICAgdGhpcy5yZW1vdmVGZWF0dXJlcyhbZmVhdHVyZV0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRmVhdHVyZXMoZmVhdHVyZXM6IFN0b3JlRmVhdHVyZTxhbnksIGFueT5bXSkge1xyXG4gICAgdGhpcy5yZW1vdmVSZWR1Y2VycyhmZWF0dXJlcy5tYXAocCA9PiBwLmtleSkpO1xyXG4gIH1cclxuXHJcbiAgYWRkUmVkdWNlcihrZXk6IHN0cmluZywgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4pIHtcclxuICAgIHRoaXMuYWRkUmVkdWNlcnMoeyBba2V5XTogcmVkdWNlciB9KTtcclxuICB9XHJcblxyXG4gIGFkZFJlZHVjZXJzKHJlZHVjZXJzOiB7IFtrZXk6IHN0cmluZ106IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+IH0pIHtcclxuICAgIHRoaXMucmVkdWNlcnMgPSB7IC4uLnRoaXMucmVkdWNlcnMsIC4uLnJlZHVjZXJzIH07XHJcbiAgICB0aGlzLnVwZGF0ZVJlZHVjZXJzKE9iamVjdC5rZXlzKHJlZHVjZXJzKSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVSZWR1Y2VyKGZlYXR1cmVLZXk6IHN0cmluZykge1xyXG4gICAgdGhpcy5yZW1vdmVSZWR1Y2VycyhbZmVhdHVyZUtleV0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlUmVkdWNlcnMoZmVhdHVyZUtleXM6IHN0cmluZ1tdKSB7XHJcbiAgICBmZWF0dXJlS2V5cy5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIHRoaXMucmVkdWNlcnMgPSBvbWl0KHRoaXMucmVkdWNlcnMsIGtleSkgLypUT0RPKCM4MjMpKi8gYXMgYW55O1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnVwZGF0ZVJlZHVjZXJzKGZlYXR1cmVLZXlzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlUmVkdWNlcnMoZmVhdHVyZUtleXM6IHN0cmluZ1tdKSB7XHJcbiAgICB0aGlzLm5leHQodGhpcy5yZWR1Y2VyRmFjdG9yeSh0aGlzLnJlZHVjZXJzLCB0aGlzLmluaXRpYWxTdGF0ZSkpO1xyXG4gICAgdGhpcy5kaXNwYXRjaGVyLm5leHQoPEFjdGlvbj57XHJcbiAgICAgIHR5cGU6IFVQREFURSxcclxuICAgICAgZmVhdHVyZXM6IGZlYXR1cmVLZXlzLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY29tcGxldGUoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSRURVQ0VSX01BTkFHRVJfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xyXG4gIFJlZHVjZXJNYW5hZ2VyLFxyXG4gIHsgcHJvdmlkZTogUmVkdWNlck9ic2VydmFibGUsIHVzZUV4aXN0aW5nOiBSZWR1Y2VyTWFuYWdlciB9LFxyXG4gIHsgcHJvdmlkZTogUmVkdWNlck1hbmFnZXJEaXNwYXRjaGVyLCB1c2VFeGlzdGluZzogQWN0aW9uc1N1YmplY3QgfSxcclxuXTtcclxuIl19