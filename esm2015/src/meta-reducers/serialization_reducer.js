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
//# sourceMappingURL=serialization_reducer.js.map