/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/src/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQWFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzlELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekQsT0FBTyxFQUNMLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsd0JBQXdCLEVBQ3hCLE1BQU0sR0FDUCxNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFDTCxjQUFjLEVBQ2QscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUNyQixjQUFjLEVBQ2QsY0FBYyxFQUtkLGFBQWEsR0FFZCxNQUFNLFlBQVksQ0FBQztBQUNwQixPQUFPLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDOUQsT0FBTyxFQUNMLGFBQWEsRUFDYixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLDJCQUEyQixFQUMzQixtQkFBbUIsR0FDcEIsTUFBTSxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUNMLFdBQVcsRUFDWCxlQUFlLEVBQ2Ysa0JBQWtCLEdBR25CLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFNLEVBQUUsRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7XG4gIEFjdGlvbixcbiAgQWN0aW9uQ3JlYXRvcixcbiAgQWN0aW9uUmVkdWNlcixcbiAgQWN0aW9uUmVkdWNlck1hcCxcbiAgQWN0aW9uUmVkdWNlckZhY3RvcnksXG4gIEFjdGlvblR5cGUsXG4gIENyZWF0b3IsXG4gIE1ldGFSZWR1Y2VyLFxuICBTZWxlY3RvcixcbiAgU2VsZWN0b3JXaXRoUHJvcHMsXG4gIFJ1bnRpbWVDaGVja3MsXG59IGZyb20gJy4vbW9kZWxzJztcbmV4cG9ydCB7IGNyZWF0ZUFjdGlvbiwgcHJvcHMsIHVuaW9uIH0gZnJvbSAnLi9hY3Rpb25fY3JlYXRvcic7XG5leHBvcnQgeyBTdG9yZSwgc2VsZWN0IH0gZnJvbSAnLi9zdG9yZSc7XG5leHBvcnQgeyBjb21iaW5lUmVkdWNlcnMsIGNvbXBvc2UsIGNyZWF0ZVJlZHVjZXJGYWN0b3J5IH0gZnJvbSAnLi91dGlscyc7XG5leHBvcnQgeyBBY3Rpb25zU3ViamVjdCwgSU5JVCB9IGZyb20gJy4vYWN0aW9uc19zdWJqZWN0JztcbmV4cG9ydCB7XG4gIFJlZHVjZXJNYW5hZ2VyLFxuICBSZWR1Y2VyT2JzZXJ2YWJsZSxcbiAgUmVkdWNlck1hbmFnZXJEaXNwYXRjaGVyLFxuICBVUERBVEUsXG59IGZyb20gJy4vcmVkdWNlcl9tYW5hZ2VyJztcbmV4cG9ydCB7IFNjYW5uZWRBY3Rpb25zU3ViamVjdCB9IGZyb20gJy4vc2Nhbm5lZF9hY3Rpb25zX3N1YmplY3QnO1xuZXhwb3J0IHtcbiAgY3JlYXRlU2VsZWN0b3IsXG4gIGNyZWF0ZVNlbGVjdG9yRmFjdG9yeSxcbiAgY3JlYXRlRmVhdHVyZVNlbGVjdG9yLFxuICBkZWZhdWx0TWVtb2l6ZSxcbiAgZGVmYXVsdFN0YXRlRm4sXG4gIE1lbW9pemVGbixcbiAgTWVtb2l6ZWRQcm9qZWN0aW9uLFxuICBNZW1vaXplZFNlbGVjdG9yLFxuICBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzLFxuICByZXN1bHRNZW1vaXplLFxuICBEZWZhdWx0UHJvamVjdG9yRm4sXG59IGZyb20gJy4vc2VsZWN0b3InO1xuZXhwb3J0IHsgU3RhdGUsIFN0YXRlT2JzZXJ2YWJsZSwgcmVkdWNlU3RhdGUgfSBmcm9tICcuL3N0YXRlJztcbmV4cG9ydCB7XG4gIElOSVRJQUxfU1RBVEUsXG4gIFJFRFVDRVJfRkFDVE9SWSxcbiAgSU5JVElBTF9SRURVQ0VSUyxcbiAgU1RPUkVfRkVBVFVSRVMsXG4gIE1FVEFfUkVEVUNFUlMsXG4gIEZFQVRVUkVfUkVEVUNFUlMsXG4gIFVTRVJfUFJPVklERURfTUVUQV9SRURVQ0VSUyxcbiAgVVNFUl9SVU5USU1FX0NIRUNLUyxcbn0gZnJvbSAnLi90b2tlbnMnO1xuZXhwb3J0IHtcbiAgU3RvcmVNb2R1bGUsXG4gIFN0b3JlUm9vdE1vZHVsZSxcbiAgU3RvcmVGZWF0dXJlTW9kdWxlLFxuICBSb290U3RvcmVDb25maWcsXG4gIFN0b3JlQ29uZmlnLFxufSBmcm9tICcuL3N0b3JlX21vZHVsZSc7XG5leHBvcnQgeyBPbiwgb24sIGNyZWF0ZVJlZHVjZXIgfSBmcm9tICcuL3JlZHVjZXJfY3JlYXRvcic7XG4iXX0=