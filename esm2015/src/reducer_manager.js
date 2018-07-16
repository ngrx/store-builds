/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
export const /** @type {?} */ UPDATE = /** @type {?} */ ('@ngrx/store/update-reducers');
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
        const /** @type {?} */ reducers = features.reduce((reducerDict, { reducers, reducerFactory, metaReducers, initialState, key }) => {
            const /** @type {?} */ reducer = typeof reducers === 'function'
                ? createFeatureReducerFactory(metaReducers)(reducers, initialState)
                : createReducerFactory(reducerFactory, metaReducers)(reducers, initialState);
            reducerDict[key] = reducer;
            return reducerDict;
        }, /** @type {?} */ ({}));
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
        this.removeReducers(features.map(p => p.key));
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
        this.reducers = Object.assign({}, this.reducers, reducers);
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
        featureKeys.forEach(key => {
            this.reducers = /** @type {?} */ (omit(this.reducers, key) /*TODO(#823)*/);
        });
        this.updateReducers(featureKeys);
    }
    /**
     * @param {?} featureKeys
     * @return {?}
     */
    updateReducers(featureKeys) {
        this.next(this.reducerFactory(this.reducers, this.initialState));
        featureKeys.forEach(feature => {
            this.dispatcher.next(/** @type {?} */ ({
                type: UPDATE,
                feature,
            }));
        });
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
    { type: ReducerManagerDispatcher, },
    { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] },] },
    { type: undefined, decorators: [{ type: Inject, args: [INITIAL_REDUCERS,] },] },
    { type: undefined, decorators: [{ type: Inject, args: [REDUCER_FACTORY,] },] },
];
function ReducerManager_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ReducerManager.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ReducerManager.ctorParameters;
    /** @type {?} */
    ReducerManager.prototype.dispatcher;
    /** @type {?} */
    ReducerManager.prototype.initialState;
    /** @type {?} */
    ReducerManager.prototype.reducers;
    /** @type {?} */
    ReducerManager.prototype.reducerFactory;
}
export const /** @type {?} */ REDUCER_MANAGER_PROVIDERS = [
    ReducerManager,
    { provide: ReducerObservable, useExisting: ReducerManager },
    { provide: ReducerManagerDispatcher, useExisting: ActionsSubject },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBUW5ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzVFLE9BQU8sRUFDTCwyQkFBMkIsRUFDM0Isb0JBQW9CLEVBQ3BCLElBQUksR0FDTCxNQUFNLFNBQVMsQ0FBQzs7OztBQUVqQixNQUFNLHdCQUFrQyxTQUFRLFVBRS9DO0NBQUc7Ozs7QUFDSixNQUFNLCtCQUF5QyxTQUFRLGNBQWM7Q0FBRztBQUN4RSxNQUFNLENBQUMsdUJBQU0sTUFBTSxxQkFBRyw2QkFBOEQsQ0FBQSxDQUFDO0FBR3JGLE1BQU0scUJBQXNCLFNBQVEsZUFBd0M7Ozs7Ozs7SUFFMUUsWUFDVSxZQUN1QixjQUNHLFVBRTFCO1FBRVIsS0FBSyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztRQU50QyxlQUFVLEdBQVYsVUFBVTtRQUNhLGlCQUFZLEdBQVosWUFBWTtRQUNULGFBQVEsR0FBUixRQUFRO1FBRWxDLG1CQUFjLEdBQWQsY0FBYztLQUd2Qjs7Ozs7SUFFRCxVQUFVLENBQUMsT0FBK0I7UUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDN0I7Ozs7O0lBRUQsV0FBVyxDQUFDLFFBQWtDO1FBQzVDLHVCQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFB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b3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgQWN0aW9uc1N1YmplY3QgfSBmcm9tICcuL2FjdGlvbnNfc3ViamVjdCc7XHJcbmltcG9ydCB7XHJcbiAgQWN0aW9uLFxyXG4gIEFjdGlvblJlZHVjZXIsXHJcbiAgQWN0aW9uUmVkdWNlckZhY3RvcnksXHJcbiAgQWN0aW9uUmVkdWNlck1hcCxcclxuICBTdG9yZUZlYXR1cmUsXHJcbn0gZnJvbSAnLi9tb2RlbHMnO1xyXG5pbXBvcnQgeyBJTklUSUFMX1JFRFVDRVJTLCBJTklUSUFMX1NUQVRFLCBSRURVQ0VSX0ZBQ1RPUlkgfSBmcm9tICcuL3Rva2Vucyc7XHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlRmVhdHVyZVJlZHVjZXJGYWN0b3J5LFxyXG4gIGNyZWF0ZVJlZHVjZXJGYWN0b3J5LFxyXG4gIG9taXQsXHJcbn0gZnJvbSAnLi91dGlscyc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVkdWNlck9ic2VydmFibGUgZXh0ZW5kcyBPYnNlcnZhYmxlPFxyXG4gIEFjdGlvblJlZHVjZXI8YW55LCBhbnk+XHJcbj4ge31cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlZHVjZXJNYW5hZ2VyRGlzcGF0Y2hlciBleHRlbmRzIEFjdGlvbnNTdWJqZWN0IHt9XHJcbmV4cG9ydCBjb25zdCBVUERBVEUgPSAnQG5ncngvc3RvcmUvdXBkYXRlLXJlZHVjZXJzJyBhcyAnQG5ncngvc3RvcmUvdXBkYXRlLXJlZHVjZXJzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJlZHVjZXJNYW5hZ2VyIGV4dGVuZHMgQmVoYXZpb3JTdWJqZWN0PEFjdGlvblJlZHVjZXI8YW55LCBhbnk+PlxyXG4gIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZGlzcGF0Y2hlcjogUmVkdWNlck1hbmFnZXJEaXNwYXRjaGVyLFxyXG4gICAgQEluamVjdChJTklUSUFMX1NUQVRFKSBwcml2YXRlIGluaXRpYWxTdGF0ZTogYW55LFxyXG4gICAgQEluamVjdChJTklUSUFMX1JFRFVDRVJTKSBwcml2YXRlIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPGFueSwgYW55PixcclxuICAgIEBJbmplY3QoUkVEVUNFUl9GQUNUT1JZKVxyXG4gICAgcHJpdmF0ZSByZWR1Y2VyRmFjdG9yeTogQWN0aW9uUmVkdWNlckZhY3Rvcnk8YW55LCBhbnk+XHJcbiAgKSB7XHJcbiAgICBzdXBlcihyZWR1Y2VyRmFjdG9yeShyZWR1Y2VycywgaW5pdGlhbFN0YXRlKSk7XHJcbiAgfVxyXG5cclxuICBhZGRGZWF0dXJlKGZlYXR1cmU6IFN0b3JlRmVhdHVyZTxhbnksIGFueT4pIHtcclxuICAgIHRoaXMuYWRkRmVhdHVyZXMoW2ZlYXR1cmVdKTtcclxuICB9XHJcblxyXG4gIGFkZEZlYXR1cmVzKGZlYXR1cmVzOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+W10pIHtcclxuICAgIGNvbnN0IHJlZHVjZXJzID0gZmVhdHVyZXMucmVkdWNlKFxyXG4gICAgICAoXHJcbiAgICAgICAgcmVkdWNlckRpY3QsXHJcbiAgICAgICAgeyByZWR1Y2VycywgcmVkdWNlckZhY3RvcnksIG1ldGFSZWR1Y2VycywgaW5pdGlhbFN0YXRlLCBrZXkgfVxyXG4gICAgICApID0+IHtcclxuICAgICAgICBjb25zdCByZWR1Y2VyID1cclxuICAgICAgICAgIHR5cGVvZiByZWR1Y2VycyA9PT0gJ2Z1bmN0aW9uJ1xyXG4gICAgICAgICAgICA/IGNyZWF0ZUZlYXR1cmVSZWR1Y2VyRmFjdG9yeShtZXRhUmVkdWNlcnMpKHJlZHVjZXJzLCBpbml0aWFsU3RhdGUpXHJcbiAgICAgICAgICAgIDogY3JlYXRlUmVkdWNlckZhY3RvcnkocmVkdWNlckZhY3RvcnksIG1ldGFSZWR1Y2VycykoXHJcbiAgICAgICAgICAgICAgICByZWR1Y2VycyxcclxuICAgICAgICAgICAgICAgIGluaXRpYWxTdGF0ZVxyXG4gICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIHJlZHVjZXJEaWN0W2tleV0gPSByZWR1Y2VyO1xyXG4gICAgICAgIHJldHVybiByZWR1Y2VyRGljdDtcclxuICAgICAgfSxcclxuICAgICAge30gYXMgeyBba2V5OiBzdHJpbmddOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PiB9XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuYWRkUmVkdWNlcnMocmVkdWNlcnMpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRmVhdHVyZShmZWF0dXJlOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+KSB7XHJcbiAgICB0aGlzLnJlbW92ZUZlYXR1cmVzKFtmZWF0dXJlXSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGZWF0dXJlcyhmZWF0dXJlczogU3RvcmVGZWF0dXJlPGFueSwgYW55PltdKSB7XHJcbiAgICB0aGlzLnJlbW92ZVJlZHVjZXJzKGZlYXR1cmVzLm1hcChwID0+IHAua2V5KSk7XHJcbiAgfVxyXG5cclxuICBhZGRSZWR1Y2VyKGtleTogc3RyaW5nLCByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55Pikge1xyXG4gICAgdGhpcy5hZGRSZWR1Y2Vycyh7IFtrZXldOiByZWR1Y2VyIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkUmVkdWNlcnMocmVkdWNlcnM6IHsgW2tleTogc3RyaW5nXTogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4gfSkge1xyXG4gICAgdGhpcy5yZWR1Y2VycyA9IHsgLi4udGhpcy5yZWR1Y2VycywgLi4ucmVkdWNlcnMgfTtcclxuICAgIHRoaXMudXBkYXRlUmVkdWNlcnMoT2JqZWN0LmtleXMocmVkdWNlcnMpKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZVJlZHVjZXIoZmVhdHVyZUtleTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnJlbW92ZVJlZHVjZXJzKFtmZWF0dXJlS2V5XSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVSZWR1Y2VycyhmZWF0dXJlS2V5czogc3RyaW5nW10pIHtcclxuICAgIGZlYXR1cmVLZXlzLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgdGhpcy5yZWR1Y2VycyA9IG9taXQodGhpcy5yZWR1Y2Vycywga2V5KSAvKlRPRE8oIzgyMykqLyBhcyBhbnk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMudXBkYXRlUmVkdWNlcnMoZmVhdHVyZUtleXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVSZWR1Y2VycyhmZWF0dXJlS2V5czogc3RyaW5nW10pIHtcclxuICAgIHRoaXMubmV4dCh0aGlzLnJlZHVjZXJGYWN0b3J5KHRoaXMucmVkdWNlcnMsIHRoaXMuaW5pdGlhbFN0YXRlKSk7XHJcblxyXG4gICAgZmVhdHVyZUtleXMuZm9yRWFjaChmZWF0dXJlID0+IHtcclxuICAgICAgdGhpcy5kaXNwYXRjaGVyLm5leHQoPEFjdGlvbj57XHJcbiAgICAgICAgdHlwZTogVVBEQVRFLFxyXG4gICAgICAgIGZlYXR1cmUsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY29tcGxldGUoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSRURVQ0VSX01BTkFHRVJfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xyXG4gIFJlZHVjZXJNYW5hZ2VyLFxyXG4gIHsgcHJvdmlkZTogUmVkdWNlck9ic2VydmFibGUsIHVzZUV4aXN0aW5nOiBSZWR1Y2VyTWFuYWdlciB9LFxyXG4gIHsgcHJvdmlkZTogUmVkdWNlck1hbmFnZXJEaXNwYXRjaGVyLCB1c2VFeGlzdGluZzogQWN0aW9uc1N1YmplY3QgfSxcclxuXTtcclxuIl19