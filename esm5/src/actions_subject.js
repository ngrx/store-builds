var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export var INIT = '@ngrx/store/init';
var ActionsSubject = /** @class */ (function (_super) {
    __extends(ActionsSubject, _super);
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
    ActionsSubject.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ActionsSubject.ctorParameters = function () { return []; };
    return ActionsSubject;
}(BehaviorSubject));
export { ActionsSubject };
export var ACTIONS_SUBJECT_PROVIDERS = [ActionsSubject];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uc19zdWJqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvYWN0aW9uc19zdWJqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSXZDLE1BQU0sQ0FBQyxJQUFNLElBQUksR0FBRyxrQkFBd0MsQ0FBQztBQUU3RDtJQUNvQyxrQ0FBdUI7SUFFekQ7ZUFDRSxrQkFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsNkJBQUksR0FBSixVQUFLLE1BQWM7UUFDakIsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7WUFDakMsTUFBTSxJQUFJLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQ2hEO2FBQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQzdDLE1BQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztTQUMxRDtRQUVELGlCQUFNLElBQUksWUFBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNFLFVBQVU7SUFDWixDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNFLGlCQUFNLFFBQVEsV0FBRSxDQUFDO0lBQ25CLENBQUM7O2dCQXZCRixVQUFVOzs7O0lBd0JYLHFCQUFDO0NBQUEsQUF4QkQsQ0FDb0MsZUFBZSxHQXVCbEQ7U0F2QlksY0FBYztBQXlCM0IsTUFBTSxDQUFDLElBQU0seUJBQXlCLEdBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL21vZGVscyc7XG5cbmV4cG9ydCBjb25zdCBJTklUID0gJ0BuZ3J4L3N0b3JlL2luaXQnIGFzICdAbmdyeC9zdG9yZS9pbml0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFjdGlvbnNTdWJqZWN0IGV4dGVuZHMgQmVoYXZpb3JTdWJqZWN0PEFjdGlvbj5cbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7IHR5cGU6IElOSVQgfSk7XG4gIH1cblxuICBuZXh0KGFjdGlvbjogQWN0aW9uKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBY3Rpb25zIG11c3QgYmUgb2JqZWN0c2ApO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGFjdGlvbi50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQWN0aW9ucyBtdXN0IGhhdmUgYSB0eXBlIHByb3BlcnR5YCk7XG4gICAgfVxuXG4gICAgc3VwZXIubmV4dChhY3Rpb24pO1xuICB9XG5cbiAgY29tcGxldGUoKSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgc3VwZXIuY29tcGxldGUoKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgQUNUSU9OU19TVUJKRUNUX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtBY3Rpb25zU3ViamVjdF07XG4iXX0=