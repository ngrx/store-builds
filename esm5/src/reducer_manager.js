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
        { type: Injectable },
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
//# sourceMappingURL=reducer_manager.js.map