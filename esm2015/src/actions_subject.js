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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uc19zdWJqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvYWN0aW9uc19zdWJqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJdkMsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLGtCQUEyQixDQUFDO0FBR2hELE1BQU0sT0FBTyxjQUNYLFNBQVEsZUFBdUI7SUFHL0I7UUFDRSxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRVEsSUFBSSxDQUFDLE1BQWM7UUFDMUIsSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLEVBQUU7WUFDaEMsTUFBTSxJQUFJLFNBQVMsQ0FBQzs7O3VGQUc2RCxDQUFDLENBQUM7U0FDcEY7YUFBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtZQUN4QyxNQUFNLElBQUksU0FBUyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDaEQ7YUFBTSxJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDN0MsTUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRVEsUUFBUTtRQUNmLFVBQVU7SUFDWixDQUFDO0lBRUQsV0FBVztRQUNULEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7O1lBN0JGLFVBQVU7Ozs7Ozs7Ozs7QUFnQ1gsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL21vZGVscyc7XG5cbmV4cG9ydCBjb25zdCBJTklUID0gJ0BuZ3J4L3N0b3JlL2luaXQnIGFzIGNvbnN0O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWN0aW9uc1N1YmplY3RcbiAgZXh0ZW5kcyBCZWhhdmlvclN1YmplY3Q8QWN0aW9uPlxuICBpbXBsZW1lbnRzIE9uRGVzdHJveVxue1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7IHR5cGU6IElOSVQgfSk7XG4gIH1cblxuICBvdmVycmlkZSBuZXh0KGFjdGlvbjogQWN0aW9uKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFxuICAgICAgICBEaXNwYXRjaCBleHBlY3RlZCBhbiBvYmplY3QsIGluc3RlYWQgaXQgcmVjZWl2ZWQgYSBmdW5jdGlvbi5cbiAgICAgICAgSWYgeW91J3JlIHVzaW5nIHRoZSBjcmVhdGVBY3Rpb24gZnVuY3Rpb24sIG1ha2Ugc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uXG4gICAgICAgIGJlZm9yZSBkaXNwYXRjaGluZyB0aGUgYWN0aW9uLiBGb3IgZXhhbXBsZSwgc29tZUFjdGlvbiBzaG91bGQgYmUgc29tZUFjdGlvbigpLmApO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEFjdGlvbnMgbXVzdCBiZSBvYmplY3RzYCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYWN0aW9uLnR5cGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBY3Rpb25zIG11c3QgaGF2ZSBhIHR5cGUgcHJvcGVydHlgKTtcbiAgICB9XG4gICAgc3VwZXIubmV4dChhY3Rpb24pO1xuICB9XG5cbiAgb3ZlcnJpZGUgY29tcGxldGUoKSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgc3VwZXIuY29tcGxldGUoKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgQUNUSU9OU19TVUJKRUNUX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtBY3Rpb25zU3ViamVjdF07XG4iXX0=