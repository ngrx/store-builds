export interface Action {
    type: string;
}
export declare interface TypedAction<T extends string> extends Action {
    readonly type: T;
}
export declare type ActionType<A> = A extends ActionCreator<infer T, infer C> ? ReturnType<C> & {
    type: T;
} : never;
export declare type TypeId<T> = () => T;
export declare type InitialState<T> = Partial<T> | TypeId<Partial<T>> | void;
/**
 * A function that takes an `Action` and a `State`, and returns a `State`.
 * See `createReducer`.
 */
export interface ActionReducer<T, V extends Action = Action> {
    (state: T | undefined, action: V): T;
}
export declare type ActionReducerMap<T, V extends Action = Action> = {
    [p in keyof T]: ActionReducer<T[p], V>;
};
export interface ActionReducerFactory<T, V extends Action = Action> {
    (reducerMap: ActionReducerMap<T, V>, initialState?: InitialState<T>): ActionReducer<T, V>;
}
export declare type MetaReducer<T = any, V extends Action = Action> = (reducer: ActionReducer<T, V>) => ActionReducer<T, V>;
export interface StoreFeature<T, V extends Action = Action> {
    key: string;
    reducers: ActionReducerMap<T, V> | ActionReducer<T, V>;
    reducerFactory: ActionReducerFactory<T, V>;
    initialState?: InitialState<T>;
    metaReducers?: MetaReducer<T, V>[];
}
export declare type Selector<T, V> = (state: T) => V;
export declare type SelectorWithProps<State, Props, Result> = (state: State, props: Props) => Result;
export declare const arraysAreNotAllowedMsg = "arrays are not allowed in action creators";
declare type ArraysAreNotAllowed = typeof arraysAreNotAllowedMsg;
export declare type DisallowArraysAndTypeProperty<T> = T extends any[] ? ArraysAreNotAllowed : T extends {
    type: any;
} ? TypePropertyIsNotAllowed : T;
export declare const typePropertyIsNotAllowedMsg = "type property is not allowed in action creators";
declare type TypePropertyIsNotAllowed = typeof typePropertyIsNotAllowedMsg;
/**
 * A function that returns an object in the shape of the `Action` interface.  Configured using `createAction`.
 */
export declare type Creator<P extends any[] = any[], R extends object = object> = R extends any[] ? ArraysAreNotAllowed : R extends {
    type: any;
} ? TypePropertyIsNotAllowed : FunctionWithParametersType<P, R>;
export declare type PropsReturnType<T extends object> = T extends any[] ? ArraysAreNotAllowed : T extends {
    type: any;
} ? TypePropertyIsNotAllowed : {
    _as: 'props';
    _p: T;
};
/**
 * See `Creator`.
 */
export declare type ActionCreator<T extends string = string, C extends Creator = Creator> = C & TypedAction<T>;
export declare type FunctionWithParametersType<P extends unknown[], R = void> = (...args: P) => R;
export declare type ParametersType<T> = T extends (...args: infer U) => unknown ? U : never;
export interface RuntimeChecks {
    /**
     * Verifies if the state is serializable
     */
    strictStateSerializability: boolean;
    /**
     * Verifies if the actions are serializable. Please note, you may not need to set it to `true` unless you are storing/replaying actions using external resources, for example `localStorage`.
     */
    strictActionSerializability: boolean;
    /**
     * Verifies that the state isn't mutated
     */
    strictStateImmutability: boolean;
    /**
     * Verifies that actions aren't mutated
     */
    strictActionImmutability: boolean;
}
export {};
