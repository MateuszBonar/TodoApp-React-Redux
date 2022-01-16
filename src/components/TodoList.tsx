import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/todo/todoSlice';
import {ITodo} from "../redux/todo/types";
import {RootState} from "../redux/types";

const TodoList = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state: RootState) => state.todoModule.todos);

	useEffect(() => {
		dispatch(getTodosAsync());
	}, [dispatch]);

	return (
		<ul className='list-group'>
			{todos.map((todo: ITodo) => (
				<TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
			))}
		</ul>
	);
};

export default TodoList;
