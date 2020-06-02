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
        { type: Injectable }
    ];
    /** @nocollapse */
    ActionsSubject.ctorParameters = function () { return []; };
    return ActionsSubject;
}(BehaviorSubject));
export { ActionsSubject };
/** @type {?} */
export var ACTIONS_SUBJECT_PROVIDERS = [ActionsSubject];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uc19zdWJqZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ncngvc3RvcmUvIiwic291cmNlcyI6WyJzcmMvYWN0aW9uc19zdWJqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBSXZDLE1BQU0sS0FBTyxJQUFJLEdBQUcsbUJBQUEsa0JBQWtCLEVBQXNCO0FBRTVEO0lBQ29DLGtDQUF1QjtJQUV6RDtlQUNFLGtCQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRUQsNkJBQUk7Ozs7SUFBSixVQUFLLE1BQWM7UUFDakIsSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLEVBQUU7WUFDaEMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxxUEFHNkQsQ0FBQyxDQUFDO1NBQ3BGO2FBQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7WUFDeEMsTUFBTSxJQUFJLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQ2hEO2FBQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQzdDLE1BQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztTQUMxRDtRQUNELGlCQUFNLElBQUksWUFBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixDQUFDOzs7O0lBRUQsaUNBQVE7OztJQUFSO1FBQ0UsVUFBVTtJQUNaLENBQUM7Ozs7SUFFRCxvQ0FBVzs7O0lBQVg7UUFDRSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztJQUNuQixDQUFDOztnQkEzQkYsVUFBVTs7OztJQTRCWCxxQkFBQztDQUFBLEFBNUJELENBQ29DLGVBQWUsR0EyQmxEO1NBM0JZLGNBQWM7O0FBNkIzQixNQUFNLEtBQU8seUJBQXlCLEdBQWUsQ0FBQyxjQUFjLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5leHBvcnQgY29uc3QgSU5JVCA9ICdAbmdyeC9zdG9yZS9pbml0JyBhcyAnQG5ncngvc3RvcmUvaW5pdCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBY3Rpb25zU3ViamVjdCBleHRlbmRzIEJlaGF2aW9yU3ViamVjdDxBY3Rpb24+XG4gIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoeyB0eXBlOiBJTklUIH0pO1xuICB9XG5cbiAgbmV4dChhY3Rpb246IEFjdGlvbik6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBcbiAgICAgICAgRGlzcGF0Y2ggZXhwZWN0ZWQgYW4gb2JqZWN0LCBpbnN0ZWFkIGl0IHJlY2VpdmVkIGEgZnVuY3Rpb24uXG4gICAgICAgIElmIHlvdSdyZSB1c2luZyB0aGUgY3JlYXRlQWN0aW9uIGZ1bmN0aW9uLCBtYWtlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvblxuICAgICAgICBiZWZvcmUgZGlzcGF0Y2hpbmcgdGhlIGFjdGlvbi4gRm9yIGV4YW1wbGUsIHNvbWVBY3Rpb24gc2hvdWxkIGJlIHNvbWVBY3Rpb24oKS5gKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBY3Rpb25zIG11c3QgYmUgb2JqZWN0c2ApO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGFjdGlvbi50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQWN0aW9ucyBtdXN0IGhhdmUgYSB0eXBlIHByb3BlcnR5YCk7XG4gICAgfVxuICAgIHN1cGVyLm5leHQoYWN0aW9uKTtcbiAgfVxuXG4gIGNvbXBsZXRlKCkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHN1cGVyLmNvbXBsZXRlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEFDVElPTlNfU1VCSkVDVF9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbQWN0aW9uc1N1YmplY3RdO1xuIl19