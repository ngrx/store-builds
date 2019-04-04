import { Observable } from 'rxjs';
import { Action, ActionsSubject, ReducerManager, Store, MemoizedSelectorWithProps, MemoizedSelector } from '@ngrx/store';
import { MockState } from './mock_state';
export declare class MockStore<T> extends Store<T> {
    private state$;
    private initialState;
    static selectors: Map<string | MemoizedSelector<any, any> | MemoizedSelectorWithProps<any, any, any>, any>;
    scannedActions$: Observable<Action>;
    constructor(state$: MockState<T>, actionsObserver: ActionsSubject, reducerManager: ReducerManager, initialState: T);
    setState(nextState: T): void;
    overrideSelector<T, Result>(selector: string, value: Result): MemoizedSelector<string, Result>;
    overrideSelector<T, Result>(selector: MemoizedSelector<T, Result>, value: Result): MemoizedSelector<T, Result>;
    overrideSelector<T, Result>(selector: MemoizedSelectorWithProps<T, any, Result>, value: Result): MemoizedSelectorWithProps<T, any, Result>;
    resetSelectors(): void;
    select(selector: any): Observable<any>;
    addReducer(): void;
    removeReducer(): void;
}
