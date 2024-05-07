// src/globals.mjs
var REGISTERED_ACTION_TYPES = {};
function resetRegisteredActionTypes() {
  for (const key of Object.keys(REGISTERED_ACTION_TYPES)) {
    delete REGISTERED_ACTION_TYPES[key];
  }
}

// src/action_creator.mjs
function createAction(type, config) {
  REGISTERED_ACTION_TYPES[type] = (REGISTERED_ACTION_TYPES[type] || 0) + 1;
  if (typeof config === "function") {
    return defineType(type, (...args) => ({
      ...config(...args),
      type
    }));
  }
  const as = config ? config._as : "empty";
  switch (as) {
    case "empty":
      return defineType(type, () => ({ type }));
    case "props":
      return defineType(type, (props2) => ({
        ...props2,
        type
      }));
    default:
      throw new Error("Unexpected config.");
  }
}
function props() {
  return { _as: "props", _p: void 0 };
}
function union(creators) {
  return void 0;
}
function defineType(type, creator) {
  return Object.defineProperty(creator, "type", {
    value: type,
    writable: false
  });
}

// src/helpers.mjs
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.substring(1);
}
function uncapitalize(text) {
  return text.charAt(0).toLowerCase() + text.substring(1);
}

// src/action_group_creator.mjs
function createActionGroup(config) {
  const { source, events } = config;
  return Object.keys(events).reduce((actionGroup, eventName) => ({
    ...actionGroup,
    [toActionName(eventName)]: createAction(toActionType(source, eventName), events[eventName])
  }), {});
}
function emptyProps() {
  return props();
}
function toActionName(eventName) {
  return eventName.trim().split(" ").map((word, i) => i === 0 ? uncapitalize(word) : capitalize(word)).join("");
}
function toActionType(source, eventName) {
  return `[${source}] ${eventName}`;
}

// src/actions_subject.mjs
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as i0 from "@angular/core";
var INIT = "@ngrx/store/init";
var ActionsSubject = class _ActionsSubject extends BehaviorSubject {
  constructor() {
    super({ type: INIT });
  }
  next(action) {
    if (typeof action === "function") {
      throw new TypeError(`
        Dispatch expected an object, instead it received a function.
        If you're using the createAction function, make sure to invoke the function
        before dispatching the action. For example, someAction should be someAction().`);
    } else if (typeof action === "undefined") {
      throw new TypeError(`Actions must be objects`);
    } else if (typeof action.type === "undefined") {
      throw new TypeError(`Actions must have a type property`);
    }
    super.next(action);
  }
  complete() {
  }
  ngOnDestroy() {
    super.complete();
  }
  static {
    this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i0, type: _ActionsSubject, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
  }
  static {
    this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i0, type: _ActionsSubject });
  }
};
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i0, type: ActionsSubject, decorators: [{
  type: Injectable
}], ctorParameters: () => [] });
var ACTIONS_SUBJECT_PROVIDERS = [ActionsSubject];

// src/tokens.mjs
import { InjectionToken } from "@angular/core";
var _ROOT_STORE_GUARD = new InjectionToken("@ngrx/store Internal Root Guard");
var _INITIAL_STATE = new InjectionToken("@ngrx/store Internal Initial State");
var INITIAL_STATE = new InjectionToken("@ngrx/store Initial State");
var REDUCER_FACTORY = new InjectionToken("@ngrx/store Reducer Factory");
var _REDUCER_FACTORY = new InjectionToken("@ngrx/store Internal Reducer Factory Provider");
var INITIAL_REDUCERS = new InjectionToken("@ngrx/store Initial Reducers");
var _INITIAL_REDUCERS = new InjectionToken("@ngrx/store Internal Initial Reducers");
var STORE_FEATURES = new InjectionToken("@ngrx/store Store Features");
var _STORE_REDUCERS = new InjectionToken("@ngrx/store Internal Store Reducers");
var _FEATURE_REDUCERS = new InjectionToken("@ngrx/store Internal Feature Reducers");
var _FEATURE_CONFIGS = new InjectionToken("@ngrx/store Internal Feature Configs");
var _STORE_FEATURES = new InjectionToken("@ngrx/store Internal Store Features");
var _FEATURE_REDUCERS_TOKEN = new InjectionToken("@ngrx/store Internal Feature Reducers Token");
var FEATURE_REDUCERS = new InjectionToken("@ngrx/store Feature Reducers");
var USER_PROVIDED_META_REDUCERS = new InjectionToken("@ngrx/store User Provided Meta Reducers");
var META_REDUCERS = new InjectionToken("@ngrx/store Meta Reducers");
var _RESOLVED_META_REDUCERS = new InjectionToken("@ngrx/store Internal Resolved Meta Reducers");
var USER_RUNTIME_CHECKS = new InjectionToken("@ngrx/store User Runtime Checks Config");
var _USER_RUNTIME_CHECKS = new InjectionToken("@ngrx/store Internal User Runtime Checks Config");
var ACTIVE_RUNTIME_CHECKS = new InjectionToken("@ngrx/store Internal Runtime Checks");
var _ACTION_TYPE_UNIQUENESS_CHECK = new InjectionToken("@ngrx/store Check if Action types are unique");
var ROOT_STORE_PROVIDER = new InjectionToken("@ngrx/store Root Store Provider");
var FEATURE_STATE_PROVIDER = new InjectionToken("@ngrx/store Feature State Provider");

