/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/src/store_module.ts
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
    constructor(actions$, reducer$, scannedActions$, store, guard, actionCheck) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvc3RvcmVfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBR04sY0FBYyxFQUNkLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBV3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDaEUsT0FBTyxFQUNMLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGNBQWMsRUFDZCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsMkJBQTJCLEVBQzNCLHVCQUF1QixFQUN2QixpQkFBaUIsRUFFakIsNkJBQTZCLEdBQzlCLE1BQU0sVUFBVSxDQUFDO0FBQ2xCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RSxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLGNBQWMsRUFDZCxpQkFBaUIsR0FDbEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQ0wsaUNBQWlDLEVBQ2pDLHFCQUFxQixHQUN0QixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDakQsT0FBTyxFQUNMLG9CQUFvQixFQUNwQiw0QkFBNEIsR0FDN0IsTUFBTSxrQkFBa0IsQ0FBQztBQUcxQixNQUFNLE9BQU8sZUFBZTs7Ozs7Ozs7O0lBQzFCLFlBQ0UsUUFBd0IsRUFDeEIsUUFBMkIsRUFDM0IsZUFBc0MsRUFDdEMsS0FBaUIsRUFHakIsS0FBVSxFQUdWLFdBQWdCO0lBQ2YsQ0FBQzs7O1lBYkwsUUFBUSxTQUFDLEVBQUU7Ozs7WUFqQndCLGNBQWM7WUFJaEQsaUJBQWlCO1lBSWpCLHFCQUFxQjtZQUdHLEtBQUs7NENBYTFCLFFBQVEsWUFDUixNQUFNLFNBQUMsaUJBQWlCOzRDQUV4QixRQUFRLFlBQ1IsTUFBTSxTQUFDLDZCQUE2Qjs7QUFNekMsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7Ozs7SUFDN0IsWUFDbUMsUUFBa0MsRUFDakMsZUFBd0MsRUFDbEUsY0FBOEIsRUFDdEMsSUFBcUIsRUFHckIsV0FBZ0I7UUFOaUIsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDakMsb0JBQWUsR0FBZixlQUFlLENBQXlCO1FBQ2xFLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjs7Y0FNaEMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHOzs7OztRQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFOztrQkFDdEMsd0JBQXdCLEdBQUcsZUFBZSxDQUFDLEtBQUssRUFBRTs7a0JBQ2xELFFBQVEsR0FBRyxtQkFBQSx3QkFBd0IsQ0FBQyxjQUFjLEVBQUMsQ0FBQyxLQUFLLENBQUM7WUFFaEUsdUNBQ0ssT0FBTyxLQUNWLFFBQVEsRUFDUixZQUFZLEVBQUUsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUN4RDtRQUNKLENBQUMsRUFBQztRQUVGLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7O1lBM0JGLFFBQVEsU0FBQyxFQUFFOzs7O3dDQUdQLE1BQU0sU0FBQyxlQUFlO3dDQUN0QixNQUFNLFNBQUMsZ0JBQWdCO1lBbEMxQixjQUFjO1lBb0NOLGVBQWU7NENBQ3BCLFFBQVEsWUFDUixNQUFNLFNBQUMsNkJBQTZCOzs7Ozs7O0lBTHJDLHNDQUFtRTs7Ozs7SUFDbkUsNkNBQTBFOzs7OztJQUMxRSw0Q0FBc0M7Ozs7OztBQXlCMUMsaUNBSUM7OztJQUhDLG1DQUErQjs7SUFDL0IscUNBQTRDOztJQUM1QyxtQ0FBbUM7Ozs7OztBQUdyQyxxQ0FHQzs7O0lBREMsd0NBQXVDOztBQUl6QyxNQUFNLE9BQU8sV0FBVzs7Ozs7O0lBS3RCLE1BQU0sQ0FBQyxPQUFPLENBQ1osUUFFOEMsRUFDOUMsU0FBb0MsRUFBRTtRQUV0QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGVBQWU7WUFDekIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxpQkFBaUI7b0JBQzFCLFVBQVUsRUFBRSxvQkFBb0I7b0JBQ2hDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2lCQUNoRDtnQkFDRCxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxZQUFZLEVBQUU7Z0JBQzFEO29CQUNFLE9BQU8sRUFBRSxhQUFhO29CQUN0QixVQUFVLEVBQUUsb0JBQW9CO29CQUNoQyxJQUFJLEVBQUUsQ0FBQyxjQUFjLENBQUM7aUJBQ3ZCO2dCQUNELEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7Z0JBQ2xEO29CQUNFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixXQUFXLEVBQ1QsUUFBUSxZQUFZLGNBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7aUJBQ3BFO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxnQkFBZ0I7b0JBQ3pCLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7b0JBQ2xFLFVBQVUsRUFBRSxvQkFBb0I7aUJBQ2pDO2dCQUNEO29CQUNFLE9BQU8sRUFBRSwyQkFBMkI7b0JBQ3BDLFFBQVEsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFO2lCQUN6RDtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsdUJBQXVCO29CQUNoQyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsMkJBQTJCLENBQUM7b0JBQ2xELFVBQVUsRUFBRSxtQkFBbUI7aUJBQ2hDO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxnQkFBZ0I7b0JBQ3pCLFFBQVEsRUFBRSxNQUFNLENBQUMsY0FBYzt3QkFDN0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjO3dCQUN2QixDQUFDLENBQUMsZUFBZTtpQkFDcEI7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGVBQWU7b0JBQ3hCLElBQUksRUFBRSxDQUFDLGdCQUFnQixFQUFFLHVCQUF1QixDQUFDO29CQUNqRCxVQUFVLEVBQUUsb0JBQW9CO2lCQUNqQztnQkFDRCx5QkFBeUI7Z0JBQ3pCLHlCQUF5QjtnQkFDekIsaUNBQWlDO2dCQUNqQyxlQUFlO2dCQUNmLGVBQWU7Z0JBQ2Ysb0JBQW9CLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztnQkFDMUMsNEJBQTRCLEVBQUU7YUFDL0I7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Ozs7OztJQVlELE1BQU0sQ0FBQyxVQUFVLENBQ2YsV0FBbUIsRUFDbkIsUUFJMkMsRUFDM0MsU0FBd0UsRUFBRTtRQUUxRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLGdCQUFnQjtvQkFDekIsS0FBSyxFQUFFLElBQUk7b0JBQ1gsUUFBUSxFQUFFLE1BQU07aUJBQ2pCO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxjQUFjO29CQUN2QixLQUFLLEVBQUUsSUFBSTtvQkFDWCxRQUFRLEVBQUU7d0JBQ1IsR0FBRyxFQUFFLFdBQVc7d0JBQ2hCLGNBQWMsRUFDWixDQUFDLENBQUMsTUFBTSxZQUFZLGNBQWMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxjQUFjOzRCQUMxRCxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWM7NEJBQ3ZCLENBQUMsQ0FBQyxlQUFlO3dCQUNyQixZQUFZLEVBQ1YsQ0FBQyxDQUFDLE1BQU0sWUFBWSxjQUFjLENBQUMsSUFBSSxNQUFNLENBQUMsWUFBWTs0QkFDeEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZOzRCQUNyQixDQUFDLENBQUMsRUFBRTt3QkFDUixZQUFZLEVBQ1YsQ0FBQyxDQUFDLE1BQU0sWUFBWSxjQUFjLENBQUMsSUFBSSxNQUFNLENBQUMsWUFBWTs0QkFDeEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZOzRCQUNyQixDQUFDLENBQUMsU0FBUztxQkFDaEI7aUJBQ0Y7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGVBQWU7b0JBQ3hCLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLENBQUM7b0JBQ2xELFVBQVUsRUFBRSxtQkFBbUI7aUJBQ2hDO2dCQUNELEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtnQkFDL0Q7b0JBQ0UsT0FBTyxFQUFFLHVCQUF1QjtvQkFDaEMsS0FBSyxFQUFFLElBQUk7b0JBQ1gsV0FBVyxFQUNULFFBQVEsWUFBWSxjQUFjLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsaUJBQWlCO2lCQUNwRTtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixLQUFLLEVBQUUsSUFBSTtvQkFDWCxJQUFJLEVBQUU7d0JBQ0osUUFBUTt3QkFDUixpQkFBaUI7d0JBQ2pCLENBQUMsSUFBSSxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztxQkFDdEM7b0JBQ0QsVUFBVSxFQUFFLHNCQUFzQjtpQkFDbkM7Z0JBQ0QsNEJBQTRCLEVBQUU7YUFDL0I7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBM0lGLFFBQVEsU0FBQyxFQUFFOzs7Ozs7O0FBOElaLE1BQU0sVUFBVSxvQkFBb0IsQ0FDbEMsUUFBa0IsRUFDbEIsUUFBb0M7SUFFcEMsT0FBTyxRQUFRLFlBQVksY0FBYyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDaEYsQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FDakMsUUFBa0IsRUFDbEIsT0FBMEUsRUFDMUUsYUFBdUM7SUFFdkMsT0FBTyxhQUFhLENBQUMsR0FBRzs7Ozs7SUFBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUN2QyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxjQUFjLEVBQUU7O2tCQUN0QyxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsT0FBTztnQkFDTCxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7Z0JBQ2IsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO29CQUNqQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWM7b0JBQ3JCLENBQUMsQ0FBQyxlQUFlO2dCQUNuQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDeEQsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO2FBQ2hDLENBQUM7U0FDSDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsc0JBQXNCLENBQ3BDLFFBQWtCLEVBQ2xCLGlCQUErQzs7VUFFekMsUUFBUSxHQUFHLGlCQUFpQixDQUFDLEdBQUc7Ozs7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUMvQyxPQUFPLE9BQU8sWUFBWSxjQUFjLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUM3RSxDQUFDLEVBQUM7SUFFRixPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxZQUFpQjtJQUNwRCxJQUFJLE9BQU8sWUFBWSxLQUFLLFVBQVUsRUFBRTtRQUN0QyxPQUFPLFlBQVksRUFBRSxDQUFDO0tBQ3ZCO0lBRUQsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUNqQyxZQUEyQixFQUMzQix3QkFBdUM7SUFFdkMsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDdkQsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsS0FBaUI7SUFDcEQsSUFBSSxLQUFLLEVBQUU7UUFDVCxNQUFNLElBQUksU0FBUyxDQUNqQixrR0FBa0csQ0FDbkcsQ0FBQztLQUNIO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIE5nTW9kdWxlLFxuICBJbmplY3QsXG4gIE1vZHVsZVdpdGhQcm92aWRlcnMsXG4gIE9uRGVzdHJveSxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIEluamVjdG9yLFxuICBPcHRpb25hbCxcbiAgU2tpcFNlbGYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWN0aW9uLFxuICBBY3Rpb25SZWR1Y2VyLFxuICBBY3Rpb25SZWR1Y2VyTWFwLFxuICBBY3Rpb25SZWR1Y2VyRmFjdG9yeSxcbiAgU3RvcmVGZWF0dXJlLFxuICBJbml0aWFsU3RhdGUsXG4gIE1ldGFSZWR1Y2VyLFxuICBSdW50aW1lQ2hlY2tzLFxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMsIGNyZWF0ZVJlZHVjZXJGYWN0b3J5IH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge1xuICBJTklUSUFMX1NUQVRFLFxuICBJTklUSUFMX1JFRFVDRVJTLFxuICBfSU5JVElBTF9SRURVQ0VSUyxcbiAgUkVEVUNFUl9GQUNUT1JZLFxuICBfUkVEVUNFUl9GQUNUT1JZLFxuICBTVE9SRV9GRUFUVVJFUyxcbiAgX0lOSVRJQUxfU1RBVEUsXG4gIE1FVEFfUkVEVUNFUlMsXG4gIF9TVE9SRV9SRURVQ0VSUyxcbiAgRkVBVFVSRV9SRURVQ0VSUyxcbiAgX0ZFQVRVUkVfUkVEVUNFUlMsXG4gIF9GRUFUVVJFX1JFRFVDRVJTX1RPS0VOLFxuICBfU1RPUkVfRkVBVFVSRVMsXG4gIF9GRUFUVVJFX0NPTkZJR1MsXG4gIFVTRVJfUFJPVklERURfTUVUQV9SRURVQ0VSUyxcbiAgX1JFU09MVkVEX01FVEFfUkVEVUNFUlMsXG4gIF9ST09UX1NUT1JFX0dVQVJELFxuICBfQUNUSVZFX1JVTlRJTUVfQ0hFQ0tTLFxuICBfQUNUSU9OX1RZUEVfVU5JUVVFTkVTU19DSEVDSyxcbn0gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHsgQUNUSU9OU19TVUJKRUNUX1BST1ZJREVSUywgQWN0aW9uc1N1YmplY3QgfSBmcm9tICcuL2FjdGlvbnNfc3ViamVjdCc7XG5pbXBvcnQge1xuICBSRURVQ0VSX01BTkFHRVJfUFJPVklERVJTLFxuICBSZWR1Y2VyTWFuYWdlcixcbiAgUmVkdWNlck9ic2VydmFibGUsXG59IGZyb20gJy4vcmVkdWNlcl9tYW5hZ2VyJztcbmltcG9ydCB7XG4gIFNDQU5ORURfQUNUSU9OU19TVUJKRUNUX1BST1ZJREVSUyxcbiAgU2Nhbm5lZEFjdGlvbnNTdWJqZWN0LFxufSBmcm9tICcuL3NjYW5uZWRfYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7IFNUQVRFX1BST1ZJREVSUyB9IGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHsgU1RPUkVfUFJPVklERVJTLCBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IHtcbiAgcHJvdmlkZVJ1bnRpbWVDaGVja3MsXG4gIGNoZWNrRm9yQWN0aW9uVHlwZVVuaXF1ZW5lc3MsXG59IGZyb20gJy4vcnVudGltZV9jaGVja3MnO1xuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU3RvcmVSb290TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgYWN0aW9ucyQ6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHJlZHVjZXIkOiBSZWR1Y2VyT2JzZXJ2YWJsZSxcbiAgICBzY2FubmVkQWN0aW9ucyQ6IFNjYW5uZWRBY3Rpb25zU3ViamVjdCxcbiAgICBzdG9yZTogU3RvcmU8YW55PixcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoX1JPT1RfU1RPUkVfR1VBUkQpXG4gICAgZ3VhcmQ6IGFueSxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoX0FDVElPTl9UWVBFX1VOSVFVRU5FU1NfQ0hFQ0spXG4gICAgYWN0aW9uQ2hlY2s6IGFueVxuICApIHt9XG59XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTdG9yZUZlYXR1cmVNb2R1bGUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KF9TVE9SRV9GRUFUVVJFUykgcHJpdmF0ZSBmZWF0dXJlczogU3RvcmVGZWF0dXJlPGFueSwgYW55PltdLFxuICAgIEBJbmplY3QoRkVBVFVSRV9SRURVQ0VSUykgcHJpdmF0ZSBmZWF0dXJlUmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8YW55PltdLFxuICAgIHByaXZhdGUgcmVkdWNlck1hbmFnZXI6IFJlZHVjZXJNYW5hZ2VyLFxuICAgIHJvb3Q6IFN0b3JlUm9vdE1vZHVsZSxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoX0FDVElPTl9UWVBFX1VOSVFVRU5FU1NfQ0hFQ0spXG4gICAgYWN0aW9uQ2hlY2s6IGFueVxuICApIHtcbiAgICBjb25zdCBmZWF0cyA9IGZlYXR1cmVzLm1hcCgoZmVhdHVyZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGZlYXR1cmVSZWR1Y2VyQ29sbGVjdGlvbiA9IGZlYXR1cmVSZWR1Y2Vycy5zaGlmdCgpO1xuICAgICAgY29uc3QgcmVkdWNlcnMgPSBmZWF0dXJlUmVkdWNlckNvbGxlY3Rpb24gLypUT0RPKCM4MjMpKi8hW2luZGV4XTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZmVhdHVyZSxcbiAgICAgICAgcmVkdWNlcnMsXG4gICAgICAgIGluaXRpYWxTdGF0ZTogX2luaXRpYWxTdGF0ZUZhY3RvcnkoZmVhdHVyZS5pbml0aWFsU3RhdGUpLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJlZHVjZXJNYW5hZ2VyLmFkZEZlYXR1cmVzKGZlYXRzKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVkdWNlck1hbmFnZXIucmVtb3ZlRmVhdHVyZXModGhpcy5mZWF0dXJlcyk7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdG9yZUNvbmZpZzxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiB7XG4gIGluaXRpYWxTdGF0ZT86IEluaXRpYWxTdGF0ZTxUPjtcbiAgcmVkdWNlckZhY3Rvcnk/OiBBY3Rpb25SZWR1Y2VyRmFjdG9yeTxULCBWPjtcbiAgbWV0YVJlZHVjZXJzPzogTWV0YVJlZHVjZXI8VCwgVj5bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb290U3RvcmVDb25maWc8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj5cbiAgZXh0ZW5kcyBTdG9yZUNvbmZpZzxULCBWPiB7XG4gIHJ1bnRpbWVDaGVja3M/OiBQYXJ0aWFsPFJ1bnRpbWVDaGVja3M+O1xufVxuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU3RvcmVNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdDxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxULCBWPiB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8VCwgVj4+LFxuICAgIGNvbmZpZz86IFJvb3RTdG9yZUNvbmZpZzxULCBWPlxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlUm9vdE1vZHVsZT47XG4gIHN0YXRpYyBmb3JSb290KFxuICAgIHJlZHVjZXJzOlxuICAgICAgfCBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PlxuICAgICAgfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55Pj4sXG4gICAgY29uZmlnOiBSb290U3RvcmVDb25maWc8YW55LCBhbnk+ID0ge31cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZVJvb3RNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFN0b3JlUm9vdE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1JPT1RfU1RPUkVfR1VBUkQsXG4gICAgICAgICAgdXNlRmFjdG9yeTogX3Byb3ZpZGVGb3JSb290R3VhcmQsXG4gICAgICAgICAgZGVwczogW1tTdG9yZSwgbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpXV0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgcHJvdmlkZTogX0lOSVRJQUxfU1RBVEUsIHVzZVZhbHVlOiBjb25maWcuaW5pdGlhbFN0YXRlIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBJTklUSUFMX1NUQVRFLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9pbml0aWFsU3RhdGVGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtfSU5JVElBTF9TVEFURV0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgcHJvdmlkZTogX0lOSVRJQUxfUkVEVUNFUlMsIHVzZVZhbHVlOiByZWR1Y2VycyB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1NUT1JFX1JFRFVDRVJTLFxuICAgICAgICAgIHVzZUV4aXN0aW5nOlxuICAgICAgICAgICAgcmVkdWNlcnMgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbiA/IHJlZHVjZXJzIDogX0lOSVRJQUxfUkVEVUNFUlMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBJTklUSUFMX1JFRFVDRVJTLFxuICAgICAgICAgIGRlcHM6IFtJbmplY3RvciwgX0lOSVRJQUxfUkVEVUNFUlMsIFtuZXcgSW5qZWN0KF9TVE9SRV9SRURVQ0VSUyldXSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfY3JlYXRlU3RvcmVSZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFVTRVJfUFJPVklERURfTUVUQV9SRURVQ0VSUyxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLm1ldGFSZWR1Y2VycyA/IGNvbmZpZy5tZXRhUmVkdWNlcnMgOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9SRVNPTFZFRF9NRVRBX1JFRFVDRVJTLFxuICAgICAgICAgIGRlcHM6IFtNRVRBX1JFRFVDRVJTLCBVU0VSX1BST1ZJREVEX01FVEFfUkVEVUNFUlNdLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jb25jYXRNZXRhUmVkdWNlcnMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfUkVEVUNFUl9GQUNUT1JZLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICAgID8gY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICA6IGNvbWJpbmVSZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFJFRFVDRVJfRkFDVE9SWSxcbiAgICAgICAgICBkZXBzOiBbX1JFRFVDRVJfRkFDVE9SWSwgX1JFU09MVkVEX01FVEFfUkVEVUNFUlNdLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZVJlZHVjZXJGYWN0b3J5LFxuICAgICAgICB9LFxuICAgICAgICBBQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLFxuICAgICAgICBSRURVQ0VSX01BTkFHRVJfUFJPVklERVJTLFxuICAgICAgICBTQ0FOTkVEX0FDVElPTlNfU1VCSkVDVF9QUk9WSURFUlMsXG4gICAgICAgIFNUQVRFX1BST1ZJREVSUyxcbiAgICAgICAgU1RPUkVfUFJPVklERVJTLFxuICAgICAgICBwcm92aWRlUnVudGltZUNoZWNrcyhjb25maWcucnVudGltZUNoZWNrcyksXG4gICAgICAgIGNoZWNrRm9yQWN0aW9uVHlwZVVuaXF1ZW5lc3MoKSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmb3JGZWF0dXJlPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICAgIGZlYXR1cmVOYW1lOiBzdHJpbmcsXG4gICAgcmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8VCwgVj4gfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+PixcbiAgICBjb25maWc/OiBTdG9yZUNvbmZpZzxULCBWPiB8IEluamVjdGlvblRva2VuPFN0b3JlQ29uZmlnPFQsIFY+PlxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlRmVhdHVyZU1vZHVsZT47XG4gIHN0YXRpYyBmb3JGZWF0dXJlPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICAgIGZlYXR1cmVOYW1lOiBzdHJpbmcsXG4gICAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxULCBWPiB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXI8VCwgVj4+LFxuICAgIGNvbmZpZz86IFN0b3JlQ29uZmlnPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48U3RvcmVDb25maWc8VCwgVj4+XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RvcmVGZWF0dXJlTW9kdWxlPjtcbiAgc3RhdGljIGZvckZlYXR1cmUoXG4gICAgZmVhdHVyZU5hbWU6IHN0cmluZyxcbiAgICByZWR1Y2VyczpcbiAgICAgIHwgQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5cbiAgICAgIHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT4+XG4gICAgICB8IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+XG4gICAgICB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXI8YW55LCBhbnk+PixcbiAgICBjb25maWc6IFN0b3JlQ29uZmlnPGFueSwgYW55PiB8IEluamVjdGlvblRva2VuPFN0b3JlQ29uZmlnPGFueSwgYW55Pj4gPSB7fVxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlRmVhdHVyZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU3RvcmVGZWF0dXJlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfRkVBVFVSRV9DT05GSUdTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBTVE9SRV9GRUFUVVJFUyxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VWYWx1ZToge1xuICAgICAgICAgICAga2V5OiBmZWF0dXJlTmFtZSxcbiAgICAgICAgICAgIHJlZHVjZXJGYWN0b3J5OlxuICAgICAgICAgICAgICAhKGNvbmZpZyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuKSAmJiBjb25maWcucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICAgICAgICA/IGNvbmZpZy5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgICAgICAgIDogY29tYmluZVJlZHVjZXJzLFxuICAgICAgICAgICAgbWV0YVJlZHVjZXJzOlxuICAgICAgICAgICAgICAhKGNvbmZpZyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuKSAmJiBjb25maWcubWV0YVJlZHVjZXJzXG4gICAgICAgICAgICAgICAgPyBjb25maWcubWV0YVJlZHVjZXJzXG4gICAgICAgICAgICAgICAgOiBbXSxcbiAgICAgICAgICAgIGluaXRpYWxTdGF0ZTpcbiAgICAgICAgICAgICAgIShjb25maWcgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbikgJiYgY29uZmlnLmluaXRpYWxTdGF0ZVxuICAgICAgICAgICAgICAgID8gY29uZmlnLmluaXRpYWxTdGF0ZVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfU1RPUkVfRkVBVFVSRVMsXG4gICAgICAgICAgZGVwczogW0luamVjdG9yLCBfRkVBVFVSRV9DT05GSUdTLCBTVE9SRV9GRUFUVVJFU10sXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NyZWF0ZUZlYXR1cmVTdG9yZSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBwcm92aWRlOiBfRkVBVFVSRV9SRURVQ0VSUywgbXVsdGk6IHRydWUsIHVzZVZhbHVlOiByZWR1Y2VycyB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX0ZFQVRVUkVfUkVEVUNFUlNfVE9LRU4sXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgdXNlRXhpc3Rpbmc6XG4gICAgICAgICAgICByZWR1Y2VycyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuID8gcmVkdWNlcnMgOiBfRkVBVFVSRV9SRURVQ0VSUyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEZFQVRVUkVfUkVEVUNFUlMsXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgZGVwczogW1xuICAgICAgICAgICAgSW5qZWN0b3IsXG4gICAgICAgICAgICBfRkVBVFVSRV9SRURVQ0VSUyxcbiAgICAgICAgICAgIFtuZXcgSW5qZWN0KF9GRUFUVVJFX1JFRFVDRVJTX1RPS0VOKV0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfY3JlYXRlRmVhdHVyZVJlZHVjZXJzLFxuICAgICAgICB9LFxuICAgICAgICBjaGVja0ZvckFjdGlvblR5cGVVbmlxdWVuZXNzKCksXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVTdG9yZVJlZHVjZXJzKFxuICBpbmplY3RvcjogSW5qZWN0b3IsXG4gIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PlxuKSB7XG4gIHJldHVybiByZWR1Y2VycyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuID8gaW5qZWN0b3IuZ2V0KHJlZHVjZXJzKSA6IHJlZHVjZXJzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUZlYXR1cmVTdG9yZShcbiAgaW5qZWN0b3I6IEluamVjdG9yLFxuICBjb25maWdzOiBTdG9yZUNvbmZpZzxhbnksIGFueT5bXSB8IEluamVjdGlvblRva2VuPFN0b3JlQ29uZmlnPGFueSwgYW55Pj5bXSxcbiAgZmVhdHVyZVN0b3JlczogU3RvcmVGZWF0dXJlPGFueSwgYW55PltdXG4pIHtcbiAgcmV0dXJuIGZlYXR1cmVTdG9yZXMubWFwKChmZWF0LCBpbmRleCkgPT4ge1xuICAgIGlmIChjb25maWdzW2luZGV4XSBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuKSB7XG4gICAgICBjb25zdCBjb25mID0gaW5qZWN0b3IuZ2V0KGNvbmZpZ3NbaW5kZXhdKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtleTogZmVhdC5rZXksXG4gICAgICAgIHJlZHVjZXJGYWN0b3J5OiBjb25mLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgPyBjb25mLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgOiBjb21iaW5lUmVkdWNlcnMsXG4gICAgICAgIG1ldGFSZWR1Y2VyczogY29uZi5tZXRhUmVkdWNlcnMgPyBjb25mLm1ldGFSZWR1Y2VycyA6IFtdLFxuICAgICAgICBpbml0aWFsU3RhdGU6IGNvbmYuaW5pdGlhbFN0YXRlLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZlYXQ7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUZlYXR1cmVSZWR1Y2VycyhcbiAgaW5qZWN0b3I6IEluamVjdG9yLFxuICByZWR1Y2VyQ29sbGVjdGlvbjogQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5bXVxuKSB7XG4gIGNvbnN0IHJlZHVjZXJzID0gcmVkdWNlckNvbGxlY3Rpb24ubWFwKHJlZHVjZXIgPT4ge1xuICAgIHJldHVybiByZWR1Y2VyIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4gPyBpbmplY3Rvci5nZXQocmVkdWNlcikgOiByZWR1Y2VyO1xuICB9KTtcblxuICByZXR1cm4gcmVkdWNlcnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfaW5pdGlhbFN0YXRlRmFjdG9yeShpbml0aWFsU3RhdGU6IGFueSk6IGFueSB7XG4gIGlmICh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jb25jYXRNZXRhUmVkdWNlcnMoXG4gIG1ldGFSZWR1Y2VyczogTWV0YVJlZHVjZXJbXSxcbiAgdXNlclByb3ZpZGVkTWV0YVJlZHVjZXJzOiBNZXRhUmVkdWNlcltdXG4pOiBNZXRhUmVkdWNlcltdIHtcbiAgcmV0dXJuIG1ldGFSZWR1Y2Vycy5jb25jYXQodXNlclByb3ZpZGVkTWV0YVJlZHVjZXJzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9wcm92aWRlRm9yUm9vdEd1YXJkKHN0b3JlOiBTdG9yZTxhbnk+KTogYW55IHtcbiAgaWYgKHN0b3JlKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgIGBTdG9yZU1vZHVsZS5mb3JSb290KCkgY2FsbGVkIHR3aWNlLiBGZWF0dXJlIG1vZHVsZXMgc2hvdWxkIHVzZSBTdG9yZU1vZHVsZS5mb3JGZWF0dXJlKCkgaW5zdGVhZC5gXG4gICAgKTtcbiAgfVxuICByZXR1cm4gJ2d1YXJkZWQnO1xufVxuIl19