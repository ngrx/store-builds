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
 * Generated from: src/store_module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Inject, InjectionToken, Injector, Optional, SkipSelf, } from '@angular/core';
import { combineReducers, createReducerFactory } from './utils';
import { INITIAL_STATE, INITIAL_REDUCERS, _INITIAL_REDUCERS, REDUCER_FACTORY, _REDUCER_FACTORY, STORE_FEATURES, _INITIAL_STATE, META_REDUCERS, _STORE_REDUCERS, FEATURE_REDUCERS, _FEATURE_REDUCERS, _FEATURE_REDUCERS_TOKEN, _STORE_FEATURES, _FEATURE_CONFIGS, USER_PROVIDED_META_REDUCERS, _RESOLVED_META_REDUCERS, _ROOT_STORE_GUARD, _ACTION_TYPE_UNIQUENESS_CHECK, } from './tokens';
import { ACTIONS_SUBJECT_PROVIDERS, ActionsSubject } from './actions_subject';
import { REDUCER_MANAGER_PROVIDERS, ReducerManager, ReducerObservable, } from './reducer_manager';
import { SCANNED_ACTIONS_SUBJECT_PROVIDERS, ScannedActionsSubject, } from './scanned_actions_subject';
import { STATE_PROVIDERS } from './state';
import { STORE_PROVIDERS, Store } from './store';
import { provideRuntimeChecks, checkForActionTypeUniqueness, } from './runtime_checks';
var StoreRootModule = /** @class */ (function () {
    function StoreRootModule(actions$, reducer$, scannedActions$, store, guard, actionCheck) {
    }
    StoreRootModule.decorators = [
        { type: NgModule, args: [{},] }
    ];
    /** @nocollapse */
    StoreRootModule.ctorParameters = function () { return [
        { type: ActionsSubject },
        { type: ReducerObservable },
        { type: ScannedActionsSubject },
        { type: Store },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [_ROOT_STORE_GUARD,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [_ACTION_TYPE_UNIQUENESS_CHECK,] }] }
    ]; };
    return StoreRootModule;
}());
export { StoreRootModule };
var StoreFeatureModule = /** @class */ (function () {
    function StoreFeatureModule(features, featureReducers, reducerManager, root, actionCheck) {
        this.features = features;
        this.featureReducers = featureReducers;
        this.reducerManager = reducerManager;
        /** @type {?} */
        var feats = features.map((/**
         * @param {?} feature
         * @param {?} index
         * @return {?}
         */
        function (feature, index) {
            /** @type {?} */
            var featureReducerCollection = featureReducers.shift();
            /** @type {?} */
            var reducers = (/** @type {?} */ (featureReducerCollection /*TODO(#823)*/))[index];
            return __assign(__assign({}, feature), { reducers: reducers, initialState: _initialStateFactory(feature.initialState) });
        }));
        reducerManager.addFeatures(feats);
    }
    /**
     * @return {?}
     */
    StoreFeatureModule.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.reducerManager.removeFeatures(this.features);
    };
    StoreFeatureModule.decorators = [
        { type: NgModule, args: [{},] }
    ];
    /** @nocollapse */
    StoreFeatureModule.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: Inject, args: [_STORE_FEATURES,] }] },
        { type: Array, decorators: [{ type: Inject, args: [FEATURE_REDUCERS,] }] },
        { type: ReducerManager },
        { type: StoreRootModule },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [_ACTION_TYPE_UNIQUENESS_CHECK,] }] }
    ]; };
    return StoreFeatureModule;
}());
export { StoreFeatureModule };
if (false) {
    /**
     * @type {?}
     * @private
     */
    StoreFeatureModule.prototype.features;
    /**
     * @type {?}
     * @private
     */
    StoreFeatureModule.prototype.featureReducers;
    /**
     * @type {?}
     * @private
     */
    StoreFeatureModule.prototype.reducerManager;
}
/**
 * @record
 * @template T, V
 */
