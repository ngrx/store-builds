import { NgModule, Inject, InjectionToken } from '@angular/core';
import { combineReducers } from './utils';
import { INITIAL_STATE, INITIAL_REDUCERS, REDUCER_FACTORY, STORE_FEATURES, _INITIAL_STATE } from './tokens';
import { ACTIONS_SUBJECT_PROVIDERS, ActionsSubject } from './actions_subject';
import { REDUCER_MANAGER_PROVIDERS, ReducerManager, ReducerObservable } from './reducer_manager';
import { SCANNED_ACTIONS_SUBJECT_PROVIDERS, ScannedActionsSubject } from './scanned_actions_subject';
import { STATE_PROVIDERS } from './state';
import { STORE_PROVIDERS } from './store';
export class StoreRootModule {
    /**
     * @param {?} actions$
     * @param {?} reducer$
     * @param {?} scannedActions$
     */
    constructor(actions$, reducer$, scannedActions$) {
    }
}
StoreRootModule.decorators = [
    { type: NgModule, args: [{},] },
];
/**
 * @nocollapse
 */
StoreRootModule.ctorParameters = () => [
    { type: ActionsSubject, },
    { type: ReducerObservable, },
    { type: ScannedActionsSubject, },
];
function StoreRootModule_tsickle_Closure_declarations() {
    /** @type {?} */
    StoreRootModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    StoreRootModule.ctorParameters;
}
export class StoreFeatureModule {
    /**
     * @param {?} features
     * @param {?} reducerManager
     */
    constructor(features, reducerManager) {
        this.features = features;
        this.reducerManager = reducerManager;
        features.forEach(feature => reducerManager.addFeature(feature));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.features.forEach(feature => this.reducerManager.removeFeature(feature));
    }
}
StoreFeatureModule.decorators = [
    { type: NgModule, args: [{},] },
];
/**
 * @nocollapse
 */
StoreFeatureModule.ctorParameters = () => [
    { type: Array, decorators: [{ type: Inject, args: [STORE_FEATURES,] },] },
    { type: ReducerManager, },
];
function StoreFeatureModule_tsickle_Closure_declarations() {
    /** @type {?} */
    StoreFeatureModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    StoreFeatureModule.ctorParameters;
    /** @type {?} */
    StoreFeatureModule.prototype.features;
    /** @type {?} */
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
                { provide: INITIAL_STATE, useFactory: _initialStateFactory, deps: [_INITIAL_STATE] },
                reducers instanceof InjectionToken ? { provide: INITIAL_REDUCERS, useExisting: reducers } : { provide: INITIAL_REDUCERS, useValue: reducers },
                { provide: REDUCER_FACTORY, useValue: config.reducerFactory ? config.reducerFactory : combineReducers },
                ACTIONS_SUBJECT_PROVIDERS,
                REDUCER_MANAGER_PROVIDERS,
                SCANNED_ACTIONS_SUBJECT_PROVIDERS,
                STATE_PROVIDERS,
                STORE_PROVIDERS,
            ]
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
                    provide: STORE_FEATURES,
                    multi: true,
                    useValue: /** @type {?} */ ({
                        key: featureName,
                        reducers: reducers,
                        reducerFactory: config.reducerFactory ? config.reducerFactory : combineReducers,
                        initialState: config.initialState
                    })
                }
            ]
        };
    }
}
StoreModule.decorators = [
    { type: NgModule, args: [{},] },
];
/**
 * @nocollapse
 */
StoreModule.ctorParameters = () => [];
function StoreModule_tsickle_Closure_declarations() {
    /** @type {?} */
    StoreModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    StoreModule.ctorParameters;
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
//# sourceMappingURL=store_module.js.map