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
 * A function that takes an `Action` and a `State`, and returns a `State`.
 * See `createReducer`.
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
    /**
     * Verifies if the state is serializable
     * @type {?}
     */
    RuntimeChecks.prototype.strictStateSerializability;
    /**
     * Verifies if the actions are serializable. Please note, you may not need to set it to `true` unless you are storing/replaying actions using external resources, for example `localStorage`.
     * @type {?}
     */
    RuntimeChecks.prototype.strictActionSerializability;
    /**
     * Verifies that the state isn't mutated
     * @type {?}
     */
    RuntimeChecks.prototype.strictStateImmutability;
    /**
     * Verifies that actions aren't mutated
     * @type {?}
     */
    RuntimeChecks.prototype.strictActionImmutability;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvbW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSw0QkFFQzs7O0lBREMsc0JBQWE7Ozs7Ozs7O0FBb0JmLG1DQUVDOzs7OztBQU1ELDBDQUtDOzs7OztBQU1ELGtDQU1DOzs7SUFMQywyQkFBWTs7SUFDWixnQ0FBdUQ7O0lBQ3ZELHNDQUEyQzs7SUFDM0Msb0NBQStCOztJQUMvQixvQ0FBbUM7OztBQWNyQyxNQUFNLE9BQU8sMkJBQTJCLEdBQ3RDLGlEQUFpRDs7OztBQWlDbkQsbUNBaUJDOzs7Ozs7SUFiQyxtREFBb0M7Ozs7O0lBSXBDLG9EQUFxQzs7Ozs7SUFJckMsZ0RBQWlDOzs7OztJQUlqQyxpREFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIEFjdGlvbiB7XG4gIHR5cGU6IHN0cmluZztcbn1cblxuLy8gZGVjbGFyZSB0byBtYWtlIGl0IHByb3BlcnR5LXJlbmFtaW5nIHNhZmVcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBUeXBlZEFjdGlvbjxUIGV4dGVuZHMgc3RyaW5nPiBleHRlbmRzIEFjdGlvbiB7XG4gIHJlYWRvbmx5IHR5cGU6IFQ7XG59XG5cbmV4cG9ydCB0eXBlIEFjdGlvblR5cGU8QT4gPSBBIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcjxpbmZlciBULCBpbmZlciBDPlxuICA/IFJldHVyblR5cGU8Qz4gJiB7IHR5cGU6IFQgfVxuICA6IG5ldmVyO1xuXG5leHBvcnQgdHlwZSBUeXBlSWQ8VD4gPSAoKSA9PiBUO1xuXG5leHBvcnQgdHlwZSBJbml0aWFsU3RhdGU8VD4gPSBQYXJ0aWFsPFQ+IHwgVHlwZUlkPFBhcnRpYWw8VD4+IHwgdm9pZDtcblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYW4gYEFjdGlvbmAgYW5kIGEgYFN0YXRlYCwgYW5kIHJldHVybnMgYSBgU3RhdGVgLlxuICogU2VlIGBjcmVhdGVSZWR1Y2VyYC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25SZWR1Y2VyPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+IHtcbiAgKHN0YXRlOiBUIHwgdW5kZWZpbmVkLCBhY3Rpb246IFYpOiBUO1xufVxuXG5leHBvcnQgdHlwZSBBY3Rpb25SZWR1Y2VyTWFwPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+ID0ge1xuICBbcCBpbiBrZXlvZiBUXTogQWN0aW9uUmVkdWNlcjxUW3BdLCBWPlxufTtcblxuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25SZWR1Y2VyRmFjdG9yeTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiB7XG4gIChcbiAgICByZWR1Y2VyTWFwOiBBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+LFxuICAgIGluaXRpYWxTdGF0ZT86IEluaXRpYWxTdGF0ZTxUPlxuICApOiBBY3Rpb25SZWR1Y2VyPFQsIFY+O1xufVxuXG5leHBvcnQgdHlwZSBNZXRhUmVkdWNlcjxUID0gYW55LCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiA9IChcbiAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxULCBWPlxuKSA9PiBBY3Rpb25SZWR1Y2VyPFQsIFY+O1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0b3JlRmVhdHVyZTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiB7XG4gIGtleTogc3RyaW5nO1xuICByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxULCBWPiB8IEFjdGlvblJlZHVjZXI8VCwgVj47XG4gIHJlZHVjZXJGYWN0b3J5OiBBY3Rpb25SZWR1Y2VyRmFjdG9yeTxULCBWPjtcbiAgaW5pdGlhbFN0YXRlPzogSW5pdGlhbFN0YXRlPFQ+O1xuICBtZXRhUmVkdWNlcnM/OiBNZXRhUmVkdWNlcjxULCBWPltdO1xufVxuXG5leHBvcnQgdHlwZSBTZWxlY3RvcjxULCBWPiA9IChzdGF0ZTogVCkgPT4gVjtcblxuZXhwb3J0IHR5cGUgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+ID0gKFxuICBzdGF0ZTogU3RhdGUsXG4gIHByb3BzOiBQcm9wc1xuKSA9PiBSZXN1bHQ7XG5cbmV4cG9ydCB0eXBlIERpc2FsbG93VHlwZVByb3BlcnR5PFQ+ID0gVCBleHRlbmRzIHsgdHlwZTogYW55IH1cbiAgPyBUeXBlUHJvcGVydHlJc05vdEFsbG93ZWRcbiAgOiBUO1xuXG5leHBvcnQgY29uc3QgdHlwZVByb3BlcnR5SXNOb3RBbGxvd2VkTXNnID1cbiAgJ3R5cGUgcHJvcGVydHkgaXMgbm90IGFsbG93ZWQgaW4gYWN0aW9uIGNyZWF0b3JzJztcbnR5cGUgVHlwZVByb3BlcnR5SXNOb3RBbGxvd2VkID0gdHlwZW9mIHR5cGVQcm9wZXJ0eUlzTm90QWxsb3dlZE1zZztcblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBvYmplY3QgaW4gdGhlIHNoYXBlIG9mIHRoZSBgQWN0aW9uYCBpbnRlcmZhY2UuICBDb25maWd1cmVkIHVzaW5nIGBjcmVhdGVBY3Rpb25gLlxuICovXG5leHBvcnQgdHlwZSBDcmVhdG9yPFxuICBQIGV4dGVuZHMgYW55W10gPSBhbnlbXSxcbiAgUiBleHRlbmRzIG9iamVjdCA9IG9iamVjdFxuPiA9IFIgZXh0ZW5kcyB7IHR5cGU6IGFueSB9XG4gID8gVHlwZVByb3BlcnR5SXNOb3RBbGxvd2VkXG4gIDogRnVuY3Rpb25XaXRoUGFyYW1ldGVyc1R5cGU8UCwgUj47XG5cbmV4cG9ydCB0eXBlIFByb3BzUmV0dXJuVHlwZTxUIGV4dGVuZHMgb2JqZWN0PiA9IFQgZXh0ZW5kcyB7IHR5cGU6IGFueSB9XG4gID8gVHlwZVByb3BlcnR5SXNOb3RBbGxvd2VkXG4gIDogeyBfYXM6ICdwcm9wcyc7IF9wOiBUIH07XG5cbi8qKlxuICogU2VlIGBDcmVhdG9yYC5cbiAqL1xuZXhwb3J0IHR5cGUgQWN0aW9uQ3JlYXRvcjxcbiAgVCBleHRlbmRzIHN0cmluZyA9IHN0cmluZyxcbiAgQyBleHRlbmRzIENyZWF0b3IgPSBDcmVhdG9yXG4+ID0gQyAmIFR5cGVkQWN0aW9uPFQ+O1xuXG5leHBvcnQgdHlwZSBGdW5jdGlvbldpdGhQYXJhbWV0ZXJzVHlwZTxQIGV4dGVuZHMgdW5rbm93bltdLCBSID0gdm9pZD4gPSAoXG4gIC4uLmFyZ3M6IFBcbikgPT4gUjtcblxuZXhwb3J0IHR5cGUgUGFyYW1ldGVyc1R5cGU8VD4gPSBUIGV4dGVuZHMgKC4uLmFyZ3M6IGluZmVyIFUpID0+IHVua25vd25cbiAgPyBVXG4gIDogbmV2ZXI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUnVudGltZUNoZWNrcyB7XG4gIC8qKlxuICAgKiBWZXJpZmllcyBpZiB0aGUgc3RhdGUgaXMgc2VyaWFsaXphYmxlXG4gICAqL1xuICBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFZlcmlmaWVzIGlmIHRoZSBhY3Rpb25zIGFyZSBzZXJpYWxpemFibGUuIFBsZWFzZSBub3RlLCB5b3UgbWF5IG5vdCBuZWVkIHRvIHNldCBpdCB0byBgdHJ1ZWAgdW5sZXNzIHlvdSBhcmUgc3RvcmluZy9yZXBsYXlpbmcgYWN0aW9ucyB1c2luZyBleHRlcm5hbCByZXNvdXJjZXMsIGZvciBleGFtcGxlIGBsb2NhbFN0b3JhZ2VgLlxuICAgKi9cbiAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5OiBib29sZWFuO1xuICAvKipcbiAgICogVmVyaWZpZXMgdGhhdCB0aGUgc3RhdGUgaXNuJ3QgbXV0YXRlZFxuICAgKi9cbiAgc3RyaWN0U3RhdGVJbW11dGFiaWxpdHk6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBWZXJpZmllcyB0aGF0IGFjdGlvbnMgYXJlbid0IG11dGF0ZWRcbiAgICovXG4gIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eTogYm9vbGVhbjtcbn1cbiJdfQ==