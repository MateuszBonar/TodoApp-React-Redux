import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { TODO, httpClient } from 'Api';
import { initialStateTodo } from './initialState';
import { ITodo, ITodoModuleStore } from 'Redux/todo';
import { IStore } from 'Redux/types';

const axios = httpClient();

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async (): Promise<any> =>
    await axios
      .get(TODO.GET_ALL)
      .then(res => {
        const todos = res.data;
        return { todos };
      })
      .catch(_ => {
        throw new Error('Something went wrong');
      })
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (payload: ITodo): Promise<any> =>
    axios
      .post(TODO.GET_ALL, {
        title: payload.title,
      })
      .then(res => res.data)
      .catch(_ => {
        throw new Error('Something went wrong');
      })
);

export const toggleCompleteAsync = createAsyncThunk(
  'todos/completeTodoAsync',
  async (payload: ITodo): Promise<any> =>
    axios
      .patch(TODO.TOGGLE_COMPLETE_TODO(payload.id), {
        completed: payload.completed,
      })
      .then(res => res.data)
      .catch(_ => {
        throw new Error('Something went wrong');
      })
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (payload: ITodo): Promise<any> =>
    await axios
      .delete(TODO.DELETE_TODO(payload.id))
      .then(() => {
        return payload.id;
      })
      .catch(_ => {
        throw new Error('Something went wrong');
      })
);

// @ts-ignore
export const todoSlice = createSlice({
  name: 'todos',
  initialState: initialStateTodo,
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [getTodosAsync.fulfilled]: (state, action) => {
      return {
        ...state,
        todos: action.payload.todos,
        isLoading: true,
        error: null,
      };
    },
    // @ts-ignore
    [addTodoAsync.fulfilled]: (state, action) => {
      return {
        ...state,
        todos: [...state.todos, { id: nanoid(), title: action.payload.title, completed: false }],
      };
    },
    // @ts-ignore
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      return {
        ...state,
        todoModule: {
          ...state,
          todos: state.todos.map((item: ITodo) =>
            item.id === action.payload.id ? { ...item, completed: action.payload.completed } : item
          ),
        },
      };
    },
    // @ts-ignore
    [deleteTodoAsync.fulfilled]: (state, action) => {
      return {
        ...state,
        todos: state.todos.filter((todo: ITodo) => todo.id !== action.payload.id),
      };
    },
  },
});

export default todoSlice.reducer;
