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
export function createReducer(ons, initialState) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlcl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvcmVkdWNlcl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFxQ0EsTUFBTSxVQUFVLEVBQUU7SUFDaEIsY0FBcUM7U0FBckMsVUFBcUMsRUFBckMscUJBQXFDLEVBQXJDLElBQXFDO1FBQXJDLHlCQUFxQzs7SUFFckMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBYyxDQUFDO0lBQ3ZDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQ3ZCLFVBQUMsTUFBTSxFQUFFLE9BQU8sSUFBSyx3QkFBSSxNQUFNLEdBQUcsT0FBeUIsQ0FBQyxJQUFJLElBQTNDLENBQTRDLEVBQ2pFLEVBQWMsQ0FDZixDQUFDO0lBQ0YsT0FBTyxFQUFFLE9BQU8sU0FBQSxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUVELE1BQU0sVUFBVSxhQUFhLENBQzNCLEdBQVksRUFDWixZQUFlOztJQUVmLElBQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUE0QixDQUFDOztRQUNoRCxLQUFlLElBQUEsUUFBQSxpQkFBQSxHQUFHLENBQUEsd0JBQUEseUNBQUU7WUFBZixJQUFJLElBQUUsZ0JBQUE7O2dCQUNULEtBQWlCLElBQUEsS0FBQSxpQkFBQSxJQUFFLENBQUMsS0FBSyxDQUFBLGdCQUFBLDRCQUFFO29CQUF0QixJQUFJLElBQUksV0FBQTtvQkFDWCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQzNCOzs7Ozs7Ozs7U0FDRjs7Ozs7Ozs7O0lBQ0QsT0FBTyxVQUFTLEtBQXVCLEVBQUUsTUFBYztRQUF2QyxzQkFBQSxFQUFBLG9CQUF1QjtRQUNyQyxJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2xELENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25DcmVhdG9yLCBBY3Rpb25SZWR1Y2VyLCBBY3Rpb25UeXBlLCBBY3Rpb24gfSBmcm9tICcuL21vZGVscyc7XG5cbi8vIFJldHVybiB0eXBlIG9mIHRoZSBgb25gIGZuLlxuZXhwb3J0IGludGVyZmFjZSBPbjxTPiB7XG4gIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8Uz47XG4gIHR5cGVzOiBzdHJpbmdbXTtcbn1cblxuLy8gU3BlY2lhbGl6ZWQgUmVkdWNlciB0aGF0IGlzIGF3YXJlIG9mIHRoZSBBY3Rpb24gdHlwZSBpdCBuZWVkcyB0byBoYW5kbGVcbmV4cG9ydCBpbnRlcmZhY2UgT25SZWR1Y2VyPFMsIEMgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yW10+IHtcbiAgKHN0YXRlOiBTLCBhY3Rpb246IEFjdGlvblR5cGU8Q1tudW1iZXJdPik6IFM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbjxDMSBleHRlbmRzIEFjdGlvbkNyZWF0b3IsIFM+KFxuICBjcmVhdG9yMTogQzEsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzFdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248QzEgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLCBDMiBleHRlbmRzIEFjdGlvbkNyZWF0b3IsIFM+KFxuICBjcmVhdG9yMTogQzEsXG4gIGNyZWF0b3IyOiBDMixcbiAgcmVkdWNlcjogT25SZWR1Y2VyPFMsIFtDMSwgQzJdPlxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb248XG4gIEMxIGV4dGVuZHMgQWN0aW9uQ3JlYXRvcixcbiAgQzIgZXh0ZW5kcyBBY3Rpb25DcmVhdG9yLFxuICBDMyBleHRlbmRzIEFjdGlvbkNyZWF0b3IsXG4gIFNcbj4oXG4gIGNyZWF0b3IxOiBDMSxcbiAgY3JlYXRvcjI6IEMyLFxuICBjcmVhdG9yMzogQzMsXG4gIHJlZHVjZXI6IE9uUmVkdWNlcjxTLCBbQzEsIEMyLCBDM10+XG4pOiBPbjxTPjtcbmV4cG9ydCBmdW5jdGlvbiBvbjxTPihcbiAgY3JlYXRvcjogQWN0aW9uQ3JlYXRvcixcbiAgLi4ucmVzdDogKEFjdGlvbkNyZWF0b3IgfCBPblJlZHVjZXI8UywgW0FjdGlvbkNyZWF0b3JdPilbXVxuKTogT248Uz47XG5leHBvcnQgZnVuY3Rpb24gb24oXG4gIC4uLmFyZ3M6IChBY3Rpb25DcmVhdG9yIHwgRnVuY3Rpb24pW11cbik6IHsgcmVkdWNlcjogRnVuY3Rpb247IHR5cGVzOiBzdHJpbmdbXSB9IHtcbiAgY29uc3QgcmVkdWNlciA9IGFyZ3MucG9wKCkgYXMgRnVuY3Rpb247XG4gIGNvbnN0IHR5cGVzID0gYXJncy5yZWR1Y2UoXG4gICAgKHJlc3VsdCwgY3JlYXRvcikgPT4gWy4uLnJlc3VsdCwgKGNyZWF0b3IgYXMgQWN0aW9uQ3JlYXRvcikudHlwZV0sXG4gICAgW10gYXMgc3RyaW5nW11cbiAgKTtcbiAgcmV0dXJuIHsgcmVkdWNlciwgdHlwZXMgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlZHVjZXI8Uz4oXG4gIG9uczogT248Uz5bXSxcbiAgaW5pdGlhbFN0YXRlOiBTXG4pOiBBY3Rpb25SZWR1Y2VyPFM+IHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIEFjdGlvblJlZHVjZXI8Uz4+KCk7XG4gIGZvciAobGV0IG9uIG9mIG9ucykge1xuICAgIGZvciAobGV0IHR5cGUgb2Ygb24udHlwZXMpIHtcbiAgICAgIG1hcC5zZXQodHlwZSwgb24ucmVkdWNlcik7XG4gICAgfVxuICB9XG4gIHJldHVybiBmdW5jdGlvbihzdGF0ZTogUyA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uOiBBY3Rpb24pOiBTIHtcbiAgICBjb25zdCByZWR1Y2VyID0gbWFwLmdldChhY3Rpb24udHlwZSk7XG4gICAgcmV0dXJuIHJlZHVjZXIgPyByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIDogc3RhdGU7XG4gIH07XG59XG4iXX0=