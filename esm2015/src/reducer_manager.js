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
    { type: Injectable },
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
//# sourceMappingURL=reducer_manager.js.map