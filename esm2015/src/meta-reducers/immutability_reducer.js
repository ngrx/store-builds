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
    prop => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1tdXRhYmlsaXR5X3JlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9tZXRhLXJlZHVjZXJzL2ltbXV0YWJpbGl0eV9yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7QUFFbkUsTUFBTSxVQUFVLDRCQUE0QixDQUMxQyxPQUFnQyxFQUNoQyxNQUFxRTtJQUVyRTs7Ozs7SUFBTyxVQUFTLEtBQUssRUFBRSxNQUFNOztjQUNyQixHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNOztjQUVyRCxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7UUFFckMsT0FBTyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3hELENBQUMsRUFBQztBQUNKLENBQUM7Ozs7O0FBRUQsU0FBUyxNQUFNLENBQUMsTUFBVztJQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztVQUVoQixnQkFBZ0IsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBRTNDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPOzs7O0lBQUMsSUFBSSxDQUFDLEVBQUU7UUFDaEQsa0dBQWtHO1FBQ2xHLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN4QixPQUFPO1NBQ1I7UUFFRCxJQUNFLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO1lBQzVCLENBQUMsZ0JBQWdCO2dCQUNmLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxLQUFLLFdBQVc7Z0JBQ2hFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFDVDs7a0JBQ00sU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFFOUIsSUFDRSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2xELENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFDM0I7Z0JBQ0EsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ25CO1NBQ0Y7SUFDSCxDQUFDLEVBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25SZWR1Y2VyLCBBY3Rpb24gfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiwgaGFzT3duUHJvcGVydHksIGlzT2JqZWN0TGlrZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW1tdXRhYmlsaXR5Q2hlY2tNZXRhUmVkdWNlcihcbiAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4sXG4gIGNoZWNrczogeyBhY3Rpb246IChhY3Rpb246IEFjdGlvbikgPT4gYm9vbGVhbjsgc3RhdGU6ICgpID0+IGJvb2xlYW4gfVxuKTogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4ge1xuICByZXR1cm4gZnVuY3Rpb24oc3RhdGUsIGFjdGlvbikge1xuICAgIGNvbnN0IGFjdCA9IGNoZWNrcy5hY3Rpb24oYWN0aW9uKSA/IGZyZWV6ZShhY3Rpb24pIDogYWN0aW9uO1xuXG4gICAgY29uc3QgbmV4dFN0YXRlID0gcmVkdWNlcihzdGF0ZSwgYWN0KTtcblxuICAgIHJldHVybiBjaGVja3Muc3RhdGUoKSA/IGZyZWV6ZShuZXh0U3RhdGUpIDogbmV4dFN0YXRlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBmcmVlemUodGFyZ2V0OiBhbnkpIHtcbiAgT2JqZWN0LmZyZWV6ZSh0YXJnZXQpO1xuXG4gIGNvbnN0IHRhcmdldElzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uKHRhcmdldCk7XG5cbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KS5mb3JFYWNoKHByb3AgPT4ge1xuICAgIC8vIElnbm9yZSBJdnkgcHJvcGVydGllcywgcmVmOiBodHRwczovL2dpdGh1Yi5jb20vbmdyeC9wbGF0Zm9ybS9pc3N1ZXMvMjEwOSNpc3N1ZWNvbW1lbnQtNTgyNjg5MDYwXG4gICAgaWYgKHByb3Auc3RhcnRzV2l0aCgnybUnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGhhc093blByb3BlcnR5KHRhcmdldCwgcHJvcCkgJiZcbiAgICAgICh0YXJnZXRJc0Z1bmN0aW9uXG4gICAgICAgID8gcHJvcCAhPT0gJ2NhbGxlcicgJiYgcHJvcCAhPT0gJ2NhbGxlZScgJiYgcHJvcCAhPT0gJ2FyZ3VtZW50cydcbiAgICAgICAgOiB0cnVlKVxuICAgICkge1xuICAgICAgY29uc3QgcHJvcFZhbHVlID0gdGFyZ2V0W3Byb3BdO1xuXG4gICAgICBpZiAoXG4gICAgICAgIChpc09iamVjdExpa2UocHJvcFZhbHVlKSB8fCBpc0Z1bmN0aW9uKHByb3BWYWx1ZSkpICYmXG4gICAgICAgICFPYmplY3QuaXNGcm96ZW4ocHJvcFZhbHVlKVxuICAgICAgKSB7XG4gICAgICAgIGZyZWV6ZShwcm9wVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cbiJdfQ==