import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
class MockState extends BehaviorSubject {
    constructor() {
        super({});
        this.state = toSignal(this, { manualCleanup: true, requireSync: true });
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: MockState, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: MockState }); }
}
export { MockState };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: MockState, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvdGVzdGluZy9zcmMvbW9ja19zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUV2QyxNQUNhLFNBQWEsU0FBUSxlQUFrQjtJQU1sRDtRQUNFLEtBQUssQ0FBSSxFQUFFLENBQUMsQ0FBQztRQUViLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDMUUsQ0FBQztpSUFWVSxTQUFTO3FJQUFULFNBQVM7O1NBQVQsU0FBUzsyRkFBVCxTQUFTO2tCQURyQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgU2lnbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0b1NpZ25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvcnhqcy1pbnRlcm9wJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja1N0YXRlPFQ+IGV4dGVuZHMgQmVoYXZpb3JTdWJqZWN0PFQ+IHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcmVhZG9ubHkgc3RhdGU6IFNpZ25hbDxUPjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcig8VD57fSk7XG5cbiAgICB0aGlzLnN0YXRlID0gdG9TaWduYWwodGhpcywgeyBtYW51YWxDbGVhbnVwOiB0cnVlLCByZXF1aXJlU3luYzogdHJ1ZSB9KTtcbiAgfVxufVxuIl19