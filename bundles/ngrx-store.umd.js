(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ngrx/store', ['exports', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.ngrx = global.ngrx || {}, global.ngrx.store = {}), global.ng.core, global.rxjs, global.rxjs.operators));
}(this, (function (exports, ngCore, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/globals.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var REGISTERED_ACTION_TYPES = {};
    /**
     * @return {?}
     */
    function resetRegisteredActionTypes() {
        var e_1, _a;
        try {
            for (var _b = __values(Object.keys(REGISTERED_ACTION_TYPES)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                delete REGISTERED_ACTION_TYPES[key];
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }

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
            return defineType(type, ( /**
             * @param {...?} args
             * @return {?}
             */function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return (Object.assign(Object.assign({}, config.apply(void 0, __spread(args))), { type: type }));
            }));
        }
        /** @type {?} */
        var as = config ? config._as : 'empty';
        switch (as) {
            case 'empty':
                return defineType(type, ( /**
                 * @return {?}
                 */function () { return ({ type: type }); }));
            case 'props':
                return defineType(type, ( /**
                 * @param {?} props
                 * @return {?}
                 */function (props) { return (Object.assign(Object.assign({}, props), { type: type })); }));
            default:
                throw new Error('Unexpected config.');
        }
    }
    /**
     * @template P
     * @return {?}
     */
    function props() {
        return { _as: 'props', _p: ( /** @type {?} */(undefined)) };
    }
    /**
     * @template C
     * @param {?} creators
     * @return {?}
     */
    function union(creators) {
        return ( /** @type {?} */(undefined));
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

    /** @type {?} */
    var INIT = ( /** @type {?} */('@ngrx/store/init'));
    var ActionsSubject = /** @class */ (function (_super) {
        __extends(ActionsSubject, _super);
        function ActionsSubject() {
            return _super.call(this, { type: INIT }) || this;
        }
        /**
         * @param {?} action
         * @return {?}
         */
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
    }(rxjs.BehaviorSubject));
    ActionsSubject.decorators = [
        { type: ngCore.Injectable }
    ];
    /** @nocollapse */
    ActionsSubject.ctorParameters = function () { return []; };
    /** @type {?} */
    var ACTIONS_SUBJECT_PROVIDERS = [ActionsSubject];

    /**
     * @fileoverview added by tsickle
     * Generated from: src/tokens.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var _ROOT_STORE_GUARD = new ngCore.InjectionToken('@ngrx/store Internal Root Guard');
    /** @type {?} */
    var _INITIAL_STATE = new ngCore.InjectionToken('@ngrx/store Internal Initial State');
    /** @type {?} */
    var INITIAL_STATE = new ngCore.InjectionToken('@ngrx/store Initial State');
    /** @type {?} */
    var REDUCER_FACTORY = new ngCore.InjectionToken('@ngrx/store Reducer Factory');
    /** @type {?} */
    var _REDUCER_FACTORY = new ngCore.InjectionToken('@ngrx/store Internal Reducer Factory Provider');
    /** @type {?} */
    var INITIAL_REDUCERS = new ngCore.InjectionToken('@ngrx/store Initial Reducers');
    /** @type {?} */
    var _INITIAL_REDUCERS = new ngCore.InjectionToken('@ngrx/store Internal Initial Reducers');
    /** @type {?} */
    var STORE_FEATURES = new ngCore.InjectionToken('@ngrx/store Store Features');
    /** @type {?} */
    var _STORE_REDUCERS = new ngCore.InjectionToken('@ngrx/store Internal Store Reducers');
    /** @type {?} */
    var _FEATURE_REDUCERS = new ngCore.InjectionToken('@ngrx/store Internal Feature Reducers');
    /** @type {?} */
    var _FEATURE_CONFIGS = new ngCore.InjectionToken('@ngrx/store Internal Feature Configs');
    /** @type {?} */
    var _STORE_FEATURES = new ngCore.InjectionToken('@ngrx/store Internal Store Features');
    /** @type {?} */
    var _FEATURE_REDUCERS_TOKEN = new ngCore.InjectionToken('@ngrx/store Internal Feature Reducers Token');
    /** @type {?} */
    var FEATURE_REDUCERS = new ngCore.InjectionToken('@ngrx/store Feature Reducers');
    /**
     * User-defined meta reducers from StoreModule.forRoot()
     * @type {?}
     */
    var USER_PROVIDED_META_REDUCERS = new ngCore.InjectionToken('@ngrx/store User Provided Meta Reducers');
    /**
     * Meta reducers defined either internally by \@ngrx/store or by library authors
     * @type {?}
     */
    var META_REDUCERS = new ngCore.InjectionToken('@ngrx/store Meta Reducers');
    /**
     * Concats the user provided meta reducers and the meta reducers provided on the multi
     * injection token
     * @type {?}
     */
    var _RESOLVED_META_REDUCERS = new ngCore.InjectionToken('@ngrx/store Internal Resolved Meta Reducers');
    /**
     * Runtime checks defined by the user via an InjectionToken
     * Defaults to `_USER_RUNTIME_CHECKS`
     * @type {?}
     */
    var USER_RUNTIME_CHECKS = new ngCore.InjectionToken('@ngrx/store User Runtime Checks Config');
    /**
     * Runtime checks defined by the user via forRoot()
     * @type {?}
     */
    var _USER_RUNTIME_CHECKS = new ngCore.InjectionToken('@ngrx/store Internal User Runtime Checks Config');
    /**
     * Runtime checks currently in use
     * @type {?}
     */
    var _ACTIVE_RUNTIME_CHECKS = new ngCore.InjectionToken('@ngrx/store Internal Runtime Checks');
    /** @type {?} */
    var _ACTION_TYPE_UNIQUENESS_CHECK = new ngCore.InjectionToken('@ngrx/store Check if Action types are unique');

    /**
     * @fileoverview added by tsickle
     * Generated from: src/utils.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} reducers
     * @param {?=} initialState
     * @return {?}
     */
    function combineReducers(reducers, initialState) {
        if (initialState === void 0) { initialState = {}; }
        /** @type {?} */
        var reducerKeys = Object.keys(reducers);
        /** @type {?} */
        var finalReducers = {};
        for (var i = 0; i < reducerKeys.length; i++) {
            /** @type {?} */
            var key = reducerKeys[i];
            if (typeof reducers[key] === 'function') {
                finalReducers[key] = reducers[key];
            }
        }
        /** @type {?} */
        var finalReducerKeys = Object.keys(finalReducers);
        return ( /**
         * @param {?} state
         * @param {?} action
         * @return {?}
         */function combination(state, action) {
            state = state === undefined ? initialState : state;
            /** @type {?} */
            var hasChanged = false;
            /** @type {?} */
            var nextState = {};
            for (var i = 0; i < finalReducerKeys.length; i++) {
                /** @type {?} */
                var key = finalReducerKeys[i];
                /** @type {?} */
                var reducer = finalReducers[key];
                /** @type {?} */
                var previousStateForKey = state[key];
                /** @type {?} */
                var nextStateForKey = reducer(previousStateForKey, action);
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
            .filter(( /**
     * @param {?} key
     * @return {?}
     */function (key) { return key !== keyToRemove; }))
            .reduce(( /**
     * @param {?} result
     * @param {?} key
     * @return {?}
     */function (result, key) {
            var _a;
            return Object.assign(result, (_a = {}, _a[key] = object[key], _a));
        }), {});
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
        return ( /**
         * @param {?} arg
         * @return {?}
         */function (arg) {
            if (functions.length === 0) {
                return arg;
            }
            /** @type {?} */
            var last = functions[functions.length - 1];
            /** @type {?} */
            var rest = functions.slice(0, -1);
            return rest.reduceRight(( /**
             * @param {?} composed
             * @param {?} fn
             * @return {?}
             */function (composed, fn) { return fn(composed); }), last(arg));
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
            (( /** @type {?} */(reducerFactory))) = compose.apply(null, __spread(metaReducers, [
                reducerFactory,
            ]));
        }
        return ( /**
         * @param {?} reducers
         * @param {?=} initialState
         * @return {?}
         */function (reducers, initialState) {
            /** @type {?} */
            var reducer = reducerFactory(reducers);
            return ( /**
             * @param {?} state
             * @param {?} action
             * @return {?}
             */function (state, action) {
                state = state === undefined ? (( /** @type {?} */(initialState))) : state;
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
        var reducerFactory = Array.isArray(metaReducers) && metaReducers.length > 0
            ? compose.apply(void 0, __spread(metaReducers)) : ( /**
         * @param {?} r
         * @return {?}
         */function (r) { return r; });
        return ( /**
         * @param {?} reducer
         * @param {?=} initialState
         * @return {?}
         */function (reducer, initialState) {
            reducer = reducerFactory(reducer);
            return ( /**
             * @param {?} state
             * @param {?} action
             * @return {?}
             */function (state, action) {
                state = state === undefined ? initialState : state;
                return reducer(state, action);
            });
        });
    }

    /**
     * @abstract
     */
    var ReducerObservable = /** @class */ (function (_super) {
        __extends(ReducerObservable, _super);
        function ReducerObservable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ReducerObservable;
    }(rxjs.Observable));
    /**
     * @abstract
     */
    var ReducerManagerDispatcher = /** @class */ (function (_super) {
        __extends(ReducerManagerDispatcher, _super);
        function ReducerManagerDispatcher() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ReducerManagerDispatcher;
    }(ActionsSubject));
    /** @type {?} */
    var UPDATE = ( /** @type {?} */('@ngrx/store/update-reducers'));
    var ReducerManager = /** @class */ (function (_super) {
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
         * @param {?} feature
         * @return {?}
         */
        ReducerManager.prototype.addFeature = function (feature) {
            this.addFeatures([feature]);
        };
        /**
         * @param {?} features
         * @return {?}
         */
        ReducerManager.prototype.addFeatures = function (features) {
            /** @type {?} */
            var reducers = features.reduce(( /**
             * @param {?} reducerDict
             * @param {?} __1
             * @return {?}
             */function (reducerDict, _a) {
                var reducers = _a.reducers, reducerFactory = _a.reducerFactory, metaReducers = _a.metaReducers, initialState = _a.initialState, key = _a.key;
                /** @type {?} */
                var reducer = typeof reducers === 'function'
                    ? createFeatureReducerFactory(metaReducers)(reducers, initialState)
                    : createReducerFactory(reducerFactory, metaReducers)(reducers, initialState);
                reducerDict[key] = reducer;
                return reducerDict;
            }), ( /** @type {?} */({})));
            this.addReducers(reducers);
        };
        /**
         * @param {?} feature
         * @return {?}
         */
        ReducerManager.prototype.removeFeature = function (feature) {
            this.removeFeatures([feature]);
        };
        /**
         * @param {?} features
         * @return {?}
         */
        ReducerManager.prototype.removeFeatures = function (features) {
            this.removeReducers(features.map(( /**
             * @param {?} p
             * @return {?}
             */function (p) { return p.key; })));
        };
        /**
         * @param {?} key
         * @param {?} reducer
         * @return {?}
         */
        ReducerManager.prototype.addReducer = function (key, reducer) {
            var _a;
            this.addReducers((_a = {}, _a[key] = reducer, _a));
        };
        /**
         * @param {?} reducers
         * @return {?}
         */
        ReducerManager.prototype.addReducers = function (reducers) {
            this.reducers = Object.assign(Object.assign({}, this.reducers), reducers);
            this.updateReducers(Object.keys(reducers));
        };
        /**
         * @param {?} featureKey
         * @return {?}
         */
        ReducerManager.prototype.removeReducer = function (featureKey) {
            this.removeReducers([featureKey]);
        };
        /**
         * @param {?} featureKeys
         * @return {?}
         */
        ReducerManager.prototype.removeReducers = function (featureKeys) {
            var _this = this;
            featureKeys.forEach(( /**
             * @param {?} key
             * @return {?}
             */function (key) {
                _this.reducers = ( /** @type {?} */(omit(_this.reducers, key) /*TODO(#823)*/));
            }));
            this.updateReducers(featureKeys);
        };
        /**
         * @private
         * @param {?} featureKeys
         * @return {?}
         */
        ReducerManager.prototype.updateReducers = function (featureKeys) {
            this.next(this.reducerFactory(this.reducers, this.initialState));
            this.dispatcher.next(( /** @type {?} */({
                type: UPDATE,
                features: featureKeys,
            })));
        };
        /**
         * @return {?}
         */
        ReducerManager.prototype.ngOnDestroy = function () {
            this.complete();
        };
        return ReducerManager;
    }(rxjs.BehaviorSubject));
    ReducerManager.decorators = [
        { type: ngCore.Injectable }
    ];
    /** @nocollapse */
    ReducerManager.ctorParameters = function () { return [
        { type: ReducerManagerDispatcher },
        { type: undefined, decorators: [{ type: ngCore.Inject, args: [INITIAL_STATE,] }] },
        { type: undefined, decorators: [{ type: ngCore.Inject, args: [INITIAL_REDUCERS,] }] },
        { type: undefined, decorators: [{ type: ngCore.Inject, args: [REDUCER_FACTORY,] }] }
    ]; };
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
    var REDUCER_MANAGER_PROVIDERS = [
        ReducerManager,
        { provide: ReducerObservable, useExisting: ReducerManager },
        { provide: ReducerManagerDispatcher, useExisting: ActionsSubject },
    ];

    var ScannedActionsSubject = /** @class */ (function (_super) {
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
    }(rxjs.Subject));
    ScannedActionsSubject.decorators = [
        { type: ngCore.Injectable }
    ];
    /** @type {?} */
    var SCANNED_ACTIONS_SUBJECT_PROVIDERS = [
        ScannedActionsSubject,
    ];

    /**
     * @abstract
     */
    var StateObservable = /** @class */ (function (_super) {
        __extends(StateObservable, _super);
        function StateObservable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StateObservable;
    }(rxjs.Observable));
    /**
     * @template T
     */
    var State = /** @class */ (function (_super) {
        __extends(State, _super);
        /**
         * @param {?} actions$
         * @param {?} reducer$
         * @param {?} scannedActions
         * @param {?} initialState
         */
        function State(actions$, reducer$, scannedActions, initialState) {
            var _this = _super.call(this, initialState) || this;
            /** @type {?} */
            var actionsOnQueue$ = actions$.pipe(operators.observeOn(rxjs.queueScheduler));
            /** @type {?} */
            var withLatestReducer$ = actionsOnQueue$.pipe(operators.withLatestFrom(reducer$));
            /** @type {?} */
            var seed = { state: initialState };
            /** @type {?} */
            var stateAndAction$ = withLatestReducer$.pipe(operators.scan(reduceState, seed));
            _this.stateSubscription = stateAndAction$.subscribe(( /**
             * @param {?} __0
             * @return {?}
             */function (_a) {
                var state = _a.state, action = _a.action;
                _this.next(state);
                scannedActions.next(( /** @type {?} */(action)));
            }));
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
    }(rxjs.BehaviorSubject));
    State.INIT = INIT;
    State.decorators = [
        { type: ngCore.Injectable }
    ];
    /** @nocollapse */
    State.ctorParameters = function () { return [
        { type: ActionsSubject },
        { type: ReducerObservable },
        { type: ScannedActionsSubject },
        { type: undefined, decorators: [{ type: ngCore.Inject, args: [INITIAL_STATE,] }] }
    ]; };
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
    function reduceState(stateActionPair, _a) {
        if (stateActionPair === void 0) { stateActionPair = { state: undefined }; }
        var _b = __read(_a, 2), action = _b[0], reducer = _b[1];
        var state = stateActionPair.state;
        return { state: reducer(state, action), action: action };
    }
    /** @type {?} */
    var STATE_PROVIDERS = [
        State,
        { provide: StateObservable, useExisting: State },
    ];

    /**
     * @template T
     */
    var Store = /** @class */ (function (_super) {
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
         * @template Props, K
         * @param {?} pathOrMapFn
         * @param {...?} paths
         * @return {?}
         */
        Store.prototype.select = function (pathOrMapFn) {
            var paths = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                paths[_i - 1] = arguments[_i];
            }
            return (( /** @type {?} */(select))).call.apply((( /** @type {?} */(select))), __spread([null, pathOrMapFn], paths))(this);
        };
        /**
         * @template R
         * @param {?} operator
         * @return {?}
         */
        Store.prototype.lift = function (operator) {
            /** @type {?} */
            var store = new Store(this, this.actionsObserver, this.reducerManager);
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
    }(rxjs.Observable));
    Store.decorators = [
        { type: ngCore.Injectable }
    ];
    /** @nocollapse */
    Store.ctorParameters = function () { return [
        { type: StateObservable },
        { type: ActionsSubject },
        { type: ReducerManager }
    ]; };
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
    var STORE_PROVIDERS = [Store];
    /**
     * @template T, Props, K
     * @param {?} pathOrMapFn
     * @param {?=} propsOrPath
     * @param {...?} paths
     * @return {?}
     */
    function select(pathOrMapFn, propsOrPath) {
        var paths = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            paths[_i - 2] = arguments[_i];
        }
        return ( /**
         * @param {?} source$
         * @return {?}
         */function selectOperator(source$) {
            /** @type {?} */
            var mapped$;
            if (typeof pathOrMapFn === 'string') {
                /** @type {?} */
                var pathSlices = __spread([( /** @type {?} */(propsOrPath))], paths).filter(Boolean);
                mapped$ = source$.pipe(operators.pluck.apply(void 0, __spread([pathOrMapFn], pathSlices)));
            }
            else if (typeof pathOrMapFn === 'function') {
                mapped$ = source$.pipe(operators.map(( /**
                 * @param {?} source
                 * @return {?}
                 */function (source) { return pathOrMapFn(source, ( /** @type {?} */(propsOrPath))); })));
            }
            else {
                throw new TypeError("Unexpected type '" + typeof pathOrMapFn + "' in select operator," +
                    " expected 'string' or 'function'");
            }
            return mapped$.pipe(operators.distinctUntilChanged());
        });
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/flags.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var _ngrxMockEnvironment = false;
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
        for (var i = 0; i < args.length; i++) {
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
    function defaultMemoize(projectionFn, isArgumentsEqual, isResultEqual) {
        if (isArgumentsEqual === void 0) { isArgumentsEqual = isEqualCheck; }
        if (isResultEqual === void 0) { isResultEqual = isEqualCheck; }
        /** @type {?} */
        var lastArguments = null;
        // tslint:disable-next-line:no-any anything could be the result.
        /** @type {?} */
        var lastResult = null;
        /** @type {?} */
        var overrideResult;
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
        function setResult(result) {
            if (result === void 0) { result = undefined; }
            overrideResult = { result: result };
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
                lastResult = projectionFn.apply(null, ( /** @type {?} */(arguments)));
                lastArguments = arguments;
                return lastResult;
            }
            if (!isArgumentsChanged(arguments, lastArguments, isArgumentsEqual)) {
                return lastResult;
            }
            /** @type {?} */
            var newResult = projectionFn.apply(null, ( /** @type {?} */(arguments)));
            lastArguments = arguments;
            if (isResultEqual(lastResult, newResult)) {
                return lastResult;
            }
            lastResult = newResult;
            return newResult;
        }
        return { memoized: memoized, reset: reset, setResult: setResult, clearResult: clearResult };
    }
    /**
     * @param {...?} input
     * @return {?}
     */
    function createSelector() {
        var input = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            input[_i] = arguments[_i];
        }
        return createSelectorFactory(defaultMemoize).apply(void 0, __spread(input));
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
            var args_1 = (( /** @type {?} */(selectors))).map(( /**
             * @param {?} fn
             * @return {?}
             */function (fn) { return fn(state); }));
            return memoizedProjector.memoized.apply(null, args_1);
        }
        /** @type {?} */
        var args = (( /** @type {?} */(selectors))).map(( /**
         * @param {?} fn
         * @return {?}
         */function (fn) { return fn(state, props); }));
        return memoizedProjector.memoized.apply(null, __spread(args, [props]));
    }
    /**
     * @param {?} memoize
     * @param {?=} options
     * @return {?}
     */
    function createSelectorFactory(memoize, options) {
        if (options === void 0) { options = {
            stateFn: defaultStateFn,
        }; }
        return ( /**
         * @param {...?} input
         * @return {?}
         */function () {
            var input = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                input[_i] = arguments[_i];
            }
            /** @type {?} */
            var args = input;
            if (Array.isArray(args[0])) {
                var _a = __read(args), head = _a[0], tail = _a.slice(1);
                args = __spread(head, tail);
            }
            /** @type {?} */
            var selectors = args.slice(0, args.length - 1);
            /** @type {?} */
            var projector = args[args.length - 1];
            /** @type {?} */
            var memoizedSelectors = selectors.filter(( /**
             * @param {?} selector
             * @return {?}
             */function (selector) { return selector.release && typeof selector.release === 'function'; }));
            /** @type {?} */
            var memoizedProjector = memoize(( /**
             * @param {...?} selectors
             * @return {?}
             */function () {
                var selectors = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    selectors[_i] = arguments[_i];
                }
                return projector.apply(null, selectors);
            }));
            /** @type {?} */
            var memoizedState = defaultMemoize(( /**
             * @param {?} state
             * @param {?} props
             * @return {?}
             */function (state, props) {
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
                memoizedSelectors.forEach(( /**
                 * @param {?} selector
                 * @return {?}
                 */function (selector) { return selector.release(); }));
            }
            return Object.assign(memoizedState.memoized, {
                release: release,
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
        return createSelector(( /**
         * @param {?} state
         * @return {?}
         */function (state) {
            /** @type {?} */
            var featureState = state[featureName];
            if (!isNgrxMockEnvironment() && ngCore.isDevMode() && !(featureName in state)) {
                console.warn("@ngrx/store: The feature name \"" + featureName + "\" does " +
                    'not exist in the state, therefore createFeatureSelector ' +
                    'cannot access it.  Be sure it is imported in a loaded module ' +
                    ("using StoreModule.forRoot('" + featureName + "', ...) or ") +
                    ("StoreModule.forFeature('" + featureName + "', ...).  If the default ") +
                    'state is intended to be undefined, as is the case with router ' +
                    'state, this development-only warning message can be ignored.');
            }
            return featureState;
        }), ( /**
         * @param {?} featureState
         * @return {?}
         */function (featureState) { return featureState; }));
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/meta-reducers/utils.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var RUNTIME_CHECK_URL = 'https://ngrx.io/guide/store/configuration/runtime-checks';
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
        var targetPrototype = Object.getPrototypeOf(target);
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
        return ( /**
         * @param {?} state
         * @param {?} action
         * @return {?}
         */function (state, action) {
            /** @type {?} */
            var act = checks.action(action) ? freeze(action) : action;
            /** @type {?} */
            var nextState = reducer(state, act);
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
        var targetIsFunction = isFunction(target);
        Object.getOwnPropertyNames(target).forEach(( /**
         * @param {?} prop
         * @return {?}
         */function (prop) {
            // Ignore Ivy properties, ref: https://github.com/ngrx/platform/issues/2109#issuecomment-582689060
            if (prop.startsWith('ɵ')) {
                return;
            }
            if (hasOwnProperty(target, prop) &&
                (targetIsFunction
                    ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments'
                    : true)) {
                /** @type {?} */
                var propValue = target[prop];
                if ((isObjectLike(propValue) || isFunction(propValue)) &&
                    !Object.isFrozen(propValue)) {
                    freeze(propValue);
                }
            }
        }));
        return target;
    }

    /**
     * @param {?} reducer
     * @param {?} checks
     * @return {?}
     */
    function serializationCheckMetaReducer(reducer, checks) {
        return ( /**
         * @param {?} state
         * @param {?} action
         * @return {?}
         */function (state, action) {
            if (checks.action(action)) {
                /** @type {?} */
                var unserializableAction = getUnserializable(action);
                throwIfUnserializable(unserializableAction, 'action');
            }
            /** @type {?} */
            var nextState = reducer(state, action);
            if (checks.state()) {
                /** @type {?} */
                var unserializableState = getUnserializable(nextState);
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
    function getUnserializable(target, path) {
        if (path === void 0) { path = []; }
        // Guard against undefined and null, e.g. a reducer that returns undefined
        if ((isUndefined(target) || isNull(target)) && path.length === 0) {
            return {
                path: ['root'],
                value: target,
            };
        }
        /** @type {?} */
        var keys = Object.keys(target);
        return keys.reduce(( /**
         * @param {?} result
         * @param {?} key
         * @return {?}
         */function (result, key) {
            if (result) {
                return result;
            }
            /** @type {?} */
            var value = (( /** @type {?} */(target)))[key];
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
                return getUnserializable(value, __spread(path, [key]));
            }
            return {
                path: __spread(path, [key]),
                value: value,
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
        var unserializablePath = unserializable.path.join('.');
        /** @type {?} */
        var error = new Error("Detected unserializable " + context + " at \"" + unserializablePath + "\". " + RUNTIME_CHECK_URL + "#strict" + context + "serializability");
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
        return ( /**
         * @param {?} state
         * @param {?} action
         * @return {?}
         */function (state, action) {
            if (checks.action(action) && !ngCore.NgZone.isInAngularZone()) {
                throw new Error("Action '" + action.type + "' running outside NgZone. " + RUNTIME_CHECK_URL + "#strictactionwithinngzone");
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
     * @param {?=} runtimeChecks
     * @return {?}
     */
    function createActiveRuntimeChecks(runtimeChecks) {
        if (ngCore.isDevMode()) {
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
    function createSerializationCheckMetaReducer(_a) {
        var strictActionSerializability = _a.strictActionSerializability, strictStateSerializability = _a.strictStateSerializability;
        return ( /**
         * @param {?} reducer
         * @return {?}
         */function (reducer) { return strictActionSerializability || strictStateSerializability
            ? serializationCheckMetaReducer(reducer, {
                action: ( /**
                 * @param {?} action
                 * @return {?}
                 */function (action) { return strictActionSerializability && !ignoreNgrxAction(action); }),
                state: ( /**
                 * @return {?}
                 */function () { return strictStateSerializability; }),
            })
            : reducer; });
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    function createImmutabilityCheckMetaReducer(_a) {
        var strictActionImmutability = _a.strictActionImmutability, strictStateImmutability = _a.strictStateImmutability;
        return ( /**
         * @param {?} reducer
         * @return {?}
         */function (reducer) { return strictActionImmutability || strictStateImmutability
            ? immutabilityCheckMetaReducer(reducer, {
                action: ( /**
                 * @param {?} action
                 * @return {?}
                 */function (action) { return strictActionImmutability && !ignoreNgrxAction(action); }),
                state: ( /**
                 * @return {?}
                 */function () { return strictStateImmutability; }),
            })
            : reducer; });
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
    function createInNgZoneCheckMetaReducer(_a) {
        var strictActionWithinNgZone = _a.strictActionWithinNgZone;
        return ( /**
         * @param {?} reducer
         * @return {?}
         */function (reducer) { return strictActionWithinNgZone
            ? inNgZoneAssertMetaReducer(reducer, {
                action: ( /**
                 * @param {?} action
                 * @return {?}
                 */function (action) { return strictActionWithinNgZone && !ignoreNgrxAction(action); }),
            })
            : reducer; });
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
        var duplicates = Object.entries(REGISTERED_ACTION_TYPES)
            .filter(( /**
     * @param {?} __0
     * @return {?}
     */function (_a) {
            var _b = __read(_a, 2), registrations = _b[1];
            return registrations > 1;
        }))
            .map(( /**
     * @param {?} __0
     * @return {?}
     */function (_a) {
            var _b = __read(_a, 1), type = _b[0];
            return type;
        }));
        if (duplicates.length) {
            throw new Error("Action types are registered more than once, " + duplicates
                .map(( /**
         * @param {?} type
         * @return {?}
         */function (type) { return "\"" + type + "\""; }))
                .join(', ') + ". " + RUNTIME_CHECK_URL + "#strictactiontypeuniqueness");
        }
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/store_module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var StoreRootModule = /** @class */ (function () {
        /**
         * @param {?} actions$
         * @param {?} reducer$
         * @param {?} scannedActions$
         * @param {?} store
         * @param {?} guard
         * @param {?} actionCheck
         */
        function StoreRootModule(actions$, reducer$, scannedActions$, store, guard, actionCheck) {
        }
        return StoreRootModule;
    }());
    StoreRootModule.decorators = [
        { type: ngCore.NgModule, args: [{},] }
    ];
    /** @nocollapse */
    StoreRootModule.ctorParameters = function () { return [
        { type: ActionsSubject },
        { type: ReducerObservable },
        { type: ScannedActionsSubject },
        { type: Store },
        { type: undefined, decorators: [{ type: ngCore.Optional }, { type: ngCore.Inject, args: [_ROOT_STORE_GUARD,] }] },
        { type: undefined, decorators: [{ type: ngCore.Optional }, { type: ngCore.Inject, args: [_ACTION_TYPE_UNIQUENESS_CHECK,] }] }
    ]; };
    var StoreFeatureModule = /** @class */ (function () {
        /**
         * @param {?} features
         * @param {?} featureReducers
         * @param {?} reducerManager
         * @param {?} root
         * @param {?} actionCheck
         */
        function StoreFeatureModule(features, featureReducers, reducerManager, root, actionCheck) {
            this.features = features;
            this.featureReducers = featureReducers;
            this.reducerManager = reducerManager;
            /** @type {?} */
            var feats = features.map(( /**
             * @param {?} feature
             * @param {?} index
             * @return {?}
             */function (feature, index) {
                /** @type {?} */
                var featureReducerCollection = featureReducers.shift();
                /** @type {?} */
                var reducers = ( /** @type {?} */(featureReducerCollection /*TODO(#823)*/))[index];
                return Object.assign(Object.assign({}, feature), { reducers: reducers, initialState: _initialStateFactory(feature.initialState) });
            }));
            reducerManager.addFeatures(feats);
        }
        /**
         * @return {?}
         */
        StoreFeatureModule.prototype.ngOnDestroy = function () {
            this.reducerManager.removeFeatures(this.features);
        };
        return StoreFeatureModule;
    }());
    StoreFeatureModule.decorators = [
        { type: ngCore.NgModule, args: [{},] }
    ];
    /** @nocollapse */
    StoreFeatureModule.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: ngCore.Inject, args: [_STORE_FEATURES,] }] },
        { type: Array, decorators: [{ type: ngCore.Inject, args: [FEATURE_REDUCERS,] }] },
        { type: ReducerManager },
        { type: StoreRootModule },
        { type: undefined, decorators: [{ type: ngCore.Optional }, { type: ngCore.Inject, args: [_ACTION_TYPE_UNIQUENESS_CHECK,] }] }
    ]; };
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
    var StoreModule = /** @class */ (function () {
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
                    {
                        provide: _ROOT_STORE_GUARD,
                        useFactory: _provideForRootGuard,
                        deps: [[Store, new ngCore.Optional(), new ngCore.SkipSelf()]],
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
                        useExisting: reducers instanceof ngCore.InjectionToken ? reducers : _INITIAL_REDUCERS,
                    },
                    {
                        provide: INITIAL_REDUCERS,
                        deps: [ngCore.Injector, _INITIAL_REDUCERS, [new ngCore.Inject(_STORE_REDUCERS)]],
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
                        provide: _FEATURE_CONFIGS,
                        multi: true,
                        useValue: config,
                    },
                    {
                        provide: STORE_FEATURES,
                        multi: true,
                        useValue: {
                            key: featureName,
                            reducerFactory: !(config instanceof ngCore.InjectionToken) && config.reducerFactory
                                ? config.reducerFactory
                                : combineReducers,
                            metaReducers: !(config instanceof ngCore.InjectionToken) && config.metaReducers
                                ? config.metaReducers
                                : [],
                            initialState: !(config instanceof ngCore.InjectionToken) && config.initialState
                                ? config.initialState
                                : undefined,
                        },
                    },
                    {
                        provide: _STORE_FEATURES,
                        deps: [ngCore.Injector, _FEATURE_CONFIGS, STORE_FEATURES],
                        useFactory: _createFeatureStore,
                    },
                    { provide: _FEATURE_REDUCERS, multi: true, useValue: reducers },
                    {
                        provide: _FEATURE_REDUCERS_TOKEN,
                        multi: true,
                        useExisting: reducers instanceof ngCore.InjectionToken ? reducers : _FEATURE_REDUCERS,
                    },
                    {
                        provide: FEATURE_REDUCERS,
                        multi: true,
                        deps: [
                            ngCore.Injector,
                            _FEATURE_REDUCERS,
                            [new ngCore.Inject(_FEATURE_REDUCERS_TOKEN)],
                        ],
                        useFactory: _createFeatureReducers,
                    },
                    checkForActionTypeUniqueness(),
                ],
            };
        };
        return StoreModule;
    }());
    StoreModule.decorators = [
        { type: ngCore.NgModule, args: [{},] }
    ];
    /**
     * @param {?} injector
     * @param {?} reducers
     * @return {?}
     */
    function _createStoreReducers(injector, reducers) {
        return reducers instanceof ngCore.InjectionToken ? injector.get(reducers) : reducers;
    }
    /**
     * @param {?} injector
     * @param {?} configs
     * @param {?} featureStores
     * @return {?}
     */
    function _createFeatureStore(injector, configs, featureStores) {
        return featureStores.map(( /**
         * @param {?} feat
         * @param {?} index
         * @return {?}
         */function (feat, index) {
            if (configs[index] instanceof ngCore.InjectionToken) {
                /** @type {?} */
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
        }));
    }
    /**
     * @param {?} injector
     * @param {?} reducerCollection
     * @return {?}
     */
    function _createFeatureReducers(injector, reducerCollection) {
        /** @type {?} */
        var reducers = reducerCollection.map(( /**
         * @param {?} reducer
         * @return {?}
         */function (reducer) {
            return reducer instanceof ngCore.InjectionToken ? injector.get(reducer) : reducer;
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
            throw new TypeError("StoreModule.forRoot() called twice. Feature modules should use StoreModule.forFeature() instead.");
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
    function on() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        /** @type {?} */
        var reducer = ( /** @type {?} */(args.pop()));
        /** @type {?} */
        var types = args.reduce(( /**
         * @param {?} result
         * @param {?} creator
         * @return {?}
         */function (result, creator) { return __spread(result, [(( /** @type {?} */(creator))).type]); }), ( /** @type {?} */([])));
        return { reducer: reducer, types: types };
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
    function createReducer(initialState) {
        var e_1, _a;
        var ons = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            ons[_i - 1] = arguments[_i];
        }
        /** @type {?} */
        var map = new Map();
        var _loop_1 = function (on_1) {
            var e_2, _a;
            var _loop_2 = function (type) {
                if (map.has(type)) {
                    /** @type {?} */
                    var existingReducer_1 = ( /** @type {?} */(map.get(type)));
                    /** @type {?} */
                    var newReducer = ( /**
                     * @param {?} state
                     * @param {?} action
                     * @return {?}
                     */function (state, action) { return on_1.reducer(existingReducer_1(state, action), action); });
                    map.set(type, newReducer);
                }
                else {
                    map.set(type, on_1.reducer);
                }
            };
            try {
                for (var _b = (e_2 = void 0, __values(on_1.types)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
            for (var ons_1 = __values(ons), ons_1_1 = ons_1.next(); !ons_1_1.done; ons_1_1 = ons_1.next()) {
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
        return ( /**
         * @param {?=} state
         * @param {?=} action
         * @return {?}
         */function (state, action) {
            if (state === void 0) { state = initialState; }
            /** @type {?} */
            var reducer = map.get(action.type);
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

    exports.ActionsSubject = ActionsSubject;
    exports.FEATURE_REDUCERS = FEATURE_REDUCERS;
    exports.INIT = INIT;
    exports.INITIAL_REDUCERS = INITIAL_REDUCERS;
    exports.INITIAL_STATE = INITIAL_STATE;
    exports.META_REDUCERS = META_REDUCERS;
    exports.REDUCER_FACTORY = REDUCER_FACTORY;
    exports.ReducerManager = ReducerManager;
    exports.ReducerManagerDispatcher = ReducerManagerDispatcher;
    exports.ReducerObservable = ReducerObservable;
    exports.STORE_FEATURES = STORE_FEATURES;
    exports.ScannedActionsSubject = ScannedActionsSubject;
    exports.State = State;
    exports.StateObservable = StateObservable;
    exports.Store = Store;
    exports.StoreFeatureModule = StoreFeatureModule;
    exports.StoreModule = StoreModule;
    exports.StoreRootModule = StoreRootModule;
    exports.UPDATE = UPDATE;
    exports.USER_PROVIDED_META_REDUCERS = USER_PROVIDED_META_REDUCERS;
    exports.USER_RUNTIME_CHECKS = USER_RUNTIME_CHECKS;
    exports.combineReducers = combineReducers;
    exports.compose = compose;
    exports.createAction = createAction;
    exports.createFeatureSelector = createFeatureSelector;
    exports.createReducer = createReducer;
    exports.createReducerFactory = createReducerFactory;
    exports.createSelector = createSelector;
    exports.createSelectorFactory = createSelectorFactory;
    exports.defaultMemoize = defaultMemoize;
    exports.defaultStateFn = defaultStateFn;
    exports.isNgrxMockEnvironment = isNgrxMockEnvironment;
    exports.on = on;
    exports.props = props;
    exports.reduceState = reduceState;
    exports.resultMemoize = resultMemoize;
    exports.select = select;
    exports.setNgrxMockEnvironment = setNgrxMockEnvironment;
    exports.union = union;
    exports.ɵb = STORE_PROVIDERS;
    exports.ɵba = createActiveRuntimeChecks;
    exports.ɵbb = createSerializationCheckMetaReducer;
    exports.ɵbc = createImmutabilityCheckMetaReducer;
    exports.ɵbd = createInNgZoneCheckMetaReducer;
    exports.ɵbe = provideRuntimeChecks;
    exports.ɵbf = checkForActionTypeUniqueness;
    exports.ɵbg = _runtimeChecksFactory;
    exports.ɵbh = _actionTypeUniquenessCheck;
    exports.ɵc = ACTIONS_SUBJECT_PROVIDERS;
    exports.ɵd = REDUCER_MANAGER_PROVIDERS;
    exports.ɵe = SCANNED_ACTIONS_SUBJECT_PROVIDERS;
    exports.ɵf = isEqualCheck;
    exports.ɵg = STATE_PROVIDERS;
    exports.ɵh = _ROOT_STORE_GUARD;
    exports.ɵi = _INITIAL_STATE;
    exports.ɵj = _REDUCER_FACTORY;
    exports.ɵk = _INITIAL_REDUCERS;
    exports.ɵl = _STORE_REDUCERS;
    exports.ɵm = _FEATURE_REDUCERS;
    exports.ɵn = _FEATURE_CONFIGS;
    exports.ɵo = _STORE_FEATURES;
    exports.ɵp = _FEATURE_REDUCERS_TOKEN;
    exports.ɵq = _RESOLVED_META_REDUCERS;
    exports.ɵr = _USER_RUNTIME_CHECKS;
    exports.ɵs = _ACTIVE_RUNTIME_CHECKS;
    exports.ɵt = _ACTION_TYPE_UNIQUENESS_CHECK;
    exports.ɵu = _createStoreReducers;
    exports.ɵv = _createFeatureStore;
    exports.ɵw = _createFeatureReducers;
    exports.ɵx = _initialStateFactory;
    exports.ɵy = _concatMetaReducers;
    exports.ɵz = _provideForRootGuard;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngrx-store.umd.js.map
