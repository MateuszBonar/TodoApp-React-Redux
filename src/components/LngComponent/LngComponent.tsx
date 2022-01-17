import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { AVAILABLE_SYSTEM_LANGS, DEFAULT_SYSTEM_LANG } from 'Constants';
import { useDispatchedActions } from 'Hooks';
import { todoSlice } from 'Redux/todo/todoSlice';
import { getTodoModule } from 'Redux/todo';
import { getFlag } from 'Utils';

const LngComponent: FC = (): JSX.Element => {
  const { t } = useTranslation();
  const { currentLanguage } = useSelector(getTodoModule);

  const { setCurrentLanguage } = useDispatchedActions({
    setCurrentLanguage: todoSlice.actions.setCurrentLanguage,
  });

  const renderAvilableLangs = (): JSX.Element[] =>
    AVAILABLE_SYSTEM_LANGS.map(lng => <option value={lng}>{t(`inf_lang_${lng}`)}</option>);

  const handleChangeLanguage = (e: any): void => {
    setCurrentLanguage(e.target.value);
  };

  return (
    <div className="input-group mb-3">
      <div className="input-group-append">{getFlag(currentLanguage)}</div>
      <select
        className="custom-select"
        id="inputGroupSelect02"
        defaultValue={DEFAULT_SYSTEM_LANG}
        onChange={handleChangeLanguage}
      >
        {renderAvilableLangs()}
      </select>
    </div>
  );
};

export default LngComponent;
