/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Inject, InjectionToken, Injector, } from '@angular/core';
import { combineReducers, createReducerFactory } from './utils';
import { INITIAL_STATE, INITIAL_REDUCERS, _INITIAL_REDUCERS, REDUCER_FACTORY, _REDUCER_FACTORY, STORE_FEATURES, _INITIAL_STATE, META_REDUCERS, _STORE_REDUCERS, FEATURE_REDUCERS, _FEATURE_REDUCERS, _FEATURE_REDUCERS_TOKEN, _STORE_FEATURES, _FEATURE_CONFIGS, } from './tokens';
import { ACTIONS_SUBJECT_PROVIDERS, ActionsSubject } from './actions_subject';
import { REDUCER_MANAGER_PROVIDERS, ReducerManager, ReducerObservable, } from './reducer_manager';
import { SCANNED_ACTIONS_SUBJECT_PROVIDERS, ScannedActionsSubject, } from './scanned_actions_subject';
import { STATE_PROVIDERS } from './state';
import { STORE_PROVIDERS, Store } from './store';
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
                    provide: META_REDUCERS,
                    useValue: config.metaReducers ? config.metaReducers : [],
                },
                {
                    provide: _REDUCER_FACTORY,
                    useValue: config.reducerFactory
                        ? config.reducerFactory
                        : combineReducers,
                },
                {
                    provide: REDUCER_FACTORY,
                    deps: [_REDUCER_FACTORY, META_REDUCERS],
                    useFactory: createReducerFactory,
                },
                ACTIONS_SUBJECT_PROVIDERS,
                REDUCER_MANAGER_PROVIDERS,
                SCANNED_ACTIONS_SUBJECT_PROVIDERS,
                STATE_PROVIDERS,
                STORE_PROVIDERS,
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
 * @param {?} tokenReducers
 * @return {?}
 */
