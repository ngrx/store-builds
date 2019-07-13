/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export { createAction, props, union } from './action_creator';
export { Store, select } from './store';
export { combineReducers, compose, createReducerFactory } from './utils';
export { ActionsSubject, INIT } from './actions_subject';
export { ReducerManager, ReducerObservable, ReducerManagerDispatcher, UPDATE, } from './reducer_manager';
export { ScannedActionsSubject } from './scanned_actions_subject';
export { createSelector, createSelectorFactory, createFeatureSelector, defaultMemoize, defaultStateFn, resultMemoize, } from './selector';
export { State, StateObservable, reduceState } from './state';
export { INITIAL_STATE, REDUCER_FACTORY, INITIAL_REDUCERS, STORE_FEATURES, META_REDUCERS, FEATURE_REDUCERS, USER_PROVIDED_META_REDUCERS, USER_RUNTIME_CHECKS, } from './tokens';
export { StoreModule, StoreRootModule, StoreFeatureModule, } from './store_module';
export { on, createReducer } from './reducer_creator';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBWUEsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDOUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDeEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN6RCxPQUFPLEVBQ0wsY0FBYyxFQUNkLGlCQUFpQixFQUNqQix3QkFBd0IsRUFDeEIsTUFBTSxHQUNQLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUNMLGNBQWMsRUFDZCxxQkFBcUIsRUFDckIscUJBQXFCLEVBQ3JCLGNBQWMsRUFDZCxjQUFjLEVBS2QsYUFBYSxHQUNkLE1BQU0sWUFBWSxDQUFDO0FBQ3BCLE9BQU8sRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsYUFBYSxFQUNiLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsMkJBQTJCLEVBQzNCLG1CQUFtQixHQUNwQixNQUFNLFVBQVUsQ0FBQztBQUNsQixPQUFPLEVBQ0wsV0FBVyxFQUNYLGVBQWUsRUFDZixrQkFBa0IsR0FHbkIsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHtcbiAgQWN0aW9uLFxuICBBY3Rpb25DcmVhdG9yLFxuICBBY3Rpb25SZWR1Y2VyLFxuICBBY3Rpb25SZWR1Y2VyTWFwLFxuICBBY3Rpb25SZWR1Y2VyRmFjdG9yeSxcbiAgQ3JlYXRvcixcbiAgTWV0YVJlZHVjZXIsXG4gIFNlbGVjdG9yLFxuICBTZWxlY3RvcldpdGhQcm9wcyxcbiAgUnVudGltZUNoZWNrcyxcbn0gZnJvbSAnLi9tb2RlbHMnO1xuZXhwb3J0IHsgY3JlYXRlQWN0aW9uLCBwcm9wcywgdW5pb24gfSBmcm9tICcuL2FjdGlvbl9jcmVhdG9yJztcbmV4cG9ydCB7IFN0b3JlLCBzZWxlY3QgfSBmcm9tICcuL3N0b3JlJztcbmV4cG9ydCB7IGNvbWJpbmVSZWR1Y2VycywgY29tcG9zZSwgY3JlYXRlUmVkdWNlckZhY3RvcnkgfSBmcm9tICcuL3V0aWxzJztcbmV4cG9ydCB7IEFjdGlvbnNTdWJqZWN0LCBJTklUIH0gZnJvbSAnLi9hY3Rpb25zX3N1YmplY3QnO1xuZXhwb3J0IHtcbiAgUmVkdWNlck1hbmFnZXIsXG4gIFJlZHVjZXJPYnNlcnZhYmxlLFxuICBSZWR1Y2VyTWFuYWdlckRpc3BhdGNoZXIsXG4gIFVQREFURSxcbn0gZnJvbSAnLi9yZWR1Y2VyX21hbmFnZXInO1xuZXhwb3J0IHsgU2Nhbm5lZEFjdGlvbnNTdWJqZWN0IH0gZnJvbSAnLi9zY2FubmVkX2FjdGlvbnNfc3ViamVjdCc7XG5leHBvcnQge1xuICBjcmVhdGVTZWxlY3RvcixcbiAgY3JlYXRlU2VsZWN0b3JGYWN0b3J5LFxuICBjcmVhdGVGZWF0dXJlU2VsZWN0b3IsXG4gIGRlZmF1bHRNZW1vaXplLFxuICBkZWZhdWx0U3RhdGVGbixcbiAgTWVtb2l6ZUZuLFxuICBNZW1vaXplZFByb2plY3Rpb24sXG4gIE1lbW9pemVkU2VsZWN0b3IsXG4gIE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHMsXG4gIHJlc3VsdE1lbW9pemUsXG59IGZyb20gJy4vc2VsZWN0b3InO1xuZXhwb3J0IHsgU3RhdGUsIFN0YXRlT2JzZXJ2YWJsZSwgcmVkdWNlU3RhdGUgfSBmcm9tICcuL3N0YXRlJztcbmV4cG9ydCB7XG4gIElOSVRJQUxfU1RBVEUsXG4gIFJFRFVDRVJfRkFDVE9SWSxcbiAgSU5JVElBTF9SRURVQ0VSUyxcbiAgU1RPUkVfRkVBVFVSRVMsXG4gIE1FVEFfUkVEVUNFUlMsXG4gIEZFQVRVUkVfUkVEVUNFUlMsXG4gIFVTRVJfUFJPVklERURfTUVUQV9SRURVQ0VSUyxcbiAgVVNFUl9SVU5USU1FX0NIRUNLUyxcbn0gZnJvbSAnLi90b2tlbnMnO1xuZXhwb3J0IHtcbiAgU3RvcmVNb2R1bGUsXG4gIFN0b3JlUm9vdE1vZHVsZSxcbiAgU3RvcmVGZWF0dXJlTW9kdWxlLFxuICBSb290U3RvcmVDb25maWcsXG4gIFN0b3JlQ29uZmlnLFxufSBmcm9tICcuL3N0b3JlX21vZHVsZSc7XG5leHBvcnQgeyBvbiwgY3JlYXRlUmVkdWNlciB9IGZyb20gJy4vcmVkdWNlcl9jcmVhdG9yJztcbiJdfQ==