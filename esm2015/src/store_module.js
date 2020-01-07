/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/src/store_module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Inject, InjectionToken, Injector, Optional, SkipSelf, } from '@angular/core';
import { combineReducers, createReducerFactory } from './utils';
import { INITIAL_STATE, INITIAL_REDUCERS, _INITIAL_REDUCERS, REDUCER_FACTORY, _REDUCER_FACTORY, STORE_FEATURES, _INITIAL_STATE, META_REDUCERS, _STORE_REDUCERS, FEATURE_REDUCERS, _FEATURE_REDUCERS, _FEATURE_REDUCERS_TOKEN, _STORE_FEATURES, _FEATURE_CONFIGS, USER_PROVIDED_META_REDUCERS, _RESOLVED_META_REDUCERS, _ROOT_STORE_GUARD, } from './tokens';
import { ACTIONS_SUBJECT_PROVIDERS, ActionsSubject } from './actions_subject';
import { REDUCER_MANAGER_PROVIDERS, ReducerManager, ReducerObservable, } from './reducer_manager';
import { SCANNED_ACTIONS_SUBJECT_PROVIDERS, ScannedActionsSubject, } from './scanned_actions_subject';
import { STATE_PROVIDERS } from './state';
import { STORE_PROVIDERS, Store } from './store';
import { provideRuntimeChecks } from './runtime_checks';
export class StoreRootModule {
    /**
     * @param {?} actions$
     * @param {?} reducer$
     * @param {?} scannedActions$
     * @param {?} store
     * @param {?} guard
     */
    constructor(actions$, reducer$, scannedActions$, store, guard) {
    }
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
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [_ROOT_STORE_GUARD,] }] }
];
export class StoreFeatureModule {
    /**
     * @param {?} features
     * @param {?} featureReducers
     * @param {?} reducerManager
     * @param {?} root
     */
    constructor(features, featureReducers, reducerManager, root) {
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
    { type: StoreRootModule }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvc3RvcmVfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBR04sY0FBYyxFQUNkLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBV3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDaEUsT0FBTyxFQUNMLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGNBQWMsRUFDZCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsMkJBQTJCLEVBQzNCLHVCQUF1QixFQUN2QixpQkFBaUIsR0FDbEIsTUFBTSxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlFLE9BQU8sRUFDTCx5QkFBeUIsRUFDekIsY0FBYyxFQUNkLGlCQUFpQixHQUNsQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFDTCxpQ0FBaUMsRUFDakMscUJBQXFCLEdBQ3RCLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUd4RCxNQUFNLE9BQU8sZUFBZTs7Ozs7Ozs7SUFDMUIsWUFDRSxRQUF3QixFQUN4QixRQUEyQixF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QUM7S0FDdkI7SUFFRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLFlBQTJCLEVBQzNCLHdCQUF1QztJQUV2QyxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUN2RCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxLQUFpQjtJQUNwRCxJQUFJLEtBQUssRUFBRTtRQUNULE1BQU0sSUFBSSxTQUFTLENBQ2pCLGtHQUFrRyxDQUNuRyxDQUFDO0tBQ0g7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgTmdNb2R1bGUsXG4gIEluamVjdCxcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcbiAgT25EZXN0cm95LFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5qZWN0b3IsXG4gIE9wdGlvbmFsLFxuICBTa2lwU2VsZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBY3Rpb24sXG4gIEFjdGlvblJlZHVjZXIsXG4gIEFjdGlvblJlZHVjZXJNYXAsXG4gIEFjdGlvblJlZHVjZXJGYWN0b3J5LFxuICBTdG9yZUZlYXR1cmUsXG4gIEluaXRpYWxTdGF0ZSxcbiAgTWV0YVJlZHVjZXIsXG4gIFJ1bnRpbWVDaGVja3MsXG59IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycywgY3JlYXRlUmVkdWNlckZhY3RvcnkgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7XG4gIElOSVRJQUxfU1RBVEUsXG4gIElOSVRJQUxfUkVEVUNFUlMsXG4gIF9JTklUSUFMX1JFRFVDRVJTLFxuICBSRURVQ0VSX0ZBQ1RPUlksXG4gIF9SRURVQ0VSX0ZBQ1RPUlksXG4gIFNUT1JFX0ZFQVRVUkVTLFxuICBfSU5JVElBTF9TVEFURSxcbiAgTUVUQV9SRURVQ0VSUyxcbiAgX1NUT1JFX1JFRFVDRVJTLFxuICBGRUFUVVJFX1JFRFVDRVJTLFxuICBfRkVBVFVSRV9SRURVQ0VSUyxcbiAgX0ZFQVRVUkVfUkVEVUNFUlNfVE9LRU4sXG4gIF9TVE9SRV9GRUFUVVJFUyxcbiAgX0ZFQVRVUkVfQ09ORklHUyxcbiAgVVNFUl9QUk9WSURFRF9NRVRBX1JFRFVDRVJTLFxuICBfUkVTT0xWRURfTUVUQV9SRURVQ0VSUyxcbiAgX1JPT1RfU1RPUkVfR1VBUkQsXG59IGZyb20gJy4vdG9rZW5zJztcbmltcG9ydCB7IEFDVElPTlNfU1VCSkVDVF9QUk9WSURFUlMsIEFjdGlvbnNTdWJqZWN0IH0gZnJvbSAnLi9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHtcbiAgUkVEVUNFUl9NQU5BR0VSX1BST1ZJREVSUyxcbiAgUmVkdWNlck1hbmFnZXIsXG4gIFJlZHVjZXJPYnNlcnZhYmxlLFxufSBmcm9tICcuL3JlZHVjZXJfbWFuYWdlcic7XG5pbXBvcnQge1xuICBTQ0FOTkVEX0FDVElPTlNfU1VCSkVDVF9QUk9WSURFUlMsXG4gIFNjYW5uZWRBY3Rpb25zU3ViamVjdCxcbn0gZnJvbSAnLi9zY2FubmVkX2FjdGlvbnNfc3ViamVjdCc7XG5pbXBvcnQgeyBTVEFURV9QUk9WSURFUlMgfSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IFNUT1JFX1BST1ZJREVSUywgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCB7IHByb3ZpZGVSdW50aW1lQ2hlY2tzIH0gZnJvbSAnLi9ydW50aW1lX2NoZWNrcyc7XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTdG9yZVJvb3RNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBhY3Rpb25zJDogQWN0aW9uc1N1YmplY3QsXG4gICAgcmVkdWNlciQ6IFJlZHVjZXJPYnNlcnZhYmxlLFxuICAgIHNjYW5uZWRBY3Rpb25zJDogU2Nhbm5lZEFjdGlvbnNTdWJqZWN0LFxuICAgIHN0b3JlOiBTdG9yZTxhbnk+LFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChfUk9PVF9TVE9SRV9HVUFSRClcbiAgICBndWFyZDogYW55XG4gICkge31cbn1cblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFN0b3JlRmVhdHVyZU1vZHVsZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoX1NUT1JFX0ZFQVRVUkVTKSBwcml2YXRlIGZlYXR1cmVzOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+W10sXG4gICAgQEluamVjdChGRUFUVVJFX1JFRFVDRVJTKSBwcml2YXRlIGZlYXR1cmVSZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxhbnk+W10sXG4gICAgcHJpdmF0ZSByZWR1Y2VyTWFuYWdlcjogUmVkdWNlck1hbmFnZXIsXG4gICAgcm9vdDogU3RvcmVSb290TW9kdWxlXG4gICkge1xuICAgIGNvbnN0IGZlYXRzID0gZmVhdHVyZXMubWFwKChmZWF0dXJlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgZmVhdHVyZVJlZHVjZXJDb2xsZWN0aW9uID0gZmVhdHVyZVJlZHVjZXJzLnNoaWZ0KCk7XG4gICAgICBjb25zdCByZWR1Y2VycyA9IGZlYXR1cmVSZWR1Y2VyQ29sbGVjdGlvbiAvKlRPRE8oIzgyMykqLyFbaW5kZXhdO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5mZWF0dXJlLFxuICAgICAgICByZWR1Y2VycyxcbiAgICAgICAgaW5pdGlhbFN0YXRlOiBfaW5pdGlhbFN0YXRlRmFjdG9yeShmZWF0dXJlLmluaXRpYWxTdGF0ZSksXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmVkdWNlck1hbmFnZXIuYWRkRmVhdHVyZXMoZmVhdHMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZWR1Y2VyTWFuYWdlci5yZW1vdmVGZWF0dXJlcyh0aGlzLmZlYXR1cmVzKTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0b3JlQ29uZmlnPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+IHtcbiAgaW5pdGlhbFN0YXRlPzogSW5pdGlhbFN0YXRlPFQ+O1xuICByZWR1Y2VyRmFjdG9yeT86IEFjdGlvblJlZHVjZXJGYWN0b3J5PFQsIFY+O1xuICBtZXRhUmVkdWNlcnM/OiBNZXRhUmVkdWNlcjxULCBWPltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvb3RTdG9yZUNvbmZpZzxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPlxuICBleHRlbmRzIFN0b3JlQ29uZmlnPFQsIFY+IHtcbiAgcnVudGltZUNoZWNrcz86IFBhcnRpYWw8UnVudGltZUNoZWNrcz47XG59XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTdG9yZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290PFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICAgIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlck1hcDxULCBWPj4sXG4gICAgY29uZmlnPzogUm9vdFN0b3JlQ29uZmlnPFQsIFY+XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RvcmVSb290TW9kdWxlPjtcbiAgc3RhdGljIGZvclJvb3QoXG4gICAgcmVkdWNlcnM6XG4gICAgICB8IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+XG4gICAgICB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+PixcbiAgICBjb25maWc6IFJvb3RTdG9yZUNvbmZpZzxhbnksIGFueT4gPSB7fVxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlUm9vdE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU3RvcmVSb290TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfUk9PVF9TVE9SRV9HVUFSRCxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfcHJvdmlkZUZvclJvb3RHdWFyZCxcbiAgICAgICAgICBkZXBzOiBbW1N0b3JlLCBuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCldXSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBwcm92aWRlOiBfSU5JVElBTF9TVEFURSwgdXNlVmFsdWU6IGNvbmZpZy5pbml0aWFsU3RhdGUgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IElOSVRJQUxfU1RBVEUsXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2luaXRpYWxTdGF0ZUZhY3RvcnksXG4gICAgICAgICAgZGVwczogW19JTklUSUFMX1NUQVRFXSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBwcm92aWRlOiBfSU5JVElBTF9SRURVQ0VSUywgdXNlVmFsdWU6IHJlZHVjZXJzIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfU1RPUkVfUkVEVUNFUlMsXG4gICAgICAgICAgdXNlRXhpc3Rpbmc6XG4gICAgICAgICAgICByZWR1Y2VycyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuID8gcmVkdWNlcnMgOiBfSU5JVElBTF9SRURVQ0VSUyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IElOSVRJQUxfUkVEVUNFUlMsXG4gICAgICAgICAgZGVwczogW0luamVjdG9yLCBfSU5JVElBTF9SRURVQ0VSUywgW25ldyBJbmplY3QoX1NUT1JFX1JFRFVDRVJTKV1dLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jcmVhdGVTdG9yZVJlZHVjZXJzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogVVNFUl9QUk9WSURFRF9NRVRBX1JFRFVDRVJTLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcubWV0YVJlZHVjZXJzID8gY29uZmlnLm1ldGFSZWR1Y2VycyA6IFtdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1JFU09MVkVEX01FVEFfUkVEVUNFUlMsXG4gICAgICAgICAgZGVwczogW01FVEFfUkVEVUNFUlMsIFVTRVJfUFJPVklERURfTUVUQV9SRURVQ0VSU10sXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NvbmNhdE1ldGFSZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9SRURVQ0VSX0ZBQ1RPUlksXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZy5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgICAgPyBjb25maWcucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICAgIDogY29tYmluZVJlZHVjZXJzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogUkVEVUNFUl9GQUNUT1JZLFxuICAgICAgICAgIGRlcHM6IFtfUkVEVUNFUl9GQUNUT1JZLCBfUkVTT0xWRURfTUVUQV9SRURVQ0VSU10sXG4gICAgICAgICAgdXNlRmFjdG9yeTogY3JlYXRlUmVkdWNlckZhY3RvcnksXG4gICAgICAgIH0sXG4gICAgICAgIEFDVElPTlNfU1VCSkVDVF9QUk9WSURFUlMsXG4gICAgICAgIFJFRFVDRVJfTUFOQUdFUl9QUk9WSURFUlMsXG4gICAgICAgIFNDQU5ORURfQUNUSU9OU19TVUJKRUNUX1BST1ZJREVSUyxcbiAgICAgICAgU1RBVEVfUFJPVklERVJTLFxuICAgICAgICBTVE9SRV9QUk9WSURFUlMsXG4gICAgICAgIHByb3ZpZGVSdW50aW1lQ2hlY2tzKGNvbmZpZy5ydW50aW1lQ2hlY2tzKSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmb3JGZWF0dXJlPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICAgIGZlYXR1cmVOYW1lOiBzdHJpbmcsXG4gICAgcmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8VCwgVj4gfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+PixcbiAgICBjb25maWc/OiBTdG9yZUNvbmZpZzxULCBWPiB8IEluamVjdGlvblRva2VuPFN0b3JlQ29uZmlnPFQsIFY+PlxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlRmVhdHVyZU1vZHVsZT47XG4gIHN0YXRpYyBmb3JGZWF0dXJlPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICAgIGZlYXR1cmVOYW1lOiBzdHJpbmcsXG4gICAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxULCBWPiB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXI8VCwgVj4+LFxuICAgIGNvbmZpZz86IFN0b3JlQ29uZmlnPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48U3RvcmVDb25maWc8VCwgVj4+XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RvcmVGZWF0dXJlTW9kdWxlPjtcbiAgc3RhdGljIGZvckZlYXR1cmUoXG4gICAgZmVhdHVyZU5hbWU6IHN0cmluZyxcbiAgICByZWR1Y2VyczpcbiAgICAgIHwgQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5cbiAgICAgIHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT4+XG4gICAgICB8IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+XG4gICAgICB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXI8YW55LCBhbnk+PixcbiAgICBjb25maWc6IFN0b3JlQ29uZmlnPGFueSwgYW55PiB8IEluamVjdGlvblRva2VuPFN0b3JlQ29uZmlnPGFueSwgYW55Pj4gPSB7fVxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlRmVhdHVyZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU3RvcmVGZWF0dXJlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfRkVBVFVSRV9DT05GSUdTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBTVE9SRV9GRUFUVVJFUyxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VWYWx1ZToge1xuICAgICAgICAgICAga2V5OiBmZWF0dXJlTmFtZSxcbiAgICAgICAgICAgIHJlZHVjZXJGYWN0b3J5OlxuICAgICAgICAgICAgICAhKGNvbmZpZyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuKSAmJiBjb25maWcucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICAgICAgICA/IGNvbmZpZy5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgICAgICAgIDogY29tYmluZVJlZHVjZXJzLFxuICAgICAgICAgICAgbWV0YVJlZHVjZXJzOlxuICAgICAgICAgICAgICAhKGNvbmZpZyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuKSAmJiBjb25maWcubWV0YVJlZHVjZXJzXG4gICAgICAgICAgICAgICAgPyBjb25maWcubWV0YVJlZHVjZXJzXG4gICAgICAgICAgICAgICAgOiBbXSxcbiAgICAgICAgICAgIGluaXRpYWxTdGF0ZTpcbiAgICAgICAgICAgICAgIShjb25maWcgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbikgJiYgY29uZmlnLmluaXRpYWxTdGF0ZVxuICAgICAgICAgICAgICAgID8gY29uZmlnLmluaXRpYWxTdGF0ZVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfU1RPUkVfRkVBVFVSRVMsXG4gICAgICAgICAgZGVwczogW0luamVjdG9yLCBfRkVBVFVSRV9DT05GSUdTLCBTVE9SRV9GRUFUVVJFU10sXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NyZWF0ZUZlYXR1cmVTdG9yZSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBwcm92aWRlOiBfRkVBVFVSRV9SRURVQ0VSUywgbXVsdGk6IHRydWUsIHVzZVZhbHVlOiByZWR1Y2VycyB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX0ZFQVRVUkVfUkVEVUNFUlNfVE9LRU4sXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgdXNlRXhpc3Rpbmc6XG4gICAgICAgICAgICByZWR1Y2VycyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuID8gcmVkdWNlcnMgOiBfRkVBVFVSRV9SRURVQ0VSUyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEZFQVRVUkVfUkVEVUNFUlMsXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgZGVwczogW1xuICAgICAgICAgICAgSW5qZWN0b3IsXG4gICAgICAgICAgICBfRkVBVFVSRV9SRURVQ0VSUyxcbiAgICAgICAgICAgIFtuZXcgSW5qZWN0KF9GRUFUVVJFX1JFRFVDRVJTX1RPS0VOKV0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfY3JlYXRlRmVhdHVyZVJlZHVjZXJzLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlU3RvcmVSZWR1Y2VycyhcbiAgaW5qZWN0b3I6IEluamVjdG9yLFxuICByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5cbikge1xuICByZXR1cm4gcmVkdWNlcnMgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbiA/IGluamVjdG9yLmdldChyZWR1Y2VycykgOiByZWR1Y2Vycztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVGZWF0dXJlU3RvcmUoXG4gIGluamVjdG9yOiBJbmplY3RvcixcbiAgY29uZmlnczogU3RvcmVDb25maWc8YW55LCBhbnk+W10gfCBJbmplY3Rpb25Ub2tlbjxTdG9yZUNvbmZpZzxhbnksIGFueT4+W10sXG4gIGZlYXR1cmVTdG9yZXM6IFN0b3JlRmVhdHVyZTxhbnksIGFueT5bXVxuKSB7XG4gIHJldHVybiBmZWF0dXJlU3RvcmVzLm1hcCgoZmVhdCwgaW5kZXgpID0+IHtcbiAgICBpZiAoY29uZmlnc1tpbmRleF0gaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbikge1xuICAgICAgY29uc3QgY29uZiA9IGluamVjdG9yLmdldChjb25maWdzW2luZGV4XSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGZlYXQua2V5LFxuICAgICAgICByZWR1Y2VyRmFjdG9yeTogY29uZi5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgID8gY29uZi5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgIDogY29tYmluZVJlZHVjZXJzLFxuICAgICAgICBtZXRhUmVkdWNlcnM6IGNvbmYubWV0YVJlZHVjZXJzID8gY29uZi5tZXRhUmVkdWNlcnMgOiBbXSxcbiAgICAgICAgaW5pdGlhbFN0YXRlOiBjb25mLmluaXRpYWxTdGF0ZSxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmZWF0O1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVGZWF0dXJlUmVkdWNlcnMoXG4gIGluamVjdG9yOiBJbmplY3RvcixcbiAgcmVkdWNlckNvbGxlY3Rpb246IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+W11cbikge1xuICBjb25zdCByZWR1Y2VycyA9IHJlZHVjZXJDb2xsZWN0aW9uLm1hcChyZWR1Y2VyID0+IHtcbiAgICByZXR1cm4gcmVkdWNlciBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuID8gaW5qZWN0b3IuZ2V0KHJlZHVjZXIpIDogcmVkdWNlcjtcbiAgfSk7XG5cbiAgcmV0dXJuIHJlZHVjZXJzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2luaXRpYWxTdGF0ZUZhY3RvcnkoaW5pdGlhbFN0YXRlOiBhbnkpOiBhbnkge1xuICBpZiAodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpbml0aWFsU3RhdGUoKTtcbiAgfVxuXG4gIHJldHVybiBpbml0aWFsU3RhdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfY29uY2F0TWV0YVJlZHVjZXJzKFxuICBtZXRhUmVkdWNlcnM6IE1ldGFSZWR1Y2VyW10sXG4gIHVzZXJQcm92aWRlZE1ldGFSZWR1Y2VyczogTWV0YVJlZHVjZXJbXVxuKTogTWV0YVJlZHVjZXJbXSB7XG4gIHJldHVybiBtZXRhUmVkdWNlcnMuY29uY2F0KHVzZXJQcm92aWRlZE1ldGFSZWR1Y2Vycyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfcHJvdmlkZUZvclJvb3RHdWFyZChzdG9yZTogU3RvcmU8YW55Pik6IGFueSB7XG4gIGlmIChzdG9yZSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICBgU3RvcmVNb2R1bGUuZm9yUm9vdCgpIGNhbGxlZCB0d2ljZS4gRmVhdHVyZSBtb2R1bGVzIHNob3VsZCB1c2UgU3RvcmVNb2R1bGUuZm9yRmVhdHVyZSgpIGluc3RlYWQuYFxuICAgICk7XG4gIH1cbiAgcmV0dXJuICdndWFyZGVkJztcbn1cbiJdfQ==