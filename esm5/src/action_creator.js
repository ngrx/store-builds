import * as tslib_1 from "tslib";
export function createAction(type, config) {
    if (typeof config === 'function') {
        return defineType(type, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return (tslib_1.__assign({}, config.apply(void 0, tslib_1.__spread(args)), { type: type }));
        });
    }
    var as = config ? config._as : 'empty';
    switch (as) {
        case 'empty':
            return defineType(type, function () { return ({ type: type }); });
        case 'props':
            return defineType(type, function (props) { return (tslib_1.__assign({}, props, { type: type })); });
        default:
            throw new Error('Unexpected config.');
    }
}
export function props() {
    // the return type does not match TypePropertyIsNotAllowed, so double casting
    // is used.
    return { _as: 'props', _p: undefined };
}
export function union(creators) {
    return undefined;
}
function defineType(type, creator) {
    return Object.defineProperty(creator, 'type', {
        value: type,
        writable: false,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uX2NyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9hY3Rpb25fY3JlYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBMkJBLE1BQU0sVUFBVSxZQUFZLENBQzFCLElBQU8sRUFDUCxNQUE2QjtJQUU3QixJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsRUFBRTtRQUNoQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFBQyxjQUFjO2lCQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7Z0JBQWQseUJBQWM7O1lBQUssT0FBQSxzQkFDdkMsTUFBTSxnQ0FBSSxJQUFJLE1BQ2pCLElBQUksTUFBQSxJQUNKO1FBSDBDLENBRzFDLENBQUMsQ0FBQztLQUNMO0lBQ0QsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDekMsUUFBUSxFQUFFLEVBQUU7UUFDVixLQUFLLE9BQU87WUFDVixPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLEVBQVYsQ0FBVSxDQUFDLENBQUM7UUFDNUMsS0FBSyxPQUFPO1lBQ1YsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQUMsS0FBYSxJQUFLLE9BQUEsc0JBQ3RDLEtBQUssSUFDUixJQUFJLE1BQUEsSUFDSixFQUh5QyxDQUd6QyxDQUFDLENBQUM7UUFDTjtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUN6QztBQUNILENBQUM7QUFFRCxNQUFNLFVBQVUsS0FBSztJQUNuQiw2RUFBNkU7SUFDN0UsV0FBVztJQUNYLE9BQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxTQUFVLEVBQW9DLENBQUM7QUFDN0UsQ0FBQztBQUVELE1BQU0sVUFBVSxLQUFLLENBRW5CLFFBQVc7SUFDWCxPQUFPLFNBQVUsQ0FBQztBQUNwQixDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsSUFBWSxFQUFFLE9BQWdCO0lBQ2hELE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFO1FBQzVDLEtBQUssRUFBRSxJQUFJO1FBQ1gsUUFBUSxFQUFFLEtBQUs7S0FDaEIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENyZWF0b3IsXG4gIEFjdGlvbkNyZWF0b3IsXG4gIFR5cGVkQWN0aW9uLFxuICBGdW5jdGlvbldpdGhQYXJhbWV0ZXJzVHlwZSxcbiAgUHJvcHNSZXR1cm5UeXBlLFxuICBEaXNhbGxvd1R5cGVQcm9wZXJ0eSxcbn0gZnJvbSAnLi9tb2RlbHMnO1xuXG4vLyBBY3Rpb24gY3JlYXRvcnMgdGFrZW4gZnJvbSB0cy1hY3Rpb24gbGlicmFyeSBhbmQgbW9kaWZpZWQgYSBiaXQgdG8gYmV0dGVyXG4vLyBmaXQgY3VycmVudCBOZ1J4IHVzYWdlLiBUaGFuayB5b3UgTmljaG9sYXMgSmFtaWVzb24gKEBjYXJ0YW50KS5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbjxUIGV4dGVuZHMgc3RyaW5nPihcbiAgdHlwZTogVFxuKTogQWN0aW9uQ3JlYXRvcjxULCAoKSA9PiBUeXBlZEFjdGlvbjxUPj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uPFQgZXh0ZW5kcyBzdHJpbmcsIFAgZXh0ZW5kcyBvYmplY3Q+KFxuICB0eXBlOiBULFxuICBjb25maWc6IHsgX2FzOiAncHJvcHMnOyBfcDogUCB9XG4pOiBBY3Rpb25DcmVhdG9yPFQsIChwcm9wczogUCkgPT4gUCAmIFR5cGVkQWN0aW9uPFQ+PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3Rpb248XG4gIFQgZXh0ZW5kcyBzdHJpbmcsXG4gIFAgZXh0ZW5kcyBhbnlbXSxcbiAgUiBleHRlbmRzIG9iamVjdFxuPihcbiAgdHlwZTogVCxcbiAgY3JlYXRvcjogQ3JlYXRvcjxQLCBEaXNhbGxvd1R5cGVQcm9wZXJ0eTxSPj5cbik6IEZ1bmN0aW9uV2l0aFBhcmFtZXRlcnNUeXBlPFAsIFIgJiBUeXBlZEFjdGlvbjxUPj4gJiBUeXBlZEFjdGlvbjxUPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3Rpb248VCBleHRlbmRzIHN0cmluZywgQyBleHRlbmRzIENyZWF0b3I+KFxuICB0eXBlOiBULFxuICBjb25maWc/OiB7IF9hczogJ3Byb3BzJyB9IHwgQ1xuKTogQ3JlYXRvciB7XG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGRlZmluZVR5cGUodHlwZSwgKC4uLmFyZ3M6IGFueVtdKSA9PiAoe1xuICAgICAgLi4uY29uZmlnKC4uLmFyZ3MpLFxuICAgICAgdHlwZSxcbiAgICB9KSk7XG4gIH1cbiAgY29uc3QgYXMgPSBjb25maWcgPyBjb25maWcuX2FzIDogJ2VtcHR5JztcbiAgc3dpdGNoIChhcykge1xuICAgIGNhc2UgJ2VtcHR5JzpcbiAgICAgIHJldHVybiBkZWZpbmVUeXBlKHR5cGUsICgpID0+ICh7IHR5cGUgfSkpO1xuICAgIGNhc2UgJ3Byb3BzJzpcbiAgICAgIHJldHVybiBkZWZpbmVUeXBlKHR5cGUsIChwcm9wczogb2JqZWN0KSA9PiAoe1xuICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgdHlwZSxcbiAgICAgIH0pKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIGNvbmZpZy4nKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvcHM8UCBleHRlbmRzIG9iamVjdD4oKTogUHJvcHNSZXR1cm5UeXBlPFA+IHtcbiAgLy8gdGhlIHJldHVybiB0eXBlIGRvZXMgbm90IG1hdGNoIFR5cGVQcm9wZXJ0eUlzTm90QWxsb3dlZCwgc28gZG91YmxlIGNhc3RpbmdcbiAgLy8gaXMgdXNlZC5cbiAgcmV0dXJuICh7IF9hczogJ3Byb3BzJywgX3A6IHVuZGVmaW5lZCEgfSBhcyB1bmtub3duKSBhcyBQcm9wc1JldHVyblR5cGU8UD47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmlvbjxcbiAgQyBleHRlbmRzIHsgW2tleTogc3RyaW5nXTogQWN0aW9uQ3JlYXRvcjxzdHJpbmcsIENyZWF0b3I+IH1cbj4oY3JlYXRvcnM6IEMpOiBSZXR1cm5UeXBlPENba2V5b2YgQ10+IHtcbiAgcmV0dXJuIHVuZGVmaW5lZCE7XG59XG5cbmZ1bmN0aW9uIGRlZmluZVR5cGUodHlwZTogc3RyaW5nLCBjcmVhdG9yOiBDcmVhdG9yKTogQ3JlYXRvciB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRvciwgJ3R5cGUnLCB7XG4gICAgdmFsdWU6IHR5cGUsXG4gICAgd3JpdGFibGU6IGZhbHNlLFxuICB9KTtcbn1cbiJdfQ==