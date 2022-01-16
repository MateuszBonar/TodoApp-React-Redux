import {ITodoModuleStore} from "./todo/types";

export interface IStoreModule {
    isLoading: boolean;
    error: Error | null;
}

export interface IStore {
    todos:ITodoModuleStore
}
