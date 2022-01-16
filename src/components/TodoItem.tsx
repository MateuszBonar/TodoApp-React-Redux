import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { toggleCompleteAsync, deleteTodoAsync } from 'Redux/todo';

const TodoItem: FC<{ id: string; title: string; completed: boolean }> = ({
  id,
  title,
  completed,
}) => {
  const dispatch = useDispatch();

  const handleCheckboxClick = () => {
    // @ts-ignore
    dispatch(toggleCompleteAsync({ id, completed: !completed }));
  };

  const handleDeleteClick = () => {
    // @ts-ignore
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
        <button onClick={handleDeleteClick} className="btn btn-danger">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
