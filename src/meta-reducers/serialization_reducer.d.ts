import { ActionReducer } from '../models';
export declare function serializationCheckMetaReducer(reducer: ActionReducer<any, any>, checks: {
    action: boolean;
    state: boolean;
}): ActionReducer<any, any>;
