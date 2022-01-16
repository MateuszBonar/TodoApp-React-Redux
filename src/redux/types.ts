import { ITodoModuleStore } from 'Redux/todo';
import { rootReducer } from './rootReducer';

export interface ActionsParam {
  [key: string]: Function;
}

export interface IStoreModule {
  isLoading: boolean;
  error: Error | null;
}

export interface IStore {
  todoModule: ITodoModuleStore;
}

export type RootState = ReturnType<typeof rootReducer>;
