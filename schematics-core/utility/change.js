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
        constructor(path, pos, end) {
            this.path = path;
            this.pos = pos;
            this.end = end;
            if (pos < 0 || end < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = `Removed text in position ${pos} to ${end} of ${path}`;
            this.order = pos;
        }
        apply(host) {
            return host.read(this.path).then(content => {
                const prefix = content.substring(0, this.pos);
                const suffix = content.substring(this.end);
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
    function createReplaceChange(sourceFile, node, oldText, newText) {
        return new ReplaceChange(sourceFile.fileName, node.getStart(sourceFile), oldText, newText);
    }
    exports.createReplaceChange = createReplaceChange;
    function createRemoveChange(sourceFile, node, from = node.getStart(sourceFile), to = node.getEnd()) {
        return new RemoveChange(sourceFile.fileName, from, to);
    }
    exports.createRemoveChange = createRemoveChange;
    function createChangeRecorder(tree, path, changes) {
        const recorder = tree.beginUpdate(path);
        for (const change of changes) {
            if (change instanceof InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
            else if (change instanceof RemoveChange) {
                recorder.remove(change.pos, change.end - change.pos);
            }
            else if (change instanceof ReplaceChange) {
                recorder.remove(change.pos, change.oldText.length);
                recorder.insertLeft(change.pos, change.newText);
            }
        }
        return recorder;
    }
    exports.createChangeRecorder = createChangeRecorder;
    function commitChanges(tree, path, changes) {
        if (changes.length === 0) {
            return false;
        }
        const recorder = createChangeRecorder(tree, path, changes);
        tree.commitUpdate(recorder);
        return true;
    }
    exports.commitChanges = commitChanges;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9zdG9yZS9zY2hlbWF0aWNzLWNvcmUvdXRpbGl0eS9jaGFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFnQ0E7O09BRUc7SUFDSCxNQUFhLFVBQVU7UUFBdkI7WUFDRSxnQkFBVyxHQUFHLGVBQWUsQ0FBQztZQUM5QixVQUFLLEdBQUcsUUFBUSxDQUFDO1lBQ2pCLFNBQUksR0FBRyxJQUFJLENBQUM7UUFJZCxDQUFDO1FBSEMsS0FBSztZQUNILE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNCLENBQUM7S0FDRjtJQVBELGdDQU9DO0lBRUQ7O09BRUc7SUFDSCxNQUFhLFlBQVk7UUFJdkIsWUFBbUIsSUFBWSxFQUFTLEdBQVcsRUFBUyxLQUFhO1lBQXRELFNBQUksR0FBSixJQUFJLENBQVE7WUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUN2RSxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO2FBQ25EO1lBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxZQUFZLEtBQUssa0JBQWtCLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztZQUN2RSxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNuQixDQUFDO1FBRUQ7O1dBRUc7UUFDSCxLQUFLLENBQUMsSUFBVTtZQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUN6QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlDLE1BQU0sTUFBTSxHQUFH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SSxNQUFNLFlBQVksWUFBWSxFQUFFO2dCQUN6QyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdEQ7aUJBQU0sSUFBSSxNQUFNLFlBQVksYUFBYSxFQUFFO2dCQUMxQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkQsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNqRDtTQUNGO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQWpCRCxvREFpQkM7SUFFRCxTQUFnQixhQUFhLENBQUMsSUFBVSxFQUFFLElBQVksRUFBRSxPQUFpQjtRQUN2RSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxNQUFNLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBUkQsc0NBUUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7IFRyZWUsIFVwZGF0ZVJlY29yZGVyIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcblxuLyogaXN0YW5idWwgaWdub3JlIGZpbGUgKi9cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSG9zdCB7XG4gIHdyaXRlKHBhdGg6IHN0cmluZywgY29udGVudDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcbiAgcmVhZChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhbmdlIHtcbiAgYXBwbHkoaG9zdDogSG9zdCk6IFByb21pc2U8dm9pZD47XG5cbiAgLy8gVGhlIGZpbGUgdGhpcyBjaGFuZ2Ugc2hvdWxkIGJlIGFwcGxpZWQgdG8uIFNvbWUgY2hhbmdlcyBtaWdodCBub3QgYXBwbHkgdG9cbiAgLy8gYSBmaWxlIChtYXliZSB0aGUgY29uZmlnKS5cbiAgcmVhZG9ubHkgcGF0aDogc3RyaW5nIHwgbnVsbDtcblxuICAvLyBUaGUgb3JkZXIgdGhpcyBjaGFuZ2Ugc2hvdWxkIGJlIGFwcGxpZWQuIE5vcm1hbGx5IHRoZSBwb3NpdGlvbiBpbnNpZGUgdGhlIGZpbGUuXG4gIC8vIENoYW5nZXMgYXJlIGFwcGxpZWQgZnJvbSB0aGUgYm90dG9tIG9mIGEgZmlsZSB0byB0aGUgdG9wLlxuICByZWFkb25seSBvcmRlcjogbnVtYmVyO1xuXG4gIC8vIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGlzIGNoYW5nZS4gVGhpcyB3aWxsIGJlIG91dHB1dHRlZCBpbiBhIGRyeSBvciB2ZXJib3NlIHJ1bi5cbiAgcmVhZG9ubHkgZGVzY3JpcHRpb246IHN0cmluZztcbn1cblxuLyoqXG4gKiBBbiBvcGVyYXRpb24gdGhhdCBkb2VzIG5vdGhpbmcuXG4gKi9cbmV4cG9ydCBjbGFzcyBOb29wQ2hhbmdlIGltcGxlbWVudHMgQ2hhbmdlIHtcbiAgZGVzY3JpcHRpb24gPSAnTm8gb3BlcmF0aW9uLic7XG4gIG9yZGVyID0gSW5maW5pdHk7XG4gIHBhdGggPSBudWxsO1xuICBhcHBseSgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBXaWxsIGFkZCB0ZXh0IHRvIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEluc2VydENoYW5nZSBpbXBsZW1lbnRzIENoYW5nZSB7XG4gIG9yZGVyOiBudW1iZXI7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHBhdGg6IHN0cmluZywgcHVibGljIHBvczogbnVtYmVyLCBwdWJsaWMgdG9BZGQ6IHN0cmluZykge1xuICAgIGlmIChwb3MgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05lZ2F0aXZlIHBvc2l0aW9ucyBhcmUgaW52YWxpZCcpO1xuICAgIH1cbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gYEluc2VydGVkICR7dG9BZGR9IGludG8gcG9zaXRpb24gJHtwb3N9IG9mICR7cGF0aH1gO1xuICAgIHRoaXMub3JkZXIgPSBwb3M7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgZG9lcyBub3QgaW5zZXJ0IHNwYWNlcyBpZiB0aGVyZSBpcyBub25lIGluIHRoZSBvcmlnaW5hbCBzdHJpbmcuXG4gICAqL1xuICBhcHBseShob3N0OiBIb3N0KSB7XG4gICAgcmV0dXJuIGhvc3QucmVhZCh0aGlzLnBhdGgpLnRoZW4oY29udGVudCA9PiB7XG4gICAgICBjb25zdCBwcmVmaXggPSBjb250ZW50LnN1YnN0cmluZygwLCB0aGlzLnBvcyk7XG4gICAgICBjb25zdCBzdWZmaXggPSBjb250ZW50LnN1YnN0cmluZyh0aGlzLnBvcyk7XG5cbiAgICAgIHJldHVybiBob3N0LndyaXRlKHRoaXMucGF0aCwgYCR7cHJlZml4fSR7dGhpcy50b0FkZH0ke3N1ZmZpeH1gKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIFdpbGwgcmVtb3ZlIHRleHQgZnJvbSB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZW1vdmVDaGFuZ2UgaW1wbGVtZW50cyBDaGFuZ2Uge1xuICBvcmRlcjogbnVtYmVyO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXRoOiBzdHJpbmcsIHB1YmxpYyBwb3M6IG51bWJlciwgcHVibGljIGVuZDogbnVtYmVyKSB7XG4gICAgaWYgKHBvcyA8IDAgfHwgZW5kIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZWdhdGl2ZSBwb3NpdGlvbnMgYXJlIGludmFsaWQnKTtcbiAgICB9XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGBSZW1vdmVkIHRleHQgaW4gcG9zaXRpb24gJHtwb3N9IHRvICR7ZW5kfSBvZiAke3BhdGh9YDtcbiAgICB0aGlzLm9yZGVyID0gcG9zO1xuICB9XG5cbiAgYXBwbHkoaG9zdDogSG9zdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBob3N0LnJlYWQodGhpcy5wYXRoKS50aGVuKGNvbnRlbnQgPT4ge1xuICAgICAgY29uc3QgcHJlZml4ID0gY29udGVudC5zdWJzdHJpbmcoMCwgdGhpcy5wb3MpO1xuICAgICAgY29uc3Qgc3VmZml4ID0gY29udGVudC5zdWJzdHJpbmcodGhpcy5lbmQpO1xuXG4gICAgICAvLyBUT0RPOiB0aHJvdyBlcnJvciBpZiB0b1JlbW92ZSBkb2Vzbid0IG1hdGNoIHJlbW92ZWQgc3RyaW5nLlxuICAgICAgcmV0dXJuIGhvc3Qud3JpdGUodGhpcy5wYXRoLCBgJHtwcmVmaXh9JHtzdWZmaXh9YCk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXaWxsIHJlcGxhY2UgdGV4dCBmcm9tIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlcGxhY2VDaGFuZ2UgaW1wbGVtZW50cyBDaGFuZ2Uge1xuICBvcmRlcjogbnVtYmVyO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBwYXRoOiBzdHJpbmcsXG4gICAgcHVibGljIHBvczogbnVtYmVyLFxuICAgIHB1YmxpYyBvbGRUZXh0OiBzdHJpbmcsXG4gICAgcHVibGljIG5ld1RleHQ6IHN0cmluZ1xuICApIHtcbiAgICBpZiAocG9zIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZWdhdGl2ZSBwb3NpdGlvbnMgYXJlIGludmFsaWQnKTtcbiAgICB9XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGBSZXBsYWNlZCAke29sZFRleHR9IGludG8gcG9zaXRpb24gJHtwb3N9IG9mICR7cGF0aH0gd2l0aCAke25ld1RleHR9YDtcbiAgICB0aGlzLm9yZGVyID0gcG9zO1xuICB9XG5cbiAgYXBwbHkoaG9zdDogSG9zdCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBob3N0LnJlYWQodGhpcy5wYXRoKS50aGVuKGNvbnRlbnQgPT4ge1xuICAgICAgY29uc3QgcHJlZml4ID0gY29udGVudC5zdWJzdHJpbmcoMCwgdGhpcy5wb3MpO1xuICAgICAgY29uc3Qgc3VmZml4ID0gY29udGVudC5zdWJzdHJpbmcodGhpcy5wb3MgKyB0aGlzLm9sZFRleHQubGVuZ3RoKTtcbiAgICAgIGNvbnN0IHRleHQgPSBjb250ZW50LnN1YnN0cmluZyh0aGlzLnBvcywgdGhpcy5wb3MgKyB0aGlzLm9sZFRleHQubGVuZ3RoKTtcblxuICAgICAgaWYgKHRleHQgIT09IHRoaXMub2xkVGV4dCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXG4gICAgICAgICAgbmV3IEVycm9yKGBJbnZhbGlkIHJlcGxhY2U6IFwiJHt0ZXh0fVwiICE9IFwiJHt0aGlzLm9sZFRleHR9XCIuYClcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gVE9ETzogdGhyb3cgZXJyb3IgaWYgb2xkVGV4dCBkb2Vzbid0IG1hdGNoIHJlbW92ZWQgc3RyaW5nLlxuICAgICAgcmV0dXJuIGhvc3Qud3JpdGUodGhpcy5wYXRoLCBgJHtwcmVmaXh9JHt0aGlzLm5ld1RleHR9JHtzdWZmaXh9YCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlcGxhY2VDaGFuZ2UoXG4gIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gIG5vZGU6IHRzLk5vZGUsXG4gIG9sZFRleHQ6IHN0cmluZyxcbiAgbmV3VGV4dDogc3RyaW5nXG4pOiBSZXBsYWNlQ2hhbmdlIHtcbiAgcmV0dXJuIG5ldyBSZXBsYWNlQ2hhbmdlKFxuICAgIHNvdXJjZUZpbGUuZmlsZU5hbWUsXG4gICAgbm9kZS5nZXRTdGFydChzb3VyY2VGaWxlKSxcbiAgICBvbGRUZXh0LFxuICAgIG5ld1RleHRcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlbW92ZUNoYW5nZShcbiAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSxcbiAgbm9kZTogdHMuTm9kZSxcbiAgZnJvbSA9IG5vZGUuZ2V0U3RhcnQoc291cmNlRmlsZSksXG4gIHRvID0gbm9kZS5nZXRFbmQoKVxuKTogUmVtb3ZlQ2hhbmdlIHtcbiAgcmV0dXJuIG5ldyBSZW1vdmVDaGFuZ2Uoc291cmNlRmlsZS5maWxlTmFtZSwgZnJvbSwgdG8pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2hhbmdlUmVjb3JkZXIoXG4gIHRyZWU6IFRyZWUsXG4gIHBhdGg6IHN0cmluZyxcbiAgY2hhbmdlczogQ2hhbmdlW11cbik6IFVwZGF0ZVJlY29yZGVyIHtcbiAgY29uc3QgcmVjb3JkZXIgPSB0cmVlLmJlZ2luVXBkYXRlKHBhdGgpO1xuICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydENoYW5nZSkge1xuICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UudG9BZGQpO1xuICAgIH0gZWxzZSBpZiAoY2hhbmdlIGluc3RhbmNlb2YgUmVtb3ZlQ2hhbmdlKSB7XG4gICAgICByZWNvcmRlci5yZW1vdmUoY2hhbmdlLnBvcywgY2hhbmdlLmVuZCAtIGNoYW5nZS5wb3MpO1xuICAgIH0gZWxzZSBpZiAoY2hhbmdlIGluc3RhbmNlb2YgUmVwbGFjZUNoYW5nZSkge1xuICAgICAgcmVjb3JkZXIucmVtb3ZlKGNoYW5nZS5wb3MsIGNoYW5nZS5vbGRUZXh0Lmxlbmd0aCk7XG4gICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5wb3MsIGNoYW5nZS5uZXdUZXh0KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlY29yZGVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tbWl0Q2hhbmdlcyh0cmVlOiBUcmVlLCBwYXRoOiBzdHJpbmcsIGNoYW5nZXM6IENoYW5nZVtdKSB7XG4gIGlmIChjaGFuZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHJlY29yZGVyID0gY3JlYXRlQ2hhbmdlUmVjb3JkZXIodHJlZSwgcGF0aCwgY2hhbmdlcyk7XG4gIHRyZWUuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcbiAgcmV0dXJuIHRydWU7XG59XG4iXX0=