import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getFinishedTodos, getIsLoading } from 'Redux/todo';

const TotalCompleteItems: FC = (): JSX.Element => {
  const finishedTodos = useSelector(getFinishedTodos);
  const isLoading = useSelector(getIsLoading);
  const { t } = useTranslation();

  return isLoading ? (
    <p>{t('inf_loading')}</p>
  ) : (
    <h4 className="mt-3">
      {t('inf_total_items')} {finishedTodos?.length}
    </h4>
  );
};

export default TotalCompleteItems;
