import { RootState } from '../types';
import { ITodo, ITodoModuleStore } from './types';

// @ts-ignore
export const getTodoModule = (state: RootState): ITodoModuleStore => state.todoModule;

export const getTodos = (state: RootState): ITodo[] => state.todoModule.todos;

export const getFinishedTodos = (state: RootState): ITodo[] =>
  state.todoModule.todos?.filter((todo: ITodo) => todo.completed);
