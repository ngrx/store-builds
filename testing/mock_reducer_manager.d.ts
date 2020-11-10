import { BehaviorSubject } from 'rxjs';
import { ActionReducer } from '@ngrx/store';
export declare class MockReducerManager extends BehaviorSubject<ActionReducer<any, any>> {
    constructor();
    addFeature(feature: any): void;
    addFeatures(feature: any): void;
    removeFeature(feature: any): void;
    removeFeatures(features: any): void;
    addReducer(key: any, reducer: any): void;
    addReducers(reducers: any): void;
    removeReducer(featureKey: any): void;
    removeReducers(featureKeys: any): void;
}
