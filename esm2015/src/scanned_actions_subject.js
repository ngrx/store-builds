/**
 * @fileoverview added by tsickle
 * Generated from: src/scanned_actions_subject.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export class ScannedActionsSubject extends Subject {
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.complete();
    }
}
ScannedActionsSubject.decorators = [
    { type: Injectable },
];
/** @type {?} */
export const SCANNED_ACTIONS_SUBJECT_PROVIDERS = [
    ScannedActionsSubject,
];
//# sourceMappingURL=scanned_actions_subject.js.map