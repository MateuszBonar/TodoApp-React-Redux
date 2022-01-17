import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FILTER_TYPES, getTodoModule, ITodo, todoActions } from 'Redux/todo';
import TodoItem from './TodoItem';
import { useDispatchedActions } from 'Hooks';

const TodoList: FC = (): JSX.Element => {
  const { getTodosAsync } = useDispatchedActions({
    getTodosAsync: todoActions.getTodosAsync,
  });

  const { todos, currentFilter } = useSelector(getTodoModule);

  const currentTodos: {
    [key in FILTER_TYPES]: ITodo[];
  } = {
    [FILTER_TYPES.ALL]: todos,
    [FILTER_TYPES.FINISHED]: todos.filter(el => el.completed),
    [FILTER_TYPES.UNFINISHED]: todos.filter(el => !el.completed),
  };

  useEffect(() => {
    getTodosAsync();
  }, []);

  return (
    <ul className="list-group">
      {currentTodos[currentFilter]?.map((todo: ITodo) => (
        <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
      ))}
    </ul>
  );
};

export default TodoList;
