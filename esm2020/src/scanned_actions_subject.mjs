import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class ScannedActionsSubject extends Subject {
    ngOnDestroy() {
        this.complete();
    }
}
/** @nocollapse */ /** @nocollapse */ ScannedActionsSubject.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: ScannedActionsSubject, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ /** @nocollapse */ ScannedActionsSubject.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: ScannedActionsSubject });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: ScannedActionsSubject, decorators: [{
            type: Injectable
        }] });
export const SCANNED_ACTIONS_SUBJECT_PROVIDERS = [
    ScannedActionsSubject,
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nhbm5lZF9hY3Rpb25zX3N1YmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zY2FubmVkX2FjdGlvbnNfc3ViamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUsvQixNQUFNLE9BQU8scUJBQXNCLFNBQVEsT0FBZTtJQUV4RCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7O3dKQUpVLHFCQUFxQjs0SkFBckIscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBRGpDLFVBQVU7O0FBUVgsTUFBTSxDQUFDLE1BQU0saUNBQWlDLEdBQWU7SUFDM0QscUJBQXFCO0NBQ3RCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4vbW9kZWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNjYW5uZWRBY3Rpb25zU3ViamVjdCBleHRlbmRzIFN1YmplY3Q8QWN0aW9uPlxuICBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY29tcGxldGUoKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgU0NBTk5FRF9BQ1RJT05TX1NVQkpFQ1RfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICBTY2FubmVkQWN0aW9uc1N1YmplY3QsXG5dO1xuIl19