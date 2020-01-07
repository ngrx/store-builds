/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/src/meta-reducers/immutability_reducer.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1tdXRhYmlsaXR5X3JlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9tZXRhLXJlZHVjZXJzL2ltbXV0YWJpbGl0eV9yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7QUFFbkUsTUFBTSxVQUFVLDRCQUE0QixDQUMxQyxPQUFnQyxFQUNoQyxNQUEyQztJQUUzQzs7Ozs7SUFBTyxVQUFTLEtBQUssRUFBRSxNQUFNOztjQUNyQixHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNOztjQUU3QyxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7UUFFckMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN0RCxDQUFDLEVBQUM7QUFDSixDQUFDOzs7OztBQUVELFNBQVMsTUFBTSxDQUFDLE1BQVc7SUFDekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7VUFFaEIsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUUzQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTzs7OztJQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2hELElBQ0UsY0FBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7WUFDNUIsQ0FBQyxnQkFBZ0I7Z0JBQ2YsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssV0FBVztnQkFDaEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUNUOztrQkFDTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUU5QixJQUNFLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbEQsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUMzQjtnQkFDQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDbkI7U0FDRjtJQUNILENBQUMsRUFBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvblJlZHVjZXIgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiwgaGFzT3duUHJvcGVydHksIGlzT2JqZWN0TGlrZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW1tdXRhYmlsaXR5Q2hlY2tNZXRhUmVkdWNlcihcbiAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4sXG4gIGNoZWNrczogeyBhY3Rpb246IGJvb2xlYW47IHN0YXRlOiBib29sZWFuIH1cbik6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBjb25zdCBhY3QgPSBjaGVja3MuYWN0aW9uID8gZnJlZXplKGFjdGlvbikgOiBhY3Rpb247XG5cbiAgICBjb25zdCBuZXh0U3RhdGUgPSByZWR1Y2VyKHN0YXRlLCBhY3QpO1xuXG4gICAgcmV0dXJuIGNoZWNrcy5zdGF0ZSA/IGZyZWV6ZShuZXh0U3RhdGUpIDogbmV4dFN0YXRlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBmcmVlemUodGFyZ2V0OiBhbnkpIHtcbiAgT2JqZWN0LmZyZWV6ZSh0YXJnZXQpO1xuXG4gIGNvbnN0IHRhcmdldElzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uKHRhcmdldCk7XG5cbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KS5mb3JFYWNoKHByb3AgPT4ge1xuICAgIGlmIChcbiAgICAgIGhhc093blByb3BlcnR5KHRhcmdldCwgcHJvcCkgJiZcbiAgICAgICh0YXJnZXRJc0Z1bmN0aW9uXG4gICAgICAgID8gcHJvcCAhPT0gJ2NhbGxlcicgJiYgcHJvcCAhPT0gJ2NhbGxlZScgJiYgcHJvcCAhPT0gJ2FyZ3VtZW50cydcbiAgICAgICAgOiB0cnVlKVxuICAgICkge1xuICAgICAgY29uc3QgcHJvcFZhbHVlID0gdGFyZ2V0W3Byb3BdO1xuXG4gICAgICBpZiAoXG4gICAgICAgIChpc09iamVjdExpa2UocHJvcFZhbHVlKSB8fCBpc0Z1bmN0aW9uKHByb3BWYWx1ZSkpICYmXG4gICAgICAgICFPYmplY3QuaXNGcm96ZW4ocHJvcFZhbHVlKVxuICAgICAgKSB7XG4gICAgICAgIGZyZWV6ZShwcm9wVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cbiJdfQ==