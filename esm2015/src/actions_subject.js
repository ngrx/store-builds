/**
 * @fileoverview added by tsickle
 * Generated from: src/actions_subject.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/** @type {?} */
export const INIT = (/** @type {?} */ ('@ngrx/store/init'));
export class ActionsSubject extends BehaviorSubject {
    constructor() {
        super({ type: INIT });
    }
    /**
     * @param {?} action
     * @return {?}
     */
    next(action) {
        if (typeof action === 'function') {
            throw new TypeError(`
        Dispatch expected an object, instead it received a function.
        If you're using the createAction function, make sure to invoke the function
        before dispatching the action. For example, someAction should be someAction().`);
        }
        else if (typeof action === 'undefined') {
            throw new TypeError(`Actions must be objects`);
        }
        else if (typeof action.type === 'undefined') {
            throw new TypeError(`Actions must have a type property`);
        }
        super.next(action);
    }
    /**
     * @return {?}
     */
    complete() {
        /* noop */
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.complete();
    }
}
ActionsSubject.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ActionsSubject.ctorParameters = () => [];
/** @type {?} */
export const ACTIONS_SUBJECT_PROVIDERS = [ActionsSubject];
//# sourceMappingURL=actions_subject.js.map