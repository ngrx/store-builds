/**
 * @fileoverview added by tsickle
 * Generated from: modules/store/src/reducer_manager.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQVFuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM1RSxPQUFPLEVBQ0wsMkJBQTJCLEVBQzNCLG9CQUFvQixFQUNwQixJQUFJLEdBQ0wsTUFBTSxTQUFTLENBQUM7Ozs7QUFFakIsTUFBTSxPQUFnQixpQkFBa0IsU0FBUSxVQUUvQztDQUFHOzs7O0FBQ0osTUFBTSxPQUFnQix3QkFBeUIsU0FBUSxjQUFjO0NBQUc7O0FBQ3hFLE1BQU0sT0FBTyxNQUFNLEdBQUcsbUJBQUEsNkJBQTZCLEVBQWlDO0FBR3BGLE1BQU0sT0FBTyxjQUFlLFNBQVEsZUFBd0M7Ozs7Ozs7SUFFMUUsWUFDVSxVQUFvQyxFQUNiLFlBQWlCLEVBQ2QsUUFBb0MsRUFFOUQsY0FBOEM7UUFFdEQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztRQU50QyxlQUFVLEdBQVYsVUFBVSxDQUEwQjtRQUNiLGlCQUFZLEdBQVosWUFBWSxDQUFLO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBNEI7UUFFOUQsbUJBQWMsR0FBZCxjQUFjLENBQWdDO0lBR3hELENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLE9BQStCO1FBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lB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LGNBQWM7SUFDZCxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFO0lBQzNELEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUU7Q0FDbkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBBY3Rpb25zU3ViamVjdCB9IGZyb20gJy4vYWN0aW9uc19zdWJqZWN0JztcclxuaW1wb3J0IHtcclxuICBBY3Rpb24sXHJcbiAgQWN0aW9uUmVkdWNlcixcclxuICBBY3Rpb25SZWR1Y2VyRmFjdG9yeSxcclxuICBBY3Rpb25SZWR1Y2VyTWFwLFxyXG4gIFN0b3JlRmVhdHVyZSxcclxufSBmcm9tICcuL21vZGVscyc7XHJcbmltcG9ydCB7IElOSVRJQUxfUkVEVUNFUlMsIElOSVRJQUxfU1RBVEUsIFJFRFVDRVJfRkFDVE9SWSB9IGZyb20gJy4vdG9rZW5zJztcclxuaW1wb3J0IHtcclxuICBjcmVhdGVGZWF0dXJlUmVkdWNlckZhY3RvcnksXHJcbiAgY3JlYXRlUmVkdWNlckZhY3RvcnksXHJcbiAgb21pdCxcclxufSBmcm9tICcuL3V0aWxzJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZWR1Y2VyT2JzZXJ2YWJsZSBleHRlbmRzIE9ic2VydmFibGU8XHJcbiAgQWN0aW9uUmVkdWNlcjxhbnksIGFueT5cclxuPiB7fVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVkdWNlck1hbmFnZXJEaXNwYXRjaGVyIGV4dGVuZHMgQWN0aW9uc1N1YmplY3Qge31cclxuZXhwb3J0IGNvbnN0IFVQREFURSA9ICdAbmdyeC9zdG9yZS91cGRhdGUtcmVkdWNlcnMnIGFzICdAbmdyeC9zdG9yZS91cGRhdGUtcmVkdWNlcnMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUmVkdWNlck1hbmFnZXIgZXh0ZW5kcyBCZWhhdmlvclN1YmplY3Q8QWN0aW9uUmVkdWNlcjxhbnksIGFueT4+XHJcbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBkaXNwYXRjaGVyOiBSZWR1Y2VyTWFuYWdlckRpc3BhdGNoZXIsXHJcbiAgICBASW5qZWN0KElOSVRJQUxfU1RBVEUpIHByaXZhdGUgaW5pdGlhbFN0YXRlOiBhbnksXHJcbiAgICBASW5qZWN0KElOSVRJQUxfUkVEVUNFUlMpIHByaXZhdGUgcmVkdWNlcnM6IEFjdGlvblJlZHVjZXJNYXA8YW55LCBhbnk+LFxyXG4gICAgQEluamVjdChSRURVQ0VSX0ZBQ1RPUlkpXHJcbiAgICBwcml2YXRlIHJlZHVjZXJGYWN0b3J5OiBBY3Rpb25SZWR1Y2VyRmFjdG9yeTxhbnksIGFueT5cclxuICApIHtcclxuICAgIHN1cGVyKHJlZHVjZXJGYWN0b3J5KHJlZHVjZXJzLCBpbml0aWFsU3RhdGUpKTtcclxuICB9XHJcblxyXG4gIGFkZEZlYXR1cmUoZmVhdHVyZTogU3RvcmVGZWF0dXJlPGFueSwgYW55Pikge1xyXG4gICAgdGhpcy5hZGRGZWF0dXJlcyhbZmVhdHVyZV0pO1xyXG4gIH1cclxuXHJcbiAgYWRkRmVhdHVyZXMoZmVhdHVyZXM6IFN0b3JlRmVhdHVyZTxhbnksIGFueT5bXSkge1xyXG4gICAgY29uc3QgcmVkdWNlcnMgPSBmZWF0dXJlcy5yZWR1Y2UoXHJcbiAgICAgIChcclxuICAgICAgICByZWR1Y2VyRGljdCxcclxuICAgICAgICB7IHJlZHVjZXJzLCByZWR1Y2VyRmFjdG9yeSwgbWV0YVJlZHVjZXJzLCBpbml0aWFsU3RhdGUsIGtleSB9XHJcbiAgICAgICkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlZHVjZXIgPVxyXG4gICAgICAgICAgdHlwZW9mIHJlZHVjZXJzID09PSAnZnVuY3Rpb24nXHJcbiAgICAgICAgICAgID8gY3JlYXRlRmVhdHVyZVJlZHVjZXJGYWN0b3J5KG1ldGFSZWR1Y2VycykocmVkdWNlcnMsIGluaXRpYWxTdGF0ZSlcclxuICAgICAgICAgICAgOiBjcmVhdGVSZWR1Y2VyRmFjdG9yeShyZWR1Y2VyRmFjdG9yeSwgbWV0YVJlZHVjZXJzKShcclxuICAgICAgICAgICAgICAgIHJlZHVjZXJzLFxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFN0YXRlXHJcbiAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmVkdWNlckRpY3Rba2V5XSA9IHJlZHVjZXI7XHJcbiAgICAgICAgcmV0dXJuIHJlZHVjZXJEaWN0O1xyXG4gICAgICB9LFxyXG4gICAgICB7fSBhcyB7IFtrZXk6IHN0cmluZ106IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+IH1cclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5hZGRSZWR1Y2VycyhyZWR1Y2Vycyk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGZWF0dXJlKGZlYXR1cmU6IFN0b3JlRmVhdHVyZTxhbnksIGFueT4pIHtcclxuICAgIHRoaXMucmVtb3ZlRmVhdHVyZXMoW2ZlYXR1cmVdKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZlYXR1cmVzKGZlYXR1cmVzOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+W10pIHtcclxuICAgIHRoaXMucmVtb3ZlUmVkdWNlcnMoZmVhdHVyZXMubWFwKHAgPT4gcC5rZXkpKTtcclxuICB9XHJcblxyXG4gIGFkZFJlZHVjZXIoa2V5OiBzdHJpbmcsIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+KSB7XHJcbiAgICB0aGlzLmFkZFJlZHVjZXJzKHsgW2tleV06IHJlZHVjZXIgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRSZWR1Y2VycyhyZWR1Y2VyczogeyBba2V5OiBzdHJpbmddOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PiB9KSB7XHJcbiAgICB0aGlzLnJlZHVjZXJzID0geyAuLi50aGlzLnJlZHVjZXJzLCAuLi5yZWR1Y2VycyB9O1xyXG4gICAgdGhpcy51cGRhdGVSZWR1Y2VycyhPYmplY3Qua2V5cyhyZWR1Y2VycykpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlUmVkdWNlcihmZWF0dXJlS2V5OiBzdHJpbmcpIHtcclxuICAgIHRoaXMucmVtb3ZlUmVkdWNlcnMoW2ZlYXR1cmVLZXldKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZVJlZHVjZXJzKGZlYXR1cmVLZXlzOiBzdHJpbmdbXSkge1xyXG4gICAgZmVhdHVyZUtleXMuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICB0aGlzLnJlZHVjZXJzID0gb21pdCh0aGlzLnJlZHVjZXJzLCBrZXkpIC8qVE9ETygjODIzKSovIGFzIGFueTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy51cGRhdGVSZWR1Y2VycyhmZWF0dXJlS2V5cyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZVJlZHVjZXJzKGZlYXR1cmVLZXlzOiBzdHJpbmdbXSkge1xyXG4gICAgdGhpcy5uZXh0KHRoaXMucmVkdWNlckZhY3RvcnkodGhpcy5yZWR1Y2VycywgdGhpcy5pbml0aWFsU3RhdGUpKTtcclxuICAgIHRoaXMuZGlzcGF0Y2hlci5uZXh0KDxBY3Rpb24+e1xyXG4gICAgICB0eXBlOiBVUERBVEUsXHJcbiAgICAgIGZlYXR1cmVzOiBmZWF0dXJlS2V5cyxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUkVEVUNFUl9NQU5BR0VSX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcclxuICBSZWR1Y2VyTWFuYWdlcixcclxuICB7IHByb3ZpZGU6IFJlZHVjZXJPYnNlcnZhYmxlLCB1c2VFeGlzdGluZzogUmVkdWNlck1hbmFnZXIgfSxcclxuICB7IHByb3ZpZGU6IFJlZHVjZXJNYW5hZ2VyRGlzcGF0Y2hlciwgdXNlRXhpc3Rpbmc6IEFjdGlvbnNTdWJqZWN0IH0sXHJcbl07XHJcbiJdfQ==