// src/utils.mjs
function combineReducers(reducers, initialState = {}) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  const finalReducerKeys = Object.keys(finalReducers);
  return function combination(state, action) {
    state = state === void 0 ? initialState : state;
    let hasChanged = false;
    const nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
function omit(object, keyToRemove) {
  return Object.keys(object).filter((key) => key !== keyToRemove).reduce((result, key) => Object.assign(result, { [key]: object[key] }), {});
}
function compose(...functions) {
  return function(arg) {
    if (functions.length === 0) {
      return arg;
    }
    const last = functions[functions.length - 1];
    const rest = functions.slice(0, -1);
    return rest.reduceRight((composed, fn) => fn(composed), last(arg));
  };
}
function createReducerFactory(reducerFactory, metaReducers) {
  if (Array.isArray(metaReducers) && metaReducers.length > 0) {
    reducerFactory = compose.apply(null, [
      ...metaReducers,
      reducerFactory
    ]);
  }
  return (reducers, initialState) => {
    const reducer = reducerFactory(reducers);
    return (state, action) => {
      state = state === void 0 ? initialState : state;
      return reducer(state, action);
    };
  };
}
function createFeatureReducerFactory(metaReducers) {
  const reducerFactory = Array.isArray(metaReducers) && metaReducers.length > 0 ? compose(...metaReducers) : (r) => r;
  return (reducer, initialState) => {
    reducer = reducerFactory(reducer);
    return (state, action) => {
      state = state === void 0 ? initialState : state;
      return reducer(state, action);
    };
  };
}

// src/reducer_manager.mjs
import { Inject, Injectable as Injectable2 } from "@angular/core";
import { BehaviorSubject as BehaviorSubject2, Observable } from "rxjs";
import * as i02 from "@angular/core";
var ReducerObservable = class extends Observable {
};
var ReducerManagerDispatcher = class extends ActionsSubject {
};
var UPDATE = "@ngrx/store/update-reducers";
var ReducerManager = class _ReducerManager extends BehaviorSubject2 {
  get currentReducers() {
    return this.reducers;
  }
  constructor(dispatcher, initialState, reducers, reducerFactory) {
    super(reducerFactory(reducers, initialState));
    this.dispatcher = dispatcher;
    this.initialState = initialState;
    this.reducers = reducers;
    this.reducerFactory = reducerFactory;
  }
  addFeature(feature) {
    this.addFeatures([feature]);
  }
  addFeatures(features) {
    const reducers = features.reduce((reducerDict, { reducers: reducers2, reducerFactory, metaReducers, initialState, key }) => {
      const reducer = typeof reducers2 === "function" ? createFeatureReducerFactory(metaReducers)(reducers2, initialState) : createReducerFactory(reducerFactory, metaReducers)(reducers2, initialState);
      reducerDict[key] = reducer;
      return reducerDict;
    }, {});
    this.addReducers(reducers);
  }
  removeFeature(feature) {
    this.removeFeatures([feature]);
  }
  removeFeatures(features) {
    this.removeReducers(features.map((p) => p.key));
  }
  addReducer(key, reducer) {
    this.addReducers({ [key]: reducer });
  }
  addReducers(reducers) {
    this.reducers = { ...this.reducers, ...reducers };
    this.updateReducers(Object.keys(reducers));
  }
  removeReducer(featureKey) {
    this.removeReducers([featureKey]);
  }
  removeReducers(featureKeys) {
    featureKeys.forEach((key) => {
      this.reducers = omit(this.reducers, key);
    });
    this.updateReducers(featureKeys);
  }
  updateReducers(featureKeys) {
    this.next(this.reducerFactory(this.reducers, this.initialState));
    this.dispatcher.next({
      type: UPDATE,
      features: featureKeys
    });
  }
  ngOnDestroy() {
    this.complete();
  }
  static {
    this.ɵfac = i02.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i02, type: _ReducerManager, deps: [{ token: ReducerManagerDispatcher }, { token: INITIAL_STATE }, { token: INITIAL_REDUCERS }, { token: REDUCER_FACTORY }], target: i02.ɵɵFactoryTarget.Injectable });
  }
  static {
    this.ɵprov = i02.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i02, type: _ReducerManager });
  }
};
i02.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i02, type: ReducerManager, decorators: [{
  type: Injectable2
}], ctorParameters: () => [{ type: ReducerManagerDispatcher }, { type: void 0, decorators: [{
  type: Inject,
  args: [INITIAL_STATE]
}] }, { type: void 0, decorators: [{
  type: Inject,
  args: [INITIAL_REDUCERS]
}] }, { type: void 0, decorators: [{
  type: Inject,
  args: [REDUCER_FACTORY]
}] }] });
var REDUCER_MANAGER_PROVIDERS = [
  ReducerManager,
  { provide: ReducerObservable, useExisting: ReducerManager },
  { provide: ReducerManagerDispatcher, useExisting: ActionsSubject }
];

