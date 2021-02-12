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
export class StoreRootModule {
    /**
     * @param {?} actions$
     * @param {?} reducer$
     * @param {?} scannedActions$
     * @param {?} store
     * @param {?} guard
     * @param {?} actionCheck
     */
    constructor(actions$, reducer$, scannedActions$, store, guard, actionCheck) { }
}
StoreRootModule.decorators = [
    { type: NgModule, args: [{},] }
];
/** @nocollapse */
StoreRootModule.ctorParameters = () => [
    { type: ActionsSubject },
    { type: ReducerObservable },
    { type: ScannedActionsSubject },
    { type: Store },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [_ROOT_STORE_GUARD,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [_ACTION_TYPE_UNIQUENESS_CHECK,] }] }
];
export class StoreFeatureModule {
    /**
     * @param {?} features
     * @param {?} featureReducers
     * @param {?} reducerManager
     * @param {?} root
     * @param {?} actionCheck
     */
    constructor(features, featureReducers, reducerManager, root, actionCheck) {
        this.features = features;
        this.featureReducers = featureReducers;
        this.reducerManager = reducerManager;
        /** @type {?} */
        const feats = features.map((/**
         * @param {?} feature
         * @param {?} index
         * @return {?}
         */
        (feature, index) => {
            /** @type {?} */
            const featureReducerCollection = featureReducers.shift();
            /** @type {?} */
            const reducers = (/** @type {?} */ (featureReducerCollection /*TODO(#823)*/))[index];
            return Object.assign(Object.assign({}, feature), { reducers, initialState: _initialStateFactory(feature.initialState) });
        }));
        reducerManager.addFeatures(feats);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.reducerManager.removeFeatures(this.features);
    }
}
StoreFeatureModule.decorators = [
    { type: NgModule, args: [{},] }
];
/** @nocollapse */
StoreFeatureModule.ctorParameters = () => [
    { type: Array, decorators: [{ type: Inject, args: [_STORE_FEATURES,] }] },
    { type: Array, decorators: [{ type: Inject, args: [FEATURE_REDUCERS,] }] },
    { type: ReducerManager },
    { type: StoreRootModule },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [_ACTION_TYPE_UNIQUENESS_CHECK,] }] }
];
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
/**
 * An object with the name and the reducer for the feature.
 * @record
 * @template T, V
 */
