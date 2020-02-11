/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/src/models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
export const arraysAreNotAllowedMsg = 'arrays are not allowed in action creators';
/** @type {?} */
export const typePropertyIsNotAllowedMsg = 'type property is not allowed in action creators';
/**
 * @record
 * @template T
 */
export function Props() { }
if (false) {
    /** @type {?} */
    Props.prototype._as;
    /** @type {?} */
    Props.prototype._p;
}
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
    /**
     * Verifies that actions are dispatched within NgZone
     * @type {?}
     */
    RuntimeChecks.prototype.strictActionWithinNgZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvbW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsNEJBRUM7OztJQURDLHNCQUFhOzs7Ozs7OztBQW9CZixtQ0FFQzs7Ozs7QUFNRCwwQ0FLQzs7Ozs7QUFNRCxrQ0FNQzs7O0lBTEMsMkJBQVk7O0lBQ1osZ0NBQXVEOztJQUN2RCxzQ0FBMkM7O0lBQzNDLG9DQUErQjs7SUFDL0Isb0NBQW1DOzs7QUFVckMsTUFBTSxPQUFPLHNCQUFzQixHQUNqQywyQ0FBMkM7O0FBRzdDLE1BQU0sT0FBTywyQkFBMkIsR0FDdEMsaURBQWlEOzs7OztBQTJCbkQsMkJBR0M7OztJQUZDLG9CQUFhOztJQUNiLG1CQUFNOzs7OztBQVdSLG1DQXNCQzs7Ozs7O0lBbEJDLG1EQUFvQzs7Ozs7SUFJcEMsb0RBQXFDOzs7OztJQUlyQyxnREFBaUM7Ozs7O0lBSWpDLGlEQUFrQzs7Ozs7SUFLbEMsaURBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBBY3Rpb24ge1xuICB0eXBlOiBzdHJpbmc7XG59XG5cbi8vIGRlY2xhcmUgdG8gbWFrZSBpdCBwcm9wZXJ0eS1yZW5hbWluZyBzYWZlXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgVHlwZWRBY3Rpb248VCBleHRlbmRzIHN0cmluZz4gZXh0ZW5kcyBBY3Rpb24ge1xuICByZWFkb25seSB0eXBlOiBUO1xufVxuXG5leHBvcnQgdHlwZSBBY3Rpb25UeXBlPEE+ID0gQSBleHRlbmRzIEFjdGlvbkNyZWF0b3I8aW5mZXIgVCwgaW5mZXIgQz5cbiAgPyBSZXR1cm5UeXBlPEM+ICYgeyB0eXBlOiBUIH1cbiAgOiBuZXZlcjtcblxuZXhwb3J0IHR5cGUgVHlwZUlkPFQ+ID0gKCkgPT4gVDtcblxuZXhwb3J0IHR5cGUgSW5pdGlhbFN0YXRlPFQ+ID0gUGFydGlhbDxUPiB8IFR5cGVJZDxQYXJ0aWFsPFQ+PiB8IHZvaWQ7XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IHRha2VzIGFuIGBBY3Rpb25gIGFuZCBhIGBTdGF0ZWAsIGFuZCByZXR1cm5zIGEgYFN0YXRlYC5cbiAqIFNlZSBgY3JlYXRlUmVkdWNlcmAuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uUmVkdWNlcjxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiB7XG4gIChzdGF0ZTogVCB8IHVuZGVmaW5lZCwgYWN0aW9uOiBWKTogVDtcbn1cblxuZXhwb3J0IHR5cGUgQWN0aW9uUmVkdWNlck1hcDxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiA9IHtcbiAgW3AgaW4ga2V5b2YgVF06IEFjdGlvblJlZHVjZXI8VFtwXSwgVj5cbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uUmVkdWNlckZhY3Rvcnk8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4ge1xuICAoXG4gICAgcmVkdWNlck1hcDogQWN0aW9uUmVkdWNlck1hcDxULCBWPixcbiAgICBpbml0aWFsU3RhdGU/OiBJbml0aWFsU3RhdGU8VD5cbiAgKTogQWN0aW9uUmVkdWNlcjxULCBWPjtcbn1cblxuZXhwb3J0IHR5cGUgTWV0YVJlZHVjZXI8VCA9IGFueSwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4gPSAoXG4gIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8VCwgVj5cbikgPT4gQWN0aW9uUmVkdWNlcjxULCBWPjtcblxuZXhwb3J0IGludGVyZmFjZSBTdG9yZUZlYXR1cmU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4ge1xuICBrZXk6IHN0cmluZztcbiAgcmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8VCwgVj4gfCBBY3Rpb25SZWR1Y2VyPFQsIFY+O1xuICByZWR1Y2VyRmFjdG9yeTogQWN0aW9uUmVkdWNlckZhY3Rvcnk8VCwgVj47XG4gIGluaXRpYWxTdGF0ZT86IEluaXRpYWxTdGF0ZTxUPjtcbiAgbWV0YVJlZHVjZXJzPzogTWV0YVJlZHVjZXI8VCwgVj5bXTtcbn1cblxuZXhwb3J0IHR5cGUgU2VsZWN0b3I8VCwgVj4gPSAoc3RhdGU6IFQpID0+IFY7XG5cbmV4cG9ydCB0eXBlIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PiA9IChcbiAgc3RhdGU6IFN0YXRlLFxuICBwcm9wczogUHJvcHNcbikgPT4gUmVzdWx0O1xuXG5leHBvcnQgY29uc3QgYXJyYXlzQXJlTm90QWxsb3dlZE1zZyA9XG4gICdhcnJheXMgYXJlIG5vdCBhbGxvd2VkIGluIGFjdGlvbiBjcmVhdG9ycyc7XG50eXBlIEFycmF5c0FyZU5vdEFsbG93ZWQgPSB0eXBlb2YgYXJyYXlzQXJlTm90QWxsb3dlZE1zZztcblxuZXhwb3J0IGNvbnN0IHR5cGVQcm9wZXJ0eUlzTm90QWxsb3dlZE1zZyA9XG4gICd0eXBlIHByb3BlcnR5IGlzIG5vdCBhbGxvd2VkIGluIGFjdGlvbiBjcmVhdG9ycyc7XG50eXBlIFR5cGVQcm9wZXJ0eUlzTm90QWxsb3dlZCA9IHR5cGVvZiB0eXBlUHJvcGVydHlJc05vdEFsbG93ZWRNc2c7XG5cbmV4cG9ydCB0eXBlIEZ1bmN0aW9uSXNOb3RBbGxvd2VkPFxuICBULFxuICBFcnJvck1lc3NhZ2UgZXh0ZW5kcyBzdHJpbmdcbj4gPSBUIGV4dGVuZHMgRnVuY3Rpb24gPyBFcnJvck1lc3NhZ2UgOiBUO1xuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBvYmplY3QgaW4gdGhlIHNoYXBlIG9mIHRoZSBgQWN0aW9uYCBpbnRlcmZhY2UuICBDb25maWd1cmVkIHVzaW5nIGBjcmVhdGVBY3Rpb25gLlxuICovXG5leHBvcnQgdHlwZSBDcmVhdG9yPFxuICBQIGV4dGVuZHMgYW55W10gPSBhbnlbXSxcbiAgUiBleHRlbmRzIG9iamVjdCA9IG9iamVjdFxuPiA9IEZ1bmN0aW9uV2l0aFBhcmFtZXRlcnNUeXBlPFAsIFI+O1xuXG5leHBvcnQgdHlwZSBOb3RBbGxvd2VkQ2hlY2s8VCBleHRlbmRzIG9iamVjdD4gPSBUIGV4dGVuZHMgYW55W11cbiAgPyBBcnJheXNBcmVOb3RBbGxvd2VkXG4gIDogVCBleHRlbmRzIHsgdHlwZTogYW55IH0gPyBUeXBlUHJvcGVydHlJc05vdEFsbG93ZWQgOiB1bmtub3duO1xuXG4vKipcbiAqIFNlZSBgQ3JlYXRvcmAuXG4gKi9cbmV4cG9ydCB0eXBlIEFjdGlvbkNyZWF0b3I8XG4gIFQgZXh0ZW5kcyBzdHJpbmcgPSBzdHJpbmcsXG4gIEMgZXh0ZW5kcyBDcmVhdG9yID0gQ3JlYXRvclxuPiA9IEMgJiBUeXBlZEFjdGlvbjxUPjtcblxuZXhwb3J0IGludGVyZmFjZSBQcm9wczxUPiB7XG4gIF9hczogJ3Byb3BzJztcbiAgX3A6IFQ7XG59XG5cbmV4cG9ydCB0eXBlIEZ1bmN0aW9uV2l0aFBhcmFtZXRlcnNUeXBlPFAgZXh0ZW5kcyB1bmtub3duW10sIFIgPSB2b2lkPiA9IChcbiAgLi4uYXJnczogUFxuKSA9PiBSO1xuXG5leHBvcnQgdHlwZSBQYXJhbWV0ZXJzVHlwZTxUPiA9IFQgZXh0ZW5kcyAoLi4uYXJnczogaW5mZXIgVSkgPT4gdW5rbm93blxuICA/IFVcbiAgOiBuZXZlcjtcblxuZXhwb3J0IGludGVyZmFjZSBSdW50aW1lQ2hlY2tzIHtcbiAgLyoqXG4gICAqIFZlcmlmaWVzIGlmIHRoZSBzdGF0ZSBpcyBzZXJpYWxpemFibGVcbiAgICovXG4gIHN0cmljdFN0YXRlU2VyaWFsaXphYmlsaXR5OiBib29sZWFuO1xuICAvKipcbiAgICogVmVyaWZpZXMgaWYgdGhlIGFjdGlvbnMgYXJlIHNlcmlhbGl6YWJsZS4gUGxlYXNlIG5vdGUsIHlvdSBtYXkgbm90IG5lZWQgdG8gc2V0IGl0IHRvIGB0cnVlYCB1bmxlc3MgeW91IGFyZSBzdG9yaW5nL3JlcGxheWluZyBhY3Rpb25zIHVzaW5nIGV4dGVybmFsIHJlc291cmNlcywgZm9yIGV4YW1wbGUgYGxvY2FsU3RvcmFnZWAuXG4gICAqL1xuICBzdHJpY3RBY3Rpb25TZXJpYWxpemFiaWxpdHk6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBWZXJpZmllcyB0aGF0IHRoZSBzdGF0ZSBpc24ndCBtdXRhdGVkXG4gICAqL1xuICBzdHJpY3RTdGF0ZUltbXV0YWJpbGl0eTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFZlcmlmaWVzIHRoYXQgYWN0aW9ucyBhcmVuJ3QgbXV0YXRlZFxuICAgKi9cbiAgc3RyaWN0QWN0aW9uSW1tdXRhYmlsaXR5OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB0aGF0IGFjdGlvbnMgYXJlIGRpc3BhdGNoZWQgd2l0aGluIE5nWm9uZVxuICAgKi9cbiAgc3RyaWN0QWN0aW9uV2l0aGluTmdab25lOiBib29sZWFuO1xufVxuIl19