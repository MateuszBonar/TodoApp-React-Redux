import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleCompleteAsync, deleteTodoAsync, getIsLoading } from 'Redux/todo';

const TodoItem: FC<{ id: string; title: string; completed: boolean }> = ({
  id,
  title,
  completed,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);

  const handleCheckboxClick = (): void => {
    dispatch(toggleCompleteAsync({ id, completed: !completed }));
  };

  const handleDeleteClick = (): void => {
    dispatch(deleteTodoAsync({ id }));
  };

  return (
    <li className={`list-group-item ${completed && 'list-group-item-success'}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center">
          <input
            type="checkbox"
            className="mr-3"
            checked={completed}
            onClick={handleCheckboxClick}
          />
          {title}
        </span>
        <button onClick={handleDeleteClick} className="btn btn-danger" disabled={isLoading}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
