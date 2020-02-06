import { __read, __spread } from "tslib";
import { isPlainObject, isUndefined, isNull, isNumber, isBoolean, isString, isArray, } from './utils';
export function serializationCheckMetaReducer(reducer, checks) {
    return function (state, action) {
        if (checks.action(action)) {
            var unserializableAction = getUnserializable(action);
            throwIfUnserializable(unserializableAction, 'action');
        }
        var nextState = reducer(state, action);
        if (checks.state()) {
            var unserializableState = getUnserializable(nextState);
            throwIfUnserializable(unserializableState, 'state');
        }
        return nextState;
    };
}
function getUnserializable(target, path) {
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
function throwIfUnserializable(unserializable, context) {
    if (unserializable === false) {
        return;
    }
    var unserializablePath = unserializable.path.join('.');
    var error = new Error("Detected unserializable " + context + " at \"" + unserializablePath + "\"");
    error.value = unserializable.value;
    error.unserializablePath = unserializablePath;
    throw error;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXphdGlvbl9yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvbWV0YS1yZWR1Y2Vycy9zZXJpYWxpemF0aW9uX3JlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFDTCxhQUFhLEVBQ2IsV0FBVyxFQUNYLE1BQU0sRUFDTixRQUFRLEVBQ1IsU0FBUyxFQUNULFFBQVEsRUFDUixPQUFPLEdBQ1IsTUFBTSxTQUFTLENBQUM7QUFFakIsTUFBTSxVQUFVLDZCQUE2QixDQUMzQyxPQUFnQyxFQUNoQyxNQUFxRTtJQUVyRSxPQUFPLFVBQVMsS0FBSyxFQUFFLE1BQU07UUFDM0IsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3pCLElBQU0sb0JBQW9CLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkQscUJBQXFCLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDdkQ7UUFFRCxJQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXpDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2xCLElBQU0sbUJBQW1CLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekQscUJBQXFCLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDckQ7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FDeEIsTUFBWSxFQUNaLElBQW1CO0lBQW5CLHFCQUFBLEVBQUEsU0FBbUI7SUFFbkIsMEVBQTBFO0lBQzFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDaEUsT0FBTztZQUNMLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNkLEtBQUssRUFBRSxNQUFNO1NBQ2QsQ0FBQztLQUNIO0lBRUQsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQXlDLFVBQUMsTUFBTSxFQUFFLEdBQUc7UUFDckUsSUFBSSxNQUFNLEVBQUU7WUFDVixPQUFPLE1BQU0sQ0FBQztTQUNmO1FBRUQsSUFBTSxLQUFLLEdBQUksTUFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5DLElBQ0UsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2IsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUNmLFNBQVMsQ0FBQyxLQUFLLENBQUM7WUFDaEIsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFDZDtZQUNBLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QixPQUFPLGlCQUFpQixDQUFDLEtBQUssV0FBTSxJQUFJLEdBQUUsR0FBRyxHQUFFLENBQUM7U0FDakQ7UUFFRCxPQUFPO1lBQ0wsSUFBSSxXQUFNLElBQUksR0FBRSxHQUFHLEVBQUM7WUFDcEIsS0FBSyxPQUFBO1NBQ04sQ0FBQztJQUNKLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNaLENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUM1QixjQUFzRCxFQUN0RCxPQUEyQjtJQUUzQixJQUFJLGNBQWMsS0FBSyxLQUFLLEVBQUU7UUFDNUIsT0FBTztLQUNSO0lBRUQsSUFBTSxrQkFBa0IsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6RCxJQUFNLEtBQUssR0FBUSxJQUFJLEtBQUssQ0FDMUIsNkJBQTJCLE9BQU8sY0FBUSxrQkFBa0IsT0FBRyxDQUNoRSxDQUFDO0lBQ0YsS0FBSyxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO0lBQ25DLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztJQUM5QyxNQUFNLEtBQUssQ0FBQztBQUNkLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25SZWR1Y2VyLCBBY3Rpb24gfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgaXNQbGFpbk9iamVjdCxcbiAgaXNVbmRlZmluZWQsXG4gIGlzTnVsbCxcbiAgaXNOdW1iZXIsXG4gIGlzQm9vbGVhbixcbiAgaXNTdHJpbmcsXG4gIGlzQXJyYXksXG59IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXphdGlvbkNoZWNrTWV0YVJlZHVjZXIoXG4gIHJlZHVjZXI6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+LFxuICBjaGVja3M6IHsgYWN0aW9uOiAoYWN0aW9uOiBBY3Rpb24pID0+IGJvb2xlYW47IHN0YXRlOiAoKSA9PiBib29sZWFuIH1cbik6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBpZiAoY2hlY2tzLmFjdGlvbihhY3Rpb24pKSB7XG4gICAgICBjb25zdCB1bnNlcmlhbGl6YWJsZUFjdGlvbiA9IGdldFVuc2VyaWFsaXphYmxlKGFjdGlvbik7XG4gICAgICB0aHJvd0lmVW5zZXJpYWxpemFibGUodW5zZXJpYWxpemFibGVBY3Rpb24sICdhY3Rpb24nKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0U3RhdGUgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgaWYgKGNoZWNrcy5zdGF0ZSgpKSB7XG4gICAgICBjb25zdCB1bnNlcmlhbGl6YWJsZVN0YXRlID0gZ2V0VW5zZXJpYWxpemFibGUobmV4dFN0YXRlKTtcbiAgICAgIHRocm93SWZVbnNlcmlhbGl6YWJsZSh1bnNlcmlhbGl6YWJsZVN0YXRlLCAnc3RhdGUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dFN0YXRlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRVbnNlcmlhbGl6YWJsZShcbiAgdGFyZ2V0PzogYW55LFxuICBwYXRoOiBzdHJpbmdbXSA9IFtdXG4pOiBmYWxzZSB8IHsgcGF0aDogc3RyaW5nW107IHZhbHVlOiBhbnkgfSB7XG4gIC8vIEd1YXJkIGFnYWluc3QgdW5kZWZpbmVkIGFuZCBudWxsLCBlLmcuIGEgcmVkdWNlciB0aGF0IHJldHVybnMgdW5kZWZpbmVkXG4gIGlmICgoaXNVbmRlZmluZWQodGFyZ2V0KSB8fCBpc051bGwodGFyZ2V0KSkgJiYgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGF0aDogWydyb290J10sXG4gICAgICB2YWx1ZTogdGFyZ2V0LFxuICAgIH07XG4gIH1cblxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGFyZ2V0KTtcbiAgcmV0dXJuIGtleXMucmVkdWNlPGZhbHNlIHwgeyBwYXRoOiBzdHJpbmdbXTsgdmFsdWU6IGFueSB9PigocmVzdWx0LCBrZXkpID0+IHtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlID0gKHRhcmdldCBhcyBhbnkpW2tleV07XG5cbiAgICBpZiAoXG4gICAgICBpc1VuZGVmaW5lZCh2YWx1ZSkgfHxcbiAgICAgIGlzTnVsbCh2YWx1ZSkgfHxcbiAgICAgIGlzTnVtYmVyKHZhbHVlKSB8fFxuICAgICAgaXNCb29sZWFuKHZhbHVlKSB8fFxuICAgICAgaXNTdHJpbmcodmFsdWUpIHx8XG4gICAgICBpc0FycmF5KHZhbHVlKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGdldFVuc2VyaWFsaXphYmxlKHZhbHVlLCBbLi4ucGF0aCwga2V5XSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IFsuLi5wYXRoLCBrZXldLFxuICAgICAgdmFsdWUsXG4gICAgfTtcbiAgfSwgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiB0aHJvd0lmVW5zZXJpYWxpemFibGUoXG4gIHVuc2VyaWFsaXphYmxlOiBmYWxzZSB8IHsgcGF0aDogc3RyaW5nW107IHZhbHVlOiBhbnkgfSxcbiAgY29udGV4dDogJ3N0YXRlJyB8ICdhY3Rpb24nXG4pIHtcbiAgaWYgKHVuc2VyaWFsaXphYmxlID09PSBmYWxzZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHVuc2VyaWFsaXphYmxlUGF0aCA9IHVuc2VyaWFsaXphYmxlLnBhdGguam9pbignLicpO1xuICBjb25zdCBlcnJvcjogYW55ID0gbmV3IEVycm9yKFxuICAgIGBEZXRlY3RlZCB1bnNlcmlhbGl6YWJsZSAke2NvbnRleHR9IGF0IFwiJHt1bnNlcmlhbGl6YWJsZVBhdGh9XCJgXG4gICk7XG4gIGVycm9yLnZhbHVlID0gdW5zZXJpYWxpemFibGUudmFsdWU7XG4gIGVycm9yLnVuc2VyaWFsaXphYmxlUGF0aCA9IHVuc2VyaWFsaXphYmxlUGF0aDtcbiAgdGhyb3cgZXJyb3I7XG59XG4iXX0=