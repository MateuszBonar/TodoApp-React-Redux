import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import {TODO} from "../../api/paths";
import {initialStateTodo} from "./initialState";

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
	initialState: initialStateTodo,
	reducers: {
	},
	extraReducers: {
		// @ts-ignore
		[getTodosAsync.fulfilled]: (state, action) => {
			return {
				...state,
				todos: action.payload.todos};
		},
		// @ts-ignore
		[addTodoAsync.fulfilled]: (state, action) => {
			state.push( {
				...state,
				todos: action.payload.todo, isLoading: false, error: null});
		},
		// @ts-ignore
		[toggleCompleteAsync.fulfilled]: (state, action) => {
			return {
				...state,
				todosModule: {
					...state.todosModule,
					todos: [...state.todosModule.todos].map( item => {
						if(item.id === action.payload.todo.id) {
							 return {...item, completed: action.payload.todo.completed}
						}
					})
				}
			}
		},
		// @ts-ignore
		[deleteTodoAsync.fulfilled]: (state, action) => {
			return {
				...state,
				todosModule: {
					...state.todosModule,
					todos: [...state.todosModule.todos].filter((todo) => todo.id !== action.payload.id)
				}
			}
		},
	},
});

export default todoSlice.reducer;
