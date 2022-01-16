import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TODO } from '../../api/paths';
import { initialStateTodo } from './initialState';
import { httpClient } from '../../api/config';

const axios = httpClient();

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
  const resp = await fetch(TODO.GET_ALL);
  if (resp.ok) {
    const todos = await resp.json();
    return { todos };
  }
});

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async payload => {
  const resp = await fetch(TODO.GET_ALL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // @ts-ignore
    body: JSON.stringify({ title: payload.title }),
  });

  if (resp.ok) {
    const todo = await resp.json();
    return { todo };
  }
});

export const toggleCompleteAsync = createAsyncThunk('todos/completeTodoAsync', async payload => {
  // @ts-ignore
  const resp = await fetch(TODO.TOGGLE_COMPLETE_TODO(payload.id), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    // @ts-ignore
    body: JSON.stringify({ completed: payload.completed }),
  });

  if (resp.ok) {
    const todo = await resp.json();
    return { todo };
  }
});

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync', async payload => {
  // @ts-ignore
  const resp = await fetch(TODO.DELETE_TODO(payload.id), {
    method: 'DELETE',
  });

  if (resp.ok) {
    // @ts-ignore
    return { id: payload.id };
  }
});

// @ts-ignore
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
    builder.addCase(getTodosAsync.fulfilled, (state, action) => {
      return {
        ...state,
        // @ts-ignore
        todos: action.payload.todos,
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
    builder.addCase(toggleCompleteAsync.fulfilled, (state, action) => {
      return {
        ...state,
        todosModule: {
          ...state,
          todos: [...state.todos].map(item => {
            // @ts-ignore
            if (item.id === action.payload.id) {
              // @ts-ignore
              return { ...item, completed: action.payload.completed };
            }
            // @ts-ignore
            return { ...item };
          }),
        },
      };
    });

    builder.addCase(deleteTodoAsync.fulfilled, (state, action) => {
      return {
        ...state,
        todos: {
          ...state.todos,
          todos: [...state.todos].filter(
            // @ts-ignore
            todo => todo.id !== action.payload.id
          ),
        },
      };
    });
  },
});

export default todoSlice.reducer;