// src/scanned_actions_subject.mjs
import { Injectable as Injectable3 } from "@angular/core";
import { Subject } from "rxjs";
import * as i03 from "@angular/core";
var ScannedActionsSubject = class _ScannedActionsSubject extends Subject {
  ngOnDestroy() {
    this.complete();
  }
  static {
    this.ɵfac = i03.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i03, type: _ScannedActionsSubject, deps: null, target: i03.ɵɵFactoryTarget.Injectable });
  }
  static {
    this.ɵprov = i03.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i03, type: _ScannedActionsSubject });
  }
};
i03.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i03, type: ScannedActionsSubject, decorators: [{
  type: Injectable3
}] });
var SCANNED_ACTIONS_SUBJECT_PROVIDERS = [
  ScannedActionsSubject
];

// src/state.mjs
import { Inject as Inject2, Injectable as Injectable4 } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { BehaviorSubject as BehaviorSubject3, Observable as Observable2, queueScheduler } from "rxjs";
import { observeOn, scan, withLatestFrom } from "rxjs/operators";
import * as i04 from "@angular/core";
var StateObservable = class extends Observable2 {
};
var State = class _State extends BehaviorSubject3 {
  static {
    this.INIT = INIT;
  }
  constructor(actions$, reducer$, scannedActions, initialState) {
    super(initialState);
    const actionsOnQueue$ = actions$.pipe(observeOn(queueScheduler));
    const withLatestReducer$ = actionsOnQueue$.pipe(withLatestFrom(reducer$));
    const seed = { state: initialState };
    const stateAndAction$ = withLatestReducer$.pipe(scan(reduceState, seed));
    this.stateSubscription = stateAndAction$.subscribe(({ state, action }) => {
      this.next(state);
      scannedActions.next(action);
    });
    this.state = toSignal(this, { manualCleanup: true, requireSync: true });
  }
  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
    this.complete();
  }
  static {
    this.ɵfac = i04.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i04, type: _State, deps: [{ token: ActionsSubject }, { token: ReducerObservable }, { token: ScannedActionsSubject }, { token: INITIAL_STATE }], target: i04.ɵɵFactoryTarget.Injectable });
  }
  static {
    this.ɵprov = i04.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i04, type: _State });
  }
};
i04.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i04, type: State, decorators: [{
  type: Injectable4
}], ctorParameters: () => [{ type: ActionsSubject }, { type: ReducerObservable }, { type: ScannedActionsSubject }, { type: void 0, decorators: [{
  type: Inject2,
  args: [INITIAL_STATE]
}] }] });
function reduceState(stateActionPair = { state: void 0 }, [action, reducer]) {
  const { state } = stateActionPair;
  return { state: reducer(state, action), action };
}
var STATE_PROVIDERS = [
  State,
  { provide: StateObservable, useExisting: State }
];

// src/store.mjs
import { computed, Injectable as Injectable5 } from "@angular/core";
import { Observable as Observable3 } from "rxjs";
import { distinctUntilChanged, map, pluck } from "rxjs/operators";
import * as i05 from "@angular/core";
var Store = class _Store extends Observable3 {
  constructor(state$, actionsObserver, reducerManager) {
    super();
    this.actionsObserver = actionsObserver;
    this.reducerManager = reducerManager;
    this.source = state$;
    this.state = state$.state;
  }
  select(pathOrMapFn, ...paths) {
    return select.call(null, pathOrMapFn, ...paths)(this);
  }
  /**
   * Returns a signal of the provided selector.
   *
   * @param selector selector function
   * @param options select signal options
   */
  selectSignal(selector, options) {
    return computed(() => selector(this.state()), options);
  }
  lift(operator) {
    const store = new _Store(this, this.actionsObserver, this.reducerManager);
    store.operator = operator;
    return store;
  }
  dispatch(action) {
    this.actionsObserver.next(action);
  }
  next(action) {
    this.actionsObserver.next(action);
  }
  error(err) {
    this.actionsObserver.error(err);
  }
  complete() {
    this.actionsObserver.complete();
  }
  addReducer(key, reducer) {
    this.reducerManager.addReducer(key, reducer);
  }
  removeReducer(key) {
    this.reducerManager.removeReducer(key);
  }
  static {
    this.ɵfac = i05.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i05, type: _Store, deps: [{ token: StateObservable }, { token: ActionsSubject }, { token: ReducerManager }], target: i05.ɵɵFactoryTarget.Injectable });
  }
  static {
    this.ɵprov = i05.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i05, type: _Store });
  }
};
i05.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i05, type: Store, decorators: [{
  type: Injectable5
}], ctorParameters: () => [{ type: StateObservable }, { type: ActionsSubject }, { type: ReducerManager }] });
var STORE_PROVIDERS = [Store];
function select(pathOrMapFn, propsOrPath, ...paths) {
  return function selectOperator(source$) {
    let mapped$;
    if (typeof pathOrMapFn === "string") {
      const pathSlices = [propsOrPath, ...paths].filter(Boolean);
      mapped$ = source$.pipe(pluck(pathOrMapFn, ...pathSlices));
    } else if (typeof pathOrMapFn === "function") {
      mapped$ = source$.pipe(map((source) => pathOrMapFn(source, propsOrPath)));
    } else {
      throw new TypeError(`Unexpected type '${typeof pathOrMapFn}' in select operator, expected 'string' or 'function'`);
    }
    return mapped$.pipe(distinctUntilChanged());
  };
}

