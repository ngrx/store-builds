/**
 * @fileoverview added by tsickle
 * Generated from: src/reducer_manager.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActionsSubject } from './actions_subject';
import { INITIAL_REDUCERS, INITIAL_STATE, REDUCER_FACTORY } from './tokens';
import { createFeatureReducerFactory, createReducerFactory, omit, } from './utils';
/**
 * @abstract
 */
export class ReducerObservable extends Observable {
}
/**
 * @abstract
 */
export class ReducerManagerDispatcher extends ActionsSubject {
}
/** @type {?} */
export const UPDATE = (/** @type {?} */ ('@ngrx/store/update-reducers'));
export class ReducerManager extends BehaviorSubject {
    /**
     * @param {?} dispatcher
     * @param {?} initialState
     * @param {?} reducers
     * @param {?} reducerFactory
     */
    constructor(dispatcher, initialState, reducers, reducerFactory) {
        super(reducerFactory(reducers, initialState));
        this.dispatcher = dispatcher;
        this.initialState = initialState;
        this.reducers = reducers;
        this.reducerFactory = reducerFactory;
    }
    /**
     * @param {?} feature
     * @return {?}
     */
    addFeature(feature) {
        this.addFeatures([feature]);
    }
    /**
     * @param {?} features
     * @return {?}
     */
    addFeatures(features) {
        /** @type {?} */
        const reducers = features.reduce((/**
         * @param {?} reducerDict
         * @param {?} __1
         * @return {?}
         */
        (reducerDict, { reducers, reducerFactory, metaReducers, initialState, key }) => {
            /** @type {?} */
            const reducer = typeof reducers === 'function'
                ? createFeatureReducerFactory(metaReducers)(reducers, initialState)
                : createReducerFactory(reducerFactory, metaReducers)(reducers, initialState);
            reducerDict[key] = reducer;
            return reducerDict;
        }), (/** @type {?} */ ({})));
        this.addReducers(reducers);
    }
    /**
     * @param {?} feature
     * @return {?}
     */
    removeFeature(feature) {
        this.removeFeatures([feature]);
    }
    /**
     * @param {?} features
     * @return {?}
     */
    removeFeatures(features) {
        this.removeReducers(features.map((/**
         * @param {?} p
         * @return {?}
         */
        (p) => p.key)));
    }
    /**
     * @param {?} key
     * @param {?} reducer
     * @return {?}
     */
    addReducer(key, reducer) {
        this.addReducers({ [key]: reducer });
    }
    /**
     * @param {?} reducers
     * @return {?}
     */
    addReducers(reducers) {
        this.reducers = Object.assign(Object.assign({}, this.reducers), reducers);
        this.updateReducers(Object.keys(reducers));
    }
    /**
     * @param {?} featureKey
     * @return {?}
     */
    removeReducer(featureKey) {
        this.removeReducers([featureKey]);
    }
    /**
     * @param {?} featureKeys
     * @return {?}
     */
    removeReducers(featureKeys) {
        featureKeys.forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            this.reducers = (/** @type {?} */ (omit(this.reducers, key) /*TODO(#823)*/));
        }));
        this.updateReducers(featureKeys);
    }
    /**
     * @private
     * @param {?} featureKeys
     * @return {?}
     */
    updateReducers(featureKeys) {
        this.next(this.reducerFactory(this.reducers, this.initialState));
        this.dispatcher.next((/** @type {?} */ ({
            type: UPDATE,
            features: featureKeys,
        })));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.complete();
    }
}
ReducerManager.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ReducerManager.ctorParameters = () => [
    { type: ReducerManagerDispatcher },
    { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [INITIAL_REDUCERS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [REDUCER_FACTORY,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ReducerManager.prototype.dispatcher;
    /**
     * @type {?}
     * @private
     */
    ReducerManager.prototype.initialState;
    /**
     * @type {?}
     * @private
     */
    ReducerManager.prototype.reducers;
    /**
     * @type {?}
     * @private
     */
    ReducerManager.prototype.reducerFactory;
}
/** @type {?} */
export const REDUCER_MANAGER_PROVIDERS = [
    ReducerManager,
    { provide: ReducerObservable, useExisting: ReducerManager },
    { provide: ReducerManagerDispatcher, useExisting: ActionsSubject },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQVFuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM1RSxPQUFPLEVBQ0wsMkJBQTJCLEVBQzNCLG9CQUFvQixFQUNwQixJQUFJLEdBQ0wsTUFBTSxTQUFTLENBQUM7Ozs7QUFFakIsTUFBTSxPQUFnQixpQkFBa0IsU0FBUSxVQUUvQztDQUFHOzs7O0FBQ0osTUFBTSxPQUFnQix3QkFBeUIsU0FBUSxjQUFjO0NBQUc7O0FBQ3hFLE1BQU0sT0FBTyxNQUFNLEdBQUcsbUJBQUEsNkJBQTZCLEVBQWlDO0FBR3BGLE1BQU0sT0FBTyxjQUFlLFNBQVEsZUFBd0M7Ozs7Ozs7SUFFMUUsWUFDVSxVQUFvQyxFQUNiLFlBQWlCLEVBQ2QsUUFBb0MsRUFFOUQsY0FBOEM7UUFFdEQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztRQU50QyxlQUFVLEdBQVYsVUFBVSxDQUEwQjtRQUNiLGlCQUFZLEdBQVosWUFBWSxDQUFLO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBNEI7UUFFOUQsbUJBQWMsR0FBZCxjQUFjLENBQWdDO0lBR3hELENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLE9BQStCO1FBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLFFBQWtDOztjQUN0QyxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU07Ozs7O1FBQzlCLENBQ0UsV0FBVyxFQUNYLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxFQUM3RCxFQUFFOztrQkFDSSxPQUFPLEdBQ1gsT0FBTyxRQUFRLEtBQUssVUFBVTtnQkFDNUIsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUM7Z0JBQ25FLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQ2hELFFBQVEsRUFDUixZQUFZLENBQ2I7WUFFUCxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDO1lBQzNCLE9BQU8sV0FBVyxDQUFDO1FBQ3JCLENBQUMsR0FDRCxtQkFBQSxFQUFFLEVBQThDLENBQ2pEO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxPQUErQjtRQUMzQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxRQUFrQztRQUMvQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7OztJQUVELFVBQVUsQ0FBQyxHQUFXLEVBQUUsT0FBZ0M7UUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxRQUFvRDtRQUM5RCxJQUFJLENBQUMsUUFBUSxtQ0FBUSxJQUFJLENBQUMsUUFBUSxHQUFLLFFBQVEsQ0FBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLFVBQWtCO1FBQzlCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLFdBQXFCO1FBQ2xDLFdBQVcsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLG1CQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBTyxDQUFDO1FBQ2pFLENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7Ozs7SUFFTyxjQUFjLENBQUMsV0FBcUI7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsbUJBQVE7WUFDM0IsSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLEVBQUUsV0FBVztTQUN0QixFQUFBLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7OztZQTlFRixVQUFVOzs7O1lBSWEsd0JBQXdCOzRDQUMzQyxNQUFNLFNBQUMsYUFBYTs0Q0FDcEIsTUFBTSxTQUFDLGdCQUFnQjs0Q0FDdkIsTUFBTSxTQUFDLGVBQWU7Ozs7Ozs7SUFIdkIsb0NBQTRDOzs7OztJQUM1QyxzQ0FBZ0Q7Ozs7O0lBQ2hELGtDQUFzRTs7Ozs7SUFDdEUsd0NBQ3NEOzs7QUF5RTFELE1BQU0sT0FBTyx5QkFBeUIsR0FBZTtJQUNuRCxjQUFjO0lBQ2QsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRTtJQUMzRCxFQUFFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFO0NBQ25FIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQWN0aW9uc1N1YmplY3QgfSBmcm9tICcuL2FjdGlvbnNfc3ViamVjdCc7XG5pbXBvcnQge1xuICBBY3Rpb24sXG4gIEFjdGlvblJlZHVjZXIsXG4gIEFjdGlvblJlZHVjZXJGYWN0b3J5LFxuICBBY3Rpb25SZWR1Y2VyTWFwLFxuICBTdG9yZUZlYXR1cmUsXG59IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IElOSVRJQUxfUkVEVUNFUlMsIElOSVRJQUxfU1RBVEUsIFJFRFVDRVJfRkFDVE9SWSB9IGZyb20gJy4vdG9rZW5zJztcbmltcG9ydCB7XG4gIGNyZWF0ZUZlYXR1cmVSZWR1Y2VyRmFjdG9yeSxcbiAgY3JlYXRlUmVkdWNlckZhY3RvcnksXG4gIG9taXQsXG59IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVkdWNlck9ic2VydmFibGUgZXh0ZW5kcyBPYnNlcnZhYmxlPFxuICBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PlxuPiB7fVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlZHVjZXJNYW5hZ2VyRGlzcGF0Y2hlciBleHRlbmRzIEFjdGlvbnNTdWJqZWN0IHt9XG5leHBvcnQgY29uc3QgVVBEQVRFID0gJ0BuZ3J4L3N0b3JlL3VwZGF0ZS1yZWR1Y2VycycgYXMgJ0BuZ3J4L3N0b3JlL3VwZGF0ZS1yZWR1Y2Vycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZWR1Y2VyTWFuYWdlciBleHRlbmRzIEJlaGF2aW9yU3ViamVjdDxBY3Rpb25SZWR1Y2VyPGFueSwgYW55Pj5cbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRpc3BhdGNoZXI6IFJlZHVjZXJNYW5hZ2VyRGlzcGF0Y2hlcixcbiAgICBASW5qZWN0KElOSVRJQUxfU1RBVEUpIHByaXZhdGUgaW5pdGlhbFN0YXRlOiBhbnksXG4gICAgQEluamVjdChJTklUSUFMX1JFRFVDRVJTKSBwcml2YXRlIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PixcbiAgICBASW5qZWN0KFJFRFVDRVJfRkFDVE9SWSlcbiAgICBwcml2YXRlIHJlZHVjZXJGYWN0b3J5OiBBY3Rpb25SZWR1Y2VyRmFjdG9yeTxhbnksIGFueT5cbiAgKSB7XG4gICAgc3VwZXIocmVkdWNlckZhY3RvcnkocmVkdWNlcnMsIGluaXRpYWxTdGF0ZSkpO1xuICB9XG5cbiAgYWRkRmVhdHVyZShmZWF0dXJlOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+KSB7XG4gICAgdGhpcy5hZGRGZWF0dXJlcyhbZmVhdHVyZV0pO1xuICB9XG5cbiAgYWRkRmVhdHVyZXMoZmVhdHVyZXM6IFN0b3JlRmVhdHVyZTxhbnksIGFueT5bXSkge1xuICAgIGNvbnN0IHJlZHVjZXJzID0gZmVhdHVyZXMucmVkdWNlKFxuICAgICAgKFxuICAgICAgICByZWR1Y2VyRGljdCxcbiAgICAgICAgeyByZWR1Y2VycywgcmVkdWNlckZhY3RvcnksIG1ldGFSZWR1Y2VycywgaW5pdGlhbFN0YXRlLCBrZXkgfVxuICAgICAgKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlZHVjZXIgPVxuICAgICAgICAgIHR5cGVvZiByZWR1Y2VycyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyBjcmVhdGVGZWF0dXJlUmVkdWNlckZhY3RvcnkobWV0YVJlZHVjZXJzKShyZWR1Y2VycywgaW5pdGlhbFN0YXRlKVxuICAgICAgICAgICAgOiBjcmVhdGVSZWR1Y2VyRmFjdG9yeShyZWR1Y2VyRmFjdG9yeSwgbWV0YVJlZHVjZXJzKShcbiAgICAgICAgICAgICAgICByZWR1Y2VycyxcbiAgICAgICAgICAgICAgICBpbml0aWFsU3RhdGVcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICByZWR1Y2VyRGljdFtrZXldID0gcmVkdWNlcjtcbiAgICAgICAgcmV0dXJuIHJlZHVjZXJEaWN0O1xuICAgICAgfSxcbiAgICAgIHt9IGFzIHsgW2tleTogc3RyaW5nXTogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4gfVxuICAgICk7XG5cbiAgICB0aGlzLmFkZFJlZHVjZXJzKHJlZHVjZXJzKTtcbiAgfVxuXG4gIHJlbW92ZUZlYXR1cmUoZmVhdHVyZTogU3RvcmVGZWF0dXJlPGFueSwgYW55Pikge1xuICAgIHRoaXMucmVtb3ZlRmVhdHVyZXMoW2ZlYXR1cmVdKTtcbiAgfVxuXG4gIHJlbW92ZUZlYXR1cmVzKGZlYXR1cmVzOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+W10pIHtcbiAgICB0aGlzLnJlbW92ZVJlZHVjZXJzKGZlYXR1cmVzLm1hcCgocCkgPT4gcC5rZXkpKTtcbiAgfVxuXG4gIGFkZFJlZHVjZXIoa2V5OiBzdHJpbmcsIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+KSB7XG4gICAgdGhpcy5hZGRSZWR1Y2Vycyh7IFtrZXldOiByZWR1Y2VyIH0pO1xuICB9XG5cbiAgYWRkUmVkdWNlcnMocmVkdWNlcnM6IHsgW2tleTogc3RyaW5nXTogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4gfSkge1xuICAgIHRoaXMucmVkdWNlcnMgPSB7IC4uLnRoaXMucmVkdWNlcnMsIC4uLnJlZHVjZXJzIH07XG4gICAgdGhpcy51cGRhdGVSZWR1Y2VycyhPYmplY3Qua2V5cyhyZWR1Y2VycykpO1xuICB9XG5cbiAgcmVtb3ZlUmVkdWNlcihmZWF0dXJlS2V5OiBzdHJpbmcpIHtcbiAgICB0aGlzLnJlbW92ZVJlZHVjZXJzKFtmZWF0dXJlS2V5XSk7XG4gIH1cblxuICByZW1vdmVSZWR1Y2VycyhmZWF0dXJlS2V5czogc3RyaW5nW10pIHtcbiAgICBmZWF0dXJlS2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHRoaXMucmVkdWNlcnMgPSBvbWl0KHRoaXMucmVkdWNlcnMsIGtleSkgLypUT0RPKCM4MjMpKi8gYXMgYW55O1xuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlUmVkdWNlcnMoZmVhdHVyZUtleXMpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVSZWR1Y2VycyhmZWF0dXJlS2V5czogc3RyaW5nW10pIHtcbiAgICB0aGlzLm5leHQodGhpcy5yZWR1Y2VyRmFjdG9yeSh0aGlzLnJlZHVjZXJzLCB0aGlzLmluaXRpYWxTdGF0ZSkpO1xuICAgIHRoaXMuZGlzcGF0Y2hlci5uZXh0KDxBY3Rpb24+e1xuICAgICAgdHlwZTogVVBEQVRFLFxuICAgICAgZmVhdHVyZXM6IGZlYXR1cmVLZXlzLFxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jb21wbGV0ZSgpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBSRURVQ0VSX01BTkFHRVJfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICBSZWR1Y2VyTWFuYWdlcixcbiAgeyBwcm92aWRlOiBSZWR1Y2VyT2JzZXJ2YWJsZSwgdXNlRXhpc3Rpbmc6IFJlZHVjZXJNYW5hZ2VyIH0sXG4gIHsgcHJvdmlkZTogUmVkdWNlck1hbmFnZXJEaXNwYXRjaGVyLCB1c2VFeGlzdGluZzogQWN0aW9uc1N1YmplY3QgfSxcbl07XG4iXX0=