(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/store/schematics-core/utility/change", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * An operation that does nothing.
     */
    class NoopChange {
        constructor() {
            this.description = 'No operation.';
            this.order = Infinity;
            this.path = null;
        }
        apply() {
            return Promise.resolve();
        }
    }
    exports.NoopChange = NoopChange;
    /**
     * Will add text to the source code.
     */
    class InsertChange {
        constructor(path, pos, toAdd) {
            this.path = path;
            this.pos = pos;
            this.toAdd = toAdd;
            if (pos < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = `Inserted ${toAdd} into position ${pos} of ${path}`;
            this.order = pos;
        }
        /**
         * This method does not insert spaces if there is none in the original string.
         */
        apply(host) {
            return host.read(this.path).then(content => {
                const prefix = content.substring(0, this.pos);
                const suffix = content.substring(this.pos);
                return host.write(this.path, `${prefix}${this.toAdd}${suffix}`);
            });
        }
    }
    exports.InsertChange = InsertChange;
    /**
     * Will remove text from the source code.
     */
    class RemoveChange {
        constructor(path, pos, toRemove) {
            this.path = path;
            this.pos = pos;
            this.toRemove = toRemove;
            if (pos < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = `Removed ${toRemove} into position ${pos} of ${path}`;
            this.order = pos;
        }
        apply(host) {
            return host.read(this.path).then(content => {
                const prefix = content.substring(0, this.pos);
                const suffix = content.substring(this.pos + this.toRemove.length);
                // TODO: throw error if toRemove doesn't match removed string.
                return host.write(this.path, `${prefix}${suffix}`);
            });
        }
    }
    exports.RemoveChange = RemoveChange;
    /**
     * Will replace text from the source code.
     */
    class ReplaceChange {
        constructor(path, pos, oldText, newText) {
            this.path = path;
            this.pos = pos;
            this.oldText = oldText;
            this.newText = newText;
            if (pos < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = `Replaced ${oldText} into position ${pos} of ${path} with ${newText}`;
            this.order = pos;
        }
        apply(host) {
            return host.read(this.path).then(content => {
                const prefix = content.substring(0, this.pos);
                const suffix = content.substring(this.pos + this.oldText.length);
                const text = content.substring(this.pos, this.pos + this.oldText.length);
                if (text !== this.oldText) {
                    return Promise.reject(new Error(`Invalid replace: "${text}" != "${this.oldText}".`));
                }
                // TODO: throw error if oldText doesn't match removed string.
                return host.write(this.path, `${prefix}${this.newText}${suffix}`);
            });
        }
    }
    exports.ReplaceChange = ReplaceChange;
    function createReplaceChange(sourceFile, path, node, oldText, newText) {
        return new ReplaceChange(path, node.getStart(sourceFile), oldText, newText);
    }
    exports.createReplaceChange = createReplaceChange;
    function createChangeRecorder(tree, path, changes) {
        const recorder = tree.beginUpdate(path);
        for (const change of changes) {
            const action = change;
            recorder.remove(action.pos, action.oldText.length);
            recorder.insertLeft(action.pos, action.newText);
        }
        return recorder;
    }
    exports.createChangeRecorder = createChangeRecorder;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zY2hlbWF0aWNzLWNvcmUvdXRpbGl0eS9jaGFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFnQ0E7O09BRUc7SUFDSCxNQUFhLFVBQVU7UUFBdkI7WUFDRSxnQkFBVyxHQUFHLGVBQWUsQ0FBQztZQUM5QixVQUFLLEdBQUcsUUFBUSxDQUFDO1lBQ2pCLFNBQUksR0FBRyxJQUFJLENBQUM7UUFJZCxDQUFDO1FBSEMsS0FBSztZQUNILE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNCLENBQUM7S0FDRjtJQVBELGdDQU9DO0lBRUQ7O09BRUc7SUFDSCxNQUFhLFlBQVk7UUFJdkIsWUFBbUIsSUFBWSxFQUFTLEdBQVcsRUFBUyxLQUFhO1lBQXRELFNBQUksR0FBSixJQUFJLENBQVE7WUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUN2RSxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO2FBQ25EO1lBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxZQUFZLEtBQUssa0JBQWtCLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztZQUN2RSxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNuQixDQUFDO1FBRUQ7O1dBRUc7UUFDSCxLQUFLLENBQUMsSUFBVTtZQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUN6QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlDLE1BQU0sTUFBTSxHQUFH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LElBQUksS0FBSyxDQUFDLHFCQUFxQixJQUFJLFNBQVMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQzlELENBQUM7aUJBQ0g7Z0JBRUQsNkRBQTZEO2dCQUM3RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDcEUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQ0Y7SUFqQ0Qsc0NBaUNDO0lBRUQsU0FBZ0IsbUJBQW1CLENBQ2pDLFVBQXlCLEVBQ3pCLElBQVUsRUFDVixJQUFhLEVBQ2IsT0FBZSxFQUNmLE9BQWU7UUFFZixPQUFPLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBUkQsa0RBUUM7SUFFRCxTQUFnQixvQkFBb0IsQ0FDbEMsSUFBVSxFQUNWLElBQVUsRUFDVixPQUF3QjtRQUV4QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQzVCLE1BQU0sTUFBTSxHQUFRLE1BQU0sQ0FBQztZQUMzQixRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQVpELG9EQVlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBUcmVlLCBVcGRhdGVSZWNvcmRlciB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7IFBhdGggfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBmaWxlICovXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEhvc3Qge1xuICB3cml0ZShwYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XG4gIHJlYWQocGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZSB7XG4gIGFwcGx5KGhvc3Q6IEhvc3QpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8vIFRoZSBmaWxlIHRoaXMgY2hhbmdlIHNob3VsZCBiZSBhcHBsaWVkIHRvLiBTb21lIGNoYW5nZXMgbWlnaHQgbm90IGFwcGx5IHRvXG4gIC8vIGEgZmlsZSAobWF5YmUgdGhlIGNvbmZpZykuXG4gIHJlYWRvbmx5IHBhdGg6IHN0cmluZyB8IG51bGw7XG5cbiAgLy8gVGhlIG9yZGVyIHRoaXMgY2hhbmdlIHNob3VsZCBiZSBhcHBsaWVkLiBOb3JtYWxseSB0aGUgcG9zaXRpb24gaW5zaWRlIHRoZSBmaWxlLlxuICAvLyBDaGFuZ2VzIGFyZSBhcHBsaWVkIGZyb20gdGhlIGJvdHRvbSBvZiBhIGZpbGUgdG8gdGhlIHRvcC5cbiAgcmVhZG9ubHkgb3JkZXI6IG51bWJlcjtcblxuICAvLyBUaGUgZGVzY3JpcHRpb24gb2YgdGhpcyBjaGFuZ2UuIFRoaXMgd2lsbCBiZSBvdXRwdXR0ZWQgaW4gYSBkcnkgb3IgdmVyYm9zZSBydW4uXG4gIHJlYWRvbmx5IGRlc2NyaXB0aW9uOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQW4gb3BlcmF0aW9uIHRoYXQgZG9lcyBub3RoaW5nLlxuICovXG5leHBvcnQgY2xhc3MgTm9vcENoYW5nZSBpbXBsZW1lbnRzIENoYW5nZSB7XG4gIGRlc2NyaXB0aW9uID0gJ05vIG9wZXJhdGlvbi4nO1xuICBvcmRlciA9IEluZmluaXR5O1xuICBwYXRoID0gbnVsbDtcbiAgYXBwbHkoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG59XG5cbi8qKlxuICogV2lsbCBhZGQgdGV4dCB0byB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbnNlcnRDaGFuZ2UgaW1wbGVtZW50cyBDaGFuZ2Uge1xuICBvcmRlcjogbnVtYmVyO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXRoOiBzdHJpbmcsIHB1YmxpYyBwb3M6IG51bWJlciwgcHVibGljIHRvQWRkOiBzdHJpbmcpIHtcbiAgICBpZiAocG9zIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZWdhdGl2ZSBwb3NpdGlvbnMgYXJlIGludmFsaWQnKTtcbiAgICB9XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGBJbnNlcnRlZCAke3RvQWRkfSBpbnRvIHBvc2l0aW9uICR7cG9zfSBvZiAke3BhdGh9YDtcbiAgICB0aGlzLm9yZGVyID0gcG9zO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGRvZXMgbm90IGluc2VydCBzcGFjZXMgaWYgdGhlcmUgaXMgbm9uZSBpbiB0aGUgb3JpZ2luYWwgc3RyaW5nLlxuICAgKi9cbiAgYXBwbHkoaG9zdDogSG9zdCkge1xuICAgIHJldHVybiBob3N0LnJlYWQodGhpcy5wYXRoKS50aGVuKGNvbnRlbnQgPT4ge1xuICAgICAgY29uc3QgcHJlZml4ID0gY29udGVudC5zdWJzdHJpbmcoMCwgdGhpcy5wb3MpO1xuICAgICAgY29uc3Qgc3VmZml4ID0gY29udGVudC5zdWJzdHJpbmcodGhpcy5wb3MpO1xuXG4gICAgICByZXR1cm4gaG9zdC53cml0ZSh0aGlzLnBhdGgsIGAke3ByZWZpeH0ke3RoaXMudG9BZGR9JHtzdWZmaXh9YCk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXaWxsIHJlbW92ZSB0ZXh0IGZyb20gdGhlIHNvdXJjZSBjb2RlLlxuICovXG5leHBvcnQgY2xhc3MgUmVtb3ZlQ2hhbmdlIGltcGxlbWVudHMgQ2hhbmdlIHtcbiAgb3JkZXI6IG51bWJlcjtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcGF0aDogc3RyaW5nLFxuICAgIHByaXZhdGUgcG9zOiBudW1iZXIsXG4gICAgcHJpdmF0ZSB0b1JlbW92ZTogc3RyaW5nXG4gICkge1xuICAgIGlmIChwb3MgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05lZ2F0aXZlIHBvc2l0aW9ucyBhcmUgaW52YWxpZCcpO1xuICAgIH1cbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gYFJlbW92ZWQgJHt0b1JlbW92ZX0gaW50byBwb3NpdGlvbiAke3Bvc30gb2YgJHtwYXRofWA7XG4gICAgdGhpcy5vcmRlciA9IHBvcztcbiAgfVxuXG4gIGFwcGx5KGhvc3Q6IEhvc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gaG9zdC5yZWFkKHRoaXMucGF0aCkudGhlbihjb250ZW50ID0+IHtcbiAgICAgIGNvbnN0IHByZWZpeCA9IGNvbnRlbnQuc3Vic3RyaW5nKDAsIHRoaXMucG9zKTtcbiAgICAgIGNvbnN0IHN1ZmZpeCA9IGNvbnRlbnQuc3Vic3RyaW5nKHRoaXMucG9zICsgdGhpcy50b1JlbW92ZS5sZW5ndGgpO1xuXG4gICAgICAvLyBUT0RPOiB0aHJvdyBlcnJvciBpZiB0b1JlbW92ZSBkb2Vzbid0IG1hdGNoIHJlbW92ZWQgc3RyaW5nLlxuICAgICAgcmV0dXJuIGhvc3Qud3JpdGUodGhpcy5wYXRoLCBgJHtwcmVmaXh9JHtzdWZmaXh9YCk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXaWxsIHJlcGxhY2UgdGV4dCBmcm9tIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlcGxhY2VDaGFuZ2UgaW1wbGVtZW50cyBDaGFuZ2Uge1xuICBvcmRlcjogbnVtYmVyO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBwYXRoOiBzdHJpbmcsXG4gICAgcHJpdmF0ZSBwb3M6IG51bWJlcixcbiAgICBwdWJsaWMgb2xkVGV4dDogc3RyaW5nLFxuICAgIHB1YmxpYyBuZXdUZXh0OiBzdHJpbmdcbiAgKSB7XG4gICAgaWYgKHBvcyA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTmVnYXRpdmUgcG9zaXRpb25zIGFyZSBpbnZhbGlkJyk7XG4gICAgfVxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBgUmVwbGFjZWQgJHtvbGRUZXh0fSBpbnRvIHBvc2l0aW9uICR7cG9zfSBvZiAke3BhdGh9IHdpdGggJHtuZXdUZXh0fWA7XG4gICAgdGhpcy5vcmRlciA9IHBvcztcbiAgfVxuXG4gIGFwcGx5KGhvc3Q6IEhvc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gaG9zdC5yZWFkKHRoaXMucGF0aCkudGhlbihjb250ZW50ID0+IHtcbiAgICAgIGNvbnN0IHByZWZpeCA9IGNvbnRlbnQuc3Vic3RyaW5nKDAsIHRoaXMucG9zKTtcbiAgICAgIGNvbnN0IHN1ZmZpeCA9IGNvbnRlbnQuc3Vic3RyaW5nKHRoaXMucG9zICsgdGhpcy5vbGRUZXh0Lmxlbmd0aCk7XG4gICAgICBjb25zdCB0ZXh0ID0gY29udGVudC5zdWJzdHJpbmcodGhpcy5wb3MsIHRoaXMucG9zICsgdGhpcy5vbGRUZXh0Lmxlbmd0aCk7XG5cbiAgICAgIGlmICh0ZXh0ICE9PSB0aGlzLm9sZFRleHQpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICAgIG5ldyBFcnJvcihgSW52YWxpZCByZXBsYWNlOiBcIiR7dGV4dH1cIiAhPSBcIiR7dGhpcy5vbGRUZXh0fVwiLmApXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE86IHRocm93IGVycm9yIGlmIG9sZFRleHQgZG9lc24ndCBtYXRjaCByZW1vdmVkIHN0cmluZy5cbiAgICAgIHJldHVybiBob3N0LndyaXRlKHRoaXMucGF0aCwgYCR7cHJlZml4fSR7dGhpcy5uZXdUZXh0fSR7c3VmZml4fWApO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZXBsYWNlQ2hhbmdlKFxuICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICBwYXRoOiBQYXRoLFxuICBub2RlOiB0cy5Ob2RlLFxuICBvbGRUZXh0OiBzdHJpbmcsXG4gIG5ld1RleHQ6IHN0cmluZ1xuKTogUmVwbGFjZUNoYW5nZSB7XG4gIHJldHVybiBuZXcgUmVwbGFjZUNoYW5nZShwYXRoLCBub2RlLmdldFN0YXJ0KHNvdXJjZUZpbGUpLCBvbGRUZXh0LCBuZXdUZXh0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNoYW5nZVJlY29yZGVyKFxuICB0cmVlOiBUcmVlLFxuICBwYXRoOiBQYXRoLFxuICBjaGFuZ2VzOiBSZXBsYWNlQ2hhbmdlW11cbik6IFVwZGF0ZVJlY29yZGVyIHtcbiAgY29uc3QgcmVjb3JkZXIgPSB0cmVlLmJlZ2luVXBkYXRlKHBhdGgpO1xuICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgY29uc3QgYWN0aW9uID0gPGFueT5jaGFuZ2U7XG4gICAgcmVjb3JkZXIucmVtb3ZlKGFjdGlvbi5wb3MsIGFjdGlvbi5vbGRUZXh0Lmxlbmd0aCk7XG4gICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChhY3Rpb24ucG9zLCBhY3Rpb24ubmV3VGV4dCk7XG4gIH1cbiAgcmV0dXJuIHJlY29yZGVyO1xufVxuIl19