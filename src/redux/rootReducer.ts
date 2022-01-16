import { combineReducers } from '@reduxjs/toolkit';
import todoReducer from './todo/todoSlice';

export const rootReducer = combineReducers({
  todoModule: todoReducer,
});
