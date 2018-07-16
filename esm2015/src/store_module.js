/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule, Inject, InjectionToken, Injector, } from '@angular/core';
import { combineReducers, createReducerFactory } from './utils';
import { INITIAL_STATE, INITIAL_REDUCERS, _INITIAL_REDUCERS, REDUCER_FACTORY, _REDUCER_FACTORY, STORE_FEATURES, _INITIAL_STATE, META_REDUCERS, _STORE_REDUCERS, FEATURE_REDUCERS, _FEATURE_REDUCERS, _FEATURE_REDUCERS_TOKEN, } from './tokens';
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
    { type: ActionsSubject, },
    { type: ReducerObservable, },
    { type: ScannedActionsSubject, },
    { type: Store, },
];
function StoreRootModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    StoreRootModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    StoreRootModule.ctorParameters;
}
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
        const /** @type {?} */ feats = features.map((feature, index) => {
            const /** @type {?} */ featureReducerCollection = featureReducers.shift();
            const /** @type {?} */ reducers = /** @type {?} */ ((featureReducerCollection))[index];
            return Object.assign({}, feature, { reducers, initialState: _initialStateFactory(feature.initialState) });
        });
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
    { type: Array, decorators: [{ type: Inject, args: [STORE_FEATURES,] },] },
    { type: Array, decorators: [{ type: Inject, args: [FEATURE_REDUCERS,] },] },
    { type: ReducerManager, },
    { type: StoreRootModule, },
];
function StoreFeatureModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    StoreFeatureModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    StoreFeatureModule.ctorParameters;
    /** @type {?} */
    StoreFeatureModule.prototype.features;
    /** @type {?} */
    StoreFeatureModule.prototype.featureReducers;
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
                    provide: STORE_FEATURES,
                    multi: true,
                    useValue: /** @type {?} */ ({
                        key: featureName,
                        reducerFactory: config.reducerFactory
                            ? config.reducerFactory
                            : combineReducers,
                        metaReducers: config.metaReducers ? config.metaReducers : [],
                        initialState: config.initialState,
                    }),
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
function StoreModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    StoreModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    StoreModule.ctorParameters;
}
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
 * @param {?} reducerCollection
 * @param {?} tokenReducerCollection
 * @return {?}
 */
