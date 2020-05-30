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
 * Generated from: mock_state.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/**
 * @template T
 */
var MockState = /** @class */ (function (_super) {
    __extends(MockState, _super);
    function MockState() {
        return _super.call(this, (/** @type {?} */ ({}))) || this;
    }
    MockState.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MockState.ctorParameters = function () { return []; };
    return MockState;
}(BehaviorSubject));
export { MockState };
//# sourceMappingURL=mock_state.js.map