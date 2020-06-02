var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * @fileoverview added by tsickle
 * Generated from: src/reducer_manager.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActionsSubject } from './actions_subject';
import { INITIAL_REDUCERS, INITIAL_STATE, REDUCER_FACTORY } from './tokens';
import { createFeatureReducerFactory, createReducerFactory, omit, } from './utils';
/**
 * @abstract
 */
var /**
 * @abstract
 */
ReducerObservable = /** @class */ (function (_super) {
    __extends(ReducerObservable, _super);
    function ReducerObservable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReducerObservable;
}(Observable));
/**
 * @abstract
 */
export { ReducerObservable };
/**
 * @abstract
 */
var /**
 * @abstract
 */
ReducerManagerDispatcher = /** @class */ (function (_super) {
    __extends(ReducerManagerDispatcher, _super);
    function ReducerManagerDispatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReducerManagerDispatcher;
}(ActionsSubject));
/**
 * @abstract
 */
export { ReducerManagerDispatcher };
/** @type {?} */
export var UPDATE = (/** @type {?} */ ('@ngrx/store/update-reducers'));
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
    /**
     * @param {?} feature
     * @return {?}
     */
    ReducerManager.prototype.addFeature = /**
     * @param {?} feature
     * @return {?}
     */
    function (feature) {
        this.addFeatures([feature]);
    };
    /**
     * @param {?} features
     * @return {?}
     */
    ReducerManager.prototype.addFeatures = /**
     * @param {?} features
     * @return {?}
     */
    function (features) {
        /** @type {?} */
        var reducers = features.reduce((/**
         * @param {?} reducerDict
         * @param {?} __1
         * @return {?}
         */
        function (reducerDict, _a) {
            var reducers = _a.reducers, reducerFactory = _a.reducerFactory, metaReducers = _a.metaReducers, initialState = _a.initialState, key = _a.key;
            /** @type {?} */
            var reducer = typeof reducers === 'function'
                ? createFeatureReducerFactory(metaReducers)(reducers, initialState)
                : createReducerFactory(reducerFactory, metaReducers)(reducers, initialState);
            reducerDict[key] = reducer;
            return reducerDict;
        }), (/** @type {?} */ ({})));
        this.addReducers(reducers);
    };
    /**
     * @param {?} feature
     * @return {?}
     */
    ReducerManager.prototype.removeFeature = /**
     * @param {?} feature
     * @return {?}
     */
    function (feature) {
        this.removeFeatures([feature]);
    };
    /**
     * @param {?} features
     * @return {?}
     */
    ReducerManager.prototype.removeFeatures = /**
     * @param {?} features
     * @return {?}
     */
    function (features) {
        this.removeReducers(features.map((/**
         * @param {?} p
         * @return {?}
         */
        function (p) { return p.key; })));
    };
    /**
     * @param {?} key
     * @param {?} reducer
     * @return {?}
     */
    ReducerManager.prototype.addReducer = /**
     * @param {?} key
     * @param {?} reducer
     * @return {?}
     */
    function (key, reducer) {
        var _a;
        this.addReducers((_a = {}, _a[key] = reducer, _a));
    };
    /**
     * @param {?} reducers
     * @return {?}
     */
    ReducerManager.prototype.addReducers = /**
     * @param {?} reducers
     * @return {?}
     */
    function (reducers) {
        this.reducers = __assign(__assign({}, this.reducers), reducers);
        this.updateReducers(Object.keys(reducers));
    };
    /**
     * @param {?} featureKey
     * @return {?}
     */
    ReducerManager.prototype.removeReducer = /**
     * @param {?} featureKey
     * @return {?}
     */
    function (featureKey) {
        this.removeReducers([featureKey]);
    };
    /**
     * @param {?} featureKeys
     * @return {?}
     */
    ReducerManager.prototype.removeReducers = /**
     * @param {?} featureKeys
     * @return {?}
     */
    function (featureKeys) {
        var _this = this;
        featureKeys.forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            _this.reducers = (/** @type {?} */ (omit(_this.reducers, key) /*TODO(#823)*/));
        }));
        this.updateReducers(featureKeys);
    };
    /**
     * @private
     * @param {?} featureKeys
     * @return {?}
     */
    ReducerManager.prototype.updateReducers = /**
     * @private
     * @param {?} featureKeys
     * @return {?}
     */
    function (featureKeys) {
        this.next(this.reducerFactory(this.reducers, this.initialState));
        this.dispatcher.next((/** @type {?} */ ({
            type: UPDATE,
            features: featureKeys,
        })));
    };
    /**
     * @return {?}
     */
    ReducerManager.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    ReducerManager.prototype.dispatcher;
    /**
     * @type {?}
     * @private
     */
    ReducerManager.prototype.initialState;
    /**
     * @type {?}
     * @private
     */
    ReducerManager.prototype.reducers;
    /**
     * @type {?}
     * @private
     */
    ReducerManager.prototype.reducerFactory;
}
/** @type {?} */
export var REDUCER_MANAGER_PROVIDERS = [
    ReducerManager,
    { provide: ReducerObservable, useExisting: ReducerManager },
    { provide: ReducerManagerDispatcher, useExisting: ActionsSubject },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ncngvc3RvcmUvIiwic291cmNlcyI6WyJzcmMvcmVkdWNlcl9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQVFuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM1RSxPQUFPLEVBQ0wsMkJBQTJCLEVBQzNCLG9CQUFvQixFQUNwQixJQUFJLEdBQ0wsTUFBTSxTQUFTLENBQUM7Ozs7QUFFakI7Ozs7SUFBZ0QscUNBRS9DO0lBRkQ7O0lBRUcsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FBQyxBQUZKLENBQWdELFVBQVUsR0FFdEQ7Ozs7Ozs7O0FBQ0o7Ozs7SUFBdUQsNENBQWM7SUFBckU7O0lBQXVFLENBQUM7SUFBRCwrQkFBQztBQUFELENBQUMsQUFBeEUsQ0FBdUQsY0FBYyxHQUFHOzs7Ozs7QUFDeEUsTUFBTSxLQUFPLE1BQU0sR0FBRyxtQkFBQSw2QkFBNkIsRUFBaUM7QUFFcEY7SUFDb0Msa0NBQXdDO0lBRTFFLHdCQUNVLFVBQW9DLEVBQ2IsWUFBaUIsRUFDZCxRQUFvQyxFQUU5RCxjQUE4QztRQUx4RCxZQU9FLGtCQUFNLGNBQWMsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsU0FDOUM7UUFQUyxnQkFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFDYixrQkFBWSxHQUFaLFlBQVksQ0FBSztRQUNkLGNBQVEsR0FBUixRQUFRLENBQTRCO1FBRTlELG9CQUFjLEdBQWQsY0FBYyxDQUFnQzs7SUFH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QUF3QjtnREFDM0MsTUFBTSxTQUFDLGFBQWE7Z0RBQ3BCLE1BQU0sU0FBQyxnQkFBZ0I7Z0RBQ3ZCLE1BQU0sU0FBQyxlQUFlOztJQXdFM0IscUJBQUM7Q0FBQSxBQS9FRCxDQUNvQyxlQUFlLEdBOEVsRDtTQTlFWSxjQUFjOzs7Ozs7SUFHdkIsb0NBQTRDOzs7OztJQUM1QyxzQ0FBZ0Q7Ozs7O0lBQ2hELGtDQUFzRTs7Ozs7SUFDdEUsd0NBQ3NEOzs7QUF5RTFELE1BQU0sS0FBTyx5QkFBeUIsR0FBZTtJQUNuRCxjQUFjO0lBQ2QsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRTtJQUMzRCxFQUFFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFO0NBQ25FIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgQWN0aW9uc1N1YmplY3QgfSBmcm9tICcuL2FjdGlvbnNfc3ViamVjdCc7XHJcbmltcG9ydCB7XHJcbiAgQWN0aW9uLFxyXG4gIEFjdGlvblJlZHVjZXIsXHJcbiAgQWN0aW9uUmVkdWNlckZhY3RvcnksXHJcbiAgQWN0aW9uUmVkdWNlck1hcCxcclxuICBTdG9yZUZlYXR1cmUsXHJcbn0gZnJvbSAnLi9tb2RlbHMnO1xyXG5pbXBvcnQgeyBJTklUSUFMX1JFRFVDRVJTLCBJTklUSUFMX1NUQVRFLCBSRURVQ0VSX0ZBQ1RPUlkgfSBmcm9tICcuL3Rva2Vucyc7XHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlRmVhdHVyZVJlZHVjZXJGYWN0b3J5LFxyXG4gIGNyZWF0ZVJlZHVjZXJGYWN0b3J5LFxyXG4gIG9taXQsXHJcbn0gZnJvbSAnLi91dGlscyc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVkdWNlck9ic2VydmFibGUgZXh0ZW5kcyBPYnNlcnZhYmxlPFxyXG4gIEFjdGlvblJlZHVjZXI8YW55LCBhbnk+XHJcbj4ge31cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlZHVjZXJNYW5hZ2VyRGlzcGF0Y2hlciBleHRlbmRzIEFjdGlvbnNTdWJqZWN0IHt9XHJcbmV4cG9ydCBjb25zdCBVUERBVEUgPSAnQG5ncngvc3RvcmUvdXBkYXRlLXJlZHVjZXJzJyBhcyAnQG5ncngvc3RvcmUvdXBkYXRlLXJlZHVjZXJzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlZHVjZXJNYW5hZ2VyIGV4dGVuZHMgQmVoYXZpb3JTdWJqZWN0PEFjdGlvblJlZHVjZXI8YW55LCBhbnk+PlxyXG4gIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZGlzcGF0Y2hlcjogUmVkdWNlck1hbmFnZXJEaXNwYXRjaGVyLFxyXG4gICAgQEluamVjdChJTklUSUFMX1NUQVRFKSBwcml2YXRlIGluaXRpYWxTdGF0ZTogYW55LFxyXG4gICAgQEluamVjdChJTklUSUFMX1JFRFVDRVJTKSBwcml2YXRlIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PixcclxuICAgIEBJbmplY3QoUkVEVUNFUl9GQUNUT1JZKVxyXG4gICAgcHJpdmF0ZSByZWR1Y2VyRmFjdG9yeTogQWN0aW9uUmVkdWNlckZhY3Rvcnk8YW55LCBhbnk+XHJcbiAgKSB7XHJcbiAgICBzdXBlcihyZWR1Y2VyRmFjdG9yeShyZWR1Y2VycywgaW5pdGlhbFN0YXRlKSk7XHJcbiAgfVxyXG5cclxuICBhZGRGZWF0dXJlKGZlYXR1cmU6IFN0b3JlRmVhdHVyZTxhbnksIGFueT4pIHtcclxuICAgIHRoaXMuYWRkRmVhdHVyZXMoW2ZlYXR1cmVdKTtcclxuICB9XHJcblxyXG4gIGFkZEZlYXR1cmVzKGZlYXR1cmVzOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+W10pIHtcclxuICAgIGNvbnN0IHJlZHVjZXJzID0gZmVhdHVyZXMucmVkdWNlKFxyXG4gICAgICAoXHJcbiAgICAgICAgcmVkdWNlckRpY3QsXHJcbiAgICAgICAgeyByZWR1Y2VycywgcmVkdWNlckZhY3RvcnksIG1ldGFSZWR1Y2VycywgaW5pdGlhbFN0YXRlLCBrZXkgfVxyXG4gICAgICApID0+IHtcclxuICAgICAgICBjb25zdCByZWR1Y2VyID1cclxuICAgICAgICAgIHR5cGVvZiByZWR1Y2VycyA9PT0gJ2Z1bmN0aW9uJ1xyXG4gICAgICAgICAgICA/IGNyZWF0ZUZlYXR1cmVSZWR1Y2VyRmFjdG9yeShtZXRhUmVkdWNlcnMpKHJlZHVjZXJzLCBpbml0aWFsU3RhdGUpXHJcbiAgICAgICAgICAgIDogY3JlYXRlUmVkdWNlckZhY3RvcnkocmVkdWNlckZhY3RvcnksIG1ldGFSZWR1Y2VycykoXHJcbiAgICAgICAgICAgICAgICByZWR1Y2VycyxcclxuICAgICAgICAgICAgICAgIGluaXRpYWxTdGF0ZVxyXG4gICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIHJlZHVjZXJEaWN0W2tleV0gPSByZWR1Y2VyO1xyXG4gICAgICAgIHJldHVybiByZWR1Y2VyRGljdDtcclxuICAgICAgfSxcclxuICAgICAge30gYXMgeyBba2V5OiBzdHJpbmddOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PiB9XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuYWRkUmVkdWNlcnMocmVkdWNlcnMpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRmVhdHVyZShmZWF0dXJlOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+KSB7XHJcbiAgICB0aGlzLnJlbW92ZUZlYXR1cmVzKFtmZWF0dXJlXSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGZWF0dXJlcyhmZWF0dXJlczogU3RvcmVGZWF0dXJlPGFueSwgYW55PltdKSB7XHJcbiAgICB0aGlzLnJlbW92ZVJlZHVjZXJzKGZlYXR1cmVzLm1hcChwID0+IHAua2V5KSk7XHJcbiAgfVxyXG5cclxuICBhZGRSZWR1Y2VyKGtleTogc3RyaW5nLCByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55Pikge1xyXG4gICAgdGhpcy5hZGRSZWR1Y2Vycyh7IFtrZXldOiByZWR1Y2VyIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkUmVkdWNlcnMocmVkdWNlcnM6IHsgW2tleTogc3RyaW5nXTogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4gfSkge1xyXG4gICAgdGhpcy5yZWR1Y2VycyA9IHsgLi4udGhpcy5yZWR1Y2VycywgLi4ucmVkdWNlcnMgfTtcclxuICAgIHRoaXMudXBkYXRlUmVkdWNlcnMoT2JqZWN0LmtleXMocmVkdWNlcnMpKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZVJlZHVjZXIoZmVhdHVyZUtleTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnJlbW92ZVJlZHVjZXJzKFtmZWF0dXJlS2V5XSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVSZWR1Y2VycyhmZWF0dXJlS2V5czogc3RyaW5nW10pIHtcclxuICAgIGZlYXR1cmVLZXlzLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgdGhpcy5yZWR1Y2VycyA9IG9taXQodGhpcy5yZWR1Y2Vycywga2V5KSAvKlRPRE8oIzgyMykqLyBhcyBhbnk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMudXBkYXRlUmVkdWNlcnMoZmVhdHVyZUtleXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVSZWR1Y2VycyhmZWF0dXJlS2V5czogc3RyaW5nW10pIHtcclxuICAgIHRoaXMubmV4dCh0aGlzLnJlZHVjZXJGYWN0b3J5KHRoaXMucmVkdWNlcnMsIHRoaXMuaW5pdGlhbFN0YXRlKSk7XHJcbiAgICB0aGlzLmRpc3BhdGNoZXIubmV4dCg8QWN0aW9uPntcclxuICAgICAgdHlwZTogVVBEQVRFLFxyXG4gICAgICBmZWF0dXJlczogZmVhdHVyZUtleXMsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5jb21wbGV0ZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJFRFVDRVJfTUFOQUdFUl9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXHJcbiAgUmVkdWNlck1hbmFnZXIsXHJcbiAgeyBwcm92aWRlOiBSZWR1Y2VyT2JzZXJ2YWJsZSwgdXNlRXhpc3Rpbmc6IFJlZHVjZXJNYW5hZ2VyIH0sXHJcbiAgeyBwcm92aWRlOiBSZWR1Y2VyTWFuYWdlckRpc3BhdGNoZXIsIHVzZUV4aXN0aW5nOiBBY3Rpb25zU3ViamVjdCB9LFxyXG5dO1xyXG4iXX0=