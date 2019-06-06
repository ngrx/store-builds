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
/** @type {?} */
export const typePropertyIsNotAllowedMsg = 'type property is not allowed in action creators';
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
    RuntimeChecks.prototype.strictStateImmutability;
    /** @type {?} */
    RuntimeChecks.prototype.strictActionImmutability;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvbW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSw0QkFFQzs7O0lBREMsc0JBQWE7Ozs7OztBQWdCZixtQ0FFQzs7Ozs7QUFNRCwwQ0FLQzs7Ozs7QUFNRCxrQ0FNQzs7O0lBTEMsMkJBQVk7O0lBQ1osZ0NBQXVEOztJQUN2RCxzQ0FBMkM7O0lBQzNDLG9DQUErQjs7SUFDL0Isb0NBQW1DOzs7QUFjckMsTUFBTSxPQUFPLDJCQUEyQixHQUN0QyxpREFBaUQ7Ozs7QUEyQm5ELG1DQUtDOzs7SUFKQyxtREFBb0M7O0lBQ3BDLG9EQUFxQzs7SUFDckMsZ0RBQWlDOztJQUNqQyxpREFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIEFjdGlvbiB7XG4gIHR5cGU6IHN0cmluZztcbn1cblxuLy8gZGVjbGFyZSB0byBtYWtlIGl0IHByb3BlcnR5LXJlbmFtaW5nIHNhZmVcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBUeXBlZEFjdGlvbjxUIGV4dGVuZHMgc3RyaW5nPiBleHRlbmRzIEFjdGlvbiB7XG4gIHJlYWRvbmx5IHR5cGU6IFQ7XG59XG5cbmV4cG9ydCB0eXBlIEFjdGlvblR5cGU8QT4gPSBBIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcjxpbmZlciBULCBpbmZlciBDPlxuICA/IFJldHVyblR5cGU8Qz4gJiB7IHR5cGU6IFQgfVxuICA6IG5ldmVyO1xuXG5leHBvcnQgdHlwZSBUeXBlSWQ8VD4gPSAoKSA9PiBUO1xuXG5leHBvcnQgdHlwZSBJbml0aWFsU3RhdGU8VD4gPSBQYXJ0aWFsPFQ+IHwgVHlwZUlkPFBhcnRpYWw8VD4+IHwgdm9pZDtcblxuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25SZWR1Y2VyPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+IHtcbiAgKHN0YXRlOiBUIHwgdW5kZWZpbmVkLCBhY3Rpb246IFYpOiBUO1xufVxuXG5leHBvcnQgdHlwZSBBY3Rpb25SZWR1Y2VyTWFwPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+ID0ge1xuICBbcCBpbiBrZXlvZiBUXTogQWN0aW9uUmVkdWNlcjxUW3BdLCBWPlxufTtcblxuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25SZWR1Y2VyRmFjdG9yeTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiB7XG4gIChcbiAgICByZWR1Y2VyTWFwOiBBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+LFxuICAgIGluaXRpYWxTdGF0ZT86IEluaXRpYWxTdGF0ZTxUPlxuICApOiBBY3Rpb25SZWR1Y2VyPFQsIFY+O1xufVxuXG5leHBvcnQgdHlwZSBNZXRhUmVkdWNlcjxUID0gYW55LCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiA9IChcbiAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxULCBWPlxuKSA9PiBBY3Rpb25SZWR1Y2VyPFQsIFY+O1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0b3JlRmVhdHVyZTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiB7XG4gIGtleTogc3RyaW5nO1xuICByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxULCBWPiB8IEFjdGlvblJlZHVjZXI8VCwgVj47XG4gIHJlZHVjZXJGYWN0b3J5OiBBY3Rpb25SZWR1Y2VyRmFjdG9yeTxULCBWPjtcbiAgaW5pdGlhbFN0YXRlPzogSW5pdGlhbFN0YXRlPFQ+O1xuICBtZXRhUmVkdWNlcnM/OiBNZXRhUmVkdWNlcjxULCBWPltdO1xufVxuXG5leHBvcnQgdHlwZSBTZWxlY3RvcjxULCBWPiA9IChzdGF0ZTogVCkgPT4gVjtcblxuZXhwb3J0IHR5cGUgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+ID0gKFxuICBzdGF0ZTogU3RhdGUsXG4gIHByb3BzOiBQcm9wc1xuKSA9PiBSZXN1bHQ7XG5cbmV4cG9ydCB0eXBlIERpc2FsbG93VHlwZVByb3BlcnR5PFQ+ID0gVCBleHRlbmRzIHsgdHlwZTogYW55IH1cbiAgPyBUeXBlUHJvcGVydHlJc05vdEFsbG93ZWRcbiAgOiBUO1xuXG5leHBvcnQgY29uc3QgdHlwZVByb3BlcnR5SXNOb3RBbGxvd2VkTXNnID1cbiAgJ3R5cGUgcHJvcGVydHkgaXMgbm90IGFsbG93ZWQgaW4gYWN0aW9uIGNyZWF0b3JzJztcbnR5cGUgVHlwZVByb3BlcnR5SXNOb3RBbGxvd2VkID0gdHlwZW9mIHR5cGVQcm9wZXJ0eUlzTm90QWxsb3dlZE1zZztcblxuZXhwb3J0IHR5cGUgQ3JlYXRvcjxcbiAgUCBleHRlbmRzIGFueVtdID0gYW55W10sXG4gIFIgZXh0ZW5kcyBvYmplY3QgPSBvYmplY3Rcbj4gPSBSIGV4dGVuZHMgeyB0eXBlOiBhbnkgfVxuICA/IFR5cGVQcm9wZXJ0eUlzTm90QWxsb3dlZFxuICA6IEZ1bmN0aW9uV2l0aFBhcmFtZXRlcnNUeXBlPFAsIFI+O1xuXG5leHBvcnQgdHlwZSBQcm9wc1JldHVyblR5cGU8VCBleHRlbmRzIG9iamVjdD4gPSBUIGV4dGVuZHMgeyB0eXBlOiBhbnkgfVxuICA/IFR5cGVQcm9wZXJ0eUlzTm90QWxsb3dlZFxuICA6IHsgX2FzOiAncHJvcHMnOyBfcDogVCB9O1xuXG5leHBvcnQgdHlwZSBBY3Rpb25DcmVhdG9yPFxuICBUIGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nLFxuICBDIGV4dGVuZHMgQ3JlYXRvciA9IENyZWF0b3Jcbj4gPSBDICYgVHlwZWRBY3Rpb248VD47XG5cbmV4cG9ydCB0eXBlIEZ1bmN0aW9uV2l0aFBhcmFtZXRlcnNUeXBlPFAgZXh0ZW5kcyB1bmtub3duW10sIFIgPSB2b2lkPiA9IChcbiAgLi4uYXJnczogUFxuKSA9PiBSO1xuXG5leHBvcnQgdHlwZSBQYXJhbWV0ZXJzVHlwZTxUPiA9IFQgZXh0ZW5kcyAoLi4uYXJnczogaW5mZXIgVSkgPT4gdW5rbm93blxuICA/IFVcbiAgOiBuZXZlcjtcblxuZXhwb3J0IGludGVyZmFjZSBSdW50aW1lQ2hlY2tzIHtcbiAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHk6IGJvb2xlYW47XG4gIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eTogYm9vbGVhbjtcbiAgc3RyaWN0U3RhdGVJbW11dGFiaWxpdHk6IGJvb2xlYW47XG4gIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eTogYm9vbGVhbjtcbn1cbiJdfQ==