import { ActionCreator, ActionReducer, ActionType } from './models';
export interface On<S> {
    reducer: ActionReducer<S>;
    types: string[];
}
export interface OnReducer<S, C extends ActionCreator[]> {
    (state: S, action: ActionType<C[number]>): S;
}
export declare function on<C1 extends ActionCreator, S>(creator1: C1, reducer: OnReducer<S, [C1]>): On<S>;
export declare function on<C1 extends ActionCreator, C2 extends ActionCreator, S>(creator1: C1, creator2: C2, reducer: OnReducer<S, [C1, C2]>): On<S>;
export declare function on<C1 extends ActionCreator, C2 extends ActionCreator, C3 extends ActionCreator, S>(creator1: C1, creator2: C2, creator3: C3, reducer: OnReducer<S, [C1, C2, C3]>): On<S>;
export declare function on<S>(creator: ActionCreator, ...rest: (ActionCreator | OnReducer<S, [ActionCreator]>)[]): On<S>;
export declare function createReducer<S>(initialState: S, ...ons: On<S>[]): ActionReducer<S>;