// src/meta-reducers/utils.mjs
var RUNTIME_CHECK_URL = "https://ngrx.io/guide/store/configuration/runtime-checks";
function isUndefined(target) {
  return target === void 0;
}
function isNull(target) {
  return target === null;
}
function isArray(target) {
  return Array.isArray(target);
}
function isString(target) {
  return typeof target === "string";
}
function isBoolean(target) {
  return typeof target === "boolean";
}
function isNumber(target) {
  return typeof target === "number";
}
function isObjectLike(target) {
  return typeof target === "object" && target !== null;
}
function isObject(target) {
  return isObjectLike(target) && !isArray(target);
}
function isPlainObject(target) {
  if (!isObject(target)) {
    return false;
  }
  const targetPrototype = Object.getPrototypeOf(target);
  return targetPrototype === Object.prototype || targetPrototype === null;
}
function isFunction(target) {
  return typeof target === "function";
}
function isComponent(target) {
  return isFunction(target) && target.hasOwnProperty("ɵcmp");
}
function hasOwnProperty(target, propertyName) {
  return Object.prototype.hasOwnProperty.call(target, propertyName);
}

// src/flags.mjs
var _ngrxMockEnvironment = false;
function setNgrxMockEnvironment(value) {
  _ngrxMockEnvironment = value;
}
function isNgrxMockEnvironment() {
  return _ngrxMockEnvironment;
}

// src/selector.mjs
import { isDevMode } from "@angular/core";
function isEqualCheck(a, b) {
  return a === b;
}
function isArgumentsChanged(args, lastArguments, comparator) {
  for (let i = 0; i < args.length; i++) {
    if (!comparator(args[i], lastArguments[i])) {
      return true;
    }
  }
  return false;
}
function resultMemoize(projectionFn, isResultEqual) {
  return defaultMemoize(projectionFn, isEqualCheck, isResultEqual);
}
function defaultMemoize(projectionFn, isArgumentsEqual = isEqualCheck, isResultEqual = isEqualCheck) {
  let lastArguments = null;
  let lastResult = null;
  let overrideResult;
  function reset() {
    lastArguments = null;
    lastResult = null;
  }
  function setResult(result = void 0) {
    overrideResult = { result };
  }
  function clearResult() {
    overrideResult = void 0;
  }
  function memoized() {
    if (overrideResult !== void 0) {
      return overrideResult.result;
    }
    if (!lastArguments) {
      lastResult = projectionFn.apply(null, arguments);
      lastArguments = arguments;
      return lastResult;
    }
    if (!isArgumentsChanged(arguments, lastArguments, isArgumentsEqual)) {
      return lastResult;
    }
    const newResult = projectionFn.apply(null, arguments);
    lastArguments = arguments;
    if (isResultEqual(lastResult, newResult)) {
      return lastResult;
    }
    lastResult = newResult;
    return newResult;
  }
  return { memoized, reset, setResult, clearResult };
}
function createSelector(...input) {
  return createSelectorFactory(defaultMemoize)(...input);
}
function defaultStateFn(state, selectors, props2, memoizedProjector) {
  if (props2 === void 0) {
    const args2 = selectors.map((fn) => fn(state));
    return memoizedProjector.memoized.apply(null, args2);
  }
  const args = selectors.map((fn) => fn(state, props2));
  return memoizedProjector.memoized.apply(null, [...args, props2]);
}
function createSelectorFactory(memoize, options = {
  stateFn: defaultStateFn
}) {
  return function(...input) {
    let args = input;
    if (Array.isArray(args[0])) {
      const [head, ...tail] = args;
      args = [...head, ...tail];
    } else if (args.length === 1 && isSelectorsDictionary(args[0])) {
      args = extractArgsFromSelectorsDictionary(args[0]);
    }
    const selectors = args.slice(0, args.length - 1);
    const projector = args[args.length - 1];
    const memoizedSelectors = selectors.filter((selector) => selector.release && typeof selector.release === "function");
    const memoizedProjector = memoize(function(...selectors2) {
      return projector.apply(null, selectors2);
    });
    const memoizedState = defaultMemoize(function(state, props2) {
      return options.stateFn.apply(null, [
        state,
        selectors,
        props2,
        memoizedProjector
      ]);
    });
    function release() {
      memoizedState.reset();
      memoizedProjector.reset();
      memoizedSelectors.forEach((selector) => selector.release());
    }
    return Object.assign(memoizedState.memoized, {
      release,
      projector: memoizedProjector.memoized,
      setResult: memoizedState.setResult,
      clearResult: memoizedState.clearResult
    });
  };
}
function createFeatureSelector(featureName) {
  return createSelector((state) => {
    const featureState = state[featureName];
    if (!isNgrxMockEnvironment() && isDevMode() && !(featureName in state)) {
      console.warn(`@ngrx/store: The feature name "${featureName}" does not exist in the state, therefore createFeatureSelector cannot access it.  Be sure it is imported in a loaded module using StoreModule.forRoot('${featureName}', ...) or StoreModule.forFeature('${featureName}', ...).  If the default state is intended to be undefined, as is the case with router state, this development-only warning message can be ignored.`);
    }
    return featureState;
  }, (featureState) => featureState);
}
function isSelectorsDictionary(selectors) {
  return !!selectors && typeof selectors === "object" && Object.values(selectors).every((selector) => typeof selector === "function");
}
function extractArgsFromSelectorsDictionary(selectorsDictionary) {
  const selectors = Object.values(selectorsDictionary);
  const resultKeys = Object.keys(selectorsDictionary);
  const projector = (...selectorResults) => resultKeys.reduce((result, key, index) => ({
    ...result,
    [key]: selectorResults[index]
  }), {});
  return [...selectors, projector];
}

