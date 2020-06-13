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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvc3RvcmVfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBR04sY0FBYyxFQUNkLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBV3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDaEUsT0FBTyxFQUNMLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGNBQWMsRUFDZCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsMkJBQTJCLEVBQzNCLHVCQUF1QixFQUN2QixpQkFBaUIsRUFFakIsNkJBQTZCLEdBQzlCLE1BQU0sVUFBVSxDQUFDO0FBQ2xCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RSxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLGNBQWMsRUFDZCxpQkFBaUIsR0FDbEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQ0wsaUNBQWlDLEVBQ2pDLHFCQUFxQixHQUN0QixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDakQsT0FBTyxFQUNMLG9CQUFvQixFQUNwQiw0QkFBNEIsR0FDN0IsTUFBTSxrQkFBa0IsQ0FBQztBQUcxQixNQUFNLE9BQU8sZUFBZTs7Ozs7Ozs7O0lBQzFC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QUFDLENBQUMsT0FBTyxDQUFDO0lBQzdFLENBQUMsRUFBQztJQUVGLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUFDLFlBQWlCO0lBQ3BELElBQUksT0FBTyxZQUFZLEtBQUssVUFBVSxFQUFFO1FBQ3RDLE9BQU8sWUFBWSxFQUFFLENBQUM7S0FDdkI7SUFFRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLFlBQTJCLEVBQzNCLHdCQUF1QztJQUV2QyxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUN2RCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxLQUFpQjtJQUNwRCxJQUFJLEtBQUssRUFBRTtRQUNULE1BQU0sSUFBSSxTQUFTLENBQ2pCLGtHQUFrRyxDQUNuRyxDQUFDO0tBQ0g7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgTmdNb2R1bGUsXG4gIEluamVjdCxcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcbiAgT25EZXN0cm95LFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5qZWN0b3IsXG4gIE9wdGlvbmFsLFxuICBTa2lwU2VsZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBY3Rpb24sXG4gIEFjdGlvblJlZHVjZXIsXG4gIEFjdGlvblJlZHVjZXJNYXAsXG4gIEFjdGlvblJlZHVjZXJGYWN0b3J5LFxuICBTdG9yZUZlYXR1cmUsXG4gIEluaXRpYWxTdGF0ZSxcbiAgTWV0YVJlZHVjZXIsXG4gIFJ1bnRpbWVDaGVja3MsXG59IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycywgY3JlYXRlUmVkdWNlckZhY3RvcnkgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7XG4gIElOSVRJQUxfU1RBVEUsXG4gIElOSVRJQUxfUkVEVUNFUlMsXG4gIF9JTklUSUFMX1JFRFVDRVJTLFxuICBSRURVQ0VSX0ZBQ1RPUlksXG4gIF9SRURVQ0VSX0ZBQ1RPUlksXG4gIFNUT1JFX0ZFQVRVUkVTLFxuICBfSU5JVElBTF9TVEFURSxcbiAgTUVUQV9SRURVQ0VSUyxcbiAgX1NUT1JFX1JFRFVDRVJTLFxuICBGRUFUVVJFX1JFRFVDRVJTLFxuICBfRkVBVFVSRV9SRURVQ0VSUyxcbiAgX0ZFQVRVUkVfUkVEVUNFUlNfVE9LRU4sXG4gIF9TVE9SRV9GRUFUVVJFUyxcbiAgX0ZFQVRVUkVfQ09ORklHUyxcbiAgVVNFUl9QUk9WSURFRF9NRVRBX1JFRFVDRVJTLFxuICBfUkVTT0xWRURfTUVUQV9SRURVQ0VSUyxcbiAgX1JPT1RfU1RPUkVfR1VBUkQsXG4gIF9BQ1RJVkVfUlVOVElNRV9DSEVDS1MsXG4gIF9BQ1RJT05fVFlQRV9VTklRVUVORVNTX0NIRUNLLFxufSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQgeyBBQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLCBBY3Rpb25zU3ViamVjdCB9IGZyb20gJy4vYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7XG4gIFJFRFVDRVJfTUFOQUdFUl9QUk9WSURFUlMsXG4gIFJlZHVjZXJNYW5hZ2VyLFxuICBSZWR1Y2VyT2JzZXJ2YWJsZSxcbn0gZnJvbSAnLi9yZWR1Y2VyX21hbmFnZXInO1xuaW1wb3J0IHtcbiAgU0NBTk5FRF9BQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLFxuICBTY2FubmVkQWN0aW9uc1N1YmplY3QsXG59IGZyb20gJy4vc2Nhbm5lZF9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHsgU1RBVEVfUFJPVklERVJTIH0gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBTVE9SRV9QUk9WSURFUlMsIFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQge1xuICBwcm92aWRlUnVudGltZUNoZWNrcyxcbiAgY2hlY2tGb3JBY3Rpb25UeXBlVW5pcXVlbmVzcyxcbn0gZnJvbSAnLi9ydW50aW1lX2NoZWNrcyc7XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTdG9yZVJvb3RNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBhY3Rpb25zJDogQWN0aW9uc1N1YmplY3QsXG4gICAgcmVkdWNlciQ6IFJlZHVjZXJPYnNlcnZhYmxlLFxuICAgIHNjYW5uZWRBY3Rpb25zJDogU2Nhbm5lZEFjdGlvbnNTdWJqZWN0LFxuICAgIHN0b3JlOiBTdG9yZTxhbnk+LFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChfUk9PVF9TVE9SRV9HVUFSRClcbiAgICBndWFyZDogYW55LFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChfQUNUSU9OX1RZUEVfVU5JUVVFTkVTU19DSEVDSylcbiAgICBhY3Rpb25DaGVjazogYW55XG4gICkge31cbn1cblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFN0b3JlRmVhdHVyZU1vZHVsZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoX1NUT1JFX0ZFQVRVUkVTKSBwcml2YXRlIGZlYXR1cmVzOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+W10sXG4gICAgQEluamVjdChGRUFUVVJFX1JFRFVDRVJTKSBwcml2YXRlIGZlYXR1cmVSZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxhbnk+W10sXG4gICAgcHJpdmF0ZSByZWR1Y2VyTWFuYWdlcjogUmVkdWNlck1hbmFnZXIsXG4gICAgcm9vdDogU3RvcmVSb290TW9kdWxlLFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChfQUNUSU9OX1RZUEVfVU5JUVVFTkVTU19DSEVDSylcbiAgICBhY3Rpb25DaGVjazogYW55XG4gICkge1xuICAgIGNvbnN0IGZlYXRzID0gZmVhdHVyZXMubWFwKChmZWF0dXJlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgZmVhdHVyZVJlZHVjZXJDb2xsZWN0aW9uID0gZmVhdHVyZVJlZHVjZXJzLnNoaWZ0KCk7XG4gICAgICBjb25zdCByZWR1Y2VycyA9IGZlYXR1cmVSZWR1Y2VyQ29sbGVjdGlvbiAvKlRPRE8oIzgyMykqLyFbaW5kZXhdO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5mZWF0dXJlLFxuICAgICAgICByZWR1Y2VycyxcbiAgICAgICAgaW5pdGlhbFN0YXRlOiBfaW5pdGlhbFN0YXRlRmFjdG9yeShmZWF0dXJlLmluaXRpYWxTdGF0ZSksXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmVkdWNlck1hbmFnZXIuYWRkRmVhdHVyZXMoZmVhdHMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZWR1Y2VyTWFuYWdlci5yZW1vdmVGZWF0dXJlcyh0aGlzLmZlYXR1cmVzKTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0b3JlQ29uZmlnPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+IHtcbiAgaW5pdGlhbFN0YXRlPzogSW5pdGlhbFN0YXRlPFQ+O1xuICByZWR1Y2VyRmFjdG9yeT86IEFjdGlvblJlZHVjZXJGYWN0b3J5PFQsIFY+O1xuICBtZXRhUmVkdWNlcnM/OiBNZXRhUmVkdWNlcjxULCBWPltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvb3RTdG9yZUNvbmZpZzxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPlxuICBleHRlbmRzIFN0b3JlQ29uZmlnPFQsIFY+IHtcbiAgcnVudGltZUNoZWNrcz86IFBhcnRpYWw8UnVudGltZUNoZWNrcz47XG59XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTdG9yZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290PFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICAgIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlck1hcDxULCBWPj4sXG4gICAgY29uZmlnPzogUm9vdFN0b3JlQ29uZmlnPFQsIFY+XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RvcmVSb290TW9kdWxlPjtcbiAgc3RhdGljIGZvclJvb3QoXG4gICAgcmVkdWNlcnM6XG4gICAgICB8IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+XG4gICAgICB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+PixcbiAgICBjb25maWc6IFJvb3RTdG9yZUNvbmZpZzxhbnksIGFueT4gPSB7fVxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlUm9vdE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU3RvcmVSb290TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfUk9PVF9TVE9SRV9HVUFSRCxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfcHJvdmlkZUZvclJvb3RHdWFyZCxcbiAgICAgICAgICBkZXBzOiBbW1N0b3JlLCBuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCldXSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBwcm92aWRlOiBfSU5JVElBTF9TVEFURSwgdXNlVmFsdWU6IGNvbmZpZy5pbml0aWFsU3RhdGUgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IElOSVRJQUxfU1RBVEUsXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2luaXRpYWxTdGF0ZUZhY3RvcnksXG4gICAgICAgICAgZGVwczogW19JTklUSUFMX1NUQVRFXSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBwcm92aWRlOiBfSU5JVElBTF9SRURVQ0VSUywgdXNlVmFsdWU6IHJlZHVjZXJzIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfU1RPUkVfUkVEVUNFUlMsXG4gICAgICAgICAgdXNlRXhpc3Rpbmc6XG4gICAgICAgICAgICByZWR1Y2VycyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuID8gcmVkdWNlcnMgOiBfSU5JVElBTF9SRURVQ0VSUyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IElOSVRJQUxfUkVEVUNFUlMsXG4gICAgICAgICAgZGVwczogW0luamVjdG9yLCBfSU5JVElBTF9SRURVQ0VSUywgW25ldyBJbmplY3QoX1NUT1JFX1JFRFVDRVJTKV1dLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jcmVhdGVTdG9yZVJlZHVjZXJzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogVVNFUl9QUk9WSURFRF9NRVRBX1JFRFVDRVJTLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcubWV0YVJlZHVjZXJzID8gY29uZmlnLm1ldGFSZWR1Y2VycyA6IFtdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1JFU09MVkVEX01FVEFfUkVEVUNFUlMsXG4gICAgICAgICAgZGVwczogW01FVEFfUkVEVUNFUlMsIFVTRVJfUFJPVklERURfTUVUQV9SRURVQ0VSU10sXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NvbmNhdE1ldGFSZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9SRURVQ0VSX0ZBQ1RPUlksXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZy5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgICAgPyBjb25maWcucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICAgIDogY29tYmluZVJlZHVjZXJzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogUkVEVUNFUl9GQUNUT1JZLFxuICAgICAgICAgIGRlcHM6IFtfUkVEVUNFUl9GQUNUT1JZLCBfUkVTT0xWRURfTUVUQV9SRURVQ0VSU10sXG4gICAgICAgICAgdXNlRmFjdG9yeTogY3JlYXRlUmVkdWNlckZhY3RvcnksXG4gICAgICAgIH0sXG4gICAgICAgIEFDVElPTlNfU1VCSkVDVF9QUk9WSURFUlMsXG4gICAgICAgIFJFRFVDRVJfTUFOQUdFUl9QUk9WSURFUlMsXG4gICAgICAgIFNDQU5ORURfQUNUSU9OU19TVUJKRUNUX1BST1ZJREVSUyxcbiAgICAgICAgU1RBVEVfUFJPVklERVJTLFxuICAgICAgICBTVE9SRV9QUk9WSURFUlMsXG4gICAgICAgIHByb3ZpZGVSdW50aW1lQ2hlY2tzKGNvbmZpZy5ydW50aW1lQ2hlY2tzKSxcbiAgICAgICAgY2hlY2tGb3JBY3Rpb25UeXBlVW5pcXVlbmVzcygpLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZvckZlYXR1cmU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAgZmVhdHVyZU5hbWU6IHN0cmluZyxcbiAgICByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxULCBWPiB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8VCwgVj4+LFxuICAgIGNvbmZpZz86IFN0b3JlQ29uZmlnPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48U3RvcmVDb25maWc8VCwgVj4+XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RvcmVGZWF0dXJlTW9kdWxlPjtcbiAgc3RhdGljIGZvckZlYXR1cmU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAgZmVhdHVyZU5hbWU6IHN0cmluZyxcbiAgICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlcjxULCBWPj4sXG4gICAgY29uZmlnPzogU3RvcmVDb25maWc8VCwgVj4gfCBJbmplY3Rpb25Ub2tlbjxTdG9yZUNvbmZpZzxULCBWPj5cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZUZlYXR1cmVNb2R1bGU+O1xuICBzdGF0aWMgZm9yRmVhdHVyZShcbiAgICBmZWF0dXJlTmFtZTogc3RyaW5nLFxuICAgIHJlZHVjZXJzOlxuICAgICAgfCBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PlxuICAgICAgfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55Pj5cbiAgICAgIHwgQWN0aW9uUmVkdWNlcjxhbnksIGFueT5cbiAgICAgIHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlcjxhbnksIGFueT4+LFxuICAgIGNvbmZpZzogU3RvcmVDb25maWc8YW55LCBhbnk+IHwgSW5qZWN0aW9uVG9rZW48U3RvcmVDb25maWc8YW55LCBhbnk+PiA9IHt9XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RvcmVGZWF0dXJlTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTdG9yZUZlYXR1cmVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9GRUFUVVJFX0NPTkZJR1MsXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNUT1JFX0ZFQVRVUkVTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZVZhbHVlOiB7XG4gICAgICAgICAgICBrZXk6IGZlYXR1cmVOYW1lLFxuICAgICAgICAgICAgcmVkdWNlckZhY3Rvcnk6XG4gICAgICAgICAgICAgICEoY29uZmlnIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4pICYmIGNvbmZpZy5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgICAgICAgID8gY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICAgICAgOiBjb21iaW5lUmVkdWNlcnMsXG4gICAgICAgICAgICBtZXRhUmVkdWNlcnM6XG4gICAgICAgICAgICAgICEoY29uZmlnIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4pICYmIGNvbmZpZy5tZXRhUmVkdWNlcnNcbiAgICAgICAgICAgICAgICA/IGNvbmZpZy5tZXRhUmVkdWNlcnNcbiAgICAgICAgICAgICAgICA6IFtdLFxuICAgICAgICAgICAgaW5pdGlhbFN0YXRlOlxuICAgICAgICAgICAgICAhKGNvbmZpZyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuKSAmJiBjb25maWcuaW5pdGlhbFN0YXRlXG4gICAgICAgICAgICAgICAgPyBjb25maWcuaW5pdGlhbFN0YXRlXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9TVE9SRV9GRUFUVVJFUyxcbiAgICAgICAgICBkZXBzOiBbSW5qZWN0b3IsIF9GRUFUVVJFX0NPTkZJR1MsIFNUT1JFX0ZFQVRVUkVTXSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfY3JlYXRlRmVhdHVyZVN0b3JlLFxuICAgICAgICB9LFxuICAgICAgICB7IHByb3ZpZGU6IF9GRUFUVVJFX1JFRFVDRVJTLCBtdWx0aTogdHJ1ZSwgdXNlVmFsdWU6IHJlZHVjZXJzIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfRkVBVFVSRV9SRURVQ0VSU19UT0tFTixcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VFeGlzdGluZzpcbiAgICAgICAgICAgIHJlZHVjZXJzIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4gPyByZWR1Y2VycyA6IF9GRUFUVVJFX1JFRFVDRVJTLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRkVBVFVSRV9SRURVQ0VSUyxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICBkZXBzOiBbXG4gICAgICAgICAgICBJbmplY3RvcixcbiAgICAgICAgICAgIF9GRUFUVVJFX1JFRFVDRVJTLFxuICAgICAgICAgICAgW25ldyBJbmplY3QoX0ZFQVRVUkVfUkVEVUNFUlNfVE9LRU4pXSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jcmVhdGVGZWF0dXJlUmVkdWNlcnMsXG4gICAgICAgIH0sXG4gICAgICAgIGNoZWNrRm9yQWN0aW9uVHlwZVVuaXF1ZW5lc3MoKSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZVN0b3JlUmVkdWNlcnMoXG4gIGluamVjdG9yOiBJbmplY3RvcixcbiAgcmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+XG4pIHtcbiAgcmV0dXJuIHJlZHVjZXJzIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4gPyBpbmplY3Rvci5nZXQocmVkdWNlcnMpIDogcmVkdWNlcnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlRmVhdHVyZVN0b3JlKFxuICBpbmplY3RvcjogSW5qZWN0b3IsXG4gIGNvbmZpZ3M6IFN0b3JlQ29uZmlnPGFueSwgYW55PltdIHwgSW5qZWN0aW9uVG9rZW48U3RvcmVDb25maWc8YW55LCBhbnk+PltdLFxuICBmZWF0dXJlU3RvcmVzOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+W11cbikge1xuICByZXR1cm4gZmVhdHVyZVN0b3Jlcy5tYXAoKGZlYXQsIGluZGV4KSA9PiB7XG4gICAgaWYgKGNvbmZpZ3NbaW5kZXhdIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4pIHtcbiAgICAgIGNvbnN0IGNvbmYgPSBpbmplY3Rvci5nZXQoY29uZmlnc1tpbmRleF0pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5OiBmZWF0LmtleSxcbiAgICAgICAgcmVkdWNlckZhY3Rvcnk6IGNvbmYucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICA/IGNvbmYucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICA6IGNvbWJpbmVSZWR1Y2VycyxcbiAgICAgICAgbWV0YVJlZHVjZXJzOiBjb25mLm1ldGFSZWR1Y2VycyA/IGNvbmYubWV0YVJlZHVjZXJzIDogW10sXG4gICAgICAgIGluaXRpYWxTdGF0ZTogY29uZi5pbml0aWFsU3RhdGUsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZmVhdDtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlRmVhdHVyZVJlZHVjZXJzKFxuICBpbmplY3RvcjogSW5qZWN0b3IsXG4gIHJlZHVjZXJDb2xsZWN0aW9uOiBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PltdXG4pIHtcbiAgY29uc3QgcmVkdWNlcnMgPSByZWR1Y2VyQ29sbGVjdGlvbi5tYXAoKHJlZHVjZXIpID0+IHtcbiAgICByZXR1cm4gcmVkdWNlciBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuID8gaW5qZWN0b3IuZ2V0KHJlZHVjZXIpIDogcmVkdWNlcjtcbiAgfSk7XG5cbiAgcmV0dXJuIHJlZHVjZXJzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2luaXRpYWxTdGF0ZUZhY3RvcnkoaW5pdGlhbFN0YXRlOiBhbnkpOiBhbnkge1xuICBpZiAodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpbml0aWFsU3RhdGUoKTtcbiAgfVxuXG4gIHJldHVybiBpbml0aWFsU3RhdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfY29uY2F0TWV0YVJlZHVjZXJzKFxuICBtZXRhUmVkdWNlcnM6IE1ldGFSZWR1Y2VyW10sXG4gIHVzZXJQcm92aWRlZE1ldGFSZWR1Y2VyczogTWV0YVJlZHVjZXJbXVxuKTogTWV0YVJlZHVjZXJbXSB7XG4gIHJldHVybiBtZXRhUmVkdWNlcnMuY29uY2F0KHVzZXJQcm92aWRlZE1ldGFSZWR1Y2Vycyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfcHJvdmlkZUZvclJvb3RHdWFyZChzdG9yZTogU3RvcmU8YW55Pik6IGFueSB7XG4gIGlmIChzdG9yZSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICBgU3RvcmVNb2R1bGUuZm9yUm9vdCgpIGNhbGxlZCB0d2ljZS4gRmVhdHVyZSBtb2R1bGVzIHNob3VsZCB1c2UgU3RvcmVNb2R1bGUuZm9yRmVhdHVyZSgpIGluc3RlYWQuYFxuICAgICk7XG4gIH1cbiAgcmV0dXJuICdndWFyZGVkJztcbn1cbiJdfQ==