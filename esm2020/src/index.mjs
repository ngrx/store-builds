export { createAction, props, union } from './action_creator';
export { createActionGroup, emptyProps } from './action_group_creator';
export { Store, select } from './store';
export { combineReducers, compose, createReducerFactory } from './utils';
export { ActionsSubject, INIT } from './actions_subject';
export { createFeature } from './feature_creator';
export { setNgrxMockEnvironment, isNgrxMockEnvironment } from './flags';
export { ReducerManager, ReducerObservable, ReducerManagerDispatcher, UPDATE, } from './reducer_manager';
export { ScannedActionsSubject } from './scanned_actions_subject';
export { createSelector, createSelectorFactory, createFeatureSelector, defaultMemoize, defaultStateFn, resultMemoize, } from './selector';
export { State, StateObservable, reduceState } from './state';
export { INITIAL_STATE, REDUCER_FACTORY, INITIAL_REDUCERS, STORE_FEATURES, META_REDUCERS, FEATURE_REDUCERS, USER_PROVIDED_META_REDUCERS, USER_RUNTIME_CHECKS, ACTIVE_RUNTIME_CHECKS, } from './tokens';
export { StoreModule, StoreRootModule, StoreFeatureModule, } from './store_module';
export { on, createReducer } from './reducer_creator';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQkEsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBaUIsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDeEUsT0FBTyxFQUNMLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsd0JBQXdCLEVBQ3hCLE1BQU0sR0FDUCxNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFDTCxjQUFjLEVBQ2QscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUNyQixjQUFjLEVBQ2QsY0FBYyxFQUtkLGFBQWEsR0FFZCxNQUFNLFlBQVksQ0FBQztBQUNwQixPQUFPLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDOUQsT0FBTyxFQUNMLGFBQWEsRUFDYixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLDJCQUEyQixFQUMzQixtQkFBbUIsRUFDbkIscUJBQXFCLEdBQ3RCLE1BQU0sVUFBVSxDQUFDO0FBQ2xCLE9BQU8sRUFDTCxXQUFXLEVBQ1gsZUFBZSxFQUNmLGtCQUFrQixHQUluQixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBZ0IsRUFBRSxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHtcbiAgQWN0aW9uLFxuICBBY3Rpb25DcmVhdG9yLFxuICBBY3Rpb25SZWR1Y2VyLFxuICBBY3Rpb25SZWR1Y2VyTWFwLFxuICBBY3Rpb25SZWR1Y2VyRmFjdG9yeSxcbiAgQWN0aW9uVHlwZSxcbiAgQ3JlYXRvcixcbiAgTWV0YVJlZHVjZXIsXG4gIE5vdEFsbG93ZWRDaGVjayxcbiAgQWN0aW9uQ3JlYXRvclByb3BzLFxuICBTZWxlY3RvcixcbiAgU2VsZWN0b3JXaXRoUHJvcHMsXG4gIFJ1bnRpbWVDaGVja3MsXG4gIEZ1bmN0aW9uV2l0aFBhcmFtZXRlcnNUeXBlLFxufSBmcm9tICcuL21vZGVscyc7XG5leHBvcnQgeyBjcmVhdGVBY3Rpb24sIHByb3BzLCB1bmlvbiB9IGZyb20gJy4vYWN0aW9uX2NyZWF0b3InO1xuZXhwb3J0IHsgY3JlYXRlQWN0aW9uR3JvdXAsIGVtcHR5UHJvcHMgfSBmcm9tICcuL2FjdGlvbl9ncm91cF9jcmVhdG9yJztcbmV4cG9ydCB7IFN0b3JlLCBzZWxlY3QgfSBmcm9tICcuL3N0b3JlJztcbmV4cG9ydCB7IGNvbWJpbmVSZWR1Y2VycywgY29tcG9zZSwgY3JlYXRlUmVkdWNlckZhY3RvcnkgfSBmcm9tICcuL3V0aWxzJztcbmV4cG9ydCB7IEFjdGlvbnNTdWJqZWN0LCBJTklUIH0gZnJvbSAnLi9hY3Rpb25zX3N1YmplY3QnO1xuZXhwb3J0IHsgY3JlYXRlRmVhdHVyZSwgRmVhdHVyZUNvbmZpZyB9IGZyb20gJy4vZmVhdHVyZV9jcmVhdG9yJztcbmV4cG9ydCB7IHNldE5ncnhNb2NrRW52aXJvbm1lbnQsIGlzTmdyeE1vY2tFbnZpcm9ubWVudCB9IGZyb20gJy4vZmxhZ3MnO1xuZXhwb3J0IHtcbiAgUmVkdWNlck1hbmFnZXIsXG4gIFJlZHVjZXJPYnNlcnZhYmxlLFxuICBSZWR1Y2VyTWFuYWdlckRpc3BhdGNoZXIsXG4gIFVQREFURSxcbn0gZnJvbSAnLi9yZWR1Y2VyX21hbmFnZXInO1xuZXhwb3J0IHsgU2Nhbm5lZEFjdGlvbnNTdWJqZWN0IH0gZnJvbSAnLi9zY2FubmVkX2FjdGlvbnNfc3ViamVjdCc7XG5leHBvcnQge1xuICBjcmVhdGVTZWxlY3RvcixcbiAgY3JlYXRlU2VsZWN0b3JGYWN0b3J5LFxuICBjcmVhdGVGZWF0dXJlU2VsZWN0b3IsXG4gIGRlZmF1bHRNZW1vaXplLFxuICBkZWZhdWx0U3RhdGVGbixcbiAgTWVtb2l6ZUZuLFxuICBNZW1vaXplZFByb2plY3Rpb24sXG4gIE1lbW9pemVkU2VsZWN0b3IsXG4gIE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHMsXG4gIHJlc3VsdE1lbW9pemUsXG4gIERlZmF1bHRQcm9qZWN0b3JGbixcbn0gZnJvbSAnLi9zZWxlY3Rvcic7XG5leHBvcnQgeyBTdGF0ZSwgU3RhdGVPYnNlcnZhYmxlLCByZWR1Y2VTdGF0ZSB9IGZyb20gJy4vc3RhdGUnO1xuZXhwb3J0IHtcbiAgSU5JVElBTF9TVEFURSxcbiAgUkVEVUNFUl9GQUNUT1JZLFxuICBJTklUSUFMX1JFRFVDRVJTLFxuICBTVE9SRV9GRUFUVVJFUyxcbiAgTUVUQV9SRURVQ0VSUyxcbiAgRkVBVFVSRV9SRURVQ0VSUyxcbiAgVVNFUl9QUk9WSURFRF9NRVRBX1JFRFVDRVJTLFxuICBVU0VSX1JVTlRJTUVfQ0hFQ0tTLFxuICBBQ1RJVkVfUlVOVElNRV9DSEVDS1MsXG59IGZyb20gJy4vdG9rZW5zJztcbmV4cG9ydCB7XG4gIFN0b3JlTW9kdWxlLFxuICBTdG9yZVJvb3RNb2R1bGUsXG4gIFN0b3JlRmVhdHVyZU1vZHVsZSxcbiAgUm9vdFN0b3JlQ29uZmlnLFxuICBTdG9yZUNvbmZpZyxcbiAgRmVhdHVyZVNsaWNlLFxufSBmcm9tICcuL3N0b3JlX21vZHVsZSc7XG5leHBvcnQgeyBSZWR1Y2VyVHlwZXMsIG9uLCBjcmVhdGVSZWR1Y2VyIH0gZnJvbSAnLi9yZWR1Y2VyX2NyZWF0b3InO1xuIl19