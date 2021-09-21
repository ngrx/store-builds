import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActionsSubject } from './actions_subject';
import { INITIAL_REDUCERS, INITIAL_STATE, REDUCER_FACTORY } from './tokens';
import { createFeatureReducerFactory, createReducerFactory, omit, } from './utils';
export class ReducerObservable extends Observable {
}
export class ReducerManagerDispatcher extends ActionsSubject {
}
export const UPDATE = '@ngrx/store/update-reducers';
export class ReducerManager extends BehaviorSubject {
    constructor(dispatcher, initialState, reducers, reducerFactory) {
        super(reducerFactory(reducers, initialState));
        this.dispatcher = dispatcher;
        this.initialState = initialState;
        this.reducers = reducers;
        this.reducerFactory = reducerFactory;
    }
    get currentReducers() {
        return this.reducers;
    }
    addFeature(feature) {
        this.addFeatures([feature]);
    }
    addFeatures(features) {
        const reducers = features.reduce((reducerDict, { reducers, reducerFactory, metaReducers, initialState, key }) => {
            const reducer = typeof reducers === 'function'
                ? createFeatureReducerFactory(metaReducers)(reducers, initialState)
                : createReducerFactory(reducerFactory, metaReducers)(reducers, initialState);
            reducerDict[key] = reducer;
            return reducerDict;
        }, {});
        this.addReducers(reducers);
    }
    removeFeature(feature) {
        this.removeFeatures([feature]);
    }
    removeFeatures(features) {
        this.removeReducers(features.map((p) => p.key));
    }
    addReducer(key, reducer) {
        this.addReducers({ [key]: reducer });
    }
    addReducers(reducers) {
        this.reducers = Object.assign(Object.assign({}, this.reducers), reducers);
        this.updateReducers(Object.keys(reducers));
    }
    removeReducer(featureKey) {
        this.removeReducers([featureKey]);
    }
    removeReducers(featureKeys) {
        featureKeys.forEach((key) => {
            this.reducers = omit(this.reducers, key) /*TODO(#823)*/;
        });
        this.updateReducers(featureKeys);
    }
    updateReducers(featureKeys) {
        this.next(this.reducerFactory(this.reducers, this.initialState));
        this.dispatcher.next({
            type: UPDATE,
            features: featureKeys,
        });
    }
    ngOnDestroy() {
        this.complete();
    }
}
/** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
ReducerManager.decorators = [
    { type: Injectable }
];
/**
 * @type {function(): !Array<(null|{
 *   type: ?,
 *   decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>),
 * })>}
 * @nocollapse
 */
