import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export const INIT = '@ngrx/store/init';
export class ActionsSubject extends BehaviorSubject {
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
}
ActionsSubject.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ActionsSubject.ctorParameters = () => [];
export const ACTIONS_SUBJECT_PROVIDERS = [ActionsSubject];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uc19zdWJqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvYWN0aW9uc19zdWJqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJdkMsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLGtCQUEyQixDQUFDO0FBR2hELE1BQU0sT0FBTyxjQUNYLFNBQVEsZUFBdUI7SUFFL0I7UUFDRSxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxDQUFDLE1BQWM7UUFDakIsSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLEVBQUU7WUFDaEMsTUFBTSxJQUFJLFNBQVMsQ0FBQzs7O3VGQUc2RCxDQUFDLENBQUM7U0FDcEY7YUFBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtZQUN4QyxNQUFNLElBQUksU0FBUyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDaEQ7YUFBTSxJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDN0MsTUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsUUFBUTtRQUNOLFVBQVU7SUFDWixDQUFDO0lBRUQsV0FBVztRQUNULEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7WUE1QkYsVUFBVTs7OztBQStCWCxNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IGNvbnN0IElOSVQgPSAnQG5ncngvc3RvcmUvaW5pdCcgYXMgY29uc3Q7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBY3Rpb25zU3ViamVjdFxuICBleHRlbmRzIEJlaGF2aW9yU3ViamVjdDxBY3Rpb24+XG4gIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoeyB0eXBlOiBJTklUIH0pO1xuICB9XG5cbiAgbmV4dChhY3Rpb246IEFjdGlvbik6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBcbiAgICAgICAgRGlzcGF0Y2ggZXhwZWN0ZWQgYW4gb2JqZWN0LCBpbnN0ZWFkIGl0IHJlY2VpdmVkIGEgZnVuY3Rpb24uXG4gICAgICAgIElmIHlvdSdyZSB1c2luZyB0aGUgY3JlYXRlQWN0aW9uIGZ1bmN0aW9uLCBtYWtlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvblxuICAgICAgICBiZWZvcmUgZGlzcGF0Y2hpbmcgdGhlIGFjdGlvbi4gRm9yIGV4YW1wbGUsIHNvbWVBY3Rpb24gc2hvdWxkIGJlIHNvbWVBY3Rpb24oKS5gKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBY3Rpb25zIG11c3QgYmUgb2JqZWN0c2ApO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGFjdGlvbi50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQWN0aW9ucyBtdXN0IGhhdmUgYSB0eXBlIHByb3BlcnR5YCk7XG4gICAgfVxuICAgIHN1cGVyLm5leHQoYWN0aW9uKTtcbiAgfVxuXG4gIGNvbXBsZXRlKCkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHN1cGVyLmNvbXBsZXRlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEFDVElPTlNfU1VCSkVDVF9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbQWN0aW9uc1N1YmplY3RdO1xuIl19