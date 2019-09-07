import * as tslib_1 from "tslib";
import { NgModule, Inject, InjectionToken, Injector, Optional, SkipSelf, } from '@angular/core';
import { combineReducers, createReducerFactory } from './utils';
import { INITIAL_STATE, INITIAL_REDUCERS, _INITIAL_REDUCERS, REDUCER_FACTORY, _REDUCER_FACTORY, STORE_FEATURES, _INITIAL_STATE, META_REDUCERS, _STORE_REDUCERS, FEATURE_REDUCERS, _FEATURE_REDUCERS, _FEATURE_REDUCERS_TOKEN, _STORE_FEATURES, _FEATURE_CONFIGS, USER_PROVIDED_META_REDUCERS, _RESOLVED_META_REDUCERS, _ROOT_STORE_GUARD, } from './tokens';
import { ACTIONS_SUBJECT_PROVIDERS, ActionsSubject } from './actions_subject';
import { REDUCER_MANAGER_PROVIDERS, ReducerManager, ReducerObservable, } from './reducer_manager';
import { SCANNED_ACTIONS_SUBJECT_PROVIDERS, ScannedActionsSubject, } from './scanned_actions_subject';
import { STATE_PROVIDERS } from './state';
import { STORE_PROVIDERS, Store } from './store';
import { provideRuntimeChecks } from './runtime_checks';
var StoreRootModule = /** @class */ (function () {
    function StoreRootModule(actions$, reducer$, scannedActions$, store, guard) {
    }
    StoreRootModule = tslib_1.__decorate([
        NgModule({}),
        tslib_1.__param(4, Optional()),
        tslib_1.__param(4, Inject(_ROOT_STORE_GUARD)),
        tslib_1.__metadata("design:paramtypes", [ActionsSubject,
            ReducerObservable,
            ScannedActionsSubject,
            Store, Object])
    ], StoreRootModule);
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
            return tslib_1.__assign({}, feature, { reducers: reducers, initialState: _initialStateFactory(feature.initialState) });
        });
        reducerManager.addFeatures(feats);
    }
    StoreFeatureModule.prototype.ngOnDestroy = function () {
        this.reducerManager.removeFeatures(this.features);
    };
    StoreFeatureModule = tslib_1.__decorate([
        NgModule({}),
        tslib_1.__param(0, Inject(_STORE_FEATURES)),
        tslib_1.__param(1, Inject(FEATURE_REDUCERS)),
        tslib_1.__metadata("design:paramtypes", [Array, Array, ReducerManager,
            StoreRootModule])
    ], StoreFeatureModule);
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
    };
    StoreModule.forFeature = function (featureName, reducers, config) {
        if (config === void 0) { config = {}; }
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
    };
    StoreModule = tslib_1.__decorate([
        NgModule({})
    ], StoreModule);
    return StoreModule;
}());
export { StoreModule };
export function _createStoreReducers(injector, reducers) {
    return reducers instanceof InjectionToken ? injector.get(reducers) : reducers;
}
export function _createFeatureStore(injector, configs, featureStores) {
    return featureStores.map(function (feat, index) {
        if (configs[index] instanceof InjectionToken) {
            var conf = injector.get(configs[index]);
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
    });
}
export function _createFeatureReducers(injector, reducerCollection) {
    var reducers = reducerCollection.map(function (reducer) {
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
export function _concatMetaReducers(metaReducers, userProvidedMetaReducers) {
    return metaReducers.concat(userProvidedMetaReducers);
}
export function _provideForRootGuard(store) {
    if (store) {
        throw new TypeError("StoreModule.forRoot() called twice. Feature modules should use StoreModule.forFeature() instead.");
    }
    return 'guarded';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvc3RvcmVfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFHTixjQUFjLEVBQ2QsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFXdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoRSxPQUFPLEVBQ0wsYUFBYSxFQUNiLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsY0FBYyxFQUNkLGFBQWEsRUFDYixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsZUFBZSxFQUNmLGdCQUFnQixFQUNoQiwyQkFBMkIsRUFDM0IsdUJBQXVCLEVBQ3ZCLGlCQUFpQixHQUNsQixNQUFNLFVBQVUsQ0FBQztBQUNsQixPQUFPLEVBQUUseUJBQXlCLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUUsT0FBTyxFQUNMLHlCQUF5QixFQUN6QixjQUFjLEVBQ2QsaUJBQWlCLEdBQ2xCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUNMLGlDQUFpQyxFQUNqQyxxQkFBcUIsR0FDdEIsTUFBTSwyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR3hEO0lBQ0UseUJBQ0UsUUFBd0IsRUFDeEIsUUFBMkIsRUFDM0IsZUFBc0MsRUFDdEMs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VUFBVSxvQkFBb0IsQ0FBQyxZQUFpQjtJQUNwRCxJQUFJLE9BQU8sWUFBWSxLQUFLLFVBQVUsRUFBRTtRQUN0QyxPQUFPLFlBQVksRUFBRSxDQUFDO0tBQ3ZCO0lBRUQsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FDakMsWUFBMkIsRUFDM0Isd0JBQXVDO0lBRXZDLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsS0FBaUI7SUFDcEQsSUFBSSxLQUFLLEVBQUU7UUFDVCxNQUFNLElBQUksU0FBUyxDQUNqQixrR0FBa0csQ0FDbkcsQ0FBQztLQUNIO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIE5nTW9kdWxlLFxuICBJbmplY3QsXG4gIE1vZHVsZVdpdGhQcm92aWRlcnMsXG4gIE9uRGVzdHJveSxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIEluamVjdG9yLFxuICBPcHRpb25hbCxcbiAgU2tpcFNlbGYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWN0aW9uLFxuICBBY3Rpb25SZWR1Y2VyLFxuICBBY3Rpb25SZWR1Y2VyTWFwLFxuICBBY3Rpb25SZWR1Y2VyRmFjdG9yeSxcbiAgU3RvcmVGZWF0dXJlLFxuICBJbml0aWFsU3RhdGUsXG4gIE1ldGFSZWR1Y2VyLFxuICBSdW50aW1lQ2hlY2tzLFxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMsIGNyZWF0ZVJlZHVjZXJGYWN0b3J5IH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge1xuICBJTklUSUFMX1NUQVRFLFxuICBJTklUSUFMX1JFRFVDRVJTLFxuICBfSU5JVElBTF9SRURVQ0VSUyxcbiAgUkVEVUNFUl9GQUNUT1JZLFxuICBfUkVEVUNFUl9GQUNUT1JZLFxuICBTVE9SRV9GRUFUVVJFUyxcbiAgX0lOSVRJQUxfU1RBVEUsXG4gIE1FVEFfUkVEVUNFUlMsXG4gIF9TVE9SRV9SRURVQ0VSUyxcbiAgRkVBVFVSRV9SRURVQ0VSUyxcbiAgX0ZFQVRVUkVfUkVEVUNFUlMsXG4gIF9GRUFUVVJFX1JFRFVDRVJTX1RPS0VOLFxuICBfU1RPUkVfRkVBVFVSRVMsXG4gIF9GRUFUVVJFX0NPTkZJR1MsXG4gIFVTRVJfUFJPVklERURfTUVUQV9SRURVQ0VSUyxcbiAgX1JFU09MVkVEX01FVEFfUkVEVUNFUlMsXG4gIF9ST09UX1NUT1JFX0dVQVJELFxufSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQgeyBBQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLCBBY3Rpb25zU3ViamVjdCB9IGZyb20gJy4vYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7XG4gIFJFRFVDRVJfTUFOQUdFUl9QUk9WSURFUlMsXG4gIFJlZHVjZXJNYW5hZ2VyLFxuICBSZWR1Y2VyT2JzZXJ2YWJsZSxcbn0gZnJvbSAnLi9yZWR1Y2VyX21hbmFnZXInO1xuaW1wb3J0IHtcbiAgU0NBTk5FRF9BQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLFxuICBTY2FubmVkQWN0aW9uc1N1YmplY3QsXG59IGZyb20gJy4vc2Nhbm5lZF9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHsgU1RBVEVfUFJPVklERVJTIH0gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBTVE9SRV9QUk9WSURFUlMsIFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBwcm92aWRlUnVudGltZUNoZWNrcyB9IGZyb20gJy4vcnVudGltZV9jaGVja3MnO1xuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU3RvcmVSb290TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgYWN0aW9ucyQ6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHJlZHVjZXIkOiBSZWR1Y2VyT2JzZXJ2YWJsZSxcbiAgICBzY2FubmVkQWN0aW9ucyQ6IFNjYW5uZWRBY3Rpb25zU3ViamVjdCxcbiAgICBzdG9yZTogU3RvcmU8YW55PixcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoX1JPT1RfU1RPUkVfR1VBUkQpXG4gICAgZ3VhcmQ6IGFueVxuICApIHt9XG59XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTdG9yZUZlYXR1cmVNb2R1bGUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KF9TVE9SRV9GRUFUVVJFUykgcHJpdmF0ZSBmZWF0dXJlczogU3RvcmVGZWF0dXJlPGFueSwgYW55PltdLFxuICAgIEBJbmplY3QoRkVBVFVSRV9SRURVQ0VSUykgcHJpdmF0ZSBmZWF0dXJlUmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8YW55PltdLFxuICAgIHByaXZhdGUgcmVkdWNlck1hbmFnZXI6IFJlZHVjZXJNYW5hZ2VyLFxuICAgIHJvb3Q6IFN0b3JlUm9vdE1vZHVsZVxuICApIHtcbiAgICBjb25zdCBmZWF0cyA9IGZlYXR1cmVzLm1hcCgoZmVhdHVyZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGZlYXR1cmVSZWR1Y2VyQ29sbGVjdGlvbiA9IGZlYXR1cmVSZWR1Y2Vycy5zaGlmdCgpO1xuICAgICAgY29uc3QgcmVkdWNlcnMgPSBmZWF0dXJlUmVkdWNlckNvbGxlY3Rpb24gLypUT0RPKCM4MjMpKi8hW2luZGV4XTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZmVhdHVyZSxcbiAgICAgICAgcmVkdWNlcnMsXG4gICAgICAgIGluaXRpYWxTdGF0ZTogX2luaXRpYWxTdGF0ZUZhY3RvcnkoZmVhdHVyZS5pbml0aWFsU3RhdGUpLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJlZHVjZXJNYW5hZ2VyLmFkZEZlYXR1cmVzKGZlYXRzKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVkdWNlck1hbmFnZXIucmVtb3ZlRmVhdHVyZXModGhpcy5mZWF0dXJlcyk7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdG9yZUNvbmZpZzxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiB7XG4gIGluaXRpYWxTdGF0ZT86IEluaXRpYWxTdGF0ZTxUPjtcbiAgcmVkdWNlckZhY3Rvcnk/OiBBY3Rpb25SZWR1Y2VyRmFjdG9yeTxULCBWPjtcbiAgbWV0YVJlZHVjZXJzPzogTWV0YVJlZHVjZXI8VCwgVj5bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb290U3RvcmVDb25maWc8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj5cbiAgZXh0ZW5kcyBTdG9yZUNvbmZpZzxULCBWPiB7XG4gIHJ1bnRpbWVDaGVja3M/OiBQYXJ0aWFsPFJ1bnRpbWVDaGVja3M+O1xufVxuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU3RvcmVNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdDxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxULCBWPiB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8VCwgVj4+LFxuICAgIGNvbmZpZz86IFJvb3RTdG9yZUNvbmZpZzxULCBWPlxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlUm9vdE1vZHVsZT47XG4gIHN0YXRpYyBmb3JSb290KFxuICAgIHJlZHVjZXJzOlxuICAgICAgfCBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PlxuICAgICAgfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55Pj4sXG4gICAgY29uZmlnOiBSb290U3RvcmVDb25maWc8YW55LCBhbnk+ID0ge31cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZVJvb3RNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFN0b3JlUm9vdE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1JPT1RfU1RPUkVfR1VBUkQsXG4gICAgICAgICAgdXNlRmFjdG9yeTogX3Byb3ZpZGVGb3JSb290R3VhcmQsXG4gICAgICAgICAgZGVwczogW1tTdG9yZSwgbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpXV0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgcHJvdmlkZTogX0lOSVRJQUxfU1RBVEUsIHVzZVZhbHVlOiBjb25maWcuaW5pdGlhbFN0YXRlIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBJTklUSUFMX1NUQVRFLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9pbml0aWFsU3RhdGVGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtfSU5JVElBTF9TVEFURV0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgcHJvdmlkZTogX0lOSVRJQUxfUkVEVUNFUlMsIHVzZVZhbHVlOiByZWR1Y2VycyB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1NUT1JFX1JFRFVDRVJTLFxuICAgICAgICAgIHVzZUV4aXN0aW5nOlxuICAgICAgICAgICAgcmVkdWNlcnMgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbiA/IHJlZHVjZXJzIDogX0lOSVRJQUxfUkVEVUNFUlMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBJTklUSUFMX1JFRFVDRVJTLFxuICAgICAgICAgIGRlcHM6IFtJbmplY3RvciwgX0lOSVRJQUxfUkVEVUNFUlMsIFtuZXcgSW5qZWN0KF9TVE9SRV9SRURVQ0VSUyldXSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfY3JlYXRlU3RvcmVSZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFVTRVJfUFJPVklERURfTUVUQV9SRURVQ0VSUyxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLm1ldGFSZWR1Y2VycyA/IGNvbmZpZy5tZXRhUmVkdWNlcnMgOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9SRVNPTFZFRF9NRVRBX1JFRFVDRVJTLFxuICAgICAgICAgIGRlcHM6IFtNRVRBX1JFRFVDRVJTLCBVU0VSX1BST1ZJREVEX01FVEFfUkVEVUNFUlNdLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jb25jYXRNZXRhUmVkdWNlcnMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfUkVEVUNFUl9GQUNUT1JZLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICAgID8gY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICA6IGNvbWJpbmVSZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFJFRFVDRVJfRkFDVE9SWSxcbiAgICAgICAgICBkZXBzOiBbX1JFRFVDRVJfRkFDVE9SWSwgX1JFU09MVkVEX01FVEFfUkVEVUNFUlNdLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZVJlZHVjZXJGYWN0b3J5LFxuICAgICAgICB9LFxuICAgICAgICBBQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLFxuICAgICAgICBSRURVQ0VSX01BTkFHRVJfUFJPVklERVJTLFxuICAgICAgICBTQ0FOTkVEX0FDVElPTlNfU1VCSkVDVF9QUk9WSURFUlMsXG4gICAgICAgIFNUQVRFX1BST1ZJREVSUyxcbiAgICAgICAgU1RPUkVfUFJPVklERVJTLFxuICAgICAgICBwcm92aWRlUnVudGltZUNoZWNrcyhjb25maWcucnVudGltZUNoZWNrcyksXG4gICAgICBdLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZm9yRmVhdHVyZTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICBmZWF0dXJlTmFtZTogc3RyaW5nLFxuICAgIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlck1hcDxULCBWPj4sXG4gICAgY29uZmlnPzogU3RvcmVDb25maWc8VCwgVj4gfCBJbmplY3Rpb25Ub2tlbjxTdG9yZUNvbmZpZzxULCBWPj5cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZUZlYXR1cmVNb2R1bGU+O1xuICBzdGF0aWMgZm9yRmVhdHVyZTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICBmZWF0dXJlTmFtZTogc3RyaW5nLFxuICAgIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8VCwgVj4gfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyPFQsIFY+PixcbiAgICBjb25maWc/OiBTdG9yZUNvbmZpZzxULCBWPiB8IEluamVjdGlvblRva2VuPFN0b3JlQ29uZmlnPFQsIFY+PlxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlRmVhdHVyZU1vZHVsZT47XG4gIHN0YXRpYyBmb3JGZWF0dXJlKFxuICAgIGZlYXR1cmVOYW1lOiBzdHJpbmcsXG4gICAgcmVkdWNlcnM6XG4gICAgICB8IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+XG4gICAgICB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+PlxuICAgICAgfCBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PlxuICAgICAgfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyPGFueSwgYW55Pj4sXG4gICAgY29uZmlnOiBTdG9yZUNvbmZpZzxhbnksIGFueT4gfCBJbmplY3Rpb25Ub2tlbjxTdG9yZUNvbmZpZzxhbnksIGFueT4+ID0ge31cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZUZlYXR1cmVNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFN0b3JlRmVhdHVyZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX0ZFQVRVUkVfQ09ORklHUyxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU1RPUkVfRkVBVFVSRVMsXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgICAgIGtleTogZmVhdHVyZU5hbWUsXG4gICAgICAgICAgICByZWR1Y2VyRmFjdG9yeTpcbiAgICAgICAgICAgICAgIShjb25maWcgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbikgJiYgY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICAgICAgPyBjb25maWcucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICAgICAgICA6IGNvbWJpbmVSZWR1Y2VycyxcbiAgICAgICAgICAgIG1ldGFSZWR1Y2VyczpcbiAgICAgICAgICAgICAgIShjb25maWcgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbikgJiYgY29uZmlnLm1ldGFSZWR1Y2Vyc1xuICAgICAgICAgICAgICAgID8gY29uZmlnLm1ldGFSZWR1Y2Vyc1xuICAgICAgICAgICAgICAgIDogW10sXG4gICAgICAgICAgICBpbml0aWFsU3RhdGU6XG4gICAgICAgICAgICAgICEoY29uZmlnIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4pICYmIGNvbmZpZy5pbml0aWFsU3RhdGVcbiAgICAgICAgICAgICAgICA/IGNvbmZpZy5pbml0aWFsU3RhdGVcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1NUT1JFX0ZFQVRVUkVTLFxuICAgICAgICAgIGRlcHM6IFtJbmplY3RvciwgX0ZFQVRVUkVfQ09ORklHUywgU1RPUkVfRkVBVFVSRVNdLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jcmVhdGVGZWF0dXJlU3RvcmUsXG4gICAgICAgIH0sXG4gICAgICAgIHsgcHJvdmlkZTogX0ZFQVRVUkVfUkVEVUNFUlMsIG11bHRpOiB0cnVlLCB1c2VWYWx1ZTogcmVkdWNlcnMgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9GRUFUVVJFX1JFRFVDRVJTX1RPS0VOLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZUV4aXN0aW5nOlxuICAgICAgICAgICAgcmVkdWNlcnMgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbiA/IHJlZHVjZXJzIDogX0ZFQVRVUkVfUkVEVUNFUlMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBGRUFUVVJFX1JFRFVDRVJTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIGRlcHM6IFtcbiAgICAgICAgICAgIEluamVjdG9yLFxuICAgICAgICAgICAgX0ZFQVRVUkVfUkVEVUNFUlMsXG4gICAgICAgICAgICBbbmV3IEluamVjdChfRkVBVFVSRV9SRURVQ0VSU19UT0tFTildLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NyZWF0ZUZlYXR1cmVSZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZVN0b3JlUmVkdWNlcnMoXG4gIGluamVjdG9yOiBJbmplY3RvcixcbiAgcmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+XG4pIHtcbiAgcmV0dXJuIHJlZHVjZXJzIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4gPyBpbmplY3Rvci5nZXQocmVkdWNlcnMpIDogcmVkdWNlcnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlRmVhdHVyZVN0b3JlKFxuICBpbmplY3RvcjogSW5qZWN0b3IsXG4gIGNvbmZpZ3M6IFN0b3JlQ29uZmlnPGFueSwgYW55PltdIHwgSW5qZWN0aW9uVG9rZW48U3RvcmVDb25maWc8YW55LCBhbnk+PltdLFxuICBmZWF0dXJlU3RvcmVzOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+W11cbikge1xuICByZXR1cm4gZmVhdHVyZVN0b3Jlcy5tYXAoKGZlYXQsIGluZGV4KSA9PiB7XG4gICAgaWYgKGNvbmZpZ3NbaW5kZXhdIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4pIHtcbiAgICAgIGNvbnN0IGNvbmYgPSBpbmplY3Rvci5nZXQoY29uZmlnc1tpbmRleF0pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5OiBmZWF0LmtleSxcbiAgICAgICAgcmVkdWNlckZhY3Rvcnk6IGNvbmYucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICA/IGNvbmYucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICA6IGNvbWJpbmVSZWR1Y2VycyxcbiAgICAgICAgbWV0YVJlZHVjZXJzOiBjb25mLm1ldGFSZWR1Y2VycyA/IGNvbmYubWV0YVJlZHVjZXJzIDogW10sXG4gICAgICAgIGluaXRpYWxTdGF0ZTogY29uZi5pbml0aWFsU3RhdGUsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZmVhdDtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlRmVhdHVyZVJlZHVjZXJzKFxuICBpbmplY3RvcjogSW5qZWN0b3IsXG4gIHJlZHVjZXJDb2xsZWN0aW9uOiBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PltdXG4pIHtcbiAgY29uc3QgcmVkdWNlcnMgPSByZWR1Y2VyQ29sbGVjdGlvbi5tYXAocmVkdWNlciA9PiB7XG4gICAgcmV0dXJuIHJlZHVjZXIgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbiA/IGluamVjdG9yLmdldChyZWR1Y2VyKSA6IHJlZHVjZXI7XG4gIH0pO1xuXG4gIHJldHVybiByZWR1Y2Vycztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9pbml0aWFsU3RhdGVGYWN0b3J5KGluaXRpYWxTdGF0ZTogYW55KTogYW55IHtcbiAgaWYgKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaW5pdGlhbFN0YXRlKCk7XG4gIH1cblxuICByZXR1cm4gaW5pdGlhbFN0YXRlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NvbmNhdE1ldGFSZWR1Y2VycyhcbiAgbWV0YVJlZHVjZXJzOiBNZXRhUmVkdWNlcltdLFxuICB1c2VyUHJvdmlkZWRNZXRhUmVkdWNlcnM6IE1ldGFSZWR1Y2VyW11cbik6IE1ldGFSZWR1Y2VyW10ge1xuICByZXR1cm4gbWV0YVJlZHVjZXJzLmNvbmNhdCh1c2VyUHJvdmlkZWRNZXRhUmVkdWNlcnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX3Byb3ZpZGVGb3JSb290R3VhcmQoc3RvcmU6IFN0b3JlPGFueT4pOiBhbnkge1xuICBpZiAoc3RvcmUpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgYFN0b3JlTW9kdWxlLmZvclJvb3QoKSBjYWxsZWQgdHdpY2UuIEZlYXR1cmUgbW9kdWxlcyBzaG91bGQgdXNlIFN0b3JlTW9kdWxlLmZvckZlYXR1cmUoKSBpbnN0ZWFkLmBcbiAgICApO1xuICB9XG4gIHJldHVybiAnZ3VhcmRlZCc7XG59XG4iXX0=