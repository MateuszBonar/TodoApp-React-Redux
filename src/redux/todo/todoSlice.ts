import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import {TODO} from "../../api/paths";

export const getTodosAsync = createAsyncThunk(
	'todos/getTodosAsync',
	async () => {
		const resp = await fetch(TODO.GET_ALL);
		if (resp.ok) {
			const todos = await resp.json();
			return { todos };
		}
	}
);

export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async (payload) => {
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
	}
);

export const toggleCompleteAsync = createAsyncThunk(
	'todos/completeTodoAsync',
	async (payload) => {
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
	}
);

export const deleteTodoAsync = createAsyncThunk(
	'todos/deleteTodoAsync',
	async (payload) => {
		// @ts-ignore
		const resp = await fetch(TODO.DELETE_TODO(payload.id), {
			method: 'DELETE',
		});

		if (resp.ok) {
			// @ts-ignore
			return { id: payload.id };
		}
	}
);

export const todoSlice = createSlice({
	name: 'todos',
	initialState: [],
	reducers: {
		addTodo: (state, action) => {
			const todo = {
				id: nanoid(),
				title: action.payload.title,
				completed: false,
			};
			// @ts-ignore
			state.push(todo);
		},
		toggleComplete: (state, action) => {
			// @ts-ignore
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			// @ts-ignore
			state[index].completed = action.payload.completed;
		},
		deleteTodo: (state, action) => {
			// @ts-ignore
			return state.filter((todo) => todo.id !== action.payload.id);
		},
	},
	extraReducers: {
		// @ts-ignore
		[getTodosAsync.fulfilled]: (state, action) => {
			return action.payload.todos;
		},
		// @ts-ignore
		[addTodoAsync.fulfilled]: (state, action) => {
			state.push(action.payload.todo);
		},
		// @ts-ignore
		[toggleCompleteAsync.fulfilled]: (state, action) => {
			const index = state.findIndex(
				// @ts-ignore
				(todo) => todo.id === action.payload.todo.id
			);
			state[index].completed = action.payload.todo.completed;
		},
		// @ts-ignore
		[deleteTodoAsync.fulfilled]: (state, action) => {
			// @ts-ignore
			return state.filter((todo) => todo.id !== action.payload.id);
		},
	},
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