export function StoreConfig() { }
if (false) {
    /** @type {?|undefined} */
    StoreConfig.prototype.initialState;
    /** @type {?|undefined} */
    StoreConfig.prototype.reducerFactory;
    /** @type {?|undefined} */
    StoreConfig.prototype.metaReducers;
}
/**
 * @record
 * @template T, V
 */
export function RootStoreConfig() { }
if (false) {
    /** @type {?|undefined} */
    RootStoreConfig.prototype.runtimeChecks;
}
var StoreModule = /** @class */ (function () {
    function StoreModule() {
    }
    /**
     * @param {?} reducers
     * @param {?=} config
     * @return {?}
     */
    StoreModule.forRoot = /**
     * @param {?} reducers
     * @param {?=} config
     * @return {?}
     */
    function (reducers, config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: StoreRootModule,
            providers: [
                {
                    provide: _ROOT_STORE_GUARD,
                    useFactory: _provideForRootGuard,
                    deps: [[Store, new Optional(), new SkipSelf()]],
                },
                { provide: _INITIAL_STATE, useValue: config.initialState },
                {
                    provide: INITIAL_STATE,
                    useFactory: _initialStateFactory,
                    deps: [_INITIAL_STATE],
                },
                { provide: _INITIAL_REDUCERS, useValue: reducers },
                {
                    provide: _STORE_REDUCERS,
                    useExisting: reducers instanceof InjectionToken ? reducers : _INITIAL_REDUCERS,
                },
                {
                    provide: INITIAL_REDUCERS,
                    deps: [Injector, _INITIAL_REDUCERS, [new Inject(_STORE_REDUCERS)]],
                    useFactory: _createStoreReducers,
                },
                {
                    provide: USER_PROVIDED_META_REDUCERS,
                    useValue: config.metaReducers ? config.metaReducers : [],
                },
                {
                    provide: _RESOLVED_META_REDUCERS,
                    deps: [META_REDUCERS, USER_PROVIDED_META_REDUCERS],
                    useFactory: _concatMetaReducers,
                },
                {
                    provide: _REDUCER_FACTORY,
                    useValue: config.reducerFactory
                        ? config.reducerFactory
                        : combineReducers,
                },
                {
                    provide: REDUCER_FACTORY,
                    deps: [_REDUCER_FACTORY, _RESOLVED_META_REDUCERS],
                    useFactory: createReducerFactory,
                },
                ACTIONS_SUBJECT_PROVIDERS,
                REDUCER_MANAGER_PROVIDERS,
                SCANNED_ACTIONS_SUBJECT_PROVIDERS,
                STATE_PROVIDERS,
                STORE_PROVIDERS,
                provideRuntimeChecks(config.runtimeChecks),
                checkForActionTypeUniqueness(),
            ],
        };
    };
    /**
     * @param {?} featureName
     * @param {?} reducers
     * @param {?=} config
     * @return {?}
     */
    StoreModule.forFeature = /**
     * @param {?} featureName
     * @param {?} reducers
     * @param {?=} config
     * @return {?}
     */
    function (featureName, reducers, config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: StoreFeatureModule,
            providers: [
                {
                    provide: _FEATURE_CONFIGS,
                    multi: true,
                    useValue: config,
                },
                {
                    provide: STORE_FEATURES,
                    multi: true,
                    useValue: {
                        key: featureName,
                        reducerFactory: !(config instanceof InjectionToken) && config.reducerFactory
                            ? config.reducerFactory
                            : combineReducers,
                        metaReducers: !(config instanceof InjectionToken) && config.metaReducers
                            ? config.metaReducers
                            : [],
                        initialState: !(config instanceof InjectionToken) && config.initialState
                            ? config.initialState
                            : undefined,
                    },
                },
                {
                    provide: _STORE_FEATURES,
                    deps: [Injector, _FEATURE_CONFIGS, STORE_FEATURES],
                    useFactory: _createFeatureStore,
                },
                { provide: _FEATURE_REDUCERS, multi: true, useValue: reducers },
                {
                    provide: _FEATURE_REDUCERS_TOKEN,
                    multi: true,
                    useExisting: reducers instanceof InjectionToken ? reducers : _FEATURE_REDUCERS,
                },
                {
                    provide: FEATURE_REDUCERS,
                    multi: true,
                    deps: [
                        Injector,
                        _FEATURE_REDUCERS,
                        [new Inject(_FEATURE_REDUCERS_TOKEN)],
                    ],
                    useFactory: _createFeatureReducers,
                },
                checkForActionTypeUniqueness(),
            ],
        };
    };
    StoreModule.decorators = [
        { type: NgModule, args: [{},] }
    ];
    return StoreModule;
}());
export { StoreModule };
/**
 * @param {?} injector
 * @param {?} reducers
 * @return {?}
 */
