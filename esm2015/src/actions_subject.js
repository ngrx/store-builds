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
/** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
ActionsSubject.decorators = [
    { type: Injectable }
];
/**
 * @type {function(): !Array<(null|{
 *   type: ?,
 *   decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>),
 * })>}
 * @nocollapse
 */
ActionsSubject.ctorParameters = () => [];
export const ACTIONS_SUBJECT_PROVIDERS = [ActionsSubject];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uc19zdWJqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvYWN0aW9uc19zdWJqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJdkMsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLGtCQUEyQixDQUFDO0FBR2hELE1BQU0sT0FBTyxjQUNYLFNBQVEsZUFBdUI7SUFFL0I7UUFDRSxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxDQUFDLE1BQWM7UUFDakIsSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLEVBQUU7WUFDaEMsTUFBTSxJQUFJLFNBQVMsQ0FBQzs7O3VGQUc2RCxDQUFDLENBQUM7U0FDcEY7YUFBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtZQUN4QyxNQUFNLElBQUksU0FBUyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDaEQ7YUFBTSxJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDN0MsTUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsUUFBUTtRQUNOLFVBQVU7SUFDWixDQUFDO0lBRUQsV0FBVztRQUNULEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7O1lBNUJGLFVBQVU7Ozs7Ozs7Ozs7QUErQlgsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL21vZGVscyc7XG5cbmV4cG9ydCBjb25zdCBJTklUID0gJ0BuZ3J4L3N0b3JlL2luaXQnIGFzIGNvbnN0O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWN0aW9uc1N1YmplY3RcbiAgZXh0ZW5kcyBCZWhhdmlvclN1YmplY3Q8QWN0aW9uPlxuICBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHsgdHlwZTogSU5JVCB9KTtcbiAgfVxuXG4gIG5leHQoYWN0aW9uOiBBY3Rpb24pOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgXG4gICAgICAgIERpc3BhdGNoIGV4cGVjdGVkIGFuIG9iamVjdCwgaW5zdGVhZCBpdCByZWNlaXZlZCBhIGZ1bmN0aW9uLlxuICAgICAgICBJZiB5b3UncmUgdXNpbmcgdGhlIGNyZWF0ZUFjdGlvbiBmdW5jdGlvbiwgbWFrZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb25cbiAgICAgICAgYmVmb3JlIGRpc3BhdGNoaW5nIHRoZSBhY3Rpb24uIEZvciBleGFtcGxlLCBzb21lQWN0aW9uIHNob3VsZCBiZSBzb21lQWN0aW9uKCkuYCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYWN0aW9uID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQWN0aW9ucyBtdXN0IGJlIG9iamVjdHNgKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhY3Rpb24udHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEFjdGlvbnMgbXVzdCBoYXZlIGEgdHlwZSBwcm9wZXJ0eWApO1xuICAgIH1cbiAgICBzdXBlci5uZXh0KGFjdGlvbik7XG4gIH1cblxuICBjb21wbGV0ZSgpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBzdXBlci5jb21wbGV0ZSgpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBBQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTOiBQcm92aWRlcltdID0gW0FjdGlvbnNTdWJqZWN0XTtcbiJdfQ==