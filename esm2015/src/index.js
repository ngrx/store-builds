export { createAction, props, union } from './action_creator';
export { Store, select } from './store';
export { combineReducers, compose, createReducerFactory } from './utils';
export { ActionsSubject, INIT } from './actions_subject';
export { setNgrxMockEnvironment, isNgrxMockEnvironment } from './flags';
export { ReducerManager, ReducerObservable, ReducerManagerDispatcher, UPDATE, } from './reducer_manager';
export { ScannedActionsSubject } from './scanned_actions_subject';
export { createSelector, createSelectorFactory, createFeatureSelector, defaultMemoize, defaultStateFn, resultMemoize, } from './selector';
export { State, StateObservable, reduceState } from './state';
export { INITIAL_STATE, REDUCER_FACTORY, INITIAL_REDUCERS, STORE_FEATURES, META_REDUCERS, FEATURE_REDUCERS, USER_PROVIDED_META_REDUCERS, USER_RUNTIME_CHECKS, ACTIVE_RUNTIME_CHECKS, } from './tokens';
export { StoreModule, StoreRootModule, StoreFeatureModule, } from './store_module';
export { on, createReducer } from './reducer_creator';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFlQSxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN4RSxPQUFPLEVBQ0wsY0FBYyxFQUNkLGlCQUFpQixFQUNqQix3QkFBd0IsRUFDeEIsTUFBTSxHQUNQLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUNMLGNBQWMsRUFDZCxxQkFBcUIsRUFDckIscUJBQXFCLEVBQ3JCLGNBQWMsRUFDZCxjQUFjLEVBS2QsYUFBYSxHQUVkLE1BQU0sWUFBWSxDQUFDO0FBQ3BCLE9BQU8sRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsYUFBYSxFQUNiLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsMkJBQTJCLEVBQzNCLG1CQUFtQixFQUNuQixxQkFBcUIsR0FDdEIsTUFBTSxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUNMLFdBQVcsRUFDWCxlQUFlLEVBQ2Ysa0JBQWtCLEdBSW5CLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFnQixFQUFFLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge1xuICBBY3Rpb24sXG4gIEFjdGlvbkNyZWF0b3IsXG4gIEFjdGlvblJlZHVjZXIsXG4gIEFjdGlvblJlZHVjZXJNYXAsXG4gIEFjdGlvblJlZHVjZXJGYWN0b3J5LFxuICBBY3Rpb25UeXBlLFxuICBDcmVhdG9yLFxuICBNZXRhUmVkdWNlcixcbiAgTm90QWxsb3dlZENoZWNrLFxuICBBY3Rpb25DcmVhdG9yUHJvcHMsXG4gIFNlbGVjdG9yLFxuICBTZWxlY3RvcldpdGhQcm9wcyxcbiAgUnVudGltZUNoZWNrcyxcbn0gZnJvbSAnLi9tb2RlbHMnO1xuZXhwb3J0IHsgY3JlYXRlQWN0aW9uLCBwcm9wcywgdW5pb24gfSBmcm9tICcuL2FjdGlvbl9jcmVhdG9yJztcbmV4cG9ydCB7IFN0b3JlLCBzZWxlY3QgfSBmcm9tICcuL3N0b3JlJztcbmV4cG9ydCB7IGNvbWJpbmVSZWR1Y2VycywgY29tcG9zZSwgY3JlYXRlUmVkdWNlckZhY3RvcnkgfSBmcm9tICcuL3V0aWxzJztcbmV4cG9ydCB7IEFjdGlvbnNTdWJqZWN0LCBJTklUIH0gZnJvbSAnLi9hY3Rpb25zX3N1YmplY3QnO1xuZXhwb3J0IHsgc2V0TmdyeE1vY2tFbnZpcm9ubWVudCwgaXNOZ3J4TW9ja0Vudmlyb25tZW50IH0gZnJvbSAnLi9mbGFncyc7XG5leHBvcnQge1xuICBSZWR1Y2VyTWFuYWdlcixcbiAgUmVkdWNlck9ic2VydmFibGUsXG4gIFJlZHVjZXJNYW5hZ2VyRGlzcGF0Y2hlcixcbiAgVVBEQVRFLFxufSBmcm9tICcuL3JlZHVjZXJfbWFuYWdlcic7XG5leHBvcnQgeyBTY2FubmVkQWN0aW9uc1N1YmplY3QgfSBmcm9tICcuL3NjYW5uZWRfYWN0aW9uc19zdWJqZWN0JztcbmV4cG9ydCB7XG4gIGNyZWF0ZVNlbGVjdG9yLFxuICBjcmVhdGVTZWxlY3RvckZhY3RvcnksXG4gIGNyZWF0ZUZlYXR1cmVTZWxlY3RvcixcbiAgZGVmYXVsdE1lbW9pemUsXG4gIGRlZmF1bHRTdGF0ZUZuLFxuICBNZW1vaXplRm4sXG4gIE1lbW9pemVkUHJvamVjdGlvbixcbiAgTWVtb2l6ZWRTZWxlY3RvcixcbiAgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wcyxcbiAgcmVzdWx0TWVtb2l6ZSxcbiAgRGVmYXVsdFByb2plY3RvckZuLFxufSBmcm9tICcuL3NlbGVjdG9yJztcbmV4cG9ydCB7IFN0YXRlLCBTdGF0ZU9ic2VydmFibGUsIHJlZHVjZVN0YXRlIH0gZnJvbSAnLi9zdGF0ZSc7XG5leHBvcnQge1xuICBJTklUSUFMX1NUQVRFLFxuICBSRURVQ0VSX0ZBQ1RPUlksXG4gIElOSVRJQUxfUkVEVUNFUlMsXG4gIFNUT1JFX0ZFQVRVUkVTLFxuICBNRVRBX1JFRFVDRVJTLFxuICBGRUFUVVJFX1JFRFVDRVJTLFxuICBVU0VSX1BST1ZJREVEX01FVEFfUkVEVUNFUlMsXG4gIFVTRVJfUlVOVElNRV9DSEVDS1MsXG4gIEFDVElWRV9SVU5USU1FX0NIRUNLUyxcbn0gZnJvbSAnLi90b2tlbnMnO1xuZXhwb3J0IHtcbiAgU3RvcmVNb2R1bGUsXG4gIFN0b3JlUm9vdE1vZHVsZSxcbiAgU3RvcmVGZWF0dXJlTW9kdWxlLFxuICBSb290U3RvcmVDb25maWcsXG4gIFN0b3JlQ29uZmlnLFxuICBGZWF0dXJlU2xpY2UsXG59IGZyb20gJy4vc3RvcmVfbW9kdWxlJztcbmV4cG9ydCB7IFJlZHVjZXJUeXBlcywgb24sIGNyZWF0ZVJlZHVjZXIgfSBmcm9tICcuL3JlZHVjZXJfY3JlYXRvcic7XG4iXX0=