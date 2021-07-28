import { capitalize } from './helpers';
import { isPlainObject } from './meta-reducers/utils';
import { createFeatureSelector, createSelector, } from './selector';
/**
 * @description
 * A function that accepts a feature name and a feature reducer, and creates
 * a feature selector and a selector for each feature state property.
 *
 * @param featureConfig An object that contains a feature name and a feature reducer.
 * @returns An object that contains a feature name, a feature reducer,
 * a feature selector, a the selector for each feature state property.
 *
 * @usageNotes
 *
 * **With Application State**
 *
 * ```ts
 * interface AppState {
 *   products: ProductsState;
 * }
 *
 * interface ProductsState {
 *   products: Product[];
 *   selectedId: string | null;
 * }
 *
 * const initialState: ProductsState = {
 *   products: [],
 *   selectedId: null,
 * };
 *
 * // AppState is passed as a generic argument
 * const productsFeature = createFeature<AppState>({
 *   name: 'products',
 *   reducer: createReducer(
 *     initialState,
 *     on(ProductsApiActions.loadSuccess(state, { products }) => ({
 *       ...state,
 *       products,
 *     }),
 *   ),
 * });
 *
 * const {
 *   selectProductsState, // type: MemoizedSelector<AppState, ProductsState>
 *   selectProducts, // type: MemoizedSelector<AppState, Product[]>
 *   selectSelectedId, // type: MemoizedSelector<AppState, string | null>
 * } = productsFeature;
 * ```
 *
 * **Without Application State**
 *
 * ```ts
 * const productsFeature = createFeature({
 *   name: 'products',
 *   reducer: createReducer(initialState),
 * });
 *
 * const {
 *   selectProductsState, // type: MemoizedSelector<Record<string, any>, ProductsState>
 *   selectProducts, // type: MemoizedSelector<Record<string, any>, Product[]>
 *   selectSelectedId, // type: MemoizedSelector<Record<string, any, string | null>
 * } = productsFeature;
 * ```
 */
