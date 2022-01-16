import { IStoreModule } from '../types';

export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}

export interface ITodoModuleStore extends IStoreModule {
  todos: ITodo[];
}

export type TodoActionPayload = ITodo | ITodo[] | Error | null;
