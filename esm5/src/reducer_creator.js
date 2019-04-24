import * as tslib_1 from "tslib";
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
    try {
        for (var ons_1 = tslib_1.__values(ons), ons_1_1 = ons_1.next(); !ons_1_1.done; ons_1_1 = ons_1.next()) {
            var on_1 = ons_1_1.value;
            try {
                for (var _c = tslib_1.__values(on_1.types), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var type = _d.value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFxQ0EsTUFBTSxVQUFVLEVBQUU7SUFDaEIsY0FBcUM7U0FBckMsVUFBcUMsRUFBckMscUJBQXFDLEVBQXJDLElBQXFDO1FBQXJDLHlCQUFxQzs7SUFFckMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBYyxDQUFDO0lBQ3ZDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQ3ZCLFVBQUMsTUFBTSxFQUFFLE9BQU8sSUFBSyx3QkFBSSxNQUFNLEdBQUcsT0FBeUIsQ0FBQyxJQUFJLElBQTNDLENBQTRDLEVBQ2pFLEVBQWMsQ0FDZixDQUFDO0lBQ0YsT0FBTyxFQUFFLE9BQU8sU0FBQSxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUVELE1BQU0sVUFBVSxhQUFhLENBQzNCLFlBQWU7SUFDZixhQUFlO1NBQWYsVUFBZSxFQUFmLHFCQUFlLEVBQWYsSUFBZTtRQUFmLDRCQUFlOzs7SUFFZixJQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBNEIsQ0FBQzs7UUFDaEQsS0FBZSxJQUFBLFFBQUEsaUJBQUEsR0FBRyxDQUFBLHdCQUFBLHlDQUFFO1lBQWYsSUFBSSxJQUFFLGdCQUFBOztnQkFDVCxLQUFpQixJQUFBLEtBQUEsaUJBQUEsSUFBRSxDQUFDLEtBQUssQ0FBQSxnQkFBQSw0QkFBRTtvQkFBdEIsSUFBSSxJQUFJLFdBQUE7b0JBQ1gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUMzQjs7Ozs7Ozs7O1NBQ0Y7Ozs7Ozs7OztJQUNELE9BQU8sVUFBUyxLQUF1QixFQUFFLE1BQWM7UUFBdkMsc0JBQUEsRUFBQSxvQkFBdUI7UUFDckMsSUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsRCxDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uQ3JlYXRvciwgQWN0aW9uUmVkdWNlciwgQWN0aW9uVHlwZSwgQWN0aW9uIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG4vLyBSZXR1cm4gdHlwZSBvZiB0aGUgYG9uYCBmbi5cbmV4cG9ydCBpbnRlcmZhY2UgT248Uz4ge1xuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPFM+O1xuICB0eXBlczogc3RyaW5nW107XG59XG5cbi8vIFNwZWNpYWxpemVkIFJlZHVjZXIgdGhhdCBpcyBhd2FyZSBvZiB0aGUgQWN0aW9uIHR5cGUgaXQgbmVlZHMgdG8gaGFuZGxlXG5leHBvcnQgaW50ZXJmYWNlIE9uUmVkdWNlcjxTLCBDIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcltdPiB7XG4gIChzdGF0ZTogUywgYWN0aW9uOiBBY3Rpb25UeXBlPENbbnVtYmVyXT4pOiBTO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb248QzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLCBTPihcbiAgY3JlYXRvcjE6IEMxLFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxXT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvciwgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLCBTPihcbiAgY3JlYXRvcjE6IEMxLFxuICBjcmVhdG9yMjogQzIsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyXT5cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uPFxuICBDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIEMyIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBTXG4+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgY3JlYXRvcjM6IEMzLFxuICByZWR1Y2VyOiBPblJlZHVjZXI8UywgW0MxLCBDMiwgQzNdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248Uz4oXG4gIGNyZWF0b3I6IEFjdGlvbkNyZWF0b3IsXG4gIC4uLnJlc3Q6IChBY3Rpb25DcmVhdG9yIHwgT25SZWR1Y2VyPFMsIFtBY3Rpb25DcmVhdG9yXT4pW11cbik6IE9uPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIG9uKFxuICAuLi5hcmdzOiAoQWN0aW9uQ3JlYXRvciB8IEZ1bmN0aW9uKVtdXG4pOiB7IHJlZHVjZXI6IEZ1bmN0aW9uOyB0eXBlczogc3RyaW5nW10gfSB7XG4gIGNvbnN0IHJlZHVjZXIgPSBhcmdzLnBvcCgpIGFzIEZ1bmN0aW9uO1xuICBjb25zdCB0eXBlcyA9IGFyZ3MucmVkdWNlKFxuICAgIChyZXN1bHQsIGNyZWF0b3IpID0+IFsuLi5yZXN1bHQsIChjcmVhdG9yIGFzIEFjdGlvbkNyZWF0b3IpLnR5cGVdLFxuICAgIFtdIGFzIHN0cmluZ1tdXG4gICk7XG4gIHJldHVybiB7IHJlZHVjZXIsIHR5cGVzIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWR1Y2VyPFM+KFxuICBpbml0aWFsU3RhdGU6IFMsXG4gIC4uLm9uczogT248Uz5bXVxuKTogQWN0aW9uUmVkdWNlcjxTPiB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBBY3Rpb25SZWR1Y2VyPFM+PigpO1xuICBmb3IgKGxldCBvbiBvZiBvbnMpIHtcbiAgICBmb3IgKGxldCB0eXBlIG9mIG9uLnR5cGVzKSB7XG4gICAgICBtYXAuc2V0KHR5cGUsIG9uLnJlZHVjZXIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oc3RhdGU6IFMgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogQWN0aW9uKTogUyB7XG4gICAgY29uc3QgcmVkdWNlciA9IG1hcC5nZXQoYWN0aW9uLnR5cGUpO1xuICAgIHJldHVybiByZWR1Y2VyID8gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKSA6IHN0YXRlO1xuICB9O1xufVxuIl19