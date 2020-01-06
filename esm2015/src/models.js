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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvbW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSw0QkFFQzs7O0lBREMsc0JBQWE7Ozs7Ozs7O0FBb0JmLG1DQUVDOzs7OztBQU1ELDBDQUtDOzs7OztBQU1ELGtDQU1DOzs7SUFMQywyQkFBWTs7SUFDWixnQ0FBdUQ7O0lBQ3ZELHNDQUEyQzs7SUFDM0Msb0NBQStCOztJQUMvQixvQ0FBbUM7OztBQVVyQyxNQUFNLE9BQU8sc0JBQXNCLEdBQ2pDLDJDQUEyQzs7QUFPN0MsTUFBTSxPQUFPLDJCQUEyQixHQUN0QyxpREFBaUQ7Ozs7QUF5Q25ELG1DQWlCQzs7Ozs7O0lBYkMsbURBQW9DOzs7OztJQUlwQyxvREFBcUM7Ozs7O0lBSXJDLGdEQUFpQzs7Ozs7SUFJakMsaURBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBBY3Rpb24ge1xuICB0eXBlOiBzdHJpbmc7XG59XG5cbi8vIGRlY2xhcmUgdG8gbWFrZSBpdCBwcm9wZXJ0eS1yZW5hbWluZyBzYWZlXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgVHlwZWRBY3Rpb248VCBleHRlbmRzIHN0cmluZz4gZXh0ZW5kcyBBY3Rpb24ge1xuICByZWFkb25seSB0eXBlOiBUO1xufVxuXG5leHBvcnQgdHlwZSBBY3Rpb25UeXBlPEE+ID0gQSBleHRlbmRzIEFjdGlvbkNyZWF0b3I8aW5mZXIgVCwgaW5mZXIgQz5cbiAgPyBSZXR1cm5UeXBlPEM+ICYgeyB0eXBlOiBUIH1cbiAgOiBuZXZlcjtcblxuZXhwb3J0IHR5cGUgVHlwZUlkPFQ+ID0gKCkgPT4gVDtcblxuZXhwb3J0IHR5cGUgSW5pdGlhbFN0YXRlPFQ+ID0gUGFydGlhbDxUPiB8IFR5cGVJZDxQYXJ0aWFsPFQ+PiB8IHZvaWQ7XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IHRha2VzIGFuIGBBY3Rpb25gIGFuZCBhIGBTdGF0ZWAsIGFuZCByZXR1cm5zIGEgYFN0YXRlYC5cbiAqIFNlZSBgY3JlYXRlUmVkdWNlcmAuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uUmVkdWNlcjxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiB7XG4gIChzdGF0ZTogVCB8IHVuZGVmaW5lZCwgYWN0aW9uOiBWKTogVDtcbn1cblxuZXhwb3J0IHR5cGUgQWN0aW9uUmVkdWNlck1hcDxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPiA9IHtcbiAgW3AgaW4ga2V5b2YgVF06IEFjdGlvblJlZHVjZXI8VFtwXSwgVj5cbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uUmVkdWNlckZhY3Rvcnk8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4ge1xuICAoXG4gICAgcmVkdWNlck1hcDogQWN0aW9uUmVkdWNlck1hcDxULCBWPixcbiAgICBpbml0aWFsU3RhdGU/OiBJbml0aWFsU3RhdGU8VD5cbiAgKTogQWN0aW9uUmVkdWNlcjxULCBWPjtcbn1cblxuZXhwb3J0IHR5cGUgTWV0YVJlZHVjZXI8VCA9IGFueSwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4gPSAoXG4gIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8VCwgVj5cbikgPT4gQWN0aW9uUmVkdWNlcjxULCBWPjtcblxuZXhwb3J0IGludGVyZmFjZSBTdG9yZUZlYXR1cmU8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4ge1xuICBrZXk6IHN0cmluZztcbiAgcmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8VCwgVj4gfCBBY3Rpb25SZWR1Y2VyPFQsIFY+O1xuICByZWR1Y2VyRmFjdG9yeTogQWN0aW9uUmVkdWNlckZhY3Rvcnk8VCwgVj47XG4gIGluaXRpYWxTdGF0ZT86IEluaXRpYWxTdGF0ZTxUPjtcbiAgbWV0YVJlZHVjZXJzPzogTWV0YVJlZHVjZXI8VCwgVj5bXTtcbn1cblxuZXhwb3J0IHR5cGUgU2VsZWN0b3I8VCwgVj4gPSAoc3RhdGU6IFQpID0+IFY7XG5cbmV4cG9ydCB0eXBlIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PiA9IChcbiAgc3RhdGU6IFN0YXRlLFxuICBwcm9wczogUHJvcHNcbikgPT4gUmVzdWx0O1xuXG5leHBvcnQgY29uc3QgYXJyYXlzQXJlTm90QWxsb3dlZE1zZyA9XG4gICdhcnJheXMgYXJlIG5vdCBhbGxvd2VkIGluIGFjdGlvbiBjcmVhdG9ycyc7XG50eXBlIEFycmF5c0FyZU5vdEFsbG93ZWQgPSB0eXBlb2YgYXJyYXlzQXJlTm90QWxsb3dlZE1zZztcblxuZXhwb3J0IHR5cGUgRGlzYWxsb3dBcnJheXNBbmRUeXBlUHJvcGVydHk8VD4gPSBUIGV4dGVuZHMgYW55W11cbiAgPyBBcnJheXNBcmVOb3RBbGxvd2VkXG4gIDogVCBleHRlbmRzIHsgdHlwZTogYW55IH0gPyBUeXBlUHJvcGVydHlJc05vdEFsbG93ZWQgOiBUO1xuXG5leHBvcnQgY29uc3QgdHlwZVByb3BlcnR5SXNOb3RBbGxvd2VkTXNnID1cbiAgJ3R5cGUgcHJvcGVydHkgaXMgbm90IGFsbG93ZWQgaW4gYWN0aW9uIGNyZWF0b3JzJztcbnR5cGUgVHlwZVByb3BlcnR5SXNOb3RBbGxvd2VkID0gdHlwZW9mIHR5cGVQcm9wZXJ0eUlzTm90QWxsb3dlZE1zZztcblxuZXhwb3J0IHR5cGUgRnVuY3Rpb25Jc05vdEFsbG93ZWQ8XG4gIFQsXG4gIEVycm9yTWVzc2FnZSBleHRlbmRzIHN0cmluZ1xuPiA9IFQgZXh0ZW5kcyBGdW5jdGlvbiA/IEVycm9yTWVzc2FnZSA6IFQ7XG4vKipcbiAqIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIG9iamVjdCBpbiB0aGUgc2hhcGUgb2YgdGhlIGBBY3Rpb25gIGludGVyZmFjZS4gIENvbmZpZ3VyZWQgdXNpbmcgYGNyZWF0ZUFjdGlvbmAuXG4gKi9cbmV4cG9ydCB0eXBlIENyZWF0b3I8XG4gIFAgZXh0ZW5kcyBhbnlbXSA9IGFueVtdLFxuICBSIGV4dGVuZHMgb2JqZWN0ID0gb2JqZWN0XG4+ID0gUiBleHRlbmRzIGFueVtdXG4gID8gQXJyYXlzQXJlTm90QWxsb3dlZFxuICA6IFIgZXh0ZW5kcyB7IHR5cGU6IGFueSB9XG4gICAgPyBUeXBlUHJvcGVydHlJc05vdEFsbG93ZWRcbiAgICA6IEZ1bmN0aW9uV2l0aFBhcmFtZXRlcnNUeXBlPFAsIFI+O1xuXG5leHBvcnQgdHlwZSBQcm9wc1JldHVyblR5cGU8VCBleHRlbmRzIG9iamVjdD4gPSBUIGV4dGVuZHMgYW55W11cbiAgPyBBcnJheXNBcmVOb3RBbGxvd2VkXG4gIDogVCBleHRlbmRzIHsgdHlwZTogYW55IH1cbiAgICA/IFR5cGVQcm9wZXJ0eUlzTm90QWxsb3dlZFxuICAgIDogeyBfYXM6ICdwcm9wcyc7IF9wOiBUIH07XG5cbi8qKlxuICogU2VlIGBDcmVhdG9yYC5cbiAqL1xuZXhwb3J0IHR5cGUgQWN0aW9uQ3JlYXRvcjxcbiAgVCBleHRlbmRzIHN0cmluZyA9IHN0cmluZyxcbiAgQyBleHRlbmRzIENyZWF0b3IgPSBDcmVhdG9yXG4+ID0gQyAmIFR5cGVkQWN0aW9uPFQ+O1xuXG5leHBvcnQgdHlwZSBGdW5jdGlvbldpdGhQYXJhbWV0ZXJzVHlwZTxQIGV4dGVuZHMgdW5rbm93bltdLCBSID0gdm9pZD4gPSAoXG4gIC4uLmFyZ3M6IFBcbikgPT4gUjtcblxuZXhwb3J0IHR5cGUgUGFyYW1ldGVyc1R5cGU8VD4gPSBUIGV4dGVuZHMgKC4uLmFyZ3M6IGluZmVyIFUpID0+IHVua25vd25cbiAgPyBVXG4gIDogbmV2ZXI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUnVudGltZUNoZWNrcyB7XG4gIC8qKlxuICAgKiBWZXJpZmllcyBpZiB0aGUgc3RhdGUgaXMgc2VyaWFsaXphYmxlXG4gICAqL1xuICBzdHJpY3RTdGF0ZVNlcmlhbGl6YWJpbGl0eTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFZlcmlmaWVzIGlmIHRoZSBhY3Rpb25zIGFyZSBzZXJpYWxpemFibGUuIFBsZWFzZSBub3RlLCB5b3UgbWF5IG5vdCBuZWVkIHRvIHNldCBpdCB0byBgdHJ1ZWAgdW5sZXNzIHlvdSBhcmUgc3RvcmluZy9yZXBsYXlpbmcgYWN0aW9ucyB1c2luZyBleHRlcm5hbCByZXNvdXJjZXMsIGZvciBleGFtcGxlIGBsb2NhbFN0b3JhZ2VgLlxuICAgKi9cbiAgc3RyaWN0QWN0aW9uU2VyaWFsaXphYmlsaXR5OiBib29sZWFuO1xuICAvKipcbiAgICogVmVyaWZpZXMgdGhhdCB0aGUgc3RhdGUgaXNuJ3QgbXV0YXRlZFxuICAgKi9cbiAgc3RyaWN0U3RhdGVJbW11dGFiaWxpdHk6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBWZXJpZmllcyB0aGF0IGFjdGlvbnMgYXJlbid0IG11dGF0ZWRcbiAgICovXG4gIHN0cmljdEFjdGlvbkltbXV0YWJpbGl0eTogYm9vbGVhbjtcbn1cbiJdfQ==