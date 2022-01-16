import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getIsLoading, todoActions } from 'Redux/todo';
import { useDispatchedActions } from 'Hooks';

const TodoItem: FC<{ id: string; title: string; completed: boolean }> = ({
  id,
  title,
  completed,
}) => {
  const { t } = useTranslation();
  const { deleteTodoAsync, toggleCompleteAsync } = useDispatchedActions({
    deleteTodoAsync: todoActions.deleteTodoAsync,
    toggleCompleteAsync: todoActions.toggleCompleteAsync,
  });
  const isLoading = useSelector(getIsLoading);

  const handleCheckboxClick = (): void => {
    toggleCompleteAsync({ id, completed: !completed });
  };

  const handleDeleteClick = (): void => {
    deleteTodoAsync({ id });
  };

  return (
    <li className={`list-group-item ${completed && 'list-group-item-success'}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center">
          <input
            type="checkbox"
            className="mr-3"
            checked={completed}
            disabled={isLoading}
            onClick={handleCheckboxClick}
          />
          {title}
        </span>
        <button onClick={handleDeleteClick} className="btn btn-danger" disabled={isLoading}>
          {t('btn_delete')}
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
