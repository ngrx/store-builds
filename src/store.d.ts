import { Provider } from '@angular/core';
import { Observable, Observer, Operator } from 'rxjs';
import { ActionsSubject } from './actions_subject';
import { Action, ActionReducer } from './models';
import { ReducerManager } from './reducer_manager';
import { StateObservable } from './state';
export declare class Store<T> extends Observable<T> implements Observer<Action> {
    private actionsObserver;
    private reducerManager;
    constructor(state$: StateObservable, actionsObserver: ActionsSubject, reducerManager: ReducerManager);
    select<K>(mapFn: (state: T) => K): Observable<K>;
    select<a extends keyof T>(key: a): Observable<T[a]>;
    select<a extends keyof T, b extends keyof T[a]>(key1: a, key2: b): Observable<T[a][b]>;
    select<a extends keyof T, b extends keyof T[a], c extends keyof T[a][b]>(key1: a, key2: b, key3: c): Store<T[a][b][c]>;
    select<a extends keyof T, b extends keyof T[a], c extends keyof T[a][b], d extends keyof T[a][b][c]>(key1: a, key2: b, key3: c, key4: d): Observable<T[a][b][c][d]>;
    select<a extends keyof T, b extends keyof T[a], c extends keyof T[a][b], d extends keyof T[a][b][c], e extends keyof T[a][b][c][d]>(key1: a, key2: b, key3: c, key4: d, key5: e): Observable<T[a][b][c][d][e]>;
    select<a extends keyof T, b extends keyof T[a], c extends keyof T[a][b], d extends keyof T[a][b][c], e extends keyof T[a][b][c][d], f extends keyof T[a][b][c][d][e]>(key1: a, key2: b, key3: c, key4: d, key5: e, key6: f): Observable<T[a][b][c][d][e][f]>;
    /**
     * This overload is used to support spread operator with
     * fixed length tuples type in typescript 2.7
     */
    select(pathOrMapFn: ((state: T) => any) | string, ...paths: string[]): Observable<any>;
    lift<R>(operator: Operator<T, R>): Store<R>;
    dispatch<V extends Action = Action>(action: V): void;
    next(action: Action): void;
    error(err: any): void;
    complete(): void;
    addReducer<State, Actions extends Action = Action>(key: string, reducer: ActionReducer<State, Actions>): void;
    removeReducer<Key extends keyof T>(key: Key): void;
}
export declare const STORE_PROVIDERS: Provider[];
export declare function select<T, K>(mapFn: ((state: T) => K) | string): (source$: Observable<T>) => Observable<K>;
export declare function select<T, a extends keyof T>(key: a): (source$: Store<a>) => Observable<T[a]>;
export declare function select<T, a extends keyof T, b extends keyof T[a]>(key1: a, key2: b): (source$: Store<T>) => Observable<T[a][b]>;
export declare function select<T, a extends keyof T, b extends keyof T[a], c extends keyof T[a][b]>(key1: a, key2: b, key3: c): (source$: Store<a>) => Observable<T[a][b][c]>;
export declare function select<T, a extends keyof T, b extends keyof T[a], c extends keyof T[a][b], d extends keyof T[a][b][c]>(key1: a, key2: b, key3: c, key4: d): (source$: Store<a>) => Observable<T[a][b][c][d]>;
export declare function select<T, a extends keyof T, b extends keyof T[a], c extends keyof T[a][b], d extends keyof T[a][b][c], e extends keyof T[a][b][c][d]>(key1: a, key2: b, key3: c, key4: d, key5: e): (source$: Store<a>) => Observable<T[a][b][c][d][e]>;
export declare function select<T, a extends keyof T, b extends keyof T[a], c extends keyof T[a][b], d extends keyof T[a][b][c], e extends keyof T[a][b][c][d], f extends keyof T[a][b][c][d][e]>(key1: a, key2: b, key3: c, key4: d, key5: e, key6: f): (source$: Store<a>) => Observable<T[a][b][c][d][e][f]>;
/**
 * This overload is used to support spread operator with
 * fixed length tuples type in typescript 2.7
 */
export declare function select<T, K>(pathOrMapFn: ((state: T) => any) | string, ...paths: string[]): (source$: Store<T>) => Observable<K>;
