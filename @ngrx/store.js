import { Inject, Injectable, InjectionToken, NgModule, OpaqueToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { queue } from 'rxjs/scheduler/queue';
import { observeOn } from 'rxjs/operator/observeOn';
import { withLatestFrom } from 'rxjs/operator/withLatestFrom';
import { scan } from 'rxjs/operator/scan';
import { map } from 'rxjs/operator/map';
import { pluck } from 'rxjs/operator/pluck';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';

/**
 * @param {?} reducers
 * @param {?=} initialState
 * @return {?}
 */
function combineReducers(reducers, initialState = {}) {
    const /** @type {?} */ reducerKeys = Object.keys(reducers);
    const /** @type {?} */ finalReducers = {};
    for (let /** @type {?} */ i = 0; i < reducerKeys.length; i++) {
        const /** @type {?} */ key = reducerKeys[i];
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }
    const /** @type {?} */ finalReducerKeys = Object.keys(finalReducers);
    return function combination(state = initialState, action) {
        let /** @type {?} */ hasChanged = false;
        const /** @type {?} */ nextState = {};
        for (let /** @type {?} */ i = 0; i < finalReducerKeys.length; i++) {
            const /** @type {?} */ key = finalReducerKeys[i];
            const /** @type {?} */ reducer = finalReducers[key];
            const /** @type {?} */ previousStateForKey = state[key];
            const /** @type {?} */ nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? nextState : state;
    };
}
/**
 * @template T
 * @param {?} object
 * @param {?} keyToRemove
 * @return {?}
 */
function omit(object, keyToRemove) {
    return Object.keys(object)
        .filter(key => key !== keyToRemove)
        .reduce((result, key) => Object.assign(result, { [key]: object[key] }), {});
}
/**
 * @param {...?} functions
 * @return {?}
 */
function compose(...functions) {
    return function (arg) {
        if (functions.length === 0) {
            return arg;
        }
        const /** @type {?} */ last = functions[functions.length - 1];
        const /** @type {?} */ rest = functions.slice(0, -1);
        return rest.reduceRight((composed, fn) => fn(composed), last(arg));
    };
}

const _INITIAL_STATE = new OpaqueToken('_ngrx/store Initial State');
const INITIAL_STATE = new OpaqueToken('@ngrx/store Initial State');
const REDUCER_FACTORY = new OpaqueToken('@ngrx/store Reducer Factory');
const INITIAL_REDUCERS = new OpaqueToken('@ngrx/store Initial Reducers');
const STORE_FEATURES = new OpaqueToken('@ngrx/store Store Features');

const INIT = '@ngrx/store/init';
class ActionsSubject extends BehaviorSubject {
    constructor() {
        super({ type: INIT });
    }
    /**
     * @param {?} action
     * @return {?}
     */
    next(action) {
        if (typeof action === 'undefined') {
            throw new Error(`Actions must be objects`);
        }
        else if (typeof action.type === 'undefined') {
            throw new Error(`Actions must have a type property`);
        }
        super.next(action);
    }
    /**
     * @return {?}
     */
    complete() {
        /* noop */
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.complete();
    }
}
ActionsSubject.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ActionsSubject.ctorParameters = () => [];
const ACTIONS_SUBJECT_PROVIDERS = [ActionsSubject];

/**
 * @abstract
 */
class ReducerObservable extends Observable {
}
/**
 * @abstract
 */
class ReducerManagerDispatcher extends ActionsSubject {
}
const UPDATE = '@ngrx/store/update-reducers';
class ReducerManager extends BehaviorSubject {
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
     * @param {?} __0
     * @return {?}
     */
    addFeature({ reducers, reducerFactory, initialState, key, }) {
        const /** @type {?} */ reducer = typeof reducers === 'function'
            ? reducers
            : reducerFactory(reducers, initialState);
        this.addReducer(key, reducer);
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    removeFeature({ key }) {
        this.removeReducer(key);
    }
    /**
     * @param {?} key
     * @param {?} reducer
     * @return {?}
     */
    addReducer(key, reducer) {
        this.reducers = Object.assign({}, this.reducers, { [key]: reducer });
        this.updateReducers();
    }
    /**
     * @param {?} key
     * @return {?}
     */
    removeReducer(key) {
        this.reducers = omit(this.reducers, key);
        this.updateReducers();
    }
    /**
     * @return {?}
     */
    updateReducers() {
        this.next(this.reducerFactory(this.reducers, this.initialState));
        this.dispatcher.next({ type: UPDATE });
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
/**
 * @nocollapse
 */
ReducerManager.ctorParameters = () => [
    { type: ReducerManagerDispatcher, },
    { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] },] },
    { type: undefined, decorators: [{ type: Inject, args: [INITIAL_REDUCERS,] },] },
    { type: undefined, decorators: [{ type: Inject, args: [REDUCER_FACTORY,] },] },
];
const REDUCER_MANAGER_PROVIDERS = [
    ReducerManager,
    { provide: ReducerObservable, useExisting: ReducerManager },
    { provide: ReducerManagerDispatcher, useExisting: ActionsSubject },
];

class ScannedActionsSubject extends Subject {
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.complete();
    }
}
ScannedActionsSubject.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ScannedActionsSubject.ctorParameters = () => [];
const SCANNED_ACTIONS_SUBJECT_PROVIDERS = [
    ScannedActionsSubject,
];

/**
 * @abstract
 */
class StateObservable extends Observable {
}
class State extends BehaviorSubject {
    /**
     * @param {?} actions$
     * @param {?} reducer$
     * @param {?} scannedActions
     * @param {?} initialState
     */
    constructor(actions$, reducer$, scannedActions, initialState) {
        super(initialState);
        const actionsOnQueue$ = observeOn.call(actions$, queue);
        const withLatestReducer$ = withLatestFrom.call(actionsOnQueue$, reducer$);
        const stateAndAction$ = scan.call(withLatestReducer$, reduceState, initialState);
        this.stateSubscription = stateAndAction$.subscribe({
            next: ({ state, action }) => {
                this.next(state);
                scannedActions.next(action);
            },
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stateSubscription.unsubscribe();
        this.complete();
    }
}
State.INIT = '@ngrx/store/init';
State.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
State.ctorParameters = () => [
    { type: ActionsSubject, },
    { type: ReducerObservable, },
    { type: ScannedActionsSubject, },
    { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] },] },
];
/**
 * @template T, V
 * @param {?=} stateActionPair
 * @param {?=} __1
 * @return {?}
 */
