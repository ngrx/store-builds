/**
 * @fileoverview added by tsickle
 * Generated from: src/models.ts
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
/** @type {?} */
export const emptyObjectsAreNotAllowedMsg = 'empty objects are not allowed in action creators';
/**
 * @record
 * @template T
 */
export function ActionCreatorProps() { }
if (false) {
    /** @type {?} */
    ActionCreatorProps.prototype._as;
    /** @type {?} */
    ActionCreatorProps.prototype._p;
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
    /**
     * Verifies that action types are not registered more than once
     * @type {?|undefined}
     */
    RuntimeChecks.prototype.strictActionTypeUniqueness;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsNEJBRUM7OztJQURDLHNCQUFhOzs7Ozs7OztBQW9CZixtQ0FFQzs7Ozs7QUFNRCwwQ0FLQzs7Ozs7QUFNRCxrQ0FNQzs7O0lBTEMsMkJBQVk7O0lBQ1osZ0NBQXVEOztJQUN2RCxzQ0FBMkM7O0lBQzNDLG9DQUErQjs7SUFDL0Isb0NBQW1DOzs7QUFVckMsTUFBTSxPQUFPLHNCQUFzQixHQUNqQywyQ0FBMkM7O0FBRzdDLE1BQU0sT0FBTywyQkFBMkIsR0FDdEMsaURBQWlEOztBQUduRCxNQUFNLE9BQU8sNEJBQTRCLEdBQ3ZDLGtEQUFrRDs7Ozs7QUErQnBELHdDQUdDOzs7SUFGQyxpQ0FBYTs7SUFDYixnQ0FBTTs7Ozs7QUFXUixtQ0EyQkM7Ozs7OztJQXZCQyxtREFBb0M7Ozs7O0lBSXBDLG9EQUFxQzs7Ozs7SUFJckMsZ0RBQWlDOzs7OztJQUlqQyxpREFBa0M7Ozs7O0lBS2xDLGlEQUFrQzs7Ozs7SUFLbEMsbURBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBBY3Rpb24ge1xuICB0eXBlOiBzdHJpbmc7XG59XG5cbi8vIGRlY2xhcmUgdG8gbWFrZSBpdCBwcm9wZXJ0eS1yZW5hbWluZyBzYWZlXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgVHlwZWRBY3Rpb248VCBleHRlbmRzIHN0cmluZz4gZXh0ZW5kcyBBY3Rpb24ge1xuICByZWFkb25seSB0eXBlOiBUO1xufVxuXG5leHBvcnQgdHlwZSBBY3Rpb25UeXBlPEE+ID0gQSBleHRlbmRzIEFjdGlvbkNyZWF0b3I8aW5mZXIgVCwgaW5mZXIgQz5cbiAgPyBSZXR1cm5UeXBlPEM+ICYgeyB0eXBlOiBUIH1cbiAgOiBuZXZlcjtcblxuZXhwb3J0IHR5cGUgVHlwZUlkPFQ+ID0gKCkgPT4gVDtcblxuZXhwb3J0IHR5cGUgSW5pdGlhbFN0YXRlPFQ+ID0gUGFydGlhbDxUPiB8IFR5cGVJZDxQYXJ0aWFsPFQ+PiB8IHZvaWQ7XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IHRha2VzIGFuIGBBY3Rpb25gIGFuZCBhIGBTdGF0ZWAsIGFuZCByZXR1cm5zIGEgYFN0YXRlYC5cbiAqIFNlZSBgY3JlYXRlUmVkdWNlcmAuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uUmVkdWNlcjxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiB7XG4gIChzdGF0ZTogVCB8IHVuZGVmaW5lZCwgYWN0aW9uOiBWKTogVDtcbn1cblxuZXhwb3J0IHR5cGUgQWN0aW9uUmVkdWNlck1hcDxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiA9IHtcbiAgW3AgaW4ga2V5b2YgVF06IEFjdGlvblJlZHVjZXI8VFtwXSwgVj47XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvblJlZHVjZXJGYWN0b3J5PFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+IHtcbiAgKFxuICAgIHJlZHVjZXJNYXA6IEFjdGlvblJlZHVjZXJNYXA8VCwgVj4sXG4gICAgaW5pdGlhbFN0YXRlPzogSW5pdGlhbFN0YXRlPFQ+XG4gICk6IEFjdGlvblJlZHVjZXI8VCwgVj47XG59XG5cbmV4cG9ydCB0eXBlIE1ldGFSZWR1Y2VyPFQgPSBhbnksIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+ID0gKFxuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFQsIFY+XG4pID0+IEFjdGlvblJlZHVjZXI8VCwgVj47XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RvcmVGZWF0dXJlPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+IHtcbiAga2V5OiBzdHJpbmc7XG4gIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+IHwgQWN0aW9uUmVkdWNlcjxULCBWPjtcbiAgcmVkdWNlckZhY3Rvcnk6IEFjdGlvblJlZHVjZXJGYWN0b3J5PFQsIFY+O1xuICBpbml0aWFsU3RhdGU/OiBJbml0aWFsU3RhdGU8VD47XG4gIG1ldGFSZWR1Y2Vycz86IE1ldGFSZWR1Y2VyPFQsIFY+W107XG59XG5cbmV4cG9ydCB0eXBlIFNlbGVjdG9yPFQsIFY+ID0gKHN0YXRlOiBUKSA9PiBWO1xuXG5leHBvcnQgdHlwZSBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD4gPSAoXG4gIHN0YXRlOiBTdGF0ZSxcbiAgcHJvcHM6IFByb3BzXG4pID0+IFJlc3VsdDtcblxuZXhwb3J0IGNvbnN0IGFycmF5c0FyZU5vdEFsbG93ZWRNc2cgPVxuICAnYXJyYXlzIGFyZSBub3QgYWxsb3dlZCBpbiBhY3Rpb24gY3JlYXRvcnMnO1xudHlwZSBBcnJheXNBcmVOb3RBbGxvd2VkID0gdHlwZW9mIGFycmF5c0FyZU5vdEFsbG93ZWRNc2c7XG5cbmV4cG9ydCBjb25zdCB0eXBlUHJvcGVydHlJc05vdEFsbG93ZWRNc2cgPVxuICAndHlwZSBwcm9wZXJ0eSBpcyBub3QgYWxsb3dlZCBpbiBhY3Rpb24gY3JlYXRvcnMnO1xudHlwZSBUeXBlUHJvcGVydHlJc05vdEFsbG93ZWQgPSB0eXBlb2YgdHlwZVByb3BlcnR5SXNOb3RBbGxvd2VkTXNnO1xuXG5leHBvcnQgY29uc3QgZW1wdHlPYmplY3RzQXJlTm90QWxsb3dlZE1zZyA9XG4gICdlbXB0eSBvYmplY3RzIGFyZSBub3QgYWxsb3dlZCBpbiBhY3Rpb24gY3JlYXRvcnMnO1xudHlwZSBFbXB0eU9iamVjdHNBcmVOb3RBbGxvd2VkID0gdHlwZW9mIGVtcHR5T2JqZWN0c0FyZU5vdEFsbG93ZWRNc2c7XG5cbmV4cG9ydCB0eXBlIEZ1bmN0aW9uSXNOb3RBbGxvd2VkPFxuICBULFxuICBFcnJvck1lc3NhZ2UgZXh0ZW5kcyBzdHJpbmdcbj4gPSBUIGV4dGVuZHMgRnVuY3Rpb24gPyBFcnJvck1lc3NhZ2UgOiBUO1xuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBvYmplY3QgaW4gdGhlIHNoYXBlIG9mIHRoZSBgQWN0aW9uYCBpbnRlcmZhY2UuICBDb25maWd1cmVkIHVzaW5nIGBjcmVhdGVBY3Rpb25gLlxuICovXG5leHBvcnQgdHlwZSBDcmVhdG9yPFxuICBQIGV4dGVuZHMgYW55W10gPSBhbnlbXSxcbiAgUiBleHRlbmRzIG9iamVjdCA9IG9iamVjdFxuPiA9IEZ1bmN0aW9uV2l0aFBhcmFtZXRlcnNUeXBlPFAsIFI+O1xuXG5leHBvcnQgdHlwZSBOb3RBbGxvd2VkQ2hlY2s8VCBleHRlbmRzIG9iamVjdD4gPSBUIGV4dGVuZHMgYW55W11cbiAgPyBBcnJheXNBcmVOb3RBbGxvd2VkXG4gIDogVCBleHRlbmRzIHsgdHlwZTogYW55IH1cbiAgPyBUeXBlUHJvcGVydHlJc05vdEFsbG93ZWRcbiAgOiBrZXlvZiBUIGV4dGVuZHMgbmV2ZXJcbiAgPyBFbXB0eU9iamVjdHNBcmVOb3RBbGxvd2VkXG4gIDogdW5rbm93bjtcblxuLyoqXG4gKiBTZWUgYENyZWF0b3JgLlxuICovXG5leHBvcnQgdHlwZSBBY3Rpb25DcmVhdG9yPFxuICBUIGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nLFxuICBDIGV4dGVuZHMgQ3JlYXRvciA9IENyZWF0b3Jcbj4gPSBDICYgVHlwZWRBY3Rpb248VD47XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uQ3JlYXRvclByb3BzPFQ+IHtcbiAgX2FzOiAncHJvcHMnO1xuICBfcDogVDtcbn1cblxuZXhwb3J0IHR5cGUgRnVuY3Rpb25XaXRoUGFyYW1ldGVyc1R5cGU8UCBleHRlbmRzIHVua25vd25bXSwgUiA9IHZvaWQ+ID0gKFxuICAuLi5hcmdzOiBQXG4pID0+IFI7XG5cbmV4cG9ydCB0eXBlIFBhcmFtZXRlcnNUeXBlPFQ+ID0gVCBleHRlbmRzICguLi5hcmdzOiBpbmZlciBVKSA9PiB1bmtub3duXG4gID8gVVxuICA6IG5ldmVyO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJ1bnRpbWVDaGVja3Mge1xuICAvKipcbiAgICogVmVyaWZpZXMgaWYgdGhlIHN0YXRlIGlzIHNlcmlhbGl6YWJsZVxuICAgKi9cbiAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHk6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBWZXJpZmllcyBpZiB0aGUgYWN0aW9ucyBhcmUgc2VyaWFsaXphYmxlLiBQbGVhc2Ugbm90ZSwgeW91IG1heSBub3QgbmVlZCB0byBzZXQgaXQgdG8gYHRydWVgIHVubGVzcyB5b3UgYXJlIHN0b3JpbmcvcmVwbGF5aW5nIGFjdGlvbnMgdXNpbmcgZXh0ZXJuYWwgcmVzb3VyY2VzLCBmb3IgZXhhbXBsZSBgbG9jYWxTdG9yYWdlYC5cbiAgICovXG4gIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFZlcmlmaWVzIHRoYXQgdGhlIHN0YXRlIGlzbid0IG11dGF0ZWRcbiAgICovXG4gIHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5OiBib29sZWFuO1xuICAvKipcbiAgICogVmVyaWZpZXMgdGhhdCBhY3Rpb25zIGFyZW4ndCBtdXRhdGVkXG4gICAqL1xuICBzdHJpY3RBY3Rpb25JbW11dGFiaWxpdHk6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHRoYXQgYWN0aW9ucyBhcmUgZGlzcGF0Y2hlZCB3aXRoaW4gTmdab25lXG4gICAqL1xuICBzdHJpY3RBY3Rpb25XaXRoaW5OZ1pvbmU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHRoYXQgYWN0aW9uIHR5cGVzIGFyZSBub3QgcmVnaXN0ZXJlZCBtb3JlIHRoYW4gb25jZVxuICAgKi9cbiAgc3RyaWN0QWN0aW9uVHlwZVVuaXF1ZW5lc3M/OiBib29sZWFuO1xufVxuIl19