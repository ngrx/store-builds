/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        p => p.key)));
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
        featureKeys.forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBUW5ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzVFLE9BQU8sRUFDTCwyQkFBMkIsRUFDM0Isb0JBQW9CLEVBQ3BCLElBQUksR0FDTCxNQUFNLFNBQVMsQ0FBQzs7OztBQUVqQixNQUFNLE9BQWdCLGlCQUFrQixTQUFRLFVBRS9DO0NBQUc7Ozs7QUFDSixNQUFNLE9BQWdCLHdCQUF5QixTQUFRLGNBQWM7Q0FBRzs7QUFDeEUsTUFBTSxPQUFPLE1BQU0sR0FBRyxtQkFBQSw2QkFBNkIsRUFBaUM7QUFHcEYsTUFBTSxPQUFPLGNBQWUsU0FBUSxlQUF3Qzs7Ozs7OztJQUUxRSxZQUNVLFVBQW9DLEVBQ2IsWUFBaUIsRUFDZCxRQUFvQyxFQUU5RCxjQUE4QztRQUV0RCxLQUFLLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBTnRDLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBQ2IsaUJBQVksR0FBWixZQUFZLENBQUs7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUE0QjtRQUU5RCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0M7SUFHeEQsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsT0FBK0I7UUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFD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Y0FBYztJQUNkLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUU7SUFDM0QsRUFBRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRTtDQUNuRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEFjdGlvbnNTdWJqZWN0IH0gZnJvbSAnLi9hY3Rpb25zX3N1YmplY3QnO1xyXG5pbXBvcnQge1xyXG4gIEFjdGlvbixcclxuICBBY3Rpb25SZWR1Y2VyLFxyXG4gIEFjdGlvblJlZHVjZXJGYWN0b3J5LFxyXG4gIEFjdGlvblJlZHVjZXJNYXAsXHJcbiAgU3RvcmVGZWF0dXJlLFxyXG59IGZyb20gJy4vbW9kZWxzJztcclxuaW1wb3J0IHsgSU5JVElBTF9SRURVQ0VSUywgSU5JVElBTF9TVEFURSwgUkVEVUNFUl9GQUNUT1JZIH0gZnJvbSAnLi90b2tlbnMnO1xyXG5pbXBvcnQge1xyXG4gIGNyZWF0ZUZlYXR1cmVSZWR1Y2VyRmFjdG9yeSxcclxuICBjcmVhdGVSZWR1Y2VyRmFjdG9yeSxcclxuICBvbWl0LFxyXG59IGZyb20gJy4vdXRpbHMnO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlZHVjZXJPYnNlcnZhYmxlIGV4dGVuZHMgT2JzZXJ2YWJsZTxcclxuICBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PlxyXG4+IHt9XHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZWR1Y2VyTWFuYWdlckRpc3BhdGNoZXIgZXh0ZW5kcyBBY3Rpb25zU3ViamVjdCB7fVxyXG5leHBvcnQgY29uc3QgVVBEQVRFID0gJ0BuZ3J4L3N0b3JlL3VwZGF0ZS1yZWR1Y2VycycgYXMgJ0BuZ3J4L3N0b3JlL3VwZGF0ZS1yZWR1Y2Vycyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSZWR1Y2VyTWFuYWdlciBleHRlbmRzIEJlaGF2aW9yU3ViamVjdDxBY3Rpb25SZWR1Y2VyPGFueSwgYW55Pj5cclxuICBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGRpc3BhdGNoZXI6IFJlZHVjZXJNYW5hZ2VyRGlzcGF0Y2hlcixcclxuICAgIEBJbmplY3QoSU5JVElBTF9TVEFURSkgcHJpdmF0ZSBpbml0aWFsU3RhdGU6IGFueSxcclxuICAgIEBJbmplY3QoSU5JVElBTF9SRURVQ0VSUykgcHJpdmF0ZSByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT4sXHJcbiAgICBASW5qZWN0KFJFRFVDRVJfRkFDVE9SWSlcclxuICAgIHByaXZhdGUgcmVkdWNlckZhY3Rvcnk6IEFjdGlvblJlZHVjZXJGYWN0b3J5PGFueSwgYW55PlxyXG4gICkge1xyXG4gICAgc3VwZXIocmVkdWNlckZhY3RvcnkocmVkdWNlcnMsIGluaXRpYWxTdGF0ZSkpO1xyXG4gIH1cclxuXHJcbiAgYWRkRmVhdHVyZShmZWF0dXJlOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+KSB7XHJcbiAgICB0aGlzLmFkZEZlYXR1cmVzKFtmZWF0dXJlXSk7XHJcbiAgfVxyXG5cclxuICBhZGRGZWF0dXJlcyhmZWF0dXJlczogU3RvcmVGZWF0dXJlPGFueSwgYW55PltdKSB7XHJcbiAgICBjb25zdCByZWR1Y2VycyA9IGZlYXR1cmVzLnJlZHVjZShcclxuICAgICAgKFxyXG4gICAgICAgIHJlZHVjZXJEaWN0LFxyXG4gICAgICAgIHsgcmVkdWNlcnMsIHJlZHVjZXJGYWN0b3J5LCBtZXRhUmVkdWNlcnMsIGluaXRpYWxTdGF0ZSwga2V5IH1cclxuICAgICAgKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVkdWNlciA9XHJcbiAgICAgICAgICB0eXBlb2YgcmVkdWNlcnMgPT09ICdmdW5jdGlvbidcclxuICAgICAgICAgICAgPyBjcmVhdGVGZWF0dXJlUmVkdWNlckZhY3RvcnkobWV0YVJlZHVjZXJzKShyZWR1Y2VycywgaW5pdGlhbFN0YXRlKVxyXG4gICAgICAgICAgICA6IGNyZWF0ZVJlZHVjZXJGYWN0b3J5KHJlZHVjZXJGYWN0b3J5LCBtZXRhUmVkdWNlcnMpKFxyXG4gICAgICAgICAgICAgICAgcmVkdWNlcnMsXHJcbiAgICAgICAgICAgICAgICBpbml0aWFsU3RhdGVcclxuICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICByZWR1Y2VyRGljdFtrZXldID0gcmVkdWNlcjtcclxuICAgICAgICByZXR1cm4gcmVkdWNlckRpY3Q7XHJcbiAgICAgIH0sXHJcbiAgICAgIHt9IGFzIHsgW2tleTogc3RyaW5nXTogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4gfVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmFkZFJlZHVjZXJzKHJlZHVjZXJzKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZlYXR1cmUoZmVhdHVyZTogU3RvcmVGZWF0dXJlPGFueSwgYW55Pikge1xyXG4gICAgdGhpcy5yZW1vdmVGZWF0dXJlcyhbZmVhdHVyZV0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRmVhdHVyZXMoZmVhdHVyZXM6IFN0b3JlRmVhdHVyZTxhbnksIGFueT5bXSkge1xyXG4gICAgdGhpcy5yZW1vdmVSZWR1Y2VycyhmZWF0dXJlcy5tYXAocCA9PiBwLmtleSkpO1xyXG4gIH1cclxuXHJcbiAgYWRkUmVkdWNlcihrZXk6IHN0cmluZywgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4pIHtcclxuICAgIHRoaXMuYWRkUmVkdWNlcnMoeyBba2V5XTogcmVkdWNlciB9KTtcclxuICB9XHJcblxyXG4gIGFkZFJlZHVjZXJzKHJlZHVjZXJzOiB7IFtrZXk6IHN0cmluZ106IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+IH0pIHtcclxuICAgIHRoaXMucmVkdWNlcnMgPSB7IC4uLnRoaXMucmVkdWNlcnMsIC4uLnJlZHVjZXJzIH07XHJcbiAgICB0aGlzLnVwZGF0ZVJlZHVjZXJzKE9iamVjdC5rZXlzKHJlZHVjZXJzKSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVSZWR1Y2VyKGZlYXR1cmVLZXk6IHN0cmluZykge1xyXG4gICAgdGhpcy5yZW1vdmVSZWR1Y2VycyhbZmVhdHVyZUtleV0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlUmVkdWNlcnMoZmVhdHVyZUtleXM6IHN0cmluZ1tdKSB7XHJcbiAgICBmZWF0dXJlS2V5cy5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIHRoaXMucmVkdWNlcnMgPSBvbWl0KHRoaXMucmVkdWNlcnMsIGtleSkgLypUT0RPKCM4MjMpKi8gYXMgYW55O1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnVwZGF0ZVJlZHVjZXJzKGZlYXR1cmVLZXlzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlUmVkdWNlcnMoZmVhdHVyZUtleXM6IHN0cmluZ1tdKSB7XHJcbiAgICB0aGlzLm5leHQodGhpcy5yZWR1Y2VyRmFjdG9yeSh0aGlzLnJlZHVjZXJzLCB0aGlzLmluaXRpYWxTdGF0ZSkpO1xyXG4gICAgdGhpcy5kaXNwYXRjaGVyLm5leHQoPEFjdGlvbj57XHJcbiAgICAgIHR5cGU6IFVQREFURSxcclxuICAgICAgZmVhdHVyZXM6IGZlYXR1cmVLZXlzLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuY29tcGxldGUoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSRURVQ0VSX01BTkFHRVJfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xyXG4gIFJlZHVjZXJNYW5hZ2VyLFxyXG4gIHsgcHJvdmlkZTogUmVkdWNlck9ic2VydmFibGUsIHVzZUV4aXN0aW5nOiBSZWR1Y2VyTWFuYWdlciB9LFxyXG4gIHsgcHJvdmlkZTogUmVkdWNlck1hbmFnZXJEaXNwYXRjaGVyLCB1c2VFeGlzdGluZzogQWN0aW9uc1N1YmplY3QgfSxcclxuXTtcclxuIl19