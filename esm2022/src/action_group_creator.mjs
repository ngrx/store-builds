import { createAction, props } from './action_creator';
import { capitalize, uncapitalize } from './helpers';
/**
 * @description
 * A function that creates a group of action creators with the same source.
 *
 * @param config An object that contains a source and dictionary of events.
 * An event is a key-value pair of an event name and event props.
 * @returns A dictionary of action creators.
 * The name of each action creator is created by camel casing the event name.
 * The type of each action is created using the "[Source] Event Name" pattern.
 *
 * @usageNotes
 *
 * ```ts
 * const authApiActions = createActionGroup({
 *   source: 'Auth API',
 *   events: {
 *     // defining events with payload using the `props` function
 *     'Login Success': props<{ userId: number; token: string }>(),
 *     'Login Failure': props<{ error: string }>(),
 *
 *     // defining an event without payload using the `emptyProps` function
 *     'Logout Success': emptyProps(),
 *
 *     // defining an event with payload using the props factory
 *     'Logout Failure': (error: Error) => ({ error }),
 *   },
 * });
 *
 * // action type: "[Auth API] Login Success"
 * authApiActions.loginSuccess({ userId: 10, token: 'ngrx' });
 *
 * // action type: "[Auth API] Login Failure"
 * authApiActions.loginFailure({ error: 'Login Failure!' });
 *
 * // action type: "[Auth API] Logout Success"
 * authApiActions.logoutSuccess();
 *
 * // action type: "[Auth API] Logout Failure";
 * authApiActions.logoutFailure(new Error('Logout Failure!'));
 * ```
 */