export function _createFeatureReducers(injector, reducerCollection, tokenReducerCollection) {
    const /** @type {?} */ reducers = reducerCollection.map((reducer, index) => {
        return reducer instanceof InjectionToken ? injector.get(reducer) : reducer;
    });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvc3RvcmVfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFHTixjQUFjLEVBQ2QsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBVXZCLE9BQU8sRUFBVyxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDekUsT0FBTyxFQUNMLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGNBQWMsRUFDZCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsdUJBQXVCLEdBQ3hCLE1BQU0sVUFBVSxDQUFDO0FBQ2xCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RSxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLGNBQWMsRUFDZCxpQkFBaUIsR0FDbEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQ0wsaUNBQWlDLEVBQ2pDLHFCQUFxQixHQUN0QixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFHakQsTUFBTTs7Ozs7OztJQUNKLFlBQ0UsUUFBd0IsRUFDeEIsUUFBMkIsRUFDM0IsZUFBc0MsRUFDdEMsS0FBaUIsS0FDZjs7O1lBUEwsUUFBUSxTQUFDLEVBQUU7Ozs7WUFid0IsY0FBYztZQUloRCxpQkFBaUI7WUFJakIscUJBQXFCO1lBR0csS0FBSzs7Ozs7Ozs7Ozs7QUFhL0IsTUFBTTs7Ozs7OztJQUNKLFlBQ2tDLFVB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LENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDeEQsTUFBTSxDQUFDLE9BQU8sWUFBWSxjQUFjLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztLQUM1RSxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsUUFBUSxDQUFDO0NBQ2pCOzs7OztBQUVELE1BQU0sK0JBQStCLFlBQWlCO0lBQ3BELEVBQUUsQ0FBQyxDQUFDLE9BQU8sWUFBWSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3ZCO0lBRUQsTUFBTSxDQUFDLFlBQVksQ0FBQztDQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIE5nTW9kdWxlLFxuICBJbmplY3QsXG4gIE1vZHVsZVdpdGhQcm92aWRlcnMsXG4gIE9uRGVzdHJveSxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIEluamVjdG9yLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFjdGlvbixcbiAgQWN0aW9uUmVkdWNlcixcbiAgQWN0aW9uUmVkdWNlck1hcCxcbiAgQWN0aW9uUmVkdWNlckZhY3RvcnksXG4gIFN0b3JlRmVhdHVyZSxcbiAgSW5pdGlhbFN0YXRlLFxuICBNZXRhUmVkdWNlcixcbn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgY29tcG9zZSwgY29tYmluZVJlZHVjZXJzLCBjcmVhdGVSZWR1Y2VyRmFjdG9yeSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtcbiAgSU5JVElBTF9TVEFURSxcbiAgSU5JVElBTF9SRURVQ0VSUyxcbiAgX0lOSVRJQUxfUkVEVUNFUlMsXG4gIFJFRFVDRVJfRkFDVE9SWSxcbiAgX1JFRFVDRVJfRkFDVE9SWSxcbiAgU1RPUkVfRkVBVFVSRVMsXG4gIF9JTklUSUFMX1NUQVRFLFxuICBNRVRBX1JFRFVDRVJTLFxuICBfU1RPUkVfUkVEVUNFUlMsXG4gIEZFQVRVUkVfUkVEVUNFUlMsXG4gIF9GRUFUVVJFX1JFRFVDRVJTLFxuICBfRkVBVFVSRV9SRURVQ0VSU19UT0tFTixcbn0gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHsgQUNUSU9OU19TVUJKRUNUX1BST1ZJREVSUywgQWN0aW9uc1N1YmplY3QgfSBmcm9tICcuL2FjdGlvbnNfc3ViamVjdCc7XG5pbXBvcnQge1xuICBSRURVQ0VSX01BTkFHRVJfUFJPVklERVJTLFxuICBSZWR1Y2VyTWFuYWdlcixcbiAgUmVkdWNlck9ic2VydmFibGUsXG59IGZyb20gJy4vcmVkdWNlcl9tYW5hZ2VyJztcbmltcG9ydCB7XG4gIFNDQU5ORURfQUNUSU9OU19TVUJKRUNUX1BST1ZJREVSUyxcbiAgU2Nhbm5lZEFjdGlvbnNTdWJqZWN0LFxufSBmcm9tICcuL3NjYW5uZWRfYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7IFNUQVRFX1BST1ZJREVSUyB9IGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHsgU1RPUkVfUFJPVklERVJTLCBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU3RvcmVSb290TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgYWN0aW9ucyQ6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHJlZHVjZXIkOiBSZWR1Y2VyT2JzZXJ2YWJsZSxcbiAgICBzY2FubmVkQWN0aW9ucyQ6IFNjYW5uZWRBY3Rpb25zU3ViamVjdCxcbiAgICBzdG9yZTogU3RvcmU8YW55PlxuICApIHt9XG59XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTdG9yZUZlYXR1cmVNb2R1bGUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFNUT1JFX0ZFQVRVUkVTKSBwcml2YXRlIGZlYXR1cmVzOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+W10sXG4gICAgQEluamVjdChGRUFUVVJFX1JFRFVDRVJTKSBwcml2YXRlIGZlYXR1cmVSZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxhbnk+W10sXG4gICAgcHJpdmF0ZSByZWR1Y2VyTWFuYWdlcjogUmVkdWNlck1hbmFnZXIsXG4gICAgcm9vdDogU3RvcmVSb290TW9kdWxlXG4gICkge1xuICAgIGNvbnN0IGZlYXRzID0gZmVhdHVyZXMubWFwKChmZWF0dXJlLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgZmVhdHVyZVJlZHVjZXJDb2xsZWN0aW9uID0gZmVhdHVyZVJlZHVjZXJzLnNoaWZ0KCk7XG4gICAgICBjb25zdCByZWR1Y2VycyA9IGZlYXR1cmVSZWR1Y2VyQ29sbGVjdGlvbiAvKlRPRE8oIzgyMykqLyFbaW5kZXhdO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5mZWF0dXJlLFxuICAgICAgICByZWR1Y2VycyxcbiAgICAgICAgaW5pdGlhbFN0YXRlOiBfaW5pdGlhbFN0YXRlRmFjdG9yeShmZWF0dXJlLmluaXRpYWxTdGF0ZSksXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmVkdWNlck1hbmFnZXIuYWRkRmVhdHVyZXMoZmVhdHMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZWR1Y2VyTWFuYWdlci5yZW1vdmVGZWF0dXJlcyh0aGlzLmZlYXR1cmVzKTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBTdG9yZUNvbmZpZzxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiA9IHtcbiAgaW5pdGlhbFN0YXRlPzogSW5pdGlhbFN0YXRlPFQ+O1xuICByZWR1Y2VyRmFjdG9yeT86IEFjdGlvblJlZHVjZXJGYWN0b3J5PFQsIFY+O1xuICBtZXRhUmVkdWNlcnM/OiBNZXRhUmVkdWNlcjxULCBWPltdO1xufTtcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFN0b3JlTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3Q8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAgcmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8VCwgVj4gfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+PixcbiAgICBjb25maWc/OiBTdG9yZUNvbmZpZzxULCBWPlxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzO1xuICBzdGF0aWMgZm9yUm9vdChcbiAgICByZWR1Y2VyczpcbiAgICAgIHwgQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5cbiAgICAgIHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT4+LFxuICAgIGNvbmZpZzogU3RvcmVDb25maWc8YW55LCBhbnk+ID0ge31cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTdG9yZVJvb3RNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBfSU5JVElBTF9TVEFURSwgdXNlVmFsdWU6IGNvbmZpZy5pbml0aWFsU3RhdGUgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IElOSVRJQUxfU1RBVEUsXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2luaXRpYWxTdGF0ZUZhY3RvcnksXG4gICAgICAgICAgZGVwczogW19JTklUSUFMX1NUQVRFXSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBwcm92aWRlOiBfSU5JVElBTF9SRURVQ0VSUywgdXNlVmFsdWU6IHJlZHVjZXJzIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfU1RPUkVfUkVEVUNFUlMsXG4gICAgICAgICAgdXNlRXhpc3Rpbmc6XG4gICAgICAgICAgICByZWR1Y2VycyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuID8gcmVkdWNlcnMgOiBfSU5JVElBTF9SRURVQ0VSUyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IElOSVRJQUxfUkVEVUNFUlMsXG4gICAgICAgICAgZGVwczogW0luamVjdG9yLCBfSU5JVElBTF9SRURVQ0VSUywgW25ldyBJbmplY3QoX1NUT1JFX1JFRFVDRVJTKV1dLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jcmVhdGVTdG9yZVJlZHVjZXJzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTUVUQV9SRURVQ0VSUyxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLm1ldGFSZWR1Y2VycyA/IGNvbmZpZy5tZXRhUmVkdWNlcnMgOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9SRURVQ0VSX0ZBQ1RPUlksXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZy5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgICAgPyBjb25maWcucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICAgIDogY29tYmluZVJlZHVjZXJzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogUkVEVUNFUl9GQUNUT1JZLFxuICAgICAgICAgIGRlcHM6IFtfUkVEVUNFUl9GQUNUT1JZLCBNRVRBX1JFRFVDRVJTXSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBjcmVhdGVSZWR1Y2VyRmFjdG9yeSxcbiAgICAgICAgfSxcbiAgICAgICAgQUNUSU9OU19TVUJKRUNUX1BST1ZJREVSUyxcbiAgICAgICAgUkVEVUNFUl9NQU5BR0VSX1BST1ZJREVSUyxcbiAgICAgICAgU0NBTk5FRF9BQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLFxuICAgICAgICBTVEFURV9QUk9WSURFUlMsXG4gICAgICAgIFNUT1JFX1BST1ZJREVSUyxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmb3JGZWF0dXJlPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICAgIGZlYXR1cmVOYW1lOiBzdHJpbmcsXG4gICAgcmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8VCwgVj4gfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+PixcbiAgICBjb25maWc/OiBTdG9yZUNvbmZpZzxULCBWPlxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzO1xuICBzdGF0aWMgZm9yRmVhdHVyZTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICBmZWF0dXJlTmFtZTogc3RyaW5nLFxuICAgIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8VCwgVj4gfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyPFQsIFY+PixcbiAgICBjb25maWc/OiBTdG9yZUNvbmZpZzxULCBWPlxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzO1xuICBzdGF0aWMgZm9yRmVhdHVyZShcbiAgICBmZWF0dXJlTmFtZTogc3RyaW5nLFxuICAgIHJlZHVjZXJzOlxuICAgICAgfCBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PlxuICAgICAgfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55Pj5cbiAgICAgIHwgQWN0aW9uUmVkdWNlcjxhbnksIGFueT5cbiAgICAgIHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlcjxhbnksIGFueT4+LFxuICAgIGNvbmZpZzogU3RvcmVDb25maWc8YW55LCBhbnk+ID0ge31cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTdG9yZUZlYXR1cmVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNUT1JFX0ZFQVRVUkVTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZVZhbHVlOiA8U3RvcmVGZWF0dXJlPGFueSwgYW55Pj57XG4gICAgICAgICAgICBrZXk6IGZlYXR1cmVOYW1lLFxuICAgICAgICAgICAgcmVkdWNlckZhY3Rvcnk6IGNvbmZpZy5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgICAgICA/IGNvbmZpZy5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgICAgICA6IGNvbWJpbmVSZWR1Y2VycyxcbiAgICAgICAgICAgIG1ldGFSZWR1Y2VyczogY29uZmlnLm1ldGFSZWR1Y2VycyA/IGNvbmZpZy5tZXRhUmVkdWNlcnMgOiBbXSxcbiAgICAgICAgICAgIGluaXRpYWxTdGF0ZTogY29uZmlnLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7IHByb3ZpZGU6IF9GRUFUVVJFX1JFRFVDRVJTLCBtdWx0aTogdHJ1ZSwgdXNlVmFsdWU6IHJlZHVjZXJzIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfRkVBVFVSRV9SRURVQ0VSU19UT0tFTixcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VFeGlzdGluZzpcbiAgICAgICAgICAgIHJlZHVjZXJzIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4gPyByZWR1Y2VycyA6IF9GRUFUVVJFX1JFRFVDRVJTLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRkVBVFVSRV9SRURVQ0VSUyxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICBkZXBzOiBbXG4gICAgICAgICAgICBJbmplY3RvcixcbiAgICAgICAgICAgIF9GRUFUVVJFX1JFRFVDRVJTLFxuICAgICAgICAgICAgW25ldyBJbmplY3QoX0ZFQVRVUkVfUkVEVUNFUlNfVE9LRU4pXSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jcmVhdGVGZWF0dXJlUmVkdWNlcnMsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVTdG9yZVJlZHVjZXJzKFxuICBpbmplY3RvcjogSW5qZWN0b3IsXG4gIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PixcbiAgdG9rZW5SZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5cbikge1xuICByZXR1cm4gcmVkdWNlcnMgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbiA/IGluamVjdG9yLmdldChyZWR1Y2VycykgOiByZWR1Y2Vycztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVGZWF0dXJlUmVkdWNlcnMoXG4gIGluamVjdG9yOiBJbmplY3RvcixcbiAgcmVkdWNlckNvbGxlY3Rpb246IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+W10sXG4gIHRva2VuUmVkdWNlckNvbGxlY3Rpb246IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+W11cbikge1xuICBjb25zdCByZWR1Y2VycyA9IHJlZHVjZXJDb2xsZWN0aW9uLm1hcCgocmVkdWNlciwgaW5kZXgpID0+IHtcbiAgICByZXR1cm4gcmVkdWNlciBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuID8gaW5qZWN0b3IuZ2V0KHJlZHVjZXIpIDogcmVkdWNlcjtcbiAgfSk7XG5cbiAgcmV0dXJuIHJlZHVjZXJzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2luaXRpYWxTdGF0ZUZhY3RvcnkoaW5pdGlhbFN0YXRlOiBhbnkpOiBhbnkge1xuICBpZiAodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpbml0aWFsU3RhdGUoKTtcbiAgfVxuXG4gIHJldHVybiBpbml0aWFsU3RhdGU7XG59XG4iXX0=