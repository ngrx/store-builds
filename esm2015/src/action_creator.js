/**
 * @fileoverview added by tsickle
 * Generated from: src/action_creator.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { REGISTERED_ACTION_TYPES } from './globals';
/**
 * \@description
 * Creates a configured `Creator` function that, when called, returns an object in the shape of the `Action` interface.
 *
 * Action creators reduce the explicitness of class-based action creators.
 *
 * \@usageNotes
 *
 * **Declaring an action creator**
 *
 * Without additional metadata:
 * ```ts
 * export const increment = createAction('[Counter] Increment');
 * ```
 * With additional metadata:
 * ```ts
 * export const loginSuccess = createAction(
 *   '[Auth/API] Login Success',
 *   props<{ user: User }>()
 * );
 * ```
 * With a function:
 * ```ts
 * export const loginSuccess = createAction(
 *   '[Auth/API] Login Success',
 *   (response: Response) => response.user
 * );
 * ```
 *
 * **Dispatching an action**
 *
 * Without additional metadata:
 * ```ts
 * store.dispatch(increment());
 * ```
 * With additional metadata:
 * ```ts
 * store.dispatch(loginSuccess({ user: newUser }));
 * ```
 *
 * **Referencing an action in a reducer**
 *
 * Using a switch statement:
 * ```ts
 * switch (action.type) {
 *   // ...
 *   case AuthApiActions.loginSuccess.type: {
 *     return {
 *       ...state,
 *       user: action.user
 *     };
 *   }
 * }
 * ```
 * Using a reducer creator:
 * ```ts
 * on(AuthApiActions.loginSuccess, (state, { user }) => ({ ...state, user }))
 * ```
 *
 *  **Referencing an action in an effect**
 * ```ts
 * effectName$ = createEffect(
 *   () => this.actions$.pipe(
 *     ofType(AuthApiActions.loginSuccess),
 *     // ...
 *   )
 * );
 * ```
 * @template T, C
 * @param {?} type Describes the action that will be dispatched
 * @param {?=} config Additional metadata needed for the handling of the action.  See {\@link createAction#usage-notes Usage Notes}.
 *
 * @return {?}
 */
export function createAction(type, config) {
    REGISTERED_ACTION_TYPES[type] = (REGISTERED_ACTION_TYPES[type] || 0) + 1;
    if (typeof config === 'function') {
        return defineType(type, (/**
         * @param {...?} args
         * @return {?}
         */
        (...args) => (Object.assign(Object.assign({}, config(...args)), { type }))));
    }
    /** @type {?} */
    const as = config ? config._as : 'empty';
    switch (as) {
        case 'empty':
            return defineType(type, (/**
             * @return {?}
             */
            () => ({ type })));
        case 'props':
            return defineType(type, (/**
             * @param {?} props
             * @return {?}
             */
            (props) => (Object.assign(Object.assign({}, props), { type }))));
        default:
            throw new Error('Unexpected config.');
    }
}
/**
 * @template P
 * @return {?}
 */
export function props() {
    return { _as: 'props', _p: (/** @type {?} */ (undefined)) };
}
/**
 * @template C
 * @param {?} creators
 * @return {?}
 */
export function union(creators) {
    return (/** @type {?} */ (undefined));
}
/**
 * @template T
 * @param {?} type
 * @param {?} creator
 * @return {?}
 */
function defineType(type, creator) {
    return Object.defineProperty(creator, 'type', {
        value: type,
        writable: false,
    });
}
//# sourceMappingURL=action_creator.js.map