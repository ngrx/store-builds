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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvbW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsNEJBRUM7OztJQURDLHNCQUFhOzs7Ozs7OztBQW9CZixtQ0FFQzs7Ozs7QUFNRCwwQ0FLQzs7Ozs7QUFNRCxrQ0FNQzs7O0lBTEMsMkJBQVk7O0lBQ1osZ0NBQXVEOztJQUN2RCxzQ0FBMkM7O0lBQzNDLG9DQUErQjs7SUFDL0Isb0NBQW1DOzs7QUFVckMsTUFBTSxPQUFPLHNCQUFzQixHQUNqQywyQ0FBMkM7O0FBTzdDLE1BQU0sT0FBTywyQkFBMkIsR0FDdEMsaURBQWlEOzs7O0FBeUNuRCxtQ0FpQkM7Ozs7OztJQWJDLG1EQUFvQzs7Ozs7SUFJcEMsb0RBQXFDOzs7OztJQUlyQyxnREFBaUM7Ozs7O0lBSWpDLGlEQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uIHtcbiAgdHlwZTogc3RyaW5nO1xufVxuXG4vLyBkZWNsYXJlIHRvIG1ha2UgaXQgcHJvcGVydHktcmVuYW1pbmcgc2FmZVxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFR5cGVkQWN0aW9uPFQgZXh0ZW5kcyBzdHJpbmc+IGV4dGVuZHMgQWN0aW9uIHtcbiAgcmVhZG9ubHkgdHlwZTogVDtcbn1cblxuZXhwb3J0IHR5cGUgQWN0aW9uVHlwZTxBPiA9IEEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yPGluZmVyIFQsIGluZmVyIEM+XG4gID8gUmV0dXJuVHlwZTxDPiAmIHsgdHlwZTogVCB9XG4gIDogbmV2ZXI7XG5cbmV4cG9ydCB0eXBlIFR5cGVJZDxUPiA9ICgpID0+IFQ7XG5cbmV4cG9ydCB0eXBlIEluaXRpYWxTdGF0ZTxUPiA9IFBhcnRpYWw8VD4gfCBUeXBlSWQ8UGFydGlhbDxUPj4gfCB2b2lkO1xuXG4vKipcbiAqIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhbiBgQWN0aW9uYCBhbmQgYSBgU3RhdGVgLCBhbmQgcmV0dXJucyBhIGBTdGF0ZWAuXG4gKiBTZWUgYGNyZWF0ZVJlZHVjZXJgLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvblJlZHVjZXI8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4ge1xuICAoc3RhdGU6IFQgfCB1bmRlZmluZWQsIGFjdGlvbjogVik6IFQ7XG59XG5cbmV4cG9ydCB0eXBlIEFjdGlvblJlZHVjZXJNYXA8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4gPSB7XG4gIFtwIGluIGtleW9mIFRdOiBBY3Rpb25SZWR1Y2VyPFRbcF0sIFY+XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvblJlZHVjZXJGYWN0b3J5PFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+IHtcbiAgKFxuICAgIHJlZHVjZXJNYXA6IEFjdGlvblJlZHVjZXJNYXA8VCwgVj4sXG4gICAgaW5pdGlhbFN0YXRlPzogSW5pdGlhbFN0YXRlPFQ+XG4gICk6IEFjdGlvblJlZHVjZXI8VCwgVj47XG59XG5cbmV4cG9ydCB0eXBlIE1ldGFSZWR1Y2VyPFQgPSBhbnksIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+ID0gKFxuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFQsIFY+XG4pID0+IEFjdGlvblJlZHVjZXI8VCwgVj47XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RvcmVGZWF0dXJlPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+IHtcbiAga2V5OiBzdHJpbmc7XG4gIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+IHwgQWN0aW9uUmVkdWNlcjxULCBWPjtcbiAgcmVkdWNlckZhY3Rvcnk6IEFjdGlvblJlZHVjZXJGYWN0b3J5PFQsIFY+O1xuICBpbml0aWFsU3RhdGU/OiBJbml0aWFsU3RhdGU8VD47XG4gIG1ldGFSZWR1Y2Vycz86IE1ldGFSZWR1Y2VyPFQsIFY+W107XG59XG5cbmV4cG9ydCB0eXBlIFNlbGVjdG9yPFQsIFY+ID0gKHN0YXRlOiBUKSA9PiBWO1xuXG5leHBvcnQgdHlwZSBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD4gPSAoXG4gIHN0YXRlOiBTdGF0ZSxcbiAgcHJvcHM6IFByb3BzXG4pID0+IFJlc3VsdDtcblxuZXhwb3J0IGNvbnN0IGFycmF5c0FyZU5vdEFsbG93ZWRNc2cgPVxuICAnYXJyYXlzIGFyZSBub3QgYWxsb3dlZCBpbiBhY3Rpb24gY3JlYXRvcnMnO1xudHlwZSBBcnJheXNBcmVOb3RBbGxvd2VkID0gdHlwZW9mIGFycmF5c0FyZU5vdEFsbG93ZWRNc2c7XG5cbmV4cG9ydCB0eXBlIERpc2FsbG93QXJyYXlzQW5kVHlwZVByb3BlcnR5PFQ+ID0gVCBleHRlbmRzIGFueVtdXG4gID8gQXJyYXlzQXJlTm90QWxsb3dlZFxuICA6IFQgZXh0ZW5kcyB7IHR5cGU6IGFueSB9ID8gVHlwZVByb3BlcnR5SXNOb3RBbGxvd2VkIDogVDtcblxuZXhwb3J0IGNvbnN0IHR5cGVQcm9wZXJ0eUlzTm90QWxsb3dlZE1zZyA9XG4gICd0eXBlIHByb3BlcnR5IGlzIG5vdCBhbGxvd2VkIGluIGFjdGlvbiBjcmVhdG9ycyc7XG50eXBlIFR5cGVQcm9wZXJ0eUlzTm90QWxsb3dlZCA9IHR5cGVvZiB0eXBlUHJvcGVydHlJc05vdEFsbG93ZWRNc2c7XG5cbmV4cG9ydCB0eXBlIEZ1bmN0aW9uSXNOb3RBbGxvd2VkPFxuICBULFxuICBFcnJvck1lc3NhZ2UgZXh0ZW5kcyBzdHJpbmdcbj4gPSBUIGV4dGVuZHMgRnVuY3Rpb24gPyBFcnJvck1lc3NhZ2UgOiBUO1xuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBvYmplY3QgaW4gdGhlIHNoYXBlIG9mIHRoZSBgQWN0aW9uYCBpbnRlcmZhY2UuICBDb25maWd1cmVkIHVzaW5nIGBjcmVhdGVBY3Rpb25gLlxuICovXG5leHBvcnQgdHlwZSBDcmVhdG9yPFxuICBQIGV4dGVuZHMgYW55W10gPSBhbnlbXSxcbiAgUiBleHRlbmRzIG9iamVjdCA9IG9iamVjdFxuPiA9IFIgZXh0ZW5kcyBhbnlbXVxuICA/IEFycmF5c0FyZU5vdEFsbG93ZWRcbiAgOiBSIGV4dGVuZHMgeyB0eXBlOiBhbnkgfVxuICAgID8gVHlwZVByb3BlcnR5SXNOb3RBbGxvd2VkXG4gICAgOiBGdW5jdGlvbldpdGhQYXJhbWV0ZXJzVHlwZTxQLCBSPjtcblxuZXhwb3J0IHR5cGUgUHJvcHNSZXR1cm5UeXBlPFQgZXh0ZW5kcyBvYmplY3Q+ID0gVCBleHRlbmRzIGFueVtdXG4gID8gQXJyYXlzQXJlTm90QWxsb3dlZFxuICA6IFQgZXh0ZW5kcyB7IHR5cGU6IGFueSB9XG4gICAgPyBUeXBlUHJvcGVydHlJc05vdEFsbG93ZWRcbiAgICA6IHsgX2FzOiAncHJvcHMnOyBfcDogVCB9O1xuXG4vKipcbiAqIFNlZSBgQ3JlYXRvcmAuXG4gKi9cbmV4cG9ydCB0eXBlIEFjdGlvbkNyZWF0b3I8XG4gIFQgZXh0ZW5kcyBzdHJpbmcgPSBzdHJpbmcsXG4gIEMgZXh0ZW5kcyBDcmVhdG9yID0gQ3JlYXRvclxuPiA9IEMgJiBUeXBlZEFjdGlvbjxUPjtcblxuZXhwb3J0IHR5cGUgRnVuY3Rpb25XaXRoUGFyYW1ldGVyc1R5cGU8UCBleHRlbmRzIHVua25vd25bXSwgUiA9IHZvaWQ+ID0gKFxuICAuLi5hcmdzOiBQXG4pID0+IFI7XG5cbmV4cG9ydCB0eXBlIFBhcmFtZXRlcnNUeXBlPFQ+ID0gVCBleHRlbmRzICguLi5hcmdzOiBpbmZlciBVKSA9PiB1bmtub3duXG4gID8gVVxuICA6IG5ldmVyO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJ1bnRpbWVDaGVja3Mge1xuICAvKipcbiAgICogVmVyaWZpZXMgaWYgdGhlIHN0YXRlIGlzIHNlcmlhbGl6YWJsZVxuICAgKi9cbiAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHk6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBWZXJpZmllcyBpZiB0aGUgYWN0aW9ucyBhcmUgc2VyaWFsaXphYmxlLiBQbGVhc2Ugbm90ZSwgeW91IG1heSBub3QgbmVlZCB0byBzZXQgaXQgdG8gYHRydWVgIHVubGVzcyB5b3UgYXJlIHN0b3JpbmcvcmVwbGF5aW5nIGFjdGlvbnMgdXNpbmcgZXh0ZXJuYWwgcmVzb3VyY2VzLCBmb3IgZXhhbXBsZSBgbG9jYWxTdG9yYWdlYC5cbiAgICovXG4gIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFZlcmlmaWVzIHRoYXQgdGhlIHN0YXRlIGlzbid0IG11dGF0ZWRcbiAgICovXG4gIHN0cmljdFN0YXRlSW1tdXRhYmlsaXR5OiBib29sZWFuO1xuICAvKipcbiAgICogVmVyaWZpZXMgdGhhdCBhY3Rpb25zIGFyZW4ndCBtdXRhdGVkXG4gICAqL1xuICBzdHJpY3RBY3Rpb25JbW11dGFiaWxpdHk6IGJvb2xlYW47XG59XG4iXX0=