// src/feature_creator.mjs
function createFeature(featureConfig) {
  const { name, reducer, extraSelectors: extraSelectorsFactory } = featureConfig;
  const featureSelector = createFeatureSelector(name);
  const nestedSelectors = createNestedSelectors(featureSelector, reducer);
  const baseSelectors = {
    [`select${capitalize(name)}State`]: featureSelector,
    ...nestedSelectors
  };
  const extraSelectors = extraSelectorsFactory ? extraSelectorsFactory(baseSelectors) : {};
  return {
    name,
    reducer,
    ...baseSelectors,
    ...extraSelectors
  };
}
function createNestedSelectors(featureSelector, reducer) {
  const initialState = getInitialState(reducer);
  const nestedKeys = isPlainObject(initialState) ? Object.keys(initialState) : [];
  return nestedKeys.reduce((nestedSelectors, nestedKey) => ({
    ...nestedSelectors,
    [`select${capitalize(nestedKey)}`]: createSelector(featureSelector, (parentState) => parentState?.[nestedKey])
  }), {});
}
function getInitialState(reducer) {
  return reducer(void 0, { type: "@ngrx/feature/init" });
}

// src/store_config.mjs
import { inject, InjectionToken as InjectionToken2 } from "@angular/core";
function _createStoreReducers(reducers) {
  return reducers instanceof InjectionToken2 ? inject(reducers) : reducers;
}
function _createFeatureStore(configs, featureStores) {
  return featureStores.map((feat, index) => {
    if (configs[index] instanceof InjectionToken2) {
      const conf = inject(configs[index]);
      return {
        key: feat.key,
        reducerFactory: conf.reducerFactory ? conf.reducerFactory : combineReducers,
        metaReducers: conf.metaReducers ? conf.metaReducers : [],
        initialState: conf.initialState
      };
    }
    return feat;
  });
}
function _createFeatureReducers(reducerCollection) {
  return reducerCollection.map((reducer) => {
    return reducer instanceof InjectionToken2 ? inject(reducer) : reducer;
  });
}
function _initialStateFactory(initialState) {
  if (typeof initialState === "function") {
    return initialState();
  }
  return initialState;
}
function _concatMetaReducers(metaReducers, userProvidedMetaReducers) {
  return metaReducers.concat(userProvidedMetaReducers);
}
function _provideForRootGuard() {
  const store = inject(Store, { optional: true, skipSelf: true });
  if (store) {
    throw new TypeError(`The root Store has been provided more than once. Feature modules should provide feature states instead.`);
  }
  return "guarded";
}

// src/meta-reducers/immutability_reducer.mjs
function immutabilityCheckMetaReducer(reducer, checks) {
  return function(state, action) {
    const act = checks.action(action) ? freeze(action) : action;
    const nextState = reducer(state, act);
    return checks.state() ? freeze(nextState) : nextState;
  };
}
function freeze(target) {
  Object.freeze(target);
  const targetIsFunction = isFunction(target);
  Object.getOwnPropertyNames(target).forEach((prop) => {
    if (prop.startsWith("ɵ")) {
      return;
    }
    if (hasOwnProperty(target, prop) && (targetIsFunction ? prop !== "caller" && prop !== "callee" && prop !== "arguments" : true)) {
      const propValue = target[prop];
      if ((isObjectLike(propValue) || isFunction(propValue)) && !Object.isFrozen(propValue)) {
        freeze(propValue);
      }
    }
  });
  return target;
}

// src/meta-reducers/serialization_reducer.mjs
function serializationCheckMetaReducer(reducer, checks) {
  return function(state, action) {
    if (checks.action(action)) {
      const unserializableAction = getUnserializable(action);
      throwIfUnserializable(unserializableAction, "action");
    }
    const nextState = reducer(state, action);
    if (checks.state()) {
      const unserializableState = getUnserializable(nextState);
      throwIfUnserializable(unserializableState, "state");
    }
    return nextState;
  };
}
function getUnserializable(target, path = []) {
  if ((isUndefined(target) || isNull(target)) && path.length === 0) {
    return {
      path: ["root"],
      value: target
    };
  }
  const keys = Object.keys(target);
  return keys.reduce((result, key) => {
    if (result) {
      return result;
    }
    const value = target[key];
    if (isComponent(value)) {
      return result;
    }
    if (isUndefined(value) || isNull(value) || isNumber(value) || isBoolean(value) || isString(value) || isArray(value)) {
      return false;
    }
    if (isPlainObject(value)) {
      return getUnserializable(value, [...path, key]);
    }
    return {
      path: [...path, key],
      value
    };
  }, false);
}
function throwIfUnserializable(unserializable, context) {
  if (unserializable === false) {
    return;
  }
  const unserializablePath = unserializable.path.join(".");
  const error = new Error(`Detected unserializable ${context} at "${unserializablePath}". ${RUNTIME_CHECK_URL}#strict${context}serializability`);
  error.value = unserializable.value;
  error.unserializablePath = unserializablePath;
  throw error;
}

