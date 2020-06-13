/**
 * @fileoverview added by tsickle
 * Generated from: src/meta-reducers/serialization_reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isPlainObject, isUndefined, isNull, isNumber, isBoolean, isString, isArray, RUNTIME_CHECK_URL, isComponent, } from './utils';
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
        // Ignore Ivy components
        if (isComponent(value)) {
            return result;
        }
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
    const error = new Error(`Detected unserializable ${context} at "${unserializablePath}". ${RUNTIME_CHECK_URL}#strict${context}serializability`);
    error.value = unserializable.value;
    error.unserializablePath = unserializablePath;
    throw error;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXphdGlvbl9yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvbWV0YS1yZWR1Y2Vycy9zZXJpYWxpemF0aW9uX3JlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFdBQVcsRUFDWCxNQUFNLEVBQ04sUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLEVBQ1IsT0FBTyxFQUNQLGlCQUFpQixFQUNqQixXQUFXLEdBQ1osTUFBTSxTQUFTLENBQUM7Ozs7OztBQUVqQixNQUFNLFVBQVUsNkJBQTZCLENBQzNDLE9BQWdDLEVBQ2hDLE1BQXFFO0lBRXJFOzs7OztJQUFPLFVBQVUsS0FBSyxFQUFFLE1BQU07UUFDNUIsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFOztrQkFDbkIsb0JBQW9CLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDO1lBQ3RELHFCQUFxQixDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZEOztjQUVLLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztRQUV4QyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRTs7a0JBQ1osbUJBQW1CLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxDQUFDO1lBQ3hELHFCQUFxQixDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQyxFQUFDO0FBQ0osQ0FBQzs7Ozs7O0FBRUQsU0FBUyxpQkFBaUIsQ0FDeEIsTUFBWSxFQUNaLE9BQWlCLEVBQUU7SUFFbkIsMEVBQTBFO0lBQzFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDaEUsT0FBTztZQUNMLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNkLEtBQUssRUFBRSxNQUFNO1NBQ2QsQ0FBQztLQUNIOztVQUVLLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNoQyxPQUFPLElBQUksQ0FBQyxNQUFNOzs7OztJQUF5QyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUN6RSxJQUFJLE1BQU0sRUFBRTtZQUNWLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7O2NBRUssS0FBSyxHQUFHLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFFbEMsd0JBQXdCO1FBQ3hCLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFFRCxJQUNFLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNiLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDZixTQUFTLENBQUMsS0FBSyxDQUFDO1lBQ2hCLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEVBQ2Q7WUFDQSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsT0FBTztZQUNMLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQztZQUNwQixLQUFLO1NBQ04sQ0FBQztJQUNKLENBQUMsR0FBRSxLQUFLLENBQUMsQ0FBQztBQUNaLENBQUM7Ozs7OztBQUVELFNBQVMscUJBQXFCLENBQzVCLGNBQXNELEVBQ3RELE9BQTJCO0lBRTNCLElBQUksY0FBYyxLQUFLLEtBQUssRUFBRTtRQUM1QixPQUFPO0tBQ1I7O1VBRUssa0JBQWtCLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOztVQUNsRCxLQUFLLEdBQVEsSUFBSSxLQUFLLENBQzFCLDJCQUEyQixPQUFPLFFBQVEsa0JBQWtCLE1BQU0saUJBQWlCLFVBQVUsT0FBTyxpQkFBaUIsQ0FDdEg7SUFDRCxLQUFLLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7SUFDbkMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0lBQzlDLE1BQU0sS0FBSyxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvblJlZHVjZXIsIEFjdGlvbiB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQge1xuICBpc1BsYWluT2JqZWN0LFxuICBpc1VuZGVmaW5lZCxcbiAgaXNOdWxsLFxuICBpc051bWJlcixcbiAgaXNCb29sZWFuLFxuICBpc1N0cmluZyxcbiAgaXNBcnJheSxcbiAgUlVOVElNRV9DSEVDS19VUkwsXG4gIGlzQ29tcG9uZW50LFxufSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyKFxuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PixcbiAgY2hlY2tzOiB7IGFjdGlvbjogKGFjdGlvbjogQWN0aW9uKSA9PiBib29sZWFuOyBzdGF0ZTogKCkgPT4gYm9vbGVhbiB9XG4pOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PiB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbikge1xuICAgIGlmIChjaGVja3MuYWN0aW9uKGFjdGlvbikpIHtcbiAgICAgIGNvbnN0IHVuc2VyaWFsaXphYmxlQWN0aW9uID0gZ2V0VW5zZXJpYWxpemFibGUoYWN0aW9uKTtcbiAgICAgIHRocm93SWZVbnNlcmlhbGl6YWJsZSh1bnNlcmlhbGl6YWJsZUFjdGlvbiwgJ2FjdGlvbicpO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICBpZiAoY2hlY2tzLnN0YXRlKCkpIHtcbiAgICAgIGNvbnN0IHVuc2VyaWFsaXphYmxlU3RhdGUgPSBnZXRVbnNlcmlhbGl6YWJsZShuZXh0U3RhdGUpO1xuICAgICAgdGhyb3dJZlVuc2VyaWFsaXphYmxlKHVuc2VyaWFsaXphYmxlU3RhdGUsICdzdGF0ZScpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0U3RhdGU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFVuc2VyaWFsaXphYmxlKFxuICB0YXJnZXQ/OiBhbnksXG4gIHBhdGg6IHN0cmluZ1tdID0gW11cbik6IGZhbHNlIHwgeyBwYXRoOiBzdHJpbmdbXTsgdmFsdWU6IGFueSB9IHtcbiAgLy8gR3VhcmQgYWdhaW5zdCB1bmRlZmluZWQgYW5kIG51bGwsIGUuZy4gYSByZWR1Y2VyIHRoYXQgcmV0dXJucyB1bmRlZmluZWRcbiAgaWYgKChpc1VuZGVmaW5lZCh0YXJnZXQpIHx8IGlzTnVsbCh0YXJnZXQpKSAmJiBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBbJ3Jvb3QnXSxcbiAgICAgIHZhbHVlOiB0YXJnZXQsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0YXJnZXQpO1xuICByZXR1cm4ga2V5cy5yZWR1Y2U8ZmFsc2UgfCB7IHBhdGg6IHN0cmluZ1tdOyB2YWx1ZTogYW55IH0+KChyZXN1bHQsIGtleSkgPT4ge1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSAodGFyZ2V0IGFzIGFueSlba2V5XTtcblxuICAgIC8vIElnbm9yZSBJdnkgY29tcG9uZW50c1xuICAgIGlmIChpc0NvbXBvbmVudCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgaXNVbmRlZmluZWQodmFsdWUpIHx8XG4gICAgICBpc051bGwodmFsdWUpIHx8XG4gICAgICBpc051bWJlcih2YWx1ZSkgfHxcbiAgICAgIGlzQm9vbGVhbih2YWx1ZSkgfHxcbiAgICAgIGlzU3RyaW5nKHZhbHVlKSB8fFxuICAgICAgaXNBcnJheSh2YWx1ZSlcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBnZXRVbnNlcmlhbGl6YWJsZSh2YWx1ZSwgWy4uLnBhdGgsIGtleV0pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBbLi4ucGF0aCwga2V5XSxcbiAgICAgIHZhbHVlLFxuICAgIH07XG4gIH0sIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gdGhyb3dJZlVuc2VyaWFsaXphYmxlKFxuICB1bnNlcmlhbGl6YWJsZTogZmFsc2UgfCB7IHBhdGg6IHN0cmluZ1tdOyB2YWx1ZTogYW55IH0sXG4gIGNvbnRleHQ6ICdzdGF0ZScgfCAnYWN0aW9uJ1xuKSB7XG4gIGlmICh1bnNlcmlhbGl6YWJsZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB1bnNlcmlhbGl6YWJsZVBhdGggPSB1bnNlcmlhbGl6YWJsZS5wYXRoLmpvaW4oJy4nKTtcbiAgY29uc3QgZXJyb3I6IGFueSA9IG5ldyBFcnJvcihcbiAgICBgRGV0ZWN0ZWQgdW5zZXJpYWxpemFibGUgJHtjb250ZXh0fSBhdCBcIiR7dW5zZXJpYWxpemFibGVQYXRofVwiLiAke1JVTlRJTUVfQ0hFQ0tfVVJMfSNzdHJpY3Qke2NvbnRleHR9c2VyaWFsaXphYmlsaXR5YFxuICApO1xuICBlcnJvci52YWx1ZSA9IHVuc2VyaWFsaXphYmxlLnZhbHVlO1xuICBlcnJvci51bnNlcmlhbGl6YWJsZVBhdGggPSB1bnNlcmlhbGl6YWJsZVBhdGg7XG4gIHRocm93IGVycm9yO1xufVxuIl19