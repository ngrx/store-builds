import { ActionReducer } from './models';
import { MemoizedSelector } from './selector';
export declare type Feature<AppState extends Record<string, any>, FeatureName extends keyof AppState & string, FeatureState extends AppState[FeatureName]> = FeatureConfig<FeatureName, FeatureState> & FeatureSelector<AppState, FeatureName, FeatureState> & NestedSelectors<AppState, FeatureState>;
export interface FeatureConfig<FeatureName extends string, FeatureState> {
    name: FeatureName;
    reducer: ActionReducer<FeatureState>;
}
declare type FeatureSelector<AppState extends Record<string, any>, FeatureName extends keyof AppState & string, FeatureState extends AppState[FeatureName]> = {
    [K in FeatureName as `select${Capitalize<K>}State`]: MemoizedSelector<AppState, FeatureState>;
};
declare type Primitive = string | number | bigint | boolean | null | undefined;
declare type NestedSelectors<AppState extends Record<string, any>, FeatureState> = FeatureState extends Primitive | unknown[] | Date ? {} : {
    [K in keyof FeatureState & string as `select${Capitalize<K>}`]: MemoizedSelector<AppState, FeatureState[K]>;
};
declare type NotAllowedFeatureStateCheck<FeatureState> = FeatureState extends Required<FeatureState> ? unknown : 'optional properties are not allowed in the feature state';
export declare function createFeature<AppState extends Record<string, any>, FeatureName extends keyof AppState & string = keyof AppState & string, FeatureState extends AppState[FeatureName] = AppState[FeatureName]>({ name, reducer, }: FeatureConfig<FeatureName, FeatureState> & NotAllowedFeatureStateCheck<FeatureState>): Feature<AppState, FeatureName, FeatureState>;
export {};
