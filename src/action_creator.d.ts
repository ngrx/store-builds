import { Creator, ActionCreator, TypedAction, FunctionWithParametersType, PropsReturnType, DisallowArraysAndTypeProperty } from './models';
export declare function createAction<T extends string>(type: T): ActionCreator<T, () => TypedAction<T>>;
export declare function createAction<T extends string, P extends object>(type: T, config: {
    _as: 'props';
    _p: P;
}): ActionCreator<T, (props: P) => P & TypedAction<T>>;
export declare function createAction<T extends string, P extends any[], R extends object>(type: T, creator: Creator<P, DisallowArraysAndTypeProperty<R>>): FunctionWithParametersType<P, R & TypedAction<T>> & TypedAction<T>;
export declare function props<P extends object>(): PropsReturnType<P>;
export declare function union<C extends {
    [key: string]: ActionCreator<string, Creator>;
}>(creators: C): ReturnType<C[keyof C]>;
