var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
/**
 * @fileoverview added by tsickle
 * Generated from: src/runtime_checks.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isDevMode } from '@angular/core';
import { serializationCheckMetaReducer, immutabilityCheckMetaReducer, inNgZoneAssertMetaReducer, } from './meta-reducers';
import { _USER_RUNTIME_CHECKS, _ACTIVE_RUNTIME_CHECKS, META_REDUCERS, USER_RUNTIME_CHECKS, _ACTION_TYPE_UNIQUENESS_CHECK, } from './tokens';
import { REGISTERED_ACTION_TYPES } from './globals';
import { RUNTIME_CHECK_URL } from './meta-reducers/utils';
/**
 * @param {?=} runtimeChecks
 * @return {?}
 */
export function createActiveRuntimeChecks(runtimeChecks) {
    if (isDevMode()) {
        return __assign({ strictStateSerializability: false, strictActionSerializability: false, strictStateImmutability: true, strictActionImmutability: true, strictActionWithinNgZone: false, strictActionTypeUniqueness: false }, runtimeChecks);
    }
    return {
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictActionWithinNgZone: false,
        strictActionTypeUniqueness: false,
    };
}
/**
 * @param {?} __0
 * @return {?}
 */
export function createSerializationCheckMetaReducer(_a) {
    var strictActionSerializability = _a.strictActionSerializability, strictStateSerializability = _a.strictStateSerializability;
    return (/**
     * @param {?} reducer
     * @return {?}
     */
    function (reducer) {
        return strictActionSerializability || strictStateSerializability
            ? serializationCheckMetaReducer(reducer, {
                action: (/**
                 * @param {?} action
                 * @return {?}
                 */
                function (action) {
                    return strictActionSerializability && !ignoreNgrxAction(action);
                }),
                state: (/**
                 * @return {?}
                 */
                function () { return strictStateSerializability; }),
            })
            : reducer;
    });
}
/**
 * @param {?} __0
 * @return {?}
 */
export function createImmutabilityCheckMetaReducer(_a) {
    var strictActionImmutability = _a.strictActionImmutability, strictStateImmutability = _a.strictStateImmutability;
    return (/**
     * @param {?} reducer
     * @return {?}
     */
    function (reducer) {
        return strictActionImmutability || strictStateImmutability
            ? immutabilityCheckMetaReducer(reducer, {
                action: (/**
                 * @param {?} action
                 * @return {?}
                 */
                function (action) {
                    return strictActionImmutability && !ignoreNgrxAction(action);
                }),
                state: (/**
                 * @return {?}
                 */
                function () { return strictStateImmutability; }),
            })
            : reducer;
    });
}
/**
 * @param {?} action
 * @return {?}
 */
function ignoreNgrxAction(action) {
    return action.type.startsWith('@ngrx');
}
/**
 * @param {?} __0
 * @return {?}
 */
export function createInNgZoneCheckMetaReducer(_a) {
    var strictActionWithinNgZone = _a.strictActionWithinNgZone;
    return (/**
     * @param {?} reducer
     * @return {?}
     */
    function (reducer) {
        return strictActionWithinNgZone
            ? inNgZoneAssertMetaReducer(reducer, {
                action: (/**
                 * @param {?} action
                 * @return {?}
                 */
                function (action) {
                    return strictActionWithinNgZone && !ignoreNgrxAction(action);
                }),
            })
            : reducer;
    });
}
/**
 * @param {?=} runtimeChecks
 * @return {?}
 */
export function provideRuntimeChecks(runtimeChecks) {
    return [
        {
            provide: _USER_RUNTIME_CHECKS,
            useValue: runtimeChecks,
        },
        {
            provide: USER_RUNTIME_CHECKS,
            useFactory: _runtimeChecksFactory,
            deps: [_USER_RUNTIME_CHECKS],
        },
        {
            provide: _ACTIVE_RUNTIME_CHECKS,
            deps: [USER_RUNTIME_CHECKS],
            useFactory: createActiveRuntimeChecks,
        },
        {
            provide: META_REDUCERS,
            multi: true,
            deps: [_ACTIVE_RUNTIME_CHECKS],
            useFactory: createImmutabilityCheckMetaReducer,
        },
        {
            provide: META_REDUCERS,
            multi: true,
            deps: [_ACTIVE_RUNTIME_CHECKS],
            useFactory: createSerializationCheckMetaReducer,
        },
        {
            provide: META_REDUCERS,
            multi: true,
            deps: [_ACTIVE_RUNTIME_CHECKS],
            useFactory: createInNgZoneCheckMetaReducer,
        },
    ];
}
/**
 * @return {?}
 */
export function checkForActionTypeUniqueness() {
    return [
        {
            provide: _ACTION_TYPE_UNIQUENESS_CHECK,
            multi: true,
            deps: [_ACTIVE_RUNTIME_CHECKS],
            useFactory: _actionTypeUniquenessCheck,
        },
    ];
}
/**
 * @param {?} runtimeChecks
 * @return {?}
 */
export function _runtimeChecksFactory(runtimeChecks) {
    return runtimeChecks;
}
/**
 * @param {?} config
 * @return {?}
 */
export function _actionTypeUniquenessCheck(config) {
    if (!config.strictActionTypeUniqueness) {
        return;
    }
    /** @type {?} */
    var duplicates = Object.entries(REGISTERED_ACTION_TYPES)
        .filter((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var _b = __read(_a, 2), registrations = _b[1];
        return registrations > 1;
    }))
        .map((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var _b = __read(_a, 1), type = _b[0];
        return type;
    }));
    if (duplicates.length) {
        throw new Error("Action types are registered more than once, " + duplicates
            .map((/**
         * @param {?} type
         * @return {?}
         */
        function (type) { return "\"" + type + "\""; }))
            .join(', ') + ". " + RUNTIME_CHECK_URL + "#strictactiontypeuniqueness");
    }
}
//# sourceMappingURL=runtime_checks.js.map