export function _createStoreReducers(injector, reducers) {
    return reducers instanceof InjectionToken ? injector.get(reducers) : reducers;
}
/**
 * @param {?} injector
 * @param {?} configs
 * @param {?} featureStores
 * @return {?}
 */
export function _createFeatureStore(injector, configs, featureStores) {
    return featureStores.map((/**
     * @param {?} feat
     * @param {?} index
     * @return {?}
     */
    function (feat, index) {
        if (configs[index] instanceof InjectionToken) {
            /** @type {?} */
            var conf = injector.get(configs[index]);
            return {
                key: feat.key,
                reducerFactory: conf.reducerFactory
                    ? conf.reducerFactory
                    : combineReducers,
                metaReducers: conf.metaReducers ? conf.metaReducers : [],
                initialState: conf.initialState,
            };
        }
        return feat;
    }));
}
/**
 * @param {?} injector
 * @param {?} reducerCollection
 * @return {?}
 */
export function _createFeatureReducers(injector, reducerCollection) {
    /** @type {?} */
    var reducers = reducerCollection.map((/**
     * @param {?} reducer
     * @return {?}
     */
    function (reducer) {
        return reducer instanceof InjectionToken ? injector.get(reducer) : reducer;
    }));
    return reducers;
}
/**
 * @param {?} initialState
 * @return {?}
 */
export function _initialStateFactory(initialState) {
    if (typeof initialState === 'function') {
        return initialState();
    }
    return initialState;
}
/**
 * @param {?} metaReducers
 * @param {?} userProvidedMetaReducers
 * @return {?}
 */
export function _concatMetaReducers(metaReducers, userProvidedMetaReducers) {
    return metaReducers.concat(userProvidedMetaReducers);
}
/**
 * @param {?} store
 * @return {?}
 */
