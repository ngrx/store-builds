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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJCQTs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxVQUFVLEVBQUUsQ0FDaEIsR0FBRyxJQUFrRTtJQUVyRSx1RUFBdUU7SUFDdkUscURBQXFEO0lBQ3JELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQWdDLENBQUM7SUFDekQsTUFBTSxLQUFLLEdBQU0sSUFBNkIsQ0FBQyxHQUFHLENBQ2hELENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNrQixDQUFDO0lBQzlDLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStDRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQzNCLFlBQWUsRUFDZixHQUFHLEdBQXVDO0lBRTFDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUF5QyxDQUFDO0lBQzdELEtBQUssSUFBSSxFQUFFLElBQUksR0FBRyxFQUFFO1FBQ2xCLEtBQUssSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRTtZQUN6QixNQUFNLGVBQWUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLElBQUksZUFBZSxFQUFFO2dCQUNuQixNQUFNLFVBQVUsR0FBMkIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FDM0QsRUFBRSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNyRCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0I7U0FDRjtLQUNGO0lBRUQsT0FBTyxVQUFVLFFBQVcsWUFBWSxFQUFFLE1BQVM7UUFDakQsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsRCxDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uQ3JlYXRvciwgQWN0aW9uUmVkdWNlciwgQWN0aW9uVHlwZSwgQWN0aW9uIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG4vLyBHb2VzIG92ZXIgdGhlIGFycmF5IG9mIEFjdGlvbkNyZWF0b3JzLCBwdWxscyB0aGUgYWN0aW9uIHR5cGUgb3V0IG9mIGVhY2ggb25lXG4vLyBhbmQgcmV0dXJucyB0aGUgYXJyYXkgb2YgdGhlc2UgYWN0aW9uIHR5cGVzLlxudHlwZSBFeHRyYWN0QWN0aW9uVHlwZXM8Q3JlYXRvcnMgZXh0ZW5kcyByZWFkb25seSBBY3Rpb25DcmVhdG9yW10+ID0ge1xuICBbS2V5IGluIGtleW9mIENyZWF0b3JzXTogQ3JlYXRvcnNbS2V5XSBleHRlbmRzIEFjdGlvbkNyZWF0b3I8aW5mZXIgVD5cbiAgICA/IFRcbiAgICA6IG5ldmVyO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdHlwZSBvZiB0aGUgYG9uYCBmbi5cbiAqIENvbnRhaW5zIHRoZSBhY3Rpb24gcmVkdWNlciBjb3VwbGVkIHRvIG9uZSBvciBtb3JlIGFjdGlvbiB0eXBlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZWR1Y2VyVHlwZXM8XG4gIFN0YXRlLFxuICBDcmVhdG9ycyBleHRlbmRzIHJlYWRvbmx5IEFjdGlvbkNyZWF0b3JbXVxuPiB7XG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTdGF0ZSwgQ3JlYXRvcnM+O1xuICB0eXBlczogRXh0cmFjdEFjdGlvblR5cGVzPENyZWF0b3JzPjtcbn1cblxuLy8gU3BlY2lhbGl6ZWQgUmVkdWNlciB0aGF0IGlzIGF3YXJlIG9mIHRoZSBBY3Rpb24gdHlwZSBpdCBuZWVkcyB0byBoYW5kbGVcbmV4cG9ydCBpbnRlcmZhY2UgT25SZWR1Y2VyPFN0YXRlLCBDcmVhdG9ycyBleHRlbmRzIHJlYWRvbmx5IEFjdGlvbkNyZWF0b3JbXT4ge1xuICAoc3RhdGU6IFN0YXRlLCBhY3Rpb246IEFjdGlvblR5cGU8Q3JlYXRvcnNbbnVtYmVyXT4pOiB7IFtQIGluIGtleW9mIFN0YXRlXTogU3RhdGVbUF0gfTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFzc29jaWF0ZXMgYWN0aW9ucyB3aXRoIGEgZ2l2ZW4gc3RhdGUgY2hhbmdlIGZ1bmN0aW9uLlxuICogQSBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb24gbXVzdCBiZSBwcm92aWRlZCBhcyB0aGUgbGFzdCBwYXJhbWV0ZXIuXG4gKlxuICogQHBhcmFtIGFyZ3MgYEFjdGlvbkNyZWF0b3JgJ3MgZm9sbG93ZWQgYnkgYSBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb24uXG4gKlxuICogQHJldHVybnMgYW4gYXNzb2NpYXRpb24gb2YgYWN0aW9uIHR5cGVzIHdpdGggYSBzdGF0ZSBjaGFuZ2UgZnVuY3Rpb24uXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqIGBgYHRzXG4gKiBvbihBdXRoQXBpQWN0aW9ucy5sb2dpblN1Y2Nlc3MsIChzdGF0ZSwgeyB1c2VyIH0pID0+ICh7IC4uLnN0YXRlLCB1c2VyIH0pKVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvbjxTdGF0ZSwgQ3JlYXRvcnMgZXh0ZW5kcyByZWFkb25seSBBY3Rpb25DcmVhdG9yW10+KFxuICAuLi5hcmdzOiBbLi4uY3JlYXRvcnM6IENyZWF0b3JzLCByZWR1Y2VyOiBPblJlZHVjZXI8U3RhdGUsIENyZWF0b3JzPl1cbik6IFJlZHVjZXJUeXBlczxTdGF0ZSwgQ3JlYXRvcnM+IHtcbiAgLy8gVGhpcyBjb3VsZCBiZSByZWZhY3RvcmVkIHdoZW4gVFMgcmVsZWFzZXMgdGhlIHZlcnNpb24gd2l0aCB0aGlzIGZpeDpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L3B1bGwvNDE1NDRcbiAgY29uc3QgcmVkdWNlciA9IGFyZ3MucG9wKCkgYXMgT25SZWR1Y2VyPFN0YXRlLCBDcmVhdG9ycz47XG4gIGNvbnN0IHR5cGVzID0gKCgoYXJncyBhcyB1bmtub3duKSBhcyBDcmVhdG9ycykubWFwKFxuICAgIChjcmVhdG9yKSA9PiBjcmVhdG9yLnR5cGVcbiAgKSBhcyB1bmtub3duKSBhcyBFeHRyYWN0QWN0aW9uVHlwZXM8Q3JlYXRvcnM+O1xuICByZXR1cm4geyByZWR1Y2VyLCB0eXBlcyB9O1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQ3JlYXRlcyBhIHJlZHVjZXIgZnVuY3Rpb24gdG8gaGFuZGxlIHN0YXRlIHRyYW5zaXRpb25zLlxuICpcbiAqIFJlZHVjZXIgY3JlYXRvcnMgcmVkdWNlIHRoZSBleHBsaWNpdG5lc3Mgb2YgcmVkdWNlciBmdW5jdGlvbnMgd2l0aCBzd2l0Y2ggc3RhdGVtZW50cy5cbiAqXG4gKiBAcGFyYW0gaW5pdGlhbFN0YXRlIFByb3ZpZGVzIGEgc3RhdGUgdmFsdWUgaWYgdGhlIGN1cnJlbnQgc3RhdGUgaXMgYHVuZGVmaW5lZGAsIGFzIGl0IGlzIGluaXRpYWxseS5cbiAqIEBwYXJhbSBvbnMgQXNzb2NpYXRpb25zIGJldHdlZW4gYWN0aW9ucyBhbmQgc3RhdGUgY2hhbmdlcy5cbiAqIEByZXR1cm5zIEEgcmVkdWNlciBmdW5jdGlvbi5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIC0gTXVzdCBiZSB1c2VkIHdpdGggYEFjdGlvbkNyZWF0b3JgJ3MgKHJldHVybmVkIGJ5IGBjcmVhdGVBY3Rpb25gKS4gQ2Fubm90IGJlIHVzZWQgd2l0aCBjbGFzcy1iYXNlZCBhY3Rpb24gY3JlYXRvcnMuXG4gKiAtIFRoZSByZXR1cm5lZCBgQWN0aW9uUmVkdWNlcmAgc2hvdWxkIGFkZGl0aW9uYWxseSBiZSB3cmFwcGVkIHdpdGggYW5vdGhlciBmdW5jdGlvbiwgaWYgeW91IGFyZSB1c2luZyBWaWV3IEVuZ2luZSBBT1QuXG4gKiBJbiBjYXNlIHlvdSBhcmUgdXNpbmcgSXZ5IChvciBvbmx5IEpJVCBWaWV3IEVuZ2luZSkgdGhlIGV4dHJhIHdyYXBwZXIgZnVuY3Rpb24gaXMgbm90IHJlcXVpcmVkLlxuICpcbiAqICoqRGVjbGFyaW5nIGEgcmVkdWNlciBjcmVhdG9yKipcbiAqXG4gKiBgYGB0c1xuICogZXhwb3J0IGNvbnN0IHJlZHVjZXIgPSBjcmVhdGVSZWR1Y2VyKFxuICogICBpbml0aWFsU3RhdGUsXG4gKiAgIG9uKFxuICogICAgIGZlYXR1cmVBY3Rpb25zLmFjdGlvbk9uZSxcbiAqICAgICBmZWF0dXJlQWN0aW9ucy5hY3Rpb25Ud28sXG4gKiAgICAgKHN0YXRlLCB7IHVwZGF0ZWRWYWx1ZSB9KSA9PiAoeyAuLi5zdGF0ZSwgcHJvcDogdXBkYXRlZFZhbHVlIH0pXG4gKiAgICksXG4gKiAgIG9uKGZlYXR1cmVBY3Rpb25zLmFjdGlvblRocmVlLCAoKSA9PiBpbml0aWFsU3RhdGUpO1xuICogKTtcbiAqIGBgYFxuICpcbiAqICoqRGVjbGFyaW5nIGEgcmVkdWNlciBjcmVhdG9yIHVzaW5nIGEgd3JhcHBlciBmdW5jdGlvbiAoT25seSBuZWVkZWQgaWYgdXNpbmcgVmlldyBFbmdpbmUgQU9UKSoqXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IGZlYXR1cmVSZWR1Y2VyID0gY3JlYXRlUmVkdWNlcihcbiAqICAgaW5pdGlhbFN0YXRlLFxuICogICBvbihcbiAqICAgICBmZWF0dXJlQWN0aW9ucy5hY3Rpb25PbmUsXG4gKiAgICAgZmVhdHVyZUFjdGlvbnMuYWN0aW9uVHdvLFxuICogICAgIChzdGF0ZSwgeyB1cGRhdGVkVmFsdWUgfSkgPT4gKHsgLi4uc3RhdGUsIHByb3A6IHVwZGF0ZWRWYWx1ZSB9KVxuICogICApLFxuICogICBvbihmZWF0dXJlQWN0aW9ucy5hY3Rpb25UaHJlZSwgKCkgPT4gaW5pdGlhbFN0YXRlKTtcbiAqICk7XG4gKlxuICogZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGU6IFN0YXRlIHwgdW5kZWZpbmVkLCBhY3Rpb246IEFjdGlvbikge1xuICogICByZXR1cm4gZmVhdHVyZVJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlZHVjZXI8UywgQSBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gIGluaXRpYWxTdGF0ZTogUyxcbiAgLi4ub25zOiBSZWR1Y2VyVHlwZXM8UywgQWN0aW9uQ3JlYXRvcltdPltdXG4pOiBBY3Rpb25SZWR1Y2VyPFMsIEE+IHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIE9uUmVkdWNlcjxTLCBBY3Rpb25DcmVhdG9yW10+PigpO1xuICBmb3IgKGxldCBvbiBvZiBvbnMpIHtcbiAgICBmb3IgKGxldCB0eXBlIG9mIG9uLnR5cGVzKSB7XG4gICAgICBjb25zdCBleGlzdGluZ1JlZHVjZXIgPSBtYXAuZ2V0KHR5cGUpO1xuICAgICAgaWYgKGV4aXN0aW5nUmVkdWNlcikge1xuICAgICAgICBjb25zdCBuZXdSZWR1Y2VyOiB0eXBlb2YgZXhpc3RpbmdSZWR1Y2VyID0gKHN0YXRlLCBhY3Rpb24pID0+XG4gICAgICAgICAgb24ucmVkdWNlcihleGlzdGluZ1JlZHVjZXIoc3RhdGUsIGFjdGlvbiksIGFjdGlvbik7XG4gICAgICAgIG1hcC5zZXQodHlwZSwgbmV3UmVkdWNlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXAuc2V0KHR5cGUsIG9uLnJlZHVjZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoc3RhdGU6IFMgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogQSk6IFMge1xuICAgIGNvbnN0IHJlZHVjZXIgPSBtYXAuZ2V0KGFjdGlvbi50eXBlKTtcbiAgICByZXR1cm4gcmVkdWNlciA/IHJlZHVjZXIoc3RhdGUsIGFjdGlvbikgOiBzdGF0ZTtcbiAgfTtcbn1cbiJdfQ==