export function createFeature(featureConfig) {
    const { name, reducer } = featureConfig;
    const featureSelector = createFeatureSelector(name);
    const nestedSelectors = createNestedSelectors(featureSelector, reducer);
    return Object.assign({ name,
        reducer, [`select${capitalize(name)}State`]: featureSelector }, nestedSelectors);
}
function createNestedSelectors(featureSelector, reducer) {
    const initialState = getInitialState(reducer);
    const nestedKeys = (isPlainObject(initialState)
        ? Object.keys(initialState)
        : []);
    return nestedKeys.reduce((nestedSelectors, nestedKey) => (Object.assign(Object.assign({}, nestedSelectors), { [`select${capitalize(nestedKey)}`]: createSelector(featureSelector, (parentState) => parentState === null || parentState === void 0 ? void 0 : parentState[nestedKey]) })), {});
}
function getInitialState(reducer) {
    return reducer(undefined, { type: '@ngrx/feature/init' });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZV9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvZmVhdHVyZV9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFdkMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsY0FBYyxHQUVmLE1BQU0sWUFBWSxDQUFDO0FBc0JwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZERztBQUNILE1BQU0sVUFBVSxhQUFhLENBSzNCLGFBQzJDO0lBRTNDLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsYUFBYSxDQUFDO0lBQ3hDLE1BQU0sZUFBZSxHQUFHLHFCQUFxQixDQUF5QixJQUFJLENBQUMsQ0FBQztJQUM1RSxNQUFNLGVBQWUsR0FBRyxxQkFBcUIsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFeEUsT0FBUSxnQkFDTixJQUFJO1FBQ0osT0FBTyxFQUNQLENBQUMsU0FBUyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLGVBQWUsSUFDaEQsZUFBZSxDQUN5QyxDQUFDO0FBQ2hFLENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUk1QixlQUF5RCxFQUN6RCxPQUFvQztJQUVwQyxNQUFNLFlBQVksR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO1FBQzdDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMzQixDQUFDLENBQUMsRUFBRSxDQUF1QyxDQUFDO0lBRTlDLE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FDdEIsQ0FBQyxlQUFlLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxpQ0FDM0IsZUFBZSxLQUNsQixDQUFDLFNBQVMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxjQUFjLENBQ2hELGVBQWUsRUFDZixDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFHLFNBQVMsQ0FBQyxDQUMxQyxJQUNELEVBQ0YsRUFBNkMsQ0FDOUMsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FDdEIsT0FBb0M7SUFFcEMsT0FBTyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQztBQUM1RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2FwaXRhbGl6ZSB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgeyBBY3Rpb25SZWR1Y2VyIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgaXNQbGFpbk9iamVjdCB9IGZyb20gJy4vbWV0YS1yZWR1Y2Vycy91dGlscyc7XG5pbXBvcnQge1xuICBjcmVhdGVGZWF0dXJlU2VsZWN0b3IsXG4gIGNyZWF0ZVNlbGVjdG9yLFxuICBNZW1vaXplZFNlbGVjdG9yLFxufSBmcm9tICcuL3NlbGVjdG9yJztcbmltcG9ydCB7IEZlYXR1cmVTZWxlY3RvciwgTmVzdGVkU2VsZWN0b3JzIH0gZnJvbSAnLi9mZWF0dXJlX2NyZWF0b3JfbW9kZWxzJztcblxuZXhwb3J0IHR5cGUgRmVhdHVyZTxcbiAgQXBwU3RhdGUgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICBGZWF0dXJlTmFtZSBleHRlbmRzIGtleW9mIEFwcFN0YXRlICYgc3RyaW5nLFxuICBGZWF0dXJlU3RhdGUgZXh0ZW5kcyBBcHBTdGF0ZVtGZWF0dXJlTmFtZV1cbj4gPSBGZWF0dXJlQ29uZmlnPEZlYXR1cmVOYW1lLCBGZWF0dXJlU3RhdGU+ICZcbiAgRmVhdHVyZVNlbGVjdG9yPEFwcFN0YXRlLCBGZWF0dXJlTmFtZSwgRmVhdHVyZVN0YXRlPiAmXG4gIE5lc3RlZFNlbGVjdG9yczxBcHBTdGF0ZSwgRmVhdHVyZVN0YXRlPjtcblxuZXhwb3J0IGludGVyZmFjZSBGZWF0dXJlQ29uZmlnPEZlYXR1cmVOYW1lIGV4dGVuZHMgc3RyaW5nLCBGZWF0dXJlU3RhdGU+IHtcbiAgbmFtZTogRmVhdHVyZU5hbWU7XG4gIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8RmVhdHVyZVN0YXRlPjtcbn1cblxudHlwZSBOb3RBbGxvd2VkRmVhdHVyZVN0YXRlQ2hlY2s8XG4gIEZlYXR1cmVTdGF0ZVxuPiA9IEZlYXR1cmVTdGF0ZSBleHRlbmRzIFJlcXVpcmVkPEZlYXR1cmVTdGF0ZT5cbiAgPyB1bmtub3duXG4gIDogJ29wdGlvbmFsIHByb3BlcnRpZXMgYXJlIG5vdCBhbGxvd2VkIGluIHRoZSBmZWF0dXJlIHN0YXRlJztcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGEgZmVhdHVyZSBuYW1lIGFuZCBhIGZlYXR1cmUgcmVkdWNlciwgYW5kIGNyZWF0ZXNcbiAqIGEgZmVhdHVyZSBzZWxlY3RvciBhbmQgYSBzZWxlY3RvciBmb3IgZWFjaCBmZWF0dXJlIHN0YXRlIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSBmZWF0dXJlQ29uZmlnIEFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgZmVhdHVyZSBuYW1lIGFuZCBhIGZlYXR1cmUgcmVkdWNlci5cbiAqIEByZXR1cm5zIEFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgZmVhdHVyZSBuYW1lLCBhIGZlYXR1cmUgcmVkdWNlcixcbiAqIGEgZmVhdHVyZSBzZWxlY3RvciwgYSB0aGUgc2VsZWN0b3IgZm9yIGVhY2ggZmVhdHVyZSBzdGF0ZSBwcm9wZXJ0eS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqICoqV2l0aCBBcHBsaWNhdGlvbiBTdGF0ZSoqXG4gKlxuICogYGBgdHNcbiAqIGludGVyZmFjZSBBcHBTdGF0ZSB7XG4gKiAgIHByb2R1Y3RzOiBQcm9kdWN0c1N0YXRlO1xuICogfVxuICpcbiAqIGludGVyZmFjZSBQcm9kdWN0c1N0YXRlIHtcbiAqICAgcHJvZHVjdHM6IFByb2R1Y3RbXTtcbiAqICAgc2VsZWN0ZWRJZDogc3RyaW5nIHwgbnVsbDtcbiAqIH1cbiAqXG4gKiBjb25zdCBpbml0aWFsU3RhdGU6IFByb2R1Y3RzU3RhdGUgPSB7XG4gKiAgIHByb2R1Y3RzOiBbXSxcbiAqICAgc2VsZWN0ZWRJZDogbnVsbCxcbiAqIH07XG4gKlxuICogLy8gQXBwU3RhdGUgaXMgcGFzc2VkIGFzIGEgZ2VuZXJpYyBhcmd1bWVudFxuICogY29uc3QgcHJvZHVjdHNGZWF0dXJlID0gY3JlYXRlRmVhdHVyZTxBcHBTdGF0ZT4oe1xuICogICBuYW1lOiAncHJvZHVjdHMnLFxuICogICByZWR1Y2VyOiBjcmVhdGVSZWR1Y2VyKFxuICogICAgIGluaXRpYWxTdGF0ZSxcbiAqICAgICBvbihQcm9kdWN0c0FwaUFjdGlvbnMubG9hZFN1Y2Nlc3Moc3RhdGUsIHsgcHJvZHVjdHMgfSkgPT4gKHtcbiAqICAgICAgIC4uLnN0YXRlLFxuICogICAgICAgcHJvZHVjdHMsXG4gKiAgICAgfSksXG4gKiAgICksXG4gKiB9KTtcbiAqXG4gKiBjb25zdCB7XG4gKiAgIHNlbGVjdFByb2R1Y3RzU3RhdGUsIC8vIHR5cGU6IE1lbW9pemVkU2VsZWN0b3I8QXBwU3RhdGUsIFByb2R1Y3RzU3RhdGU+XG4gKiAgIHNlbGVjdFByb2R1Y3RzLCAvLyB0eXBlOiBNZW1vaXplZFNlbGVjdG9yPEFwcFN0YXRlLCBQcm9kdWN0W10+XG4gKiAgIHNlbGVjdFNlbGVjdGVkSWQsIC8vIHR5cGU6IE1lbW9pemVkU2VsZWN0b3I8QXBwU3RhdGUsIHN0cmluZyB8IG51bGw+XG4gKiB9ID0gcHJvZHVjdHNGZWF0dXJlO1xuICogYGBgXG4gKlxuICogKipXaXRob3V0IEFwcGxpY2F0aW9uIFN0YXRlKipcbiAqXG4gKiBgYGB0c1xuICogY29uc3QgcHJvZHVjdHNGZWF0dXJlID0gY3JlYXRlRmVhdHVyZSh7XG4gKiAgIG5hbWU6ICdwcm9kdWN0cycsXG4gKiAgIHJlZHVjZXI6IGNyZWF0ZVJlZHVjZXIoaW5pdGlhbFN0YXRlKSxcbiAqIH0pO1xuICpcbiAqIGNvbnN0IHtcbiAqICAgc2VsZWN0UHJvZHVjdHNTdGF0ZSwgLy8gdHlwZTogTWVtb2l6ZWRTZWxlY3RvcjxSZWNvcmQ8c3RyaW5nLCBhbnk+LCBQcm9kdWN0c1N0YXRlPlxuICogICBzZWxlY3RQcm9kdWN0cywgLy8gdHlwZTogTWVtb2l6ZWRTZWxlY3RvcjxSZWNvcmQ8c3RyaW5nLCBhbnk+LCBQcm9kdWN0W10+XG4gKiAgIHNlbGVjdFNlbGVjdGVkSWQsIC8vIHR5cGU6IE1lbW9pemVkU2VsZWN0b3I8UmVjb3JkPHN0cmluZywgYW55LCBzdHJpbmcgfCBudWxsPlxuICogfSA9IHByb2R1Y3RzRmVhdHVyZTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmVhdHVyZTxcbiAgQXBwU3RhdGUgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICBGZWF0dXJlTmFtZSBleHRlbmRzIGtleW9mIEFwcFN0YXRlICYgc3RyaW5nID0ga2V5b2YgQXBwU3RhdGUgJiBzdHJpbmcsXG4gIEZlYXR1cmVTdGF0ZSBleHRlbmRzIEFwcFN0YXRlW0ZlYXR1cmVOYW1lXSA9IEFwcFN0YXRlW0ZlYXR1cmVOYW1lXVxuPihcbiAgZmVhdHVyZUNvbmZpZzogRmVhdHVyZUNvbmZpZzxGZWF0dXJlTmFtZSwgRmVhdHVyZVN0YXRlPiAmXG4gICAgTm90QWxsb3dlZEZlYXR1cmVTdGF0ZUNoZWNrPEZlYXR1cmVTdGF0ZT5cbik6IEZlYXR1cmU8QXBwU3RhdGUsIEZlYXR1cmVOYW1lLCBGZWF0dXJlU3RhdGU+IHtcbiAgY29uc3QgeyBuYW1lLCByZWR1Y2VyIH0gPSBmZWF0dXJlQ29uZmlnO1xuICBjb25zdCBmZWF0dXJlU2VsZWN0b3IgPSBjcmVhdGVGZWF0dXJlU2VsZWN0b3I8QXBwU3RhdGUsIEZlYXR1cmVTdGF0ZT4obmFtZSk7XG4gIGNvbnN0IG5lc3RlZFNlbGVjdG9ycyA9IGNyZWF0ZU5lc3RlZFNlbGVjdG9ycyhmZWF0dXJlU2VsZWN0b3IsIHJlZHVjZXIpO1xuXG4gIHJldHVybiAoe1xuICAgIG5hbWUsXG4gICAgcmVkdWNlcixcbiAgICBbYHNlbGVjdCR7Y2FwaXRhbGl6ZShuYW1lKX1TdGF0ZWBdOiBmZWF0dXJlU2VsZWN0b3IsXG4gICAgLi4ubmVzdGVkU2VsZWN0b3JzLFxuICB9IGFzIHVua25vd24pIGFzIEZlYXR1cmU8QXBwU3RhdGUsIEZlYXR1cmVOYW1lLCBGZWF0dXJlU3RhdGU+O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOZXN0ZWRTZWxlY3RvcnM8XG4gIEFwcFN0YXRlIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgYW55PixcbiAgRmVhdHVyZVN0YXRlXG4+KFxuICBmZWF0dXJlU2VsZWN0b3I6IE1lbW9pemVkU2VsZWN0b3I8QXBwU3RhdGUsIEZlYXR1cmVTdGF0ZT4sXG4gIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8RmVhdHVyZVN0YXRlPlxuKTogTmVzdGVkU2VsZWN0b3JzPEFwcFN0YXRlLCBGZWF0dXJlU3RhdGU+IHtcbiAgY29uc3QgaW5pdGlhbFN0YXRlID0gZ2V0SW5pdGlhbFN0YXRlKHJlZHVjZXIpO1xuICBjb25zdCBuZXN0ZWRLZXlzID0gKGlzUGxhaW5PYmplY3QoaW5pdGlhbFN0YXRlKVxuICAgID8gT2JqZWN0LmtleXMoaW5pdGlhbFN0YXRlKVxuICAgIDogW10pIGFzIEFycmF5PGtleW9mIEZlYXR1cmVTdGF0ZSAmIHN0cmluZz47XG5cbiAgcmV0dXJuIG5lc3RlZEtleXMucmVkdWNlKFxuICAgIChuZXN0ZWRTZWxlY3RvcnMsIG5lc3RlZEtleSkgPT4gKHtcbiAgICAgIC4uLm5lc3RlZFNlbGVjdG9ycyxcbiAgICAgIFtgc2VsZWN0JHtjYXBpdGFsaXplKG5lc3RlZEtleSl9YF06IGNyZWF0ZVNlbGVjdG9yKFxuICAgICAgICBmZWF0dXJlU2VsZWN0b3IsXG4gICAgICAgIChwYXJlbnRTdGF0ZSkgPT4gcGFyZW50U3RhdGU/LltuZXN0ZWRLZXldXG4gICAgICApLFxuICAgIH0pLFxuICAgIHt9IGFzIE5lc3RlZFNlbGVjdG9yczxBcHBTdGF0ZSwgRmVhdHVyZVN0YXRlPlxuICApO1xufVxuXG5mdW5jdGlvbiBnZXRJbml0aWFsU3RhdGU8RmVhdHVyZVN0YXRlPihcbiAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxGZWF0dXJlU3RhdGU+XG4pOiBGZWF0dXJlU3RhdGUge1xuICByZXR1cm4gcmVkdWNlcih1bmRlZmluZWQsIHsgdHlwZTogJ0BuZ3J4L2ZlYXR1cmUvaW5pdCcgfSk7XG59XG4iXX0=