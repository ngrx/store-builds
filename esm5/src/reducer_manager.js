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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ncngvc3RvcmUvIiwic291cmNlcyI6WyJzcmMvcmVkdWNlcl9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQVFuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM1RSxPQUFPLEVBQ0wsMkJBQTJCLEVBQzNCLG9CQUFvQixFQUNwQixJQUFJLEdBQ0wsTUFBTSxTQUFTLENBQUM7Ozs7QUFFakI7Ozs7SUFBZ0QscUNBRS9DO0lBRkQ7O0lBRUcsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FBQyxBQUZKLENBQWdELFVBQVUsR0FFdEQ7Ozs7Ozs7O0FBQ0o7Ozs7SUFBdUQsNENBQWM7SUFBckU7O0lBQXVFLENBQUM7SUFBRCwrQkFBQztBQUFELENBQUMsQUFBeEUsQ0FBdUQsY0FBYyxHQUFHOzs7Ozs7QUFDeEUsTUFBTSxLQUFPLE1BQU0sR0FBRyxtQkFBQSw2QkFBNkIsRUFBaUM7QUFFcEY7SUFDb0Msa0NBQXdDO0lBRTFFLHdCQUNVLFVBQW9DLEVBQ2IsWUFBaUIsRUFDZCxRQUFvQyxFQUU5RCxjQUE4QztRQUx4RCxZQU9FLGtCQUFNLGNBQWMsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsU0FDOUM7UUFQUyxnQkFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFDYixrQkFBWSxHQUFaLFlBQVksQ0FBSztRQUNkLGNBQVEsR0FBUixRQUFRLENBQTRCO1FBRTlELG9CQUFjLEdBQWQsY0FBYyxDQUFnQzs7SUFH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QUF3QjtnREFDM0MsTUFBTSxTQUFDLGFBQWE7Z0RBQ3BCLE1BQU0sU0FBQyxnQkFBZ0I7Z0RBQ3ZCLE1BQU0sU0FBQyxlQUFlOztJQXdFM0IscUJBQUM7Q0FBQSxBQS9FRCxDQUNvQyxlQUFlLEdBOEVsRDtTQTlFWSxjQUFjOzs7Ozs7SUFHdkIsb0NBQTRDOzs7OztJQUM1QyxzQ0FBZ0Q7Ozs7O0lBQ2hELGtDQUFzRTs7Ozs7SUFDdEUsd0NBQ3NEOzs7QUF5RTFELE1BQU0sS0FBTyx5QkFBeUIsR0FBZTtJQUNuRCxjQUFjO0lBQ2QsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRTtJQUMzRCxFQUFFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFO0NBQ25FIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQWN0aW9uc1N1YmplY3QgfSBmcm9tICcuL2FjdGlvbnNfc3ViamVjdCc7XG5pbXBvcnQge1xuICBBY3Rpb24sXG4gIEFjdGlvblJlZHVjZXIsXG4gIEFjdGlvblJlZHVjZXJGYWN0b3J5LFxuICBBY3Rpb25SZWR1Y2VyTWFwLFxuICBTdG9yZUZlYXR1cmUsXG59IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IElOSVRJQUxfUkVEVUNFUlMsIElOSVRJQUxfU1RBVEUsIFJFRFVDRVJfRkFDVE9SWSB9IGZyb20gJy4vdG9rZW5zJztcbmltcG9ydCB7XG4gIGNyZWF0ZUZlYXR1cmVSZWR1Y2VyRmFjdG9yeSxcbiAgY3JlYXRlUmVkdWNlckZhY3RvcnksXG4gIG9taXQsXG59IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVkdWNlck9ic2VydmFibGUgZXh0ZW5kcyBPYnNlcnZhYmxlPFxuICBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PlxuPiB7fVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlZHVjZXJNYW5hZ2VyRGlzcGF0Y2hlciBleHRlbmRzIEFjdGlvbnNTdWJqZWN0IHt9XG5leHBvcnQgY29uc3QgVVBEQVRFID0gJ0BuZ3J4L3N0b3JlL3VwZGF0ZS1yZWR1Y2VycycgYXMgJ0BuZ3J4L3N0b3JlL3VwZGF0ZS1yZWR1Y2Vycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZWR1Y2VyTWFuYWdlciBleHRlbmRzIEJlaGF2aW9yU3ViamVjdDxBY3Rpb25SZWR1Y2VyPGFueSwgYW55Pj5cbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRpc3BhdGNoZXI6IFJlZHVjZXJNYW5hZ2VyRGlzcGF0Y2hlcixcbiAgICBASW5qZWN0KElOSVRJQUxfU1RBVEUpIHByaXZhdGUgaW5pdGlhbFN0YXRlOiBhbnksXG4gICAgQEluamVjdChJTklUSUFMX1JFRFVDRVJTKSBwcml2YXRlIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PixcbiAgICBASW5qZWN0KFJFRFVDRVJfRkFDVE9SWSlcbiAgICBwcml2YXRlIHJlZHVjZXJGYWN0b3J5OiBBY3Rpb25SZWR1Y2VyRmFjdG9yeTxhbnksIGFueT5cbiAgKSB7XG4gICAgc3VwZXIocmVkdWNlckZhY3RvcnkocmVkdWNlcnMsIGluaXRpYWxTdGF0ZSkpO1xuICB9XG5cbiAgYWRkRmVhdHVyZShmZWF0dXJlOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+KSB7XG4gICAgdGhpcy5hZGRGZWF0dXJlcyhbZmVhdHVyZV0pO1xuICB9XG5cbiAgYWRkRmVhdHVyZXMoZmVhdHVyZXM6IFN0b3JlRmVhdHVyZTxhbnksIGFueT5bXSkge1xuICAgIGNvbnN0IHJlZHVjZXJzID0gZmVhdHVyZXMucmVkdWNlKFxuICAgICAgKFxuICAgICAgICByZWR1Y2VyRGljdCxcbiAgICAgICAgeyByZWR1Y2VycywgcmVkdWNlckZhY3RvcnksIG1ldGFSZWR1Y2VycywgaW5pdGlhbFN0YXRlLCBrZXkgfVxuICAgICAgKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlZHVjZXIgPVxuICAgICAgICAgIHR5cGVvZiByZWR1Y2VycyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyBjcmVhdGVGZWF0dXJlUmVkdWNlckZhY3RvcnkobWV0YVJlZHVjZXJzKShyZWR1Y2VycywgaW5pdGlhbFN0YXRlKVxuICAgICAgICAgICAgOiBjcmVhdGVSZWR1Y2VyRmFjdG9yeShyZWR1Y2VyRmFjdG9yeSwgbWV0YVJlZHVjZXJzKShcbiAgICAgICAgICAgICAgICByZWR1Y2VycyxcbiAgICAgICAgICAgICAgICBpbml0aWFsU3RhdGVcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICByZWR1Y2VyRGljdFtrZXldID0gcmVkdWNlcjtcbiAgICAgICAgcmV0dXJuIHJlZHVjZXJEaWN0O1xuICAgICAgfSxcbiAgICAgIHt9IGFzIHsgW2tleTogc3RyaW5nXTogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4gfVxuICAgICk7XG5cbiAgICB0aGlzLmFkZFJlZHVjZXJzKHJlZHVjZXJzKTtcbiAgfVxuXG4gIHJlbW92ZUZlYXR1cmUoZmVhdHVyZTogU3RvcmVGZWF0dXJlPGFueSwgYW55Pikge1xuICAgIHRoaXMucmVtb3ZlRmVhdHVyZXMoW2ZlYXR1cmVdKTtcbiAgfVxuXG4gIHJlbW92ZUZlYXR1cmVzKGZlYXR1cmVzOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+W10pIHtcbiAgICB0aGlzLnJlbW92ZVJlZHVjZXJzKGZlYXR1cmVzLm1hcCgocCkgPT4gcC5rZXkpKTtcbiAgfVxuXG4gIGFkZFJlZHVjZXIoa2V5OiBzdHJpbmcsIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+KSB7XG4gICAgdGhpcy5hZGRSZWR1Y2Vycyh7IFtrZXldOiByZWR1Y2VyIH0pO1xuICB9XG5cbiAgYWRkUmVkdWNlcnMocmVkdWNlcnM6IHsgW2tleTogc3RyaW5nXTogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4gfSkge1xuICAgIHRoaXMucmVkdWNlcnMgPSB7IC4uLnRoaXMucmVkdWNlcnMsIC4uLnJlZHVjZXJzIH07XG4gICAgdGhpcy51cGRhdGVSZWR1Y2VycyhPYmplY3Qua2V5cyhyZWR1Y2VycykpO1xuICB9XG5cbiAgcmVtb3ZlUmVkdWNlcihmZWF0dXJlS2V5OiBzdHJpbmcpIHtcbiAgICB0aGlzLnJlbW92ZVJlZHVjZXJzKFtmZWF0dXJlS2V5XSk7XG4gIH1cblxuICByZW1vdmVSZWR1Y2VycyhmZWF0dXJlS2V5czogc3RyaW5nW10pIHtcbiAgICBmZWF0dXJlS2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHRoaXMucmVkdWNlcnMgPSBvbWl0KHRoaXMucmVkdWNlcnMsIGtleSkgLypUT0RPKCM4MjMpKi8gYXMgYW55O1xuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlUmVkdWNlcnMoZmVhdHVyZUtleXMpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVSZWR1Y2VycyhmZWF0dXJlS2V5czogc3RyaW5nW10pIHtcbiAgICB0aGlzLm5leHQodGhpcy5yZWR1Y2VyRmFjdG9yeSh0aGlzLnJlZHVjZXJzLCB0aGlzLmluaXRpYWxTdGF0ZSkpO1xuICAgIHRoaXMuZGlzcGF0Y2hlci5uZXh0KDxBY3Rpb24+e1xuICAgICAgdHlwZTogVVBEQVRFLFxuICAgICAgZmVhdHVyZXM6IGZlYXR1cmVLZXlzLFxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jb21wbGV0ZSgpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBSRURVQ0VSX01BTkFHRVJfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICBSZWR1Y2VyTWFuYWdlcixcbiAgeyBwcm92aWRlOiBSZWR1Y2VyT2JzZXJ2YWJsZSwgdXNlRXhpc3Rpbmc6IFJlZHVjZXJNYW5hZ2VyIH0sXG4gIHsgcHJvdmlkZTogUmVkdWNlck1hbmFnZXJEaXNwYXRjaGVyLCB1c2VFeGlzdGluZzogQWN0aW9uc1N1YmplY3QgfSxcbl07XG4iXX0=