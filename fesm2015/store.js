/**
 * @license NgRx 8.1.0
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */
import { Injectable, InjectionToken, Inject, isDevMode, NgModule, Injector } from '@angular/core';
import { BehaviorSubject, Observable, Subject, queueScheduler } from 'rxjs';
import { observeOn, withLatestFrom, scan, pluck, map, distinctUntilChanged } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    if (typeof config === 'function') {
        return defineType(type, (/**
         * @param {...?} args
         * @return {?}
         */
        (...args) => (Object.assign({}, config(...args), { type }))));
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
            (props) => (Object.assign({}, props, { type }))));
        default:
            throw new Error('Unexpected config.');
    }
}
/**
 * @template P
 * @return {?}
 */
function props() {
    // the return type does not match TypePropertyIsNotAllowed, so double casting
    // is used.
    return (/** @type {?} */ (((/** @type {?} */ ({ _as: 'props', _p: (/** @type {?} */ (undefined)) })))));
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
 * Runtime checks defined by the user
 * @type {?}
 */
const _USER_RUNTIME_CHECKS = new InjectionToken('@ngrx/store Internal User Runtime Checks Config');
/**
 * Runtime checks currently in use
 * @type {?}
 */
const _ACTIVE_RUNTIME_CHECKS = new InjectionToken('@ngrx/store Internal Runtime Checks');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} reducers
 * @param {?=} initialState
 * @return {?}
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
    key => key !== keyToRemove))
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
/** @type {?} */
const REDUCER_MANAGER_PROVIDERS = [
    ReducerManager,
    { provide: ReducerObservable, useExisting: ReducerManager },
    { provide: ReducerManagerDispatcher, useExisting: ActionsSubject },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            scannedActions.next(action);
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @template Props
     * @param {?} pathOrMapFn
     * @param {...?} paths
     * @return {?}
     */
    select(pathOrMapFn, ...paths) {
        return select.call(null, pathOrMapFn, ...paths)(this);
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
/** @type {?} */
const STORE_PROVIDERS = [Store];
/**
 * @template T, Props, K
 * @param {?} pathOrMapFn
 * @param {?} propsOrPath
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
            source => pathOrMapFn(source, (/** @type {?} */ (propsOrPath))))));
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        overrideResult = result;
    }
    // tslint:disable-next-line:no-any anything could be the result.
    /**
     * @return {?}
     */
    function memoized() {
        if (overrideResult !== undefined) {
            return overrideResult;
        }
        if (!lastArguments) {
            lastResult = projectionFn.apply(null, (/** @type {?} */ (arguments)));
            lastArguments = arguments;
            return lastResult;
        }
        if (!isArgumentsChanged(arguments, lastArguments, isArgumentsEqual)) {
            return lastResult;
        }
        lastArguments = arguments;
        /** @type {?} */
        const newResult = projectionFn.apply(null, (/** @type {?} */ (arguments)));
        if (isResultEqual(lastResult, newResult)) {
            return lastResult;
        }
        lastResult = newResult;
        return newResult;
    }
    return { memoized, reset, setResult };
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
        fn => fn(state)));
        return memoizedProjector.memoized.apply(null, args);
    }
    /** @type {?} */
    const args = ((/** @type {?} */ (selectors))).map((/**
     * @param {?} fn
     * @return {?}
     */
    fn => fn(state, props)));
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
            selector => selector.release()));
        }
        return Object.assign(memoizedState.memoized, {
            release,
            projector: memoizedProjector.memoized,
            setResult: memoizedState.setResult,
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
    (state) => state[featureName]), (/**
     * @param {?} featureState
     * @return {?}
     */
    (featureState) => featureState));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
 * @param {?} propertyName
 * @return {?}
 */
