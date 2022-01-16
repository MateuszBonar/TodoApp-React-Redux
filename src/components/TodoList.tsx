import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getTodoModule, ITodo, todoActions } from 'Redux/todo';
import TodoItem from './TodoItem';
import { useDispatchedActions } from 'Hooks';

const TodoList: FC = (): JSX.Element => {
  const { getTodosAsync } = useDispatchedActions({
    getTodosAsync: todoActions.getTodosAsync,
  });
  const { todos } = useSelector(getTodoModule);

  useEffect(() => {
    getTodosAsync();
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
