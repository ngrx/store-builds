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
/** @nocollapse */ /** @nocollapse */ StoreRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: StoreRootModule, deps: [{ token: i1.ActionsSubject }, { token: i2.ReducerObservable }, { token: i3.ScannedActionsSubject }, { token: i4.Store }, { token: _ROOT_STORE_GUARD, optional: true }, { token: _ACTION_TYPE_UNIQUENESS_CHECK, optional: true }], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ StoreRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: StoreRootModule });
/** @nocollapse */ /** @nocollapse */ StoreRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: StoreRootModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: StoreRootModule, decorators: [{
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
            return {
                ...feature,
                reducers,
                initialState: _initialStateFactory(feature.initialState),
            };
        });
        reducerManager.addFeatures(feats);
    }
    // eslint-disable-next-line @angular-eslint/contextual-lifecycle
    ngOnDestroy() {
        this.reducerManager.removeFeatures(this.features);
    }
}
/** @nocollapse */ /** @nocollapse */ StoreFeatureModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: StoreFeatureModule, deps: [{ token: _STORE_FEATURES }, { token: FEATURE_REDUCERS }, { token: i2.ReducerManager }, { token: StoreRootModule }, { token: _ACTION_TYPE_UNIQUENESS_CHECK, optional: true }], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ StoreFeatureModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: StoreFeatureModule });
/** @nocollapse */ /** @nocollapse */ StoreFeatureModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: StoreFeatureModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: StoreFeatureModule, decorators: [{
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
/** @nocollapse */ /** @nocollapse */ StoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: StoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ /** @nocollapse */ StoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: StoreModule });
/** @nocollapse */ /** @nocollapse */ StoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: StoreModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: StoreModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvc3RvcmVfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxRQUFRLEVBQ1IsTUFBTSxFQUdOLGNBQWMsRUFDZCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQVd2QixPQUFPLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hFLE9BQU8sRUFDTCxhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxjQUFjLEVBQ2QsYUFBYSxFQUNiLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLDJCQUEyQixFQUMzQix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLDZCQUE2QixHQUM5QixNQUFNLFVBQVUsQ0FBQztBQUNsQixPQUFPLEVBQUUseUJBQXlCLEVBQWtCLE1BQU0sbUJBQW1CLENBQUM7QUFDOUUsT0FBTyxFQUNMLHlCQUF5QixHQUcxQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFDTCxpQ0FBaUMsR0FFbEMsTUFBTSwyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2pELE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsNEJBQTRCLEdBQzdCLE1BQU0sa0JBQWtCLENBQUM7Ozs7OztBQUcxQixNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUNFLFFBQXdCLEVBQ3hCLFFBQTJCLEVBQzNCLGVBQXNDLEVBQ3RDLEtBQWlCLEVBR2pC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Q0wsQ0FBQztBQUVELE1BQU0sVUFBVSxzQkFBc0IsQ0FDcEMsUUFBa0IsRUFDbEIsaUJBQStDO0lBRS9DLE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ2pELE9BQU8sT0FBTyxZQUFZLGNBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQzdFLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxZQUFpQjtJQUNwRCxJQUFJLE9BQU8sWUFBWSxLQUFLLFVBQVUsRUFBRTtRQUN0QyxPQUFPLFlBQVksRUFBRSxDQUFDO0tBQ3ZCO0lBRUQsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FDakMsWUFBMkIsRUFDM0Isd0JBQXVDO0lBRXZDLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsS0FBaUI7SUFDcEQsSUFBSSxLQUFLLEVBQUU7UUFDVCxNQUFNLElBQUksU0FBUyxDQUNqQixrR0FBa0csQ0FDbkcsQ0FBQztLQUNIO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIE5nTW9kdWxlLFxuICBJbmplY3QsXG4gIE1vZHVsZVdpdGhQcm92aWRlcnMsXG4gIE9uRGVzdHJveSxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIEluamVjdG9yLFxuICBPcHRpb25hbCxcbiAgU2tpcFNlbGYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWN0aW9uLFxuICBBY3Rpb25SZWR1Y2VyLFxuICBBY3Rpb25SZWR1Y2VyTWFwLFxuICBBY3Rpb25SZWR1Y2VyRmFjdG9yeSxcbiAgU3RvcmVGZWF0dXJlLFxuICBJbml0aWFsU3RhdGUsXG4gIE1ldGFSZWR1Y2VyLFxuICBSdW50aW1lQ2hlY2tzLFxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMsIGNyZWF0ZVJlZHVjZXJGYWN0b3J5IH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge1xuICBJTklUSUFMX1NUQVRFLFxuICBJTklUSUFMX1JFRFVDRVJTLFxuICBfSU5JVElBTF9SRURVQ0VSUyxcbiAgUkVEVUNFUl9GQUNUT1JZLFxuICBfUkVEVUNFUl9GQUNUT1JZLFxuICBTVE9SRV9GRUFUVVJFUyxcbiAgX0lOSVRJQUxfU1RBVEUsXG4gIE1FVEFfUkVEVUNFUlMsXG4gIF9TVE9SRV9SRURVQ0VSUyxcbiAgRkVBVFVSRV9SRURVQ0VSUyxcbiAgX0ZFQVRVUkVfUkVEVUNFUlMsXG4gIF9GRUFUVVJFX1JFRFVDRVJTX1RPS0VOLFxuICBfU1RPUkVfRkVBVFVSRVMsXG4gIF9GRUFUVVJFX0NPTkZJR1MsXG4gIFVTRVJfUFJPVklERURfTUVUQV9SRURVQ0VSUyxcbiAgX1JFU09MVkVEX01FVEFfUkVEVUNFUlMsXG4gIF9ST09UX1NUT1JFX0dVQVJELFxuICBfQUNUSU9OX1RZUEVfVU5JUVVFTkVTU19DSEVDSyxcbn0gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHsgQUNUSU9OU19TVUJKRUNUX1BST1ZJREVSUywgQWN0aW9uc1N1YmplY3QgfSBmcm9tICcuL2FjdGlvbnNfc3ViamVjdCc7XG5pbXBvcnQge1xuICBSRURVQ0VSX01BTkFHRVJfUFJPVklERVJTLFxuICBSZWR1Y2VyTWFuYWdlcixcbiAgUmVkdWNlck9ic2VydmFibGUsXG59IGZyb20gJy4vcmVkdWNlcl9tYW5hZ2VyJztcbmltcG9ydCB7XG4gIFNDQU5ORURfQUNUSU9OU19TVUJKRUNUX1BST1ZJREVSUyxcbiAgU2Nhbm5lZEFjdGlvbnNTdWJqZWN0LFxufSBmcm9tICcuL3NjYW5uZWRfYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7IFNUQVRFX1BST1ZJREVSUyB9IGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHsgU1RPUkVfUFJPVklERVJTLCBTdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IHtcbiAgcHJvdmlkZVJ1bnRpbWVDaGVja3MsXG4gIGNoZWNrRm9yQWN0aW9uVHlwZVVuaXF1ZW5lc3MsXG59IGZyb20gJy4vcnVudGltZV9jaGVja3MnO1xuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgU3RvcmVSb290TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgYWN0aW9ucyQ6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHJlZHVjZXIkOiBSZWR1Y2VyT2JzZXJ2YWJsZSxcbiAgICBzY2FubmVkQWN0aW9ucyQ6IFNjYW5uZWRBY3Rpb25zU3ViamVjdCxcbiAgICBzdG9yZTogU3RvcmU8YW55PixcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoX1JPT1RfU1RPUkVfR1VBUkQpXG4gICAgZ3VhcmQ6IGFueSxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoX0FDVElPTl9UWVBFX1VOSVFVRU5FU1NfQ0hFQ0spXG4gICAgYWN0aW9uQ2hlY2s6IGFueVxuICApIHt9XG59XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTdG9yZUZlYXR1cmVNb2R1bGUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KF9TVE9SRV9GRUFUVVJFUykgcHJpdmF0ZSBmZWF0dXJlczogU3RvcmVGZWF0dXJlPGFueSwgYW55PltdLFxuICAgIEBJbmplY3QoRkVBVFVSRV9SRURVQ0VSUykgcHJpdmF0ZSBmZWF0dXJlUmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8YW55PltdLFxuICAgIHByaXZhdGUgcmVkdWNlck1hbmFnZXI6IFJlZHVjZXJNYW5hZ2VyLFxuICAgIHJvb3Q6IFN0b3JlUm9vdE1vZHVsZSxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoX0FDVElPTl9UWVBFX1VOSVFVRU5FU1NfQ0hFQ0spXG4gICAgYWN0aW9uQ2hlY2s6IGFueVxuICApIHtcbiAgICBjb25zdCBmZWF0cyA9IGZlYXR1cmVzLm1hcCgoZmVhdHVyZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGZlYXR1cmVSZWR1Y2VyQ29sbGVjdGlvbiA9IGZlYXR1cmVSZWR1Y2Vycy5zaGlmdCgpO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgIGNvbnN0IHJlZHVjZXJzID0gZmVhdHVyZVJlZHVjZXJDb2xsZWN0aW9uISAvKlRPRE8oIzgyMykqL1tpbmRleF07XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmZlYXR1cmUsXG4gICAgICAgIHJlZHVjZXJzLFxuICAgICAgICBpbml0aWFsU3RhdGU6IF9pbml0aWFsU3RhdGVGYWN0b3J5KGZlYXR1cmUuaW5pdGlhbFN0YXRlKSxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICByZWR1Y2VyTWFuYWdlci5hZGRGZWF0dXJlcyhmZWF0cyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2NvbnRleHR1YWwtbGlmZWN5Y2xlXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmVkdWNlck1hbmFnZXIucmVtb3ZlRmVhdHVyZXModGhpcy5mZWF0dXJlcyk7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdG9yZUNvbmZpZzxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiB7XG4gIGluaXRpYWxTdGF0ZT86IEluaXRpYWxTdGF0ZTxUPjtcbiAgcmVkdWNlckZhY3Rvcnk/OiBBY3Rpb25SZWR1Y2VyRmFjdG9yeTxULCBWPjtcbiAgbWV0YVJlZHVjZXJzPzogTWV0YVJlZHVjZXI8eyBbUCBpbiBrZXlvZiBUXTogVFtQXSB9LCBWPltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvb3RTdG9yZUNvbmZpZzxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPlxuICBleHRlbmRzIFN0b3JlQ29uZmlnPFQsIFY+IHtcbiAgcnVudGltZUNoZWNrcz86IFBhcnRpYWw8UnVudGltZUNoZWNrcz47XG59XG5cbi8qKlxuICogQW4gb2JqZWN0IHdpdGggdGhlIG5hbWUgYW5kIHRoZSByZWR1Y2VyIGZvciB0aGUgZmVhdHVyZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGZWF0dXJlU2xpY2U8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8VCwgVj47XG59XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBTdG9yZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290PFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICAgIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlck1hcDxULCBWPj4sXG4gICAgY29uZmlnPzogUm9vdFN0b3JlQ29uZmlnPFQsIFY+XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RvcmVSb290TW9kdWxlPjtcbiAgc3RhdGljIGZvclJvb3QoXG4gICAgcmVkdWNlcnM6XG4gICAgICB8IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+XG4gICAgICB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+PixcbiAgICBjb25maWc6IFJvb3RTdG9yZUNvbmZpZzxhbnksIGFueT4gPSB7fVxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlUm9vdE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU3RvcmVSb290TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfUk9PVF9TVE9SRV9HVUFSRCxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfcHJvdmlkZUZvclJvb3RHdWFyZCxcbiAgICAgICAgICBkZXBzOiBbW1N0b3JlLCBuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCldXSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBwcm92aWRlOiBfSU5JVElBTF9TVEFURSwgdXNlVmFsdWU6IGNvbmZpZy5pbml0aWFsU3RhdGUgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IElOSVRJQUxfU1RBVEUsXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2luaXRpYWxTdGF0ZUZhY3RvcnksXG4gICAgICAgICAgZGVwczogW19JTklUSUFMX1NUQVRFXSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBwcm92aWRlOiBfSU5JVElBTF9SRURVQ0VSUywgdXNlVmFsdWU6IHJlZHVjZXJzIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfU1RPUkVfUkVEVUNFUlMsXG4gICAgICAgICAgdXNlRXhpc3Rpbmc6XG4gICAgICAgICAgICByZWR1Y2VycyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuID8gcmVkdWNlcnMgOiBfSU5JVElBTF9SRURVQ0VSUyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IElOSVRJQUxfUkVEVUNFUlMsXG4gICAgICAgICAgZGVwczogW0luamVjdG9yLCBfSU5JVElBTF9SRURVQ0VSUywgW25ldyBJbmplY3QoX1NUT1JFX1JFRFVDRVJTKV1dLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jcmVhdGVTdG9yZVJlZHVjZXJzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogVVNFUl9QUk9WSURFRF9NRVRBX1JFRFVDRVJTLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcubWV0YVJlZHVjZXJzID8gY29uZmlnLm1ldGFSZWR1Y2VycyA6IFtdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1JFU09MVkVEX01FVEFfUkVEVUNFUlMsXG4gICAgICAgICAgZGVwczogW01FVEFfUkVEVUNFUlMsIFVTRVJfUFJPVklERURfTUVUQV9SRURVQ0VSU10sXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NvbmNhdE1ldGFSZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9SRURVQ0VSX0ZBQ1RPUlksXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZy5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgICAgPyBjb25maWcucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICAgIDogY29tYmluZVJlZHVjZXJzLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogUkVEVUNFUl9GQUNUT1JZLFxuICAgICAgICAgIGRlcHM6IFtfUkVEVUNFUl9GQUNUT1JZLCBfUkVTT0xWRURfTUVUQV9SRURVQ0VSU10sXG4gICAgICAgICAgdXNlRmFjdG9yeTogY3JlYXRlUmVkdWNlckZhY3RvcnksXG4gICAgICAgIH0sXG4gICAgICAgIEFDVElPTlNfU1VCSkVDVF9QUk9WSURFUlMsXG4gICAgICAgIFJFRFVDRVJfTUFOQUdFUl9QUk9WSURFUlMsXG4gICAgICAgIFNDQU5ORURfQUNUSU9OU19TVUJKRUNUX1BST1ZJREVSUyxcbiAgICAgICAgU1RBVEVfUFJPVklERVJTLFxuICAgICAgICBTVE9SRV9QUk9WSURFUlMsXG4gICAgICAgIHByb3ZpZGVSdW50aW1lQ2hlY2tzKGNvbmZpZy5ydW50aW1lQ2hlY2tzKSxcbiAgICAgICAgY2hlY2tGb3JBY3Rpb25UeXBlVW5pcXVlbmVzcygpLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZvckZlYXR1cmU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAgZmVhdHVyZU5hbWU6IHN0cmluZyxcbiAgICByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxULCBWPiB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXJNYXA8VCwgVj4+LFxuICAgIGNvbmZpZz86IFN0b3JlQ29uZmlnPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48U3RvcmVDb25maWc8VCwgVj4+XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RvcmVGZWF0dXJlTW9kdWxlPjtcbiAgc3RhdGljIGZvckZlYXR1cmU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gICAgZmVhdHVyZU5hbWU6IHN0cmluZyxcbiAgICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFQsIFY+IHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlcjxULCBWPj4sXG4gICAgY29uZmlnPzogU3RvcmVDb25maWc8VCwgVj4gfCBJbmplY3Rpb25Ub2tlbjxTdG9yZUNvbmZpZzxULCBWPj5cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yZUZlYXR1cmVNb2R1bGU+O1xuICBzdGF0aWMgZm9yRmVhdHVyZTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgICBzbGljZTogRmVhdHVyZVNsaWNlPFQsIFY+XG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U3RvcmVGZWF0dXJlTW9kdWxlPjtcbiAgc3RhdGljIGZvckZlYXR1cmUoXG4gICAgZmVhdHVyZU5hbWVPclNsaWNlOiBzdHJpbmcgfCBGZWF0dXJlU2xpY2U8YW55LCBhbnk+LFxuICAgIHJlZHVjZXJzPzpcbiAgICAgIHwgQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5cbiAgICAgIHwgSW5qZWN0aW9uVG9rZW48QWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT4+XG4gICAgICB8IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+XG4gICAgICB8IEluamVjdGlvblRva2VuPEFjdGlvblJlZHVjZXI8YW55LCBhbnk+PixcbiAgICBjb25maWc6IFN0b3JlQ29uZmlnPGFueSwgYW55PiB8IEluamVjdGlvblRva2VuPFN0b3JlQ29uZmlnPGFueSwgYW55Pj4gPSB7fVxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFN0b3JlRmVhdHVyZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU3RvcmVGZWF0dXJlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfRkVBVFVSRV9DT05GSUdTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZVZhbHVlOiBmZWF0dXJlTmFtZU9yU2xpY2UgaW5zdGFuY2VvZiBPYmplY3QgPyB7fSA6IGNvbmZpZyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFNUT1JFX0ZFQVRVUkVTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZVZhbHVlOiB7XG4gICAgICAgICAgICBrZXk6XG4gICAgICAgICAgICAgIGZlYXR1cmVOYW1lT3JTbGljZSBpbnN0YW5jZW9mIE9iamVjdFxuICAgICAgICAgICAgICAgID8gZmVhdHVyZU5hbWVPclNsaWNlLm5hbWVcbiAgICAgICAgICAgICAgICA6IGZlYXR1cmVOYW1lT3JTbGljZSxcbiAgICAgICAgICAgIHJlZHVjZXJGYWN0b3J5OlxuICAgICAgICAgICAgICAhKGNvbmZpZyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuKSAmJiBjb25maWcucmVkdWNlckZhY3RvcnlcbiAgICAgICAgICAgICAgICA/IGNvbmZpZy5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgICAgICAgIDogY29tYmluZVJlZHVjZXJzLFxuICAgICAgICAgICAgbWV0YVJlZHVjZXJzOlxuICAgICAgICAgICAgICAhKGNvbmZpZyBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuKSAmJiBjb25maWcubWV0YVJlZHVjZXJzXG4gICAgICAgICAgICAgICAgPyBjb25maWcubWV0YVJlZHVjZXJzXG4gICAgICAgICAgICAgICAgOiBbXSxcbiAgICAgICAgICAgIGluaXRpYWxTdGF0ZTpcbiAgICAgICAgICAgICAgIShjb25maWcgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbikgJiYgY29uZmlnLmluaXRpYWxTdGF0ZVxuICAgICAgICAgICAgICAgID8gY29uZmlnLmluaXRpYWxTdGF0ZVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfU1RPUkVfRkVBVFVSRVMsXG4gICAgICAgICAgZGVwczogW0luamVjdG9yLCBfRkVBVFVSRV9DT05GSUdTLCBTVE9SRV9GRUFUVVJFU10sXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NyZWF0ZUZlYXR1cmVTdG9yZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9GRUFUVVJFX1JFRFVDRVJTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZVZhbHVlOlxuICAgICAgICAgICAgZmVhdHVyZU5hbWVPclNsaWNlIGluc3RhbmNlb2YgT2JqZWN0XG4gICAgICAgICAgICAgID8gZmVhdHVyZU5hbWVPclNsaWNlLnJlZHVjZXJcbiAgICAgICAgICAgICAgOiByZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IF9GRUFUVVJFX1JFRFVDRVJTX1RPS0VOLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZUV4aXN0aW5nOlxuICAgICAgICAgICAgcmVkdWNlcnMgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbiA/IHJlZHVjZXJzIDogX0ZFQVRVUkVfUkVEVUNFUlMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBGRUFUVVJFX1JFRFVDRVJTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIGRlcHM6IFtcbiAgICAgICAgICAgIEluamVjdG9yLFxuICAgICAgICAgICAgX0ZFQVRVUkVfUkVEVUNFUlMsXG4gICAgICAgICAgICBbbmV3IEluamVjdChfRkVBVFVSRV9SRURVQ0VSU19UT0tFTildLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgdXNlRmFjdG9yeTogX2NyZWF0ZUZlYXR1cmVSZWR1Y2VycyxcbiAgICAgICAgfSxcbiAgICAgICAgY2hlY2tGb3JBY3Rpb25UeXBlVW5pcXVlbmVzcygpLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlU3RvcmVSZWR1Y2VycyhcbiAgaW5qZWN0b3I6IEluamVjdG9yLFxuICByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT5cbikge1xuICByZXR1cm4gcmVkdWNlcnMgaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbiA/IGluamVjdG9yLmdldChyZWR1Y2VycykgOiByZWR1Y2Vycztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVGZWF0dXJlU3RvcmUoXG4gIGluamVjdG9yOiBJbmplY3RvcixcbiAgY29uZmlnczogU3RvcmVDb25maWc8YW55LCBhbnk+W10gfCBJbmplY3Rpb25Ub2tlbjxTdG9yZUNvbmZpZzxhbnksIGFueT4+W10sXG4gIGZlYXR1cmVTdG9yZXM6IFN0b3JlRmVhdHVyZTxhbnksIGFueT5bXVxuKSB7XG4gIHJldHVybiBmZWF0dXJlU3RvcmVzLm1hcCgoZmVhdCwgaW5kZXgpID0+IHtcbiAgICBpZiAoY29uZmlnc1tpbmRleF0gaW5zdGFuY2VvZiBJbmplY3Rpb25Ub2tlbikge1xuICAgICAgY29uc3QgY29uZiA9IGluamVjdG9yLmdldChjb25maWdzW2luZGV4XSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGZlYXQua2V5LFxuICAgICAgICByZWR1Y2VyRmFjdG9yeTogY29uZi5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgID8gY29uZi5yZWR1Y2VyRmFjdG9yeVxuICAgICAgICAgIDogY29tYmluZVJlZHVjZXJzLFxuICAgICAgICBtZXRhUmVkdWNlcnM6IGNvbmYubWV0YVJlZHVjZXJzID8gY29uZi5tZXRhUmVkdWNlcnMgOiBbXSxcbiAgICAgICAgaW5pdGlhbFN0YXRlOiBjb25mLmluaXRpYWxTdGF0ZSxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmZWF0O1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVGZWF0dXJlUmVkdWNlcnMoXG4gIGluamVjdG9yOiBJbmplY3RvcixcbiAgcmVkdWNlckNvbGxlY3Rpb246IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+W11cbikge1xuICBjb25zdCByZWR1Y2VycyA9IHJlZHVjZXJDb2xsZWN0aW9uLm1hcCgocmVkdWNlcikgPT4ge1xuICAgIHJldHVybiByZWR1Y2VyIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4gPyBpbmplY3Rvci5nZXQocmVkdWNlcikgOiByZWR1Y2VyO1xuICB9KTtcblxuICByZXR1cm4gcmVkdWNlcnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfaW5pdGlhbFN0YXRlRmFjdG9yeShpbml0aWFsU3RhdGU6IGFueSk6IGFueSB7XG4gIGlmICh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jb25jYXRNZXRhUmVkdWNlcnMoXG4gIG1ldGFSZWR1Y2VyczogTWV0YVJlZHVjZXJbXSxcbiAgdXNlclByb3ZpZGVkTWV0YVJlZHVjZXJzOiBNZXRhUmVkdWNlcltdXG4pOiBNZXRhUmVkdWNlcltdIHtcbiAgcmV0dXJuIG1ldGFSZWR1Y2Vycy5jb25jYXQodXNlclByb3ZpZGVkTWV0YVJlZHVjZXJzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9wcm92aWRlRm9yUm9vdEd1YXJkKHN0b3JlOiBTdG9yZTxhbnk+KTogYW55IHtcbiAgaWYgKHN0b3JlKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgIGBTdG9yZU1vZHVsZS5mb3JSb290KCkgY2FsbGVkIHR3aWNlLiBGZWF0dXJlIG1vZHVsZXMgc2hvdWxkIHVzZSBTdG9yZU1vZHVsZS5mb3JGZWF0dXJlKCkgaW5zdGVhZC5gXG4gICAgKTtcbiAgfVxuICByZXR1cm4gJ2d1YXJkZWQnO1xufVxuIl19