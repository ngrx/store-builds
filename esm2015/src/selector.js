/**
 * @fileoverview added by tsickle
 * Generated from: src/selector.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isDevMode } from '@angular/core';
import { isNgrxMockEnvironment } from './flags';
/**
 * @record
 * @template State, Result, ProjectorFn
 */
export function MemoizedSelector() { }
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
export function MemoizedSelectorWithProps() { }
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
export function isEqualCheck(a, b) {
    return a === b;
}
/**
 * @param {?} args
 * @param {?} lastArguments
 * @param {?} comparator
 * @return {?}
 */
function isArgumentsChanged(args, lastArguments, comparator) {
    for (let i = 0; i < args.length; i++) {
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
export function resultMemoize(projectionFn, isResultEqual) {
    return defaultMemoize(projectionFn, isEqualCheck, isResultEqual);
}
/**
 * @param {?} projectionFn
 * @param {?=} isArgumentsEqual
 * @param {?=} isResultEqual
 * @return {?}
 */
export function defaultMemoize(projectionFn, isArgumentsEqual = isEqualCheck, isResultEqual = isEqualCheck) {
    /** @type {?} */
    let lastArguments = null;
    // tslint:disable-next-line:no-any anything could be the result.
    /** @type {?} */
    let lastResult = null;
    /** @type {?} */
    let overrideResult;
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
    function setResult(result = undefined) {
        overrideResult = { result };
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
            lastResult = projectionFn.apply(null, (/** @type {?} */ (arguments)));
            lastArguments = arguments;
            return lastResult;
        }
        if (!isArgumentsChanged(arguments, lastArguments, isArgumentsEqual)) {
            return lastResult;
        }
        /** @type {?} */
        const newResult = projectionFn.apply(null, (/** @type {?} */ (arguments)));
        lastArguments = arguments;
        if (isResultEqual(lastResult, newResult)) {
            return lastResult;
        }
        lastResult = newResult;
        return newResult;
    }
    return { memoized, reset, setResult, clearResult };
}
/**
 * @param {...?} input
 * @return {?}
 */
export function createSelector(...input) {
    return createSelectorFactory(defaultMemoize)(...input);
}
/**
 * @param {?} state
 * @param {?} selectors
 * @param {?} props
 * @param {?} memoizedProjector
 * @return {?}
 */
export function defaultStateFn(state, selectors, props, memoizedProjector) {
    if (props === undefined) {
        /** @type {?} */
        const args = ((/** @type {?} */ (selectors))).map((/**
         * @param {?} fn
         * @return {?}
         */
        (fn) => fn(state)));
        return memoizedProjector.memoized.apply(null, args);
    }
    /** @type {?} */
    const args = ((/** @type {?} */ (selectors))).map((/**
     * @param {?} fn
     * @return {?}
     */
    (fn) => fn(state, props)));
    return memoizedProjector.memoized.apply(null, [...args, props]);
}
/**
 *
 * \@usageNotes
 *
 * **Creating a Selector Factory Where Array Order Does Not Matter**
 *
 * ```ts
 * function removeMatch(arr: string[], target: string): string[] {
 *   const matchIndex = arr.indexOf(target);
 *   return [...arr.slice(0, matchIndex), ...arr.slice(matchIndex + 1)];
 * }
 *
 * function orderDoesNotMatterComparer(a: any, b: any): boolean {
 *   if (!Array.isArray(a) || !Array.isArray(b)) {
 *     return a === b;
 *   }
 *   if (a.length !== b.length) {
 *     return false;
 *   }
 *   let tempB = [...b];
 *   function reduceToDetermineIfArraysContainSameContents(
 *     previousCallResult: boolean,
 *     arrayMember: any
 *   ): boolean {
 *     if (previousCallResult === false) {
 *       return false;
 *     }
 *     if (tempB.includes(arrayMember)) {
 *       tempB = removeMatch(tempB, arrayMember);
 *       return true;
 *     }
 *     return false;
 *   }
 *   return a.reduce(reduceToDetermineIfArraysContainSameContents, true);
 * }
 *
 * export const creactOrderDoesNotMatterSelector = createSelectorFactory(
 *   (projectionFun) => defaultMemoize(
 *     projectionFun,
 *     orderDoesNotMatterComparer,
 *     orderDoesNotMatterComparer
 *   )
 * );
 * ```
 *
 * **Creating an Alternative Memoization Strategy**
 *
 * ```ts
 * function serialize(x: any): string {
 *   return JSON.stringify(x);
 * }
 *
 * export const createFullHistorySelector = createSelectorFactory(
 *  (projectionFunction) => {
 *    const cache = {};
 *
 *    function memoized() {
 *      const serializedArguments = serialize(...arguments);
 *       if (cache[serializedArguments] != null) {
 *         cache[serializedArguments] = projectionFunction.apply(null, arguments);
 *       }
 *       return cache[serializedArguments];
 *     }
 *     return {
 *       memoized,
 *       reset: () => {},
 *       setResult: () => {},
 *       clearResult: () => {},
 *     };
 *   }
 * );
 * ```
 *
 *
 * @param {?} memoize The function used to memoize selectors
 * @param {?=} options Config Object that may include a `stateFn` function defining how to return the selector's value, given the entire `Store`'s state, parent `Selector`s, `Props`, and a `MemoizedProjection`
 *
 * @return {?}
 */
export function createSelectorFactory(memoize, options = {
    stateFn: defaultStateFn,
}) {
    return (/**
     * @param {...?} input
     * @return {?}
     */
    function (...input) {
        /** @type {?} */
        let args = input;
        if (Array.isArray(args[0])) {
            const [head, ...tail] = args;
            args = [...head, ...tail];
        }
        /** @type {?} */
        const selectors = args.slice(0, args.length - 1);
        /** @type {?} */
        const projector = args[args.length - 1];
        /** @type {?} */
        const memoizedSelectors = selectors.filter((/**
         * @param {?} selector
         * @return {?}
         */
        (selector) => selector.release && typeof selector.release === 'function'));
        /** @type {?} */
        const memoizedProjector = memoize((/**
         * @param {...?} selectors
         * @return {?}
         */
        function (...selectors) {
            return projector.apply(null, selectors);
        }));
        /** @type {?} */
        const memoizedState = defaultMemoize((/**
         * @param {?} state
         * @param {?} props
         * @return {?}
         */
        function (state, props) {
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
            memoizedSelectors.forEach((/**
             * @param {?} selector
             * @return {?}
             */
            (selector) => selector.release()));
        }
        return Object.assign(memoizedState.memoized, {
            release,
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
export function createFeatureSelector(featureName) {
    return createSelector((/**
     * @param {?} state
     * @return {?}
     */
    (state) => {
        /** @type {?} */
        const featureState = state[featureName];
        if (!isNgrxMockEnvironment() && isDevMode() && !(featureName in state)) {
            console.warn(`@ngrx/store: The feature name \"${featureName}\" does ` +
                'not exist in the state, therefore createFeatureSelector ' +
                'cannot access it.  Be sure it is imported in a loaded module ' +
                `using StoreModule.forRoot('${featureName}', ...) or ` +
                `StoreModule.forFeature('${featureName}', ...).  If the default ` +
                'state is intended to be undefined, as is the case with router ' +
                'state, this development-only warning message can be ignored.');
        }
        return featureState;
    }), (/**
     * @param {?} featureState
     * @return {?}
     */
    (featureState) => featureState));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS8iLCJzb3VyY2VzIjpbInNyYy9zZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sU0FBUyxDQUFDOzs7OztBQWlCaEQsc0NBU0M7OztJQUhDLHFDQUF1Qjs7SUFDdkIscUNBQXFDOztJQUNyQyx1Q0FBd0I7Ozs7SUFIeEIscURBQWdCOzs7Ozs7QUFNbEIsK0NBVUM7OztJQUhDLDhDQUF1Qjs7SUFDdkIsOENBQXFDOztJQUNyQyxnREFBd0I7Ozs7SUFIeEIsOERBQWdCOzs7Ozs7O0FBTWxCLE1BQU0sVUFBVSxZQUFZLENBQUMsQ0FBTSxFQUFFLENBQU07SUFDekMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pCLENBQUM7Ozs7Ozs7QUFFRCxTQUFTLGtCQUFrQixDQUN6QixJQUFnQixFQUNoQixhQUF5QixFQUN6QixVQUF3QjtJQUV4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMxQyxPQUFPLElBQUksQ0FBQztTQUNiO0tBQ0Y7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxhQUFhLENBQzNCLFlBQW1CLEVBQ25CLGFBQTJCO0lBRTNCLE9BQU8sY0FBYyxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDbkUsQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxjQUFjLENBQzVCLFlBQW1CLEVBQ25CLGdC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QUMsUUFBUSxFQUFFO1lBQzNDLE9BQU87WUFDUCxTQUFTLEVBQUUsaUJBQWlCLENBQUMsUUFBUTtZQUNyQyxTQUFTLEVBQUUsYUFBYSxDQUFDLFNBQVM7WUFDbEMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxXQUFXO1NBQ3ZDLENBQUMsQ0FBQztJQUNMLENBQUMsRUFBQztBQUNKLENBQUM7Ozs7O0FBUUQsTUFBTSxVQUFVLHFCQUFxQixDQUNuQyxXQUFnQjtJQUVoQixPQUFPLGNBQWM7Ozs7SUFDbkIsQ0FBQyxLQUFVLEVBQUUsRUFBRTs7Y0FDUCxZQUFZLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUN2QyxJQUFJLENBQUMscUJBQXFCLEVBQUUsSUFBSSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQ3RFLE9BQU8sQ0FBQyxJQUFJLENBQ1YsbUNBQW1DLFdBQVcsVUFBVTtnQkFDdEQsMERBQTBEO2dCQUMxRCwrREFBK0Q7Z0JBQy9ELDhCQUE4QixXQUFXLGFBQWE7Z0JBQ3RELDJCQUEyQixXQUFXLDJCQUEyQjtnQkFDakUsZ0VBQWdFO2dCQUNoRSw4REFBOEQsQ0FDakUsQ0FBQztTQUNIO1FBQ0QsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQzs7OztJQUNELENBQUMsWUFBaUIsRUFBRSxFQUFFLENBQUMsWUFBWSxFQUNwQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlbGVjdG9yLCBTZWxlY3RvcldpdGhQcm9wcyB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNOZ3J4TW9ja0Vudmlyb25tZW50IH0gZnJvbSAnLi9mbGFncyc7XG5cbmV4cG9ydCB0eXBlIEFueUZuID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cbmV4cG9ydCB0eXBlIE1lbW9pemVkUHJvamVjdGlvbiA9IHtcbiAgbWVtb2l6ZWQ6IEFueUZuO1xuICByZXNldDogKCkgPT4gdm9pZDtcbiAgc2V0UmVzdWx0OiAocmVzdWx0PzogYW55KSA9PiB2b2lkO1xuICBjbGVhclJlc3VsdDogKCkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIE1lbW9pemVGbiA9ICh0OiBBbnlGbikgPT4gTWVtb2l6ZWRQcm9qZWN0aW9uO1xuXG5leHBvcnQgdHlwZSBDb21wYXJhdG9yRm4gPSAoYTogYW55LCBiOiBhbnkpID0+IGJvb2xlYW47XG5cbmV4cG9ydCB0eXBlIERlZmF1bHRQcm9qZWN0b3JGbjxUPiA9ICguLi5hcmdzOiBhbnlbXSkgPT4gVDtcblxuZXhwb3J0IGludGVyZmFjZSBNZW1vaXplZFNlbGVjdG9yPFxuICBTdGF0ZSxcbiAgUmVzdWx0LFxuICBQcm9qZWN0b3JGbiA9IERlZmF1bHRQcm9qZWN0b3JGbjxSZXN1bHQ+XG4+IGV4dGVuZHMgU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD4ge1xuICByZWxlYXNlKCk6IHZvaWQ7XG4gIHByb2plY3RvcjogUHJvamVjdG9yRm47XG4gIHNldFJlc3VsdDogKHJlc3VsdD86IFJlc3VsdCkgPT4gdm9pZDtcbiAgY2xlYXJSZXN1bHQ6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxcbiAgU3RhdGUsXG4gIFByb3BzLFxuICBSZXN1bHQsXG4gIFByb2plY3RvckZuID0gRGVmYXVsdFByb2plY3RvckZuPFJlc3VsdD5cbj4gZXh0ZW5kcyBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD4ge1xuICByZWxlYXNlKCk6IHZvaWQ7XG4gIHByb2plY3RvcjogUHJvamVjdG9yRm47XG4gIHNldFJlc3VsdDogKHJlc3VsdD86IFJlc3VsdCkgPT4gdm9pZDtcbiAgY2xlYXJSZXN1bHQ6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsQ2hlY2soYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIGEgPT09IGI7XG59XG5cbmZ1bmN0aW9uIGlzQXJndW1lbnRzQ2hhbmdlZChcbiAgYXJnczogSUFyZ3VtZW50cyxcbiAgbGFzdEFyZ3VtZW50czogSUFyZ3VtZW50cyxcbiAgY29tcGFyYXRvcjogQ29tcGFyYXRvckZuXG4pIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFjb21wYXJhdG9yKGFyZ3NbaV0sIGxhc3RBcmd1bWVudHNbaV0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzdWx0TWVtb2l6ZShcbiAgcHJvamVjdGlvbkZuOiBBbnlGbixcbiAgaXNSZXN1bHRFcXVhbDogQ29tcGFyYXRvckZuXG4pIHtcbiAgcmV0dXJuIGRlZmF1bHRNZW1vaXplKHByb2plY3Rpb25GbiwgaXNFcXVhbENoZWNrLCBpc1Jlc3VsdEVxdWFsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRNZW1vaXplKFxuICBwcm9qZWN0aW9uRm46IEFueUZuLFxuICBpc0FyZ3VtZW50c0VxdWFsID0gaXNFcXVhbENoZWNrLFxuICBpc1Jlc3VsdEVxdWFsID0gaXNFcXVhbENoZWNrXG4pOiBNZW1vaXplZFByb2plY3Rpb24ge1xuICBsZXQgbGFzdEFyZ3VtZW50czogbnVsbCB8IElBcmd1bWVudHMgPSBudWxsO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55IGFueXRoaW5nIGNvdWxkIGJlIHRoZSByZXN1bHQuXG4gIGxldCBsYXN0UmVzdWx0OiBhbnkgPSBudWxsO1xuICBsZXQgb3ZlcnJpZGVSZXN1bHQ6IGFueTtcblxuICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBsYXN0QXJndW1lbnRzID0gbnVsbDtcbiAgICBsYXN0UmVzdWx0ID0gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFJlc3VsdChyZXN1bHQ6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIG92ZXJyaWRlUmVzdWx0ID0geyByZXN1bHQgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyUmVzdWx0KCkge1xuICAgIG92ZXJyaWRlUmVzdWx0ID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSBhbnl0aGluZyBjb3VsZCBiZSB0aGUgcmVzdWx0LlxuICBmdW5jdGlvbiBtZW1vaXplZCgpOiBhbnkge1xuICAgIGlmIChvdmVycmlkZVJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gb3ZlcnJpZGVSZXN1bHQucmVzdWx0O1xuICAgIH1cblxuICAgIGlmICghbGFzdEFyZ3VtZW50cykge1xuICAgICAgbGFzdFJlc3VsdCA9IHByb2plY3Rpb25Gbi5hcHBseShudWxsLCBhcmd1bWVudHMgYXMgYW55KTtcbiAgICAgIGxhc3RBcmd1bWVudHMgPSBhcmd1bWVudHM7XG4gICAgICByZXR1cm4gbGFzdFJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAoIWlzQXJndW1lbnRzQ2hhbmdlZChhcmd1bWVudHMsIGxhc3RBcmd1bWVudHMsIGlzQXJndW1lbnRzRXF1YWwpKSB7XG4gICAgICByZXR1cm4gbGFzdFJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdSZXN1bHQgPSBwcm9qZWN0aW9uRm4uYXBwbHkobnVsbCwgYXJndW1lbnRzIGFzIGFueSk7XG4gICAgbGFzdEFyZ3VtZW50cyA9IGFyZ3VtZW50cztcblxuICAgIGlmIChpc1Jlc3VsdEVxdWFsKGxhc3RSZXN1bHQsIG5ld1Jlc3VsdCkpIHtcbiAgICAgIHJldHVybiBsYXN0UmVzdWx0O1xuICAgIH1cblxuICAgIGxhc3RSZXN1bHQgPSBuZXdSZXN1bHQ7XG5cbiAgICByZXR1cm4gbmV3UmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIHsgbWVtb2l6ZWQsIHJlc2V0LCBzZXRSZXN1bHQsIGNsZWFyUmVzdWx0IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBwcm9qZWN0b3I6IChzMTogUzEpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbU2VsZWN0b3I8U3RhdGUsIFMxPl0sXG4gIHByb2plY3RvcjogKHMxOiBTMSkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1NlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+XSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBwcm9wczogUHJvcHMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgczI6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1NlbGVjdG9yPFN0YXRlLCBTMT4sIFNlbGVjdG9yPFN0YXRlLCBTMj5dLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMikgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPlxuICBdLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgczM6IFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUzMsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgczI6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICBzMzogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbU2VsZWN0b3I8U3RhdGUsIFMxPiwgU2VsZWN0b3I8U3RhdGUsIFMyPiwgU2VsZWN0b3I8U3RhdGUsIFMzPl0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUzMsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHMyOiBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICBzMzogU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgczQ6IFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBTMywgUzQsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgczI6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICBzMzogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gIHM0OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBwcm9wczogUHJvcHMpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzQ+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBTMywgUzQsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgcHJvcHM6IFByb3BzKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUmVzdWx0PihcbiAgczE6IFNlbGVjdG9yPFN0YXRlLCBTMT4sXG4gIHMyOiBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICBzMzogU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgczQ6IFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gIHM1OiBTZWxlY3RvcjxTdGF0ZSwgUzU+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yPFN0YXRlLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBQcm9wcywgUzEsIFMyLCBTMywgUzQsIFM1LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gIHMyOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgczM6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICBzNDogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gIHM1OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM1PixcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNT5cbiAgXSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNT5cbiAgXSxcbiAgcHJvamVjdG9yOiAoczE6IFMxLCBzMjogUzIsIHMzOiBTMywgczQ6IFM0LCBzNTogUzUsIHByb3BzOiBQcm9wcykgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgczI6IFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gIHMzOiBTZWxlY3RvcjxTdGF0ZSwgUzM+LFxuICBzNDogU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgczU6IFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gIHM2OiBTZWxlY3RvcjxTdGF0ZSwgUzY+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSwgczY6IFM2KSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3I8U3RhdGUsIFJlc3VsdD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3I8U3RhdGUsIFByb3BzLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBSZXN1bHQ+KFxuICBzMTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gIHMyOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgczM6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICBzNDogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gIHM1OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM1PixcbiAgczY6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzY+LFxuICBwcm9qZWN0b3I6IChcbiAgICBzMTogUzEsXG4gICAgczI6IFMyLFxuICAgIHMzOiBTMyxcbiAgICBzNDogUzQsXG4gICAgczU6IFM1LFxuICAgIHM2OiBTNixcbiAgICBwcm9wczogUHJvcHNcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMzPixcblxuICAgIFNlbGVjdG9yPFN0YXRlLCBTND4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM1PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzY+XG4gIF0sXG4gIHByb2plY3RvcjogKHMxOiBTMSwgczI6IFMyLCBzMzogUzMsIHM0OiBTNCwgczU6IFM1LCBzNjogUzYpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUHJvcHMsIFMxLCBTMiwgUzMsIFM0LCBTNSwgUzYsIFJlc3VsdD4oXG4gIHNlbGVjdG9yczogW1xuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzI+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzU+LFxuICAgIFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzY+XG4gIF0sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHByb3BzOiBQcm9wc1xuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFJlc3VsdD47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBTNiwgUzcsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgczM6IFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gIHM0OiBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICBzNTogU2VsZWN0b3I8U3RhdGUsIFM1PixcbiAgczY6IFNlbGVjdG9yPFN0YXRlLCBTNj4sXG4gIHM3OiBTZWxlY3RvcjxTdGF0ZSwgUzc+LFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSwgczY6IFM2LCBzNzogUzcpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxcbiAgU3RhdGUsXG4gIFByb3BzLFxuICBTMSxcbiAgUzIsXG4gIFMzLFxuICBTNCxcbiAgUzUsXG4gIFM2LFxuICBTNyxcbiAgUmVzdWx0XG4+KFxuICBzMTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gIHMyOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgczM6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzM+LFxuICBzNDogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gIHM1OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM1PixcbiAgczY6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzY+LFxuICBzNzogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNz4sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHM3OiBTNyxcbiAgICBwcm9wczogUHJvcHNcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBTNywgUmVzdWx0PihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMxPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzI+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM0PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzU+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM3PlxuICBdLFxuICBwcm9qZWN0b3I6IChzMTogUzEsIHMyOiBTMiwgczM6IFMzLCBzNDogUzQsIHM1OiBTNSwgczY6IFM2LCBzNzogUzcpID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxcbiAgU3RhdGUsXG4gIFByb3BzLFxuICBTMSxcbiAgUzIsXG4gIFMzLFxuICBTNCxcbiAgUzUsXG4gIFM2LFxuICBTNyxcbiAgUmVzdWx0XG4+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMxPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMyPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM0PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM1PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM2PixcbiAgICBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM3PlxuICBdLFxuICBwcm9qZWN0b3I6IChcbiAgICBzMTogUzEsXG4gICAgczI6IFMyLFxuICAgIHMzOiBTMyxcbiAgICBzNDogUzQsXG4gICAgczU6IFM1LFxuICAgIHM2OiBTNixcbiAgICBzNzogUzcsXG4gICAgcHJvcHM6IFByb3BzXG4gICkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yPFN0YXRlLCBTMSwgUzIsIFMzLCBTNCwgUzUsIFM2LCBTNywgUzgsIFJlc3VsdD4oXG4gIHMxOiBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICBzMjogU2VsZWN0b3I8U3RhdGUsIFMyPixcbiAgczM6IFNlbGVjdG9yPFN0YXRlLCBTMz4sXG4gIHM0OiBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICBzNTogU2VsZWN0b3I8U3RhdGUsIFM1PixcbiAgczY6IFNlbGVjdG9yPFN0YXRlLCBTNj4sXG4gIHM3OiBTZWxlY3RvcjxTdGF0ZSwgUzc+LFxuICBzODogU2VsZWN0b3I8U3RhdGUsIFM4PixcbiAgcHJvamVjdG9yOiAoXG4gICAgczE6IFMxLFxuICAgIHMyOiBTMixcbiAgICBzMzogUzMsXG4gICAgczQ6IFM0LFxuICAgIHM1OiBTNSxcbiAgICBzNjogUzYsXG4gICAgczc6IFM3LFxuICAgIHM4OiBTOFxuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxcbiAgU3RhdGUsXG4gIFByb3BzLFxuICBTMSxcbiAgUzIsXG4gIFMzLFxuICBTNCxcbiAgUzUsXG4gIFM2LFxuICBTNyxcbiAgUzgsXG4gIFJlc3VsdFxuPihcbiAgczE6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzE+LFxuICBzMjogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gIHMzOiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFMzPixcbiAgczQ6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzQ+LFxuICBzNTogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNT4sXG4gIHM2OiBTZWxlY3RvcldpdGhQcm9wczxTdGF0ZSwgUHJvcHMsIFM2PixcbiAgczc6IFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUzc+LFxuICBzODogU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTOD4sXG4gIHByb2plY3RvcjogKFxuICAgIHMxOiBTMSxcbiAgICBzMjogUzIsXG4gICAgczM6IFMzLFxuICAgIHM0OiBTNCxcbiAgICBzNTogUzUsXG4gICAgczY6IFM2LFxuICAgIHM3OiBTNyxcbiAgICBzODogUzgsXG4gICAgcHJvcHM6IFByb3BzXG4gICkgPT4gUmVzdWx0XG4pOiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFN0YXRlLCBQcm9wcywgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxTdGF0ZSwgUzEsIFMyLCBTMywgUzQsIFM1LCBTNiwgUzcsIFM4LCBSZXN1bHQ+KFxuICBzZWxlY3RvcnM6IFtcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzE+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTMj4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFMzPixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzQ+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTNT4sXG4gICAgU2VsZWN0b3I8U3RhdGUsIFM2PixcbiAgICBTZWxlY3RvcjxTdGF0ZSwgUzc+LFxuICAgIFNlbGVjdG9yPFN0YXRlLCBTOD5cbiAgXSxcbiAgcHJvamVjdG9yOiAoXG4gICAgczE6IFMxLFxuICAgIHMyOiBTMixcbiAgICBzMzogUzMsXG4gICAgczQ6IFM0LFxuICAgIHM1OiBTNSxcbiAgICBzNjogUzYsXG4gICAgczc6IFM3LFxuICAgIHM4OiBTOFxuICApID0+IFJlc3VsdFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxTdGF0ZSwgUmVzdWx0PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcjxcbiAgU3RhdGUsXG4gIFByb3BzLFxuICBTMSxcbiAgUzIsXG4gIFMzLFxuICBTNCxcbiAgUzUsXG4gIFM2LFxuICBTNyxcbiAgUzgsXG4gIFJlc3VsdFxuPihcbiAgc2VsZWN0b3JzOiBbXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMj4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTMz4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTND4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNT4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNj4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTNz4sXG4gICAgU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBTOD5cbiAgXSxcbiAgcHJvamVjdG9yOiAoXG4gICAgczE6IFMxLFxuICAgIHMyOiBTMixcbiAgICBzMzogUzMsXG4gICAgczQ6IFM0LFxuICAgIHM1OiBTNSxcbiAgICBzNjogUzYsXG4gICAgczc6IFM3LFxuICAgIHM4OiBTOCxcbiAgICBwcm9wczogUHJvcHNcbiAgKSA9PiBSZXN1bHRcbik6IE1lbW9pemVkU2VsZWN0b3JXaXRoUHJvcHM8U3RhdGUsIFByb3BzLCBSZXN1bHQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3IoXG4gIC4uLmlucHV0OiBhbnlbXVxuKTogTWVtb2l6ZWRTZWxlY3RvcjxhbnksIGFueT4gfCBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPGFueSwgYW55LCBhbnk+IHtcbiAgcmV0dXJuIGNyZWF0ZVNlbGVjdG9yRmFjdG9yeShkZWZhdWx0TWVtb2l6ZSkoLi4uaW5wdXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFN0YXRlRm4oXG4gIHN0YXRlOiBhbnksXG4gIHNlbGVjdG9yczogU2VsZWN0b3I8YW55LCBhbnk+W10gfCBTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgYW55PltdLFxuICBwcm9wczogYW55LFxuICBtZW1vaXplZFByb2plY3RvcjogTWVtb2l6ZWRQcm9qZWN0aW9uXG4pOiBhbnkge1xuICBpZiAocHJvcHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGFyZ3MgPSAoPFNlbGVjdG9yPGFueSwgYW55PltdPnNlbGVjdG9ycykubWFwKChmbikgPT4gZm4oc3RhdGUpKTtcbiAgICByZXR1cm4gbWVtb2l6ZWRQcm9qZWN0b3IubWVtb2l6ZWQuYXBwbHkobnVsbCwgYXJncyk7XG4gIH1cblxuICBjb25zdCBhcmdzID0gKDxTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgYW55PltdPnNlbGVjdG9ycykubWFwKChmbikgPT5cbiAgICBmbihzdGF0ZSwgcHJvcHMpXG4gICk7XG4gIHJldHVybiBtZW1vaXplZFByb2plY3Rvci5tZW1vaXplZC5hcHBseShudWxsLCBbLi4uYXJncywgcHJvcHNdKTtcbn1cblxuZXhwb3J0IHR5cGUgU2VsZWN0b3JGYWN0b3J5Q29uZmlnPFQgPSBhbnksIFYgPSBhbnk+ID0ge1xuICBzdGF0ZUZuOiAoXG4gICAgc3RhdGU6IFQsXG4gICAgc2VsZWN0b3JzOiBTZWxlY3RvcjxhbnksIGFueT5bXSxcbiAgICBwcm9wczogYW55LFxuICAgIG1lbW9pemVkUHJvamVjdG9yOiBNZW1vaXplZFByb2plY3Rpb25cbiAgKSA9PiBWO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yRmFjdG9yeTxUID0gYW55LCBWID0gYW55PihcbiAgbWVtb2l6ZTogTWVtb2l6ZUZuXG4pOiAoLi4uaW5wdXQ6IGFueVtdKSA9PiBNZW1vaXplZFNlbGVjdG9yPFQsIFY+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yRmFjdG9yeTxUID0gYW55LCBWID0gYW55PihcbiAgbWVtb2l6ZTogTWVtb2l6ZUZuLFxuICBvcHRpb25zOiBTZWxlY3RvckZhY3RvcnlDb25maWc8VCwgVj5cbik6ICguLi5pbnB1dDogYW55W10pID0+IE1lbW9pemVkU2VsZWN0b3I8VCwgVj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VsZWN0b3JGYWN0b3J5PFQgPSBhbnksIFByb3BzID0gYW55LCBWID0gYW55PihcbiAgbWVtb2l6ZTogTWVtb2l6ZUZuXG4pOiAoLi4uaW5wdXQ6IGFueVtdKSA9PiBNZW1vaXplZFNlbGVjdG9yV2l0aFByb3BzPFQsIFByb3BzLCBWPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvckZhY3Rvcnk8VCA9IGFueSwgUHJvcHMgPSBhbnksIFYgPSBhbnk+KFxuICBtZW1vaXplOiBNZW1vaXplRm4sXG4gIG9wdGlvbnM6IFNlbGVjdG9yRmFjdG9yeUNvbmZpZzxULCBWPlxuKTogKC4uLmlucHV0OiBhbnlbXSkgPT4gTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxULCBQcm9wcywgVj47XG4vKipcbiAqXG4gKiBAcGFyYW0gbWVtb2l6ZSBUaGUgZnVuY3Rpb24gdXNlZCB0byBtZW1vaXplIHNlbGVjdG9yc1xuICogQHBhcmFtIG9wdGlvbnMgQ29uZmlnIE9iamVjdCB0aGF0IG1heSBpbmNsdWRlIGEgYHN0YXRlRm5gIGZ1bmN0aW9uIGRlZmluaW5nIGhvdyB0byByZXR1cm4gdGhlIHNlbGVjdG9yJ3MgdmFsdWUsIGdpdmVuIHRoZSBlbnRpcmUgYFN0b3JlYCdzIHN0YXRlLCBwYXJlbnQgYFNlbGVjdG9yYHMsIGBQcm9wc2AsIGFuZCBhIGBNZW1vaXplZFByb2plY3Rpb25gXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiAqKkNyZWF0aW5nIGEgU2VsZWN0b3IgRmFjdG9yeSBXaGVyZSBBcnJheSBPcmRlciBEb2VzIE5vdCBNYXR0ZXIqKlxuICpcbiAqIGBgYHRzXG4gKiBmdW5jdGlvbiByZW1vdmVNYXRjaChhcnI6IHN0cmluZ1tdLCB0YXJnZXQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAqICAgY29uc3QgbWF0Y2hJbmRleCA9IGFyci5pbmRleE9mKHRhcmdldCk7XG4gKiAgIHJldHVybiBbLi4uYXJyLnNsaWNlKDAsIG1hdGNoSW5kZXgpLCAuLi5hcnIuc2xpY2UobWF0Y2hJbmRleCArIDEpXTtcbiAqIH1cbiAqXG4gKiBmdW5jdGlvbiBvcmRlckRvZXNOb3RNYXR0ZXJDb21wYXJlcihhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4ge1xuICogICBpZiAoIUFycmF5LmlzQXJyYXkoYSkgfHwgIUFycmF5LmlzQXJyYXkoYikpIHtcbiAqICAgICByZXR1cm4gYSA9PT0gYjtcbiAqICAgfVxuICogICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XG4gKiAgICAgcmV0dXJuIGZhbHNlO1xuICogICB9XG4gKiAgIGxldCB0ZW1wQiA9IFsuLi5iXTtcbiAqICAgZnVuY3Rpb24gcmVkdWNlVG9EZXRlcm1pbmVJZkFycmF5c0NvbnRhaW5TYW1lQ29udGVudHMoXG4gKiAgICAgcHJldmlvdXNDYWxsUmVzdWx0OiBib29sZWFuLFxuICogICAgIGFycmF5TWVtYmVyOiBhbnlcbiAqICAgKTogYm9vbGVhbiB7XG4gKiAgICAgaWYgKHByZXZpb3VzQ2FsbFJlc3VsdCA9PT0gZmFsc2UpIHtcbiAqICAgICAgIHJldHVybiBmYWxzZTtcbiAqICAgICB9XG4gKiAgICAgaWYgKHRlbXBCLmluY2x1ZGVzKGFycmF5TWVtYmVyKSkge1xuICogICAgICAgdGVtcEIgPSByZW1vdmVNYXRjaCh0ZW1wQiwgYXJyYXlNZW1iZXIpO1xuICogICAgICAgcmV0dXJuIHRydWU7XG4gKiAgICAgfVxuICogICAgIHJldHVybiBmYWxzZTtcbiAqICAgfVxuICogICByZXR1cm4gYS5yZWR1Y2UocmVkdWNlVG9EZXRlcm1pbmVJZkFycmF5c0NvbnRhaW5TYW1lQ29udGVudHMsIHRydWUpO1xuICogfVxuICpcbiAqIGV4cG9ydCBjb25zdCBjcmVhY3RPcmRlckRvZXNOb3RNYXR0ZXJTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yRmFjdG9yeShcbiAqICAgKHByb2plY3Rpb25GdW4pID0+IGRlZmF1bHRNZW1vaXplKFxuICogICAgIHByb2plY3Rpb25GdW4sXG4gKiAgICAgb3JkZXJEb2VzTm90TWF0dGVyQ29tcGFyZXIsXG4gKiAgICAgb3JkZXJEb2VzTm90TWF0dGVyQ29tcGFyZXJcbiAqICAgKVxuICogKTtcbiAqIGBgYFxuICpcbiAqICoqQ3JlYXRpbmcgYW4gQWx0ZXJuYXRpdmUgTWVtb2l6YXRpb24gU3RyYXRlZ3kqKlxuICpcbiAqIGBgYHRzXG4gKiBmdW5jdGlvbiBzZXJpYWxpemUoeDogYW55KTogc3RyaW5nIHtcbiAqICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHgpO1xuICogfVxuICpcbiAqIGV4cG9ydCBjb25zdCBjcmVhdGVGdWxsSGlzdG9yeVNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3JGYWN0b3J5KFxuICogIChwcm9qZWN0aW9uRnVuY3Rpb24pID0+IHtcbiAqICAgIGNvbnN0IGNhY2hlID0ge307XG4gKlxuICogICAgZnVuY3Rpb24gbWVtb2l6ZWQoKSB7XG4gKiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRBcmd1bWVudHMgPSBzZXJpYWxpemUoLi4uYXJndW1lbnRzKTtcbiAqICAgICAgIGlmIChjYWNoZVtzZXJpYWxpemVkQXJndW1lbnRzXSAhPSBudWxsKSB7XG4gKiAgICAgICAgIGNhY2hlW3NlcmlhbGl6ZWRBcmd1bWVudHNdID0gcHJvamVjdGlvbkZ1bmN0aW9uLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gKiAgICAgICB9XG4gKiAgICAgICByZXR1cm4gY2FjaGVbc2VyaWFsaXplZEFyZ3VtZW50c107XG4gKiAgICAgfVxuICogICAgIHJldHVybiB7XG4gKiAgICAgICBtZW1vaXplZCxcbiAqICAgICAgIHJlc2V0OiAoKSA9PiB7fSxcbiAqICAgICAgIHNldFJlc3VsdDogKCkgPT4ge30sXG4gKiAgICAgICBjbGVhclJlc3VsdDogKCkgPT4ge30sXG4gKiAgICAgfTtcbiAqICAgfVxuICogKTtcbiAqIGBgYFxuICpcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvckZhY3RvcnkoXG4gIG1lbW9pemU6IE1lbW9pemVGbixcbiAgb3B0aW9uczogU2VsZWN0b3JGYWN0b3J5Q29uZmlnPGFueSwgYW55PiA9IHtcbiAgICBzdGF0ZUZuOiBkZWZhdWx0U3RhdGVGbixcbiAgfVxuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoXG4gICAgLi4uaW5wdXQ6IGFueVtdXG4gICk6IE1lbW9pemVkU2VsZWN0b3I8YW55LCBhbnk+IHwgTWVtb2l6ZWRTZWxlY3RvcldpdGhQcm9wczxhbnksIGFueSwgYW55PiB7XG4gICAgbGV0IGFyZ3MgPSBpbnB1dDtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcmdzWzBdKSkge1xuICAgICAgY29uc3QgW2hlYWQsIC4uLnRhaWxdID0gYXJncztcbiAgICAgIGFyZ3MgPSBbLi4uaGVhZCwgLi4udGFpbF07XG4gICAgfVxuXG4gICAgY29uc3Qgc2VsZWN0b3JzID0gYXJncy5zbGljZSgwLCBhcmdzLmxlbmd0aCAtIDEpO1xuICAgIGNvbnN0IHByb2plY3RvciA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcbiAgICBjb25zdCBtZW1vaXplZFNlbGVjdG9ycyA9IHNlbGVjdG9ycy5maWx0ZXIoXG4gICAgICAoc2VsZWN0b3I6IGFueSkgPT5cbiAgICAgICAgc2VsZWN0b3IucmVsZWFzZSAmJiB0eXBlb2Ygc2VsZWN0b3IucmVsZWFzZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICk7XG5cbiAgICBjb25zdCBtZW1vaXplZFByb2plY3RvciA9IG1lbW9pemUoZnVuY3Rpb24gKC4uLnNlbGVjdG9yczogYW55W10pIHtcbiAgICAgIHJldHVybiBwcm9qZWN0b3IuYXBwbHkobnVsbCwgc2VsZWN0b3JzKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IG1lbW9pemVkU3RhdGUgPSBkZWZhdWx0TWVtb2l6ZShmdW5jdGlvbiAoc3RhdGU6IGFueSwgcHJvcHM6IGFueSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuc3RhdGVGbi5hcHBseShudWxsLCBbXG4gICAgICAgIHN0YXRlLFxuICAgICAgICBzZWxlY3RvcnMsXG4gICAgICAgIHByb3BzLFxuICAgICAgICBtZW1vaXplZFByb2plY3RvcixcbiAgICAgIF0pO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcmVsZWFzZSgpIHtcbiAgICAgIG1lbW9pemVkU3RhdGUucmVzZXQoKTtcbiAgICAgIG1lbW9pemVkUHJvamVjdG9yLnJlc2V0KCk7XG5cbiAgICAgIG1lbW9pemVkU2VsZWN0b3JzLmZvckVhY2goKHNlbGVjdG9yKSA9PiBzZWxlY3Rvci5yZWxlYXNlKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG1lbW9pemVkU3RhdGUubWVtb2l6ZWQsIHtcbiAgICAgIHJlbGVhc2UsXG4gICAgICBwcm9qZWN0b3I6IG1lbW9pemVkUHJvamVjdG9yLm1lbW9pemVkLFxuICAgICAgc2V0UmVzdWx0OiBtZW1vaXplZFN0YXRlLnNldFJlc3VsdCxcbiAgICAgIGNsZWFyUmVzdWx0OiBtZW1vaXplZFN0YXRlLmNsZWFyUmVzdWx0LFxuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmVhdHVyZVNlbGVjdG9yPFQ+KFxuICBmZWF0dXJlTmFtZTogc3RyaW5nXG4pOiBNZW1vaXplZFNlbGVjdG9yPG9iamVjdCwgVD47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmVhdHVyZVNlbGVjdG9yPFQsIFY+KFxuICBmZWF0dXJlTmFtZToga2V5b2YgVFxuKTogTWVtb2l6ZWRTZWxlY3RvcjxULCBWPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGZWF0dXJlU2VsZWN0b3IoXG4gIGZlYXR1cmVOYW1lOiBhbnlcbik6IE1lbW9pemVkU2VsZWN0b3I8YW55LCBhbnk+IHtcbiAgcmV0dXJuIGNyZWF0ZVNlbGVjdG9yKFxuICAgIChzdGF0ZTogYW55KSA9PiB7XG4gICAgICBjb25zdCBmZWF0dXJlU3RhdGUgPSBzdGF0ZVtmZWF0dXJlTmFtZV07XG4gICAgICBpZiAoIWlzTmdyeE1vY2tFbnZpcm9ubWVudCgpICYmIGlzRGV2TW9kZSgpICYmICEoZmVhdHVyZU5hbWUgaW4gc3RhdGUpKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgQG5ncngvc3RvcmU6IFRoZSBmZWF0dXJlIG5hbWUgXFxcIiR7ZmVhdHVyZU5hbWV9XFxcIiBkb2VzIGAgK1xuICAgICAgICAgICAgJ25vdCBleGlzdCBpbiB0aGUgc3RhdGUsIHRoZXJlZm9yZSBjcmVhdGVGZWF0dXJlU2VsZWN0b3IgJyArXG4gICAgICAgICAgICAnY2Fubm90IGFjY2VzcyBpdC4gIEJlIHN1cmUgaXQgaXMgaW1wb3J0ZWQgaW4gYSBsb2FkZWQgbW9kdWxlICcgK1xuICAgICAgICAgICAgYHVzaW5nIFN0b3JlTW9kdWxlLmZvclJvb3QoJyR7ZmVhdHVyZU5hbWV9JywgLi4uKSBvciBgICtcbiAgICAgICAgICAgIGBTdG9yZU1vZHVsZS5mb3JGZWF0dXJlKCcke2ZlYXR1cmVOYW1lfScsIC4uLikuICBJZiB0aGUgZGVmYXVsdCBgICtcbiAgICAgICAgICAgICdzdGF0ZSBpcyBpbnRlbmRlZCB0byBiZSB1bmRlZmluZWQsIGFzIGlzIHRoZSBjYXNlIHdpdGggcm91dGVyICcgK1xuICAgICAgICAgICAgJ3N0YXRlLCB0aGlzIGRldmVsb3BtZW50LW9ubHkgd2FybmluZyBtZXNzYWdlIGNhbiBiZSBpZ25vcmVkLidcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmZWF0dXJlU3RhdGU7XG4gICAgfSxcbiAgICAoZmVhdHVyZVN0YXRlOiBhbnkpID0+IGZlYXR1cmVTdGF0ZVxuICApO1xufVxuIl19