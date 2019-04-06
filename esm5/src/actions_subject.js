import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export var INIT = '@ngrx/store/init';
var ActionsSubject = /** @class */ (function (_super) {
    tslib_1.__extends(ActionsSubject, _super);
    function ActionsSubject() {
        return _super.call(this, { type: INIT }) || this;
    }
    ActionsSubject.prototype.next = function (action) {
        if (typeof action === 'undefined') {
            throw new TypeError("Actions must be objects");
        }
        else if (typeof action.type === 'undefined') {
            throw new TypeError("Actions must have a type property");
        }
        _super.prototype.next.call(this, action);
    };
    ActionsSubject.prototype.complete = function () {
        /* noop */
    };
    ActionsSubject.prototype.ngOnDestroy = function () {
        _super.prototype.complete.call(this);
    };
    ActionsSubject = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], ActionsSubject);
    return ActionsSubject;
}(BehaviorSubject));
export { ActionsSubject };
export var ACTIONS_SUBJECT_PROVIDERS = [ActionsSubject];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uc19zdWJqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvYWN0aW9uc19zdWJqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSXZDLE1BQU0sQ0FBQyxJQUFNLElBQUksR0FBRyxrQkFBd0MsQ0FBQztBQUc3RDtJQUFvQywwQ0FBdUI7SUFFekQ7ZUFDRSxrQkFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsNkJBQUksR0FBSixVQUFLLE1BQWM7UUFDakIsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7WUFDakMsTUFBTSxJQUFJLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQ2hEO2FBQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQzdDLE1BQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztTQUMxRDtRQUVELGlCQUFNLElBQUksWUFBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNFLFVBQVU7SUFDWixDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNFLGlCQUFNLFFBQVEsV0FBRSxDQUFDO0lBQ25CLENBQUM7SUF0QlUsY0FBYztRQUQxQixVQUFVLEVBQUU7O09BQ0EsY0FBYyxDQXVCMUI7SUFBRCxxQkFBQztDQUFBLEFBdkJELENBQW9DLGVBQWUsR0F1QmxEO1NBdkJZLGNBQWM7QUF5QjNCLE1BQU0sQ0FBQyxJQUFNLHlCQUF5QixHQUFlLENBQUMsY0FBYyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5leHBvcnQgY29uc3QgSU5JVCA9ICdAbmdyeC9zdG9yZS9pbml0JyBhcyAnQG5ncngvc3RvcmUvaW5pdCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBY3Rpb25zU3ViamVjdCBleHRlbmRzIEJlaGF2aW9yU3ViamVjdDxBY3Rpb24+XG4gIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoeyB0eXBlOiBJTklUIH0pO1xuICB9XG5cbiAgbmV4dChhY3Rpb246IEFjdGlvbik6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQWN0aW9ucyBtdXN0IGJlIG9iamVjdHNgKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhY3Rpb24udHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEFjdGlvbnMgbXVzdCBoYXZlIGEgdHlwZSBwcm9wZXJ0eWApO1xuICAgIH1cblxuICAgIHN1cGVyLm5leHQoYWN0aW9uKTtcbiAgfVxuXG4gIGNvbXBsZXRlKCkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHN1cGVyLmNvbXBsZXRlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEFDVElPTlNfU1VCSkVDVF9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbQWN0aW9uc1N1YmplY3RdO1xuIl19