function reduceState(stateActionPair = { state: undefined }, [action, reducer]) {
    const { state } = stateActionPair;
    return { state: reducer(state, action), action };
}
const STATE_PROVIDERS = [
    State,
    { provide: StateObservable, useExisting: State },
];

/**
 * @param {?} t
 * @return {?}
 */
function memoize(t) {
    let /** @type {?} */ lastArguments = null;
    let /** @type {?} */ lastResult = null;
    /**
     * @return {?}
     */
    function reset() {
        lastArguments = null;
        lastResult = null;
    }
    /**
     * @return {?}
     */
    function memoized() {
        if (!lastArguments) {
            lastResult = t.apply(null, arguments);
            lastArguments = arguments;
            return lastResult;
        }
        for (let /** @type {?} */ i = 0; i < arguments.length; i++) {
            if (arguments[i] !== lastArguments[i]) {
                lastResult = t.apply(null, arguments);
                lastArguments = arguments;
                return lastResult;
            }
        }
        return lastResult;
    }
    return { memoized, reset };
}
/**
 * @param {...?} args
 * @return {?}
 */
function createSelector(...args) {
    const /** @type {?} */ selectors = args.slice(0, args.length - 1);
    const /** @type {?} */ projector = args[args.length - 1];
    const /** @type {?} */ memoizedSelectors = selectors.filter((selector) => selector.release && typeof selector.release === 'function');
    const { memoized, reset } = memoize(function (state) {
        const /** @type {?} */ args = selectors.map(fn => fn(state));
        return projector.apply(null, args);
    });
    /**
     * @return {?}
     */
    function release() {
        reset();
        memoizedSelectors.forEach(selector => selector.release());
    }
    return Object.assign(memoized, { release });
}
/**
 * @template T
 * @param {?} featureName
 * @return {?}
 */
function createFeatureSelector(featureName) {
    const { memoized, reset } = memoize(function (state) {
        return state[featureName];
    });
    return Object.assign(memoized, { release: reset });
}
/**
 * @param {?} v
 * @return {?}
 */
function isSelector(v) {
    return (typeof v === 'function' && v.release && typeof v.release === 'function');
}

class Store extends Observable {
    /**
     * @param {?} state$
     * @param {?} actionsObserver
     * @param {?} reducerManager
     */
    constructor(state$, actionsObserver, reducerManager) {
        super();
        this.actionsObserver = actionsObserver;
        this.reducerManager = reducerManager;
        this.source = state$;
    }
    /**
     * @param {?} pathOrMapFn
     * @param {...?} paths
     * @return {?}
     */
    select(pathOrMapFn, ...paths) {
        let /** @type {?} */ mapped$;
        if (typeof pathOrMapFn === 'string') {
            mapped$ = pluck.call(this, pathOrMapFn, ...paths);
        }
        else if (typeof pathOrMapFn === 'function' && isSelector(pathOrMapFn)) {
            mapped$ = map.call(this, pathOrMapFn);
        }
        else if (typeof pathOrMapFn === 'function') {
            mapped$ = map.call(this, createSelector(s => s, pathOrMapFn));
        }
        else {
            throw new TypeError(`Unexpected type '${typeof pathOrMapFn}' in select operator,` +
                ` expected 'string' or 'function'`);
        }
        return distinctUntilChanged.call(mapped$);
    }
    /**
     * @template R
     * @param {?} operator
     * @return {?}
     */
    lift(operator) {
        const /** @type {?} */ store = new Store(this, this.actionsObserver, this.reducerManager);
        store.operator = operator;
        return store;
    }
    /**
     * @template V
     * @param {?} action
     * @return {?}
     */
    dispatch(action) {
        this.actionsObserver.next(action);
    }
    /**
     * @param {?} action
     * @return {?}
     */
    next(action) {
        this.actionsObserver.next(action);
    }
    /**
     * @param {?} err
     * @return {?}
     */
    error(err) {
        this.actionsObserver.error(err);
    }
    /**
     * @return {?}
     */
    complete() {
        this.actionsObserver.complete();
    }
    /**
     * @template State, Actions
     * @param {?} key
     * @param {?} reducer
     * @return {?}
     */
    addReducer(key, reducer) {
        this.reducerManager.addReducer(key, reducer);
    }
    /**
     * @template Key
     * @param {?} key
     * @return {?}
     */
    removeReducer(key) {
        this.reducerManager.removeReducer(key);
    }
}
Store.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
Store.ctorParameters = () => [
    { type: StateObservable, },
    { type: ActionsSubject, },
    { type: ReducerManager, },
];
const STORE_PROVIDERS = [Store];

