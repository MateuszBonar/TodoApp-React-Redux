import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TODO, httpClient } from 'Api';
import { initialStateTodo } from './initialState';
import { ITodo, ITodoModuleStore } from 'Redux/todo';

const axios = httpClient();

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
  const resp = await fetch(TODO.GET_ALL);
  if (resp.ok) {
    const todos = await resp.json();
    return { todos };
  }
});

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (payload: ITodo) => {
  const resp = await fetch(TODO.GET_ALL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: payload.title }),
  });

  if (resp.ok) {
    const todo = await resp.json();
    return { todo };
  }
});

export const toggleCompleteAsync = createAsyncThunk(
  'todos/completeTodoAsync',
  async (payload: ITodo) => {
    const resp = await fetch(TODO.TOGGLE_COMPLETE_TODO(payload.id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: payload.completed }),
    });

    if (resp.ok) {
      const todo = await resp.json();
      return { todo };
    }
  }
);

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync', async (payload: ITodo) => {
  const resp = await fetch(TODO.DELETE_TODO(payload.id), {
    method: 'DELETE',
  });

  if (resp.ok) {
    return { id: payload.id };
  }
});

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
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    });
    // @ts-ignore
    builder.addCase(toggleCompleteAsync.fulfilled, (state, { payload }: ITodoModuleStore) => {
      return {
        ...state,
        todoModule: {
          ...state,
          todos: [...state.todos].map((item: ITodo) => {
            if (item.id === payload.id) {
              return { ...item, completed: payload.completed };
            }
            return item;
          }),
        },
      };
    });
    // @ts-ignore
    builder.addCase(deleteTodoAsync.fulfilled, (state, { payload }: ITodoModuleStore) => {
      return {
        ...state,
        todos: {
          ...state.todos,
          todos: [...state.todos].filter((todo: ITodo) => todo.id !== payload.id),
        },
      };
    });
  },
});

export default todoSlice.reducer;
