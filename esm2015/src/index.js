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
export { INITIAL_STATE, REDUCER_FACTORY, INITIAL_REDUCERS, STORE_FEATURES, META_REDUCERS, FEATURE_REDUCERS, USER_PROVIDED_META_REDUCERS, } from './tokens';
export { StoreModule, StoreRootModule, StoreFeatureModule, } from './store_module';
export { on, createReducer } from './reducer_creator';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBV0EsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDOUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDeEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN6RCxPQUFPLEVBQ0wsY0FBYyxFQUNkLGlCQUFpQixFQUNqQix3QkFBd0IsRUFDeEIsTUFBTSxHQUNQLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUNMLGNBQWMsRUFDZCxxQkFBcUIsRUFDckIscUJBQXFCLEVBQ3JCLGNBQWMsRUFDZCxjQUFjLEVBS2QsYUFBYSxHQUNkLE1BQU0sWUFBWSxDQUFDO0FBQ3BCLE9BQU8sRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsYUFBYSxFQUNiLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsMkJBQTJCLEdBQzVCLE1BQU0sVUFBVSxDQUFDO0FBQ2xCLE9BQU8sRUFDTCxXQUFXLEVBQ1gsZUFBZSxFQUNmLGtCQUFrQixHQUNuQixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge1xuICBBY3Rpb24sXG4gIEFjdGlvbkNyZWF0b3IsXG4gIEFjdGlvblJlZHVjZXIsXG4gIEFjdGlvblJlZHVjZXJNYXAsXG4gIEFjdGlvblJlZHVjZXJGYWN0b3J5LFxuICBDcmVhdG9yLFxuICBNZXRhUmVkdWNlcixcbiAgU2VsZWN0b3IsXG4gIFNlbGVjdG9yV2l0aFByb3BzLFxufSBmcm9tICcuL21vZGVscyc7XG5leHBvcnQgeyBjcmVhdGVBY3Rpb24sIHByb3BzLCB1bmlvbiB9IGZyb20gJy4vYWN0aW9uX2NyZWF0b3InO1xuZXhwb3J0IHsgU3RvcmUsIHNlbGVjdCB9IGZyb20gJy4vc3RvcmUnO1xuZXhwb3J0IHsgY29tYmluZVJlZHVjZXJzLCBjb21wb3NlLCBjcmVhdGVSZWR1Y2VyRmFjdG9yeSB9IGZyb20gJy4vdXRpbHMnO1xuZXhwb3J0IHsgQWN0aW9uc1N1YmplY3QsIElOSVQgfSBmcm9tICcuL2FjdGlvbnNfc3ViamVjdCc7XG5leHBvcnQge1xuICBSZWR1Y2VyTWFuYWdlcixcbiAgUmVkdWNlck9ic2VydmFibGUsXG4gIFJlZHVjZXJNYW5hZ2VyRGlzcGF0Y2hlcixcbiAgVVBEQVRFLFxufSBmcm9tICcuL3JlZHVjZXJfbWFuYWdlcic7XG5leHBvcnQgeyBTY2FubmVkQWN0aW9uc1N1YmplY3QgfSBmcm9tICcuL3NjYW5uZWRfYWN0aW9uc19zdWJqZWN0JztcbmV4cG9ydCB7XG4gIGNyZWF0ZVNlbGVjdG9yLFxuICBjcmVhdGVTZWxlY3RvckZhY3RvcnksXG4gIGNyZWF0ZUZlYXR1cmVTZWxlY3RvcixcbiAgZGVmYXVsdE1lbW9pemUsXG4gIGRlZmF1bHRTdGF0ZUZuLFxuICBNZW1vaXplRm4sXG4gIE1lbW9pemVkUHJvamVjdGlvbixcbiAgTWVtb2l6ZWRTZWxlY3RvcixcbiAgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wcyxcbiAgcmVzdWx0TWVtb2l6ZSxcbn0gZnJvbSAnLi9zZWxlY3Rvcic7XG5leHBvcnQgeyBTdGF0ZSwgU3RhdGVPYnNlcnZhYmxlLCByZWR1Y2VTdGF0ZSB9IGZyb20gJy4vc3RhdGUnO1xuZXhwb3J0IHtcbiAgSU5JVElBTF9TVEFURSxcbiAgUkVEVUNFUl9GQUNUT1JZLFxuICBJTklUSUFMX1JFRFVDRVJTLFxuICBTVE9SRV9GRUFUVVJFUyxcbiAgTUVUQV9SRURVQ0VSUyxcbiAgRkVBVFVSRV9SRURVQ0VSUyxcbiAgVVNFUl9QUk9WSURFRF9NRVRBX1JFRFVDRVJTLFxufSBmcm9tICcuL3Rva2Vucyc7XG5leHBvcnQge1xuICBTdG9yZU1vZHVsZSxcbiAgU3RvcmVSb290TW9kdWxlLFxuICBTdG9yZUZlYXR1cmVNb2R1bGUsXG59IGZyb20gJy4vc3RvcmVfbW9kdWxlJztcbmV4cG9ydCB7IG9uLCBjcmVhdGVSZWR1Y2VyIH0gZnJvbSAnLi9yZWR1Y2VyX2NyZWF0b3InO1xuIl19