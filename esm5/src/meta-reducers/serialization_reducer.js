var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
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
            var unserializableAction = getUnserializable(action);
            throwIfUnserializable(unserializableAction, 'action');
        }
        /** @type {?} */
        var nextState = reducer(state, action);
        if (checks.state()) {
            /** @type {?} */
            var unserializableState = getUnserializable(nextState);
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
function getUnserializable(target, path) {
    if (path === void 0) { path = []; }
    // Guard against undefined and null, e.g. a reducer that returns undefined
    if ((isUndefined(target) || isNull(target)) && path.length === 0) {
        return {
            path: ['root'],
            value: target,
        };
    }
    /** @type {?} */
    var keys = Object.keys(target);
    return keys.reduce((/**
     * @param {?} result
     * @param {?} key
     * @return {?}
     */
    function (result, key) {
        if (result) {
            return result;
        }
        /** @type {?} */
        var value = ((/** @type {?} */ (target)))[key];
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
            return getUnserializable(value, __spread(path, [key]));
        }
        return {
            path: __spread(path, [key]),
            value: value,
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
    var unserializablePath = unserializable.path.join('.');
    /** @type {?} */
    var error = new Error("Detected unserializable " + context + " at \"" + unserializablePath + "\". " + RUNTIME_CHECK_URL + "#strict" + context + "serializability");
    error.value = unserializable.value;
    error.unserializablePath = unserializablePath;
    throw error;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXphdGlvbl9yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ncngvc3RvcmUvIiwic291cmNlcyI6WyJzcmMvbWV0YS1yZWR1Y2Vycy9zZXJpYWxpemF0aW9uX3JlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFDTCxhQUFhLEVBQ2IsV0FBVyxFQUNYLE1BQU0sRUFDTixRQUFRLEVBQ1IsU0FBUyxFQUNULFFBQVEsRUFDUixPQUFPLEVBQ1AsaUJBQWlCLEVBQ2pCLFdBQVcsR0FDWixNQUFNLFNBQVMsQ0FBQzs7Ozs7O0FBRWpCLE1BQU0sVUFBVSw2QkFBNkIsQ0FDM0MsT0FBZ0MsRUFDaEMsTUFBcUU7SUFFckU7Ozs7O0lBQU8sVUFBVSxLQUFLLEVBQUUsTUFBTTtRQUM1QixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7O2dCQUNuQixvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7WUFDdEQscUJBQXFCLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDdkQ7O1lBRUssU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO1FBRXhDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFOztnQkFDWixtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7WUFDeEQscUJBQXFCLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDckQ7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDLEVBQUM7QUFDSixDQUFDOzs7Ozs7QUFFRCxTQUFTLGlCQUFpQixDQUN4QixNQUFZLEVBQ1osSUFBbUI7SUFBbkIscUJBQUEsRUFBQSxTQUFtQjtJQUVuQiwwRUFBMEU7SUFDMUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNoRSxPQUFPO1lBQ0wsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ2QsS0FBSyxFQUFFLE1BQU07U0FDZCxDQUFDO0tBQ0g7O1FBRUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ2hDLE9BQU8sSUFBSSxDQUFDLE1BQU07Ozs7O0lBQXlDLFVBQUMsTUFBTSxFQUFFLEdBQUc7UUFDckUsSUFBSSxNQUFNLEVBQUU7WUFDVixPQUFPLE1BQU0sQ0FBQztTQUNmOztZQUVLLEtBQUssR0FBRyxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRWxDLHdCQUF3QjtRQUN4QixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixPQUFPLE1BQU0sQ0FBQztTQUNmO1FBRUQsSUFDRSxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDYixRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ2YsU0FBUyxDQUFDLEtBQUssQ0FBQztZQUNoQixRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUNkO1lBQ0EsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLE9BQU8saUJBQWlCLENBQUMsS0FBSyxXQUFNLElBQUksR0FBRSxHQUFHLEdBQUUsQ0FBQztTQUNqRDtRQUVELE9BQU87WUFDTCxJQUFJLFdBQU0sSUFBSSxHQUFFLEdBQUcsRUFBQztZQUNwQixLQUFLLE9BQUE7U0FDTixDQUFDO0lBQ0osQ0FBQyxHQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ1osQ0FBQzs7Ozs7O0FBRUQsU0FBUyxxQkFBcUIsQ0FDNUIsY0FBc0QsRUFDdEQsT0FBMkI7SUFFM0IsSUFBSSxjQUFjLEtBQUssS0FBSyxFQUFFO1FBQzVCLE9BQU87S0FDUjs7UUFFSyxrQkFBa0IsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7O1FBQ2xELEtBQUssR0FBUSxJQUFJLEtBQUssQ0FDMUIsNkJBQTJCLE9BQU8sY0FBUSxrQkFBa0IsWUFBTSxpQkFBaUIsZUFBVSxPQUFPLG9CQUFpQixDQUN0SDtJQUNELEtBQUssQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztJQUNuQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7SUFDOUMsTUFBTSxLQUFLLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uUmVkdWNlciwgQWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7XG4gIGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkLFxuICBpc051bGwsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzU3RyaW5nLFxuICBpc0FycmF5LFxuICBSVU5USU1FX0NIRUNLX1VSTCxcbiAgaXNDb21wb25lbnQsXG59IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIoXG4gIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+LFxuICBjaGVja3M6IHsgYWN0aW9uOiAoYWN0aW9uOiBBY3Rpb24pID0+IGJvb2xlYW47IHN0YXRlOiAoKSA9PiBib29sZWFuIH1cbik6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uKSB7XG4gICAgaWYgKGNoZWNrcy5hY3Rpb24oYWN0aW9uKSkge1xuICAgICAgY29uc3QgdW5zZXJpYWxpemFibGVBY3Rpb24gPSBnZXRVbnNlcmlhbGl6YWJsZShhY3Rpb24pO1xuICAgICAgdGhyb3dJZlVuc2VyaWFsaXphYmxlKHVuc2VyaWFsaXphYmxlQWN0aW9uLCAnYWN0aW9uJyk7XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFN0YXRlID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgIGlmIChjaGVja3Muc3RhdGUoKSkge1xuICAgICAgY29uc3QgdW5zZXJpYWxpemFibGVTdGF0ZSA9IGdldFVuc2VyaWFsaXphYmxlKG5leHRTdGF0ZSk7XG4gICAgICB0aHJvd0lmVW5zZXJpYWxpemFibGUodW5zZXJpYWxpemFibGVTdGF0ZSwgJ3N0YXRlJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHRTdGF0ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0VW5zZXJpYWxpemFibGUoXG4gIHRhcmdldD86IGFueSxcbiAgcGF0aDogc3RyaW5nW10gPSBbXVxuKTogZmFsc2UgfCB7IHBhdGg6IHN0cmluZ1tdOyB2YWx1ZTogYW55IH0ge1xuICAvLyBHdWFyZCBhZ2FpbnN0IHVuZGVmaW5lZCBhbmQgbnVsbCwgZS5nLiBhIHJlZHVjZXIgdGhhdCByZXR1cm5zIHVuZGVmaW5lZFxuICBpZiAoKGlzVW5kZWZpbmVkKHRhcmdldCkgfHwgaXNOdWxsKHRhcmdldCkpICYmIHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IFsncm9vdCddLFxuICAgICAgdmFsdWU6IHRhcmdldCxcbiAgICB9O1xuICB9XG5cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRhcmdldCk7XG4gIHJldHVybiBrZXlzLnJlZHVjZTxmYWxzZSB8IHsgcGF0aDogc3RyaW5nW107IHZhbHVlOiBhbnkgfT4oKHJlc3VsdCwga2V5KSA9PiB7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9ICh0YXJnZXQgYXMgYW55KVtrZXldO1xuXG4gICAgLy8gSWdub3JlIEl2eSBjb21wb25lbnRzXG4gICAgaWYgKGlzQ29tcG9uZW50KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBpc1VuZGVmaW5lZCh2YWx1ZSkgfHxcbiAgICAgIGlzTnVsbCh2YWx1ZSkgfHxcbiAgICAgIGlzTnVtYmVyKHZhbHVlKSB8fFxuICAgICAgaXNCb29sZWFuKHZhbHVlKSB8fFxuICAgICAgaXNTdHJpbmcodmFsdWUpIHx8XG4gICAgICBpc0FycmF5KHZhbHVlKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGdldFVuc2VyaWFsaXphYmxlKHZhbHVlLCBbLi4ucGF0aCwga2V5XSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IFsuLi5wYXRoLCBrZXldLFxuICAgICAgdmFsdWUsXG4gICAgfTtcbiAgfSwgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiB0aHJvd0lmVW5zZXJpYWxpemFibGUoXG4gIHVuc2VyaWFsaXphYmxlOiBmYWxzZSB8IHsgcGF0aDogc3RyaW5nW107IHZhbHVlOiBhbnkgfSxcbiAgY29udGV4dDogJ3N0YXRlJyB8ICdhY3Rpb24nXG4pIHtcbiAgaWYgKHVuc2VyaWFsaXphYmxlID09PSBmYWxzZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHVuc2VyaWFsaXphYmxlUGF0aCA9IHVuc2VyaWFsaXphYmxlLnBhdGguam9pbignLicpO1xuICBjb25zdCBlcnJvcjogYW55ID0gbmV3IEVycm9yKFxuICAgIGBEZXRlY3RlZCB1bnNlcmlhbGl6YWJsZSAke2NvbnRleHR9IGF0IFwiJHt1bnNlcmlhbGl6YWJsZVBhdGh9XCIuICR7UlVOVElNRV9DSEVDS19VUkx9I3N0cmljdCR7Y29udGV4dH1zZXJpYWxpemFiaWxpdHlgXG4gICk7XG4gIGVycm9yLnZhbHVlID0gdW5zZXJpYWxpemFibGUudmFsdWU7XG4gIGVycm9yLnVuc2VyaWFsaXphYmxlUGF0aCA9IHVuc2VyaWFsaXphYmxlUGF0aDtcbiAgdGhyb3cgZXJyb3I7XG59XG4iXX0=