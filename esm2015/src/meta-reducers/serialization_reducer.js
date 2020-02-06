/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/src/meta-reducers/serialization_reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isPlainObject, isUndefined, isNull, isNumber, isBoolean, isString, isArray, } from './utils';
/**
 * @param {?} reducer
 * @param {?} checks
 * @return {?}
 */
export function serializationCheckMetaReducer(reducer, checks) {
    return (/**
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    function (state, action) {
        if (checks.action(action)) {
            /** @type {?} */
            const unserializableAction = getUnserializable(action);
            throwIfUnserializable(unserializableAction, 'action');
        }
        /** @type {?} */
        const nextState = reducer(state, action);
        if (checks.state()) {
            /** @type {?} */
            const unserializableState = getUnserializable(nextState);
            throwIfUnserializable(unserializableState, 'state');
        }
        return nextState;
    });
}
/**
 * @param {?=} target
 * @param {?=} path
 * @return {?}
 */
function getUnserializable(target, path = []) {
    // Guard against undefined and null, e.g. a reducer that returns undefined
    if ((isUndefined(target) || isNull(target)) && path.length === 0) {
        return {
            path: ['root'],
            value: target,
        };
    }
    /** @type {?} */
    const keys = Object.keys(target);
    return keys.reduce((/**
     * @param {?} result
     * @param {?} key
     * @return {?}
     */
    (result, key) => {
        if (result) {
            return result;
        }
        /** @type {?} */
        const value = ((/** @type {?} */ (target)))[key];
        if (isUndefined(value) ||
            isNull(value) ||
            isNumber(value) ||
            isBoolean(value) ||
            isString(value) ||
            isArray(value)) {
            return false;
        }
        if (isPlainObject(value)) {
            return getUnserializable(value, [...path, key]);
        }
        return {
            path: [...path, key],
            value,
        };
    }), false);
}
/**
 * @param {?} unserializable
 * @param {?} context
 * @return {?}
 */
