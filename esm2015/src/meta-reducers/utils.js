/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9tZXRhLXJlZHVjZXJzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsTUFBTSxVQUFVLFdBQVcsQ0FBQyxNQUFXO0lBQ3JDLE9BQU8sTUFBTSxLQUFLLFNBQVMsQ0FBQztBQUM5QixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxNQUFNLENBQUMsTUFBVztJQUNoQyxPQUFPLE1BQU0sS0FBSyxJQUFJLENBQUM7QUFDekIsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsT0FBTyxDQUFDLE1BQVc7SUFDakMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxNQUFXO0lBQ2xDLE9BQU8sT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDO0FBQ3BDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxNQUFXO0lBQ25DLE9BQU8sT0FBTyxNQUFNLEtBQUssU0FBUyxDQUFDO0FBQ3JDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxNQUFXO0lBQ2xDLE9BQU8sT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDO0FBQ3BDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFlBQVksQ0FBQyxNQUFXO0lBQ3RDLE9BQU8sT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUM7QUFDdkQsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLE1BQVc7SUFDbEMsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbEQsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUFDLE1BQVc7SUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNyQixPQUFPLEtBQUssQ0FBQztLQUNkOztVQUVLLGVBQWUsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztJQUNyRCxPQUFPLGVBQWUsS0FBSyxNQUFNLENBQUMsU0FBUyxJQUFJLGVBQWUsS0FBSyxJQUFJLENBQUM7QUFDMUUsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsVUFBVSxDQUFDLE1BQVc7SUFDcEMsT0FBTyxPQUFPLE1BQU0sS0FBSyxVQUFVLENBQUM7QUFDdEMsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxNQUFjLEVBQUUsWUFBb0I7SUFDakUsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ3BFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgdW5kZWZpbmVkIHtcbiAgcmV0dXJuIHRhcmdldCA9PT0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOdWxsKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIG51bGwge1xuICByZXR1cm4gdGFyZ2V0ID09PSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheSh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBBcnJheTxhbnk+IHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodGFyZ2V0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIHN0cmluZyB7XG4gIHJldHVybiB0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiB0YXJnZXQgPT09ICdib29sZWFuJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIG51bWJlciB7XG4gIHJldHVybiB0eXBlb2YgdGFyZ2V0ID09PSAnbnVtYmVyJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBvYmplY3Qge1xuICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ29iamVjdCcgJiYgdGFyZ2V0ICE9PSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgb2JqZWN0IHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh0YXJnZXQpICYmICFpc0FycmF5KHRhcmdldCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KHRhcmdldDogYW55KTogdGFyZ2V0IGlzIG9iamVjdCB7XG4gIGlmICghaXNPYmplY3QodGFyZ2V0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHRhcmdldFByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpO1xuICByZXR1cm4gdGFyZ2V0UHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlIHx8IHRhcmdldFByb3RvdHlwZSA9PT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24odGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgRnVuY3Rpb24ge1xuICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc093blByb3BlcnR5KHRhcmdldDogb2JqZWN0LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRhcmdldCwgcHJvcGVydHlOYW1lKTtcbn1cbiJdfQ==