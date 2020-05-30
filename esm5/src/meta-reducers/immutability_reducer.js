/**
 * @fileoverview added by tsickle
 * Generated from: src/meta-reducers/immutability_reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isFunction, hasOwnProperty, isObjectLike } from './utils';
/**
 * @param {?} reducer
 * @param {?} checks
 * @return {?}
 */
export function immutabilityCheckMetaReducer(reducer, checks) {
    return (/**
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    function (state, action) {
        /** @type {?} */
        var act = checks.action(action) ? freeze(action) : action;
        /** @type {?} */
        var nextState = reducer(state, act);
        return checks.state() ? freeze(nextState) : nextState;
    });
}
/**
 * @param {?} target
 * @return {?}
 */
function freeze(target) {
    Object.freeze(target);
    /** @type {?} */
    var targetIsFunction = isFunction(target);
    Object.getOwnPropertyNames(target).forEach((/**
     * @param {?} prop
     * @return {?}
     */
    function (prop) {
        // Ignore Ivy properties, ref: https://github.com/ngrx/platform/issues/2109#issuecomment-582689060
        if (prop.startsWith('ɵ')) {
            return;
        }
        if (hasOwnProperty(target, prop) &&
            (targetIsFunction
                ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments'
                : true)) {
            /** @type {?} */
            var propValue = target[prop];
            if ((isObjectLike(propValue) || isFunction(propValue)) &&
                !Object.isFrozen(propValue)) {
                freeze(propValue);
            }
        }
    }));
    return target;
}
//# sourceMappingURL=immutability_reducer.js.map