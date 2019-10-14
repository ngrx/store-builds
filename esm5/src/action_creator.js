import * as tslib_1 from "tslib";
/**
 * @description
 * Creates a configured `Creator` function that, when called, returns an object in the shape of the `Action` interface.
 *
 * Action creators reduce the explicitness of class-based action creators.
 *
 * @param type Describes the action that will be dispatched
 * @param config Additional metadata needed for the handling of the action.  See {@link createAction#usage-notes Usage Notes}.
 *
 * @usageNotes
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
 */
export function createAction(type, config) {
    if (typeof config === 'function') {
        return defineType(type, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return (tslib_1.__assign({}, config.apply(void 0, tslib_1.__spread(args)), { type: type }));
        });
    }
    var as = config ? config._as : 'empty';
    switch (as) {
        case 'empty':
            return defineType(type, function () { return ({ type: type }); });
        case 'props':
            return defineType(type, function (props) { return (tslib_1.__assign({}, props, { type: type })); });
        default:
            throw new Error('Unexpected config.');
    }
}
export function props() {
    // the return type does not match TypePropertyIsNotAllowed, so double casting
    // is used.
    return { _as: 'props', _p: undefined };
}
export function union(creators) {
    return undefined;
}
function defineType(type, creator) {
    return Object.defineProperty(creator, 'type', {
        value: type,
        writable: false,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uX2NyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9hY3Rpb25fY3JlYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBMkJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVFRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQzFCLElBQU8sRUFDUCxNQUE2QjtJQUU3QixJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsRUFBRTtRQUNoQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFBQyxjQUFjO2lCQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7Z0JBQWQseUJBQWM7O1lBQUssT0FBQSxzQkFDdkMsTUFBTSxnQ0FBSSxJQUFJLE1BQ2pCLElBQUksTUFBQSxJQUNKO1FBSDBDLENBRzFDLENBQUMsQ0FBQztLQUNMO0lBQ0QsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDekMsUUFBUSxFQUFFLEVBQUU7UUFDVixLQUFLLE9BQU87WUFDVixPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLEVBQVYsQ0FBVSxDQUFDLENBQUM7UUFDNUMsS0FBSyxPQUFPO1lBQ1YsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQUMsS0FBYSxJQUFLLE9BQUEsc0JBQ3RDLEtBQUssSUFDUixJQUFJLE1BQUEsSUFDSixFQUh5QyxDQUd6QyxDQUFDLENBQUM7UUFDTjtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUN6QztBQUNILENBQUM7QUFFRCxNQUFNLFVBQVUsS0FBSztJQUNuQiw2RUFBNkU7SUFDN0UsV0FBVztJQUNYLE9BQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxTQUFVLEVBQW9DLENBQUM7QUFDN0UsQ0FBQztBQUVELE1BQU0sVUFBVSxLQUFLLENBRW5CLFFBQVc7SUFDWCxPQUFPLFNBQVUsQ0FBQztBQUNwQixDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsSUFBWSxFQUFFLE9BQWdCO0lBQ2hELE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFO1FBQzVDLEtBQUssRUFBRSxJQUFJO1FBQ1gsUUFBUSxFQUFFLEtBQUs7S0FDaEIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENyZWF0b3IsXG4gIEFjdGlvbkNyZWF0b3IsXG4gIFR5cGVkQWN0aW9uLFxuICBGdW5jdGlvbldpdGhQYXJhbWV0ZXJzVHlwZSxcbiAgUHJvcHNSZXR1cm5UeXBlLFxuICBEaXNhbGxvd0FycmF5c0FuZFR5cGVQcm9wZXJ0eSxcbn0gZnJvbSAnLi9tb2RlbHMnO1xuXG4vLyBBY3Rpb24gY3JlYXRvcnMgdGFrZW4gZnJvbSB0cy1hY3Rpb24gbGlicmFyeSBhbmQgbW9kaWZpZWQgYSBiaXQgdG8gYmV0dGVyXG4vLyBmaXQgY3VycmVudCBOZ1J4IHVzYWdlLiBUaGFuayB5b3UgTmljaG9sYXMgSmFtaWVzb24gKEBjYXJ0YW50KS5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbjxUIGV4dGVuZHMgc3RyaW5nPihcbiAgdHlwZTogVFxuKTogQWN0aW9uQ3JlYXRvcjxULCAoKSA9PiBUeXBlZEFjdGlvbjxUPj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uPFQgZXh0ZW5kcyBzdHJpbmcsIFAgZXh0ZW5kcyBvYmplY3Q+KFxuICB0eXBlOiBULFxuICBjb25maWc6IHsgX2FzOiAncHJvcHMnOyBfcDogUCB9XG4pOiBBY3Rpb25DcmVhdG9yPFQsIChwcm9wczogUCkgPT4gUCAmIFR5cGVkQWN0aW9uPFQ+PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3Rpb248XG4gIFQgZXh0ZW5kcyBzdHJpbmcsXG4gIFAgZXh0ZW5kcyBhbnlbXSxcbiAgUiBleHRlbmRzIG9iamVjdFxuPihcbiAgdHlwZTogVCxcbiAgY3JlYXRvcjogQ3JlYXRvcjxQLCBEaXNhbGxvd0FycmF5c0FuZFR5cGVQcm9wZXJ0eTxSPj5cbik6IEZ1bmN0aW9uV2l0aFBhcmFtZXRlcnNUeXBlPFAsIFIgJiBUeXBlZEFjdGlvbjxUPj4gJiBUeXBlZEFjdGlvbjxUPjtcbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDcmVhdGVzIGEgY29uZmlndXJlZCBgQ3JlYXRvcmAgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsIHJldHVybnMgYW4gb2JqZWN0IGluIHRoZSBzaGFwZSBvZiB0aGUgYEFjdGlvbmAgaW50ZXJmYWNlLlxuICpcbiAqIEFjdGlvbiBjcmVhdG9ycyByZWR1Y2UgdGhlIGV4cGxpY2l0bmVzcyBvZiBjbGFzcy1iYXNlZCBhY3Rpb24gY3JlYXRvcnMuXG4gKlxuICogQHBhcmFtIHR5cGUgRGVzY3JpYmVzIHRoZSBhY3Rpb24gdGhhdCB3aWxsIGJlIGRpc3BhdGNoZWRcbiAqIEBwYXJhbSBjb25maWcgQWRkaXRpb25hbCBtZXRhZGF0YSBuZWVkZWQgZm9yIHRoZSBoYW5kbGluZyBvZiB0aGUgYWN0aW9uLiAgU2VlIHtAbGluayBjcmVhdGVBY3Rpb24jdXNhZ2Utbm90ZXMgVXNhZ2UgTm90ZXN9LlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogKipEZWNsYXJpbmcgYW4gYWN0aW9uIGNyZWF0b3IqKlxuICpcbiAqIFdpdGhvdXQgYWRkaXRpb25hbCBtZXRhZGF0YTpcbiAqIGBgYHRzXG4gKiBleHBvcnQgY29uc3QgaW5jcmVtZW50ID0gY3JlYXRlQWN0aW9uKCdbQ291bnRlcl0gSW5jcmVtZW50Jyk7XG4gKiBgYGBcbiAqIFdpdGggYWRkaXRpb25hbCBtZXRhZGF0YTpcbiAqIGBgYHRzXG4gKiBleHBvcnQgY29uc3QgbG9naW5TdWNjZXNzID0gY3JlYXRlQWN0aW9uKFxuICogICAnW0F1dGgvQVBJXSBMb2dpbiBTdWNjZXNzJyxcbiAqICAgcHJvcHM8eyB1c2VyOiBVc2VyIH0+KClcbiAqICk7XG4gKiBgYGBcbiAqIFdpdGggYSBmdW5jdGlvbjpcbiAqIGBgYHRzXG4gKiBleHBvcnQgY29uc3QgbG9naW5TdWNjZXNzID0gY3JlYXRlQWN0aW9uKFxuICogICAnW0F1dGgvQVBJXSBMb2dpbiBTdWNjZXNzJyxcbiAqICAgKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gcmVzcG9uc2UudXNlclxuICogKTtcbiAqIGBgYFxuICpcbiAqICoqRGlzcGF0Y2hpbmcgYW4gYWN0aW9uKipcbiAqXG4gKiBXaXRob3V0IGFkZGl0aW9uYWwgbWV0YWRhdGE6XG4gKiBgYGB0c1xuICogc3RvcmUuZGlzcGF0Y2goaW5jcmVtZW50KCkpO1xuICogYGBgXG4gKiBXaXRoIGFkZGl0aW9uYWwgbWV0YWRhdGE6XG4gKiBgYGB0c1xuICogc3RvcmUuZGlzcGF0Y2gobG9naW5TdWNjZXNzKHsgdXNlcjogbmV3VXNlciB9KSk7XG4gKiBgYGBcbiAqXG4gKiAqKlJlZmVyZW5jaW5nIGFuIGFjdGlvbiBpbiBhIHJlZHVjZXIqKlxuICpcbiAqIFVzaW5nIGEgc3dpdGNoIHN0YXRlbWVudDpcbiAqIGBgYHRzXG4gKiBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gKiAgIC8vIC4uLlxuICogICBjYXNlIEF1dGhBcGlBY3Rpb25zLmxvZ2luU3VjY2Vzcy50eXBlOiB7XG4gKiAgICAgcmV0dXJuIHtcbiAqICAgICAgIC4uLnN0YXRlLFxuICogICAgICAgdXNlcjogYWN0aW9uLnVzZXJcbiAqICAgICB9O1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqIFVzaW5nIGEgcmVkdWNlciBjcmVhdG9yOlxuICogYGBgdHNcbiAqIG9uKEF1dGhBcGlBY3Rpb25zLmxvZ2luU3VjY2VzcywgKHN0YXRlLCB7IHVzZXIgfSkgPT4gKHsgLi4uc3RhdGUsIHVzZXIgfSkpXG4gKiBgYGBcbiAqXG4gKiAgKipSZWZlcmVuY2luZyBhbiBhY3Rpb24gaW4gYW4gZWZmZWN0KipcbiAqIGBgYHRzXG4gKiBlZmZlY3ROYW1lJCA9IGNyZWF0ZUVmZmVjdChcbiAqICAgKCkgPT4gdGhpcy5hY3Rpb25zJC5waXBlKFxuICogICAgIG9mVHlwZShBdXRoQXBpQWN0aW9ucy5sb2dpblN1Y2Nlc3MpLFxuICogICAgIC8vIC4uLlxuICogICApXG4gKiApO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3Rpb248VCBleHRlbmRzIHN0cmluZywgQyBleHRlbmRzIENyZWF0b3I+KFxuICB0eXBlOiBULFxuICBjb25maWc/OiB7IF9hczogJ3Byb3BzJyB9IHwgQ1xuKTogQ3JlYXRvciB7XG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGRlZmluZVR5cGUodHlwZSwgKC4uLmFyZ3M6IGFueVtdKSA9PiAoe1xuICAgICAgLi4uY29uZmlnKC4uLmFyZ3MpLFxuICAgICAgdHlwZSxcbiAgICB9KSk7XG4gIH1cbiAgY29uc3QgYXMgPSBjb25maWcgPyBjb25maWcuX2FzIDogJ2VtcHR5JztcbiAgc3dpdGNoIChhcykge1xuICAgIGNhc2UgJ2VtcHR5JzpcbiAgICAgIHJldHVybiBkZWZpbmVUeXBlKHR5cGUsICgpID0+ICh7IHR5cGUgfSkpO1xuICAgIGNhc2UgJ3Byb3BzJzpcbiAgICAgIHJldHVybiBkZWZpbmVUeXBlKHR5cGUsIChwcm9wczogb2JqZWN0KSA9PiAoe1xuICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgdHlwZSxcbiAgICAgIH0pKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIGNvbmZpZy4nKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvcHM8UCBleHRlbmRzIG9iamVjdD4oKTogUHJvcHNSZXR1cm5UeXBlPFA+IHtcbiAgLy8gdGhlIHJldHVybiB0eXBlIGRvZXMgbm90IG1hdGNoIFR5cGVQcm9wZXJ0eUlzTm90QWxsb3dlZCwgc28gZG91YmxlIGNhc3RpbmdcbiAgLy8gaXMgdXNlZC5cbiAgcmV0dXJuICh7IF9hczogJ3Byb3BzJywgX3A6IHVuZGVmaW5lZCEgfSBhcyB1bmtub3duKSBhcyBQcm9wc1JldHVyblR5cGU8UD47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmlvbjxcbiAgQyBleHRlbmRzIHsgW2tleTogc3RyaW5nXTogQWN0aW9uQ3JlYXRvcjxzdHJpbmcsIENyZWF0b3I+IH1cbj4oY3JlYXRvcnM6IEMpOiBSZXR1cm5UeXBlPENba2V5b2YgQ10+IHtcbiAgcmV0dXJuIHVuZGVmaW5lZCE7XG59XG5cbmZ1bmN0aW9uIGRlZmluZVR5cGUodHlwZTogc3RyaW5nLCBjcmVhdG9yOiBDcmVhdG9yKTogQ3JlYXRvciB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRvciwgJ3R5cGUnLCB7XG4gICAgdmFsdWU6IHR5cGUsXG4gICAgd3JpdGFibGU6IGZhbHNlLFxuICB9KTtcbn1cbiJdfQ==