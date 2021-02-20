import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export class MockState extends BehaviorSubject {
    constructor() {
        super({});
    }
}
MockState.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MockState.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvbW9ja19zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHdkMsTUFBTSxPQUFPLFNBQXdCLFNBQVEsZUFBa0I7SUFDN0Q7UUFDRSxLQUFLLENBQUksRUFBRSxDQUFDLENBQUM7SUFDZixDQUFDOzs7WUFKRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2NrU3RhdGU8VCBleHRlbmRzIHt9PiBleHRlbmRzIEJlaGF2aW9yU3ViamVjdDxUPiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKDxUPnt9KTtcbiAgfVxufVxuIl19