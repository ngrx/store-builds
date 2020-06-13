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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZV9jaGVja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9ydW50aW1lX2NoZWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUNMLDZCQUE2QixFQUM3Qiw0QkFBNEIsRUFDNUIseUJBQXlCLEdBQzFCLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixzQkFBc0IsRUFDdEIsYUFBYSxFQUNiLG1CQUFtQixFQUNuQiw2QkFBNkIsR0FDOUIsTUFBTSxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7OztBQUUxRCxNQUFNLFVBQVUseUJBQXlCLENBQ3ZDLGFBQXNDO0lBRXRDLElBQUksU0FBUyxFQUFFLEVBQUU7UUFDZix1QkFDRSwwQkFBMEIsRUFBRSxLQUFLLEVBQ2pDLDJCQUEyQixFQUFFLEtBQUssRUFDbEMsdUJBQXVCLEVBQUUsSUFBSSxFQUM3Qix3QkFBd0IsRUFBRSxJQUFJLEVBQzlCLHdCQUF3QixFQUFFLEtBQUssRUFDL0IsMEJBQTBCLEVBQUUsS0FBSyxJQUM5QixhQUFhLEVBQ2hCO0tBQ0g7SUFFRCxPQUFPO1FBQ0wsMEJBQTBCLEVBQUUsS0FBSztRQUNqQywyQkFBMkIsRUFBRSxLQUFLO1FBQ2xDLHVCQUF1QixFQUFFLEtBQUs7UUFDOUIsd0JBQXdCLEVBQUUsS0FBSztRQUMvQix3QkFBd0IsRUFBRSxLQUFLO1FBQy9CLDBCQUEwQixFQUFFLEtBQUs7S0FDbEMsQ0FBQztBQUNKLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLG1DQUFtQyxDQUFDLEVBQ2xELDJCQUEyQixFQUMzQiwwQkFBMEIsR0FD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Q25DLGFBQTRCO0lBRTVCLE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLDBCQUEwQixDQUFDLE1BQXFCO0lBQzlELElBQUksQ0FBQyxNQUFNLENBQUMsMEJBQTBCLEVBQUU7UUFDdEMsT0FBTztLQUNSOztVQUVLLFVBQVUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO1NBQ3ZELE1BQU07Ozs7SUFBQyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsRUFBRSxFQUFFLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBQztTQUNoRCxHQUFHOzs7O0lBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUM7SUFFeEIsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQ2IsK0NBQStDLFVBQVU7YUFDdEQsR0FBRzs7OztRQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFDO2FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxpQkFBaUIsNkJBQTZCLENBQ2pFLENBQUM7S0FDSDtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0Rldk1vZGUsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBzZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcixcbiAgaW1tdXRhYmlsaXR5Q2hlY2tNZXRhUmVkdWNlcixcbiAgaW5OZ1pvbmVBc3NlcnRNZXRhUmVkdWNlcixcbn0gZnJvbSAnLi9tZXRhLXJlZHVjZXJzJztcbmltcG9ydCB7IFJ1bnRpbWVDaGVja3MsIE1ldGFSZWR1Y2VyLCBBY3Rpb24gfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge1xuICBfVVNFUl9SVU5USU1FX0NIRUNLUyxcbiAgX0FDVElWRV9SVU5USU1FX0NIRUNLUyxcbiAgTUVUQV9SRURVQ0VSUyxcbiAgVVNFUl9SVU5USU1FX0NIRUNLUyxcbiAgX0FDVElPTl9UWVBFX1VOSVFVRU5FU1NfQ0hFQ0ssXG59IGZyb20gJy4vdG9rZW5zJztcbmltcG9ydCB7IFJFR0lTVEVSRURfQUNUSU9OX1RZUEVTIH0gZnJvbSAnLi9nbG9iYWxzJztcbmltcG9ydCB7IFJVTlRJTUVfQ0hFQ0tfVVJMIH0gZnJvbSAnLi9tZXRhLXJlZHVjZXJzL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGl2ZVJ1bnRpbWVDaGVja3MoXG4gIHJ1bnRpbWVDaGVja3M/OiBQYXJ0aWFsPFJ1bnRpbWVDaGVja3M+XG4pOiBSdW50aW1lQ2hlY2tzIHtcbiAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5OiBmYWxzZSxcbiAgICAgIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eTogZmFsc2UsXG4gICAgICBzdHJpY3RTdGF0ZUltbXV0YWJpbGl0eTogdHJ1ZSxcbiAgICAgIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eTogdHJ1ZSxcbiAgICAgIHN0cmljdEFjdGlvbldpdGhpbk5nWm9uZTogZmFsc2UsXG4gICAgICBzdHJpY3RBY3Rpb25UeXBlVW5pcXVlbmVzczogZmFsc2UsXG4gICAgICAuLi5ydW50aW1lQ2hlY2tzLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5OiBmYWxzZSxcbiAgICBzdHJpY3RBY3Rpb25TZXJpYWxpemFiaWxpdHk6IGZhbHNlLFxuICAgIHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5OiBmYWxzZSxcbiAgICBzdHJpY3RBY3Rpb25JbW11dGFiaWxpdHk6IGZhbHNlLFxuICAgIHN0cmljdEFjdGlvbldpdGhpbk5nWm9uZTogZmFsc2UsXG4gICAgc3RyaWN0QWN0aW9uVHlwZVVuaXF1ZW5lc3M6IGZhbHNlLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIoe1xuICBzdHJpY3RBY3Rpb25TZXJpYWxpemFiaWxpdHksXG4gIHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5LFxufTogUnVudGltZUNoZWNrcyk6IE1ldGFSZWR1Y2VyIHtcbiAgcmV0dXJuIChyZWR1Y2VyKSA9PlxuICAgIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eSB8fCBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eVxuICAgICAgPyBzZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcihyZWR1Y2VyLCB7XG4gICAgICAgICAgYWN0aW9uOiAoYWN0aW9uKSA9PlxuICAgICAgICAgICAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5ICYmICFpZ25vcmVOZ3J4QWN0aW9uKGFjdGlvbiksXG4gICAgICAgICAgc3RhdGU6ICgpID0+IHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5LFxuICAgICAgICB9KVxuICAgICAgOiByZWR1Y2VyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW1tdXRhYmlsaXR5Q2hlY2tNZXRhUmVkdWNlcih7XG4gIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eSxcbiAgc3RyaWN0U3RhdGVJbW11dGFiaWxpdHksXG59OiBSdW50aW1lQ2hlY2tzKTogTWV0YVJlZHVjZXIge1xuICByZXR1cm4gKHJlZHVjZXIpID0+XG4gICAgc3RyaWN0QWN0aW9uSW1tdXRhYmlsaXR5IHx8IHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5XG4gICAgICA/IGltbXV0YWJpbGl0eUNoZWNrTWV0YVJlZHVjZXIocmVkdWNlciwge1xuICAgICAgICAgIGFjdGlvbjogKGFjdGlvbikgPT5cbiAgICAgICAgICAgIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eSAmJiAhaWdub3JlTmdyeEFjdGlvbihhY3Rpb24pLFxuICAgICAgICAgIHN0YXRlOiAoKSA9PiBzdHJpY3RTdGF0ZUltbXV0YWJpbGl0eSxcbiAgICAgICAgfSlcbiAgICAgIDogcmVkdWNlcjtcbn1cblxuZnVuY3Rpb24gaWdub3JlTmdyeEFjdGlvbihhY3Rpb246IEFjdGlvbikge1xuICByZXR1cm4gYWN0aW9uLnR5cGUuc3RhcnRzV2l0aCgnQG5ncngnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluTmdab25lQ2hlY2tNZXRhUmVkdWNlcih7XG4gIHN0cmljdEFjdGlvbldpdGhpbk5nWm9uZSxcbn06IFJ1bnRpbWVDaGVja3MpOiBNZXRhUmVkdWNlciB7XG4gIHJldHVybiAocmVkdWNlcikgPT5cbiAgICBzdHJpY3RBY3Rpb25XaXRoaW5OZ1pvbmVcbiAgICAgID8gaW5OZ1pvbmVBc3NlcnRNZXRhUmVkdWNlcihyZWR1Y2VyLCB7XG4gICAgICAgICAgYWN0aW9uOiAoYWN0aW9uKSA9PlxuICAgICAgICAgICAgc3RyaWN0QWN0aW9uV2l0aGluTmdab25lICYmICFpZ25vcmVOZ3J4QWN0aW9uKGFjdGlvbiksXG4gICAgICAgIH0pXG4gICAgICA6IHJlZHVjZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlUnVudGltZUNoZWNrcyhcbiAgcnVudGltZUNoZWNrcz86IFBhcnRpYWw8UnVudGltZUNoZWNrcz5cbik6IFByb3ZpZGVyW10ge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IF9VU0VSX1JVTlRJTUVfQ0hFQ0tTLFxuICAgICAgdXNlVmFsdWU6IHJ1bnRpbWVDaGVja3MsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBVU0VSX1JVTlRJTUVfQ0hFQ0tTLFxuICAgICAgdXNlRmFjdG9yeTogX3J1bnRpbWVDaGVja3NGYWN0b3J5LFxuICAgICAgZGVwczogW19VU0VSX1JVTlRJTUVfQ0hFQ0tTXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IF9BQ1RJVkVfUlVOVElNRV9DSEVDS1MsXG4gICAgICBkZXBzOiBbVVNFUl9SVU5USU1FX0NIRUNLU10sXG4gICAgICB1c2VGYWN0b3J5OiBjcmVhdGVBY3RpdmVSdW50aW1lQ2hlY2tzLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTUVUQV9SRURVQ0VSUyxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgZGVwczogW19BQ1RJVkVfUlVOVElNRV9DSEVDS1NdLFxuICAgICAgdXNlRmFjdG9yeTogY3JlYXRlSW1tdXRhYmlsaXR5Q2hlY2tNZXRhUmVkdWNlcixcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1FVEFfUkVEVUNFUlMsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgIGRlcHM6IFtfQUNUSVZFX1JVTlRJTUVfQ0hFQ0tTXSxcbiAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZVNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTUVUQV9SRURVQ0VSUyxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgZGVwczogW19BQ1RJVkVfUlVOVElNRV9DSEVDS1NdLFxuICAgICAgdXNlRmFjdG9yeTogY3JlYXRlSW5OZ1pvbmVDaGVja01ldGFSZWR1Y2VyLFxuICAgIH0sXG4gIF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0ZvckFjdGlvblR5cGVVbmlxdWVuZXNzKCk6IFByb3ZpZGVyW10ge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IF9BQ1RJT05fVFlQRV9VTklRVUVORVNTX0NIRUNLLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICBkZXBzOiBbX0FDVElWRV9SVU5USU1FX0NIRUNLU10sXG4gICAgICB1c2VGYWN0b3J5OiBfYWN0aW9uVHlwZVVuaXF1ZW5lc3NDaGVjayxcbiAgICB9LFxuICBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX3J1bnRpbWVDaGVja3NGYWN0b3J5KFxuICBydW50aW1lQ2hlY2tzOiBSdW50aW1lQ2hlY2tzXG4pOiBSdW50aW1lQ2hlY2tzIHtcbiAgcmV0dXJuIHJ1bnRpbWVDaGVja3M7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfYWN0aW9uVHlwZVVuaXF1ZW5lc3NDaGVjayhjb25maWc6IFJ1bnRpbWVDaGVja3MpOiB2b2lkIHtcbiAgaWYgKCFjb25maWcuc3RyaWN0QWN0aW9uVHlwZVVuaXF1ZW5lc3MpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBkdXBsaWNhdGVzID0gT2JqZWN0LmVudHJpZXMoUkVHSVNURVJFRF9BQ1RJT05fVFlQRVMpXG4gICAgLmZpbHRlcigoWywgcmVnaXN0cmF0aW9uc10pID0+IHJlZ2lzdHJhdGlvbnMgPiAxKVxuICAgIC5tYXAoKFt0eXBlXSkgPT4gdHlwZSk7XG5cbiAgaWYgKGR1cGxpY2F0ZXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYEFjdGlvbiB0eXBlcyBhcmUgcmVnaXN0ZXJlZCBtb3JlIHRoYW4gb25jZSwgJHtkdXBsaWNhdGVzXG4gICAgICAgIC5tYXAoKHR5cGUpID0+IGBcIiR7dHlwZX1cImApXG4gICAgICAgIC5qb2luKCcsICcpfS4gJHtSVU5USU1FX0NIRUNLX1VSTH0jc3RyaWN0YWN0aW9udHlwZXVuaXF1ZW5lc3NgXG4gICAgKTtcbiAgfVxufVxuIl19