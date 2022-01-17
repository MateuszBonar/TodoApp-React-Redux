import { IStoreModule } from 'Redux/types';

export enum FILTER_TYPES {
  ALL = 'ALL',
  FINISHED = 'FINISHED',
  UNFINISHED = 'UNFINISHED',
}

export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}

export interface ITodoModuleStore extends IStoreModule {
  todos: ITodo[];
  currentFilter: FILTER_TYPES;
  currentLanguage: string;
}

export type TodoActionPayload = ITodo | ITodo[] | Error | null;
