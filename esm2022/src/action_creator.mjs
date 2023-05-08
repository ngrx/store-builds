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
        return defineType(type, (...args) => ({
            ...config(...args),
            type,
        }));
    }
    const as = config ? config._as : 'empty';
    switch (as) {
        case 'empty':
            return defineType(type, () => ({ type }));
        case 'props':
            return defineType(type, (props) => ({
                ...props,
                type,
            }));
        default:
            throw new Error('Unexpected config.');
    }
}
export function props() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uX2NyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9hY3Rpb25fY3JlYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFTQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFvQnBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVFRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQzFCLElBQU8sRUFDUCxNQUE2QjtJQUU3Qix1QkFBdUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV6RSxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsRUFBRTtRQUNoQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMzQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJO1NBQ0wsQ0FBQyxDQUFDLENBQUM7S0FDTDtJQUNELE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3pDLFFBQVEsRUFBRSxFQUFFO1FBQ1YsS0FBSyxPQUFPO1lBQ1YsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsS0FBSyxPQUFPO1lBQ1YsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMxQyxHQUFHLEtBQUs7Z0JBQ1IsSUFBSTthQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ047WUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7S0FDekM7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLEtBQUs7SUFJbkIsb0VBQW9FO0lBQ3BFLE9BQU8sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxTQUFVLEVBQUUsQ0FBQztBQUMxQyxDQUFDO0FBRUQsTUFBTSxVQUFVLEtBQUssQ0FFbkIsUUFBVztJQUNYLG9FQUFvRTtJQUNwRSxPQUFPLFNBQVUsQ0FBQztBQUNwQixDQUFDO0FBRUQsU0FBUyxVQUFVLENBQ2pCLElBQU8sRUFDUCxPQUFnQjtJQUVoQixPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRTtRQUM1QyxLQUFLLEVBQUUsSUFBSTtRQUNYLFFBQVEsRUFBRSxLQUFLO0tBQ2hCLENBQXFCLENBQUM7QUFDekIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENyZWF0b3IsXG4gIEFjdGlvbkNyZWF0b3IsXG4gIFR5cGVkQWN0aW9uLFxuICBGdW5jdGlvbldpdGhQYXJhbWV0ZXJzVHlwZSxcbiAgTm90QWxsb3dlZENoZWNrLFxuICBBY3Rpb25DcmVhdG9yUHJvcHMsXG4gIE5vdEFsbG93ZWRJblByb3BzQ2hlY2ssXG59IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IFJFR0lTVEVSRURfQUNUSU9OX1RZUEVTIH0gZnJvbSAnLi9nbG9iYWxzJztcblxuLy8gQWN0aW9uIGNyZWF0b3JzIHRha2VuIGZyb20gdHMtYWN0aW9uIGxpYnJhcnkgYW5kIG1vZGlmaWVkIGEgYml0IHRvIGJldHRlclxuLy8gZml0IGN1cnJlbnQgTmdSeCB1c2FnZS4gVGhhbmsgeW91IE5pY2hvbGFzIEphbWllc29uIChAY2FydGFudCkuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3Rpb248VCBleHRlbmRzIHN0cmluZz4oXG4gIHR5cGU6IFRcbik6IEFjdGlvbkNyZWF0b3I8VCwgKCkgPT4gVHlwZWRBY3Rpb248VD4+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbjxUIGV4dGVuZHMgc3RyaW5nLCBQIGV4dGVuZHMgb2JqZWN0PihcbiAgdHlwZTogVCxcbiAgY29uZmlnOiBBY3Rpb25DcmVhdG9yUHJvcHM8UD4gJiBOb3RBbGxvd2VkQ2hlY2s8UD5cbik6IEFjdGlvbkNyZWF0b3I8VCwgKHByb3BzOiBQICYgTm90QWxsb3dlZENoZWNrPFA+KSA9PiBQICYgVHlwZWRBY3Rpb248VD4+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbjxcbiAgVCBleHRlbmRzIHN0cmluZyxcbiAgUCBleHRlbmRzIGFueVtdLFxuICBSIGV4dGVuZHMgb2JqZWN0XG4+KFxuICB0eXBlOiBULFxuICBjcmVhdG9yOiBDcmVhdG9yPFAsIFIgJiBOb3RBbGxvd2VkQ2hlY2s8Uj4+XG4pOiBGdW5jdGlvbldpdGhQYXJhbWV0ZXJzVHlwZTxQLCBSICYgVHlwZWRBY3Rpb248VD4+ICYgVHlwZWRBY3Rpb248VD47XG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQ3JlYXRlcyBhIGNvbmZpZ3VyZWQgYENyZWF0b3JgIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLCByZXR1cm5zIGFuIG9iamVjdCBpbiB0aGUgc2hhcGUgb2YgdGhlIGBBY3Rpb25gIGludGVyZmFjZS5cbiAqXG4gKiBBY3Rpb24gY3JlYXRvcnMgcmVkdWNlIHRoZSBleHBsaWNpdG5lc3Mgb2YgY2xhc3MtYmFzZWQgYWN0aW9uIGNyZWF0b3JzLlxuICpcbiAqIEBwYXJhbSB0eXBlIERlc2NyaWJlcyB0aGUgYWN0aW9uIHRoYXQgd2lsbCBiZSBkaXNwYXRjaGVkXG4gKiBAcGFyYW0gY29uZmlnIEFkZGl0aW9uYWwgbWV0YWRhdGEgbmVlZGVkIGZvciB0aGUgaGFuZGxpbmcgb2YgdGhlIGFjdGlvbi4gIFNlZSB7QGxpbmsgY3JlYXRlQWN0aW9uI3VzYWdlLW5vdGVzIFVzYWdlIE5vdGVzfS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqICoqRGVjbGFyaW5nIGFuIGFjdGlvbiBjcmVhdG9yKipcbiAqXG4gKiBXaXRob3V0IGFkZGl0aW9uYWwgbWV0YWRhdGE6XG4gKiBgYGB0c1xuICogZXhwb3J0IGNvbnN0IGluY3JlbWVudCA9IGNyZWF0ZUFjdGlvbignW0NvdW50ZXJdIEluY3JlbWVudCcpO1xuICogYGBgXG4gKiBXaXRoIGFkZGl0aW9uYWwgbWV0YWRhdGE6XG4gKiBgYGB0c1xuICogZXhwb3J0IGNvbnN0IGxvZ2luU3VjY2VzcyA9IGNyZWF0ZUFjdGlvbihcbiAqICAgJ1tBdXRoL0FQSV0gTG9naW4gU3VjY2VzcycsXG4gKiAgIHByb3BzPHsgdXNlcjogVXNlciB9PigpXG4gKiApO1xuICogYGBgXG4gKiBXaXRoIGEgZnVuY3Rpb246XG4gKiBgYGB0c1xuICogZXhwb3J0IGNvbnN0IGxvZ2luU3VjY2VzcyA9IGNyZWF0ZUFjdGlvbihcbiAqICAgJ1tBdXRoL0FQSV0gTG9naW4gU3VjY2VzcycsXG4gKiAgIChyZXNwb25zZTogUmVzcG9uc2UpID0+IHJlc3BvbnNlLnVzZXJcbiAqICk7XG4gKiBgYGBcbiAqXG4gKiAqKkRpc3BhdGNoaW5nIGFuIGFjdGlvbioqXG4gKlxuICogV2l0aG91dCBhZGRpdGlvbmFsIG1ldGFkYXRhOlxuICogYGBgdHNcbiAqIHN0b3JlLmRpc3BhdGNoKGluY3JlbWVudCgpKTtcbiAqIGBgYFxuICogV2l0aCBhZGRpdGlvbmFsIG1ldGFkYXRhOlxuICogYGBgdHNcbiAqIHN0b3JlLmRpc3BhdGNoKGxvZ2luU3VjY2Vzcyh7IHVzZXI6IG5ld1VzZXIgfSkpO1xuICogYGBgXG4gKlxuICogKipSZWZlcmVuY2luZyBhbiBhY3Rpb24gaW4gYSByZWR1Y2VyKipcbiAqXG4gKiBVc2luZyBhIHN3aXRjaCBzdGF0ZW1lbnQ6XG4gKiBgYGB0c1xuICogc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICogICAvLyAuLi5cbiAqICAgY2FzZSBBdXRoQXBpQWN0aW9ucy5sb2dpblN1Y2Nlc3MudHlwZToge1xuICogICAgIHJldHVybiB7XG4gKiAgICAgICAuLi5zdGF0ZSxcbiAqICAgICAgIHVzZXI6IGFjdGlvbi51c2VyXG4gKiAgICAgfTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKiBVc2luZyBhIHJlZHVjZXIgY3JlYXRvcjpcbiAqIGBgYHRzXG4gKiBvbihBdXRoQXBpQWN0aW9ucy5sb2dpblN1Y2Nlc3MsIChzdGF0ZSwgeyB1c2VyIH0pID0+ICh7IC4uLnN0YXRlLCB1c2VyIH0pKVxuICogYGBgXG4gKlxuICogICoqUmVmZXJlbmNpbmcgYW4gYWN0aW9uIGluIGFuIGVmZmVjdCoqXG4gKiBgYGB0c1xuICogZWZmZWN0TmFtZSQgPSBjcmVhdGVFZmZlY3QoXG4gKiAgICgpID0+IHRoaXMuYWN0aW9ucyQucGlwZShcbiAqICAgICBvZlR5cGUoQXV0aEFwaUFjdGlvbnMubG9naW5TdWNjZXNzKSxcbiAqICAgICAvLyAuLi5cbiAqICAgKVxuICogKTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uPFQgZXh0ZW5kcyBzdHJpbmcsIEMgZXh0ZW5kcyBDcmVhdG9yPihcbiAgdHlwZTogVCxcbiAgY29uZmlnPzogeyBfYXM6ICdwcm9wcycgfSB8IENcbik6IEFjdGlvbkNyZWF0b3I8VD4ge1xuICBSRUdJU1RFUkVEX0FDVElPTl9UWVBFU1t0eXBlXSA9IChSRUdJU1RFUkVEX0FDVElPTl9UWVBFU1t0eXBlXSB8fCAwKSArIDE7XG5cbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZGVmaW5lVHlwZSh0eXBlLCAoLi4uYXJnczogYW55W10pID0+ICh7XG4gICAgICAuLi5jb25maWcoLi4uYXJncyksXG4gICAgICB0eXBlLFxuICAgIH0pKTtcbiAgfVxuICBjb25zdCBhcyA9IGNvbmZpZyA/IGNvbmZpZy5fYXMgOiAnZW1wdHknO1xuICBzd2l0Y2ggKGFzKSB7XG4gICAgY2FzZSAnZW1wdHknOlxuICAgICAgcmV0dXJuIGRlZmluZVR5cGUodHlwZSwgKCkgPT4gKHsgdHlwZSB9KSk7XG4gICAgY2FzZSAncHJvcHMnOlxuICAgICAgcmV0dXJuIGRlZmluZVR5cGUodHlwZSwgKHByb3BzOiBvYmplY3QpID0+ICh7XG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgICB0eXBlLFxuICAgICAgfSkpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgY29uZmlnLicpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9wczxcbiAgUCBleHRlbmRzIFNhZmVQcm9wcyxcbiAgU2FmZVByb3BzID0gTm90QWxsb3dlZEluUHJvcHNDaGVjazxQPlxuPigpOiBBY3Rpb25DcmVhdG9yUHJvcHM8UD4ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICByZXR1cm4geyBfYXM6ICdwcm9wcycsIF9wOiB1bmRlZmluZWQhIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmlvbjxcbiAgQyBleHRlbmRzIHsgW2tleTogc3RyaW5nXTogQWN0aW9uQ3JlYXRvcjxzdHJpbmcsIENyZWF0b3I+IH1cbj4oY3JlYXRvcnM6IEMpOiBSZXR1cm5UeXBlPENba2V5b2YgQ10+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgcmV0dXJuIHVuZGVmaW5lZCE7XG59XG5cbmZ1bmN0aW9uIGRlZmluZVR5cGU8VCBleHRlbmRzIHN0cmluZz4oXG4gIHR5cGU6IFQsXG4gIGNyZWF0b3I6IENyZWF0b3Jcbik6IEFjdGlvbkNyZWF0b3I8VD4ge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGNyZWF0b3IsICd0eXBlJywge1xuICAgIHZhbHVlOiB0eXBlLFxuICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgfSkgYXMgQWN0aW9uQ3JlYXRvcjxUPjtcbn1cbiJdfQ==