// src/meta-reducers/inNgZoneAssert_reducer.mjs
import * as ngCore from "@angular/core";
function inNgZoneAssertMetaReducer(reducer, checks) {
  return function(state, action) {
    if (checks.action(action) && !ngCore.NgZone.isInAngularZone()) {
      throw new Error(`Action '${action.type}' running outside NgZone. ${RUNTIME_CHECK_URL}#strictactionwithinngzone`);
    }
    return reducer(state, action);
  };
}

// src/runtime_checks.mjs
import { isDevMode as isDevMode2 } from "@angular/core";
function createActiveRuntimeChecks(runtimeChecks) {
  if (isDevMode2()) {
    return {
      strictStateSerializability: false,
      strictActionSerializability: false,
      strictStateImmutability: true,
      strictActionImmutability: true,
      strictActionWithinNgZone: false,
      strictActionTypeUniqueness: false,
      ...runtimeChecks
    };
  }
  return {
    strictStateSerializability: false,
    strictActionSerializability: false,
    strictStateImmutability: false,
    strictActionImmutability: false,
    strictActionWithinNgZone: false,
    strictActionTypeUniqueness: false
  };
}
function createSerializationCheckMetaReducer({ strictActionSerializability, strictStateSerializability }) {
  return (reducer) => strictActionSerializability || strictStateSerializability ? serializationCheckMetaReducer(reducer, {
    action: (action) => strictActionSerializability && !ignoreNgrxAction(action),
    state: () => strictStateSerializability
  }) : reducer;
}
function createImmutabilityCheckMetaReducer({ strictActionImmutability, strictStateImmutability }) {
  return (reducer) => strictActionImmutability || strictStateImmutability ? immutabilityCheckMetaReducer(reducer, {
    action: (action) => strictActionImmutability && !ignoreNgrxAction(action),
    state: () => strictStateImmutability
  }) : reducer;
}
function ignoreNgrxAction(action) {
  return action.type.startsWith("@ngrx");
}
function createInNgZoneCheckMetaReducer({ strictActionWithinNgZone }) {
  return (reducer) => strictActionWithinNgZone ? inNgZoneAssertMetaReducer(reducer, {
    action: (action) => strictActionWithinNgZone && !ignoreNgrxAction(action)
  }) : reducer;
}
function provideRuntimeChecks(runtimeChecks) {
  return [
    {
      provide: _USER_RUNTIME_CHECKS,
      useValue: runtimeChecks
    },
    {
      provide: USER_RUNTIME_CHECKS,
      useFactory: _runtimeChecksFactory,
      deps: [_USER_RUNTIME_CHECKS]
    },
    {
      provide: ACTIVE_RUNTIME_CHECKS,
      deps: [USER_RUNTIME_CHECKS],
      useFactory: createActiveRuntimeChecks
    },
    {
      provide: META_REDUCERS,
      multi: true,
      deps: [ACTIVE_RUNTIME_CHECKS],
      useFactory: createImmutabilityCheckMetaReducer
    },
    {
      provide: META_REDUCERS,
      multi: true,
      deps: [ACTIVE_RUNTIME_CHECKS],
      useFactory: createSerializationCheckMetaReducer
    },
    {
      provide: META_REDUCERS,
      multi: true,
      deps: [ACTIVE_RUNTIME_CHECKS],
      useFactory: createInNgZoneCheckMetaReducer
    }
  ];
}
function checkForActionTypeUniqueness() {
  return [
    {
      provide: _ACTION_TYPE_UNIQUENESS_CHECK,
      multi: true,
      deps: [ACTIVE_RUNTIME_CHECKS],
      useFactory: _actionTypeUniquenessCheck
    }
  ];
}
function _runtimeChecksFactory(runtimeChecks) {
  return runtimeChecks;
}
function _actionTypeUniquenessCheck(config) {
  if (!config.strictActionTypeUniqueness) {
    return;
  }
  const duplicates = Object.entries(REGISTERED_ACTION_TYPES).filter(([, registrations]) => registrations > 1).map(([type]) => type);
  if (duplicates.length) {
    throw new Error(`Action types are registered more than once, ${duplicates.map((type) => `"${type}"`).join(", ")}. ${RUNTIME_CHECK_URL}#strictactiontypeuniqueness`);
  }
}

