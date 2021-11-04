import { ModuleWithProviders, OnDestroy, InjectionToken, Injector } from '@angular/core';
import { Action, ActionReducer, ActionReducerMap, ActionReducerFactory, StoreFeature, InitialState, MetaReducer, RuntimeChecks } from './models';
import { ActionsSubject } from './actions_subject';
import { ReducerManager, ReducerObservable } from './reducer_manager';
import { ScannedActionsSubject } from './scanned_actions_subject';
import { Store } from './store';
import * as i0 from "@angular/core";
export declare class StoreRootModule {
    constructor(actions$: ActionsSubject, reducer$: ReducerObservable, scannedActions$: ScannedActionsSubject, store: Store<any>, guard: any, actionCheck: any);
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreRootModule, [null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<StoreRootModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<StoreRootModule>;
}
export declare class StoreFeatureModule implements OnDestroy {
    private features;
    private featureReducers;
    private reducerManager;
    constructor(features: StoreFeature<any, any>[], featureReducers: ActionReducerMap<any>[], reducerManager: ReducerManager, root: StoreRootModule, actionCheck: any);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreFeatureModule, [null, null, null, null, { optional: true; }]>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<StoreFeatureModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<StoreFeatureModule>;
}
export interface StoreConfig<T, V extends Action = Action> {
    initialState?: InitialState<T>;
    reducerFactory?: ActionReducerFactory<T, V>;
    metaReducers?: MetaReducer<{
        [P in keyof T]: T[P];
    }, V>[];
}
export interface RootStoreConfig<T, V extends Action = Action> extends StoreConfig<T, V> {
    runtimeChecks?: Partial<RuntimeChecks>;
}
/**
 * An object with the name and the reducer for the feature.
 */
export interface FeatureSlice<T, V extends Action = Action> {
    name: string;
    reducer: ActionReducer<T, V>;
}
export declare class StoreModule {
    static forRoot<T, V extends Action = Action>(reducers: ActionReducerMap<T, V> | InjectionToken<ActionReducerMap<T, V>>, config?: RootStoreConfig<T, V>): ModuleWithProviders<StoreRootModule>;
    static forFeature<T, V extends Action = Action>(featureName: string, reducers: ActionReducerMap<T, V> | InjectionToken<ActionReducerMap<T, V>>, config?: StoreConfig<T, V> | InjectionToken<StoreConfig<T, V>>): ModuleWithProviders<StoreFeatureModule>;
    static forFeature<T, V extends Action = Action>(featureName: string, reducer: ActionReducer<T, V> | InjectionToken<ActionReducer<T, V>>, config?: StoreConfig<T, V> | InjectionToken<StoreConfig<T, V>>): ModuleWithProviders<StoreFeatureModule>;
    static forFeature<T, V extends Action = Action>(slice: FeatureSlice<T, V>): ModuleWithProviders<StoreFeatureModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<StoreModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<StoreModule>;
}
export declare function _createStoreReducers(injector: Injector, reducers: ActionReducerMap<any, any>): unknown;
export declare function _createFeatureStore(injector: Injector, configs: StoreConfig<any, any>[] | InjectionToken<StoreConfig<any, any>>[], featureStores: StoreFeature<any, any>[]): (StoreFeature<any, any> | {
    key: string;
    reducerFactory: any;
    metaReducers: any;
    initialState: any;
})[];
export declare function _createFeatureReducers(injector: Injector, reducerCollection: ActionReducerMap<any, any>[]): unknown[];
export declare function _initialStateFactory(initialState: any): any;
export declare function _concatMetaReducers(metaReducers: MetaReducer[], userProvidedMetaReducers: MetaReducer[]): MetaReducer[];
export declare function _provideForRootGuard(store: Store<any>): any;
