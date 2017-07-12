import { ModuleWithProviders, OnDestroy, InjectionToken } from '@angular/core';
import { Action, ActionReducer, ActionReducerMap, ActionReducerFactory, StoreFeature, InitialState } from './models';
import { ActionsSubject } from './actions_subject';
import { ReducerManager, ReducerObservable } from './reducer_manager';
import { ScannedActionsSubject } from './scanned_actions_subject';
export declare class StoreRootModule {
    constructor(actions$: ActionsSubject, reducer$: ReducerObservable, scannedActions$: ScannedActionsSubject);
}
export declare class StoreFeatureModule implements OnDestroy {
    private features;
    private reducerManager;
    constructor(features: StoreFeature<any, any>[], reducerManager: ReducerManager);
    ngOnDestroy(): void;
}
export declare type StoreConfig<T, V extends Action = Action> = {
    initialState?: InitialState<T>;
    reducerFactory?: ActionReducerFactory<T, V>;
};
export declare class StoreModule {
    static forRoot<T, V extends Action = Action>(reducers: ActionReducerMap<T, V> | InjectionToken<ActionReducerMap<T, V>>, config?: StoreConfig<T, V>): ModuleWithProviders;
    static forFeature<T, V extends Action = Action>(featureName: string, reducers: ActionReducerMap<T, V>, config?: StoreConfig<T, V>): ModuleWithProviders;
    static forFeature<T, V extends Action = Action>(featureName: string, reducer: ActionReducer<T, V>, config?: StoreConfig<T, V>): ModuleWithProviders;
}
export declare function _initialStateFactory(initialState: any): any;
