import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTodoModule, ITodo } from 'Redux/todo';
import TodoItem from './TodoItem';
import { getTodosAsync } from 'Redux/todo/todoSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, isLoading } = useSelector(getTodoModule);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  return (
    <ul className="list-group">
      {todos?.map((todo: ITodo) => (
        <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
      ))}
    </ul>
  );
};

export default TodoList;
