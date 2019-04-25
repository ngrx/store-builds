import * as tslib_1 from "tslib";
import { isDevMode } from '@angular/core';
export function on() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var reducer = args.pop();
    var types = args.reduce(function (result, creator) { return tslib_1.__spread(result, [creator.type]); }, []);
    return { reducer: reducer, types: types };
}
export function createReducer(initialState) {
    var ons = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        ons[_i - 1] = arguments[_i];
    }
    var e_1, _a, e_2, _b;
    var map = new Map();
    var devMode = isDevMode();
    try {
        for (var ons_1 = tslib_1.__values(ons), ons_1_1 = ons_1.next(); !ons_1_1.done; ons_1_1 = ons_1.next()) {
            var on_1 = ons_1_1.value;
            try {
                for (var _c = tslib_1.__values(on_1.types), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var type = _d.value;
                    if (devMode && map.has(type)) {
                        console.warn("@ngrx/store: The provided action type '" + type + "' is already provided.");
                    }
                    map.set(type, on_1.reducer);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (ons_1_1 && !ons_1_1.done && (_a = ons_1.return)) _a.call(ons_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return function (state, action) {
        if (state === void 0) { state = initialState; }
        var reducer = map.get(action.type);
        return reducer ? reducer(state, action) : state;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBc0MxQyxNQUFNLFVBQVUsRUFBRTtJQUNoQixjQUFxQztTQUFyQyxVQUFxQyxFQUFyQyxxQkFBcUMsRUFBckMsSUFBcUM7UUFBckMseUJBQXFDOztJQUVyQyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFjLENBQUM7SUFDdkMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FDdkIsVUFBQyxNQUFNLEVBQUUsT0FBTyxJQUFLLHdCQUFJLE1BQU0sR0FBRyxPQUF5QixDQUFDLElBQUksSUFBM0MsQ0FBNEMsRUFDakUsRUFBYyxDQUNmLENBQUM7SUFDRixPQUFPLEVBQUUsT0FBTyxTQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQztBQUM1QixDQUFDO0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FDM0IsWUFBZTtJQUNmLGFBQWU7U0FBZixVQUFlLEVBQWYscUJBQWUsRUFBZixJQUFlO1FBQWYsNEJBQWU7OztJQUVmLElBQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUE0QixDQUFDO0lBQ2hELElBQU0sT0FBTyxHQUFHLFNBQVMsRUFBRSxDQUFDOztRQUU1QixLQUFlLElBQUEsUUFBQSxpQkFBQSxHQUFHLENBQUEsd0JBQUEseUNBQUU7WUFBZixJQUFJLElBQUUsZ0JBQUE7O2dCQUNULEtBQWlCLElBQUEsS0FBQSxpQkFBQSxJQUFFLENBQUMsS0FBSyxDQUFBLGdCQUFBLDRCQUFFO29CQUF0QixJQUFJLElBQUksV0FBQTtvQkFDWCxJQUFJLE9BQU8sSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUM1QixPQUFPLENBQUMsSUFBSSxDQUNWLDRDQUEwQyxJQUFJLDJCQUF3QixDQUN2RSxDQUFDO3FCQUNIO29CQUNELEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDM0I7Ozs7Ozs7OztTQUNGOzs7Ozs7Ozs7SUFDRCxPQUFPLFVBQVMsS0FBdUIsRUFBRSxNQUFjO1FBQXZDLHNCQUFBLEVBQUEsb0JBQXVCO1FBQ3JDLElBQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbEQsQ0FBQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9uQ3JlYXRvciwgQWN0aW9uUmVkdWNlciwgQWN0aW9uVHlwZSwgQWN0aW9uIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG4vLyBSZXR1cm4gdHlwZSBvZiB0aGUgYG9uYCBmbi5cbmV4cG9ydCBpbnRlcmZhY2UgT248Uz4ge1xuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFM+O1xuICB0eXBlczogc3RyaW5nW107XG59XG5cbi8vIFNwZWNpYWxpemVkIFJlZHVjZXIgdGhhdCBpcyBhd2FyZSBvZiB0aGUgQWN0aW9uIHR5cGUgaXQgbmVlZHMgdG8gaGFuZGxlXG5leHBvcnQgaW50ZXJmYWNlIE9uUmVkdWNlcjxTLCBDIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcltdPiB7XG4gIChzdGF0ZTogUywgYWN0aW9uOiBBY3Rpb25UeXBlPENbbnVtYmVyXT4pOiBTO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb248QzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLCBTPihcbiAgY3JlYXRvcjE6IEMxLFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxXT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvciwgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLCBTPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyXT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzNdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248Uz4oXG4gIGNyZWF0b3I6IEFjdGlvbkNyZWF0b3IsXG4gIC4uLnJlc3Q6IChBY3Rpb25DcmVhdG9yIHwgT25SZWR1Y2VyPFMsIFtBY3Rpb25DcmVhdG9yXT4pW11cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uKFxuICAuLi5hcmdzOiAoQWN0aW9uQ3JlYXRvciB8IEZ1bmN0aW9uKVtdXG4pOiB7IHJlZHVjZXI6IEZ1bmN0aW9uOyB0eXBlczogc3RyaW5nW10gfSB7XG4gIGNvbnN0IHJlZHVjZXIgPSBhcmdzLnBvcCgpIGFzIEZ1bmN0aW9uO1xuICBjb25zdCB0eXBlcyA9IGFyZ3MucmVkdWNlKFxuICAgIChyZXN1bHQsIGNyZWF0b3IpID0+IFsuLi5yZXN1bHQsIChjcmVhdG9yIGFzIEFjdGlvbkNyZWF0b3IpLnR5cGVdLFxuICAgIFtdIGFzIHN0cmluZ1tdXG4gICk7XG4gIHJldHVybiB7IHJlZHVjZXIsIHR5cGVzIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWR1Y2VyPFM+KFxuICBpbml0aWFsU3RhdGU6IFMsXG4gIC4uLm9uczogT248Uz5bXVxuKTogQWN0aW9uUmVkdWNlcjxTPiB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBBY3Rpb25SZWR1Y2VyPFM+PigpO1xuICBjb25zdCBkZXZNb2RlID0gaXNEZXZNb2RlKCk7XG5cbiAgZm9yIChsZXQgb24gb2Ygb25zKSB7XG4gICAgZm9yIChsZXQgdHlwZSBvZiBvbi50eXBlcykge1xuICAgICAgaWYgKGRldk1vZGUgJiYgbWFwLmhhcyh0eXBlKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYEBuZ3J4L3N0b3JlOiBUaGUgcHJvdmlkZWQgYWN0aW9uIHR5cGUgJyR7dHlwZX0nIGlzIGFscmVhZHkgcHJvdmlkZWQuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgbWFwLnNldCh0eXBlLCBvbi5yZWR1Y2VyKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlOiBTID0gaW5pdGlhbFN0YXRlLCBhY3Rpb246IEFjdGlvbik6IFMge1xuICAgIGNvbnN0IHJlZHVjZXIgPSBtYXAuZ2V0KGFjdGlvbi50eXBlKTtcbiAgICByZXR1cm4gcmVkdWNlciA/IHJlZHVjZXIoc3RhdGUsIGFjdGlvbikgOiBzdGF0ZTtcbiAgfTtcbn1cbiJdfQ==