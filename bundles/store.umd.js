(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/BehaviorSubject'), require('rxjs/Observable'), require('rxjs/Subject'), require('rxjs/scheduler/queue'), require('rxjs/operator/observeOn'), require('rxjs/operator/withLatestFrom'), require('rxjs/operator/scan'), require('rxjs/operator/map'), require('rxjs/operator/pluck'), require('rxjs/operator/distinctUntilChanged')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/BehaviorSubject', 'rxjs/Observable', 'rxjs/Subject', 'rxjs/scheduler/queue', 'rxjs/operator/observeOn', 'rxjs/operator/withLatestFrom', 'rxjs/operator/scan', 'rxjs/operator/map', 'rxjs/operator/pluck', 'rxjs/operator/distinctUntilChanged'], factory) :
	(factory((global.ngrx = global.ngrx || {}, global.ngrx.store = global.ngrx.store || {}),global.ng.core,global.Rx,global.Rx,global.Rx,global.Rx.Scheduler,global.Rx.Observable.prototype,global.Rx.Observable,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype));
}(this, (function (exports,_angular_core,rxjs_BehaviorSubject,rxjs_Observable,rxjs_Subject,rxjs_scheduler_queue,rxjs_operator_observeOn,rxjs_operator_withLatestFrom,rxjs_operator_scan,rxjs_operator_map,rxjs_operator_pluck,rxjs_operator_distinctUntilChanged) { 'use strict';

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @param {?} reducers
 * @param {?=} initialState
 * @return {?}
 */
function combineReducers(reducers, initialState) {
    if (initialState === void 0) { initialState = {}; }
    var /** @type {?} */ reducerKeys = Object.keys(reducers);
    var /** @type {?} */ finalReducers = {};
    for (var /** @type {?} */ i = 0; i < reducerKeys.length; i++) {
        var /** @type {?} */ key = reducerKeys[i];
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }
    var /** @type {?} */ finalReducerKeys = Object.keys(finalReducers);
    return function combination(state, action) {
        if (state === void 0) { state = initialState; }
        var /** @type {?} */ hasChanged = false;
        var /** @type {?} */ nextState = {};
        for (var /** @type {?} */ i = 0; i < finalReducerKeys.length; i++) {
            var /** @type {?} */ key = finalReducerKeys[i];
            var /** @type {?} */ reducer = finalReducers[key];
            var /** @type {?} */ previousStateForKey = state[key];
            var /** @type {?} */ nextStateForKey = reducer(previousStateForKey, action);
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
        .filter(function (key) { return key !== keyToRemove; })
        .reduce(function (result, key) {
        return Object.assign(result, (_a = {}, _a[key] = object[key], _a));
        var _a;
    }, {});
}
/**
 * @param {...?} functions
 * @return {?}
 */
function compose() {
    var functions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        functions[_i] = arguments[_i];
    }
    return function (arg) {
        if (functions.length === 0) {
            return arg;
        }
        var /** @type {?} */ last = functions[functions.length - 1];
        var /** @type {?} */ rest = functions.slice(0, -1);
        return rest.reduceRight(function (composed, fn) { return fn(composed); }, last(arg));
    };
}
var _INITIAL_STATE = new _angular_core.OpaqueToken('_ngrx/store Initial State');
var INITIAL_STATE = new _angular_core.OpaqueToken('@ngrx/store Initial State');
var REDUCER_FACTORY = new _angular_core.OpaqueToken('@ngrx/store Reducer Factory');
var INITIAL_REDUCERS = new _angular_core.OpaqueToken('@ngrx/store Initial Reducers');
var STORE_FEATURES = new _angular_core.OpaqueToken('@ngrx/store Store Features');
var INIT = '@ngrx/store/init';
var ActionsSubject = (function (_super) {
    __extends(ActionsSubject, _super);
    function ActionsSubject() {
        return _super.call(this, { type: INIT }) || this;
    }
    /**
     * @param {?} action
     * @return {?}
     */
    ActionsSubject.prototype.next = function (action) {
        if (typeof action === 'undefined') {
            throw new Error("Actions must be objects");
        }
        else if (typeof action.type === 'undefined') {
            throw new Error("Actions must have a type property");
        }
        _super.prototype.next.call(this, action);
    };
    /**
     * @return {?}
     */
    ActionsSubject.prototype.complete = function () {
        /* noop */
    };
    /**
     * @return {?}
     */
    ActionsSubject.prototype.ngOnDestroy = function () {
        _super.prototype.complete.call(this);
    };
    return ActionsSubject;
}(rxjs_BehaviorSubject.BehaviorSubject));
ActionsSubject.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
ActionsSubject.ctorParameters = function () { return []; };
var ACTIONS_SUBJECT_PROVIDERS = [ActionsSubject];
/**
 * @abstract
 */
var ReducerObservable = (function (_super) {
    __extends(ReducerObservable, _super);
    function ReducerObservable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReducerObservable;
}(rxjs_Observable.Observable));
/**
 * @abstract
 */
var ReducerManagerDispatcher = (function (_super) {
    __extends(ReducerManagerDispatcher, _super);
    function ReducerManagerDispatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReducerManagerDispatcher;
}(ActionsSubject));
var UPDATE = '@ngrx/store/update-reducers';
var ReducerManager = (function (_super) {
    __extends(ReducerManager, _super);
    /**
     * @param {?} dispatcher
     * @param {?} initialState
     * @param {?} reducers
     * @param {?} reducerFactory
     */
    function ReducerManager(dispatcher, initialState, reducers, reducerFactory) {
        var _this = _super.call(this, reducerFactory(reducers, initialState)) || this;
        _this.dispatcher = dispatcher;
        _this.initialState = initialState;
        _this.reducers = reducers;
        _this.reducerFactory = reducerFactory;
        return _this;
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    ReducerManager.prototype.addFeature = function (_a) {
        var reducers = _a.reducers, reducerFactory = _a.reducerFactory, initialState = _a.initialState, key = _a.key;
        var /** @type {?} */ reducer = typeof reducers === 'function'
            ? reducers
            : reducerFactory(reducers, initialState);
        this.addReducer(key, reducer);
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    ReducerManager.prototype.removeFeature = function (_a) {
        var key = _a.key;
        this.removeReducer(key);
    };
    /**
     * @param {?} key
     * @param {?} reducer
     * @return {?}
     */
    ReducerManager.prototype.addReducer = function (key, reducer) {
        this.reducers = Object.assign({}, this.reducers, (_a = {}, _a[key] = reducer, _a));
        this.updateReducers();
        var _a;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    ReducerManager.prototype.removeReducer = function (key) {
        this.reducers = omit(this.reducers, key);
        this.updateReducers();
    };
    /**
     * @return {?}
     */
    ReducerManager.prototype.updateReducers = function () {
        this.next(this.reducerFactory(this.reducers, this.initialState));
        this.dispatcher.next({ type: UPDATE });
    };
    /**
     * @return {?}
     */
    ReducerManager.prototype.ngOnDestroy = function () {
        this.complete();
    };
    return ReducerManager;
}(rxjs_BehaviorSubject.BehaviorSubject));
ReducerManager.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
ReducerManager.ctorParameters = function () { return [
    { type: ReducerManagerDispatcher, },
    { type: undefined, decorators: [{ type: _angular_core.Inject, args: [INITIAL_STATE,] },] },
    { type: undefined, decorators: [{ type: _angular_core.Inject, args: [INITIAL_REDUCERS,] },] },
    { type: undefined, decorators: [{ type: _angular_core.Inject, args: [REDUCER_FACTORY,] },] },
]; };
var REDUCER_MANAGER_PROVIDERS = [
    ReducerManager,
    { provide: ReducerObservable, useExisting: ReducerManager },
    { provide: ReducerManagerDispatcher, useExisting: ActionsSubject },
];
var ScannedActionsSubject = (function (_super) {
    __extends(ScannedActionsSubject, _super);
    function ScannedActionsSubject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    ScannedActionsSubject.prototype.ngOnDestroy = function () {
        this.complete();
    };
    return ScannedActionsSubject;
}(rxjs_Subject.Subject));
ScannedActionsSubject.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
ScannedActionsSubject.ctorParameters = function () { return []; };
var SCANNED_ACTIONS_SUBJECT_PROVIDERS = [
    ScannedActionsSubject,
];
/**
 * @abstract
 */
var StateObservable = (function (_super) {
    __extends(StateObservable, _super);
    function StateObservable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StateObservable;
}(rxjs_Observable.Observable));
var State = (function (_super) {
    __extends(State, _super);
    /**
     * @param {?} actions$
     * @param {?} reducer$
     * @param {?} scannedActions
     * @param {?} initialState
     */
    function State(actions$, reducer$, scannedActions, initialState) {
        var _this = _super.call(this, initialState) || this;
        var actionsOnQueue$ = rxjs_operator_observeOn.observeOn.call(actions$, rxjs_scheduler_queue.queue);
        var withLatestReducer$ = rxjs_operator_withLatestFrom.withLatestFrom.call(actionsOnQueue$, reducer$);
        var stateAndAction$ = rxjs_operator_scan.scan.call(withLatestReducer$, reduceState, initialState);
        _this.stateSubscription = stateAndAction$.subscribe({
            next: function (_a) {
                var state = _a.state, action = _a.action;
                _this.next(state);
                scannedActions.next(action);
            },
        });
        return _this;
    }
    /**
     * @return {?}
     */
    State.prototype.ngOnDestroy = function () {
        this.stateSubscription.unsubscribe();
        this.complete();
    };
    return State;
}(rxjs_BehaviorSubject.BehaviorSubject));
State.INIT = '@ngrx/store/init';
State.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
State.ctorParameters = function () { return [
    { type: ActionsSubject, },
    { type: ReducerObservable, },
    { type: ScannedActionsSubject, },
    { type: undefined, decorators: [{ type: _angular_core.Inject, args: [INITIAL_STATE,] },] },
]; };
/**
 * @template T, V
 * @param {?=} __0
 * @param {?=} __1
 * @return {?}
 */
function reduceState(_a, _b) {
    var state = (_a === void 0 ? { state: undefined } : _a).state;
    var action = _b[0], reducer = _b[1];
    return { state: reducer(state, action), action: action };
}
var STATE_PROVIDERS = [
    State,
    { provide: StateObservable, useExisting: State },
];
/**
 * @param {?} t
 * @return {?}
 */
function memoize(t) {
    var /** @type {?} */ lastArguments = null;
    var /** @type {?} */ lastResult = null;
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
        for (var /** @type {?} */ i = 0; i < arguments.length; i++) {
            if (arguments[i] !== lastArguments[i]) {
                lastResult = t.apply(null, arguments);
                lastArguments = arguments;
                return lastResult;
            }
        }
        return lastResult;
    }
    return { memoized: memoized, reset: reset };
}
/**
 * @param {...?} args
 * @return {?}
 */
function createSelector() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var /** @type {?} */ selectors = args.slice(0, args.length - 1);
    var /** @type {?} */ projector = args[args.length - 1];
    var /** @type {?} */ memoizedSelectors = selectors.filter(function (selector) { return selector.release && typeof selector.release === 'function'; });
    var _a = memoize(function (state) {
        var /** @type {?} */ args = selectors.map(function (fn) { return fn(state); });
        return projector.apply(null, args);
    }), memoized = _a.memoized, reset = _a.reset;
    /**
     * @return {?}
     */
    function release() {
        reset();
        memoizedSelectors.forEach(function (selector) { return selector.release(); });
    }
    return Object.assign(memoized, { release: release });
}
/**
 * @template T
 * @param {?} featureName
 * @return {?}
 */
function createFeatureSelector(featureName) {
    var _a = memoize(function (state) {
        return state[featureName];
    }), memoized = _a.memoized, reset = _a.reset;
    return Object.assign(memoized, { release: reset });
}
/**
 * @param {?} v
 * @return {?}
 */
function isSelector(v) {
    return (typeof v === 'function' && v.release && typeof v.release === 'function');
}
var Store = (function (_super) {
    __extends(Store, _super);
    /**
     * @param {?} state$
     * @param {?} actionsObserver
     * @param {?} reducerManager
     */
    function Store(state$, actionsObserver, reducerManager) {
        var _this = _super.call(this) || this;
        _this.actionsObserver = actionsObserver;
        _this.reducerManager = reducerManager;
        _this.source = state$;
        return _this;
    }
    /**
     * @param {?} pathOrMapFn
     * @param {...?} paths
     * @return {?}
     */
    Store.prototype.select = function (pathOrMapFn) {
        var paths = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            paths[_i - 1] = arguments[_i];
        }
        var /** @type {?} */ mapped$;
        if (typeof pathOrMapFn === 'string') {
            mapped$ = rxjs_operator_pluck.pluck.call.apply(rxjs_operator_pluck.pluck, [this, pathOrMapFn].concat(paths));
        }
        else if (typeof pathOrMapFn === 'function' && isSelector(pathOrMapFn)) {
            mapped$ = rxjs_operator_map.map.call(this, pathOrMapFn);
        }
        else if (typeof pathOrMapFn === 'function') {
            mapped$ = rxjs_operator_map.map.call(this, createSelector(function (s) { return s; }, pathOrMapFn));
        }
        else {
            throw new TypeError("Unexpected type '" + typeof pathOrMapFn + "' in select operator," +
                " expected 'string' or 'function'");
        }
        return rxjs_operator_distinctUntilChanged.distinctUntilChanged.call(mapped$);
    };
    /**
     * @template R
     * @param {?} operator
     * @return {?}
     */
    Store.prototype.lift = function (operator) {
        var /** @type {?} */ store = new Store(this, this.actionsObserver, this.reducerManager);
        store.operator = operator;
        return store;
    };
    /**
     * @template V
     * @param {?} action
     * @return {?}
     */
    Store.prototype.dispatch = function (action) {
        this.actionsObserver.next(action);
    };
    /**
     * @param {?} action
     * @return {?}
     */
    Store.prototype.next = function (action) {
        this.actionsObserver.next(action);
    };
    /**
     * @param {?} err
     * @return {?}
     */
    Store.prototype.error = function (err) {
        this.actionsObserver.error(err);
    };
    /**
     * @return {?}
     */
    Store.prototype.complete = function () {
        this.actionsObserver.complete();
    };
    /**
     * @template State, Actions
     * @param {?} key
     * @param {?} reducer
     * @return {?}
     */
    Store.prototype.addReducer = function (key, reducer) {
        this.reducerManager.addReducer(key, reducer);
    };
    /**
     * @template Key
     * @param {?} key
     * @return {?}
     */
    Store.prototype.removeReducer = function (key) {
        this.reducerManager.removeReducer(key);
    };
    return Store;
}(rxjs_Observable.Observable));
Store.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
Store.ctorParameters = function () { return [
    { type: StateObservable, },
    { type: ActionsSubject, },
    { type: ReducerManager, },
]; };
var STORE_PROVIDERS = [Store];
var StoreRootModule = (function () {
    /**
     * @param {?} actions$
     * @param {?} reducer$
     * @param {?} scannedActions$
     */
    function StoreRootModule(actions$, reducer$, scannedActions$) {
    }
    return StoreRootModule;
}());
StoreRootModule.decorators = [
    { type: _angular_core.NgModule, args: [{},] },
];
/**
 * @nocollapse
 */
StoreRootModule.ctorParameters = function () { return [
    { type: ActionsSubject, },
    { type: ReducerObservable, },
    { type: ScannedActionsSubject, },
]; };
var StoreFeatureModule = (function () {
    /**
     * @param {?} features
     * @param {?} reducerManager
     */
    function StoreFeatureModule(features, reducerManager) {
        this.features = features;
        this.reducerManager = reducerManager;
        features.forEach(function (feature) { return reducerManager.addFeature(feature); });
    }
    /**
     * @return {?}
     */
    StoreFeatureModule.prototype.ngOnDestroy = function () {
        var _this = this;
        this.features.forEach(function (feature) { return _this.reducerManager.removeFeature(feature); });
    };
    return StoreFeatureModule;
}());
StoreFeatureModule.decorators = [
    { type: _angular_core.NgModule, args: [{},] },
];
/**
 * @nocollapse
 */
StoreFeatureModule.ctorParameters = function () { return [
    { type: Array, decorators: [{ type: _angular_core.Inject, args: [STORE_FEATURES,] },] },
    { type: ReducerManager, },
]; };
var StoreModule = (function () {
    function StoreModule() {
    }
    /**
     * @param {?} reducers
     * @param {?=} config
     * @return {?}
     */
    StoreModule.forRoot = function (reducers, config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: StoreRootModule,
            providers: [
                { provide: _INITIAL_STATE, useValue: config.initialState },
                {
                    provide: INITIAL_STATE,
                    useFactory: _initialStateFactory,
                    deps: [_INITIAL_STATE],
                },
                reducers instanceof _angular_core.InjectionToken
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
    };
    /**
     * @param {?} featureName
     * @param {?} reducers
     * @param {?=} config
     * @return {?}
     */
    StoreModule.forFeature = function (featureName, reducers, config) {
        if (config === void 0) { config = {}; }
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
    };
    return StoreModule;
}());
StoreModule.decorators = [
    { type: _angular_core.NgModule, args: [{},] },
];
/**
 * @nocollapse
 */
StoreModule.ctorParameters = function () { return []; };
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

exports.StoreModule = StoreModule;
exports.Store = Store;
exports.combineReducers = combineReducers;
exports.compose = compose;
exports.ActionsSubject = ActionsSubject;
exports.INIT = INIT;
exports.ReducerManager = ReducerManager;
exports.ReducerObservable = ReducerObservable;
exports.ReducerManagerDispatcher = ReducerManagerDispatcher;
exports.UPDATE = UPDATE;
exports.ScannedActionsSubject = ScannedActionsSubject;
exports.createSelector = createSelector;
exports.createFeatureSelector = createFeatureSelector;
exports.State = State;
exports.StateObservable = StateObservable;
exports.reduceState = reduceState;
exports.INITIAL_STATE = INITIAL_STATE;
exports.REDUCER_FACTORY = REDUCER_FACTORY;
exports.INITIAL_REDUCERS = INITIAL_REDUCERS;
exports.STORE_FEATURES = STORE_FEATURES;
exports._INITIAL_STATE = _INITIAL_STATE;
exports.StoreRootModule = StoreRootModule;
exports.StoreFeatureModule = StoreFeatureModule;
exports._initialStateFactory = _initialStateFactory;
exports.ɵc = ACTIONS_SUBJECT_PROVIDERS;
exports.ɵd = REDUCER_MANAGER_PROVIDERS;
exports.ɵe = SCANNED_ACTIONS_SUBJECT_PROVIDERS;
exports.ɵf = STATE_PROVIDERS;
exports.ɵb = STORE_PROVIDERS;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=store.umd.js.map
