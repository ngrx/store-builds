/**
 * @description
 * Combines reducers for individual features into a single reducer.
 *
 * You can use this function to delegate handling of state transitions to multiple reducers, each acting on their
 * own sub-state within the root state.
 *
 * @param reducers An object mapping keys of the root state to their corresponding feature reducer.
 * @param initialState Provides a state value if the current state is `undefined`, as it is initially.
 * @returns A reducer function.
 *
 * @usageNotes
 *
 * **Example combining two feature reducers into one "root" reducer**
 *
 * ```ts
 * export const reducer = combineReducers({
 *   featureA: featureAReducer,
 *   featureB: featureBReducer
 * });
 * ```
 *
 * You can also override the initial states of the sub-features:
 * ```ts
 * export const reducer = combineReducers({
 *   featureA: featureAReducer,
 *   featureB: featureBReducer
 * }, {
 *   featureA: { counterA: 13 },
 *   featureB: { counterB: 37 }
 * });
 * ```
 */
export function combineReducers(reducers, initialState = {}) {
    const reducerKeys = Object.keys(reducers);
    const finalReducers = {};
    for (let i = 0; i < reducerKeys.length; i++) {
        const key = reducerKeys[i];
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }
    const finalReducerKeys = Object.keys(finalReducers);
    return function combination(state, action) {
        state = state === undefined ? initialState : state;
        let hasChanged = false;
        const nextState = {};
        for (let i = 0; i < finalReducerKeys.length; i++) {
            const key = finalReducerKeys[i];
            const reducer = finalReducers[key];
            const previousStateForKey = state[key];
            const nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? nextState : state;
    };
}
export function omit(object, keyToRemove) {
    return Object.keys(object)
        .filter((key) => key !== keyToRemove)
        .reduce((result, key) => Object.assign(result, { [key]: object[key] }), {});
}
export function compose(...functions) {
    return function (arg) {
        if (functions.length === 0) {
            return arg;
        }
        const last = functions[functions.length - 1];
        const rest = functions.slice(0, -1);
        return rest.reduceRight((composed, fn) => fn(composed), last(arg));
    };
}
export function createReducerFactory(reducerFactory, metaReducers) {
    if (Array.isArray(metaReducers) && metaReducers.length > 0) {
        reducerFactory = compose.apply(null, [
            ...metaReducers,
            reducerFactory,
        ]);
    }
    return (reducers, initialState) => {
        const reducer = reducerFactory(reducers);
        return (state, action) => {
            state = state === undefined ? initialState : state;
            return reducer(state, action);
        };
    };
}
export function createFeatureReducerFactory(metaReducers) {
    const reducerFactory = Array.isArray(metaReducers) && metaReducers.length > 0
        ? compose(...metaReducers)
        : (r) => r;
    return (reducer, initialState) => {
        reducer = reducerFactory(reducer);
        return (state, action) => {
            state = state === undefined ? initialState : state;
            return reducer(state, action);
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFhQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ0c7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUM3QixRQUFhLEVBQ2IsZUFBb0IsRUFBRTtJQUV0QixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sYUFBYSxHQUFRLEVBQUUsQ0FBQztJQUU5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzVDLE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQ3hDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsQ0FBQztJQUNILENBQUM7SUFFRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFcEQsT0FBTyxTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTTtRQUN2QyxLQUFLLEdBQUcsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLE1BQU0sU0FBUyxHQUFRLEVBQUUsQ0FBQztRQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDakQsTUFBTSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxPQUFPLEdBQVEsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sbUJBQW1CLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUU3RCxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsZUFBZSxDQUFDO1lBQ2pDLFVBQVUsR0FBRyxVQUFVLElBQUksZUFBZSxLQUFLLG1CQUFtQixDQUFDO1FBQ3JFLENBQUM7UUFDRCxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDeEMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSxJQUFJLENBQ2xCLE1BQVMsRUFDVCxXQUFvQjtJQUVwQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3ZCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxLQUFLLFdBQVcsQ0FBQztTQUNwQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNoRixDQUFDO0FBd0JELE1BQU0sVUFBVSxPQUFPLENBQUMsR0FBRyxTQUFnQjtJQUN6QyxPQUFPLFVBQVUsR0FBUTtRQUN2QixJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDM0IsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDO1FBRUQsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0MsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FDbEMsY0FBMEMsRUFDMUMsWUFBa0M7SUFFbEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDMUQsY0FBc0IsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUM1QyxHQUFHLFlBQVk7WUFDZixjQUFjO1NBQ2YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU8sQ0FBQyxRQUFnQyxFQUFFLFlBQThCLEVBQUUsRUFBRTtRQUMxRSxNQUFNLE9BQU8sR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsT0FBTyxDQUFDLEtBQW9CLEVBQUUsTUFBUyxFQUFFLEVBQUU7WUFDekMsS0FBSyxHQUFHLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFFLFlBQWtCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUMxRCxPQUFPLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSwyQkFBMkIsQ0FDekMsWUFBa0M7SUFFbEMsTUFBTSxjQUFjLEdBQ2xCLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxPQUFPLENBQXNCLEdBQUcsWUFBWSxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDLENBQXNCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVwQyxPQUFPLENBQUMsT0FBNEIsRUFBRSxZQUFnQixFQUFFLEVBQUU7UUFDeEQsT0FBTyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVsQyxPQUFPLENBQUMsS0FBb0IsRUFBRSxNQUFTLEVBQUUsRUFBRTtZQUN6QyxLQUFLLEdBQUcsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDbkQsT0FBTyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBY3Rpb24sXG4gIEFjdGlvblJlZHVjZXIsXG4gIEFjdGlvblJlZHVjZXJGYWN0b3J5LFxuICBBY3Rpb25SZWR1Y2VyTWFwLFxuICBNZXRhUmVkdWNlcixcbiAgSW5pdGlhbFN0YXRlLFxufSBmcm9tICcuL21vZGVscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lUmVkdWNlcnM8VCwgViBleHRlbmRzIEFjdGlvbiA9IEFjdGlvbj4oXG4gIHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+LFxuICBpbml0aWFsU3RhdGU/OiBQYXJ0aWFsPFQ+XG4pOiBBY3Rpb25SZWR1Y2VyPFQsIFY+O1xuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbWJpbmVzIHJlZHVjZXJzIGZvciBpbmRpdmlkdWFsIGZlYXR1cmVzIGludG8gYSBzaW5nbGUgcmVkdWNlci5cbiAqXG4gKiBZb3UgY2FuIHVzZSB0aGlzIGZ1bmN0aW9uIHRvIGRlbGVnYXRlIGhhbmRsaW5nIG9mIHN0YXRlIHRyYW5zaXRpb25zIHRvIG11bHRpcGxlIHJlZHVjZXJzLCBlYWNoIGFjdGluZyBvbiB0aGVpclxuICogb3duIHN1Yi1zdGF0ZSB3aXRoaW4gdGhlIHJvb3Qgc3RhdGUuXG4gKlxuICogQHBhcmFtIHJlZHVjZXJzIEFuIG9iamVjdCBtYXBwaW5nIGtleXMgb2YgdGhlIHJvb3Qgc3RhdGUgdG8gdGhlaXIgY29ycmVzcG9uZGluZyBmZWF0dXJlIHJlZHVjZXIuXG4gKiBAcGFyYW0gaW5pdGlhbFN0YXRlIFByb3ZpZGVzIGEgc3RhdGUgdmFsdWUgaWYgdGhlIGN1cnJlbnQgc3RhdGUgaXMgYHVuZGVmaW5lZGAsIGFzIGl0IGlzIGluaXRpYWxseS5cbiAqIEByZXR1cm5zIEEgcmVkdWNlciBmdW5jdGlvbi5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqICoqRXhhbXBsZSBjb21iaW5pbmcgdHdvIGZlYXR1cmUgcmVkdWNlcnMgaW50byBvbmUgXCJyb290XCIgcmVkdWNlcioqXG4gKlxuICogYGBgdHNcbiAqIGV4cG9ydCBjb25zdCByZWR1Y2VyID0gY29tYmluZVJlZHVjZXJzKHtcbiAqICAgZmVhdHVyZUE6IGZlYXR1cmVBUmVkdWNlcixcbiAqICAgZmVhdHVyZUI6IGZlYXR1cmVCUmVkdWNlclxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBZb3UgY2FuIGFsc28gb3ZlcnJpZGUgdGhlIGluaXRpYWwgc3RhdGVzIG9mIHRoZSBzdWItZmVhdHVyZXM6XG4gKiBgYGB0c1xuICogZXhwb3J0IGNvbnN0IHJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMoe1xuICogICBmZWF0dXJlQTogZmVhdHVyZUFSZWR1Y2VyLFxuICogICBmZWF0dXJlQjogZmVhdHVyZUJSZWR1Y2VyXG4gKiB9LCB7XG4gKiAgIGZlYXR1cmVBOiB7IGNvdW50ZXJBOiAxMyB9LFxuICogICBmZWF0dXJlQjogeyBjb3VudGVyQjogMzcgfVxuICogfSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVSZWR1Y2VycyhcbiAgcmVkdWNlcnM6IGFueSxcbiAgaW5pdGlhbFN0YXRlOiBhbnkgPSB7fVxuKTogQWN0aW9uUmVkdWNlcjxhbnksIEFjdGlvbj4ge1xuICBjb25zdCByZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKHJlZHVjZXJzKTtcbiAgY29uc3QgZmluYWxSZWR1Y2VyczogYW55ID0ge307XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWR1Y2VyS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGtleSA9IHJlZHVjZXJLZXlzW2ldO1xuICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZmluYWxSZWR1Y2Vyc1trZXldID0gcmVkdWNlcnNba2V5XTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBmaW5hbFJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMoZmluYWxSZWR1Y2Vycyk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbWJpbmF0aW9uKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBzdGF0ZSA9IHN0YXRlID09PSB1bmRlZmluZWQgPyBpbml0aWFsU3RhdGUgOiBzdGF0ZTtcbiAgICBsZXQgaGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIGNvbnN0IG5leHRTdGF0ZTogYW55ID0ge307XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaW5hbFJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBrZXkgPSBmaW5hbFJlZHVjZXJLZXlzW2ldO1xuICAgICAgY29uc3QgcmVkdWNlcjogYW55ID0gZmluYWxSZWR1Y2Vyc1trZXldO1xuICAgICAgY29uc3QgcHJldmlvdXNTdGF0ZUZvcktleSA9IHN0YXRlW2tleV07XG4gICAgICBjb25zdCBuZXh0U3RhdGVGb3JLZXkgPSByZWR1Y2VyKHByZXZpb3VzU3RhdGVGb3JLZXksIGFjdGlvbik7XG5cbiAgICAgIG5leHRTdGF0ZVtrZXldID0gbmV4dFN0YXRlRm9yS2V5O1xuICAgICAgaGFzQ2hhbmdlZCA9IGhhc0NoYW5nZWQgfHwgbmV4dFN0YXRlRm9yS2V5ICE9PSBwcmV2aW91c1N0YXRlRm9yS2V5O1xuICAgIH1cbiAgICByZXR1cm4gaGFzQ2hhbmdlZCA/IG5leHRTdGF0ZSA6IHN0YXRlO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb21pdDxUIGV4dGVuZHMgeyBba2V5OiBzdHJpbmddOiBhbnkgfT4oXG4gIG9iamVjdDogVCxcbiAga2V5VG9SZW1vdmU6IGtleW9mIFRcbik6IFBhcnRpYWw8VD4ge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0KVxuICAgIC5maWx0ZXIoKGtleSkgPT4ga2V5ICE9PSBrZXlUb1JlbW92ZSlcbiAgICAucmVkdWNlKChyZXN1bHQsIGtleSkgPT4gT2JqZWN0LmFzc2lnbihyZXN1bHQsIHsgW2tleV06IG9iamVjdFtrZXldIH0pLCB7fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlPEE+KCk6IChpOiBBKSA9PiBBO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2U8QSwgQj4oYjogKGk6IEEpID0+IEIpOiAoaTogQSkgPT4gQjtcbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlPEEsIEIsIEM+KGM6IChpOiBCKSA9PiBDLCBiOiAoaTogQSkgPT4gQik6IChpOiBBKSA9PiBDO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2U8QSwgQiwgQywgRD4oXG4gIGQ6IChpOiBDKSA9PiBELFxuICBjOiAoaTogQikgPT4gQyxcbiAgYjogKGk6IEEpID0+IEJcbik6IChpOiBBKSA9PiBEO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2U8QSwgQiwgQywgRCwgRT4oXG4gIGU6IChpOiBEKSA9PiBFLFxuICBkOiAoaTogQykgPT4gRCxcbiAgYzogKGk6IEIpID0+IEMsXG4gIGI6IChpOiBBKSA9PiBCXG4pOiAoaTogQSkgPT4gRTtcbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlPEEsIEIsIEMsIEQsIEUsIEY+KFxuICBmOiAoaTogRSkgPT4gRixcbiAgZTogKGk6IEQpID0+IEUsXG4gIGQ6IChpOiBDKSA9PiBELFxuICBjOiAoaTogQikgPT4gQyxcbiAgYjogKGk6IEEpID0+IEJcbik6IChpOiBBKSA9PiBGO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2U8QSA9IGFueSwgRiA9IGFueT4oLi4uZnVuY3Rpb25zOiBhbnlbXSk6IChpOiBBKSA9PiBGO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2UoLi4uZnVuY3Rpb25zOiBhbnlbXSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGFyZzogYW55KSB7XG4gICAgaWYgKGZ1bmN0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBhcmc7XG4gICAgfVxuXG4gICAgY29uc3QgbGFzdCA9IGZ1bmN0aW9uc1tmdW5jdGlvbnMubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgcmVzdCA9IGZ1bmN0aW9ucy5zbGljZSgwLCAtMSk7XG5cbiAgICByZXR1cm4gcmVzdC5yZWR1Y2VSaWdodCgoY29tcG9zZWQsIGZuKSA9PiBmbihjb21wb3NlZCksIGxhc3QoYXJnKSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWR1Y2VyRmFjdG9yeTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgcmVkdWNlckZhY3Rvcnk6IEFjdGlvblJlZHVjZXJGYWN0b3J5PFQsIFY+LFxuICBtZXRhUmVkdWNlcnM/OiBNZXRhUmVkdWNlcjxULCBWPltdXG4pOiBBY3Rpb25SZWR1Y2VyRmFjdG9yeTxULCBWPiB7XG4gIGlmIChBcnJheS5pc0FycmF5KG1ldGFSZWR1Y2VycykgJiYgbWV0YVJlZHVjZXJzLmxlbmd0aCA+IDApIHtcbiAgICAocmVkdWNlckZhY3RvcnkgYXMgYW55KSA9IGNvbXBvc2UuYXBwbHkobnVsbCwgW1xuICAgICAgLi4ubWV0YVJlZHVjZXJzLFxuICAgICAgcmVkdWNlckZhY3RvcnksXG4gICAgXSk7XG4gIH1cblxuICByZXR1cm4gKHJlZHVjZXJzOiBBY3Rpb25SZWR1Y2VyTWFwPFQsIFY+LCBpbml0aWFsU3RhdGU/OiBJbml0aWFsU3RhdGU8VD4pID0+IHtcbiAgICBjb25zdCByZWR1Y2VyID0gcmVkdWNlckZhY3RvcnkocmVkdWNlcnMpO1xuICAgIHJldHVybiAoc3RhdGU6IFQgfCB1bmRlZmluZWQsIGFjdGlvbjogVikgPT4ge1xuICAgICAgc3RhdGUgPSBzdGF0ZSA9PT0gdW5kZWZpbmVkID8gKGluaXRpYWxTdGF0ZSBhcyBUKSA6IHN0YXRlO1xuICAgICAgcmV0dXJuIHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG4gICAgfTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZlYXR1cmVSZWR1Y2VyRmFjdG9yeTxULCBWIGV4dGVuZHMgQWN0aW9uID0gQWN0aW9uPihcbiAgbWV0YVJlZHVjZXJzPzogTWV0YVJlZHVjZXI8VCwgVj5bXVxuKTogKHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8VCwgVj4sIGluaXRpYWxTdGF0ZT86IFQpID0+IEFjdGlvblJlZHVjZXI8VCwgVj4ge1xuICBjb25zdCByZWR1Y2VyRmFjdG9yeSA9XG4gICAgQXJyYXkuaXNBcnJheShtZXRhUmVkdWNlcnMpICYmIG1ldGFSZWR1Y2Vycy5sZW5ndGggPiAwXG4gICAgICA/IGNvbXBvc2U8QWN0aW9uUmVkdWNlcjxULCBWPj4oLi4ubWV0YVJlZHVjZXJzKVxuICAgICAgOiAocjogQWN0aW9uUmVkdWNlcjxULCBWPikgPT4gcjtcblxuICByZXR1cm4gKHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8VCwgVj4sIGluaXRpYWxTdGF0ZT86IFQpID0+IHtcbiAgICByZWR1Y2VyID0gcmVkdWNlckZhY3RvcnkocmVkdWNlcik7XG5cbiAgICByZXR1cm4gKHN0YXRlOiBUIHwgdW5kZWZpbmVkLCBhY3Rpb246IFYpID0+IHtcbiAgICAgIHN0YXRlID0gc3RhdGUgPT09IHVuZGVmaW5lZCA/IGluaXRpYWxTdGF0ZSA6IHN0YXRlO1xuICAgICAgcmV0dXJuIHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG4gICAgfTtcbiAgfTtcbn1cbiJdfQ==