export function createActionGroup(config) {
    const { source, events } = config;
    return Object.keys(events).reduce((actionGroup, eventName) => ({
        ...actionGroup,
        [toActionName(eventName)]: createAction(toActionType(source, eventName), events[eventName]),
    }), {});
}
export function emptyProps() {
    return props();
}
function toActionName(eventName) {
    return eventName
        .trim()
        .split(' ')
        .map((word, i) => (i === 0 ? uncapitalize(word) : capitalize(word)))
        .join('');
}
function toActionType(source, eventName) {
    return `[${source}] ${eventName}`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uX2dyb3VwX2NyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9hY3Rpb25fZ3JvdXBfY3JlYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBU3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBbUZyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdDRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FHL0IsTUFBeUM7SUFDekMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUM7SUFFbEMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FDL0IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLEdBQUcsV0FBVztRQUNkLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUNyQyxZQUFZLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUM5QixNQUFjLENBQUMsU0FBUyxDQUFDLENBQzNCO0tBQ0YsQ0FBQyxFQUNGLEVBQWlDLENBQ2xDLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxVQUFVLFVBQVU7SUFDeEIsT0FBTyxLQUFLLEVBQUUsQ0FBQztBQUNqQixDQUFDO0FBRUQsU0FBUyxZQUFZLENBQ25CLFNBQW9CO0lBRXBCLE9BQU8sU0FBUztTQUNiLElBQUksRUFBRTtTQUNOLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDVixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDbkUsSUFBSSxDQUFDLEVBQUUsQ0FBMEIsQ0FBQztBQUN2QyxDQUFDO0FBRUQsU0FBUyxZQUFZLENBQ25CLE1BQWMsRUFDZCxTQUFvQjtJQUVwQixPQUFPLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRSxDQUFDO0FBQ3BDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVBY3Rpb24sIHByb3BzIH0gZnJvbSAnLi9hY3Rpb25fY3JlYXRvcic7XG5pbXBvcnQge1xuICBBY3Rpb25DcmVhdG9yLFxuICBBY3Rpb25DcmVhdG9yUHJvcHMsXG4gIENyZWF0b3IsXG4gIEZ1bmN0aW9uV2l0aFBhcmFtZXRlcnNUeXBlLFxuICBOb3RBbGxvd2VkQ2hlY2ssXG4gIEFjdGlvbixcbn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgY2FwaXRhbGl6ZSwgdW5jYXBpdGFsaXplIH0gZnJvbSAnLi9oZWxwZXJzJztcblxudHlwZSBKb2luPFxuICBTdHIgZXh0ZW5kcyBzdHJpbmcsXG4gIFNlcGFyYXRvciBleHRlbmRzIHN0cmluZyA9ICcgJ1xuPiA9IFN0ciBleHRlbmRzIGAke2luZmVyIEZpcnN0fSR7U2VwYXJhdG9yfSR7aW5mZXIgUmVzdH1gXG4gID8gSm9pbjxgJHtGaXJzdH0ke1Jlc3R9YCwgU2VwYXJhdG9yPlxuICA6IFN0cjtcblxudHlwZSBDYXBpdGFsaXplV29yZHM8U3RyIGV4dGVuZHMgc3RyaW5nPiA9XG4gIFN0ciBleHRlbmRzIGAke2luZmVyIEZpcnN0fSAke2luZmVyIFJlc3R9YFxuICAgID8gYCR7Q2FwaXRhbGl6ZTxGaXJzdD59ICR7Q2FwaXRhbGl6ZVdvcmRzPFJlc3Q+fWBcbiAgICA6IENhcGl0YWxpemU8U3RyPjtcblxudHlwZSBTdHJpbmdMaXRlcmFsQ2hlY2s8XG4gIFN0ciBleHRlbmRzIHN0cmluZyxcbiAgTmFtZSBleHRlbmRzIHN0cmluZ1xuPiA9IHN0cmluZyBleHRlbmRzIFN0ciA/IGAke05hbWV9IG11c3QgYmUgYSBzdHJpbmcgbGl0ZXJhbCB0eXBlYCA6IHVua25vd247XG5cbnR5cGUgVW5pcXVlRXZlbnROYW1lQ2hlY2s8XG4gIEV2ZW50TmFtZXMgZXh0ZW5kcyBzdHJpbmcsXG4gIEV2ZW50TmFtZSBleHRlbmRzIHN0cmluZ1xuPiA9IEFjdGlvbk5hbWU8RXZlbnROYW1lPiBleHRlbmRzIEFjdGlvbk5hbWU8RXhjbHVkZTxFdmVudE5hbWVzLCBFdmVudE5hbWU+PlxuICA/IGAke0FjdGlvbk5hbWU8RXZlbnROYW1lPn0gYWN0aW9uIGlzIGFscmVhZHkgZGVmaW5lZGBcbiAgOiB1bmtub3duO1xuXG50eXBlIE5vdEFsbG93ZWRFdmVudFByb3BzQ2hlY2s8XG4gIFByb3BzQ3JlYXRvciBleHRlbmRzIEFjdGlvbkNyZWF0b3JQcm9wczx1bmtub3duPiB8IENyZWF0b3Jcbj4gPSBQcm9wc0NyZWF0b3IgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yUHJvcHM8aW5mZXIgUHJvcHM+XG4gID8gUHJvcHMgZXh0ZW5kcyB2b2lkXG4gICAgPyB1bmtub3duXG4gICAgOiBOb3RBbGxvd2VkQ2hlY2s8UHJvcHMgJiBvYmplY3Q+XG4gIDogUHJvcHNDcmVhdG9yIGV4dGVuZHMgQ3JlYXRvcjxhbnksIGluZmVyIFJlc3VsdD5cbiAgPyBOb3RBbGxvd2VkQ2hlY2s8UmVzdWx0PlxuICA6IHVua25vd247XG5cbnR5cGUgRXZlbnRDcmVhdG9yPFxuICBQcm9wc0NyZWF0b3IgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yUHJvcHM8dW5rbm93bj4gfCBDcmVhdG9yLFxuICBUeXBlIGV4dGVuZHMgc3RyaW5nXG4+ID0gUHJvcHNDcmVhdG9yIGV4dGVuZHMgQWN0aW9uQ3JlYXRvclByb3BzPGluZmVyIFByb3BzPlxuICA/IHZvaWQgZXh0ZW5kcyBQcm9wc1xuICAgID8gQWN0aW9uQ3JlYXRvcjxUeXBlLCAoKSA9PiBBY3Rpb248VHlwZT4+XG4gICAgOiBBY3Rpb25DcmVhdG9yPFxuICAgICAgICBUeXBlLFxuICAgICAgICAocHJvcHM6IFByb3BzICYgTm90QWxsb3dlZENoZWNrPFByb3BzICYgb2JqZWN0PikgPT4gUHJvcHMgJiBBY3Rpb248VHlwZT5cbiAgICAgID5cbiAgOiBQcm9wc0NyZWF0b3IgZXh0ZW5kcyBDcmVhdG9yPGluZmVyIFByb3BzLCBpbmZlciBSZXN1bHQ+XG4gID8gRnVuY3Rpb25XaXRoUGFyYW1ldGVyc1R5cGU8XG4gICAgICBQcm9wcyxcbiAgICAgIFJlc3VsdCAmIE5vdEFsbG93ZWRDaGVjazxSZXN1bHQ+ICYgQWN0aW9uPFR5cGU+XG4gICAgPiAmXG4gICAgICBBY3Rpb248VHlwZT5cbiAgOiBuZXZlcjtcblxudHlwZSBBY3Rpb25OYW1lPEV2ZW50TmFtZSBleHRlbmRzIHN0cmluZz4gPSBVbmNhcGl0YWxpemU8XG4gIEpvaW48Q2FwaXRhbGl6ZVdvcmRzPEV2ZW50TmFtZT4+XG4+O1xuXG5pbnRlcmZhY2UgQWN0aW9uR3JvdXBDb25maWc8XG4gIFNvdXJjZSBleHRlbmRzIHN0cmluZyxcbiAgRXZlbnRzIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgQWN0aW9uQ3JlYXRvclByb3BzPHVua25vd24+IHwgQ3JlYXRvcj5cbj4ge1xuICBzb3VyY2U6IFNvdXJjZSAmIFN0cmluZ0xpdGVyYWxDaGVjazxTb3VyY2UsICdzb3VyY2UnPjtcbiAgZXZlbnRzOiBFdmVudHMgJiB7XG4gICAgW0V2ZW50TmFtZSBpbiBrZXlvZiBFdmVudHNdOiBTdHJpbmdMaXRlcmFsQ2hlY2s8XG4gICAgICBFdmVudE5hbWUgJiBzdHJpbmcsXG4gICAgICAnZXZlbnQgbmFtZSdcbiAgICA+ICZcbiAgICAgIFVuaXF1ZUV2ZW50TmFtZUNoZWNrPGtleW9mIEV2ZW50cyAmIHN0cmluZywgRXZlbnROYW1lICYgc3RyaW5nPiAmXG4gICAgICBOb3RBbGxvd2VkRXZlbnRQcm9wc0NoZWNrPEV2ZW50c1tFdmVudE5hbWVdPjtcbiAgfTtcbn1cblxudHlwZSBBY3Rpb25Hcm91cDxcbiAgU291cmNlIGV4dGVuZHMgc3RyaW5nLFxuICBFdmVudHMgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBBY3Rpb25DcmVhdG9yUHJvcHM8dW5rbm93bj4gfCBDcmVhdG9yPlxuPiA9IHtcbiAgW0V2ZW50TmFtZSBpbiBrZXlvZiBFdmVudHMgYXMgQWN0aW9uTmFtZTxFdmVudE5hbWUgJiBzdHJpbmc+XTogRXZlbnRDcmVhdG9yPFxuICAgIEV2ZW50c1tFdmVudE5hbWVdLFxuICAgIGBbJHtTb3VyY2V9XSAke0V2ZW50TmFtZSAmIHN0cmluZ31gXG4gID47XG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQSBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgYSBncm91cCBvZiBhY3Rpb24gY3JlYXRvcnMgd2l0aCB0aGUgc2FtZSBzb3VyY2UuXG4gKlxuICogQHBhcmFtIGNvbmZpZyBBbiBvYmplY3QgdGhhdCBjb250YWlucyBhIHNvdXJjZSBhbmQgZGljdGlvbmFyeSBvZiBldmVudHMuXG4gKiBBbiBldmVudCBpcyBhIGtleS12YWx1ZSBwYWlyIG9mIGFuIGV2ZW50IG5hbWUgYW5kIGV2ZW50IHByb3BzLlxuICogQHJldHVybnMgQSBkaWN0aW9uYXJ5IG9mIGFjdGlvbiBjcmVhdG9ycy5cbiAqIFRoZSBuYW1lIG9mIGVhY2ggYWN0aW9uIGNyZWF0b3IgaXMgY3JlYXRlZCBieSBjYW1lbCBjYXNpbmcgdGhlIGV2ZW50IG5hbWUuXG4gKiBUaGUgdHlwZSBvZiBlYWNoIGFjdGlvbiBpcyBjcmVhdGVkIHVzaW5nIHRoZSBcIltTb3VyY2VdIEV2ZW50IE5hbWVcIiBwYXR0ZXJuLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IGF1dGhBcGlBY3Rpb25zID0gY3JlYXRlQWN0aW9uR3JvdXAoe1xuICogICBzb3VyY2U6ICdBdXRoIEFQSScsXG4gKiAgIGV2ZW50czoge1xuICogICAgIC8vIGRlZmluaW5nIGV2ZW50cyB3aXRoIHBheWxvYWQgdXNpbmcgdGhlIGBwcm9wc2AgZnVuY3Rpb25cbiAqICAgICAnTG9naW4gU3VjY2Vzcyc6IHByb3BzPHsgdXNlcklkOiBudW1iZXI7IHRva2VuOiBzdHJpbmcgfT4oKSxcbiAqICAgICAnTG9naW4gRmFpbHVyZSc6IHByb3BzPHsgZXJyb3I6IHN0cmluZyB9PigpLFxuICpcbiAqICAgICAvLyBkZWZpbmluZyBhbiBldmVudCB3aXRob3V0IHBheWxvYWQgdXNpbmcgdGhlIGBlbXB0eVByb3BzYCBmdW5jdGlvblxuICogICAgICdMb2dvdXQgU3VjY2Vzcyc6IGVtcHR5UHJvcHMoKSxcbiAqXG4gKiAgICAgLy8gZGVmaW5pbmcgYW4gZXZlbnQgd2l0aCBwYXlsb2FkIHVzaW5nIHRoZSBwcm9wcyBmYWN0b3J5XG4gKiAgICAgJ0xvZ291dCBGYWlsdXJlJzogKGVycm9yOiBFcnJvcikgPT4gKHsgZXJyb3IgfSksXG4gKiAgIH0sXG4gKiB9KTtcbiAqXG4gKiAvLyBhY3Rpb24gdHlwZTogXCJbQXV0aCBBUEldIExvZ2luIFN1Y2Nlc3NcIlxuICogYXV0aEFwaUFjdGlvbnMubG9naW5TdWNjZXNzKHsgdXNlcklkOiAxMCwgdG9rZW46ICduZ3J4JyB9KTtcbiAqXG4gKiAvLyBhY3Rpb24gdHlwZTogXCJbQXV0aCBBUEldIExvZ2luIEZhaWx1cmVcIlxuICogYXV0aEFwaUFjdGlvbnMubG9naW5GYWlsdXJlKHsgZXJyb3I6ICdMb2dpbiBGYWlsdXJlIScgfSk7XG4gKlxuICogLy8gYWN0aW9uIHR5cGU6IFwiW0F1dGggQVBJXSBMb2dvdXQgU3VjY2Vzc1wiXG4gKiBhdXRoQXBpQWN0aW9ucy5sb2dvdXRTdWNjZXNzKCk7XG4gKlxuICogLy8gYWN0aW9uIHR5cGU6IFwiW0F1dGggQVBJXSBMb2dvdXQgRmFpbHVyZVwiO1xuICogYXV0aEFwaUFjdGlvbnMubG9nb3V0RmFpbHVyZShuZXcgRXJyb3IoJ0xvZ291dCBGYWlsdXJlIScpKTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uR3JvdXA8XG4gIFNvdXJjZSBleHRlbmRzIHN0cmluZyxcbiAgRXZlbnRzIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgQWN0aW9uQ3JlYXRvclByb3BzPHVua25vd24+IHwgQ3JlYXRvcj5cbj4oY29uZmlnOiBBY3Rpb25Hcm91cENvbmZpZzxTb3VyY2UsIEV2ZW50cz4pOiBBY3Rpb25Hcm91cDxTb3VyY2UsIEV2ZW50cz4ge1xuICBjb25zdCB7IHNvdXJjZSwgZXZlbnRzIH0gPSBjb25maWc7XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKGV2ZW50cykucmVkdWNlKFxuICAgIChhY3Rpb25Hcm91cCwgZXZlbnROYW1lKSA9PiAoe1xuICAgICAgLi4uYWN0aW9uR3JvdXAsXG4gICAgICBbdG9BY3Rpb25OYW1lKGV2ZW50TmFtZSldOiBjcmVhdGVBY3Rpb24oXG4gICAgICAgIHRvQWN0aW9uVHlwZShzb3VyY2UsIGV2ZW50TmFtZSksXG4gICAgICAgIChldmVudHMgYXMgYW55KVtldmVudE5hbWVdXG4gICAgICApLFxuICAgIH0pLFxuICAgIHt9IGFzIEFjdGlvbkdyb3VwPFNvdXJjZSwgRXZlbnRzPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW1wdHlQcm9wcygpOiBBY3Rpb25DcmVhdG9yUHJvcHM8dm9pZD4ge1xuICByZXR1cm4gcHJvcHMoKTtcbn1cblxuZnVuY3Rpb24gdG9BY3Rpb25OYW1lPEV2ZW50TmFtZSBleHRlbmRzIHN0cmluZz4oXG4gIGV2ZW50TmFtZTogRXZlbnROYW1lXG4pOiBBY3Rpb25OYW1lPEV2ZW50TmFtZT4ge1xuICByZXR1cm4gZXZlbnROYW1lXG4gICAgLnRyaW0oKVxuICAgIC5zcGxpdCgnICcpXG4gICAgLm1hcCgod29yZCwgaSkgPT4gKGkgPT09IDAgPyB1bmNhcGl0YWxpemUod29yZCkgOiBjYXBpdGFsaXplKHdvcmQpKSlcbiAgICAuam9pbignJykgYXMgQWN0aW9uTmFtZTxFdmVudE5hbWU+O1xufVxuXG5mdW5jdGlvbiB0b0FjdGlvblR5cGU8U291cmNlIGV4dGVuZHMgc3RyaW5nLCBFdmVudE5hbWUgZXh0ZW5kcyBzdHJpbmc+KFxuICBzb3VyY2U6IFNvdXJjZSxcbiAgZXZlbnROYW1lOiBFdmVudE5hbWVcbik6IGBbJHtTb3VyY2V9XSAke0V2ZW50TmFtZX1gIHtcbiAgcmV0dXJuIGBbJHtzb3VyY2V9XSAke2V2ZW50TmFtZX1gO1xufVxuIl19