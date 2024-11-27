export declare function capitalize<T extends string>(text: T): Capitalize<T>;
export declare function uncapitalize<T extends string>(text: T): Uncapitalize<T>;
export declare function assertDefined<T>(value: T | null | undefined, name: string): asserts value is T;
