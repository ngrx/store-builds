import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
class MockReducerManager extends BehaviorSubject {
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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: MockReducerManager, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: MockReducerManager }); }
}
export { MockReducerManager };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: MockReducerManager, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19yZWR1Y2VyX21hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3Rlc3Rpbmcvc3JjL21vY2tfcmVkdWNlcl9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFHdkMsTUFDYSxrQkFBbUIsU0FBUSxlQUV2QztJQUNDO1FBQ0UsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxVQUFVLENBQUMsT0FBWTtRQUNyQixVQUFVO0lBQ1osQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFZO1FBQ3RCLFVBQVU7SUFDWixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQVk7UUFDeEIsVUFBVTtJQUNaLENBQUM7SUFFRCxjQUFjLENBQUMsUUFBYTtRQUMxQixVQUFVO0lBQ1osQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFRLEVBQUUsT0FBWTtRQUMvQixVQUFVO0lBQ1osQ0FBQztJQUVELFdBQVcsQ0FBQyxRQUFhO1FBQ3ZCLFVBQVU7SUFDWixDQUFDO0lBRUQsYUFBYSxDQUFDLFVBQWU7UUFDM0IsVUFBVTtJQUNaLENBQUM7SUFFRCxjQUFjLENBQUMsV0FBZ0I7UUFDN0IsVUFBVTtJQUNaLENBQUM7aUlBckNVLGtCQUFrQjtxSUFBbEIsa0JBQWtCOztTQUFsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFEOUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWN0aW9uUmVkdWNlciB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vY2tSZWR1Y2VyTWFuYWdlciBleHRlbmRzIEJlaGF2aW9yU3ViamVjdDxcbiAgQWN0aW9uUmVkdWNlcjxhbnksIGFueT5cbj4ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigoKSA9PiB1bmRlZmluZWQpO1xuICB9XG5cbiAgYWRkRmVhdHVyZShmZWF0dXJlOiBhbnkpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICBhZGRGZWF0dXJlcyhmZWF0dXJlOiBhbnkpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICByZW1vdmVGZWF0dXJlKGZlYXR1cmU6IGFueSkge1xuICAgIC8qIG5vb3AgKi9cbiAgfVxuXG4gIHJlbW92ZUZlYXR1cmVzKGZlYXR1cmVzOiBhbnkpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICBhZGRSZWR1Y2VyKGtleTogYW55LCByZWR1Y2VyOiBhbnkpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICBhZGRSZWR1Y2VycyhyZWR1Y2VyczogYW55KSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG5cbiAgcmVtb3ZlUmVkdWNlcihmZWF0dXJlS2V5OiBhbnkpIHtcbiAgICAvKiBub29wICovXG4gIH1cblxuICByZW1vdmVSZWR1Y2VycyhmZWF0dXJlS2V5czogYW55KSB7XG4gICAgLyogbm9vcCAqL1xuICB9XG59XG4iXX0=