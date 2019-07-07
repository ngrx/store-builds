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
    /** @type {?} */
    RuntimeChecks.prototype.strictStateSerializability;
    /** @type {?} */
    RuntimeChecks.prototype.strictActionSerializability;
    /** @type {?} */
    RuntimeChecks.prototype.strictStateImmutability;
    /** @type {?} */
    RuntimeChecks.prototype.strictActionImmutability;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvbW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSw0QkFFQzs7O0lBREMsc0JBQWE7Ozs7Ozs7O0FBb0JmLG1DQUVDOzs7OztBQU1ELDBDQUtDOzs7OztBQU1ELGtDQU1DOzs7SUFMQywyQkFBWTs7SUFDWixnQ0FBdUQ7O0lBQ3ZELHNDQUEyQzs7SUFDM0Msb0NBQStCOztJQUMvQixvQ0FBbUM7OztBQWNyQyxNQUFNLE9BQU8sMkJBQTJCLEdBQ3RDLGlEQUFpRDs7OztBQWlDbkQsbUNBS0M7OztJQUpDLG1EQUFvQzs7SUFDcEMsb0RBQXFDOztJQUNyQyxnREFBaUM7O0lBQ2pDLGlEQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uIHtcbiAgdHlwZTogc3RyaW5nO1xufVxuXG4vLyBkZWNsYXJlIHRvIG1ha2UgaXQgcHJvcGVydHktcmVuYW1pbmcgc2FmZVxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFR5cGVkQWN0aW9uPFQgZXh0ZW5kcyBzdHJpbmc+IGV4dGVuZHMgQWN0aW9uIHtcbiAgcmVhZG9ubHkgdHlwZTogVDtcbn1cblxuZXhwb3J0IHR5cGUgQWN0aW9uVHlwZTxBPiA9IEEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yPGluZmVyIFQsIGluZmVyIEM+XG4gID8gUmV0dXJuVHlwZTxDPiAmIHsgdHlwZTogVCB9XG4gIDogbmV2ZXI7XG5cbmV4cG9ydCB0eXBlIFR5cGVJZDxUPiA9ICgpID0+IFQ7XG5cbmV4cG9ydCB0eXBlIEluaXRpYWxTdGF0ZTxUPiA9IFBhcnRpYWw8VD4gfCBUeXBlSWQ8UGFydGlhbDxUPj4gfCB2b2lkO1xuXG4vKipcbiAqIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhbiBgQWN0aW9uYCBhbmQgYSBgU3RhdGVgLCBhbmQgcmV0dXJucyBhIGBTdGF0ZWAuXG4gKiBTZWUgYGNyZWF0ZVJlZHVjZXJgLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvblJlZHVjZXI8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4ge1xuICAoc3RhdGU6IFQgfCB1bmRlZmluZWQsIGFjdGlvbjogVik6IFQ7XG59XG5cbmV4cG9ydCB0eXBlIEFjdGlvblJlZHVjZXJNYXA8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4gPSB7XG4gIFtwIGluIGtleW9mIFRdOiBBY3Rpb25SZWR1Y2VyPFRbcF0sIFY+XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvblJlZHVjZXJGYWN0b3J5PFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+IHtcbiAgKFxuICAgIHJlZHVjZXJNYXA6IEFjdGlvblJlZHVjZXJNYXA8VCwgVj4sXG4gICAgaW5pdGlhbFN0YXRlPzogSW5pdGlhbFN0YXRlPFQ+XG4gICk6IEFjdGlvblJlZHVjZXI8VCwgVj47XG59XG5cbmV4cG9ydCB0eXBlIE1ldGFSZWR1Y2VyPFQgPSBhbnksIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+ID0gKFxuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFQsIFY+XG4pID0+IEFjdGlvblJlZHVjZXI8VCwgVj47XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RvcmVGZWF0dXJlPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+IHtcbiAga2V5OiBzdHJpbmc7XG4gIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+IHwgQWN0aW9uUmVkdWNlcjxULCBWPjtcbiAgcmVkdWNlckZhY3Rvcnk6IEFjdGlvblJlZHVjZXJGYWN0b3J5PFQsIFY+O1xuICBpbml0aWFsU3RhdGU/OiBJbml0aWFsU3RhdGU8VD47XG4gIG1ldGFSZWR1Y2Vycz86IE1ldGFSZWR1Y2VyPFQsIFY+W107XG59XG5cbmV4cG9ydCB0eXBlIFNlbGVjdG9yPFQsIFY+ID0gKHN0YXRlOiBUKSA9PiBWO1xuXG5leHBvcnQgdHlwZSBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD4gPSAoXG4gIHN0YXRlOiBTdGF0ZSxcbiAgcHJvcHM6IFByb3BzXG4pID0+IFJlc3VsdDtcblxuZXhwb3J0IHR5cGUgRGlzYWxsb3dUeXBlUHJvcGVydHk8VD4gPSBUIGV4dGVuZHMgeyB0eXBlOiBhbnkgfVxuICA/IFR5cGVQcm9wZXJ0eUlzTm90QWxsb3dlZFxuICA6IFQ7XG5cbmV4cG9ydCBjb25zdCB0eXBlUHJvcGVydHlJc05vdEFsbG93ZWRNc2cgPVxuICAndHlwZSBwcm9wZXJ0eSBpcyBub3QgYWxsb3dlZCBpbiBhY3Rpb24gY3JlYXRvcnMnO1xudHlwZSBUeXBlUHJvcGVydHlJc05vdEFsbG93ZWQgPSB0eXBlb2YgdHlwZVByb3BlcnR5SXNOb3RBbGxvd2VkTXNnO1xuXG4vKipcbiAqIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIG9iamVjdCBpbiB0aGUgc2hhcGUgb2YgdGhlIGBBY3Rpb25gIGludGVyZmFjZS4gIENvbmZpZ3VyZWQgdXNpbmcgYGNyZWF0ZUFjdGlvbmAuXG4gKi9cbmV4cG9ydCB0eXBlIENyZWF0b3I8XG4gIFAgZXh0ZW5kcyBhbnlbXSA9IGFueVtdLFxuICBSIGV4dGVuZHMgb2JqZWN0ID0gb2JqZWN0XG4+ID0gUiBleHRlbmRzIHsgdHlwZTogYW55IH1cbiAgPyBUeXBlUHJvcGVydHlJc05vdEFsbG93ZWRcbiAgOiBGdW5jdGlvbldpdGhQYXJhbWV0ZXJzVHlwZTxQLCBSPjtcblxuZXhwb3J0IHR5cGUgUHJvcHNSZXR1cm5UeXBlPFQgZXh0ZW5kcyBvYmplY3Q+ID0gVCBleHRlbmRzIHsgdHlwZTogYW55IH1cbiAgPyBUeXBlUHJvcGVydHlJc05vdEFsbG93ZWRcbiAgOiB7IF9hczogJ3Byb3BzJzsgX3A6IFQgfTtcblxuLyoqXG4gKiBTZWUgYENyZWF0b3JgLlxuICovXG5leHBvcnQgdHlwZSBBY3Rpb25DcmVhdG9yPFxuICBUIGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nLFxuICBDIGV4dGVuZHMgQ3JlYXRvciA9IENyZWF0b3Jcbj4gPSBDICYgVHlwZWRBY3Rpb248VD47XG5cbmV4cG9ydCB0eXBlIEZ1bmN0aW9uV2l0aFBhcmFtZXRlcnNUeXBlPFAgZXh0ZW5kcyB1bmtub3duW10sIFIgPSB2b2lkPiA9IChcbiAgLi4uYXJnczogUFxuKSA9PiBSO1xuXG5leHBvcnQgdHlwZSBQYXJhbWV0ZXJzVHlwZTxUPiA9IFQgZXh0ZW5kcyAoLi4uYXJnczogaW5mZXIgVSkgPT4gdW5rbm93blxuICA/IFVcbiAgOiBuZXZlcjtcblxuZXhwb3J0IGludGVyZmFjZSBSdW50aW1lQ2hlY2tzIHtcbiAgc3RyaWN0U3RhdGVTZXJpYWxpemFiaWxpdHk6IGJvb2xlYW47XG4gIHN0cmljdEFjdGlvblNlcmlhbGl6YWJpbGl0eTogYm9vbGVhbjtcbiAgc3RyaWN0U3RhdGVJbW11dGFiaWxpdHk6IGJvb2xlYW47XG4gIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eTogYm9vbGVhbjtcbn1cbiJdfQ==