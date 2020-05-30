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
 * Generated from: src/scanned_actions_subject.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var ScannedActionsSubject = /** @class */ (function (_super) {
    __extends(ScannedActionsSubject, _super);
    function ScannedActionsSubject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    ScannedActionsSubject.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.complete();
    };
    ScannedActionsSubject.decorators = [
        { type: Injectable },
    ];
    return ScannedActionsSubject;
}(Subject));
export { ScannedActionsSubject };
/** @type {?} */
export var SCANNED_ACTIONS_SUBJECT_PROVIDERS = [
    ScannedActionsSubject,
];
//# sourceMappingURL=scanned_actions_subject.js.map