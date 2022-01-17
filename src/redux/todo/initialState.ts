import { FILTER_TYPES } from 'Redux/todo/types';
import { DEFAULT_SYSTEM_LANG } from 'Constants';

export const initialStateTodo = {
  todos: [],
  isLoading: false,
  currentFilter: FILTER_TYPES.ALL,
  currentLanguage: DEFAULT_SYSTEM_LANG,
  error: null,
};
