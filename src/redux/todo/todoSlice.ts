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

export const addTodoAsync = createAsyncThunk<any, any>(
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

export const toggleCompleteAsync = createAsyncThunk<any, any>(
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

export const deleteTodoAsync = createAsyncThunk<any, any>(
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
  extraReducers: builder => {
    builder.addCase(getTodosAsync.pending, state => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    });
    // @ts-ignore
    builder.addCase(getTodosAsync.fulfilled, (state, { payload }: ITodoModuleStore) => {
      return {
        ...state,
        todos: payload.todos,
        isLoading: true,
        error: null,
      };
    });
    // @ts-ignore
    builder.addCase(addTodoAsync.fulfilled, (state, { payload }: ITodo) => {
      return {
        ...state,
        todos: [...state.todos, { id: nanoid(), title: payload.title, completed: false }],
      };
    });
    // @ts-ignore
    builder.addCase(toggleCompleteAsync.fulfilled, (state, { payload }: ITodoModuleStore) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        todoModule: {
          ...state,
          todos: state.todos.map((item: ITodo) => {
            console.log(item.id === payload.id);
            return item.id === payload.id ? { ...item, completed: payload.completed } : null;
          }),
        },
      };
    });
    // @ts-ignore
    builder.addCase(deleteTodoAsync.fulfilled, (state, { payload }: ITodoModuleStore) => {
      return {
        ...state,
        todos: state.todos.filter((todo: ITodo) => todo.id !== payload),
      };
    });
  },
});

export default todoSlice.reducer;
