import { combineReducers } from '@reduxjs/toolkit';
import todoReducer from 'Redux/todo/todoSlice';

export const rootReducer = combineReducers({
  todoModule: todoReducer,
});