export function FeatureSlice() { }
if (false) {
    /** @type {?} */
    FeatureSlice.prototype.name;
    /** @type {?} */
    FeatureSlice.prototype.reducer;
}
export class StoreModule {
    /**
     * @param {?} reducers
     * @param {?=} config
     * @return {?}
     */
    static forRoot(reducers, config = {}) {
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
    }
    /**
     * @param {?} featureNameOrSlice
     * @param {?=} reducersOrConfig
     * @param {?=} config
     * @return {?}
     */
    static forFeature(featureNameOrSlice, reducersOrConfig, config = {}) {
        return {
            ngModule: StoreFeatureModule,
            providers: [
                {
                    provide: _FEATURE_CONFIGS,
                    multi: true,
                    useValue: featureNameOrSlice instanceof Object ? {} : config,
                },
                {
                    provide: STORE_FEATURES,
                    multi: true,
                    useValue: {
                        key: featureNameOrSlice instanceof Object
                            ? featureNameOrSlice.name
                            : featureNameOrSlice,
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
                {
                    provide: _FEATURE_REDUCERS,
                    multi: true,
                    useValue: featureNameOrSlice instanceof Object
                        ? featureNameOrSlice.reducer
                        : reducersOrConfig,
                },
                {
                    provide: _FEATURE_REDUCERS_TOKEN,
                    multi: true,
                    useExisting: reducersOrConfig instanceof InjectionToken
                        ? reducersOrConfig
                        : _FEATURE_REDUCERS,
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
    }
}
StoreModule.decorators = [
    { type: NgModule, args: [{},] }
];
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
    (feat, index) => {
        if (configs[index] instanceof InjectionToken) {
            /** @type {?} */
            const conf = injector.get(configs[index]);
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
    const reducers = reducerCollection.map((/**
     * @param {?} reducer
     * @return {?}
     */
    (reducer) => {
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
        throw new TypeError(`StoreModule.forRoot() called twice. Feature modules should use StoreModule.forFeature() instead.`);
    }
    return 'guarded';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvIiwic291cmNlcyI6WyJzcmMvc3RvcmVfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBR04sY0FBYyxFQUNkLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBV3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDaEUsT0FBTyxFQUNMLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGNBQWMsRUFDZCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsMkJBQTJCLEVBQzNCLHVCQUF1QixFQUN2QixpQkFBaUIsRUFFakIsNkJBQTZCLEdBQzlCLE1BQU0sVUFBVSxDQUFDO0FBQ2xCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RSxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLGNBQWMsRUFDZCxpQkFBaUIsR0FDbEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQ0wsaUNBQWlDLEVBQ2pDLHFCQUFxQixHQUN0QixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDakQsT0FBTyxFQUNMLG9CQUFvQixFQUNwQiw0QkFBNEIsR0FDN0IsTUFBTSxrQkFBa0IsQ0FBQztBQUcxQixNQUFNLE9BQU8sZUFBZTs7Ozs7Ozs7O0lBQzFCLFlB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QUM7U0FDSDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsc0JBQXNCLENBQ3BDLFFBQWtCLEVBQ2xCLGlCQUErQzs7VUFFekMsUUFBUSxHQUFHLGlCQUFpQixDQUFDLEdBQUc7Ozs7SUFBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ2pELE9BQU8sT0FBTyxZQUFZLGNBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQzdFLENBQUMsRUFBQztJQUVGLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUFDLFlBQWlCO0lBQ3BELElBQUksT0FBTyxZQUFZLEtBQUssVUFBVSxFQUFFO1FBQ3RDLE9BQU8sWUFBWSxFQUFFLENBQUM7S0FDdkI7SUFFRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLFlBQTJCLEVBQzNCLHdCQUF1QztJQUV2QyxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUN2RCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxLQUFpQjtJQUNwRCxJQUFJLEtBQUssRUFBRTtRQUNULE1BQU0sSUFBSSxTQUFTLENBQ2pCLGtHQUFrRyxDQUNuRyxDQUFDO0tBQ0g7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgTmdNb2R1bGUsXG4gIEluamVjdCxcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcbiAgT25EZXN0cm95LFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5qZWN0b3IsXG4gIE9wdGlvbmFsLFxuICBTa2lwU2VsZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBY3Rpb24sXG4gIEFjdGlvblJlZHVjZXIsXG4gIEFjdGlvblJlZHVjZXJNYXAsXG4gIEFjdGlvblJlZHVjZXJGYWN0b3J5LFxuICBTdG9yZUZlYXR1cmUsXG4gIEluaXRpYWxTdGF0ZSxcbiAgTWV0YVJlZHVjZXIsXG4gIFJ1bnRpbWVDaGVja3MsXG59IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycywgY3JlYXRlUmVkdWNlckZhY3RvcnkgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7XG4gIElOSVRJQUxfU1RBVEUsXG4gIElOSVRJQUxfUkVEVUNFUlMsXG4gIF9JTklUSUFMX1JFRFVDRVJTLFxuICBSRURVQ0VSX0ZBQ1RPUlksXG4gIF9SRURVQ0VSX0ZBQ1RPUlksXG4gIFNUT1JFX0ZFQVRVUkVTLFxuICBfSU5JVElBTF9TVEFURSxcbiAgTUVUQV9SRURVQ0VSUyxcbiAgX1NUT1JFX1JFRFVDRVJTLFxuICBGRUFUVVJFX1JFRFVDRVJTLFxuICBfRkVBVFVSRV9SRURVQ0VSUyxcbiAgX0ZFQVRVUkVfUkVEVUNFUlNfVE9LRU4sXG4gIF9TVE9SRV9GRUFUVVJFUyxcbiAgX0ZFQVRVUkVfQ09ORklHUyxcbiAgVVNFUl9QUk9WSURFRF9NRVRBX1JFRFVDRVJTLFxuICBfUkVTT0xWRURfTUVUQV9SRURVQ0VSUyxcbiAgX1JPT1RfU1RPUkVfR1VBUkQsXG4gIF9BQ1RJVkVfUlVOVElNRV9DSEVDS1MsXG4gIF9BQ1RJT05fVFlQRV9VTklRVUVORVNTX0NIRUNLLFxufSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQgeyBBQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLCBBY3Rpb25zU3ViamVjdCB9IGZyb20gJy4vYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7XG4gIFJFRFVDRVJfTUFOQUdFUl9QUk9WSURFUlMsXG4gIFJlZHVjZXJNYW5hZ2VyLFxuICBSZWR1Y2VyT2JzZXJ2YWJsZSxcbn0gZnJvbSAnLi9yZWR1Y2VyX21hbmFnZXInO1xuaW1wb3J0IHtcbiAgU0NBTk5FRF9BQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLFxuICBTY2FubmVkQWN0aW9uc1N1YmplY3QsXG59IGZyb20gJy4vc2Nhbm5lZF9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHsgU1RBVEVfUFJPVklERVJTIH0gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBTVE9SRV9QUk9WSURFUlMsIFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQge1xuICBwcm92aWRlUnVudGltZUNoZWNrcyxcbiAgY2hlY2tGb3JBY3Rpb25UeXBlVW5pcXVlbmVzcyxcbn0gZnJvbSAnLi9ydW50aW1lX2NoZWNrcyc7XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTdG9yZVJvb3RNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBhY3Rpb25zJDogQWN0aW9uc1N1YmplY3QsXG4gICAgcmVkdWNlciQ6IFJlZHVjZXJPYnNlcnZhYmxlLFxuICAgIHNjYW5uZWRBY3Rpb25zJDogU2Nhbm5lZEFjdGlvbnNTdWJqZWN0LFxuICAgIHN0b3JlOiBTdG9yZTxhbnk+LFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChfUk9PVF9TVE9SRV9HVUFSRClcbiAgICBndWFyZDogYW55LFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChfQUNUSU9OX1RZUEVfVU5JUVVFTkVTU19DSEVDSylcbiAgICBhY3Rpb25DaGVjazogYW55XG4gICkge31cbn1cblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFN0b3JlRmVhdHVyZU1vZHVsZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoX1NUT1JFX0ZFQVRVUkVTKSBwcml2YXRlIGZlYXR1cmVzOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+W10sXG4gICAgQEluamVjdChGRUFUVVJFX1JFRFVDRVJTKSBwcml2YXRlIGZlYXR1cmVSZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxhbnk+W10sXG4gICAgcHJpdmF0ZSByZWR1Y2VyTWFuYWdlcjogUmVkdWNlck1hbmFnZXIsXG4gICAgcm9vdDogU3RvcmVSb290TW9kdWxlLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChfQUNUSU9OX1RZUEVfVU5JUVVFTkVTU19DSEVDSylcbiAgICBhY3Rpb25DaGVjazogYW55XG4gICkge1xuICAgIGNvbnN0IGZlYXRzID0gZmVhdHVyZXMubWFwKChmZWF0dXJlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgZmVhdHVyZVJlZHVjZXJDb2xsZWN0aW9uID0gZmVhdHVyZVJlZHVjZXJzLnNoaWZ0KCk7XG4gICAgICBjb25zdCByZWR1Y2VycyA9IGZlYXR1cmVSZWR1Y2VyQ29sbGVjdGlvbiAvKlRPRE8oIzgyMykqLyFbaW5kZXhdO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5mZWF0dXJlLFxuICAgICAgICByZWR1Y2VycyxcbiAgICAgICAgaW5pdGlhbFN0YXRlOiBfaW5pdGlhbFN0YXRlRmFjdG9yeShmZWF0dXJlLmluaXRpYWxTdGF0ZSksXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmVkdWNlck1hbmFnZXIuYWRkRmVhdHVyZXMoZmVhdHMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZWR1Y2VyTWFuYWdlci5yZW1vdmVGZWF0dXJlcyh0aGlzLmZlYXR1cmVzKTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0b3JlQ29uZmlnPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+IHtcbiAgaW5pdGlhbFN0YXRlPzogSW5pdGlhbFN0YXRlPFQ+O1xuICByZWR1Y2VyRmFjdG9yeT86IEFjdGlvblJlZHVjZXJGYWN0b3J5PFQsIFY+O1xuICBtZXRhUmVkdWNlcnM/OiBNZXRhUmVkdWNlcjxULCBWPltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvb3RTdG9yZUNvbmZpZzxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPlxuICBleHRlbmRzIFN0b3JlQ29uZmlnPFQsIFY+IHtcbiAgcnVudGltZUNoZWNrcz86IFBhcnRpYWw8UnVudGltZUNoZWNrcz47XG59XG5cbi8qKlxuICogQW4gb2JqZWN0IHdpdGggdGhlIG5hbWUgYW5kIHRoZSByZWR1Y2VyIGZvciB0aGUgZmVhdHVyZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGZWF0dXJlU2xpY2U8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8VCwgVj47XG59XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTdG9yZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290PFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICAgIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlck1hcDxULCBWPj4sXG4gICAgY29uZmlnPzogUm9vdFN0b3JlQ29uZmlnPFQsIFY+XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RvcmVSb290TW9kdWxlPjtcbiAgc3RhdGljIGZvclJvb3QoXG4gICAgcmVkdWNlcnM6XG4gICAgICB8IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+XG4gICAgICB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+PixcbiAgICBjb25maWc6IFJvb3RTdG9yZUNvbmZpZzxhbnksIGFueT4gPSB7fVxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlUm9vdE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU3RvcmVSb290TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfUk9PVF9TVE9SRV9HVUFSRCxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfcHJvdmlkZUZvclJvb3RHdWFyZCxcbiAgICAgICAgICBkZXBzOiBbW1N0b3JlLCBuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCldXSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBwcm92aWRlOiBfSU5JVElBTF9TVEFURSwgdXNlVmFsdWU6IGNvbmZpZy5pbml0aWFsU3RhdGUgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IElOSVRJQUxfU1RBVEUsXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2luaXRpYWxTdGF0ZUZhY3RvcnksXG4gICAgICAgICAgZGVwczogW19JTklUSUFMX1NUQVRFXSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBwcm92aWRlOiBfSU5JVElBTF9SRURVQ0VSUywgdXNlVmFsdWU6IHJlZHVjZXJzIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfU1RPUkVfUkVEVUNFUlMsXG4gICAgICAgICAgdXNlRXhpc3Rpbmc6XG4gICAgICAgICAgICByZWR1Y2VycyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuID8gcmVkdWNlcnMgOiBfSU5JVElBTF9SRURVQ0VSUyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IElOSVRJQUxfUkVEVUNFUlMsXG4gICAgICAgICAgZGVwczogW0luamVjdG9yLCBfSU5JVElBTF9SRURVQ0VSUywgW25ldyBJbmplY3QoX1NUT1JFX1JFRFVDRVJTKV1dLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jcmVhdGVTdG9yZVJlZHVjZXJzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogVVNFUl9QUk9WSURFRF9NRVRBX1JFRFVDRVJTLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcubWV0YVJlZHVjZXJzID8gY29uZmlnLm1ldGFSZWR1Y2VycyA6IFtdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1JFU09MVkVEX01FVEFfUkVEVUNFUlMsXG4gICAgICAgICAgZGVwczogW01FVEFfUkVEVUNFUlMsIFVTRVJfUFJPVklERURfTUVUQV9SRURVQ0VSU10sXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NvbmNhdE1ldGFSZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9SRURVQ0VSX0ZBQ1RPUlksXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZy5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgICAgPyBjb25maWcucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICAgIDogY29tYmluZVJlZHVjZXJzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogUkVEVUNFUl9GQUNUT1JZLFxuICAgICAgICAgIGRlcHM6IFtfUkVEVUNFUl9GQUNUT1JZLCBfUkVTT0xWRURfTUVUQV9SRURVQ0VSU10sXG4gICAgICAgICAgdXNlRmFjdG9yeTogY3JlYXRlUmVkdWNlckZhY3RvcnksXG4gICAgICAgIH0sXG4gICAgICAgIEFDVElPTlNfU1VCSkVDVF9QUk9WSURFUlMsXG4gICAgICAgIFJFRFVDRVJfTUFOQUdFUl9QUk9WSURFUlMsXG4gICAgICAgIFNDQU5ORURfQUNUSU9OU19TVUJKRUNUX1BST1ZJREVSUyxcbiAgICAgICAgU1RBVEVfUFJPVklERVJTLFxuICAgICAgICBTVE9SRV9QUk9WSURFUlMsXG4gICAgICAgIHByb3ZpZGVSdW50aW1lQ2hlY2tzKGNvbmZpZy5ydW50aW1lQ2hlY2tzKSxcbiAgICAgICAgY2hlY2tGb3JBY3Rpb25UeXBlVW5pcXVlbmVzcygpLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZvckZlYXR1cmU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAgZmVhdHVyZU5hbWU6IHN0cmluZyxcbiAgICByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxULCBWPiB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8VCwgVj4+LFxuICAgIGNvbmZpZz86IFN0b3JlQ29uZmlnPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48U3RvcmVDb25maWc8VCwgVj4+XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RvcmVGZWF0dXJlTW9kdWxlPjtcbiAgc3RhdGljIGZvckZlYXR1cmU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAgZmVhdHVyZU5hbWU6IHN0cmluZyxcbiAgICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlcjxULCBWPj4sXG4gICAgY29uZmlnPzogU3RvcmVDb25maWc8VCwgVj4gfCBJbmplY3Rpb25Ub2tlbjxTdG9yZUNvbmZpZzxULCBWPj5cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZUZlYXR1cmVNb2R1bGU+O1xuICBzdGF0aWMgZm9yRmVhdHVyZTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICBzbGljZTogRmVhdHVyZVNsaWNlPFQsIFY+LFxuICAgIGNvbmZpZz86IFN0b3JlQ29uZmlnPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48U3RvcmVDb25maWc8VCwgVj4+XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RvcmVGZWF0dXJlTW9kdWxlPjtcbiAgc3RhdGljIGZvckZlYXR1cmUoXG4gICAgZmVhdHVyZU5hbWVPclNsaWNlOiBzdHJpbmcgfCBGZWF0dXJlU2xpY2U8YW55LCBhbnk+LFxuICAgIHJlZHVjZXJzT3JDb25maWc/OlxuICAgICAgfCBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PlxuICAgICAgfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55Pj5cbiAgICAgIHwgQWN0aW9uUmVkdWNlcjxhbnksIGFueT5cbiAgICAgIHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlcjxhbnksIGFueT4+XG4gICAgICB8IFN0b3JlQ29uZmlnPGFueSwgYW55PlxuICAgICAgfCBJbmplY3Rpb25Ub2tlbjxTdG9yZUNvbmZpZzxhbnksIGFueT4+LFxuICAgIGNvbmZpZzogU3RvcmVDb25maWc8YW55LCBhbnk+IHwgSW5qZWN0aW9uVG9rZW48U3RvcmVDb25maWc8YW55LCBhbnk+PiA9IHt9XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RvcmVGZWF0dXJlTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTdG9yZUZlYXR1cmVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9GRUFUVVJFX0NPTkZJR1MsXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgdXNlVmFsdWU6IGZlYXR1cmVOYW1lT3JTbGljZSBpbnN0YW5jZW9mIE9iamVjdCA/IHt9IDogY29uZmlnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU1RPUkVfRkVBVFVSRVMsXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgICAgIGtleTpcbiAgICAgICAgICAgICAgZmVhdHVyZU5hbWVPclNsaWNlIGluc3RhbmNlb2YgT2JqZWN0XG4gICAgICAgICAgICAgICAgPyBmZWF0dXJlTmFtZU9yU2xpY2UubmFtZVxuICAgICAgICAgICAgICAgIDogZmVhdHVyZU5hbWVPclNsaWNlLFxuICAgICAgICAgICAgcmVkdWNlckZhY3Rvcnk6XG4gICAgICAgICAgICAgICEoY29uZmlnIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4pICYmIGNvbmZpZy5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgICAgICAgID8gY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICAgICAgOiBjb21iaW5lUmVkdWNlcnMsXG4gICAgICAgICAgICBtZXRhUmVkdWNlcnM6XG4gICAgICAgICAgICAgICEoY29uZmlnIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4pICYmIGNvbmZpZy5tZXRhUmVkdWNlcnNcbiAgICAgICAgICAgICAgICA/IGNvbmZpZy5tZXRhUmVkdWNlcnNcbiAgICAgICAgICAgICAgICA6IFtdLFxuICAgICAgICAgICAgaW5pdGlhbFN0YXRlOlxuICAgICAgICAgICAgICAhKGNvbmZpZyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuKSAmJiBjb25maWcuaW5pdGlhbFN0YXRlXG4gICAgICAgICAgICAgICAgPyBjb25maWcuaW5pdGlhbFN0YXRlXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9TVE9SRV9GRUFUVVJFUyxcbiAgICAgICAgICBkZXBzOiBbSW5qZWN0b3IsIF9GRUFUVVJFX0NPTkZJR1MsIFNUT1JFX0ZFQVRVUkVTXSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfY3JlYXRlRmVhdHVyZVN0b3JlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX0ZFQVRVUkVfUkVEVUNFUlMsXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgdXNlVmFsdWU6XG4gICAgICAgICAgICBmZWF0dXJlTmFtZU9yU2xpY2UgaW5zdGFuY2VvZiBPYmplY3RcbiAgICAgICAgICAgICAgPyBmZWF0dXJlTmFtZU9yU2xpY2UucmVkdWNlclxuICAgICAgICAgICAgICA6IHJlZHVjZXJzT3JDb25maWcsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfRkVBVFVSRV9SRURVQ0VSU19UT0tFTixcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VFeGlzdGluZzpcbiAgICAgICAgICAgIHJlZHVjZXJzT3JDb25maWcgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlblxuICAgICAgICAgICAgICA/IHJlZHVjZXJzT3JDb25maWdcbiAgICAgICAgICAgICAgOiBfRkVBVFVSRV9SRURVQ0VSUyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEZFQVRVUkVfUkVEVUNFUlMsXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgZGVwczogW1xuICAgICAgICAgICAgSW5qZWN0b3IsXG4gICAgICAgICAgICBfRkVBVFVSRV9SRURVQ0VSUyxcbiAgICAgICAgICAgIFtuZXcgSW5qZWN0KF9GRUFUVVJFX1JFRFVDRVJTX1RPS0VOKV0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfY3JlYXRlRmVhdHVyZVJlZHVjZXJzLFxuICAgICAgICB9LFxuICAgICAgICBjaGVja0ZvckFjdGlvblR5cGVVbmlxdWVuZXNzKCksXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVTdG9yZVJlZHVjZXJzKFxuICBpbmplY3RvcjogSW5qZWN0b3IsXG4gIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PlxuKSB7XG4gIHJldHVybiByZWR1Y2VycyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuID8gaW5qZWN0b3IuZ2V0KHJlZHVjZXJzKSA6IHJlZHVjZXJzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUZlYXR1cmVTdG9yZShcbiAgaW5qZWN0b3I6IEluamVjdG9yLFxuICBjb25maWdzOiBTdG9yZUNvbmZpZzxhbnksIGFueT5bXSB8IEluamVjdGlvblRva2VuPFN0b3JlQ29uZmlnPGFueSwgYW55Pj5bXSxcbiAgZmVhdHVyZVN0b3JlczogU3RvcmVGZWF0dXJlPGFueSwgYW55PltdXG4pIHtcbiAgcmV0dXJuIGZlYXR1cmVTdG9yZXMubWFwKChmZWF0LCBpbmRleCkgPT4ge1xuICAgIGlmIChjb25maWdzW2luZGV4XSBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuKSB7XG4gICAgICBjb25zdCBjb25mID0gaW5qZWN0b3IuZ2V0KGNvbmZpZ3NbaW5kZXhdKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtleTogZmVhdC5rZXksXG4gICAgICAgIHJlZHVjZXJGYWN0b3J5OiBjb25mLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgPyBjb25mLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgOiBjb21iaW5lUmVkdWNlcnMsXG4gICAgICAgIG1ldGFSZWR1Y2VyczogY29uZi5tZXRhUmVkdWNlcnMgPyBjb25mLm1ldGFSZWR1Y2VycyA6IFtdLFxuICAgICAgICBpbml0aWFsU3RhdGU6IGNvbmYuaW5pdGlhbFN0YXRlLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZlYXQ7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUZlYXR1cmVSZWR1Y2VycyhcbiAgaW5qZWN0b3I6IEluamVjdG9yLFxuICByZWR1Y2VyQ29sbGVjdGlvbjogQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5bXVxuKSB7XG4gIGNvbnN0IHJlZHVjZXJzID0gcmVkdWNlckNvbGxlY3Rpb24ubWFwKChyZWR1Y2VyKSA9PiB7XG4gICAgcmV0dXJuIHJlZHVjZXIgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbiA/IGluamVjdG9yLmdldChyZWR1Y2VyKSA6IHJlZHVjZXI7XG4gIH0pO1xuXG4gIHJldHVybiByZWR1Y2Vycztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9pbml0aWFsU3RhdGVGYWN0b3J5KGluaXRpYWxTdGF0ZTogYW55KTogYW55IHtcbiAgaWYgKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaW5pdGlhbFN0YXRlKCk7XG4gIH1cblxuICByZXR1cm4gaW5pdGlhbFN0YXRlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NvbmNhdE1ldGFSZWR1Y2VycyhcbiAgbWV0YVJlZHVjZXJzOiBNZXRhUmVkdWNlcltdLFxuICB1c2VyUHJvdmlkZWRNZXRhUmVkdWNlcnM6IE1ldGFSZWR1Y2VyW11cbik6IE1ldGFSZWR1Y2VyW10ge1xuICByZXR1cm4gbWV0YVJlZHVjZXJzLmNvbmNhdCh1c2VyUHJvdmlkZWRNZXRhUmVkdWNlcnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX3Byb3ZpZGVGb3JSb290R3VhcmQoc3RvcmU6IFN0b3JlPGFueT4pOiBhbnkge1xuICBpZiAoc3RvcmUpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgYFN0b3JlTW9kdWxlLmZvclJvb3QoKSBjYWxsZWQgdHdpY2UuIEZlYXR1cmUgbW9kdWxlcyBzaG91bGQgdXNlIFN0b3JlTW9kdWxlLmZvckZlYXR1cmUoKSBpbnN0ZWFkLmBcbiAgICApO1xuICB9XG4gIHJldHVybiAnZ3VhcmRlZCc7XG59XG4iXX0=