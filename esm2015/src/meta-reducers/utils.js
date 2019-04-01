/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} target
 * @param {?=} path
 * @return {?}
 */
export function getUnserializable(target, path = []) {
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
export function throwIfUnserializable(unserializable, context) {
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
/**
 * Object Utilities
 * @param {?} target
 * @return {?}
 */
export function isUndefined(target) {
    return target === undefined;
}
/**
 * @param {?} target
 * @return {?}
 */
export function isNull(target) {
    return target === null;
}
/**
 * @param {?} target
 * @return {?}
 */
export function isArray(target) {
    return Array.isArray(target);
}
/**
 * @param {?} target
 * @return {?}
 */
export function isString(target) {
    return typeof target === 'string';
}
/**
 * @param {?} target
 * @return {?}
 */
export function isBoolean(target) {
    return typeof target === 'boolean';
}
/**
 * @param {?} target
 * @return {?}
 */
export function isNumber(target) {
    return typeof target === 'number';
}
/**
 * @param {?} target
 * @return {?}
 */
export function isObjectLike(target) {
    return typeof target === 'object' && target !== null;
}
/**
 * @param {?} target
 * @return {?}
 */
export function isObject(target) {
    return isObjectLike(target) && !isArray(target);
}
/**
 * @param {?} target
 * @return {?}
 */
export function isPlainObject(target) {
    if (!isObject(target)) {
        return false;
    }
    /** @type {?} */
    const targetPrototype = Object.getPrototypeOf(target);
    return targetPrototype === Object.prototype || targetPrototype === null;
}
/**
 * @param {?} target
 * @return {?}
 */
export function isFunction(target) {
    return typeof target === 'function';
}
/**
 * @param {?} target
 * @param {?} propertyName
 * @return {?}
 */
export function hasOwnProperty(target, propertyName) {
    return Object.prototype.hasOwnProperty.call(target, propertyName);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9tZXRhLXJlZHVjZXJzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE1BQU0sVUFBVSxpQkFBaUIsQ0FDL0IsTUFBWSxFQUNaLE9BQWlCLEVBQUU7SUFFbkIsMEVBQTBFO0lBQzFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDaEUsT0FBTztZQUNMLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNkLEtBQUssRUFBRSxNQUFNO1NBQ2QsQ0FBQztLQUNIOztVQUVLLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNoQyxPQUFPLElBQUksQ0FBQyxNQUFNOzs7OztJQUF5QyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUN6RSxJQUFJLE1BQU0sRUFBRTtZQUNWLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7O2NBRUssS0FBSyxHQUFHLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFFbEMsSUFDRSxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDYixRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ2YsU0FBUyxDQUFDLEtBQUssQ0FBQztZQUNoQixRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUNkO1lBQ0EsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLE9BQU8saUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNqRDtRQUVELE9BQU87WUFDTCxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLENBQUM7WUFDcEIsS0FBSztTQUNOLENBQUM7SUFDSixDQUFDLEdBQUUsS0FBSyxDQUFDLENBQUM7QUFDWixDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUscUJBQXFCLENBQ25DLGNBQXNELEVBQ3RELE9BQTJCO0lBRTNCLElBQUksY0FBYyxLQUFLLEtBQUssRUFBRTtRQUM1QixPQUFPO0tBQ1I7O1VBRUssa0JBQWtCLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOztVQUNsRCxLQUFLLEdBQVEsSUFBSSxLQUFLLENBQzFCLDJCQUEyQixPQUFPLFFBQVEsa0JBQWtCLEdBQUcsQ0FDaEU7SUFDRCxLQUFLLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7SUFDbkMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0lBQzlDLE1BQU0sS0FBSyxDQUFDO0FBQ2QsQ0FBQzs7Ozs7O0FBTUQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxNQUFXO0lBQ3JDLE9BQU8sTUFBTSxLQUFLLFNBQVMsQ0FBQztBQUM5QixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxNQUFNLENBQUMsTUFBVztJQUNoQyxPQUFPLE1BQU0sS0FBSyxJQUFJLENBQUM7QUFDekIsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsT0FBTyxDQUFDLE1BQVc7SUFDakMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxNQUFXO0lBQ2xDLE9BQU8sT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDO0FBQ3BDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxNQUFXO0lBQ25DLE9BQU8sT0FBTyxNQUFNLEtBQUssU0FBUyxDQUFDO0FBQ3JDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxNQUFXO0lBQ2xDLE9BQU8sT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDO0FBQ3BDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFlBQVksQ0FBQyxNQUFXO0lBQ3RDLE9BQU8sT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUM7QUFDdkQsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLE1BQVc7SUFDbEMsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbEQsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUFDLE1BQVc7SUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNyQixPQUFPLEtBQUssQ0FBQztLQUNkOztVQUVLLGVBQWUsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztJQUNyRCxPQUFPLGVBQWUsS0FBSyxNQUFNLENBQUMsU0FBUyxJQUFJLGVBQWUsS0FBSyxJQUFJLENBQUM7QUFDMUUsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsVUFBVSxDQUFDLE1BQVc7SUFDcEMsT0FBTyxPQUFPLE1BQU0sS0FBSyxVQUFVLENBQUM7QUFDdEMsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxNQUFjLEVBQUUsWUFBb0I7SUFDakUsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ3BFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0VW5zZXJpYWxpemFibGUoXG4gIHRhcmdldD86IGFueSxcbiAgcGF0aDogc3RyaW5nW10gPSBbXVxuKTogZmFsc2UgfCB7IHBhdGg6IHN0cmluZ1tdOyB2YWx1ZTogYW55IH0ge1xuICAvLyBHdWFyZCBhZ2FpbnN0IHVuZGVmaW5lZCBhbmQgbnVsbCwgZS5nLiBhIHJlZHVjZXIgdGhhdCByZXR1cm5zIHVuZGVmaW5lZFxuICBpZiAoKGlzVW5kZWZpbmVkKHRhcmdldCkgfHwgaXNOdWxsKHRhcmdldCkpICYmIHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IFsncm9vdCddLFxuICAgICAgdmFsdWU6IHRhcmdldCxcbiAgICB9O1xuICB9XG5cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRhcmdldCk7XG4gIHJldHVybiBrZXlzLnJlZHVjZTxmYWxzZSB8IHsgcGF0aDogc3RyaW5nW107IHZhbHVlOiBhbnkgfT4oKHJlc3VsdCwga2V5KSA9PiB7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9ICh0YXJnZXQgYXMgYW55KVtrZXldO1xuXG4gICAgaWYgKFxuICAgICAgaXNVbmRlZmluZWQodmFsdWUpIHx8XG4gICAgICBpc051bGwodmFsdWUpIHx8XG4gICAgICBpc051bWJlcih2YWx1ZSkgfHxcbiAgICAgIGlzQm9vbGVhbih2YWx1ZSkgfHxcbiAgICAgIGlzU3RyaW5nKHZhbHVlKSB8fFxuICAgICAgaXNBcnJheSh2YWx1ZSlcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBnZXRVbnNlcmlhbGl6YWJsZSh2YWx1ZSwgWy4uLnBhdGgsIGtleV0pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBbLi4ucGF0aCwga2V5XSxcbiAgICAgIHZhbHVlLFxuICAgIH07XG4gIH0sIGZhbHNlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRocm93SWZVbnNlcmlhbGl6YWJsZShcbiAgdW5zZXJpYWxpemFibGU6IGZhbHNlIHwgeyBwYXRoOiBzdHJpbmdbXTsgdmFsdWU6IGFueSB9LFxuICBjb250ZXh0OiAnc3RhdGUnIHwgJ2FjdGlvbidcbikge1xuICBpZiAodW5zZXJpYWxpemFibGUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdW5zZXJpYWxpemFibGVQYXRoID0gdW5zZXJpYWxpemFibGUucGF0aC5qb2luKCcuJyk7XG4gIGNvbnN0IGVycm9yOiBhbnkgPSBuZXcgRXJyb3IoXG4gICAgYERldGVjdGVkIHVuc2VyaWFsaXphYmxlICR7Y29udGV4dH0gYXQgXCIke3Vuc2VyaWFsaXphYmxlUGF0aH1cImBcbiAgKTtcbiAgZXJyb3IudmFsdWUgPSB1bnNlcmlhbGl6YWJsZS52YWx1ZTtcbiAgZXJyb3IudW5zZXJpYWxpemFibGVQYXRoID0gdW5zZXJpYWxpemFibGVQYXRoO1xuICB0aHJvdyBlcnJvcjtcbn1cblxuLyoqXG4gKiBPYmplY3QgVXRpbGl0aWVzXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIHVuZGVmaW5lZCB7XG4gIHJldHVybiB0YXJnZXQgPT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVsbCh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBudWxsIHtcbiAgcmV0dXJuIHRhcmdldCA9PT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgQXJyYXk8YW55PiB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHRhcmdldCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBzdHJpbmcge1xuICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgdGFyZ2V0ID09PSAnYm9vbGVhbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBudW1iZXIge1xuICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ251bWJlcic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdExpa2UodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgb2JqZWN0IHtcbiAgcmV0dXJuIHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnICYmIHRhcmdldCAhPT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHRhcmdldDogYW55KTogdGFyZ2V0IGlzIG9iamVjdCB7XG4gIHJldHVybiBpc09iamVjdExpa2UodGFyZ2V0KSAmJiAhaXNBcnJheSh0YXJnZXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBvYmplY3Qge1xuICBpZiAoIWlzT2JqZWN0KHRhcmdldCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCB0YXJnZXRQcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KTtcbiAgcmV0dXJuIHRhcmdldFByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZSB8fCB0YXJnZXRQcm90b3R5cGUgPT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIEZ1bmN0aW9uIHtcbiAgcmV0dXJuIHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eSh0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0YXJnZXQsIHByb3BlcnR5TmFtZSk7XG59XG4iXX0=