ReducerManager.ctorParameters = () => [
    { type: ReducerManagerDispatcher },
    { type: undefined, decorators: [{ type: Inject, args: [INITIAL_STATE,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [INITIAL_REDUCERS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [REDUCER_FACTORY,] }] }
];
export const REDUCER_MANAGER_PROVIDERS = [
    ReducerManager,
    { provide: ReducerObservable, useExisting: ReducerManager },
    { provide: ReducerManagerDispatcher, useExisting: ActionsSubject },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFRbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDNUUsT0FBTyxFQUNMLDJCQUEyQixFQUMzQixvQkFBb0IsRUFDcEIsSUFBSSxHQUNMLE1BQU0sU0FBUyxDQUFDO0FBRWpCLE1BQU0sT0FBZ0IsaUJBQWtCLFNBQVEsVUFFL0M7Q0FBRztBQUNKLE1BQU0sT0FBZ0Isd0JBQXlCLFNBQVEsY0FBYztDQUFHO0FBQ3hFLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyw2QkFBc0MsQ0FBQztBQUc3RCxNQUFNLE9BQU8sY0FDWCxTQUFRLGVBQXdDO0lBTWhELFlBQ1UsVUFBb0MsRUFDYixZQUFpQixFQUNkLFFBQW9DLEVBRTlELGNBQThDO1FBRXRELEtBQUssQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFOdEMsZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFDYixpQkFBWSxHQUFaLFlBQVksQ0FBSztRQUNkLGFBQVEsR0FBUixRQUFRLENBQTRCO1FBRTlELG1CQUFjLEdBQWQsY0FBYyxDQUFnQztJQUd4RCxDQUFDO0lBWkQsSUFBSSxlQUFlO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBWUQsVUFBVSxDQUFDLE9BQStCO1FBQ3hDLElBQUksQ0FBQyxXQUFXLENB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QUF3QixFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUU7Q0FDbkUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBY3Rpb25zU3ViamVjdCB9IGZyb20gJy4vYWN0aW9uc19zdWJqZWN0JztcbmltcG9ydCB7XG4gIEFjdGlvbixcbiAgQWN0aW9uUmVkdWNlcixcbiAgQWN0aW9uUmVkdWNlckZhY3RvcnksXG4gIEFjdGlvblJlZHVjZXJNYXAsXG4gIFN0b3JlRmVhdHVyZSxcbn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgSU5JVElBTF9SRURVQ0VSUywgSU5JVElBTF9TVEFURSwgUkVEVUNFUl9GQUNUT1JZIH0gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRmVhdHVyZVJlZHVjZXJGYWN0b3J5LFxuICBjcmVhdGVSZWR1Y2VyRmFjdG9yeSxcbiAgb21pdCxcbn0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZWR1Y2VyT2JzZXJ2YWJsZSBleHRlbmRzIE9ic2VydmFibGU8XG4gIEFjdGlvblJlZHVjZXI8YW55LCBhbnk+XG4+IHt9XG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVkdWNlck1hbmFnZXJEaXNwYXRjaGVyIGV4dGVuZHMgQWN0aW9uc1N1YmplY3Qge31cbmV4cG9ydCBjb25zdCBVUERBVEUgPSAnQG5ncngvc3RvcmUvdXBkYXRlLXJlZHVjZXJzJyBhcyBjb25zdDtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlZHVjZXJNYW5hZ2VyXG4gIGV4dGVuZHMgQmVoYXZpb3JTdWJqZWN0PEFjdGlvblJlZHVjZXI8YW55LCBhbnk+PlxuICBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGdldCBjdXJyZW50UmVkdWNlcnMoKTogQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT4ge1xuICAgIHJldHVybiB0aGlzLnJlZHVjZXJzO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkaXNwYXRjaGVyOiBSZWR1Y2VyTWFuYWdlckRpc3BhdGNoZXIsXG4gICAgQEluamVjdChJTklUSUFMX1NUQVRFKSBwcml2YXRlIGluaXRpYWxTdGF0ZTogYW55LFxuICAgIEBJbmplY3QoSU5JVElBTF9SRURVQ0VSUykgcHJpdmF0ZSByZWR1Y2VyczogQWN0aW9uUmVkdWNlck1hcDxhbnksIGFueT4sXG4gICAgQEluamVjdChSRURVQ0VSX0ZBQ1RPUlkpXG4gICAgcHJpdmF0ZSByZWR1Y2VyRmFjdG9yeTogQWN0aW9uUmVkdWNlckZhY3Rvcnk8YW55LCBhbnk+XG4gICkge1xuICAgIHN1cGVyKHJlZHVjZXJGYWN0b3J5KHJlZHVjZXJzLCBpbml0aWFsU3RhdGUpKTtcbiAgfVxuXG4gIGFkZEZlYXR1cmUoZmVhdHVyZTogU3RvcmVGZWF0dXJlPGFueSwgYW55Pikge1xuICAgIHRoaXMuYWRkRmVhdHVyZXMoW2ZlYXR1cmVdKTtcbiAgfVxuXG4gIGFkZEZlYXR1cmVzKGZlYXR1cmVzOiBTdG9yZUZlYXR1cmU8YW55LCBhbnk+W10pIHtcbiAgICBjb25zdCByZWR1Y2VycyA9IGZlYXR1cmVzLnJlZHVjZShcbiAgICAgIChcbiAgICAgICAgcmVkdWNlckRpY3QsXG4gICAgICAgIHsgcmVkdWNlcnMsIHJlZHVjZXJGYWN0b3J5LCBtZXRhUmVkdWNlcnMsIGluaXRpYWxTdGF0ZSwga2V5IH1cbiAgICAgICkgPT4ge1xuICAgICAgICBjb25zdCByZWR1Y2VyID1cbiAgICAgICAgICB0eXBlb2YgcmVkdWNlcnMgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gY3JlYXRlRmVhdHVyZVJlZHVjZXJGYWN0b3J5KG1ldGFSZWR1Y2VycykocmVkdWNlcnMsIGluaXRpYWxTdGF0ZSlcbiAgICAgICAgICAgIDogY3JlYXRlUmVkdWNlckZhY3RvcnkocmVkdWNlckZhY3RvcnksIG1ldGFSZWR1Y2VycykoXG4gICAgICAgICAgICAgICAgcmVkdWNlcnMsXG4gICAgICAgICAgICAgICAgaW5pdGlhbFN0YXRlXG4gICAgICAgICAgICAgICk7XG5cbiAgICAgICAgcmVkdWNlckRpY3Rba2V5XSA9IHJlZHVjZXI7XG4gICAgICAgIHJldHVybiByZWR1Y2VyRGljdDtcbiAgICAgIH0sXG4gICAgICB7fSBhcyB7IFtrZXk6IHN0cmluZ106IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+IH1cbiAgICApO1xuXG4gICAgdGhpcy5hZGRSZWR1Y2VycyhyZWR1Y2Vycyk7XG4gIH1cblxuICByZW1vdmVGZWF0dXJlKGZlYXR1cmU6IFN0b3JlRmVhdHVyZTxhbnksIGFueT4pIHtcbiAgICB0aGlzLnJlbW92ZUZlYXR1cmVzKFtmZWF0dXJlXSk7XG4gIH1cblxuICByZW1vdmVGZWF0dXJlcyhmZWF0dXJlczogU3RvcmVGZWF0dXJlPGFueSwgYW55PltdKSB7XG4gICAgdGhpcy5yZW1vdmVSZWR1Y2VycyhmZWF0dXJlcy5tYXAoKHApID0+IHAua2V5KSk7XG4gIH1cblxuICBhZGRSZWR1Y2VyKGtleTogc3RyaW5nLCByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55Pikge1xuICAgIHRoaXMuYWRkUmVkdWNlcnMoeyBba2V5XTogcmVkdWNlciB9KTtcbiAgfVxuXG4gIGFkZFJlZHVjZXJzKHJlZHVjZXJzOiB7IFtrZXk6IHN0cmluZ106IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+IH0pIHtcbiAgICB0aGlzLnJlZHVjZXJzID0geyAuLi50aGlzLnJlZHVjZXJzLCAuLi5yZWR1Y2VycyB9O1xuICAgIHRoaXMudXBkYXRlUmVkdWNlcnMoT2JqZWN0LmtleXMocmVkdWNlcnMpKTtcbiAgfVxuXG4gIHJlbW92ZVJlZHVjZXIoZmVhdHVyZUtleTogc3RyaW5nKSB7XG4gICAgdGhpcy5yZW1vdmVSZWR1Y2VycyhbZmVhdHVyZUtleV0pO1xuICB9XG5cbiAgcmVtb3ZlUmVkdWNlcnMoZmVhdHVyZUtleXM6IHN0cmluZ1tdKSB7XG4gICAgZmVhdHVyZUtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICB0aGlzLnJlZHVjZXJzID0gb21pdCh0aGlzLnJlZHVjZXJzLCBrZXkpIC8qVE9ETygjODIzKSovIGFzIGFueTtcbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZVJlZHVjZXJzKGZlYXR1cmVLZXlzKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUmVkdWNlcnMoZmVhdHVyZUtleXM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5uZXh0KHRoaXMucmVkdWNlckZhY3RvcnkodGhpcy5yZWR1Y2VycywgdGhpcy5pbml0aWFsU3RhdGUpKTtcbiAgICB0aGlzLmRpc3BhdGNoZXIubmV4dCg8QWN0aW9uPntcbiAgICAgIHR5cGU6IFVQREFURSxcbiAgICAgIGZlYXR1cmVzOiBmZWF0dXJlS2V5cyxcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY29tcGxldGUoKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUl9NQU5BR0VSX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAgUmVkdWNlck1hbmFnZXIsXG4gIHsgcHJvdmlkZTogUmVkdWNlck9ic2VydmFibGUsIHVzZUV4aXN0aW5nOiBSZWR1Y2VyTWFuYWdlciB9LFxuICB7IHByb3ZpZGU6IFJlZHVjZXJNYW5hZ2VyRGlzcGF0Y2hlciwgdXNlRXhpc3Rpbmc6IEFjdGlvbnNTdWJqZWN0IH0sXG5dO1xuIl19