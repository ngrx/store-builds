var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
export function createAction(type, config) {
    if (typeof config === 'function') {
        return defineType(type, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return (__assign({}, config.apply(void 0, __spread(args)), { type: type }));
        });
    }
    var as = config ? config._as : 'empty';
    switch (as) {
        case 'empty':
            return defineType(type, function () { return ({ type: type }); });
        case 'props':
            return defineType(type, function (props) { return (__assign({}, props, { type: type })); });
        default:
            throw new Error('Unexpected config.');
    }
}
export function props() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uX2NyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9hY3Rpb25fY3JlYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJBLE1BQU0sVUFBVSxZQUFZLENBQzFCLElBQU8sRUFDUCxNQUFtQztJQUVuQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsRUFBRTtRQUNoQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUU7WUFBQyxjQUFrQjtpQkFBbEIsVUFBa0IsRUFBbEIscUJBQWtCLEVBQWxCLElBQWtCO2dCQUFsQix5QkFBa0I7O1lBQUssT0FBQSxjQUMzQyxNQUFNLHdCQUFJLElBQUksTUFDakIsSUFBSSxNQUFBLElBQ0o7UUFIOEMsQ0FHOUMsQ0FBQyxDQUFDO0tBQ0w7SUFDRCxJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN6QyxRQUFRLEVBQUUsRUFBRTtRQUNWLEtBQUssT0FBTztZQUNWLE9BQU8sVUFBVSxDQUFDLElBQUksRUFBRSxjQUFNLE9BQUEsQ0FBQyxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsRUFBVixDQUFVLENBQUMsQ0FBQztRQUM1QyxLQUFLLE9BQU87WUFDVixPQUFPLFVBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBQyxLQUFjLElBQUssT0FBQSxjQUN0QyxLQUFnQixJQUNwQixJQUFJLE1BQUEsSUFDSixFQUgwQyxDQUcxQyxDQUFDLENBQUM7UUFDTjtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUN6QztBQUNILENBQUM7QUFFRCxNQUFNLFVBQVUsS0FBSztJQUNuQixPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsU0FBVSxFQUFFLENBQUM7QUFDMUMsQ0FBQztBQUVELE1BQU0sVUFBVSxLQUFLLENBRW5CLFFBQVc7SUFDWCxPQUFPLFNBQVUsQ0FBQztBQUNwQixDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsSUFBWSxFQUFFLE9BQWdCO0lBQ2hELE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFO1FBQzVDLEtBQUssRUFBRSxJQUFJO1FBQ1gsUUFBUSxFQUFFLEtBQUs7S0FDaEIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENyZWF0b3IsXG4gIEFjdGlvbkNyZWF0b3IsXG4gIFR5cGVkQWN0aW9uLFxuICBGdW5jdGlvbldpdGhQYXJhbWV0ZXJzVHlwZSxcbiAgUGFyYW1ldGVyc1R5cGUsXG59IGZyb20gJy4vbW9kZWxzJztcblxuLyoqXG4gKiBBY3Rpb24gY3JlYXRvcnMgdGFrZW4gZnJvbSB0cy1hY3Rpb24gbGlicmFyeSBhbmQgbW9kaWZpZWQgYSBiaXQgdG8gYmV0dGVyXG4gKiBmaXQgY3VycmVudCBOZ1J4IHVzYWdlLiBUaGFuayB5b3UgTmljaG9sYXMgSmFtaWVzb24gKEBjYXJ0YW50KS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbjxUIGV4dGVuZHMgc3RyaW5nPihcbiAgdHlwZTogVFxuKTogQWN0aW9uQ3JlYXRvcjxULCAoKSA9PiBUeXBlZEFjdGlvbjxUPj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uPFQgZXh0ZW5kcyBzdHJpbmcsIFAgZXh0ZW5kcyBvYmplY3Q+KFxuICB0eXBlOiBULFxuICBjb25maWc6IHsgX2FzOiAncHJvcHMnOyBfcDogUCB9XG4pOiBBY3Rpb25DcmVhdG9yPFQsIChwcm9wczogUCkgPT4gUCAmIFR5cGVkQWN0aW9uPFQ+PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3Rpb248VCBleHRlbmRzIHN0cmluZywgQyBleHRlbmRzIENyZWF0b3I+KFxuICB0eXBlOiBULFxuICBjcmVhdG9yOiBDXG4pOiBGdW5jdGlvbldpdGhQYXJhbWV0ZXJzVHlwZTxcbiAgUGFyYW1ldGVyc1R5cGU8Qz4sXG4gIFJldHVyblR5cGU8Qz4gJiBUeXBlZEFjdGlvbjxUPlxuPiAmXG4gIFR5cGVkQWN0aW9uPFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbjxUIGV4dGVuZHMgc3RyaW5nPihcbiAgdHlwZTogVCxcbiAgY29uZmlnPzogeyBfYXM6ICdwcm9wcycgfSB8IENyZWF0b3Jcbik6IENyZWF0b3Ige1xuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBkZWZpbmVUeXBlKHR5cGUsICguLi5hcmdzOiB1bmtub3duW10pID0+ICh7XG4gICAgICAuLi5jb25maWcoLi4uYXJncyksXG4gICAgICB0eXBlLFxuICAgIH0pKTtcbiAgfVxuICBjb25zdCBhcyA9IGNvbmZpZyA/IGNvbmZpZy5fYXMgOiAnZW1wdHknO1xuICBzd2l0Y2ggKGFzKSB7XG4gICAgY2FzZSAnZW1wdHknOlxuICAgICAgcmV0dXJuIGRlZmluZVR5cGUodHlwZSwgKCkgPT4gKHsgdHlwZSB9KSk7XG4gICAgY2FzZSAncHJvcHMnOlxuICAgICAgcmV0dXJuIGRlZmluZVR5cGUodHlwZSwgKHByb3BzOiB1bmtub3duKSA9PiAoe1xuICAgICAgICAuLi4ocHJvcHMgYXMgb2JqZWN0KSxcbiAgICAgICAgdHlwZSxcbiAgICAgIH0pKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIGNvbmZpZy4nKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvcHM8UD4oKTogeyBfYXM6ICdwcm9wcyc7IF9wOiBQIH0ge1xuICByZXR1cm4geyBfYXM6ICdwcm9wcycsIF9wOiB1bmRlZmluZWQhIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmlvbjxcbiAgQyBleHRlbmRzIHsgW2tleTogc3RyaW5nXTogQWN0aW9uQ3JlYXRvcjxzdHJpbmcsIENyZWF0b3I+IH1cbj4oY3JlYXRvcnM6IEMpOiBSZXR1cm5UeXBlPENba2V5b2YgQ10+IHtcbiAgcmV0dXJuIHVuZGVmaW5lZCE7XG59XG5cbmZ1bmN0aW9uIGRlZmluZVR5cGUodHlwZTogc3RyaW5nLCBjcmVhdG9yOiBDcmVhdG9yKTogQ3JlYXRvciB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRvciwgJ3R5cGUnLCB7XG4gICAgdmFsdWU6IHR5cGUsXG4gICAgd3JpdGFibGU6IGZhbHNlLFxuICB9KTtcbn1cbiJdfQ==