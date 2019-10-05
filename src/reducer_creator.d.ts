import { ActionCreator, ActionReducer, ActionType, Action } from './models';
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
export declare function on<C1 extends ActionCreator, C2 extends ActionCreator, C3 extends ActionCreator, C4 extends ActionCreator, S>(creator1: C1, creator2: C2, creator3: C3, creator4: C4, reducer: OnReducer<S, [C1, C2, C3, C4]>): On<S>;
export declare function on<C1 extends ActionCreator, C2 extends ActionCreator, C3 extends ActionCreator, C4 extends ActionCreator, C5 extends ActionCreator, S>(creator1: C1, creator2: C2, creator3: C3, creator4: C4, creator5: C5, reducer: OnReducer<S, [C1, C2, C3, C4, C5]>): On<S>;
export declare function on<C1 extends ActionCreator, C2 extends ActionCreator, C3 extends ActionCreator, C4 extends ActionCreator, C5 extends ActionCreator, C6 extends ActionCreator, S>(creator1: C1, creator2: C2, creator3: C3, creator4: C4, creator5: C5, creator6: C6, reducer: OnReducer<S, [C1, C2, C3, C4, C5, C6]>): On<S>;
export declare function on<C1 extends ActionCreator, C2 extends ActionCreator, C3 extends ActionCreator, C4 extends ActionCreator, C5 extends ActionCreator, C6 extends ActionCreator, C7 extends ActionCreator, S>(creator1: C1, creator2: C2, creator3: C3, creator4: C4, creator5: C5, creator6: C6, creator7: C7, reducer: OnReducer<S, [C1, C2, C3, C4, C5, C6, C7]>): On<S>;
export declare function on<C1 extends ActionCreator, C2 extends ActionCreator, C3 extends ActionCreator, C4 extends ActionCreator, C5 extends ActionCreator, C6 extends ActionCreator, C7 extends ActionCreator, C8 extends ActionCreator, S>(creator1: C1, creator2: C2, creator3: C3, creator4: C4, creator5: C5, creator6: C6, creator7: C7, creator8: C8, reducer: OnReducer<S, [C1, C2, C3, C4, C5, C6, C7, C8]>): On<S>;
export declare function on<C1 extends ActionCreator, C2 extends ActionCreator, C3 extends ActionCreator, C4 extends ActionCreator, C5 extends ActionCreator, C6 extends ActionCreator, C7 extends ActionCreator, C8 extends ActionCreator, C9 extends ActionCreator, S>(creator1: C1, creator2: C2, creator3: C3, creator4: C4, creator5: C5, creator6: C6, creator7: C7, creator8: C8, creator9: C9, reducer: OnReducer<S, [C1, C2, C3, C4, C5, C6, C7, C8, C9]>): On<S>;
export declare function on<C1 extends ActionCreator, C2 extends ActionCreator, C3 extends ActionCreator, C4 extends ActionCreator, C5 extends ActionCreator, C6 extends ActionCreator, C7 extends ActionCreator, C8 extends ActionCreator, C9 extends ActionCreator, C10 extends ActionCreator, S>(creator1: C1, creator2: C2, creator3: C3, creator4: C4, creator5: C5, creator6: C6, creator7: C7, creator8: C8, creator9: C9, creator10: C10, reducer: OnReducer<S, [C1, C2, C3, C4, C5, C6, C7, C8, C9, C10]>): On<S>;
export declare function on<S>(creator: ActionCreator, ...rest: (ActionCreator | OnReducer<S, [ActionCreator]>)[]): On<S>;
/**
 * @description
 * Creates a reducer function to handle state transitions.
 *
 * Reducer creators reduce the explicitness of reducer functions with switch statements.
 *
 * @param initialState Provides a state value if the current state is `undefined`, as it is initially.
 * @param ons Associations between actions and state changes.
 * @returns A reducer function.
 *
 * @usageNotes
 *
 * - Must be used with `ActionCreator`'s (returned by `createAction`).  Cannot be used with class-based action creators.
 * - An action can be associated with multiple state change functions. In this case the functions will be executed in the specified order.
 * - The returned `ActionReducer` should additionally be returned from an exported `reducer` function.
 * This is because [function calls are not supported](https://angular.io/guide/aot-compiler#function-calls-are-not-supported) by the AOT compiler.
 *
 * **Declaring a reducer creator with an exported reducer function**
 *
 * ```ts
 * const featureReducer = createReducer(
 *   initialState,
 *   on(
 *     featureActions.actionOne,
 *     featureActions.actionTwo,
 *     (state, { updatedValue }) => ({ ...state, prop: updatedValue })
 *   ),
 *   on(featureActions.actionThree, () => initialState);
 * );
 *
 * export function reducer(state: State | undefined, action: Action) {
 *   return featureReducer(state, action);
 * }
 * ```
 */
export declare function createReducer<S, A extends Action = Action>(initialState: S, ...ons: On<S>[]): ActionReducer<S, A>;
