(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@ngrx/store'), require('@angular/core/testing')) :
    typeof define === 'function' && define.amd ? define('@ngrx/store/testing', ['exports', '@angular/core', 'rxjs', '@ngrx/store', '@angular/core/testing'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ngrx = global.ngrx || {}, global.ngrx.store = global.ngrx.store || {}, global.ngrx.store.testing = {}), global.ng.core, global.rxjs, global.ngrx.store, global.ng.core.testing));
}(this, (function (exports, core, rxjs, store, testing) { 'use strict';

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

    var MockState = /** @class */ (function (_super) {
        __extends(MockState, _super);
        function MockState() {
            return _super.call(this, {}) || this;
        }
        return MockState;
    }(rxjs.BehaviorSubject));
    MockState.decorators = [
        { type: core.Injectable }
    ];
    /** @nocollapse */
    MockState.ctorParameters = function () { return []; };

    var MOCK_SELECTORS = new core.InjectionToken('@ngrx/store Mock Selectors');

    if (typeof afterEach === 'function') {
        afterEach(function () {
            try {
                var mockStore = testing.TestBed.inject(MockStore);
                if (mockStore) {
                    mockStore.resetSelectors();
                }
            }
            catch (_a) { }
        });
    }
    var MockStore = /** @class */ (function (_super) {
        __extends(MockStore, _super);
        function MockStore(state$, actionsObserver, reducerManager, initialState, mockSelectors) {
            var e_1, _b;
            if (mockSelectors === void 0) { mockSelectors = []; }
            var _this = _super.call(this, state$, actionsObserver, reducerManager) || this;
            _this.state$ = state$;
            _this.initialState = initialState;
            _this.selectors = new Map();
            _this.resetSelectors();
            _this.setState(_this.initialState);
            _this.scannedActions$ = actionsObserver.asObservable();
            try {
                for (var mockSelectors_1 = __values(mockSelectors), mockSelectors_1_1 = mockSelectors_1.next(); !mockSelectors_1_1.done; mockSelectors_1_1 = mockSelectors_1.next()) {
                    var mockSelector = mockSelectors_1_1.value;
                    _this.overrideSelector(mockSelector.selector, mockSelector.value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (mockSelectors_1_1 && !mockSelectors_1_1.done && (_b = mockSelectors_1.return)) _b.call(mockSelectors_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return _this;
        }
        MockStore.prototype.setState = function (nextState) {
            this.state$.next(nextState);
            this.lastState = nextState;
        };
        MockStore.prototype.overrideSelector = function (selector, value) {
            this.selectors.set(selector, value);
            var resultSelector = typeof selector === 'string'
                ? store.createSelector(function () { }, function () { return value; })
                : selector;
            resultSelector.setResult(value);
            return resultSelector;
        };
        MockStore.prototype.resetSelectors = function () {
            var e_2, _b;
            try {
                for (var _c = __values(this.selectors.keys()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var selector = _d.value;
                    if (typeof selector !== 'string') {
                        selector.release();
                        selector.clearResult();
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            this.selectors.clear();
        };
        MockStore.prototype.select = function (selector, prop) {
            if (typeof selector === 'string' && this.selectors.has(selector)) {
                return new rxjs.BehaviorSubject(this.selectors.get(selector)).asObservable();
            }
            return _super.prototype.select.call(this, selector, prop);
        };
        MockStore.prototype.addReducer = function () {
            /* noop */
        };
        MockStore.prototype.removeReducer = function () {
            /* noop */
        };
        /**
         * Refreshes the existing state.
         */
        MockStore.prototype.refreshState = function () {
            if (this.lastState)
                this.setState(Object.assign({}, this.lastState));
        };
        return MockStore;
    }(store.Store));
    MockStore.decorators = [
        { type: core.Injectable }
    ];
    /** @nocollapse */
    MockStore.ctorParameters = function () { return [
        { type: MockState },
        { type: store.ActionsSubject },
        { type: store.ReducerManager },
        { type: undefined, decorators: [{ type: core.Inject, args: [store.INITIAL_STATE,] }] },
        { type: Array, decorators: [{ type: core.Inject, args: [MOCK_SELECTORS,] }] }
    ]; };

    var MockReducerManager = /** @class */ (function (_super) {
        __extends(MockReducerManager, _super);
        function MockReducerManager() {
            return _super.call(this, function () { return undefined; }) || this;
        }
        MockReducerManager.prototype.addFeature = function (feature) {
            /* noop */
        };
        MockReducerManager.prototype.addFeatures = function (feature) {
            /* noop */
        };
        MockReducerManager.prototype.removeFeature = function (feature) {
            /* noop */
        };
        MockReducerManager.prototype.removeFeatures = function (features) {
            /* noop */
        };
        MockReducerManager.prototype.addReducer = function (key, reducer) {
            /* noop */
        };
        MockReducerManager.prototype.addReducers = function (reducers) {
            /* noop */
        };
        MockReducerManager.prototype.removeReducer = function (featureKey) {
            /* noop */
        };
        MockReducerManager.prototype.removeReducers = function (featureKeys) {
            /* noop */
        };
        return MockReducerManager;
    }(rxjs.BehaviorSubject));
    MockReducerManager.decorators = [
        { type: core.Injectable }
    ];
    /** @nocollapse */
    MockReducerManager.ctorParameters = function () { return []; };

    /**
     * @description
     * Creates mock store providers.
     *
     * @param config `MockStoreConfig<T>` to provide the values for `INITIAL_STATE` and `MOCK_SELECTORS` tokens.
     * By default, `initialState` and `selectors` are not defined.
     * @returns Mock store providers that can be used with both `TestBed.configureTestingModule` and `Injector.create`.
     *
     * @usageNotes
     *
     * **With `TestBed.configureTestingModule`**
     *
     * ```typescript
     * describe('Books Component', () => {
     *   let store: MockStore;
     *
     *   beforeEach(() => {
     *     TestBed.configureTestingModule({
     *       providers: [
     *         provideMockStore({
     *           initialState: { books: { entities: [] } },
     *           selectors: [
     *             { selector: selectAllBooks, value: ['Book 1', 'Book 2'] },
     *             { selector: selectVisibleBooks, value: ['Book 1'] },
     *           ],
     *         }),
     *       ],
     *     });
     *
     *     store = TestBed.inject(MockStore);
     *   });
     * });
     * ```
     *
     * **With `Injector.create`**
     *
     * ```typescript
     * describe('Counter Component', () => {
     *   let injector: Injector;
     *   let store: MockStore;
     *
     *   beforeEach(() => {
     *     injector = Injector.create({
     *       providers: [
     *         provideMockStore({ initialState: { counter: 0 } }),
     *       ],
     *     });
     *     store = injector.get(MockStore);
     *   });
     * });
     * ```
     */
    function provideMockStore(config) {
        if (config === void 0) { config = {}; }
        store.setNgrxMockEnvironment(true);
        return [
            {
                provide: store.ActionsSubject,
                useFactory: function () { return new store.ActionsSubject(); },
                deps: [],
            },
            { provide: MockState, useFactory: function () { return new MockState(); }, deps: [] },
            {
                provide: MockReducerManager,
                useFactory: function () { return new MockReducerManager(); },
                deps: [],
            },
            { provide: store.INITIAL_STATE, useValue: config.initialState || {} },
            { provide: MOCK_SELECTORS, useValue: config.selectors },
            { provide: store.StateObservable, useExisting: MockState },
            { provide: store.ReducerManager, useExisting: MockReducerManager },
            {
                provide: MockStore,
                useFactory: mockStoreFactory,
                deps: [
                    MockState,
                    store.ActionsSubject,
                    store.ReducerManager,
                    store.INITIAL_STATE,
                    MOCK_SELECTORS,
                ],
            },
            { provide: store.Store, useExisting: MockStore },
        ];
    }
    function mockStoreFactory(mockState, actionsSubject, reducerManager, initialState, mockSelectors) {
        return new MockStore(mockState, actionsSubject, reducerManager, initialState, mockSelectors);
    }
    /**
     * @description
     * Creates mock store with all necessary dependencies outside of the `TestBed`.
     *
     * @param config `MockStoreConfig<T>` to provide the values for `INITIAL_STATE` and `MOCK_SELECTORS` tokens.
     * By default, `initialState` and `selectors` are not defined.
     * @returns `MockStore<T>`
     *
     * @usageNotes
     *
     * ```typescript
     * describe('Books Effects', () => {
     *   let store: MockStore;
     *
     *   beforeEach(() => {
     *     store = getMockStore({
     *       initialState: { books: { entities: ['Book 1', 'Book 2', 'Book 3'] } },
     *       selectors: [
     *         { selector: selectAllBooks, value: ['Book 1', 'Book 2'] },
     *         { selector: selectVisibleBooks, value: ['Book 1'] },
     *       ],
     *     });
     *   });
     * });
     * ```
     */
    function getMockStore(config) {
        if (config === void 0) { config = {}; }
        var injector = core.Injector.create({ providers: provideMockStore(config) });
        return injector.get(MockStore);
    }

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MockReducerManager = MockReducerManager;
    exports.MockState = MockState;
    exports.MockStore = MockStore;
    exports.getMockStore = getMockStore;
    exports.provideMockStore = provideMockStore;
    exports.ɵa = MOCK_SELECTORS;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngrx-store-testing.umd.js.map
