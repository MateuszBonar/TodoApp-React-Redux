import { FILTER_TYPES } from 'Redux/todo/types';

export const initialStateTodo = {
  todos: [],
  isLoading: false,
  currentFilter: FILTER_TYPES.ALL,
  error: null,
};
