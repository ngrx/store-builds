var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { NgModule, Inject, InjectionToken, Injector, } from '@angular/core';
import { combineReducers, createReducerFactory } from './utils';
import { INITIAL_STATE, INITIAL_REDUCERS, _INITIAL_REDUCERS, REDUCER_FACTORY, _REDUCER_FACTORY, STORE_FEATURES, _INITIAL_STATE, META_REDUCERS, _STORE_REDUCERS, FEATURE_REDUCERS, _FEATURE_REDUCERS, _FEATURE_REDUCERS_TOKEN, } from './tokens';
import { ACTIONS_SUBJECT_PROVIDERS, ActionsSubject } from './actions_subject';
import { REDUCER_MANAGER_PROVIDERS, ReducerManager, ReducerObservable, } from './reducer_manager';
import { SCANNED_ACTIONS_SUBJECT_PROVIDERS, ScannedActionsSubject, } from './scanned_actions_subject';
import { STATE_PROVIDERS } from './state';
import { STORE_PROVIDERS, Store } from './store';
var StoreRootModule = /** @class */ (function () {
    function StoreRootModule(actions$, reducer$, scannedActions$, store) {
    }
    StoreRootModule.decorators = [
        { type: NgModule, args: [{},] }
    ];
    /** @nocollapse */
    StoreRootModule.ctorParameters = function () { return [
        { type: ActionsSubject },
        { type: ReducerObservable },
        { type: ScannedActionsSubject },
        { type: Store }
    ]; };
    return StoreRootModule;
}());
export { StoreRootModule };
var StoreFeatureModule = /** @class */ (function () {
    function StoreFeatureModule(features, featureReducers, reducerManager, root) {
        this.features = features;
        this.featureReducers = featureReducers;
        this.reducerManager = reducerManager;
        var feats = features.map(function (feature, index) {
            var featureReducerCollection = featureReducers.shift();
            var reducers = featureReducerCollection /*TODO(#823)*/[index];
            return __assign({}, feature, { reducers: reducers, initialState: _initialStateFactory(feature.initialState) });
        });
        reducerManager.addFeatures(feats);
    }
    StoreFeatureModule.prototype.ngOnDestroy = function () {
        this.reducerManager.removeFeatures(this.features);
    };
    StoreFeatureModule.decorators = [
        { type: NgModule, args: [{},] }
    ];
    /** @nocollapse */
    StoreFeatureModule.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: Inject, args: [STORE_FEATURES,] }] },
        { type: Array, decorators: [{ type: Inject, args: [FEATURE_REDUCERS,] }] },
        { type: ReducerManager },
        { type: StoreRootModule }
    ]; };
    return StoreFeatureModule;
}());
export { StoreFeatureModule };
var StoreModule = /** @class */ (function () {
    function StoreModule() {
    }
    StoreModule.forRoot = function (reducers, config) {
        if (config === void 0) { config = {}; }
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
    };
    StoreModule.forFeature = function (featureName, reducers, config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: StoreFeatureModule,
            providers: [
                {
                    provide: STORE_FEATURES,
                    multi: true,
                    useValue: {
                        key: featureName,
                        reducerFactory: config.reducerFactory
                            ? config.reducerFactory
                            : combineReducers,
                        metaReducers: config.metaReducers ? config.metaReducers : [],
                        initialState: config.initialState,
                    },
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
    };
    StoreModule.decorators = [
        { type: NgModule, args: [{},] }
    ];
    return StoreModule;
}());
export { StoreModule };
export function _createStoreReducers(injector, reducers, tokenReducers) {
    return reducers instanceof InjectionToken ? injector.get(reducers) : reducers;
}
export function _createFeatureReducers(injector, reducerCollection, tokenReducerCollection) {
    var reducers = reducerCollection.map(function (reducer, index) {
        return reducer instanceof InjectionToken ? injector.get(reducer) : reducer;
    });
    return reducers;
}
export function _initialStateFactory(initialState) {
    if (typeof initialState === 'function') {
        return initialState();
    }
    return initialState;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvc3RvcmVfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBTyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBR04sY0FBYyxFQUNkLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQVV2QixPQUFPLEVBQVcsZUFBZSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3pFLE9BQU8sRUFDTCxhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxjQUFjLEVBQ2QsYUFBYSxFQUNiLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLHVCQUF1QixHQUN4QixNQUFNLFVBQVUsQ0FBQztBQUNsQixPQUFPLEVBQUUseUJBQXlCLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUUsT0FBTyxFQUNMLHlCQUF5QixFQUN6QixjQUFjLEVBQ2QsaUJBQWlCLEdBQ2xCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUNMLGlDQUFpQyxFQUNqQyxxQkFBcUIsR0FDdEIsTUFBTSwyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRWpEO0lBRUUseUJBQ0UsUUFBd0IsRUFDeEIsUUFBMkIsRUFDM0IsZUFBc0MsRUFDdEMsS0FBaUI7SUFDaEIsQ0FBQzs7Z0JBUEwsUUFBUSxTQUFDLEVBQUU7Ozs7Z0JBYndCLGNBQWM7Z0JBSWhELGlCQUFpQjtnQkFJakIscUJBQXFCO2dCQUdHLEtBQUs7O0lBVS9CLHNCQUFDO0NBQUEsQUFSRCxJQVFD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QUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUNoRixDQUFDO0FBRUQsTUFBTSxpQ0FDSixRQUFrQixFQUNsQixpQkFBK0MsRUFDL0Msc0JBQW9EO0lBRXBELElBQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU8sRUFBRSxLQUFLO1FBQ3BELE9BQU8sT0FBTyxZQUFZLGNBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQzdFLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVELE1BQU0sK0JBQStCLFlBQWlCO0lBQ3BELElBQUksT0FBTyxZQUFZLEtBQUssVUFBVSxFQUFFO1FBQ3RDLE9BQU8sWUFBWSxFQUFFLENBQUM7S0FDdkI7SUFFRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgTmdNb2R1bGUsXG4gIEluamVjdCxcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcbiAgT25EZXN0cm95LFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5qZWN0b3IsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWN0aW9uLFxuICBBY3Rpb25SZWR1Y2VyLFxuICBBY3Rpb25SZWR1Y2VyTWFwLFxuICBBY3Rpb25SZWR1Y2VyRmFjdG9yeSxcbiAgU3RvcmVGZWF0dXJlLFxuICBJbml0aWFsU3RhdGUsXG4gIE1ldGFSZWR1Y2VyLFxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBjb21wb3NlLCBjb21iaW5lUmVkdWNlcnMsIGNyZWF0ZVJlZHVjZXJGYWN0b3J5IH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge1xuICBJTklUSUFMX1NUQVRFLFxuICBJTklUSUFMX1JFRFVDRVJTLFxuICBfSU5JVElBTF9SRURVQ0VSUyxcbiAgUkVEVUNFUl9GQUNUT1JZLFxuICBfUkVEVUNFUl9GQUNUT1JZLFxuICBTVE9SRV9GRUFUVVJFUyxcbiAgX0lOSVRJQUxfU1RBVEUsXG4gIE1FVEFfUkVEVUNFUlMsXG4gIF9TVE9SRV9SRURVQ0VSUyxcbiAgRkVBVFVSRV9SRURVQ0VSUyxcbiAgX0ZFQVRVUkVfUkVEVUNFUlMsXG4gIF9GRUFUVVJFX1JFRFVDRVJTX1RPS0VOLFxufSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQgeyBBQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLCBBY3Rpb25zU3ViamVjdCB9IGZyb20gJy4vYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7XG4gIFJFRFVDRVJfTUFOQUdFUl9QUk9WSURFUlMsXG4gIFJlZHVjZXJNYW5hZ2VyLFxuICBSZWR1Y2VyT2JzZXJ2YWJsZSxcbn0gZnJvbSAnLi9yZWR1Y2VyX21hbmFnZXInO1xuaW1wb3J0IHtcbiAgU0NBTk5FRF9BQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLFxuICBTY2FubmVkQWN0aW9uc1N1YmplY3QsXG59IGZyb20gJy4vc2Nhbm5lZF9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHsgU1RBVEVfUFJPVklERVJTIH0gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBTVE9SRV9QUk9WSURFUlMsIFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTdG9yZVJvb3RNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBhY3Rpb25zJDogQWN0aW9uc1N1YmplY3QsXG4gICAgcmVkdWNlciQ6IFJlZHVjZXJPYnNlcnZhYmxlLFxuICAgIHNjYW5uZWRBY3Rpb25zJDogU2Nhbm5lZEFjdGlvbnNTdWJqZWN0LFxuICAgIHN0b3JlOiBTdG9yZTxhbnk+XG4gICkge31cbn1cblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFN0b3JlRmVhdHVyZU1vZHVsZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoU1RPUkVfRkVBVFVSRVMpIHByaXZhdGUgZmVhdHVyZXM6IFN0b3JlRmVhdHVyZTxhbnksIGFueT5bXSxcbiAgICBASW5qZWN0KEZFQVRVUkVfUkVEVUNFUlMpIHByaXZhdGUgZmVhdHVyZVJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPGFueT5bXSxcbiAgICBwcml2YXRlIHJlZHVjZXJNYW5hZ2VyOiBSZWR1Y2VyTWFuYWdlcixcbiAgICByb290OiBTdG9yZVJvb3RNb2R1bGVcbiAgKSB7XG4gICAgY29uc3QgZmVhdHMgPSBmZWF0dXJlcy5tYXAoKGZlYXR1cmUsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBmZWF0dXJlUmVkdWNlckNvbGxlY3Rpb24gPSBmZWF0dXJlUmVkdWNlcnMuc2hpZnQoKTtcbiAgICAgIGNvbnN0IHJlZHVjZXJzID0gZmVhdHVyZVJlZHVjZXJDb2xsZWN0aW9uIC8qVE9ETygjODIzKSovIVtpbmRleF07XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmZlYXR1cmUsXG4gICAgICAgIHJlZHVjZXJzLFxuICAgICAgICBpbml0aWFsU3RhdGU6IF9pbml0aWFsU3RhdGVGYWN0b3J5KGZlYXR1cmUuaW5pdGlhbFN0YXRlKSxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICByZWR1Y2VyTWFuYWdlci5hZGRGZWF0dXJlcyhmZWF0cyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnJlZHVjZXJNYW5hZ2VyLnJlbW92ZUZlYXR1cmVzKHRoaXMuZmVhdHVyZXMpO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFN0b3JlQ29uZmlnPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+ID0ge1xuICBpbml0aWFsU3RhdGU/OiBJbml0aWFsU3RhdGU8VD47XG4gIHJlZHVjZXJGYWN0b3J5PzogQWN0aW9uUmVkdWNlckZhY3Rvcnk8VCwgVj47XG4gIG1ldGFSZWR1Y2Vycz86IE1ldGFSZWR1Y2VyPFQsIFY+W107XG59O1xuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU3RvcmVNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdDxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxULCBWPiB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8VCwgVj4+LFxuICAgIGNvbmZpZz86IFN0b3JlQ29uZmlnPFQsIFY+XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM7XG4gIHN0YXRpYyBmb3JSb290KFxuICAgIHJlZHVjZXJzOlxuICAgICAgfCBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PlxuICAgICAgfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55Pj4sXG4gICAgY29uZmlnOiBTdG9yZUNvbmZpZzxhbnksIGFueT4gPSB7fVxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFN0b3JlUm9vdE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IF9JTklUSUFMX1NUQVRFLCB1c2VWYWx1ZTogY29uZmlnLmluaXRpYWxTdGF0ZSB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogSU5JVElBTF9TVEFURSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfaW5pdGlhbFN0YXRlRmFjdG9yeSxcbiAgICAgICAgICBkZXBzOiBbX0lOSVRJQUxfU1RBVEVdLFxuICAgICAgICB9LFxuICAgICAgICB7IHByb3ZpZGU6IF9JTklUSUFMX1JFRFVDRVJTLCB1c2VWYWx1ZTogcmVkdWNlcnMgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9TVE9SRV9SRURVQ0VSUyxcbiAgICAgICAgICB1c2VFeGlzdGluZzpcbiAgICAgICAgICAgIHJlZHVjZXJzIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4gPyByZWR1Y2VycyA6IF9JTklUSUFMX1JFRFVDRVJTLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogSU5JVElBTF9SRURVQ0VSUyxcbiAgICAgICAgICBkZXBzOiBbSW5qZWN0b3IsIF9JTklUSUFMX1JFRFVDRVJTLCBbbmV3IEluamVjdChfU1RPUkVfUkVEVUNFUlMpXV0sXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NyZWF0ZVN0b3JlUmVkdWNlcnMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBNRVRBX1JFRFVDRVJTLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcubWV0YVJlZHVjZXJzID8gY29uZmlnLm1ldGFSZWR1Y2VycyA6IFtdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1JFRFVDRVJfRkFDVE9SWSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICA/IGNvbmZpZy5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgICAgOiBjb21iaW5lUmVkdWNlcnMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBSRURVQ0VSX0ZBQ1RPUlksXG4gICAgICAgICAgZGVwczogW19SRURVQ0VSX0ZBQ1RPUlksIE1FVEFfUkVEVUNFUlNdLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZVJlZHVjZXJGYWN0b3J5LFxuICAgICAgICB9LFxuICAgICAgICBBQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLFxuICAgICAgICBSRURVQ0VSX01BTkFHRVJfUFJPVklERVJTLFxuICAgICAgICBTQ0FOTkVEX0FDVElPTlNfU1VCSkVDVF9QUk9WSURFUlMsXG4gICAgICAgIFNUQVRFX1BST1ZJREVSUyxcbiAgICAgICAgU1RPUkVfUFJPVklERVJTLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZvckZlYXR1cmU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAgZmVhdHVyZU5hbWU6IHN0cmluZyxcbiAgICByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxULCBWPiB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8VCwgVj4+LFxuICAgIGNvbmZpZz86IFN0b3JlQ29uZmlnPFQsIFY+XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM7XG4gIHN0YXRpYyBmb3JGZWF0dXJlPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICAgIGZlYXR1cmVOYW1lOiBzdHJpbmcsXG4gICAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxULCBWPiB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXI8VCwgVj4+LFxuICAgIGNvbmZpZz86IFN0b3JlQ29uZmlnPFQsIFY+XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM7XG4gIHN0YXRpYyBmb3JGZWF0dXJlKFxuICAgIGZlYXR1cmVOYW1lOiBzdHJpbmcsXG4gICAgcmVkdWNlcnM6XG4gICAgICB8IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+XG4gICAgICB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+PlxuICAgICAgfCBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PlxuICAgICAgfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyPGFueSwgYW55Pj4sXG4gICAgY29uZmlnOiBTdG9yZUNvbmZpZzxhbnksIGFueT4gPSB7fVxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFN0b3JlRmVhdHVyZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU1RPUkVfRkVBVFVSRVMsXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgdXNlVmFsdWU6IDxTdG9yZUZlYXR1cmU8YW55LCBhbnk+PntcbiAgICAgICAgICAgIGtleTogZmVhdHVyZU5hbWUsXG4gICAgICAgICAgICByZWR1Y2VyRmFjdG9yeTogY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICAgID8gY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICAgIDogY29tYmluZVJlZHVjZXJzLFxuICAgICAgICAgICAgbWV0YVJlZHVjZXJzOiBjb25maWcubWV0YVJlZHVjZXJzID8gY29uZmlnLm1ldGFSZWR1Y2VycyA6IFtdLFxuICAgICAgICAgICAgaW5pdGlhbFN0YXRlOiBjb25maWcuaW5pdGlhbFN0YXRlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgcHJvdmlkZTogX0ZFQVRVUkVfUkVEVUNFUlMsIG11bHRpOiB0cnVlLCB1c2VWYWx1ZTogcmVkdWNlcnMgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9GRUFUVVJFX1JFRFVDRVJTX1RPS0VOLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZUV4aXN0aW5nOlxuICAgICAgICAgICAgcmVkdWNlcnMgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbiA/IHJlZHVjZXJzIDogX0ZFQVRVUkVfUkVEVUNFUlMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBGRUFUVVJFX1JFRFVDRVJTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIGRlcHM6IFtcbiAgICAgICAgICAgIEluamVjdG9yLFxuICAgICAgICAgICAgX0ZFQVRVUkVfUkVEVUNFUlMsXG4gICAgICAgICAgICBbbmV3IEluamVjdChfRkVBVFVSRV9SRURVQ0VSU19UT0tFTildLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NyZWF0ZUZlYXR1cmVSZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZVN0b3JlUmVkdWNlcnMoXG4gIGluamVjdG9yOiBJbmplY3RvcixcbiAgcmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+LFxuICB0b2tlblJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PlxuKSB7XG4gIHJldHVybiByZWR1Y2VycyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuID8gaW5qZWN0b3IuZ2V0KHJlZHVjZXJzKSA6IHJlZHVjZXJzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUZlYXR1cmVSZWR1Y2VycyhcbiAgaW5qZWN0b3I6IEluamVjdG9yLFxuICByZWR1Y2VyQ29sbGVjdGlvbjogQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5bXSxcbiAgdG9rZW5SZWR1Y2VyQ29sbGVjdGlvbjogQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5bXVxuKSB7XG4gIGNvbnN0IHJlZHVjZXJzID0gcmVkdWNlckNvbGxlY3Rpb24ubWFwKChyZWR1Y2VyLCBpbmRleCkgPT4ge1xuICAgIHJldHVybiByZWR1Y2VyIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4gPyBpbmplY3Rvci5nZXQocmVkdWNlcikgOiByZWR1Y2VyO1xuICB9KTtcblxuICByZXR1cm4gcmVkdWNlcnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfaW5pdGlhbFN0YXRlRmFjdG9yeShpbml0aWFsU3RhdGU6IGFueSk6IGFueSB7XG4gIGlmICh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbn1cbiJdfQ==