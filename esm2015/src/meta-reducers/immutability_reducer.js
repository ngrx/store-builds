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
        if (hasOwnProperty(target, prop) &&
            (targetIsFunction
                ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments'
                : true) &&
            (isObjectLike(propValue) || isFunction(propValue)) &&
            !Object.isFrozen(propValue)) {
            freeze(propValue);
        }
    }));
    return target;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1tdXRhYmlsaXR5X3JlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9tZXRhLXJlZHVjZXJzL2ltbXV0YWJpbGl0eV9yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7O0FBRW5FLE1BQU0sVUFBVSw0QkFBNEIsQ0FDMUMsT0FBZ0M7SUFFaEM7Ozs7O0lBQU8sVUFBUyxLQUFLLEVBQUUsTUFBTTs7Y0FDckIsU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNCLENBQUMsRUFBQztBQUNKLENBQUM7Ozs7O0FBRUQsU0FBUyxNQUFNLENBQUMsTUFBVztJQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztVQUVoQixnQkFBZ0IsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBRTNDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPOzs7O0lBQUMsSUFBSSxDQUFDLEVBQUU7O2NBQzFDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzlCLElBQ0UsY0FBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7WUFDNUIsQ0FBQyxnQkFBZ0I7Z0JBQ2YsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssV0FBVztnQkFDaEUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNULENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsRCxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQzNCO1lBQ0EsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ25CO0lBQ0gsQ0FBQyxFQUFDLENBQUM7SUFFSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uUmVkdWNlciB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uLCBoYXNPd25Qcm9wZXJ0eSwgaXNPYmplY3RMaWtlIH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyKFxuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PlxuKTogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4ge1xuICByZXR1cm4gZnVuY3Rpb24oc3RhdGUsIGFjdGlvbikge1xuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHJlZHVjZXIoc3RhdGUsIGZyZWV6ZShhY3Rpb24pKTtcbiAgICByZXR1cm4gZnJlZXplKG5leHRTdGF0ZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGZyZWV6ZSh0YXJnZXQ6IGFueSkge1xuICBPYmplY3QuZnJlZXplKHRhcmdldCk7XG5cbiAgY29uc3QgdGFyZ2V0SXNGdW5jdGlvbiA9IGlzRnVuY3Rpb24odGFyZ2V0KTtcblxuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgY29uc3QgcHJvcFZhbHVlID0gdGFyZ2V0W3Byb3BdO1xuICAgIGlmIChcbiAgICAgIGhhc093blByb3BlcnR5KHRhcmdldCwgcHJvcCkgJiZcbiAgICAgICh0YXJnZXRJc0Z1bmN0aW9uXG4gICAgICAgID8gcHJvcCAhPT0gJ2NhbGxlcicgJiYgcHJvcCAhPT0gJ2NhbGxlZScgJiYgcHJvcCAhPT0gJ2FyZ3VtZW50cydcbiAgICAgICAgOiB0cnVlKSAmJlxuICAgICAgKGlzT2JqZWN0TGlrZShwcm9wVmFsdWUpIHx8IGlzRnVuY3Rpb24ocHJvcFZhbHVlKSkgJiZcbiAgICAgICFPYmplY3QuaXNGcm96ZW4ocHJvcFZhbHVlKVxuICAgICkge1xuICAgICAgZnJlZXplKHByb3BWYWx1ZSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gdGFyZ2V0O1xufVxuIl19