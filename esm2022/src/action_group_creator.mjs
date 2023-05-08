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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uX2dyb3VwX2NyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9hY3Rpb25fZ3JvdXBfY3JlYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXZELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBT3JEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0NHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUcvQixNQUF5QztJQUN6QyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQztJQUVsQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUMvQixDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0IsR0FBRyxXQUFXO1FBQ2QsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQ3JDLFlBQVksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQy9CLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FDbEI7S0FDRixDQUFDLEVBQ0YsRUFBaUMsQ0FDbEMsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsVUFBVTtJQUN4QixPQUFPLEtBQUssRUFBRSxDQUFDO0FBQ2pCLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FDbkIsU0FBb0I7SUFFcEIsT0FBTyxTQUFTO1NBQ2IsSUFBSSxFQUFFO1NBQ04sS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNuRSxJQUFJLENBQUMsRUFBRSxDQUEwQixDQUFDO0FBQ3ZDLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FDbkIsTUFBYyxFQUNkLFNBQW9CO0lBRXBCLE9BQU8sSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFLENBQUM7QUFDcEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUFjdGlvbiwgcHJvcHMgfSBmcm9tICcuL2FjdGlvbl9jcmVhdG9yJztcbmltcG9ydCB7IEFjdGlvbkNyZWF0b3JQcm9wcywgQ3JlYXRvciB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IGNhcGl0YWxpemUsIHVuY2FwaXRhbGl6ZSB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQge1xuICBBY3Rpb25Hcm91cCxcbiAgQWN0aW9uR3JvdXBDb25maWcsXG4gIEFjdGlvbk5hbWUsXG59IGZyb20gJy4vYWN0aW9uX2dyb3VwX2NyZWF0b3JfbW9kZWxzJztcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEEgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGEgZ3JvdXAgb2YgYWN0aW9uIGNyZWF0b3JzIHdpdGggdGhlIHNhbWUgc291cmNlLlxuICpcbiAqIEBwYXJhbSBjb25maWcgQW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBzb3VyY2UgYW5kIGRpY3Rpb25hcnkgb2YgZXZlbnRzLlxuICogQW4gZXZlbnQgaXMgYSBrZXktdmFsdWUgcGFpciBvZiBhbiBldmVudCBuYW1lIGFuZCBldmVudCBwcm9wcy5cbiAqIEByZXR1cm5zIEEgZGljdGlvbmFyeSBvZiBhY3Rpb24gY3JlYXRvcnMuXG4gKiBUaGUgbmFtZSBvZiBlYWNoIGFjdGlvbiBjcmVhdG9yIGlzIGNyZWF0ZWQgYnkgY2FtZWwgY2FzaW5nIHRoZSBldmVudCBuYW1lLlxuICogVGhlIHR5cGUgb2YgZWFjaCBhY3Rpb24gaXMgY3JlYXRlZCB1c2luZyB0aGUgXCJbU291cmNlXSBFdmVudCBOYW1lXCIgcGF0dGVybi5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIGBgYHRzXG4gKiBjb25zdCBhdXRoQXBpQWN0aW9ucyA9IGNyZWF0ZUFjdGlvbkdyb3VwKHtcbiAqICAgc291cmNlOiAnQXV0aCBBUEknLFxuICogICBldmVudHM6IHtcbiAqICAgICAvLyBkZWZpbmluZyBldmVudHMgd2l0aCBwYXlsb2FkIHVzaW5nIHRoZSBgcHJvcHNgIGZ1bmN0aW9uXG4gKiAgICAgJ0xvZ2luIFN1Y2Nlc3MnOiBwcm9wczx7IHVzZXJJZDogbnVtYmVyOyB0b2tlbjogc3RyaW5nIH0+KCksXG4gKiAgICAgJ0xvZ2luIEZhaWx1cmUnOiBwcm9wczx7IGVycm9yOiBzdHJpbmcgfT4oKSxcbiAqXG4gKiAgICAgLy8gZGVmaW5pbmcgYW4gZXZlbnQgd2l0aG91dCBwYXlsb2FkIHVzaW5nIHRoZSBgZW1wdHlQcm9wc2AgZnVuY3Rpb25cbiAqICAgICAnTG9nb3V0IFN1Y2Nlc3MnOiBlbXB0eVByb3BzKCksXG4gKlxuICogICAgIC8vIGRlZmluaW5nIGFuIGV2ZW50IHdpdGggcGF5bG9hZCB1c2luZyB0aGUgcHJvcHMgZmFjdG9yeVxuICogICAgICdMb2dvdXQgRmFpbHVyZSc6IChlcnJvcjogRXJyb3IpID0+ICh7IGVycm9yIH0pLFxuICogICB9LFxuICogfSk7XG4gKlxuICogLy8gYWN0aW9uIHR5cGU6IFwiW0F1dGggQVBJXSBMb2dpbiBTdWNjZXNzXCJcbiAqIGF1dGhBcGlBY3Rpb25zLmxvZ2luU3VjY2Vzcyh7IHVzZXJJZDogMTAsIHRva2VuOiAnbmdyeCcgfSk7XG4gKlxuICogLy8gYWN0aW9uIHR5cGU6IFwiW0F1dGggQVBJXSBMb2dpbiBGYWlsdXJlXCJcbiAqIGF1dGhBcGlBY3Rpb25zLmxvZ2luRmFpbHVyZSh7IGVycm9yOiAnTG9naW4gRmFpbHVyZSEnIH0pO1xuICpcbiAqIC8vIGFjdGlvbiB0eXBlOiBcIltBdXRoIEFQSV0gTG9nb3V0IFN1Y2Nlc3NcIlxuICogYXV0aEFwaUFjdGlvbnMubG9nb3V0U3VjY2VzcygpO1xuICpcbiAqIC8vIGFjdGlvbiB0eXBlOiBcIltBdXRoIEFQSV0gTG9nb3V0IEZhaWx1cmVcIjtcbiAqIGF1dGhBcGlBY3Rpb25zLmxvZ291dEZhaWx1cmUobmV3IEVycm9yKCdMb2dvdXQgRmFpbHVyZSEnKSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbkdyb3VwPFxuICBTb3VyY2UgZXh0ZW5kcyBzdHJpbmcsXG4gIEV2ZW50cyBleHRlbmRzIFJlY29yZDxzdHJpbmcsIEFjdGlvbkNyZWF0b3JQcm9wczx1bmtub3duPiB8IENyZWF0b3I+XG4+KGNvbmZpZzogQWN0aW9uR3JvdXBDb25maWc8U291cmNlLCBFdmVudHM+KTogQWN0aW9uR3JvdXA8U291cmNlLCBFdmVudHM+IHtcbiAgY29uc3QgeyBzb3VyY2UsIGV2ZW50cyB9ID0gY29uZmlnO1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyhldmVudHMpLnJlZHVjZShcbiAgICAoYWN0aW9uR3JvdXAsIGV2ZW50TmFtZSkgPT4gKHtcbiAgICAgIC4uLmFjdGlvbkdyb3VwLFxuICAgICAgW3RvQWN0aW9uTmFtZShldmVudE5hbWUpXTogY3JlYXRlQWN0aW9uKFxuICAgICAgICB0b0FjdGlvblR5cGUoc291cmNlLCBldmVudE5hbWUpLFxuICAgICAgICBldmVudHNbZXZlbnROYW1lXVxuICAgICAgKSxcbiAgICB9KSxcbiAgICB7fSBhcyBBY3Rpb25Hcm91cDxTb3VyY2UsIEV2ZW50cz5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtcHR5UHJvcHMoKTogQWN0aW9uQ3JlYXRvclByb3BzPHZvaWQ+IHtcbiAgcmV0dXJuIHByb3BzKCk7XG59XG5cbmZ1bmN0aW9uIHRvQWN0aW9uTmFtZTxFdmVudE5hbWUgZXh0ZW5kcyBzdHJpbmc+KFxuICBldmVudE5hbWU6IEV2ZW50TmFtZVxuKTogQWN0aW9uTmFtZTxFdmVudE5hbWU+IHtcbiAgcmV0dXJuIGV2ZW50TmFtZVxuICAgIC50cmltKClcbiAgICAuc3BsaXQoJyAnKVxuICAgIC5tYXAoKHdvcmQsIGkpID0+IChpID09PSAwID8gdW5jYXBpdGFsaXplKHdvcmQpIDogY2FwaXRhbGl6ZSh3b3JkKSkpXG4gICAgLmpvaW4oJycpIGFzIEFjdGlvbk5hbWU8RXZlbnROYW1lPjtcbn1cblxuZnVuY3Rpb24gdG9BY3Rpb25UeXBlPFNvdXJjZSBleHRlbmRzIHN0cmluZywgRXZlbnROYW1lIGV4dGVuZHMgc3RyaW5nPihcbiAgc291cmNlOiBTb3VyY2UsXG4gIGV2ZW50TmFtZTogRXZlbnROYW1lXG4pOiBgWyR7U291cmNlfV0gJHtFdmVudE5hbWV9YCB7XG4gIHJldHVybiBgWyR7c291cmNlfV0gJHtldmVudE5hbWV9YDtcbn1cbiJdfQ==