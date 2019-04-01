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
export function getUnserializable(target, path) {
    if (path === void 0) { path = []; }
    // Guard against undefined and null, e.g. a reducer that returns undefined
    if ((isUndefined(target) || isNull(target)) && path.length === 0) {
        return {
            path: ['root'],
            value: target,
        };
    }
    var keys = Object.keys(target);
    return keys.reduce(function (result, key) {
        if (result) {
            return result;
        }
        var value = target[key];
        if (isUndefined(value) ||
            isNull(value) ||
            isNumber(value) ||
            isBoolean(value) ||
            isString(value) ||
            isArray(value)) {
            return false;
        }
        if (isPlainObject(value)) {
            return getUnserializable(value, __spread(path, [key]));
        }
        return {
            path: __spread(path, [key]),
            value: value,
        };
    }, false);
}
export function throwIfUnserializable(unserializable, context) {
    if (unserializable === false) {
        return;
    }
    var unserializablePath = unserializable.path.join('.');
    var error = new Error("Detected unserializable " + context + " at \"" + unserializablePath + "\"");
    error.value = unserializable.value;
    error.unserializablePath = unserializablePath;
    throw error;
}
/**
 * Object Utilities
 */
export function isUndefined(target) {
    return target === undefined;
}
export function isNull(target) {
    return target === null;
}
export function isArray(target) {
    return Array.isArray(target);
}
export function isString(target) {
    return typeof target === 'string';
}
export function isBoolean(target) {
    return typeof target === 'boolean';
}
export function isNumber(target) {
    return typeof target === 'number';
}
export function isObjectLike(target) {
    return typeof target === 'object' && target !== null;
}
export function isObject(target) {
    return isObjectLike(target) && !isArray(target);
}
export function isPlainObject(target) {
    if (!isObject(target)) {
        return false;
    }
    var targetPrototype = Object.getPrototypeOf(target);
    return targetPrototype === Object.prototype || targetPrototype === null;
}
export function isFunction(target) {
    return typeof target === 'function';
}
export function hasOwnProperty(target, propertyName) {
    return Object.prototype.hasOwnProperty.call(target, propertyName);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9tZXRhLXJlZHVjZXJzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTSxVQUFVLGlCQUFpQixDQUMvQixNQUFZLEVBQ1osSUFBbUI7SUFBbkIscUJBQUEsRUFBQSxTQUFtQjtJQUVuQiwwRUFBMEU7SUFDMUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNoRSxPQUFPO1lBQ0wsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ2QsS0FBSyxFQUFFLE1BQU07U0FDZCxDQUFDO0tBQ0g7SUFFRCxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBeUMsVUFBQyxNQUFNLEVBQUUsR0FBRztRQUNyRSxJQUFJLE1BQU0sRUFBRTtZQUNWLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFFRCxJQUFNLEtBQUssR0FBSSxNQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkMsSUFDRSxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDYixRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ2YsU0FBUyxDQUFDLEtBQUssQ0FBQztZQUNoQixRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUNkO1lBQ0EsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLE9BQU8saUJBQWlCLENBQUMsS0FBSyxXQUFNLElBQUksR0FBRSxHQUFHLEdBQUUsQ0FBQztTQUNqRDtRQUVELE9BQU87WUFDTCxJQUFJLFdBQU0sSUFBSSxHQUFFLEdBQUcsRUFBQztZQUNwQixLQUFLLE9BQUE7U0FDTixDQUFDO0lBQ0osQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ1osQ0FBQztBQUVELE1BQU0sVUFBVSxxQkFBcUIsQ0FDbkMsY0FBc0QsRUFDdEQsT0FBMkI7SUFFM0IsSUFBSSxjQUFjLEtBQUssS0FBSyxFQUFFO1FBQzVCLE9BQU87S0FDUjtJQUVELElBQU0sa0JBQWtCLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekQsSUFBTSxLQUFLLEdBQVEsSUFBSSxLQUFLLENBQzFCLDZCQUEyQixPQUFPLGNBQVEsa0JBQWtCLE9BQUcsQ0FDaEUsQ0FBQztJQUNGLEtBQUssQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztJQUNuQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7SUFDOUMsTUFBTSxLQUFLLENBQUM7QUFDZCxDQUFDO0FBRUQ7O0dBRUc7QUFFSCxNQUFNLFVBQVUsV0FBVyxDQUFDLE1BQVc7SUFDckMsT0FBTyxNQUFNLEtBQUssU0FBUyxDQUFDO0FBQzlCLENBQUM7QUFFRCxNQUFNLFVBQVUsTUFBTSxDQUFDLE1BQVc7SUFDaEMsT0FBTyxNQUFNLEtBQUssSUFBSSxDQUFDO0FBQ3pCLENBQUM7QUFFRCxNQUFNLFVBQVUsT0FBTyxDQUFDLE1BQVc7SUFDakMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFFRCxNQUFNLFVBQVUsUUFBUSxDQUFDLE1BQVc7SUFDbEMsT0FBTyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUM7QUFDcEMsQ0FBQztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsTUFBVztJQUNuQyxPQUFPLE9BQU8sTUFBTSxLQUFLLFNBQVMsQ0FBQztBQUNyQyxDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxNQUFXO0lBQ2xDLE9BQU8sT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDO0FBQ3BDLENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLE1BQVc7SUFDdEMsT0FBTyxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxLQUFLLElBQUksQ0FBQztBQUN2RCxDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxNQUFXO0lBQ2xDLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUFDLE1BQVc7SUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNyQixPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsSUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxPQUFPLGVBQWUsS0FBSyxNQUFNLENBQUMsU0FBUyxJQUFJLGVBQWUsS0FBSyxJQUFJLENBQUM7QUFDMUUsQ0FBQztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsTUFBVztJQUNwQyxPQUFPLE9BQU8sTUFBTSxLQUFLLFVBQVUsQ0FBQztBQUN0QyxDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxNQUFjLEVBQUUsWUFBb0I7SUFDakUsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ3BFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0VW5zZXJpYWxpemFibGUoXG4gIHRhcmdldD86IGFueSxcbiAgcGF0aDogc3RyaW5nW10gPSBbXVxuKTogZmFsc2UgfCB7IHBhdGg6IHN0cmluZ1tdOyB2YWx1ZTogYW55IH0ge1xuICAvLyBHdWFyZCBhZ2FpbnN0IHVuZGVmaW5lZCBhbmQgbnVsbCwgZS5nLiBhIHJlZHVjZXIgdGhhdCByZXR1cm5zIHVuZGVmaW5lZFxuICBpZiAoKGlzVW5kZWZpbmVkKHRhcmdldCkgfHwgaXNOdWxsKHRhcmdldCkpICYmIHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IFsncm9vdCddLFxuICAgICAgdmFsdWU6IHRhcmdldCxcbiAgICB9O1xuICB9XG5cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRhcmdldCk7XG4gIHJldHVybiBrZXlzLnJlZHVjZTxmYWxzZSB8IHsgcGF0aDogc3RyaW5nW107IHZhbHVlOiBhbnkgfT4oKHJlc3VsdCwga2V5KSA9PiB7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9ICh0YXJnZXQgYXMgYW55KVtrZXldO1xuXG4gICAgaWYgKFxuICAgICAgaXNVbmRlZmluZWQodmFsdWUpIHx8XG4gICAgICBpc051bGwodmFsdWUpIHx8XG4gICAgICBpc051bWJlcih2YWx1ZSkgfHxcbiAgICAgIGlzQm9vbGVhbih2YWx1ZSkgfHxcbiAgICAgIGlzU3RyaW5nKHZhbHVlKSB8fFxuICAgICAgaXNBcnJheSh2YWx1ZSlcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBnZXRVbnNlcmlhbGl6YWJsZSh2YWx1ZSwgWy4uLnBhdGgsIGtleV0pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBbLi4ucGF0aCwga2V5XSxcbiAgICAgIHZhbHVlLFxuICAgIH07XG4gIH0sIGZhbHNlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRocm93SWZVbnNlcmlhbGl6YWJsZShcbiAgdW5zZXJpYWxpemFibGU6IGZhbHNlIHwgeyBwYXRoOiBzdHJpbmdbXTsgdmFsdWU6IGFueSB9LFxuICBjb250ZXh0OiAnc3RhdGUnIHwgJ2FjdGlvbidcbikge1xuICBpZiAodW5zZXJpYWxpemFibGUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdW5zZXJpYWxpemFibGVQYXRoID0gdW5zZXJpYWxpemFibGUucGF0aC5qb2luKCcuJyk7XG4gIGNvbnN0IGVycm9yOiBhbnkgPSBuZXcgRXJyb3IoXG4gICAgYERldGVjdGVkIHVuc2VyaWFsaXphYmxlICR7Y29udGV4dH0gYXQgXCIke3Vuc2VyaWFsaXphYmxlUGF0aH1cImBcbiAgKTtcbiAgZXJyb3IudmFsdWUgPSB1bnNlcmlhbGl6YWJsZS52YWx1ZTtcbiAgZXJyb3IudW5zZXJpYWxpemFibGVQYXRoID0gdW5zZXJpYWxpemFibGVQYXRoO1xuICB0aHJvdyBlcnJvcjtcbn1cblxuLyoqXG4gKiBPYmplY3QgVXRpbGl0aWVzXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIHVuZGVmaW5lZCB7XG4gIHJldHVybiB0YXJnZXQgPT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVsbCh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBudWxsIHtcbiAgcmV0dXJuIHRhcmdldCA9PT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgQXJyYXk8YW55PiB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHRhcmdldCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBzdHJpbmcge1xuICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Jvb2xlYW4odGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgdGFyZ2V0ID09PSAnYm9vbGVhbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBudW1iZXIge1xuICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gJ251bWJlcic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdExpa2UodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgb2JqZWN0IHtcbiAgcmV0dXJuIHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnICYmIHRhcmdldCAhPT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHRhcmdldDogYW55KTogdGFyZ2V0IGlzIG9iamVjdCB7XG4gIHJldHVybiBpc09iamVjdExpa2UodGFyZ2V0KSAmJiAhaXNBcnJheSh0YXJnZXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBvYmplY3Qge1xuICBpZiAoIWlzT2JqZWN0KHRhcmdldCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCB0YXJnZXRQcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KTtcbiAgcmV0dXJuIHRhcmdldFByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZSB8fCB0YXJnZXRQcm90b3R5cGUgPT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIEZ1bmN0aW9uIHtcbiAgcmV0dXJuIHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eSh0YXJnZXQ6IG9iamVjdCwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0YXJnZXQsIHByb3BlcnR5TmFtZSk7XG59XG4iXX0=