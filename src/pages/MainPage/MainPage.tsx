import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AddTodoForm, TodoList, TotalCompleteItems } from 'Components';

const MainPage: FC = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className="container bg-white p-4 mt-5">
      <h1>{t('inf_title')}</h1>
      <AddTodoForm />
      <TodoList />
      <TotalCompleteItems />
    </div>
  );
};

export default MainPage;
