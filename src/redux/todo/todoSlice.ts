import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { TODO, httpClient } from 'Api';
import { initialStateTodo } from './initialState';
import { ITodo, ITodoModuleStore } from 'Redux/todo';

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
      .catch(e => console.error(e))
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (payload: ITodo): Promise<any> =>
    axios
      .post(TODO.GET_ALL, {
        title: payload.title,
      })
      .then(res => {
        const todo = res.data;
        return { todo };
      })
      .catch(e => console.error(e))
);

export const toggleCompleteAsync = createAsyncThunk(
  'todos/completeTodoAsync',
  async (payload: ITodo): Promise<any> =>
    axios
      .patch(TODO.TOGGLE_COMPLETE_TODO(payload.id), {
        completed: payload.completed,
      })
      .then(res => {
        const todo = res.data;
        console.log('todo', todo);
        return { todo };
      })
      .catch(e => console.error(e))
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (payload: ITodo): Promise<any> =>
    await axios
      .delete(TODO.DELETE_TODO(payload.id))
      .then(() => {
        return { id: payload.id };
      })
      .catch(e => console.error(e))
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState: initialStateTodo,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTodosAsync.pending, (state, action) => {
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
        todoModule: {
          ...state,
          todos: state.todos.map((item: ITodo) =>
            item.id === payload.id ? { ...item, completed: payload.completed } : item
          ),
        },
      };
    });
    // @ts-ignore
    builder.addCase(deleteTodoAsync.fulfilled, (state, { payload }: ITodoModuleStore) => {
      return {
        ...state,
        todos: {
          ...state.todos,
          todos: [...state.todos].filter((todo: ITodo) => todo.id !== payload),
        },
      };
    });
  },
});

export default todoSlice.reducer;
