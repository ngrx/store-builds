import { Injectable, InjectionToken, Inject, isDevMode, NgZone, NgModule, Optional, SkipSelf, Injector } from '@angular/core';
import { BehaviorSubject, Observable, Subject, queueScheduler } from 'rxjs';
import { observeOn, withLatestFrom, scan, pluck, map, distinctUntilChanged } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * Generated from: src/globals.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const REGISTERED_ACTION_TYPES = {};
/**
 * @return {?}
 */
function resetRegisteredActionTypes() {
    for (const key of Object.keys(REGISTERED_ACTION_TYPES)) {
        delete REGISTERED_ACTION_TYPES[key];
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/action_creator.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@description
 * Creates a configured `Creator` function that, when called, returns an object in the shape of the `Action` interface.
 *
 * Action creators reduce the explicitness of class-based action creators.
 *
 * \@usageNotes
 *
 * **Declaring an action creator**
 *
 * Without additional metadata:
 * ```ts
 * export const increment = createAction('[Counter] Increment');
 * ```
 * With additional metadata:
 * ```ts
 * export const loginSuccess = createAction(
 *   '[Auth/API] Login Success',
 *   props<{ user: User }>()
 * );
 * ```
 * With a function:
 * ```ts
 * export const loginSuccess = createAction(
 *   '[Auth/API] Login Success',
 *   (response: Response) => response.user
 * );
 * ```
 *
 * **Dispatching an action**
 *
 * Without additional metadata:
 * ```ts
 * store.dispatch(increment());
 * ```
 * With additional metadata:
 * ```ts
 * store.dispatch(loginSuccess({ user: newUser }));
 * ```
 *
 * **Referencing an action in a reducer**
 *
 * Using a switch statement:
 * ```ts
 * switch (action.type) {
 *   // ...
 *   case AuthApiActions.loginSuccess.type: {
 *     return {
 *       ...state,
 *       user: action.user
 *     };
 *   }
 * }
 * ```
 * Using a reducer creator:
 * ```ts
 * on(AuthApiActions.loginSuccess, (state, { user }) => ({ ...state, user }))
 * ```
 *
 *  **Referencing an action in an effect**
 * ```ts
 * effectName$ = createEffect(
 *   () => this.actions$.pipe(
 *     ofType(AuthApiActions.loginSuccess),
 *     // ...
 *   )
 * );
 * ```
 * @template T, C
 * @param {?} type Describes the action that will be dispatched
 * @param {?=} config Additional metadata needed for the handling of the action.  See {\@link createAction#usage-notes Usage Notes}.
 *
 * @return {?}
 */
function createAction(type, config) {
    REGISTERED_ACTION_TYPES[type] = (REGISTERED_ACTION_TYPES[type] || 0) + 1;
    if (typeof config === 'function') {
        return defineType(type, (/**
         * @param {...?} args
         * @return {?}
         */
        (...args) => (Object.assign(Object.assign({}, config(...args)), { type }))));
    }
    /** @type {?} */
    const as = config ? config._as : 'empty';
    switch (as) {
        case 'empty':
            return defineType(type, (/**
             * @return {?}
             */
            () => ({ type })));
        case 'props':
            return defineType(type, (/**
             * @param {?} props
             * @return {?}
             */
            (props) => (Object.assign(Object.assign({}, props), { type }))));
        default:
            throw new Error('Unexpected config.');
    }
}
/**
 * @template P
 * @return {?}
 */
function props() {
    return { _as: 'props', _p: (/** @type {?} */ (undefined)) };
}
/**
 * @template C
 * @param {?} creators
 * @return {?}
 */
function union(creators) {
    return (/** @type {?} */ (undefined));
}
/**
 * @template T
 * @param {?} type
 * @param {?} creator
 * @return {?}
 */
function defineType(type, creator) {
    return Object.defineProperty(creator, 'type', {
        value: type,
        writable: false,
    });
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/actions_subject.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const INIT = (/** @type {?} */ ('@ngrx/store/init'));
class ActionsSubject extends BehaviorSubject {
    constructor() {
        super({ type: INIT });
    }
    /**
     * @param {?} action
     * @return {?}
     */
    next(action) {
        if (typeof action === 'function') {
            throw new TypeError(`
        Dispatch expected an object, instead it received a function.
        If you're using the createAction function, make sure to invoke the function
        before dispatching the action. For example, someAction should be someAction().`);
        }
        else if (typeof action === 'undefined') {
            throw new TypeError(`Actions must be objects`);
        }
        else if (typeof action.type === 'undefined') {
            throw new TypeError(`Actions must have a type property`);
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
    { type: Injectable }
];
/** @nocollapse */
ActionsSubject.ctorParameters = () => [];
/** @type {?} */
const ACTIONS_SUBJECT_PROVIDERS = [ActionsSubject];

/**
 * @fileoverview added by tsickle
 * Generated from: src/tokens.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const _ROOT_STORE_GUARD = new InjectionToken('@ngrx/store Internal Root Guard');
/** @type {?} */
const _INITIAL_STATE = new InjectionToken('@ngrx/store Internal Initial State');
/** @type {?} */
const INITIAL_STATE = new InjectionToken('@ngrx/store Initial State');
/** @type {?} */
const REDUCER_FACTORY = new InjectionToken('@ngrx/store Reducer Factory');
/** @type {?} */
const _REDUCER_FACTORY = new InjectionToken('@ngrx/store Internal Reducer Factory Provider');
/** @type {?} */
const INITIAL_REDUCERS = new InjectionToken('@ngrx/store Initial Reducers');
/** @type {?} */
const _INITIAL_REDUCERS = new InjectionToken('@ngrx/store Internal Initial Reducers');
/** @type {?} */
const STORE_FEATURES = new InjectionToken('@ngrx/store Store Features');
/** @type {?} */
const _STORE_REDUCERS = new InjectionToken('@ngrx/store Internal Store Reducers');
/** @type {?} */
const _FEATURE_REDUCERS = new InjectionToken('@ngrx/store Internal Feature Reducers');
/** @type {?} */
const _FEATURE_CONFIGS = new InjectionToken('@ngrx/store Internal Feature Configs');
/** @type {?} */
const _STORE_FEATURES = new InjectionToken('@ngrx/store Internal Store Features');
/** @type {?} */
const _FEATURE_REDUCERS_TOKEN = new InjectionToken('@ngrx/store Internal Feature Reducers Token');
/** @type {?} */
const FEATURE_REDUCERS = new InjectionToken('@ngrx/store Feature Reducers');
/**
 * User-defined meta reducers from StoreModule.forRoot()
 * @type {?}
 */
const USER_PROVIDED_META_REDUCERS = new InjectionToken('@ngrx/store User Provided Meta Reducers');
/**
 * Meta reducers defined either internally by \@ngrx/store or by library authors
 * @type {?}
 */
const META_REDUCERS = new InjectionToken('@ngrx/store Meta Reducers');
/**
 * Concats the user provided meta reducers and the meta reducers provided on the multi
 * injection token
 * @type {?}
 */
const _RESOLVED_META_REDUCERS = new InjectionToken('@ngrx/store Internal Resolved Meta Reducers');
/**
 * Runtime checks defined by the user via an InjectionToken
 * Defaults to `_USER_RUNTIME_CHECKS`
 * @type {?}
 */
const USER_RUNTIME_CHECKS = new InjectionToken('@ngrx/store User Runtime Checks Config');
/**
 * Runtime checks defined by the user via forRoot()
 * @type {?}
 */
const _USER_RUNTIME_CHECKS = new InjectionToken('@ngrx/store Internal User Runtime Checks Config');
/**
 * Runtime checks currently in use
 * @type {?}
 */
const _ACTIVE_RUNTIME_CHECKS = new InjectionToken('@ngrx/store Internal Runtime Checks');
/** @type {?} */
const _ACTION_TYPE_UNIQUENESS_CHECK = new InjectionToken('@ngrx/store Check if Action types are unique');

/**
 * @fileoverview added by tsickle
 * Generated from: src/utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@description
 * Combines reducers for individual features into a single reducer.
 *
 * You can use this function to delegate handling of state transitions to multiple reducers, each acting on their
 * own sub-state within the root state.
 *
 * \@usageNotes
 *
 * **Example combining two feature reducers into one "root" reducer**
 *
 * ```ts
 * export const reducer = combineReducers({
 *   featureA: featureAReducer,
 *   featureB: featureBReducer
 * });
 * ```
 *
 * You can also override the initial states of the sub-features:
 * ```ts
 * export const reducer = combineReducers({
 *   featureA: featureAReducer,
 *   featureB: featureBReducer
 * }, {
 *   featureA: { counterA: 13 },
 *   featureB: { counterB: 37 }
 * });
 * ```
 * @param {?} reducers An object mapping keys of the root state to their corresponding feature reducer.
 * @param {?=} initialState Provides a state value if the current state is `undefined`, as it is initially.
 * @return {?} A reducer function.
 *
 */
function combineReducers(reducers, initialState = {}) {
    /** @type {?} */
    const reducerKeys = Object.keys(reducers);
    /** @type {?} */
    const finalReducers = {};
    for (let i = 0; i < reducerKeys.length; i++) {
        /** @type {?} */
        const key = reducerKeys[i];
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }
    /** @type {?} */
    const finalReducerKeys = Object.keys(finalReducers);
    return (/**
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    function combination(state, action) {
        state = state === undefined ? initialState : state;
        /** @type {?} */
        let hasChanged = false;
        /** @type {?} */
        const nextState = {};
        for (let i = 0; i < finalReducerKeys.length; i++) {
            /** @type {?} */
            const key = finalReducerKeys[i];
            /** @type {?} */
            const reducer = finalReducers[key];
            /** @type {?} */
            const previousStateForKey = state[key];
            /** @type {?} */
            const nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? nextState : state;
    });
}
/**
 * @template T
 * @param {?} object
 * @param {?} keyToRemove
 * @return {?}
 */
function omit(object, keyToRemove) {
    return Object.keys(object)
        .filter((/**
     * @param {?} key
     * @return {?}
     */
    (key) => key !== keyToRemove))
        .reduce((/**
     * @param {?} result
     * @param {?} key
     * @return {?}
     */
    (result, key) => Object.assign(result, { [key]: object[key] })), {});
}
/**
 * @param {...?} functions
 * @return {?}
 */
function compose(...functions) {
    return (/**
     * @param {?} arg
     * @return {?}
     */
    function (arg) {
        if (functions.length === 0) {
            return arg;
        }
        /** @type {?} */
        const last = functions[functions.length - 1];
        /** @type {?} */
        const rest = functions.slice(0, -1);
        return rest.reduceRight((/**
         * @param {?} composed
         * @param {?} fn
         * @return {?}
         */
        (composed, fn) => fn(composed)), last(arg));
    });
}
/**
 * @template T, V
 * @param {?} reducerFactory
 * @param {?=} metaReducers
 * @return {?}
 */
function createReducerFactory(reducerFactory, metaReducers) {
    if (Array.isArray(metaReducers) && metaReducers.length > 0) {
        ((/** @type {?} */ (reducerFactory))) = compose.apply(null, [
            ...metaReducers,
            reducerFactory,
        ]);
    }
    return (/**
     * @param {?} reducers
     * @param {?=} initialState
     * @return {?}
     */
    (reducers, initialState) => {
        /** @type {?} */
        const reducer = reducerFactory(reducers);
        return (/**
         * @param {?} state
         * @param {?} action
         * @return {?}
         */
        (state, action) => {
            state = state === undefined ? ((/** @type {?} */ (initialState))) : state;
            return reducer(state, action);
        });
    });
}
/**
 * @template T, V
 * @param {?=} metaReducers
 * @return {?}
 */
function createFeatureReducerFactory(metaReducers) {
    /** @type {?} */
    const reducerFactory = Array.isArray(metaReducers) && metaReducers.length > 0
        ? compose(...metaReducers)
        : (/**
         * @param {?} r
         * @return {?}
         */
        (r) => r);
    return (/**
     * @param {?} reducer
     * @param {?=} initialState
     * @return {?}
     */
    (reducer, initialState) => {
        reducer = reducerFactory(reducer);
        return (/**
         * @param {?} state
         * @param {?} action
         * @return {?}
         */
        (state, action) => {
            state = state === undefined ? initialState : state;
            return reducer(state, action);
        });
    });
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/reducer_manager.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/** @type {?} */
const UPDATE = (/** @type {?} */ ('@ngrx/store/update-reducers'));
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
const REDUCER_MANAGER_PROVIDERS = [
    ReducerManager,
    { provide: ReducerObservable, useExisting: ReducerManager },
    { provide: ReducerManagerDispatcher, useExisting: ActionsSubject },
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/scanned_actions_subject.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ScannedActionsSubject extends Subject {
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.complete();
    }
}
ScannedActionsSubject.decorators = [
    { type: Injectable }
];
/** @type {?} */
const SCANNED_ACTIONS_SUBJECT_PROVIDERS = [
    ScannedActionsSubject,
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/state.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class StateObservable extends Observable {
}
/**
 * @template T
 */
class State extends BehaviorSubject {
    /**
     * @param {?} actions$
     * @param {?} reducer$
     * @param {?} scannedActions
     * @param {?} initialState
     */
    constructor(actions$, reducer$, scannedActions, initialState) {
        super(initialState);
        /** @type {?} */
        const actionsOnQueue$ = actions$.pipe(observeOn(queueScheduler));
        /** @type {?} */
        const withLatestReducer$ = actionsOnQueue$.pipe(withLatestFrom(reducer$));
        /** @type {?} */
        const seed = { state: initialState };
        /** @type {?} */
        const stateAndAction$ = withLatestReducer$.pipe(scan(reduceState, seed));
        this.stateSubscription = stateAndAction$.subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        ({ state, action }) => {
            this.next(state);
            scannedActions.next((/** @type {?} */ (action)));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stateSubscription.unsubscribe();
        this.complete();
    }
}
State.INIT = INIT;
State.decorators = [
    { type: Injectable }
];
/** @nocollapse */
State.ctorParameters = () => [
    { type: ActionsSubject },
    { type: ReducerObservable },
    { type: ScannedActionsSubject },
    { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] }] }
];
if (false) {
    /** @type {?} */
    State.INIT;
    /**
     * @type {?}
     * @private
     */
    State.prototype.stateSubscription;
}
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
/** @type {?} */
const STATE_PROVIDERS = [
    State,
    { provide: StateObservable, useExisting: State },
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/store.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
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
     * @template Props, K
     * @param {?} pathOrMapFn
     * @param {...?} paths
     * @return {?}
     */
    select(pathOrMapFn, ...paths) {
        return ((/** @type {?} */ (select))).call(null, pathOrMapFn, ...paths)(this);
    }
    /**
     * @template R
     * @param {?} operator
     * @return {?}
     */
    lift(operator) {
        /** @type {?} */
        const store = new Store(this, this.actionsObserver, this.reducerManager);
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
    { type: Injectable }
];
/** @nocollapse */
Store.ctorParameters = () => [
    { type: StateObservable },
    { type: ActionsSubject },
    { type: ReducerManager }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    Store.prototype.actionsObserver;
    /**
     * @type {?}
     * @private
     */
    Store.prototype.reducerManager;
}
/** @type {?} */
const STORE_PROVIDERS = [Store];
/**
 * @template T, Props, K
 * @param {?} pathOrMapFn
 * @param {?=} propsOrPath
 * @param {...?} paths
 * @return {?}
 */
function select(pathOrMapFn, propsOrPath, ...paths) {
    return (/**
     * @param {?} source$
     * @return {?}
     */
    function selectOperator(source$) {
        /** @type {?} */
        let mapped$;
        if (typeof pathOrMapFn === 'string') {
            /** @type {?} */
            const pathSlices = [(/** @type {?} */ (propsOrPath)), ...paths].filter(Boolean);
            mapped$ = source$.pipe(pluck(pathOrMapFn, ...pathSlices));
        }
        else if (typeof pathOrMapFn === 'function') {
            mapped$ = source$.pipe(map((/**
             * @param {?} source
             * @return {?}
             */
            (source) => pathOrMapFn(source, (/** @type {?} */ (propsOrPath))))));
        }
        else {
            throw new TypeError(`Unexpected type '${typeof pathOrMapFn}' in select operator,` +
                ` expected 'string' or 'function'`);
        }
        return mapped$.pipe(distinctUntilChanged());
    });
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/flags.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let _ngrxMockEnvironment = false;
/**
 * @param {?} value
 * @return {?}
 */
function setNgrxMockEnvironment(value) {
    _ngrxMockEnvironment = value;
}
/**
 * @return {?}
 */
function isNgrxMockEnvironment() {
    return _ngrxMockEnvironment;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/selector.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template State, Result, ProjectorFn
 */
function MemoizedSelector() { }
if (false) {
    /** @type {?} */
    MemoizedSelector.prototype.projector;
    /** @type {?} */
    MemoizedSelector.prototype.setResult;
    /** @type {?} */
    MemoizedSelector.prototype.clearResult;
    /**
     * @return {?}
     */
    MemoizedSelector.prototype.release = function () { };
}
/**
 * @record
 * @template State, Props, Result, ProjectorFn
 */
function MemoizedSelectorWithProps() { }
if (false) {
    /** @type {?} */
    MemoizedSelectorWithProps.prototype.projector;
    /** @type {?} */
    MemoizedSelectorWithProps.prototype.setResult;
    /** @type {?} */
    MemoizedSelectorWithProps.prototype.clearResult;
    /**
     * @return {?}
     */
    MemoizedSelectorWithProps.prototype.release = function () { };
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function isEqualCheck(a, b) {
    return a === b;
}
/**
 * @param {?} args
 * @param {?} lastArguments
 * @param {?} comparator
 * @return {?}
 */
function isArgumentsChanged(args, lastArguments, comparator) {
    for (let i = 0; i < args.length; i++) {
        if (!comparator(args[i], lastArguments[i])) {
            return true;
        }
    }
    return false;
}
/**
 * @param {?} projectionFn
 * @param {?} isResultEqual
 * @return {?}
 */
function resultMemoize(projectionFn, isResultEqual) {
    return defaultMemoize(projectionFn, isEqualCheck, isResultEqual);
}
/**
 * @param {?} projectionFn
 * @param {?=} isArgumentsEqual
 * @param {?=} isResultEqual
 * @return {?}
 */
function defaultMemoize(projectionFn, isArgumentsEqual = isEqualCheck, isResultEqual = isEqualCheck) {
    /** @type {?} */
    let lastArguments = null;
    // tslint:disable-next-line:no-any anything could be the result.
    /** @type {?} */
    let lastResult = null;
    /** @type {?} */
    let overrideResult;
    /**
     * @return {?}
     */
    function reset() {
        lastArguments = null;
        lastResult = null;
    }
    /**
     * @param {?=} result
     * @return {?}
     */
    function setResult(result = undefined) {
        overrideResult = { result };
    }
    /**
     * @return {?}
     */
    function clearResult() {
        overrideResult = undefined;
    }
    // tslint:disable-next-line:no-any anything could be the result.
    /**
     * @return {?}
     */
    function memoized() {
        if (overrideResult !== undefined) {
            return overrideResult.result;
        }
        if (!lastArguments) {
            lastResult = projectionFn.apply(null, (/** @type {?} */ (arguments)));
            lastArguments = arguments;
            return lastResult;
        }
        if (!isArgumentsChanged(arguments, lastArguments, isArgumentsEqual)) {
            return lastResult;
        }
        /** @type {?} */
        const newResult = projectionFn.apply(null, (/** @type {?} */ (arguments)));
        lastArguments = arguments;
        if (isResultEqual(lastResult, newResult)) {
            return lastResult;
        }
        lastResult = newResult;
        return newResult;
    }
    return { memoized, reset, setResult, clearResult };
}
/**
 * @param {...?} input
 * @return {?}
 */
function createSelector(...input) {
    return createSelectorFactory(defaultMemoize)(...input);
}
/**
 * @param {?} state
 * @param {?} selectors
 * @param {?} props
 * @param {?} memoizedProjector
 * @return {?}
 */
function defaultStateFn(state, selectors, props, memoizedProjector) {
    if (props === undefined) {
        /** @type {?} */
        const args = ((/** @type {?} */ (selectors))).map((/**
         * @param {?} fn
         * @return {?}
         */
        (fn) => fn(state)));
        return memoizedProjector.memoized.apply(null, args);
    }
    /** @type {?} */
    const args = ((/** @type {?} */ (selectors))).map((/**
     * @param {?} fn
     * @return {?}
     */
    (fn) => fn(state, props)));
    return memoizedProjector.memoized.apply(null, [...args, props]);
}
/**
 * @param {?} memoize
 * @param {?=} options
 * @return {?}
 */
function createSelectorFactory(memoize, options = {
    stateFn: defaultStateFn,
}) {
    return (/**
     * @param {...?} input
     * @return {?}
     */
    function (...input) {
        /** @type {?} */
        let args = input;
        if (Array.isArray(args[0])) {
            const [head, ...tail] = args;
            args = [...head, ...tail];
        }
        /** @type {?} */
        const selectors = args.slice(0, args.length - 1);
        /** @type {?} */
        const projector = args[args.length - 1];
        /** @type {?} */
        const memoizedSelectors = selectors.filter((/**
         * @param {?} selector
         * @return {?}
         */
        (selector) => selector.release && typeof selector.release === 'function'));
        /** @type {?} */
        const memoizedProjector = memoize((/**
         * @param {...?} selectors
         * @return {?}
         */
        function (...selectors) {
            return projector.apply(null, selectors);
        }));
        /** @type {?} */
        const memoizedState = defaultMemoize((/**
         * @param {?} state
         * @param {?} props
         * @return {?}
         */
        function (state, props) {
            return options.stateFn.apply(null, [
                state,
                selectors,
                props,
                memoizedProjector,
            ]);
        }));
        /**
         * @return {?}
         */
        function release() {
            memoizedState.reset();
            memoizedProjector.reset();
            memoizedSelectors.forEach((/**
             * @param {?} selector
             * @return {?}
             */
            (selector) => selector.release()));
        }
        return Object.assign(memoizedState.memoized, {
            release,
            projector: memoizedProjector.memoized,
            setResult: memoizedState.setResult,
            clearResult: memoizedState.clearResult,
        });
    });
}
/**
 * @param {?} featureName
 * @return {?}
 */
function createFeatureSelector(featureName) {
    return createSelector((/**
     * @param {?} state
     * @return {?}
     */
    (state) => {
        /** @type {?} */
        const featureState = state[featureName];
        if (!isNgrxMockEnvironment() && isDevMode() && !(featureName in state)) {
            console.warn(`@ngrx/store: The feature name \"${featureName}\" does ` +
                'not exist in the state, therefore createFeatureSelector ' +
                'cannot access it.  Be sure it is imported in a loaded module ' +
                `using StoreModule.forRoot('${featureName}', ...) or ` +
                `StoreModule.forFeature('${featureName}', ...).  If the default ` +
                'state is intended to be undefined, as is the case with router ' +
                'state, this development-only warning message can be ignored.');
        }
        return featureState;
    }), (/**
     * @param {?} featureState
     * @return {?}
     */
    (featureState) => featureState));
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/meta-reducers/utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const RUNTIME_CHECK_URL = 'https://ngrx.io/guide/store/configuration/runtime-checks';
/**
 * @param {?} target
 * @return {?}
 */
function isUndefined(target) {
    return target === undefined;
}
/**
 * @param {?} target
 * @return {?}
 */
function isNull(target) {
    return target === null;
}
/**
 * @param {?} target
 * @return {?}
 */
function isArray(target) {
    return Array.isArray(target);
}
/**
 * @param {?} target
 * @return {?}
 */
function isString(target) {
    return typeof target === 'string';
}
/**
 * @param {?} target
 * @return {?}
 */
function isBoolean(target) {
    return typeof target === 'boolean';
}
/**
 * @param {?} target
 * @return {?}
 */
function isNumber(target) {
    return typeof target === 'number';
}
/**
 * @param {?} target
 * @return {?}
 */
function isObjectLike(target) {
    return typeof target === 'object' && target !== null;
}
/**
 * @param {?} target
 * @return {?}
 */
function isObject(target) {
    return isObjectLike(target) && !isArray(target);
}
/**
 * @param {?} target
 * @return {?}
 */
function isPlainObject(target) {
    if (!isObject(target)) {
        return false;
    }
    /** @type {?} */
    const targetPrototype = Object.getPrototypeOf(target);
    return targetPrototype === Object.prototype || targetPrototype === null;
}
/**
 * @param {?} target
 * @return {?}
 */
function isFunction(target) {
    return typeof target === 'function';
}
/**
 * @param {?} target
 * @return {?}
 */
function isComponent(target) {
    return isFunction(target) && target.hasOwnProperty('ɵcmp');
}
/**
 * @param {?} target
 * @param {?} propertyName
 * @return {?}
 */
function hasOwnProperty(target, propertyName) {
    return Object.prototype.hasOwnProperty.call(target, propertyName);
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/meta-reducers/immutability_reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} reducer
 * @param {?} checks
 * @return {?}
 */
function immutabilityCheckMetaReducer(reducer, checks) {
    return (/**
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    function (state, action) {
        /** @type {?} */
        const act = checks.action(action) ? freeze(action) : action;
        /** @type {?} */
        const nextState = reducer(state, act);
        return checks.state() ? freeze(nextState) : nextState;
    });
}
/**
 * @param {?} target
 * @return {?}
 */
function freeze(target) {
    Object.freeze(target);
    /** @type {?} */
    const targetIsFunction = isFunction(target);
    Object.getOwnPropertyNames(target).forEach((/**
     * @param {?} prop
     * @return {?}
     */
    (prop) => {
        // Ignore Ivy properties, ref: https://github.com/ngrx/platform/issues/2109#issuecomment-582689060
        if (prop.startsWith('ɵ')) {
            return;
        }
        if (hasOwnProperty(target, prop) &&
            (targetIsFunction
                ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments'
                : true)) {
            /** @type {?} */
            const propValue = target[prop];
            if ((isObjectLike(propValue) || isFunction(propValue)) &&
                !Object.isFrozen(propValue)) {
                freeze(propValue);
            }
        }
    }));
    return target;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/meta-reducers/serialization_reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} reducer
 * @param {?} checks
 * @return {?}
 */
function serializationCheckMetaReducer(reducer, checks) {
    return (/**
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    function (state, action) {
        if (checks.action(action)) {
            /** @type {?} */
            const unserializableAction = getUnserializable(action);
            throwIfUnserializable(unserializableAction, 'action');
        }
        /** @type {?} */
        const nextState = reducer(state, action);
        if (checks.state()) {
            /** @type {?} */
            const unserializableState = getUnserializable(nextState);
            throwIfUnserializable(unserializableState, 'state');
        }
        return nextState;
    });
}
/**
 * @param {?=} target
 * @param {?=} path
 * @return {?}
 */
function getUnserializable(target, path = []) {
    // Guard against undefined and null, e.g. a reducer that returns undefined
    if ((isUndefined(target) || isNull(target)) && path.length === 0) {
        return {
            path: ['root'],
            value: target,
        };
    }
    /** @type {?} */
    const keys = Object.keys(target);
    return keys.reduce((/**
     * @param {?} result
     * @param {?} key
     * @return {?}
     */
    (result, key) => {
        if (result) {
            return result;
        }
        /** @type {?} */
        const value = ((/** @type {?} */ (target)))[key];
        // Ignore Ivy components
        if (isComponent(value)) {
            return result;
        }
        if (isUndefined(value) ||
            isNull(value) ||
            isNumber(value) ||
            isBoolean(value) ||
            isString(value) ||
            isArray(value)) {
            return false;
        }
        if (isPlainObject(value)) {
            return getUnserializable(value, [...path, key]);
        }
        return {
            path: [...path, key],
            value,
        };
    }), false);
}
/**
 * @param {?} unserializable
 * @param {?} context
 * @return {?}
 */
function throwIfUnserializable(unserializable, context) {
    if (unserializable === false) {
        return;
    }
    /** @type {?} */
    const unserializablePath = unserializable.path.join('.');
    /** @type {?} */
    const error = new Error(`Detected unserializable ${context} at "${unserializablePath}". ${RUNTIME_CHECK_URL}#strict${context}serializability`);
    error.value = unserializable.value;
    error.unserializablePath = unserializablePath;
    throw error;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/meta-reducers/inNgZoneAssert_reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} reducer
 * @param {?} checks
 * @return {?}
 */
function inNgZoneAssertMetaReducer(reducer, checks) {
    return (/**
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    function (state, action) {
        if (checks.action(action) && !NgZone.isInAngularZone()) {
            throw new Error(`Action '${action.type}' running outside NgZone. ${RUNTIME_CHECK_URL}#strictactionwithinngzone`);
        }
        return reducer(state, action);
    });
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/meta-reducers/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: src/runtime_checks.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} runtimeChecks
 * @return {?}
 */
function createActiveRuntimeChecks(runtimeChecks) {
    if (isDevMode()) {
        return Object.assign({ strictStateSerializability: false, strictActionSerializability: false, strictStateImmutability: true, strictActionImmutability: true, strictActionWithinNgZone: false, strictActionTypeUniqueness: false }, runtimeChecks);
    }
    return {
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictActionWithinNgZone: false,
        strictActionTypeUniqueness: false,
    };
}
/**
 * @param {?} __0
 * @return {?}
 */
function createSerializationCheckMetaReducer({ strictActionSerializability, strictStateSerializability, }) {
    return (/**
     * @param {?} reducer
     * @return {?}
     */
    (reducer) => strictActionSerializability || strictStateSerializability
        ? serializationCheckMetaReducer(reducer, {
            action: (/**
             * @param {?} action
             * @return {?}
             */
            (action) => strictActionSerializability && !ignoreNgrxAction(action)),
            state: (/**
             * @return {?}
             */
            () => strictStateSerializability),
        })
        : reducer);
}
/**
 * @param {?} __0
 * @return {?}
 */
function createImmutabilityCheckMetaReducer({ strictActionImmutability, strictStateImmutability, }) {
    return (/**
     * @param {?} reducer
     * @return {?}
     */
    (reducer) => strictActionImmutability || strictStateImmutability
        ? immutabilityCheckMetaReducer(reducer, {
            action: (/**
             * @param {?} action
             * @return {?}
             */
            (action) => strictActionImmutability && !ignoreNgrxAction(action)),
            state: (/**
             * @return {?}
             */
            () => strictStateImmutability),
        })
        : reducer);
}
/**
 * @param {?} action
 * @return {?}
 */
function ignoreNgrxAction(action) {
    return action.type.startsWith('@ngrx');
}
/**
 * @param {?} __0
 * @return {?}
 */
function createInNgZoneCheckMetaReducer({ strictActionWithinNgZone, }) {
    return (/**
     * @param {?} reducer
     * @return {?}
     */
    (reducer) => strictActionWithinNgZone
        ? inNgZoneAssertMetaReducer(reducer, {
            action: (/**
             * @param {?} action
             * @return {?}
             */
            (action) => strictActionWithinNgZone && !ignoreNgrxAction(action)),
        })
        : reducer);
}
/**
 * @param {?=} runtimeChecks
 * @return {?}
 */
function provideRuntimeChecks(runtimeChecks) {
    return [
        {
            provide: _USER_RUNTIME_CHECKS,
            useValue: runtimeChecks,
        },
        {
            provide: USER_RUNTIME_CHECKS,
            useFactory: _runtimeChecksFactory,
            deps: [_USER_RUNTIME_CHECKS],
        },
        {
            provide: _ACTIVE_RUNTIME_CHECKS,
            deps: [USER_RUNTIME_CHECKS],
            useFactory: createActiveRuntimeChecks,
        },
        {
            provide: META_REDUCERS,
            multi: true,
            deps: [_ACTIVE_RUNTIME_CHECKS],
            useFactory: createImmutabilityCheckMetaReducer,
        },
        {
            provide: META_REDUCERS,
            multi: true,
            deps: [_ACTIVE_RUNTIME_CHECKS],
            useFactory: createSerializationCheckMetaReducer,
        },
        {
            provide: META_REDUCERS,
            multi: true,
            deps: [_ACTIVE_RUNTIME_CHECKS],
            useFactory: createInNgZoneCheckMetaReducer,
        },
    ];
}
/**
 * @return {?}
 */
function checkForActionTypeUniqueness() {
    return [
        {
            provide: _ACTION_TYPE_UNIQUENESS_CHECK,
            multi: true,
            deps: [_ACTIVE_RUNTIME_CHECKS],
            useFactory: _actionTypeUniquenessCheck,
        },
    ];
}
/**
 * @param {?} runtimeChecks
 * @return {?}
 */
function _runtimeChecksFactory(runtimeChecks) {
    return runtimeChecks;
}
/**
 * @param {?} config
 * @return {?}
 */
function _actionTypeUniquenessCheck(config) {
    if (!config.strictActionTypeUniqueness) {
        return;
    }
    /** @type {?} */
    const duplicates = Object.entries(REGISTERED_ACTION_TYPES)
        .filter((/**
     * @param {?} __0
     * @return {?}
     */
    ([, registrations]) => registrations > 1))
        .map((/**
     * @param {?} __0
     * @return {?}
     */
    ([type]) => type));
    if (duplicates.length) {
        throw new Error(`Action types are registered more than once, ${duplicates
            .map((/**
         * @param {?} type
         * @return {?}
         */
        (type) => `"${type}"`))
            .join(', ')}. ${RUNTIME_CHECK_URL}#strictactiontypeuniqueness`);
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/store_module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StoreRootModule {
    /**
     * @param {?} actions$
     * @param {?} reducer$
     * @param {?} scannedActions$
     * @param {?} store
     * @param {?} guard
     * @param {?} actionCheck
     */
    constructor(actions$, reducer$, scannedActions$, store, guard, actionCheck) { }
}
StoreRootModule.decorators = [
    { type: NgModule, args: [{},] }
];
/** @nocollapse */
StoreRootModule.ctorParameters = () => [
    { type: ActionsSubject },
    { type: ReducerObservable },
    { type: ScannedActionsSubject },
    { type: Store },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [_ROOT_STORE_GUARD,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [_ACTION_TYPE_UNIQUENESS_CHECK,] }] }
];
class StoreFeatureModule {
    /**
     * @param {?} features
     * @param {?} featureReducers
     * @param {?} reducerManager
     * @param {?} root
     * @param {?} actionCheck
     */
    constructor(features, featureReducers, reducerManager, root, actionCheck) {
        this.features = features;
        this.featureReducers = featureReducers;
        this.reducerManager = reducerManager;
        /** @type {?} */
        const feats = features.map((/**
         * @param {?} feature
         * @param {?} index
         * @return {?}
         */
        (feature, index) => {
            /** @type {?} */
            const featureReducerCollection = featureReducers.shift();
            /** @type {?} */
            const reducers = (/** @type {?} */ (featureReducerCollection /*TODO(#823)*/))[index];
            return Object.assign(Object.assign({}, feature), { reducers, initialState: _initialStateFactory(feature.initialState) });
        }));
        reducerManager.addFeatures(feats);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.reducerManager.removeFeatures(this.features);
    }
}
StoreFeatureModule.decorators = [
    { type: NgModule, args: [{},] }
];
/** @nocollapse */
StoreFeatureModule.ctorParameters = () => [
    { type: Array, decorators: [{ type: Inject, args: [_STORE_FEATURES,] }] },
    { type: Array, decorators: [{ type: Inject, args: [FEATURE_REDUCERS,] }] },
    { type: ReducerManager },
    { type: StoreRootModule },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [_ACTION_TYPE_UNIQUENESS_CHECK,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    StoreFeatureModule.prototype.features;
    /**
     * @type {?}
     * @private
     */
    StoreFeatureModule.prototype.featureReducers;
    /**
     * @type {?}
     * @private
     */
    StoreFeatureModule.prototype.reducerManager;
}
/**
 * @record
 * @template T, V
 */
function StoreConfig() { }
if (false) {
    /** @type {?|undefined} */
    StoreConfig.prototype.initialState;
    /** @type {?|undefined} */
    StoreConfig.prototype.reducerFactory;
    /** @type {?|undefined} */
    StoreConfig.prototype.metaReducers;
}
/**
 * @record
 * @template T, V
 */
function RootStoreConfig() { }
if (false) {
    /** @type {?|undefined} */
    RootStoreConfig.prototype.runtimeChecks;
}
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
                {
                    provide: _ROOT_STORE_GUARD,
                    useFactory: _provideForRootGuard,
                    deps: [[Store, new Optional(), new SkipSelf()]],
                },
                { provide: _INITIAL_STATE, useValue: config.initialState },
                {
                    provide: INITIAL_STATE,
                    useFactory: _initialStateFactory,
                    deps: [_INITIAL_STATE],
                },
                { provide: _INITIAL_REDUCERS, useValue: reducers },
                {
                    provide: _STORE_REDUCERS,
                    useExisting: reducers instanceof InjectionToken ? reducers : _INITIAL_REDUCERS,
                },
                {
                    provide: INITIAL_REDUCERS,
                    deps: [Injector, _INITIAL_REDUCERS, [new Inject(_STORE_REDUCERS)]],
                    useFactory: _createStoreReducers,
                },
                {
                    provide: USER_PROVIDED_META_REDUCERS,
                    useValue: config.metaReducers ? config.metaReducers : [],
                },
                {
                    provide: _RESOLVED_META_REDUCERS,
                    deps: [META_REDUCERS, USER_PROVIDED_META_REDUCERS],
                    useFactory: _concatMetaReducers,
                },
                {
                    provide: _REDUCER_FACTORY,
                    useValue: config.reducerFactory
                        ? config.reducerFactory
                        : combineReducers,
                },
                {
                    provide: REDUCER_FACTORY,
                    deps: [_REDUCER_FACTORY, _RESOLVED_META_REDUCERS],
                    useFactory: createReducerFactory,
                },
                ACTIONS_SUBJECT_PROVIDERS,
                REDUCER_MANAGER_PROVIDERS,
                SCANNED_ACTIONS_SUBJECT_PROVIDERS,
                STATE_PROVIDERS,
                STORE_PROVIDERS,
                provideRuntimeChecks(config.runtimeChecks),
                checkForActionTypeUniqueness(),
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
                    provide: _FEATURE_CONFIGS,
                    multi: true,
                    useValue: config,
                },
                {
                    provide: STORE_FEATURES,
                    multi: true,
                    useValue: {
                        key: featureName,
                        reducerFactory: !(config instanceof InjectionToken) && config.reducerFactory
                            ? config.reducerFactory
                            : combineReducers,
                        metaReducers: !(config instanceof InjectionToken) && config.metaReducers
                            ? config.metaReducers
                            : [],
                        initialState: !(config instanceof InjectionToken) && config.initialState
                            ? config.initialState
                            : undefined,
                    },
                },
                {
                    provide: _STORE_FEATURES,
                    deps: [Injector, _FEATURE_CONFIGS, STORE_FEATURES],
                    useFactory: _createFeatureStore,
                },
                { provide: _FEATURE_REDUCERS, multi: true, useValue: reducers },
                {
                    provide: _FEATURE_REDUCERS_TOKEN,
                    multi: true,
                    useExisting: reducers instanceof InjectionToken ? reducers : _FEATURE_REDUCERS,
                },
                {
                    provide: FEATURE_REDUCERS,
                    multi: true,
                    deps: [
                        Injector,
                        _FEATURE_REDUCERS,
                        [new Inject(_FEATURE_REDUCERS_TOKEN)],
                    ],
                    useFactory: _createFeatureReducers,
                },
                checkForActionTypeUniqueness(),
            ],
        };
    }
}
StoreModule.decorators = [
    { type: NgModule, args: [{},] }
];
/**
 * @param {?} injector
 * @param {?} reducers
 * @return {?}
 */
function _createStoreReducers(injector, reducers) {
    return reducers instanceof InjectionToken ? injector.get(reducers) : reducers;
}
/**
 * @param {?} injector
 * @param {?} configs
 * @param {?} featureStores
 * @return {?}
 */
function _createFeatureStore(injector, configs, featureStores) {
    return featureStores.map((/**
     * @param {?} feat
     * @param {?} index
     * @return {?}
     */
    (feat, index) => {
        if (configs[index] instanceof InjectionToken) {
            /** @type {?} */
            const conf = injector.get(configs[index]);
            return {
                key: feat.key,
                reducerFactory: conf.reducerFactory
                    ? conf.reducerFactory
                    : combineReducers,
                metaReducers: conf.metaReducers ? conf.metaReducers : [],
                initialState: conf.initialState,
            };
        }
        return feat;
    }));
}
/**
 * @param {?} injector
 * @param {?} reducerCollection
 * @return {?}
 */
function _createFeatureReducers(injector, reducerCollection) {
    /** @type {?} */
    const reducers = reducerCollection.map((/**
     * @param {?} reducer
     * @return {?}
     */
    (reducer) => {
        return reducer instanceof InjectionToken ? injector.get(reducer) : reducer;
    }));
    return reducers;
}
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
 * @param {?} metaReducers
 * @param {?} userProvidedMetaReducers
 * @return {?}
 */
function _concatMetaReducers(metaReducers, userProvidedMetaReducers) {
    return metaReducers.concat(userProvidedMetaReducers);
}
/**
 * @param {?} store
 * @return {?}
 */
function _provideForRootGuard(store) {
    if (store) {
        throw new TypeError(`StoreModule.forRoot() called twice. Feature modules should use StoreModule.forFeature() instead.`);
    }
    return 'guarded';
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/reducer_creator.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template S
 */
function On() { }
if (false) {
    /** @type {?} */
    On.prototype.reducer;
    /** @type {?} */
    On.prototype.types;
}
/**
 * @record
 * @template S, C
 */
function OnReducer() { }
/**
 * \@description
 * Associates actions with a given state change function.
 * A state change function must be provided as the last parameter.
 *
 * @param {...?} args `ActionCreator`'s followed by a state change function.
 *
 * **To maintain type-safety**: pass 10 or less `ActionCreator`'s.
 * @return {?} an association of action types with a state change function.
 */
function on(...args) {
    /** @type {?} */
    const reducer = (/** @type {?} */ (args.pop()));
    /** @type {?} */
    const types = args.reduce((/**
     * @param {?} result
     * @param {?} creator
     * @return {?}
     */
    (result, creator) => [...result, ((/** @type {?} */ (creator))).type]), (/** @type {?} */ ([])));
    return { reducer, types };
}
/**
 * \@description
 * Creates a reducer function to handle state transitions.
 *
 * Reducer creators reduce the explicitness of reducer functions with switch statements.
 *
 * \@usageNotes
 *
 * - Must be used with `ActionCreator`'s (returned by `createAction`). Cannot be used with class-based action creators.
 * - The returned `ActionReducer` should additionally be wrapped with another function, if you are using View Engine AOT.
 * In case you are using Ivy (or only JIT View Engine) the extra wrapper function is not required.
 *
 * **Declaring a reducer creator**
 *
 * ```ts
 * export const reducer = createReducer(
 *   initialState,
 *   on(
 *     featureActions.actionOne,
 *     featureActions.actionTwo,
 *     (state, { updatedValue }) => ({ ...state, prop: updatedValue })
 *   ),
 *   on(featureActions.actionThree, () => initialState);
 * );
 * ```
 *
 * **Declaring a reducer creator using a wrapper function (Only needed if using View Engine AOT)**
 *
 * ```ts
 * const featureReducer = createReducer(
 *   initialState,
 *   on(
 *     featureActions.actionOne,
 *     featureActions.actionTwo,
 *     (state, { updatedValue }) => ({ ...state, prop: updatedValue })
 *   ),
 *   on(featureActions.actionThree, () => initialState);
 * );
 *
 * export function reducer(state: State | undefined, action: Action) {
 *   return featureReducer(state, action);
 * }
 * ```
 * @template S, A
 * @param {?} initialState Provides a state value if the current state is `undefined`, as it is initially.
 * @param {...?} ons Associations between actions and state changes.
 * @return {?} A reducer function.
 *
 */
function createReducer(initialState, ...ons) {
    /** @type {?} */
    const map = new Map();
    for (let on of ons) {
        for (let type of on.types) {
            if (map.has(type)) {
                /** @type {?} */
                const existingReducer = (/** @type {?} */ (map.get(type)));
                /** @type {?} */
                const newReducer = (/**
                 * @param {?} state
                 * @param {?} action
                 * @return {?}
                 */
                (state, action) => on.reducer(existingReducer(state, action), action));
                map.set(type, newReducer);
            }
            else {
                map.set(type, on.reducer);
            }
        }
    }
    return (/**
     * @param {?=} state
     * @param {?=} action
     * @return {?}
     */
    function (state = initialState, action) {
        /** @type {?} */
        const reducer = map.get(action.type);
        return reducer ? reducer(state, action) : state;
    });
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: public_api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngrx-store.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ActionsSubject, FEATURE_REDUCERS, INIT, INITIAL_REDUCERS, INITIAL_STATE, META_REDUCERS, REDUCER_FACTORY, ReducerManager, ReducerManagerDispatcher, ReducerObservable, STORE_FEATURES, ScannedActionsSubject, State, StateObservable, Store, StoreFeatureModule, StoreModule, StoreRootModule, UPDATE, USER_PROVIDED_META_REDUCERS, USER_RUNTIME_CHECKS, combineReducers, compose, createAction, createFeatureSelector, createReducer, createReducerFactory, createSelector, createSelectorFactory, defaultMemoize, defaultStateFn, isNgrxMockEnvironment, on, props, reduceState, resultMemoize, select, setNgrxMockEnvironment, union, STORE_PROVIDERS as ɵb, createActiveRuntimeChecks as ɵba, createSerializationCheckMetaReducer as ɵbb, createImmutabilityCheckMetaReducer as ɵbc, createInNgZoneCheckMetaReducer as ɵbd, provideRuntimeChecks as ɵbe, checkForActionTypeUniqueness as ɵbf, _runtimeChecksFactory as ɵbg, _actionTypeUniquenessCheck as ɵbh, ACTIONS_SUBJECT_PROVIDERS as ɵc, REDUCER_MANAGER_PROVIDERS as ɵd, SCANNED_ACTIONS_SUBJECT_PROVIDERS as ɵe, isEqualCheck as ɵf, STATE_PROVIDERS as ɵg, _ROOT_STORE_GUARD as ɵh, _INITIAL_STATE as ɵi, _REDUCER_FACTORY as ɵj, _INITIAL_REDUCERS as ɵk, _STORE_REDUCERS as ɵl, _FEATURE_REDUCERS as ɵm, _FEATURE_CONFIGS as ɵn, _STORE_FEATURES as ɵo, _FEATURE_REDUCERS_TOKEN as ɵp, _RESOLVED_META_REDUCERS as ɵq, _USER_RUNTIME_CHECKS as ɵr, _ACTIVE_RUNTIME_CHECKS as ɵs, _ACTION_TYPE_UNIQUENESS_CHECK as ɵt, _createStoreReducers as ɵu, _createFeatureStore as ɵv, _createFeatureReducers as ɵw, _initialStateFactory as ɵx, _concatMetaReducers as ɵy, _provideForRootGuard as ɵz };
//# sourceMappingURL=ngrx-store.js.map
