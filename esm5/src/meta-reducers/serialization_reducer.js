import { __read, __spread } from "tslib";
import { isPlainObject, isUndefined, isNull, isNumber, isBoolean, isString, isArray, RUNTIME_CHECK_URL, } from './utils';
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
    var error = new Error("Detected unserializable " + context + " at \"" + unserializablePath + "\". " + RUNTIME_CHECK_URL + "#strict" + context + "serializability");
    error.value = unserializable.value;
    error.unserializablePath = unserializablePath;
    throw error;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXphdGlvbl9yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zcmMvbWV0YS1yZWR1Y2Vycy9zZXJpYWxpemF0aW9uX3JlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFDTCxhQUFhLEVBQ2IsV0FBVyxFQUNYLE1BQU0sRUFDTixRQUFRLEVBQ1IsU0FBUyxFQUNULFFBQVEsRUFDUixPQUFPLEVBQ1AsaUJBQWlCLEdBQ2xCLE1BQU0sU0FBUyxDQUFDO0FBRWpCLE1BQU0sVUFBVSw2QkFBNkIsQ0FDM0MsT0FBZ0MsRUFDaEMsTUFBcUU7SUFFckUsT0FBTyxVQUFTLEtBQUssRUFBRSxNQUFNO1FBQzNCLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN6QixJQUFNLG9CQUFvQixHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZELHFCQUFxQixDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZEO1FBRUQsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUV6QyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNsQixJQUFNLG1CQUFtQixHQUFHLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pELHFCQUFxQixDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQ3hCLE1BQVksRUFDWixJQUFtQjtJQUFuQixxQkFBQSxFQUFBLFNBQW1CO0lBRW5CLDBFQUEwRTtJQUMxRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2hFLE9BQU87WUFDTCxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDZCxLQUFLLEVBQUUsTUFBTTtTQUNkLENBQUM7S0FDSDtJQUVELElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUF5QyxVQUFDLE1BQU0sRUFBRSxHQUFHO1FBQ3JFLElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUVELElBQU0sS0FBSyxHQUFJLE1BQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVuQyxJQUNFLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNiLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDZixTQUFTLENBQUMsS0FBSyxDQUFDO1lBQ2hCLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEVBQ2Q7WUFDQSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxpQkFBaUIsQ0FBQyxLQUFLLFdBQU0sSUFBSSxHQUFFLEdBQUcsR0FBRSxDQUFDO1NBQ2pEO1FBRUQsT0FBTztZQUNMLElBQUksV0FBTSxJQUFJLEdBQUUsR0FBRyxFQUFDO1lBQ3BCLEtBQUssT0FBQTtTQUNOLENBQUM7SUFDSixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDWixDQUFDO0FBRUQsU0FBUyxxQkFBcUIsQ0FDNUIsY0FBc0QsRUFDdEQsT0FBMkI7SUFFM0IsSUFBSSxjQUFjLEtBQUssS0FBSyxFQUFFO1FBQzVCLE9BQU87S0FDUjtJQUVELElBQU0sa0JBQWtCLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekQsSUFBTSxLQUFLLEdBQVEsSUFBSSxLQUFLLENBQzFCLDZCQUEyQixPQUFPLGNBQVEsa0JBQWtCLFlBQU0saUJBQWlCLGVBQVUsT0FBTyxvQkFBaUIsQ0FDdEgsQ0FBQztJQUNGLEtBQUssQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztJQUNuQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7SUFDOUMsTUFBTSxLQUFLLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uUmVkdWNlciwgQWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7XG4gIGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkLFxuICBpc051bGwsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzU3RyaW5nLFxuICBpc0FycmF5LFxuICBSVU5USU1FX0NIRUNLX1VSTCxcbn0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcihcbiAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4sXG4gIGNoZWNrczogeyBhY3Rpb246IChhY3Rpb246IEFjdGlvbikgPT4gYm9vbGVhbjsgc3RhdGU6ICgpID0+IGJvb2xlYW4gfVxuKTogQWN0aW9uUmVkdWNlcjxhbnksIGFueT4ge1xuICByZXR1cm4gZnVuY3Rpb24oc3RhdGUsIGFjdGlvbikge1xuICAgIGlmIChjaGVja3MuYWN0aW9uKGFjdGlvbikpIHtcbiAgICAgIGNvbnN0IHVuc2VyaWFsaXphYmxlQWN0aW9uID0gZ2V0VW5zZXJpYWxpemFibGUoYWN0aW9uKTtcbiAgICAgIHRocm93SWZVbnNlcmlhbGl6YWJsZSh1bnNlcmlhbGl6YWJsZUFjdGlvbiwgJ2FjdGlvbicpO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICBpZiAoY2hlY2tzLnN0YXRlKCkpIHtcbiAgICAgIGNvbnN0IHVuc2VyaWFsaXphYmxlU3RhdGUgPSBnZXRVbnNlcmlhbGl6YWJsZShuZXh0U3RhdGUpO1xuICAgICAgdGhyb3dJZlVuc2VyaWFsaXphYmxlKHVuc2VyaWFsaXphYmxlU3RhdGUsICdzdGF0ZScpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0U3RhdGU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFVuc2VyaWFsaXphYmxlKFxuICB0YXJnZXQ/OiBhbnksXG4gIHBhdGg6IHN0cmluZ1tdID0gW11cbik6IGZhbHNlIHwgeyBwYXRoOiBzdHJpbmdbXTsgdmFsdWU6IGFueSB9IHtcbiAgLy8gR3VhcmQgYWdhaW5zdCB1bmRlZmluZWQgYW5kIG51bGwsIGUuZy4gYSByZWR1Y2VyIHRoYXQgcmV0dXJucyB1bmRlZmluZWRcbiAgaWYgKChpc1VuZGVmaW5lZCh0YXJnZXQpIHx8IGlzTnVsbCh0YXJnZXQpKSAmJiBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBbJ3Jvb3QnXSxcbiAgICAgIHZhbHVlOiB0YXJnZXQsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0YXJnZXQpO1xuICByZXR1cm4ga2V5cy5yZWR1Y2U8ZmFsc2UgfCB7IHBhdGg6IHN0cmluZ1tdOyB2YWx1ZTogYW55IH0+KChyZXN1bHQsIGtleSkgPT4ge1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSAodGFyZ2V0IGFzIGFueSlba2V5XTtcblxuICAgIGlmIChcbiAgICAgIGlzVW5kZWZpbmVkKHZhbHVlKSB8fFxuICAgICAgaXNOdWxsKHZhbHVlKSB8fFxuICAgICAgaXNOdW1iZXIodmFsdWUpIHx8XG4gICAgICBpc0Jvb2xlYW4odmFsdWUpIHx8XG4gICAgICBpc1N0cmluZyh2YWx1ZSkgfHxcbiAgICAgIGlzQXJyYXkodmFsdWUpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZ2V0VW5zZXJpYWxpemFibGUodmFsdWUsIFsuLi5wYXRoLCBrZXldKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGF0aDogWy4uLnBhdGgsIGtleV0sXG4gICAgICB2YWx1ZSxcbiAgICB9O1xuICB9LCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIHRocm93SWZVbnNlcmlhbGl6YWJsZShcbiAgdW5zZXJpYWxpemFibGU6IGZhbHNlIHwgeyBwYXRoOiBzdHJpbmdbXTsgdmFsdWU6IGFueSB9LFxuICBjb250ZXh0OiAnc3RhdGUnIHwgJ2FjdGlvbidcbikge1xuICBpZiAodW5zZXJpYWxpemFibGUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdW5zZXJpYWxpemFibGVQYXRoID0gdW5zZXJpYWxpemFibGUucGF0aC5qb2luKCcuJyk7XG4gIGNvbnN0IGVycm9yOiBhbnkgPSBuZXcgRXJyb3IoXG4gICAgYERldGVjdGVkIHVuc2VyaWFsaXphYmxlICR7Y29udGV4dH0gYXQgXCIke3Vuc2VyaWFsaXphYmxlUGF0aH1cIi4gJHtSVU5USU1FX0NIRUNLX1VSTH0jc3RyaWN0JHtjb250ZXh0fXNlcmlhbGl6YWJpbGl0eWBcbiAgKTtcbiAgZXJyb3IudmFsdWUgPSB1bnNlcmlhbGl6YWJsZS52YWx1ZTtcbiAgZXJyb3IudW5zZXJpYWxpemFibGVQYXRoID0gdW5zZXJpYWxpemFibGVQYXRoO1xuICB0aHJvdyBlcnJvcjtcbn1cbiJdfQ==