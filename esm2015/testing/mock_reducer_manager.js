import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export class MockReducerManager extends BehaviorSubject {
    constructor() {
        super(() => undefined);
    }
    addFeature(feature) {
        /* noop */
    }
    addFeatures(feature) {
        /* noop */
    }
    removeFeature(feature) {
        /* noop */
    }
    removeFeatures(features) {
        /* noop */
    }
    addReducer(key, reducer) {
        /* noop */
    }
    addReducers(reducers) {
        /* noop */
    }
    removeReducer(featureKey) {
        /* noop */
    }
    removeReducers(featureKeys) {
        /* noop */
    }
}
/** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
MockReducerManager.decorators = [
    { type: Injectable }
];
/**
 * @type {function(): !Array<(null|{
 *   type: ?,
 *   decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>),
 * })>}
 * @nocollapse
 */
MockReducerManager.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19yZWR1Y2VyX21hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3Rlc3Rpbmcvc3JjL21vY2tfcmVkdWNlcl9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUl2QyxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsZUFFdkM7SUFDQztRQUNFLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVSxDQUFDLE9BQVk7UUFDckIsVUFBVTtJQUNaLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBWTtRQUN0QixVQUFVO0lBQ1osQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFZO1FBQ3hCLFVBQVU7SUFDWixDQUFDO0lBRUQsY0FBYyxDQUFDLFFBQWE7UUFDMUIsVUFBVTtJQUNaLENBQUM7SUFFRCxVQUFVLENBQUMsR0FBUSxFQUFFLE9BQVk7UUFDL0IsVUFBVTtJQUNaLENBQUM7SUFFRCxXQUFXLENBQUMsUUFBYTtRQUN2QixVQUFVO0lBQ1osQ0FBQztJQUVELGFBQWEsQ0FBQyxVQUFlO1FBQzNCLFVBQVU7SUFDWixDQUFDO0lBRUQsY0FBYyxDQUFDLFdBQWdCO1FBQzdCLFVBQVU7SUFDWixDQUFDOzs7O1lBdENGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjdGlvblJlZHVjZXIgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2NrUmVkdWNlck1hbmFnZXIgZXh0ZW5kcyBCZWhhdmlvclN1YmplY3Q8XG4gIEFjdGlvblJlZHVjZXI8YW55LCBhbnk+XG4+IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKCkgPT4gdW5kZWZpbmVkKTtcbiAgfVxuXG4gIGFkZEZlYXR1cmUoZmVhdHVyZTogYW55KSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgYWRkRmVhdHVyZXMoZmVhdHVyZTogYW55KSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgcmVtb3ZlRmVhdHVyZShmZWF0dXJlOiBhbnkpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICByZW1vdmVGZWF0dXJlcyhmZWF0dXJlczogYW55KSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgYWRkUmVkdWNlcihrZXk6IGFueSwgcmVkdWNlcjogYW55KSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgYWRkUmVkdWNlcnMocmVkdWNlcnM6IGFueSkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxuXG4gIHJlbW92ZVJlZHVjZXIoZmVhdHVyZUtleTogYW55KSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgcmVtb3ZlUmVkdWNlcnMoZmVhdHVyZUtleXM6IGFueSkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxufVxuIl19