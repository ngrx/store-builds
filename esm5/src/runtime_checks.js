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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZV9jaGVja3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdyeC9zdG9yZS8iLCJzb3VyY2VzIjpbInNyYy9ydW50aW1lX2NoZWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUNMLDZCQUE2QixFQUM3Qiw0QkFBNEIsRUFDNUIseUJBQXlCLEdBQzFCLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixzQkFBc0IsRUFDdEIsYUFBYSxFQUNiLG1CQUFtQixFQUNuQiw2QkFBNkIsR0FDOUIsTUFBTSxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7OztBQUUxRCxNQUFNLFVBQVUseUJBQXlCLENBQ3ZDLGFBQXNDO0lBRXRDLElBQUksU0FBUyxFQUFFLEVBQUU7UUFDZixrQkFDRSwwQkFBMEIsRUFBRSxLQUFLLEVBQ2pDLDJCQUEyQixFQUFFLEtBQUssRUFDbEMsdUJBQXVCLEVBQUUsSUFBSSxFQUM3Qix3QkFBd0IsRUFBRSxJQUFJLEVBQzlCLHdCQUF3QixFQUFFLEtBQUssRUFDL0IsMEJBQTBCLEVBQUUsS0FBSyxJQUM5QixhQUFhLEVBQ2hCO0tBQ0g7SUFFRCxPQUFPO1FBQ0wsMEJBQTBCLEVBQUUsS0FBSztRQUNqQywyQkFBMkIsRUFBRSxLQUFLO1FBQ2xDLHVCQUF1QixFQUFFLEtBQUs7UUFDOUIsd0JBQXdCLEVBQUUsS0FBSztRQUMvQix3QkFBd0IsRUFBRSxLQUFLO1FBQy9CLDBCQUEwQixFQUFFLEtBQUs7S0FDbEMsQ0FBQztBQUNKLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLG1DQUFtQyxDQUFDLEVBR3BDO1FBRmQsNERB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O1lBQzlCLFVBQVUsRUFBRSwwQkFBMEI7U0FDdkM7S0FDRixDQUFDO0FBQ0osQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUscUJBQXFCLENBQ25DLGFBQTRCO0lBRTVCLE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLDBCQUEwQixDQUFDLE1BQXFCO0lBQzlELElBQUksQ0FBQyxNQUFNLENBQUMsMEJBQTBCLEVBQUU7UUFDdEMsT0FBTztLQUNSOztRQUVLLFVBQVUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO1NBQ3ZELE1BQU07Ozs7SUFBQyxVQUFDLEVBQWlCO1lBQWpCLGtCQUFpQixFQUFkLHFCQUFhO1FBQU0sT0FBQSxhQUFhLEdBQUcsQ0FBQztJQUFqQixDQUFpQixFQUFDO1NBQ2hELEdBQUc7Ozs7SUFBQyxVQUFDLEVBQU07WUFBTixrQkFBTSxFQUFMLFlBQUk7UUFBTSxPQUFBLElBQUk7SUFBSixDQUFJLEVBQUM7SUFFeEIsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQ2IsaURBQStDLFVBQVU7YUFDdEQsR0FBRzs7OztRQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsT0FBSSxJQUFJLE9BQUcsRUFBWCxDQUFXLEVBQUM7YUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFLLGlCQUFpQixnQ0FBNkIsQ0FDakUsQ0FBQztLQUNIO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGV2TW9kZSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIHNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyLFxuICBpbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyLFxuICBpbk5nWm9uZUFzc2VydE1ldGFSZWR1Y2VyLFxufSBmcm9tICcuL21ldGEtcmVkdWNlcnMnO1xuaW1wb3J0IHsgUnVudGltZUNoZWNrcywgTWV0YVJlZHVjZXIsIEFjdGlvbiB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7XG4gIF9VU0VSX1JVTlRJTUVfQ0hFQ0tTLFxuICBfQUNUSVZFX1JVTlRJTUVfQ0hFQ0tTLFxuICBNRVRBX1JFRFVDRVJTLFxuICBVU0VSX1JVTlRJTUVfQ0hFQ0tTLFxuICBfQUNUSU9OX1RZUEVfVU5JUVVFTkVTU19DSEVDSyxcbn0gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHsgUkVHSVNURVJFRF9BQ1RJT05fVFlQRVMgfSBmcm9tICcuL2dsb2JhbHMnO1xuaW1wb3J0IHsgUlVOVElNRV9DSEVDS19VUkwgfSBmcm9tICcuL21ldGEtcmVkdWNlcnMvdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aXZlUnVudGltZUNoZWNrcyhcbiAgcnVudGltZUNoZWNrcz86IFBhcnRpYWw8UnVudGltZUNoZWNrcz5cbik6IFJ1bnRpbWVDaGVja3Mge1xuICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHk6IGZhbHNlLFxuICAgICAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5OiBmYWxzZSxcbiAgICAgIHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5OiB0cnVlLFxuICAgICAgc3RyaWN0QWN0aW9uSW1tdXRhYmlsaXR5OiB0cnVlLFxuICAgICAgc3RyaWN0QWN0aW9uV2l0aGluTmdab25lOiBmYWxzZSxcbiAgICAgIHN0cmljdEFjdGlvblR5cGVVbmlxdWVuZXNzOiBmYWxzZSxcbiAgICAgIC4uLnJ1bnRpbWVDaGVja3MsXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHk6IGZhbHNlLFxuICAgIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eTogZmFsc2UsXG4gICAgc3RyaWN0U3RhdGVJbW11dGFiaWxpdHk6IGZhbHNlLFxuICAgIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eTogZmFsc2UsXG4gICAgc3RyaWN0QWN0aW9uV2l0aGluTmdab25lOiBmYWxzZSxcbiAgICBzdHJpY3RBY3Rpb25UeXBlVW5pcXVlbmVzczogZmFsc2UsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcih7XG4gIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eSxcbiAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHksXG59OiBSdW50aW1lQ2hlY2tzKTogTWV0YVJlZHVjZXIge1xuICByZXR1cm4gKHJlZHVjZXIpID0+XG4gICAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5IHx8IHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5XG4gICAgICA/IHNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyKHJlZHVjZXIsIHtcbiAgICAgICAgICBhY3Rpb246IChhY3Rpb24pID0+XG4gICAgICAgICAgICBzdHJpY3RBY3Rpb25TZXJpYWxpemFiaWxpdHkgJiYgIWlnbm9yZU5ncnhBY3Rpb24oYWN0aW9uKSxcbiAgICAgICAgICBzdGF0ZTogKCkgPT4gc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHksXG4gICAgICAgIH0pXG4gICAgICA6IHJlZHVjZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyKHtcbiAgc3RyaWN0QWN0aW9uSW1tdXRhYmlsaXR5LFxuICBzdHJpY3RTdGF0ZUltbXV0YWJpbGl0eSxcbn06IFJ1bnRpbWVDaGVja3MpOiBNZXRhUmVkdWNlciB7XG4gIHJldHVybiAocmVkdWNlcikgPT5cbiAgICBzdHJpY3RBY3Rpb25JbW11dGFiaWxpdHkgfHwgc3RyaWN0U3RhdGVJbW11dGFiaWxpdHlcbiAgICAgID8gaW1tdXRhYmlsaXR5Q2hlY2tNZXRhUmVkdWNlcihyZWR1Y2VyLCB7XG4gICAgICAgICAgYWN0aW9uOiAoYWN0aW9uKSA9PlxuICAgICAgICAgICAgc3RyaWN0QWN0aW9uSW1tdXRhYmlsaXR5ICYmICFpZ25vcmVOZ3J4QWN0aW9uKGFjdGlvbiksXG4gICAgICAgICAgc3RhdGU6ICgpID0+IHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5LFxuICAgICAgICB9KVxuICAgICAgOiByZWR1Y2VyO1xufVxuXG5mdW5jdGlvbiBpZ25vcmVOZ3J4QWN0aW9uKGFjdGlvbjogQWN0aW9uKSB7XG4gIHJldHVybiBhY3Rpb24udHlwZS5zdGFydHNXaXRoKCdAbmdyeCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5OZ1pvbmVDaGVja01ldGFSZWR1Y2VyKHtcbiAgc3RyaWN0QWN0aW9uV2l0aGluTmdab25lLFxufTogUnVudGltZUNoZWNrcyk6IE1ldGFSZWR1Y2VyIHtcbiAgcmV0dXJuIChyZWR1Y2VyKSA9PlxuICAgIHN0cmljdEFjdGlvbldpdGhpbk5nWm9uZVxuICAgICAgPyBpbk5nWm9uZUFzc2VydE1ldGFSZWR1Y2VyKHJlZHVjZXIsIHtcbiAgICAgICAgICBhY3Rpb246IChhY3Rpb24pID0+XG4gICAgICAgICAgICBzdHJpY3RBY3Rpb25XaXRoaW5OZ1pvbmUgJiYgIWlnbm9yZU5ncnhBY3Rpb24oYWN0aW9uKSxcbiAgICAgICAgfSlcbiAgICAgIDogcmVkdWNlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVSdW50aW1lQ2hlY2tzKFxuICBydW50aW1lQ2hlY2tzPzogUGFydGlhbDxSdW50aW1lQ2hlY2tzPlxuKTogUHJvdmlkZXJbXSB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogX1VTRVJfUlVOVElNRV9DSEVDS1MsXG4gICAgICB1c2VWYWx1ZTogcnVudGltZUNoZWNrcyxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFVTRVJfUlVOVElNRV9DSEVDS1MsXG4gICAgICB1c2VGYWN0b3J5OiBfcnVudGltZUNoZWNrc0ZhY3RvcnksXG4gICAgICBkZXBzOiBbX1VTRVJfUlVOVElNRV9DSEVDS1NdLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogX0FDVElWRV9SVU5USU1FX0NIRUNLUyxcbiAgICAgIGRlcHM6IFtVU0VSX1JVTlRJTUVfQ0hFQ0tTXSxcbiAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZUFjdGl2ZVJ1bnRpbWVDaGVja3MsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBNRVRBX1JFRFVDRVJTLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICBkZXBzOiBbX0FDVElWRV9SVU5USU1FX0NIRUNLU10sXG4gICAgICB1c2VGYWN0b3J5OiBjcmVhdGVJbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTUVUQV9SRURVQ0VSUyxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgZGVwczogW19BQ1RJVkVfUlVOVElNRV9DSEVDS1NdLFxuICAgICAgdXNlRmFjdG9yeTogY3JlYXRlU2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBNRVRBX1JFRFVDRVJTLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICBkZXBzOiBbX0FDVElWRV9SVU5USU1FX0NIRUNLU10sXG4gICAgICB1c2VGYWN0b3J5OiBjcmVhdGVJbk5nWm9uZUNoZWNrTWV0YVJlZHVjZXIsXG4gICAgfSxcbiAgXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrRm9yQWN0aW9uVHlwZVVuaXF1ZW5lc3MoKTogUHJvdmlkZXJbXSB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogX0FDVElPTl9UWVBFX1VOSVFVRU5FU1NfQ0hFQ0ssXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgIGRlcHM6IFtfQUNUSVZFX1JVTlRJTUVfQ0hFQ0tTXSxcbiAgICAgIHVzZUZhY3Rvcnk6IF9hY3Rpb25UeXBlVW5pcXVlbmVzc0NoZWNrLFxuICAgIH0sXG4gIF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfcnVudGltZUNoZWNrc0ZhY3RvcnkoXG4gIHJ1bnRpbWVDaGVja3M6IFJ1bnRpbWVDaGVja3Ncbik6IFJ1bnRpbWVDaGVja3Mge1xuICByZXR1cm4gcnVudGltZUNoZWNrcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9hY3Rpb25UeXBlVW5pcXVlbmVzc0NoZWNrKGNvbmZpZzogUnVudGltZUNoZWNrcyk6IHZvaWQge1xuICBpZiAoIWNvbmZpZy5zdHJpY3RBY3Rpb25UeXBlVW5pcXVlbmVzcykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGR1cGxpY2F0ZXMgPSBPYmplY3QuZW50cmllcyhSRUdJU1RFUkVEX0FDVElPTl9UWVBFUylcbiAgICAuZmlsdGVyKChbLCByZWdpc3RyYXRpb25zXSkgPT4gcmVnaXN0cmF0aW9ucyA+IDEpXG4gICAgLm1hcCgoW3R5cGVdKSA9PiB0eXBlKTtcblxuICBpZiAoZHVwbGljYXRlcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgQWN0aW9uIHR5cGVzIGFyZSByZWdpc3RlcmVkIG1vcmUgdGhhbiBvbmNlLCAke2R1cGxpY2F0ZXNcbiAgICAgICAgLm1hcCgodHlwZSkgPT4gYFwiJHt0eXBlfVwiYClcbiAgICAgICAgLmpvaW4oJywgJyl9LiAke1JVTlRJTUVfQ0hFQ0tfVVJMfSNzdHJpY3RhY3Rpb250eXBldW5pcXVlbmVzc2BcbiAgICApO1xuICB9XG59XG4iXX0=