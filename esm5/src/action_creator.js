import { __assign, __read, __spread } from "tslib";
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
        return defineType(type, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return (__assign(__assign({}, config.apply(void 0, __spread(args))), { type: type }));
        });
    }
    var as = config ? config._as : 'empty';
    switch (as) {
        case 'empty':
            return defineType(type, function () { return ({ type: type }); });
        case 'props':
            return defineType(type, function (props) { return (__assign(__assign({}, props), { type: type })); });
        default:
            throw new Error('Unexpected config.');
    }
}
export function props() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uX2NyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9hY3Rpb25fY3JlYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBb0JwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1RUc7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUMxQixJQUFPLEVBQ1AsTUFBNkI7SUFFN0IsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFekUsSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLEVBQUU7UUFDaEMsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQUMsY0FBYztpQkFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO2dCQUFkLHlCQUFjOztZQUFLLE9BQUEsdUJBQ3ZDLE1BQU0sd0JBQUksSUFBSSxPQUNqQixJQUFJLE1BQUEsSUFDSjtRQUgwQyxDQUcxQyxDQUFDLENBQUM7S0FDTDtJQUNELElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3pDLFFBQVEsRUFBRSxFQUFFO1FBQ1YsS0FBSyxPQUFPO1lBQ1YsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLGNBQU0sT0FBQSxDQUFDLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxFQUFWLENBQVUsQ0FBQyxDQUFDO1FBQzVDLEtBQUssT0FBTztZQUNWLE9BQU8sVUFBVSxDQUFDLElBQUksRUFBRSxVQUFDLEtBQWEsSUFBSyxPQUFBLHVCQUN0QyxLQUFLLEtBQ1IsSUFBSSxNQUFBLElBQ0osRUFIeUMsQ0FHekMsQ0FBQyxDQUFDO1FBQ047WUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7S0FDekM7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLEtBQUs7SUFDbkIsT0FBTyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLFNBQVUsRUFBRSxDQUFDO0FBQzFDLENBQUM7QUFFRCxNQUFNLFVBQVUsS0FBSyxDQUVuQixRQUFXO0lBQ1gsT0FBTyxTQUFVLENBQUM7QUFDcEIsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUNqQixJQUFPLEVBQ1AsT0FBZ0I7SUFFaEIsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUU7UUFDNUMsS0FBSyxFQUFFLElBQUk7UUFDWCxRQUFRLEVBQUUsS0FBSztLQUNoQixDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ3JlYXRvcixcbiAgQWN0aW9uQ3JlYXRvcixcbiAgVHlwZWRBY3Rpb24sXG4gIEZ1bmN0aW9uV2l0aFBhcmFtZXRlcnNUeXBlLFxuICBOb3RBbGxvd2VkQ2hlY2ssXG4gIFByb3BzLFxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBSRUdJU1RFUkVEX0FDVElPTl9UWVBFUyB9IGZyb20gJy4vZ2xvYmFscyc7XG5cbi8vIEFjdGlvbiBjcmVhdG9ycyB0YWtlbiBmcm9tIHRzLWFjdGlvbiBsaWJyYXJ5IGFuZCBtb2RpZmllZCBhIGJpdCB0byBiZXR0ZXJcbi8vIGZpdCBjdXJyZW50IE5nUnggdXNhZ2UuIFRoYW5rIHlvdSBOaWNob2xhcyBKYW1pZXNvbiAoQGNhcnRhbnQpLlxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uPFQgZXh0ZW5kcyBzdHJpbmc+KFxuICB0eXBlOiBUXG4pOiBBY3Rpb25DcmVhdG9yPFQsICgpID0+IFR5cGVkQWN0aW9uPFQ+PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3Rpb248VCBleHRlbmRzIHN0cmluZywgUCBleHRlbmRzIG9iamVjdD4oXG4gIHR5cGU6IFQsXG4gIGNvbmZpZzogUHJvcHM8UD4gJiBOb3RBbGxvd2VkQ2hlY2s8UD5cbik6IEFjdGlvbkNyZWF0b3I8VCwgKHByb3BzOiBQICYgTm90QWxsb3dlZENoZWNrPFA+KSA9PiBQICYgVHlwZWRBY3Rpb248VD4+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbjxcbiAgVCBleHRlbmRzIHN0cmluZyxcbiAgUCBleHRlbmRzIGFueVtdLFxuICBSIGV4dGVuZHMgb2JqZWN0XG4+KFxuICB0eXBlOiBULFxuICBjcmVhdG9yOiBDcmVhdG9yPFAsIFI+ICYgTm90QWxsb3dlZENoZWNrPFI+XG4pOiBGdW5jdGlvbldpdGhQYXJhbWV0ZXJzVHlwZTxQLCBSICYgVHlwZWRBY3Rpb248VD4+ICYgVHlwZWRBY3Rpb248VD47XG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQ3JlYXRlcyBhIGNvbmZpZ3VyZWQgYENyZWF0b3JgIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLCByZXR1cm5zIGFuIG9iamVjdCBpbiB0aGUgc2hhcGUgb2YgdGhlIGBBY3Rpb25gIGludGVyZmFjZS5cbiAqXG4gKiBBY3Rpb24gY3JlYXRvcnMgcmVkdWNlIHRoZSBleHBsaWNpdG5lc3Mgb2YgY2xhc3MtYmFzZWQgYWN0aW9uIGNyZWF0b3JzLlxuICpcbiAqIEBwYXJhbSB0eXBlIERlc2NyaWJlcyB0aGUgYWN0aW9uIHRoYXQgd2lsbCBiZSBkaXNwYXRjaGVkXG4gKiBAcGFyYW0gY29uZmlnIEFkZGl0aW9uYWwgbWV0YWRhdGEgbmVlZGVkIGZvciB0aGUgaGFuZGxpbmcgb2YgdGhlIGFjdGlvbi4gIFNlZSB7QGxpbmsgY3JlYXRlQWN0aW9uI3VzYWdlLW5vdGVzIFVzYWdlIE5vdGVzfS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqICoqRGVjbGFyaW5nIGFuIGFjdGlvbiBjcmVhdG9yKipcbiAqXG4gKiBXaXRob3V0IGFkZGl0aW9uYWwgbWV0YWRhdGE6XG4gKiBgYGB0c1xuICogZXhwb3J0IGNvbnN0IGluY3JlbWVudCA9IGNyZWF0ZUFjdGlvbignW0NvdW50ZXJdIEluY3JlbWVudCcpO1xuICogYGBgXG4gKiBXaXRoIGFkZGl0aW9uYWwgbWV0YWRhdGE6XG4gKiBgYGB0c1xuICogZXhwb3J0IGNvbnN0IGxvZ2luU3VjY2VzcyA9IGNyZWF0ZUFjdGlvbihcbiAqICAgJ1tBdXRoL0FQSV0gTG9naW4gU3VjY2VzcycsXG4gKiAgIHByb3BzPHsgdXNlcjogVXNlciB9PigpXG4gKiApO1xuICogYGBgXG4gKiBXaXRoIGEgZnVuY3Rpb246XG4gKiBgYGB0c1xuICogZXhwb3J0IGNvbnN0IGxvZ2luU3VjY2VzcyA9IGNyZWF0ZUFjdGlvbihcbiAqICAgJ1tBdXRoL0FQSV0gTG9naW4gU3VjY2VzcycsXG4gKiAgIChyZXNwb25zZTogUmVzcG9uc2UpID0+IHJlc3BvbnNlLnVzZXJcbiAqICk7XG4gKiBgYGBcbiAqXG4gKiAqKkRpc3BhdGNoaW5nIGFuIGFjdGlvbioqXG4gKlxuICogV2l0aG91dCBhZGRpdGlvbmFsIG1ldGFkYXRhOlxuICogYGBgdHNcbiAqIHN0b3JlLmRpc3BhdGNoKGluY3JlbWVudCgpKTtcbiAqIGBgYFxuICogV2l0aCBhZGRpdGlvbmFsIG1ldGFkYXRhOlxuICogYGBgdHNcbiAqIHN0b3JlLmRpc3BhdGNoKGxvZ2luU3VjY2Vzcyh7IHVzZXI6IG5ld1VzZXIgfSkpO1xuICogYGBgXG4gKlxuICogKipSZWZlcmVuY2luZyBhbiBhY3Rpb24gaW4gYSByZWR1Y2VyKipcbiAqXG4gKiBVc2luZyBhIHN3aXRjaCBzdGF0ZW1lbnQ6XG4gKiBgYGB0c1xuICogc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICogICAvLyAuLi5cbiAqICAgY2FzZSBBdXRoQXBpQWN0aW9ucy5sb2dpblN1Y2Nlc3MudHlwZToge1xuICogICAgIHJldHVybiB7XG4gKiAgICAgICAuLi5zdGF0ZSxcbiAqICAgICAgIHVzZXI6IGFjdGlvbi51c2VyXG4gKiAgICAgfTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKiBVc2luZyBhIHJlZHVjZXIgY3JlYXRvcjpcbiAqIGBgYHRzXG4gKiBvbihBdXRoQXBpQWN0aW9ucy5sb2dpblN1Y2Nlc3MsIChzdGF0ZSwgeyB1c2VyIH0pID0+ICh7IC4uLnN0YXRlLCB1c2VyIH0pKVxuICogYGBgXG4gKlxuICogICoqUmVmZXJlbmNpbmcgYW4gYWN0aW9uIGluIGFuIGVmZmVjdCoqXG4gKiBgYGB0c1xuICogZWZmZWN0TmFtZSQgPSBjcmVhdGVFZmZlY3QoXG4gKiAgICgpID0+IHRoaXMuYWN0aW9ucyQucGlwZShcbiAqICAgICBvZlR5cGUoQXV0aEFwaUFjdGlvbnMubG9naW5TdWNjZXNzKSxcbiAqICAgICAvLyAuLi5cbiAqICAgKVxuICogKTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uPFQgZXh0ZW5kcyBzdHJpbmcsIEMgZXh0ZW5kcyBDcmVhdG9yPihcbiAgdHlwZTogVCxcbiAgY29uZmlnPzogeyBfYXM6ICdwcm9wcycgfSB8IENcbik6IEFjdGlvbkNyZWF0b3I8VD4ge1xuICBSRUdJU1RFUkVEX0FDVElPTl9UWVBFU1t0eXBlXSA9IChSRUdJU1RFUkVEX0FDVElPTl9UWVBFU1t0eXBlXSB8fCAwKSArIDE7XG5cbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZGVmaW5lVHlwZSh0eXBlLCAoLi4uYXJnczogYW55W10pID0+ICh7XG4gICAgICAuLi5jb25maWcoLi4uYXJncyksXG4gICAgICB0eXBlLFxuICAgIH0pKTtcbiAgfVxuICBjb25zdCBhcyA9IGNvbmZpZyA/IGNvbmZpZy5fYXMgOiAnZW1wdHknO1xuICBzd2l0Y2ggKGFzKSB7XG4gICAgY2FzZSAnZW1wdHknOlxuICAgICAgcmV0dXJuIGRlZmluZVR5cGUodHlwZSwgKCkgPT4gKHsgdHlwZSB9KSk7XG4gICAgY2FzZSAncHJvcHMnOlxuICAgICAgcmV0dXJuIGRlZmluZVR5cGUodHlwZSwgKHByb3BzOiBvYmplY3QpID0+ICh7XG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgICB0eXBlLFxuICAgICAgfSkpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgY29uZmlnLicpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9wczxQIGV4dGVuZHMgb2JqZWN0PigpOiBQcm9wczxQPiB7XG4gIHJldHVybiB7IF9hczogJ3Byb3BzJywgX3A6IHVuZGVmaW5lZCEgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuaW9uPFxuICBDIGV4dGVuZHMgeyBba2V5OiBzdHJpbmddOiBBY3Rpb25DcmVhdG9yPHN0cmluZywgQ3JlYXRvcj4gfVxuPihjcmVhdG9yczogQyk6IFJldHVyblR5cGU8Q1trZXlvZiBDXT4ge1xuICByZXR1cm4gdW5kZWZpbmVkITtcbn1cblxuZnVuY3Rpb24gZGVmaW5lVHlwZTxUIGV4dGVuZHMgc3RyaW5nPihcbiAgdHlwZTogVCxcbiAgY3JlYXRvcjogQ3JlYXRvclxuKTogQWN0aW9uQ3JlYXRvcjxUPiB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRvciwgJ3R5cGUnLCB7XG4gICAgdmFsdWU6IHR5cGUsXG4gICAgd3JpdGFibGU6IGZhbHNlLFxuICB9KTtcbn1cbiJdfQ==