export function _provideForRootGuard(store) {
    if (store) {
        throw new TypeError("StoreModule.forRoot() called twice. Feature modules should use StoreModule.forFeature() instead.");
    }
    return 'guarded';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ncngvc3RvcmUvIiwic291cmNlcyI6WyJzcmMvc3RvcmVfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFHTixjQUFjLEVBQ2QsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFXdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoRSxPQUFPLEVBQ0wsYUFBYSxFQUNiLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsY0FBYyxFQUNkLGFBQWEsRUFDYixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsZUFBZSxFQUNmLGdCQUFnQixFQUNoQiwyQkFBMkIsRUFDM0IsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUVqQiw2QkFBNkIsR0FDOUIsTUFBTSxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlFLE9BQU8sRUFDTCx5QkFBeUIsRUFDekIsY0FBYyxFQUNkLGlCQUFpQixHQUNsQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFDTCxpQ0FBaUMsRUFDakMscUJBQXFCLEdBQ3RCLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNqRCxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLDRCQUE0QixHQUM3QixNQUFNLGtCQUFrQixDQUFDO0FBRTFCO0lBRUUseUJBQ0UsUUFBd0IsRUFDeEIsUUFBMkIs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LEdBQUc7Ozs7SUFBQyxVQUFDLE9BQU87UUFDN0MsT0FBTyxPQUFPLFlBQVksY0FBYyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDN0UsQ0FBQyxFQUFDO0lBRUYsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsWUFBaUI7SUFDcEQsSUFBSSxPQUFPLFlBQVksS0FBSyxVQUFVLEVBQUU7UUFDdEMsT0FBTyxZQUFZLEVBQUUsQ0FBQztLQUN2QjtJQUVELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FDakMsWUFBMkIsRUFDM0Isd0JBQXVDO0lBRXZDLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUFDLEtBQWlCO0lBQ3BELElBQUksS0FBSyxFQUFFO1FBQ1QsTUFBTSxJQUFJLFNBQVMsQ0FDakIsa0dBQWtHLENBQ25HLENBQUM7S0FDSDtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBOZ01vZHVsZSxcbiAgSW5qZWN0LFxuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICBPbkRlc3Ryb3ksXG4gIEluamVjdGlvblRva2VuLFxuICBJbmplY3RvcixcbiAgT3B0aW9uYWwsXG4gIFNraXBTZWxmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFjdGlvbixcbiAgQWN0aW9uUmVkdWNlcixcbiAgQWN0aW9uUmVkdWNlck1hcCxcbiAgQWN0aW9uUmVkdWNlckZhY3RvcnksXG4gIFN0b3JlRmVhdHVyZSxcbiAgSW5pdGlhbFN0YXRlLFxuICBNZXRhUmVkdWNlcixcbiAgUnVudGltZUNoZWNrcyxcbn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzLCBjcmVhdGVSZWR1Y2VyRmFjdG9yeSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtcbiAgSU5JVElBTF9TVEFURSxcbiAgSU5JVElBTF9SRURVQ0VSUyxcbiAgX0lOSVRJQUxfUkVEVUNFUlMsXG4gIFJFRFVDRVJfRkFDVE9SWSxcbiAgX1JFRFVDRVJfRkFDVE9SWSxcbiAgU1RPUkVfRkVBVFVSRVMsXG4gIF9JTklUSUFMX1NUQVRFLFxuICBNRVRBX1JFRFVDRVJTLFxuICBfU1RPUkVfUkVEVUNFUlMsXG4gIEZFQVRVUkVfUkVEVUNFUlMsXG4gIF9GRUFUVVJFX1JFRFVDRVJTLFxuICBfRkVBVFVSRV9SRURVQ0VSU19UT0tFTixcbiAgX1NUT1JFX0ZFQVRVUkVTLFxuICBfRkVBVFVSRV9DT05GSUdTLFxuICBVU0VSX1BST1ZJREVEX01FVEFfUkVEVUNFUlMsXG4gIF9SRVNPTFZFRF9NRVRBX1JFRFVDRVJTLFxuICBfUk9PVF9TVE9SRV9HVUFSRCxcbiAgX0FDVElWRV9SVU5USU1FX0NIRUNLUyxcbiAgX0FDVElPTl9UWVBFX1VOSVFVRU5FU1NfQ0hFQ0ssXG59IGZyb20gJy4vdG9rZW5zJztcbmltcG9ydCB7IEFDVElPTlNfU1VCSkVDVF9QUk9WSURFUlMsIEFjdGlvbnNTdWJqZWN0IH0gZnJvbSAnLi9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHtcbiAgUkVEVUNFUl9NQU5BR0VSX1BST1ZJREVSUyxcbiAgUmVkdWNlck1hbmFnZXIsXG4gIFJlZHVjZXJPYnNlcnZhYmxlLFxufSBmcm9tICcuL3JlZHVjZXJfbWFuYWdlcic7XG5pbXBvcnQge1xuICBTQ0FOTkVEX0FDVElPTlNfU1VCSkVDVF9QUk9WSURFUlMsXG4gIFNjYW5uZWRBY3Rpb25zU3ViamVjdCxcbn0gZnJvbSAnLi9zY2FubmVkX2FjdGlvbnNfc3ViamVjdCc7XG5pbXBvcnQgeyBTVEFURV9QUk9WSURFUlMgfSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IFNUT1JFX1BST1ZJREVSUywgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCB7XG4gIHByb3ZpZGVSdW50aW1lQ2hlY2tzLFxuICBjaGVja0ZvckFjdGlvblR5cGVVbmlxdWVuZXNzLFxufSBmcm9tICcuL3J1bnRpbWVfY2hlY2tzJztcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFN0b3JlUm9vdE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGFjdGlvbnMkOiBBY3Rpb25zU3ViamVjdCxcbiAgICByZWR1Y2VyJDogUmVkdWNlck9ic2VydmFibGUsXG4gICAgc2Nhbm5lZEFjdGlvbnMkOiBTY2FubmVkQWN0aW9uc1N1YmplY3QsXG4gICAgc3RvcmU6IFN0b3JlPGFueT4sXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KF9ST09UX1NUT1JFX0dVQVJEKVxuICAgIGd1YXJkOiBhbnksXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KF9BQ1RJT05fVFlQRV9VTklRVUVORVNTX0NIRUNLKVxuICAgIGFjdGlvbkNoZWNrOiBhbnlcbiAgKSB7fVxufVxuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU3RvcmVGZWF0dXJlTW9kdWxlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChfU1RPUkVfRkVBVFVSRVMpIHByaXZhdGUgZmVhdHVyZXM6IFN0b3JlRmVhdHVyZTxhbnksIGFueT5bXSxcbiAgICBASW5qZWN0KEZFQVRVUkVfUkVEVUNFUlMpIHByaXZhdGUgZmVhdHVyZVJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPGFueT5bXSxcbiAgICBwcml2YXRlIHJlZHVjZXJNYW5hZ2VyOiBSZWR1Y2VyTWFuYWdlcixcbiAgICByb290OiBTdG9yZVJvb3RNb2R1bGUsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KF9BQ1RJT05fVFlQRV9VTklRVUVORVNTX0NIRUNLKVxuICAgIGFjdGlvbkNoZWNrOiBhbnlcbiAgKSB7XG4gICAgY29uc3QgZmVhdHMgPSBmZWF0dXJlcy5tYXAoKGZlYXR1cmUsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBmZWF0dXJlUmVkdWNlckNvbGxlY3Rpb24gPSBmZWF0dXJlUmVkdWNlcnMuc2hpZnQoKTtcbiAgICAgIGNvbnN0IHJlZHVjZXJzID0gZmVhdHVyZVJlZHVjZXJDb2xsZWN0aW9uIC8qVE9ETygjODIzKSovIVtpbmRleF07XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmZlYXR1cmUsXG4gICAgICAgIHJlZHVjZXJzLFxuICAgICAgICBpbml0aWFsU3RhdGU6IF9pbml0aWFsU3RhdGVGYWN0b3J5KGZlYXR1cmUuaW5pdGlhbFN0YXRlKSxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICByZWR1Y2VyTWFuYWdlci5hZGRGZWF0dXJlcyhmZWF0cyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnJlZHVjZXJNYW5hZ2VyLnJlbW92ZUZlYXR1cmVzKHRoaXMuZmVhdHVyZXMpO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RvcmVDb25maWc8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4ge1xuICBpbml0aWFsU3RhdGU/OiBJbml0aWFsU3RhdGU8VD47XG4gIHJlZHVjZXJGYWN0b3J5PzogQWN0aW9uUmVkdWNlckZhY3Rvcnk8VCwgVj47XG4gIG1ldGFSZWR1Y2Vycz86IE1ldGFSZWR1Y2VyPFQsIFY+W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm9vdFN0b3JlQ29uZmlnPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+XG4gIGV4dGVuZHMgU3RvcmVDb25maWc8VCwgVj4ge1xuICBydW50aW1lQ2hlY2tzPzogUGFydGlhbDxSdW50aW1lQ2hlY2tzPjtcbn1cblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFN0b3JlTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3Q8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAgcmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8VCwgVj4gfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+PixcbiAgICBjb25maWc/OiBSb290U3RvcmVDb25maWc8VCwgVj5cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZVJvb3RNb2R1bGU+O1xuICBzdGF0aWMgZm9yUm9vdChcbiAgICByZWR1Y2VyczpcbiAgICAgIHwgQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5cbiAgICAgIHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT4+LFxuICAgIGNvbmZpZzogUm9vdFN0b3JlQ29uZmlnPGFueSwgYW55PiA9IHt9XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RvcmVSb290TW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTdG9yZVJvb3RNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9ST09UX1NUT1JFX0dVQVJELFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9wcm92aWRlRm9yUm9vdEd1YXJkLFxuICAgICAgICAgIGRlcHM6IFtbU3RvcmUsIG5ldyBPcHRpb25hbCgpLCBuZXcgU2tpcFNlbGYoKV1dLFxuICAgICAgICB9LFxuICAgICAgICB7IHByb3ZpZGU6IF9JTklUSUFMX1NUQVRFLCB1c2VWYWx1ZTogY29uZmlnLmluaXRpYWxTdGF0ZSB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogSU5JVElBTF9TVEFURSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfaW5pdGlhbFN0YXRlRmFjdG9yeSxcbiAgICAgICAgICBkZXBzOiBbX0lOSVRJQUxfU1RBVEVdLFxuICAgICAgICB9LFxuICAgICAgICB7IHByb3ZpZGU6IF9JTklUSUFMX1JFRFVDRVJTLCB1c2VWYWx1ZTogcmVkdWNlcnMgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9TVE9SRV9SRURVQ0VSUyxcbiAgICAgICAgICB1c2VFeGlzdGluZzpcbiAgICAgICAgICAgIHJlZHVjZXJzIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4gPyByZWR1Y2VycyA6IF9JTklUSUFMX1JFRFVDRVJTLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogSU5JVElBTF9SRURVQ0VSUyxcbiAgICAgICAgICBkZXBzOiBbSW5qZWN0b3IsIF9JTklUSUFMX1JFRFVDRVJTLCBbbmV3IEluamVjdChfU1RPUkVfUkVEVUNFUlMpXV0sXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NyZWF0ZVN0b3JlUmVkdWNlcnMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBVU0VSX1BST1ZJREVEX01FVEFfUkVEVUNFUlMsXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZy5tZXRhUmVkdWNlcnMgPyBjb25maWcubWV0YVJlZHVjZXJzIDogW10sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfUkVTT0xWRURfTUVUQV9SRURVQ0VSUyxcbiAgICAgICAgICBkZXBzOiBbTUVUQV9SRURVQ0VSUywgVVNFUl9QUk9WSURFRF9NRVRBX1JFRFVDRVJTXSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfY29uY2F0TWV0YVJlZHVjZXJzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1JFRFVDRVJfRkFDVE9SWSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICA/IGNvbmZpZy5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgICAgOiBjb21iaW5lUmVkdWNlcnMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBSRURVQ0VSX0ZBQ1RPUlksXG4gICAgICAgICAgZGVwczogW19SRURVQ0VSX0ZBQ1RPUlksIF9SRVNPTFZFRF9NRVRBX1JFRFVDRVJTXSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBjcmVhdGVSZWR1Y2VyRmFjdG9yeSxcbiAgICAgICAgfSxcbiAgICAgICAgQUNUSU9OU19TVUJKRUNUX1BST1ZJREVSUyxcbiAgICAgICAgUkVEVUNFUl9NQU5BR0VSX1BST1ZJREVSUyxcbiAgICAgICAgU0NBTk5FRF9BQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLFxuICAgICAgICBTVEFURV9QUk9WSURFUlMsXG4gICAgICAgIFNUT1JFX1BST1ZJREVSUyxcbiAgICAgICAgcHJvdmlkZVJ1bnRpbWVDaGVja3MoY29uZmlnLnJ1bnRpbWVDaGVja3MpLFxuICAgICAgICBjaGVja0ZvckFjdGlvblR5cGVVbmlxdWVuZXNzKCksXG4gICAgICBdLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZm9yRmVhdHVyZTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICBmZWF0dXJlTmFtZTogc3RyaW5nLFxuICAgIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlck1hcDxULCBWPj4sXG4gICAgY29uZmlnPzogU3RvcmVDb25maWc8VCwgVj4gfCBJbmplY3Rpb25Ub2tlbjxTdG9yZUNvbmZpZzxULCBWPj5cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZUZlYXR1cmVNb2R1bGU+O1xuICBzdGF0aWMgZm9yRmVhdHVyZTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICBmZWF0dXJlTmFtZTogc3RyaW5nLFxuICAgIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8VCwgVj4gfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyPFQsIFY+PixcbiAgICBjb25maWc/OiBTdG9yZUNvbmZpZzxULCBWPiB8IEluamVjdGlvblRva2VuPFN0b3JlQ29uZmlnPFQsIFY+PlxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlRmVhdHVyZU1vZHVsZT47XG4gIHN0YXRpYyBmb3JGZWF0dXJlKFxuICAgIGZlYXR1cmVOYW1lOiBzdHJpbmcsXG4gICAgcmVkdWNlcnM6XG4gICAgICB8IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+XG4gICAgICB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+PlxuICAgICAgfCBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PlxuICAgICAgfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyPGFueSwgYW55Pj4sXG4gICAgY29uZmlnOiBTdG9yZUNvbmZpZzxhbnksIGFueT4gfCBJbmplY3Rpb25Ub2tlbjxTdG9yZUNvbmZpZzxhbnksIGFueT4+ID0ge31cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZUZlYXR1cmVNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFN0b3JlRmVhdHVyZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX0ZFQVRVUkVfQ09ORklHUyxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU1RPUkVfRkVBVFVSRVMsXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgICAgIGtleTogZmVhdHVyZU5hbWUsXG4gICAgICAgICAgICByZWR1Y2VyRmFjdG9yeTpcbiAgICAgICAgICAgICAgIShjb25maWcgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbikgJiYgY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICAgICAgPyBjb25maWcucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICAgICAgICA6IGNvbWJpbmVSZWR1Y2VycyxcbiAgICAgICAgICAgIG1ldGFSZWR1Y2VyczpcbiAgICAgICAgICAgICAgIShjb25maWcgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbikgJiYgY29uZmlnLm1ldGFSZWR1Y2Vyc1xuICAgICAgICAgICAgICAgID8gY29uZmlnLm1ldGFSZWR1Y2Vyc1xuICAgICAgICAgICAgICAgIDogW10sXG4gICAgICAgICAgICBpbml0aWFsU3RhdGU6XG4gICAgICAgICAgICAgICEoY29uZmlnIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4pICYmIGNvbmZpZy5pbml0aWFsU3RhdGVcbiAgICAgICAgICAgICAgICA/IGNvbmZpZy5pbml0aWFsU3RhdGVcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1NUT1JFX0ZFQVRVUkVTLFxuICAgICAgICAgIGRlcHM6IFtJbmplY3RvciwgX0ZFQVRVUkVfQ09ORklHUywgU1RPUkVfRkVBVFVSRVNdLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jcmVhdGVGZWF0dXJlU3RvcmUsXG4gICAgICAgIH0sXG4gICAgICAgIHsgcHJvdmlkZTogX0ZFQVRVUkVfUkVEVUNFUlMsIG11bHRpOiB0cnVlLCB1c2VWYWx1ZTogcmVkdWNlcnMgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9GRUFUVVJFX1JFRFVDRVJTX1RPS0VOLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZUV4aXN0aW5nOlxuICAgICAgICAgICAgcmVkdWNlcnMgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbiA/IHJlZHVjZXJzIDogX0ZFQVRVUkVfUkVEVUNFUlMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBGRUFUVVJFX1JFRFVDRVJTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIGRlcHM6IFtcbiAgICAgICAgICAgIEluamVjdG9yLFxuICAgICAgICAgICAgX0ZFQVRVUkVfUkVEVUNFUlMsXG4gICAgICAgICAgICBbbmV3IEluamVjdChfRkVBVFVSRV9SRURVQ0VSU19UT0tFTildLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NyZWF0ZUZlYXR1cmVSZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgICAgY2hlY2tGb3JBY3Rpb25UeXBlVW5pcXVlbmVzcygpLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlU3RvcmVSZWR1Y2VycyhcbiAgaW5qZWN0b3I6IEluamVjdG9yLFxuICByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5cbikge1xuICByZXR1cm4gcmVkdWNlcnMgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbiA/IGluamVjdG9yLmdldChyZWR1Y2VycykgOiByZWR1Y2Vycztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVGZWF0dXJlU3RvcmUoXG4gIGluamVjdG9yOiBJbmplY3RvcixcbiAgY29uZmlnczogU3RvcmVDb25maWc8YW55LCBhbnk+W10gfCBJbmplY3Rpb25Ub2tlbjxTdG9yZUNvbmZpZzxhbnksIGFueT4+W10sXG4gIGZlYXR1cmVTdG9yZXM6IFN0b3JlRmVhdHVyZTxhbnksIGFueT5bXVxuKSB7XG4gIHJldHVybiBmZWF0dXJlU3RvcmVzLm1hcCgoZmVhdCwgaW5kZXgpID0+IHtcbiAgICBpZiAoY29uZmlnc1tpbmRleF0gaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbikge1xuICAgICAgY29uc3QgY29uZiA9IGluamVjdG9yLmdldChjb25maWdzW2luZGV4XSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGZlYXQua2V5LFxuICAgICAgICByZWR1Y2VyRmFjdG9yeTogY29uZi5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgID8gY29uZi5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgIDogY29tYmluZVJlZHVjZXJzLFxuICAgICAgICBtZXRhUmVkdWNlcnM6IGNvbmYubWV0YVJlZHVjZXJzID8gY29uZi5tZXRhUmVkdWNlcnMgOiBbXSxcbiAgICAgICAgaW5pdGlhbFN0YXRlOiBjb25mLmluaXRpYWxTdGF0ZSxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmZWF0O1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVGZWF0dXJlUmVkdWNlcnMoXG4gIGluamVjdG9yOiBJbmplY3RvcixcbiAgcmVkdWNlckNvbGxlY3Rpb246IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+W11cbikge1xuICBjb25zdCByZWR1Y2VycyA9IHJlZHVjZXJDb2xsZWN0aW9uLm1hcCgocmVkdWNlcikgPT4ge1xuICAgIHJldHVybiByZWR1Y2VyIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4gPyBpbmplY3Rvci5nZXQocmVkdWNlcikgOiByZWR1Y2VyO1xuICB9KTtcblxuICByZXR1cm4gcmVkdWNlcnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfaW5pdGlhbFN0YXRlRmFjdG9yeShpbml0aWFsU3RhdGU6IGFueSk6IGFueSB7XG4gIGlmICh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jb25jYXRNZXRhUmVkdWNlcnMoXG4gIG1ldGFSZWR1Y2VyczogTWV0YVJlZHVjZXJbXSxcbiAgdXNlclByb3ZpZGVkTWV0YVJlZHVjZXJzOiBNZXRhUmVkdWNlcltdXG4pOiBNZXRhUmVkdWNlcltdIHtcbiAgcmV0dXJuIG1ldGFSZWR1Y2Vycy5jb25jYXQodXNlclByb3ZpZGVkTWV0YVJlZHVjZXJzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9wcm92aWRlRm9yUm9vdEd1YXJkKHN0b3JlOiBTdG9yZTxhbnk+KTogYW55IHtcbiAgaWYgKHN0b3JlKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgIGBTdG9yZU1vZHVsZS5mb3JSb290KCkgY2FsbGVkIHR3aWNlLiBGZWF0dXJlIG1vZHVsZXMgc2hvdWxkIHVzZSBTdG9yZU1vZHVsZS5mb3JGZWF0dXJlKCkgaW5zdGVhZC5gXG4gICAgKTtcbiAgfVxuICByZXR1cm4gJ2d1YXJkZWQnO1xufVxuIl19