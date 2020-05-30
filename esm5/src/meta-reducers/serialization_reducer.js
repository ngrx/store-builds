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
//# sourceMappingURL=serialization_reducer.js.map