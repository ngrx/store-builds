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
        if (checks.action) {
            /** @type {?} */
            const unserializableAction = getUnserializable(action);
            throwIfUnserializable(unserializableAction, 'action');
        }
        /** @type {?} */
        const nextState = reducer(state, action);
        if (checks.state) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXphdGlvbl9yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvbWV0YS1yZWR1Y2Vycy9zZXJpYWxpemF0aW9uX3JlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFdBQVcsRUFDWCxNQUFNLEVBQ04sUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLEVBQ1IsT0FBTyxHQUNSLE1BQU0sU0FBUyxDQUFDOzs7Ozs7QUFFakIsTUFBTSxVQUFVLDZCQUE2QixDQUMzQyxPQUFnQyxFQUNoQyxNQUEyQztJQUUzQzs7Ozs7SUFBTyxVQUFTLEtBQUssRUFBRSxNQUFNO1FBQzNCLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTs7a0JBQ1gsb0JBQW9CLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDO1lBQ3RELHFCQUFxQixDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZEOztjQUVLLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztRQUV4QyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7O2tCQUNWLG1CQUFtQixHQUFHLGlCQUFpQixDQUFDLFNBQVMsQ0FBQztZQUN4RCxxQkFBcUIsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNyRDtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUMsRUFBQztBQUNKLENBQUM7Ozs7OztBQUVELFNBQVMsaUJBQWlCLENBQ3hCLE1BQVksRUFDWixPQUFpQixFQUFFO0lBRW5CLDBFQUEwRTtJQUMxRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2hFLE9BQU87WUFDTCxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDZCxLQUFLLEVBQUUsTUFBTTtTQUNkLENBQUM7S0FDSDs7VUFFSyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDaEMsT0FBTyxJQUFJLENBQUMsTUFBTTs7Ozs7SUFBeUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDekUsSUFBSSxNQUFNLEVBQUU7WUFDVixPQUFPLE1BQU0sQ0FBQztTQUNmOztjQUVLLEtBQUssR0FBRyxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRWxDLElBQ0UsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2IsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUNmLFNBQVMsQ0FBQyxLQUFLLENBQUM7WUFDaEIsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFDZDtZQUNBLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QixPQUFPLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFPO1lBQ0wsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDO1lBQ3BCLEtBQUs7U0FDTixDQUFDO0lBQ0osQ0FBQyxHQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ1osQ0FBQzs7Ozs7O0FBRUQsU0FBUyxxQkFBcUIsQ0FDNUIsY0FBc0QsRUFDdEQsT0FBMkI7SUFFM0IsSUFBSSxjQUFjLEtBQUssS0FBSyxFQUFFO1FBQzVCLE9BQU87S0FDUjs7VUFFSyxrQkFBa0IsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7O1VBQ2xELEtBQUssR0FBUSxJQUFJLEtBQUssQ0FDMUIsMkJBQTJCLE9BQU8sUUFBUSxrQkFBa0IsR0FBRyxDQUNoRTtJQUNELEtBQUssQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztJQUNuQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7SUFDOUMsTUFBTSxLQUFLLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uUmVkdWNlciB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQge1xuICBpc1BsYWluT2JqZWN0LFxuICBpc1VuZGVmaW5lZCxcbiAgaXNOdWxsLFxuICBpc051bWJlcixcbiAgaXNCb29sZWFuLFxuICBpc1N0cmluZyxcbiAgaXNBcnJheSxcbn0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcihcbiAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4sXG4gIGNoZWNrczogeyBhY3Rpb246IGJvb2xlYW47IHN0YXRlOiBib29sZWFuIH1cbik6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBpZiAoY2hlY2tzLmFjdGlvbikge1xuICAgICAgY29uc3QgdW5zZXJpYWxpemFibGVBY3Rpb24gPSBnZXRVbnNlcmlhbGl6YWJsZShhY3Rpb24pO1xuICAgICAgdGhyb3dJZlVuc2VyaWFsaXphYmxlKHVuc2VyaWFsaXphYmxlQWN0aW9uLCAnYWN0aW9uJyk7XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFN0YXRlID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgIGlmIChjaGVja3Muc3RhdGUpIHtcbiAgICAgIGNvbnN0IHVuc2VyaWFsaXphYmxlU3RhdGUgPSBnZXRVbnNlcmlhbGl6YWJsZShuZXh0U3RhdGUpO1xuICAgICAgdGhyb3dJZlVuc2VyaWFsaXphYmxlKHVuc2VyaWFsaXphYmxlU3RhdGUsICdzdGF0ZScpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0U3RhdGU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFVuc2VyaWFsaXphYmxlKFxuICB0YXJnZXQ/OiBhbnksXG4gIHBhdGg6IHN0cmluZ1tdID0gW11cbik6IGZhbHNlIHwgeyBwYXRoOiBzdHJpbmdbXTsgdmFsdWU6IGFueSB9IHtcbiAgLy8gR3VhcmQgYWdhaW5zdCB1bmRlZmluZWQgYW5kIG51bGwsIGUuZy4gYSByZWR1Y2VyIHRoYXQgcmV0dXJucyB1bmRlZmluZWRcbiAgaWYgKChpc1VuZGVmaW5lZCh0YXJnZXQpIHx8IGlzTnVsbCh0YXJnZXQpKSAmJiBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBbJ3Jvb3QnXSxcbiAgICAgIHZhbHVlOiB0YXJnZXQsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0YXJnZXQpO1xuICByZXR1cm4ga2V5cy5yZWR1Y2U8ZmFsc2UgfCB7IHBhdGg6IHN0cmluZ1tdOyB2YWx1ZTogYW55IH0+KChyZXN1bHQsIGtleSkgPT4ge1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSAodGFyZ2V0IGFzIGFueSlba2V5XTtcblxuICAgIGlmIChcbiAgICAgIGlzVW5kZWZpbmVkKHZhbHVlKSB8fFxuICAgICAgaXNOdWxsKHZhbHVlKSB8fFxuICAgICAgaXNOdW1iZXIodmFsdWUpIHx8XG4gICAgICBpc0Jvb2xlYW4odmFsdWUpIHx8XG4gICAgICBpc1N0cmluZyh2YWx1ZSkgfHxcbiAgICAgIGlzQXJyYXkodmFsdWUpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZ2V0VW5zZXJpYWxpemFibGUodmFsdWUsIFsuLi5wYXRoLCBrZXldKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGF0aDogWy4uLnBhdGgsIGtleV0sXG4gICAgICB2YWx1ZSxcbiAgICB9O1xuICB9LCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIHRocm93SWZVbnNlcmlhbGl6YWJsZShcbiAgdW5zZXJpYWxpemFibGU6IGZhbHNlIHwgeyBwYXRoOiBzdHJpbmdbXTsgdmFsdWU6IGFueSB9LFxuICBjb250ZXh0OiAnc3RhdGUnIHwgJ2FjdGlvbidcbikge1xuICBpZiAodW5zZXJpYWxpemFibGUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdW5zZXJpYWxpemFibGVQYXRoID0gdW5zZXJpYWxpemFibGUucGF0aC5qb2luKCcuJyk7XG4gIGNvbnN0IGVycm9yOiBhbnkgPSBuZXcgRXJyb3IoXG4gICAgYERldGVjdGVkIHVuc2VyaWFsaXphYmxlICR7Y29udGV4dH0gYXQgXCIke3Vuc2VyaWFsaXphYmxlUGF0aH1cImBcbiAgKTtcbiAgZXJyb3IudmFsdWUgPSB1bnNlcmlhbGl6YWJsZS52YWx1ZTtcbiAgZXJyb3IudW5zZXJpYWxpemFibGVQYXRoID0gdW5zZXJpYWxpemFibGVQYXRoO1xuICB0aHJvdyBlcnJvcjtcbn1cbiJdfQ==