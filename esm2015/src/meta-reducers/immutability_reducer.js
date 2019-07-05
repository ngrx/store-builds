/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isFunction, hasOwnProperty, isObjectLike } from './utils';
/**
 * @param {?} reducer
 * @param {?} checks
 * @return {?}
 */
export function immutabilityCheckMetaReducer(reducer, checks) {
    return (/**
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    function (state, action) {
        /** @type {?} */
        const act = checks.action ? freeze(action) : action;
        /** @type {?} */
        const nextState = reducer(state, act);
        return checks.state ? freeze(nextState) : nextState;
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
        if (hasOwnProperty(target, prop) &&
            (targetIsFunction
                ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments'
                : true)) {
            /** @type {?} */
            const propValue = target[prop];
            if ((isObjectLike(propValue) || isFunction(propValue)) &&
                !Object.isFrozen(propValue)) {
                freeze(propValue);
            }
        }
    }));
    return target;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1tdXRhYmlsaXR5X3JlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9tZXRhLXJlZHVjZXJzL2ltbXV0YWJpbGl0eV9yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7OztBQUVuRSxNQUFNLFVBQVUsNEJBQTRCLENBQzFDLE9BQWdDLEVBQ2hDLE1BQTJDO0lBRTNDOzs7OztJQUFPLFVBQVMsS0FBSyxFQUFFLE1BQU07O2NBQ3JCLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07O2NBRTdDLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztRQUVyQyxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3RELENBQUMsRUFBQztBQUNKLENBQUM7Ozs7O0FBRUQsU0FBUyxNQUFNLENBQUMsTUFBVztJQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztVQUVoQixnQkFBZ0IsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBRTNDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPOzs7O0lBQUMsSUFBSSxDQUFDLEVBQUU7UUFDaEQsSUFDRSxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztZQUM1QixDQUFDLGdCQUFnQjtnQkFDZixDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksS0FBSyxXQUFXO2dCQUNoRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQ1Q7O2tCQUNNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBRTlCLElBQ0UsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNsRCxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQzNCO2dCQUNBLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNuQjtTQUNGO0lBQ0gsQ0FBQyxFQUFDLENBQUM7SUFFSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uUmVkdWNlciB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uLCBoYXNPd25Qcm9wZXJ0eSwgaXNPYmplY3RMaWtlIH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyKFxuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PixcbiAgY2hlY2tzOiB7IGFjdGlvbjogYm9vbGVhbjsgc3RhdGU6IGJvb2xlYW4gfVxuKTogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4ge1xuICByZXR1cm4gZnVuY3Rpb24oc3RhdGUsIGFjdGlvbikge1xuICAgIGNvbnN0IGFjdCA9IGNoZWNrcy5hY3Rpb24gPyBmcmVlemUoYWN0aW9uKSA6IGFjdGlvbjtcblxuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHJlZHVjZXIoc3RhdGUsIGFjdCk7XG5cbiAgICByZXR1cm4gY2hlY2tzLnN0YXRlID8gZnJlZXplKG5leHRTdGF0ZSkgOiBuZXh0U3RhdGU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGZyZWV6ZSh0YXJnZXQ6IGFueSkge1xuICBPYmplY3QuZnJlZXplKHRhcmdldCk7XG5cbiAgY29uc3QgdGFyZ2V0SXNGdW5jdGlvbiA9IGlzRnVuY3Rpb24odGFyZ2V0KTtcblxuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgaWYgKFxuICAgICAgaGFzT3duUHJvcGVydHkodGFyZ2V0LCBwcm9wKSAmJlxuICAgICAgKHRhcmdldElzRnVuY3Rpb25cbiAgICAgICAgPyBwcm9wICE9PSAnY2FsbGVyJyAmJiBwcm9wICE9PSAnY2FsbGVlJyAmJiBwcm9wICE9PSAnYXJndW1lbnRzJ1xuICAgICAgICA6IHRydWUpXG4gICAgKSB7XG4gICAgICBjb25zdCBwcm9wVmFsdWUgPSB0YXJnZXRbcHJvcF07XG5cbiAgICAgIGlmIChcbiAgICAgICAgKGlzT2JqZWN0TGlrZShwcm9wVmFsdWUpIHx8IGlzRnVuY3Rpb24ocHJvcFZhbHVlKSkgJiZcbiAgICAgICAgIU9iamVjdC5pc0Zyb3plbihwcm9wVmFsdWUpXG4gICAgICApIHtcbiAgICAgICAgZnJlZXplKHByb3BWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gdGFyZ2V0O1xufVxuIl19