// src/provide_store.mjs
import { ENVIRONMENT_INITIALIZER, Inject as Inject3, inject as inject2, InjectionToken as InjectionToken3, makeEnvironmentProviders } from "@angular/core";
function provideState(featureNameOrSlice, reducers, config = {}) {
  return makeEnvironmentProviders([
    ..._provideState(featureNameOrSlice, reducers, config),
    ENVIRONMENT_STATE_PROVIDER
  ]);
}
function _provideStore(reducers = {}, config = {}) {
  return [
    {
      provide: _ROOT_STORE_GUARD,
      useFactory: _provideForRootGuard
    },
    { provide: _INITIAL_STATE, useValue: config.initialState },
    {
      provide: INITIAL_STATE,
      useFactory: _initialStateFactory,
      deps: [_INITIAL_STATE]
    },
    { provide: _INITIAL_REDUCERS, useValue: reducers },
    {
      provide: _STORE_REDUCERS,
      useExisting: reducers instanceof InjectionToken3 ? reducers : _INITIAL_REDUCERS
    },
    {
      provide: INITIAL_REDUCERS,
      deps: [_INITIAL_REDUCERS, [new Inject3(_STORE_REDUCERS)]],
      useFactory: _createStoreReducers
    },
    {
      provide: USER_PROVIDED_META_REDUCERS,
      useValue: config.metaReducers ? config.metaReducers : []
    },
    {
      provide: _RESOLVED_META_REDUCERS,
      deps: [META_REDUCERS, USER_PROVIDED_META_REDUCERS],
      useFactory: _concatMetaReducers
    },
    {
      provide: _REDUCER_FACTORY,
      useValue: config.reducerFactory ? config.reducerFactory : combineReducers
    },
    {
      provide: REDUCER_FACTORY,
      deps: [_REDUCER_FACTORY, _RESOLVED_META_REDUCERS],
      useFactory: createReducerFactory
    },
    ACTIONS_SUBJECT_PROVIDERS,
    REDUCER_MANAGER_PROVIDERS,
    SCANNED_ACTIONS_SUBJECT_PROVIDERS,
    STATE_PROVIDERS,
    STORE_PROVIDERS,
    provideRuntimeChecks(config.runtimeChecks),
    checkForActionTypeUniqueness()
  ];
}
function rootStoreProviderFactory() {
  inject2(ActionsSubject);
  inject2(ReducerObservable);
  inject2(ScannedActionsSubject);
  inject2(Store);
  inject2(_ROOT_STORE_GUARD, { optional: true });
  inject2(_ACTION_TYPE_UNIQUENESS_CHECK, { optional: true });
}
var ENVIRONMENT_STORE_PROVIDER = [
  { provide: ROOT_STORE_PROVIDER, useFactory: rootStoreProviderFactory },
  {
    provide: ENVIRONMENT_INITIALIZER,
    multi: true,
    useFactory() {
      return () => inject2(ROOT_STORE_PROVIDER);
    }
  }
];
function provideStore(reducers, config) {
  return makeEnvironmentProviders([
    ..._provideStore(reducers, config),
    ENVIRONMENT_STORE_PROVIDER
  ]);
}
function featureStateProviderFactory() {
  inject2(ROOT_STORE_PROVIDER);
  const features = inject2(_STORE_FEATURES);
  const featureReducers = inject2(FEATURE_REDUCERS);
  const reducerManager = inject2(ReducerManager);
  inject2(_ACTION_TYPE_UNIQUENESS_CHECK, { optional: true });
  const feats = features.map((feature, index) => {
    const featureReducerCollection = featureReducers.shift();
    const reducers = featureReducerCollection[index];
    return {
      ...feature,
      reducers,
      initialState: _initialStateFactory(feature.initialState)
    };
  });
  reducerManager.addFeatures(feats);
}
var ENVIRONMENT_STATE_PROVIDER = [
  {
    provide: FEATURE_STATE_PROVIDER,
    useFactory: featureStateProviderFactory
  },
  {
    provide: ENVIRONMENT_INITIALIZER,
    multi: true,
    useFactory() {
      return () => inject2(FEATURE_STATE_PROVIDER);
    }
  }
];
function _provideState(featureNameOrSlice, reducers, config = {}) {
  return [
    {
      provide: _FEATURE_CONFIGS,
      multi: true,
      useValue: featureNameOrSlice instanceof Object ? {} : config
    },
    {
      provide: STORE_FEATURES,
      multi: true,
      useValue: {
        key: featureNameOrSlice instanceof Object ? featureNameOrSlice.name : featureNameOrSlice,
        reducerFactory: !(config instanceof InjectionToken3) && config.reducerFactory ? config.reducerFactory : combineReducers,
        metaReducers: !(config instanceof InjectionToken3) && config.metaReducers ? config.metaReducers : [],
        initialState: !(config instanceof InjectionToken3) && config.initialState ? config.initialState : void 0
      }
    },
    {
      provide: _STORE_FEATURES,
      deps: [_FEATURE_CONFIGS, STORE_FEATURES],
      useFactory: _createFeatureStore
    },
    {
      provide: _FEATURE_REDUCERS,
      multi: true,
      useValue: featureNameOrSlice instanceof Object ? featureNameOrSlice.reducer : reducers
    },
    {
      provide: _FEATURE_REDUCERS_TOKEN,
      multi: true,
      useExisting: reducers instanceof InjectionToken3 ? reducers : _FEATURE_REDUCERS
    },
    {
      provide: FEATURE_REDUCERS,
      multi: true,
      deps: [_FEATURE_REDUCERS, [new Inject3(_FEATURE_REDUCERS_TOKEN)]],
      useFactory: _createFeatureReducers
    },
    checkForActionTypeUniqueness()
  ];
}

