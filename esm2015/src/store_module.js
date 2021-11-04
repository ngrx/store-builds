import { NgModule, Inject, InjectionToken, Injector, Optional, SkipSelf, } from '@angular/core';
import { combineReducers, createReducerFactory } from './utils';
import { INITIAL_STATE, INITIAL_REDUCERS, _INITIAL_REDUCERS, REDUCER_FACTORY, _REDUCER_FACTORY, STORE_FEATURES, _INITIAL_STATE, META_REDUCERS, _STORE_REDUCERS, FEATURE_REDUCERS, _FEATURE_REDUCERS, _FEATURE_REDUCERS_TOKEN, _STORE_FEATURES, _FEATURE_CONFIGS, USER_PROVIDED_META_REDUCERS, _RESOLVED_META_REDUCERS, _ROOT_STORE_GUARD, _ACTION_TYPE_UNIQUENESS_CHECK, } from './tokens';
import { ACTIONS_SUBJECT_PROVIDERS } from './actions_subject';
import { REDUCER_MANAGER_PROVIDERS, } from './reducer_manager';
import { SCANNED_ACTIONS_SUBJECT_PROVIDERS, } from './scanned_actions_subject';
import { STATE_PROVIDERS } from './state';
import { STORE_PROVIDERS, Store } from './store';
import { provideRuntimeChecks, checkForActionTypeUniqueness, } from './runtime_checks';
import * as i0 from "@angular/core";
import * as i1 from "./actions_subject";
import * as i2 from "./reducer_manager";
import * as i3 from "./scanned_actions_subject";
import * as i4 from "./store";
export class StoreRootModule {
    constructor(actions$, reducer$, scannedActions$, store, guard, actionCheck) { }
}
/** @nocollapse */ StoreRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.6", ngImport: i0, type: StoreRootModule, deps: [{ token: i1.ActionsSubject }, { token: i2.ReducerObservable }, { token: i3.ScannedActionsSubject }, { token: i4.Store }, { token: _ROOT_STORE_GUARD, optional: true }, { token: _ACTION_TYPE_UNIQUENESS_CHECK, optional: true }], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ StoreRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.6", ngImport: i0, type: StoreRootModule });
/** @nocollapse */ StoreRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.6", ngImport: i0, type: StoreRootModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.6", ngImport: i0, type: StoreRootModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: i1.ActionsSubject }, { type: i2.ReducerObservable }, { type: i3.ScannedActionsSubject }, { type: i4.Store }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [_ROOT_STORE_GUARD]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [_ACTION_TYPE_UNIQUENESS_CHECK]
                }] }]; } });
export class StoreFeatureModule {
    constructor(features, featureReducers, reducerManager, root, actionCheck) {
        this.features = features;
        this.featureReducers = featureReducers;
        this.reducerManager = reducerManager;
        const feats = features.map((feature, index) => {
            const featureReducerCollection = featureReducers.shift();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const reducers = featureReducerCollection /*TODO(#823)*/[index];
            return Object.assign(Object.assign({}, feature), { reducers, initialState: _initialStateFactory(feature.initialState) });
        });
        reducerManager.addFeatures(feats);
    }
    // eslint-disable-next-line @angular-eslint/contextual-lifecycle
    ngOnDestroy() {
        this.reducerManager.removeFeatures(this.features);
    }
}
/** @nocollapse */ StoreFeatureModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.6", ngImport: i0, type: StoreFeatureModule, deps: [{ token: _STORE_FEATURES }, { token: FEATURE_REDUCERS }, { token: i2.ReducerManager }, { token: StoreRootModule }, { token: _ACTION_TYPE_UNIQUENESS_CHECK, optional: true }], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ StoreFeatureModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.6", ngImport: i0, type: StoreFeatureModule });
/** @nocollapse */ StoreFeatureModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.6", ngImport: i0, type: StoreFeatureModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.6", ngImport: i0, type: StoreFeatureModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [_STORE_FEATURES]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [FEATURE_REDUCERS]
                }] }, { type: i2.ReducerManager }, { type: StoreRootModule }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [_ACTION_TYPE_UNIQUENESS_CHECK]
                }] }]; } });
