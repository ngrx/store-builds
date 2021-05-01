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
    for (const on of ons) {
        for (const type of on.types) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJCQTs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxVQUFVLEVBQUUsQ0FDaEIsR0FBRyxJQUdGO0lBRUQsdUVBQXVFO0lBQ3ZFLHFEQUFxRDtJQUNyRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUE4QixDQUFDO0lBQ3ZELE1BQU0sS0FBSyxHQUFNLElBQTZCLENBQUMsR0FBRyxDQUNoRCxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDa0IsQ0FBQztJQUM5QyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQzVCLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQ0c7QUFDSCxNQUFNLFVBQVUsYUFBYSxDQUMzQixZQUFlLEVBQ2YsR0FBRyxHQUF1QztJQUUxQyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBeUMsQ0FBQztJQUM3RCxLQUFLLE1BQU0sRUFBRSxJQUFJLEdBQUcsRUFBRTtRQUNwQixLQUFLLE1BQU0sSUFBSSxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUU7WUFDM0IsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QyxJQUFJLGVBQWUsRUFBRTtnQkFDbkIsTUFBTSxVQUFVLEdBQTJCLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQzNELEVBQUUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDckQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDM0I7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzNCO1NBQ0Y7S0FDRjtJQUVELE9BQU8sVUFBVSxRQUFXLFlBQVksRUFBRSxNQUFTO1FBQ2pELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbEQsQ0FBQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbkNyZWF0b3IsIEFjdGlvblJlZHVjZXIsIEFjdGlvblR5cGUsIEFjdGlvbiB9IGZyb20gJy4vbW9kZWxzJztcblxuLy8gR29lcyBvdmVyIHRoZSBhcnJheSBvZiBBY3Rpb25DcmVhdG9ycywgcHVsbHMgdGhlIGFjdGlvbiB0eXBlIG91dCBvZiBlYWNoIG9uZVxuLy8gYW5kIHJldHVybnMgdGhlIGFycmF5IG9mIHRoZXNlIGFjdGlvbiB0eXBlcy5cbnR5cGUgRXh0cmFjdEFjdGlvblR5cGVzPENyZWF0b3JzIGV4dGVuZHMgcmVhZG9ubHkgQWN0aW9uQ3JlYXRvcltdPiA9IHtcbiAgW0tleSBpbiBrZXlvZiBDcmVhdG9yc106IENyZWF0b3JzW0tleV0gZXh0ZW5kcyBBY3Rpb25DcmVhdG9yPGluZmVyIFQ+XG4gICAgPyBUXG4gICAgOiBuZXZlcjtcbn07XG5cbi8qKlxuICogUmV0dXJuIHR5cGUgb2YgdGhlIGBvbmAgZm4uXG4gKiBDb250YWlucyB0aGUgYWN0aW9uIHJlZHVjZXIgY291cGxlZCB0byBvbmUgb3IgbW9yZSBhY3Rpb24gdHlwZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVkdWNlclR5cGVzPFxuICBTdGF0ZSxcbiAgQ3JlYXRvcnMgZXh0ZW5kcyByZWFkb25seSBBY3Rpb25DcmVhdG9yW11cbj4ge1xuICByZWR1Y2VyOiBPblJlZHVjZXI8U3RhdGUsIENyZWF0b3JzPjtcbiAgdHlwZXM6IEV4dHJhY3RBY3Rpb25UeXBlczxDcmVhdG9ycz47XG59XG5cbi8vIFNwZWNpYWxpemVkIFJlZHVjZXIgdGhhdCBpcyBhd2FyZSBvZiB0aGUgQWN0aW9uIHR5cGUgaXQgbmVlZHMgdG8gaGFuZGxlXG5leHBvcnQgaW50ZXJmYWNlIE9uUmVkdWNlcjxTdGF0ZSwgQ3JlYXRvcnMgZXh0ZW5kcyByZWFkb25seSBBY3Rpb25DcmVhdG9yW10+IHtcbiAgKHN0YXRlOiBTdGF0ZSwgYWN0aW9uOiBBY3Rpb25UeXBlPENyZWF0b3JzW251bWJlcl0+KTogU3RhdGU7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBc3NvY2lhdGVzIGFjdGlvbnMgd2l0aCBhIGdpdmVuIHN0YXRlIGNoYW5nZSBmdW5jdGlvbi5cbiAqIEEgc3RhdGUgY2hhbmdlIGZ1bmN0aW9uIG11c3QgYmUgcHJvdmlkZWQgYXMgdGhlIGxhc3QgcGFyYW1ldGVyLlxuICpcbiAqIEBwYXJhbSBhcmdzIGBBY3Rpb25DcmVhdG9yYCdzIGZvbGxvd2VkIGJ5IGEgc3RhdGUgY2hhbmdlIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm5zIGFuIGFzc29jaWF0aW9uIG9mIGFjdGlvbiB0eXBlcyB3aXRoIGEgc3RhdGUgY2hhbmdlIGZ1bmN0aW9uLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiBgYGB0c1xuICogb24oQXV0aEFwaUFjdGlvbnMubG9naW5TdWNjZXNzLCAoc3RhdGUsIHsgdXNlciB9KSA9PiAoeyAuLi5zdGF0ZSwgdXNlciB9KSlcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gb248U3RhdGUsIENyZWF0b3JzIGV4dGVuZHMgcmVhZG9ubHkgQWN0aW9uQ3JlYXRvcltdPihcbiAgLi4uYXJnczogW1xuICAgIC4uLmNyZWF0b3JzOiBDcmVhdG9ycyxcbiAgICByZWR1Y2VyOiBPblJlZHVjZXI8U3RhdGUgZXh0ZW5kcyBpbmZlciBTID8gUyA6IG5ldmVyLCBDcmVhdG9ycz5cbiAgXVxuKTogUmVkdWNlclR5cGVzPFN0YXRlLCBDcmVhdG9ycz4ge1xuICAvLyBUaGlzIGNvdWxkIGJlIHJlZmFjdG9yZWQgd2hlbiBUUyByZWxlYXNlcyB0aGUgdmVyc2lvbiB3aXRoIHRoaXMgZml4OlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvcHVsbC80MTU0NFxuICBjb25zdCByZWR1Y2VyID0gYXJncy5wb3AoKSBhcyBPblJlZHVjZXI8YW55LCBDcmVhdG9ycz47XG4gIGNvbnN0IHR5cGVzID0gKCgoYXJncyBhcyB1bmtub3duKSBhcyBDcmVhdG9ycykubWFwKFxuICAgIChjcmVhdG9yKSA9PiBjcmVhdG9yLnR5cGVcbiAgKSBhcyB1bmtub3duKSBhcyBFeHRyYWN0QWN0aW9uVHlwZXM8Q3JlYXRvcnM+O1xuICByZXR1cm4geyByZWR1Y2VyLCB0eXBlcyB9O1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQ3JlYXRlcyBhIHJlZHVjZXIgZnVuY3Rpb24gdG8gaGFuZGxlIHN0YXRlIHRyYW5zaXRpb25zLlxuICpcbiAqIFJlZHVjZXIgY3JlYXRvcnMgcmVkdWNlIHRoZSBleHBsaWNpdG5lc3Mgb2YgcmVkdWNlciBmdW5jdGlvbnMgd2l0aCBzd2l0Y2ggc3RhdGVtZW50cy5cbiAqXG4gKiBAcGFyYW0gaW5pdGlhbFN0YXRlIFByb3ZpZGVzIGEgc3RhdGUgdmFsdWUgaWYgdGhlIGN1cnJlbnQgc3RhdGUgaXMgYHVuZGVmaW5lZGAsIGFzIGl0IGlzIGluaXRpYWxseS5cbiAqIEBwYXJhbSBvbnMgQXNzb2NpYXRpb25zIGJldHdlZW4gYWN0aW9ucyBhbmQgc3RhdGUgY2hhbmdlcy5cbiAqIEByZXR1cm5zIEEgcmVkdWNlciBmdW5jdGlvbi5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIC0gTXVzdCBiZSB1c2VkIHdpdGggYEFjdGlvbkNyZWF0b3JgJ3MgKHJldHVybmVkIGJ5IGBjcmVhdGVBY3Rpb25gKS4gQ2Fubm90IGJlIHVzZWQgd2l0aCBjbGFzcy1iYXNlZCBhY3Rpb24gY3JlYXRvcnMuXG4gKiAtIFRoZSByZXR1cm5lZCBgQWN0aW9uUmVkdWNlcmAgc2hvdWxkIGFkZGl0aW9uYWxseSBiZSB3cmFwcGVkIHdpdGggYW5vdGhlciBmdW5jdGlvbiwgaWYgeW91IGFyZSB1c2luZyBWaWV3IEVuZ2luZSBBT1QuXG4gKiBJbiBjYXNlIHlvdSBhcmUgdXNpbmcgSXZ5IChvciBvbmx5IEpJVCBWaWV3IEVuZ2luZSkgdGhlIGV4dHJhIHdyYXBwZXIgZnVuY3Rpb24gaXMgbm90IHJlcXVpcmVkLlxuICpcbiAqICoqRGVjbGFyaW5nIGEgcmVkdWNlciBjcmVhdG9yKipcbiAqXG4gKiBgYGB0c1xuICogZXhwb3J0IGNvbnN0IHJlZHVjZXIgPSBjcmVhdGVSZWR1Y2VyKFxuICogICBpbml0aWFsU3RhdGUsXG4gKiAgIG9uKFxuICogICAgIGZlYXR1cmVBY3Rpb25zLmFjdGlvbk9uZSxcbiAqICAgICBmZWF0dXJlQWN0aW9ucy5hY3Rpb25Ud28sXG4gKiAgICAgKHN0YXRlLCB7IHVwZGF0ZWRWYWx1ZSB9KSA9PiAoeyAuLi5zdGF0ZSwgcHJvcDogdXBkYXRlZFZhbHVlIH0pXG4gKiAgICksXG4gKiAgIG9uKGZlYXR1cmVBY3Rpb25zLmFjdGlvblRocmVlLCAoKSA9PiBpbml0aWFsU3RhdGUpO1xuICogKTtcbiAqIGBgYFxuICpcbiAqICoqRGVjbGFyaW5nIGEgcmVkdWNlciBjcmVhdG9yIHVzaW5nIGEgd3JhcHBlciBmdW5jdGlvbiAoT25seSBuZWVkZWQgaWYgdXNpbmcgVmlldyBFbmdpbmUgQU9UKSoqXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IGZlYXR1cmVSZWR1Y2VyID0gY3JlYXRlUmVkdWNlcihcbiAqICAgaW5pdGlhbFN0YXRlLFxuICogICBvbihcbiAqICAgICBmZWF0dXJlQWN0aW9ucy5hY3Rpb25PbmUsXG4gKiAgICAgZmVhdHVyZUFjdGlvbnMuYWN0aW9uVHdvLFxuICogICAgIChzdGF0ZSwgeyB1cGRhdGVkVmFsdWUgfSkgPT4gKHsgLi4uc3RhdGUsIHByb3A6IHVwZGF0ZWRWYWx1ZSB9KVxuICogICApLFxuICogICBvbihmZWF0dXJlQWN0aW9ucy5hY3Rpb25UaHJlZSwgKCkgPT4gaW5pdGlhbFN0YXRlKTtcbiAqICk7XG4gKlxuICogZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGU6IFN0YXRlIHwgdW5kZWZpbmVkLCBhY3Rpb246IEFjdGlvbikge1xuICogICByZXR1cm4gZmVhdHVyZVJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlZHVjZXI8UywgQSBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gIGluaXRpYWxTdGF0ZTogUyxcbiAgLi4ub25zOiBSZWR1Y2VyVHlwZXM8UywgQWN0aW9uQ3JlYXRvcltdPltdXG4pOiBBY3Rpb25SZWR1Y2VyPFMsIEE+IHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIE9uUmVkdWNlcjxTLCBBY3Rpb25DcmVhdG9yW10+PigpO1xuICBmb3IgKGNvbnN0IG9uIG9mIG9ucykge1xuICAgIGZvciAoY29uc3QgdHlwZSBvZiBvbi50eXBlcykge1xuICAgICAgY29uc3QgZXhpc3RpbmdSZWR1Y2VyID0gbWFwLmdldCh0eXBlKTtcbiAgICAgIGlmIChleGlzdGluZ1JlZHVjZXIpIHtcbiAgICAgICAgY29uc3QgbmV3UmVkdWNlcjogdHlwZW9mIGV4aXN0aW5nUmVkdWNlciA9IChzdGF0ZSwgYWN0aW9uKSA9PlxuICAgICAgICAgIG9uLnJlZHVjZXIoZXhpc3RpbmdSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pLCBhY3Rpb24pO1xuICAgICAgICBtYXAuc2V0KHR5cGUsIG5ld1JlZHVjZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFwLnNldCh0eXBlLCBvbi5yZWR1Y2VyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKHN0YXRlOiBTID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IEEpOiBTIHtcbiAgICBjb25zdCByZWR1Y2VyID0gbWFwLmdldChhY3Rpb24udHlwZSk7XG4gICAgcmV0dXJuIHJlZHVjZXIgPyByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIDogc3RhdGU7XG4gIH07XG59XG4iXX0=