function hasOwnProperty(target, propertyName) {
    return Object.prototype.hasOwnProperty.call(target, propertyName);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        const act = checks.action ? freeze(action) : action;
        /** @type {?} */
        const nextState = reducer(state, act);
        return checks.state ? freeze(nextState) : nextState;
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
    prop => {
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        if (checks.action) {
            /** @type {?} */
            const unserializableAction = getUnserializable(action);
            throwIfUnserializable(unserializableAction, 'action');
        }
        /** @type {?} */
        const nextState = reducer(state, action);
        if (checks.state) {
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
    const error = new Error(`Detected unserializable ${context} at "${unserializablePath}"`);
    error.value = unserializable.value;
    error.unserializablePath = unserializablePath;
    throw error;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} runtimeChecks
 * @return {?}
 */
function createActiveRuntimeChecks(runtimeChecks) {
    if (isDevMode()) {
        if (runtimeChecks === undefined) {
            console.warn('@ngrx/store: runtime checks are currently opt-in but will be the default in the next major version with the possibility to opt-out, see https://ngrx.io/guide/migration/v8 for more information.');
        }
        return Object.assign({ strictStateSerializability: false, strictActionSerializability: false, strictStateImmutability: false, strictActionImmutability: false }, runtimeChecks);
    }
    return {
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictStateImmutability: false,
        strictActionImmutability: false,
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
    reducer => strictActionSerializability || strictStateSerializability
        ? serializationCheckMetaReducer(reducer, {
            action: strictActionSerializability,
            state: strictStateSerializability,
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
    reducer => strictActionImmutability || strictStateImmutability
        ? immutabilityCheckMetaReducer(reducer, {
            action: strictActionImmutability,
            state: strictStateImmutability,
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
            provide: _ACTIVE_RUNTIME_CHECKS,
            deps: [_USER_RUNTIME_CHECKS],
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
    ];
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StoreRootModule {
    /**
     * @param {?} actions$
     * @param {?} reducer$
     * @param {?} scannedActions$
     * @param {?} store
     */
    constructor(actions$, reducer$, scannedActions$, store) { }
}
StoreRootModule.decorators = [
    { type: NgModule, args: [{},] }
];
/** @nocollapse */
StoreRootModule.ctorParameters = () => [
    { type: ActionsSubject },
    { type: ReducerObservable },
    { type: ScannedActionsSubject },
    { type: Store }
];
class StoreFeatureModule {
    /**
     * @param {?} features
     * @param {?} featureReducers
     * @param {?} reducerManager
     * @param {?} root
     */
    constructor(features, featureReducers, reducerManager, root) {
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
            return Object.assign({}, feature, { reducers, initialState: _initialStateFactory(feature.initialState) });
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
    { type: StoreRootModule }
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
    reducer => {
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
 * - Must be used with `ActionCreator`'s (returned by `createAction`).  Cannot be used with class-based action creators.
 * - An action type should only be associated with at most one state change function, similar to switch statements.
 *   - In the case this is violated, the latest defined associated will be used (the latest `on` function passed).
 * - The returned `ActionReducer` should additionally be returned from an exported `reducer` function.
 * This is because [function calls are not supported](https://angular.io/guide/aot-compiler#function-calls-are-not-supported) by the AOT compiler.
 *
 * **Declaring a reducer creator with an exported reducer function**
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
 * @template S
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
            map.set(type, on.reducer);
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ACTIONS_SUBJECT_PROVIDERS as ɵngrx_modules_store_store_c, REDUCER_MANAGER_PROVIDERS as ɵngrx_modules_store_store_d, createActiveRuntimeChecks as ɵngrx_modules_store_store_x, createImmutabilityCheckMetaReducer as ɵngrx_modules_store_store_z, createSerializationCheckMetaReducer as ɵngrx_modules_store_store_y, provideRuntimeChecks as ɵngrx_modules_store_store_ba, SCANNED_ACTIONS_SUBJECT_PROVIDERS as ɵngrx_modules_store_store_e, isEqualCheck as ɵngrx_modules_store_store_f, STATE_PROVIDERS as ɵngrx_modules_store_store_g, STORE_PROVIDERS as ɵngrx_modules_store_store_b, _concatMetaReducers as ɵngrx_modules_store_store_w, _createFeatureReducers as ɵngrx_modules_store_store_u, _createFeatureStore as ɵngrx_modules_store_store_t, _createStoreReducers as ɵngrx_modules_store_store_s, _initialStateFactory as ɵngrx_modules_store_store_v, _ACTIVE_RUNTIME_CHECKS as ɵngrx_modules_store_store_r, _FEATURE_CONFIGS as ɵngrx_modules_store_store_m, _FEATURE_REDUCERS as ɵngrx_modules_store_store_l, _FEATURE_REDUCERS_TOKEN as ɵngrx_modules_store_store_o, _INITIAL_REDUCERS as ɵngrx_modules_store_store_j, _INITIAL_STATE as ɵngrx_modules_store_store_h, _REDUCER_FACTORY as ɵngrx_modules_store_store_i, _RESOLVED_META_REDUCERS as ɵngrx_modules_store_store_p, _STORE_FEATURES as ɵngrx_modules_store_store_n, _STORE_REDUCERS as ɵngrx_modules_store_store_k, _USER_RUNTIME_CHECKS as ɵngrx_modules_store_store_q, createAction, props, union, Store, select, combineReducers, compose, createReducerFactory, ActionsSubject, INIT, ReducerManager, ReducerObservable, ReducerManagerDispatcher, UPDATE, ScannedActionsSubject, createSelector, createSelectorFactory, createFeatureSelector, defaultMemoize, defaultStateFn, resultMemoize, State, StateObservable, reduceState, INITIAL_STATE, REDUCER_FACTORY, INITIAL_REDUCERS, STORE_FEATURES, META_REDUCERS, FEATURE_REDUCERS, USER_PROVIDED_META_REDUCERS, StoreModule, StoreRootModule, StoreFeatureModule, on, createReducer };
//# sourceMappingURL=store.js.map
