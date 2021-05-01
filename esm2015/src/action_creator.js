import { REGISTERED_ACTION_TYPES } from './globals';
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
    REGISTERED_ACTION_TYPES[type] = (REGISTERED_ACTION_TYPES[type] || 0) + 1;
    if (typeof config === 'function') {
        return defineType(type, (...args) => (Object.assign(Object.assign({}, config(...args)), { type })));
    }
    const as = config ? config._as : 'empty';
    switch (as) {
        case 'empty':
            return defineType(type, () => ({ type }));
        case 'props':
            return defineType(type, (props) => (Object.assign(Object.assign({}, props), { type })));
        default:
            throw new Error('Unexpected config.');
    }
}
export function props() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/naming-convention
    return { _as: 'props', _p: undefined };
}
export function union(creators) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return undefined;
}
function defineType(type, creator) {
    return Object.defineProperty(creator, 'type', {
        value: type,
        writable: false,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uX2NyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9hY3Rpb25fY3JlYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFvQnBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVFRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQzFCLElBQU8sRUFDUCxNQUE2QjtJQUU3Qix1QkFBdUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV6RSxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsRUFBRTtRQUNoQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQVcsRUFBRSxFQUFFLENBQUMsaUNBQ3ZDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUNsQixJQUFJLElBQ0osQ0FBQyxDQUFDO0tBQ0w7SUFDRCxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN6QyxRQUFRLEVBQUUsRUFBRTtRQUNWLEtBQUssT0FBTztZQUNWLE9BQU8sVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEtBQUssT0FBTztZQUNWLE9BQU8sVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsaUNBQ3RDLEtBQUssS0FDUixJQUFJLElBQ0osQ0FBQyxDQUFDO1FBQ047WUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7S0FDekM7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLEtBQUs7SUFDbkIsMEdBQTBHO0lBQzFHLE9BQU8sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxTQUFVLEVBQUUsQ0FBQztBQUMxQyxDQUFDO0FBRUQsTUFBTSxVQUFVLEtBQUssQ0FFbkIsUUFBVztJQUNYLG9FQUFvRTtJQUNwRSxPQUFPLFNBQVUsQ0FBQztBQUNwQixDQUFDO0FBRUQsU0FBUyxVQUFVLENBQ2pCLElBQU8sRUFDUCxPQUFnQjtJQUVoQixPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRTtRQUM1QyxLQUFLLEVBQUUsSUFBSTtRQUNYLFFBQVEsRUFBRSxLQUFLO0tBQ2hCLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDcmVhdG9yLFxuICBBY3Rpb25DcmVhdG9yLFxuICBUeXBlZEFjdGlvbixcbiAgRnVuY3Rpb25XaXRoUGFyYW1ldGVyc1R5cGUsXG4gIE5vdEFsbG93ZWRDaGVjayxcbiAgQWN0aW9uQ3JlYXRvclByb3BzLFxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBSRUdJU1RFUkVEX0FDVElPTl9UWVBFUyB9IGZyb20gJy4vZ2xvYmFscyc7XG5cbi8vIEFjdGlvbiBjcmVhdG9ycyB0YWtlbiBmcm9tIHRzLWFjdGlvbiBsaWJyYXJ5IGFuZCBtb2RpZmllZCBhIGJpdCB0byBiZXR0ZXJcbi8vIGZpdCBjdXJyZW50IE5nUnggdXNhZ2UuIFRoYW5rIHlvdSBOaWNob2xhcyBKYW1pZXNvbiAoQGNhcnRhbnQpLlxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uPFQgZXh0ZW5kcyBzdHJpbmc+KFxuICB0eXBlOiBUXG4pOiBBY3Rpb25DcmVhdG9yPFQsICgpID0+IFR5cGVkQWN0aW9uPFQ+PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3Rpb248VCBleHRlbmRzIHN0cmluZywgUCBleHRlbmRzIG9iamVjdD4oXG4gIHR5cGU6IFQsXG4gIGNvbmZpZzogQWN0aW9uQ3JlYXRvclByb3BzPFA+ICYgTm90QWxsb3dlZENoZWNrPFA+XG4pOiBBY3Rpb25DcmVhdG9yPFQsIChwcm9wczogUCAmIE5vdEFsbG93ZWRDaGVjazxQPikgPT4gUCAmIFR5cGVkQWN0aW9uPFQ+PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3Rpb248XG4gIFQgZXh0ZW5kcyBzdHJpbmcsXG4gIFAgZXh0ZW5kcyBhbnlbXSxcbiAgUiBleHRlbmRzIG9iamVjdFxuPihcbiAgdHlwZTogVCxcbiAgY3JlYXRvcjogQ3JlYXRvcjxQLCBSICYgTm90QWxsb3dlZENoZWNrPFI+PlxuKTogRnVuY3Rpb25XaXRoUGFyYW1ldGVyc1R5cGU8UCwgUiAmIFR5cGVkQWN0aW9uPFQ+PiAmIFR5cGVkQWN0aW9uPFQ+O1xuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENyZWF0ZXMgYSBjb25maWd1cmVkIGBDcmVhdG9yYCBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCwgcmV0dXJucyBhbiBvYmplY3QgaW4gdGhlIHNoYXBlIG9mIHRoZSBgQWN0aW9uYCBpbnRlcmZhY2UuXG4gKlxuICogQWN0aW9uIGNyZWF0b3JzIHJlZHVjZSB0aGUgZXhwbGljaXRuZXNzIG9mIGNsYXNzLWJhc2VkIGFjdGlvbiBjcmVhdG9ycy5cbiAqXG4gKiBAcGFyYW0gdHlwZSBEZXNjcmliZXMgdGhlIGFjdGlvbiB0aGF0IHdpbGwgYmUgZGlzcGF0Y2hlZFxuICogQHBhcmFtIGNvbmZpZyBBZGRpdGlvbmFsIG1ldGFkYXRhIG5lZWRlZCBmb3IgdGhlIGhhbmRsaW5nIG9mIHRoZSBhY3Rpb24uICBTZWUge0BsaW5rIGNyZWF0ZUFjdGlvbiN1c2FnZS1ub3RlcyBVc2FnZSBOb3Rlc30uXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiAqKkRlY2xhcmluZyBhbiBhY3Rpb24gY3JlYXRvcioqXG4gKlxuICogV2l0aG91dCBhZGRpdGlvbmFsIG1ldGFkYXRhOlxuICogYGBgdHNcbiAqIGV4cG9ydCBjb25zdCBpbmNyZW1lbnQgPSBjcmVhdGVBY3Rpb24oJ1tDb3VudGVyXSBJbmNyZW1lbnQnKTtcbiAqIGBgYFxuICogV2l0aCBhZGRpdGlvbmFsIG1ldGFkYXRhOlxuICogYGBgdHNcbiAqIGV4cG9ydCBjb25zdCBsb2dpblN1Y2Nlc3MgPSBjcmVhdGVBY3Rpb24oXG4gKiAgICdbQXV0aC9BUEldIExvZ2luIFN1Y2Nlc3MnLFxuICogICBwcm9wczx7IHVzZXI6IFVzZXIgfT4oKVxuICogKTtcbiAqIGBgYFxuICogV2l0aCBhIGZ1bmN0aW9uOlxuICogYGBgdHNcbiAqIGV4cG9ydCBjb25zdCBsb2dpblN1Y2Nlc3MgPSBjcmVhdGVBY3Rpb24oXG4gKiAgICdbQXV0aC9BUEldIExvZ2luIFN1Y2Nlc3MnLFxuICogICAocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiByZXNwb25zZS51c2VyXG4gKiApO1xuICogYGBgXG4gKlxuICogKipEaXNwYXRjaGluZyBhbiBhY3Rpb24qKlxuICpcbiAqIFdpdGhvdXQgYWRkaXRpb25hbCBtZXRhZGF0YTpcbiAqIGBgYHRzXG4gKiBzdG9yZS5kaXNwYXRjaChpbmNyZW1lbnQoKSk7XG4gKiBgYGBcbiAqIFdpdGggYWRkaXRpb25hbCBtZXRhZGF0YTpcbiAqIGBgYHRzXG4gKiBzdG9yZS5kaXNwYXRjaChsb2dpblN1Y2Nlc3MoeyB1c2VyOiBuZXdVc2VyIH0pKTtcbiAqIGBgYFxuICpcbiAqICoqUmVmZXJlbmNpbmcgYW4gYWN0aW9uIGluIGEgcmVkdWNlcioqXG4gKlxuICogVXNpbmcgYSBzd2l0Y2ggc3RhdGVtZW50OlxuICogYGBgdHNcbiAqIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAqICAgLy8gLi4uXG4gKiAgIGNhc2UgQXV0aEFwaUFjdGlvbnMubG9naW5TdWNjZXNzLnR5cGU6IHtcbiAqICAgICByZXR1cm4ge1xuICogICAgICAgLi4uc3RhdGUsXG4gKiAgICAgICB1c2VyOiBhY3Rpb24udXNlclxuICogICAgIH07XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICogVXNpbmcgYSByZWR1Y2VyIGNyZWF0b3I6XG4gKiBgYGB0c1xuICogb24oQXV0aEFwaUFjdGlvbnMubG9naW5TdWNjZXNzLCAoc3RhdGUsIHsgdXNlciB9KSA9PiAoeyAuLi5zdGF0ZSwgdXNlciB9KSlcbiAqIGBgYFxuICpcbiAqICAqKlJlZmVyZW5jaW5nIGFuIGFjdGlvbiBpbiBhbiBlZmZlY3QqKlxuICogYGBgdHNcbiAqIGVmZmVjdE5hbWUkID0gY3JlYXRlRWZmZWN0KFxuICogICAoKSA9PiB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gKiAgICAgb2ZUeXBlKEF1dGhBcGlBY3Rpb25zLmxvZ2luU3VjY2VzcyksXG4gKiAgICAgLy8gLi4uXG4gKiAgIClcbiAqICk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbjxUIGV4dGVuZHMgc3RyaW5nLCBDIGV4dGVuZHMgQ3JlYXRvcj4oXG4gIHR5cGU6IFQsXG4gIGNvbmZpZz86IHsgX2FzOiAncHJvcHMnIH0gfCBDXG4pOiBBY3Rpb25DcmVhdG9yPFQ+IHtcbiAgUkVHSVNURVJFRF9BQ1RJT05fVFlQRVNbdHlwZV0gPSAoUkVHSVNURVJFRF9BQ1RJT05fVFlQRVNbdHlwZV0gfHwgMCkgKyAxO1xuXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGRlZmluZVR5cGUodHlwZSwgKC4uLmFyZ3M6IGFueVtdKSA9PiAoe1xuICAgICAgLi4uY29uZmlnKC4uLmFyZ3MpLFxuICAgICAgdHlwZSxcbiAgICB9KSk7XG4gIH1cbiAgY29uc3QgYXMgPSBjb25maWcgPyBjb25maWcuX2FzIDogJ2VtcHR5JztcbiAgc3dpdGNoIChhcykge1xuICAgIGNhc2UgJ2VtcHR5JzpcbiAgICAgIHJldHVybiBkZWZpbmVUeXBlKHR5cGUsICgpID0+ICh7IHR5cGUgfSkpO1xuICAgIGNhc2UgJ3Byb3BzJzpcbiAgICAgIHJldHVybiBkZWZpbmVUeXBlKHR5cGUsIChwcm9wczogb2JqZWN0KSA9PiAoe1xuICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgdHlwZSxcbiAgICAgIH0pKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIGNvbmZpZy4nKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvcHM8UCBleHRlbmRzIG9iamVjdD4oKTogQWN0aW9uQ3JlYXRvclByb3BzPFA+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24sIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICByZXR1cm4geyBfYXM6ICdwcm9wcycsIF9wOiB1bmRlZmluZWQhIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmlvbjxcbiAgQyBleHRlbmRzIHsgW2tleTogc3RyaW5nXTogQWN0aW9uQ3JlYXRvcjxzdHJpbmcsIENyZWF0b3I+IH1cbj4oY3JlYXRvcnM6IEMpOiBSZXR1cm5UeXBlPENba2V5b2YgQ10+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgcmV0dXJuIHVuZGVmaW5lZCE7XG59XG5cbmZ1bmN0aW9uIGRlZmluZVR5cGU8VCBleHRlbmRzIHN0cmluZz4oXG4gIHR5cGU6IFQsXG4gIGNyZWF0b3I6IENyZWF0b3Jcbik6IEFjdGlvbkNyZWF0b3I8VD4ge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGNyZWF0b3IsICd0eXBlJywge1xuICAgIHZhbHVlOiB0eXBlLFxuICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgfSk7XG59XG4iXX0=