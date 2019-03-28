/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/** @type {?} */
export const INIT = (/** @type {?} */ ('@ngrx/store/init'));
export class ActionsSubject extends BehaviorSubject {
    constructor() {
        super({ type: INIT });
    }
    /**
     * @param {?} action
     * @return {?}
     */
    next(action) {
        if (typeof action === 'undefined') {
            throw new TypeError(`Actions must be objects`);
        }
        else if (typeof action.type === 'undefined') {
            throw new TypeError(`Actions must have a type property`);
        }
        super.next(action);
    }
    /**
     * @return {?}
     */
    complete() {
        /* noop */
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.complete();
    }
}
ActionsSubject.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ActionsSubject.ctorParameters = () => [];
/** @type {?} */
export const ACTIONS_SUBJECT_PROVIDERS = [ActionsSubject];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uc19zdWJqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvYWN0aW9uc19zdWJqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUl2QyxNQUFNLE9BQU8sSUFBSSxHQUFHLG1CQUFBLGtCQUFrQixFQUFzQjtBQUc1RCxNQUFNLE9BQU8sY0FBZSxTQUFRLGVBQXVCO0lBRXpEO1FBQ0UsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCxJQUFJLENBQUMsTUFBYztRQUNqQixJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtZQUNqQyxNQUFNLElBQUksU0FBUyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDaEQ7YUFBTSxJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDN0MsTUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLFVBQVU7SUFDWixDQUFDOzs7O0lBRUQsV0FBVztRQUNULEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7WUF2QkYsVUFBVTs7Ozs7QUEwQlgsTUFBTSxPQUFPLHlCQUF5QixHQUFlLENBQUMsY0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IGNvbnN0IElOSVQgPSAnQG5ncngvc3RvcmUvaW5pdCcgYXMgJ0BuZ3J4L3N0b3JlL2luaXQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWN0aW9uc1N1YmplY3QgZXh0ZW5kcyBCZWhhdmlvclN1YmplY3Q8QWN0aW9uPlxuICBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHsgdHlwZTogSU5JVCB9KTtcbiAgfVxuXG4gIG5leHQoYWN0aW9uOiBBY3Rpb24pOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEFjdGlvbnMgbXVzdCBiZSBvYmplY3RzYCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYWN0aW9uLnR5cGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBY3Rpb25zIG11c3QgaGF2ZSBhIHR5cGUgcHJvcGVydHlgKTtcbiAgICB9XG5cbiAgICBzdXBlci5uZXh0KGFjdGlvbik7XG4gIH1cblxuICBjb21wbGV0ZSgpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBzdXBlci5jb21wbGV0ZSgpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBBQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTOiBQcm92aWRlcltdID0gW0FjdGlvbnNTdWJqZWN0XTtcbiJdfQ==