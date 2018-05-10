/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function Action() { }
function Action_tsickle_Closure_declarations() {
    /** @type {?} */
    Action.prototype.type;
}
// unsupported: template constraints.
/**
 * @record
 * @template T, V
 */
export function ActionReducer() { }
function ActionReducer_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    (state: T | undefined, action: V): T;
    */
}
// unsupported: template constraints.
/**
 * @record
 * @template T, V
 */
export function ActionReducerFactory() { }
function ActionReducerFactory_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    (
        reducerMap: ActionReducerMap<T, V>,
        initialState?: InitialState<T>
      ): ActionReducer<T, V>;
    */
}
// unsupported: template constraints.
/**
 * @record
 * @template T, V
 */
export function StoreFeature() { }
function StoreFeature_tsickle_Closure_declarations() {
    /** @type {?} */
    StoreFeature.prototype.key;
    /** @type {?} */
    StoreFeature.prototype.reducers;
    /** @type {?} */
    StoreFeature.prototype.reducerFactory;
    /** @type {?|undefined} */
    StoreFeature.prototype.initialState;
    /** @type {?|undefined} */
    StoreFeature.prototype.metaReducers;
}
/**
 * @record
 * @template T, V
 */
export function Selector() { }
function Selector_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    (state: T): V;
    */
}
//# sourceMappingURL=models.js.map