export function _createStoreReducers(injector, reducers, tokenReducers) {
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
 * @param {?} tokenReducerCollection
 * @return {?}
 */
export function _createFeatureReducers(injector, reducerCollection, tokenReducerCollection) {
    /** @type {?} */
    const reducers = reducerCollection.map((/**
     * @param {?} reducer
     * @param {?} index
     * @return {?}
     */
    (reducer, index) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvc3RvcmVfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFHTixjQUFjLEVBQ2QsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBVXZCLE9BQU8sRUFBVyxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDekUsT0FBTyxFQUNMLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGNBQWMsRUFDZCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLGVBQWUsRUFDZixnQkFBZ0IsR0FDakIsTUFBTSxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLHlCQUF5QixFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlFLE9BQU8sRUFDTCx5QkFBeUIsRUFDekIsY0FBYyxFQUNkLGlCQUFpQixHQUNsQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFDTCxpQ0FBaUMsRUFDakMscUJBQXFCLEdBQ3RCLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUdqRCxNQUFNLE9BQU8sZUFBZTs7Ozs7OztJQUMxQixZQUNFLFFBQXdCLEVBQ3hCLFFBQTJCLEVBQzNCLGVBQXNDLEVBQ3RDLEtBQWlCLElBQ2hCLENBQUM7OztZQVBMLFFBQVEsU0FBQyxFQUFFOzs7O1lBYndCLGNBQWM7WUFJaEQsaUJBQWlCO1lBSWpCLHFCQUFxQjtZQUdHLEtBQUs7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SSxDQUFDO0lBQ2QsQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLHNCQUFzQixDQUNwQyxRQUFrQixFQUNsQixpQkFBK0MsRUFDL0Msc0JBQW9EOztVQUU5QyxRQUFRLEdBQUcsaUJBQWlCLENBQUMsR0FBRzs7Ozs7SUFBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUN4RCxPQUFPLE9BQU8sWUFBWSxjQUFjLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUM3RSxDQUFDLEVBQUM7SUFFRixPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxZQUFpQjtJQUNwRCxJQUFJLE9BQU8sWUFBWSxLQUFLLFVBQVUsRUFBRTtRQUN0QyxPQUFPLFlBQVksRUFBRSxDQUFDO0tBQ3ZCO0lBRUQsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIE5nTW9kdWxlLFxuICBJbmplY3QsXG4gIE1vZHVsZVdpdGhQcm92aWRlcnMsXG4gIE9uRGVzdHJveSxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIEluamVjdG9yLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFjdGlvbixcbiAgQWN0aW9uUmVkdWNlcixcbiAgQWN0aW9uUmVkdWNlck1hcCxcbiAgQWN0aW9uUmVkdWNlckZhY3RvcnksXG4gIFN0b3JlRmVhdHVyZSxcbiAgSW5pdGlhbFN0YXRlLFxuICBNZXRhUmVkdWNlcixcbn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgY29tcG9zZSwgY29tYmluZVJlZHVjZXJzLCBjcmVhdGVSZWR1Y2VyRmFjdG9yeSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtcbiAgSU5JVElBTF9TVEFURSxcbiAgSU5JVElBTF9SRURVQ0VSUyxcbiAgX0lOSVRJQUxfUkVEVUNFUlMsXG4gIFJFRFVDRVJfRkFDVE9SWSxcbiAgX1JFRFVDRVJfRkFDVE9SWSxcbiAgU1RPUkVfRkVBVFVSRVMsXG4gIF9JTklUSUFMX1NUQVRFLFxuICBNRVRBX1JFRFVDRVJTLFxuICBfU1RPUkVfUkVEVUNFUlMsXG4gIEZFQVRVUkVfUkVEVUNFUlMsXG4gIF9GRUFUVVJFX1JFRFVDRVJTLFxuICBfRkVBVFVSRV9SRURVQ0VSU19UT0tFTixcbiAgX1NUT1JFX0ZFQVRVUkVTLFxuICBfRkVBVFVSRV9DT05GSUdTLFxufSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQgeyBBQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLCBBY3Rpb25zU3ViamVjdCB9IGZyb20gJy4vYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7XG4gIFJFRFVDRVJfTUFOQUdFUl9QUk9WSURFUlMsXG4gIFJlZHVjZXJNYW5hZ2VyLFxuICBSZWR1Y2VyT2JzZXJ2YWJsZSxcbn0gZnJvbSAnLi9yZWR1Y2VyX21hbmFnZXInO1xuaW1wb3J0IHtcbiAgU0NBTk5FRF9BQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLFxuICBTY2FubmVkQWN0aW9uc1N1YmplY3QsXG59IGZyb20gJy4vc2Nhbm5lZF9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHsgU1RBVEVfUFJPVklERVJTIH0gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBTVE9SRV9QUk9WSURFUlMsIFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTdG9yZVJvb3RNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBhY3Rpb25zJDogQWN0aW9uc1N1YmplY3QsXG4gICAgcmVkdWNlciQ6IFJlZHVjZXJPYnNlcnZhYmxlLFxuICAgIHNjYW5uZWRBY3Rpb25zJDogU2Nhbm5lZEFjdGlvbnNTdWJqZWN0LFxuICAgIHN0b3JlOiBTdG9yZTxhbnk+XG4gICkge31cbn1cblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFN0b3JlRmVhdHVyZU1vZHVsZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoX1NUT1JFX0ZFQVRVUkVTKSBwcml2YXRlIGZlYXR1cmVzOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+W10sXG4gICAgQEluamVjdChGRUFUVVJFX1JFRFVDRVJTKSBwcml2YXRlIGZlYXR1cmVSZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxhbnk+W10sXG4gICAgcHJpdmF0ZSByZWR1Y2VyTWFuYWdlcjogUmVkdWNlck1hbmFnZXIsXG4gICAgcm9vdDogU3RvcmVSb290TW9kdWxlXG4gICkge1xuICAgIGNvbnN0IGZlYXRzID0gZmVhdHVyZXMubWFwKChmZWF0dXJlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgZmVhdHVyZVJlZHVjZXJDb2xsZWN0aW9uID0gZmVhdHVyZVJlZHVjZXJzLnNoaWZ0KCk7XG4gICAgICBjb25zdCByZWR1Y2VycyA9IGZlYXR1cmVSZWR1Y2VyQ29sbGVjdGlvbiAvKlRPRE8oIzgyMykqLyFbaW5kZXhdO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5mZWF0dXJlLFxuICAgICAgICByZWR1Y2VycyxcbiAgICAgICAgaW5pdGlhbFN0YXRlOiBfaW5pdGlhbFN0YXRlRmFjdG9yeShmZWF0dXJlLmluaXRpYWxTdGF0ZSksXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmVkdWNlck1hbmFnZXIuYWRkRmVhdHVyZXMoZmVhdHMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZWR1Y2VyTWFuYWdlci5yZW1vdmVGZWF0dXJlcyh0aGlzLmZlYXR1cmVzKTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBTdG9yZUNvbmZpZzxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiA9IHtcbiAgaW5pdGlhbFN0YXRlPzogSW5pdGlhbFN0YXRlPFQ+O1xuICByZWR1Y2VyRmFjdG9yeT86IEFjdGlvblJlZHVjZXJGYWN0b3J5PFQsIFY+O1xuICBtZXRhUmVkdWNlcnM/OiBNZXRhUmVkdWNlcjxULCBWPltdO1xufTtcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFN0b3JlTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3Q8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAgcmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8VCwgVj4gfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+PixcbiAgICBjb25maWc/OiBTdG9yZUNvbmZpZzxULCBWPlxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlUm9vdE1vZHVsZT47XG4gIHN0YXRpYyBmb3JSb290KFxuICAgIHJlZHVjZXJzOlxuICAgICAgfCBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PlxuICAgICAgfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55Pj4sXG4gICAgY29uZmlnOiBTdG9yZUNvbmZpZzxhbnksIGFueT4gPSB7fVxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlUm9vdE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU3RvcmVSb290TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogX0lOSVRJQUxfU1RBVEUsIHVzZVZhbHVlOiBjb25maWcuaW5pdGlhbFN0YXRlIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBJTklUSUFMX1NUQVRFLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9pbml0aWFsU3RhdGVGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtfSU5JVElBTF9TVEFURV0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgcHJvdmlkZTogX0lOSVRJQUxfUkVEVUNFUlMsIHVzZVZhbHVlOiByZWR1Y2VycyB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1NUT1JFX1JFRFVDRVJTLFxuICAgICAgICAgIHVzZUV4aXN0aW5nOlxuICAgICAgICAgICAgcmVkdWNlcnMgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbiA/IHJlZHVjZXJzIDogX0lOSVRJQUxfUkVEVUNFUlMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBJTklUSUFMX1JFRFVDRVJTLFxuICAgICAgICAgIGRlcHM6IFtJbmplY3RvciwgX0lOSVRJQUxfUkVEVUNFUlMsIFtuZXcgSW5qZWN0KF9TVE9SRV9SRURVQ0VSUyldXSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfY3JlYXRlU3RvcmVSZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE1FVEFfUkVEVUNFUlMsXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZy5tZXRhUmVkdWNlcnMgPyBjb25maWcubWV0YVJlZHVjZXJzIDogW10sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfUkVEVUNFUl9GQUNUT1JZLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICAgID8gY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICA6IGNvbWJpbmVSZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFJFRFVDRVJfRkFDVE9SWSxcbiAgICAgICAgICBkZXBzOiBbX1JFRFVDRVJfRkFDVE9SWSwgTUVUQV9SRURVQ0VSU10sXG4gICAgICAgICAgdXNlRmFjdG9yeTogY3JlYXRlUmVkdWNlckZhY3RvcnksXG4gICAgICAgIH0sXG4gICAgICAgIEFDVElPTlNfU1VCSkVDVF9QUk9WSURFUlMsXG4gICAgICAgIFJFRFVDRVJfTUFOQUdFUl9QUk9WSURFUlMsXG4gICAgICAgIFNDQU5ORURfQUNUSU9OU19TVUJKRUNUX1BST1ZJREVSUyxcbiAgICAgICAgU1RBVEVfUFJPVklERVJTLFxuICAgICAgICBTVE9SRV9QUk9WSURFUlMsXG4gICAgICBdLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZm9yRmVhdHVyZTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICBmZWF0dXJlTmFtZTogc3RyaW5nLFxuICAgIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlck1hcDxULCBWPj4sXG4gICAgY29uZmlnPzogU3RvcmVDb25maWc8VCwgVj4gfCBJbmplY3Rpb25Ub2tlbjxTdG9yZUNvbmZpZzxULCBWPj5cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZUZlYXR1cmVNb2R1bGU+O1xuICBzdGF0aWMgZm9yRmVhdHVyZTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICBmZWF0dXJlTmFtZTogc3RyaW5nLFxuICAgIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8VCwgVj4gfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyPFQsIFY+PixcbiAgICBjb25maWc/OiBTdG9yZUNvbmZpZzxULCBWPiB8IEluamVjdGlvblRva2VuPFN0b3JlQ29uZmlnPFQsIFY+PlxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlRmVhdHVyZU1vZHVsZT47XG4gIHN0YXRpYyBmb3JGZWF0dXJlKFxuICAgIGZlYXR1cmVOYW1lOiBzdHJpbmcsXG4gICAgcmVkdWNlcnM6XG4gICAgICB8IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+XG4gICAgICB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+PlxuICAgICAgfCBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PlxuICAgICAgfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyPGFueSwgYW55Pj4sXG4gICAgY29uZmlnOiBTdG9yZUNvbmZpZzxhbnksIGFueT4gfCBJbmplY3Rpb25Ub2tlbjxTdG9yZUNvbmZpZzxhbnksIGFueT4+ID0ge31cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZUZlYXR1cmVNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFN0b3JlRmVhdHVyZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX0ZFQVRVUkVfQ09ORklHUyxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU1RPUkVfRkVBVFVSRVMsXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgICAgIGtleTogZmVhdHVyZU5hbWUsXG4gICAgICAgICAgICByZWR1Y2VyRmFjdG9yeTpcbiAgICAgICAgICAgICAgIShjb25maWcgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbikgJiYgY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICAgICAgPyBjb25maWcucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICAgICAgICA6IGNvbWJpbmVSZWR1Y2VycyxcbiAgICAgICAgICAgIG1ldGFSZWR1Y2VyczpcbiAgICAgICAgICAgICAgIShjb25maWcgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbikgJiYgY29uZmlnLm1ldGFSZWR1Y2Vyc1xuICAgICAgICAgICAgICAgID8gY29uZmlnLm1ldGFSZWR1Y2Vyc1xuICAgICAgICAgICAgICAgIDogW10sXG4gICAgICAgICAgICBpbml0aWFsU3RhdGU6XG4gICAgICAgICAgICAgICEoY29uZmlnIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4pICYmIGNvbmZpZy5pbml0aWFsU3RhdGVcbiAgICAgICAgICAgICAgICA/IGNvbmZpZy5pbml0aWFsU3RhdGVcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1NUT1JFX0ZFQVRVUkVTLFxuICAgICAgICAgIGRlcHM6IFtJbmplY3RvciwgX0ZFQVRVUkVfQ09ORklHUywgU1RPUkVfRkVBVFVSRVNdLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jcmVhdGVGZWF0dXJlU3RvcmUsXG4gICAgICAgIH0sXG4gICAgICAgIHsgcHJvdmlkZTogX0ZFQVRVUkVfUkVEVUNFUlMsIG11bHRpOiB0cnVlLCB1c2VWYWx1ZTogcmVkdWNlcnMgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9GRUFUVVJFX1JFRFVDRVJTX1RPS0VOLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZUV4aXN0aW5nOlxuICAgICAgICAgICAgcmVkdWNlcnMgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbiA/IHJlZHVjZXJzIDogX0ZFQVRVUkVfUkVEVUNFUlMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBGRUFUVVJFX1JFRFVDRVJTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIGRlcHM6IFtcbiAgICAgICAgICAgIEluamVjdG9yLFxuICAgICAgICAgICAgX0ZFQVRVUkVfUkVEVUNFUlMsXG4gICAgICAgICAgICBbbmV3IEluamVjdChfRkVBVFVSRV9SRURVQ0VSU19UT0tFTildLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NyZWF0ZUZlYXR1cmVSZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZVN0b3JlUmVkdWNlcnMoXG4gIGluamVjdG9yOiBJbmplY3RvcixcbiAgcmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+LFxuICB0b2tlblJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PlxuKSB7XG4gIHJldHVybiByZWR1Y2VycyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuID8gaW5qZWN0b3IuZ2V0KHJlZHVjZXJzKSA6IHJlZHVjZXJzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUZlYXR1cmVTdG9yZShcbiAgaW5qZWN0b3I6IEluamVjdG9yLFxuICBjb25maWdzOiBTdG9yZUNvbmZpZzxhbnksIGFueT5bXSB8IEluamVjdGlvblRva2VuPFN0b3JlQ29uZmlnPGFueSwgYW55Pj5bXSxcbiAgZmVhdHVyZVN0b3JlczogU3RvcmVGZWF0dXJlPGFueSwgYW55PltdXG4pIHtcbiAgcmV0dXJuIGZlYXR1cmVTdG9yZXMubWFwKChmZWF0LCBpbmRleCkgPT4ge1xuICAgIGlmIChjb25maWdzW2luZGV4XSBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuKSB7XG4gICAgICBjb25zdCBjb25mID0gaW5qZWN0b3IuZ2V0KGNvbmZpZ3NbaW5kZXhdKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtleTogZmVhdC5rZXksXG4gICAgICAgIHJlZHVjZXJGYWN0b3J5OiBjb25mLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgPyBjb25mLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgOiBjb21iaW5lUmVkdWNlcnMsXG4gICAgICAgIG1ldGFSZWR1Y2VyczogY29uZi5tZXRhUmVkdWNlcnMgPyBjb25mLm1ldGFSZWR1Y2VycyA6IFtdLFxuICAgICAgICBpbml0aWFsU3RhdGU6IGNvbmYuaW5pdGlhbFN0YXRlLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZlYXQ7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUZlYXR1cmVSZWR1Y2VycyhcbiAgaW5qZWN0b3I6IEluamVjdG9yLFxuICByZWR1Y2VyQ29sbGVjdGlvbjogQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5bXSxcbiAgdG9rZW5SZWR1Y2VyQ29sbGVjdGlvbjogQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5bXVxuKSB7XG4gIGNvbnN0IHJlZHVjZXJzID0gcmVkdWNlckNvbGxlY3Rpb24ubWFwKChyZWR1Y2VyLCBpbmRleCkgPT4ge1xuICAgIHJldHVybiByZWR1Y2VyIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4gPyBpbmplY3Rvci5nZXQocmVkdWNlcikgOiByZWR1Y2VyO1xuICB9KTtcblxuICByZXR1cm4gcmVkdWNlcnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfaW5pdGlhbFN0YXRlRmFjdG9yeShpbml0aWFsU3RhdGU6IGFueSk6IGFueSB7XG4gIGlmICh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbn1cbiJdfQ==