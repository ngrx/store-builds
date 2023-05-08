import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export const INIT = '@ngrx/store/init';
class ActionsSubject extends BehaviorSubject {
    constructor() {
        super({ type: INIT });
    }
    next(action) {
        if (typeof action === 'function') {
            throw new TypeError(`
        Dispatch expected an object, instead it received a function.
        If you're using the createAction function, make sure to invoke the function
        before dispatching the action. For example, someAction should be someAction().`);
        }
        else if (typeof action === 'undefined') {
            throw new TypeError(`Actions must be objects`);
        }
        else if (typeof action.type === 'undefined') {
            throw new TypeError(`Actions must have a type property`);
        }
        super.next(action);
    }
    complete() {
        /* noop */
    }
    ngOnDestroy() {
        super.complete();
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: ActionsSubject, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: ActionsSubject }); }
}
export { ActionsSubject };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: ActionsSubject, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
export const ACTIONS_SUBJECT_PROVIDERS = [ActionsSubject];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uc19zdWJqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvYWN0aW9uc19zdWJqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBSXZDLE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxrQkFBMkIsQ0FBQztBQUVoRCxNQUNhLGNBQ1gsU0FBUSxlQUF1QjtJQUcvQjtRQUNFLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFUSxJQUFJLENBQUMsTUFBYztRQUMxQixJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsRUFBRTtZQUNoQyxNQUFNLElBQUksU0FBUyxDQUFDOzs7dUZBRzZELENBQUMsQ0FBQztTQUNwRjthQUFNLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO1lBQ3hDLE1BQU0sSUFBSSxTQUFTLENBQUMseUJBQXlCLENBQUMsQ0FBQztTQUNoRDthQUFNLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTtZQUM3QyxNQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7U0FDMUQ7UUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFUSxRQUFRO1FBQ2YsVUFBVTtJQUNaLENBQUM7SUFFRCxXQUFXO1FBQ1QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25CLENBQUM7aUlBNUJVLGNBQWM7cUlBQWQsY0FBYzs7U0FBZCxjQUFjOzJGQUFkLGNBQWM7a0JBRDFCLFVBQVU7O0FBZ0NYLE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUFlLENBQUMsY0FBYyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5leHBvcnQgY29uc3QgSU5JVCA9ICdAbmdyeC9zdG9yZS9pbml0JyBhcyBjb25zdDtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFjdGlvbnNTdWJqZWN0XG4gIGV4dGVuZHMgQmVoYXZpb3JTdWJqZWN0PEFjdGlvbj5cbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3lcbntcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoeyB0eXBlOiBJTklUIH0pO1xuICB9XG5cbiAgb3ZlcnJpZGUgbmV4dChhY3Rpb246IEFjdGlvbik6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBcbiAgICAgICAgRGlzcGF0Y2ggZXhwZWN0ZWQgYW4gb2JqZWN0LCBpbnN0ZWFkIGl0IHJlY2VpdmVkIGEgZnVuY3Rpb24uXG4gICAgICAgIElmIHlvdSdyZSB1c2luZyB0aGUgY3JlYXRlQWN0aW9uIGZ1bmN0aW9uLCBtYWtlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvblxuICAgICAgICBiZWZvcmUgZGlzcGF0Y2hpbmcgdGhlIGFjdGlvbi4gRm9yIGV4YW1wbGUsIHNvbWVBY3Rpb24gc2hvdWxkIGJlIHNvbWVBY3Rpb24oKS5gKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBY3Rpb25zIG11c3QgYmUgb2JqZWN0c2ApO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGFjdGlvbi50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQWN0aW9ucyBtdXN0IGhhdmUgYSB0eXBlIHByb3BlcnR5YCk7XG4gICAgfVxuICAgIHN1cGVyLm5leHQoYWN0aW9uKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGNvbXBsZXRlKCkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHN1cGVyLmNvbXBsZXRlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEFDVElPTlNfU1VCSkVDVF9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbQWN0aW9uc1N1YmplY3RdO1xuIl19