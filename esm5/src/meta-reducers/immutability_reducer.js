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
        var act = checks.action(action) ? freeze(action) : action;
        /** @type {?} */
        var nextState = reducer(state, act);
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
    var targetIsFunction = isFunction(target);
    Object.getOwnPropertyNames(target).forEach((/**
     * @param {?} prop
     * @return {?}
     */
    function (prop) {
        // Ignore Ivy properties, ref: https://github.com/ngrx/platform/issues/2109#issuecomment-582689060
        if (prop.startsWith('ɵ')) {
            return;
        }
        if (hasOwnProperty(target, prop) &&
            (targetIsFunction
                ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments'
                : true)) {
            /** @type {?} */
            var propValue = target[prop];
            if ((isObjectLike(propValue) || isFunction(propValue)) &&
                !Object.isFrozen(propValue)) {
                freeze(propValue);
            }
        }
    }));
    return target;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1tdXRhYmlsaXR5X3JlZHVjZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdyeC9zdG9yZS8iLCJzb3VyY2VzIjpbInNyYy9tZXRhLXJlZHVjZXJzL2ltbXV0YWJpbGl0eV9yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7QUFFbkUsTUFBTSxVQUFVLDRCQUE0QixDQUMxQyxPQUFnQyxFQUNoQyxNQUFxRTtJQUVyRTs7Ozs7SUFBTyxVQUFTLEtBQUssRUFBRSxNQUFNOztZQUNyQixHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNOztZQUVyRCxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7UUFFckMsT0FBTyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3hELENBQUMsRUFBQztBQUNKLENBQUM7Ozs7O0FBRUQsU0FBUyxNQUFNLENBQUMsTUFBVztJQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUVoQixnQkFBZ0IsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBRTNDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPOzs7O0lBQUMsVUFBQSxJQUFJO1FBQzdDLGtHQUFrRztRQUNsRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDeEIsT0FBTztTQUNSO1FBRUQsSUFDRSxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztZQUM1QixDQUFDLGdCQUFnQjtnQkFDZixDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksS0FBSyxXQUFXO2dCQUNoRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQ1Q7O2dCQUNNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBRTlCLElBQ0UsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNsRCxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQzNCO2dCQUNBLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNuQjtTQUNGO0lBQ0gsQ0FBQyxFQUFDLENBQUM7SUFFSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uUmVkdWNlciwgQWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IGlzRnVuY3Rpb24sIGhhc093blByb3BlcnR5LCBpc09iamVjdExpa2UgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGltbXV0YWJpbGl0eUNoZWNrTWV0YVJlZHVjZXIoXG4gIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+LFxuICBjaGVja3M6IHsgYWN0aW9uOiAoYWN0aW9uOiBBY3Rpb24pID0+IGJvb2xlYW47IHN0YXRlOiAoKSA9PiBib29sZWFuIH1cbik6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBjb25zdCBhY3QgPSBjaGVja3MuYWN0aW9uKGFjdGlvbikgPyBmcmVlemUoYWN0aW9uKSA6IGFjdGlvbjtcblxuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHJlZHVjZXIoc3RhdGUsIGFjdCk7XG5cbiAgICByZXR1cm4gY2hlY2tzLnN0YXRlKCkgPyBmcmVlemUobmV4dFN0YXRlKSA6IG5leHRTdGF0ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZnJlZXplKHRhcmdldDogYW55KSB7XG4gIE9iamVjdC5mcmVlemUodGFyZ2V0KTtcblxuICBjb25zdCB0YXJnZXRJc0Z1bmN0aW9uID0gaXNGdW5jdGlvbih0YXJnZXQpO1xuXG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCkuZm9yRWFjaChwcm9wID0+IHtcbiAgICAvLyBJZ25vcmUgSXZ5IHByb3BlcnRpZXMsIHJlZjogaHR0cHM6Ly9naXRodWIuY29tL25ncngvcGxhdGZvcm0vaXNzdWVzLzIxMDkjaXNzdWVjb21tZW50LTU4MjY4OTA2MFxuICAgIGlmIChwcm9wLnN0YXJ0c1dpdGgoJ8m1JykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBoYXNPd25Qcm9wZXJ0eSh0YXJnZXQsIHByb3ApICYmXG4gICAgICAodGFyZ2V0SXNGdW5jdGlvblxuICAgICAgICA/IHByb3AgIT09ICdjYWxsZXInICYmIHByb3AgIT09ICdjYWxsZWUnICYmIHByb3AgIT09ICdhcmd1bWVudHMnXG4gICAgICAgIDogdHJ1ZSlcbiAgICApIHtcbiAgICAgIGNvbnN0IHByb3BWYWx1ZSA9IHRhcmdldFtwcm9wXTtcblxuICAgICAgaWYgKFxuICAgICAgICAoaXNPYmplY3RMaWtlKHByb3BWYWx1ZSkgfHwgaXNGdW5jdGlvbihwcm9wVmFsdWUpKSAmJlxuICAgICAgICAhT2JqZWN0LmlzRnJvemVuKHByb3BWYWx1ZSlcbiAgICAgICkge1xuICAgICAgICBmcmVlemUocHJvcFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiB0YXJnZXQ7XG59XG4iXX0=