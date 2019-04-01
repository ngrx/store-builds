/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isFunction, hasOwnProperty, isObjectLike } from './utils';
/**
 * @param {?} reducer
 * @return {?}
 */
export function immutabilityCheckMetaReducer(reducer) {
    return (/**
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    function (state, action) {
        /** @type {?} */
        const nextState = reducer(state, freeze(action));
        return freeze(nextState);
    });
}
/**
 * @param {?} target
 * @return {?}
 */
function freeze(target) {
    Object.freeze(target);
    /** @type {?} */
    const targetIsFunction = isFunction(target);
    Object.getOwnPropertyNames(target).forEach((/**
     * @param {?} prop
     * @return {?}
     */
    prop => {
        /** @type {?} */
        const propValue = target[prop];
        if (hasOwnProperty(target, prop) && targetIsFunction
            ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments'
            : true &&
                (isObjectLike(propValue) || isFunction(propValue)) &&
                !Object.isFrozen(propValue)) {
            freeze(propValue);
        }
    }));
    return target;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1tdXRhYmlsaXR5X3JlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9tZXRhLXJlZHVjZXJzL2ltbXV0YWJpbGl0eV9yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7O0FBRW5FLE1BQU0sVUFBVSw0QkFBNEIsQ0FDMUMsT0FBZ0M7SUFFaEM7Ozs7O0lBQU8sVUFBUyxLQUFLLEVBQUUsTUFBTTs7Y0FDckIsU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNCLENBQUMsRUFBQztBQUNKLENBQUM7Ozs7O0FBRUQsU0FBUyxNQUFNLENBQUMsTUFBVztJQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztVQUVoQixnQkFBZ0IsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBRTNDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPOzs7O0lBQUMsSUFBSSxDQUFDLEVBQUU7O2NBQzFDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzlCLElBQ0UsY0FBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxnQkFBZ0I7WUFDOUMsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssV0FBVztZQUNoRSxDQUFDLENBQUMsSUFBSTtnQkFDSixDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2xELENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFDL0I7WUFDQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbkI7SUFDSCxDQUFDLEVBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25SZWR1Y2VyIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IGlzRnVuY3Rpb24sIGhhc093blByb3BlcnR5LCBpc09iamVjdExpa2UgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGltbXV0YWJpbGl0eUNoZWNrTWV0YVJlZHVjZXIoXG4gIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+XG4pOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PiB7XG4gIHJldHVybiBmdW5jdGlvbihzdGF0ZSwgYWN0aW9uKSB7XG4gICAgY29uc3QgbmV4dFN0YXRlID0gcmVkdWNlcihzdGF0ZSwgZnJlZXplKGFjdGlvbikpO1xuICAgIHJldHVybiBmcmVlemUobmV4dFN0YXRlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZnJlZXplKHRhcmdldDogYW55KSB7XG4gIE9iamVjdC5mcmVlemUodGFyZ2V0KTtcblxuICBjb25zdCB0YXJnZXRJc0Z1bmN0aW9uID0gaXNGdW5jdGlvbih0YXJnZXQpO1xuXG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCkuZm9yRWFjaChwcm9wID0+IHtcbiAgICBjb25zdCBwcm9wVmFsdWUgPSB0YXJnZXRbcHJvcF07XG4gICAgaWYgKFxuICAgICAgaGFzT3duUHJvcGVydHkodGFyZ2V0LCBwcm9wKSAmJiB0YXJnZXRJc0Z1bmN0aW9uXG4gICAgICAgID8gcHJvcCAhPT0gJ2NhbGxlcicgJiYgcHJvcCAhPT0gJ2NhbGxlZScgJiYgcHJvcCAhPT0gJ2FyZ3VtZW50cydcbiAgICAgICAgOiB0cnVlICYmXG4gICAgICAgICAgKGlzT2JqZWN0TGlrZShwcm9wVmFsdWUpIHx8IGlzRnVuY3Rpb24ocHJvcFZhbHVlKSkgJiZcbiAgICAgICAgICAhT2JqZWN0LmlzRnJvemVuKHByb3BWYWx1ZSlcbiAgICApIHtcbiAgICAgIGZyZWV6ZShwcm9wVmFsdWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cbiJdfQ==