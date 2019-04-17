/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function Action() { }
if (false) {
    /** @type {?} */
    Action.prototype.type;
}
/**
 * @record
 * @template T, V
 */
export function ActionReducer() { }
/**
 * @record
 * @template T, V
 */
export function ActionReducerFactory() { }
/**
 * @record
 * @template T, V
 */
export function StoreFeature() { }
if (false) {
    /** @type {?} */
    StoreFeature.prototype.key;
    /** @type {?} */
    StoreFeature.prototype.reducers;
    /** @type {?} */
    StoreFeature.prototype.reducerFactory;
    /** @type {?|undefined} */
    StoreFeature.prototype.initialState;
    /** @type {?|undefined} */
    StoreFeature.prototype.metaReducers;
}
/**
 * @record
 */
export function RuntimeChecks() { }
if (false) {
    /** @type {?} */
    RuntimeChecks.prototype.strictStateSerializability;
    /** @type {?} */
    RuntimeChecks.prototype.strictActionSerializability;
    /** @type {?} */
    RuntimeChecks.prototype.strictImmutability;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvbW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSw0QkFFQzs7O0lBREMsc0JBQWE7Ozs7OztBQWdCZixtQ0FFQzs7Ozs7QUFNRCwwQ0FLQzs7Ozs7QUFNRCxrQ0FNQzs7O0lBTEMsMkJBQVk7O0lBQ1osZ0NBQXVEOztJQUN2RCxzQ0FBMkM7O0lBQzNDLG9DQUErQjs7SUFDL0Isb0NBQW1DOzs7OztBQXdCckMsbUNBSUM7OztJQUhDLG1EQUFvQzs7SUFDcEMsb0RBQXFDOztJQUNyQywyQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIEFjdGlvbiB7XG4gIHR5cGU6IHN0cmluZztcbn1cblxuLy8gZGVjbGFyZSB0byBtYWtlIGl0IHByb3BlcnR5LXJlbmFtaW5nIHNhZmVcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBUeXBlZEFjdGlvbjxUIGV4dGVuZHMgc3RyaW5nPiBleHRlbmRzIEFjdGlvbiB7XG4gIHJlYWRvbmx5IHR5cGU6IFQ7XG59XG5cbmV4cG9ydCB0eXBlIEFjdGlvblR5cGU8QT4gPSBBIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcjxpbmZlciBULCBpbmZlciBDPlxuICA/IFJldHVyblR5cGU8Qz4gJiB7IHR5cGU6IFQgfVxuICA6IG5ldmVyO1xuXG5leHBvcnQgdHlwZSBUeXBlSWQ8VD4gPSAoKSA9PiBUO1xuXG5leHBvcnQgdHlwZSBJbml0aWFsU3RhdGU8VD4gPSBQYXJ0aWFsPFQ+IHwgVHlwZUlkPFBhcnRpYWw8VD4+IHwgdm9pZDtcblxuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25SZWR1Y2VyPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+IHtcbiAgKHN0YXRlOiBUIHwgdW5kZWZpbmVkLCBhY3Rpb246IFYpOiBUO1xufVxuXG5leHBvcnQgdHlwZSBBY3Rpb25SZWR1Y2VyTWFwPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+ID0ge1xuICBbcCBpbiBrZXlvZiBUXTogQWN0aW9uUmVkdWNlcjxUW3BdLCBWPlxufTtcblxuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25SZWR1Y2VyRmFjdG9yeTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiB7XG4gIChcbiAgICByZWR1Y2VyTWFwOiBBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+LFxuICAgIGluaXRpYWxTdGF0ZT86IEluaXRpYWxTdGF0ZTxUPlxuICApOiBBY3Rpb25SZWR1Y2VyPFQsIFY+O1xufVxuXG5leHBvcnQgdHlwZSBNZXRhUmVkdWNlcjxUID0gYW55LCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiA9IChcbiAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxULCBWPlxuKSA9PiBBY3Rpb25SZWR1Y2VyPFQsIFY+O1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0b3JlRmVhdHVyZTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiB7XG4gIGtleTogc3RyaW5nO1xuICByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxULCBWPiB8IEFjdGlvblJlZHVjZXI8VCwgVj47XG4gIHJlZHVjZXJGYWN0b3J5OiBBY3Rpb25SZWR1Y2VyRmFjdG9yeTxULCBWPjtcbiAgaW5pdGlhbFN0YXRlPzogSW5pdGlhbFN0YXRlPFQ+O1xuICBtZXRhUmVkdWNlcnM/OiBNZXRhUmVkdWNlcjxULCBWPltdO1xufVxuXG5leHBvcnQgdHlwZSBTZWxlY3RvcjxULCBWPiA9IChzdGF0ZTogVCkgPT4gVjtcblxuZXhwb3J0IHR5cGUgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+ID0gKFxuICBzdGF0ZTogU3RhdGUsXG4gIHByb3BzOiBQcm9wc1xuKSA9PiBSZXN1bHQ7XG5cbmV4cG9ydCB0eXBlIENyZWF0b3IgPSAoLi4uYXJnczogYW55W10pID0+IG9iamVjdDtcblxuZXhwb3J0IHR5cGUgQWN0aW9uQ3JlYXRvcjxcbiAgVCBleHRlbmRzIHN0cmluZyA9IHN0cmluZyxcbiAgQyBleHRlbmRzIENyZWF0b3IgPSBDcmVhdG9yXG4+ID0gQyAmIFR5cGVkQWN0aW9uPFQ+O1xuXG5leHBvcnQgdHlwZSBGdW5jdGlvbldpdGhQYXJhbWV0ZXJzVHlwZTxQIGV4dGVuZHMgdW5rbm93bltdLCBSID0gdm9pZD4gPSAoXG4gIC4uLmFyZ3M6IFBcbikgPT4gUjtcblxuZXhwb3J0IHR5cGUgUGFyYW1ldGVyc1R5cGU8VD4gPSBUIGV4dGVuZHMgKC4uLmFyZ3M6IGluZmVyIFUpID0+IHVua25vd25cbiAgPyBVXG4gIDogbmV2ZXI7XG5leHBvcnQgaW50ZXJmYWNlIFJ1bnRpbWVDaGVja3Mge1xuICBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eTogYm9vbGVhbjtcbiAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5OiBib29sZWFuO1xuICBzdHJpY3RJbW11dGFiaWxpdHk6IGJvb2xlYW47XG59XG4iXX0=