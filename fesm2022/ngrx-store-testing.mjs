// mock_state.mjs
import { Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { BehaviorSubject } from "rxjs";
import * as i0 from "@angular/core";
var MockState = class _MockState extends BehaviorSubject {
  constructor() {
    super({});
    this.state = toSignal(this, { manualCleanup: true, requireSync: true });
  }
  static {
    this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i0, type: _MockState, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
  }
  static {
    this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i0, type: _MockState });
  }
};
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i0, type: MockState, decorators: [{
  type: Injectable
}], ctorParameters: () => [] });

// tokens.mjs
import { InjectionToken } from "@angular/core";
var MOCK_SELECTORS = new InjectionToken("@ngrx/store Mock Selectors");

// mock_store.mjs
import { Inject, Injectable as Injectable2 } from "@angular/core";
import { BehaviorSubject as BehaviorSubject2 } from "rxjs";
import { INITIAL_STATE, Store, createSelector } from "@ngrx/store";
import * as i02 from "@angular/core";
import * as i2 from "@ngrx/store";
var MockStore = class _MockStore extends Store {
  constructor(state$, actionsObserver, reducerManager, initialState, mockSelectors = []) {
    super(state$, actionsObserver, reducerManager);
    this.state$ = state$;
    this.initialState = initialState;
    this.selectors = /* @__PURE__ */ new Map();
    this.resetSelectors();
    this.setState(this.initialState);
    this.scannedActions$ = actionsObserver.asObservable();
    for (const mockSelector of mockSelectors) {
      this.overrideSelector(mockSelector.selector, mockSelector.value);
    }
  }
  setState(nextState) {
    this.state$.next(nextState);
    this.lastState = nextState;
  }
  overrideSelector(selector, value) {
    this.selectors.set(selector, value);
    const resultSelector = typeof selector === "string" ? createSelector(() => {
    }, () => value) : selector;
    resultSelector.setResult(value);
    return resultSelector;
  }
  resetSelectors() {
    for (const selector of this.selectors.keys()) {
      if (typeof selector !== "string") {
        selector.release();
        selector.clearResult();
      }
    }
    this.selectors.clear();
  }
  select(selector, prop) {
    if (typeof selector === "string" && this.selectors.has(selector)) {
      return new BehaviorSubject2(this.selectors.get(selector)).asObservable();
    }
    return super.select(selector, prop);
  }
  addReducer() {
  }
  removeReducer() {
  }
  /**
   * Refreshes the existing state.
   */
  refreshState() {
    if (this.lastState)
      this.setState({ ...this.lastState });
  }
  static {
    this.ɵfac = i02.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i02, type: _MockStore, deps: [{ token: MockState }, { token: i2.ActionsSubject }, { token: i2.ReducerManager }, { token: INITIAL_STATE }, { token: MOCK_SELECTORS }], target: i02.ɵɵFactoryTarget.Injectable });
  }
  static {
    this.ɵprov = i02.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i02, type: _MockStore });
  }
};
i02.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i02, type: MockStore, decorators: [{
  type: Injectable2
}], ctorParameters: () => [{ type: MockState }, { type: i2.ActionsSubject }, { type: i2.ReducerManager }, { type: void 0, decorators: [{
  type: Inject,
  args: [INITIAL_STATE]
}] }, { type: void 0, decorators: [{
  type: Inject,
  args: [MOCK_SELECTORS]
}] }] });

// mock_reducer_manager.mjs
import { Injectable as Injectable3 } from "@angular/core";
import { BehaviorSubject as BehaviorSubject3 } from "rxjs";
import * as i03 from "@angular/core";
var MockReducerManager = class _MockReducerManager extends BehaviorSubject3 {
  constructor() {
    super(() => void 0);
  }
  addFeature(feature) {
  }
  addFeatures(feature) {
  }
  removeFeature(feature) {
  }
  removeFeatures(features) {
  }
  addReducer(key, reducer) {
  }
  addReducers(reducers) {
  }
  removeReducer(featureKey) {
  }
  removeReducers(featureKeys) {
  }
  static {
    this.ɵfac = i03.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i03, type: _MockReducerManager, deps: [], target: i03.ɵɵFactoryTarget.Injectable });
  }
  static {
    this.ɵprov = i03.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i03, type: _MockReducerManager });
  }
};
i03.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i03, type: MockReducerManager, decorators: [{
  type: Injectable3
}], ctorParameters: () => [] });

// testing.mjs
import { Injector } from "@angular/core";
import { ActionsSubject as ActionsSubject2, INITIAL_STATE as INITIAL_STATE2, ReducerManager as ReducerManager2, StateObservable, Store as Store2, setNgrxMockEnvironment } from "@ngrx/store";
function provideMockStore(config = {}) {
  setNgrxMockEnvironment(true);
  return [
    {
      provide: ActionsSubject2,
      useFactory: () => new ActionsSubject2(),
      deps: []
    },
    { provide: MockState, useFactory: () => new MockState(), deps: [] },
    {
      provide: MockReducerManager,
      useFactory: () => new MockReducerManager(),
      deps: []
    },
    { provide: INITIAL_STATE2, useValue: config.initialState || {} },
    { provide: MOCK_SELECTORS, useValue: config.selectors },
    { provide: StateObservable, useExisting: MockState },
    { provide: ReducerManager2, useExisting: MockReducerManager },
    {
      provide: MockStore,
      useFactory: mockStoreFactory,
      deps: [
        MockState,
        ActionsSubject2,
        ReducerManager2,
        INITIAL_STATE2,
        MOCK_SELECTORS
      ]
    },
    { provide: Store2, useExisting: MockStore }
  ];
}
function mockStoreFactory(mockState, actionsSubject, reducerManager, initialState, mockSelectors) {
  return new MockStore(mockState, actionsSubject, reducerManager, initialState, mockSelectors);
}
function createMockStore(config = {}) {
  const injector = Injector.create({ providers: provideMockStore(config) });
  return injector.get(MockStore);
}
export {
  MockReducerManager,
  MockState,
  MockStore,
  createMockStore,
  provideMockStore
};
//# sourceMappingURL=ngrx-store-testing.mjs.map
