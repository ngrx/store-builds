/**
 * @fileoverview added by tsickle
 * Generated from: src/meta-reducers/inNgZoneAssert_reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as ngCore from '@angular/core';
import { RUNTIME_CHECK_URL } from './utils';
/**
 * @param {?} reducer
 * @param {?} checks
 * @return {?}
 */
export function inNgZoneAssertMetaReducer(reducer, checks) {
    return (/**
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    function (state, action) {
        if (checks.action(action) && !ngCore.NgZone.isInAngularZone()) {
            throw new Error(`Action '${action.type}' running outside NgZone. ${RUNTIME_CHECK_URL}#strictactionwithinngzone`);
        }
        return reducer(state, action);
    });
}
//# sourceMappingURL=inNgZoneAssert_reducer.js.map