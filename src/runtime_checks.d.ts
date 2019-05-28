import { Provider } from '@angular/core';
import { RuntimeChecks, MetaReducer } from './models';
export declare function createActiveRuntimeChecks(runtimeChecks?: Partial<RuntimeChecks>): RuntimeChecks;
export declare function createSerializationCheckMetaReducer({ strictActionSerializability, strictStateSerializability, }: RuntimeChecks): MetaReducer;
export declare function createImmutabilityCheckMetaReducer({ strictActionImmutability, strictStateImmutability, }: RuntimeChecks): MetaReducer;
export declare function provideRuntimeChecks(runtimeChecks?: Partial<RuntimeChecks>): Provider[];
