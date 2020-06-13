/**
 * @fileoverview added by tsickle
 * Generated from: src/meta-reducers/immutability_reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        const act = checks.action(action) ? freeze(action) : action;
        /** @type {?} */
        const nextState = reducer(state, act);
        return checks.state() ? freeze(nextState) : nextState;
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
    (prop) => {
        // Ignore Ivy properties, ref: https://github.com/ngrx/platform/issues/2109#issuecomment-582689060
        if (prop.startsWith('ɵ')) {
            return;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1tdXRhYmlsaXR5X3JlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9tZXRhLXJlZHVjZXJzL2ltbXV0YWJpbGl0eV9yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7QUFFbkUsTUFBTSxVQUFVLDRCQUE0QixDQUMxQyxPQUFnQyxFQUNoQyxNQUFxRTtJQUVyRTs7Ozs7SUFBTyxVQUFVLEtBQUssRUFBRSxNQUFNOztjQUN0QixHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNOztjQUVyRCxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7UUFFckMsT0FBTyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3hELENBQUMsRUFBQztBQUNKLENBQUM7Ozs7O0FBRUQsU0FBUyxNQUFNLENBQUMsTUFBVztJQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztVQUVoQixnQkFBZ0IsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBRTNDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPOzs7O0lBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNsRCxrR0FBa0c7UUFDbEcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLE9BQU87U0FDUjtRQUVELElBQ0UsY0FBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7WUFDNUIsQ0FBQyxnQkFBZ0I7Z0JBQ2YsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssV0FBVztnQkFDaEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUNUOztrQkFDTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUU5QixJQUNFLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbEQsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUMzQjtnQkFDQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDbkI7U0FDRjtJQUNILENBQUMsRUFBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvblJlZHVjZXIsIEFjdGlvbiB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uLCBoYXNPd25Qcm9wZXJ0eSwgaXNPYmplY3RMaWtlIH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbW11dGFiaWxpdHlDaGVja01ldGFSZWR1Y2VyKFxuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PixcbiAgY2hlY2tzOiB7IGFjdGlvbjogKGFjdGlvbjogQWN0aW9uKSA9PiBib29sZWFuOyBzdGF0ZTogKCkgPT4gYm9vbGVhbiB9XG4pOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PiB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbikge1xuICAgIGNvbnN0IGFjdCA9IGNoZWNrcy5hY3Rpb24oYWN0aW9uKSA/IGZyZWV6ZShhY3Rpb24pIDogYWN0aW9uO1xuXG4gICAgY29uc3QgbmV4dFN0YXRlID0gcmVkdWNlcihzdGF0ZSwgYWN0KTtcblxuICAgIHJldHVybiBjaGVja3Muc3RhdGUoKSA/IGZyZWV6ZShuZXh0U3RhdGUpIDogbmV4dFN0YXRlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBmcmVlemUodGFyZ2V0OiBhbnkpIHtcbiAgT2JqZWN0LmZyZWV6ZSh0YXJnZXQpO1xuXG4gIGNvbnN0IHRhcmdldElzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uKHRhcmdldCk7XG5cbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgLy8gSWdub3JlIEl2eSBwcm9wZXJ0aWVzLCByZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9uZ3J4L3BsYXRmb3JtL2lzc3Vlcy8yMTA5I2lzc3VlY29tbWVudC01ODI2ODkwNjBcbiAgICBpZiAocHJvcC5zdGFydHNXaXRoKCfJtScpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgaGFzT3duUHJvcGVydHkodGFyZ2V0LCBwcm9wKSAmJlxuICAgICAgKHRhcmdldElzRnVuY3Rpb25cbiAgICAgICAgPyBwcm9wICE9PSAnY2FsbGVyJyAmJiBwcm9wICE9PSAnY2FsbGVlJyAmJiBwcm9wICE9PSAnYXJndW1lbnRzJ1xuICAgICAgICA6IHRydWUpXG4gICAgKSB7XG4gICAgICBjb25zdCBwcm9wVmFsdWUgPSB0YXJnZXRbcHJvcF07XG5cbiAgICAgIGlmIChcbiAgICAgICAgKGlzT2JqZWN0TGlrZShwcm9wVmFsdWUpIHx8IGlzRnVuY3Rpb24ocHJvcFZhbHVlKSkgJiZcbiAgICAgICAgIU9iamVjdC5pc0Zyb3plbihwcm9wVmFsdWUpXG4gICAgICApIHtcbiAgICAgICAgZnJlZXplKHByb3BWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gdGFyZ2V0O1xufVxuIl19