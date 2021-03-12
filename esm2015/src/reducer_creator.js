/**
 * @description
 * Associates actions with a given state change function.
 * A state change function must be provided as the last parameter.
 *
 * @param args `ActionCreator`'s followed by a state change function.
 *
 * @returns an association of action types with a state change function.
 *
 * @usageNotes
 * ```ts
 * on(AuthApiActions.loginSuccess, (state, { user }) => ({ ...state, user }))
 * ```
 */
export function on(...args) {
    // This could be refactored when TS releases the version with this fix:
    // https://github.com/microsoft/TypeScript/pull/41544
    const reducer = args.pop();
    const types = args.map((creator) => creator.type);
    return { reducer, types };
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
 */
export function createReducer(initialState, ...ons) {
    const map = new Map();
    for (let on of ons) {
        for (let type of on.types) {
            const existingReducer = map.get(type);
            if (existingReducer) {
                const newReducer = (state, action) => on.reducer(existingReducer(state, action), action);
                map.set(type, newReducer);
            }
            else {
                map.set(type, on.reducer);
            }
        }
    }
    return function (state = initialState, action) {
        const reducer = map.get(action.type);
        return reducer ? reducer(state, action) : state;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZCQTs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxVQUFVLEVBQUUsQ0FDaEIsR0FBRyxJQUFrRTtJQUVyRSx1RUFBdUU7SUFDdkUscURBQXFEO0lBQ3JELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQWdDLENBQUM7SUFDekQsTUFBTSxLQUFLLEdBQU0sSUFBNkIsQ0FBQyxHQUFHLENBQ2hELENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNrQixDQUFDO0lBQzlDLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStDRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQzNCLFlBQWUsRUFDZixHQUFHLEdBQXVDO0lBRTFDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUF5QyxDQUFDO0lBQzdELEtBQUssSUFBSSxFQUFFLElBQUksR0FBRyxFQUFFO1FBQ2xCLEtBQUssSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRTtZQUN6QixNQUFNLGVBQWUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLElBQUksZUFBZSxFQUFFO2dCQUNuQixNQUFNLFVBQVUsR0FBMkIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FDM0QsRUFBRSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNyRCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0I7U0FDRjtLQUNGO0lBRUQsT0FBTyxVQUFVLFFBQVcsWUFBWSxFQUFFLE1BQVM7UUFDakQsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsRCxDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uQ3JlYXRvciwgQWN0aW9uUmVkdWNlciwgQWN0aW9uVHlwZSwgQWN0aW9uIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG4vLyBHb2VzIG92ZXIgdGhlIGFycmF5IG9mIEFjdGlvbkNyZWF0b3JzLCBwdWxscyB0aGUgYWN0aW9uIHR5cGUgb3V0IG9mIGVhY2ggb25lXG4vLyBhbmQgcmV0dXJucyB0aGUgYXJyYXkgb2YgdGhlc2UgYWN0aW9uIHR5cGVzLlxudHlwZSBFeHRyYWN0QWN0aW9uVHlwZXM8Q3JlYXRvcnMgZXh0ZW5kcyByZWFkb25seSBBY3Rpb25DcmVhdG9yW10+ID0ge1xuICBbS2V5IGluIGtleW9mIENyZWF0b3JzXTogQ3JlYXRvcnNbS2V5XSBleHRlbmRzIEFjdGlvbkNyZWF0b3I8aW5mZXIgVD5cbiAgICA/IFRcbiAgICA6IG5ldmVyO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdHlwZSBvZiB0aGUgYG9uYCBmbi5cbiAqIENvbnRhaW5zIHRoZSBhY3Rpb24gcmVkdWNlciBjb3VwbGVkIHRvIG9uZSBvciBtb3JlIGFjdGlvbiB0eXBlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZWR1Y2VyVHlwZXM8XG4gIFN0YXRlLFxuICBDcmVhdG9ycyBleHRlbmRzIHJlYWRvbmx5IEFjdGlvbkNyZWF0b3JbXVxuPiB7XG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTdGF0ZSwgQ3JlYXRvcnM+O1xuICB0eXBlczogRXh0cmFjdEFjdGlvblR5cGVzPENyZWF0b3JzPjtcbn1cblxuLy8gU3BlY2lhbGl6ZWQgUmVkdWNlciB0aGF0IGlzIGF3YXJlIG9mIHRoZSBBY3Rpb24gdHlwZSBpdCBuZWVkcyB0byBoYW5kbGVcbmV4cG9ydCBpbnRlcmZhY2UgT25SZWR1Y2VyPFN0YXRlLCBDcmVhdG9ycyBleHRlbmRzIHJlYWRvbmx5IEFjdGlvbkNyZWF0b3JbXT4ge1xuICAoc3RhdGU6IFN0YXRlLCBhY3Rpb246IEFjdGlvblR5cGU8Q3JlYXRvcnNbbnVtYmVyXT4pOiBTdGF0ZSBleHRlbmRzIG9iamVjdFxuICAgID8geyBbUCBpbiBrZXlvZiBTdGF0ZV06IFN0YXRlW1BdIH1cbiAgICA6IFN0YXRlO1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQXNzb2NpYXRlcyBhY3Rpb25zIHdpdGggYSBnaXZlbiBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb24uXG4gKiBBIHN0YXRlIGNoYW5nZSBmdW5jdGlvbiBtdXN0IGJlIHByb3ZpZGVkIGFzIHRoZSBsYXN0IHBhcmFtZXRlci5cbiAqXG4gKiBAcGFyYW0gYXJncyBgQWN0aW9uQ3JlYXRvcmAncyBmb2xsb3dlZCBieSBhIHN0YXRlIGNoYW5nZSBmdW5jdGlvbi5cbiAqXG4gKiBAcmV0dXJucyBhbiBhc3NvY2lhdGlvbiBvZiBhY3Rpb24gdHlwZXMgd2l0aCBhIHN0YXRlIGNoYW5nZSBmdW5jdGlvbi5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogYGBgdHNcbiAqIG9uKEF1dGhBcGlBY3Rpb25zLmxvZ2luU3VjY2VzcywgKHN0YXRlLCB7IHVzZXIgfSkgPT4gKHsgLi4uc3RhdGUsIHVzZXIgfSkpXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFN0YXRlLCBDcmVhdG9ycyBleHRlbmRzIHJlYWRvbmx5IEFjdGlvbkNyZWF0b3JbXT4oXG4gIC4uLmFyZ3M6IFsuLi5jcmVhdG9yczogQ3JlYXRvcnMsIHJlZHVjZXI6IE9uUmVkdWNlcjxTdGF0ZSwgQ3JlYXRvcnM+XVxuKTogUmVkdWNlclR5cGVzPFN0YXRlLCBDcmVhdG9ycz4ge1xuICAvLyBUaGlzIGNvdWxkIGJlIHJlZmFjdG9yZWQgd2hlbiBUUyByZWxlYXNlcyB0aGUgdmVyc2lvbiB3aXRoIHRoaXMgZml4OlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvcHVsbC80MTU0NFxuICBjb25zdCByZWR1Y2VyID0gYXJncy5wb3AoKSBhcyBPblJlZHVjZXI8U3RhdGUsIENyZWF0b3JzPjtcbiAgY29uc3QgdHlwZXMgPSAoKChhcmdzIGFzIHVua25vd24pIGFzIENyZWF0b3JzKS5tYXAoXG4gICAgKGNyZWF0b3IpID0+IGNyZWF0b3IudHlwZVxuICApIGFzIHVua25vd24pIGFzIEV4dHJhY3RBY3Rpb25UeXBlczxDcmVhdG9ycz47XG4gIHJldHVybiB7IHJlZHVjZXIsIHR5cGVzIH07XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDcmVhdGVzIGEgcmVkdWNlciBmdW5jdGlvbiB0byBoYW5kbGUgc3RhdGUgdHJhbnNpdGlvbnMuXG4gKlxuICogUmVkdWNlciBjcmVhdG9ycyByZWR1Y2UgdGhlIGV4cGxpY2l0bmVzcyBvZiByZWR1Y2VyIGZ1bmN0aW9ucyB3aXRoIHN3aXRjaCBzdGF0ZW1lbnRzLlxuICpcbiAqIEBwYXJhbSBpbml0aWFsU3RhdGUgUHJvdmlkZXMgYSBzdGF0ZSB2YWx1ZSBpZiB0aGUgY3VycmVudCBzdGF0ZSBpcyBgdW5kZWZpbmVkYCwgYXMgaXQgaXMgaW5pdGlhbGx5LlxuICogQHBhcmFtIG9ucyBBc3NvY2lhdGlvbnMgYmV0d2VlbiBhY3Rpb25zIGFuZCBzdGF0ZSBjaGFuZ2VzLlxuICogQHJldHVybnMgQSByZWR1Y2VyIGZ1bmN0aW9uLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogLSBNdXN0IGJlIHVzZWQgd2l0aCBgQWN0aW9uQ3JlYXRvcmAncyAocmV0dXJuZWQgYnkgYGNyZWF0ZUFjdGlvbmApLiBDYW5ub3QgYmUgdXNlZCB3aXRoIGNsYXNzLWJhc2VkIGFjdGlvbiBjcmVhdG9ycy5cbiAqIC0gVGhlIHJldHVybmVkIGBBY3Rpb25SZWR1Y2VyYCBzaG91bGQgYWRkaXRpb25hbGx5IGJlIHdyYXBwZWQgd2l0aCBhbm90aGVyIGZ1bmN0aW9uLCBpZiB5b3UgYXJlIHVzaW5nIFZpZXcgRW5naW5lIEFPVC5cbiAqIEluIGNhc2UgeW91IGFyZSB1c2luZyBJdnkgKG9yIG9ubHkgSklUIFZpZXcgRW5naW5lKSB0aGUgZXh0cmEgd3JhcHBlciBmdW5jdGlvbiBpcyBub3QgcmVxdWlyZWQuXG4gKlxuICogKipEZWNsYXJpbmcgYSByZWR1Y2VyIGNyZWF0b3IqKlxuICpcbiAqIGBgYHRzXG4gKiBleHBvcnQgY29uc3QgcmVkdWNlciA9IGNyZWF0ZVJlZHVjZXIoXG4gKiAgIGluaXRpYWxTdGF0ZSxcbiAqICAgb24oXG4gKiAgICAgZmVhdHVyZUFjdGlvbnMuYWN0aW9uT25lLFxuICogICAgIGZlYXR1cmVBY3Rpb25zLmFjdGlvblR3byxcbiAqICAgICAoc3RhdGUsIHsgdXBkYXRlZFZhbHVlIH0pID0+ICh7IC4uLnN0YXRlLCBwcm9wOiB1cGRhdGVkVmFsdWUgfSlcbiAqICAgKSxcbiAqICAgb24oZmVhdHVyZUFjdGlvbnMuYWN0aW9uVGhyZWUsICgpID0+IGluaXRpYWxTdGF0ZSk7XG4gKiApO1xuICogYGBgXG4gKlxuICogKipEZWNsYXJpbmcgYSByZWR1Y2VyIGNyZWF0b3IgdXNpbmcgYSB3cmFwcGVyIGZ1bmN0aW9uIChPbmx5IG5lZWRlZCBpZiB1c2luZyBWaWV3IEVuZ2luZSBBT1QpKipcbiAqXG4gKiBgYGB0c1xuICogY29uc3QgZmVhdHVyZVJlZHVjZXIgPSBjcmVhdGVSZWR1Y2VyKFxuICogICBpbml0aWFsU3RhdGUsXG4gKiAgIG9uKFxuICogICAgIGZlYXR1cmVBY3Rpb25zLmFjdGlvbk9uZSxcbiAqICAgICBmZWF0dXJlQWN0aW9ucy5hY3Rpb25Ud28sXG4gKiAgICAgKHN0YXRlLCB7IHVwZGF0ZWRWYWx1ZSB9KSA9PiAoeyAuLi5zdGF0ZSwgcHJvcDogdXBkYXRlZFZhbHVlIH0pXG4gKiAgICksXG4gKiAgIG9uKGZlYXR1cmVBY3Rpb25zLmFjdGlvblRocmVlLCAoKSA9PiBpbml0aWFsU3RhdGUpO1xuICogKTtcbiAqXG4gKiBleHBvcnQgZnVuY3Rpb24gcmVkdWNlcihzdGF0ZTogU3RhdGUgfCB1bmRlZmluZWQsIGFjdGlvbjogQWN0aW9uKSB7XG4gKiAgIHJldHVybiBmZWF0dXJlUmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVkdWNlcjxTLCBBIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgaW5pdGlhbFN0YXRlOiBTLFxuICAuLi5vbnM6IFJlZHVjZXJUeXBlczxTLCBBY3Rpb25DcmVhdG9yW10+W11cbik6IEFjdGlvblJlZHVjZXI8UywgQT4ge1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgT25SZWR1Y2VyPFMsIEFjdGlvbkNyZWF0b3JbXT4+KCk7XG4gIGZvciAobGV0IG9uIG9mIG9ucykge1xuICAgIGZvciAobGV0IHR5cGUgb2Ygb24udHlwZXMpIHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nUmVkdWNlciA9IG1hcC5nZXQodHlwZSk7XG4gICAgICBpZiAoZXhpc3RpbmdSZWR1Y2VyKSB7XG4gICAgICAgIGNvbnN0IG5ld1JlZHVjZXI6IHR5cGVvZiBleGlzdGluZ1JlZHVjZXIgPSAoc3RhdGUsIGFjdGlvbikgPT5cbiAgICAgICAgICBvbi5yZWR1Y2VyKGV4aXN0aW5nUmVkdWNlcihzdGF0ZSwgYWN0aW9uKSwgYWN0aW9uKTtcbiAgICAgICAgbWFwLnNldCh0eXBlLCBuZXdSZWR1Y2VyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hcC5zZXQodHlwZSwgb24ucmVkdWNlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChzdGF0ZTogUyA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBKTogUyB7XG4gICAgY29uc3QgcmVkdWNlciA9IG1hcC5nZXQoYWN0aW9uLnR5cGUpO1xuICAgIHJldHVybiByZWR1Y2VyID8gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKSA6IHN0YXRlO1xuICB9O1xufVxuIl19