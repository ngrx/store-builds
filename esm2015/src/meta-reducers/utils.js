/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/src/meta-reducers/utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9tZXRhLXJlZHVjZXJzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE1BQU0sVUFBVSxXQUFXLENBQUMsTUFBVztJQUNyQyxPQUFPLE1BQU0sS0FBSyxTQUFTLENBQUM7QUFDOUIsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsTUFBTSxDQUFDLE1BQVc7SUFDaEMsT0FBTyxNQUFNLEtBQUssSUFBSSxDQUFDO0FBQ3pCLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLE9BQU8sQ0FBQyxNQUFXO0lBQ2pDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxRQUFRLENBQUMsTUFBVztJQUNsQyxPQUFPLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQztBQUNwQyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsTUFBVztJQUNuQyxPQUFPLE9BQU8sTUFBTSxLQUFLLFNBQVMsQ0FBQztBQUNyQyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxRQUFRLENBQUMsTUFBVztJQUNsQyxPQUFPLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQztBQUNwQyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxZQUFZLENBQUMsTUFBVztJQUN0QyxPQUFPLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLEtBQUssSUFBSSxDQUFDO0FBQ3ZELENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxNQUFXO0lBQ2xDLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2xELENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxNQUFXO0lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDckIsT0FBTyxLQUFLLENBQUM7S0FDZDs7VUFFSyxlQUFlLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7SUFDckQsT0FBTyxlQUFlLEtBQUssTUFBTSxDQUFDLFNBQVMsSUFBSSxlQUFlLEtBQUssSUFBSSxDQUFDO0FBQzFFLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFVBQVUsQ0FBQyxNQUFXO0lBQ3BDLE9BQU8sT0FBTyxNQUFNLEtBQUssVUFBVSxDQUFDO0FBQ3RDLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxjQUFjLENBQUMsTUFBYyxFQUFFLFlBQW9CO0lBQ2pFLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztBQUNwRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIHVuZGVmaW5lZCB7XG4gIHJldHVybiB0YXJnZXQgPT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVsbCh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBudWxsIHtcbiAgcmV0dXJuIHRhcmdldCA9PT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgQXJyYXk8YW55PiB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHRhcmdldCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBzdHJpbmcge1xuICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgdGFyZ2V0ID09PSAnYm9vbGVhbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBudW1iZXIge1xuICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ251bWJlcic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdExpa2UodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgb2JqZWN0IHtcbiAgcmV0dXJuIHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnICYmIHRhcmdldCAhPT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHRhcmdldDogYW55KTogdGFyZ2V0IGlzIG9iamVjdCB7XG4gIHJldHVybiBpc09iamVjdExpa2UodGFyZ2V0KSAmJiAhaXNBcnJheSh0YXJnZXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBvYmplY3Qge1xuICBpZiAoIWlzT2JqZWN0KHRhcmdldCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCB0YXJnZXRQcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KTtcbiAgcmV0dXJuIHRhcmdldFByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZSB8fCB0YXJnZXRQcm90b3R5cGUgPT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIEZ1bmN0aW9uIHtcbiAgcmV0dXJuIHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eSh0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0YXJnZXQsIHByb3BlcnR5TmFtZSk7XG59XG4iXX0=