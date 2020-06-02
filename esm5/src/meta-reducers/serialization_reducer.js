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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXphdGlvbl9yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ncngvc3RvcmUvIiwic291cmNlcyI6WyJzcmMvbWV0YS1yZWR1Y2Vycy9zZXJpYWxpemF0aW9uX3JlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFDTCxhQUFhLEVBQ2IsV0FBVyxFQUNYLE1BQU0sRUFDTixRQUFRLEVBQ1IsU0FBUyxFQUNULFFBQVEsRUFDUixPQUFPLEVBQ1AsaUJBQWlCLEVBQ2pCLFdBQVcsR0FDWixNQUFNLFNBQVMsQ0FBQzs7Ozs7O0FBRWpCLE1BQU0sVUFBVSw2QkFBNkIsQ0FDM0MsT0FBZ0MsRUFDaEMsTUFBcUU7SUFFckU7Ozs7O0lBQU8sVUFBUyxLQUFLLEVBQUUsTUFBTTtRQUMzQixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7O2dCQUNuQixvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7WUFDdEQscUJBQXFCLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDdkQ7O1lBRUssU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO1FBRXhDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFOztnQkFDWixtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7WUFDeEQscUJBQXFCLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDckQ7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDLEVBQUM7QUFDSixDQUFDOzs7Ozs7QUFFRCxTQUFTLGlCQUFpQixDQUN4QixNQUFZLEVBQ1osSUFBbUI7SUFBbkIscUJBQUEsRUFBQSxTQUFtQjtJQUVuQiwwRUFBMEU7SUFDMUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNoRSxPQUFPO1lBQ0wsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ2QsS0FBSyxFQUFFLE1BQU07U0FDZCxDQUFDO0tBQ0g7O1FBRUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ2hDLE9BQU8sSUFBSSxDQUFDLE1BQU07Ozs7O0lBQXlDLFVBQUMsTUFBTSxFQUFFLEdBQUc7UUFDckUsSUFBSSxNQUFNLEVBQUU7WUFDVixPQUFPLE1BQU0sQ0FBQztTQUNmOztZQUVLLEtBQUssR0FBRyxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRWxDLHdCQUF3QjtRQUN4QixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QixPQUFPLE1BQU0sQ0FBQztTQUNmO1FBRUQsSUFDRSxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDYixRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ2YsU0FBUyxDQUFDLEtBQUssQ0FBQztZQUNoQixRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUNkO1lBQ0EsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLE9BQU8saUJBQWlCLENBQUMsS0FBSyxXQUFNLElBQUksR0FBRSxHQUFHLEdBQUUsQ0FBQztTQUNqRDtRQUVELE9BQU87WUFDTCxJQUFJLFdBQU0sSUFBSSxHQUFFLEdBQUcsRUFBQztZQUNwQixLQUFLLE9BQUE7U0FDTixDQUFDO0lBQ0osQ0FBQyxHQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ1osQ0FBQzs7Ozs7O0FBRUQsU0FBUyxxQkFBcUIsQ0FDNUIsY0FBc0QsRUFDdEQsT0FBMkI7SUFFM0IsSUFBSSxjQUFjLEtBQUssS0FBSyxFQUFFO1FBQzVCLE9BQU87S0FDUjs7UUFFSyxrQkFBa0IsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7O1FBQ2xELEtBQUssR0FBUSxJQUFJLEtBQUssQ0FDMUIsNkJBQTJCLE9BQU8sY0FBUSxrQkFBa0IsWUFBTSxpQkFBaUIsZUFBVSxPQUFPLG9CQUFpQixDQUN0SDtJQUNELEtBQUssQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztJQUNuQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7SUFDOUMsTUFBTSxLQUFLLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uUmVkdWNlciwgQWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7XG4gIGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkLFxuICBpc051bGwsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzU3RyaW5nLFxuICBpc0FycmF5LFxuICBSVU5USU1FX0NIRUNLX1VSTCxcbiAgaXNDb21wb25lbnQsXG59IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIoXG4gIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+LFxuICBjaGVja3M6IHsgYWN0aW9uOiAoYWN0aW9uOiBBY3Rpb24pID0+IGJvb2xlYW47IHN0YXRlOiAoKSA9PiBib29sZWFuIH1cbik6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBpZiAoY2hlY2tzLmFjdGlvbihhY3Rpb24pKSB7XG4gICAgICBjb25zdCB1bnNlcmlhbGl6YWJsZUFjdGlvbiA9IGdldFVuc2VyaWFsaXphYmxlKGFjdGlvbik7XG4gICAgICB0aHJvd0lmVW5zZXJpYWxpemFibGUodW5zZXJpYWxpemFibGVBY3Rpb24sICdhY3Rpb24nKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0U3RhdGUgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgaWYgKGNoZWNrcy5zdGF0ZSgpKSB7XG4gICAgICBjb25zdCB1bnNlcmlhbGl6YWJsZVN0YXRlID0gZ2V0VW5zZXJpYWxpemFibGUobmV4dFN0YXRlKTtcbiAgICAgIHRocm93SWZVbnNlcmlhbGl6YWJsZSh1bnNlcmlhbGl6YWJsZVN0YXRlLCAnc3RhdGUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dFN0YXRlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRVbnNlcmlhbGl6YWJsZShcbiAgdGFyZ2V0PzogYW55LFxuICBwYXRoOiBzdHJpbmdbXSA9IFtdXG4pOiBmYWxzZSB8IHsgcGF0aDogc3RyaW5nW107IHZhbHVlOiBhbnkgfSB7XG4gIC8vIEd1YXJkIGFnYWluc3QgdW5kZWZpbmVkIGFuZCBudWxsLCBlLmcuIGEgcmVkdWNlciB0aGF0IHJldHVybnMgdW5kZWZpbmVkXG4gIGlmICgoaXNVbmRlZmluZWQodGFyZ2V0KSB8fCBpc051bGwodGFyZ2V0KSkgJiYgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGF0aDogWydyb290J10sXG4gICAgICB2YWx1ZTogdGFyZ2V0LFxuICAgIH07XG4gIH1cblxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGFyZ2V0KTtcbiAgcmV0dXJuIGtleXMucmVkdWNlPGZhbHNlIHwgeyBwYXRoOiBzdHJpbmdbXTsgdmFsdWU6IGFueSB9PigocmVzdWx0LCBrZXkpID0+IHtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlID0gKHRhcmdldCBhcyBhbnkpW2tleV07XG5cbiAgICAvLyBJZ25vcmUgSXZ5IGNvbXBvbmVudHNcbiAgICBpZiAoaXNDb21wb25lbnQodmFsdWUpKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGlzVW5kZWZpbmVkKHZhbHVlKSB8fFxuICAgICAgaXNOdWxsKHZhbHVlKSB8fFxuICAgICAgaXNOdW1iZXIodmFsdWUpIHx8XG4gICAgICBpc0Jvb2xlYW4odmFsdWUpIHx8XG4gICAgICBpc1N0cmluZyh2YWx1ZSkgfHxcbiAgICAgIGlzQXJyYXkodmFsdWUpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZ2V0VW5zZXJpYWxpemFibGUodmFsdWUsIFsuLi5wYXRoLCBrZXldKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGF0aDogWy4uLnBhdGgsIGtleV0sXG4gICAgICB2YWx1ZSxcbiAgICB9O1xuICB9LCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIHRocm93SWZVbnNlcmlhbGl6YWJsZShcbiAgdW5zZXJpYWxpemFibGU6IGZhbHNlIHwgeyBwYXRoOiBzdHJpbmdbXTsgdmFsdWU6IGFueSB9LFxuICBjb250ZXh0OiAnc3RhdGUnIHwgJ2FjdGlvbidcbikge1xuICBpZiAodW5zZXJpYWxpemFibGUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdW5zZXJpYWxpemFibGVQYXRoID0gdW5zZXJpYWxpemFibGUucGF0aC5qb2luKCcuJyk7XG4gIGNvbnN0IGVycm9yOiBhbnkgPSBuZXcgRXJyb3IoXG4gICAgYERldGVjdGVkIHVuc2VyaWFsaXphYmxlICR7Y29udGV4dH0gYXQgXCIke3Vuc2VyaWFsaXphYmxlUGF0aH1cIi4gJHtSVU5USU1FX0NIRUNLX1VSTH0jc3RyaWN0JHtjb250ZXh0fXNlcmlhbGl6YWJpbGl0eWBcbiAgKTtcbiAgZXJyb3IudmFsdWUgPSB1bnNlcmlhbGl6YWJsZS52YWx1ZTtcbiAgZXJyb3IudW5zZXJpYWxpemFibGVQYXRoID0gdW5zZXJpYWxpemFibGVQYXRoO1xuICB0aHJvdyBlcnJvcjtcbn1cbiJdfQ==