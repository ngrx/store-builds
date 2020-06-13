/**
 * @fileoverview added by tsickle
 * Generated from: src/meta-reducers/utils.ts
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
 * @return {?}
 */
export function isComponent(target) {
    return isFunction(target) && target.hasOwnProperty('ɵcmp');
}
/**
 * @param {?} target
 * @param {?} propertyName
 * @return {?}
 */
export function hasOwnProperty(target, propertyName) {
    return Object.prototype.hasOwnProperty.call(target, propertyName);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9tZXRhLXJlZHVjZXJzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE1BQU0sT0FBTyxpQkFBaUIsR0FDNUIsMERBQTBEOzs7OztBQUU1RCxNQUFNLFVBQVUsV0FBVyxDQUFDLE1BQVc7SUFDckMsT0FBTyxNQUFNLEtBQUssU0FBUyxDQUFDO0FBQzlCLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxNQUFXO0lBQ2hDLE9BQU8sTUFBTSxLQUFLLElBQUksQ0FBQztBQUN6QixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxPQUFPLENBQUMsTUFBVztJQUNqQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0IsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLE1BQVc7SUFDbEMsT0FBTyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUM7QUFDcEMsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsU0FBUyxDQUFDLE1BQVc7SUFDbkMsT0FBTyxPQUFPLE1BQU0sS0FBSyxTQUFTLENBQUM7QUFDckMsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLE1BQVc7SUFDbEMsT0FBTyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUM7QUFDcEMsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLE1BQVc7SUFDdEMsT0FBTyxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxLQUFLLElBQUksQ0FBQztBQUN2RCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxRQUFRLENBQUMsTUFBVztJQUNsQyxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNsRCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUMsTUFBVztJQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3JCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7O1VBRUssZUFBZSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO0lBQ3JELE9BQU8sZUFBZSxLQUFLLE1BQU0sQ0FBQyxTQUFTLElBQUksZUFBZSxLQUFLLElBQUksQ0FBQztBQUMxRSxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsTUFBVztJQUNwQyxPQUFPLE9BQU8sTUFBTSxLQUFLLFVBQVUsQ0FBQztBQUN0QyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxXQUFXLENBQUMsTUFBVztJQUNyQyxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdELENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxjQUFjLENBQUMsTUFBYyxFQUFFLFlBQW9CO0lBQ2pFLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztBQUNwRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IFJVTlRJTUVfQ0hFQ0tfVVJMID1cbiAgJ2h0dHBzOi8vbmdyeC5pby9ndWlkZS9zdG9yZS9jb25maWd1cmF0aW9uL3J1bnRpbWUtY2hlY2tzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIHVuZGVmaW5lZCB7XG4gIHJldHVybiB0YXJnZXQgPT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVsbCh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBudWxsIHtcbiAgcmV0dXJuIHRhcmdldCA9PT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgQXJyYXk8YW55PiB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHRhcmdldCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBzdHJpbmcge1xuICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgdGFyZ2V0ID09PSAnYm9vbGVhbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBudW1iZXIge1xuICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ251bWJlcic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdExpa2UodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgb2JqZWN0IHtcbiAgcmV0dXJuIHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnICYmIHRhcmdldCAhPT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHRhcmdldDogYW55KTogdGFyZ2V0IGlzIG9iamVjdCB7XG4gIHJldHVybiBpc09iamVjdExpa2UodGFyZ2V0KSAmJiAhaXNBcnJheSh0YXJnZXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBvYmplY3Qge1xuICBpZiAoIWlzT2JqZWN0KHRhcmdldCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCB0YXJnZXRQcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KTtcbiAgcmV0dXJuIHRhcmdldFByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZSB8fCB0YXJnZXRQcm90b3R5cGUgPT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIEZ1bmN0aW9uIHtcbiAgcmV0dXJuIHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbXBvbmVudCh0YXJnZXQ6IGFueSkge1xuICByZXR1cm4gaXNGdW5jdGlvbih0YXJnZXQpICYmIHRhcmdldC5oYXNPd25Qcm9wZXJ0eSgnybVjbXAnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc093blByb3BlcnR5KHRhcmdldDogb2JqZWN0LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRhcmdldCwgcHJvcGVydHlOYW1lKTtcbn1cbiJdfQ==