(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core/utility/strings", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const STRING_DASHERIZE_REGEXP = /[ _]/g;
    const STRING_DECAMELIZE_REGEXP = /([a-z\d])([A-Z])/g;
    const STRING_CAMELIZE_REGEXP = /(-|_|\.|\s)+(.)?/g;
    const STRING_UNDERSCORE_REGEXP_1 = /([a-z\d])([A-Z]+)/g;
    const STRING_UNDERSCORE_REGEXP_2 = /-|\s+/g;
    /**
     * Converts a camelized string into all lower case separated by underscores.
     *
     ```javascript
     decamelize('innerHTML');         // 'inner_html'
     decamelize('action_name');       // 'action_name'
     decamelize('css-class-name');    // 'css-class-name'
     decamelize('my favorite items'); // 'my favorite items'
     ```
     */
    function decamelize(str) {
        return str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase();
    }
    exports.decamelize = decamelize;
    /**
     Replaces underscores, spaces, or camelCase with dashes.
    
     ```javascript
     dasherize('innerHTML');         // 'inner-html'
     dasherize('action_name');       // 'action-name'
     dasherize('css-class-name');    // 'css-class-name'
     dasherize('my favorite items'); // 'my-favorite-items'
     ```
     */
    function dasherize(str) {
        return decamelize(str || '').replace(STRING_DASHERIZE_REGEXP, '-');
    }
    exports.dasherize = dasherize;
    /**
     Returns the lowerCamelCase form of a string.
    
     ```javascript
     camelize('innerHTML');          // 'innerHTML'
     camelize('action_name');        // 'actionName'
     camelize('css-class-name');     // 'cssClassName'
     camelize('my favorite items');  // 'myFavoriteItems'
     camelize('My Favorite Items');  // 'myFavoriteItems'
     ```
     */
    function camelize(str) {
        return str
            .replace(STRING_CAMELIZE_REGEXP, (_match, _separator, chr) => {
            return chr ? chr.toUpperCase() : '';
        })
            .replace(/^([A-Z])/, (match) => match.toLowerCase());
    }
    exports.camelize = camelize;
    /**
     Returns the UpperCamelCase form of a string.
    
     ```javascript
     'innerHTML'.classify();          // 'InnerHTML'
     'action_name'.classify();        // 'ActionName'
     'css-class-name'.classify();     // 'CssClassName'
     'my favorite items'.classify();  // 'MyFavoriteItems'
     ```
     */
    function classify(str) {
        return str
            .split('.')
            .map(part => capitalize(camelize(part)))
            .join('.');
    }
    exports.classify = classify;
    /**
     More general than decamelize. Returns the lower\_case\_and\_underscored
     form of a string.
    
     ```javascript
     'innerHTML'.underscore();          // 'inner_html'
     'action_name'.underscore();        // 'action_name'
     'css-class-name'.underscore();     // 'css_class_name'
     'my favorite items'.underscore();  // 'my_favorite_items'
     ```
     */
    function underscore(str) {
        return str
            .replace(STRING_UNDERSCORE_REGEXP_1, '$1_$2')
            .replace(STRING_UNDERSCORE_REGEXP_2, '_')
            .toLowerCase();
    }
    exports.underscore = underscore;
    /**
     Returns the Capitalized form of a string
    
     ```javascript
     'innerHTML'.capitalize()         // 'InnerHTML'
     'action_name'.capitalize()       // 'Action_name'
     'css-class-name'.capitalize()    // 'Css-class-name'
     'my favorite items'.capitalize() // 'My favorite items'
     ```
     */
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }
    exports.capitalize = capitalize;
    /**
     Returns the plural form of a string
    
     ```javascript
     'innerHTML'.pluralize()         // 'InnerHTMLs'
     'action_name'.pluralize()       // 'actionNames'
     'css-class-name'.pluralize()    // 'cssClassNames'
     'regex'.pluralize()            // 'regexes'
     'user'.pluralize()             // 'users'
     ```
     */
    function pluralize(str) {
        return camelize([/([^aeiou])y$/, /()fe?$/, /([^aeiou]o|[sxz]|[cs]h)$/].map((c, i) => (str = str.replace(c, `$1${'iv'[i] || ''}e`))) && str + 's');
    }
    exports.pluralize = pluralize;
    function group(name, group) {
        return group ? `${group}/${name}` : name;
    }
    exports.group = group;
    function featurePath(group, flat, path, name) {
        if (group && !flat) {
            return `../../${path}/${name}/`;
        }
        return group ? `../${path}/` : './';
    }
    exports.featurePath = featurePath;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvc3RyaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILE1BQU0sdUJBQXVCLEdBQUcsT0FBTyxDQUFDO0lBQ3hDLE1BQU0sd0JBQXdCLEdBQUcsbUJBQW1CLENBQUM7SUFDckQsTUFBTSxzQkFBc0IsR0FBRyxtQkFBbUIsQ0FBQztJQUNuRCxNQUFNLDBCQUEwQixHQUFHLG9CQUFvQixDQUFDO0lBQ3hELE1BQU0sMEJBQTBCLEdBQUcsUUFBUSxDQUFDO0lBRTVDOzs7Ozs7Ozs7T0FTRztJQUNILFNBQWdCLFVBQVUsQ0FBQyxHQUFXO1FBQ3BDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0RSxDQUFDO0lBRkQsZ0NBRUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxTQUFnQixTQUFTLENBQUMsR0FBWTtRQUNwQyxPQUFPLFVBQVUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFGRCw4QkFFQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxTQUFnQixRQUFRLENBQUMsR0FBVztRQUNsQyxPQUFPLEdBQUc7YUFDUCxPQUFPLENBQ04sc0JBQXNCLEVBQ3RCLENBQUMsTUFBYyxFQUFFLFVBQWtCLEVBQUUsR0FBVyxFQUFFLEVBQUU7WUFDbEQsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3RDLENBQUMsQ0FDRjthQUNBLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFURCw0QkFTQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFNBQWdCLFFBQVEsQ0FBQyxHQUFXO1FBQ2xDLE9BQU8sR0FBRzthQUNQLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDdkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUxELDRCQUtDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFNBQWdCLFVBQVUsQ0FBQyxHQUFXO1FBQ3BDLE9BQU8sR0FBRzthQUNQLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxPQUFPLENBQUM7YUFDNUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLEdBQUcsQ0FBQzthQUN4QyxXQUFXLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBTEQsZ0NBS0M7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxTQUFnQixVQUFVLENBQUMsR0FBVztRQUNwQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRkQsZ0NBRUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsU0FBZ0IsU0FBUyxDQUFDLEdBQVc7UUFDbkMsT0FBTyxRQUFRLENBQ2IsQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixDQUFDLENBQUMsR0FBRyxDQUN4RCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FDeEQsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUNmLENBQUM7SUFDSixDQUFDO0lBTkQsOEJBTUM7SUFFRCxTQUFnQixLQUFLLENBQUMsSUFBWSxFQUFFLEtBQXlCO1FBQzNELE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzNDLENBQUM7SUFGRCxzQkFFQztJQUVELFNBQWdCLFdBQVcsQ0FDekIsS0FBMEIsRUFDMUIsSUFBeUIsRUFDekIsSUFBWSxFQUNaLElBQVk7UUFFWixJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRTtZQUNsQixPQUFPLFNBQVMsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDO1NBQ2pDO1FBRUQsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN0QyxDQUFDO0lBWEQsa0NBV0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5jb25zdCBTVFJJTkdfREFTSEVSSVpFX1JFR0VYUCA9IC9bIF9dL2c7XG5jb25zdCBTVFJJTkdfREVDQU1FTElaRV9SRUdFWFAgPSAvKFthLXpcXGRdKShbQS1aXSkvZztcbmNvbnN0IFNUUklOR19DQU1FTElaRV9SRUdFWFAgPSAvKC18X3xcXC58XFxzKSsoLik/L2c7XG5jb25zdCBTVFJJTkdfVU5ERVJTQ09SRV9SRUdFWFBfMSA9IC8oW2EtelxcZF0pKFtBLVpdKykvZztcbmNvbnN0IFNUUklOR19VTkRFUlNDT1JFX1JFR0VYUF8yID0gLy18XFxzKy9nO1xuXG4vKipcbiAqIENvbnZlcnRzIGEgY2FtZWxpemVkIHN0cmluZyBpbnRvIGFsbCBsb3dlciBjYXNlIHNlcGFyYXRlZCBieSB1bmRlcnNjb3Jlcy5cbiAqXG4gYGBgamF2YXNjcmlwdFxuIGRlY2FtZWxpemUoJ2lubmVySFRNTCcpOyAgICAgICAgIC8vICdpbm5lcl9odG1sJ1xuIGRlY2FtZWxpemUoJ2FjdGlvbl9uYW1lJyk7ICAgICAgIC8vICdhY3Rpb25fbmFtZSdcbiBkZWNhbWVsaXplKCdjc3MtY2xhc3MtbmFtZScpOyAgICAvLyAnY3NzLWNsYXNzLW5hbWUnXG4gZGVjYW1lbGl6ZSgnbXkgZmF2b3JpdGUgaXRlbXMnKTsgLy8gJ215IGZhdm9yaXRlIGl0ZW1zJ1xuIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjYW1lbGl6ZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzdHIucmVwbGFjZShTVFJJTkdfREVDQU1FTElaRV9SRUdFWFAsICckMV8kMicpLnRvTG93ZXJDYXNlKCk7XG59XG5cbi8qKlxuIFJlcGxhY2VzIHVuZGVyc2NvcmVzLCBzcGFjZXMsIG9yIGNhbWVsQ2FzZSB3aXRoIGRhc2hlcy5cblxuIGBgYGphdmFzY3JpcHRcbiBkYXNoZXJpemUoJ2lubmVySFRNTCcpOyAgICAgICAgIC8vICdpbm5lci1odG1sJ1xuIGRhc2hlcml6ZSgnYWN0aW9uX25hbWUnKTsgICAgICAgLy8gJ2FjdGlvbi1uYW1lJ1xuIGRhc2hlcml6ZSgnY3NzLWNsYXNzLW5hbWUnKTsgICAgLy8gJ2Nzcy1jbGFzcy1uYW1lJ1xuIGRhc2hlcml6ZSgnbXkgZmF2b3JpdGUgaXRlbXMnKTsgLy8gJ215LWZhdm9yaXRlLWl0ZW1zJ1xuIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGFzaGVyaXplKHN0cj86IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBkZWNhbWVsaXplKHN0ciB8fCAnJykucmVwbGFjZShTVFJJTkdfREFTSEVSSVpFX1JFR0VYUCwgJy0nKTtcbn1cblxuLyoqXG4gUmV0dXJucyB0aGUgbG93ZXJDYW1lbENhc2UgZm9ybSBvZiBhIHN0cmluZy5cblxuIGBgYGphdmFzY3JpcHRcbiBjYW1lbGl6ZSgnaW5uZXJIVE1MJyk7ICAgICAgICAgIC8vICdpbm5lckhUTUwnXG4gY2FtZWxpemUoJ2FjdGlvbl9uYW1lJyk7ICAgICAgICAvLyAnYWN0aW9uTmFtZSdcbiBjYW1lbGl6ZSgnY3NzLWNsYXNzLW5hbWUnKTsgICAgIC8vICdjc3NDbGFzc05hbWUnXG4gY2FtZWxpemUoJ215IGZhdm9yaXRlIGl0ZW1zJyk7ICAvLyAnbXlGYXZvcml0ZUl0ZW1zJ1xuIGNhbWVsaXplKCdNeSBGYXZvcml0ZSBJdGVtcycpOyAgLy8gJ215RmF2b3JpdGVJdGVtcydcbiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbWVsaXplKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHN0clxuICAgIC5yZXBsYWNlKFxuICAgICAgU1RSSU5HX0NBTUVMSVpFX1JFR0VYUCxcbiAgICAgIChfbWF0Y2g6IHN0cmluZywgX3NlcGFyYXRvcjogc3RyaW5nLCBjaHI6IHN0cmluZykgPT4ge1xuICAgICAgICByZXR1cm4gY2hyID8gY2hyLnRvVXBwZXJDYXNlKCkgOiAnJztcbiAgICAgIH1cbiAgICApXG4gICAgLnJlcGxhY2UoL14oW0EtWl0pLywgKG1hdGNoOiBzdHJpbmcpID0+IG1hdGNoLnRvTG93ZXJDYXNlKCkpO1xufVxuXG4vKipcbiBSZXR1cm5zIHRoZSBVcHBlckNhbWVsQ2FzZSBmb3JtIG9mIGEgc3RyaW5nLlxuXG4gYGBgamF2YXNjcmlwdFxuICdpbm5lckhUTUwnLmNsYXNzaWZ5KCk7ICAgICAgICAgIC8vICdJbm5lckhUTUwnXG4gJ2FjdGlvbl9uYW1lJy5jbGFzc2lmeSgpOyAgICAgICAgLy8gJ0FjdGlvbk5hbWUnXG4gJ2Nzcy1jbGFzcy1uYW1lJy5jbGFzc2lmeSgpOyAgICAgLy8gJ0Nzc0NsYXNzTmFtZSdcbiAnbXkgZmF2b3JpdGUgaXRlbXMnLmNsYXNzaWZ5KCk7ICAvLyAnTXlGYXZvcml0ZUl0ZW1zJ1xuIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xhc3NpZnkoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gc3RyXG4gICAgLnNwbGl0KCcuJylcbiAgICAubWFwKHBhcnQgPT4gY2FwaXRhbGl6ZShjYW1lbGl6ZShwYXJ0KSkpXG4gICAgLmpvaW4oJy4nKTtcbn1cblxuLyoqXG4gTW9yZSBnZW5lcmFsIHRoYW4gZGVjYW1lbGl6ZS4gUmV0dXJucyB0aGUgbG93ZXJcXF9jYXNlXFxfYW5kXFxfdW5kZXJzY29yZWRcbiBmb3JtIG9mIGEgc3RyaW5nLlxuXG4gYGBgamF2YXNjcmlwdFxuICdpbm5lckhUTUwnLnVuZGVyc2NvcmUoKTsgICAgICAgICAgLy8gJ2lubmVyX2h0bWwnXG4gJ2FjdGlvbl9uYW1lJy51bmRlcnNjb3JlKCk7ICAgICAgICAvLyAnYWN0aW9uX25hbWUnXG4gJ2Nzcy1jbGFzcy1uYW1lJy51bmRlcnNjb3JlKCk7ICAgICAvLyAnY3NzX2NsYXNzX25hbWUnXG4gJ215IGZhdm9yaXRlIGl0ZW1zJy51bmRlcnNjb3JlKCk7ICAvLyAnbXlfZmF2b3JpdGVfaXRlbXMnXG4gYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmRlcnNjb3JlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHN0clxuICAgIC5yZXBsYWNlKFNUUklOR19VTkRFUlNDT1JFX1JFR0VYUF8xLCAnJDFfJDInKVxuICAgIC5yZXBsYWNlKFNUUklOR19VTkRFUlNDT1JFX1JFR0VYUF8yLCAnXycpXG4gICAgLnRvTG93ZXJDYXNlKCk7XG59XG5cbi8qKlxuIFJldHVybnMgdGhlIENhcGl0YWxpemVkIGZvcm0gb2YgYSBzdHJpbmdcblxuIGBgYGphdmFzY3JpcHRcbiAnaW5uZXJIVE1MJy5jYXBpdGFsaXplKCkgICAgICAgICAvLyAnSW5uZXJIVE1MJ1xuICdhY3Rpb25fbmFtZScuY2FwaXRhbGl6ZSgpICAgICAgIC8vICdBY3Rpb25fbmFtZSdcbiAnY3NzLWNsYXNzLW5hbWUnLmNhcGl0YWxpemUoKSAgICAvLyAnQ3NzLWNsYXNzLW5hbWUnXG4gJ215IGZhdm9yaXRlIGl0ZW1zJy5jYXBpdGFsaXplKCkgLy8gJ015IGZhdm9yaXRlIGl0ZW1zJ1xuIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc3Vic3RyKDEpO1xufVxuXG4vKipcbiBSZXR1cm5zIHRoZSBwbHVyYWwgZm9ybSBvZiBhIHN0cmluZ1xuXG4gYGBgamF2YXNjcmlwdFxuICdpbm5lckhUTUwnLnBsdXJhbGl6ZSgpICAgICAgICAgLy8gJ0lubmVySFRNTHMnXG4gJ2FjdGlvbl9uYW1lJy5wbHVyYWxpemUoKSAgICAgICAvLyAnYWN0aW9uTmFtZXMnXG4gJ2Nzcy1jbGFzcy1uYW1lJy5wbHVyYWxpemUoKSAgICAvLyAnY3NzQ2xhc3NOYW1lcydcbiAncmVnZXgnLnBsdXJhbGl6ZSgpICAgICAgICAgICAgLy8gJ3JlZ2V4ZXMnXG4gJ3VzZXInLnBsdXJhbGl6ZSgpICAgICAgICAgICAgIC8vICd1c2VycydcbiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBsdXJhbGl6ZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBjYW1lbGl6ZShcbiAgICBbLyhbXmFlaW91XSl5JC8sIC8oKWZlPyQvLCAvKFteYWVpb3Vdb3xbc3h6XXxbY3NdaCkkL10ubWFwKFxuICAgICAgKGMsIGkpID0+IChzdHIgPSBzdHIucmVwbGFjZShjLCBgJDEkeydpdidbaV0gfHwgJyd9ZWApKVxuICAgICkgJiYgc3RyICsgJ3MnXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncm91cChuYW1lOiBzdHJpbmcsIGdyb3VwOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgcmV0dXJuIGdyb3VwID8gYCR7Z3JvdXB9LyR7bmFtZX1gIDogbmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZlYXR1cmVQYXRoKFxuICBncm91cDogYm9vbGVhbiB8IHVuZGVmaW5lZCxcbiAgZmxhdDogYm9vbGVhbiB8IHVuZGVmaW5lZCxcbiAgcGF0aDogc3RyaW5nLFxuICBuYW1lOiBzdHJpbmdcbikge1xuICBpZiAoZ3JvdXAgJiYgIWZsYXQpIHtcbiAgICByZXR1cm4gYC4uLy4uLyR7cGF0aH0vJHtuYW1lfS9gO1xuICB9XG5cbiAgcmV0dXJuIGdyb3VwID8gYC4uLyR7cGF0aH0vYCA6ICcuLyc7XG59XG4iXX0=