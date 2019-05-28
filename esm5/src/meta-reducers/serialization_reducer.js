import * as tslib_1 from "tslib";
import { isPlainObject, isUndefined, isNull, isNumber, isBoolean, isString, isArray, } from './utils';
export function serializationCheckMetaReducer(reducer, checks) {
    return function (state, action) {
        if (checks.action) {
            var unserializableAction = getUnserializable(action);
            throwIfUnserializable(unserializableAction, 'action');
        }
        var nextState = reducer(state, action);
        if (checks.state) {
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
            return getUnserializable(value, tslib_1.__spread(path, [key]));
        }
        return {
            path: tslib_1.__spread(path, [key]),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXphdGlvbl9yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvbWV0YS1yZWR1Y2Vycy9zZXJpYWxpemF0aW9uX3JlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFDTCxhQUFhLEVBQ2IsV0FBVyxFQUNYLE1BQU0sRUFDTixRQUFRLEVBQ1IsU0FBUyxFQUNULFFBQVEsRUFDUixPQUFPLEdBQ1IsTUFBTSxTQUFTLENBQUM7QUFFakIsTUFBTSxVQUFVLDZCQUE2QixDQUMzQyxPQUFnQyxFQUNoQyxNQUEyQztJQUUzQyxPQUFPLFVBQVMsS0FBSyxFQUFFLE1BQU07UUFDM0IsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2pCLElBQU0sb0JBQW9CLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkQscUJBQXFCLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDdkQ7UUFFRCxJQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXpDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNoQixJQUFNLG1CQUFtQixHQUFHLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pELHFCQUFxQixDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQ3hCLE1BQVksRUFDWixJQUFtQjtJQUFuQixxQkFBQSxFQUFBLFNBQW1CO0lBRW5CLDBFQUEwRTtJQUMxRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2hFLE9BQU87WUFDTCxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDZCxLQUFLLEVBQUUsTUFBTTtTQUNkLENBQUM7S0FDSDtJQUVELElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUF5QyxVQUFDLE1BQU0sRUFBRSxHQUFHO1FBQ3JFLElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUVELElBQU0sS0FBSyxHQUFJLE1BQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVuQyxJQUNFLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNiLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDZixTQUFTLENBQUMsS0FBSyxDQUFDO1lBQ2hCLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEVBQ2Q7WUFDQSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxpQkFBaUIsQ0FBQyxLQUFLLG1CQUFNLElBQUksR0FBRSxHQUFHLEdBQUUsQ0FBQztTQUNqRDtRQUVELE9BQU87WUFDTCxJQUFJLG1CQUFNLElBQUksR0FBRSxHQUFHLEVBQUM7WUFDcEIsS0FBSyxPQUFBO1NBQ04sQ0FBQztJQUNKLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNaLENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUM1QixjQUFzRCxFQUN0RCxPQUEyQjtJQUUzQixJQUFJLGNBQWMsS0FBSyxLQUFLLEVBQUU7UUFDNUIsT0FBTztLQUNSO0lBRUQsSUFBTSxrQkFBa0IsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6RCxJQUFNLEtBQUssR0FBUSxJQUFJLEtBQUssQ0FDMUIsNkJBQTJCLE9BQU8sY0FBUSxrQkFBa0IsT0FBRyxDQUNoRSxDQUFDO0lBQ0YsS0FBSyxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO0lBQ25DLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztJQUM5QyxNQUFNLEtBQUssQ0FBQztBQUNkLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25SZWR1Y2VyIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7XG4gIGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkLFxuICBpc051bGwsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzU3RyaW5nLFxuICBpc0FycmF5LFxufSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6YXRpb25DaGVja01ldGFSZWR1Y2VyKFxuICByZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPGFueSwgYW55PixcbiAgY2hlY2tzOiB7IGFjdGlvbjogYm9vbGVhbjsgc3RhdGU6IGJvb2xlYW4gfVxuKTogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4ge1xuICByZXR1cm4gZnVuY3Rpb24oc3RhdGUsIGFjdGlvbikge1xuICAgIGlmIChjaGVja3MuYWN0aW9uKSB7XG4gICAgICBjb25zdCB1bnNlcmlhbGl6YWJsZUFjdGlvbiA9IGdldFVuc2VyaWFsaXphYmxlKGFjdGlvbik7XG4gICAgICB0aHJvd0lmVW5zZXJpYWxpemFibGUodW5zZXJpYWxpemFibGVBY3Rpb24sICdhY3Rpb24nKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0U3RhdGUgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgaWYgKGNoZWNrcy5zdGF0ZSkge1xuICAgICAgY29uc3QgdW5zZXJpYWxpemFibGVTdGF0ZSA9IGdldFVuc2VyaWFsaXphYmxlKG5leHRTdGF0ZSk7XG4gICAgICB0aHJvd0lmVW5zZXJpYWxpemFibGUodW5zZXJpYWxpemFibGVTdGF0ZSwgJ3N0YXRlJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHRTdGF0ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0VW5zZXJpYWxpemFibGUoXG4gIHRhcmdldD86IGFueSxcbiAgcGF0aDogc3RyaW5nW10gPSBbXVxuKTogZmFsc2UgfCB7IHBhdGg6IHN0cmluZ1tdOyB2YWx1ZTogYW55IH0ge1xuICAvLyBHdWFyZCBhZ2FpbnN0IHVuZGVmaW5lZCBhbmQgbnVsbCwgZS5nLiBhIHJlZHVjZXIgdGhhdCByZXR1cm5zIHVuZGVmaW5lZFxuICBpZiAoKGlzVW5kZWZpbmVkKHRhcmdldCkgfHwgaXNOdWxsKHRhcmdldCkpICYmIHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGg6IFsncm9vdCddLFxuICAgICAgdmFsdWU6IHRhcmdldCxcbiAgICB9O1xuICB9XG5cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRhcmdldCk7XG4gIHJldHVybiBrZXlzLnJlZHVjZTxmYWxzZSB8IHsgcGF0aDogc3RyaW5nW107IHZhbHVlOiBhbnkgfT4oKHJlc3VsdCwga2V5KSA9PiB7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9ICh0YXJnZXQgYXMgYW55KVtrZXldO1xuXG4gICAgaWYgKFxuICAgICAgaXNVbmRlZmluZWQodmFsdWUpIHx8XG4gICAgICBpc051bGwodmFsdWUpIHx8XG4gICAgICBpc051bWJlcih2YWx1ZSkgfHxcbiAgICAgIGlzQm9vbGVhbih2YWx1ZSkgfHxcbiAgICAgIGlzU3RyaW5nKHZhbHVlKSB8fFxuICAgICAgaXNBcnJheSh2YWx1ZSlcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBnZXRVbnNlcmlhbGl6YWJsZSh2YWx1ZSwgWy4uLnBhdGgsIGtleV0pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBbLi4ucGF0aCwga2V5XSxcbiAgICAgIHZhbHVlLFxuICAgIH07XG4gIH0sIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gdGhyb3dJZlVuc2VyaWFsaXphYmxlKFxuICB1bnNlcmlhbGl6YWJsZTogZmFsc2UgfCB7IHBhdGg6IHN0cmluZ1tdOyB2YWx1ZTogYW55IH0sXG4gIGNvbnRleHQ6ICdzdGF0ZScgfCAnYWN0aW9uJ1xuKSB7XG4gIGlmICh1bnNlcmlhbGl6YWJsZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB1bnNlcmlhbGl6YWJsZVBhdGggPSB1bnNlcmlhbGl6YWJsZS5wYXRoLmpvaW4oJy4nKTtcbiAgY29uc3QgZXJyb3I6IGFueSA9IG5ldyBFcnJvcihcbiAgICBgRGV0ZWN0ZWQgdW5zZXJpYWxpemFibGUgJHtjb250ZXh0fSBhdCBcIiR7dW5zZXJpYWxpemFibGVQYXRofVwiYFxuICApO1xuICBlcnJvci52YWx1ZSA9IHVuc2VyaWFsaXphYmxlLnZhbHVlO1xuICBlcnJvci51bnNlcmlhbGl6YWJsZVBhdGggPSB1bnNlcmlhbGl6YWJsZVBhdGg7XG4gIHRocm93IGVycm9yO1xufVxuIl19