import { combineReducers, CombinedState, Reducer } from '@reduxjs/toolkit';
import todoReducer from './todo/todoSlice';
import { IStore } from './types';

// @ts-ignore
export const rootReducer: Reducer<CombinedState<IStore>> = combineReducers({
  todoModule: todoReducer,
});