function throwIfUnserializable(unserializable, context) {
    if (unserializable === false) {
        return;
    }
    /** @type {?} */
    const unserializablePath = unserializable.path.join('.');
    /** @type {?} */
    const error = new Error(`Detected unserializable ${context} at "${unserializablePath}"`);
    error.value = unserializable.value;
    error.unserializablePath = unserializablePath;
    throw error;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXphdGlvbl9yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvbWV0YS1yZWR1Y2Vycy9zZXJpYWxpemF0aW9uX3JlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFdBQVcsRUFDWCxNQUFNLEVBQ04sUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLEVBQ1IsT0FBTyxHQUNSLE1BQU0sU0FBUyxDQUFDOzs7Ozs7QUFFakIsTUFBTSxVQUFVLDZCQUE2QixDQUMzQyxPQUFnQyxFQUNoQyxNQUFxRTtJQUVyRTs7Ozs7SUFBTyxVQUFTLEtBQUssRUFBRSxNQUFNO1FBQzNCLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTs7a0JBQ25CLG9CQUFvQixHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztZQUN0RCxxQkFBcUIsQ0FBQyxvQkFBb0IsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN2RDs7Y0FFSyxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7UUFFeEMsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUU7O2tCQUNaLG1CQUFtQixHQUFHLGlCQUFpQixDQUFDLFNBQVMsQ0FBQztZQUN4RCxxQkFBcUIsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNyRDtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUMsRUFBQztBQUNKLENBQUM7Ozs7OztBQUVELFNBQVMsaUJBQWlCLENBQ3hCLE1BQVksRUFDWixPQUFpQixFQUFFO0lBRW5CLDBFQUEwRTtJQUMxRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2hFLE9BQU87WUFDTCxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDZCxLQUFLLEVBQUUsTUFBTTtTQUNkLENBQUM7S0FDSDs7VUFFSyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDaEMsT0FBTyxJQUFJLENBQUMsTUFBTTs7Ozs7SUFBeUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDekUsSUFBSSxNQUFNLEVBQUU7WUFDVixPQUFPLE1BQU0sQ0FBQztTQUNmOztjQUVLLEtBQUssR0FBRyxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRWxDLElBQ0UsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2IsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUNmLFNBQVMsQ0FBQyxLQUFLLENBQUM7WUFDaEIsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFDZDtZQUNBLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QixPQUFPLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFPO1lBQ0wsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDO1lBQ3BCLEtBQUs7U0FDTixDQUFDO0lBQ0osQ0FBQyxHQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ1osQ0FBQzs7Ozs7O0FBRUQsU0FBUyxxQkFBcUIsQ0FDNUIsY0FBc0QsRUFDdEQsT0FBMkI7SUFFM0IsSUFBSSxjQUFjLEtBQUssS0FBSyxFQUFFO1FBQzVCLE9BQU87S0FDUjs7VUFFSyxrQkFBa0IsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7O1VBQ2xELEtBQUssR0FBUSxJQUFJLEtBQUssQ0FDMUIsMkJBQTJCLE9BQU8sUUFBUSxrQkFBa0IsR0FBRyxDQUNoRTtJQUNELEtBQUssQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztJQUNuQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7SUFDOUMsTUFBTSxLQUFLLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uUmVkdWNlciwgQWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7XG4gIGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkLFxuICBpc051bGwsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzU3RyaW5nLFxuICBpc0FycmF5LFxufSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyKFxuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PixcbiAgY2hlY2tzOiB7IGFjdGlvbjogKGFjdGlvbjogQWN0aW9uKSA9PiBib29sZWFuOyBzdGF0ZTogKCkgPT4gYm9vbGVhbiB9XG4pOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PiB7XG4gIHJldHVybiBmdW5jdGlvbihzdGF0ZSwgYWN0aW9uKSB7XG4gICAgaWYgKGNoZWNrcy5hY3Rpb24oYWN0aW9uKSkge1xuICAgICAgY29uc3QgdW5zZXJpYWxpemFibGVBY3Rpb24gPSBnZXRVbnNlcmlhbGl6YWJsZShhY3Rpb24pO1xuICAgICAgdGhyb3dJZlVuc2VyaWFsaXphYmxlKHVuc2VyaWFsaXphYmxlQWN0aW9uLCAnYWN0aW9uJyk7XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFN0YXRlID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgIGlmIChjaGVja3Muc3RhdGUoKSkge1xuICAgICAgY29uc3QgdW5zZXJpYWxpemFibGVTdGF0ZSA9IGdldFVuc2VyaWFsaXphYmxlKG5leHRTdGF0ZSk7XG4gICAgICB0aHJvd0lmVW5zZXJpYWxpemFibGUodW5zZXJpYWxpemFibGVTdGF0ZSwgJ3N0YXRlJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHRTdGF0ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0VW5zZXJpYWxpemFibGUoXG4gIHRhcmdldD86IGFueSxcbiAgcGF0aDogc3RyaW5nW10gPSBbXVxuKTogZmFsc2UgfCB7IHBhdGg6IHN0cmluZ1tdOyB2YWx1ZTogYW55IH0ge1xuICAvLyBHdWFyZCBhZ2FpbnN0IHVuZGVmaW5lZCBhbmQgbnVsbCwgZS5nLiBhIHJlZHVjZXIgdGhhdCByZXR1cm5zIHVuZGVmaW5lZFxuICBpZiAoKGlzVW5kZWZpbmVkKHRhcmdldCkgfHwgaXNOdWxsKHRhcmdldCkpICYmIHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IFsncm9vdCddLFxuICAgICAgdmFsdWU6IHRhcmdldCxcbiAgICB9O1xuICB9XG5cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRhcmdldCk7XG4gIHJldHVybiBrZXlzLnJlZHVjZTxmYWxzZSB8IHsgcGF0aDogc3RyaW5nW107IHZhbHVlOiBhbnkgfT4oKHJlc3VsdCwga2V5KSA9PiB7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9ICh0YXJnZXQgYXMgYW55KVtrZXldO1xuXG4gICAgaWYgKFxuICAgICAgaXNVbmRlZmluZWQodmFsdWUpIHx8XG4gICAgICBpc051bGwodmFsdWUpIHx8XG4gICAgICBpc051bWJlcih2YWx1ZSkgfHxcbiAgICAgIGlzQm9vbGVhbih2YWx1ZSkgfHxcbiAgICAgIGlzU3RyaW5nKHZhbHVlKSB8fFxuICAgICAgaXNBcnJheSh2YWx1ZSlcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBnZXRVbnNlcmlhbGl6YWJsZSh2YWx1ZSwgWy4uLnBhdGgsIGtleV0pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBbLi4ucGF0aCwga2V5XSxcbiAgICAgIHZhbHVlLFxuICAgIH07XG4gIH0sIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gdGhyb3dJZlVuc2VyaWFsaXphYmxlKFxuICB1bnNlcmlhbGl6YWJsZTogZmFsc2UgfCB7IHBhdGg6IHN0cmluZ1tdOyB2YWx1ZTogYW55IH0sXG4gIGNvbnRleHQ6ICdzdGF0ZScgfCAnYWN0aW9uJ1xuKSB7XG4gIGlmICh1bnNlcmlhbGl6YWJsZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB1bnNlcmlhbGl6YWJsZVBhdGggPSB1bnNlcmlhbGl6YWJsZS5wYXRoLmpvaW4oJy4nKTtcbiAgY29uc3QgZXJyb3I6IGFueSA9IG5ldyBFcnJvcihcbiAgICBgRGV0ZWN0ZWQgdW5zZXJpYWxpemFibGUgJHtjb250ZXh0fSBhdCBcIiR7dW5zZXJpYWxpemFibGVQYXRofVwiYFxuICApO1xuICBlcnJvci52YWx1ZSA9IHVuc2VyaWFsaXphYmxlLnZhbHVlO1xuICBlcnJvci51bnNlcmlhbGl6YWJsZVBhdGggPSB1bnNlcmlhbGl6YWJsZVBhdGg7XG4gIHRocm93IGVycm9yO1xufVxuIl19