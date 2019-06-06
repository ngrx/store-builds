/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T, C
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
            (props) => (Object.assign({}, props, { type }))));
        default:
            throw new Error('Unexpected config.');
    }
}
/**
 * @template P
 * @return {?}
 */
export function props() {
    // the return type does not match TypePropertyIsNotAllowed, so double casting
    // is used.
    return (/** @type {?} */ (((/** @type {?} */ ({ _as: 'props', _p: (/** @type {?} */ (undefined)) })))));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uX2NyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3N0b3JlL3NyYy9hY3Rpb25fY3JlYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBMkJBLE1BQU0sVUFBVSxZQUFZLENBQzFCLElBQU8sRUFDUCxNQUE2QjtJQUU3QixJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsRUFBRTtRQUNoQyxPQUFPLFVBQVUsQ0FBQyxJQUFJOzs7O1FBQUUsQ0FBQyxHQUFHLElBQVcsRUFBRSxFQUFFLENBQUMsbUJBQ3ZDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUNsQixJQUFJLElBQ0osRUFBQyxDQUFDO0tBQ0w7O1VBQ0ssRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTztJQUN4QyxRQUFRLEVBQUUsRUFBRTtRQUNWLEtBQUssT0FBTztZQUNWLE9BQU8sVUFBVSxDQUFDLElBQUk7OztZQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFDNUMsS0FBSyxPQUFPO1lBQ1YsT0FBTyxVQUFVLENBQUMsSUFBSTs7OztZQUFFLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FBQyxtQkFDdEMsS0FBSyxJQUNSLElBQUksSUFDSixFQUFDLENBQUM7UUFDTjtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUN6QztBQUNILENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLEtBQUs7SUFDbkIsNkVBQTZFO0lBQzdFLFdBQVc7SUFDWCxPQUFPLG1CQUFBLENBQUMsbUJBQUEsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxtQkFBQSxTQUFTLEVBQUMsRUFBRSxFQUFXLENBQUMsRUFBc0IsQ0FBQztBQUM3RSxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsS0FBSyxDQUVuQixRQUFXO0lBQ1gsT0FBTyxtQkFBQSxTQUFTLEVBQUMsQ0FBQztBQUNwQixDQUFDOzs7Ozs7QUFFRCxTQUFTLFVBQVUsQ0FBQyxJQUFZLEVBQUUsT0FBZ0I7SUFDaEQsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUU7UUFDNUMsS0FBSyxFQUFFLElBQUk7UUFDWCxRQUFRLEVBQUUsS0FBSztLQUNoQixDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ3JlYXRvcixcbiAgQWN0aW9uQ3JlYXRvcixcbiAgVHlwZWRBY3Rpb24sXG4gIEZ1bmN0aW9uV2l0aFBhcmFtZXRlcnNUeXBlLFxuICBQcm9wc1JldHVyblR5cGUsXG4gIERpc2FsbG93VHlwZVByb3BlcnR5LFxufSBmcm9tICcuL21vZGVscyc7XG5cbi8vIEFjdGlvbiBjcmVhdG9ycyB0YWtlbiBmcm9tIHRzLWFjdGlvbiBsaWJyYXJ5IGFuZCBtb2RpZmllZCBhIGJpdCB0byBiZXR0ZXJcbi8vIGZpdCBjdXJyZW50IE5nUnggdXNhZ2UuIFRoYW5rIHlvdSBOaWNob2xhcyBKYW1pZXNvbiAoQGNhcnRhbnQpLlxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uPFQgZXh0ZW5kcyBzdHJpbmc+KFxuICB0eXBlOiBUXG4pOiBBY3Rpb25DcmVhdG9yPFQsICgpID0+IFR5cGVkQWN0aW9uPFQ+PjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3Rpb248VCBleHRlbmRzIHN0cmluZywgUCBleHRlbmRzIG9iamVjdD4oXG4gIHR5cGU6IFQsXG4gIGNvbmZpZzogeyBfYXM6ICdwcm9wcyc7IF9wOiBQIH1cbik6IEFjdGlvbkNyZWF0b3I8VCwgKHByb3BzOiBQKSA9PiBQICYgVHlwZWRBY3Rpb248VD4+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbjxcbiAgVCBleHRlbmRzIHN0cmluZyxcbiAgUCBleHRlbmRzIGFueVtdLFxuICBSIGV4dGVuZHMgb2JqZWN0XG4+KFxuICB0eXBlOiBULFxuICBjcmVhdG9yOiBDcmVhdG9yPFAsIERpc2FsbG93VHlwZVByb3BlcnR5PFI+PlxuKTogRnVuY3Rpb25XaXRoUGFyYW1ldGVyc1R5cGU8UCwgUiAmIFR5cGVkQWN0aW9uPFQ+PiAmIFR5cGVkQWN0aW9uPFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbjxUIGV4dGVuZHMgc3RyaW5nLCBDIGV4dGVuZHMgQ3JlYXRvcj4oXG4gIHR5cGU6IFQsXG4gIGNvbmZpZz86IHsgX2FzOiAncHJvcHMnIH0gfCBDXG4pOiBDcmVhdG9yIHtcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZGVmaW5lVHlwZSh0eXBlLCAoLi4uYXJnczogYW55W10pID0+ICh7XG4gICAgICAuLi5jb25maWcoLi4uYXJncyksXG4gICAgICB0eXBlLFxuICAgIH0pKTtcbiAgfVxuICBjb25zdCBhcyA9IGNvbmZpZyA/IGNvbmZpZy5fYXMgOiAnZW1wdHknO1xuICBzd2l0Y2ggKGFzKSB7XG4gICAgY2FzZSAnZW1wdHknOlxuICAgICAgcmV0dXJuIGRlZmluZVR5cGUodHlwZSwgKCkgPT4gKHsgdHlwZSB9KSk7XG4gICAgY2FzZSAncHJvcHMnOlxuICAgICAgcmV0dXJuIGRlZmluZVR5cGUodHlwZSwgKHByb3BzOiBvYmplY3QpID0+ICh7XG4gICAgICAgIC4uLnByb3BzLFxuICAgICAgICB0eXBlLFxuICAgICAgfSkpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgY29uZmlnLicpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9wczxQIGV4dGVuZHMgb2JqZWN0PigpOiBQcm9wc1JldHVyblR5cGU8UD4ge1xuICAvLyB0aGUgcmV0dXJuIHR5cGUgZG9lcyBub3QgbWF0Y2ggVHlwZVByb3BlcnR5SXNOb3RBbGxvd2VkLCBzbyBkb3VibGUgY2FzdGluZ1xuICAvLyBpcyB1c2VkLlxuICByZXR1cm4gKHsgX2FzOiAncHJvcHMnLCBfcDogdW5kZWZpbmVkISB9IGFzIHVua25vd24pIGFzIFByb3BzUmV0dXJuVHlwZTxQPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuaW9uPFxuICBDIGV4dGVuZHMgeyBba2V5OiBzdHJpbmddOiBBY3Rpb25DcmVhdG9yPHN0cmluZywgQ3JlYXRvcj4gfVxuPihjcmVhdG9yczogQyk6IFJldHVyblR5cGU8Q1trZXlvZiBDXT4ge1xuICByZXR1cm4gdW5kZWZpbmVkITtcbn1cblxuZnVuY3Rpb24gZGVmaW5lVHlwZSh0eXBlOiBzdHJpbmcsIGNyZWF0b3I6IENyZWF0b3IpOiBDcmVhdG9yIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdG9yLCAndHlwZScsIHtcbiAgICB2YWx1ZTogdHlwZSxcbiAgICB3cml0YWJsZTogZmFsc2UsXG4gIH0pO1xufVxuIl19