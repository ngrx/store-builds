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
//# sourceMappingURL=utils.js.map