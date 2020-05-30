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
        return Object.assign({ strictStateSerializability: false, strictActionSerializability: false, strictStateImmutability: true, strictActionImmutability: true, strictActionWithinNgZone: false, strictActionTypeUniqueness: false }, runtimeChecks);
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
export function createSerializationCheckMetaReducer({ strictActionSerializability, strictStateSerializability, }) {
    return (/**
     * @param {?} reducer
     * @return {?}
     */
    (reducer) => strictActionSerializability || strictStateSerializability
        ? serializationCheckMetaReducer(reducer, {
            action: (/**
             * @param {?} action
             * @return {?}
             */
            (action) => strictActionSerializability && !ignoreNgrxAction(action)),
            state: (/**
             * @return {?}
             */
            () => strictStateSerializability),
        })
        : reducer);
}
/**
 * @param {?} __0
 * @return {?}
 */
export function createImmutabilityCheckMetaReducer({ strictActionImmutability, strictStateImmutability, }) {
    return (/**
     * @param {?} reducer
     * @return {?}
     */
    (reducer) => strictActionImmutability || strictStateImmutability
        ? immutabilityCheckMetaReducer(reducer, {
            action: (/**
             * @param {?} action
             * @return {?}
             */
            (action) => strictActionImmutability && !ignoreNgrxAction(action)),
            state: (/**
             * @return {?}
             */
            () => strictStateImmutability),
        })
        : reducer);
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
export function createInNgZoneCheckMetaReducer({ strictActionWithinNgZone, }) {
    return (/**
     * @param {?} reducer
     * @return {?}
     */
    (reducer) => strictActionWithinNgZone
        ? inNgZoneAssertMetaReducer(reducer, {
            action: (/**
             * @param {?} action
             * @return {?}
             */
            (action) => strictActionWithinNgZone && !ignoreNgrxAction(action)),
        })
        : reducer);
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
    const duplicates = Object.entries(REGISTERED_ACTION_TYPES)
        .filter((/**
     * @param {?} __0
     * @return {?}
     */
    ([, registrations]) => registrations > 1))
        .map((/**
     * @param {?} __0
     * @return {?}
     */
    ([type]) => type));
    if (duplicates.length) {
        throw new Error(`Action types are registered more than once, ${duplicates
            .map((/**
         * @param {?} type
         * @return {?}
         */
        (type) => `"${type}"`))
            .join(', ')}. ${RUNTIME_CHECK_URL}#strictactiontypeuniqueness`);
    }
}
//# sourceMappingURL=runtime_checks.js.map