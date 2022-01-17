import i18next from 'i18next';
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getTodoModule } from 'Redux/todo';
import { DEFAULT_SYSTEM_LANG } from 'Constants';
import { MainPage } from './pages';

const App: FC = (): JSX.Element => {
  const { currentLanguage } = useSelector(getTodoModule);

  useEffect(() => {
    i18next.changeLanguage(currentLanguage || DEFAULT_SYSTEM_LANG);
  }, [currentLanguage]);

  ///404 NotFound z Lazy loading
  return <MainPage />;
};

export default App;
