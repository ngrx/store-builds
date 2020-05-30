/**
 * @fileoverview added by tsickle
 * Generated from: src/store_module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Inject, InjectionToken, Injector, Optional, SkipSelf, } from '@angular/core';
import { combineReducers, createReducerFactory } from './utils';
import { INITIAL_STATE, INITIAL_REDUCERS, _INITIAL_REDUCERS, REDUCER_FACTORY, _REDUCER_FACTORY, STORE_FEATURES, _INITIAL_STATE, META_REDUCERS, _STORE_REDUCERS, FEATURE_REDUCERS, _FEATURE_REDUCERS, _FEATURE_REDUCERS_TOKEN, _STORE_FEATURES, _FEATURE_CONFIGS, USER_PROVIDED_META_REDUCERS, _RESOLVED_META_REDUCERS, _ROOT_STORE_GUARD, _ACTION_TYPE_UNIQUENESS_CHECK, } from './tokens';
import { ACTIONS_SUBJECT_PROVIDERS } from './actions_subject';
import { REDUCER_MANAGER_PROVIDERS, } from './reducer_manager';
import { SCANNED_ACTIONS_SUBJECT_PROVIDERS, } from './scanned_actions_subject';
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
    { type: NgModule, args: [{},] },
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
    { type: NgModule, args: [{},] },
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
     * @param {?} featureName
     * @param {?} reducers
     * @param {?=} config
     * @return {?}
     */
    static forFeature(featureName, reducers, config = {}) {
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
    }
}
StoreModule.decorators = [
    { type: NgModule, args: [{},] },
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
    reducer => {
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
//# sourceMappingURL=store_module.js.map