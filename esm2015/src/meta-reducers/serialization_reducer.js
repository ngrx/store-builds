/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/src/meta-reducers/serialization_reducer.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXphdGlvbl9yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvbWV0YS1yZWR1Y2Vycy9zZXJpYWxpemF0aW9uX3JlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFdBQVcsRUFDWCxNQUFNLEVBQ04sUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLEVBQ1IsT0FBTyxFQUNQLGlCQUFpQixFQUNqQixXQUFXLEdBQ1osTUFBTSxTQUFTLENBQUM7Ozs7OztBQUVqQixNQUFNLFVBQVUsNkJBQTZCLENBQzNDLE9BQWdDLEVBQ2hDLE1BQXFFO0lBRXJFOzs7OztJQUFPLFVBQVMsS0FBSyxFQUFFLE1BQU07UUFDM0IsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFOztrQkFDbkIsb0JBQW9CLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDO1lBQ3RELHFCQUFxQixDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZEOztjQUVLLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztRQUV4QyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRTs7a0JBQ1osbUJBQW1CLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxDQUFDO1lBQ3hELHFCQUFxQixDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQyxFQUFDO0FBQ0osQ0FBQzs7Ozs7O0FBRUQsU0FBUyxpQkFBaUIsQ0FDeEIsTUFBWSxFQUNaLE9BQWlCLEVBQUU7SUFFbkIsMEVBQTBFO0lBQzFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDaEUsT0FBTztZQUNMLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNkLEtBQUssRUFBRSxNQUFNO1NBQ2QsQ0FBQztLQUNIOztVQUVLLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNoQyxPQUFPLElBQUksQ0FBQyxNQUFNOzs7OztJQUF5QyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUN6RSxJQUFJLE1BQU0sRUFBRTtZQUNWLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7O2NBRUssS0FBSyxHQUFHLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFFbEMsd0JBQXdCO1FBQ3hCLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFFRCxJQUNFLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNiLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDZixTQUFTLENBQUMsS0FBSyxDQUFDO1lBQ2hCLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEVBQ2Q7WUFDQSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsT0FBTztZQUNMLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQztZQUNwQixLQUFLO1NBQ04sQ0FBQztJQUNKLENBQUMsR0FBRSxLQUFLLENBQUMsQ0FBQztBQUNaLENBQUM7Ozs7OztBQUVELFNBQVMscUJBQXFCLENBQzVCLGNBQXNELEVBQ3RELE9BQTJCO0lBRTNCLElBQUksY0FBYyxLQUFLLEtBQUssRUFBRTtRQUM1QixPQUFPO0tBQ1I7O1VBRUssa0JBQWtCLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOztVQUNsRCxLQUFLLEdBQVEsSUFBSSxLQUFLLENBQzFCLDJCQUEyQixPQUFPLFFBQVEsa0JBQWtCLE1BQU0saUJBQWlCLFVBQVUsT0FBTyxpQkFBaUIsQ0FDdEg7SUFDRCxLQUFLLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7SUFDbkMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0lBQzlDLE1BQU0sS0FBSyxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvblJlZHVjZXIsIEFjdGlvbiB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQge1xuICBpc1BsYWluT2JqZWN0LFxuICBpc1VuZGVmaW5lZCxcbiAgaXNOdWxsLFxuICBpc051bWJlcixcbiAgaXNCb29sZWFuLFxuICBpc1N0cmluZyxcbiAgaXNBcnJheSxcbiAgUlVOVElNRV9DSEVDS19VUkwsXG4gIGlzQ29tcG9uZW50LFxufSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyKFxuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PixcbiAgY2hlY2tzOiB7IGFjdGlvbjogKGFjdGlvbjogQWN0aW9uKSA9PiBib29sZWFuOyBzdGF0ZTogKCkgPT4gYm9vbGVhbiB9XG4pOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PiB7XG4gIHJldHVybiBmdW5jdGlvbihzdGF0ZSwgYWN0aW9uKSB7XG4gICAgaWYgKGNoZWNrcy5hY3Rpb24oYWN0aW9uKSkge1xuICAgICAgY29uc3QgdW5zZXJpYWxpemFibGVBY3Rpb24gPSBnZXRVbnNlcmlhbGl6YWJsZShhY3Rpb24pO1xuICAgICAgdGhyb3dJZlVuc2VyaWFsaXphYmxlKHVuc2VyaWFsaXphYmxlQWN0aW9uLCAnYWN0aW9uJyk7XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFN0YXRlID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgIGlmIChjaGVja3Muc3RhdGUoKSkge1xuICAgICAgY29uc3QgdW5zZXJpYWxpemFibGVTdGF0ZSA9IGdldFVuc2VyaWFsaXphYmxlKG5leHRTdGF0ZSk7XG4gICAgICB0aHJvd0lmVW5zZXJpYWxpemFibGUodW5zZXJpYWxpemFibGVTdGF0ZSwgJ3N0YXRlJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHRTdGF0ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0VW5zZXJpYWxpemFibGUoXG4gIHRhcmdldD86IGFueSxcbiAgcGF0aDogc3RyaW5nW10gPSBbXVxuKTogZmFsc2UgfCB7IHBhdGg6IHN0cmluZ1tdOyB2YWx1ZTogYW55IH0ge1xuICAvLyBHdWFyZCBhZ2FpbnN0IHVuZGVmaW5lZCBhbmQgbnVsbCwgZS5nLiBhIHJlZHVjZXIgdGhhdCByZXR1cm5zIHVuZGVmaW5lZFxuICBpZiAoKGlzVW5kZWZpbmVkKHRhcmdldCkgfHwgaXNOdWxsKHRhcmdldCkpICYmIHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IFsncm9vdCddLFxuICAgICAgdmFsdWU6IHRhcmdldCxcbiAgICB9O1xuICB9XG5cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRhcmdldCk7XG4gIHJldHVybiBrZXlzLnJlZHVjZTxmYWxzZSB8IHsgcGF0aDogc3RyaW5nW107IHZhbHVlOiBhbnkgfT4oKHJlc3VsdCwga2V5KSA9PiB7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9ICh0YXJnZXQgYXMgYW55KVtrZXldO1xuXG4gICAgLy8gSWdub3JlIEl2eSBjb21wb25lbnRzXG4gICAgaWYgKGlzQ29tcG9uZW50KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBpc1VuZGVmaW5lZCh2YWx1ZSkgfHxcbiAgICAgIGlzTnVsbCh2YWx1ZSkgfHxcbiAgICAgIGlzTnVtYmVyKHZhbHVlKSB8fFxuICAgICAgaXNCb29sZWFuKHZhbHVlKSB8fFxuICAgICAgaXNTdHJpbmcodmFsdWUpIHx8XG4gICAgICBpc0FycmF5KHZhbHVlKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGdldFVuc2VyaWFsaXphYmxlKHZhbHVlLCBbLi4ucGF0aCwga2V5XSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IFsuLi5wYXRoLCBrZXldLFxuICAgICAgdmFsdWUsXG4gICAgfTtcbiAgfSwgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiB0aHJvd0lmVW5zZXJpYWxpemFibGUoXG4gIHVuc2VyaWFsaXphYmxlOiBmYWxzZSB8IHsgcGF0aDogc3RyaW5nW107IHZhbHVlOiBhbnkgfSxcbiAgY29udGV4dDogJ3N0YXRlJyB8ICdhY3Rpb24nXG4pIHtcbiAgaWYgKHVuc2VyaWFsaXphYmxlID09PSBmYWxzZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHVuc2VyaWFsaXphYmxlUGF0aCA9IHVuc2VyaWFsaXphYmxlLnBhdGguam9pbignLicpO1xuICBjb25zdCBlcnJvcjogYW55ID0gbmV3IEVycm9yKFxuICAgIGBEZXRlY3RlZCB1bnNlcmlhbGl6YWJsZSAke2NvbnRleHR9IGF0IFwiJHt1bnNlcmlhbGl6YWJsZVBhdGh9XCIuICR7UlVOVElNRV9DSEVDS19VUkx9I3N0cmljdCR7Y29udGV4dH1zZXJpYWxpemFiaWxpdHlgXG4gICk7XG4gIGVycm9yLnZhbHVlID0gdW5zZXJpYWxpemFibGUudmFsdWU7XG4gIGVycm9yLnVuc2VyaWFsaXphYmxlUGF0aCA9IHVuc2VyaWFsaXphYmxlUGF0aDtcbiAgdGhyb3cgZXJyb3I7XG59XG4iXX0=