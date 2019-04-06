import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var ScannedActionsSubject = /** @class */ (function (_super) {
    tslib_1.__extends(ScannedActionsSubject, _super);
    function ScannedActionsSubject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScannedActionsSubject.prototype.ngOnDestroy = function () {
        this.complete();
    };
    ScannedActionsSubject = tslib_1.__decorate([
        Injectable()
    ], ScannedActionsSubject);
    return ScannedActionsSubject;
}(Subject));
export { ScannedActionsSubject };
export var SCANNED_ACTIONS_SUBJECT_PROVIDERS = [
    ScannedActionsSubject,
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nhbm5lZF9hY3Rpb25zX3N1YmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zY2FubmVkX2FjdGlvbnNfc3ViamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUsvQjtJQUEyQyxpREFBZTtJQUExRDs7SUFLQSxDQUFDO0lBSEMsMkNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBSlUscUJBQXFCO1FBRGpDLFVBQVUsRUFBRTtPQUNBLHFCQUFxQixDQUtqQztJQUFELDRCQUFDO0NBQUEsQUFMRCxDQUEyQyxPQUFPLEdBS2pEO1NBTFkscUJBQXFCO0FBT2xDLE1BQU0sQ0FBQyxJQUFNLGlDQUFpQyxHQUFlO0lBQzNELHFCQUFxQjtDQUN0QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL21vZGVscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTY2FubmVkQWN0aW9uc1N1YmplY3QgZXh0ZW5kcyBTdWJqZWN0PEFjdGlvbj5cbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNvbXBsZXRlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFNDQU5ORURfQUNUSU9OU19TVUJKRUNUX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAgU2Nhbm5lZEFjdGlvbnNTdWJqZWN0LFxuXTtcbiJdfQ==