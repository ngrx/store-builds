import { Provider } from '@angular/core';
import { MockSelector } from './mock_selector';
export interface MockStoreConfig<T> {
    initialState?: T;
    selectors?: MockSelector[];
}
export declare function provideMockStore<T = any>(config?: MockStoreConfig<T>): Provider[];
export { MockReducerManager } from './mock_reducer_manager';
export { MockState } from './mock_state';
export { MockStore } from './mock_store';
export { MockSelector } from './mock_selector';
