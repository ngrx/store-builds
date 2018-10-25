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
var MockReducerManager = /** @class */ (function (_super) {
    __extends(MockReducerManager, _super);
    function MockReducerManager() {
        return _super.call(this, function () { return undefined; }) || this;
    }
    MockReducerManager.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MockReducerManager.ctorParameters = function () { return []; };
    return MockReducerManager;
}(BehaviorSubject));
export { MockReducerManager };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19yZWR1Y2VyX21hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3Rlc3Rpbmcvc3JjL21vY2tfcmVkdWNlcl9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHdkM7SUFDd0Msc0NBRXZDO0lBQ0M7ZUFDRSxrQkFBTSxjQUFNLE9BQUEsU0FBUyxFQUFULENBQVMsQ0FBQztJQUN4QixDQUFDOztnQkFORixVQUFVOzs7O0lBT1gseUJBQUM7Q0FBQSxBQVBELENBQ3dDLGVBQWUsR0FNdEQ7U0FOWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjdGlvblJlZHVjZXIgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2NrUmVkdWNlck1hbmFnZXIgZXh0ZW5kcyBCZWhhdmlvclN1YmplY3Q8XG4gIEFjdGlvblJlZHVjZXI8YW55LCBhbnk+XG4+IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKCkgPT4gdW5kZWZpbmVkKTtcbiAgfVxufVxuIl19