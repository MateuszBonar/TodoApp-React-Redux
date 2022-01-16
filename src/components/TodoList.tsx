import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTodoModule, ITodo, getTodosAsync } from 'Redux/todo';
import TodoItem from './TodoItem';

const TodoList: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { todos } = useSelector(getTodoModule);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, []);

  return (
    <ul className="list-group">
      {todos?.map((todo: ITodo) => (
        <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
      ))}
    </ul>
  );
};

export default TodoList;
