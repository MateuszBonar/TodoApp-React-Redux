import React from 'react';
import { useSelector } from 'react-redux';
import {ITodo} from "../redux/todo/types";
import {RootState} from "../redux/types";

const TotalCompleteItems = () => {
	const todos = useSelector((state: RootState) => state.todoModule.todos);

	return <h4 className='mt-3'>Total complete items: {todos.filter((todo: ITodo) => todo.completed).length}</h4>;
};

export default TotalCompleteItems;
