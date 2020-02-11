/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/src/meta-reducers/utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const RUNTIME_CHECK_URL = 'https://ngrx.io/guide/store/configuration/runtime-checks';
/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9tZXRhLXJlZHVjZXJzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE1BQU0sT0FBTyxpQkFBaUIsR0FDNUIsMERBQTBEOzs7OztBQUU1RCxNQUFNLFVBQVUsV0FBVyxDQUFDLE1BQVc7SUFDckMsT0FBTyxNQUFNLEtBQUssU0FBUyxDQUFDO0FBQzlCLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxNQUFXO0lBQ2hDLE9BQU8sTUFBTSxLQUFLLElBQUksQ0FBQztBQUN6QixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxPQUFPLENBQUMsTUFBVztJQUNqQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0IsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLE1BQVc7SUFDbEMsT0FBTyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUM7QUFDcEMsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsU0FBUyxDQUFDLE1BQVc7SUFDbkMsT0FBTyxPQUFPLE1BQU0sS0FBSyxTQUFTLENBQUM7QUFDckMsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLE1BQVc7SUFDbEMsT0FBTyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUM7QUFDcEMsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLE1BQVc7SUFDdEMsT0FBTyxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxLQUFLLElBQUksQ0FBQztBQUN2RCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxRQUFRLENBQUMsTUFBVztJQUNsQyxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNsRCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUMsTUFBVztJQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3JCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7O1VBRUssZUFBZSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO0lBQ3JELE9BQU8sZUFBZSxLQUFLLE1BQU0sQ0FBQyxTQUFTLElBQUksZUFBZSxLQUFLLElBQUksQ0FBQztBQUMxRSxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsTUFBVztJQUNwQyxPQUFPLE9BQU8sTUFBTSxLQUFLLFVBQVUsQ0FBQztBQUN0QyxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLE1BQWMsRUFBRSxZQUFvQjtJQUNqRSxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDcEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBSVU5USU1FX0NIRUNLX1VSTCA9XG4gICdodHRwczovL25ncnguaW8vZ3VpZGUvc3RvcmUvY29uZmlndXJhdGlvbi9ydW50aW1lLWNoZWNrcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyB1bmRlZmluZWQge1xuICByZXR1cm4gdGFyZ2V0ID09PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bGwodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgbnVsbCB7XG4gIHJldHVybiB0YXJnZXQgPT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FycmF5KHRhcmdldDogYW55KTogdGFyZ2V0IGlzIEFycmF5PGFueT4ge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheSh0YXJnZXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgc3RyaW5nIHtcbiAgcmV0dXJuIHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgbnVtYmVyIHtcbiAgcmV0dXJuIHR5cGVvZiB0YXJnZXQgPT09ICdudW1iZXInO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3RMaWtlKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIG9iamVjdCB7XG4gIHJldHVybiB0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0JyAmJiB0YXJnZXQgIT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBvYmplY3Qge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHRhcmdldCkgJiYgIWlzQXJyYXkodGFyZ2V0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgb2JqZWN0IHtcbiAgaWYgKCFpc09iamVjdCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgdGFyZ2V0UHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldCk7XG4gIHJldHVybiB0YXJnZXRQcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGUgfHwgdGFyZ2V0UHJvdG90eXBlID09PSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbih0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBGdW5jdGlvbiB7XG4gIHJldHVybiB0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzT3duUHJvcGVydHkodGFyZ2V0OiBvYmplY3QsIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGFyZ2V0LCBwcm9wZXJ0eU5hbWUpO1xufVxuIl19