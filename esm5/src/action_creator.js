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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uX2NyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9hY3Rpb25fY3JlYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBMkJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVFRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQzFCLElBQU8sRUFDUCxNQUE2QjtJQUU3QixJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsRUFBRTtRQUNoQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFBQyxjQUFjO2lCQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7Z0JBQWQseUJBQWM7O1lBQUssT0FBQSxzQkFDdkMsTUFBTSxnQ0FBSSxJQUFJLE1BQ2pCLElBQUksTUFBQSxJQUNKO1FBSDBDLENBRzFDLENBQUMsQ0FBQztLQUNMO0lBQ0QsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDekMsUUFBUSxFQUFFLEVBQUU7UUFDVixLQUFLLE9BQU87WUFDVixPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLEVBQVYsQ0FBVSxDQUFDLENBQUM7UUFDNUMsS0FBSyxPQUFPO1lBQ1YsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQUMsS0FBYSxJQUFLLE9BQUEsc0JBQ3RDLEtBQUssSUFDUixJQUFJLE1BQUEsSUFDSixFQUh5QyxDQUd6QyxDQUFDLENBQUM7UUFDTjtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUN6QztBQUNILENBQUM7QUFFRCxNQUFNLFVBQVUsS0FBSztJQUNuQiw2RUFBNkU7SUFDN0UsV0FBVztJQUNYLE9BQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxTQUFVLEVBQW9DLENBQUM7QUFDN0UsQ0FBQztBQUVELE1BQU0sVUFBVSxLQUFLLENBRW5CLFFBQVc7SUFDWCxPQUFPLFNBQVUsQ0FBQztBQUNwQixDQUFDO0FBRUQsU0FBUyxVQUFVLENBQ2pCLElBQU8sRUFDUCxPQUFnQjtJQUVoQixPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRTtRQUM1QyxLQUFLLEVBQUUsSUFBSTtRQUNYLFFBQVEsRUFBRSxLQUFLO0tBQ2hCLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDcmVhdG9yLFxuICBBY3Rpb25DcmVhdG9yLFxuICBUeXBlZEFjdGlvbixcbiAgRnVuY3Rpb25XaXRoUGFyYW1ldGVyc1R5cGUsXG4gIFByb3BzUmV0dXJuVHlwZSxcbiAgRGlzYWxsb3dBcnJheXNBbmRUeXBlUHJvcGVydHksXG59IGZyb20gJy4vbW9kZWxzJztcblxuLy8gQWN0aW9uIGNyZWF0b3JzIHRha2VuIGZyb20gdHMtYWN0aW9uIGxpYnJhcnkgYW5kIG1vZGlmaWVkIGEgYml0IHRvIGJldHRlclxuLy8gZml0IGN1cnJlbnQgTmdSeCB1c2FnZS4gVGhhbmsgeW91IE5pY2hvbGFzIEphbWllc29uIChAY2FydGFudCkuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3Rpb248VCBleHRlbmRzIHN0cmluZz4oXG4gIHR5cGU6IFRcbik6IEFjdGlvbkNyZWF0b3I8VCwgKCkgPT4gVHlwZWRBY3Rpb248VD4+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbjxUIGV4dGVuZHMgc3RyaW5nLCBQIGV4dGVuZHMgb2JqZWN0PihcbiAgdHlwZTogVCxcbiAgY29uZmlnOiB7IF9hczogJ3Byb3BzJzsgX3A6IFAgfVxuKTogQWN0aW9uQ3JlYXRvcjxULCAocHJvcHM6IFApID0+IFAgJiBUeXBlZEFjdGlvbjxUPj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uPFxuICBUIGV4dGVuZHMgc3RyaW5nLFxuICBQIGV4dGVuZHMgYW55W10sXG4gIFIgZXh0ZW5kcyBvYmplY3Rcbj4oXG4gIHR5cGU6IFQsXG4gIGNyZWF0b3I6IENyZWF0b3I8UCwgRGlzYWxsb3dBcnJheXNBbmRUeXBlUHJvcGVydHk8Uj4+XG4pOiBGdW5jdGlvbldpdGhQYXJhbWV0ZXJzVHlwZTxQLCBSICYgVHlwZWRBY3Rpb248VD4+ICYgVHlwZWRBY3Rpb248VD47XG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQ3JlYXRlcyBhIGNvbmZpZ3VyZWQgYENyZWF0b3JgIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLCByZXR1cm5zIGFuIG9iamVjdCBpbiB0aGUgc2hhcGUgb2YgdGhlIGBBY3Rpb25gIGludGVyZmFjZS5cbiAqXG4gKiBBY3Rpb24gY3JlYXRvcnMgcmVkdWNlIHRoZSBleHBsaWNpdG5lc3Mgb2YgY2xhc3MtYmFzZWQgYWN0aW9uIGNyZWF0b3JzLlxuICpcbiAqIEBwYXJhbSB0eXBlIERlc2NyaWJlcyB0aGUgYWN0aW9uIHRoYXQgd2lsbCBiZSBkaXNwYXRjaGVkXG4gKiBAcGFyYW0gY29uZmlnIEFkZGl0aW9uYWwgbWV0YWRhdGEgbmVlZGVkIGZvciB0aGUgaGFuZGxpbmcgb2YgdGhlIGFjdGlvbi4gIFNlZSB7QGxpbmsgY3JlYXRlQWN0aW9uI3VzYWdlLW5vdGVzIFVzYWdlIE5vdGVzfS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqICoqRGVjbGFyaW5nIGFuIGFjdGlvbiBjcmVhdG9yKipcbiAqXG4gKiBXaXRob3V0IGFkZGl0aW9uYWwgbWV0YWRhdGE6XG4gKiBgYGB0c1xuICogZXhwb3J0IGNvbnN0IGluY3JlbWVudCA9IGNyZWF0ZUFjdGlvbignW0NvdW50ZXJdIEluY3JlbWVudCcpO1xuICogYGBgXG4gKiBXaXRoIGFkZGl0aW9uYWwgbWV0YWRhdGE6XG4gKiBgYGB0c1xuICogZXhwb3J0IGNvbnN0IGxvZ2luU3VjY2VzcyA9IGNyZWF0ZUFjdGlvbihcbiAqICAgJ1tBdXRoL0FQSV0gTG9naW4gU3VjY2VzcycsXG4gKiAgIHByb3BzPHsgdXNlcjogVXNlciB9PigpXG4gKiApO1xuICogYGBgXG4gKiBXaXRoIGEgZnVuY3Rpb246XG4gKiBgYGB0c1xuICogZXhwb3J0IGNvbnN0IGxvZ2luU3VjY2VzcyA9IGNyZWF0ZUFjdGlvbihcbiAqICAgJ1tBdXRoL0FQSV0gTG9naW4gU3VjY2VzcycsXG4gKiAgIChyZXNwb25zZTogUmVzcG9uc2UpID0+IHJlc3BvbnNlLnVzZXJcbiAqICk7XG4gKiBgYGBcbiAqXG4gKiAqKkRpc3BhdGNoaW5nIGFuIGFjdGlvbioqXG4gKlxuICogV2l0aG91dCBhZGRpdGlvbmFsIG1ldGFkYXRhOlxuICogYGBgdHNcbiAqIHN0b3JlLmRpc3BhdGNoKGluY3JlbWVudCgpKTtcbiAqIGBgYFxuICogV2l0aCBhZGRpdGlvbmFsIG1ldGFkYXRhOlxuICogYGBgdHNcbiAqIHN0b3JlLmRpc3BhdGNoKGxvZ2luU3VjY2Vzcyh7IHVzZXI6IG5ld1VzZXIgfSkpO1xuICogYGBgXG4gKlxuICogKipSZWZlcmVuY2luZyBhbiBhY3Rpb24gaW4gYSByZWR1Y2VyKipcbiAqXG4gKiBVc2luZyBhIHN3aXRjaCBzdGF0ZW1lbnQ6XG4gKiBgYGB0c1xuICogc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICogICAvLyAuLi5cbiAqICAgY2FzZSBBdXRoQXBpQWN0aW9ucy5sb2dpblN1Y2Nlc3MudHlwZToge1xuICogICAgIHJldHVybiB7XG4gKiAgICAgICAuLi5zdGF0ZSxcbiAqICAgICAgIHVzZXI6IGFjdGlvbi51c2VyXG4gKiAgICAgfTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKiBVc2luZyBhIHJlZHVjZXIgY3JlYXRvcjpcbiAqIGBgYHRzXG4gKiBvbihBdXRoQXBpQWN0aW9ucy5sb2dpblN1Y2Nlc3MsIChzdGF0ZSwgeyB1c2VyIH0pID0+ICh7IC4uLnN0YXRlLCB1c2VyIH0pKVxuICogYGBgXG4gKlxuICogICoqUmVmZXJlbmNpbmcgYW4gYWN0aW9uIGluIGFuIGVmZmVjdCoqXG4gKiBgYGB0c1xuICogZWZmZWN0TmFtZSQgPSBjcmVhdGVFZmZlY3QoXG4gKiAgICgpID0+IHRoaXMuYWN0aW9ucyQucGlwZShcbiAqICAgICBvZlR5cGUoQXV0aEFwaUFjdGlvbnMubG9naW5TdWNjZXNzKSxcbiAqICAgICAvLyAuLi5cbiAqICAgKVxuICogKTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uPFQgZXh0ZW5kcyBzdHJpbmcsIEMgZXh0ZW5kcyBDcmVhdG9yPihcbiAgdHlwZTogVCxcbiAgY29uZmlnPzogeyBfYXM6ICdwcm9wcycgfSB8IENcbik6IEFjdGlvbkNyZWF0b3I8VD4ge1xuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBkZWZpbmVUeXBlKHR5cGUsICguLi5hcmdzOiBhbnlbXSkgPT4gKHtcbiAgICAgIC4uLmNvbmZpZyguLi5hcmdzKSxcbiAgICAgIHR5cGUsXG4gICAgfSkpO1xuICB9XG4gIGNvbnN0IGFzID0gY29uZmlnID8gY29uZmlnLl9hcyA6ICdlbXB0eSc7XG4gIHN3aXRjaCAoYXMpIHtcbiAgICBjYXNlICdlbXB0eSc6XG4gICAgICByZXR1cm4gZGVmaW5lVHlwZSh0eXBlLCAoKSA9PiAoeyB0eXBlIH0pKTtcbiAgICBjYXNlICdwcm9wcyc6XG4gICAgICByZXR1cm4gZGVmaW5lVHlwZSh0eXBlLCAocHJvcHM6IG9iamVjdCkgPT4gKHtcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgIHR5cGUsXG4gICAgICB9KSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBjb25maWcuJyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3BzPFAgZXh0ZW5kcyBvYmplY3Q+KCk6IFByb3BzUmV0dXJuVHlwZTxQPiB7XG4gIC8vIHRoZSByZXR1cm4gdHlwZSBkb2VzIG5vdCBtYXRjaCBUeXBlUHJvcGVydHlJc05vdEFsbG93ZWQsIHNvIGRvdWJsZSBjYXN0aW5nXG4gIC8vIGlzIHVzZWQuXG4gIHJldHVybiAoeyBfYXM6ICdwcm9wcycsIF9wOiB1bmRlZmluZWQhIH0gYXMgdW5rbm93bikgYXMgUHJvcHNSZXR1cm5UeXBlPFA+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pb248XG4gIEMgZXh0ZW5kcyB7IFtrZXk6IHN0cmluZ106IEFjdGlvbkNyZWF0b3I8c3RyaW5nLCBDcmVhdG9yPiB9XG4+KGNyZWF0b3JzOiBDKTogUmV0dXJuVHlwZTxDW2tleW9mIENdPiB7XG4gIHJldHVybiB1bmRlZmluZWQhO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVUeXBlPFQgZXh0ZW5kcyBzdHJpbmc+KFxuICB0eXBlOiBULFxuICBjcmVhdG9yOiBDcmVhdG9yXG4pOiBBY3Rpb25DcmVhdG9yPFQ+IHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdG9yLCAndHlwZScsIHtcbiAgICB2YWx1ZTogdHlwZSxcbiAgICB3cml0YWJsZTogZmFsc2UsXG4gIH0pO1xufVxuIl19