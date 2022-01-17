import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatchedActions } from 'Hooks';
import { todoSlice } from 'Redux/todo/todoSlice';
import { FILTER_TYPES } from 'Redux/todo';

const Filters: FC = (): JSX.Element => {
  const { t } = useTranslation();

  const { setCurrentFilter } = useDispatchedActions({
    setCurrentFilter: todoSlice.actions.setCurrentFilter,
  });

  const handleCurrentFilter = (type: FILTER_TYPES) => (): void => {
    setCurrentFilter(type);
  };

  return (
    <div className="d-flex pb-3">
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleCurrentFilter(FILTER_TYPES.ALL)}
        >
          {t('inf_filter_all')}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCurrentFilter(FILTER_TYPES.UNFINISHED)}
        >
          {t('inf_filter_unfinished')}
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleCurrentFilter(FILTER_TYPES.FINISHED)}
        >
          {t('inf_filter_finished')}
        </button>
      </div>
    </div>
  );
};

export default Filters;