// src/store_module.mjs
import { Inject as Inject4, NgModule, Optional } from "@angular/core";
import * as i06 from "@angular/core";
var StoreRootModule = class _StoreRootModule {
  constructor(actions$, reducer$, scannedActions$, store, guard, actionCheck) {
  }
  static {
    this.ɵfac = i06.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i06, type: _StoreRootModule, deps: [{ token: ActionsSubject }, { token: ReducerObservable }, { token: ScannedActionsSubject }, { token: Store }, { token: _ROOT_STORE_GUARD, optional: true }, { token: _ACTION_TYPE_UNIQUENESS_CHECK, optional: true }], target: i06.ɵɵFactoryTarget.NgModule });
  }
  static {
    this.ɵmod = i06.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.0-next.6", ngImport: i06, type: _StoreRootModule });
  }
  static {
    this.ɵinj = i06.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i06, type: _StoreRootModule });
  }
};
i06.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i06, type: StoreRootModule, decorators: [{
  type: NgModule,
  args: [{}]
}], ctorParameters: () => [{ type: ActionsSubject }, { type: ReducerObservable }, { type: ScannedActionsSubject }, { type: Store }, { type: void 0, decorators: [{
  type: Optional
}, {
  type: Inject4,
  args: [_ROOT_STORE_GUARD]
}] }, { type: void 0, decorators: [{
  type: Optional
}, {
  type: Inject4,
  args: [_ACTION_TYPE_UNIQUENESS_CHECK]
}] }] });
var StoreFeatureModule = class _StoreFeatureModule {
  constructor(features, featureReducers, reducerManager, root, actionCheck) {
    this.features = features;
    this.featureReducers = featureReducers;
    this.reducerManager = reducerManager;
    const feats = features.map((feature, index) => {
      const featureReducerCollection = featureReducers.shift();
      const reducers = featureReducerCollection[index];
      return {
        ...feature,
        reducers,
        initialState: _initialStateFactory(feature.initialState)
      };
    });
    reducerManager.addFeatures(feats);
  }
  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnDestroy() {
    this.reducerManager.removeFeatures(this.features);
  }
  static {
    this.ɵfac = i06.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i06, type: _StoreFeatureModule, deps: [{ token: _STORE_FEATURES }, { token: FEATURE_REDUCERS }, { token: ReducerManager }, { token: StoreRootModule }, { token: _ACTION_TYPE_UNIQUENESS_CHECK, optional: true }], target: i06.ɵɵFactoryTarget.NgModule });
  }
  static {
    this.ɵmod = i06.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.0-next.6", ngImport: i06, type: _StoreFeatureModule });
  }
  static {
    this.ɵinj = i06.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i06, type: _StoreFeatureModule });
  }
};
i06.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i06, type: StoreFeatureModule, decorators: [{
  type: NgModule,
  args: [{}]
}], ctorParameters: () => [{ type: void 0, decorators: [{
  type: Inject4,
  args: [_STORE_FEATURES]
}] }, { type: void 0, decorators: [{
  type: Inject4,
  args: [FEATURE_REDUCERS]
}] }, { type: ReducerManager }, { type: StoreRootModule }, { type: void 0, decorators: [{
  type: Optional
}, {
  type: Inject4,
  args: [_ACTION_TYPE_UNIQUENESS_CHECK]
}] }] });
var StoreModule = class _StoreModule {
  static forRoot(reducers, config) {
    return {
      ngModule: StoreRootModule,
      providers: [..._provideStore(reducers, config)]
    };
  }
  static forFeature(featureNameOrSlice, reducers, config = {}) {
    return {
      ngModule: StoreFeatureModule,
      providers: [..._provideState(featureNameOrSlice, reducers, config)]
    };
  }
  static {
    this.ɵfac = i06.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i06, type: _StoreModule, deps: [], target: i06.ɵɵFactoryTarget.NgModule });
  }
  static {
    this.ɵmod = i06.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.0-next.6", ngImport: i06, type: _StoreModule });
  }
  static {
    this.ɵinj = i06.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i06, type: _StoreModule });
  }
};
i06.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i06, type: StoreModule, decorators: [{
  type: NgModule,
  args: [{}]
}] });

// src/reducer_creator.mjs
function on(...args) {
  const reducer = args.pop();
  const types = args.map((creator) => creator.type);
  return { reducer, types };
}
function createReducer(initialState, ...ons) {
  const map2 = /* @__PURE__ */ new Map();
  for (const on2 of ons) {
    for (const type of on2.types) {
      const existingReducer = map2.get(type);
      if (existingReducer) {
        const newReducer = (state, action) => on2.reducer(existingReducer(state, action), action);
        map2.set(type, newReducer);
      } else {
        map2.set(type, on2.reducer);
      }
    }
  }
  return function(state = initialState, action) {
    const reducer = map2.get(action.type);
    return reducer ? reducer(state, action) : state;
  };
}
export {
  ACTIVE_RUNTIME_CHECKS,
  ActionsSubject,
  FEATURE_REDUCERS,
  FEATURE_STATE_PROVIDER,
  INIT,
  INITIAL_REDUCERS,
  INITIAL_STATE,
  META_REDUCERS,
  REDUCER_FACTORY,
  ROOT_STORE_PROVIDER,
  ReducerManager,
  ReducerManagerDispatcher,
  ReducerObservable,
  STORE_FEATURES,
  ScannedActionsSubject,
  State,
  StateObservable,
  Store,
  StoreFeatureModule,
  StoreModule,
  StoreRootModule,
  UPDATE,
  USER_PROVIDED_META_REDUCERS,
  USER_RUNTIME_CHECKS,
  combineReducers,
  compose,
  createAction,
  createActionGroup,
  createFeature,
  createFeatureSelector,
  createReducer,
  createReducerFactory,
  createSelector,
  createSelectorFactory,
  defaultMemoize,
  defaultStateFn,
  emptyProps,
  isNgrxMockEnvironment,
  on,
  props,
  provideState,
  provideStore,
  reduceState,
  resultMemoize,
  select,
  setNgrxMockEnvironment,
  union
};
//# sourceMappingURL=ngrx-store.mjs.map
