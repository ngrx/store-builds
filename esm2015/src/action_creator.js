/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 * @param {?} type
 * @param {?=} config
 * @return {?}
 */
export function createAction(type, config) {
    if (typeof config === 'function') {
        return defineType(type, (/**
         * @param {...?} args
         * @return {?}
         */
        (...args) => (Object.assign({}, config(...args), { type }))));
    }
    /** @type {?} */
    const as = config ? config._as : 'empty';
    switch (as) {
        case 'empty':
            return defineType(type, (/**
             * @return {?}
             */
            () => ({ type })));
        case 'props':
            return defineType(type, (/**
             * @param {?} props
             * @return {?}
             */
            (props) => (Object.assign({}, ((/** @type {?} */ (props))), { type }))));
        default:
            throw new Error('Unexpected config.');
    }
}
/**
 * @template P
 * @return {?}
 */
export function props() {
    return { _as: 'props', _p: (/** @type {?} */ (undefined)) };
}
/**
 * @template C
 * @param {?} creators
 * @return {?}
 */
export function union(creators) {
    return (/** @type {?} */ (undefined));
}
/**
 * @param {?} type
 * @param {?} creator
 * @return {?}
 */
function defineType(type, creator) {
    return Object.defineProperty(creator, 'type', {
        value: type,
        writable: false,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uX2NyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9hY3Rpb25fY3JlYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBMkJBLE1BQU0sVUFBVSxZQUFZLENBQzFCLElBQU8sRUFDUCxNQUFtQztJQUVuQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsRUFBRTtRQUNoQyxPQUFPLFVBQVUsQ0FBQyxJQUFJOzs7O1FBQUUsQ0FBQyxHQUFHLElBQWUsRUFBRSxFQUFFLENBQUMsbUJBQzNDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUNsQixJQUFJLElBQ0osRUFBQyxDQUFDO0tBQ0w7O1VBQ0ssRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTztJQUN4QyxRQUFRLEVBQUUsRUFBRTtRQUNWLEtBQUssT0FBTztZQUNWLE9BQU8sVUFBVSxDQUFDLElBQUk7OztZQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFDNUMsS0FBSyxPQUFPO1lBQ1YsT0FBTyxVQUFVLENBQUMsSUFBSTs7OztZQUFFLENBQUMsS0FBYyxFQUFFLEVBQUUsQ0FBQyxtQkFDdkMsQ0FBQyxtQkFBQSxLQUFLLEVBQVUsQ0FBQyxJQUNwQixJQUFJLElBQ0osRUFBQyxDQUFDO1FBQ047WUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7S0FDekM7QUFDSCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxLQUFLO0lBQ25CLE9BQU8sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxtQkFBQSxTQUFTLEVBQUMsRUFBRSxDQUFDO0FBQzFDLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxLQUFLLENBRW5CLFFBQVc7SUFDWCxPQUFPLG1CQUFBLFNBQVMsRUFBQyxDQUFDO0FBQ3BCLENBQUM7Ozs7OztBQUVELFNBQVMsVUFBVSxDQUFDLElBQVksRUFBRSxPQUFnQjtJQUNoRCxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRTtRQUM1QyxLQUFLLEVBQUUsSUFBSTtRQUNYLFFBQVEsRUFBRSxLQUFLO0tBQ2hCLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDcmVhdG9yLFxuICBBY3Rpb25DcmVhdG9yLFxuICBUeXBlZEFjdGlvbixcbiAgRnVuY3Rpb25XaXRoUGFyYW1ldGVyc1R5cGUsXG4gIFBhcmFtZXRlcnNUeXBlLFxufSBmcm9tICcuL21vZGVscyc7XG5cbi8qKlxuICogQWN0aW9uIGNyZWF0b3JzIHRha2VuIGZyb20gdHMtYWN0aW9uIGxpYnJhcnkgYW5kIG1vZGlmaWVkIGEgYml0IHRvIGJldHRlclxuICogZml0IGN1cnJlbnQgTmdSeCB1c2FnZS4gVGhhbmsgeW91IE5pY2hvbGFzIEphbWllc29uIChAY2FydGFudCkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3Rpb248VCBleHRlbmRzIHN0cmluZz4oXG4gIHR5cGU6IFRcbik6IEFjdGlvbkNyZWF0b3I8VCwgKCkgPT4gVHlwZWRBY3Rpb248VD4+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbjxUIGV4dGVuZHMgc3RyaW5nLCBQIGV4dGVuZHMgb2JqZWN0PihcbiAgdHlwZTogVCxcbiAgY29uZmlnOiB7IF9hczogJ3Byb3BzJzsgX3A6IFAgfVxuKTogQWN0aW9uQ3JlYXRvcjxULCAocHJvcHM6IFApID0+IFAgJiBUeXBlZEFjdGlvbjxUPj47XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uPFQgZXh0ZW5kcyBzdHJpbmcsIEMgZXh0ZW5kcyBDcmVhdG9yPihcbiAgdHlwZTogVCxcbiAgY3JlYXRvcjogQ1xuKTogRnVuY3Rpb25XaXRoUGFyYW1ldGVyc1R5cGU8XG4gIFBhcmFtZXRlcnNUeXBlPEM+LFxuICBSZXR1cm5UeXBlPEM+ICYgVHlwZWRBY3Rpb248VD5cbj4gJlxuICBUeXBlZEFjdGlvbjxUPjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3Rpb248VCBleHRlbmRzIHN0cmluZz4oXG4gIHR5cGU6IFQsXG4gIGNvbmZpZz86IHsgX2FzOiAncHJvcHMnIH0gfCBDcmVhdG9yXG4pOiBDcmVhdG9yIHtcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZGVmaW5lVHlwZSh0eXBlLCAoLi4uYXJnczogdW5rbm93bltdKSA9PiAoe1xuICAgICAgLi4uY29uZmlnKC4uLmFyZ3MpLFxuICAgICAgdHlwZSxcbiAgICB9KSk7XG4gIH1cbiAgY29uc3QgYXMgPSBjb25maWcgPyBjb25maWcuX2FzIDogJ2VtcHR5JztcbiAgc3dpdGNoIChhcykge1xuICAgIGNhc2UgJ2VtcHR5JzpcbiAgICAgIHJldHVybiBkZWZpbmVUeXBlKHR5cGUsICgpID0+ICh7IHR5cGUgfSkpO1xuICAgIGNhc2UgJ3Byb3BzJzpcbiAgICAgIHJldHVybiBkZWZpbmVUeXBlKHR5cGUsIChwcm9wczogdW5rbm93bikgPT4gKHtcbiAgICAgICAgLi4uKHByb3BzIGFzIG9iamVjdCksXG4gICAgICAgIHR5cGUsXG4gICAgICB9KSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBjb25maWcuJyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3BzPFA+KCk6IHsgX2FzOiAncHJvcHMnOyBfcDogUCB9IHtcbiAgcmV0dXJuIHsgX2FzOiAncHJvcHMnLCBfcDogdW5kZWZpbmVkISB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pb248XG4gIEMgZXh0ZW5kcyB7IFtrZXk6IHN0cmluZ106IEFjdGlvbkNyZWF0b3I8c3RyaW5nLCBDcmVhdG9yPiB9XG4+KGNyZWF0b3JzOiBDKTogUmV0dXJuVHlwZTxDW2tleW9mIENdPiB7XG4gIHJldHVybiB1bmRlZmluZWQhO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVUeXBlKHR5cGU6IHN0cmluZywgY3JlYXRvcjogQ3JlYXRvcik6IENyZWF0b3Ige1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGNyZWF0b3IsICd0eXBlJywge1xuICAgIHZhbHVlOiB0eXBlLFxuICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgfSk7XG59XG4iXX0=