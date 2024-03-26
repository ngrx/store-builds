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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uX2NyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9hY3Rpb25fY3JlYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFTQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFvQnBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVFRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQzFCLElBQU8sRUFDUCxNQUE2QjtJQUU3Qix1QkFBdUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV6RSxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsRUFBRSxDQUFDO1FBQ2pDLE9BQU8sVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUk7U0FDTCxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFDRCxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN6QyxRQUFRLEVBQUUsRUFBRSxDQUFDO1FBQ1gsS0FBSyxPQUFPO1lBQ1YsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsS0FBSyxPQUFPO1lBQ1YsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMxQyxHQUFHLEtBQUs7Z0JBQ1IsSUFBSTthQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ047WUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDMUMsQ0FBQztBQUNILENBQUM7QUFFRCxNQUFNLFVBQVUsS0FBSztJQUluQixvRUFBb0U7SUFDcEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLFNBQVUsRUFBRSxDQUFDO0FBQzFDLENBQUM7QUFFRCxNQUFNLFVBQVUsS0FBSyxDQUVuQixRQUFXO0lBQ1gsb0VBQW9FO0lBQ3BFLE9BQU8sU0FBVSxDQUFDO0FBQ3BCLENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FDakIsSUFBTyxFQUNQLE9BQWdCO0lBRWhCLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFO1FBQzVDLEtBQUssRUFBRSxJQUFJO1FBQ1gsUUFBUSxFQUFFLEtBQUs7S0FDaEIsQ0FBcUIsQ0FBQztBQUN6QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ3JlYXRvcixcbiAgQWN0aW9uQ3JlYXRvcixcbiAgVHlwZWRBY3Rpb24sXG4gIEZ1bmN0aW9uV2l0aFBhcmFtZXRlcnNUeXBlLFxuICBOb3RBbGxvd2VkQ2hlY2ssXG4gIEFjdGlvbkNyZWF0b3JQcm9wcyxcbiAgTm90QWxsb3dlZEluUHJvcHNDaGVjayxcbn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgUkVHSVNURVJFRF9BQ1RJT05fVFlQRVMgfSBmcm9tICcuL2dsb2JhbHMnO1xuXG4vLyBBY3Rpb24gY3JlYXRvcnMgdGFrZW4gZnJvbSB0cy1hY3Rpb24gbGlicmFyeSBhbmQgbW9kaWZpZWQgYSBiaXQgdG8gYmV0dGVyXG4vLyBmaXQgY3VycmVudCBOZ1J4IHVzYWdlLiBUaGFuayB5b3UgTmljaG9sYXMgSmFtaWVzb24gKEBjYXJ0YW50KS5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbjxUIGV4dGVuZHMgc3RyaW5nPihcbiAgdHlwZTogVFxuKTogQWN0aW9uQ3JlYXRvcjxULCAoKSA9PiBUeXBlZEFjdGlvbjxUPj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uPFQgZXh0ZW5kcyBzdHJpbmcsIFAgZXh0ZW5kcyBvYmplY3Q+KFxuICB0eXBlOiBULFxuICBjb25maWc6IEFjdGlvbkNyZWF0b3JQcm9wczxQPiAmIE5vdEFsbG93ZWRDaGVjazxQPlxuKTogQWN0aW9uQ3JlYXRvcjxULCAocHJvcHM6IFAgJiBOb3RBbGxvd2VkQ2hlY2s8UD4pID0+IFAgJiBUeXBlZEFjdGlvbjxUPj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uPFxuICBUIGV4dGVuZHMgc3RyaW5nLFxuICBQIGV4dGVuZHMgYW55W10sXG4gIFIgZXh0ZW5kcyBvYmplY3Rcbj4oXG4gIHR5cGU6IFQsXG4gIGNyZWF0b3I6IENyZWF0b3I8UCwgUiAmIE5vdEFsbG93ZWRDaGVjazxSPj5cbik6IEZ1bmN0aW9uV2l0aFBhcmFtZXRlcnNUeXBlPFAsIFIgJiBUeXBlZEFjdGlvbjxUPj4gJiBUeXBlZEFjdGlvbjxUPjtcbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDcmVhdGVzIGEgY29uZmlndXJlZCBgQ3JlYXRvcmAgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsIHJldHVybnMgYW4gb2JqZWN0IGluIHRoZSBzaGFwZSBvZiB0aGUgYEFjdGlvbmAgaW50ZXJmYWNlLlxuICpcbiAqIEFjdGlvbiBjcmVhdG9ycyByZWR1Y2UgdGhlIGV4cGxpY2l0bmVzcyBvZiBjbGFzcy1iYXNlZCBhY3Rpb24gY3JlYXRvcnMuXG4gKlxuICogQHBhcmFtIHR5cGUgRGVzY3JpYmVzIHRoZSBhY3Rpb24gdGhhdCB3aWxsIGJlIGRpc3BhdGNoZWRcbiAqIEBwYXJhbSBjb25maWcgQWRkaXRpb25hbCBtZXRhZGF0YSBuZWVkZWQgZm9yIHRoZSBoYW5kbGluZyBvZiB0aGUgYWN0aW9uLiAgU2VlIHtAbGluayBjcmVhdGVBY3Rpb24jdXNhZ2Utbm90ZXMgVXNhZ2UgTm90ZXN9LlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogKipEZWNsYXJpbmcgYW4gYWN0aW9uIGNyZWF0b3IqKlxuICpcbiAqIFdpdGhvdXQgYWRkaXRpb25hbCBtZXRhZGF0YTpcbiAqIGBgYHRzXG4gKiBleHBvcnQgY29uc3QgaW5jcmVtZW50ID0gY3JlYXRlQWN0aW9uKCdbQ291bnRlcl0gSW5jcmVtZW50Jyk7XG4gKiBgYGBcbiAqIFdpdGggYWRkaXRpb25hbCBtZXRhZGF0YTpcbiAqIGBgYHRzXG4gKiBleHBvcnQgY29uc3QgbG9naW5TdWNjZXNzID0gY3JlYXRlQWN0aW9uKFxuICogICAnW0F1dGgvQVBJXSBMb2dpbiBTdWNjZXNzJyxcbiAqICAgcHJvcHM8eyB1c2VyOiBVc2VyIH0+KClcbiAqICk7XG4gKiBgYGBcbiAqIFdpdGggYSBmdW5jdGlvbjpcbiAqIGBgYHRzXG4gKiBleHBvcnQgY29uc3QgbG9naW5TdWNjZXNzID0gY3JlYXRlQWN0aW9uKFxuICogICAnW0F1dGgvQVBJXSBMb2dpbiBTdWNjZXNzJyxcbiAqICAgKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gcmVzcG9uc2UudXNlclxuICogKTtcbiAqIGBgYFxuICpcbiAqICoqRGlzcGF0Y2hpbmcgYW4gYWN0aW9uKipcbiAqXG4gKiBXaXRob3V0IGFkZGl0aW9uYWwgbWV0YWRhdGE6XG4gKiBgYGB0c1xuICogc3RvcmUuZGlzcGF0Y2goaW5jcmVtZW50KCkpO1xuICogYGBgXG4gKiBXaXRoIGFkZGl0aW9uYWwgbWV0YWRhdGE6XG4gKiBgYGB0c1xuICogc3RvcmUuZGlzcGF0Y2gobG9naW5TdWNjZXNzKHsgdXNlcjogbmV3VXNlciB9KSk7XG4gKiBgYGBcbiAqXG4gKiAqKlJlZmVyZW5jaW5nIGFuIGFjdGlvbiBpbiBhIHJlZHVjZXIqKlxuICpcbiAqIFVzaW5nIGEgc3dpdGNoIHN0YXRlbWVudDpcbiAqIGBgYHRzXG4gKiBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gKiAgIC8vIC4uLlxuICogICBjYXNlIEF1dGhBcGlBY3Rpb25zLmxvZ2luU3VjY2Vzcy50eXBlOiB7XG4gKiAgICAgcmV0dXJuIHtcbiAqICAgICAgIC4uLnN0YXRlLFxuICogICAgICAgdXNlcjogYWN0aW9uLnVzZXJcbiAqICAgICB9O1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqIFVzaW5nIGEgcmVkdWNlciBjcmVhdG9yOlxuICogYGBgdHNcbiAqIG9uKEF1dGhBcGlBY3Rpb25zLmxvZ2luU3VjY2VzcywgKHN0YXRlLCB7IHVzZXIgfSkgPT4gKHsgLi4uc3RhdGUsIHVzZXIgfSkpXG4gKiBgYGBcbiAqXG4gKiAgKipSZWZlcmVuY2luZyBhbiBhY3Rpb24gaW4gYW4gZWZmZWN0KipcbiAqIGBgYHRzXG4gKiBlZmZlY3ROYW1lJCA9IGNyZWF0ZUVmZmVjdChcbiAqICAgKCkgPT4gdGhpcy5hY3Rpb25zJC5waXBlKFxuICogICAgIG9mVHlwZShBdXRoQXBpQWN0aW9ucy5sb2dpblN1Y2Nlc3MpLFxuICogICAgIC8vIC4uLlxuICogICApXG4gKiApO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3Rpb248VCBleHRlbmRzIHN0cmluZywgQyBleHRlbmRzIENyZWF0b3I+KFxuICB0eXBlOiBULFxuICBjb25maWc/OiB7IF9hczogJ3Byb3BzJyB9IHwgQ1xuKTogQWN0aW9uQ3JlYXRvcjxUPiB7XG4gIFJFR0lTVEVSRURfQUNUSU9OX1RZUEVTW3R5cGVdID0gKFJFR0lTVEVSRURfQUNUSU9OX1RZUEVTW3R5cGVdIHx8IDApICsgMTtcblxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBkZWZpbmVUeXBlKHR5cGUsICguLi5hcmdzOiBhbnlbXSkgPT4gKHtcbiAgICAgIC4uLmNvbmZpZyguLi5hcmdzKSxcbiAgICAgIHR5cGUsXG4gICAgfSkpO1xuICB9XG4gIGNvbnN0IGFzID0gY29uZmlnID8gY29uZmlnLl9hcyA6ICdlbXB0eSc7XG4gIHN3aXRjaCAoYXMpIHtcbiAgICBjYXNlICdlbXB0eSc6XG4gICAgICByZXR1cm4gZGVmaW5lVHlwZSh0eXBlLCAoKSA9PiAoeyB0eXBlIH0pKTtcbiAgICBjYXNlICdwcm9wcyc6XG4gICAgICByZXR1cm4gZGVmaW5lVHlwZSh0eXBlLCAocHJvcHM6IG9iamVjdCkgPT4gKHtcbiAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgIHR5cGUsXG4gICAgICB9KSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBjb25maWcuJyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3BzPFxuICBQIGV4dGVuZHMgU2FmZVByb3BzLFxuICBTYWZlUHJvcHMgPSBOb3RBbGxvd2VkSW5Qcm9wc0NoZWNrPFA+XG4+KCk6IEFjdGlvbkNyZWF0b3JQcm9wczxQPiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gIHJldHVybiB7IF9hczogJ3Byb3BzJywgX3A6IHVuZGVmaW5lZCEgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuaW9uPFxuICBDIGV4dGVuZHMgeyBba2V5OiBzdHJpbmddOiBBY3Rpb25DcmVhdG9yPHN0cmluZywgQ3JlYXRvcj4gfVxuPihjcmVhdG9yczogQyk6IFJldHVyblR5cGU8Q1trZXlvZiBDXT4ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICByZXR1cm4gdW5kZWZpbmVkITtcbn1cblxuZnVuY3Rpb24gZGVmaW5lVHlwZTxUIGV4dGVuZHMgc3RyaW5nPihcbiAgdHlwZTogVCxcbiAgY3JlYXRvcjogQ3JlYXRvclxuKTogQWN0aW9uQ3JlYXRvcjxUPiB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRvciwgJ3R5cGUnLCB7XG4gICAgdmFsdWU6IHR5cGUsXG4gICAgd3JpdGFibGU6IGZhbHNlLFxuICB9KSBhcyBBY3Rpb25DcmVhdG9yPFQ+O1xufVxuIl19