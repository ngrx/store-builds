/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Inject, InjectionToken, Injector, } from '@angular/core';
import { combineReducers, createReducerFactory } from './utils';
import { INITIAL_STATE, INITIAL_REDUCERS, _INITIAL_REDUCERS, REDUCER_FACTORY, _REDUCER_FACTORY, STORE_FEATURES, _INITIAL_STATE, META_REDUCERS, _STORE_REDUCERS, FEATURE_REDUCERS, _FEATURE_REDUCERS, _FEATURE_REDUCERS_TOKEN, _STORE_FEATURES, _FEATURE_CONFIGS, USER_PROVIDED_META_REDUCERS, _RESOLVED_META_REDUCERS, } from './tokens';
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
     */
    constructor(actions$, reducer$, scannedActions$, store) { }
}
StoreRootModule.decorators = [
    { type: NgModule, args: [{},] }
];
/** @nocollapse */
StoreRootModule.ctorParameters = () => [
    { type: ActionsSubject },
    { type: ReducerObservable },
    { type: ScannedActionsSubject },
    { type: Store }
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
            return Object.assign({}, feature, { reducers, initialState: _initialStateFactory(feature.initialState) });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvc3RvcmVfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFHTixjQUFjLEVBQ2QsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBV3ZCLE9BQU8sRUFBVyxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDekUsT0FBTyxFQUNMLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGNBQWMsRUFDZCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsMkJBQTJCLEVBQzNCLHVCQUF1QixHQUN4QixNQUFNLFVBQVUsQ0FBQztBQUNsQixPQUFPLEVBQUUseUJBQXlCLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUUsT0FBTyxFQUNMLHlCQUF5QixFQUN6QixjQUFjLEVBQ2QsaUJBQWlCLEdBQ2xCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUNMLGlDQUFpQyxFQUNqQyxxQkFBcUIsR0FDdEIsTUFBTSwyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR3hELE1BQU0sT0FBTyxlQUFlOzs7Ozs7O0lBQzFCLFlBQ0UsUUFBd0IsRUFDeEIsUUFBMkIsRUFDM0IsZUFBc0MsRUFDdEMsS0FBaUIsSUFDaEIsQ0FBQzs7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QUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsT0FBTztnQkFDTCxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7Z0JBQ2IsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO29CQUNqQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWM7b0JBQ3JCLENBQUMsQ0FBQyxlQUFlO2dCQUNuQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDeEQsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO2FBQ2hDLENBQUM7U0FDSDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsc0JBQXNCLENBQ3BDLFFBQWtCLEVBQ2xCLGlCQUErQzs7VUFFekMsUUFBUSxHQUFHLGlCQUFpQixDQUFDLEdBQUc7Ozs7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUMvQyxPQUFPLE9BQU8sWUFBWSxjQUFjLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUM3RSxDQUFDLEVBQUM7SUFFRixPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxZQUFpQjtJQUNwRCxJQUFJLE9BQU8sWUFBWSxLQUFLLFVBQVUsRUFBRTtRQUN0QyxPQUFPLFlBQVksRUFBRSxDQUFDO0tBQ3ZCO0lBRUQsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUNqQyxZQUEyQixFQUMzQix3QkFBdUM7SUFFdkMsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDdkQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIE5nTW9kdWxlLFxuICBJbmplY3QsXG4gIE1vZHVsZVdpdGhQcm92aWRlcnMsXG4gIE9uRGVzdHJveSxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIEluamVjdG9yLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFjdGlvbixcbiAgQWN0aW9uUmVkdWNlcixcbiAgQWN0aW9uUmVkdWNlck1hcCxcbiAgQWN0aW9uUmVkdWNlckZhY3RvcnksXG4gIFN0b3JlRmVhdHVyZSxcbiAgSW5pdGlhbFN0YXRlLFxuICBNZXRhUmVkdWNlcixcbiAgUnVudGltZUNoZWNrcyxcbn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgY29tcG9zZSwgY29tYmluZVJlZHVjZXJzLCBjcmVhdGVSZWR1Y2VyRmFjdG9yeSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtcbiAgSU5JVElBTF9TVEFURSxcbiAgSU5JVElBTF9SRURVQ0VSUyxcbiAgX0lOSVRJQUxfUkVEVUNFUlMsXG4gIFJFRFVDRVJfRkFDVE9SWSxcbiAgX1JFRFVDRVJfRkFDVE9SWSxcbiAgU1RPUkVfRkVBVFVSRVMsXG4gIF9JTklUSUFMX1NUQVRFLFxuICBNRVRBX1JFRFVDRVJTLFxuICBfU1RPUkVfUkVEVUNFUlMsXG4gIEZFQVRVUkVfUkVEVUNFUlMsXG4gIF9GRUFUVVJFX1JFRFVDRVJTLFxuICBfRkVBVFVSRV9SRURVQ0VSU19UT0tFTixcbiAgX1NUT1JFX0ZFQVRVUkVTLFxuICBfRkVBVFVSRV9DT05GSUdTLFxuICBVU0VSX1BST1ZJREVEX01FVEFfUkVEVUNFUlMsXG4gIF9SRVNPTFZFRF9NRVRBX1JFRFVDRVJTLFxufSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQgeyBBQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLCBBY3Rpb25zU3ViamVjdCB9IGZyb20gJy4vYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7XG4gIFJFRFVDRVJfTUFOQUdFUl9QUk9WSURFUlMsXG4gIFJlZHVjZXJNYW5hZ2VyLFxuICBSZWR1Y2VyT2JzZXJ2YWJsZSxcbn0gZnJvbSAnLi9yZWR1Y2VyX21hbmFnZXInO1xuaW1wb3J0IHtcbiAgU0NBTk5FRF9BQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLFxuICBTY2FubmVkQWN0aW9uc1N1YmplY3QsXG59IGZyb20gJy4vc2Nhbm5lZF9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHsgU1RBVEVfUFJPVklERVJTIH0gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBTVE9SRV9QUk9WSURFUlMsIFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBwcm92aWRlUnVudGltZUNoZWNrcyB9IGZyb20gJy4vcnVudGltZV9jaGVja3MnO1xuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU3RvcmVSb290TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgYWN0aW9ucyQ6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHJlZHVjZXIkOiBSZWR1Y2VyT2JzZXJ2YWJsZSxcbiAgICBzY2FubmVkQWN0aW9ucyQ6IFNjYW5uZWRBY3Rpb25zU3ViamVjdCxcbiAgICBzdG9yZTogU3RvcmU8YW55PlxuICApIHt9XG59XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTdG9yZUZlYXR1cmVNb2R1bGUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KF9TVE9SRV9GRUFUVVJFUykgcHJpdmF0ZSBmZWF0dXJlczogU3RvcmVGZWF0dXJlPGFueSwgYW55PltdLFxuICAgIEBJbmplY3QoRkVBVFVSRV9SRURVQ0VSUykgcHJpdmF0ZSBmZWF0dXJlUmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8YW55PltdLFxuICAgIHByaXZhdGUgcmVkdWNlck1hbmFnZXI6IFJlZHVjZXJNYW5hZ2VyLFxuICAgIHJvb3Q6IFN0b3JlUm9vdE1vZHVsZVxuICApIHtcbiAgICBjb25zdCBmZWF0cyA9IGZlYXR1cmVzLm1hcCgoZmVhdHVyZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGZlYXR1cmVSZWR1Y2VyQ29sbGVjdGlvbiA9IGZlYXR1cmVSZWR1Y2Vycy5zaGlmdCgpO1xuICAgICAgY29uc3QgcmVkdWNlcnMgPSBmZWF0dXJlUmVkdWNlckNvbGxlY3Rpb24gLypUT0RPKCM4MjMpKi8hW2luZGV4XTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZmVhdHVyZSxcbiAgICAgICAgcmVkdWNlcnMsXG4gICAgICAgIGluaXRpYWxTdGF0ZTogX2luaXRpYWxTdGF0ZUZhY3RvcnkoZmVhdHVyZS5pbml0aWFsU3RhdGUpLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJlZHVjZXJNYW5hZ2VyLmFkZEZlYXR1cmVzKGZlYXRzKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVkdWNlck1hbmFnZXIucmVtb3ZlRmVhdHVyZXModGhpcy5mZWF0dXJlcyk7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdG9yZUNvbmZpZzxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiB7XG4gIGluaXRpYWxTdGF0ZT86IEluaXRpYWxTdGF0ZTxUPjtcbiAgcmVkdWNlckZhY3Rvcnk/OiBBY3Rpb25SZWR1Y2VyRmFjdG9yeTxULCBWPjtcbiAgbWV0YVJlZHVjZXJzPzogTWV0YVJlZHVjZXI8VCwgVj5bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb290U3RvcmVDb25maWc8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj5cbiAgZXh0ZW5kcyBTdG9yZUNvbmZpZzxULCBWPiB7XG4gIHJ1bnRpbWVDaGVja3M/OiBQYXJ0aWFsPFJ1bnRpbWVDaGVja3M+O1xufVxuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU3RvcmVNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdDxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxULCBWPiB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8VCwgVj4+LFxuICAgIGNvbmZpZz86IFJvb3RTdG9yZUNvbmZpZzxULCBWPlxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlUm9vdE1vZHVsZT47XG4gIHN0YXRpYyBmb3JSb290KFxuICAgIHJlZHVjZXJzOlxuICAgICAgfCBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PlxuICAgICAgfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55Pj4sXG4gICAgY29uZmlnOiBSb290U3RvcmVDb25maWc8YW55LCBhbnk+ID0ge31cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZVJvb3RNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFN0b3JlUm9vdE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IF9JTklUSUFMX1NUQVRFLCB1c2VWYWx1ZTogY29uZmlnLmluaXRpYWxTdGF0ZSB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogSU5JVElBTF9TVEFURSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfaW5pdGlhbFN0YXRlRmFjdG9yeSxcbiAgICAgICAgICBkZXBzOiBbX0lOSVRJQUxfU1RBVEVdLFxuICAgICAgICB9LFxuICAgICAgICB7IHByb3ZpZGU6IF9JTklUSUFMX1JFRFVDRVJTLCB1c2VWYWx1ZTogcmVkdWNlcnMgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9TVE9SRV9SRURVQ0VSUyxcbiAgICAgICAgICB1c2VFeGlzdGluZzpcbiAgICAgICAgICAgIHJlZHVjZXJzIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4gPyByZWR1Y2VycyA6IF9JTklUSUFMX1JFRFVDRVJTLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogSU5JVElBTF9SRURVQ0VSUyxcbiAgICAgICAgICBkZXBzOiBbSW5qZWN0b3IsIF9JTklUSUFMX1JFRFVDRVJTLCBbbmV3IEluamVjdChfU1RPUkVfUkVEVUNFUlMpXV0sXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NyZWF0ZVN0b3JlUmVkdWNlcnMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBVU0VSX1BST1ZJREVEX01FVEFfUkVEVUNFUlMsXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZy5tZXRhUmVkdWNlcnMgPyBjb25maWcubWV0YVJlZHVjZXJzIDogW10sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfUkVTT0xWRURfTUVUQV9SRURVQ0VSUyxcbiAgICAgICAgICBkZXBzOiBbTUVUQV9SRURVQ0VSUywgVVNFUl9QUk9WSURFRF9NRVRBX1JFRFVDRVJTXSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfY29uY2F0TWV0YVJlZHVjZXJzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1JFRFVDRVJfRkFDVE9SWSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICA/IGNvbmZpZy5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgICAgOiBjb21iaW5lUmVkdWNlcnMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBSRURVQ0VSX0ZBQ1RPUlksXG4gICAgICAgICAgZGVwczogW19SRURVQ0VSX0ZBQ1RPUlksIF9SRVNPTFZFRF9NRVRBX1JFRFVDRVJTXSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBjcmVhdGVSZWR1Y2VyRmFjdG9yeSxcbiAgICAgICAgfSxcbiAgICAgICAgQUNUSU9OU19TVUJKRUNUX1BST1ZJREVSUyxcbiAgICAgICAgUkVEVUNFUl9NQU5BR0VSX1BST1ZJREVSUyxcbiAgICAgICAgU0NBTk5FRF9BQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLFxuICAgICAgICBTVEFURV9QUk9WSURFUlMsXG4gICAgICAgIFNUT1JFX1BST1ZJREVSUyxcbiAgICAgICAgcHJvdmlkZVJ1bnRpbWVDaGVja3MoY29uZmlnLnJ1bnRpbWVDaGVja3MpLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZvckZlYXR1cmU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAgZmVhdHVyZU5hbWU6IHN0cmluZyxcbiAgICByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxULCBWPiB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8VCwgVj4+LFxuICAgIGNvbmZpZz86IFN0b3JlQ29uZmlnPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48U3RvcmVDb25maWc8VCwgVj4+XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RvcmVGZWF0dXJlTW9kdWxlPjtcbiAgc3RhdGljIGZvckZlYXR1cmU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAgZmVhdHVyZU5hbWU6IHN0cmluZyxcbiAgICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlcjxULCBWPj4sXG4gICAgY29uZmlnPzogU3RvcmVDb25maWc8VCwgVj4gfCBJbmplY3Rpb25Ub2tlbjxTdG9yZUNvbmZpZzxULCBWPj5cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZUZlYXR1cmVNb2R1bGU+O1xuICBzdGF0aWMgZm9yRmVhdHVyZShcbiAgICBmZWF0dXJlTmFtZTogc3RyaW5nLFxuICAgIHJlZHVjZXJzOlxuICAgICAgfCBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PlxuICAgICAgfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55Pj5cbiAgICAgIHwgQWN0aW9uUmVkdWNlcjxhbnksIGFueT5cbiAgICAgIHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlcjxhbnksIGFueT4+LFxuICAgIGNvbmZpZzogU3RvcmVDb25maWc8YW55LCBhbnk+IHwgSW5qZWN0aW9uVG9rZW48U3RvcmVDb25maWc8YW55LCBhbnk+PiA9IHt9XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RvcmVGZWF0dXJlTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTdG9yZUZlYXR1cmVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9GRUFUVVJFX0NPTkZJR1MsXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNUT1JFX0ZFQVRVUkVTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZVZhbHVlOiB7XG4gICAgICAgICAgICBrZXk6IGZlYXR1cmVOYW1lLFxuICAgICAgICAgICAgcmVkdWNlckZhY3Rvcnk6XG4gICAgICAgICAgICAgICEoY29uZmlnIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4pICYmIGNvbmZpZy5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgICAgICAgID8gY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICAgICAgOiBjb21iaW5lUmVkdWNlcnMsXG4gICAgICAgICAgICBtZXRhUmVkdWNlcnM6XG4gICAgICAgICAgICAgICEoY29uZmlnIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4pICYmIGNvbmZpZy5tZXRhUmVkdWNlcnNcbiAgICAgICAgICAgICAgICA/IGNvbmZpZy5tZXRhUmVkdWNlcnNcbiAgICAgICAgICAgICAgICA6IFtdLFxuICAgICAgICAgICAgaW5pdGlhbFN0YXRlOlxuICAgICAgICAgICAgICAhKGNvbmZpZyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuKSAmJiBjb25maWcuaW5pdGlhbFN0YXRlXG4gICAgICAgICAgICAgICAgPyBjb25maWcuaW5pdGlhbFN0YXRlXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9TVE9SRV9GRUFUVVJFUyxcbiAgICAgICAgICBkZXBzOiBbSW5qZWN0b3IsIF9GRUFUVVJFX0NPTkZJR1MsIFNUT1JFX0ZFQVRVUkVTXSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfY3JlYXRlRmVhdHVyZVN0b3JlLFxuICAgICAgICB9LFxuICAgICAgICB7IHByb3ZpZGU6IF9GRUFUVVJFX1JFRFVDRVJTLCBtdWx0aTogdHJ1ZSwgdXNlVmFsdWU6IHJlZHVjZXJzIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfRkVBVFVSRV9SRURVQ0VSU19UT0tFTixcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VFeGlzdGluZzpcbiAgICAgICAgICAgIHJlZHVjZXJzIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4gPyByZWR1Y2VycyA6IF9GRUFUVVJFX1JFRFVDRVJTLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRkVBVFVSRV9SRURVQ0VSUyxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICBkZXBzOiBbXG4gICAgICAgICAgICBJbmplY3RvcixcbiAgICAgICAgICAgIF9GRUFUVVJFX1JFRFVDRVJTLFxuICAgICAgICAgICAgW25ldyBJbmplY3QoX0ZFQVRVUkVfUkVEVUNFUlNfVE9LRU4pXSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jcmVhdGVGZWF0dXJlUmVkdWNlcnMsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVTdG9yZVJlZHVjZXJzKFxuICBpbmplY3RvcjogSW5qZWN0b3IsXG4gIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PlxuKSB7XG4gIHJldHVybiByZWR1Y2VycyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuID8gaW5qZWN0b3IuZ2V0KHJlZHVjZXJzKSA6IHJlZHVjZXJzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUZlYXR1cmVTdG9yZShcbiAgaW5qZWN0b3I6IEluamVjdG9yLFxuICBjb25maWdzOiBTdG9yZUNvbmZpZzxhbnksIGFueT5bXSB8IEluamVjdGlvblRva2VuPFN0b3JlQ29uZmlnPGFueSwgYW55Pj5bXSxcbiAgZmVhdHVyZVN0b3JlczogU3RvcmVGZWF0dXJlPGFueSwgYW55PltdXG4pIHtcbiAgcmV0dXJuIGZlYXR1cmVTdG9yZXMubWFwKChmZWF0LCBpbmRleCkgPT4ge1xuICAgIGlmIChjb25maWdzW2luZGV4XSBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuKSB7XG4gICAgICBjb25zdCBjb25mID0gaW5qZWN0b3IuZ2V0KGNvbmZpZ3NbaW5kZXhdKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtleTogZmVhdC5rZXksXG4gICAgICAgIHJlZHVjZXJGYWN0b3J5OiBjb25mLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgPyBjb25mLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgOiBjb21iaW5lUmVkdWNlcnMsXG4gICAgICAgIG1ldGFSZWR1Y2VyczogY29uZi5tZXRhUmVkdWNlcnMgPyBjb25mLm1ldGFSZWR1Y2VycyA6IFtdLFxuICAgICAgICBpbml0aWFsU3RhdGU6IGNvbmYuaW5pdGlhbFN0YXRlLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZlYXQ7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUZlYXR1cmVSZWR1Y2VycyhcbiAgaW5qZWN0b3I6IEluamVjdG9yLFxuICByZWR1Y2VyQ29sbGVjdGlvbjogQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5bXVxuKSB7XG4gIGNvbnN0IHJlZHVjZXJzID0gcmVkdWNlckNvbGxlY3Rpb24ubWFwKHJlZHVjZXIgPT4ge1xuICAgIHJldHVybiByZWR1Y2VyIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4gPyBpbmplY3Rvci5nZXQocmVkdWNlcikgOiByZWR1Y2VyO1xuICB9KTtcblxuICByZXR1cm4gcmVkdWNlcnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfaW5pdGlhbFN0YXRlRmFjdG9yeShpbml0aWFsU3RhdGU6IGFueSk6IGFueSB7XG4gIGlmICh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jb25jYXRNZXRhUmVkdWNlcnMoXG4gIG1ldGFSZWR1Y2VyczogTWV0YVJlZHVjZXJbXSxcbiAgdXNlclByb3ZpZGVkTWV0YVJlZHVjZXJzOiBNZXRhUmVkdWNlcltdXG4pOiBNZXRhUmVkdWNlcltdIHtcbiAgcmV0dXJuIG1ldGFSZWR1Y2Vycy5jb25jYXQodXNlclByb3ZpZGVkTWV0YVJlZHVjZXJzKTtcbn1cbiJdfQ==