export class StoreModule {
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
    static forFeature(featureNameOrSlice, reducers, config = {}) {
        return {
            ngModule: StoreFeatureModule,
            providers: [
                {
                    provide: _FEATURE_CONFIGS,
                    multi: true,
                    useValue: featureNameOrSlice instanceof Object ? {} : config,
                },
                {
                    provide: STORE_FEATURES,
                    multi: true,
                    useValue: {
                        key: featureNameOrSlice instanceof Object
                            ? featureNameOrSlice.name
                            : featureNameOrSlice,
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
                {
                    provide: _FEATURE_REDUCERS,
                    multi: true,
                    useValue: featureNameOrSlice instanceof Object
                        ? featureNameOrSlice.reducer
                        : reducers,
                },
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
/** @nocollapse */ StoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.6", ngImport: i0, type: StoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ StoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.6", ngImport: i0, type: StoreModule });
/** @nocollapse */ StoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.6", ngImport: i0, type: StoreModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.6", ngImport: i0, type: StoreModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
export function _createStoreReducers(injector, reducers) {
    return reducers instanceof InjectionToken ? injector.get(reducers) : reducers;
}
export function _createFeatureStore(injector, configs, featureStores) {
    return featureStores.map((feat, index) => {
        if (configs[index] instanceof InjectionToken) {
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
    });
}
export function _createFeatureReducers(injector, reducerCollection) {
    const reducers = reducerCollection.map((reducer) => {
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
        throw new TypeError(`StoreModule.forRoot() called twice. Feature modules should use StoreModule.forFeature() instead.`);
    }
    return 'guarded';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvc3RvcmVfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxRQUFRLEVBQ1IsTUFBTSxFQUdOLGNBQWMsRUFDZCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQVd2QixPQUFPLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hFLE9BQU8sRUFDTCxhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxjQUFjLEVBQ2QsYUFBYSxFQUNiLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLDJCQUEyQixFQUMzQix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLDZCQUE2QixHQUM5QixNQUFNLFVBQVUsQ0FBQztBQUNsQixPQUFPLEVBQUUseUJBQXlCLEVBQWtCLE1BQU0sbUJBQW1CLENBQUM7QUFDOUUsT0FBTyxFQUNMLHlCQUF5QixHQUcxQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFDTCxpQ0FBaUMsR0FFbEMsTUFBTSwyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2pELE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsNEJBQTRCLEdBQzdCLE1BQU0sa0JBQWtCLENBQUM7Ozs7OztBQUcxQixNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUNFLFFBQXdCLEVBQ3hCLFFBQTJCLEVBQzNCLGVBQXNDLEVBQ3RDLEtBQWlCLEVBR2pC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LFVBQVUsc0JBQXNCLENBQ3BDLFFBQWtCLEVBQ2xCLGlCQUErQztJQUUvQyxNQUFNLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNqRCxPQUFPLE9BQU8sWUFBWSxjQUFjLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUM3RSxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsWUFBaUI7SUFDcEQsSUFBSSxPQUFPLFlBQVksS0FBSyxVQUFVLEVBQUU7UUFDdEMsT0FBTyxZQUFZLEVBQUUsQ0FBQztLQUN2QjtJQUVELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUM7QUFFRCxNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLFlBQTJCLEVBQzNCLHdCQUF1QztJQUV2QyxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUFDLEtBQWlCO0lBQ3BELElBQUksS0FBSyxFQUFFO1FBQ1QsTUFBTSxJQUFJLFNBQVMsQ0FDakIsa0dBQWtHLENBQ25HLENBQUM7S0FDSDtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBOZ01vZHVsZSxcbiAgSW5qZWN0LFxuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICBPbkRlc3Ryb3ksXG4gIEluamVjdGlvblRva2VuLFxuICBJbmplY3RvcixcbiAgT3B0aW9uYWwsXG4gIFNraXBTZWxmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFjdGlvbixcbiAgQWN0aW9uUmVkdWNlcixcbiAgQWN0aW9uUmVkdWNlck1hcCxcbiAgQWN0aW9uUmVkdWNlckZhY3RvcnksXG4gIFN0b3JlRmVhdHVyZSxcbiAgSW5pdGlhbFN0YXRlLFxuICBNZXRhUmVkdWNlcixcbiAgUnVudGltZUNoZWNrcyxcbn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzLCBjcmVhdGVSZWR1Y2VyRmFjdG9yeSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtcbiAgSU5JVElBTF9TVEFURSxcbiAgSU5JVElBTF9SRURVQ0VSUyxcbiAgX0lOSVRJQUxfUkVEVUNFUlMsXG4gIFJFRFVDRVJfRkFDVE9SWSxcbiAgX1JFRFVDRVJfRkFDVE9SWSxcbiAgU1RPUkVfRkVBVFVSRVMsXG4gIF9JTklUSUFMX1NUQVRFLFxuICBNRVRBX1JFRFVDRVJTLFxuICBfU1RPUkVfUkVEVUNFUlMsXG4gIEZFQVRVUkVfUkVEVUNFUlMsXG4gIF9GRUFUVVJFX1JFRFVDRVJTLFxuICBfRkVBVFVSRV9SRURVQ0VSU19UT0tFTixcbiAgX1NUT1JFX0ZFQVRVUkVTLFxuICBfRkVBVFVSRV9DT05GSUdTLFxuICBVU0VSX1BST1ZJREVEX01FVEFfUkVEVUNFUlMsXG4gIF9SRVNPTFZFRF9NRVRBX1JFRFVDRVJTLFxuICBfUk9PVF9TVE9SRV9HVUFSRCxcbiAgX0FDVElPTl9UWVBFX1VOSVFVRU5FU1NfQ0hFQ0ssXG59IGZyb20gJy4vdG9rZW5zJztcbmltcG9ydCB7IEFDVElPTlNfU1VCSkVDVF9QUk9WSURFUlMsIEFjdGlvbnNTdWJqZWN0IH0gZnJvbSAnLi9hY3Rpb25zX3N1YmplY3QnO1xuaW1wb3J0IHtcbiAgUkVEVUNFUl9NQU5BR0VSX1BST1ZJREVSUyxcbiAgUmVkdWNlck1hbmFnZXIsXG4gIFJlZHVjZXJPYnNlcnZhYmxlLFxufSBmcm9tICcuL3JlZHVjZXJfbWFuYWdlcic7XG5pbXBvcnQge1xuICBTQ0FOTkVEX0FDVElPTlNfU1VCSkVDVF9QUk9WSURFUlMsXG4gIFNjYW5uZWRBY3Rpb25zU3ViamVjdCxcbn0gZnJvbSAnLi9zY2FubmVkX2FjdGlvbnNfc3ViamVjdCc7XG5pbXBvcnQgeyBTVEFURV9QUk9WSURFUlMgfSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IFNUT1JFX1BST1ZJREVSUywgU3RvcmUgfSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCB7XG4gIHByb3ZpZGVSdW50aW1lQ2hlY2tzLFxuICBjaGVja0ZvckFjdGlvblR5cGVVbmlxdWVuZXNzLFxufSBmcm9tICcuL3J1bnRpbWVfY2hlY2tzJztcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFN0b3JlUm9vdE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGFjdGlvbnMkOiBBY3Rpb25zU3ViamVjdCxcbiAgICByZWR1Y2VyJDogUmVkdWNlck9ic2VydmFibGUsXG4gICAgc2Nhbm5lZEFjdGlvbnMkOiBTY2FubmVkQWN0aW9uc1N1YmplY3QsXG4gICAgc3RvcmU6IFN0b3JlPGFueT4sXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KF9ST09UX1NUT1JFX0dVQVJEKVxuICAgIGd1YXJkOiBhbnksXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KF9BQ1RJT05fVFlQRV9VTklRVUVORVNTX0NIRUNLKVxuICAgIGFjdGlvbkNoZWNrOiBhbnlcbiAgKSB7fVxufVxuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU3RvcmVGZWF0dXJlTW9kdWxlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChfU1RPUkVfRkVBVFVSRVMpIHByaXZhdGUgZmVhdHVyZXM6IFN0b3JlRmVhdHVyZTxhbnksIGFueT5bXSxcbiAgICBASW5qZWN0KEZFQVRVUkVfUkVEVUNFUlMpIHByaXZhdGUgZmVhdHVyZVJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPGFueT5bXSxcbiAgICBwcml2YXRlIHJlZHVjZXJNYW5hZ2VyOiBSZWR1Y2VyTWFuYWdlcixcbiAgICByb290OiBTdG9yZVJvb3RNb2R1bGUsXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KF9BQ1RJT05fVFlQRV9VTklRVUVORVNTX0NIRUNLKVxuICAgIGFjdGlvbkNoZWNrOiBhbnlcbiAgKSB7XG4gICAgY29uc3QgZmVhdHMgPSBmZWF0dXJlcy5tYXAoKGZlYXR1cmUsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBmZWF0dXJlUmVkdWNlckNvbGxlY3Rpb24gPSBmZWF0dXJlUmVkdWNlcnMuc2hpZnQoKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICBjb25zdCByZWR1Y2VycyA9IGZlYXR1cmVSZWR1Y2VyQ29sbGVjdGlvbiEgLypUT0RPKCM4MjMpKi9baW5kZXhdO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5mZWF0dXJlLFxuICAgICAgICByZWR1Y2VycyxcbiAgICAgICAgaW5pdGlhbFN0YXRlOiBfaW5pdGlhbFN0YXRlRmFjdG9yeShmZWF0dXJlLmluaXRpYWxTdGF0ZSksXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmVkdWNlck1hbmFnZXIuYWRkRmVhdHVyZXMoZmVhdHMpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9jb250ZXh0dWFsLWxpZmVjeWNsZVxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnJlZHVjZXJNYW5hZ2VyLnJlbW92ZUZlYXR1cmVzKHRoaXMuZmVhdHVyZXMpO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RvcmVDb25maWc8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4ge1xuICBpbml0aWFsU3RhdGU/OiBJbml0aWFsU3RhdGU8VD47XG4gIHJlZHVjZXJGYWN0b3J5PzogQWN0aW9uUmVkdWNlckZhY3Rvcnk8VCwgVj47XG4gIG1ldGFSZWR1Y2Vycz86IE1ldGFSZWR1Y2VyPHsgW1AgaW4ga2V5b2YgVF06IFRbUF0gfSwgVj5bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSb290U3RvcmVDb25maWc8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj5cbiAgZXh0ZW5kcyBTdG9yZUNvbmZpZzxULCBWPiB7XG4gIHJ1bnRpbWVDaGVja3M/OiBQYXJ0aWFsPFJ1bnRpbWVDaGVja3M+O1xufVxuXG4vKipcbiAqIEFuIG9iamVjdCB3aXRoIHRoZSBuYW1lIGFuZCB0aGUgcmVkdWNlciBmb3IgdGhlIGZlYXR1cmUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmVhdHVyZVNsaWNlPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+IHtcbiAgbmFtZTogc3RyaW5nO1xuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFQsIFY+O1xufVxuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU3RvcmVNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdDxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxULCBWPiB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8VCwgVj4+LFxuICAgIGNvbmZpZz86IFJvb3RTdG9yZUNvbmZpZzxULCBWPlxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlUm9vdE1vZHVsZT47XG4gIHN0YXRpYyBmb3JSb290KFxuICAgIHJlZHVjZXJzOlxuICAgICAgfCBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PlxuICAgICAgfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55Pj4sXG4gICAgY29uZmlnOiBSb290U3RvcmVDb25maWc8YW55LCBhbnk+ID0ge31cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZVJvb3RNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFN0b3JlUm9vdE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1JPT1RfU1RPUkVfR1VBUkQsXG4gICAgICAgICAgdXNlRmFjdG9yeTogX3Byb3ZpZGVGb3JSb290R3VhcmQsXG4gICAgICAgICAgZGVwczogW1tTdG9yZSwgbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpXV0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgcHJvdmlkZTogX0lOSVRJQUxfU1RBVEUsIHVzZVZhbHVlOiBjb25maWcuaW5pdGlhbFN0YXRlIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBJTklUSUFMX1NUQVRFLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9pbml0aWFsU3RhdGVGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtfSU5JVElBTF9TVEFURV0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgcHJvdmlkZTogX0lOSVRJQUxfUkVEVUNFUlMsIHVzZVZhbHVlOiByZWR1Y2VycyB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1NUT1JFX1JFRFVDRVJTLFxuICAgICAgICAgIHVzZUV4aXN0aW5nOlxuICAgICAgICAgICAgcmVkdWNlcnMgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbiA/IHJlZHVjZXJzIDogX0lOSVRJQUxfUkVEVUNFUlMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBJTklUSUFMX1JFRFVDRVJTLFxuICAgICAgICAgIGRlcHM6IFtJbmplY3RvciwgX0lOSVRJQUxfUkVEVUNFUlMsIFtuZXcgSW5qZWN0KF9TVE9SRV9SRURVQ0VSUyldXSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfY3JlYXRlU3RvcmVSZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFVTRVJfUFJPVklERURfTUVUQV9SRURVQ0VSUyxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnLm1ldGFSZWR1Y2VycyA/IGNvbmZpZy5tZXRhUmVkdWNlcnMgOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9SRVNPTFZFRF9NRVRBX1JFRFVDRVJTLFxuICAgICAgICAgIGRlcHM6IFtNRVRBX1JFRFVDRVJTLCBVU0VSX1BST1ZJREVEX01FVEFfUkVEVUNFUlNdLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jb25jYXRNZXRhUmVkdWNlcnMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfUkVEVUNFUl9GQUNUT1JZLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICAgID8gY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICA6IGNvbWJpbmVSZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFJFRFVDRVJfRkFDVE9SWSxcbiAgICAgICAgICBkZXBzOiBbX1JFRFVDRVJfRkFDVE9SWSwgX1JFU09MVkVEX01FVEFfUkVEVUNFUlNdLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZVJlZHVjZXJGYWN0b3J5LFxuICAgICAgICB9LFxuICAgICAgICBBQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTLFxuICAgICAgICBSRURVQ0VSX01BTkFHRVJfUFJPVklERVJTLFxuICAgICAgICBTQ0FOTkVEX0FDVElPTlNfU1VCSkVDVF9QUk9WSURFUlMsXG4gICAgICAgIFNUQVRFX1BST1ZJREVSUyxcbiAgICAgICAgU1RPUkVfUFJPVklERVJTLFxuICAgICAgICBwcm92aWRlUnVudGltZUNoZWNrcyhjb25maWcucnVudGltZUNoZWNrcyksXG4gICAgICAgIGNoZWNrRm9yQWN0aW9uVHlwZVVuaXF1ZW5lc3MoKSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmb3JGZWF0dXJlPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICAgIGZlYXR1cmVOYW1lOiBzdHJpbmcsXG4gICAgcmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8VCwgVj4gfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+PixcbiAgICBjb25maWc/OiBTdG9yZUNvbmZpZzxULCBWPiB8IEluamVjdGlvblRva2VuPFN0b3JlQ29uZmlnPFQsIFY+PlxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlRmVhdHVyZU1vZHVsZT47XG4gIHN0YXRpYyBmb3JGZWF0dXJlPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICAgIGZlYXR1cmVOYW1lOiBzdHJpbmcsXG4gICAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxULCBWPiB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXI8VCwgVj4+LFxuICAgIGNvbmZpZz86IFN0b3JlQ29uZmlnPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48U3RvcmVDb25maWc8VCwgVj4+XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RvcmVGZWF0dXJlTW9kdWxlPjtcbiAgc3RhdGljIGZvckZlYXR1cmU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAgc2xpY2U6IEZlYXR1cmVTbGljZTxULCBWPlxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlRmVhdHVyZU1vZHVsZT47XG4gIHN0YXRpYyBmb3JGZWF0dXJlKFxuICAgIGZlYXR1cmVOYW1lT3JTbGljZTogc3RyaW5nIHwgRmVhdHVyZVNsaWNlPGFueSwgYW55PixcbiAgICByZWR1Y2Vycz86XG4gICAgICB8IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+XG4gICAgICB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+PlxuICAgICAgfCBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PlxuICAgICAgfCBJbmplY3Rpb25Ub2tlbjxBY3Rpb25SZWR1Y2VyPGFueSwgYW55Pj4sXG4gICAgY29uZmlnOiBTdG9yZUNvbmZpZzxhbnksIGFueT4gfCBJbmplY3Rpb25Ub2tlbjxTdG9yZUNvbmZpZzxhbnksIGFueT4+ID0ge31cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZUZlYXR1cmVNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFN0b3JlRmVhdHVyZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX0ZFQVRVUkVfQ09ORklHUyxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VWYWx1ZTogZmVhdHVyZU5hbWVPclNsaWNlIGluc3RhbmNlb2YgT2JqZWN0ID8ge30gOiBjb25maWcsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBTVE9SRV9GRUFUVVJFUyxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VWYWx1ZToge1xuICAgICAgICAgICAga2V5OlxuICAgICAgICAgICAgICBmZWF0dXJlTmFtZU9yU2xpY2UgaW5zdGFuY2VvZiBPYmplY3RcbiAgICAgICAgICAgICAgICA/IGZlYXR1cmVOYW1lT3JTbGljZS5uYW1lXG4gICAgICAgICAgICAgICAgOiBmZWF0dXJlTmFtZU9yU2xpY2UsXG4gICAgICAgICAgICByZWR1Y2VyRmFjdG9yeTpcbiAgICAgICAgICAgICAgIShjb25maWcgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbikgJiYgY29uZmlnLnJlZHVjZXJGYWN0b3J5XG4gICAgICAgICAgICAgICAgPyBjb25maWcucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICAgICAgICA6IGNvbWJpbmVSZWR1Y2VycyxcbiAgICAgICAgICAgIG1ldGFSZWR1Y2VyczpcbiAgICAgICAgICAgICAgIShjb25maWcgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbikgJiYgY29uZmlnLm1ldGFSZWR1Y2Vyc1xuICAgICAgICAgICAgICAgID8gY29uZmlnLm1ldGFSZWR1Y2Vyc1xuICAgICAgICAgICAgICAgIDogW10sXG4gICAgICAgICAgICBpbml0aWFsU3RhdGU6XG4gICAgICAgICAgICAgICEoY29uZmlnIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4pICYmIGNvbmZpZy5pbml0aWFsU3RhdGVcbiAgICAgICAgICAgICAgICA/IGNvbmZpZy5pbml0aWFsU3RhdGVcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1NUT1JFX0ZFQVRVUkVTLFxuICAgICAgICAgIGRlcHM6IFtJbmplY3RvciwgX0ZFQVRVUkVfQ09ORklHUywgU1RPUkVfRkVBVFVSRVNdLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jcmVhdGVGZWF0dXJlU3RvcmUsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfRkVBVFVSRV9SRURVQ0VSUyxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VWYWx1ZTpcbiAgICAgICAgICAgIGZlYXR1cmVOYW1lT3JTbGljZSBpbnN0YW5jZW9mIE9iamVjdFxuICAgICAgICAgICAgICA/IGZlYXR1cmVOYW1lT3JTbGljZS5yZWR1Y2VyXG4gICAgICAgICAgICAgIDogcmVkdWNlcnMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfRkVBVFVSRV9SRURVQ0VSU19UT0tFTixcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VFeGlzdGluZzpcbiAgICAgICAgICAgIHJlZHVjZXJzIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4gPyByZWR1Y2VycyA6IF9GRUFUVVJFX1JFRFVDRVJTLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRkVBVFVSRV9SRURVQ0VSUyxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICBkZXBzOiBbXG4gICAgICAgICAgICBJbmplY3RvcixcbiAgICAgICAgICAgIF9GRUFUVVJFX1JFRFVDRVJTLFxuICAgICAgICAgICAgW25ldyBJbmplY3QoX0ZFQVRVUkVfUkVEVUNFUlNfVE9LRU4pXSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jcmVhdGVGZWF0dXJlUmVkdWNlcnMsXG4gICAgICAgIH0sXG4gICAgICAgIGNoZWNrRm9yQWN0aW9uVHlwZVVuaXF1ZW5lc3MoKSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZVN0b3JlUmVkdWNlcnMoXG4gIGluamVjdG9yOiBJbmplY3RvcixcbiAgcmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+XG4pIHtcbiAgcmV0dXJuIHJlZHVjZXJzIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4gPyBpbmplY3Rvci5nZXQocmVkdWNlcnMpIDogcmVkdWNlcnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlRmVhdHVyZVN0b3JlKFxuICBpbmplY3RvcjogSW5qZWN0b3IsXG4gIGNvbmZpZ3M6IFN0b3JlQ29uZmlnPGFueSwgYW55PltdIHwgSW5qZWN0aW9uVG9rZW48U3RvcmVDb25maWc8YW55LCBhbnk+PltdLFxuICBmZWF0dXJlU3RvcmVzOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+W11cbikge1xuICByZXR1cm4gZmVhdHVyZVN0b3Jlcy5tYXAoKGZlYXQsIGluZGV4KSA9PiB7XG4gICAgaWYgKGNvbmZpZ3NbaW5kZXhdIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4pIHtcbiAgICAgIGNvbnN0IGNvbmYgPSBpbmplY3Rvci5nZXQoY29uZmlnc1tpbmRleF0pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5OiBmZWF0LmtleSxcbiAgICAgICAgcmVkdWNlckZhY3Rvcnk6IGNvbmYucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICA/IGNvbmYucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICA6IGNvbWJpbmVSZWR1Y2VycyxcbiAgICAgICAgbWV0YVJlZHVjZXJzOiBjb25mLm1ldGFSZWR1Y2VycyA/IGNvbmYubWV0YVJlZHVjZXJzIDogW10sXG4gICAgICAgIGluaXRpYWxTdGF0ZTogY29uZi5pbml0aWFsU3RhdGUsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZmVhdDtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlRmVhdHVyZVJlZHVjZXJzKFxuICBpbmplY3RvcjogSW5qZWN0b3IsXG4gIHJlZHVjZXJDb2xsZWN0aW9uOiBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PltdXG4pIHtcbiAgY29uc3QgcmVkdWNlcnMgPSByZWR1Y2VyQ29sbGVjdGlvbi5tYXAoKHJlZHVjZXIpID0+IHtcbiAgICByZXR1cm4gcmVkdWNlciBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuID8gaW5qZWN0b3IuZ2V0KHJlZHVjZXIpIDogcmVkdWNlcjtcbiAgfSk7XG5cbiAgcmV0dXJuIHJlZHVjZXJzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2luaXRpYWxTdGF0ZUZhY3RvcnkoaW5pdGlhbFN0YXRlOiBhbnkpOiBhbnkge1xuICBpZiAodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpbml0aWFsU3RhdGUoKTtcbiAgfVxuXG4gIHJldHVybiBpbml0aWFsU3RhdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfY29uY2F0TWV0YVJlZHVjZXJzKFxuICBtZXRhUmVkdWNlcnM6IE1ldGFSZWR1Y2VyW10sXG4gIHVzZXJQcm92aWRlZE1ldGFSZWR1Y2VyczogTWV0YVJlZHVjZXJbXVxuKTogTWV0YVJlZHVjZXJbXSB7XG4gIHJldHVybiBtZXRhUmVkdWNlcnMuY29uY2F0KHVzZXJQcm92aWRlZE1ldGFSZWR1Y2Vycyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfcHJvdmlkZUZvclJvb3RHdWFyZChzdG9yZTogU3RvcmU8YW55Pik6IGFueSB7XG4gIGlmIChzdG9yZSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICBgU3RvcmVNb2R1bGUuZm9yUm9vdCgpIGNhbGxlZCB0d2ljZS4gRmVhdHVyZSBtb2R1bGVzIHNob3VsZCB1c2UgU3RvcmVNb2R1bGUuZm9yRmVhdHVyZSgpIGluc3RlYWQuYFxuICAgICk7XG4gIH1cbiAgcmV0dXJuICdndWFyZGVkJztcbn1cbiJdfQ==