class StoreRootModule {
    /**
     * @param {?} actions$
     * @param {?} reducer$
     * @param {?} scannedActions$
     */
    constructor(actions$, reducer$, scannedActions$) { }
}
StoreRootModule.decorators = [
    { type: NgModule, args: [{},] },
];
/**
 * @nocollapse
 */
StoreRootModule.ctorParameters = () => [
    { type: ActionsSubject, },
    { type: ReducerObservable, },
    { type: ScannedActionsSubject, },
];
class StoreFeatureModule {
    /**
     * @param {?} features
     * @param {?} reducerManager
     */
    constructor(features, reducerManager) {
        this.features = features;
        this.reducerManager = reducerManager;
        features.forEach(feature => reducerManager.addFeature(feature));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.features.forEach(feature => this.reducerManager.removeFeature(feature));
    }
}
StoreFeatureModule.decorators = [
    { type: NgModule, args: [{},] },
];
/**
 * @nocollapse
 */
StoreFeatureModule.ctorParameters = () => [
    { type: Array, decorators: [{ type: Inject, args: [STORE_FEATURES,] },] },
    { type: ReducerManager, },
];
class StoreModule {
    /**
     * @param {?} reducers
     * @param {?=} config
     * @return {?}
     */
    static forRoot(reducers, config = {}) {
        return {
            ngModule: StoreRootModule,
            providers: [
                { provide: _INITIAL_STATE, useValue: config.initialState },
                {
                    provide: INITIAL_STATE,
                    useFactory: _initialStateFactory,
                    deps: [_INITIAL_STATE],
                },
                reducers instanceof InjectionToken
                    ? { provide: INITIAL_REDUCERS, useExisting: reducers }
                    : { provide: INITIAL_REDUCERS, useValue: reducers },
                {
                    provide: REDUCER_FACTORY,
                    useValue: config.reducerFactory
                        ? config.reducerFactory
                        : combineReducers,
                },
                ACTIONS_SUBJECT_PROVIDERS,
                REDUCER_MANAGER_PROVIDERS,
                SCANNED_ACTIONS_SUBJECT_PROVIDERS,
                STATE_PROVIDERS,
                STORE_PROVIDERS,
            ],
        };
    }
    /**
     * @param {?} featureName
     * @param {?} reducers
     * @param {?=} config
     * @return {?}
     */
    static forFeature(featureName, reducers, config = {}) {
        return {
            ngModule: StoreFeatureModule,
            providers: [
                {
                    provide: STORE_FEATURES,
                    multi: true,
                    useValue: /** @type {?} */ ({
                        key: featureName,
                        reducers: reducers,
                        reducerFactory: config.reducerFactory
                            ? config.reducerFactory
                            : combineReducers,
                        initialState: config.initialState,
                    }),
                },
            ],
        };
    }
}
StoreModule.decorators = [
    { type: NgModule, args: [{},] },
];
/**
 * @nocollapse
 */
StoreModule.ctorParameters = () => [];
/**
 * @param {?} initialState
 * @return {?}
 */
function _initialStateFactory(initialState) {
    if (typeof initialState === 'function') {
        return initialState();
    }
    return initialState;
}

/**
 * Generated bundle index. Do not edit.
 */

export { StoreModule, Store, combineReducers, compose, ActionsSubject, INIT, ReducerManager, ReducerObservable, ReducerManagerDispatcher, UPDATE, ScannedActionsSubject, createSelector, createFeatureSelector, State, StateObservable, reduceState, INITIAL_STATE, REDUCER_FACTORY, INITIAL_REDUCERS, STORE_FEATURES, _INITIAL_STATE, StoreRootModule, StoreFeatureModule, _initialStateFactory, ACTIONS_SUBJECT_PROVIDERS as ɵc, REDUCER_MANAGER_PROVIDERS as ɵd, SCANNED_ACTIONS_SUBJECT_PROVIDERS as ɵe, STATE_PROVIDERS as ɵf, STORE_PROVIDERS as ɵb };
//# sourceMappingURL=store.js.map
