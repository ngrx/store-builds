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
/**
 * @deprecated Selectors with props are deprecated, for more info see {@link https://github.com/ngrx/platform/issues/2980 Github Issue}
 */
export declare type SelectorWithProps<State, Props, Result> = (state: State, props: Props) => Result;
export declare const arraysAreNotAllowedMsg = "action creator cannot return an array";
declare type ArraysAreNotAllowed = typeof arraysAreNotAllowedMsg;
export declare const typePropertyIsNotAllowedMsg = "action creator cannot return an object with a property named `type`";
declare type TypePropertyIsNotAllowed = typeof typePropertyIsNotAllowedMsg;
export declare const emptyObjectsAreNotAllowedMsg = "action creator cannot return an empty object";
declare type EmptyObjectsAreNotAllowed = typeof emptyObjectsAreNotAllowedMsg;
export declare const arraysAreNotAllowedInProps = "action creator props cannot be an array";
declare type ArraysAreNotAllowedInProps = typeof arraysAreNotAllowedInProps;
export declare const typePropertyIsNotAllowedInProps = "action creator props cannot have a property named `type`";
declare type TypePropertyIsNotAllowedInProps = typeof typePropertyIsNotAllowedInProps;
export declare const emptyObjectsAreNotAllowedInProps = "action creator props cannot be an empty object";
declare type EmptyObjectsAreNotAllowedInProps = typeof emptyObjectsAreNotAllowedInProps;
export declare const primitivesAreNotAllowedInProps = "action creator props cannot be a primitive value";
declare type PrimitivesAreNotAllowedInProps = typeof primitivesAreNotAllowedInProps;
export declare type FunctionIsNotAllowed<T, ErrorMessage extends string> = T extends Function ? ErrorMessage : T;
/**
 * A function that returns an object in the shape of the `Action` interface.  Configured using `createAction`.
 */
export declare type Creator<P extends any[] = any[], R extends object = object> = FunctionWithParametersType<P, R>;
export declare type Primitive = string | number | bigint | boolean | symbol | null | undefined;
export declare type NotAllowedCheck<T extends object> = T extends any[] ? ArraysAreNotAllowed : T extends {
    type: any;
} ? TypePropertyIsNotAllowed : keyof T extends never ? EmptyObjectsAreNotAllowed : unknown;
export declare type NotAllowedInPropsCheck<T> = T extends object ? T extends any[] ? ArraysAreNotAllowedInProps : T extends {
    type: any;
} ? TypePropertyIsNotAllowedInProps : keyof T extends never ? EmptyObjectsAreNotAllowedInProps : unknown : T extends Primitive ? PrimitivesAreNotAllowedInProps : never;
/**
 * See `Creator`.
 */
export declare type ActionCreator<T extends string = string, C extends Creator = Creator> = C & TypedAction<T>;
export interface ActionCreatorProps<T> {
    _as: 'props';
    _p: T;
}
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
    /**
     * Verifies that actions are dispatched within NgZone
     */
    strictActionWithinNgZone: boolean;
    /**
     * Verifies that action types are not registered more than once
     */
    strictActionTypeUniqueness?: boolean;
}
export {};
