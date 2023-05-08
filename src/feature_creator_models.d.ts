import { MemoizedSelector } from './selector';
import { Primitive } from './models';
export type FeatureSelector<AppState extends Record<string, any>, FeatureName extends keyof AppState & string, FeatureState extends AppState[FeatureName]> = {
    [K in FeatureName as `select${Capitalize<K>}State`]: MemoizedSelector<AppState, FeatureState, (featureState: FeatureState) => FeatureState>;
};
export type NestedSelectors<AppState extends Record<string, any>, FeatureState> = FeatureState extends Primitive | unknown[] | Date ? {} : {
    [K in keyof FeatureState & string as `select${Capitalize<K>}`]: MemoizedSelector<AppState, FeatureState[K], (featureState: FeatureState) => FeatureState[K]>;
};
