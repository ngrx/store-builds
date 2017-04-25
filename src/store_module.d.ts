import { ModuleWithProviders, OnDestroy } from '@angular/core';
import { Action, ActionReducerMap, ActionReducerFactory, StoreFeature } from './models';
import { ReducerManager } from './reducer_manager';
export declare class StoreRootModule {
}
export declare class StoreFeatureModule implements OnDestroy {
    private features;
    private reducerManager;
    constructor(features: StoreFeature<any, any>[], reducerManager: ReducerManager);
    ngOnDestroy(): void;
}
export declare type StoreConfig<T, V extends Action = Action> = {
    initialState?: T;
    reducerFactory?: ActionReducerFactory<T, V>;
};
export declare class StoreModule {
    static forRoot<T, V extends Action = Action>(reducers: ActionReducerMap<T, V>, config?: StoreConfig<T, V>): ModuleWithProviders;
    static forFeature<T, V extends Action = Action>(featureName: string, reducers: ActionReducerMap<T, V>, config?: StoreConfig<T, V>): ModuleWithProviders;
}
