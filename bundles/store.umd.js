/**
 * @license NgRx 8.6.0
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ngrx/store', ['exports', 'tslib', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.ngrx = global.ngrx || {}, global.ngrx.store = {}), global.tslib, global.ng.core, global.rxjs, global.rxjs.operators));
}(this, function (exports, tslib_1, core, rxjs, operators) { 'use strict';

    /**
     * @description
     * Creates a configured `Creator` function that, when called, returns an object in the shape of the `Action` interface.
     *
     * Action creators reduce the explicitness of class-based action creators.
     *
     * @param type Describes the action that will be dispatched
     * @param config Additional metadata needed for the handling of the action.  See {@link createAction#usage-notes Usage Notes}.
     *
     * @usageNotes
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
     */
    function createAction(type, config) {
        if (typeof config === 'function') {
            return defineType(type, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (tslib_1.__assign({}, config.apply(void 0, tslib_1.__spread(args)), { type: type }));
            });
        }
        var as = config ? config._as : 'empty';
        switch (as) {
            case 'empty':
                return defineType(type, function () { return ({ type: type }); });
            case 'props':
                return defineType(type, function (props) { return (tslib_1.__assign({}, props, { type: type })); });
            default:
                throw new Error('Unexpected config.');
        }
    }
    function props() {
        // the return type does not match TypePropertyIsNotAllowed, so double casting
        // is used.
        return { _as: 'props', _p: undefined };
    }
    function union(creators) {
        return undefined;
    }
    function defineType(type, creator) {
        return Object.defineProperty(creator, 'type', {
            value: type,
            writable: false,
        });
    }

    var INIT = '@ngrx/store/init';
    var ActionsSubject = /** @class */ (function (_super) {
        tslib_1.__extends(ActionsSubject, _super);
        function ActionsSubject() {
            return _super.call(this, { type: INIT }) || this;
        }
        ActionsSubject.prototype.next = function (action) {
            if (typeof action === 'function') {
                throw new TypeError("\n        Dispatch expected an object, instead it received a function.\n        If you're using the createAction function, make sure to invoke the function\n        before dispatching the action. For example, someAction should be someAction().");
            }
            else if (typeof action === 'undefined') {
                throw new TypeError("Actions must be objects");
            }
            else if (typeof action.type === 'undefined') {
                throw new TypeError("Actions must have a type property");
            }
            _super.prototype.next.call(this, action);
        };
        ActionsSubject.prototype.complete = function () {
            /* noop */
        };
        ActionsSubject.prototype.ngOnDestroy = function () {
            _super.prototype.complete.call(this);
        };
        ActionsSubject = tslib_1.__decorate([
            core.Injectable(),
            tslib_1.__metadata("design:paramtypes", [])
        ], ActionsSubject);
        return ActionsSubject;
    }(rxjs.BehaviorSubject));
    var ACTIONS_SUBJECT_PROVIDERS = [ActionsSubject];

    var _ROOT_STORE_GUARD = new core.InjectionToken('@ngrx/store Internal Root Guard');
    var _INITIAL_STATE = new core.InjectionToken('@ngrx/store Internal Initial State');
    var INITIAL_STATE = new core.InjectionToken('@ngrx/store Initial State');
    var REDUCER_FACTORY = new core.InjectionToken('@ngrx/store Reducer Factory');
    var _REDUCER_FACTORY = new core.InjectionToken('@ngrx/store Internal Reducer Factory Provider');
    var INITIAL_REDUCERS = new core.InjectionToken('@ngrx/store Initial Reducers');
    var _INITIAL_REDUCERS = new core.InjectionToken('@ngrx/store Internal Initial Reducers');
    var STORE_FEATURES = new core.InjectionToken('@ngrx/store Store Features');
    var _STORE_REDUCERS = new core.InjectionToken('@ngrx/store Internal Store Reducers');
    var _FEATURE_REDUCERS = new core.InjectionToken('@ngrx/store Internal Feature Reducers');
    var _FEATURE_CONFIGS = new core.InjectionToken('@ngrx/store Internal Feature Configs');
    var _STORE_FEATURES = new core.InjectionToken('@ngrx/store Internal Store Features');
    var _FEATURE_REDUCERS_TOKEN = new core.InjectionToken('@ngrx/store Internal Feature Reducers Token');
    var FEATURE_REDUCERS = new core.InjectionToken('@ngrx/store Feature Reducers');
    /**
     * User-defined meta reducers from StoreModule.forRoot()
     */
    var USER_PROVIDED_META_REDUCERS = new core.InjectionToken('@ngrx/store User Provided Meta Reducers');
    /**
     * Meta reducers defined either internally by @ngrx/store or by library authors
     */
    var META_REDUCERS = new core.InjectionToken('@ngrx/store Meta Reducers');
    /**
     * Concats the user provided meta reducers and the meta reducers provided on the multi
     * injection token
     */
    var _RESOLVED_META_REDUCERS = new core.InjectionToken('@ngrx/store Internal Resolved Meta Reducers');
    /**
     * Runtime checks defined by the user via an InjectionToken
     * Defaults to `_USER_RUNTIME_CHECKS`
     */
    var USER_RUNTIME_CHECKS = new core.InjectionToken('@ngrx/store User Runtime Checks Config');
    /**
     * Runtime checks defined by the user via forRoot()
     */
    var _USER_RUNTIME_CHECKS = new core.InjectionToken('@ngrx/store Internal User Runtime Checks Config');
    /**
     * Runtime checks currently in use
     */
    var _ACTIVE_RUNTIME_CHECKS = new core.InjectionToken('@ngrx/store Internal Runtime Checks');

    function combineReducers(reducers, initialState) {
        if (initialState === void 0) { initialState = {}; }
        var reducerKeys = Object.keys(reducers);
        var finalReducers = {};
        for (var i = 0; i < reducerKeys.length; i++) {
            var key = reducerKeys[i];
            if (typeof reducers[key] === 'function') {
                finalReducers[key] = reducers[key];
            }
        }
        var finalReducerKeys = Object.keys(finalReducers);
        return function combination(state, action) {
            state = state === undefined ? initialState : state;
            var hasChanged = false;
            var nextState = {};
            for (var i = 0; i < finalReducerKeys.length; i++) {
                var key = finalReducerKeys[i];
                var reducer = finalReducers[key];
                var previousStateForKey = state[key];
                var nextStateForKey = reducer(previousStateForKey, action);
                nextState[key] = nextStateForKey;
                hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
            }
            return hasChanged ? nextState : state;
        };
    }
    function omit(object, keyToRemove) {
        return Object.keys(object)
            .filter(function (key) { return key !== keyToRemove; })
            .reduce(function (result, key) {
            var _a;
            return Object.assign(result, (_a = {}, _a[key] = object[key], _a));
        }, {});
    }
    function compose() {
        var functions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            functions[_i] = arguments[_i];
        }
        return function (arg) {
            if (functions.length === 0) {
                return arg;
            }
            var last = functions[functions.length - 1];
            var rest = functions.slice(0, -1);
            return rest.reduceRight(function (composed, fn) { return fn(composed); }, last(arg));
        };
    }
    function createReducerFactory(reducerFactory, metaReducers) {
        if (Array.isArray(metaReducers) && metaReducers.length > 0) {
            reducerFactory = compose.apply(null, tslib_1.__spread(metaReducers, [
                reducerFactory,
            ]));
        }
        return function (reducers, initialState) {
            var reducer = reducerFactory(reducers);
            return function (state, action) {
                state = state === undefined ? initialState : state;
                return reducer(state, action);
            };
        };
    }
    function createFeatureReducerFactory(metaReducers) {
        var reducerFactory = Array.isArray(metaReducers) && metaReducers.length > 0
            ? compose.apply(void 0, tslib_1.__spread(metaReducers)) : function (r) { return r; };
        return function (reducer, initialState) {
            reducer = reducerFactory(reducer);
            return function (state, action) {
                state = state === undefined ? initialState : state;
                return reducer(state, action);
            };
        };
    }

    var ReducerObservable = /** @class */ (function (_super) {
        tslib_1.__extends(ReducerObservable, _super);
        function ReducerObservable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ReducerObservable;
    }(rxjs.Observable));
    var ReducerManagerDispatcher = /** @class */ (function (_super) {
        tslib_1.__extends(ReducerManagerDispatcher, _super);
        function ReducerManagerDispatcher() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ReducerManagerDispatcher;
    }(ActionsSubject));
    var UPDATE = '@ngrx/store/update-reducers';
    var ReducerManager = /** @class */ (function (_super) {
        tslib_1.__extends(ReducerManager, _super);
        function ReducerManager(dispatcher, initialState, reducers, reducerFactory) {
            var _this = _super.call(this, reducerFactory(reducers, initialState)) || this;
            _this.dispatcher = dispatcher;
            _this.initialState = initialState;
            _this.reducers = reducers;
            _this.reducerFactory = reducerFactory;
            return _this;
        }
        ReducerManager.prototype.addFeature = function (feature) {
            this.addFeatures([feature]);
        };
        ReducerManager.prototype.addFeatures = function (features) {
            var reducers = features.reduce(function (reducerDict, _a) {
                var reducers = _a.reducers, reducerFactory = _a.reducerFactory, metaReducers = _a.metaReducers, initialState = _a.initialState, key = _a.key;
                var reducer = typeof reducers === 'function'
                    ? createFeatureReducerFactory(metaReducers)(reducers, initialState)
                    : createReducerFactory(reducerFactory, metaReducers)(reducers, initialState);
                reducerDict[key] = reducer;
                return reducerDict;
            }, {});
            this.addReducers(reducers);
        };
        ReducerManager.prototype.removeFeature = function (feature) {
            this.removeFeatures([feature]);
        };
        ReducerManager.prototype.removeFeatures = function (features) {
            this.removeReducers(features.map(function (p) { return p.key; }));
        };
        ReducerManager.prototype.addReducer = function (key, reducer) {
            var _a;
            this.addReducers((_a = {}, _a[key] = reducer, _a));
        };
        ReducerManager.prototype.addReducers = function (reducers) {
            this.reducers = tslib_1.__assign({}, this.reducers, reducers);
            this.updateReducers(Object.keys(reducers));
        };
        ReducerManager.prototype.removeReducer = function (featureKey) {
            this.removeReducers([featureKey]);
        };
        ReducerManager.prototype.removeReducers = function (featureKeys) {
            var _this = this;
            featureKeys.forEach(function (key) {
                _this.reducers = omit(_this.reducers, key) /*TODO(#823)*/;
            });
            this.updateReducers(featureKeys);
        };
        ReducerManager.prototype.updateReducers = function (featureKeys) {
            this.next(this.reducerFactory(this.reducers, this.initialState));
            this.dispatcher.next({
                type: UPDATE,
                features: featureKeys,
            });
        };
        ReducerManager.prototype.ngOnDestroy = function () {
            this.complete();
        };
        ReducerManager = tslib_1.__decorate([
            core.Injectable(),
            tslib_1.__param(1, core.Inject(INITIAL_STATE)),
            tslib_1.__param(2, core.Inject(INITIAL_REDUCERS)),
            tslib_1.__param(3, core.Inject(REDUCER_FACTORY)),
            tslib_1.__metadata("design:paramtypes", [ReducerManagerDispatcher, Object, Object, Function])
        ], ReducerManager);
        return ReducerManager;
    }(rxjs.BehaviorSubject));
    var REDUCER_MANAGER_PROVIDERS = [
        ReducerManager,
        { provide: ReducerObservable, useExisting: ReducerManager },
        { provide: ReducerManagerDispatcher, useExisting: ActionsSubject },
    ];

    var ScannedActionsSubject = /** @class */ (function (_super) {
        tslib_1.__extends(ScannedActionsSubject, _super);
        function ScannedActionsSubject() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScannedActionsSubject.prototype.ngOnDestroy = function () {
            this.complete();
        };
        ScannedActionsSubject = tslib_1.__decorate([
            core.Injectable()
        ], ScannedActionsSubject);
        return ScannedActionsSubject;
    }(rxjs.Subject));
    var SCANNED_ACTIONS_SUBJECT_PROVIDERS = [
        ScannedActionsSubject,
    ];

    var StateObservable = /** @class */ (function (_super) {
        tslib_1.__extends(StateObservable, _super);
        function StateObservable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StateObservable;
    }(rxjs.Observable));
    var State = /** @class */ (function (_super) {
        tslib_1.__extends(State, _super);
        function State(actions$, reducer$, scannedActions, initialState) {
            var _this = _super.call(this, initialState) || this;
            var actionsOnQueue$ = actions$.pipe(operators.observeOn(rxjs.queueScheduler));
            var withLatestReducer$ = actionsOnQueue$.pipe(operators.withLatestFrom(reducer$));
            var seed = { state: initialState };
            var stateAndAction$ = withLatestReducer$.pipe(operators.scan(reduceState, seed));
            _this.stateSubscription = stateAndAction$.subscribe(function (_a) {
                var state = _a.state, action = _a.action;
                _this.next(state);
                scannedActions.next(action);
            });
            return _this;
        }
        State.prototype.ngOnDestroy = function () {
            this.stateSubscription.unsubscribe();
            this.complete();
        };
        State.INIT = INIT;
        State = tslib_1.__decorate([
            core.Injectable(),
            tslib_1.__param(3, core.Inject(INITIAL_STATE)),
            tslib_1.__metadata("design:paramtypes", [ActionsSubject,
                ReducerObservable,
                ScannedActionsSubject, Object])
        ], State);
        return State;
    }(rxjs.BehaviorSubject));
    function reduceState(stateActionPair, _a) {
        if (stateActionPair === void 0) { stateActionPair = { state: undefined }; }
        var _b = tslib_1.__read(_a, 2), action = _b[0], reducer = _b[1];
        var state = stateActionPair.state;
        return { state: reducer(state, action), action: action };
    }
    var STATE_PROVIDERS = [
        State,
        { provide: StateObservable, useExisting: State },
    ];

    var Store = /** @class */ (function (_super) {
        tslib_1.__extends(Store, _super);
        function Store(state$, actionsObserver, reducerManager) {
            var _this = _super.call(this) || this;
            _this.actionsObserver = actionsObserver;
            _this.reducerManager = reducerManager;
            _this.source = state$;
            return _this;
        }
        Store_1 = Store;
        Store.prototype.select = function (pathOrMapFn) {
            var _a;
            var paths = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                paths[_i - 1] = arguments[_i];
            }
            return (_a = select).call.apply(_a, tslib_1.__spread([null, pathOrMapFn], paths))(this);
        };
        Store.prototype.lift = function (operator) {
            var store = new Store_1(this, this.actionsObserver, this.reducerManager);
            store.operator = operator;
            return store;
        };
        Store.prototype.dispatch = function (action) {
            this.actionsObserver.next(action);
        };
        Store.prototype.next = function (action) {
            this.actionsObserver.next(action);
        };
        Store.prototype.error = function (err) {
            this.actionsObserver.error(err);
        };
        Store.prototype.complete = function () {
            this.actionsObserver.complete();
        };
        Store.prototype.addReducer = function (key, reducer) {
            this.reducerManager.addReducer(key, reducer);
        };
        Store.prototype.removeReducer = function (key) {
            this.reducerManager.removeReducer(key);
        };
        var Store_1;
        Store = Store_1 = tslib_1.__decorate([
            core.Injectable(),
            tslib_1.__metadata("design:paramtypes", [StateObservable,
                ActionsSubject,
                ReducerManager])
        ], Store);
        return Store;
    }(rxjs.Observable));
    var STORE_PROVIDERS = [Store];
    function select(pathOrMapFn, propsOrPath) {
        var paths = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            paths[_i - 2] = arguments[_i];
        }
        return function selectOperator(source$) {
            var mapped$;
            if (typeof pathOrMapFn === 'string') {
                var pathSlices = tslib_1.__spread([propsOrPath], paths).filter(Boolean);
                mapped$ = source$.pipe(operators.pluck.apply(void 0, tslib_1.__spread([pathOrMapFn], pathSlices)));
            }
            else if (typeof pathOrMapFn === 'function') {
                mapped$ = source$.pipe(operators.map(function (source) { return pathOrMapFn(source, propsOrPath); }));
            }
            else {
                throw new TypeError("Unexpected type '" + typeof pathOrMapFn + "' in select operator," +
                    " expected 'string' or 'function'");
            }
            return mapped$.pipe(operators.distinctUntilChanged());
        };
    }

    function isEqualCheck(a, b) {
        return a === b;
    }
    function isArgumentsChanged(args, lastArguments, comparator) {
        for (var i = 0; i < args.length; i++) {
            if (!comparator(args[i], lastArguments[i])) {
                return true;
            }
        }
        return false;
    }
    function resultMemoize(projectionFn, isResultEqual) {
        return defaultMemoize(projectionFn, isEqualCheck, isResultEqual);
    }
    function defaultMemoize(projectionFn, isArgumentsEqual, isResultEqual) {
        if (isArgumentsEqual === void 0) { isArgumentsEqual = isEqualCheck; }
        if (isResultEqual === void 0) { isResultEqual = isEqualCheck; }
        var lastArguments = null;
        // tslint:disable-next-line:no-any anything could be the result.
        var lastResult = null;
        var overrideResult;
        function reset() {
            lastArguments = null;
            lastResult = null;
        }
        function setResult(result) {
            if (result === void 0) { result = undefined; }
            overrideResult = result;
        }
        // tslint:disable-next-line:no-any anything could be the result.
        function memoized() {
            if (overrideResult !== undefined) {
                return overrideResult;
            }
            if (!lastArguments) {
                lastResult = projectionFn.apply(null, arguments);
                lastArguments = arguments;
                return lastResult;
            }
            if (!isArgumentsChanged(arguments, lastArguments, isArgumentsEqual)) {
                return lastResult;
            }
            var newResult = projectionFn.apply(null, arguments);
            lastArguments = arguments;
            if (isResultEqual(lastResult, newResult)) {
                return lastResult;
            }
            lastResult = newResult;
            return newResult;
        }
        return { memoized: memoized, reset: reset, setResult: setResult };
    }
    function createSelector() {
        var input = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            input[_i] = arguments[_i];
        }
        return createSelectorFactory(defaultMemoize).apply(void 0, tslib_1.__spread(input));
    }
    function defaultStateFn(state, selectors, props, memoizedProjector) {
        if (props === undefined) {
            var args_1 = selectors.map(function (fn) { return fn(state); });
            return memoizedProjector.memoized.apply(null, args_1);
        }
        var args = selectors.map(function (fn) {
            return fn(state, props);
        });
        return memoizedProjector.memoized.apply(null, tslib_1.__spread(args, [props]));
    }
    function createSelectorFactory(memoize, options) {
        if (options === void 0) { options = {
            stateFn: defaultStateFn,
        }; }
        return function () {
            var input = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                input[_i] = arguments[_i];
            }
            var args = input;
            if (Array.isArray(args[0])) {
                var _a = tslib_1.__read(args), head = _a[0], tail = _a.slice(1);
                args = tslib_1.__spread(head, tail);
            }
            var selectors = args.slice(0, args.length - 1);
            var projector = args[args.length - 1];
            var memoizedSelectors = selectors.filter(function (selector) {
                return selector.release && typeof selector.release === 'function';
            });
            var memoizedProjector = memoize(function () {
                var selectors = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    selectors[_i] = arguments[_i];
                }
                return projector.apply(null, selectors);
            });
            var memoizedState = defaultMemoize(function (state, props) {
                return options.stateFn.apply(null, [
                    state,
                    selectors,
                    props,
                    memoizedProjector,
                ]);
            });
            function release() {
                memoizedState.reset();
                memoizedProjector.reset();
                memoizedSelectors.forEach(function (selector) { return selector.release(); });
            }
            return Object.assign(memoizedState.memoized, {
                release: release,
                projector: memoizedProjector.memoized,
                setResult: memoizedState.setResult,
            });
        };
    }
    function createFeatureSelector(featureName) {
        return createSelector(function (state) {
            var featureState = state[featureName];
            if (core.isDevMode() && !(featureName in state)) {
                console.warn("@ngrx/store: The feature name \"" + featureName + "\" does " +
                    'not exist in the state, therefore createFeatureSelector ' +
                    'cannot access it.  Be sure it is imported in a loaded module ' +
                    ("using StoreModule.forRoot('" + featureName + "', ...) or ") +
                    ("StoreModule.forFeature('" + featureName + "', ...).  If the default ") +
                    'state is intended to be undefined, as is the case with router ' +
                    'state, this development-only warning message can be ignored.');
            }
            return featureState;
        }, function (featureState) { return featureState; });
    }

    function isUndefined(target) {
        return target === undefined;
    }
    function isNull(target) {
        return target === null;
    }
    function isArray(target) {
        return Array.isArray(target);
    }
    function isString(target) {
        return typeof target === 'string';
    }
    function isBoolean(target) {
        return typeof target === 'boolean';
    }
    function isNumber(target) {
        return typeof target === 'number';
    }
    function isObjectLike(target) {
        return typeof target === 'object' && target !== null;
    }
    function isObject(target) {
        return isObjectLike(target) && !isArray(target);
    }
    function isPlainObject(target) {
        if (!isObject(target)) {
            return false;
        }
        var targetPrototype = Object.getPrototypeOf(target);
        return targetPrototype === Object.prototype || targetPrototype === null;
    }
    function isFunction(target) {
        return typeof target === 'function';
    }
    function hasOwnProperty(target, propertyName) {
        return Object.prototype.hasOwnProperty.call(target, propertyName);
    }

    function immutabilityCheckMetaReducer(reducer, checks) {
        return function (state, action) {
            var act = checks.action ? freeze(action) : action;
            var nextState = reducer(state, act);
            return checks.state ? freeze(nextState) : nextState;
        };
    }
    function freeze(target) {
        Object.freeze(target);
        var targetIsFunction = isFunction(target);
        Object.getOwnPropertyNames(target).forEach(function (prop) {
            if (hasOwnProperty(target, prop) &&
                (targetIsFunction
                    ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments'
                    : true)) {
                var propValue = target[prop];
                if ((isObjectLike(propValue) || isFunction(propValue)) &&
                    !Object.isFrozen(propValue)) {
                    freeze(propValue);
                }
            }
        });
        return target;
    }

    function serializationCheckMetaReducer(reducer, checks) {
        return function (state, action) {
            if (checks.action) {
                var unserializableAction = getUnserializable(action);
                throwIfUnserializable(unserializableAction, 'action');
            }
            var nextState = reducer(state, action);
            if (checks.state) {
                var unserializableState = getUnserializable(nextState);
                throwIfUnserializable(unserializableState, 'state');
            }
            return nextState;
        };
    }
    function getUnserializable(target, path) {
        if (path === void 0) { path = []; }
        // Guard against undefined and null, e.g. a reducer that returns undefined
        if ((isUndefined(target) || isNull(target)) && path.length === 0) {
            return {
                path: ['root'],
                value: target,
            };
        }
        var keys = Object.keys(target);
        return keys.reduce(function (result, key) {
            if (result) {
                return result;
            }
            var value = target[key];
            if (isUndefined(value) ||
                isNull(value) ||
                isNumber(value) ||
                isBoolean(value) ||
                isString(value) ||
                isArray(value)) {
                return false;
            }
            if (isPlainObject(value)) {
                return getUnserializable(value, tslib_1.__spread(path, [key]));
            }
            return {
                path: tslib_1.__spread(path, [key]),
                value: value,
            };
        }, false);
    }
    function throwIfUnserializable(unserializable, context) {
        if (unserializable === false) {
            return;
        }
        var unserializablePath = unserializable.path.join('.');
        var error = new Error("Detected unserializable " + context + " at \"" + unserializablePath + "\"");
        error.value = unserializable.value;
        error.unserializablePath = unserializablePath;
        throw error;
    }

    function createActiveRuntimeChecks(runtimeChecks) {
        if (core.isDevMode()) {
            if (runtimeChecks === undefined) {
                console.warn('@ngrx/store: runtime checks are currently opt-in but will be the default in the next major version with the possibility to opt-out, see https://ngrx.io/guide/migration/v8 for more information.');
            }
            return tslib_1.__assign({ strictStateSerializability: false, strictActionSerializability: false, strictStateImmutability: false, strictActionImmutability: false }, runtimeChecks);
        }
        return {
            strictStateSerializability: false,
            strictActionSerializability: false,
            strictStateImmutability: false,
            strictActionImmutability: false,
        };
    }
    function createSerializationCheckMetaReducer(_a) {
        var strictActionSerializability = _a.strictActionSerializability, strictStateSerializability = _a.strictStateSerializability;
        return function (reducer) {
            return strictActionSerializability || strictStateSerializability
                ? serializationCheckMetaReducer(reducer, {
                    action: strictActionSerializability,
                    state: strictStateSerializability,
                })
                : reducer;
        };
    }
    function createImmutabilityCheckMetaReducer(_a) {
        var strictActionImmutability = _a.strictActionImmutability, strictStateImmutability = _a.strictStateImmutability;
        return function (reducer) {
            return strictActionImmutability || strictStateImmutability
                ? immutabilityCheckMetaReducer(reducer, {
                    action: strictActionImmutability,
                    state: strictStateImmutability,
                })
                : reducer;
        };
    }
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
        ];
    }
    function _runtimeChecksFactory(runtimeChecks) {
        return runtimeChecks;
    }

    var StoreRootModule = /** @class */ (function () {
        function StoreRootModule(actions$, reducer$, scannedActions$, store, guard) {
        }
        StoreRootModule = tslib_1.__decorate([
            core.NgModule({}),
            tslib_1.__param(4, core.Optional()),
            tslib_1.__param(4, core.Inject(_ROOT_STORE_GUARD)),
            tslib_1.__metadata("design:paramtypes", [ActionsSubject,
                ReducerObservable,
                ScannedActionsSubject,
                Store, Object])
        ], StoreRootModule);
        return StoreRootModule;
    }());
    var StoreFeatureModule = /** @class */ (function () {
        function StoreFeatureModule(features, featureReducers, reducerManager, root) {
            this.features = features;
            this.featureReducers = featureReducers;
            this.reducerManager = reducerManager;
            var feats = features.map(function (feature, index) {
                var featureReducerCollection = featureReducers.shift();
                var reducers = featureReducerCollection /*TODO(#823)*/[index];
                return tslib_1.__assign({}, feature, { reducers: reducers, initialState: _initialStateFactory(feature.initialState) });
            });
            reducerManager.addFeatures(feats);
        }
        StoreFeatureModule.prototype.ngOnDestroy = function () {
            this.reducerManager.removeFeatures(this.features);
        };
        StoreFeatureModule = tslib_1.__decorate([
            core.NgModule({}),
            tslib_1.__param(0, core.Inject(_STORE_FEATURES)),
            tslib_1.__param(1, core.Inject(FEATURE_REDUCERS)),
            tslib_1.__metadata("design:paramtypes", [Array, Array, ReducerManager,
                StoreRootModule])
        ], StoreFeatureModule);
        return StoreFeatureModule;
    }());
    var StoreModule = /** @class */ (function () {
        function StoreModule() {
        }
        StoreModule.forRoot = function (reducers, config) {
            if (config === void 0) { config = {}; }
            return {
                ngModule: StoreRootModule,
                providers: [
                    {
                        provide: _ROOT_STORE_GUARD,
                        useFactory: _provideForRootGuard,
                        deps: [[Store, new core.Optional(), new core.SkipSelf()]],
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
                        useExisting: reducers instanceof core.InjectionToken ? reducers : _INITIAL_REDUCERS,
                    },
                    {
                        provide: INITIAL_REDUCERS,
                        deps: [core.Injector, _INITIAL_REDUCERS, [new core.Inject(_STORE_REDUCERS)]],
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
        };
        StoreModule.forFeature = function (featureName, reducers, config) {
            if (config === void 0) { config = {}; }
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
                            reducerFactory: !(config instanceof core.InjectionToken) && config.reducerFactory
                                ? config.reducerFactory
                                : combineReducers,
                            metaReducers: !(config instanceof core.InjectionToken) && config.metaReducers
                                ? config.metaReducers
                                : [],
                            initialState: !(config instanceof core.InjectionToken) && config.initialState
                                ? config.initialState
                                : undefined,
                        },
                    },
                    {
                        provide: _STORE_FEATURES,
                        deps: [core.Injector, _FEATURE_CONFIGS, STORE_FEATURES],
                        useFactory: _createFeatureStore,
                    },
                    { provide: _FEATURE_REDUCERS, multi: true, useValue: reducers },
                    {
                        provide: _FEATURE_REDUCERS_TOKEN,
                        multi: true,
                        useExisting: reducers instanceof core.InjectionToken ? reducers : _FEATURE_REDUCERS,
                    },
                    {
                        provide: FEATURE_REDUCERS,
                        multi: true,
                        deps: [
                            core.Injector,
                            _FEATURE_REDUCERS,
                            [new core.Inject(_FEATURE_REDUCERS_TOKEN)],
                        ],
                        useFactory: _createFeatureReducers,
                    },
                ],
            };
        };
        StoreModule = tslib_1.__decorate([
            core.NgModule({})
        ], StoreModule);
        return StoreModule;
    }());
    function _createStoreReducers(injector, reducers) {
        return reducers instanceof core.InjectionToken ? injector.get(reducers) : reducers;
    }
    function _createFeatureStore(injector, configs, featureStores) {
        return featureStores.map(function (feat, index) {
            if (configs[index] instanceof core.InjectionToken) {
                var conf = injector.get(configs[index]);
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
        });
    }
    function _createFeatureReducers(injector, reducerCollection) {
        var reducers = reducerCollection.map(function (reducer) {
            return reducer instanceof core.InjectionToken ? injector.get(reducer) : reducer;
        });
        return reducers;
    }
    function _initialStateFactory(initialState) {
        if (typeof initialState === 'function') {
            return initialState();
        }
        return initialState;
    }
    function _concatMetaReducers(metaReducers, userProvidedMetaReducers) {
        return metaReducers.concat(userProvidedMetaReducers);
    }
    function _provideForRootGuard(store) {
        if (store) {
            throw new TypeError("StoreModule.forRoot() called twice. Feature modules should use StoreModule.forFeature() instead.");
        }
        return 'guarded';
    }

    /**
     * @description
     * Associates actions with a given state change function.
     * A state change function must be provided as the last parameter.
     *
     * @param args `ActionCreator`'s followed by a state change function.
     *
     * **To maintain type-safety**: pass 10 or less `ActionCreator`'s.
     * @returns an association of action types with a state change function.
     */
    function on() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var reducer = args.pop();
        var types = args.reduce(function (result, creator) { return tslib_1.__spread(result, [creator.type]); }, []);
        return { reducer: reducer, types: types };
    }
    /**
     * @description
     * Creates a reducer function to handle state transitions.
     *
     * Reducer creators reduce the explicitness of reducer functions with switch statements.
     *
     * @param initialState Provides a state value if the current state is `undefined`, as it is initially.
     * @param ons Associations between actions and state changes.
     * @returns A reducer function.
     *
     * @usageNotes
     *
     * - Must be used with `ActionCreator`'s (returned by `createAction`).  Cannot be used with class-based action creators.
     * - An action can be associated with multiple state change functions. In this case the functions will be executed in the specified order.
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
     */
    function createReducer(initialState) {
        var e_1, _a;
        var ons = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            ons[_i - 1] = arguments[_i];
        }
        var map = new Map();
        var _loop_1 = function (on_1) {
            var e_2, _a;
            var _loop_2 = function (type) {
                if (map.has(type)) {
                    var existingReducer_1 = map.get(type);
                    var newReducer = function (state, action) {
                        return on_1.reducer(existingReducer_1(state, action), action);
                    };
                    map.set(type, newReducer);
                }
                else {
                    map.set(type, on_1.reducer);
                }
            };
            try {
                for (var _b = tslib_1.__values(on_1.types), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var type = _c.value;
                    _loop_2(type);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        try {
            for (var ons_1 = tslib_1.__values(ons), ons_1_1 = ons_1.next(); !ons_1_1.done; ons_1_1 = ons_1.next()) {
                var on_1 = ons_1_1.value;
                _loop_1(on_1);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (ons_1_1 && !ons_1_1.done && (_a = ons_1.return)) _a.call(ons_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return function (state, action) {
            if (state === void 0) { state = initialState; }
            var reducer = map.get(action.type);
            return reducer ? reducer(state, action) : state;
        };
    }

    /**
     * DO NOT EDIT
     *
     * This file is automatically generated at build
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ɵngrx_modules_store_store_c = ACTIONS_SUBJECT_PROVIDERS;
    exports.ɵngrx_modules_store_store_d = REDUCER_MANAGER_PROVIDERS;
    exports.ɵngrx_modules_store_store_bd = _runtimeChecksFactory;
    exports.ɵngrx_modules_store_store_z = createActiveRuntimeChecks;
    exports.ɵngrx_modules_store_store_bb = createImmutabilityCheckMetaReducer;
    exports.ɵngrx_modules_store_store_ba = createSerializationCheckMetaReducer;
    exports.ɵngrx_modules_store_store_bc = provideRuntimeChecks;
    exports.ɵngrx_modules_store_store_e = SCANNED_ACTIONS_SUBJECT_PROVIDERS;
    exports.ɵngrx_modules_store_store_f = isEqualCheck;
    exports.ɵngrx_modules_store_store_g = STATE_PROVIDERS;
    exports.ɵngrx_modules_store_store_b = STORE_PROVIDERS;
    exports.ɵngrx_modules_store_store_x = _concatMetaReducers;
    exports.ɵngrx_modules_store_store_v = _createFeatureReducers;
    exports.ɵngrx_modules_store_store_u = _createFeatureStore;
    exports.ɵngrx_modules_store_store_t = _createStoreReducers;
    exports.ɵngrx_modules_store_store_w = _initialStateFactory;
    exports.ɵngrx_modules_store_store_y = _provideForRootGuard;
    exports.ɵngrx_modules_store_store_s = _ACTIVE_RUNTIME_CHECKS;
    exports.ɵngrx_modules_store_store_n = _FEATURE_CONFIGS;
    exports.ɵngrx_modules_store_store_m = _FEATURE_REDUCERS;
    exports.ɵngrx_modules_store_store_p = _FEATURE_REDUCERS_TOKEN;
    exports.ɵngrx_modules_store_store_k = _INITIAL_REDUCERS;
    exports.ɵngrx_modules_store_store_i = _INITIAL_STATE;
    exports.ɵngrx_modules_store_store_j = _REDUCER_FACTORY;
    exports.ɵngrx_modules_store_store_q = _RESOLVED_META_REDUCERS;
    exports.ɵngrx_modules_store_store_h = _ROOT_STORE_GUARD;
    exports.ɵngrx_modules_store_store_o = _STORE_FEATURES;
    exports.ɵngrx_modules_store_store_l = _STORE_REDUCERS;
    exports.ɵngrx_modules_store_store_r = _USER_RUNTIME_CHECKS;
    exports.createAction = createAction;
    exports.props = props;
    exports.union = union;
    exports.Store = Store;
    exports.select = select;
    exports.combineReducers = combineReducers;
    exports.compose = compose;
    exports.createReducerFactory = createReducerFactory;
    exports.ActionsSubject = ActionsSubject;
    exports.INIT = INIT;
    exports.ReducerManager = ReducerManager;
    exports.ReducerObservable = ReducerObservable;
    exports.ReducerManagerDispatcher = ReducerManagerDispatcher;
    exports.UPDATE = UPDATE;
    exports.ScannedActionsSubject = ScannedActionsSubject;
    exports.createSelector = createSelector;
    exports.createSelectorFactory = createSelectorFactory;
    exports.createFeatureSelector = createFeatureSelector;
    exports.defaultMemoize = defaultMemoize;
    exports.defaultStateFn = defaultStateFn;
    exports.resultMemoize = resultMemoize;
    exports.State = State;
    exports.StateObservable = StateObservable;
    exports.reduceState = reduceState;
    exports.INITIAL_STATE = INITIAL_STATE;
    exports.REDUCER_FACTORY = REDUCER_FACTORY;
    exports.INITIAL_REDUCERS = INITIAL_REDUCERS;
    exports.STORE_FEATURES = STORE_FEATURES;
    exports.META_REDUCERS = META_REDUCERS;
    exports.FEATURE_REDUCERS = FEATURE_REDUCERS;
    exports.USER_PROVIDED_META_REDUCERS = USER_PROVIDED_META_REDUCERS;
    exports.USER_RUNTIME_CHECKS = USER_RUNTIME_CHECKS;
    exports.StoreModule = StoreModule;
    exports.StoreRootModule = StoreRootModule;
    exports.StoreFeatureModule = StoreFeatureModule;
    exports.on = on;
    exports.createReducer = createReducer;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=store.umd.js.map
