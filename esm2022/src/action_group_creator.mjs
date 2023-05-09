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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uX2dyb3VwX2NyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9hY3Rpb25fZ3JvdXBfY3JlYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBU3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBcUZyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdDRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FHL0IsTUFBeUM7SUFDekMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUM7SUFFbEMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FDL0IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLEdBQUcsV0FBVztRQUNkLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUNyQyxZQUFZLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUMvQixNQUFNLENBQUMsU0FBUyxDQUFDLENBQ2xCO0tBQ0YsQ0FBQyxFQUNGLEVBQWlDLENBQ2xDLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxVQUFVLFVBQVU7SUFDeEIsT0FBTyxLQUFLLEVBQUUsQ0FBQztBQUNqQixDQUFDO0FBRUQsU0FBUyxZQUFZLENBQ25CLFNBQW9CO0lBRXBCLE9BQU8sU0FBUztTQUNiLElBQUksRUFBRTtTQUNOLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDVixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDbkUsSUFBSSxDQUFDLEVBQUUsQ0FBMEIsQ0FBQztBQUN2QyxDQUFDO0FBRUQsU0FBUyxZQUFZLENBQ25CLE1BQWMsRUFDZCxTQUFvQjtJQUVwQixPQUFPLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRSxDQUFDO0FBQ3BDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVBY3Rpb24sIHByb3BzIH0gZnJvbSAnLi9hY3Rpb25fY3JlYXRvcic7XG5pbXBvcnQge1xuICBBY3Rpb25DcmVhdG9yLFxuICBBY3Rpb25DcmVhdG9yUHJvcHMsXG4gIENyZWF0b3IsXG4gIEZ1bmN0aW9uV2l0aFBhcmFtZXRlcnNUeXBlLFxuICBOb3RBbGxvd2VkQ2hlY2ssXG4gIFR5cGVkQWN0aW9uLFxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBjYXBpdGFsaXplLCB1bmNhcGl0YWxpemUgfSBmcm9tICcuL2hlbHBlcnMnO1xuXG50eXBlIEpvaW48XG4gIFN0ciBleHRlbmRzIHN0cmluZyxcbiAgU2VwYXJhdG9yIGV4dGVuZHMgc3RyaW5nID0gJyAnXG4+ID0gU3RyIGV4dGVuZHMgYCR7aW5mZXIgRmlyc3R9JHtTZXBhcmF0b3J9JHtpbmZlciBSZXN0fWBcbiAgPyBKb2luPGAke0ZpcnN0fSR7UmVzdH1gLCBTZXBhcmF0b3I+XG4gIDogU3RyO1xuXG50eXBlIENhcGl0YWxpemVXb3JkczxTdHIgZXh0ZW5kcyBzdHJpbmc+ID1cbiAgU3RyIGV4dGVuZHMgYCR7aW5mZXIgRmlyc3R9ICR7aW5mZXIgUmVzdH1gXG4gICAgPyBgJHtDYXBpdGFsaXplPEZpcnN0Pn0gJHtDYXBpdGFsaXplV29yZHM8UmVzdD59YFxuICAgIDogQ2FwaXRhbGl6ZTxTdHI+O1xuXG50eXBlIFN0cmluZ0xpdGVyYWxDaGVjazxcbiAgU3RyIGV4dGVuZHMgc3RyaW5nLFxuICBOYW1lIGV4dGVuZHMgc3RyaW5nXG4+ID0gc3RyaW5nIGV4dGVuZHMgU3RyID8gYCR7TmFtZX0gbXVzdCBiZSBhIHN0cmluZyBsaXRlcmFsIHR5cGVgIDogdW5rbm93bjtcblxudHlwZSBVbmlxdWVFdmVudE5hbWVDaGVjazxcbiAgRXZlbnROYW1lcyBleHRlbmRzIHN0cmluZyxcbiAgRXZlbnROYW1lIGV4dGVuZHMgc3RyaW5nXG4+ID0gQWN0aW9uTmFtZTxFdmVudE5hbWU+IGV4dGVuZHMgQWN0aW9uTmFtZTxFeGNsdWRlPEV2ZW50TmFtZXMsIEV2ZW50TmFtZT4+XG4gID8gYCR7QWN0aW9uTmFtZTxFdmVudE5hbWU+fSBhY3Rpb24gaXMgYWxyZWFkeSBkZWZpbmVkYFxuICA6IHVua25vd247XG5cbnR5cGUgTm90QWxsb3dlZEV2ZW50UHJvcHNDaGVjazxcbiAgUHJvcHNDcmVhdG9yIGV4dGVuZHMgQWN0aW9uQ3JlYXRvclByb3BzPHVua25vd24+IHwgQ3JlYXRvclxuPiA9IFByb3BzQ3JlYXRvciBleHRlbmRzIEFjdGlvbkNyZWF0b3JQcm9wczxpbmZlciBQcm9wcz5cbiAgPyBQcm9wcyBleHRlbmRzIHZvaWRcbiAgICA/IHVua25vd25cbiAgICA6IE5vdEFsbG93ZWRDaGVjazxQcm9wcyAmIG9iamVjdD5cbiAgOiBQcm9wc0NyZWF0b3IgZXh0ZW5kcyBDcmVhdG9yPGFueSwgaW5mZXIgUmVzdWx0PlxuICA/IE5vdEFsbG93ZWRDaGVjazxSZXN1bHQ+XG4gIDogdW5rbm93bjtcblxudHlwZSBFdmVudENyZWF0b3I8XG4gIFByb3BzQ3JlYXRvciBleHRlbmRzIEFjdGlvbkNyZWF0b3JQcm9wczx1bmtub3duPiB8IENyZWF0b3IsXG4gIFR5cGUgZXh0ZW5kcyBzdHJpbmdcbj4gPSBQcm9wc0NyZWF0b3IgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yUHJvcHM8aW5mZXIgUHJvcHM+XG4gID8gdm9pZCBleHRlbmRzIFByb3BzXG4gICAgPyBBY3Rpb25DcmVhdG9yPFR5cGUsICgpID0+IFR5cGVkQWN0aW9uPFR5cGU+PlxuICAgIDogQWN0aW9uQ3JlYXRvcjxcbiAgICAgICAgVHlwZSxcbiAgICAgICAgKFxuICAgICAgICAgIHByb3BzOiBQcm9wcyAmIE5vdEFsbG93ZWRDaGVjazxQcm9wcyAmIG9iamVjdD5cbiAgICAgICAgKSA9PiBQcm9wcyAmIFR5cGVkQWN0aW9uPFR5cGU+XG4gICAgICA+XG4gIDogUHJvcHNDcmVhdG9yIGV4dGVuZHMgQ3JlYXRvcjxpbmZlciBQcm9wcywgaW5mZXIgUmVzdWx0PlxuICA/IEZ1bmN0aW9uV2l0aFBhcmFtZXRlcnNUeXBlPFxuICAgICAgUHJvcHMsXG4gICAgICBSZXN1bHQgJiBOb3RBbGxvd2VkQ2hlY2s8UmVzdWx0PiAmIFR5cGVkQWN0aW9uPFR5cGU+XG4gICAgPiAmXG4gICAgICBUeXBlZEFjdGlvbjxUeXBlPlxuICA6IG5ldmVyO1xuXG50eXBlIEFjdGlvbk5hbWU8RXZlbnROYW1lIGV4dGVuZHMgc3RyaW5nPiA9IFVuY2FwaXRhbGl6ZTxcbiAgSm9pbjxDYXBpdGFsaXplV29yZHM8RXZlbnROYW1lPj5cbj47XG5cbmludGVyZmFjZSBBY3Rpb25Hcm91cENvbmZpZzxcbiAgU291cmNlIGV4dGVuZHMgc3RyaW5nLFxuICBFdmVudHMgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBBY3Rpb25DcmVhdG9yUHJvcHM8dW5rbm93bj4gfCBDcmVhdG9yPlxuPiB7XG4gIHNvdXJjZTogU291cmNlICYgU3RyaW5nTGl0ZXJhbENoZWNrPFNvdXJjZSwgJ3NvdXJjZSc+O1xuICBldmVudHM6IEV2ZW50cyAmIHtcbiAgICBbRXZlbnROYW1lIGluIGtleW9mIEV2ZW50c106IFN0cmluZ0xpdGVyYWxDaGVjazxcbiAgICAgIEV2ZW50TmFtZSAmIHN0cmluZyxcbiAgICAgICdldmVudCBuYW1lJ1xuICAgID4gJlxuICAgICAgVW5pcXVlRXZlbnROYW1lQ2hlY2s8a2V5b2YgRXZlbnRzICYgc3RyaW5nLCBFdmVudE5hbWUgJiBzdHJpbmc+ICZcbiAgICAgIE5vdEFsbG93ZWRFdmVudFByb3BzQ2hlY2s8RXZlbnRzW0V2ZW50TmFtZV0+O1xuICB9O1xufVxuXG50eXBlIEFjdGlvbkdyb3VwPFxuICBTb3VyY2UgZXh0ZW5kcyBzdHJpbmcsXG4gIEV2ZW50cyBleHRlbmRzIFJlY29yZDxzdHJpbmcsIEFjdGlvbkNyZWF0b3JQcm9wczx1bmtub3duPiB8IENyZWF0b3I+XG4+ID0ge1xuICBbRXZlbnROYW1lIGluIGtleW9mIEV2ZW50cyBhcyBBY3Rpb25OYW1lPEV2ZW50TmFtZSAmIHN0cmluZz5dOiBFdmVudENyZWF0b3I8XG4gICAgRXZlbnRzW0V2ZW50TmFtZV0sXG4gICAgYFske1NvdXJjZX1dICR7RXZlbnROYW1lICYgc3RyaW5nfWBcbiAgPjtcbn07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBIGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyBhIGdyb3VwIG9mIGFjdGlvbiBjcmVhdG9ycyB3aXRoIHRoZSBzYW1lIHNvdXJjZS5cbiAqXG4gKiBAcGFyYW0gY29uZmlnIEFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgc291cmNlIGFuZCBkaWN0aW9uYXJ5IG9mIGV2ZW50cy5cbiAqIEFuIGV2ZW50IGlzIGEga2V5LXZhbHVlIHBhaXIgb2YgYW4gZXZlbnQgbmFtZSBhbmQgZXZlbnQgcHJvcHMuXG4gKiBAcmV0dXJucyBBIGRpY3Rpb25hcnkgb2YgYWN0aW9uIGNyZWF0b3JzLlxuICogVGhlIG5hbWUgb2YgZWFjaCBhY3Rpb24gY3JlYXRvciBpcyBjcmVhdGVkIGJ5IGNhbWVsIGNhc2luZyB0aGUgZXZlbnQgbmFtZS5cbiAqIFRoZSB0eXBlIG9mIGVhY2ggYWN0aW9uIGlzIGNyZWF0ZWQgdXNpbmcgdGhlIFwiW1NvdXJjZV0gRXZlbnQgTmFtZVwiIHBhdHRlcm4uXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBgYGB0c1xuICogY29uc3QgYXV0aEFwaUFjdGlvbnMgPSBjcmVhdGVBY3Rpb25Hcm91cCh7XG4gKiAgIHNvdXJjZTogJ0F1dGggQVBJJyxcbiAqICAgZXZlbnRzOiB7XG4gKiAgICAgLy8gZGVmaW5pbmcgZXZlbnRzIHdpdGggcGF5bG9hZCB1c2luZyB0aGUgYHByb3BzYCBmdW5jdGlvblxuICogICAgICdMb2dpbiBTdWNjZXNzJzogcHJvcHM8eyB1c2VySWQ6IG51bWJlcjsgdG9rZW46IHN0cmluZyB9PigpLFxuICogICAgICdMb2dpbiBGYWlsdXJlJzogcHJvcHM8eyBlcnJvcjogc3RyaW5nIH0+KCksXG4gKlxuICogICAgIC8vIGRlZmluaW5nIGFuIGV2ZW50IHdpdGhvdXQgcGF5bG9hZCB1c2luZyB0aGUgYGVtcHR5UHJvcHNgIGZ1bmN0aW9uXG4gKiAgICAgJ0xvZ291dCBTdWNjZXNzJzogZW1wdHlQcm9wcygpLFxuICpcbiAqICAgICAvLyBkZWZpbmluZyBhbiBldmVudCB3aXRoIHBheWxvYWQgdXNpbmcgdGhlIHByb3BzIGZhY3RvcnlcbiAqICAgICAnTG9nb3V0IEZhaWx1cmUnOiAoZXJyb3I6IEVycm9yKSA9PiAoeyBlcnJvciB9KSxcbiAqICAgfSxcbiAqIH0pO1xuICpcbiAqIC8vIGFjdGlvbiB0eXBlOiBcIltBdXRoIEFQSV0gTG9naW4gU3VjY2Vzc1wiXG4gKiBhdXRoQXBpQWN0aW9ucy5sb2dpblN1Y2Nlc3MoeyB1c2VySWQ6IDEwLCB0b2tlbjogJ25ncngnIH0pO1xuICpcbiAqIC8vIGFjdGlvbiB0eXBlOiBcIltBdXRoIEFQSV0gTG9naW4gRmFpbHVyZVwiXG4gKiBhdXRoQXBpQWN0aW9ucy5sb2dpbkZhaWx1cmUoeyBlcnJvcjogJ0xvZ2luIEZhaWx1cmUhJyB9KTtcbiAqXG4gKiAvLyBhY3Rpb24gdHlwZTogXCJbQXV0aCBBUEldIExvZ291dCBTdWNjZXNzXCJcbiAqIGF1dGhBcGlBY3Rpb25zLmxvZ291dFN1Y2Nlc3MoKTtcbiAqXG4gKiAvLyBhY3Rpb24gdHlwZTogXCJbQXV0aCBBUEldIExvZ291dCBGYWlsdXJlXCI7XG4gKiBhdXRoQXBpQWN0aW9ucy5sb2dvdXRGYWlsdXJlKG5ldyBFcnJvcignTG9nb3V0IEZhaWx1cmUhJykpO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3Rpb25Hcm91cDxcbiAgU291cmNlIGV4dGVuZHMgc3RyaW5nLFxuICBFdmVudHMgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBBY3Rpb25DcmVhdG9yUHJvcHM8dW5rbm93bj4gfCBDcmVhdG9yPlxuPihjb25maWc6IEFjdGlvbkdyb3VwQ29uZmlnPFNvdXJjZSwgRXZlbnRzPik6IEFjdGlvbkdyb3VwPFNvdXJjZSwgRXZlbnRzPiB7XG4gIGNvbnN0IHsgc291cmNlLCBldmVudHMgfSA9IGNvbmZpZztcblxuICByZXR1cm4gT2JqZWN0LmtleXMoZXZlbnRzKS5yZWR1Y2UoXG4gICAgKGFjdGlvbkdyb3VwLCBldmVudE5hbWUpID0+ICh7XG4gICAgICAuLi5hY3Rpb25Hcm91cCxcbiAgICAgIFt0b0FjdGlvbk5hbWUoZXZlbnROYW1lKV06IGNyZWF0ZUFjdGlvbihcbiAgICAgICAgdG9BY3Rpb25UeXBlKHNvdXJjZSwgZXZlbnROYW1lKSxcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV1cbiAgICAgICksXG4gICAgfSksXG4gICAge30gYXMgQWN0aW9uR3JvdXA8U291cmNlLCBFdmVudHM+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbXB0eVByb3BzKCk6IEFjdGlvbkNyZWF0b3JQcm9wczx2b2lkPiB7XG4gIHJldHVybiBwcm9wcygpO1xufVxuXG5mdW5jdGlvbiB0b0FjdGlvbk5hbWU8RXZlbnROYW1lIGV4dGVuZHMgc3RyaW5nPihcbiAgZXZlbnROYW1lOiBFdmVudE5hbWVcbik6IEFjdGlvbk5hbWU8RXZlbnROYW1lPiB7XG4gIHJldHVybiBldmVudE5hbWVcbiAgICAudHJpbSgpXG4gICAgLnNwbGl0KCcgJylcbiAgICAubWFwKCh3b3JkLCBpKSA9PiAoaSA9PT0gMCA/IHVuY2FwaXRhbGl6ZSh3b3JkKSA6IGNhcGl0YWxpemUod29yZCkpKVxuICAgIC5qb2luKCcnKSBhcyBBY3Rpb25OYW1lPEV2ZW50TmFtZT47XG59XG5cbmZ1bmN0aW9uIHRvQWN0aW9uVHlwZTxTb3VyY2UgZXh0ZW5kcyBzdHJpbmcsIEV2ZW50TmFtZSBleHRlbmRzIHN0cmluZz4oXG4gIHNvdXJjZTogU291cmNlLFxuICBldmVudE5hbWU6IEV2ZW50TmFtZVxuKTogYFske1NvdXJjZX1dICR7RXZlbnROYW1lfWAge1xuICByZXR1cm4gYFske3NvdXJjZX1dICR7ZXZlbnROYW1lfWA7XG59XG4iXX0=