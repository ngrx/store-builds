/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getUnserializable, throwIfUnserializable } from './utils';
/**
 * @param {?} reducer
 * @return {?}
 */
export function stateSerializationCheckMetaReducer(reducer) {
    return (/**
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    function (state, action) {
        /** @type {?} */
        const nextState = reducer(state, action);
        /** @type {?} */
        const unserializable = getUnserializable(nextState);
        throwIfUnserializable(unserializable, 'state');
        return nextState;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfc2VyaWFsaXphdGlvbl9yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvbWV0YS1yZWR1Y2Vycy9zdGF0ZV9zZXJpYWxpemF0aW9uX3JlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7QUFFbkUsTUFBTSxVQUFVLGtDQUFrQyxDQUNoRCxPQUFnQztJQUVoQzs7Ozs7SUFBTyxVQUFTLEtBQUssRUFBRSxNQUFNOztjQUNyQixTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7O2NBRWxDLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7UUFDbkQscUJBQXFCLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRS9DLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUMsRUFBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25SZWR1Y2VyIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IGdldFVuc2VyaWFsaXphYmxlLCB0aHJvd0lmVW5zZXJpYWxpemFibGUgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXRlU2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIoXG4gIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+XG4pOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PiB7XG4gIHJldHVybiBmdW5jdGlvbihzdGF0ZSwgYWN0aW9uKSB7XG4gICAgY29uc3QgbmV4dFN0YXRlID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgIGNvbnN0IHVuc2VyaWFsaXphYmxlID0gZ2V0VW5zZXJpYWxpemFibGUobmV4dFN0YXRlKTtcbiAgICB0aHJvd0lmVW5zZXJpYWxpemFibGUodW5zZXJpYWxpemFibGUsICdzdGF0ZScpO1xuXG4gICAgcmV0dXJuIG5leHRTdGF0ZTtcbiAgfTtcbn1cbiJdfQ==