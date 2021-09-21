import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export class MockState extends BehaviorSubject {
    constructor() {
        super({});
    }
}
/** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
MockState.decorators = [
    { type: Injectable }
];
/**
 * @type {function(): !Array<(null|{
 *   type: ?,
 *   decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>),
 * })>}
 * @nocollapse
 */
MockState.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvbW9ja19zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHdkMsTUFBTSxPQUFPLFNBQXdCLFNBQVEsZUFBa0I7SUFDN0Q7UUFDRSxLQUFLLENBQUksRUFBRSxDQUFDLENBQUM7SUFDZixDQUFDOzs7O1lBSkYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja1N0YXRlPFQgZXh0ZW5kcyB7fT4gZXh0ZW5kcyBCZWhhdmlvclN1YmplY3Q8VD4ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcig8VD57fSk7XG4gIH1cbn1cbiJdfQ==