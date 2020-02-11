/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/src/meta-reducers/serialization_reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isPlainObject, isUndefined, isNull, isNumber, isBoolean, isString, isArray, RUNTIME_CHECK_URL, } from './utils';
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
    const error = new Error(`Detected unserializable ${context} at "${unserializablePath}". ${RUNTIME_CHECK_URL}#strict${context}serializability`);
    error.value = unserializable.value;
    error.unserializablePath = unserializablePath;
    throw error;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXphdGlvbl9yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvbWV0YS1yZWR1Y2Vycy9zZXJpYWxpemF0aW9uX3JlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFdBQVcsRUFDWCxNQUFNLEVBQ04sUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLEVBQ1IsT0FBTyxFQUNQLGlCQUFpQixHQUNsQixNQUFNLFNBQVMsQ0FBQzs7Ozs7O0FBRWpCLE1BQU0sVUFBVSw2QkFBNkIsQ0FDM0MsT0FBZ0MsRUFDaEMsTUFBcUU7SUFFckU7Ozs7O0lBQU8sVUFBUyxLQUFLLEVBQUUsTUFBTTtRQUMzQixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7O2tCQUNuQixvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7WUFDdEQscUJBQXFCLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDdkQ7O2NBRUssU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO1FBRXhDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFOztrQkFDWixtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7WUFDeEQscUJBQXFCLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDckQ7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDLEVBQUM7QUFDSixDQUFDOzs7Ozs7QUFFRCxTQUFTLGlCQUFpQixDQUN4QixNQUFZLEVBQ1osT0FBaUIsRUFBRTtJQUVuQiwwRUFBMEU7SUFDMUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNoRSxPQUFPO1lBQ0wsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ2QsS0FBSyxFQUFFLE1BQU07U0FDZCxDQUFDO0tBQ0g7O1VBRUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ2hDLE9BQU8sSUFBSSxDQUFDLE1BQU07Ozs7O0lBQXlDLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3pFLElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxNQUFNLENBQUM7U0FDZjs7Y0FFSyxLQUFLLEdBQUcsQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUVsQyxJQUNFLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNiLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDZixTQUFTLENBQUMsS0FBSyxDQUFDO1lBQ2hCLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEVBQ2Q7WUFDQSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsT0FBTztZQUNMLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsQ0FBQztZQUNwQixLQUFLO1NBQ04sQ0FBQztJQUNKLENBQUMsR0FBRSxLQUFLLENBQUMsQ0FBQztBQUNaLENBQUM7Ozs7OztBQUVELFNBQVMscUJBQXFCLENBQzVCLGNBQXNELEVBQ3RELE9BQTJCO0lBRTNCLElBQUksY0FBYyxLQUFLLEtBQUssRUFBRTtRQUM1QixPQUFPO0tBQ1I7O1VBRUssa0JBQWtCLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOztVQUNsRCxLQUFLLEdBQVEsSUFBSSxLQUFLLENBQzFCLDJCQUEyQixPQUFPLFFBQVEsa0JBQWtCLE1BQU0saUJBQWlCLFVBQVUsT0FBTyxpQkFBaUIsQ0FDdEg7SUFDRCxLQUFLLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7SUFDbkMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0lBQzlDLE1BQU0sS0FBSyxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvblJlZHVjZXIsIEFjdGlvbiB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQge1xuICBpc1BsYWluT2JqZWN0LFxuICBpc1VuZGVmaW5lZCxcbiAgaXNOdWxsLFxuICBpc051bWJlcixcbiAgaXNCb29sZWFuLFxuICBpc1N0cmluZyxcbiAgaXNBcnJheSxcbiAgUlVOVElNRV9DSEVDS19VUkwsXG59IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIoXG4gIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+LFxuICBjaGVja3M6IHsgYWN0aW9uOiAoYWN0aW9uOiBBY3Rpb24pID0+IGJvb2xlYW47IHN0YXRlOiAoKSA9PiBib29sZWFuIH1cbik6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBpZiAoY2hlY2tzLmFjdGlvbihhY3Rpb24pKSB7XG4gICAgICBjb25zdCB1bnNlcmlhbGl6YWJsZUFjdGlvbiA9IGdldFVuc2VyaWFsaXphYmxlKGFjdGlvbik7XG4gICAgICB0aHJvd0lmVW5zZXJpYWxpemFibGUodW5zZXJpYWxpemFibGVBY3Rpb24sICdhY3Rpb24nKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0U3RhdGUgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgaWYgKGNoZWNrcy5zdGF0ZSgpKSB7XG4gICAgICBjb25zdCB1bnNlcmlhbGl6YWJsZVN0YXRlID0gZ2V0VW5zZXJpYWxpemFibGUobmV4dFN0YXRlKTtcbiAgICAgIHRocm93SWZVbnNlcmlhbGl6YWJsZSh1bnNlcmlhbGl6YWJsZVN0YXRlLCAnc3RhdGUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dFN0YXRlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRVbnNlcmlhbGl6YWJsZShcbiAgdGFyZ2V0PzogYW55LFxuICBwYXRoOiBzdHJpbmdbXSA9IFtdXG4pOiBmYWxzZSB8IHsgcGF0aDogc3RyaW5nW107IHZhbHVlOiBhbnkgfSB7XG4gIC8vIEd1YXJkIGFnYWluc3QgdW5kZWZpbmVkIGFuZCBudWxsLCBlLmcuIGEgcmVkdWNlciB0aGF0IHJldHVybnMgdW5kZWZpbmVkXG4gIGlmICgoaXNVbmRlZmluZWQodGFyZ2V0KSB8fCBpc051bGwodGFyZ2V0KSkgJiYgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGF0aDogWydyb290J10sXG4gICAgICB2YWx1ZTogdGFyZ2V0LFxuICAgIH07XG4gIH1cblxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGFyZ2V0KTtcbiAgcmV0dXJuIGtleXMucmVkdWNlPGZhbHNlIHwgeyBwYXRoOiBzdHJpbmdbXTsgdmFsdWU6IGFueSB9PigocmVzdWx0LCBrZXkpID0+IHtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlID0gKHRhcmdldCBhcyBhbnkpW2tleV07XG5cbiAgICBpZiAoXG4gICAgICBpc1VuZGVmaW5lZCh2YWx1ZSkgfHxcbiAgICAgIGlzTnVsbCh2YWx1ZSkgfHxcbiAgICAgIGlzTnVtYmVyKHZhbHVlKSB8fFxuICAgICAgaXNCb29sZWFuKHZhbHVlKSB8fFxuICAgICAgaXNTdHJpbmcodmFsdWUpIHx8XG4gICAgICBpc0FycmF5KHZhbHVlKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGdldFVuc2VyaWFsaXphYmxlKHZhbHVlLCBbLi4ucGF0aCwga2V5XSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IFsuLi5wYXRoLCBrZXldLFxuICAgICAgdmFsdWUsXG4gICAgfTtcbiAgfSwgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiB0aHJvd0lmVW5zZXJpYWxpemFibGUoXG4gIHVuc2VyaWFsaXphYmxlOiBmYWxzZSB8IHsgcGF0aDogc3RyaW5nW107IHZhbHVlOiBhbnkgfSxcbiAgY29udGV4dDogJ3N0YXRlJyB8ICdhY3Rpb24nXG4pIHtcbiAgaWYgKHVuc2VyaWFsaXphYmxlID09PSBmYWxzZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHVuc2VyaWFsaXphYmxlUGF0aCA9IHVuc2VyaWFsaXphYmxlLnBhdGguam9pbignLicpO1xuICBjb25zdCBlcnJvcjogYW55ID0gbmV3IEVycm9yKFxuICAgIGBEZXRlY3RlZCB1bnNlcmlhbGl6YWJsZSAke2NvbnRleHR9IGF0IFwiJHt1bnNlcmlhbGl6YWJsZVBhdGh9XCIuICR7UlVOVElNRV9DSEVDS19VUkx9I3N0cmljdCR7Y29udGV4dH1zZXJpYWxpemFiaWxpdHlgXG4gICk7XG4gIGVycm9yLnZhbHVlID0gdW5zZXJpYWxpemFibGUudmFsdWU7XG4gIGVycm9yLnVuc2VyaWFsaXphYmxlUGF0aCA9IHVuc2VyaWFsaXphYmxlUGF0aDtcbiAgdGhyb3cgZXJyb3I7XG59XG4iXX0=