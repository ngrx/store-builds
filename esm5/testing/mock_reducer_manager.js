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
 * Generated from: mock_reducer_manager.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
var MockReducerManager = /** @class */ (function (_super) {
    __extends(MockReducerManager, _super);
    function MockReducerManager() {
        return _super.call(this, (/**
         * @return {?}
         */
        function () { return undefined; })) || this;
    }
    /**
     * @param {?} feature
     * @return {?}
     */
    MockReducerManager.prototype.addFeature = /**
     * @param {?} feature
     * @return {?}
     */
    function (feature) {
        /* noop */
    };
    /**
     * @param {?} feature
     * @return {?}
     */
    MockReducerManager.prototype.addFeatures = /**
     * @param {?} feature
     * @return {?}
     */
    function (feature) {
        /* noop */
    };
    MockReducerManager.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MockReducerManager.ctorParameters = function () { return []; };
    return MockReducerManager;
}(BehaviorSubject));
export { MockReducerManager };
//# sourceMappingURL=mock_reducer_manager.js.map