import {ITodoModuleStore} from "./todo/types";
import { Action } from 'redux';
import {rootReducer} from "./rootReducer";

export interface IActionWithError<P> {
    error?: P;
}

export interface ILoadingAction {
    loading?: boolean;
}

export interface IActionBody<P> extends IActionWithError<Error>, ILoadingAction {
    payload?: P;
}

export interface IReduxAction<T> extends Action<string>, IActionBody<T> {}

export interface IStoreModule {
    isLoading: boolean;
    error: Error | null;
}

export interface IStore {
    todosModule: ITodoModuleStore
}

export type RootState = ReturnType<typeof rootReducer>
