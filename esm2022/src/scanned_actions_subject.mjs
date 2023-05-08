import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
class ScannedActionsSubject extends Subject {
    ngOnDestroy() {
        this.complete();
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: ScannedActionsSubject, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: ScannedActionsSubject }); }
}
export { ScannedActionsSubject };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: ScannedActionsSubject, decorators: [{
            type: Injectable
        }] });
export const SCANNED_ACTIONS_SUBJECT_PROVIDERS = [
    ScannedActionsSubject,
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nhbm5lZF9hY3Rpb25zX3N1YmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9zY2FubmVkX2FjdGlvbnNfc3ViamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUkvQixNQUNhLHFCQUNYLFNBQVEsT0FBZTtJQUd2QixXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7aUlBTlUscUJBQXFCO3FJQUFyQixxQkFBcUI7O1NBQXJCLHFCQUFxQjsyRkFBckIscUJBQXFCO2tCQURqQyxVQUFVOztBQVVYLE1BQU0sQ0FBQyxNQUFNLGlDQUFpQyxHQUFlO0lBQzNELHFCQUFxQjtDQUN0QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL21vZGVscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTY2FubmVkQWN0aW9uc1N1YmplY3RcbiAgZXh0ZW5kcyBTdWJqZWN0PEFjdGlvbj5cbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3lcbntcbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jb21wbGV0ZSgpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBTQ0FOTkVEX0FDVElPTlNfU1VCSkVDVF9QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIFNjYW5uZWRBY3Rpb25zU3ViamVjdCxcbl07XG4iXX0=