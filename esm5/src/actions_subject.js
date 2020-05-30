var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * Generated from: src/actions_subject.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/** @type {?} */
export var INIT = (/** @type {?} */ ('@ngrx/store/init'));
var ActionsSubject = /** @class */ (function (_super) {
    __extends(ActionsSubject, _super);
    function ActionsSubject() {
        return _super.call(this, { type: INIT }) || this;
    }
    /**
     * @param {?} action
     * @return {?}
     */
    ActionsSubject.prototype.next = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        if (typeof action === 'function') {
            throw new TypeError("\n        Dispatch expected an object, instead it received a function.\n        If you're using the createAction function, make sure to invoke the function\n        before dispatching the action. For example, someAction should be someAction().");
        }
        else if (typeof action === 'undefined') {
            throw new TypeError("Actions must be objects");
        }
        else if (typeof action.type === 'undefined') {
            throw new TypeError("Actions must have a type property");
        }
        _super.prototype.next.call(this, action);
    };
    /**
     * @return {?}
     */
    ActionsSubject.prototype.complete = /**
     * @return {?}
     */
    function () {
        /* noop */
    };
    /**
     * @return {?}
     */
    ActionsSubject.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.complete.call(this);
    };
    ActionsSubject.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ActionsSubject.ctorParameters = function () { return []; };
    return ActionsSubject;
}(BehaviorSubject));
export { ActionsSubject };
/** @type {?} */
export var ACTIONS_SUBJECT_PROVIDERS = [ActionsSubject];
//# sourceMappingURL=actions_subject.js.map